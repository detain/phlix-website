#!/usr/bin/env node
/**
 * tools/preview-all.mjs
 *
 * Serves every brand-kit site simultaneously under /<slug>/ on port 5174,
 * preferring the built output in dist/<slug>/ and falling back to the source
 * tree in sites/<slug>/ when a site has not been built yet. Use this to preview
 * what `npm run build` will publish; use `npm run dev` (tools/dev-server.mjs)
 * to preview the source tree directly.
 *
 * Kit discovery goes through tools/kit-inventory.mjs — the same rules
 * tools/build.mjs applies — so the preview index lists every kit on disk and
 * marks the ones that have no site yet.
 *
 * ⚠ S281: this script used to `console.warn` + `continue` past any kit it could
 * not import (and past any kit that exported nothing), then announce
 * `${KITS.length} kit(s) discovered from brand-kits/*.js` — a count of the
 * survivors, byte for byte the S278 build.mjs defect. It also returned `[]` for
 * a missing brand-kits/ directory and served a cheerful empty index. An
 * unloadable, deleted or unpinned kit is now FATAL and the denominator is
 * printed on every run.
 *
 * Usage:
 *   node tools/preview-all.mjs
 *   node tools/preview-all.mjs --port 5175
 *   node tools/preview-all.mjs --src            # ignore dist/, serve sites/ only
 *   node tools/preview-all.mjs --check          # validate the kit corpus, print
 *                                               # the denominator, bind no port
 *
 * URLs:
 *   http://localhost:5174/                  — kit index
 *   http://localhost:5174/abstract-canvas/  — one site
 *
 * NOTE: this used to serve the `variants/` tree and read kit metadata from
 * shared/data/brand-kits.json. Both are legacy: `variants/` was removed on
 * 2026-06-30 and brand-kits.json is not read by tools/build.mjs. The real
 * sources of truth are brand-kits/*.js + sites/<slug>/.
 */

import http from 'node:http';
import path from 'node:path';
import { existsSync, readFileSync, statSync } from 'node:fs';

import { denominatorLine, kitInventory } from './kit-inventory.mjs';

const argv = process.argv.slice(2);
const portIdx = argv.indexOf('--port');
const PORT = portIdx >= 0 ? parseInt(argv[portIdx + 1], 10) : 5174;
const SRC_ONLY = argv.includes('--src');
const CHECK_ONLY = argv.includes('--check');

const ROOT = process.cwd();
const KITS_DIR = path.join(ROOT, 'brand-kits');
const SITES_DIR = path.join(ROOT, 'sites');
const DIST_DIR = path.join(ROOT, 'dist');

/**
 * Discover the brand kits the same way tools/build.mjs does: every
 * brand-kits/*.js is imported, checked against brand-kits/expected-kits.json,
 * and its `slug` read.
 *
 * `kitInventory()` THROWS on an unloadable kit, on a kit that is on disk but not
 * pinned (or pinned but not on disk), and on an empty corpus. Nothing here
 * filters the result afterwards: the moment this function returns fewer kits
 * than there are files, the count it feeds the index page stops being a
 * denominator and becomes a self-adjusting tally of the survivors.
 */
async function discoverKits() {
  const inventory = await kitInventory(KITS_DIR, 'preview-all');
  const kits = inventory.kits.map(({ slug, name }) => ({
    slug,
    name,
    built: existsSync(path.join(SITES_DIR, slug, 'index.html')),
  }));
  kits.sort((a, b) => a.slug.localeCompare(b.slug));
  return { inventory, kits };
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
};

function serveFile(filePath, res, status = 200) {
  try {
    if (!statSync(filePath).isFile()) return false;
  } catch {
    return false;
  }
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';
  try {
    const data = readFileSync(filePath);
    res.writeHead(status, { 'Content-Type': mime, 'Cache-Control': 'no-cache' });
    res.end(data);
    return true;
  } catch {
    return false;
  }
}

function escHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
}

function kitIndexPage(kits, res) {
  const links = kits
    .map((k) =>
      k.built
        ? `      <li><a href="/${k.slug}/">${escHtml(k.name)}</a> <code>${escHtml(k.slug)}</code></li>`
        : `      <li>${escHtml(k.name)} <code>${escHtml(k.slug)}</code> — no site yet</li>`,
    )
    .join('\n');

  const builtCount = kits.filter((k) => k.built).length;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Phlix — all brand-kit sites</title>
    <style>
      body {
        font: 16px/1.5 system-ui, sans-serif;
        max-width: 50rem;
        margin: 3rem auto;
        padding: 0 1rem;
      }
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        margin: 0.4rem 0;
      }
      code {
        color: #666;
        font-size: 0.85em;
      }
    </style>
  </head>
  <body>
    <h1>Phlix brand-kit sites</h1>
    <p>${builtCount} of ${kits.length} kits have a site. Select one to preview:</p>
    <ul>
