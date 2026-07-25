#!/usr/bin/env node
/**
 * tools/gen-icons.mjs
 *
 * Rasterises each site's `img/favicon.svg` into the PNG icon set browsers and
 * mobile launchers actually ask for, writes a per-site `manifest.webmanifest`,
 * and wires both into every page's <head>.
 *
 * WHY: every site shipped an SVG favicon and nothing else. Safari has never
 * supported SVG favicons for the tab, iOS home-screen bookmarks need an
 * `apple-touch-icon`, and Android/Chrome installability needs a manifest with
 * 192px and 512px icons. `ls sites/*&#47;img/*.webmanifest` matched nothing
 * repo-wide. Raised as a programme-scope finding in the cottagecore-bloom
 * round-1 review (item 26).
 *
 *   node tools/gen-icons.mjs                    # every site
 *   node tools/gen-icons.mjs --site <slug>       # one site
 *   node tools/gen-icons.mjs --dry-run
 *
 * Idempotent: PNGs are rewritten, and the <head> edit is skipped when the
 * manifest link is already present.
 *
 * Fonts: like `gen-og.mjs`, this rasterises through librsvg, which resolves
 * `font-family` via fontconfig. The pool's WOFF2 files are not installed
 * system-wide, so a favicon drawn with `<text>` in a brand face renders in a
 * fallback face. That is accepted here for the same reason it is accepted for
 * og.png — at 16-32px a single letterform is indistinguishable, and the SVG
 * (which browsers prefer where supported) still uses the real family. 19 of the
 * 50 favicons use `<text>`; if a kit needs exact letterforms at 512px, convert
 * that kit's glyph to a path in the SVG and re-run.
 *
 * @copyright Copyright (c) 2026 Joe Huss <detain@interserver.net>
 * @license   MIT
 */

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const SITES = join(ROOT, 'sites');

const argv = process.argv.slice(2);
const dryRun = argv.includes('--dry-run');
const siteFlag = argv.indexOf('--site');
const only = siteFlag === -1 ? null : argv[siteFlag + 1];

