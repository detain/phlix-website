# Social Metadata Review — `03-retro-film-reel`

**Variant:** 03-retro-film-reel
**Review Date:** 2026-05-20
**Reviewer:** Dimension Reviewer (Social Metadata)
**Pages Reviewed:** 8 HTML pages (index, about, clients, docs, download, features, hub, plugins)

---

## Score: 60 / 100

---

## ✅ Passed Items

| Check | Status | Evidence |
|-------|--------|----------|
| **OG Tags** | ✅ Pass | All 8 pages include complete OG meta set: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`. Values are contextually appropriate per page (e.g., "Features — Phlix", "Download — Phlix"). |
| **Twitter Card** | ✅ Pass | All 8 pages include `twitter:card` set to `summary_large_image`, plus `twitter:title`, `twitter:description`, and `twitter:image` mirroring OG values. |
| **og:image Dimensions** | ✅ Pass | `img/og.svg` correctly declares `width="1200" height="630"` in SVG viewBox, matching the required 1200×630 OG image ratio. The image is a branded, styled SVG with the Phlix film-reel badge. |
| **Theme Color** | ✅ Pass | All 8 pages declare `<meta name="theme-color" content="#C0392B">` matching the retro-film-reel crimson theme. |
| **Favicon SVG** | ✅ Pass | Single SVG favicon present at `img/favicon.svg` with `<link rel="icon" type="image/svg+xml">` referenced in all pages. |

---

## ⚠️ Concerns (Non-Blocking)

| Item | Concern | Evidence |
|------|---------|----------|
| **og:image Format** | SVG is valid for OG but some crawlers (notably older Twitter) prefer raster formats. The SVG renders correctly in modern browsers but may have inconsistent scaling behavior. | `img/og.svg` is vector; not a guarantee across all social scrapers |
| **og:image Path** | The path `/variants/03-retro-film-reel/img/og.svg` is relative. When the site is deployed to root, this path may not resolve correctly if the variant path changes. | All 8 pages use relative path starting with `/variants/03-retro-film-reel/` |

---

## ❌ Failures (Must Fix)

| Item | Severity | Details |
|------|----------|---------|
| **JSON-LD SoftwareApplication Schema** | 🔴 Critical | **Zero** of 8 pages include `<script type="application/ld+json">` with a `SoftwareApplication` schema. This is required for rich search results and Google App indexing. |
| **manifest.webmanifest** | 🔴 Critical | No `manifest.webmanifest` file exists in the variant directory. Required for Progressive Web App (PWA) installation on mobile/home screens. |
| **Favicon Sizes (16/32/180/192/512)** | 🔴 Critical | Only `img/favicon.svg` exists. The rubric requires multiple sizes: `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png` (180×180), `icon-192x192.png`, `icon-512x512.png`. Android Chrome, iOS Safari, and Windows pinned tabs require specific sizes. |
| **apple-touch-icon** | 🔴 Critical | No `apple-touch-icon.png` (180×180) for iOS home screen bookmarking. |

---

## Recommendations (Ranked by Impact)

### 1. Add JSON-LD SoftwareApplication Schema (Impact: High)
**Priority: Critical**

Add to every page's `<head>`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "operatingSystem": "PHP 8.3+",
  "applicationCategory": "MultimediaApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "A self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile."
}
</script>
```

**Evidence:** No `application/ld+json` found in any of 8 HTML pages.

---

### 2. Create manifest.webmanifest (Impact: High)
**Priority: Critical**

Create `variants/03-retro-film-reel/manifest.webmanifest`:
```json
{
  "name": "Phlix Media Server",
  "short_name": "Phlix",
  "description": "Self-hostable, open-source PHP media server",
  "start_url": "/variants/03-retro-film-reel/",
  "display": "standalone",
  "background_color": "#F5E9D4",
  "theme_color": "#C0392B",
  "icons": [
    { "src": "/variants/03-retro-film-reel/img/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/variants/03-retro-film-reel/img/icon-512x512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Then add to each HTML page's `<head>`:
```html
<link rel="manifest" href="/variants/03-retro-film-reel/manifest.webmanifest">
```

**Evidence:** No `.webmanifest` file found in variant directory.

---

### 3. Add Multi-Size Favicon Set (Impact: High)
**Priority: Critical**

Generate and add:
- `img/favicon-16x16.png` (16×16) — browser tab
- `img/favicon-32x32.png` (32×32) — browser tab @2x, Safari pinned tab
- `img/apple-touch-icon.png` (180×180) — iOS home screen
- `img/icon-192x192.png` (192×192) — Android Chrome
- `img/icon-512x512.png` (512×512) — Android Chrome splash

Add to each HTML `<head>`:
```html
<link rel="icon" type="image/png" sizes="16x16" href="/variants/03-retro-film-reel/img/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/variants/03-retro-film-reel/img/favicon-32x32.png">
<link rel="apple-touch-icon" href="/variants/03-retro-film-reel/img/apple-touch-icon.png">
```

**Evidence:** Only `img/favicon.svg` exists. No PNG sizes found.

---

### 4. Consider Converting og:image to Raster (Impact: Medium)
**Priority: Concern**

While SVG is technically valid, converting `og.svg` to a PNG/JPG raster at 1200×630 ensures maximum compatibility with all social crawlers including Twitter, Slack, Discord, and WhatsApp.

**Evidence:** `img/og.svg` is vector; Twitter's crawler has been known to have issues with SVG.

---

## Summary

The variant has a solid foundation for social metadata with properly structured OG and Twitter Card tags across all 8 pages, correctly sized OG image, and consistent theme color. However, it is missing critical items required by modern web standards: **no JSON-LD schema**, **no web app manifest**, and **incomplete favicon set** (only SVG, no PNG sizes for iOS/Android). These failures prevent proper PWA installation and reduce search visibility.

**Action Required:** Add JSON-LD schema, create manifest.webmanifest, and generate multi-size favicon PNGs before this variant can pass a social metadata audit.

---

## Evidence Index

| File | Relevant Lines |
|------|---------------|
| `variants/03-retro-film-reel/index.html` | Lines 10–28 (OG, Twitter, favicon) |
| `variants/03-retro-film-reel/about.html` | Lines 10–28 |
| `variants/03-retro-film-reel/clients.html` | Lines 10–28 |
| `variants/03-retro-film-reel/docs.html` | Lines 10–28 |
| `variants/03-retro-film-reel/download.html` | Lines 10–28 |
| `variants/03-retro-film-reel/features.html` | Lines 10–28 |
| `variants/03-retro-film-reel/hub.html` | Lines 10–28 |
| `variants/03-retro-film-reel/plugins.html` | Lines 10–28 |
| `variants/03-retro-film-reel/img/og.svg` | `viewBox="0 0 1200 630"` — correct dimensions |
| `variants/03-retro-film-reel/img/favicon.svg` | Only favicon asset found |
| `variants/03-retro-film-reel/` directory | No manifest.webmanifest, no PNG icons |
