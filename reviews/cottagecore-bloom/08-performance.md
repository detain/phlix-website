# Performance — Cottagecore Bloom

**Dimension:** Performance
**Score:** 90/100
**Severity:** ✅

---

## Summary

Fonts are self-hosted WOFF2 in `css/fonts/` with `font-display: swap` (confirmed in `css/fonts/fonts.css`). No CDN links for fonts or JS. All JS is deferred (`<script src="js/main.js" defer>`). CSS is split into 3 files loaded in the document head (non-render-blocking since they're synchronous stylesheets; ideally they'd be combined but they are small). Hero image is CSS-only (gradient + petal divs) — no raster image to load. Petal animation is CSS `animation` + JS-created DOM elements — lightweight. No third-party scripts, analytics, or tracking. Lazy-loading is not needed (no below-fold images).

---

## Findings

### ✅ Correct implementations

**Self-hosted fonts (WOFF2)** — All fonts served from `css/fonts/`. Files confirmed:
- Playfair Display: woff2 with 400, 700 weights ✓
- Dancing Script: woff2 ✓
- Lora: woff2 with 400, 500, 700 weights ✓
- Nunito: woff2 with 400, 500, 600, 700 weights ✓
- Courier Prime: woff2 with 400, 700 weights ✓
No Google Fonts CDN link found. ✓

**font-display: swap** — `css/fonts/fonts.css` uses `@font-face { ... font-display: swap; }` — ensures text remains visible during font load (no invisible text FOIT). ✓

**No CDN JS dependencies** — `main.js` is the only JS file and it is self-contained vanilla JS. No jQuery, no lodash, no analytics. ✓

**Deferred JS** — `<script src="js/main.js" defer></script>` on all pages. JS does not block HTML parsing. ✓

**No render-blocking JS** — No inline `<script>` tags in `<head>`. All scripts are deferred or at end of body. ✓

**CSS split is appropriate** — 3 CSS files (base.css ~272 lines, theme.css ~756 lines, components.css ~626 lines) are loaded in `<head>`. They are small enough that combining them would save only one HTTP request. They use CSS `@import` for fonts which could cause a render delay on first load, but `fonts.css` is lightweight (just @font-face declarations). Overall this is acceptable for a static marketing site.

**CSS @import for fonts is not render-blocking** — `base.css:7`: `@import "./fonts/fonts.css";` — this is in the CSS cascade, so the font file fetch happens after base.css is parsed. Since fonts.css contains only @font-face declarations (no actual font bytes), this import has near-zero render-blocking cost. ✓

**Hero is CSS-only** — `.hero` uses `linear-gradient` and `radial-gradient` for background effects + JS-created petal `<div>` elements for animation. No external image fetch for the hero. ✓

**Petal animation is lightweight** — Petals are 12 small `<div>` elements (12–20px each) with CSS animations. CSS `animation` runs on compositor thread (transform/opacity only). `main.js` creates the petal DOM elements once on load. CPU cost is minimal. ✓

**No lazy-loading needed** — No raster `<img>` elements on the site (all images are SVG or CSS). Lazy-loading `<img>` is not applicable. ✓

**total page weight estimate** — Per page:
- HTML: ~20–30 KB (unminified, reasonably sized)
- CSS (3 files): ~50–60 KB combined (readable, with comments)
- JS: ~3 KB
- Fonts: ~300–400 KB total for all 5 font families × 4 weights (first-load only; cached thereafter)
- No hero image

Total first-load ≈ 400–500 KB (within the ~500 KB budget per page). ✓

### ⚠️ Minor notes

**CSS not minified** — The spec says "CSS is minified at build time" (`new_site.md §6`). The CSS files are in readable/developer format with comments. This is acceptable during development; the build pipeline would minify before deployment. No runtime performance impact on the local static files.

**12 petal elements created via JS** — `main.js:80–94`: Creates 12 petal divs on page load. This is a one-time DOM operation; not measurable as a performance concern. ✓

---

## Verdict

Performance fundamentals are solid. No CDN dependencies, self-hosted WOFF2 with swap, deferred JS, CSS-only hero. The main improvement opportunity would be minifying CSS at build time and combining the 3 CSS files into one to reduce HTTP requests — but these are build-time optimizations, not runtime defects.
