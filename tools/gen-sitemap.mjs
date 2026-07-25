#!/usr/bin/env node
// gen-sitemap.mjs — emit a sitemap of every page's canonical URL (Step B1/B2).
//
// Exposes buildSitemap()/sitemapUrls() so build.mjs can fold sitemap +
// robots.txt emission into the static build, and can also be run standalone:
//
//   node tools/gen-sitemap.mjs            # writes dist/sitemap.xml
//   node tools/gen-sitemap.mjs --site <slug>
//                                         # writes sites/<slug>/sitemap.xml +
//                                         # robots.txt, scoped to that kit only,
//                                         # so a regen agent can refresh its own
//                                         # sitemap without touching other kits.
//
// Canonical URLs are derived from the same rule as tools/fix-meta.mjs /
// check-meta.mjs:  <site.url>/<slug>/  for index.html else  <site.url>/<slug>/<page>.html

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITES = join(ROOT, 'sites');

export const SITE_URL = String(
  JSON.parse(readFileSync(join(ROOT, 'shared', 'content.json'), 'utf8')).site.url,
).replace(/\/+$/, '');

export const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

/**
 * Every canonical URL across the built site HTML pages, sorted & de-duplicated.
 * Pass `slug` to scope the result to a single kit.
 */
export function sitemapUrls(onlySlug = null) {
  const urls = new Set();
  const pattern = onlySlug ? `${onlySlug}/*.html` : '*/*.html';
  for (const rel of globSync(pattern, { cwd: SITES })) {
    const [slug, file] = rel.split('/');
    // Per-kit 404 pages are reached only through the root 404 shim and carry
    // noindex — they are not canonical destinations, so keep them out.
    if (file === '404.html') continue;
    urls.add(file === 'index.html' ? `${SITE_URL}/${slug}/` : `${SITE_URL}/${slug}/${file}`);
  }
  return [...urls].sort();
}

export function buildSitemap(urls = sitemapUrls()) {
  const body = urls.map((u) => `  <url>\n    <loc>${u}</loc>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

/**
 * `robots.txt` body. Defaults to the site-wide sitemap (what `dist/` needs);
 * pass a slug for a per-kit `robots.txt`, which new_site.md §10 requires to
 * reference **that kit's own** sitemap rather than the root one.
 */
export function robotsTxt(slug = null) {
  const sitemap = slug ? `${SITE_URL}/${slug}/sitemap.xml` : SITEMAP_URL;
  return `User-agent: *\nAllow: /\nSitemap: ${sitemap}\n`;
}

// Run standalone → write dist/sitemap.xml (+ robots.txt for convenience), or
// with `--site <slug>` write that one kit's sitemap.xml + robots.txt in place.
if (resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  const siteFlag = process.argv.indexOf('--site');
  const slug = siteFlag === -1 ? null : process.argv[siteFlag + 1];

  if (siteFlag !== -1 && !slug) {
    console.error('[gen-sitemap] --site requires a kit slug');
    process.exit(1);
  }

  if (slug) {
    const urls = sitemapUrls(slug);
    if (urls.length === 0) {
      console.error(`[gen-sitemap] no pages found under sites/${slug}/ — wrong slug?`);
      process.exit(1);
    }
    const out = join(SITES, slug);
    writeFileSync(join(out, 'sitemap.xml'), buildSitemap(urls), 'utf8');
    writeFileSync(join(out, 'robots.txt'), robotsTxt(slug), 'utf8');
    console.log(`[gen-sitemap] wrote sites/${slug}/sitemap.xml (${urls.length} URLs) + robots.txt`);
  } else {
    const DIST = resolve(ROOT, 'dist');
    mkdirSync(DIST, { recursive: true });
    const urls = sitemapUrls();
    writeFileSync(join(DIST, 'sitemap.xml'), buildSitemap(urls), 'utf8');
    writeFileSync(join(DIST, 'robots.txt'), robotsTxt(), 'utf8');
    console.log(`[gen-sitemap] wrote dist/sitemap.xml (${urls.length} URLs) + robots.txt`);
  }
}
