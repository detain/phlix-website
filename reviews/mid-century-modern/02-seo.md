# SEO Review — mid-century-modern

**Variant**: mid-century-modern
**Round**: 1
**Reviewer**: adversarial SEO reviewer
**Date**: 2026-07-01

## Score

- **SEO**: 100 / 100

## ✅ Passed

- All 8 pages have `<title>` ≤ 60 chars (home: 46 chars; all sub-pages: 12–17 chars)
- All 8 pages have `<meta name="description">` ≤ 160 chars (145 chars, well within limit)
- Every page has exactly one `<h1>`; heading hierarchy never skips a level (h1 → h2/h3 only)
- All 8 pages carry `<link rel="canonical">` with absolute GitHub Pages URLs
- `index.html` contains a valid JSON-LD `SoftwareApplication` block with name, description, applicationCategory, operatingSystem, offers (price=0, priceCurrency=USD, availability), and license
- `sitemap.xml` exists with all 8 pages and absolute `https://detain.github.io/…` URLs
- `robots.txt` exists and references `sitemap.xml` via absolute URL
- Internal links use descriptive anchor text throughout (no "click here", no bare URLs)
- Semantic HTML landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`) present on all pages with correct `role` attributes

## ⚠️ Concerns (non-blocking)

- None

## ❌ Failures (must fix this round)

- None

## Recommendations (ranked by impact)

1. No changes required — all SEO requirements are met

## Evidence

- **Titles**: Counted per-page via character count:
  - `index.html`: "Phlix — Your media. Your library. Your Phlix." = 46 chars
  - `features.html`: "Features — Phlix" = 16 chars
  - `clients.html`: "Clients — Phlix" = 16 chars
  - `download.html`: "Download — Phlix" = 17 chars
  - `plugins.html`: "Plugins — Phlix" = 16 chars
  - `docs.html`: "Docs — Phlix" = 13 chars
  - `hub.html`: "Hub — Phlix" = 12 chars
  - `about.html`: "About — Phlix" = 14 chars
  - All ≤ 60 ✓

- **Meta descriptions**: All 8 pages carry identical description = 145 chars ("Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support.") — within 160 ✓

- **Headings**: Each page verified — one `<h1>` each; all sub-headings are `<h2>` (or `<h3>` inside feature-cards); no level-skipping ✓

- **Canonical URLs** confirmed on all 8 pages (absolute `https://detain.github.io/phlix-website/sites/mid-century-modern/{page}.html`) ✓

- **JSON-LD** (index.html:54–70): validated structure — `@context: "https://schema.org"`, `@type: "SoftwareApplication"`, required fields present, `price: "0"` with `priceCurrency`, `license: "https://opensource.org/licenses/BSD-3-Clause"` ✓

- **sitemap.xml**: 8 `<url>` entries covering all pages; all `<loc>` values are absolute HTTPS URLs ✓

- **robots.txt**: 4 lines, references sitemap via `Sitemap:` directive with absolute URL ✓

- **Internal anchor text**: Spot-checked — "See all features →", "Get Phlix", "Read the docs", "Download Now", "User guide", "API reference", "Developer docs", "Hub admin guide", "Download Phlix" — all descriptive, no "click here" or bare URLs ✓

- **Semantic landmarks**: Every page has `<header role="banner">`, `<nav aria-label="Primary navigation">`, `<main id="main-content" tabindex="-1">`, `<footer role="contentinfo">` ✓
