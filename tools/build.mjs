#!/usr/bin/env node
// Static build: for every brand kit in brand-kits/*.js, copy its generated
// site (sites/<slug>/) into dist/<slug>/ and emit a top-level dist/index.html
// gallery that lists every brand kit — marking which ones have a built site
// and which are still awaiting generation.
//
// The gallery is the hand-authored root index.html. dist/ is the GitHub Pages
// publish root (GH Pages has no directory listing), so we inject the real list
// of brand kits — including whether each has a built site — as a manifest; the
// page renders its cards from that injected data with root-relative (./<slug>/)
// links.

import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  readlinkSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { SITE_URL, buildSitemap, robotsTxt, sitemapUrls } from './gen-sitemap.mjs';

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
const SRC_KITS = resolve(ROOT, 'brand-kits');
const SRC_SITES = resolve(ROOT, 'sites');
const SRC_SHARED = resolve(ROOT, 'shared');
const DIST = resolve(ROOT, 'dist');

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

// Discover every brand kit (brand-kits/*.js, excluding *.worklog.md etc.).
const kitFiles = readdirSync(SRC_KITS)
  .filter((name) => name.endsWith('.js') && !name.endsWith('.worklog.js'))
  .sort();

// Base path the Pages site is published under ('/phlix-website' for a project
// site, '' for a user/org site). The 404 shim needs it to strip the prefix off
// location.pathname before reading the kit slug.
const BASE_PATH = new URL(SITE_URL).pathname.replace(/\/+$/, '');

const kitSummaries = [];
const errorKits = {};
for (const file of kitFiles) {
  let kit;
  try {
    const mod = await import(pathToFileURL(join(SRC_KITS, file)).href);
    kit = mod.default ?? mod.brandKit;
  } catch (err) {
    console.warn(`[build] skipping ${file}: ${err.message}`);
    continue;
  }
  if (!kit || typeof kit !== 'object') {
    console.warn(`[build] skipping ${file}: no brand kit export`);
    continue;
  }

  const slug = kit.slug || basename(file, '.js');
  const siteSrc = join(SRC_SITES, slug);
  const built = existsSync(join(siteSrc, 'index.html'));

  if (built) {
    const dst = join(DIST, slug);
    cpSync(siteSrc, dst, { recursive: true, dereference: true, filter: keepInSite });
    fixSymlinks(dst);
    minifyCssDir(dst);
  }

  // Per-kit data for the root 404 shim: which kits own a themed 404 page, and
  // the recovery links / accent its generic fallback should use.
  const err = kit.error_page_experience || {};
  errorKits[slug] = {
    name: kit.name || slug,
    accent: kitAccent(kit),
    has404: built && existsSync(join(siteSrc, '404.html')),
    recovery_links: Array.isArray(err.recovery_links) ? err.recovery_links : [],
  };

  kitSummaries.push({
    slug,
    built,
    name: kit.name || slug,
    tagline: kit.tagline_primary || kit.tagline || '',
    personality: Array.isArray(kit.personality) ? kit.personality : [],
    archetype: kit.archetype || '',
    colors: kitColors(kit),
    accent: kitAccent(kit),
  });
}

// Sort: built sites first (alphabetical), then unbuilt (alphabetical).
kitSummaries.sort(
  (a, b) => Number(b.built) - Number(a.built) || a.slug.localeCompare(b.slug),
);

if (existsSync(resolve(SRC_SHARED, 'assets'))) {
  cpSync(resolve(SRC_SHARED, 'assets'), join(DIST, 'assets'), { recursive: true });
}

writeFileSync(join(DIST, 'index.html'), indexPage(kitSummaries), 'utf8');

// The single GitHub Pages 404 handler, plus the manifest its path-sniffing shim
// uses to hand off to each kit's own themed 404 page.
writeFileSync(join(DIST, '404.html'), errorPage(errorKits), 'utf8');

// Sitemap of every built site's canonical URLs + robots.txt that references it.
const urls = sitemapUrls();
writeFileSync(join(DIST, 'sitemap.xml'), buildSitemap(urls), 'utf8');
writeFileSync(join(DIST, 'robots.txt'), robotsTxt(), 'utf8');

