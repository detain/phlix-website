# Social Metadata Review — `01-minimalist-cinema` (Round 2)

**Variant:** `01-minimalist-cinema`
**Reviewer:** Dimension Reviewer (Social Metadata)
**Date:** 2026-05-20
**Round:** 2 (Re-audit after Phase I improvements)
**Previous Score:** 52/100
**Files Reviewed:** `index.html`, `about.html`, `hub.html`, `docs.html`, `plugins.html`, `download.html`, `clients.html`, `features.html`

---

## Score: 71/100

**Improvement:** +19 points from Round 1 (52 → 71)

---

## ✅ Passed Items (Including Newly Added)

| Check | Status | Evidence |
|-------|--------|----------|
| `og:title` (≤60 chars) | ✅ Pass | All 8 pages have titles ≤60 chars |
| `og:description` (≤155 chars) | ✅ Pass | All 8 pages have descriptions ~150 chars |
| `og:image` exists | ✅ Pass | All 8 pages reference `/variants/01-minimalist-cinema/img/og.svg` |
| `og:url` | ✅ Pass | All 8 pages set `og:url` to canonical URL |
| `og:type` | ✅ Pass | All 8 pages set `og:type="website"` |
| `og:site_name` | ✅ Pass | All 8 pages set `og:site_name="Phlix"` |
| `twitter:card=summary_large_image` | ✅ Pass | All 8 pages declare `twitter:card` |
| `twitter:title` | ✅ Pass | All 8 pages set `twitter:title` |
| `twitter:description` | ✅ Pass | All 8 pages set `twitter:description` |
| `twitter:image` | ✅ Pass | All 8 pages set `twitter:image` |
| JSON-LD `SoftwareApplication` (index.html) | ✅ Pass | `index.html:28-42` — valid schema with name, description, applicationCategory, operatingSystem, offers, url, sameAs |
| `manifest.webmanifest` exists | ✅ Pass | Created at `variants/01-minimalist-cinema/manifest.webmanifest` |
| `<link rel="manifest">` in HTML | ✅ Pass | All 8 pages have `<link rel="manifest" href=".../manifest.webmanifest">` |
| Favicon `icon` link (SVG) | ✅ Pass | All pages have `<link rel="icon" type="image/svg+xml" href=".../favicon.svg">` |
| Theme color | ✅ Pass | All pages declare `<meta name="theme-color" content="#2D9CFF">` |

---

## ⚠️ Concerns (Non-blocking)

| Check | Severity | Evidence |
|-------|----------|---------|
| `og:image` is SVG, not 1200×630 PNG | ⚠️ Minor | All pages use `og.svg` with `viewBox="0 0 1200 630"`. SVG is valid HTML5 but some legacy social scrapers may not parse SVG properly. Facebook/Meta now supports SVG, but LinkedIn and older Pinterest parsers may not. Risk: low. |
| JSON-LD only on index.html | ⚠️ Minor | `index.html:28-42` has full SoftwareApplication schema. The other 7 pages (about.html, features.html, download.html, clients.html, plugins.html, docs.html, hub.html) do not. Best practice is per-page schema, but Google's guidelines allow homepage-only schema for SoftwareApplication types. |
| `manifest.webmanifest` only has SVG icon | ⚠️ Minor | `manifest.webmanifest:10` only references `favicon.svg` with `sizes="any"`. The manifest lacks PNG icon variants at 192×192 and 512×512 as recommended by PWA specs. Android Chrome requires 192×192; a single SVG with `sizes="any"` may not be recognized by all installers. |
| Apple Touch Icon missing | ⚠️ Minor | No `<link rel="apple-touch-icon">` on any page. iOS home screen shortcuts will fall back to favicon. Affects iOS users who add site to home screen — low traffic for a documentation/download site. |

---

## ❌ Failures (Still Present)

| Check | Severity | Evidence |
|-------|----------|---------|
| **Favicon PNG set missing** | 🔴 Critical | Only `favicon.svg` exists. Missing dedicated PNG icons at 16×16, 32×32, 180×180, 192×192, 512×512. The rubric requires "16/32/180/192/512 + manifest.webmanifest". The manifest.webmanifest exists, but the required PNG icon sizes within it do not. |
| **`og:image` not 1200×630 raster** | 🟠 Major | The rubric explicitly requires "og:image at 1200×630". While `og.svg` has the correct viewBox, it is an SVG vector file, not a 1200×630 PNG raster. Social platforms that do not support SVG (certain LinkedIn posts, WhatsApp links, older Facebook cache) will fail to display the image. |

---

## Score Breakdown

| Component | Max | Score | Notes |
|-----------|-----|-------|-------|
| OG tags (6 items) | 30 | 28 | -2 for SVG image format concern |
| Twitter Card (4 items) | 20 | 20 | All 4 present |
| JSON-LD SoftwareApplication | 15 | 10 | Only on index.html (10/15) |
| Favicon set (16/32/180/192/512 + manifest) | 20 | 5 | Only SVG favicon; no PNG sizes |
| og:image 1200×630 raster | 15 | 8 | SVG present but not PNG raster |
| **Total** | 100 | **71** | |

