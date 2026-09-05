// Guard: `tools/gen-icons.mjs` must PRESERVE hand-authored `manifest.webmanifest`
// keys instead of clobbering the file wholesale.
//
// Run with `npm run test:unit` (`node --test "test/**/*.test.mjs"`), which the
// `unit` job in .github/workflows/lint.yml executes on every push and PR.
//
// WHY THIS FILE EXISTS (S426)
// ---------------------------
// The pre-fix manifest step built a fixed object and `writeFileSync`ed it over
// whatever was there. A run therefore WIPED the hand-authored keys that are
// live at pin 86510eb0 in 13 of the 61 tracked manifests — `orientation`
// (cyber-pursuit "any", nexus-core "portrait-primary", pastel-dreamscape
// "any"), `categories` + `lang` (cyber-pursuit, pastel-dreamscape), per-kit
// `description`s, absolute `start_url`s, custom icon arrays (cyber-pursuit's
// SVG `sizes: "any"` entry, inferno's SVG+PNG mix, nexus-core's 192/512 pair
// without the maskable entry), and hand hex casing like `#00F5FF`. No test
// covered the tool at all, so nothing went red when the next scheduled regen
// would have erased them.
//
// FIX UNDER TEST
// --------------
// `writeSiteManifest()` reads the existing file, parses it (a malformed file
// THROWS — never silently overwritten), preserves every authored key IN PLACE
// (order, casing, value), fills only ABSENT keys in canonical order, and
// overwrites only the icon-derived key the tool legitimately owns: `icons`.
// The full ownership rationale and its measured costs are documented on
// `writeSiteManifest` in tools/gen-icons.mjs.
//
// NON-VACUITY (both directions, per the step AC)
// ----------------------------------------------
//   * merge-away mutation: making `writeSiteManifest` ignore the parsed
//     existing manifest (i.e. reverting to the pre-fix wholesale write) turns
//     EVERY preservation assertion below RED — named in the report as
//     `preserves every hand-authored key and re-owns only icons`.
//   * over-preserve mutation: making `icons` fill-only (tool owns nothing)
//     also goes RED — the same test asserts icons IS re-written to the
//     canonical set, so the suite cannot pass by the tool simply giving up.
//   * fill-away mutation: the fresh-site test pins the canonical output
//     byte-for-byte, so gutting the defaults (or reordering keys) also goes
//     RED — nothing here passes merely because the tool stopped touching the
//     file altogether.
//
// WHY EVERY FIXTURE IS BUILT FRESH IN mkdtemp
// --------------------------------------------
// Same dev≠CI lesson `test/sitemap-source.test.mjs` records: this suite must
// be meaningful standalone on a clean checkout. `writeSiteManifest` is the
// tool's own manifest step — it parses, merges, serialises and writes real
// files — so calling it with `{ dryRun: false }` runs the production write
// path against the fixture, never against `sites/`.

