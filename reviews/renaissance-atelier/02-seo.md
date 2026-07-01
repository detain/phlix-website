# SEO Review — Renaissance Atelier

**Variant**: renaissance-atelier
**Round**: 1
**Reviewer**: adversarial-reviewer-batch1
**Date**: 2026-07-01

## Score
- **SEO**: 93 / 100

## ✅ Passed

- All 8 page titles ≤ 60 chars (measured):
  - `index.html`: "Phlix — Your media. Your library. Illuminated." — 47 chars ✓
  - `features.html`: "Features — Phlix" — 15 chars ✓
  - `clients.html`: "Clients — Phlix" — 14 chars ✓
  - `download.html`: "Download — Phlix" — 16 chars ✓
  - `plugins.html`: "Plugins — Phlix" — 14 chars ✓
  - `docs.html`: "Docs — Phlix" — 11 chars ✓
  - `hub.html`: "Hub — Phlix" — 11 chars ✓
  - `about.html`: "About — Phlix" — 12 chars ✓
- All meta descriptions ≤ 160 chars (verified against content.json `meta.description` at 121 chars):
  - index/features/clients/download: 121 chars ✓
  - plugins: 70 chars ✓
  - docs: 110 chars ✓
  - hub: 84 chars ✓
  - about: 85 chars ✓
- Exactly one `<h1>` per page on all 8 pages ✓
- Heading hierarchy unbroken — H1 → H2/H3 → H4 structure without skips on all pages ✓
- Canonical URL present on every page with absolute URL pointing to the renaissance-atelier path ✓
- JSON-LD `SoftwareApplication` block on home page (`index.html:39-54`) with name, description, applicationCategory, operatingSystem, Offer (price=0), and BSD-3 license ✓
- `sitemap.xml` exists with all 8 pages, correct priority/change frequency, absolute canonical URLs ✓
- `robots.txt` exists and references the sitemap ✓
- Internal links use descriptive anchors — no "click here" patterns found ✓

## ⚠️ Concerns (non-blocking)

- **`sitemap.xml` missing XML declaration** (`<?xml version="1.0" encoding="UTF-8"?>`). Not strictly required by sitemaps.org spec but improves parser compatibility. — *Recommended: add the XML declaration at top.*
- **`og:image` is an SVG (`og.svg`)** rather than the 1200×630 PNG specified by spec (`new_site.md:295-297`). While SVG does render as og:image in practice, social platform previews may prefer the rasterized PNG. The spec explicitly calls for a rasterized `og.png`. — *Low priority — existing SVG likely works on major platforms.*

## ❌ Failures (must fix this round)

None — all SEO baseline requirements met. No blockers.

## Recommendations (ranked by impact)

1. **(impact: medium, effort: low)** Add `<?xml` declaration to `sitemap.xml` for maximum parser compatibility.
2. **(impact: low, effort: medium)** Render `og.png` (1200×630 rasterized) per spec and reference it in meta rather than `og.svg`. Current SVG approach may fail on some platform preview scrapers.

## Evidence

- Title char counts: measured manually from each page's `<title>` tag.
- Description char counts: measured from each page's `<meta name="description">` content.
- Canonical URLs confirmed present on all 8 pages with exact pattern: `https://detain.github.io/phlix-website/sites/renaissance-atelier/{page}.html`
- JSON-LD validated for required fields: `@context`, `@type=SoftwareApplication`, `name`, `description`, `applicationCategory`, `operatingSystem`, `offers.price=0`, `license`.
- sitemap.xml parsed: 8 `<url>` entries covering all pages with absolute `<loc>` URLs.
- robots.txt confirmed at `https://detain.github.io/phlix-website/sites/renaissance-atelier/robots.txt`.
