#!/usr/bin/env node
// gen-og.mjs — OFFLINE Open Graph PNG generator (run manually; output committed).
//
// For every variant that ships an `img/og.svg`, rasterise it to a real
// 1200x630 PNG at `sites/<slug>/img/og.png`. Social platforms
// (Twitter/Facebook/LinkedIn) do NOT render SVG share images, so B3 requires a
// committed raster PNG. The PNG is produced from the variant's own brand SVG so
// each family keeps its distinct OG art.
//
// This is a build-time/maintenance tool, NOT a runtime dependency: it shells out
// to ImageMagick `convert` (which uses its rsvg delegate). There is no Node image
// dependency and no browser/puppeteer dependency. Re-run it whenever an og.svg
// changes, then commit the regenerated PNGs.
//
//   node tools/gen-og.mjs
//
// Idempotent: re-running overwrites each og.png deterministically from its svg.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITES = join(ROOT, 'sites');

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

function have(bin) {
  try {
    execFileSync(bin, ['--version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Prefer rsvg-convert. ImageMagick 6 lists an rsvg delegate but still parses
// SVG with its own internal MSVG renderer, which mis-reads valid constructs —
// `fill="url(#noise)"` is taken for a colour named "noise" — and silently drops
// patterns and filters. librsvg implements the spec, so route through it and
// keep ImageMagick only as the fallback.
const HAVE_RSVG = have('rsvg-convert');
const HAVE_CONVERT = (() => {
  try {
    execFileSync('convert', ['-version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
})();

if (!HAVE_RSVG && !HAVE_CONVERT) {
  console.error(
    '[gen-og] no SVG rasteriser found. Install librsvg2-bin (preferred) or ImageMagick and re-run.',
  );
  process.exit(1);
}
if (!HAVE_RSVG) {
  console.warn(
    '[gen-og] rsvg-convert not found — falling back to ImageMagick, which cannot ' +
      'render SVG patterns/filters correctly. Install librsvg2-bin for faithful output.',
  );
}

/** Rasterise one sanitised SVG to an exactly OG_WIDTH x OG_HEIGHT PNG. */
function rasterize(srcPath, outPath) {
  if (HAVE_RSVG) {
    execFileSync('rsvg-convert', ['-w', String(OG_WIDTH), '-h', String(OG_HEIGHT), '-o', outPath, srcPath], {
      stdio: ['ignore', 'ignore', 'pipe'],
    });
    return;
  }
  // -background none keeps transparency where the SVG omits a fill; the brand
  // SVGs paint a full-bleed rect so the result is opaque. -density 192 renders
  // crisp text before the resize clamps to exactly OG_WIDTH x OG_HEIGHT.
  execFileSync(
    'convert',
    [
      '-background', 'none',
      '-density', '192',
      srcPath,
      '-resize', `${OG_WIDTH}x${OG_HEIGHT}`,
      '-extent', `${OG_WIDTH}x${OG_HEIGHT}`,
      '-strip',
      outPath,
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  );
}

const svgs = globSync('*/img/og.svg', { cwd: SITES }).sort();
if (svgs.length === 0) {
  console.error('[gen-og] no sites/*/img/og.svg found');
  process.exit(1);
}

// XML predefines only &amp; &lt; &gt; &quot; &apos; — an SVG with no DTD that
// writes &mdash; / &nbsp; / &bull; is invalid XML, and strict parsers (libxml2
// via librsvg) reject the whole document. Browsers are lenient, which is why
// these survived authoring. Map the named entities the kits actually use to
// numeric character references, which are always valid.
const NAMED_ENTITIES = {
  nbsp: 160, mdash: 8212, ndash: 8211, bull: 8226, hellip: 8230,
  lsquo: 8216, rsquo: 8217, ldquo: 8220, rdquo: 8221, times: 215,
  copy: 169, reg: 174, trade: 8482, deg: 176, middot: 183,
};

/**
 * Sanitise into a temp copy (never touching the committed source SVG):
 * named entities → numeric refs, then bare `&` → `&amp;` so literal
 * ampersands in text (e.g. "Windows & DLNA") still parse.
 */
function sanitizeSvg(svg) {
  const named = svg.replace(/&([a-zA-Z][a-zA-Z0-9]*);/g, (whole, name) => {
    if (name === 'amp' || name === 'lt' || name === 'gt' || name === 'quot' || name === 'apos') {
      return whole;
    }
    const cp = NAMED_ENTITIES[name];
    return cp ? `&#${cp};` : whole;
  });
  return named.replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;');
}

const tmp = mkdtempSync(join(tmpdir(), 'phlix-og-'));
let written = 0;
const failed = [];
try {
  for (const rel of svgs) {
    const svgPath = join(SITES, rel);
    const pngPath = svgPath.replace(/og\.svg$/, 'og.png');
    if (!existsSync(svgPath)) continue;

    const raw = readFileSync(svgPath, 'utf8');
    const safe = sanitizeSvg(raw);
    const srcForConvert = join(tmp, `${rel.replace(/[/\\]/g, '_')}`);
    writeFileSync(srcForConvert, safe, 'utf8');

    // -background none keeps transparency where the SVG omits a fill; the brand
    // SVGs paint a full-bleed rect so the result is opaque. -density 192 renders
    // crisp text before the resize clamps to exactly 1200x630.
    // One unrenderable SVG must not abort the batch — collect it and carry on,
    // so a single bad file can't leave the other 49 sites without an og.png.
    try {
      rasterize(srcForConvert, pngPath);
      written += 1;
    } catch (err) {
      failed.push({ rel, msg: String(err.stderr || err.message).trim().split('\n')[0] });
    }
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

console.log(`[gen-og] wrote ${written} og.png file(s) from ${svgs.length} svg(s)`);

if (failed.length) {
  console.error(`[gen-og] ${failed.length} SVG(s) failed to render:`);
  for (const f of failed) console.error(`  ✗ ${f.rel}: ${f.msg}`);
  console.error(
    '[gen-og] ImageMagick renders SVG through its rsvg delegate; without librsvg ' +
      'installed it falls back to an internal renderer that cannot handle ' +
      'patterns/filters. Install librsvg2-bin if these look renderable.',
  );
  process.exit(1);
}
