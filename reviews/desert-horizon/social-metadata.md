# Social Metadata Review — Desert Horizon

**Variant**: desert-horizon
**Round**: 1
**Reviewer**: adversarial-social-metadata
**Date**: 2026-07-01

## Score

- **Social Metadata**: 60 / 100

## ✅ Passed

- All 8 pages carry `og:type=website`, `og:site_name=Phlix` — correct and consistent
- All 8 pages carry `og:url` as an absolute HTTPS URL (e.g., `https://detain.github.io/phlix-website/sites/desert-horizon/`)
- All 8 pages carry `og:title` with page-specific copy
- All 8 pages carry `og:description` from `content.json` meta description
- All 8 pages carry `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator=@detain`
- All 8 pages carry `<meta name="theme-color" content="#C2542A">` — matches kit primary color
- All 8 pages carry `<link rel="canonical">` as an absolute HTTPS URL
- All 8 pages carry `<link rel="icon" type="image/svg+xml" href="img/favicon.svg" />`
- JSON-LD `SoftwareApplication` block present only on index.html, with correct fields (name, description, applicationCategory, operatingSystem, license, offers/price=0)
- No duplicate or missing og/twitter tags on any page
- Favicon href is relative (acceptable for in-site deployment)

## ⚠️ Concerns (non-blocking)

- **`og:image` is an SVG, not a rasterized PNG** — `og.svg` has viewBox `0 0 1200 630` (correct dimensions), but the spec in new_site.md §8 explicitly requires a rasterized **`og.png`** at 1200×630 and states "reference a rasterized **`og.png`** in meta". Facebook's Sharing Debugger explicitly rejects SVG as `og:image` type; Twitter's card validator also recommends PNG/JPEG. While the viewBox is correct, the file format is wrong. This is a moderate risk for social previews — **likely renders acceptably now but is non-compliant with stated format requirements** — suggested next step: generate `og.png` from `og.svg` and update all 8 pages to reference it.

## ❌ Failures (must fix this round)

- **All 8 pages (`index.html:32`, `features.html:35`, `clients.html:35`, `download.html:35`, `plugins.html:35`, `docs.html:35`, `hub.html:35`, `about.html:35`)** — `og:image` points to `og.svg` (SVG) instead of `og.png` (1200×630 rasterized PNG) as mandated by new_site.md §8. Facebook's crawler explicitly states SVG is not a valid og:image type. Twitter recommends PNG at minimum 1200×630 for `summary_large_image`. All 8 meta references must be updated to a PNG file, and that PNG file must actually exist at `img/og.png`. — **Required outcome: Replace `og.svg` in meta tags with a 1200×630 PNG, and ensure `img/og.png` exists on disk.**

## Recommendations

1. **Generate `og.png` (1200×630) from `og.svg`** (impact: high, effort: low) — Use a tool like `convert` (ImageMagick) or `rsvg-convert` to rasterize `img/og.svg` to `img/og.png` at exactly 1200×630 pixels. Then update all 8 pages to reference `og.png` instead of `og.svg` in both `og:image` and `twitter:image` meta tags. Example: `rsvg-convert -w 1200 -h 630 img/og.svg > img/og.png`.
2. **Add explicit width/height attributes to `og.svg`** (impact: low, effort: low) — Add `width="1200"` and `height="630"` to the root `<svg>` element so that user-agents that don't read viewBox still get the dimensions.
3. **Consider adding `og:image:width` and `og:image:height`** (impact: medium, effort: low) — Per Open Graph protocol best practices, specifying explicit pixel dimensions for og:image helps crawlers allocate space before load. Add `<meta property="og:image:width" content="1200" />` and `<meta property="og:image:height" content="630" />` on all 8 pages.

## Evidence

- Brand kit primary color confirmed as `#C2542A` in `brand-kits/desert-horizon.js:218`
- Site URL base: `https://detain.github.io/phlix-website/sites/desert-horizon/` (from `shared/content.json:4` and canonical tags)
- `og.svg` exists at `img/og.svg` with viewBox `0 0 1200 630` but no width/height attributes and no PNG counterpart at `img/og.png` (verified with `file` and Python xml.etree)
- All 8 pages inspected: `index.html:19–49`, `features.html:22–52`, `clients.html:22–52`, `download.html:22–52`, `plugins.html:22–52`, `docs.html:22–52`, `hub.html:22–52`, `about.html:22–52`
- JSON-LD only on `index.html:57–72` (correct — home page only per spec §11)
- Content.json `meta.og_image` is `/img/og.svg` (relative path, overridden to absolute in all pages — absolute URL used correctly in all 8 pages)
