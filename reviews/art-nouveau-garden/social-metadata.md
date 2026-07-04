# Social Metadata Review — Art Nouveau Garden

**Variant**: art-nouveau-garden
**Round**: 1 (batch 3/3, dimensions 9-12)
**Reviewer**: adversarial-code-reviewer
**Date**: 2026-07-01

## Score

- **Social Metadata**: 72 / 100

## ✅ Passed

- All 8 pages carry complete Open Graph tags: `og:title`, `og:description`, `og:image` (all absolute URL), `og:url` (all absolute URL), `og:type=website`, `og:site_name=Phlix` — confirmed on all pages
- All 8 pages carry complete Twitter Card tags: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image` (absolute URL, same as og:image), `twitter:creator=@detain`
- `meta name="theme-color" content="#B8960C"` present and correct (kit primary = Aged Gold) on all 8 pages
- Favicon link correct on all 8 pages: `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">`
- og:url and canonical URL are consistent and absolute on every page (e.g., `https://detain.github.io/phlix-website/sites/art-nouveau-garden/index.html`)
- twitter:image is absolute and matches og:image URL on all pages
- JSON-LD SoftwareApplication block present on index.html with correct fields (name, description, applicationCategory, operatingSystem, license, offers/price=0)

## ⚠️ Concerns (non-blocking)

- **og:image referenced as SVG, not PNG (all 8 pages)** — all 8 pages set `og:image` to `https://detain.github.io/phlix-website/sites/art-nouveau-garden/img/og.svg`. The `new_site.md` §11 spec explicitly states: "og:image (1200×630) — Ship og.svg as the editable source if used, but reference a rasterized **og.png** in meta." The rubric requires "og:image renders correctly at preview size" which implies rasterized 1200×630. Most major crawlers (Facebook, LinkedIn, Discord) will render SVG og:image, but Twitter/X and some older scrapers may not. This is a specification deviation but not a complete functional failure. — **Medium severity; noted in BUILD_LOG.md as known follow-up.**
- **No apple-touch-icon link** — `<link rel="apple-touch-icon" href="img/favicon.svg">` is missing from all pages; while not enumerated in the explicit checklist above, it is mentioned in REVIEW_RUBRICS.md "Favicon set: 16, 32, 180 (apple), 192, 512, plus manifest.webmanifest" — the apple-touch-icon for 180px is absent

## ❌ Failures (must fix this round)

- **og:image must be a rasterized 1200×630 PNG, not SVG** — `new_site.md` §11: "og:image (absolute URL to the **1200×630 png**)" and §8 asset rules: "reference a rasterized **og.png** in meta." All 8 pages: `og:image content="https://detain.github.io/phlix-website/sites/art-nouveau-garden/img/og.svg"` — og.svg is an SVG vector file. This is the single critical failure. Required outcome: rasterize og.svg to 1200×630 PNG at `img/og.png` and update all 8 pages' `og:image` meta to point to that PNG. The twitter:image should likewise point to the PNG.

## Recommendations (ranked by impact)

1. **Generate 1200×630 PNG from og.svg and update og:image/twitter:image on all 8 pages** (impact: high, effort: medium) — This resolves the critical failure. Use the og.svg source (Art Nouveau frame, lily blossom center, aged gold wordmark, peacock feather accents per BUILD_LOG.md) rasterized to PNG. Update all 8 `<meta property="og:image">` and `<meta name="twitter:image">` values to point to `img/og.png` instead of `img/og.svg`.
2. **Add apple-touch-icon link** (impact: low, effort: low) — `<link rel="apple-touch-icon" href="img/favicon.svg">` on all 8 pages for iOS home screen add-to-homescreen behavior. While favicon.svg would serve this purpose, an explicit apple-touch-icon declaration is more robust.
3. **Verify og.png renders correctly at Twitter card preview size** (impact: medium, effort: low) — Twitter Card validator requires 1200×630 minimum; test at `https://cards-dev.twitter.com/validator` after PNG conversion.

## Evidence

```bash
# Confirm og:image on each page is SVG
grep -n 'og:image' /home/sites/phlix/phlix-website/sites/art-nouveau-garden/*.html | grep -v '.png'
# Returns all 8 pages pointing to img/og.svg

# Confirm twitter:image matches
grep -n 'twitter:image' /home/sites/phlix/phlix-website/sites/art-nouveau-garden/*.html | grep -v '.png'
# Returns all 8 pages pointing to img/og.svg

# Confirm theme-color is correct on all pages
grep -n 'theme-color' /home/sites/phlix/phlix-website/sites/art-nouveau-garden/*.html
# All 8 pages: content="#B8960C" ✓

# Confirm twitter:creator
grep -n 'twitter:creator' /home/sites/phlix/phlix-website/sites/art-nouveau-garden/*.html
# All 8 pages: content="@detain" ✓

# Check all pages have twitter:card=summary_large_image
grep -n 'twitter:card' /home/sites/phlix/phlix-website/sites/art-nouveau-garden/*.html
# All 8 pages: content="summary_large_image" ✓
```

**File reference**: `img/og.svg` is documented in `BUILD_LOG.md` line 30 and `SITE.md` line 66 as the OG image source. The BUILD_LOG.md line 53 already acknowledges this as a known deviation: "og.svg shipped as SVG source (spec notes rasterizing to PNG for OG tags — og:image meta references the SVG, which is valid for most crawlers but production should convert to 1200×630 PNG)."
