// Guard: every sub-gate of the lint job must actually run and report.
//
// Run with `npm run test:unit` (`node --test "test/**/*.test.mjs"`), which the
// `unit` job in .github/workflows/lint.yml executes on every push and PR.
//
// WHY THIS FILE EXISTS
// --------------------
// `npm run lint` was `run-p lint:html lint:css lint:js`. **run-p kills its
// sibling tasks the moment one of them fails.** `lint:js` failed first on every
// run, so `lint:css` was killed about 4 seconds into a 17-second job and had
// NEVER ONCE COMPLETED. There were 0 green runs of the Lint workflow in the last
// 40, and behind the killed task sat 3859 stylelint errors across 448 files that
// nobody had ever seen — including 58 grid declarations that browsers were
// dropping outright.
//
// The same default hid two more steps: GitHub skips subsequent steps once one
// fails, so `npm audit` and the pa11y a11y step had never executed either.
// `continue-on-error: true` on the a11y step did nothing about that — it stops a
// FAILING step from failing the job, it does not make an unreached step run.
//
// Clearing the 3859 errors alone would have reset the trap rather than removed
// it: run-p would simply have gone on hiding whichever sibling failed second.
// So the aggregation was fixed too, in two places, and this file pins both.
//
// WHAT IT ASSERTS
// ---------------
//   1. `scripts.lint` still passes --continue-on-error to run-p, so a local
//      `npm run lint` runs all three linters instead of killing two of them.
//   2. .github/workflows/lint.yml runs the three linters as SEPARATE steps, so
//      each gets its own row in the checks UI and "never ran" is visible rather
//      than being indistinguishable from "ran and passed".
//   3. Each of those steps, plus npm audit and a11y, carries `!cancelled()`, so
//      an earlier failure cannot skip a later gate.
//   4. The workflow file was actually parsed. A check that matched nothing
//      passes every assertion it makes.
//
// WHEN THIS FAILS
// ---------------
// Do not delete the assertion. Either restore the flag/step, or — if the
// aggregation is being replaced with something better — replace these
// assertions with ones that pin the new mechanism just as tightly.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const pkg = JSON.parse(readFileSync(resolve(ROOT, 'package.json'), 'utf8'));
const workflow = readFileSync(resolve(ROOT, '.github/workflows/lint.yml'), 'utf8');

/** Strip `#` comments so a detector cannot match its own explanation. */
const workflowCode = workflow
  .split('\n')
  .filter((l) => !/^\s*#/.test(l))
  .join('\n');

const SUB_GATES = ['lint:html', 'lint:css', 'lint:js'];

test('the aggregate `lint` script does not let one linter kill the others', () => {
  const lint = pkg.scripts.lint;
  assert.ok(lint, 'package.json has no `lint` script at all');
  assert.match(
    lint,
    /\brun-p\b/,
    `the \`lint\` script no longer uses run-p (${lint}); if it was replaced, ` +
      `pin whatever replaced it here instead of deleting this test`,
  );
  assert.match(
    lint,
    /(--continue-on-error|(?:^|\s)-[a-z]*c[a-z]*(?:\s|$))/,
    `run-p without --continue-on-error KILLS sibling tasks on the first ` +
      `failure. That is the exact defect S268 fixed. Current script: ${lint}`,
  );
  for (const gate of SUB_GATES) {
    assert.ok(lint.includes(gate), `the \`lint\` script no longer runs ${gate}`);
  }
});

test('CI runs each linter as its own step, so a skipped one is visible', () => {
  // Non-vacuity first: prove the file really contains the job we think it does.
  assert.match(workflowCode, /^\s{2}lint:$/m, 'no `lint:` job found in lint.yml');
  const stepNames = [...workflowCode.matchAll(/^\s+- name: (.+)$/gm)].map((m) => m[1]);
  assert.ok(
    stepNames.length >= 6,
    `only ${stepNames.length} named steps parsed out of lint.yml — the parse is ` +
      `broken, so nothing below this line means anything`,
  );

  for (const gate of SUB_GATES) {
    const runs = [...workflowCode.matchAll(/^\s+run: npm run ([\w:]+)$/gm)].map((m) => m[1]);
    assert.ok(
      runs.includes(gate),
      `lint.yml has no step that runs \`npm run ${gate}\` on its own. Folding ` +
        `the three linters back into one \`npm run lint\` step is what made a ` +
        `killed sibling invisible for 40 consecutive runs.`,
    );
  }
});

test('no gate in the lint job can be skipped by an earlier failure', () => {
  // Split into step blocks on `- name:` / `- uses:` boundaries.
  const blocks = workflowCode.split(/^\s+- (?=name:|uses:|run:)/m).slice(1);
  assert.ok(blocks.length >= 6, `only ${blocks.length} step blocks parsed from lint.yml`);

  const mustNotBeSkippable = [
    'npm run lint:html',
    'npm run lint:css',
    'npm run lint:js',
    'npm audit',
    'npm run a11y',
  ];
  for (const cmd of mustNotBeSkippable) {
    const block = blocks.find((b) => b.includes(`run: ${cmd}`));
    assert.ok(block, `no step in lint.yml runs \`${cmd}\``);
    assert.match(
      block,
      /if:\s*\$\{\{\s*!cancelled\(\)\s*\}\}/,
      `the step running \`${cmd}\` has no \`if: \${{ !cancelled() }}\`, so a ` +
        `failure in any earlier step skips it — and a skipped step reports as ` +
        `success. \`npm audit\` and \`npm run a11y\` had never executed once for ` +
        `exactly this reason.`,
    );
  }
});
