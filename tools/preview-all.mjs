#!/usr/bin/env node
/**
 * tools/preview-all.mjs
 *
 * Serves all five variants simultaneously under /<slug>/ on port 5174.
 * Unlike dev-server which is single-variant, this one serves the built dist/
 * directory (or falls back to live-rendering variants/).
 *
 * Usage:
 *   node tools/preview-all.mjs
 *
 * URLs:
 *   http://localhost:5174/                          — variant index
 *   http://localhost:5174/01-minimalist-cinema/      — variant 1
 *   http://localhost:5174/02-spotlight-projector/   — variant 2
 *   ... (etc.)
 */

import http from 'node:http';
import url from 'node:url';
import path from 'node:path';
import { readFileSync, existsSync, readdirSync } from 'node:fs';

const PORT = 5174;
const ROOT = process.cwd();

const ALL_VARIANTS = [
  '01-minimalist-cinema',
  '02-spotlight-projector',
  '03-retro-film-reel',
  '04-portal-hub',
  '05-pixel-tech',
];

// Dynamic import of render.mjs for on-the-fly rendering
const renderPage = (async () => {
  const mod = await import('./render.mjs');
  return mod.renderPage;
})();

const CONTENT = JSON.parse(readFileSync(path.join(ROOT, 'shared/content.json'), 'utf8'));

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
  '.txt':  'text/plain',
};

function serveFile(filePath, res) {
  if (!existsSync(filePath)) return false;
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';
  try {
    const data = readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
    return true;
  } catch {
    return false;
  }
}

async function renderVariantPage(slug, page, res) {
  try {
    const render = await renderPage;
    const html = render(slug, CONTENT, page);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return true;
  } catch (err) {
    console.error(`[preview] render error for ${slug}/${page}:`, err.message);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Render error: ${err.message}`);
    return false;
  }
}

function variantIndexPage(res) {
  const links = ALL_VARIANTS.map(slug => {
    const kit = getBrandKit(slug);
    const name = kit?.name || slug;
    return `  <li><a href="/${slug}/">${name}</a></li>`;
  }).join('\n');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Phlix — all variants</title>
  <style>
    body { font: 16px/1.5 system-ui, sans-serif; max-width: 50rem; margin: 3rem auto; padding: 0 1rem; }
    h1 { margin-bottom: 0.5rem; }
    ul { list-style: none; padding: 0; }
    li { margin: 0.5rem 0; }
    a { font-size: 1.1rem; }
  </style>
</head>
<body>
  <h1>Phlix — design variant preview</h1>
  <p>Five brand-themed variants. Select one to preview:</p>
  <ul>
${links}
  </ul>
  <p><a href="https://github.com/detain/phlix-website">Source on GitHub</a></p>
</body>
</html>`;
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

let _brandKits;
function getBrandKit(slug) {
  if (!_brandKits) {
    _brandKits = JSON.parse(readFileSync(path.join(ROOT, 'shared/data/brand-kits.json'), 'utf8'));
  }
  return _brandKits.variants?.[slug] || {};
}

const VALID_PAGES = ['index', 'features', 'clients', 'download', 'plugins', 'docs', 'hub', 'about'];

function resolveVariantPage(pathname) {
  // /<slug>/ or /<slug>/index.html
  for (const slug of ALL_VARIANTS) {
    const prefix = `/${slug}/`;
    if (pathname === prefix || pathname === prefix + 'index.html') {
      return { slug, page: 'index' };
    }
    const match = pathname.match(new RegExp(`^/${slug}/([^/]+)\\.html$`));
    if (match && VALID_PAGES.includes(match[1])) {
      return { slug, page: match[1] };
    }
  }
  return null;
}

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname.replace(/\/$/, '') || '/';

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Root index → variant index page
  if (pathname === '/' || pathname === '/index.html') {
    variantIndexPage(res);
    return;
  }

  // Check if this is a variant page request
  const variantPage = resolveVariantPage(pathname);
  if (variantPage) {
    await renderVariantPage(variantPage.slug, variantPage.page, res);
    return;
  }

  // Serve static files from dist/ if it exists, else variants/
  const distBase = path.join(ROOT, 'dist');
  const variantBase = path.join(ROOT, 'variants');
  const base = existsSync(distBase) ? distBase : variantBase;

  // Strip the variant prefix and look for the file
  for (const slug of ALL_VARIANTS) {
    const prefix = `/${slug}/`;
    if (pathname.startsWith(prefix)) {
      const rel = pathname.slice(prefix.length);
      const filePath = path.join(base, slug, rel);
      if (serveFile(filePath, res)) return;

      // Fallback: try to render index.html for directory-like requests
      if (serveFile(path.join(base, slug, 'index.html'), res)) return;

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`Not found: ${pathname}`);
      return;
    }
  }

  // Shared assets
  const sharedPrefix = '/shared/';
  if (pathname.startsWith(sharedPrefix)) {
    const rel = pathname.slice(sharedPrefix.length);
    if (serveFile(path.join(ROOT, 'shared', rel), res)) return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end(`Not found: ${pathname}`);
});

server.listen(PORT, () => {
  console.log(`[preview-all] Listening on http://localhost:${PORT}`);
  console.log('[preview-all] Serving all five variants at /<slug>/');
  console.log('[preview-all] Press Ctrl+C to stop.');
});