${links}
    </ul>
    <p><a href="https://github.com/detain/phlix-website">Source on GitHub</a></p>
  </body>
</html>`;
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
  res.end(html);
}

// A kit corpus this script cannot fully account for is fatal BEFORE anything
// binds a port. Reported as a message + exit 1 rather than an unhandled
// rejection, so the reason is the first thing on screen.
let INVENTORY;
let KITS;
try {
  ({ inventory: INVENTORY, kits: KITS } = await discoverKits());
} catch (err) {
  console.error(`[preview-all] ${err.message}`);
  process.exit(1);
}
const SLUGS = new Set(KITS.map((k) => k.slug));

// The denominator, printed on every run including `--check`. A bare exit 0 does
// not distinguish "previewed every kit" from "found none"; this line does.
console.log(`[preview-all] ${denominatorLine(INVENTORY)}`);

if (CHECK_ONLY) {
  console.log('[preview-all] --check: kit corpus is complete; not binding a port.');
  process.exit(0);
}

/** Serving root for one slug: dist/<slug>/ when built, else sites/<slug>/. */
function baseForSlug(slug) {
  if (!SRC_ONLY) {
    const distSite = path.resolve(DIST_DIR, slug);
    if (existsSync(distSite)) return distSite;
  }
  return path.resolve(SITES_DIR, slug);
}

const server = http.createServer((req, res) => {
  // WHATWG URL (not the deprecated url.parse) resolves `..` segments for us;
  // decoding afterwards means percent-encoded traversal (%2e%2e) reaches the
  // containment guard below as literal `..` instead of slipping past it.
  let rawPath;
  try {
    rawPath = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname);
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Bad Request');
    return;
  }
  const pathname = rawPath.replace(/\/$/, '') || '/';

  res.setHeader('Access-Control-Allow-Origin', `http://localhost:${PORT}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Root index → kit index page
  if (pathname === '/' || pathname === '/index.html') {
    kitIndexPage(KITS, res);
    return;
  }

  const slug = pathname.replace(/^\/+/, '').split('/')[0];
  if (SLUGS.has(slug)) {
    const siteRoot = baseForSlug(slug);
    let rel = pathname.slice(`/${slug}`.length).replace(/^\/+/, '');
    if (rel === '' || rawPath.endsWith('/')) rel = path.join(rel, 'index.html');

    // Path-containment guard: `..` segments must not escape the site directory.
    const resolved = path.resolve(siteRoot, rel);
    if (resolved !== siteRoot && !resolved.startsWith(siteRoot + path.sep)) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }

    if (serveFile(resolved, res)) return;
    // Miss inside a site → its themed 404 if it has one (what Pages does).
    if (serveFile(path.join(siteRoot, '404.html'), res, 404)) return;

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`Not found: ${pathname}`);
    return;
  }

  // Shared assets (build.mjs publishes shared/assets/ as /assets/)
  for (const [prefix, root] of [
    ['/assets/', path.resolve(ROOT, 'shared', 'assets')],
    ['/shared/', path.resolve(ROOT, 'shared')],
  ]) {
    if (!pathname.startsWith(prefix)) continue;
    const resolved = path.resolve(root, pathname.slice(prefix.length));
    if (resolved.startsWith(root + path.sep) && serveFile(resolved, res)) return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end(`Not found: ${pathname}`);
});

server.listen(PORT, () => {
  const source = SRC_ONLY ? 'sites/ (--src)' : 'dist/ when present, else sites/';
  const withSites = KITS.filter((k) => k.built).length;
  console.log(`[preview-all] Listening on http://localhost:${PORT}`);
  // Both numbers state their denominator. The old line was
  // `${KITS.length} kit(s) discovered`, where KITS was the post-filter survivor
  // list — true, self-consistent, and unable to reveal anything it had dropped.
  console.log(
    `[preview-all] ${withSites} / ${INVENTORY.total} kit(s) have a site (pinned corpus: ${INVENTORY.pinned})`,
  );
  console.log(`[preview-all] Serving: ${source}`);
  console.log('[preview-all] Press Ctrl+C to stop.');
});
