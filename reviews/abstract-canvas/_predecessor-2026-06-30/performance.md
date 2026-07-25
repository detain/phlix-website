# Dimension 8: Performance — Review

**Score: 38/100**

---

## Findings

### ❌ FAIL — Self-hosted WOFF2 fonts: css/fonts/ directory does not exist
- `index.html:31-38` — Inline `@font-face` block with `font-family: 'Cormorant Garamond'` uses only `local('Cormorant Garamond')` with `font-display: swap`
- **No WOFF2 font files are loaded** — the `@font-face` has no `url()` pointing to an actual WOFF2 file
- `css/fonts/` directory confirmed absent (`ls` returned "No fonts directory")
- Brand kit spec: "Fonts declared with @font-face + font-display: swap (self-hosted WOFF2 preferred)"
- new_site.md §13: "Fonts self-hosted WOFF2 with font-display: swap; subset to used scripts"
- new_site.md §1: "css/fonts/ — self-hosted WOFF2 (optional but preferred)"
- **Impact**: The inline Cormorant Garamond declaration only falls back to whatever local font is installed — no actual brand typography loads. This is a significant regression.
- The declaration in `index.html:33-37` uses `local()` only — no `url()` src, so the browser never fetches a WOFF2 file
- `base.css:75-79` defines `--font-headline` etc. as CSS custom properties but these are never paired with real @font-face rules in the CSS files

### ❌ FAIL — No font-face declarations in any CSS file for the brand fonts
- `base.css` has only a reset, tokens, and base element styles — no @font-face rules
- `theme.css` has no @font-face rules
- `components.css` has no @font-face rules
- The only @font-face is the inline one in `index.html:31-38` which only uses `local()` for one font (Cormorant Garamond) and only on the home page
- **No @font-face exists for Bebas Neue, Lora, Inter, or JetBrains Mono**

### ✅ PASS — JS loaded with `defer`
- All pages: `<script src="js/main.js" defer></script>` (index.html:285, features.html:190, etc.)
- No render-blocking inline scripts

### ✅ PASS — No CDN dependencies in deployed pages
- No Google Fonts `<link>` tags found
- No CDN script tags found
- All links are local relative paths (`css/base.css`, `css/theme.css`, `css/components.css`, `js/main.js`)
- External links use `https://` with `rel="noopener noreferrer"` (e.g., docs links)

### ✅ PASS — CSS: three separate files loaded in correct order
- `index.html:41-43` — `<link rel="stylesheet" href="css/base.css">`, `css/theme.css`, `css/components.css` in correct order
- Same pattern on all other pages
- base.css (reset + tokens) → theme.css (typography + layout) → components.css (UI components) — correct cascade

### ✅ PASS — Hero uses CSS gradient/SVG, no heavy raster
- `theme.css:153-162` — `.hero::before` uses only `linear-gradient()` and `radial-gradient()` — no raster images
- `theme.css:209-237` — `.hero-accent-block` uses CSS gradients only — no raster images
- Hero section has no `<img>` elements, only CSS gradients and inline SVG

### ⚠️ WARN — Total page weight: hero is lightweight but og:image is SVG (not counted as KB transferred, but...)
- `img/og.svg` is an SVG file — no raster image to track for hero image budget
- new_site.md §13: "hero image ≤~120 KB" — the hero has no raster image at all, so this passes trivially
- Total transferred per page is lightweight (HTML + CSS + minimal JS), well under the ~500 KB budget

### ⚠️ WARN — Font subsetting cannot be assessed because no WOFF2 files exist
- Since no WOFF2 files are in `css/fonts/`, there is nothing to subset
- The inline font-face in index.html only uses `local()` — no download required

### ❌ FAIL — All 8 pages should have font-face declarations
- Only `index.html` has an inline @font-face (for Cormorant Garamond only, and only with `local()`)
- `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html` have NO @font-face declarations at all
- Even the inline block in index.html is incomplete (no url(), only local())

---

## Summary

The performance profile is severely undermined by a critical font loading regression. No self-hosted WOFF2 files exist in `css/fonts/`, and no CSS file contains a proper `@font-face url()` rule for any of the four brand fonts (Cormorant Garamond, Bebas Neue, Lora, Inter, JetBrains Mono). The inline `@font-face` in `index.html` only specifies `local()` with `font-display: swap` — no actual font file is downloaded. Every other page has zero font loading code. The site relies entirely on whatever local system fonts happen to be installed, which means the Abstract Canvas brand typography is completely absent in the deployed pages. The good news: JS is non-blocking, no CDN dependencies, hero is pure CSS, and page weight is low — but without self-hosted fonts, the visual identity fails.

**Critical fix required**: Generate self-hosted WOFF2 files for Cormorant Garamond, Bebas Neue, Lora, Inter, and JetBrains Mono, place them in `css/fonts/`, and add proper `@font-face` rules with `url()` + `format('woff2')` + `font-display: swap` in `base.css`.
