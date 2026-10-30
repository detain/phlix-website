// Guard: the CSP is SHIPPED, not just declared (review website__devops M-WEBSITE-03).
//
// Run with `npm run test:unit` (`node --test "test/**/*.test.mjs"`).
//
// WHY THIS FILE EXISTS
// --------------------
// The repo committed a `_headers` file with a full "S4" security-header baseline
// and `tools/build.mjs` copied it into dist/ — but the deploy target is GitHub
// Pages (`.github/workflows/pages.yml`: `actions/upload-pages-artifact` + the
// `github-pages` environment; `package.json` homepage detain.github.io), which
// has no mechanism to serve custom response headers and ignores `_headers`
// entirely. Nothing in the shipped HTML carried a CSP. The posture was theater.
//
// The cure moves the enforceable part into the documents themselves — the build
// injects `<meta http-equiv="Content-Security-Policy">` into every emitted page
// — and every law below exists so the split reality cannot rot back into a lie:
//
//   1. the meta form never contains a directive browsers ignore in meta
//      (`frame-ancestors`), and the header form does;
//   2. `_headers` states the host caveat in its own text and its CSP line
//      equals the single-source header policy (byte-equal, not "comment says
//      byte-identical");
//   3. `dev-server.mjs` consumes the same source of truth instead of a copy;
//   4. a constructed fixture build injects the exact meta tag into every HTML
//      file, positioned before any script/stylesheet the policy must govern;
//   5. the REAL repo build does the same for every page it emits (the
//      denominator is the dist/ glob itself — no kit page can hide);
//   6. `script-src` ships WITHOUT `'unsafe-inline'` (review website__writer
//      R-WEBSITE-06), and the real built tree contains zero executable inline
//      scripts and zero `on*=` handlers for that strictness to refuse;
//   7. the build's inline-executable self-check reds BY NAME on a planted
//      island — the cure cannot rot back into a hopeful comment.
//
// Like test/sitemap-source.test.mjs, nothing here asserts against a pre-
// existing dist/ from a previous local run: tests 4 and 5 BUILDS the tree they
// then measure, so they behave identically on a clean CI checkout.

import { after, test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { globSync } from 'glob';

import { CSP_HEADER, CSP_HEADER_ONLY_DIRECTIVES, CSP_META, CSP_META_TAG } from '../tools/csp.mjs';

import { SITE_URL } from '../tools/gen-sitemap.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = join(ROOT, 'tools', 'build.mjs');

const tempRoots = [];
after(() => {
  for (const dir of tempRoots) rmSync(dir, { recursive: true, force: true });
});

test('law 1: the policy splits exactly where the platform splits', () => {
  // A directive the browser ignores in meta must NEVER reach the meta string —
  // otherwise a future edit "adds" anti-framing protection that does nothing.
  for (const directive of CSP_HEADER_ONLY_DIRECTIVES) {
    assert.ok(
      !CSP_META.includes(directive),
      `meta policy carries header-only directive: ${directive}`,
    );
    assert.ok(CSP_HEADER.includes(directive), `header policy lost directive: ${directive}`);
  }
  // The header form is the meta form plus the header-only tail, in order.
  assert.equal(CSP_HEADER, `${CSP_META}; ${CSP_HEADER_ONLY_DIRECTIVES.join('; ')}`);
  // Sanity on the shipped floor itself: these directives must be present in
  // BOTH forms — dropping any of them is the regression this file exists to
  // catch (an HTML page that can be loaded anywhere is a hole in the site).
  for (const floor of ["default-src 'self'", 'script-src', 'style-src', "base-uri 'self'"]) {
    assert.ok(CSP_META.includes(floor), `meta policy lost floor: ${floor}`);
  }
  // R-WEBSITE-06: the script floor is STRICT. 'unsafe-inline' was only ever
  // tolerated because the site's own islands needed it; they are files now.
  assert.match(CSP_META, /script-src 'self';/, `script-src is not the strict 'self' floor: ${CSP_META}`);
  assert.ok(!/script-src[^;]*unsafe-inline/.test(CSP_META), 'script-src regained unsafe-inline');
  // Honesty about what is NOT cured: inline styles remain (497 pages' style=),
  // so a rewrite that silently drops style-src 'unsafe-inline' — pretending
  // the harder half of the job is done — reddens here too.
  assert.match(CSP_META, /style-src 'self' 'unsafe-inline'/, 'style-src honesty lost');
});

test('law 2: _headers is honest about its host and byte-matches the SSOT', () => {
  const text = readFileSync(join(ROOT, '_headers'), 'utf8');
  // The CSP line is the header policy verbatim — no drift, no softer copy.
  const cspLine = text
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l.startsWith('Content-Security-Policy:'));
  assert.ok(cspLine, '_headers declares no Content-Security-Policy line');
  assert.equal(cspLine, `Content-Security-Policy: ${CSP_HEADER}`);
  // Honesty clause: the file itself must say GitHub Pages ignores it. A
  // rewrite that drops the caveat (or deletes the file) reddens here.
  assert.match(text, /GitHub Pages/, '_headers no longer names the host that ignores it');
  assert.match(
    text,
    /headers-supporting|Cloudflare/,
    '_headers no longer names where it does apply',
  );
  // Stale-note tripwires: the old docblock cited a deleted tree and an
  // unimplemented endpoint as if shipped.
  assert.doesNotMatch(
    text,
    /csp-report endpoint if needed/,
    'unimplemented report endpoint advertised',
  );
});

