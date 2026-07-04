# Social Metadata Review — Psychedelic Groove

**Variant**: psychedelic-groove
**Round**: 2
**Reviewer**: Code Review Agent
**Date**: 2026-07-04

## Score

- **Social metadata**: 95 / 100

## ✅ Passed

- **og:title present on all 8 pages** — All contain page-specific titles. ✓
- **og:description present on all 8 pages** — All pages have og:description meta tag with appropriate content. ✓
- **og:image uses absolute URL on all 8 pages** — All pages reference `https://detain.github.io/phlix-website/sites/psychedelic-groove/img/og.png` as an absolute URL. ✓
- **og:image is 1200×630 PNG** — The file `img/og.png` is exactly 1200×630 pixels and 138,612 bytes (~135KB). The PNG format is correct per new_site.md §11. ✓
- **og:url absolute on all 8 pages** — All pages have `<meta property="og:url" content="https://detain.github.io/phlix-website/sites/psychedelic-groove/[page].html">`. ✓
- **og:type = website on all pages** — All pages have `<meta property="og:type" content="website">`. ✓
- **og:site_name = Phlix on all pages** — All pages have `<meta property="og:site_name" content="Phlix">`. ✓
- **twitter:card = summary_large_image on all 8 pages** — Verified on all pages. ✓
- **twitter:title on all 8 pages** — All pages have twitter:title matching og:title or page-specific title. ✓
- **twitter:description on all 8 pages** — All pages have twitter:description. ✓
- **twitter:image absolute URL on all 8 pages** — All pages reference the absolute URL to og.png. ✓
- **twitter:creator = @detain on all 8 pages** — All pages have `<meta name="twitter:creator" content="@detain">`. ✓
- **theme-color = #9B00FF (primary)** — All pages have `<meta name="theme-color" content="#9B00FF">` matching the kit's primary color. ✓
- **Favicon SVG link** — All pages have `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">`. ✓

## ⚠️ Concerns (non-blocking)

- **content.json specifies og_image: "/img/og.svg" but site uses og.png** — shared/content.json:194 specifies `"og_image": "/img/og.svg"`. However, the deployed site correctly uses `img/og.png` (1200×630 as required) per new_site.md §11 "reference a rasterized og.png in meta". The site is correct per spec — the content.json discrepancy is a tooling issue, not a site failure.

- **features.html:11 and clients.html:11 have custom og:description** — These differ from the standard meta description. Brand-flavored and factually accurate but deviate from the content.json contract. Minor concern — social and search descriptions serve different purposes.

- **JSON-LD only on index.html** — The new_site.md §11 spec only requires JSON-LD on the home page, which is satisfied. Not a failure.

## ❌ Failures (must fix this round)

None — no must-fix social metadata failures found. This round's fixes (Google Fonts CDN removal, aria-hidden partial fix) do not affect social metadata.

## Recommendations (ranked by impact)

1. **Consider aligning og:description with meta description on features.html and clients.html** (impact: low, effort: low) — For maximum consistency, consider using the same description for both og:description and meta name="description" on these pages.
2. **Add webmanifest** — The review rubrics mention "manifest.webmanifest" for favicon handling. This site uses SVG favicon only. Adding a webmanifest could improve PWA support for Android Chrome's "Add to Home Screen" feature.

## Evidence

- Verified og:image dimensions: 1200×630, 138,612 bytes (~135KB)
- Verified all 8 pages have og:title, og:description, og:image (absolute), og:url, og:type, og:site_name
- Verified all 8 pages have twitter:card=summary_large_image, twitter:title, twitter:description, twitter:image (absolute), twitter:creator=@detain
- Verified theme-color matches kit primary (#9B00FF)
- Verified content.json og_image path vs actual site og.png usage
