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
 * Kit discovery matches tools/build.mjs: every brand-kits/*.js is imported and
 * its `slug` read, so the preview index lists all 50 kits and marks the ones
 * that have no site yet.
 *
 * Usage:
 *   node tools/preview-all.mjs
 *   node tools/preview-all.mjs --port 5175
 *   node tools/preview-all.mjs --src            # ignore dist/, serve sites/ only
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
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';

const argv = process.argv.slice(2);
const portIdx = argv.indexOf('--port');
const PORT = portIdx >= 0 ? parseInt(argv[portIdx + 1], 10) : 5174;
const SRC_ONLY = argv.includes('--src');

const ROOT = process.cwd();
const KITS_DIR = path.join(ROOT, 'brand-kits');
const SITES_DIR = path.join(ROOT, 'sites');
const DIST_DIR = path.join(ROOT, 'dist');

/**
 * Discover the brand kits the same way tools/build.mjs does: import every
 * brand-kits/*.js and read its default (or `brandKit`) export.
 */
async function discoverKits() {
  if (!existsSync(KITS_DIR)) return [];
  const files = readdirSync(KITS_DIR)
    .filter((name) => name.endsWith('.js') && !name.endsWith('.worklog.js'))
    .sort();

  const kits = [];
  for (const file of files) {
    let kit;
    try {
      const mod = await import(pathToFileURL(path.join(KITS_DIR, file)).href);
      kit = mod.default ?? mod.brandKit;
    } catch (err) {
      console.warn(`[preview-all] skipping ${file}: ${err.message}`);
      continue;
    }
    if (!kit || typeof kit !== 'object') {
      console.warn(`[preview-all] skipping ${file}: no brand kit export`);
      continue;
    }
    const slug = kit.slug || path.basename(file, '.js');
    kits.push({
      slug,
      name: kit.name || slug,
      built: existsSync(path.join(SITES_DIR, slug, 'index.html')),
    });
  }
  return kits.sort((a, b) => a.slug.localeCompare(b.slug));
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

const KITS = await discoverKits();
const SLUGS = new Set(KITS.map((k) => k.slug));

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
  console.log(`[preview-all] Listening on http://localhost:${PORT}`);
  console.log(`[preview-all] ${KITS.length} kit(s) discovered from brand-kits/*.js`);
  console.log(`[preview-all] Serving: ${source}`);
  console.log('[preview-all] Press Ctrl+C to stop.');
});
