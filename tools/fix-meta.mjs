#!/usr/bin/env node
// fix-meta.mjs — idempotent per-page SEO/social meta rewriter (Steps B1+B2+B3).
//
//   node tools/fix-meta.mjs
//
// For every `sites/<slug>/<page>.html` this derives the CORRECT meta values
// from the file path + shared/content.json and rewrites the <head> in place:
//
//   base       = <site.url>/<slug>/
//   canonical  = og:url = base                 (for index.html — trailing slash)
//              = base + "<page>.html"          (for every other page)
//   og:image   = twitter:image = base + "img/og.png"   (absolute, real PNG)
//   twitter:card = summary_large_image
//
// The core B1/B2 fix is that canonical/og:url MUST include the "<slug>/"
// segment — the hand-authored pages omit it (or, in one family, inject a bogus
// "/sites/" segment). og:image was a relative ".svg" (B3) → blank share
// cards; we point it at the committed 1200x630 PNG produced by tools/gen-og.mjs.
//
// Idempotent + formatting-agnostic: each target tag is matched by attribute
// (canonical / og:url / og:image / twitter:image / twitter:card). If the tag
// already carries the correct value it is left BYTE-for-byte untouched, so
// re-running after prettier re-wraps tags is a no-op. A wrong value is rewritten
// (single-line; prettier normalises wrapping afterwards); a missing tag is
// inserted into <head>.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITES = join(ROOT, 'sites');

const content = JSON.parse(readFileSync(join(ROOT, 'shared', 'content.json'), 'utf8'));
const SITE_URL = String(content.site.url).replace(/\/+$/, ''); // no trailing slash

/** Derive the canonical/og:url and og image URL for a sites/<slug>/<page>.html file. */
export function derive(slug, file) {
  const base = `${SITE_URL}/${slug}/`;
  const isIndex = file === 'index.html';
  const canonical = isIndex ? base : `${base}${file}`;
  const ogImage = `${base}img/og.png`;
  return { canonical, ogImage };
}

/**
 * Replace the value of (or insert) a single head element.
 *  - matcher: a RegExp that matches the WHOLE element (incl. across newlines).
 *  - valueAttr: the attribute carrying the value (`href` or `content`).
 *  - desired: the correct value.
 *  - element: the canonical single-line element string to write.
 *
 * Value-aware: if the element already exists AND already carries the desired
 * value it is left untouched (true idempotency, even after prettier re-wraps).
 */
function upsert(html, matcher, valueAttr, desired, element) {
  const m = html.match(matcher);
  if (m) {
    const cur = m[0].match(new RegExp(`\\b${valueAttr}=("|')([^"']*)\\1`, 'i'));
    if (cur && cur[2] === desired) return html; // already correct → no diff
    return html.replace(matcher, element);
  }
  // insert just before </head>, preserving indentation of the closing tag
  return html.replace(/([ \t]*)<\/head>/i, `    ${element}\n$1</head>`);
}

function fixHtml(html, slug, file) {
  const { canonical, ogImage } = derive(slug, file);

  // <link rel="canonical" ... > — match element regardless of attr order / line wraps
  html = upsert(
    html,
    /<link\b[^>]*\brel=("|')canonical\1[^>]*>/is,
    'href',
    canonical,
    `<link rel="canonical" href="${canonical}" />`,
  );

  // <meta property="og:url" ...>
  html = upsert(
    html,
    /<meta\b[^>]*\bproperty=("|')og:url\1[^>]*>/is,
    'content',
    canonical,
    `<meta property="og:url" content="${canonical}" />`,
  );

  // <meta property="og:image" ...>
  html = upsert(
    html,
    /<meta\b[^>]*\bproperty=("|')og:image\1[^>]*>/is,
    'content',
    ogImage,
    `<meta property="og:image" content="${ogImage}" />`,
  );

  // <meta name="twitter:image" ...>
  html = upsert(
    html,
    /<meta\b[^>]*\bname=("|')twitter:image\1[^>]*>/is,
    'content',
    ogImage,
    `<meta name="twitter:image" content="${ogImage}" />`,
  );

  // <meta name="twitter:card" ...> → summary_large_image
  html = upsert(
    html,
    /<meta\b[^>]*\bname=("|')twitter:card\1[^>]*>/is,
    'content',
    'summary_large_image',
    `<meta name="twitter:card" content="summary_large_image" />`,
  );

  return html;
}

const files = globSync('*/*.html', { cwd: SITES }).sort();
let changed = 0;
for (const rel of files) {
  const [slug, file] = rel.split('/');
  const abs = join(SITES, rel);
  const before = readFileSync(abs, 'utf8');
  const after = fixHtml(before, slug, file);
  if (after !== before) {
    writeFileSync(abs, after, 'utf8');
    changed += 1;
  }
}

console.log(`[fix-meta] rewrote ${changed} / ${files.length} html file(s)`);
