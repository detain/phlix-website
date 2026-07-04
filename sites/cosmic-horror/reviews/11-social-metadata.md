# Social Metadata Review — Cosmic Horror

**Variant**: cosmic-horror
**Round**: 1 (adversarial)
**Reviewer**: adversarial-code-reviewer
**Date**: 2026-07-04

## Score

- **Social metadata**: 90 / 100

## ✅ Passed

- **Open Graph on all 8 pages**:
  - `og:type`: `website` on all pages ✓
  - `og:site_name`: `Phlix` on all pages ✓
  - `og:url`: absolute URL on every page (e.g., `https://detain.github.io/phlix-website/cosmic-horror/` on index.html:27) ✓
  - `og:title`: present on all 8 pages ✓
  - `og:description`: present on all 8 pages ✓
  - `og:image`: absolute URL to `og.svg` on all 8 pages — e.g., index.html:25 `https://detain.github.io/phlix-website/cosmic-horror/img/og.svg` ✓
- **Twitter Card on all 8 pages**:
  - `twitter:card`: `summary_large_image` on all pages ✓
  - `twitter:title`: present on all 8 pages ✓
  - `twitter:description`: present on all 8 pages ✓
  - `twitter:image`: absolute URL to `og.svg` on all 8 pages ✓
  - `twitter:creator`: `@detain` on all 8 pages ✓
- **Theme color**: `<meta name="theme-color" content="#00CC66" />` on all 8 pages — kit primary color ✓
- **Favicon**: `<link rel="icon" type="image/svg+xml" href="img/favicon.svg" />` on all 8 pages ✓
- **All og:image and canonical URLs are absolute** (not relative) — known past bug avoided ✓
- JSON-LD `SoftwareApplication` on every page (not just home) with complete data: name, description, applicationCategory, operatingSystem, offers/price=0, license ✓

## ⚠️ Concerns (non-blocking)

- **og.svg not rasterized to og.png** — new_site.md §8 and BUILD_LOG.md:64 note that `og.svg` should be rasterized to `og.png` for Apple News and older scrapers compatibility. The site ships `og.svg` which works on most platforms but may fail on some. This is documented in BUILD_LOG.md as a known follow-up, not a hard failure. — *impact: medium, effort: medium*
- **og:image dimensions not verified** — og.svg source should be 1200×630 per spec. Not verified in code review but BUILD_LOG.md:83 documents the asset list includes "1200×630 social share image (or og.svg → png)". — *impact: low*

## ❌ Failures (must fix this round)

None — no blocking issues in this dimension. All required meta tags present, all URLs absolute.

## Recommendations (ranked by impact)

1. Rasterize `og.svg` to `og.png` at 1200×630 for maximum scraper compatibility (impact: medium, effort: medium) — documented in BUILD_LOG.md as known follow-up
2. Consider adding `og:image:width` and `og:image:height` meta tags for better image handling (impact: low, effort: low)

## Evidence

- index.html:17-49 — full OG + Twitter meta block
- All 8 pages verified to have og:title, og:description, og:image (absolute), og:url, og:type, og:site_name
- All 8 pages have twitter:card, twitter:title, twitter:description, twitter:image (absolute), twitter:creator
- All 8 pages have `<meta name="theme-color" content="#00CC66" />`
- `sitemap.xml` — all 8 pages with absolute canonical URLs
- BUILD_LOG.md:64 — "og.png — Rasterise og.svg → og.png" noted as follow-up
