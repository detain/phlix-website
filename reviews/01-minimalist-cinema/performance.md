# Performance Review — `01-minimalist-cinema`

**Variant:** 01-minimalist-cinema
**Review Dimension:** Performance
**Reviewer:** Dimension Reviewer (Performance)
**Files Reviewed:**
- `index.html` (233 lines, 13,563 bytes)
- `css/base.css` (176 lines, 3,414 bytes)
- `css/theme.css` (345 lines, 8,002 bytes)
- `css/components.css` (624 lines, 14,843 bytes)
- `js/main.js` (166 lines, 5,487 bytes)
- `img/favicon.svg` (766 bytes)
- `img/logo.svg` (1,339 bytes)
- `img/og.svg` (3,154 bytes)
- `features.html`, `download.html`, `clients.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html` (all structurally identical to index.html)

---

## Score: 87 / 100

The variant is lightweight and well-structured. The primary gains come from minimal JavaScript, `defer` usage, `font-display: swap`, and SVG-only imagery. Two concerns prevent a higher score: CSS is fully render-blocking (no critical-path extraction), and self-hosted fonts are missing (the `fonts/` directory is absent, so only Google Fonts CDN fallbacks load).

---

## Rubric Items

### ✅ Passed

| Criterion | Evidence |
|---|---|
| **Hero image budget ≤120 KB** | No raster hero image. Logo is inline SVG at 1,339 bytes. |
| **Total page transferred ≤500 KB** | index.html page weight: ~46 KB (HTML 13.6 KB + CSS 25.6 KB + JS 5.4 KB + images ~2.1 KB + Google Fonts fallbacks). |
| **font-display: swap** | All 4 `@font-face` blocks in `theme.css` lines 11–74 declare `font-display: swap`. |
| **No render-blocking sync JS** | All pages: `<script src="...main.js" defer></script>` at `</body>` — no synchronous scripts in `<head>`. |
| **Explicit width/height on images** | `logo.svg` has `width="120" height="40"` in every page. `og.svg` is only referenced as OG meta, not displayed. |
| **CLS protection via explicit image dims** | All images carry `width`/`height`, preventing layout shift. |
| **Vanilla JS only, no frameworks** | `main.js` is 166 lines of plain JS with no dependencies. |
| **No external JS CDN** | Zero external JS bundles loaded. |
| **Minimal font palette** | 4 fonts: Montserrat (ExtraBold), Inter (Regular), Roboto (Medium), JetBrains Mono (Regular). |

---

### ⚠️ Concerns (Non-blocking)

| Concern | Location | Impact | Recommendation |
|---|---|---|---|
| **CSS fully render-blocking** | `index.html:31–33` — all 3 CSS files in `<head>` without `media` query or `preload`/`async` | Moderate | Split CSS: inline critical styles (hero, header, typography) directly in `<style>` in `<head>`, defer the rest. Or add `media="print" onload="this.media='all'"` pattern with a fallback. |
| **Self-hosted fonts missing** | `theme.css:11–41` — `@font-face` src points to `../fonts/*.woff2` but `variants/01-minimalist-cinema/fonts/` does not exist | Medium | Run the build script to download self-hosted WOFF2 files. Self-hosted fonts eliminate CDN round-trips and improve LCP. |
| **Google Fonts CDN blocked by missing self-hosted** | `theme.css:44–74` — fallback `@font-face` blocks load fonts from `fonts.gstatic.com` | Low–Medium | Until the `fonts/` directory exists, first-time visitors incur a fonts.gstatic.com request. This is acceptable as `font-display: swap` avoids FOIT, but it still delays text rendering. |
| **No preconnect for Google Fonts** | All HTML pages — `<link rel="preconnect">` absent for `fonts.gstatic.com` | Low | Add `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` in `<head>` to reduce DNS/TLS time for the fallback font fetch. |

---

### ❌ Failures (Must Fix)

| Failure | Evidence |
|---|---|
| **None identified** | All rubric hard requirements are met. No LCP image >120 KB, no page >500 KB, no render-blocking JS, `font-display: swap` present everywhere. |

