#!/usr/bin/env node
/**
 * tools/dev-server.mjs
 *
 * Local preview server for the generated brand-kit sites in sites/<slug>/.
 *
 * Usage:
 *   node tools/dev-server.mjs                        # serves every site
 *   node tools/dev-server.mjs --site abstract-canvas # serves one site
 *   node tools/dev-server.mjs --variant abstract-canvas   # legacy alias for --site
 *   node tools/dev-server.mjs --port 8080            # custom port
 *
 * The sites under sites/<slug>/ are hand-authored static HTML (see new_site.md),
 * so this is a plain static server — there is no template interpolation step.
 * It mirrors the production layout that `npm run build` publishes: each site is
 * served at /<slug>/, exactly as it appears in dist/<slug>/ on Pages.
 *
 * NOTE: this used to serve the `variants/` tree via tools/render.mjs. That
 * directory was removed on 2026-06-30 and render.mjs is legacy (see the header
 * comment in tools/render.mjs) — neither is part of the deploy path any more.
 */

import http from 'node:http';
import path from 'node:path';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';

const argv = process.argv.slice(2);

/** Read a `--flag value` pair out of argv, or null when absent. */
function flag(name) {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
}

const PORT = flag('--port') ? parseInt(flag('--port'), 10) : 5173;
// `--variant` is kept as an alias so existing muscle memory / scripts keep
// working; it now takes a site slug like `--site` does.
const TARGET_SITE = flag('--site') ?? flag('--variant');

const ROOT = path.resolve(process.cwd());
const SITES_DIR = path.join(ROOT, 'sites');

/** Every sites/<slug>/ directory that actually has an index.html. */
function discoverSites() {
  if (!existsSync(SITES_DIR)) return [];
  return readdirSync(SITES_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((slug) => existsSync(path.join(SITES_DIR, slug, 'index.html')))
    .sort();
}

const ALL_SITES = discoverSites();

// Content-Security-Policy baseline for phlix-website — kept byte-identical to
// the production policy in `_headers`, so a CSP violation shows up locally
// instead of only on Pages. Fonts are self-hosted (no external CDN) and no
// inline scripts are allowed.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

// MIME types
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
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';
  try {
    if (!statSync(filePath).isFile()) return false;
    const data = readFileSync(filePath);
    res.writeHead(status, {
      'Content-Type': mime,
      'Cache-Control': 'no-cache',
    });
    res.end(data);
    return true;
  } catch {
    return false;
  }
}

/** Minimal index of the sites being served (the real gallery is built by build.mjs). */
function siteIndexPage(slugs, res) {
  const links = slugs.map((slug) => `      <li><a href="/${slug}/">${slug}</a></li>`).join('\n');
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Phlix — dev server</title>
  </head>
  <body>
    <h1>Phlix brand-kit sites</h1>
    <p>${slugs.length} site(s) served from <code>sites/</code>.</p>
    <ul>
${links}
    </ul>
  </body>
</html>`;
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
  res.end(html);
}

function start(SERVE_SITES) {
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

    // CORS for dev — scoped to this localhost dev server, not a wildcard
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${PORT}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Security-Policy', CSP);

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    // Index of served sites
    if (pathname === '/' || pathname === '/index.html') {
      siteIndexPage(SERVE_SITES, res);
      return;
    }

    // Serve static files from sites/<slug>/
    for (const slug of SERVE_SITES) {
      const prefix = `/${slug}`;
      if (pathname !== prefix && !pathname.startsWith(prefix + '/')) continue;

      const siteRoot = path.resolve(SITES_DIR, slug);
      let relPath = pathname.slice(prefix.length).replace(/^\/+/, '');
      // Directory-ish request (/<slug>, /<slug>/, /<slug>/sub/) → its index.html
      if (relPath === '' || rawPath.endsWith('/')) relPath = path.join(relPath, 'index.html');

      const filePath = path.join(siteRoot, relPath);

      // Path-containment guard: reject any request that escapes the site
      // directory (e.g. /<slug>/../../../etc/passwd, including URL-encoded
      // traversal — `rawPath` is decoded above). We compare the fully resolved
      // paths, so `..` segments cannot break out.
      const resolved = path.resolve(filePath);
      if (resolved !== siteRoot && !resolved.startsWith(siteRoot + path.sep)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
      }

      if (serveFile(filePath, res)) return;

      // Miss inside a site → that site's own themed 404 if it authored one,
      // matching what the root 404 shim does in production.
      const themed404 = path.join(siteRoot, '404.html');
      if (serveFile(themed404, res, 404)) return;

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`Not found: ${pathname}`);
      return;
    }

    // Shared assets are published at /assets/ by build.mjs
    if (pathname.startsWith('/assets/')) {
      const rel = pathname.slice('/assets/'.length);
      const assetsRoot = path.resolve(ROOT, 'shared', 'assets');
      const resolved = path.resolve(assetsRoot, rel);
      if (resolved.startsWith(assetsRoot + path.sep) && serveFile(resolved, res)) return;
    }

    // Fallback 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`Not found: ${pathname}`);
  });

  server.listen(PORT, () => {
    const what =
      SERVE_SITES.length === ALL_SITES.length
        ? `all ${SERVE_SITES.length} site(s)`
        : SERVE_SITES.join(', ');
    console.log(`[dev-server] Listening on http://localhost:${PORT}`);
    console.log(`[dev-server] Serving from sites/: ${what}`);
    console.log('[dev-server] Press Ctrl+C to stop.');
  });
}

if (TARGET_SITE && !ALL_SITES.includes(TARGET_SITE)) {
  console.error(`[dev-server] no site "${TARGET_SITE}" under sites/ (with an index.html).`);
  console.error(`[dev-server] available: ${ALL_SITES.join(', ') || '(none)'}`);
  process.exitCode = 1;
} else if (ALL_SITES.length === 0) {
  console.error('[dev-server] sites/ has no built sites — nothing to serve.');
  process.exitCode = 1;
} else {
  start(TARGET_SITE ? [TARGET_SITE] : ALL_SITES);
}
