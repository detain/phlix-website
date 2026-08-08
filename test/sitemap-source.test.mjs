// Guard: the site-wide sitemap must describe what SHIPS, not what is authored.
//
// Run with `npm run test:unit` (`node --test "test/**/*.test.mjs"`), which the
// `unit` job in .github/workflows/lint.yml executes on every push and PR.
//
// WHY THIS FILE EXISTS
// --------------------
// `tools/gen-sitemap.mjs` globbed `sites/*/*.html` — the source tree, which
// holds 138 site directories. `npm run build` only emits the ones that have a
// loadable `brand-kits/<slug>.js`. So dist/sitemap.xml advertised 1116 URLs
// across 138 slugs while only 79 of those slugs are on the internet: ~59 sites'
// worth of `<loc>` entries that are a guaranteed 404 to any crawler that follows
// them, and they fed straight back into the `links` gate's corpus.
//
// ⚠ WHY EVERY TEST HERE BUILDS ITS OWN FIXTURE
// --------------------------------------------
// The first version of this file asserted against the repo's real `dist/`. It
// passed locally — where `dist/` was lying around from an earlier build — and
// failed in CI, whose `unit` job checks out clean and never builds. That is the
// dev≠CI axis, and the fix is NOT to skip when `dist/` is missing: a skipped
// test reads as a pass, which would put this check straight back into the class
// of gate that can never fail. Each test below constructs the tree it needs and
// runs the REAL `tools/build.mjs` against it, so:
//
//   * `npm run test:unit` is meaningful standalone, on a clean checkout, with no
//     build step and no ordering dependency on another job;
//   * the mismatch it detects is CONSTRUCTED (the fixture deliberately contains
//     an authored site with no brand kit) rather than OBSERVED in the real repo.
//     An observed mismatch would evaporate the day every site gets a kit, and
//     the assertions would silently become unfalsifiable.
//
// WHAT IT ASSERTS
// ---------------
//   1. The slug set in the emitted sitemap equals the set of slugs actually
//      emitted into dist/, compared as an EXACT SET IN BOTH DIRECTIONS. A
//      one-directional subset check passes a sitemap that has lost half its
//      pages.
//   2. An authored-but-kitless site is absent from the sitemap — the whole point
//      of the change, and non-vacuous by construction.
//   3. A build run against a fixture describes the FIXTURE, never this checkout.
//   4. `--site <slug>` still reads the SOURCE tree — a regen agent writes a
//      per-kit sitemap before any build exists.
//   5. An empty dist/ THROWS instead of emitting a zero-entry <urlset>, with a
//      control arm proving the same call succeeds once dist/ has a page.

import { after, test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { globSync } from 'glob';

import { SITE_URL, sitemapUrls } from '../tools/gen-sitemap.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = join(ROOT, 'tools', 'build.mjs');

const tempRoots = [];
after(() => {
  for (const dir of tempRoots) rmSync(dir, { recursive: true, force: true });
});

const validKit = (slug) =>
  `export default { slug: '${slug}', name: '${slug}', colors: { primary: '#112233' } };\n`;
const page = '<html><head></head><body>x</body></html>';

/**
 * A minimal but real project root that `tools/build.mjs` can be aimed at.
 * `deployed` get both a brand kit and a site subtree; `authoredOnly` get a site
 * subtree and NO kit, so the build does not emit them — that is the deployed vs
 * authored distinction this suite exists to police.
 */
function makeFixture({ deployed, authoredOnly = [] }) {
  const dir = mkdtempSync(join(tmpdir(), 'phlix-sitemap-'));
  tempRoots.push(dir);
  mkdirSync(join(dir, 'brand-kits'), { recursive: true });
  mkdirSync(join(dir, 'sites'), { recursive: true });
  // phlix-website is "type": "module"; the fixture must be too, or Node's ESM
  // syntax detection treats the kits differently than it does in the real repo.
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ type: 'module' }), 'utf8');

  for (const slug of deployed) {
    writeFileSync(join(dir, 'brand-kits', `${slug}.js`), validKit(slug), 'utf8');
    mkdirSync(join(dir, 'sites', slug), { recursive: true });
    writeFileSync(join(dir, 'sites', slug, 'index.html'), page, 'utf8');
    writeFileSync(join(dir, 'sites', slug, 'about.html'), page, 'utf8');
    // 404s are reached only through the root shim and carry noindex, so they
    // must never reach the sitemap. Present here so that exclusion is tested.
    writeFileSync(join(dir, 'sites', slug, '404.html'), page, 'utf8');
  }
  for (const slug of authoredOnly) {
    mkdirSync(join(dir, 'sites', slug), { recursive: true });
    writeFileSync(join(dir, 'sites', slug, 'index.html'), page, 'utf8');
    writeFileSync(join(dir, 'sites', slug, 'about.html'), page, 'utf8');
  }

  writeFileSync(
    join(dir, 'brand-kits', 'expected-kits.json'),
    JSON.stringify({ count: deployed.length, kits: deployed.map((s) => `${s}.js`).sort() }),
    'utf8',
  );
  writeFileSync(join(dir, 'index.html'), '<html><head></head><body>gallery</body></html>', 'utf8');
  writeFileSync(
    join(dir, '404.html'),
    `<html><head></head><body><a href="${SITE_URL}/">home</a></body></html>`,
    'utf8',
  );
  return dir;
}

/** Run the real build in `cwd`; never throws, always reports what happened. */
function runBuild(cwd) {
  try {
    return { code: 0, out: execFileSync(process.execPath, [BUILD], { cwd, encoding: 'utf8' }) };
  } catch (e) {
    return { code: e.status ?? 1, out: `${e.stdout ?? ''}${e.stderr ?? ''}` };
  }
}

