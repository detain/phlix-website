// Guard: `stylelint --fix` must never strip a vendor prefix out of this repo again.
//
// Run with `npm run test:unit` (`node --test "test/**/*.test.mjs"`), which the
// `unit` job in .github/workflows/lint.yml executes on every push and PR.
//
// WHY THIS FILE EXISTS
// --------------------
// stylelint-config-standard turns on five rules that delete vendor prefixes:
//
//     property-no-vendor-prefix            -webkit-text-stroke, -webkit-background-clip, ...
//     value-no-vendor-prefix               image-rendering: -webkit-optimize-contrast
//     selector-no-vendor-prefix            ::-moz-selection, ::-webkit-scrollbar
//     media-feature-name-no-vendor-prefix  (-webkit-min-device-pixel-ratio: 2)
//     at-rule-no-vendor-prefix             @-webkit-keyframes
//
// Several of the prefixes here have NO unprefixed equivalent at all, so
// "unprefix it" is not a refactor, it is deletion of the effect:
//
//   * `-webkit-text-stroke`   — no standard property exists; the outline vanishes.
//   * `-webkit-background-clip: text` + `-webkit-text-fill-color: transparent` —
//     the canonical gradient-text pair; without them the text renders as a solid
//     block of the gradient's fallback colour.
//   * `::-webkit-scrollbar*`  — the only way to style a scrollbar in Chromium.
//   * `::-moz-selection`      — Firefox < 62 selection colour; sits deliberately
//     beside the unprefixed `::selection`, and stylelint reads the pair as a
//     redundancy rather than as a fallback.
//   * `(-webkit-min-device-pixel-ratio: 2)` — OR'd with `(resolution >= 192dpi)`
//     to catch older WebKit/Blink in retina queries.
//
// This has already happened once in this repo, which is why all five rules are
// `null` in .stylelintrc.json. The danger is that the config drifts back: at the
// time this test was written `lint:css` reported 3859 errors of which 3722 were
// `--fix`-able, and that is exactly the volume at which somebody runs a blind
// `--fix` and reviews the diff by its line count.
//
// WHAT IT ASSERTS
// ---------------
//   1. Every vendor-prefixed identifier that exists in sites/**/*.css today still
//      exists, at least as many times. A floor, not an equality: adding a site is
//      allowed, losing a prefix is not.
//   2. All five rules above are still `null` in .stylelintrc.json — the mechanism,
//      not just the symptom, so the config change reds BEFORE anyone runs --fix.
//   3. The scan actually read a plausible corpus. A check that silently inspects
//      zero files passes every assertion it makes; asserting the corpus size is
//      what makes a green here mean something.
//
// WHEN THIS FAILS
// ---------------
// Do NOT "fix" it by lowering a baseline number. Find out which prefix was
// removed and put it back. If the removal was genuinely intended (a site was
// deleted, or a prefix became truly obsolete), edit BASELINE in the same commit
// as the CSS change so the two are reviewed together.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Any `-webkit-`/`-moz-`/`-ms-`/`-o-` prefixed identifier. */
const PREFIXED_IDENT = /-(?:webkit|moz|ms|o)-[a-zA-Z0-9-]+/g;

/** The five stylelint rules whose autofix deletes vendor prefixes. */
const PREFIX_RULES = [
  'property-no-vendor-prefix',
  'value-no-vendor-prefix',
  'selector-no-vendor-prefix',
  'media-feature-name-no-vendor-prefix',
  'at-rule-no-vendor-prefix',
];

