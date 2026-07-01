# Social Metadata Review — Renaissance Atelier

**Variant**: renaissance-atelier
**Round**: 1
**Reviewer**: adversarial-reviewer-batch3
**Date**: 2026-07-01

## Score
- **Social Metadata**: 88 / 100

## ✅ Passed

- All 8 pages (`index.html`, `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html`) contain the full Open Graph set: `og:title`, `og:description`, `og:image` (absolute URL), `og:url` (absolute URL), `og:type=website`, `og:site_name=Phlix`. Confirmed on each page:
  - index.html:12–17
  - features.html:11–16
  - clients.html:11–16
  - download.html:11–16
  - plugins.html:11–16
  - docs.html:11–16
  - hub.html:11–16
  - about.html:11–16
- All 8 pages contain Twitter card `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image` (absolute URL), `twitter:creator=@detain`. Confirmed in the same line ranges as OG above.
- `og:image` uses absolute URL `https://detain.github.io/phlix-website/sites/renaissance-atelier/img/og.svg` on all 8 pages. ✅
- `og:url` uses absolute URL on all 8 pages (e.g., index.html:15 `https://detain.github.io/phlix-website/sites/renaissance-atelier/`). ✅
- Canonical `<link rel="canonical">` is absolute on all 8 pages (e.g., index.html:9). ✅
- `index.html:39–54` — JSON-LD `SoftwareApplication` block present on home page with:
  - `name: "Phlix"` (line 43)
  - `description` (line 44)
  - `applicationCategory: "MultimediaApplication"` (line 45)
  - `operatingSystem: "PHP 8.3+"` (line 46)
  - `offers.price: "0"` (line 49)
  - `license: "https://opensource.org/licenses/BSD-3-Clause"` (line 52)
  - Valid `@context: "https://schema.org"` (line 41)
- `meta name="theme-color" content="#2B4A8C"` (lapis lazuli) present on all 8 pages.
- Favicon `link rel="icon" type="image/svg+xml"` present on all 8 pages.

## ⚠️ Concerns (non-blocking)

- `og:image` references `img/og.svg` (SVG) but new_site.md §8 and §11 specify "1200×630 png" for og:image and ships `og.png` as the rasterized derivative. SVG is technically valid as an image format for OG tags, and the og.svg at `viewBox="0 0 1200 630"` has the correct aspect ratio. Facebook and LinkedIn accept SVG; X/Twitter has historically preferred PNG. The image content (lapis chiaroscuro gradient, Phlix wordmark, "Illuminated." tagline) renders the correct brand identity. No visual defect; this is a spec-compliance gap, not a functional failure.

## ❌ Failures (must fix this round)

- **All 8 pages:og:image** — References `img/og.svg` (SVG). new_site.md §8 explicitly states "Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** in meta." And §11 specifies "1200×630 png". The rasterized `og.png` is not present in `img/` (only `og.svg`, `favicon.svg`, `logo.svg`, `PROMPTS.md` exist). Social media scrapers — particularly X/Twitter — may refuse to render SVG og:images or may rasterize client-side with unpredictable results. **Required: generate `img/og.png` at 1200×630 as a rasterized derivative of og.svg, and update all 8 pages' `og:image` meta to point to the `.png`.**

## Recommendations (ranked by impact)

1. (impact: high, effort: medium) — Generate `og.png` (1200×630 PNG) from the existing `og.svg` using a rasterization tool (e.g., `svgexport`, `cairosvg`, or a headless browser). Update `og:image` meta on all 8 pages from `img/og.svg` to `img/og.png`. This resolves the spec violation.
2. (impact: low, effort: low) — Consider adding `<meta property="og:image:width" content="1200">` and `<meta property="og:image:height" content="630">` for explicit dimension declaration to aid scrapers.
3. (impact: low, effort: low) — og.svg comment at line 5 of img/og.svg says "Per brand kit layout_patterns.landing and new_site.md §11" but the rasterized PNG requirement from §8 is not fulfilled. Update BUILD_LOG.md to note this as a known follow-up.

## Evidence

- `ls /home/sites/phlix/phlix-website/sites/renaissance-atelier/img/` output confirms only: `favicon.svg  logo.svg  og.svg  PROMPTS.md`. No `og.png` file exists.
- `grep "og:image" /home/sites/phlix/phlix-website/sites/renaissance-atelier/*.html` confirms all 8 pages use `content="https://detain.github.io/phlix-website/sites/renaissance-atelier/img/og.svg"`.
- new_site.md §8: "Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** in meta."
- new_site.md §11: "og:image (absolute URL to the 1200×630 png)."
