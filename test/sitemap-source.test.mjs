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
// WHAT IT ASSERTS
// ---------------
//   1. The slug set in the site-wide sitemap equals the slug set in dist/,
//      compared as an EXACT SET IN BOTH DIRECTIONS. A one-directional subset
//      check passes a sitemap that has silently lost half its pages.
//   2. The exclusion is non-vacuous: sites/ really does contain slugs that dist/
//      does not, and none of them appear. Without this, assertion 1 would pass
//      trivially on a checkout where the two trees happened to agree, and the
//      bug this file exists to catch would be invisible.
//   3. `--site <slug>` still reads the SOURCE tree — a regen agent writes a
//      per-kit sitemap before any build exists.
//   4. An empty dist/ THROWS instead of emitting a zero-entry <urlset>. This is
//      exercised behaviourally, against a real copy of the module pointed at an
//      empty tree — not by grepping the source for a `throw`.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { globSync } from 'glob';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const { sitemapUrls, SITE_URL } = await import(
  pathToFileURL(join(root, 'tools/gen-sitemap.mjs')).href
);

/** Slug of every directory that really carries an index.html under `dir`. */
function slugsWithIndex(dir) {
  return new Set(globSync('*/index.html', { cwd: join(root, dir) }).map((r) => r.split('/')[0]));
}

const distSlugs = slugsWithIndex('dist');
const siteSlugs = slugsWithIndex('sites');

test('precondition: dist/ is built (this suite is meaningless against an empty artifact)', () => {
  assert.ok(
    distSlugs.size > 0,
    'no dist/*/index.html — run `npm run build` before `npm run test:unit`',
  );
});

test('the site-wide sitemap covers exactly the slugs in dist/, both directions', () => {
  const urls = sitemapUrls();
  const prefix = `${SITE_URL}/`;
  const inSitemap = new Set(
    urls.map((u) => {
      assert.ok(u.startsWith(prefix), `sitemap URL outside the site base: ${u}`);
      return u.slice(prefix.length).split('/')[0];
    }),
  );

  const missing = [...distSlugs].filter((s) => !inSitemap.has(s));
  const extra = [...inSitemap].filter((s) => !distSlugs.has(s));

  assert.deepEqual(missing, [], `deployed but absent from the sitemap: ${missing.join(', ')}`);
  assert.deepEqual(extra, [], `in the sitemap but not deployed: ${extra.join(', ')}`);
});

test('the exclusion is non-vacuous: sites/ holds slugs dist/ does not', () => {
  const undeployed = [...siteSlugs].filter((s) => !distSlugs.has(s));
  assert.ok(
    undeployed.length > 0,
    'every authored site is deployed, so this suite cannot tell a dist/ scan from a sites/ scan — ' +
      'the assertions above are unfalsifiable and must be revisited',
  );

  const urls = sitemapUrls().join('\n');
  for (const slug of undeployed) {
    assert.ok(
      !urls.includes(`${SITE_URL}/${slug}/`),
      `undeployed site "${slug}" is advertised in the sitemap`,
    );
  }
});

test('--site <slug> still reads the source tree, not dist/', () => {
  // A slug that exists in sites/ but NOT in dist/ is the discriminating case:
  // a dist/ scan returns nothing for it, a sites/ scan returns its pages.
  const undeployed = [...siteSlugs].find((s) => !distSlugs.has(s));
  assert.ok(undeployed, 'no undeployed slug available to discriminate on');

  const urls = sitemapUrls(undeployed);
  assert.ok(
    urls.length > 0,
    `sitemapUrls('${undeployed}') returned nothing — the per-kit path is reading dist/`,
  );
  assert.ok(urls.every((u) => u.startsWith(`${SITE_URL}/${undeployed}/`)));
});

test('an empty dist/ throws instead of emitting a zero-entry sitemap', async () => {
  // Behavioural, not textual: a real copy of the module in a tree whose dist/
  // exists but is empty. The temp tree lives inside the repo so that Node still
  // resolves `glob` from the repo's own node_modules.
  const tmp = mkdtempSync(join(root, '.sitemap-empty-'));
  try {
    mkdirSync(join(tmp, 'tools'), { recursive: true });
    mkdirSync(join(tmp, 'shared'), { recursive: true });
    mkdirSync(join(tmp, 'dist'), { recursive: true });
    mkdirSync(join(tmp, 'sites'), { recursive: true });
    cpSync(join(root, 'tools/gen-sitemap.mjs'), join(tmp, 'tools/gen-sitemap.mjs'));
    writeFileSync(
      join(tmp, 'shared/content.json'),
      JSON.stringify({ site: { url: 'https://example.invalid/base' } }),
      'utf8',
    );

    const mod = await import(pathToFileURL(join(tmp, 'tools/gen-sitemap.mjs')).href);

    // Control arm: the same module returns a sitemap happily once dist/ has a
    // page, so the throw below is caused by emptiness and not by the temp tree.
    assert.throws(() => mod.sitemapUrls(), /Refusing to emit an empty sitemap/);

    mkdirSync(join(tmp, 'dist/only-site'), { recursive: true });
    writeFileSync(join(tmp, 'dist/only-site/index.html'), '<!doctype html>', 'utf8');
    assert.deepEqual(mod.sitemapUrls(), ['https://example.invalid/base/only-site/']);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
});
