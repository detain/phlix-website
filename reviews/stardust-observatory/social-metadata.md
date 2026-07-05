# Social Metadata Review — stardust-observatory

**Variant**: 01-minimalist-cinema
**Round**: 1
**Reviewer**: Senior Front-End Reviewer
**Date**: 2026-07-04

## Score

- **Social Metadata**: 55 / 100

## ✅ Passed

- All 8 pages have complete Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type=website`, `og:site_name=Phlix`
- All 8 pages have complete Twitter Card tags: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator=@detain`
- All `og:image` URLs are **absolute** (`https://detain.github.io/phlix-website/sites/stardust-observatory/img/og.png`) — correctly avoiding the "relative og:image" past bug noted in new_site.md §11
- All `og:url` and `<link rel="canonical">` URLs are **absolute** on every page
- `theme-color` meta tag present on all 8 pages with correct brand-kit primary value `#C9A84C`
- `<link rel="icon" type="image/svg+xml">` present on all 8 pages
- JSON-LD `SoftwareApplication` schema present on home page (`index.html:38-53`) with required fields: `@context`, `@type`, `name`, `description`, `applicationCategory`, `operatingSystem`, `license`, `offers.price=0`

## ⚠️ Concerns (non-blocking)

- `og:image` is an SVG file (`img/og.svg` at 3.2KB) but new_site.md §8 requires it to be a rasterized **PNG** at 1200×630px. While the meta tag references `og.png` (a different file), the file is SVG. Social scrapers (Facebook, LinkedIn, Slack) generally require raster images for `og:image`. Twitter Card validation also benefits from raster images. This is **not** a hard blocker if `og.png` is a proper 1200×630 raster, but the `img/` listing shows only `og.svg` exists, not `og.png`.
- `og:description` varies across pages (index uses truncated "Self-hostable PHP media server. Your media. Your library. Your Phlix." vs other pages use different copy) — inconsistency but not an error
- JSON-LD `license` field uses `https://opensource.org/licenses/BSD-3-Clause` which differs from content.json footer link `https://github.com/phlix-website/blob/master/LICENSE` — minor inconsistency but both reference BSD-3

## ❌ Failures (must fix this round)

- **`img/` directory contains `og.svg` (3.2KB) but NO `og.png` (1200×630)** — new_site.md §8 and §11 require a rasterized 1200×630 PNG for social sharing. The meta tags reference `img/og.png` but only `og.svg` exists. This will cause social previews to fail on platforms that require raster og:image.
- **JSON-LD exists only on `index.html`** — new_site.md §10 specifies "JSON-LD `SoftwareApplication` block on the home page" only, so this is actually correct behavior — marking as concern only because the rubric asks for "ALL 8 pages"

## Recommendations (ranked by impact)

1. **Generate `og.png` as 1200×630 raster** (impact: high, effort: medium) — either export `og.svg` to PNG at exact 1200×630 dimensions, or regenerate the social share image per brand kit's `page_generation_rules`. Update `img/` to contain both `og.svg` (editable source) and `og.png` (deployed raster).
2. **Verify og.png dimensions are exactly 1200×630** (impact: high, effort: low) — new_site.md §11 is explicit: "og:image (1200×630)". Any other dimensions will be cropped by social scrapers.

## Evidence

- og:image absolute URL confirmed on all 8 pages — example: `index.html:14` = `https://detain.github.io/phlix-website/sites/stardust-observatory/img/og.png`
- og:url absolute confirmed on all 8 pages — example: `index.html:15` = `https://detain.github.io/phlix-website/sites/stardust-observatory/`
- canonical absolute confirmed on all 8 pages — example: `index.html:9` = `https://detain.github.io/phlix-website/sites/stardust-observatory/`
- theme-color #C9A84C confirmed on all 8 pages — example: `index.html:27`, `features.html:23`, `clients.html:23`
- twitter:card=summary_large_image confirmed on all 8 pages
- twitter:creator=@detain confirmed on all 8 pages
- JSON-LD home page: `index.html:38-53` — SoftwareApplication schema with all required fields
- img/ contents via `ls -la`: og.svg (3190B), og.png **not present**
- sitemap.xml exists at `/home/sites/phlix/phlix-website/sites/stardust-observatory/sitemap.xml` (confirmed via initial site listing)
- robots.txt exists at `/home/sites/phlix/phlix-website/sites/stardust-observatory/robots.txt`
