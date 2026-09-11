// Guard: transitive dependencies patched out of published security advisories
// must never regress, in the lockfile, below their patched floor versions.
//
// Run with `npm run test:unit` (`node --test "test/**/*.test.mjs"`), which the
// `unit` job in .github/workflows/lint.yml executes on every push and PR.
//
// WHY THIS FILE EXISTS
// --------------------
// On 2026-09-09 the website `Lint` workflow turned red on its blocking
// `npm audit --audit-level=moderate` step without a single commit touching
// dependencies: two advisories were published against versions the lockfile
// already pinned (registry-side rot, per the S430/S432 lessons — a green audit
// gate is only a snapshot in time):
//
//   * js-yaml 4.0.0 - 4.3.1  — GHSA-2883-xcg3-v3hh (HIGH)
//     "maxTotalMergeKeys does not limit CPU use for empty merge sources".
//     Locked at 4.3.1; patched by 4.3.2, inside the repo's
//     `overrides["js-yaml"] = "^4.2.0"` range.
//   * colord <2.9.4          — GHSA-2wm5-q62r-hmrv (MODERATE)
//     "slow rejection of oversized malformed color strings".
//     Locked at 2.9.3 as stylelint's transitive `colord: ^2.9.3`; patched by
//     2.9.4, already inside the parent range.
//
// Both were fixed by lockfile-only in-range refreshes (`npm update js-yaml
// colord`), no package.json edits — the S430 discipline: in-range bumps first,
// `overrides` only when a parent range blocks resolution, never majors.
//
// WHAT THIS PINS
// --------------
// The audit leg catches a NEW advisory against a CURRENT resolution. It does
// not catch a human or tool reverting the lockfile entry for an ALREADY-patched
// advisory (an old branch merge, a hand-edit, a downgrade) — the floor was then
// silently gone until someone re-ran audit. This file pins the floors
// numerically so any such regression fails `unit` immediately, naming the GHSA
// ids that the bump paid for.
//
// KNOWN LIMITS (named, not implied away): this guard reads the top-level
// `packages["node_modules/<name>"]` entry only — a duplicate vulnerable copy
// nested at another path is caught by the CI audit leg, not here. And it
// compares FLOORS: it cannot know about advisories published after the floors
// below were re-derived (2026-09-11).
//
// NEGATIVE CONTROL (S345 rule 3 — a guard needs proof it can go red)
// -------------------------------------------------------------------
// The same gate function that reads the real lockfile is run here against a
// fabricated pre-patch lock (js-yaml 4.3.1, colord 2.9.3) and a lock missing
// either entry; every one of those must be refused. If you doubt the detector,
// delete a floor's entry from AUDIT_FLOORS and watch the file-count guard below
// go red.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Lane/step marker for the S472 audit-floor fix (premerge survival token).
const STEP_TOKEN = 'S472AUDFIXX9L3';

// Patched floors, re-derived 2026-09-11 against `npm audit --audit-level=moderate`
// at tip 9303026f. If you bump a package past its floor, fine — at or above is
// the assertion. If an advisory's fixed version changes, re-derive and raise
// the floor; do not lower it.
const AUDIT_FLOORS = [
  {
    pkg: 'js-yaml',
    floor: '4.3.2',
    ghsa: 'GHSA-2883-xcg3-v3hh',
    vulnerable: '4.0.0 - 4.3.1',
    why: 'maxTotalMergeKeys does not limit CPU use for empty merge sources',
  },
  {
    pkg: 'colord',
    floor: '2.9.4',
    ghsa: 'GHSA-2wm5-q62r-hmrv',
    vulnerable: '<2.9.4',
    why: 'slow rejection of oversized malformed color strings',
  },
];

/** Parse "major.minor.patch" strictly; anything else halts with a clear error. */
function semverParts(version, pkg) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  if (!match) {
    throw new Error(
      `cannot compare non "x.y.z" version ${JSON.stringify(version)} for ${pkg} in package-lock.json`,
    );
  }
  return match.slice(1).map(Number);
}

/** True iff `version` is at or above `floor`, numerically per segment. */
function isAtLeast(version, floor, pkg) {
  const [vMaj, vMin, vPat] = semverParts(version, pkg);
  const [fMaj, fMin, fPat] = semverParts(floor, pkg);
  return vMaj > fMaj || (vMaj === fMaj && (vMin > fMin || (vMin === fMin && vPat >= fPat)));
}

