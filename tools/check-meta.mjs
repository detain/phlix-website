#!/usr/bin/env node
// check-meta.mjs — per-page SEO/social meta-correctness test (Step Q5).
//
//   node tools/check-meta.mjs
//
// FAILS (exit 1) on the pre-fix tree (proving it catches B1/B2/B3); PASSES after
// tools/fix-meta.mjs has run. Wired into `npm run meta` and `npm test`.
//
// For every variants/<slug>/<page>.html it asserts:
//   1. exactly one  <link rel="canonical">, og:url, og:image, twitter:image
//   2. canonical === og:url
//   3. both absolute, start with  <site.url>/<slug>/  and end with the correct
//      page ('' for index.html else '<page>.html')
//   4. NO two distinct files share a canonical URL  (B1 collision detector)
//   5. og:image / twitter:image absolute and end with .png  (not .svg/relative)
//   6. twitter:card === summary_large_image
//
// Parsing: focused regex over the in-tree HTML (no new runtime dependency).

import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const VARIANTS = join(ROOT, 'variants');

const content = JSON.parse(readFileSync(join(ROOT, 'shared', 'content.json'), 'utf8'));
const SITE_URL = String(content.site.url).replace(/\/+$/, '');

/** All elements matching a regex, with their `content`/`href` attribute value extracted. */
function findAll(html, elementRe, attr) {
  const out = [];
  const re = new RegExp(elementRe.source, 'gis');
  let m;
  while ((m = re.exec(html)) !== null) {
    const el = m[0];
    const am = el.match(new RegExp(`\\b${attr}=("|')([^"']*)\\1`, 'i'));
    out.push(am ? am[2] : null);
  }
  return out;
}

const errors = [];
const canonicalOwners = new Map(); // canonical URL -> first file that claimed it

const files = globSync('*/*.html', { cwd: VARIANTS }).sort();
if (files.length === 0) {
  console.error('[check-meta] no variants/*/*.html files found');
  process.exit(1);
}

for (const rel of files) {
  const [slug, file] = rel.split('/');
  const html = readFileSync(join(VARIANTS, rel), 'utf8');
  const fail = (msg) => errors.push(`${rel}: ${msg}`);

  const canonicals = findAll(html, /<link\b[^>]*\brel=("|')canonical\1[^>]*>/, 'href');
  const ogUrls = findAll(html, /<meta\b[^>]*\bproperty=("|')og:url\1[^>]*>/, 'content');
  const ogImages = findAll(html, /<meta\b[^>]*\bproperty=("|')og:image\1[^>]*>/, 'content');
  const twImages = findAll(html, /<meta\b[^>]*\bname=("|')twitter:image\1[^>]*>/, 'content');
  const twCards = findAll(html, /<meta\b[^>]*\bname=("|')twitter:card\1[^>]*>/, 'content');

  // (1) exactly one of each
  if (canonicals.length !== 1) fail(`expected 1 canonical, found ${canonicals.length}`);
  if (ogUrls.length !== 1) fail(`expected 1 og:url, found ${ogUrls.length}`);
  if (ogImages.length !== 1) fail(`expected 1 og:image, found ${ogImages.length}`);
  if (twImages.length !== 1) fail(`expected 1 twitter:image, found ${twImages.length}`);
  if (twCards.length !== 1) fail(`expected 1 twitter:card, found ${twCards.length}`);

  const canonical = canonicals[0];
  const ogUrl = ogUrls[0];
  const ogImage = ogImages[0];
  const twImage = twImages[0];
  const twCard = twCards[0];

  // expected values
  const base = `${SITE_URL}/${slug}/`;
  const expectedCanonical = file === 'index.html' ? base : `${base}${file}`;
  const expectedImage = `${base}img/og.png`;

  // (2) canonical === og:url
  if (canonical != null && ogUrl != null && canonical !== ogUrl) {
    fail(`canonical (${canonical}) !== og:url (${ogUrl})`);
  }

  // (3) canonical absolute + correct slug segment + correct page
  if (canonical != null && canonical !== expectedCanonical) {
    fail(`canonical "${canonical}" !== expected "${expectedCanonical}"`);
  }
  if (ogUrl != null && ogUrl !== expectedCanonical) {
    fail(`og:url "${ogUrl}" !== expected "${expectedCanonical}"`);
  }

  // (4) collision detector
  if (canonical != null) {
    if (canonicalOwners.has(canonical)) {
      fail(`canonical "${canonical}" collides with ${canonicalOwners.get(canonical)}`);
    } else {
      canonicalOwners.set(canonical, rel);
    }
  }

  // (5) og/twitter image absolute + .png
  for (const [label, val] of [
    ['og:image', ogImage],
    ['twitter:image', twImage],
  ]) {
    if (val == null) continue;
    if (!/^https?:\/\//i.test(val)) fail(`${label} "${val}" is not absolute`);
    if (!/\.png$/i.test(val)) fail(`${label} "${val}" does not end with .png`);
    if (val !== expectedImage) fail(`${label} "${val}" !== expected "${expectedImage}"`);
  }

  // (6) twitter:card
  if (twCard != null && twCard !== 'summary_large_image') {
    fail(`twitter:card "${twCard}" !== "summary_large_image"`);
  }
}

if (errors.length) {
  console.error(`[check-meta] FAIL — ${errors.length} problem(s) across ${files.length} file(s):`);
  for (const e of errors.slice(0, 200)) console.error(`  ✗ ${e}`);
  if (errors.length > 200) console.error(`  … and ${errors.length - 200} more`);
  process.exit(1);
}

console.log(`[check-meta] OK — ${files.length} html file(s) have correct per-page meta`);