// Cloudflare Pages headers file (S4: Content-Security-Policy)
if (existsSync(resolve(ROOT, '_headers'))) {
  cpSync(resolve(ROOT, '_headers'), join(DIST, '_headers'));
}

const builtCount = kitSummaries.filter((k) => k.built).length;
const themed404Count = Object.values(errorKits).filter((k) => k.has404).length;
console.log(
  `[build] ${kitSummaries.length} brand kit(s), ${builtCount} built site(s) + index + 404 shim ` +
    `(${themed404Count} themed) + sitemap (${urls.length} URLs) → ${DIST}`,
);
for (const k of kitSummaries) {
  console.log(`  ${k.built ? '✓' : '·'} ${k.slug}${k.built ? '' : ' (no site yet)'}`);
}

/**
 * Flatten a brand kit's nested colour groups into an ordered list of hex
 * strings for the gallery swatches / card accent tinting.
 */
function kitColors(kit) {
  const c = kit && kit.colors;
  if (!c || typeof c !== 'object') return [];
  const order = [
    'primary', 'secondary', 'tertiary', 'accent', 'neutral',
    'background', 'surface', 'surface_alt', 'text',
    'success', 'warning', 'error', 'info',
  ];
  const seen = new Set();
  const out = [];
  const push = (v) => {
    const hex = typeof v === 'string' ? v : v && typeof v === 'object' ? v.hex : null;
    if (typeof hex === 'string' && /^#[0-9a-f]{3,8}$/i.test(hex) && !seen.has(hex.toLowerCase())) {
      seen.add(hex.toLowerCase());
      out.push(hex);
    }
  };
  for (const key of order) if (c[key]) push(c[key]);
  return out;
}

/** Vivid card accent: the kit's primary, else secondary, else first colour. */
function kitAccent(kit) {
  const c = kit && kit.colors;
  const hex = (v) => (typeof v === 'string' ? v : v && v.hex) || null;
  return (c && (hex(c.primary) || hex(c.secondary))) || kitColors(kit)[0] || null;
}

// cpSync filter: keep the deployable site, drop authoring artifacts
// (BUILD_LOG.md / SITE.md / PROMPTS.md, any *.worklog.md, and reviews/ dirs).
function keepInSite(src) {
  const base = basename(src);
  if (base === 'reviews') return false;
  if (/\.worklog\.md$/i.test(base)) return false;
  if (base === 'BUILD_LOG.md' || base === 'SITE.md' || base === 'PROMPTS.md') return false;
  return true;
}

function indexPage(kits) {
  const template = readFileSync(resolve(ROOT, 'index.html'), 'utf8');
  const inject =
    `<script>` +
    `window.__PHLIX_KITS__=${JSON.stringify(kits)};` +
    `</script>`;
  // Inject in <head> so it runs before the page's main inline script reads it.
  if (!template.includes('</head>')) {
    throw new Error('build: root index.html is missing a </head> to inject site data');
  }
  return template.replace('</head>', `  ${inject}\n</head>`);
}

/**
 * The root 404.html — GitHub Pages serves exactly one per Pages site, so this
 * is the only error document the host will ever hand back. Its inline shim
 * reads the injected manifest, works out which kit the requested path belongs
 * to, and swaps in that kit's own sites/<slug>/404.html (URL preserved) or
 * renders a kit-tinted generic 404.
 */
function errorPage(kits) {
  const template = readFileSync(resolve(ROOT, '404.html'), 'utf8');
  if (!template.includes('</head>')) {
    throw new Error('build: root 404.html is missing a </head> to inject site data');
  }
  // The no-JS fallback link is hard-coded in 404.html; if site.url ever moves,
  // that link silently rots — fail the build instead.
  const fallbackHref = `href="${BASE_PATH}/"`;
  if (!template.includes(fallbackHref)) {
    throw new Error(
      `build: root 404.html no-JS gallery link does not match site.url base path ` +
        `(expected ${fallbackHref} for ${SITE_URL})`,
    );
  }
  const inject =
    `<script>` +
    `window.__PHLIX_404__=${JSON.stringify({ base: BASE_PATH, kits })};` +
    `</script>`;
  return template.replace('</head>', `  ${inject}\n</head>`);
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
