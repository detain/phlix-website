#!/usr/bin/env node
// gen-sitemap.mjs — emit a sitemap of every page's canonical URL (Step B1/B2).
//
// Exposes buildSitemap()/sitemapUrls() so build.mjs can fold sitemap +
// robots.txt emission into the static build, and can also be run standalone:
//
//   node tools/gen-sitemap.mjs            # writes dist/sitemap.xml
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

/** Every canonical URL across the built site HTML pages, sorted & de-duplicated. */
export function sitemapUrls() {
  const urls = new Set();
  for (const rel of globSync('*/*.html', { cwd: SITES })) {
    const [slug, file] = rel.split('/');
    urls.add(file === 'index.html' ? `${SITE_URL}/${slug}/` : `${SITE_URL}/${slug}/${file}`);
  }
  return [...urls].sort();
}

export function buildSitemap(urls = sitemapUrls()) {
  const body = urls.map((u) => `  <url>\n    <loc>${u}</loc>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function robotsTxt() {
  return `User-agent: *\nAllow: /\nSitemap: ${SITEMAP_URL}\n`;
}

// Run standalone → write dist/sitemap.xml (+ robots.txt for convenience).
if (resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  const DIST = resolve(ROOT, 'dist');
  mkdirSync(DIST, { recursive: true });
  const urls = sitemapUrls();
  writeFileSync(join(DIST, 'sitemap.xml'), buildSitemap(urls), 'utf8');
  writeFileSync(join(DIST, 'robots.txt'), robotsTxt(), 'utf8');
  console.log(`[gen-sitemap] wrote dist/sitemap.xml (${urls.length} URLs) + robots.txt`);
}