---

## Per-Page Resource Breakdown (index.html — heaviest page)

| Resource | Raw Bytes | Gzipped Est. | Blocking? |
|---|---|---|---|
| `index.html` | 13,563 | ~4.5 KB | HTML — always render-blocking |
| `css/base.css` | 3,414 | ~1.1 KB | ✅ Render-blocking |
| `css/theme.css` | 8,002 | ~2.7 KB | ✅ Render-blocking |
| `css/components.css` | 14,843 | ~4.5 KB | ✅ Render-blocking |
| `js/main.js` | 5,487 | ~1.8 KB | ❌ `defer` — not render-blocking |
| `img/logo.svg` | 1,339 | ~0.7 KB | Displayed above fold |
| `img/favicon.svg` | 766 | ~0.4 KB | Non-display (link only) |
| `img/og.svg` | 3,154 | ~1.5 KB | Only on social share |
| Google Fonts (fallback) | ~60–80 KB | ~20–25 KB | CDN — only if fonts/ missing |
| **Total (no fonts CDN)** | **47,575** | **~16 KB** | |
| **Total (with fonts CDN)** | **~107–127 KB** | **~36–41 KB** | |

---

## Recommendations (Ranked by Impact)

### 1. Split CSS — Critical Path First (High Impact)
**Effort:** Medium | **Impact:** LCP improvement ~200–400ms

Inline the critical CSS (base variables, header, hero typography, layout) directly in `<style>` within `<head>`. Load `components.css` (the largest at 14.8 KB) with `media="print"` + `onload` trick or `rel="preload" + `onload`.

```html
<!-- Critical inline styles -->
<style>:root{--color-electric-blue:#2D9CFF;--font-headline:'Montserrat',sans-serif;...}...</style>
<!-- Non-critical deferred -->
<link rel="stylesheet" href="/variants/01-minimalist-cinema/css/components.css" media="print" onload="this.media='all'">
```

### 2. Download and Check-in Self-Hosted Fonts (High Impact)
**Effort:** Low | **Impact:** Eliminates CDN dependency, improves reliability

The `theme.css` already has self-hosted `@font-face` blocks (lines 11–41) pointing to `../fonts/`. Run the build/download script to populate `variants/01-minimalist-cinema/fonts/` with:
- `montserrat-extra-bold.woff2`
- `inter-regular.woff2`
- `roboto-medium.woff2`
- `jetbrains-mono-regular.woff2`

This removes the fonts.gstatic.com fallback request entirely for users who have already visited (the self-hosted blocks come first in the cascade).

### 3. Add preconnect for Google Fonts CDN (Medium Impact)
**Effort:** Low | **Impact:** ~50–100ms saved on fallback font fetch

Until self-hosted fonts are in place, add preconnect to reduce the DNS/TLS handshake cost for the fonts.gstatic.com fallback:

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### 4. Preload LCP Image / Critical Font (Medium Impact)
**Effort:** Low | **Impact:** LCP improvement

The logo SVG is the LCP element. Preload it:

```html
<link rel="preload" href="/variants/01-minimalist-cinema/img/logo.svg" as="image">
```

---

## Evidence

- **`font-display: swap`** — `theme.css:15,23,31,39,48,56,64,72`
- **JS `defer`** — `index.html:231` and all other pages (same pattern)
- **No sync JS in `<head>`** — All 8 HTML files scanned; zero `<script>` tags in `<head>`
- **Self-hosted fonts src first** — `theme.css:16,24,32,40` (Google Fonts fallback at lines 44–74 only activates if local file 404s)
- **Fonts directory absent** — `glob("variants/01-minimalist-cinema/fonts/*")` returned no files
- **Logo explicit dims** — `index.html:44` → `width="120" height="40"`
- **CSS files in `<head>` without `media` filtering** — `index.html:31–33`
- **All images are SVG** — `.svg` files only; no raster hero image
- **No third-party JS CDN** — No `ajax.googleapis.com`, `cdn.jsdelivr.net`, etc.
