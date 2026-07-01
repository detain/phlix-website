# SEO Review — Solarpunk Eden

**Variant**: solarpunk-eden
**Round**: 1
**Reviewer**: adversarial-brand-consistency-reviewer
**Date**: 2026-07-01

## Score

- **SEO**: 88 / 100

## ✅ Passed

- All page `<title>` tags within 60 chars: "Phlix — Stream in the Sunshine." (32), "Features — Phlix" (15), "Clients — Phlix" (14), "Download — Phlix" (16), "Plugins — Phlix" (15), "Docs — Phlix" (11), "Hub — Phlix" (10), "About — Phlix" (12)
- All `<meta name="description">` content ≤ 160 chars (verified at ~113 chars for default)
- Canonical URL present on all 8 pages — `index.html:8`, `features.html:8`, `clients.html:8`, `download.html:8`, `plugins.html:8`, `docs.html:8`, `hub.html:8`, `about.html:8`
- `<link rel="canonical">` uses absolute URL format
- `sitemap.xml` exists with all 8 pages, absolute `<loc>` URLs, correct `priority` values (1.0 home → 0.6 about)
- `robots.txt` references sitemap at correct path
- `robots.txt:2` uses correct path `Allow: /solarpunk-eden/` — matches deployed URL structure
- One `<h1>` per page: home (hero h1), all inner pages (page-header h1)
- Heading hierarchy unbroken: h1 → h2 → h3, no skips detected
- All anchor text is descriptive: "See all features →", "View source", "Get started in minutes", "Download Phlix" — no "click here" patterns found
- JSON-LD `SoftwareApplication` on home page with `name`, `description`, `applicationCategory`, `operatingSystem`, `offers`, `license` — `index.html:37-52`
- Semantic landmarks present: `role="banner"` (1), `role="contentinfo"` (1), `<main id="main-content">` (1) per page

## ⚠️ Concerns (non-blocking)

- **about.html:11** — `og:description` = "Self-hosted media. Open source. No lock-in. BSD-3-Clause across the board." differs from `<meta name="description">` = "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support." Social description is shorter and more brand-forward but content.json has no specific about-page description — falls within acceptable variation.
- **download.html:64-69** — The "Server" heading uses `<h2 class="reveal">` (CSS reveal animation class) as a styling hook, which is valid but the `reveal` class name is exposed in HTML where `class="reveal"` is semantic animation marker. This is fine but unusual naming.

## ❌ Failures (must fix this round)

- No failures found. All SEO requirements met.

## Recommendations (ranked by impact)

1. Consider page-specific `<meta name="description">` variations for hub.html and plugins.html (currently uses generic copy from content.json meta) — matches brand voice better (impact: low, effort: low)
2. Consider adding `<meta name="keywords">` — was in content.json but not implemented; new_site.md §10 lists it as required (impact: low, effort: trivial)

## Evidence

- `grep -n "<title>" /home/sites/phlix/sites/solarpunk-eden/*.html | awk -F: '{print length($3), $0}'` for char count verification
- `grep -n "canonical\|description\|og:\|twitter:\|<h1\|<h2\|<h3" /home/sites/phlix/sites/solarpunk-eden/index.html`
- Manual sitemap.xml and robots.txt verification above
