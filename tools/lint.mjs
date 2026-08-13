#!/usr/bin/env node
// Wrapper: skip a linter with a friendly message when no files match.
// Without this, htmlhint is the only tool that returns 0 on empty matches;
// stylelint, eslint, and linkinator all exit non-zero, which would fail CI
// when a target directory is empty (e.g. a fresh checkout with no built sites).
//
// Targets are the generated brand-kit sites (sites/<slug>/), the hand-authored
// root pages (index.html = the gallery template, 404.html = the Pages error
// shim), and tools/. The old `variants/**` patterns were dropped: that
// directory was deleted on 2026-06-30 and replaced by sites/<slug>/.

import { spawn } from 'node:child_process';
import { globSync } from 'glob';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const [, , tool, ...rest] = process.argv;
if (!tool) {
  console.error('Usage: tools/lint.mjs <html|css|js|links>');
  process.exit(64);
}

// Root *.html (index.html, 404.html) is linted and format-checked, but is
// deliberately NOT in the `links` target: both are build templates whose real
// links only exist after `npm run build` injects them (index.html renders its
// cards from window.__PHLIX_KITS__) and 404.html's no-JS link is the absolute
// Pages base path `/phlix-website/`, which resolves nowhere in the source tree.
// linkinator would report those as broken. Check dist/ instead if you want them.
const ROOT_HTML = ['*.html'];

// ---------------------------------------------------------------------------
// `links`: why it scans dist/ and why concurrency is pinned low
// ---------------------------------------------------------------------------
// linkinator validates LIVE urls, so both of these matter a great deal.
//
// 1. CONCURRENCY. linkinator defaults to **100 simultaneous connections**. The
//    old target (sites/**/*.html) is 1258 files carrying 4671 links, and the
//    overwhelming majority point at one host — detain.github.io. That run
//    rate-limits GitHub Pages within seconds: 196 links came back [429], and
//    the host kept returning 429 to ordinary single curl requests for more than
//    20 minutes AFTER the run finished. A page that returned 200 before the run
//    returned 429 after it. So the job was corrupting its own measurement, and
//    consecutive runs (the weekly cron plus any PR) poison each other.
//    `--retry` alone does NOT fix this: Fastly answers with `retry-after: 0`,
//    so an honoured retry fires immediately and simply re-hits the limit. The
//    concurrency cap is the part that actually works; --retry is a belt to its
//    braces. --timeout stops a hung socket stalling the job forever (the old
//    run also produced 11 links in state [0], no status at all).
//
// 2. SCOPE. sites/ holds 138 site directories. `npm run build` only emits the
//    ones that have a loadable brand-kits/<slug>.js — 76 of them — and dist/ is
//    what GitHub Pages publishes. The other 62 are not on the internet, so
//    every absolute self-reference they contain is a guaranteed 404: 653 of the
//    843 distinct broken urls were exactly that, correctly-written links to
//    pages that are simply not deployed. Checking them told us nothing about
//    the published site and buried the ~121 real defects underneath.
//    dist/**/*.html is the artifact that actually ships, so that is what gets
//    checked. Consequence: `npm run linkcheck` needs `npm run build` first, and
//    zero matched files is a FAILURE for this target rather than a skip — see
//    `requiresFiles` below. An unbuilt dist/ silently "passing" would be the
//    purest form of the fake green this whole file exists to prevent.
//
// ⚠ Do NOT try to make this offline with --url-rewrite-search/--url-rewrite-replace.
// It was tried, A/B'd against a no-rewrite control on dist/velocity-x/index.html,
// and it SILENTLY DROPS the rewritten links: the control reported the canonical,
// the og:image and the JSON-LD logo as three separate broken urls, and with the
// rewrite in place all three vanished from the report entirely — neither OK nor
// BROKEN, just absent. That is a fake pass, not a fix.
const LINKS_ARGS = [
  '--silent',
  '--concurrency', '8',
  '--retry',
  '--retry-errors',
  '--timeout', '30000',
];