// Measured on 2026-08-07 at the S268 branch point, over 448 files: 952 prefixed
// identifiers, of which 842 are `-webkit-` and 110 are `-moz-`.
const BASELINE = {
  '-webkit-scrollbar-thumb': 184,
  '-webkit-font-smoothing': 114,
  '-webkit-text-size-adjust': 110,
  '-moz-osx-font-smoothing': 109,
  '-webkit-scrollbar': 93,
  '-webkit-scrollbar-track': 92,
  '-webkit-text-fill-color': 63,
  '-webkit-background-clip': 58,
  '-webkit-backdrop-filter': 49,
  '-webkit-details-marker': 47,
  '-webkit-text-stroke': 8,
  '-webkit-mask-image': 6,
  '-webkit-mask': 3,
  '-webkit-mask-composite': 3,
  '-webkit-overflow-scrolling': 3,
  '-webkit-appearance': 2,
  '-webkit-min-device-pixel-ratio': 2,
  '-moz-selection': 1,
  '-webkit-mask-position': 1,
  '-webkit-mask-repeat': 1,
  '-webkit-mask-size': 1,
  '-webkit-optimize-contrast': 1,
  '-webkit-user-select': 1,
};

/** Total occurrences of each bare prefix, as a plain substring count. */
const PREFIX_TOTALS = { '-webkit-': 842, '-moz-': 110 };

/** Files scanned when the baseline was taken. A large drop means a broken scan. */
const BASELINE_FILE_COUNT = 448;

function scan() {
  const files = globSync('sites/**/*.css', { cwd: ROOT }).sort();
  const idents = new Map();
  const totals = { '-webkit-': 0, '-moz-': 0, '-ms-': 0, '-o-': 0 };
  for (const rel of files) {
    const src = readFileSync(resolve(ROOT, rel), 'utf8');
    for (const tok of src.match(PREFIXED_IDENT) ?? []) {
      idents.set(tok, (idents.get(tok) ?? 0) + 1);
    }
    for (const p of Object.keys(totals)) totals[p] += src.split(p).length - 1;
  }
  return { files, idents, totals };
}

test('the CSS corpus is actually being scanned (non-vacuity)', () => {
  const { files, idents } = scan();
  assert.ok(
    files.length >= BASELINE_FILE_COUNT * 0.8,
    `only ${files.length} CSS files matched sites/**/*.css; the baseline was ` +
      `${BASELINE_FILE_COUNT}. Either the glob broke or the sites were deleted — ` +
      `every other assertion in this file is vacuous until that is explained.`,
  );
  assert.ok(
    idents.size > 0,
    'zero vendor-prefixed identifiers found in any CSS file — the regex or the ' +
      'file reader is broken, not the CSS.',
  );
});

test('no vendor-prefixed identifier has been stripped from sites/**/*.css', () => {
  const { idents } = scan();
  const missing = [];
  for (const [tok, floor] of Object.entries(BASELINE)) {
    const found = idents.get(tok) ?? 0;
    if (found < floor) missing.push(`${tok}: expected >= ${floor}, found ${found}`);
  }
  assert.deepEqual(
    missing,
    [],
    'Vendor prefixes disappeared from the CSS. This is what a blind ' +
      '`stylelint --fix` does, and several of these have no unprefixed ' +
      'equivalent, so the effect is gone, not modernised:\n  ' +
      missing.join('\n  '),
  );
});

test('the bare -webkit- and -moz- counts have not fallen', () => {
  const { totals } = scan();
  for (const [prefix, floor] of Object.entries(PREFIX_TOTALS)) {
    assert.ok(
      totals[prefix] >= floor,
      `${prefix} occurrences fell from ${floor} to ${totals[prefix]}.`,
    );
  }
});

test('.stylelintrc.json still disables all five vendor-prefix rules', () => {
  const cfg = JSON.parse(readFileSync(resolve(ROOT, '.stylelintrc.json'), 'utf8'));
  for (const rule of PREFIX_RULES) {
    assert.ok(
      rule in cfg.rules,
      `${rule} is missing from .stylelintrc.json, so stylelint-config-standard's ` +
        `default (on) applies and \`--fix\` will delete vendor prefixes.`,
    );
    assert.equal(
      cfg.rules[rule],
      null,
      `${rule} must stay null. Re-enabling it makes \`stylelint --fix\` delete ` +
        `vendor prefixes that have no unprefixed equivalent.`,
    );
  }
});
