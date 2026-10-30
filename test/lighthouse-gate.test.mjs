// Guard: the Lighthouse CI workflow must stay a REAL gate, never the theater
// it was until 2026-10-29 (review website__devops M1).
//
// WHAT WAS BROKEN
// ---------------
// `.github/workflows/lighthouse.yml` ran `npm run lhci` with
// `continue-on-error: true`, the repo had NO lighthouserc config at all (so
// `lhci autorun` died at its healthcheck with exit 1, every run, swallowed
// green), it passed `LHCI_GITHUB_APP_TOKEN` from a secret that was never set,
// and it triggered only on `pull_request` in a master-direct estate — so the
// only runs in its history were dependabot PRs, all "successful", none ever
// having asserted anything about performance. The README advertised
// "Lighthouse CI budgets" next to a check mark that was fabricated by the
// `continue-on-error` flag.
//
// WHAT THIS FILE PINS
// -------------------
//   1. The workflow has no neutering vectors: no continue-on-error, no
//      `|| true`, no forced `exit 0` anywhere in its executable lines.
//   2. It triggers on pushes to master (and stays PR-triggered for forks of
//      the dependabot flow), so the gate actually runs on content.
//   3. No empty-secret pretense: the file does not reference
//      LHCI_GITHUB_APP_TOKEN; the gate targets a LOCAL server only.
//   4. Both committed configs (mobile + desktop) exist, load, assert at
//      error level on the four categories, and carry floors with teeth
//      (minScore >= 0.8 — a lower floor is a re-neuter by another name).
//   5. All measured URLs are 127.0.0.1 (the fail-loud/no-remote-target law),
//      the ready pattern they wait on is literally printed by
//      tools/serve-dist.mjs, and collect runs >= 3 samples per URL.
//   6. The desktop leg carries `!cancelled()` (S268 law: an earlier failure
//      must not hide whether the later gate ran at all).
//   7. .gitignore covers .lighthouseci/ so runs cannot dirty the tree.
//   8. The per-page transfer budgets enforce the documented 500 KB spec
//      budget (new_site.md:514) as RATCHET CONSTANTS: they may fall in
//      lockstep with this file's map, never rise behind a silent edit
//      (R-WEBSITE-04, 2026-10-30 re-measurement — see both config headers).
//
// WHEN THIS FAILS
// ---------------
// Same rule as test/lint-gate.test.mjs: do not delete an assertion to go
// green. Either restore the mechanism, or pin whatever honestly replaces it.

import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

const workflow = readFileSync(resolve(ROOT, '.github/workflows/lighthouse.yml'), 'utf8');
// Strip `#` comments so a detector cannot match its own explanation (and so a
// removed neuter cannot survive by hiding in a comment about the old neuter).
const workflowCode = workflow
  .split('\n')
  .filter((l) => !/^\s*#/.test(l))
  .join('\n');

const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));
const mobileConfig = require(resolve(ROOT, 'lighthouserc.cjs'));
const desktopConfig = require(resolve(ROOT, 'lighthouserc.desktop.cjs'));
const serveDist = readFileSync(resolve(ROOT, 'tools/serve-dist.mjs'), 'utf8');

const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];

test('the lighthouse workflow cannot neuter its own exit code', () => {
  // Non-vacuity: prove we parsed the file we think we parsed.
  assert.match(workflowCode, /^\s{2}lhci:$/m, 'no `lhci:` job found in lighthouse.yml');
  const runs = [...workflowCode.matchAll(/^\s+run: (.+)$/gm)].map((m) => m[1].trim());
  assert.ok(
    runs.some((r) => r === 'npm run lhci'),
    `no step runs \`npm run lhci\`; parsed run steps: ${JSON.stringify(runs)}`,
  );
  assert.ok(
    runs.some((r) => r === 'npm run lhci:desktop'),
    'no step runs `npm run lhci:desktop` — the desktop half of the gate is gone',
  );

  assert.doesNotMatch(
    workflowCode,
    /continue-on-error/,
    'continue-on-error is exactly how this gate faked green from its first ' +
      'run until 2026-10-29: lhci exited 1 (no config existed) on EVERY run ' +
      'and the flag turned it into a check mark. Do not reintroduce it.',
  );
  assert.doesNotMatch(workflowCode, /\|\|\s*true/, 'no `|| true` exit swallowing');
  assert.doesNotMatch(workflowCode, /;\s*exit\s+0/, 'no forced `; exit 0`');
});

