// Guard: the link checker must measure the published artifact, and must not
// sabotage its own measurement.
//
// Run with `npm run test:unit` (`node --test "test/**/*.test.mjs"`), which the
// `unit` job in .github/workflows/lint.yml executes on every push and PR.
//
// WHY THIS FILE EXISTS
// --------------------
// The Link Check workflow reported "1636 broken links, 4671 scanned, 1258
// files". Almost none of that was a broken link.
//
//   * 196 came back [429] and 11 came back [0]. linkinator defaults to ONE
//     HUNDRED simultaneous connections, and nearly every url in the corpus
//     points at a single host, detain.github.io. The job rate-limited GitHub
//     Pages within seconds. It was not a transient: a url that answered 200
//     before the run answered 429 for more than twenty minutes after it, to an
//     ordinary single curl. The gate was corrupting the thing it measured, and
//     the weekly cron plus any PR run would poison each other.
//
//     `--retry` is not a fix on its own. Fastly returns `retry-after: 0`, so an
//     honoured retry fires immediately into the same limit. Capping concurrency
//     is the part that works.
//
//   * 653 of the 843 distinct broken urls were correctly-written absolute
//     self-references belonging to sites that are NOT DEPLOYED. sites/ holds
//     138 site directories; `npm run build` only emits the 76 that have a
//     loadable brand kit, and dist/ is what Pages publishes. Checking source
//     files that never ship guaranteed a 404 apiece and buried the real
//     defects under them.
//
// WHAT IT ASSERTS
// ---------------
//   1. `links` scans dist/ (the deploy artifact), not sites/ (the source tree).
//   2. Concurrency is explicitly capped well below linkinator's default of 100.
//   3. An empty corpus FAILS this target instead of skipping — dist/ only
//      exists after a build, so "no files" means nothing was checked.
//   4. linkcheck.yml runs `npm run build` before `npm run linkcheck`.
//
// Assertions strip comments from the file they inspect first, so this detector
// cannot be satisfied by the prose above or by the prose in its subject.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Strip comments so no assertion can be satisfied by the prose in its subject.
//
// ⚠ Block comments are only stripped when the `/*` opens a line. A naive
// /\/\*[\s\S]*?\*\//g eats the `/**/` inside glob literals like
// 'dist/**/*.html' and 'sites/**/index.html', turning them into 'dist*.html' —
// which made the very assertion below fail against correct code.
function stripComments(src) {
  return src.replace(/^[ \t]*\/\*[\s\S]*?\*\//gm, '').replace(/^\s*\/\/.*$/gm, '');
}

const lintSrc = stripComments(readFileSync(resolve(root, 'tools/lint.mjs'), 'utf8'));

test('non-vacuity: tools/lint.mjs survived comment-stripping', () => {
  assert.ok(lintSrc.includes('linkinator'), 'stripping removed the whole file');
  assert.ok(lintSrc.includes('const targets'), 'the targets table is gone');
});

test('the links target scans the built artifact, not the source tree', () => {
  const linksLine = lintSrc.split('\n').find((l) => l.includes('linkinator'));
  assert.ok(linksLine, 'no linkinator target found');

  assert.match(
    linksLine,
    /dist\/\*\*\/\*\.html/,
    'links must scan dist/**/*.html — sites/ contains 62 site directories that are never deployed, and every absolute self-reference in them is a guaranteed 404',
  );
  assert.ok(
    !/'sites\/\*\*\/\*\.html'/.test(linksLine),
    'links must NOT scan sites/**/*.html',
  );
});

test('linkinator concurrency is capped far below its default of 100', () => {
  assert.match(
    lintSrc,
    /'--concurrency',\s*'(\d+)'/,
    'the links target must pass an explicit --concurrency',
  );
  const n = Number(lintSrc.match(/'--concurrency',\s*'(\d+)'/)[1]);
  assert.ok(
    n > 0 && n <= 16,
    `--concurrency is ${n}; linkinator's default of 100 rate-limited GitHub Pages for >20 minutes, so this must stay small`,
  );
  assert.ok(lintSrc.includes("'--retry'"), '--retry should still be set as a secondary measure');
});

test('an empty corpus FAILS the links target instead of skipping', () => {
  // The estate's commonest fake pass is a gate that inspected zero files. dist/
  // does not exist until `npm run build` runs, so this target is the one place
  // an empty match is definitely a mistake rather than a fresh checkout.
  assert.match(
    lintSrc,
    /requiresFiles:\s*true/,
    'the links target must be marked requiresFiles',
  );

  const emptyBranch = lintSrc.slice(lintSrc.indexOf('files.length === 0'));
  assert.ok(
    /requiresFiles[\s\S]{0,400}?process\.exit\(1\)/.test(emptyBranch),
    'the zero-files branch must exit 1 when requiresFiles is set, before it reaches the "skipping" exit 0',
  );
  // Order matters: the failure must come BEFORE the benign skip.
  assert.ok(
    emptyBranch.indexOf('process.exit(1)') < emptyBranch.indexOf('process.exit(0)'),
    'the requiresFiles failure must be evaluated before the generic skip',
  );
});

test('linkcheck.yml builds before it checks', () => {
  const wf = readFileSync(resolve(root, '.github/workflows/linkcheck.yml'), 'utf8')
    .split('\n')
    .filter((l) => !/^\s*#/.test(l))
    .join('\n');

  assert.ok(wf.includes('npm run linkcheck'), 'the workflow no longer runs linkcheck at all');
  assert.ok(wf.includes('npm run build'), 'the workflow must build before checking dist/');
  assert.ok(
    wf.indexOf('npm run build') < wf.indexOf('npm run linkcheck'),
    'the build step must come BEFORE linkcheck, otherwise dist/ is empty and the gate fails',
  );
});
