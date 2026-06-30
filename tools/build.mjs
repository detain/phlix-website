#!/usr/bin/env node
// Static build: copy each variants/<NN>-*/ into dist/<NN>-*/ and emit a
// top-level dist/index.html that lists every variant.
//
// While the variant directories are still empty placeholders, the build
// still produces a deployable dist/ so GH Pages and the pages.yml workflow
// have something to publish. Each variant is listed with its current state
// (built / placeholder) so visitors can see progress.

import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  readlinkSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { join, resolve } from 'node:path';
import { buildSitemap, robotsTxt, sitemapUrls } from './gen-sitemap.mjs';

/**
 * Simple CSS minifier - removes comments, collapses whitespace, optimizes.
 */
function minifyCss(css) {
  return css
    // Remove CSS comments (/* ... */)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove newlines and multiple spaces
    .replace(/\s+/g, ' ')
    // Remove space around { } : ; , >
    .replace(/\s*([{}:;,>])\s*/g, '$1')
    // Remove trailing semicolon before }
    .replace(/;}/g, '}')
    // Remove leading/trailing whitespace
    .trim();
}

const ROOT = process.cwd();
const SRC_VARIANTS = resolve(ROOT, 'variants');
const SRC_SHARED = resolve(ROOT, 'shared');
const DIST = resolve(ROOT, 'dist');

const brandKits = JSON.parse(readFileSync(resolve(SRC_SHARED, 'data/brand-kits.json'), 'utf8'));

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

const variantDirs = readdirSync(SRC_VARIANTS)
  .filter((name) => statSync(join(SRC_VARIANTS, name)).isDirectory())
  .sort();

const variantSummaries = variantDirs.map((slug) => {
  const src = join(SRC_VARIANTS, slug);
  const dst = join(DIST, slug);
  const hasIndex = existsSync(join(src, 'index.html'));
  if (hasIndex) {
    cpSync(src, dst, { recursive: true, dereference: true });
    fixSymlinks(dst);
    // Minify CSS files in the copied variant
    minifyCssDir(dst);
  } else {
    mkdirSync(dst, { recursive: true });
    writeFileSync(
      join(dst, 'index.html'),
      placeholderPage(slug, brandKits.variants?.[slug]),
      'utf8',
    );
  }
  return { slug, built: hasIndex, kit: brandKits.variants?.[slug] };
});

if (existsSync(resolve(SRC_SHARED, 'assets'))) {
  cpSync(resolve(SRC_SHARED, 'assets'), join(DIST, 'assets'), { recursive: true });
}

writeFileSync(join(DIST, 'index.html'), indexPage(variantSummaries), 'utf8');

// Sitemap of every page's canonical URL + robots.txt that references it.
const urls = sitemapUrls();
writeFileSync(join(DIST, 'sitemap.xml'), buildSitemap(urls), 'utf8');
writeFileSync(join(DIST, 'robots.txt'), robotsTxt(), 'utf8');

// Cloudflare Pages headers file (S4: Content-Security-Policy)
if (existsSync(resolve(ROOT, '_headers'))) {
  cpSync(resolve(ROOT, '_headers'), join(DIST, '_headers'));
}

console.log(
  `[build] wrote ${variantSummaries.length} variant(s) + index + sitemap (${urls.length} URLs) → ${DIST}`,
);
for (const v of variantSummaries) {
  console.log(`  ${v.built ? '✓' : '·'} ${v.slug}${v.built ? '' : ' (placeholder)'}`);
}

function indexPage(variants) {
  // The deployed gallery IS the hand-authored root index.html (the redesigned
  // variant preview). dist/ is the GitHub Pages publish root, so we inject the
  // real list of built variant folders as a manifest; the page renders from it
  // with root-relative (./<folder>/) paths. GitHub Pages has no directory
  // listing, so the page's runtime fetch('dist/') discovery cannot work there —
  // the manifest is the source of truth for what gets shown.
  const builtSlugs = variants.filter((v) => v.built).map((v) => v.slug);
  // Trim brand kits to only the fields the cards render, then inject alongside
  // the manifest: shared/data/ is not deployed, so the page cannot fetch the
  // kits in production — the injected copy is the source of truth there.
  const kits = {};
  for (const [slug, k] of Object.entries(brandKits.variants ?? {})) {
    kits[slug] = {
      name: k.name,
      variation: k.variation,
      personality: k.personality,
      colors: k.colors,
    };
  }
  const template = readFileSync(resolve(ROOT, 'index.html'), 'utf8');
  const inject =
    `<script>` +
    `window.__PHLIX_VARIANTS__=${JSON.stringify({ variants: builtSlugs })};` +
    `window.__PHLIX_BRAND_KITS__=${JSON.stringify(kits)};` +
    `</script>`;
  // Inject in <head> so it runs before the page's main inline script reads it.
  if (!template.includes('</head>')) {
    throw new Error('build: root index.html is missing a </head> to inject site data');
  }
  return template.replace('</head>', `  ${inject}\n</head>`);
}

function placeholderPage(slug, kit) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(kit?.name ?? slug)} — Phlix (placeholder)</title>
  <meta name="description" content="Placeholder page for the ${escapeHtml(slug)} variant of the Phlix website.">
  <style>
    body { font: 16px/1.5 system-ui, sans-serif; max-width: 40rem; margin: 4rem auto; padding: 0 1rem; }
    code { background: #0001; padding: 0.1rem 0.3rem; border-radius: 0.25rem; }
  </style>
</head>
<body>
  <h1>${escapeHtml(kit?.name ?? slug)}</h1>
  <p>This variant has not been built yet. See <code>docs/HANDOFF_PROMPT.md</code> for how to launch the builder pipeline.</p>
  <p><a href="../">← Back to variant index</a></p>
</body>
</html>
`;
}

function fixSymlinks(dir, distDir = DIST) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory() && !entry.isSymbolicLink()) {
      fixSymlinks(fullPath, distDir);
    } else if (entry.isSymbolicLink()) {
      const target = readlinkSync(fullPath);
      const resolvedTarget = resolve(dir, target);
      if (!resolvedTarget.startsWith(distDir)) {
        rmSync(fullPath);
        if (existsSync(resolvedTarget)) {
          if (statSync(resolvedTarget).isDirectory()) {
            cpSync(resolvedTarget, fullPath, { recursive: true, dereference: true });
          } else {
            cpSync(resolvedTarget, fullPath);
          }
        }
      }
    }
  }
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

/**
 * Recursively find and minify all CSS files in a directory.
 */
function minifyCssDir(dir) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      minifyCssDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.css')) {
      const css = readFileSync(fullPath, 'utf8');
      const minified = minifyCss(css);
      writeFileSync(fullPath, minified, 'utf8');
    }
  }
}
