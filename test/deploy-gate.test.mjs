// Guard: the production deploy must be gated on the quality checks — and the
// gate set must stay an exact mirror of what CI already asserts (review
// website__devops M2, 2026-10-29).
//
// WHAT WAS BROKEN
// ---------------
// `.github/workflows/pages.yml` built and published to GitHub Pages on every
// push to master with no dependency on any check. The proof shipped the same
// day: on SHA bdd102aad, Lint run 40861349153 FAILED its audit-gate step
// while this workflow's run 40861349019 DEPLOYED — a red security gate and a
// green production publish on identical content. With no branch protection on
// master either, nothing in the system stood between a failing gate and a
// live site.
//
// THE MECHANISM THIS PINS
// -----------------------
// GitHub Actions `needs:` cannot reference jobs in another workflow, so
// pages.yml now runs a `gates` job that mirrors lint.yml's `lint` + `unit`
// jobs command-for-command, and `build` carries `needs: gates`. A red gate
// means the artifact is never produced, so nothing can be promoted to Pages.
// The mirror is only honest if it cannot drift silently — THIS file is that
// teeth: it runs inside `npm run test:unit`, which BOTH lint.yml's unit job
// and the gates job execute, so any command added to or removed from lint.yml
// without mirroring it into pages.yml reddens the deploy path itself.
//
// WHAT THIS FILE ASSERTS
// ----------------------
//   1. Non-vacuity: both workflow files parse as YAML and contain the jobs
//      the rest of this file reasons about.
//   2. The chain: build needs gates; deploy needs build. (Transitively, no
//      artifact promotion without green gates.)
//   3. The mirror law: the set of commands the gates job runs equals the set
//      lint.yml's lint + unit jobs run.
//   4. The audit gate is on the deploy path by name (`node
//      scripts/audit-gate.mjs`) — the headline security leg of M2.
//   5. No neutering vectors anywhere in pages.yml: no continue-on-error (job
//      or step level), no `|| true`, no forced `exit 0`.
//   6. The S268 skippability law carried into the mirror: every gate command
//      that `!cancelled()` guards in lint.yml must be likewise guarded in
//      the gates job, so an earlier failure can never hide a later verdict.
//   7. The conditional surface, job level: gates/build/deploy carry no `if:`
//      at all, or exactly `success()`. Anything else reddens — `if: always()`
//      resurrected `build` over red gates (M4 mutation: red audit, published
//      site, suite green); `if: false` silently un-deploys the chain.
//   8. The conditional surface, step level: every `if:` on a step in pages.yml
//      is exactly `!cancelled()` (or absent) — a guard, never a disable.
//      `if: false` on a gates step skipped the row while the job stayed green
//      (M7 mutation); because the whole normalized expression is matched,
//      disguises like `!cancelled() && false` cannot pass either.
//      (7 and 8 are the r2 close of review website__devops M-WEBSITE-02.)
//
// WHEN THIS FAILS
// ---------------
// Same rule as test/lint-gate.test.mjs: do not delete an assertion to go
// green. Either restore the mechanism, or pin whatever honestly replaces it
// just as tightly. In particular, never "fix" failure 2 or 5 by weakening the
// gates — that re-opens the exact hole this file exists to keep shut.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const PAGES_PATH = resolve(ROOT, '.github/workflows/pages.yml');
const LINT_PATH = resolve(ROOT, '.github/workflows/lint.yml');

const pagesText = readFileSync(PAGES_PATH, 'utf8');
const lintText = readFileSync(LINT_PATH, 'utf8');