test('the gate triggers on master pushes, not only on PRs', () => {
  // Master-direct estate: a pull_request-only trigger meant zero runs ever
  // gated real content changes (only dependabot PRs show in the history).
  assert.match(
    workflowCode,
    /^\s{2}push:$/m,
    'lighthouse.yml lost its `push:` trigger — the gate would stop running on ' +
      'content merged to master, which is how it never ran in the first place',
  );
  assert.match(workflowCode, /branches:\s*\[master\]/, 'push trigger must target master');
  assert.match(workflowCode, /^\s{2}pull_request:$/m, 'lighthouse.yml lost its PR trigger');
});

test('no unset-secret pretense; the gate is local-server only', () => {
  // The old env block fed LHCI_GITHUB_APP_TOKEN from a secret this repo never
  // had, pointing the whole job at a remote-check story that was never true.
  assert.doesNotMatch(
    workflowCode,
    /LHCI_GITHUB_APP_TOKEN/,
    'LHCI_GITHUB_APP_TOKEN references an unset secret; the cure deleted ' +
      'remote targeting entirely (upload target is `filesystem`)',
  );
  for (const config of [mobileConfig, desktopConfig]) {
    assert.deepEqual(
      config.ci.upload,
      { target: 'filesystem', outputDir: '.lighthouseci/reports' },
      'config must upload to local filesystem only — no remote exfil, no token',
    );
    for (const url of config.ci.collect.url) {
      assert.match(url, /^http:\/\/127\.0\.0\.1:\d+\//, `non-local collect URL in config: ${url}`);
    }
    assert.match(
      config.ci.collect.startServerCommand,
      /tools\/serve-dist\.mjs/,
      'collect must start the local dist server via tools/serve-dist.mjs',
    );
    assert.ok(
      serveDist.includes(config.ci.collect.startServerReadyPattern),
      `ready pattern "${config.ci.collect.startServerReadyPattern}" is not literally printed by tools/serve-dist.mjs — the server handshake would hang the collect step`,
    );
    assert.ok(
      config.ci.collect.numberOfRuns >= 3,
      'numberOfRuns < 3 cannot ride out Lighthouse run variance (mobile perf measured 89-93)',
    );
  }
});

test('both configs assert error-level budgets with teeth', () => {
  for (const [name, config] of [
    ['lighthouserc.cjs (mobile)', mobileConfig],
    ['lighthouserc.desktop.cjs (desktop)', desktopConfig],
  ]) {
    const assertions = config.ci?.assert?.assertions;
    assert.ok(assertions, `${name} has no assert.assertions — budgets match nothing`);
    for (const category of CATEGORIES) {
      const rule = assertions[`categories:${category}`];
      assert.ok(Array.isArray(rule), `${name} lost its error-level assertion for ${category}`);
      assert.equal(rule[0], 'error', `${name} ${category} assertion is not error level (warning = theater)`);
      assert.ok(
        rule[1].minScore >= 0.8,
        `${name} ${category} floor ${rule[1].minScore} is below 0.8: that is a ` +
          're-neuter by threshold inflation — lower floors must carry the same ' +
          'documented, measured justification the 0.85s carry',
      );
    }
    for (const metric of [
      'largest-contentful-paint',
      'cumulative-layout-shift',
      'total-blocking-time',
    ]) {
      const rule = assertions[metric];
      assert.ok(Array.isArray(rule), `${name} lost its ${metric} numeric budget`);
      assert.equal(rule[0], 'error', `${name} ${metric} assertion is not error level`);
      assert.ok(rule[1].maxNumericValue > 0, `${name} ${metric} bound must be positive`);
    }
    assert.ok(
      assertions['resource-summary:total:size'],
      `${name} lost its transfer-size budget`,
    );
  }
  // Form-factor divergence stays pinned where it is real (the preset flags
  // below). The OLD assertion that the two SIZE ceilings must differ is
  // retired by R-WEBSITE-04: it encoded the 2026-10-29 era (mobile gallery
  // 903 KB vs desktop 2.78 MB). Re-measurement at 8eececfe shows both presets
  // transferring identically per page — the budgets legitimately agree now,
  // and both sit on the documented spec budget. The ratchet test at the foot
  // of this file is the living law.
  assert.notEqual(
    mobileConfig.ci.collect.settings.preset,
    'desktop',
    'the mobile config must stay on the default (mobile) form factor',
  );
  assert.equal(desktopConfig.ci.collect.settings.preset, 'desktop');
});

test('the desktop leg cannot be skipped by a mobile failure', () => {
  // S268 law, restated here because this workflow's own history is the repo's
  // worst-case example of gates that never ran: GitHub skips subsequent steps
  // once one fails. Without !cancelled() a mobile red silently hides whether
  // desktop ever executed.
  const blocks = workflowCode.split(/^\s+- (?=name:|uses:|run:)/m).slice(1);
  const desktop = blocks.find((b) => b.includes('run: npm run lhci:desktop'));
  assert.ok(desktop, 'no step runs `npm run lhci:desktop`');
  assert.match(
    desktop,
    /if:\s*\$\{\{\s*!cancelled\(\)\s*\}\}/,
    'the desktop leg needs `if: ${{ !cancelled() }}`',
  );
});

test('package.json scripts and .gitignore match the delivered gate', () => {
  assert.equal(pkg.scripts.lhci, 'lhci autorun');
  assert.match(
    pkg.scripts['lhci:desktop'] ?? '',
    /--config=lighthouserc\.desktop\.cjs/,
    'lhci:desktop must point at the committed desktop config',
  );
  const gitignore = readFileSync(resolve(ROOT, '.gitignore'), 'utf8');
  assert.ok(
    gitignore.split('\n').includes('.lighthouseci/'),
    '.lighthouseci/ must stay gitignored or every local run dirties the tree',
  );
});

// R-WEBSITE-04 (2026-10-30). The transfer ceilings below are the documented
// page budget — new_site.md:514, "total transferred per page <= ~500 KB" —
// enforced on every graded URL since the measured reality became compliant:
// at tip 8eececfe, mobile AND desktop transfer 113,668 B (/) and 330,426 B
// (/abstract-canvas/), each with >= 170 KB of headroom. The ceilings may
// FALL when content diets justify it (update this map in lockstep — a lower
// budget is the ratchet working); a RISE means either the shipped pages got
// heavier than the spec budget or the gate is being loosened, and both must
// die here rather than ride green.
const TRANSFER_CEILING_RATCHET = {
  'lighthouserc.cjs (mobile)': 500_000,
  'lighthouserc.desktop.cjs (desktop)': 500_000,
};

test('transfer budgets enforce the spec budget and cannot ratchet up', () => {
  for (const [name, config] of [
    ['lighthouserc.cjs (mobile)', mobileConfig],
    ['lighthouserc.desktop.cjs (desktop)', desktopConfig],
  ]) {
    const rule = config.ci.assert.assertions['resource-summary:total:size'];
    assert.ok(
      Array.isArray(rule) && rule[0] === 'error',
      `${name} lost its error-level transfer-size assertion`,
    );
    assert.equal(
      rule[1].maxNumericValue,
      TRANSFER_CEILING_RATCHET[name],
      `${name} transfer ceiling moved off ${TRANSFER_CEILING_RATCHET[name]} B without the ` +
        're-measurement this ratchet exists to force: lower it in this file too when the ' +
        'pages genuinely shrink, and never above the 500 KB page budget without amending ' +
        'new_site.md §13 first',
    );
  }
});
