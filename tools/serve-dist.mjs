#!/usr/bin/env node
/**
 * tools/serve-dist.mjs
 *
 * Minimal static file server for the BUILT output in dist/ — the artifact
 * GitHub Pages actually publishes. It exists for one job: give `lhci
 * autorun` a real, local URL to point Chrome at (see lighthouserc.json's
 * collect.startServerCommand), so the performance gate measures this repo's
 * own build instead of an external host behind a secret that is not set.
 *
 * It deliberately knows nothing about brand kits — unlike tools/preview-all.mjs
 * (a human preview tool with kit discovery and its own index page) this server
 * serves dist/ byte-for-byte as the deploy would, and nothing more.
 *
 * Fail-loud law (same rule tools/lint.mjs applies to a missing dist/ for
 * linkcheck): if dist/index.html is not on disk, this server REFUSES to start.
 * Forgetting `npm run build` can therefore never degrade into "server came up,
 * every URL 404ed, Lighthouse scored the 404 page green".
 *
 * Usage:
 *   node tools/serve-dist.mjs               # port 8080
 *   node tools/serve-dist.mjs --port 9090
 *
 * The ready line (`lhci-server ready`) is pinned by lighthouserc.json's
 * startServerReadyPattern and by test/lighthouse-gate.test.mjs.
 */

import http from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');
const DIST = join(ROOT, 'dist');

/** Read `--flag value` out of argv, or fall back. */
function flag(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const PORT = Number(flag('port', '8080'));
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  console.error(`serve-dist: --port must be an integer, got "${process.argv[process.argv.indexOf('--port') + 1]}"`);
  process.exit(1);
}

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('serve-dist: dist/index.html is missing — run `npm run build` first. Refusing to serve an empty tree.');
  process.exit(1);
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
};

/** Map a request path to a file inside dist/, or null if there is no such file. */
function fileFor(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  // normalize() collapses `..` segments; the containment check below makes any
  // attempt to escape dist/ (traversal or absolute-path injection) a 404, not
  // a read outside the tree.
  const candidate = normalize(join(DIST, decoded));
  if (candidate !== DIST && !candidate.startsWith(DIST + sep)) return null;
  const asDirectory = existsSync(candidate) && statSync(candidate).isDirectory()
    ? join(candidate, 'index.html')
    : candidate;
  if (!existsSync(asDirectory) || !statSync(asDirectory).isFile()) return null;
  return asDirectory;
}

const server = http.createServer((req, res) => {
  const file = req.method === 'GET' || req.method === 'HEAD' ? fileFor(req.url) : null;
  if (!file) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found (serve-dist only serves files under dist/)');
    return;
  }
  const body = readFileSync(file);
  res.writeHead(200, {
    'content-type': MIME_TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream',
    'content-length': body.length,
    'cache-control': 'no-store',
  });
  res.end(req.method === 'HEAD' ? undefined : body);
});

// Bind 127.0.0.1, not the wildcard: this serves a build directory to a local
// Chrome and has no business being reachable from anywhere else.
server.listen(PORT, '127.0.0.1', () => {
  console.log(`lhci-server ready: serving ${DIST} at http://127.0.0.1:${PORT}`);
});