test('law 3: dev-server consumes the single source of truth', () => {
  const text = readFileSync(join(ROOT, 'tools', 'dev-server.mjs'), 'utf8');
  assert.match(text, /from ['"]\.\/csp\.mjs['"]/, 'dev-server does not import the CSP module');
  // A re-forked local copy is exactly the drift that lived here before.
  assert.doesNotMatch(text, /const CSP = \[/, 'dev-server keeps its own private CSP array');
});

/**
 * A fixture root shaped like the real repo where it matters: a root gallery
 * whose scripts the policy must govern, a kit page whose behavior rides in a
 * js/ FILE, and an empty-head page. Since R-WEBSITE-06 the build refuses
 * executable inline islands outright, so the fixture — which law 4 requires
 * to build CLEAN — carries none; law 7 plants them to prove the refusal.
 */
function makeFixture() {
  const dir = mkdtempSync(join(tmpdir(), 'phlix-csp-'));
  tempRoots.push(dir);
  mkdirSync(join(dir, 'brand-kits'), { recursive: true });
  mkdirSync(join(dir, 'sites'), { recursive: true });
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ type: 'module' }), 'utf8');

  writeFileSync(
    join(dir, 'brand-kits', 'alpha-kit.js'),
    `export default { slug: 'alpha-kit', name: 'Alpha', colors: { primary: '#112233' } };\n`,
    'utf8',
  );
  writeFileSync(
    join(dir, 'brand-kits', 'expected-kits.json'),
    JSON.stringify({ count: 1, kits: ['alpha-kit.js'] }),
    'utf8',
  );
  mkdirSync(join(dir, 'sites', 'alpha-kit'), { recursive: true });
  writeFileSync(
    join(dir, 'sites', 'alpha-kit', 'index.html'),
    '<!doctype html><html><head><link rel="stylesheet" href="css/theme.css"><script type="application/ld+json">{"@context":"https://schema.org"}</script></head>' +
      '<body><button id="copy">x</button><script src="js/main.js" defer></script></body></html>',
    'utf8',
  );
  writeFileSync(
    join(dir, 'sites', 'alpha-kit', '404.html'),
    '<html><head></head><body>x</body></html>',
    'utf8',
  );

  // The REAL root landing template. Since M-WEBSITE-05, build.mjs fail-loud
  // pins its hero/install copy against shared/content.json (assertLandingHero),
  // so a toy stub no longer survives the build this law measures — and a copy
  // of the shipped template is the honest fixture anyway.
  writeFileSync(join(dir, 'index.html'), readFileSync(join(ROOT, 'index.html'), 'utf8'), 'utf8');
  writeFileSync(
    join(dir, '404.html'),
    `<html><head><meta charset="utf-8"><script src="js/shim.js" defer></script></head><body><a href="${SITE_URL}/">home</a></body></html>`,
    'utf8',
  );
  return dir;
}

