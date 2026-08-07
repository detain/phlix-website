// Guard: the accessibility gate must be able to actually RUN.
//
// Run with `npm run test:unit` (`node --test "test/**/*.test.mjs"`), which the
// `unit` job in .github/workflows/lint.yml executes on every push and PR. That
// job hard-fails, which is the point: the a11y step itself tolerates findings,
// so the only place a re-break of the harness can be made to hurt is here.
//
// WHY THIS FILE EXISTS
// --------------------
// `npm run a11y` had NEVER successfully run, in any environment, at any point in
// this repo's history. It died on startup with
//
//     TypeError: pify(...).bind is not a function
//         at node_modules/globby/index.js:8
//         at node_modules/pa11y-ci/bin/pa11y-ci.js:16
//
// because pa11y-ci's `globby@6.1.0` declares `glob: ^7.0.3` and calls
// `pify(glob, Promise).bind(glob)`, while the repo's top-level
// `overrides.glob = "^13.0.0"` forced glob 13 into it. glob 13's export is an
// object, not a function, so pify returns an object and `.bind` is undefined.
// 897d933b introduced this by dropping the `globby: ^11.1.0` override — correct
// for stylelint (which needs ESM globby 16), wrong for pa11y-ci, whose globby 6
// was then left exposed to the glob override for the first time.
//
// Behind that crash sat two more defects, each of which would have kept the gate
// useless on a runner even after the crash was fixed:
//
//   * `chromeLaunchConfig` was written at the TOP LEVEL of the config file.
//     pa11y-ci calls `pa11yCi(urls, config.defaults)` and reads
//     `options.chromeLaunchConfig` off that, so a top-level one is silently
//     ignored. Its `--no-sandbox` never reached Chrome; verified by running the
//     old config directly and still getting "No usable sandbox!".
//   * the config hardcoded `file:///home/sites/phlix/phlix-website/...` URLs.
//     pa11y-ci hands `config.urls` to puppeteer untouched, so a static config
//     physically cannot hold a portable path. The page list therefore has to be
//     globbed at runtime and passed as CLI arguments, where `protocolify` turns
//     a relative path into a machine-correct absolute `file://` URL.
//
// WHAT IT ASSERTS
// ---------------
//   1. The glob override is scoped so pa11y-ci's globby keeps a glob 7.
//   2. .pa11yci.json carries NO urls and NO absolute paths — the class of defect
//      that made the old config machine-specific cannot come back.
//   3. chromeLaunchConfig is nested under `defaults` (not top level) and passes
//      --no-sandbox.
//   4. useIncognitoBrowserContext is false while concurrency > 1.
//   5. tools/a11y.mjs still treats a non-{0,2} exit as fatal, so a crash can
//      never again be mistaken for a pass.
//
// Every assertion strips comments from the file it inspects first, so this
// detector cannot pass by matching the prose above or the prose in its subject.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (p) => JSON.parse(readFileSync(resolve(root, p), 'utf8'));

// Strip // line comments and /* */ block comments so no assertion below can be
// satisfied by the explanatory text in its own subject file.
function stripComments(src) {
  return src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
}

test('the glob override no longer reaches pa11y-ci’s globby', () => {
  const pkg = readJson('package.json');

  assert.equal(
    pkg.overrides.glob,
    '^13.0.0',
    'the top-level glob override is still wanted for everything else; if it went away, this guard is moot and should be re-thought rather than deleted',
  );

  const globbyOverride = pkg.overrides.globby;
  assert.ok(
    globbyOverride && typeof globbyOverride === 'object',
    'overrides.globby must be a nested object scoping globby’s own glob dependency',
  );
  assert.match(
    globbyOverride.glob,
    /^\^?7\./,
    `globby@6 calls pify(glob).bind(glob), which only works on glob 7’s function export; got ${globbyOverride.glob}`,
  );
});

test('the installed tree really resolves globby to a glob 7', async () => {
  // The package.json assertion above is a claim about intent. This one is a
  // claim about what is actually on disk, which is what pa11y-ci will load.
  const { createRequire } = await import('node:module');
  const require = createRequire(resolve(root, 'node_modules/globby/index.js'));
  const version = require('glob/package.json').version;
  assert.match(
    version,
    /^7\./,
    `node_modules/globby resolves glob@${version}; pa11y-ci will crash at startup unless this is 7.x`,
  );
});

