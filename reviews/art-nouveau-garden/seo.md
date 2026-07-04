# SEO Review — art-nouveau-garden

**Variant**: art-nouveau-garden
**Round**: 1
**Reviewer**: code-reviewer agent
**Date**: 2026-07-01

## Score

- **SEO**: 74 / 100

## ✅ Passed

- Title tags ≤60 chars on all 8 pages: index (42), features (16), clients (15), download (17), plugins (16), docs (12), hub (11), about (14)
- Meta descriptions ≤160 chars on all 8 pages (all 140 chars)
- One `<h1>` per page confirmed across all 8 pages — correct heading anchor for each page
- Logical heading hierarchy: h1 → h2 → h3; no skipped levels on any page
- `sitemap.xml` contains all 8 pages with absolute canonical URLs, correct `<priority>` and `<changefreq>` values
- `robots.txt` exists and references sitemap
- Descriptive anchor text throughout — "See all features →", "View source", "Get started" — no "click here" anywhere
- JSON-LD `SoftwareApplication` block present on home page with `name`, `description`, `applicationCategory`, `operatingSystem`, `license`, `offers/price=0`
- Semantic landmarks correct on all pages: one `<header role="banner">`, one `<nav aria-label="Primary navigation">`, one `<main id="main-content" tabindex="-1">`, one `<footer role="contentinfo">`
- `<meta name="keywords">` present on all pages
- `aria-current="page"` on the active nav link on all 8 pages — helps search engines understand site hierarchy
- External links use `rel="noopener noreferrer"` throughout — no security/leak issues

## ⚠️ Concerns (non-blocking)

- **All inner page titles are too brief** — "Features — Phlix", "Clients — Phlix", etc. are 8–17 chars, leaving most of the 60-char budget unused. Adding a differentiating phrase like "Features — Phlix: SyncPlay, DLNA, Live TV & More" would capture more branded search real estate. — Suggest adding 1–2 distinguishing words per title
- **Content duplication risk on inner page meta descriptions** — all 8 pages share the identical 140-char description from `content.json`. Google may consider these near-duplicate meta tags across 8 pages. Differentiating per-page descriptions would improve SEO. — Suggest crafting unique 155–160 char descriptions per page that reflect that page's specific content

## ❌ Failures (must fix this round)

- **features.html:8, clients.html:8, download.html:8, plugins.html:8, docs.html:8, hub.html:8, about.html:8** — All 7 inner pages are missing `<link rel="canonical">` tags. They currently inherit the default `<head>` without an explicit canonical, meaning search engines may index them under the bare GitHub Pages URL rather than the intended canonical. — Add `<link rel="canonical" href="https://detain.github.io/phlix-website/sites/art-nouveau-garden/{page}.html">` to the `<head>` of each of the 7 inner pages (index.html already has it)
- **index.html:13, features.html:12, …** (all 8 pages) — `og:image` meta tag points to `https://detain.github.io/phlix-website/sites/art-nouveau-garden/img/og.svg`. The review rubrics and new_site.md §11 require og:image to be a rasterised 1200×630 PNG. `og.svg` is a valid XML SVG but Facebook/Twitter/cached previews will not render it correctly at the standard 1200×630 preview size. The built site has no `img/og.png`. — Generate a 1200×630 rasterised PNG from og.svg and update all 8 `og:image` meta tags to point to it

## Recommendations (ranked by impact)

1. **Add canonical tags to all 7 inner pages** (impact: high, effort: low) — One-line addition per page; critical for correct search indexing
2. **Generate og.png (1200×630)** (impact: high, effort: medium) — Required for social sharing correctness; update meta tags on all 8 pages
3. **Differentiate page meta descriptions** (impact: medium, effort: medium) — Unique per-page descriptions reduce duplication signals and capture more long-tail queries
4. **Expand inner page titles to use full 60-char budget** (impact: medium, effort: low) — "Features — Phlix Media Server" reads better than "Features — Phlix"

## Evidence

- Canonical check: `grep -n "canonical" sites/art-nouveau-garden/*.html`
- Title lengths: manual count per title tag in each HTML file
- Sitemap: `sites/art-nouveau-garden/sitemap.xml` — all 8 URLs present
- JSON-LD on index.html:36-52
- Descriptive anchors: `grep -n "click here\|learn more\|here" sites/art-nouveau-garden/*.html` — no generic anchors found