import { after, test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { mergeManifest, parseExistingManifest, writeSiteManifest } from '../tools/gen-icons.mjs';

const tempRoots = [];
after(() => {
  for (const dir of tempRoots) rmSync(dir, { recursive: true, force: true });
});

/** A site dir with the inputs the manifest step reads: index.html (+ optional css). */
function makeSite({ title, themeColor, bg }) {
  const dir = mkdtempSync(join(tmpdir(), 'phlix-gen-icons-'));
  tempRoots.push(dir);
  const meta = themeColor ? `\n  <meta name="theme-color" content="${themeColor}" />` : '';
  writeFileSync(
    join(dir, 'index.html'),
    `<!doctype html>\n<html><head><title>${title}</title>${meta}</head><body></body></html>\n`,
  );
  if (bg) {
    mkdirSync(join(dir, 'css'), { recursive: true });
    writeFileSync(join(dir, 'css', 'base.css'), `:root {\n  --color-bg: ${bg};\n}\n`);
  }
  return dir;
}

const CANONICAL_ICONS = [
  { src: 'img/icon-192.png', sizes: '192x192', type: 'image/png' },
  { src: 'img/icon-512.png', sizes: '512x512', type: 'image/png' },
  { src: 'img/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
];

// ── 1. THE preservation test (the S426 red-name anchor) ─────────────────────
//
// Fixture mirrors nexus-core + cyber-pursuit: hand values on EVERY key the
// generator also fills, plus keys the generator never produces. The index.html
// is deliberately crafted to disagree with the authored manifest (different
// title, different theme colour) so a wholesale-clobber regression cannot hide
// behind input/output agreement. Expectation: only `icons` — the icon-derived
// key the tool owns — moves to the canonical set; every other byte, including
// key ORDER and hex casing, is the authored one.
test('writeSiteManifest preserves every hand-authored key and re-owns only icons', () => {
  const dir = makeSite({ title: 'Totally Different Title', themeColor: '#ABCDEF' });
  const authored = {
    name: 'Phlix',
    short_name: 'Phlix',
    description: 'The central hub where all media connects — your personal digital nexus.',
    start_url: '/nexus-core/',
    scope: './',
    display: 'standalone',
    background_color: '#1A1A2E',
    theme_color: '#00F5FF',
    orientation: 'portrait-primary',
    categories: ['multimedia', 'utilities'],
    lang: 'en',
    icons: [{ src: 'img/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
  const manifestPath = join(dir, 'manifest.webmanifest');
  writeFileSync(manifestPath, `${JSON.stringify(authored, null, 2)}\n`);

  writeSiteManifest(dir, { dryRun: false });

  // Whole-text equality against "authored, icons replaced in place": proves in
  // one assertion that every other key kept its value, its position and its
  // casing, and that icons — and only icons — was re-owned.
  assert.equal(
    readFileSync(manifestPath, 'utf8'),
    `${JSON.stringify({ ...authored, icons: CANONICAL_ICONS }, null, 2)}\n`,
  );

  // Named per-key assertions so a merge-away mutation fails loudly per key.
  const after1 = JSON.parse(readFileSync(manifestPath, 'utf8'));
  assert.equal(after1.orientation, 'portrait-primary', 'orientation clobbered');
  assert.deepEqual(after1.categories, ['multimedia', 'utilities'], 'categories clobbered');
  assert.equal(after1.lang, 'en', 'lang clobbered');
  assert.equal(after1.description, authored.description, 'description clobbered');
  assert.equal(after1.name, 'Phlix', 'name clobbered by title-derived rewrite');
  assert.equal(after1.start_url, '/nexus-core/', 'start_url clobbered');
  assert.equal(after1.theme_color, '#00F5FF', 'hand hex casing clobbered');
  assert.equal(after1.background_color, '#1A1A2E', 'hand background clobbered');
});

// ── 2. Fresh-site canonical output, byte-for-byte ───────────────────────────
//
// The no-manifest case must still produce exactly what the pre-fix tool wrote
// (this string is transcribed from the pre-fix object literal, which is also
// what the untouched live sites carry). Fills the "did the tool stop writing
// entirely?" vacuity hole that test 1 alone would leave open.
test('a site with no manifest gets the full canonical document, byte-for-byte', () => {
  const dir = makeSite({
    title: 'Phlix — Every Screen. Every Signal.',
    themeColor: '#0A0A12',
    bg: '#1A1A2E',
  });

  const expected = `${JSON.stringify(
    {
      name: 'Phlix — Every Screen. Every Signal.',
      short_name: 'Phlix',
      description: 'Self-hostable PHP media server.',
      start_url: './',
      scope: './',
      display: 'standalone',
      theme_color: '#0A0A12',
      background_color: '#1A1A2E',
      icons: CANONICAL_ICONS,
    },
    null,
    2,
  )}\n`;

  writeSiteManifest(dir, { dryRun: false });
  assert.equal(readFileSync(join(dir, 'manifest.webmanifest'), 'utf8'), expected);
});

// ── 3. Absent keys are filled, authored keys untouched ──────────────────────
//
// A real-world pattern: older manifests carry no `scope`/`icons`. The merge
// must APPEND missing keys in canonical order without disturbing what exists.
test('missing keys are appended in canonical order; present keys untouched', () => {
  const dir = makeSite({ title: 'Phlix', themeColor: '#111111' });
  const authored = { name: 'Phlix', orientation: 'any', lang: 'en' };
  const manifestPath = join(dir, 'manifest.webmanifest');
  writeFileSync(manifestPath, `${JSON.stringify(authored, null, 2)}\n`);

  const merged = writeSiteManifest(dir, { dryRun: false });

  assert.equal(merged.name, 'Phlix');
  assert.equal(merged.orientation, 'any', 'orientation clobbered');
  assert.equal(merged.lang, 'en', 'lang clobbered');
  assert.deepEqual(
    Object.keys(merged).filter((k) => ['scope', 'icons'].includes(k)),
    ['scope', 'icons'],
  );
  assert.equal(merged.scope, './');
  assert.deepEqual(merged.icons, CANONICAL_ICONS);
  // Round-trip on disk too.
  assert.deepEqual(JSON.parse(readFileSync(manifestPath, 'utf8')), merged);
});

// ── 4. Idempotence ───────────────────────────────────────────────────────────
test('running twice is a byte-for-byte no-op', () => {
  const dir = makeSite({ title: 'Phlix Nexus', themeColor: '#00F5FF' });
  const manifestPath = join(dir, 'manifest.webmanifest');
  writeSiteManifest(dir, { dryRun: false });
  const first = readFileSync(manifestPath, 'utf8');
  writeSiteManifest(dir, { dryRun: false });
  assert.equal(readFileSync(manifestPath, 'utf8'), first);
});

// ── 5. dryRun writes nothing ────────────────────────────────────────────────
test('dryRun returns the merge but leaves the file untouched', () => {
  const dir = makeSite({ title: 'Phlix', themeColor: '#123456' });
  const manifestPath = join(dir, 'manifest.webmanifest');
  const planted = '{"name":"Phlix","orientation":"landscape"}\n';
  writeFileSync(manifestPath, planted);

  const merged = writeSiteManifest(dir, { dryRun: true });
  assert.equal(merged.orientation, 'landscape');
  assert.equal(merged.scope, './');
  assert.equal(readFileSync(manifestPath, 'utf8'), planted, 'dryRun must not write');
});

// ── 6. Malformed manifest fails LOUD, and nothing is overwritten ────────────
test('a malformed manifest throws instead of being silently clobbered', () => {
  const dir = makeSite({ title: 'Phlix', themeColor: '#123456' });
  const manifestPath = join(dir, 'manifest.webmanifest');
  for (const bad of ['{not json', '[]', 'null', '"a string"']) {
    writeFileSync(manifestPath, bad);
    assert.throws(
      () => writeSiteManifest(dir, { dryRun: false }),
      /manifest\.webmanifest/,
      `expected a loud throw for ${bad}`,
    );
    assert.equal(readFileSync(manifestPath, 'utf8'), bad, 'a refused file must stay untouched');
  }
  // Control arm: the same directory with a VALID manifest parses fine, so the
  // throws above are caused by the bytes and nothing else.
  writeFileSync(manifestPath, '{"name":"Phlix"}\n');
  assert.deepEqual(parseExistingManifest(manifestPath), { name: 'Phlix' });
});

// ── 7. mergeManifest unit edges ──────────────────────────────────────────────
test('mergeManifest: existing keys win even when falsy, order is existing-first', () => {
  const merged = mergeManifest(
    { name: '', orientation: 'any', theme_color: '#00F5FF' },
    { name: 'Phlix — Generated', theme_color: '#000000', lang: 'en', orientation: 'any' },
  );
  assert.equal(merged.name, '', 'empty-string authored value must survive');
  assert.equal(merged.theme_color, '#00F5FF');
  assert.equal(merged.lang, 'en', 'absent key must be filled');
  assert.deepEqual(Object.keys(merged), ['name', 'orientation', 'theme_color', 'lang']);
});
