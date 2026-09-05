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
 * MANIFEST MERGE (S426): a manifest that already exists is AUTHORED DATA, not
 * build output. Each run reads it, keeps every key already present IN PLACE
 * (order, casing and values), fills only the keys the file lacks with the
 * tool's defaults, and overwrites ONLY the icon-derived key the tool owns
 * outright: `icons`. A site with no manifest still gets the full canonical
 * document, byte-for-byte as before this change. The ownership decision and
 * its measured costs are documented on `writeSiteManifest` below.
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

/** Canonical icon set the tool rasterises. Adopted by a manifest only when that key is absent. */
const ICONS = [
  { src: 'img/icon-192.png', sizes: '192x192', type: 'image/png' },
  { src: 'img/icon-512.png', sizes: '512x512', type: 'image/png' },
  { src: 'img/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
];

/**
 * Read and parse a site's existing manifest. Absent file → `{}` (fresh-site
 * case). Malformed file → a loud per-site throw: silently overwriting bytes we
 * could not parse is how authored data dies, so refuse instead of guessing.
 */
export function parseExistingManifest(path) {
  if (!existsSync(path)) return {};
  const raw = readFileSync(path, 'utf8');
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    throw new Error(
      `${path}: manifest.webmanifest is not valid JSON — refusing to merge into bytes we cannot read`,
      { cause: e },
    );
  }
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    const shape = Array.isArray(parsed)
      ? 'an array'
      : `a ${parsed === null ? 'null' : typeof parsed}`;
    throw new Error(
      `${path}: manifest.webmanifest parsed to ${shape}, not an object — refusing to merge`,
    );
  }
  return parsed;
}

/** Manifest keys derived from the icons the tool rasterises — owned outright. */
const ICON_DERIVED_KEYS = ['icons'];

/**
 * Spread `existing`, fill only the keys it lacks, and re-assert the
 * icon-derived keys. A non-icon key that is present is authored data (current
 * or stale) and the tool cannot tell those apart, so overwriting one is the
 * S426 clobber this function exists to prevent. Insertion order: existing keys
 * keep theirs, absent defaults append in canonical order — so a manifest that
 * started empty matches the pre-fix output byte-for-byte.
 */
export function mergeManifest(existing, defaults) {
  const merged = { ...existing };
  for (const key of Object.keys(defaults)) {
    if (!(key in merged) || ICON_DERIVED_KEYS.includes(key)) merged[key] = defaults[key];
  }
  return merged;
}

/** The tool's full default manifest for a site, derived from its own files. */
function manifestDefaults(dir) {
  const indexHtml = readFileSync(join(dir, 'index.html'), 'utf8');
  const theme = themeColor(indexHtml) ?? cssVar(dir, '--color-primary') ?? '#000000';
  const bg = cssVar(dir, '--color-bg') ?? cssVar(dir, '--color-background') ?? theme;
  // Relative start_url/scope so the manifest works under the /phlix-website/
  // Pages prefix, at the repo root, and from a local dev server alike.
  return {
    name: appName(indexHtml),
    short_name: 'Phlix',
    description: 'Self-hostable PHP media server.',
    start_url: './',
    scope: './',
    display: 'standalone',
    theme_color: theme,
    background_color: bg,
    icons: ICONS,
  };
}

/**
 * Read-merge-preserve one site's manifest (S426) and — unless `dryRun` — write
 * the result back.
 *
 * OWNERSHIP DECISION. The tool owns, outright, exactly the icon-derived keys —
 * today just `icons` (the PNG set the same run rasterises) — plus the file-side
 * outputs (PNGs on disk, <head> links). Every other manifest key is authored
 * data on an existing file: preserved in place, and used as a default ONLY for
 * a key the file lacks. Measured basis at pin 86510eb0: of 61 tracked
 * manifests, 13 carry hand-authored content the generator never produced — all
 * 13 a per-kit `description`, and all 13 an `icons` array of a pre-tool shape
 * (7 SVG-only, e.g. cyber-pursuit's absolute `/cyber-pursuit/img/favicon.svg`
 * sizes:any; neon-noir's 16/32 favicon pair; nexus-core's 192/512 pair without
 * the maskable entry; inferno's SVG+PNG mix; 2 sites with merged `purpose:
 * "any maskable"`), 3 add `orientation`, 2 add `categories` + `lang`, 2 use
 * absolute `start_url`s. Those 13 icon arrays are precisely what the PNG
 * raster this tool performs exists to replace — keeping a `sizes:"any"` SVG
 * entry would ship the un-installable manifest the tool's own header (and the
 * cottagecore-bloom review item 26) raised this fix for — so `icons` is
 * re-written even when present. Its new entries reference files the same run
 * rasterises, so references stay valid.
 *
 * MEASURED COSTS of NOT owning the rest, accepted deliberately:
 *   - `theme_color`/`background_color` recomputed from index.html/base.css no
 *     longer track later kit-colour edits on existing manifests — and hand
 *     casing like nexus-core's `#00F5FF` survives instead of being rewritten
 *     lowercase. The <head> theme-color meta remains the live tab colour.
 *   - `name`/`description`/`start_url` likewise freeze at authored values; a
 *     title or copy change needs the manifest key deleted to propagate.
 *   - Existing manifests missing `scope` (nexus-core, cyber-pursuit,
 *     pastel-dreamscape) gain `scope:"./"` on the next run — a no-op
 *     semantically: the spec default scope is the manifest's own directory,
 *     identical to "./".
 */
export function writeSiteManifest(dir, { dryRun = false } = {}) {
  const path = join(dir, 'manifest.webmanifest');
  const manifest = mergeManifest(parseExistingManifest(path), manifestDefaults(dir));
  if (!dryRun) {
    writeFileSync(path, `${JSON.stringify(manifest, null, 2)}\n`);
  }
  return manifest;
}

function main() {
  if (!have('rsvg-convert')) {
    console.error('[gen-icons] rsvg-convert not found. Install librsvg2-bin and re-run.');
    process.exit(1);
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

    // ── manifest ────────────────────────────────────────────────────────────
    // Read-merge-preserve (S426): never clobber authored keys; fill what's absent.
    // One unparseable manifest must not abort the other sites — same rule as the
    // autumn-harvest raster failure above: loud for this site, harmless to them.
    try {
      writeSiteManifest(dir, { dryRun });
    } catch (e) {
      skipped.push(`${slug}: ${e.message}`);
      continue;
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
}

// Importable seam: tests and tooling import the pure helpers above; the CLI
// legs (rsvg-convert probe, directory walk, writes) run only when invoked as
// `node tools/gen-icons.mjs`.
if (process.argv[1] && resolve(process.argv[1]) === new URL(import.meta.url).pathname) {
  main();
}