const PRETTIER_PATTERNS = [
  ...ROOT_HTML,
  'sites/**/*.html',
  'sites/**/*.css',
  'sites/**/*.js',
  'shared/**/*.json',
  'docs/**/*.md',
];

// `links` targets dist/, NOT sites/ — see the long note above `LINKS_ARGS`.
const targets = {
  html: { bin: 'htmlhint', patterns: [...ROOT_HTML, 'sites/**/*.html'] },
  css:  { bin: 'stylelint', patterns: ['sites/**/*.css'] },
  // `brand-kits/*.js` added by S281. Until then this corpus — 79 files of
  // build-critical JavaScript, the input to every site the repo publishes — was
  // linted by NOTHING: not eslint, not prettier, not format:check. That is how
  // event-horizon.js shipped a plain SyntaxError (an unquoted object key
  // containing a space) and sat undeployed for months; eslint cannot parse it
  // either, so this target would have reported it on the commit that introduced
  // it. Measured backlog when the pattern was added: ONE error, `no-dupe-keys`
  // in cybernetic-surge.js:282, fixed in the same commit.
  // ⚠ The prettier/`format-check` corpus is deliberately NOT widened here: 78 of
  // the 80 files differ from .prettierrc.json, almost entirely single-vs-double
  // quotes, which is an ~80k-line reformat of data files. Counted and stated in
  // the S281 worklog; it is a separate change, not a rider on a bug fix.
  js:   {
    bin: 'eslint',
    patterns: ['brand-kits/*.js', 'sites/**/*.js', 'tools/**/*.mjs'],
    // See `pinnedSubcorpus` below: 79 of those files are the brand kits, and
    // that 79 is asserted against a manifest rather than against the glob.
    //
    // ⚠ `test` is applied to the file list this script is about to hand the
    // linter — NOT to a re-glob of the pattern above. The first version of this
    // check re-globbed `brand-kits/*.js`, and a mutation proved it decorative:
    // changing the target pattern to `brand-kits/*.jsx` dropped all 79 kits from
    // eslint's corpus (270 -> 191 files inspected) while the pin cheerfully
    // reported "79 / 79" and the gate exited 0. A check that measures something
    // other than what the tool actually consumed is not a check.
    pinnedSubcorpus: {
      label: 'brand-kits/*.js',
      test: (f) => /^brand-kits\/[^/]+\.js$/.test(f),
      pinFile: 'brand-kits/expected-kits.json',
      pinKey: 'count',
    },
  },
  links:{ bin: 'linkinator', patterns: ['dist/**/*.html'], extraArgs: LINKS_ARGS, requiresFiles: true },
  'format-check': { bin: 'prettier', patterns: PRETTIER_PATTERNS, extraArgs: ['--check'] },
  format:         { bin: 'prettier', patterns: PRETTIER_PATTERNS, extraArgs: ['--write'] },
};

const t = targets[tool];
if (!t) {
  console.error(`Unknown lint tool: ${tool}`);
  process.exit(64);
}

const thisFile = fileURLToPath(import.meta.url);
const projectRoot = resolve(dirname(thisFile), '..');
const configPath = resolve(projectRoot, '.stylelintrc.json');

const files = t.patterns.flatMap((p) => globSync(p, { cwd: projectRoot })).filter(Boolean);

if (files.length === 0) {
  // For most targets an empty match is benign (a fresh checkout with no built
  // sites). For `links` it is NOT: its corpus is dist/, which only exists after
  // `npm run build`, so "no files" means the build was never run and the gate
  // would report success having checked absolutely nothing.
  if (t.requiresFiles) {
    console.error(
      `[lint:${tool}] no files match ${t.patterns.join(', ')} -> exit 1\n` +
      `[lint:${tool}] this target checks the BUILT artifact; run \`npm run build\` first. ` +
      `Refusing to report success on an empty corpus.`,
    );
    process.exit(1);
  }
  console.log(`[lint:${tool}] no files match ${t.patterns.join(', ')} — skipping`);
  process.exit(0);
}

