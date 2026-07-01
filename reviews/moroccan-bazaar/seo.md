# SEO Review — Moroccan Bazaar

**Variant**: moroccan-bazaar
**Round**: 2
**Reviewer**: reviewer
**Date**: 2026-07-01

## Score
- **SEO**: 93 / 100

## ✅ Passed
- Canonical URL on all 8 pages pointing to `https://detain.github.io/phlix-website/sites/moroccan-bazaar/`
- `<link rel="canonical">` prevents duplicate content issues
- Unique, descriptive `<title>` on each page (e.g., "Features — Phlix Moroccan Bazaar")
- Meta description on all pages matching page content (not generic)
- Keywords meta tag with relevant terms on all pages
- Open Graph meta (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`) complete on all pages
- JSON-LD structured data on index.html with Schema.org `SoftwareApplication`, price, license, operatingSystem
- `robots.txt` present
- `sitemap.xml` present
- Internal navigation links between all pages
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`) helps crawlers understand page hierarchy

## ⚠️ Concerns (non-blocking)
- JSON-LD `applicationCategory` uses `"MultimediaApplication"` which is valid but generic — could use `"VideoApplication"` per Schema.org hierarchy for better SERP enrichment
- No `hreflang` tags — acceptable for single-language site, but a missed opportunity if international markets are targeted later
- No explicit `description` override for Open Graph (uses same content as meta description) — acceptable but OG descriptions could be more social-channel specific

## ❌ Failures (must fix)
- None
