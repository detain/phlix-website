# Performance Review R2 — Stardust Observatory

## Score
**PASS** (Weight 1.2)

---

## ✅ Passed

| Criterion | Evidence |
|-----------|----------|
| **No Google Fonts CDN** | CSS defines only system serif/sans fallback stack: `'Playfair Display',georgia,'Times New Roman',serif` etc. No `<link>` tag to Google Fonts CDN. No `@font-face` referencing `fonts.gstatic.com`. |
| **No @font-face with fonts.gstatic.com** | base.css:9 comment explicitly states fonts are self-hosted WOFF2 in `css/fonts/` — none present. |
| **JS files exist and use defer/async** | Single `js/main.js` (99 lines) linked with `defer` in all HTML pages (e.g., index.html:224 `<script src="js/main.js" defer>`). File verified to exist. |
| **Total CSS: 3 files** | `css/base.css` (tokens/reset), `css/theme.css` (typography/layout), `css/components.css` (header/footer/buttons/cards) — optimal for HTTP/2 parallel delivery. |
| **No @import in CSS** | No `@import` statements found across all three CSS files. All styles loaded via `<link rel="stylesheet">` in HTML `<head>`. |
| **CSS custom properties for theming** | All 40+ design tokens defined in `:root` in base.css:12–100. Consistent usage throughout theme.css and components.css. Excellent for browser caching — one token change updates all usages. |
| **Star-field backgrounds CSS-only** | `.hero::after` uses `radial-gradient` at multiple positions with varying opacities (theme.css:155–170). No raster image assets for star fields. |
| **CSS keyframes only** | `star-breath` keyframe animation (theme.css:172–175), scroll reveal animation (components.css:695–707), `dome-open-animation`/`star-fade-in`/`constellation-line` in reduced-motion override (base.css:277–284). No JS animation libraries. |
| **Image assets: only SVGs** | Only three image assets: `img/og.svg`, `img/favicon.svg`, `img/logo.svg` — all inline SVG. No raster images (jpg, png, webp, gif) present in the project. |

---

## ⚠️ Concerns

None.

---

## ❌ Failures

None.

---

## Recommendations

1. **Self-hosted fonts**: If custom fonts (Playfair Display, IM Fell English, Lora, Jost, DM Mono) are added later as WOFF2 files, ensure they are loaded via `font-display:swap` in `@font-face` to avoid render-blocking.

---

## Evidence

- **CSS files**: base.css (284 lines), theme.css (548 lines), components.css (752 lines) — total 1584 lines, well-structured separation
- **JS file**: js/main.js (99 lines) — minimal, vanilla JS with no dependencies, defer-loaded
- **Star-field**: theme.css:155–170 uses 8 `radial-gradient` stops for star effect
- **Animations**: Only CSS `@keyframes star-breath`, `.reveal`/.`is-visible`, no JS animation libraries
- **Image assets verified**: `img/og.svg`, `img/favicon.svg`, `img/logo.svg` confirmed via glob
- **No Google Fonts**: No `<link rel="preconnect" href="https://fonts.googleapis.com">` in any HTML file