/** `<loc>` values of a built sitemap, reduced to slugs. */
function sitemapSlugs(dir) {
  const xml = readFileSync(join(dir, 'dist', 'sitemap.xml'), 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.ok(locs.length > 0, 'the emitted sitemap has no <loc> entries at all');
  return {
    locs,
    slugs: new Set(
      locs.map((u) => {
        assert.ok(u.startsWith(`${SITE_URL}/`), `sitemap URL outside the site base: ${u}`);
        return u.slice(SITE_URL.length + 1).split('/')[0];
      }),
    ),
  };
}

const DEPLOYED = ['alpha-kit', 'beta-kit'];
const AUTHORED_ONLY = ['gamma-authored', 'delta-authored'];

test('the sitemap covers exactly the slugs emitted into dist/, both directions', () => {
  const dir = makeFixture({ deployed: DEPLOYED, authoredOnly: AUTHORED_ONLY });
  const built = runBuild(dir);
  assert.equal(built.code, 0, `expected a clean build, got:\n${built.out}`);

  // The denominator comes from dist/ on disk, not from the build's own log line
  // and not from the DEPLOYED constant — a count read back from the artifact
  // cannot be satisfied by the bookkeeping that produced it.
  const emitted = new Set(
    globSync('*/index.html', { cwd: join(dir, 'dist') }).map((r) => r.split('/')[0]),
  );
  const { slugs } = sitemapSlugs(dir);

  assert.deepEqual([...emitted].sort(), DEPLOYED.slice().sort(), 'fixture did not build as set up');
  assert.deepEqual(
    [...emitted].filter((s) => !slugs.has(s)),
    [],
    'emitted into dist/ but absent from the sitemap',
  );
  assert.deepEqual(
    [...slugs].filter((s) => !emitted.has(s)),
    [],
    'advertised in the sitemap but not emitted into dist/',
  );
});

test('an authored site with no brand kit is never advertised', () => {
  const dir = makeFixture({ deployed: DEPLOYED, authoredOnly: AUTHORED_ONLY });
  assert.equal(runBuild(dir).code, 0);
  const { slugs, locs } = sitemapSlugs(dir);

  // Non-vacuity: the fixture really does contain sites the build did not emit.
  assert.ok(AUTHORED_ONLY.length > 0, 'no authored-only site to discriminate on');
  for (const slug of AUTHORED_ONLY) {
    assert.ok(!slugs.has(slug), `authored-but-undeployed site "${slug}" is in the sitemap`);
  }
  // And the per-kit 404 pages stay out, which is the other exclusion rule.
  assert.ok(!locs.some((u) => u.endsWith('/404.html')), 'a 404 page reached the sitemap');
});

test('a build aimed at a fixture describes the fixture, not this checkout', () => {
  // Regression guard for a cross-tree bug this suite surfaced: build.mjs roots
  // itself at process.cwd() while gen-sitemap.mjs roots itself at its own file
  // location, so a fixture build used to emit a sitemap listing phlix-website's
  // own sites. It was invisible while the scan target was sites/, because the
  // real sites/ is never empty and a wrong answer still looks like an answer.
  const dir = makeFixture({ deployed: DEPLOYED, authoredOnly: AUTHORED_ONLY });
  assert.equal(runBuild(dir).code, 0);
  const { slugs } = sitemapSlugs(dir);

  const realSlugs = new Set(globSync('*/index.html', { cwd: join(ROOT, 'sites') }).map((r) => r.split('/')[0]));
  assert.ok(realSlugs.size > 0, 'no real sites/ to contrast against');
  const leaked = [...slugs].filter((s) => realSlugs.has(s) && !DEPLOYED.includes(s));
  assert.deepEqual(leaked, [], `the fixture's sitemap leaked slugs from this checkout: ${leaked}`);
  assert.deepEqual([...slugs].sort(), DEPLOYED.slice().sort());
});

test('--site <slug> still reads the source tree, not dist/', () => {
  // The discriminating case is a slug that exists in sites/ but NOT in dist/:
  // a dist/ scan returns nothing for it, a sites/ scan returns its pages.
  const dir = makeFixture({ deployed: DEPLOYED, authoredOnly: AUTHORED_ONLY });
  assert.equal(runBuild(dir).code, 0);

  const slug = AUTHORED_ONLY[0];
  const urls = sitemapUrls(slug, dir);
  assert.ok(urls.length > 0, `sitemapUrls('${slug}') returned nothing — it is reading dist/`);
  assert.ok(urls.every((u) => u.startsWith(`${SITE_URL}/${slug}/`)));
  assert.ok(!urls.some((u) => u.endsWith('/404.html')));
});

test('an empty dist/ throws instead of emitting a zero-entry sitemap', () => {
  const dir = mkdtempSync(join(tmpdir(), 'phlix-sitemap-empty-'));
  tempRoots.push(dir);
  mkdirSync(join(dir, 'dist'), { recursive: true });

  assert.throws(() => sitemapUrls(null, dir), /Refusing to emit an empty sitemap/);

  // Control arm: the same call against the same root succeeds the moment dist/
  // has a page, so the throw above is caused by emptiness and nothing else.
  mkdirSync(join(dir, 'dist', 'only-site'), { recursive: true });
  writeFileSync(join(dir, 'dist', 'only-site', 'index.html'), page, 'utf8');
  assert.deepEqual(sitemapUrls(null, dir), [`${SITE_URL}/only-site/`]);
});