function runBuild(cwd) {
  try {
    return { code: 0, out: execFileSync(process.execPath, [BUILD], { cwd, encoding: 'utf8' }) };
  } catch (e) {
    return { code: e.status ?? 1, out: `${e.stdout ?? ''}${e.stderr ?? ''}` };
  }
}

/** Assert the meta tag is in `html` and precedes everything it must govern. */
function assertCspFirstInHead(html, label) {
  const at = html.indexOf(CSP_META_TAG);
  assert.notEqual(at, -1, `${label}: exact CSP meta tag not found`);
  const headOpen = html.search(/<head\b[^>]*>/i);
  assert.ok(headOpen !== -1 && at > headOpen, `${label}: CSP meta is not inside <head>`);
  const headBody = html.slice(headOpen, html.toLowerCase().indexOf('</head>', headOpen));
  // A CSP meta only governs content that appears AFTER it: position before the
  // first script, stylesheet link, or inline style block in the document.
  for (const needle of ['<script', '<link', '<style']) {
    const first = html.toLowerCase().indexOf(needle);
    if (first !== -1) {
      assert.ok(at < first, `${label}: ${needle} precedes the CSP meta (ungoverned load)`);
    }
  }
  // Exactly one policy — double injection would ship two conflicting CSPs.
  assert.equal(
    html.split(CSP_META_TAG).length - 1,
    1,
    `${label}: CSP meta injected more than once`,
  );
  assert.ok(!/frame-ancestors/.test(html), `${label}: header-only directive leaked into HTML`);
}

test('law 4: a fixture build injects the meta CSP into every emitted page', () => {
  const dir = makeFixture();
  const built = runBuild(dir);
  assert.equal(built.code, 0, `expected a clean build, got:\n${built.out}`);

  const emitted = globSync('**/*.html', { cwd: join(dir, 'dist') }).sort();
  // Denominator from the artifact itself: root gallery + root 404 + kit index
  // + kit 404. If the build ever stops emitting any of these, the per-file
  // loop must not silently have nothing to check.
  assert.equal(emitted.length, 4, `fixture emitted ${emitted.length} HTML pages, expected 4`);
  for (const rel of emitted) {
    assertCspFirstInHead(readFileSync(join(dir, 'dist', rel), 'utf8'), `dist/${rel}`);
  }
});

