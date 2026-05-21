# Social Metadata Review — 04-portal-hub-5 (Wave 5)

## Score: 85/100 — PASS

## What's Working
- All required Open Graph tags present:
  - `og:type` = "website"
  - `og:url` = full URL (e.g., `https://detain.github.io/phlix-website/`)
  - `og:title` = "Phlix - Connect everything. Control everything."
  - `og:description` = "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support."
  - `og:image` = "/img/og.svg"
- All required Twitter Card tags present:
  - `twitter:card` = "summary_large_image"
  - `twitter:title` = "Phlix - Connect everything. Control everything."
  - `twitter:description` = "Same description"
  - `twitter:image` = "/img/og.svg"
- Consistent metadata across all 3 reviewed pages (index, download, docs)
- Image path uses relative root path — works correctly when shared across variants

## Critical Issues (blockers)
1. **Missing `og:site_name`** — Open Graph protocol requires `og:site_name` to identify the site. Should be added as `<meta property="og:site_name" content="Phlix">` on all pages.

## Minor Issues (non-blockers)
1. **og:image missing explicit dimensions** — Adding `og:image:width` and `og:image:height` improves pre-rendering in social share dialogs
2. **og:url points to root, not variant** — If sharing a variant page, the og:url should reflect the variant URL (e.g., `https://detain.github.io/phlix-website/04-portal-hub-5/`)
3. **og:image may need fallback for platforms that don't support SVG** — Some platforms prefer PNG; consider providing both or ensuring SVG renders properly
4. **Twitter handle missing** — No `twitter:site` or `twitter:creator` @username tag for the brand

## Recommendations
1. Add `<meta property="og:site_name" content="Phlix">` to all pages
2. Add `<meta property="og:image:width" content="1200">` and `<meta property="og:image:height" content="630">`
3. Update og:url to reflect the specific variant page URL (include /04-portal-hub-5/ path segment)
4. Add Twitter creator/site handle if available: `<meta name="twitter:site" content="@yourhandle">`
5. Verify og:image at /img/og.svg is valid SVG that renders in Facebook/Twitter share previews
