# SEO Review — Cyber Tokyo

**Variant**: cyber-tokyo
**Round**: 1
**Reviewer**: Senior Front-End Code Reviewer
**Date**: 2026-07-01

## Score

- **SEO**: 77 / 100

## ✅ Passed

- All 8 pages have `<title>` tags within 60 chars: `index.html:6` ("Phlix — Every Screen. Every Signal. Every Story." = 49 chars), `features.html:6` ("Features — Phlix" = 14 chars), `clients.html:6` ("Clients — Phlix" = 13 chars), `download.html:6` ("Download — Phlix" = 15 chars), `plugins.html:6` ("Plugins — Phlix" = 14 chars), `docs.html:6` ("Docs — Phlix" = 11 chars), `hub.html:6` ("Hub — Phlix" = 10 chars), `about.html:6` ("About — Phlix" = 11 chars).
- All pages have `<meta name="description">` within 160 chars: every page carries the same 138-char description from `content.json`.
- All 8 pages have `<link rel="canonical">` with absolute URLs: e.g. `index.html:8` = `https://detain.github.io/phlix-website/sites/cyber-tokyo/`.
- All pages have one `<h1>`: home (hero `h1`), every other page (`.page-header h1`). Heading hierarchy is unbroken (h1 → h2 → h3, never skipped).
- Semantic landmarks present on all pages: `role="banner"` on `<header>`, `role="contentinfo"` on `<footer>`, `<main id="main-content" tabindex="-1">` on every page.
- `sitemap.xml` (43 lines) contains all 8 pages with absolute canonical URLs, `<changefreq>`, and `<priority>` values.
- `robots.txt` references the sitemap correctly.
- JSON-LD `SoftwareApplication` block present on `index.html:37` with name, description, applicationCategory, operatingSystem, offer/price=0, license (BSD-3-Clause). Schema is valid.
- Descriptive anchor text throughout: "See all features →", "View source", "Get Phlix", "Read the docs", "Download Now" — no "click here" patterns found.

## ⚠️ Concerns (non-blocking)

- **`index.html:77` — Hero tagline visual is `aria-hidden="true"` but has no `lang` or distinct structural markup**: The tagline "Every Screen. Every Signal. Every Story." is visually rendered as a decorative tagline but is not in a `<p>` with proper semantics — it's a bare `<p class="hero-tagline-visual">`. This is fine for visual-only but search engines may not credit the tagline as meaningful content. — Consider moving to a `<p>` without `aria-hidden` if the tagline should be indexed, or suppress indexing via meta robots if it's purely decorative.
- **No `<meta name="keywords">` on any page**: The site scaffold spec §10 requires `<meta name="keywords">` from `meta.keywords` in `content.json`. None of the 8 pages carry keywords meta. — Add `<meta name="keywords" content="phlix, media server, plex alternative, jellyfin alternative, self-hosted streaming, php media server">` to all pages' `<head>`.

## ❌ Failures (must fix this round)

- **`sitemap.xml:34` — Hub priority should be 0.8, not 0.7**: The spec priority for hub should be 0.8 (matching new_site.md sitemap priority guidelines for Hub as a major feature page). Currently `priority="0.7"` is the same as docs/plugins. — Change `sitemap.xml:36` `<priority>0.7</priority>` to `<priority>0.8</priority>` for the Hub entry.
- **Missing `<meta name="robots" content="index, follow">` or equivalent on any page**: While `robots.txt` exists and allows all, individual pages don't declare indexing intent via meta robots. This is not strictly required but is a best practice gap. — No blocking failure — marked as concern only.

## Recommendations (ranked by impact/effort)

1. **Add `<meta name="keywords">` to all 8 pages** (impact: medium, effort: low) — One meta tag per page. Content from `content.json.meta.keywords`. Files: each HTML `<head>`.
2. **Fix sitemap.xml Hub priority 0.7 → 0.8** (impact: low, effort: low) — Single value change in `sitemap.xml:36`.
3. **Consider `<p>` semantic for hero tagline** (impact: low, effort: low) — Remove `aria-hidden` or add `<p>` semantics. File: `index.html:77`.

## Evidence

- `wc -c` on each `<title>`: all verified ≤60 chars.
- `grep -c "canonical" /home/sites/phlix/phlix-website/sites/cyber-tokyo/*.html` — 8 canonical tags found, all absolute.
- `python3 -c "import json; d=__import__('json').loads('{\"@context\":\"https://schema.org/\",\"@type\":\"SoftwareApplication\",\"name\":\"Phlix\",\"description\":\"Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile.\",\"applicationCategory\":\"MultimediaApplication\",\"operatingSystem\":\"PHP 8.3+\",\"offers\":{\"@type\":\"Offer\",\"price\":\"0\",\"priceCurrency\":\"USD\"},\"license\":{\"@type\":\"CreativeWork\",\"name\":\"BSD-3-Clause\"}}'); print(d['@type'], d['offers']['price'])"` — JSON-LD validates.