function have(bin) {
  try {
    execFileSync(bin, ['--version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}
if (!have('rsvg-convert')) {
  console.error('[gen-icons] rsvg-convert not found. Install librsvg2-bin and re-run.');
  process.exit(1);
}

/* The set, and why each exists:
 *   16/32  classic tab favicon; Safari still ignores SVG here
 *   180    apple-touch-icon, iOS home screen
 *   192    Android launcher / manifest minimum
 *   512    manifest maskable + splash, and the PWA install prompt requires it */
const PNGS = [
  { file: 'favicon-16x16.png', size: 16 },
  { file: 'favicon-32x32.png', size: 32 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
];

/** Pull a CSS custom property out of the site's own base.css `:root`. */
function cssVar(dir, name) {
  const p = join(dir, 'css', 'base.css');
  if (!existsSync(p)) return null;
  const m = readFileSync(p, 'utf8').match(new RegExp(`${name}:\\s*([^;]+);`));
  return m ? m[1].trim() : null;
}

/** `<meta name="theme-color">` — already per-kit and already correct. */
function themeColor(html) {
  const m = html.match(/<meta\s+name="theme-color"\s+content="([^"]+)"/i);
  return m ? m[1] : null;
}

/* The home page <title> is already the kit's own brand line and usually already
   contains "Phlix", so use it verbatim rather than prefixing — prefixing produced
   "Phlix — Phlix — Every Screen. Every Signal." Manifest `name` is what an
   installed launcher shows, so it should read like the site, not like a template. */
function appName(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  const t = m ? m[1].trim() : '';
  if (!t) return 'Phlix';
  return /phlix/i.test(t) ? t : `Phlix — ${t}`;
}

const slugs = only
  ? [only]
  : readdirSync(SITES)
      .filter((s) => existsSync(join(SITES, s, 'index.html')))
      .sort();

let pngCount = 0;
let headCount = 0;
let manifestCount = 0;
const skipped = [];

for (const slug of slugs) {
  const dir = join(SITES, slug);
  const svg = join(dir, 'img', 'favicon.svg');
  if (!existsSync(svg)) {
    skipped.push(`${slug}: no img/favicon.svg`);
    continue;
  }

  // ── PNGs ────────────────────────────────────────────────────────────────
  // One bad SVG must not abort the other 49. autumn-harvest shipped a favicon
  // whose banner was a CSS-style /* … */ block — not valid XML, so it rendered
  // nowhere and it killed the first run of this tool partway through.
  let rasterOk = true;
  for (const { file, size } of PNGS) {
    const out = join(dir, 'img', file);
    if (dryRun) {
      pngCount += 1;
      continue;
    }
    try {
      execFileSync(
        'rsvg-convert',
        [
          '--width',
          String(size),
          '--height',
          String(size),
          '--keep-aspect-ratio',
          '--background-color',
          'none',
          '--output',
          out,
          svg,
        ],
        { stdio: ['ignore', 'ignore', 'pipe'] },
      );
      pngCount += 1;
    } catch (e) {
      rasterOk = false;
      const why = String(e.stderr ?? e.message)
        .trim()
        .split('\n')[0];
      skipped.push(`${slug}: favicon.svg failed to rasterise — ${why}`);
      break;
    }
  }
  // No icons means no manifest and no <head> claim pointing at files that do not
  // exist; a broken favicon is better than four broken references to it.
  if (!rasterOk) continue;

  const indexHtml = readFileSync(join(dir, 'index.html'), 'utf8');
  const theme = themeColor(indexHtml) ?? cssVar(dir, '--color-primary') ?? '#000000';
  const bg = cssVar(dir, '--color-bg') ?? cssVar(dir, '--color-background') ?? theme;

  // ── manifest ────────────────────────────────────────────────────────────
  // Relative start_url/scope so the manifest works under the /phlix-website/
  // Pages prefix, at the repo root, and from a local dev server alike.
  const manifest = {
    name: appName(indexHtml),
    short_name: 'Phlix',
    description: 'Self-hostable PHP media server.',
    start_url: './',
    scope: './',
    display: 'standalone',
    theme_color: theme,
    background_color: bg,
    icons: [
      { src: 'img/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'img/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: 'img/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
  if (!dryRun) {
    writeFileSync(join(dir, 'manifest.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`);
  }
  manifestCount += 1;

  // ── <head> wiring, every page ───────────────────────────────────────────
  for (const page of readdirSync(dir).filter((f) => f.endsWith('.html'))) {
    const p = join(dir, page);
    let html = readFileSync(p, 'utf8');
    if (html.includes('rel="manifest"')) continue; // already wired

    const anchor = html.match(/[ \t]*<link rel="icon"[^>]*>\n/);
    if (!anchor) {
      skipped.push(`${slug}/${page}: no <link rel="icon"> to anchor to`);
      continue;
    }
    const indent = (anchor[0].match(/^[ \t]*/) ?? [''])[0];
    // 404.html is served from arbitrary paths under the root shim, which injects
    // a <base>; relative hrefs are therefore correct there too.
    const block =
      `${anchor[0]}` +
      `${indent}<link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32x32.png" />\n` +
      `${indent}<link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16x16.png" />\n` +
      `${indent}<link rel="apple-touch-icon" href="img/apple-touch-icon.png" />\n` +
      `${indent}<link rel="manifest" href="manifest.webmanifest" />\n`;
    html = html.replace(anchor[0], block);
    if (!dryRun) writeFileSync(p, html);
    headCount += 1;
  }
}

for (const s of skipped) console.log(`  ⚠ ${s}`);
console.log(
  `\n[gen-icons] ${dryRun ? 'would write' : 'wrote'} ${pngCount} PNG(s), ` +
    `${manifestCount} manifest(s), wired ${headCount} page head(s) across ${slugs.length} site(s)`,
);