/**
 * The gate: return a list of refusal messages for `lock` (a parsed
 * package-lock.json-shaped object). Empty list = every floor met.
 */
function floorRefusals(lock) {
  const refusals = [];
  for (const { pkg, floor, ghsa, vulnerable, why } of AUDIT_FLOORS) {
    const entry = lock.packages?.[`node_modules/${pkg}`];
    if (!entry || typeof entry.version !== 'string') {
      refusals.push(
        `${pkg} has no resolvable version at node_modules/${pkg} in package-lock.json — ` +
          `the advisory floor ${floor} for ${ghsa} (${vulnerable}: ${why}) cannot be verified.`,
      );
      continue;
    }
    if (!isAtLeast(entry.version, floor, pkg)) {
      refusals.push(
        `package-lock.json resolves ${pkg} ${entry.version}, below the patched floor ${floor} ` +
          `required by ${ghsa} (${vulnerable}: ${why}). ` +
          `Restore the in-range bump (npm update ${pkg}); do NOT drop the audit leg.`,
      );
    }
  }
  return refusals;
}

test(`security audit floors are held in the lockfile [${STEP_TOKEN}]`, () => {
  const lock = JSON.parse(readFileSync(resolve(ROOT, 'package-lock.json'), 'utf8'));
  assert.equal(
    lock.lockfileVersion,
    3,
    'guard expects lockfileVersion 3 (node_modules/-keyed packages map); if the lock format ' +
      'changed, re-derive this reader instead of deleting it',
  );
  const refusals = floorRefusals(lock);
  assert.deepEqual(
    refusals,
    [],
    'vulnerable resolutions in package-lock.json:\n' + refusals.join('\n'),
  );
});

test('floor gate refuses the pre-patch lockfile (negative control)', () => {
  // Fabricated lock exactly as tip 9303026f measured it — both vulnerable.
  const prePatchLock = {
    packages: {
      'node_modules/js-yaml': { version: '4.3.1' },
      'node_modules/colord': { version: '2.9.3' },
    },
  };
  const refusals = floorRefusals(prePatchLock);
  assert.equal(refusals.length, 2, 'a lock with both packages below floor must be refused twice');
  assert.match(refusals.join('\n'), /GHSA-2883-xcg3-v3hh/);
  assert.match(refusals.join('\n'), /GHSA-2wm5-q62r-hmrv/);
});

test('floor gate refuses a lock missing an audited entry (silent-empty defence)', () => {
  const partial = { packages: { 'node_modules/colord': { version: '2.10.0' } } };
  const refusals = floorRefusals(partial);
  assert.equal(refusals.length, 1, 'a missing js-yaml entry must be a refusal, not a silent skip');
  assert.match(refusals[0], /js-yaml/);

  const empty = floorRefusals({ packages: {} });
  assert.equal(
    empty.length,
    AUDIT_FLOORS.length,
    'an empty packages map must produce exactly one refusal per audited floor, not a silent pass',
  );
  for (const { pkg, ghsa } of AUDIT_FLOORS) {
    assert.ok(
      empty.some((r) => r.includes(pkg) && r.includes(ghsa)),
      `empty lock must name ${pkg} / ${ghsa}`,
    );
  }
});

test('semver floor comparison is numeric, not lexical (comparator self-check)', () => {
  const yes = [
    ['2.10.0', '2.9.4'], // 2.10 > 2.9 — lexical compare would wrongly fail this
    ['4.3.2', '4.3.2'],
    ['4.10.0', '4.3.2'],
    ['5.0.0', '4.3.2'],
    ['2.9.4', '2.9.4'],
  ];
  const no = [
    ['2.9.3', '2.9.4'],
    ['4.3.1', '4.3.2'],
    ['4.2.9', '4.3.2'],
    ['3.14.0', '4.3.2'],
  ];
  for (const [version, floor] of yes) {
    assert.equal(isAtLeast(version, floor, 'selftest'), true, `${version} should satisfy >=${floor}`);
  }
  for (const [version, floor] of no) {
    assert.equal(isAtLeast(version, floor, 'selftest'), false, `${version} should NOT satisfy >=${floor}`);
  }
  assert.throws(() => isAtLeast('2.9.4-beta.1', '2.9.4', 'selftest'), /cannot compare/,
    'unknown version shapes must halt, not be guessed at');
});
