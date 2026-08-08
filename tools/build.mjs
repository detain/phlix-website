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
  return (
    css
      // Remove CSS comments (/* ... */)
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove newlines and multiple spaces
      .replace(/\s+/g, ' ')
      // Remove space around { } : ; , >
      .replace(/\s*([{}:;,>])\s*/g, '$1')
      // Remove trailing semicolon before }
      .replace(/;}/g, '}')
      // Remove leading/trailing whitespace
      .trim()
  );
}

const ROOT = process.cwd();
const SRC_KITS = resolve(ROOT, 'brand-kits');
const SRC_SITES = resolve(ROOT, 'sites');
const SRC_SHARED = resolve(ROOT, 'shared');
const DIST = resolve(ROOT, 'dist');

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

// Discover every brand kit (brand-kits/*.js, excluding *.worklog.md etc.).
//
// `kitFiles` is the DENOMINATOR for everything below: the set of kits that are
// supposed to exist, read off the filesystem before a single one is imported.
// It must never be recomputed from, filtered by, or intersected with the set of
// kits that successfully loaded — that is precisely the bug this block replaced.
// The build used to `console.warn` + `continue` past an unloadable kit and then
// report `kitSummaries.length` — a count of what LOADED. Three broken kits
// (event-horizon.js: a syntax error; stellar-command.js and terraform.js: CJS
// exports in a "type": "module" package, so an empty namespace) turned 79 files
// into a perfectly self-consistent "76 brand kit(s), 76 built site(s)", exit 0,
// for months. All three had a complete site/ subtree that was never deployed.
const kitFiles = readdirSync(SRC_KITS)
  .filter((name) => name.endsWith('.js') && !name.endsWith('.worklog.js'))
  .sort();

// ...and the glob alone is still not enough. A count taken from the directory
// self-adjusts to a DELETION: remove a kit file and 78-found/78-loaded/78-built
// agrees with itself just as happily as 76/76/76 did. So the glob is checked
// against a pin that is NOT derived from the directory — brand-kits/expected-kits.json,
// hand-maintained, no regeneration flag. That file is what makes a missing kit
// detectable at all.
const EXPECTED = JSON.parse(readFileSync(resolve(SRC_KITS, 'expected-kits.json'), 'utf8'));
{
  const expected = EXPECTED.kits;
  if (!Array.isArray(expected) || expected.length === 0) {
    throw new Error('build: brand-kits/expected-kits.json has no "kits" array — the pin is vacuous');
  }
  if (expected.length !== EXPECTED.count) {
    throw new Error(
      `build: brand-kits/expected-kits.json is internally inconsistent — ` +
        `"count" says ${EXPECTED.count} but "kits" lists ${expected.length}`,
    );
  }
  // Exact set comparison, both directions. Never a substring or a bare count:
  // a rename is a deletion plus an addition and must not cancel out.
  const onDisk = new Set(kitFiles);
  const pinned = new Set(expected);
  const missing = expected.filter((f) => !onDisk.has(f));
  const unpinned = kitFiles.filter((f) => !pinned.has(f));
  if (missing.length || unpinned.length) {
    const lines = [
      `build: brand-kits/*.js does not match the pin in brand-kits/expected-kits.json`,
      `  pinned:  ${expected.length}`,
      `  on disk: ${kitFiles.length}`,
    ];
    if (missing.length) {
      lines.push(`  MISSING from disk (${missing.length}): ${missing.join(', ')}`);
    }
    if (unpinned.length) {
      lines.push(`  NOT in the pin (${unpinned.length}): ${unpinned.join(', ')}`);
    }
    lines.push(
      `  If this change is intentional, update brand-kits/expected-kits.json ("kits" AND "count").`,
    );
    throw new Error(lines.join('\n'));
  }
}

// Base path the Pages site is published under ('/phlix-website' for a project
// site, '' for a user/org site). The 404 shim needs it to strip the prefix off
// location.pathname before reading the kit slug.
const BASE_PATH = new URL(SITE_URL).pathname.replace(/\/+$/, '');

