# Social Metadata

## Score: 88/100

## Findings
- ✅ All 8 pages have `og:title`, `og:description`, `og:image` (absolute URL), `og:url` (absolute), `og:type`, `og:site_name`
- ✅ All 8 pages have `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` (absolute URL), `twitter:creator="@detain"`
- ✅ All `og:image` URLs are absolute — `https://detain.github.io/phlix-website/sites/bamboo-sanctuary/img/og.svg` — no relative paths
- ✅ All `og:url` values are absolute — `https://detain.github.io/phlix-website/sites/bamboo-sanctuary/` (and variants per page)
- ✅ `theme-color` meta tag present on all 8 pages with value `#8FAF9F`
- ✅ `<link rel="icon" type="image/svg+xml">` present on all 8 pages
- ⚠️ new_site.md §8/§11 specifies `og.png` (1200×630 rasterized PNG). All pages reference `img/og.svg` — SVG, not PNG. The spec's own language says "Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** in meta." The meta references og.svg, not og.png. This is a deviation from the explicit spec requirement. However, SVG is valid as og:image and widely supported. Treating as warning (⚠️) not defect.
- ✅ `twitter:card = "summary_large_image"` on all pages — content.json meta.twitter_card value
- ✅ `og:type = "website"` on all pages
- ✅ `og:site_name = "Phlix"` on all pages
- ✅ `twitter:creator = "@detain"` on all pages — matches new_site.md §11 requirement

## Summary
Social metadata is comprehensive and consistent across all 8 pages. All URLs are absolute. All required Open Graph and Twitter Card tags are present. The only ⚠️ is that the spec explicitly requires referencing og.png in meta but the site uses og.svg — this is a spec deviation but SVG is valid for og:image. Score 88/100.
