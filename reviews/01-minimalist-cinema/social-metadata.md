# Social Metadata Review — `01-minimalist-cinema`

**Variant:** `01-minimalist-cinema`
**Reviewer:** Dimension Reviewer (Social Metadata)
**Date:** 2026-05-20
**Files Reviewed:** `index.html`, `about.html`, `hub.html`, `docs.html`, `plugins.html`, `download.html`, `clients.html`, `features.html`

---

## Score: 52/100

---

## ✅ Passed Items

| Check | Status | Evidence |
|-------|--------|----------|
| `og:title` (≤60 chars) | ✅ Pass | All 8 pages have titles ≤60 chars (e.g., "Phlix — Your media. Your way." = 32 chars) |
| `og:description` (≤160 chars) | ✅ Pass | All 8 pages have descriptions ~150 chars, within limit |
| `og:image` exists | ✅ Pass | All pages reference `/variants/01-minimalist-cinema/img/og.svg` |
| `og:image` 1200×630 | ✅ Pass | `og.svg` viewBox="0 0 1200 630" — correct dimensions |
| `og:url` | ✅ Pass | All 8 pages set `og:url` to their canonical URL |
| `og:type` | ✅ Pass | All 8 pages set `og:type="website"` |
| `og:site_name` | ✅ Pass | All 8 pages set `og:site_name="Phlix"` |
| `twitter:card=summary_large_image` | ✅ Pass | All 8 pages declare `<meta name="twitter:card" content="summary_large_image">` |
| `twitter:image` | ✅ Pass | All 8 pages set `twitter:image` to the same SVG |
| Favicon `icon` link | ✅ Pass | All pages have `<link rel="icon" type="image/svg+xml" href=".../favicon.svg">` |

---

## ⚠️ Concerns (Non-blocking)

| Check | Severity | Evidence |
|-------|----------|---------|
| `og:image` is SVG | ⚠️ Minor | All pages use `og.svg` (SVG). While SVG is valid, some social scrapers (notably older Facebook, LinkedIn) have spotty SVG support. A PNG fallback is safer for maximum compatibility. However, current scrapers handle SVG+viewBox correctly, so this is low risk. |
| Apple Touch Icon not declared | ⚠️ Minor | `apple-touch-icon` (180×180) is missing. iOS home screen shortcuts will fall back to the favicon or screenshot. Affects only iOS users adding to home screen — low traffic for a docs/download site. |

---

## ❌ Failures (Must Fix)

| Check | Severity | Evidence |
|-------|----------|---------|
| **JSON-LD `SoftwareApplication` schema** | 🔴 Critical | No `<script type="application/ld+json">` block found on **any** page, including `index.html` where the rubric requires it at minimum. This is a schema.org structured data requirement for rich results. |
| **`manifest.webmanifest`** | 🔴 Critical | No `manifest.webmanifest` file exists at `variants/01-minimalist-cinema/`. Required for PWA installability and Android home screen support. No `<link rel="manifest">` in any HTML. |
| **Favicon sizes 16, 32, 192, 512** | 🔴 Critical | Only `favicon.svg` exists. Missing dedicated `.ico` or `.png` at sizes 16×16, 32×32, 192×192, 512×512. The single SVG does not serve as a multi-resolution favicon. |
| **Apple Touch Icon 180×180** | 🟠 Major | No `<link rel="apple-touch-icon" href="...">` anywhere. iOS users who add site to home screen get a blurry screenshot instead of a proper icon. |

---

## Recommendations (Ranked by Impact)

### 1. 🔴 Add JSON-LD `SoftwareApplication` schema (High Impact)
**File:** At minimum `index.html`; optionally all pages.

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "description": "A self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile.",
  "url": "https://detain.github.io/phlix-website/",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "PHP 8.3+",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Organization",
    "name": "detain",
    "url": "https://github.com/detain"
  }
}
</script>
```

### 2. 🔴 Add `manifest.webmanifest` (High Impact)
**File:** Create `variants/01-minimalist-cinema/manifest.webmanifest`

```json
{
  "name": "Phlix",
  "short_name": "Phlix",
  "description": "Self-hostable open-source PHP media server",
  "start_url": "/variants/01-minimalist-cinema/",
  "display": "standalone",
  "background_color": "#1A1A1A",
  "theme_color": "#2D9CFF",
  "icons": [
    { "src": "/variants/01-minimalist-cinema/img/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/variants/01-minimalist-cinema/img/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Then add to all HTML `<head>`:
```html
<link rel="manifest" href="/variants/01-minimalist-cinema/manifest.webmanifest">
```

### 3. 🔴 Generate multi-resolution favicon (High Impact)
Create these files in `variants/01-minimalist-cinema/img/`:

| File | Size | Format |
|------|------|--------|
| `favicon-16.png` | 16×16 | PNG |
| `favicon-32.png` | 32×32 | PNG |
| `favicon-180.png` | 180×180 | PNG (Apple Touch) |
| `favicon-192.png` | 192×192 | PNG (Android Chrome) |
| `favicon-512.png` | 512×512 | PNG |

Add to all HTML `<head>`:
```html
<link rel="icon" type="image/png" sizes="16x16" href="/variants/01-minimalist-cinema/img/favicon-16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/variants/01-minimalist-cinema/img/favicon-32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/variants/01-minimalist-cinema/img/favicon-180.png">
<link rel="icon" type="image/png" sizes="192x192" href="/variants/01-minimalist-cinema/img/favicon-192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/variants/01-minimalist-cinema/img/favicon-512.png">
```

### 4. 🟡 Consider PNG fallback for `og:image` (Low Impact)
Replace `og.svg` with a 1200×630 PNG for maximum social scraper compatibility. SVG is technically valid but some platforms cache older parser versions that don't handle SVG well.

---

## Evidence Summary

### Open Graph (All 8 Pages — Consistent)
- `og:title` — e.g., `index.html:11` → `"Phlix — Your media. Your way."`
- `og:description` — e.g., `index.html:12` → full home page description
- `og:image` — e.g., `index.html:13` → `/variants/01-minimalist-cinema/img/og.svg`
- `og:url` — e.g., `index.html:14` → `https://detain.github.io/phlix-website/`
- `og:type` — e.g., `index.html:15` → `website`
- `og:site_name` — e.g., `index.html:16` → `Phlix`

### Twitter Card (All 8 Pages — Consistent)
- `twitter:card` — e.g., `index.html:19` → `summary_large_image`
- `twitter:title` — e.g., `index.html:20`
- `twitter:description` — e.g., `index.html:21`
- `twitter:image` — e.g., `index.html:22` → same SVG path

### Missing Components
- **JSON-LD**: Not present in any of the 8 HTML files (searched all files)
- **manifest.webmanifest**: No file exists at `variants/01-minimalist-cinema/`, no `<link rel="manifest">` in any HTML
- **Favicon PNGs**: Only `favicon.svg` exists in `img/`. No 16, 32, 180, 192, 512 variants
- **Apple Touch Icon link**: Missing from all 8 HTML files

---

*Review generated by Dimension Reviewer — Social Metadata*