const kitSummaries = [];
const errorKits = {};
// Every kit that could not be turned into a usable object, with the reason.
// Collected rather than thrown on first sight so one run reports ALL of them;
// three separate red builds to find three broken kits is how they accumulate.
const loadFailures = [];
for (const file of kitFiles) {
  let kit;
  try {
    const mod = await import(pathToFileURL(join(SRC_KITS, file)).href);
    kit = mod.default ?? mod.brandKit;
  } catch (err) {
    loadFailures.push({ file, reason: `${err.constructor.name}: ${err.message}` });
    continue;
  }
  if (!kit || typeof kit !== 'object') {
    loadFailures.push({
      file,
      reason:
        'no brand kit export — expected `export default <kit>` or `export { brandKit }`. ' +
        'This package is "type": "module", so `module.exports` / `window.X` export nothing.',
    });
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

// A kit that will not load is a BUILD FAILURE, not a warning. It means a site
// listed in the README silently stops being published while the build still
// exits 0 and reports a number that agrees with itself.
if (loadFailures.length) {
  const lines = [
    `build: ${loadFailures.length} of ${kitFiles.length} brand kit(s) in brand-kits/ could not be loaded:`,
    ...loadFailures.map(({ file, reason }) => `  ✗ ${file}: ${reason}`),
    `Fix the kit(s) above, or remove them from brand-kits/ AND from brand-kits/expected-kits.json.`,
  ];
  throw new Error(lines.join('\n'));
}

// The invariant that keeps the reported number honest: one summary per file
// found on disk. `kitFiles.length` came from readdirSync, `kitSummaries.length`
// from the import loop, and they are compared rather than one being derived
// from the other. Unreachable while `loadFailures` is empty and the loop
// `continue`s only on a recorded failure — which is the point: if a future edit
// adds a third way to skip a kit, this is what catches it.
if (kitSummaries.length !== kitFiles.length) {
  throw new Error(
    `build: kit accounting mismatch — ${kitFiles.length} kit file(s) on disk but ` +
      `${kitSummaries.length} summarised. A kit was dropped without being recorded as a failure.`,
  );
}

// Sort: built sites first (alphabetical), then unbuilt (alphabetical).
kitSummaries.sort((a, b) => Number(b.built) - Number(a.built) || a.slug.localeCompare(b.slug));

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

// Independent confirmation that the sites claimed as built are actually on disk
// in dist/. `builtCount` is the loop's own bookkeeping; this re-reads dist/ and
// counts directories that really contain an index.html. If cpSync ever fails
// quietly, or a filter drops the entry file, the two disagree and the build reds
// instead of announcing sites that were never emitted.
const emittedSiteDirs = readdirSync(DIST, { withFileTypes: true })
  .filter((e) => e.isDirectory() && e.name !== 'assets')
  .filter((e) => existsSync(join(DIST, e.name, 'index.html')))
  .map((e) => e.name)
  .sort();
if (emittedSiteDirs.length !== builtCount) {
  const claimed = kitSummaries.filter((k) => k.built).map((k) => k.slug);
  throw new Error(
    `build: ${builtCount} site(s) claimed built but ${emittedSiteDirs.length} emitted into dist/\n` +
      `  claimed but absent: ${claimed.filter((s) => !emittedSiteDirs.includes(s)).join(', ') || '(none)'}\n` +
      `  in dist/ but unclaimed: ${emittedSiteDirs.filter((s) => !claimed.includes(s)).join(', ') || '(none)'}`,
  );
}

// State the denominator. "76 brand kit(s), 76 built site(s)" was the original
// lie: both numbers counted only the kits that loaded, so the sentence was true
// and useless. The first number below is the file count from the brand-kits/
// glob; the second is directories verified in dist/.
console.log(
  `[build] ${kitFiles.length} brand kit file(s) on disk (pinned: ${EXPECTED.count}), ` +
    `${kitSummaries.length} loaded, ${emittedSiteDirs.length} site(s) emitted to dist/ ` +
    `+ index + 404 shim (${themed404Count} themed) + sitemap (${urls.length} URLs) → ${DIST}`,
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
    'primary',
    'secondary',
    'tertiary',
    'accent',
    'neutral',
    'background',
    'surface',
    'surface_alt',
    'text',
    'success',
    'warning',
    'error',
    'info',
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
// (BUILD_LOG.md / SITE.md / PROMPTS.md / REGEN_PLAN.md, any *.worklog.md, any
// review file, and reviews/ dirs). These are internal working notes — a change
// manifest that names unresolved ambiguities and a kit's wrong contrast claims
// has no business on the public site.
// Kept inside the function on purpose: `keepInSite` is called from top-level
// code far above this point, and a module-level `const` would still be in its
// temporal dead zone at that moment (function declarations hoist, `const` does
// not).
function keepInSite(src) {
  const base = basename(src);
  if (base === 'reviews') return false;
  if (/\.worklog\.md$/i.test(base)) return false;
  if (/^ROUND-\d+\.md$/i.test(base)) return false;
  return !['BUILD_LOG.md', 'SITE.md', 'PROMPTS.md', 'REGEN_PLAN.md', 'FINAL-REVIEW.md'].includes(
    base,
  );
}

function indexPage(kits) {
  const template = readFileSync(resolve(ROOT, 'index.html'), 'utf8');
  const inject = `<script>` + `window.__PHLIX_KITS__=${JSON.stringify(kits)};` + `</script>`;
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
  //
  // It is the FULLY-QUALIFIED url, not the site-absolute `${BASE_PATH}/`.
  // Pages serves this one document for any missing path, so a relative href
  // would resolve against the requested URL rather than against 404.html; and
  // the site-absolute form, correct as it is in a browser, is unresolvable to
  // the offline `links` gate, which reads it as the filesystem path
  // "phlix-website/" and reports it broken. The absolute URL is the only
  // spelling that is right for both, and checking it against SITE_URL rather
  // than BASE_PATH also pins the host, not just the base path.
  const fallbackHref = `href="${SITE_URL}/"`;
  if (!template.includes(fallbackHref)) {
    throw new Error(
      `build: root 404.html no-JS gallery link does not match site.url ` +
        `(expected ${fallbackHref} for ${SITE_URL})`,
    );
  }
  const inject =
    `<script>` + `window.__PHLIX_404__=${JSON.stringify({ base: BASE_PATH, kits })};` + `</script>`;
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
