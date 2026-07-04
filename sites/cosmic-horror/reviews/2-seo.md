# SEO Review — Cosmic Horror

**Variant**: cosmic-horror
**Round**: 1 (adversarial)
**Reviewer**: adversarial-code-reviewer
**Date**: 2026-07-04

## Score

- **SEO**: 83 / 100

## ✅ Passed

- All page titles ≤ 60 chars:
  - index.html: "Phlix — That Which Has Always Been Watching" = 45 chars ✓
  - features.html: "Features — Phlix" = 18 chars ✓
  - clients.html: "Clients — Phlix" = 16 chars ✓
  - download.html: "Download — Phlix" = 18 chars ✓
  - plugins.html: "Plugins — Phlix" = 17 chars ✓
  - docs.html: "Docs — Phlix" = 13 chars ✓
  - hub.html: "Hub — Phlix" = 12 chars ✓
  - about.html: "About — Phlix" = 13 chars ✓
- All meta descriptions ≤ 160 chars:
  - index.html: 133 chars ✓
  - features.html: 103 chars ✓
  - clients.html: 99 chars ✓
  - download.html: 67 chars ✓
  - plugins.html: 93 chars ✓
  - docs.html: 88 chars ✓
  - hub.html: 73 chars ✓
  - about.html: 74 chars ✓
- Canonical URL on every page (absolute `https://detain.github.io/phlix-website/cosmic-horror/...`) ✓
- JSON-LD `SoftwareApplication` on index.html with required fields (name, description, applicationCategory, operatingSystem, offers/price=0, license) ✓
- JSON-LD also on features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html — consistent ✓
- One `<h1>` per page: index.html:115 (`hero h1`), features.html:110, clients.html:106, download.html:103, plugins.html:100, docs.html:97, hub.html:97, about.html:103 — all correct ✓
- Heading hierarchy never skips a level — all pages use h1 → h2/h3 → body hierarchy ✓
- Semantic landmarks present: `role="banner"`, `role="navigation"`, `role="contentinfo"`, `main` — one each per page ✓
- Descriptive anchor text throughout — "View source", "Get Phlix", "Read the docs", "See all features" — no "click here" found ✓
- `sitemap.xml` with all 8 canonical URLs (absolute https://) ✓
- `robots.txt` references sitemap at correct URL ✓

## ⚠️ Concerns (non-blocking)

- **`keywords` meta tag absent on features.html and clients.html** — new_site.md §10 requires `<meta name="keywords" content="..." from meta.keywords>` on every page. features.html:17-18 and clients.html:9-10 only have description + canonical. The other 6 pages carry keywords. — *impact: medium, effort: low*
- **index.html title "That Which Has Always Been Watching"** — this is the kit's `tagline_primary`, not the product name. It works brand-wise but search engines expecting the product name in the title may not get it. However og:title uses the same so scrapers see it. Not a hard failure. — *impact: low*

## ❌ Failures (must fix this round)

- **`keywords` meta tag missing on features.html and clients.html** — violates new_site.md §10 "every page" requirement — *required outcome: add `<meta name="keywords" content="phlix, media server, plex alternative, jellyfin alternative, self-hosted streaming, php media server" />` to features.html and clients.html `<head>` sections*

## Recommendations (ranked by impact)

1. Add keywords meta to features.html and clients.html (impact: medium, effort: low)
2. Consider adding schema.org BreadcrumbList for interior pages (impact: low, effort: medium)

## Evidence

- `features.html:6-14` — no keywords meta tag present
- `clients.html:6-14` — no keywords meta tag present
- All other pages (index.html:3-15, download.html:6-14, plugins.html:6-14, docs.html:6-11, hub.html:6-11, about.html:6-11) include keywords meta
- `sitemap.xml` — all 8 pages with absolute locs confirmed
- `robots.txt` — references correct sitemap URL
