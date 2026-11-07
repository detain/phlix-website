#!/usr/bin/env node
// TW-085 (review website__devops i5): push-gated, network-free link check of
// the BUILT artifact — the internal half of what `npm run linkcheck` measures
// live on the Monday cron. Before this, internal-link rot (relative paths and
// fragments — the edges a merge can kill with zero network involvement) had no
// push gate at all: linkcheck.yml fires only on the cron, on dispatch, or on
// PRs that happen to touch site sources, and even then the full sweep pays the
// live-URL flake tax the S268 lineage documents.
//
// WHY THIS IS NOT `linkinator dist/**/*.html --skip ...`
// ------------------------------------------------------
// Tried, measured, rejected. linkinator v8.1.0's shouldSkipUrl() starts with
// a protocol guard: when ANY skip rule is in effect, every non-http(s) URL is
// skipped wholesale — and disk-mode links resolve to file:// URLs. A/B on
// dist/abstract-canvas/index.html: full mode reports 34 links scanned; adding
// `--skip '^(?:https?:|mailto:|tel:|ftp:)'` reports 0. The tool designed to
// EXCLUDE externals silently excludes the relative edges this gate exists to
// MEASURE — a fake green of exactly the class lint.mjs's requiresFiles law
// refuses. (The forbidden --url-rewrite-* pair has the same failure shape and
// is documented dead in tools/lint.mjs above LINKS_ARGS.)
//
// So this tool serves dist/ over a loopback HTTP server and runs linkinator
// against http://127.0.0.1:<port> URLs. On an http origin the protocol guard
// works FOR the gate instead of against it: mailto:/tel: links are non-http
// and skipped by design; external http(s) targets are skipped by regex; and
// every relative link resolves onto the loopback origin — where it is checked
// by a real HTTP request against the actual artifact Pages publishes, the
// closest on-CI simulation of a browser fetching https://phlix.github.io/.
// Deterministic, offline, seconds-scale.
//
// House laws this file obeys (mirrored from tools/lint.mjs):
//   - Empty corpus is FAILURE (exit 1), never a skip-with-green. An unbuilt
//     dist/ "passing" a link gate is the purest fake green there is.
//   - A corpus size and the raw exit code are always printed.
//   - No swallowing wrappers: the child's exit code is THE exit code.

import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { globSync } from 'glob';
import { resolve, dirname, join, normalize, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = resolve(ROOT, 'dist');

const files = globSync('dist/**/*.html', { cwd: ROOT }).filter(Boolean);
if (files.length === 0) {
  console.error(
    '[linkcheck:internal] no files match dist/**/*.html -> exit 1\n' +
      '[linkcheck:internal] this target checks the BUILT artifact; run `npm run build` first. ' +
      'Refusing to report success on an empty corpus.',
  );
  process.exit(1);
}

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
    let filePath = normalize(join(DIST, pathname));
    // Belt: a served path may never escape dist/ regardless of input shape.
    if (filePath !== DIST && !filePath.startsWith(DIST + sep)) {
      res.writeHead(403).end('forbidden');
      return;
    }
    let st = await stat(filePath).catch(() => null);
    if (st?.isDirectory()) {
      filePath = join(filePath, 'index.html');
      st = await stat(filePath).catch(() => null);
    }
    if (!st?.isFile()) {
      res.writeHead(404).end('not found');
      return;
    }
    res.writeHead(200, { 'content-type': TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream' });
    res.end(await readFile(filePath));
  } catch {
    res.writeHead(500).end('server error');
  }
});

await new Promise((done) => server.listen(0, '127.0.0.1', done));
const port = server.address().port;
const base = `http://127.0.0.1:${port}`;
const roots = files.map((f) => `${base}/${f.replace(/^dist\//, '')}`);

// Skip = everything that is NOT this loopback origin. The lookahead pins the
// exact host:port so a relative link resolving HERE is checked, while any
// other http(s) target (GitHub, phlix.is.cc, ...) is skipped and no network
// request is ever made. mailto:/tel: links need no rule here: linkinator's
// non-http protocol guard skips them, and on THIS mode that guard is doing
// exactly what we want it to.
const skipRule = `^https?://(?!127\\.0\\.0\\.1:${port}/)`;

console.log(
  `[linkcheck:internal] serving dist/ on ${base} and checking ${files.length} built pages ` +
    '(relative paths + fragments only; scheme-qualified externals skipped — live sweep stays on the cron)',
);

const child = spawn(
  'npx',
  ['--no-install', 'linkinator', '--silent', '--recurse', '--check-fragments', '--concurrency', '16', '--skip', skipRule, ...roots],
  { stdio: 'inherit', cwd: ROOT },
);
child.on('exit', (code) => {
  server.close();
  console.log(`[linkcheck:internal] linkinator inspected ${files.length} root pages -> exit ${code}`);
  process.exit(code ?? 1);
});
child.on('error', (err) => {
  server.close();
  console.error(`[linkcheck:internal] failed to launch linkinator: ${err.message} -> exit 1`);
  process.exit(1);
});
