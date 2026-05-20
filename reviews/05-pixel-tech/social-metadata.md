# Social Metadata Review — `05-pixel-tech`

**Variant:** 05-pixel-tech  
**Reviewer:** Dimension Reviewer  
**Date:** 2026-05-20  
**Pages Reviewed:** 8 (index, about, hub, docs, plugins, download, clients, features)

---

## Score: 42 / 100

---

## ✅ Passed Items

| Item | Status | Evidence |
|------|--------|----------|
| **og:title** | ✅ PASS | All 8 pages have unique `og:title` per page (e.g., `og:title content="Features — Phlix"` in features.html) |
| **og:description** | ✅ PASS | All 8 pages have `og:description` with descriptive content relevant to each page |
| **og:url** | ✅ PASS | All 8 pages have `og:url` pointing to correct canonical URLs |
| **og:type** | ✅ PASS | All 8 pages set `og:type content="website"` |
| **og:site_name** | ✅ PASS | All 8 pages have `og:site_name content="Phlix"` |
| **og:image presence** | ✅ PASS | All 8 pages reference `/variants/05-pixel-tech/img/og.svg` |
| **og:image dimensions** | ✅ PASS | `og.svg` is exactly 1200×630 — matches required dimensions (see line 6: `viewBox="0 0 1200 630" width="1200" height="630"`) |
| **Twitter Card tags** | ✅ PASS | All 8 pages have `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` |
| **Twitter card type** | ✅ PASS | All use `summary_large_image` which is optimal for this content |
| **Theme color** | ✅ PASS | All pages have `<meta name="theme-color" content="#39FF14">` matching the neon green brand |
| **Favicon SVG** | ✅ PASS | `favicon.svg` exists at `img/favicon.svg` and renders at 32×32 |

---

## ⚠️ Concerns (Non-Blocking)

| Item | Concern | Evidence |
|------|---------|----------|
| **og:image format** | SVG format for og:image may not render correctly on all social platforms. Facebook/Twitter prefer PNG/JPG raster images at specific densities. The SVG is valid but support is inconsistent across platforms. | `/variants/05-pixel-tech/img/og.svg` line 6 |
| **twitter:image not card-optimized** | The same SVG og:image is used for twitter:image. Twitter benefits from text-heavy overlay images being optimized specifically for their timeline view. | Same file as above |

---

## ❌ Failures (Must Fix)

| Item | Failure | Evidence |
|------|---------|----------|
| **JSON-LD SoftwareApplication schema** | No JSON-LD `<script type="application/ld+json">` found in ANY of the 8 HTML pages. This is required for SoftwareApplication rich results in Google Search. | grep search returned 0 matches for `application/ld\+json` across all files |
| **Missing favicon sizes** | Only `favicon.svg` (32×32) exists. Required sizes for complete favicon set are missing: 16×16, 32×32 (PNG), 180×180 (Apple Touch), 192×192, 512×512. | Only files in `img/`: `favicon.svg`, `logo.svg`, `og.svg`, `PROMPTS.md` |
| **Missing manifest.webmanifest** | No `manifest.webmanifest` file exists in the variant directory. Required for PWA/installability and Android home screen icons. | grep search returned 0 matches for `manifest.webmanifest` |
| **Missing Apple Touch Icon** | No `<link rel="apple-touch-icon">` in any HTML page. iOS Safari uses this for home screen bookmarks. | grep search returned 0 matches for `apple-touch-icon` |
| **Missing favicon.ico** | No `favicon.ico` at root level for legacy browser support (IE11, older browsers that don't support SVG favicons). | Not present in variant directory |

---

## Recommendations (Ranked by Impact)

### 🔴 High Impact (Fix First)

1. **Add JSON-LD SoftwareApplication schema** — Required for Google rich results. Should include:
   - `name`: "Phlix"
   - `applicationCategory`: "MultimediaApplication"
   - `operatingSystem`: "PHP 8.3+"
   - `offers`: `{ "@type": "Offer", "price": "0", "priceCurrency": "USD" }`
   - `url`: Canonical URL

2. **Add missing favicon assets** — Create and link:
   - `favicon-16x16.png` (16×16)
   - `favicon-32x32.png` (32×32)
   - `apple-touch-icon.png` (180×180)
   - `icon-192x192.png` (192×192, for Android)
   - `icon-512x512.png` (512×512, for Android)
   - Update HTML to link all these with appropriate `<link rel="icon" sizes="...">` tags

3. **Create manifest.webmanifest** — Add at variant root with:
   ```json
   {
     "name": "Phlix",
     "short_name": "Phlix",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#000000",
     "theme_color": "#39FF14",
     "icons": [
       { "src": "/variants/05-pixel-tech/img/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
       { "src": "/variants/05-pixel-tech/img/icon-512x512.png", "sizes": "512x512", "type": "image/png" }
     ]
   }
   ```

### 🟡 Medium Impact

4. **Consider PNG og:image** — While the SVG is technically correct at 1200×630, social platforms may cache/process it better as a PNG. Consider exporting the og.svg as a PNG at 1200×630 for maximum compatibility.

5. **Add apple-touch-icon link** — Add `<link rel="apple-touch-icon" href="/variants/05-pixel-tech/img/apple-touch-icon.png">` to all pages.

---

## Evidence

### Files Inspected
- `variants/05-pixel-tech/index.html` (225 lines)
- `variants/05-pixel-tech/about.html` (151 lines)
- `variants/05-pixel-tech/hub.html` (129 lines)
- `variants/05-pixel-tech/docs.html` (147 lines)
- `variants/05-pixel-tech/plugins.html` (131 lines)
- `variants/05-pixel-tech/download.html` (180 lines)
- `variants/05-pixel-tech/clients.html` (189 lines)
- `variants/05-pixel-tech/features.html` (211 lines)

### Assets Found
```
variants/05-pixel-tech/img/
├── favicon.svg      (32×32 SVG)
├── logo.svg
├── og.svg          (1200×630 SVG)
└── PROMPTS.md
```

### Assets Missing (Required by Rubric)
- ❌ `favicon.ico`
- ❌ `favicon-16x16.png`
- ❌ `favicon-32x32.png`
- ❌ `apple-touch-icon.png` (180×180)
- ❌ `icon-192x192.png`
- ❌ `icon-512x512.png`
- ❌ `manifest.webmanifest`

---

## Summary

The variant has **solid OG tag and Twitter Card coverage** across all 8 pages with correctly sized og:image at 1200×630. However, it is **missing critical social metadata** requirements:

1. **No JSON-LD** — Major SEO gap for rich results
2. **No complete favicon set** — Only SVG favicon, missing all PNG sizes + .ico
3. **No manifest.webmanifest** — Prevents PWA installability
4. **No Apple Touch Icon** — iOS home screen users get broken bookmark icons

**Priority fix order:** JSON-LD → Favicon PNG set → manifest.webmanifest → Apple Touch Icon.
