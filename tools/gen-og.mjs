#!/usr/bin/env node
// gen-og.mjs — OFFLINE Open Graph PNG generator (run manually; output committed).
//
// For every variant that ships an `img/og.svg`, rasterise it to a real
// 1200x630 PNG at `variants/<slug>/img/og.png`. Social platforms
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
const VARIANTS = join(ROOT, 'variants');

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

function haveConvert() {
  try {
    execFileSync('convert', ['-version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

if (!haveConvert()) {
  console.error(
    '[gen-og] ImageMagick `convert` not found on PATH. Install ImageMagick (with its rsvg/svg delegate) and re-run.',
  );
  process.exit(1);
}

const svgs = globSync('*/img/og.svg', { cwd: VARIANTS }).sort();
if (svgs.length === 0) {
  console.error('[gen-og] no variants/*/img/og.svg found');
  process.exit(1);
}

// Escape bare ampersands (not already part of an entity) so ImageMagick's XML
// parser accepts SVGs that contain literal `&` in text (e.g. "Windows & DLNA").
// We sanitise into a temp copy and never touch the committed source SVG.
function sanitizeSvg(svg) {
  return svg.replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;');
}

const tmp = mkdtempSync(join(tmpdir(), 'phlix-og-'));
let written = 0;
try {
  for (const rel of svgs) {
    const svgPath = join(VARIANTS, rel);
    const pngPath = svgPath.replace(/og\.svg$/, 'og.png');
    if (!existsSync(svgPath)) continue;

    const raw = readFileSync(svgPath, 'utf8');
    const safe = sanitizeSvg(raw);
    const srcForConvert = join(tmp, `${rel.replace(/[/\\]/g, '_')}`);
    writeFileSync(srcForConvert, safe, 'utf8');

    // -background none keeps transparency where the SVG omits a fill; the brand
    // SVGs paint a full-bleed rect so the result is opaque. -density 192 renders
    // crisp text before the resize clamps to exactly 1200x630.
    execFileSync('convert', [
      '-background',
      'none',
      '-density',
      '192',
      srcForConvert,
      '-resize',
      `${OG_WIDTH}x${OG_HEIGHT}`,
      '-extent',
      `${OG_WIDTH}x${OG_HEIGHT}`,
      '-strip',
      pngPath,
    ]);
    written += 1;
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

console.log(`[gen-og] wrote ${written} og.png file(s) from ${svgs.length} svg(s)`);