---

## Recommendations (Ranked by Impact)

### 1. 🔴 Generate multi-resolution PNG favicon set (High Impact)

Create these files in `variants/01-minimalist-cinema/img/`:

| File | Size | Purpose |
|------|------|---------|
| `favicon-16.png` | 16×16 | Browser tab, favicon.ico fallback |
| `favicon-32.png` | 32×32 | Retina browser tabs, high-DPI fallback |
| `favicon-180.png` | 180×180 | Apple Touch Icon (iOS home screen) |
| `favicon-192.png` | 192×192 | Android Chrome PWA |
| `favicon-512.png` | 512×512 | Android Chrome PWA large |

Add to all HTML `<head>`:
```html
<link rel="icon" type="image/png" sizes="16x16" href="/variants/01-minimalist-cinema/img/favicon-16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/variants/01-minimalist-cinema/img/favicon-32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/variants/01-minimalist-cinema/img/favicon-180.png">
<link rel="icon" type="image/png" sizes="192x192" href="/variants/01-minimalist-cinema/img/favicon-192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/variants/01-minimalist-cinema/img/favicon-512.png">
```

Update `manifest.webmanifest` icons array:
```json
"icons": [
  { "src": "/variants/01-minimalist-cinema/img/favicon-192.png", "sizes": "192x192", "type": "image/png" },
  { "src": "/variants/01-minimalist-cinema/img/favicon-512.png", "sizes": "512x512", "type": "image/png" }
]
```

### 2. 🟠 Add 1200×630 PNG og:image (Medium Impact)

Export `og.svg` as a 1200×630 PNG file named `og.png` and update all HTML:
```html
<meta property="og:image" content="/variants/01-minimalist-cinema/img/og.png">
<meta name="twitter:image" content="/variants/01-minimalist-cinema/img/og.png">
```

SVG is technically valid but social platform scrapers vary in SVG support. A PNG guarantees rendering on all platforms.

### 3. 🟡 Add JSON-LD to remaining 7 pages (Low Impact)

While Google's SoftwareApplication schema works from the homepage, adding page-specific JSON-LD to each of the 7 remaining pages improves SEO. Each page should reflect its own content:

- `features.html` → `@type: "WebPage"` with `about` property
- `download.html` → `@type: "SoftwareApplication"` with download links
- etc.

---

## Evidence Summary

### Phase I Additions Confirmed

| Item | File:Line | Status |
|------|-----------|--------|
| JSON-LD SoftwareApplication | `index.html:28-42` | ✅ Added |
| manifest.webmanifest | `manifest.webmanifest` | ✅ Created |
| `<link rel="manifest">` | All 8 pages (e.g., `index.html:46`) | ✅ Added |

### Open Graph (All 8 Pages — Consistent)

```
og:title       → e.g., index.html:11 "Phlix — Your media. Your way."
og:description → e.g., index.html:12 full description
og:image       → e.g., index.html:13 /variants/01-minimalist-cinema/img/og.svg
og:url         → e.g., index.html:14 https://detain.github.io/phlix-website/
og:type        → e.g., index.html:15 website
og:site_name   → e.g., index.html:16 Phlix
```

### Twitter Card (All 8 Pages — Consistent)

```
twitter:card        → e.g., index.html:19 summary_large_image
twitter:title      → e.g., index.html:20
twitter:description → e.g., index.html:21
twitter:image      → e.g., index.html:22 /variants/01-minimalist-cinema/img/og.svg
```

### Manifest.webmanifest Contents (`manifest.webmanifest:1-12`)

```json
{
  "name": "Phlix",
  "short_name": "Phlix",
  "description": "Self-hostable PHP media server",
  "start_url": "/variants/01-minimalist-cinema/",
  "display": "standalone",
  "background_color": "#1A1A1A",
  "theme_color": "#2D9CFF",
  "icons": [
    { "src": "/variants/01-minimalist-cinema/img/favicon.svg", "sizes": "any", "type": "image/svg+xml" }
  ]
}
```

### Still Missing

| Item | Files Affected |
|------|----------------|
| PNG favicons at 16/32/180/192/512 | All 8 pages |
| PNG og:image (1200×630) | All 8 pages |
| Apple Touch Icon link | All 8 pages |
| JSON-LD on pages 2-8 | about, features, download, clients, plugins, docs, hub |

---

## Change Log (Round 1 → Round 2)

| Issue | Round 1 | Round 2 | Δ |
|-------|---------|---------|---|
| JSON-LD SoftwareApplication | ❌ Missing | ✅ index.html only | +1 item |
| manifest.webmanifest | ❌ Missing | ✅ Created | +1 item |
| `<link rel="manifest">` | ❌ Missing | ✅ All 8 pages | +1 item |
| PNG favicon set | ❌ Missing | ❌ Still missing | No change |
| og:image 1200×630 PNG | ⚠️ SVG | ⚠️ SVG | No change |
| Apple Touch Icon | ❌ Missing | ❌ Still missing | No change |

---

*Review generated by Dimension Reviewer — Social Metadata (Round 2)*
