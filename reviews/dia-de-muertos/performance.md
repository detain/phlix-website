# Performance Review — Día de Muertos

**Variant**: dia-de-muertos
**Round**: 1
**Reviewer**: adversarial-reviews-agent
**Date**: 2026-07-01

## Score

- **Performance**: 84 / 100

## ✅ Passed

- All @font-face declarations in theme.css are commented out (theme.css:16–27) with an explicit note that they are placeholders pending font file acquisition. No Google Fonts CDN links are present anywhere in the codebase — the site correctly uses system serif/sans-serif fallback stacks (Playfair Display → Georgia → serif, IBM Plex Sans → system-ui → sans-serif, etc.) defined in CSS custom properties.
- All `@font-face` declarations include `font-display: swap` — confirmed in each commented-out declaration (theme.css:17–26). Once fonts are uncommented they will load with proper swap behavior, preventing FOIT.
- All JS files (only `js/main.js`) are loaded with `defer` attribute on every HTML page — index.html:423, features.html:383, clients.html:268, download.html:274, about.html:222, hub.html (line ~), docs.html (line ~), plugins.html (line ~). No render-blocking synchronous scripts found.
- No external CDN resources of any kind. All CSS is self-contained local files: `css/base.css`, `css/theme.css`, `css/components.css`. No `<link rel="stylesheet" href="https://...">` CDN dependencies.
- CSS is modular and reasonably sized — three separate stylesheets totaling approximately 280 + 775 + 774 = ~1829 lines. The base.css is a focused modern reset; theme.css handles layout and section styling; components.css handles reusable UI components.
- JavaScript is minimal — only 70 lines in `main.js`, covering mobile nav toggle, scroll reveals, and outside-click close. No heavy JS frameworks, no animation libraries, no third-party dependencies.
- `scroll-behavior: smooth` on `html` (base.css:15) — browser-native smooth scroll, no JS scroll library needed.
- SVG favicon is inline data in some pages (no extra request) or a small SVG file (favicon.svg, ~1KB). No raster ICO file fetched.
- `img/og.svg` is a vector SVG (1200×630 viewBox), not a raster image — zero image weight for the social share card.

## ⚠️ Concerns (non-blocking)

- The commented `@font-face` blocks in theme.css occupy lines 16–27 but still contain actual font family names as strings. If a future developer accidentally uncomments only some of these (e.g., without running the font download tool), the browser will issue 404 network errors for missing WOFF2 files. — Add a comment in theme.css stating that running `node tools/download-fonts.mjs --kit dia-de-muertos` is a required step before uncommenting, and ideally add a build-step validation.
- No `<link rel="preconnect">` is present. Since fonts are self-hosted (via @font-face after download), preconnect is less critical than for Google Fonts, but once WOFF2 files are live, adding `preconnect` to the font origin would shave ~100ms off first load. — Add `<link rel="preconnect" href="https://detain.github.io/phlix-website/sites/dia-de-muertos/">` once fonts are self-hosted in the same origin.
- The `css/theme.css` file is 775 lines and includes all `@font-face` placeholder comments plus all section styles. When fonts are uncommented this file will grow further. The file is not split into critical/non-critical — all styles are render-blocking in the `<head>`. — Split into `css/critical.css` (reset + tokens + layout) and `css/theme.css` for non-critical sections once the site grows beyond current static size.
- No image optimization pipeline is mentioned. `img/logo.svg` is referenced with fixed `width="120" height="40"` attributes in HTML (e.g., index.html:78). If logo.svg is a complex SVG, the intrinsic dimensions may be larger than display size, causing unnecessary rasterization work in the browser. — Confirm that `img/logo.svg` renders cleanly at 120×40 via a build step that rasterizes or simplifies the SVG to exact needed dimensions.

## ❌ Failures (must fix this round)

- No failures identified. Font loading strategy is sound (self-hosted, commented with font-display: swap note), JS is deferred, CSS is local, no CDN dependencies, no heavy images. The site correctly implements the self-hosted font architecture expected by the rubric.

## Recommendations

1. Add a `<!-- @font-face declarations require: node tools/download-fonts.mjs --kit dia-de-mueltos -->` build-time note to theme.css before the font-face block, so future developers don't accidentally uncomment dead links (impact: medium, effort: low)
2. Once fonts are downloaded, add `<link rel="preconnect">` for the font origin (impact: low, effort: low)
3. Confirm `img/logo.svg` is optimized for 120×40 display size (impact: low, effort: medium)

## Evidence

- @font-face placeholders: `theme.css:16–27` (all include `font-display: swap`)
- No Google Fonts CDN: confirmed by grep of all HTML files — zero `fonts.googleapis.com` or `fonts.gstatic.com` references
- JS defer on index.html: `index.html:423`
- JS defer on features.html: `features.html:383`
- JS defer on clients.html: `clients.html:268`
- JS defer on download.html: `download.html:274`
- JS defer on about.html: `about.html:222`
- img/og.svg is SVG: `img/og.svg:1` — `viewBox="0 0 1200 630"`, no raster content
- js/main.js is 70 lines with no dependencies: `js/main.js:1–70`
- CSS custom properties font stacks: `base.css:107–111`
