#!/usr/bin/env node
/**
 * tools/dev-server.mjs
 *
 * Development server for one variant with on-the-fly content interpolation.
 *
 * Usage:
 *   node tools/dev-server.mjs                          # serves all variants
 *   node tools/dev-server.mjs --variant 01-minimalist-cinema  # serves one
 *   node tools/dev-server.mjs --port 8080            # custom port
 *
 * Each request for /variants/<slug>/<page>.html is intercepted, the template
 * is rendered with shared/content.json, and the result is returned.
 */

import http from 'node:http';
import url from 'node:url';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { renderPage } from './render.mjs';

const argv = process.argv.slice(2);
const portIdx = argv.indexOf('--port');
const PORT = portIdx >= 0 ? parseInt(argv[portIdx + 1], 10) : 5173;
const variantIdx = argv.indexOf('--variant');
const TARGET_VARIANT = variantIdx >= 0 ? argv[variantIdx + 1] : null;

const ROOT = path.resolve(process.cwd());
const CONTENT = JSON.parse(readFileSync(path.join(ROOT, 'shared/content.json'), 'utf8'));

const ALL_VARIANTS = [
  '01-minimalist-cinema',
  '02-spotlight-projector',
  '03-retro-film-reel',
  '04-portal-hub',
  '05-pixel-tech',
];

const SERVE_VARIANTS = TARGET_VARIANT ? [TARGET_VARIANT] : ALL_VARIANTS;

// MIME types
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff2':'font/woff2',
  '.json': 'application/json',
};

// Determine if a URL path is a variant page that should be rendered
function resolveVariantPage(urlPath) {
  // Match /<slug>/ or /<slug>/<page>.html
  for (const slug of SERVE_VARIANTS) {
    const variantPrefix = `/${slug}/`;
    if (urlPath === variantPrefix || urlPath === variantPrefix + 'index.html') {
      return { slug, page: 'index' };
    }
    const match = urlPath.match(new RegExp(`^/${slug}/([^/]+)\\.html$`));
    if (match) {
      const page = match[1];
      const VALID_PAGES = ['index', 'features', 'clients', 'download', 'plugins', 'docs', 'hub', 'about'];
      if (VALID_PAGES.includes(page)) {
        return { slug, page };
      }
    }
  }
  return null;
}

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';
  try {
    const data = readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': mime,
      'Cache-Control': 'no-cache',
    });
    res.end(data);
    return true;
  } catch {
    return false;
  }
}

function renderVariantPage(slug, page, res) {
  try {
    const html = renderPage(slug, CONTENT, page);
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
    });
    res.end(html);
    return true;
  } catch (err) {
    console.error(`[dev] render error for ${slug}/${page}:`, err.message);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Server error rendering ${slug}/${page}: ${err.message}`);
    return false;
  }
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname.replace(/\/$/, '') || '/';

  // CORS for dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Variant page rendering
  const variantPage = resolveVariantPage(pathname);
  if (variantPage) {
    renderVariantPage(variantPage.slug, variantPage.page, res);
    return;
  }

  // Serve static files from variants/<slug>/
  for (const slug of SERVE_VARIANTS) {
    const variantPrefix = `/${slug}/`;
    if (pathname.startsWith(variantPrefix)) {
      const relPath = pathname.slice(variantPrefix.length);
      const filePath = path.join(ROOT, 'variants', slug, relPath);
      if (serveFile(filePath, res)) return;

      // Not found within variant
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`Not found: ${pathname}`);
      return;
    }
  }

  // Root redirect to first variant or variant index
  if (pathname === '/' || pathname === '/index.html') {
    const indexHtml = SERVE_VARIANTS.length === 1
      ? `/${SERVE_VARIANTS[0]}/index.html`
      : '/index.html';
    res.writeHead(302, { Location: indexHtml });
    res.end();
    return;
  }

  // Fallback 404
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end(`Not found: ${pathname}`);
});

server.listen(PORT, () => {
  const variants = SERVE_VARIANTS.length === ALL_VARIANTS.length
    ? 'all variants'
    : SERVE_VARIANTS.join(', ');
  console.log(`[dev-server] Listening on http://localhost:${PORT}`);
  console.log(`[dev-server] Serving: ${variants}`);
  console.log('[dev-server] Press Ctrl+C to stop.');
});