test('law 5: the real repo build ships the CSP on every page it emits', () => {
  // This test runs the repo build itself (cwd=ROOT). dist/ is gitignored and
  // the build regenerates it from tracked inputs, so the only cost is ~1s; in
  // exchange the law measures EVERY real page — a kit whose HTML has no
  // parseable <head> makes the build throw, not sneak past a fixture.
  const built = runBuild(ROOT);
  assert.equal(built.code, 0, `repo build failed:\n${built.out}`);

  const emitted = globSync('**/*.html', { cwd: join(ROOT, 'dist') });
  assert.ok(
    emitted.length >= 700,
    `repo dist has only ${emitted.length} HTML pages — the scale of what ships (723 at cure time) collapsed`,
  );
  for (const rel of emitted) {
    assertCspFirstInHead(readFileSync(join(ROOT, 'dist', rel), 'utf8'), `dist/${rel}`);
  }
  // The gallery's manifest has been a FILE since R-WEBSITE-06 — script-src
  // 'self' refuses the inline form it used to be. Pin that the reference still
  // lands AFTER the policy tag (both ride in <head>, order decides
  // governance) and that the emitted file carries the contract.
  const gallery = readFileSync(join(ROOT, 'dist', 'index.html'), 'utf8');
  assert.ok(gallery.includes('assets/js/kit-manifest.js'), 'gallery manifest reference vanished');
  assert.ok(
    gallery.indexOf(CSP_META_TAG) < gallery.indexOf('assets/js/kit-manifest.js'),
    'gallery manifest script runs before the CSP governs it',
  );
  assert.match(
    readFileSync(join(ROOT, 'dist', 'assets', 'js', 'kit-manifest.js'), 'utf8'),
    /^window\.__PHLIX_KITS__=\[/,
    'kit-manifest.js lost the window.__PHLIX_KITS__ contract',
  );
  // The REAL page must actually LOAD its extracted scripts (the builder
  // rewrites the reference and test stubs may omit it — here is where the
  // real tree is held to the cure): gallery.js published under the rewritten
  // path, and the 404 shim via a SITE_URL-absolute src for deep URLs.
  assert.match(gallery, /<script defer src="assets\/js\/gallery\.js"><\/script>/, 'dist gallery renderer vanished');
  assert.ok(
    existsSync(join(ROOT, 'dist', 'assets', 'js', 'gallery.js')),
    'gallery.js was not published into dist/assets/js/',
  );
  const errPage = readFileSync(join(ROOT, 'dist', '404.html'), 'utf8');
  assert.ok(
    errPage.includes(`${SITE_URL}/assets/js/error-shim.js`),
    'dist 404.html does not load the SITE_URL-absolute shim',
  );
  assert.ok(
    errPage.includes(`${SITE_URL}/assets/js/error-manifest.js`),
    'dist 404.html lost its error-manifest injection',
  );
  assert.match(
    readFileSync(join(ROOT, 'dist', 'assets', 'js', 'error-manifest.js'), 'utf8'),
    /^window\.__PHLIX_404__=\{/,
    'error-manifest.js lost the window.__PHLIX_404__ contract',
  );
});

test('law 6: the shipped tree contains zero inline executables (strict script-src is honest)', () => {
  // script-src 'self' only protects a page that has nothing inline to run.
  // Measure the real dist/ law 5 just built: no executable inline <script>,
  // no `on*=` handler, in ANY emitted page — the same invariant the build's
  // own assertNoInlineExecutables enforces, re-derived here independently
  // (test and build tool are not allowed to share a bug).
  const files = globSync('**/*.html', { cwd: join(ROOT, 'dist') });
  const violations = [];
  let dataOnly = 0;
  for (const rel of files) {
    const html = readFileSync(join(ROOT, 'dist', rel), 'utf8');
    for (const m of html.matchAll(/<script\b([^>]*)>/gi)) {
      const attrs = m[1];
      if (/\bsrc\b/i.test(attrs)) continue;
      const type = /\btype\s*=\s*["']?([\w/+-]+)/i.exec(attrs);
      if (type && (type[1] === 'application/ld+json' || type[1] === 'text/template')) {
        dataOnly++;
        continue;
      }
      violations.push(`${rel}: executable inline <script${type ? ` type="${type[1]}"` : ''}>`);
    }
    for (const m of html.matchAll(/<[a-zA-Z][a-zA-Z0-9-]*\b[^>]*\son[a-z-]+\s*=/g)) {
      violations.push(`${rel}: inline event handler — ${m[0].slice(0, 80)}…`);
    }
  }
  assert.deepEqual(violations, [], 'inline executables shipped while script-src is strict');
  // Non-vacuity: JSON-LD rides on dozens of pages — if the exempt path never
  // fired, this scan would be green because it measured nothing.
  assert.ok(
    dataOnly >= 50,
    `only ${dataOnly} data-only script blocks seen — the scanner or the site changed`,
  );
});

test('law 7: the build reds BY NAME on planted inline islands (the cure has teeth)', () => {
  const KIT_BASE =
    '<!doctype html><html><head><link rel="stylesheet" href="css/theme.css"></head><body>' +
    'CONTENT</body></html>';
  const vectors = [
    ['executable inline script', KIT_BASE.replace('CONTENT', '<script>alert(1)</script>'), /inline executable/],
    ['inline event handler', KIT_BASE.replace('CONTENT', '<button onclick="alert(1)">x</button>'), /inline event handler/],
  ];
  for (const [what, pageHtml, expected] of vectors) {
    const dir = makeFixture();
    writeFileSync(join(dir, 'sites', 'alpha-kit', 'index.html'), pageHtml, 'utf8');
    const built = runBuild(dir);
    assert.notEqual(built.code, 0, `build accepted a planted ${what}`);
    assert.match(built.out, expected, `inline-executable check fired but not BY NAME (${what}):\n${built.out}`);
  }
  // And the exemption is real: the same fixture with only JSON-LD inline
  // builds clean (a blanket ban would have killed 101 data blocks too).
  const clean = makeFixture();
  const builtClean = runBuild(clean);
  assert.equal(builtClean.code, 0, `de-islanded fixture failed:\n${builtClean.out}`);
});
