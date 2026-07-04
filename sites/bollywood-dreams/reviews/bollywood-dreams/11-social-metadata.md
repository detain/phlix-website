# Social Metadata

**Score: 72/100**  
**Severity: ⚠️**

## Findings

### ❌ CRITICAL: og:image is og.svg, not the required 1200×630 PNG (ALL HTML files:38–40)
Every page's `og:image` points to `https://detain.github.io/phlix-website/bollywood-dreams/img/og.svg`. The spec §8 and §11 explicitly require "og.png (1200×630)" — a raster image. "Ship og.svg as the editable source if used, but reference a rasterized og.png in meta." The build uses the SVG in meta tags, which violates the spec and may cause rendering issues on platforms that strictly expect raster images for social cards.

**sitemap.xml** also references og.svg in its `<image:loc>` entries (if image sitemap is used). This should point to og.png.

**Fix:** Generate a 1200×630 PNG raster version from og.svg. Update all 8 HTML files: `og:image` meta tag and Twitter image meta tag to `img/og.png`. Update sitemap.xml `image:loc` to `img/og.png`.

### ⚠️ WARNING: og:description identical on all 8 pages
All pages share the same 155-character description from `content.json.meta.description`. While permitted by the spec, page-specific descriptions (features page could describe features, download page could describe installation) would improve social sharing per-page.

**Fix:** This is acceptable per current spec. Future improvement to make page-specific descriptions.

## What Passed

- ✅ All 8 pages have `og:type=website`, `og:site_name=Phlix`
- ✅ All 8 pages have `og:url` absolute: `https://detain.github.io/phlix-website/bollywood-dreams/[page].html`
- ✅ All 8 pages have `og:title` — page-specific, within 60 chars
- ✅ All 8 pages have `og:description` ≤160 chars (exactly 155 chars)
- ✅ All 8 pages have `twitter:card=summary_large_image`
- ✅ All 8 pages have `twitter:title`, `twitter:description`
- ✅ All 8 pages have `twitter:creator=@detain` (brand kit requirement)
- ✅ All 8 pages have `twitter:image` absolute URL
- ✅ All 8 pages have `theme-color=#F5A800` (marigold gold, brand primary)
- ✅ All 8 pages have `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">`
- ✅ og:url and canonical URL match on all pages (both absolute, both pointing to the correct page URL)
- ✅ sitemap.xml includes all 8 pages with proper absolute loc URLs