// Strip `#` comment lines so text-level detectors cannot match their own
// explanation (and so a removed neuter cannot survive inside a comment
// about the old neuter). Same law as test/lint-gate.test.mjs.
const stripComments = (text) =>
  text
    .split('\n')
    .filter((l) => !/^\s*#/.test(l))
    .join('\n');

const pagesCode = stripComments(pagesText);
const lintCode = stripComments(lintText);

const pagesDoc = yaml.load(pagesText);
const lintDoc = yaml.load(lintText);

/** `on:` parses as the string 'on' (YAML 1.2 core schema); tolerate the YAML
 *  1.1 boolean form too so a future parser change cannot silently disable
 *  the trigger assertion instead of tripping it. */
const triggersOf = (doc) => doc.on ?? doc[true];

const jobIds = (doc) => Object.keys(doc.jobs ?? {});

/** Every `run:` command a job executes, trimmed and in file order. */
function runCommands(job, label) {
  assert.ok(job && Array.isArray(job.steps), `no parseable steps for job ${label}`);
  return job.steps
    .filter((s) => s && typeof s.run === 'string')
    .map((s) => s.run.trim());
}

/** The commands of `job` that are guarded by `if: ${{ !cancelled() }}`. */
function cancelledGuardedCommands(job) {
  if (!job || !Array.isArray(job.steps)) return [];
  return job.steps
    .filter((s) => s && typeof s.run === 'string' && String(s.if ?? '').includes('!cancelled()'))
    .map((s) => s.run.trim());
}

/** Normalize any GitHub Actions conditional to a comparable expression body:
 *  `${{ !cancelled() }}` and the bare `!cancelled()` (and the YAML booleans
 *  `true`/`false`) all collapse to their whitespace-stripped inner text; an
 *  absent `if:` collapses to '' — GitHub's implicit `success()` default.
 *  Whitespace is stripped so no brace/space formatting trick widens or narrows
 *  an allow-list match. */
function normalizedIf(value) {
  if (value === undefined || value === null) return '';
  const text = String(value).trim();
  const braced = text.match(/^\$\{\{([\s\S]*)\}\}$/);
  return (braced ? braced[1] : text).replace(/\s+/g, '');
}

test('the deploy workflows parse and contain the jobs this test reasons about', () => {
  // Non-vacuity: a check over an empty parse passes on nothing. Pin the
  // shapes first or every assertion below is theater.
  const pagesJobs = jobIds(pagesDoc);
  const lintJobs = jobIds(lintDoc);
  assert.ok(pagesJobs.length > 0, 'pages.yml parsed to zero jobs — the parse is broken');
  assert.ok(lintJobs.length > 0, 'lint.yml parsed to zero jobs — the parse is broken');
  for (const id of ['gates', 'build', 'deploy']) {
    assert.ok(pagesJobs.includes(id), `pages.yml has no \`${id}\` job`);
  }
  for (const id of ['lint', 'unit']) {
    assert.ok(lintJobs.includes(id), `lint.yml has no \`${id}\` job (mirror source vanished?)`);
  }
  assert.match(pagesCode, /deploy-pages@/, 'pages.yml no longer runs actions/deploy-pages at all');
});

test('pages deploy runs on pushes to master (gated), so the gates are on the live path', () => {
  const on = triggersOf(pagesDoc);
  assert.ok(on, 'pages.yml has no trigger block');
  const branches = [].concat(on.push?.branches ?? []);
  assert.ok(
    branches.includes('master'),
    'pages.yml no longer deploys on pushes to master — if the trigger moved, pin the new one here',
  );
});

test('build depends on gates and deploy depends on build — red gates never publish', () => {
  const needsOf = (id) => [].concat(pagesDoc.jobs[id]?.needs ?? []);
  assert.ok(
    needsOf('build').includes('gates'),
    'the build job must `needs: gates` — without it, an artifact is built and ' +
      'uploaded even while a quality gate is red (the exact M2 defect). ' +
      `build.needs = ${JSON.stringify(pagesDoc.jobs.build?.needs ?? null)}`,
  );
  assert.ok(
    needsOf('deploy').includes('build'),
    `the deploy job must depend on the gated build; deploy.needs = ${JSON.stringify(
      pagesDoc.jobs.deploy?.needs ?? null,
    )}`,
  );
});

test('the gates job mirrors lint.yml command-for-command', () => {
  const gateCommands = runCommands(pagesDoc.jobs.gates, 'pages.yml#gates');
  const mirrorSource = [
    ...runCommands(lintDoc.jobs.lint, 'lint.yml#lint'),
    ...runCommands(lintDoc.jobs.unit, 'lint.yml#unit'),
  ];
  assert.ok(
    gateCommands.length > 0 && mirrorSource.length > 0,
    'empty command set — one side of the mirror comparison is vacuous',
  );

  const missing = [...new Set(mirrorSource)].filter((c) => !gateCommands.includes(c));
  const extra = [...new Set(gateCommands)].filter((c) => !mirrorSource.includes(c));
  assert.deepEqual(
    missing,
    [],
    `lint.yml runs these gate commands but pages.yml's gates job does NOT: ${JSON.stringify(
      missing,
    )} — the deploy gate silently covers less than CI's own Lint workflow. Mirror them in.` +
      ` (If a command is genuinely undeployable as a gate, replace this test with one that ` +
      `pins the honest difference and says why.)`,
  );
  assert.deepEqual(
    extra,
    [],
    `the gates job runs commands lint.yml never runs: ${JSON.stringify(
      extra,
    )} — either mirror them INTO lint.yml or drop them from pages.yml; an undocumented ` +
      `divergence here is how a "gate" becomes folklore`,
  );
});

test('the npm-audit allow-list gate is on the publish path', () => {
  const gateCommands = runCommands(pagesDoc.jobs.gates, 'pages.yml#gates');
  assert.ok(
    gateCommands.includes('node scripts/audit-gate.mjs'),
    'scripts/audit-gate.mjs must run inside the gates job — M2 names the audit ' +
      'gate as the security leg production deploys must not outrun. Its raw exit ' +
      'law (0 pass / 1 unlisted advisory / 2 broken audit) is pinned by ' +
      'test/audit-gate.test.mjs; here it only has to BE ON THE PATH.',
  );
});

test('no neutering vectors anywhere in pages.yml', () => {
  // Structural: job- and step-level continue-on-error flags.
  for (const [jobId, job] of Object.entries(pagesDoc.jobs ?? {})) {
    assert.notEqual(
      job['continue-on-error'],
      true,
      `job ${jobId} carries continue-on-error — the a11y step of lint.yml ran ` +
        `broken-but-green for its entire life behind exactly this flag`,
    );
    for (const step of job.steps ?? []) {
      assert.notEqual(
        step['continue-on-error'],
        true,
        `step ${JSON.stringify(step.name ?? step.run ?? step.uses)} in ${jobId} carries ` +
          `continue-on-error — on the deploy path that means "publish anyway"`,
      );
    }
  }
  // Textual backstop over comment-stripped lines: shell-level swallow idioms
  // plus the flag, even if some future refactor hides them from the structural scan.
  assert.doesNotMatch(pagesCode, /continue-on-error/, 'pages.yml executable lines mention continue-on-error');
  assert.doesNotMatch(pagesCode, /\|\|\s*true/, 'pages.yml executable lines swallow an exit with `|| true`');
  assert.doesNotMatch(pagesCode, /;\s*exit\s+0/, 'pages.yml executable lines force a green exit');
});

test('S268 skippability law holds in the mirror', () => {
  // Every command lint.yml guards with !cancelled() must be guarded the same
  // way in gates — an unguarded mirror leg can be skipped by an earlier
  // failure, and a skipped step reports success. The gates job may guard MORE
  // (it runs lint and unit serially where lint.yml splits them into jobs),
  // never less.
  const guarded = new Set(cancelledGuardedCommands(lintDoc.jobs.lint));
  const gatesGuarded = new Set(cancelledGuardedCommands(pagesDoc.jobs.gates));
  for (const cmd of guarded) {
    assert.ok(
      gatesGuarded.has(cmd),
      `\`run: ${cmd}\` is !cancelled()-guarded in lint.yml but not in the gates job`,
    );
  }
  assert.ok(guarded.size >= 4, `expected lint.yml to guard at least 4 commands, found ${guarded.size}`);
});

// ─── Conditional-surface sweep (review website__devops M-WEBSITE-02, r2) ─────────
// The six laws above swept continue-on-error and shell-level swallows but left
// job- and step-level `if:` unguarded, and the review reproduced two silent
// neuters through that open surface — with the whole suite still green:
//   M4: `if: ${{ always() }}` on build → gates red (audit) → build still runs
//       → build green → deploy runs → site publishes behind a red security
//       gate. The needs: chain is bypassed, and no r1 law noticed.
//   M7: `if: ${{ false }}` on the gates "Format check" step → the step skips,
//       the job stays green, that gate evaporates. Invisible to the S268
//       parity test because format:check and test:unit are unguarded in
//       lint.yml, so their gates twins had nothing to match against.
// These two laws close the surface with allow-lists on the WHOLE normalized
// expression — a guard can never decay into a disable.

test('job-level if cannot neuter the needs chain (M4 law)', () => {
  // An absent `if:` is GitHub's default `success()` — run only when every
  // needed job succeeded. Exactly that pair is allowed, nothing else:
  //   `always()` → resurrects build/deploy over red gates (the M4 mutation);
  //   `false`    → a silent un-deploy — the chain becomes theater, and an
  //                editor could park production behind an invisible switch;
  //   any other form → a decision for deliberate re-pinning with review,
  //                never silent drift.
  const JOB_IF_ALLOWLIST = new Set(['', 'success()']);
  for (const id of ['gates', 'build', 'deploy']) {
    const job = pagesDoc.jobs[id];
    assert.ok(job && typeof job === 'object', `pages.yml has no \`${id}\` job to sweep`);
    const expr = normalizedIf(job.if);
    assert.ok(
      JOB_IF_ALLOWLIST.has(expr),
      `job \`${id}\` carries \`if: ${JSON.stringify(job.if)}\`. On the deploy path a job ` +
        `condition may only be absent or \`success()\`: anything else can run the job ` +
        `against its own needs verdict (review website__devops M-WEBSITE-02, M4). If a ` +
        `different form is genuinely needed, widen this allow-list deliberately and keep ` +
        `the chain test honest — never delete this law to go green.`,
    );
  }
});

test('every step-level if in pages.yml guards, never disables (M7 law)', () => {
  // Extends the S268 law from "commands lint.yml guards are guarded in gates"
  // to EVERY conditional on the deploy path: a step's `if:` may be absent or
  // exactly `!cancelled()` — the one form that guarantees the step still gets
  // its visible row after an earlier failure without forcing it past a
  // cancellation. `if: false` (the M7 mutation) and `if: always()` reddens
  // here, and because the whole normalized expression must match — not merely
  // contain — `!cancelled()`, disguises like `${{ !cancelled() && false }}`
  // cannot smuggle a disable inside a guard.
  const STEP_IF_ALLOWLIST = new Set(['', '!cancelled()']);
  for (const [jobId, job] of Object.entries(pagesDoc.jobs ?? {})) {
    assert.ok(Array.isArray(job.steps) && job.steps.length > 0, `job \`${jobId}\` has no steps to sweep`);
    for (const step of job.steps) {
      const expr = normalizedIf(step.if);
      assert.ok(
        STEP_IF_ALLOWLIST.has(expr),
        `step ${JSON.stringify(step.name ?? step.run ?? step.uses)} in job \`${jobId}\` carries ` +
          `\`if: ${JSON.stringify(step.if)}\`. Steps on the deploy path may only be guarded with ` +
          `\`if: \${{ !cancelled() }}\`; any other condition is a skip or a force, and a ` +
          `skippable gate row is theater instead of teeth (review website__devops ` +
          `M-WEBSITE-02, M7).`,
      );
    }
  }
});