test('.pa11yci.json contains no urls and no absolute paths', () => {
  const raw = readFileSync(resolve(root, '.pa11yci.json'), 'utf8');
  const cfg = JSON.parse(raw);

  assert.ok(
    !('urls' in cfg),
    'the page list must be globbed at runtime by tools/a11y.mjs; a urls key here can only ever hold machine-specific absolute URLs',
  );
  assert.ok(
    !raw.includes('file://'),
    'a file:// URL in this config pins it to one machine — that is the exact defect this file was rewritten to remove',
  );
  assert.ok(
    !/"\/|:\/\/home\/|\/home\/sites\//.test(raw),
    'absolute filesystem path found in .pa11yci.json',
  );
});

test('chromeLaunchConfig is nested under defaults and disables the sandbox', () => {
  const cfg = readJson('.pa11yci.json');

  assert.ok(
    !('chromeLaunchConfig' in cfg),
    'a TOP-LEVEL chromeLaunchConfig is silently ignored by pa11y-ci — it must live under defaults',
  );
  const args = cfg.defaults?.chromeLaunchConfig?.args;
  assert.ok(Array.isArray(args), 'defaults.chromeLaunchConfig.args must be an array');
  assert.ok(
    args.includes('--no-sandbox'),
    'without --no-sandbox Chrome aborts with "No usable sandbox!" on runners that restrict unprivileged user namespaces',
  );
});

test('useIncognitoBrowserContext is false whenever concurrency > 1', () => {
  const cfg = readJson('.pa11yci.json');
  const concurrency = cfg.defaults?.concurrency ?? 1;

  if (concurrency > 1) {
    assert.equal(
      cfg.defaults.useIncognitoBrowserContext,
      false,
      `concurrency is ${concurrency}; with string urls pa11y-ci shares one options object across in-flight tasks, so incognito contexts get closed out from under each other and pages are silently never assessed`,
    );
  }
});

test('tools/a11y.mjs treats a harness crash as fatal', async () => {
  // Behavioural, not textual. An earlier version of this test grepped the
  // source for `process.exit(1)` and a mutation flipping the crash branch to
  // `process.exit(0)` SURVIVED, because a different `process.exit(1)` (the
  // missing-config branch) satisfied the pattern. Assert the mapping instead.
  const { classifyExit } = await import('../tools/a11y.mjs');

  assert.deepEqual(classifyExit(0), { exit: 0, kind: 'pass' });
  assert.deepEqual(classifyExit(2), { exit: 0, kind: 'findings' });
  assert.deepEqual(classifyExit(2, true), { exit: 2, kind: 'findings' });

  // The whole point of the step: every OTHER outcome is a harness failure and
  // must be non-zero. `npm run a11y` crashed with exit 1 for months behind a
  // blanket continue-on-error, and nobody could tell it apart from a pass.
  for (const code of [1, 3, 127, null, undefined]) {
    const got = classifyExit(code);
    assert.equal(got.kind, 'crash', `exit ${code} must classify as a crash`);
    assert.notEqual(got.exit, 0, `exit ${code} must NOT be reported as success`);
  }
  // ...and strictness must not be able to excuse a crash either.
  assert.equal(classifyExit(1, true).exit, 1);
});

test('importing tools/a11y.mjs does not launch pa11y-ci', async () => {
  // Guards the `import.meta.main`-style entry check. If that regressed, the
  // test above would spawn a 47-second browser run inside the unit suite.
  const src = stripComments(readFileSync(resolve(root, 'tools/a11y.mjs'), 'utf8'));
  assert.ok(src.includes('pa11y-ci'), 'comment-stripping removed the whole file');
  assert.match(
    src,
    /if \(process\.argv\[1\][\s\S]*?\{\s*main\(\);/,
    'main() must be guarded by an entry-point check',
  );
});

test('the a11y CI step is no longer blanket continue-on-error', () => {
  const wf = stripComments(readFileSync(resolve(root, '.github/workflows/lint.yml'), 'utf8'))
    .split('\n')
    .filter((l) => !/^\s*#/.test(l))
    .join('\n');

  // Non-vacuity first: a broken read or an over-eager strip must not pass.
  assert.ok(wf.includes('npm run a11y'), 'lint.yml no longer runs npm run a11y at all');

  const a11yStep = wf.slice(wf.indexOf('npm run a11y'));
  const nextStep = a11yStep.indexOf('\n      - ');
  const stepBody = nextStep === -1 ? a11yStep : a11yStep.slice(0, nextStep);

  assert.ok(
    !/continue-on-error:\s*true/.test(stepBody),
    'the a11y step swallowed its own exit code, which is how a permanent startup crash stayed invisible; tools/a11y.mjs now distinguishes findings from crashes, so the blanket suppression is not needed',
  );
});
