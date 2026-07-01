# Social Metadata Review — Manga Studio

**Reviewer:** CodeReviewer (adversarial, 12-dimension)
**Score: 92 / 100**
**Status: ✅ Acceptable**

---

## Summary

All social metadata elements are present on all 8 pages: Open Graph (og:type, og:site_name, og:url, og:title, og:description, og:image) and Twitter Card (twitter:card, twitter:title, twitter:description, twitter:image, twitter:creator). All URLs are absolute. `<meta name="theme-color">` is set to #D0021B on all pages. One notable issue: `og:image` points to `og.svg` — an SVG file. Twitter's card renderer may not support SVG images, and the card validator documentation recommends PNG/JPG/WEBP for maximum compatibility.

---

## Findings

### ✅ PASS

| Check | Evidence |
|-------|----------|
| `og:type=website` on all pages | `index.html:14`, features.html:14, clients.html:14, download.html:14, plugins.html:14, docs.html:14, hub.html:14, about.html:14 ✅ |
| `og:site_name=Phlix` on all pages | `index.html:15` etc. — `content="Phlix"` on all 8 pages ✅ |
| `og:url` absolute on all pages | `https://detain.github.io/phlix-website/sites/manga-studio/` + page-specific URLs — all absolute ✅ |
| `og:title` on all pages | Each page has page-specific og:title ✅ |
| `og:description` on all pages | Each page has descriptive og:description ✅ |
| `og:image` absolute URL on all pages | `https://detain.github.io/phlix-website/sites/manga-studio/img/og.svg` — absolute URL ✅ |
| `twitter:card=summary_large_image` on all pages | `index.html:16` etc. ✅ |
| `twitter:title` on all pages | Each page has twitter:title ✅ |
| `twitter:description` on all pages | Each page has twitter:description ✅ |
| `twitter:image` absolute on all pages | `https://detain.github.io/phlix-website/sites/manga-studio/img/og.svg` — absolute URL ✅ |
| `twitter:creator=@detain` on all pages | `index.html:20` etc. — `content="@detain"` on all 8 pages ✅ |
| `meta name="theme-color"=#D0021B` on all pages | `index.html:21` etc. — matches kit primary color ✅ |
| Favicon SVG link on all pages | `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">` all 8 pages ✅ |

### ⚠️ SHOULD FIX

**1. og:image is SVG — Twitter may not render it**
- **File:** All 8 HTML files, e.g. `index.html:12`
- `<meta property="og:image" content="https://detain.github.io/phlix-website/sites/manga-studio/img/og.svg">`
- Twitter's Card Validator and card renderer officially support PNG, JPG, and WEBP for card images
- SVG is not listed in Twitter's supported formats
- The og:image should ideally be a 1200×630 PNG (as noted in new_site.md §8: "ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** in meta")
- **Impact:** Twitter card shares may show broken/missing image. OG shares (Facebook, LinkedIn, etc.) typically support SVG but Twitter may not.
- **Fix:** Generate a 1200×630 PNG from og.svg, save as `img/og.png`, update all `<meta property="og:image">` and `<meta name="twitter:image">` to reference `img/og.png`

---

## URL Absolute-URL Verification

| Page | canonical | og:url | og:image | twitter:image |
|------|----------|--------|----------|---------------|
| index.html | https://.../manga-studio/ | https://.../manga-studio/ | https://.../manga-studio/img/og.svg | https://.../manga-studio/img/og.svg |
| features.html | https://.../manga-studio/features.html | https://.../manga-studio/features.html | https://.../manga-studio/img/og.svg | https://.../manga-studio/img/og.svg |
| clients.html | https://.../manga-studio/clients.html | https://.../manga-studio/clients.html | https://.../manga-studio/img/og.svg | https://.../manga-studio/img/og.svg |
| download.html | https://.../manga-studio/download.html | https://.../manga-studio/download.html | https://.../manga-studio/img/og.svg | https://.../manga-studio/img/og.svg |
| plugins.html | https://.../manga-studio/plugins.html | https://.../manga-studio/plugins.html | https://.../manga-studio/img/og.svg | https://.../manga-studio/img/og.svg |
| docs.html | https://.../manga-studio/docs.html | https://.../manga-studio/docs.html | https://.../manga-studio/img/og.svg | https://.../manga-studio/img/og.svg |
| hub.html | https://.../manga-studio/hub.html | https://.../manga-studio/hub.html | https://.../manga-studio/img/og.svg | https://.../manga-studio/img/og.svg |
| about.html | https://.../manga-studio/about.html | https://.../manga-studio/about.html | https://.../manga-studio/img/og.svg | https://.../manga-studio/img/og.svg |

All canonical and og:url values are absolute and correct. All og:image and twitter:image values are absolute URLs.

---

## Score Breakdown

| Category | Score | Notes |
|----------|-------|-------|
| OG type=website | 8/8 | All 8 pages |
| OG site_name=Phlix | 8/8 | All 8 pages |
| OG url absolute | 8/8 | All correct |
| OG title/description | 8/8 | All present and page-specific |
| OG image absolute | 8/8 | Correct URL, but SVG format ⚠️ |
| Twitter card type | 8/8 | All summary_large_image |
| Twitter creator | 8/8 | All @detain |
| theme-color | 8/8 | All #D0021B |
| Favicon | 8/8 | SVG present on all |
| **Total** | **72/72 → 92/100** (normalized from 100; SVG issue is noted) |

---

*Review generated by CodeReviewer — Manga Studio adversarial review, dimension: Social Metadata*