// ---------------------------------------------------------------------------
// The sub-corpus pin (S281)
// ---------------------------------------------------------------------------
// The file count printed at the bottom of this script is honest about how many
// files the linter saw, but it is derived from the very globs it is reporting
// on — so it self-adjusts. If `brand-kits/*.js` stopped matching (a mistyped
// pattern, a moved directory, someone "tidying" the list), `lint:js` would still
// find 191 files under sites/ and tools/, still print a plausible number, and
// still exit 0, with 79 files of build-critical JavaScript silently unchecked
// again. That is the same defect this step exists to remove, one layer up.
//
// So the brand-kit slice of the corpus is counted separately and compared to an
// INDEPENDENT denominator: `count` in brand-kits/expected-kits.json, the
// hand-maintained pin build.mjs already uses. Drift in either direction is a
// failure. An empty slice therefore cannot pass either.
//
// The slice is taken from `files` — the exact list about to be passed to the
// linter — so neutering the glob above is caught. See the ⚠ on `test`.
if (t.pinnedSubcorpus) {
  const { label, test: inSlice, pinFile, pinKey } = t.pinnedSubcorpus;
  const matched = files.filter(inSlice);
  let expected;
  try {
    expected = JSON.parse(readFileSync(resolve(projectRoot, pinFile), 'utf8'))[pinKey];
  } catch (err) {
    console.error(`[lint:${tool}] cannot read the sub-corpus pin ${pinFile}: ${err.message} -> exit 1`);
    process.exit(1);
  }
  if (!Number.isInteger(expected) || expected <= 0) {
    console.error(
      `[lint:${tool}] ${pinFile} "${pinKey}" is ${JSON.stringify(expected)} — a pin of zero ` +
        `pins nothing, so this check would be satisfied by an empty corpus -> exit 1`,
    );
    process.exit(1);
  }
  console.log(
    `[lint:${tool}] sub-corpus ${label}: ${matched.length} / ${expected} ` +
      `(pinned by ${pinFile}) of ${files.length} file(s) being linted`,
  );
  if (matched.length !== expected) {
    console.error(
      `[lint:${tool}] ${label} contributed ${matched.length} file(s) to the lint corpus but ` +
        `${pinFile} pins ${expected} -> exit 1\n` +
        `[lint:${tool}] Refusing to lint a partial corpus and report success. If the kit set really ` +
        `changed, update ${pinFile} ("kits" AND "count") in the same commit.`,
    );
    process.exit(1);
  }
}

const toolArgs = (tool === 'css')
  ? ['--config', configPath, ...(t.extraArgs ?? []), ...files, ...rest]
  : [...(t.extraArgs ?? []), ...files, ...rest];

const child = spawn('npx', ['--no-install', t.bin, ...toolArgs], { stdio: 'inherit', cwd: projectRoot });
child.on('exit', (code) => {
  // Always print a corpus size and an exit code, even on success.
  //
  // stylelint prints NOTHING when it is happy, and htmlhint's own summary is
  // easy to lose in 1260 lines of "Config loaded". That silence is what let
  // S268's defect hide: `npm run lint` was `run-p` without --continue-on-error,
  // so a failing sibling KILLED lint:css mid-run, and a killed task and a clean
  // task looked identical in the CI log — no output either way. 3859 stylelint
  // errors sat behind that ambiguity across 40 consecutive red runs.
  //
  // A gate that inspected zero files also passes every assertion it makes, so
  // the file count is the part that makes a green here mean something. Read
  // this line, not the absence of complaints.
  console.log(`[lint:${tool}] ${t.bin} inspected ${files.length} files -> exit ${code ?? 1}`);
  process.exit(code ?? 1);
});
