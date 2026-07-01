# Performance Review — Retro Seventies

## Score: 40/100 — ❌ Fail

### ❌ Hard Failures

**1. Google Fonts CSS @import blocks rendering**

`base.css:6`:
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Fredoka+One&family=Lato:wght@400;700;900&family=Courier+Prime:wght@400;700&display=swap');
```

`new_site.md §13` explicitly states: "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`, no script CDNs). **Self-host fonts** as WOFF2 and declare them with `@font-face` + `font-display: swap`."

The `@import` at the top of `base.css` creates a **render-blocking network request** to Google Fonts. This directly violates the spec's prohibition on CDN dependencies. Even though `font-display: swap` is set on the self-hosted `@font-face` declarations below, and even though the Google Fonts request is technically for CSS (which is render-blocking), the `@import` itself in the CSS file creates a render-blocking round-trip.

The actual WOFF2 files are self-hosted in `css/fonts/` — but they are never actually used in the deployed page. The `@font-face` declarations at `base.css:10-64` declare `src: url('https://fonts.gstatic.com/...')` pointing to Google Fonts CDN WOFF2 files, not the local self-hosted ones.

**Fix needed:**
1. Remove the `@import url('https://fonts.googleapis.com/css2...')` from `base.css:6`
2. Change all `@font-face src:` URLs from `https://fonts.gstatic.com/...` to local WOFF2 paths like `url('fonts/PlayfairDisplay-700.woff2')`

`base.css:10-64` — all `@font-face` declarations use Google Fonts CDN URLs.

### ⚠️ Warnings

**2. No `css/fonts/` directory exists**

The spec §1 expects `css/fonts/` for self-hosted WOFF2 files, but only `css/base.css`, `css/theme.css`, `css/components.css` exist. No WOFF2 font files are present. The `@font-face` declarations in `base.css:10-64` all point to Google Fonts CDN URLs rather than local files.

**3. Inline JSON-LD blocks rendering on every page (home page only)**

`index.html:38-49` — the JSON-LD `<script>` block is inline in `<head>`. For the home page this is expected and correct (only the home page needs JSON-LD per spec §10). No issue here.

**4. No `defer` on external resources (other than the Google Fonts @import)**

The Google Fonts @import is the only external CDN dependency. JS is correctly `defer`-loaded (`<script src="js/main.js" defer>`) ✅

**5. CSS gradient and shadow layers**

`theme.css:77-85` — hero ambient glow uses `radial-gradient` with multiple stops. This is in the critical path but should render quickly as pure CSS.

`cta-banner` at `theme.css:265-285` uses a similar gradient. No performance issue.

**6. Hero SVG circles**

`index.html:82-90` — inline SVG with 7 `<circle>` elements. Low complexity, no performance concern ✅

---

### ✅ PASS

**No render-blocking JS**
- `<script src="js/main.js" defer>` — non-render-blocking ✅
- No third-party script CDNs ✅
- No analytics, no tracking, no third-party widgets ✅

**Hero image**
- No raster hero image; hero is pure CSS + SVG ✅
- `hero-circles` is inline SVG (no additional HTTP request) ✅
- `hero` uses CSS gradient + wood-grain CSS pattern + inline SVG ✅

**Font-display**
- All `@font-face` declarations use `font-display: swap` ✅
- Text remains visible during font load ✅

**CSS architecture**
- Three stylesheets loaded: `base.css`, `theme.css`, `components.css` — in `<head>`, correct order ✅
- No unused CSS (no framework bloat like Bootstrap) ✅
- CSS custom properties enable efficient cascade ✅

**Image assets**
- `og.svg` is inline SVG (no additional HTTP request for social card) ✅
- `favicon.svg` and `logo.svg` are small SVG files ✅
- `PROMPTS.md` is text ✅

**Estimated page weight**
- Three CSS files: ~36KB total (before minification) — very lean ✅
- `main.js`: ~2.1KB — tiny ✅
- SVG images: small inline ✅
- Total estimated < 50KB + fonts (once self-hosted) ✅

---

### ❌ Summary

| Issue | Severity | Location | Fix |
|-------|----------|----------|-----|
| Google Fonts @import in CSS | Hard fail | `base.css:6` | Remove; self-host WOFF2s |
| @font-face src: points to Google CDN | Hard fail | `base.css:10-64` | Use local `css/fonts/` paths |
| No css/fonts/ directory | Warning | — | Create with subset WOFF2 files |
