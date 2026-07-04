# Performance Review — Cosmic Horror

**Variant**: cosmic-horror
**Round**: 1 (adversarial)
**Reviewer**: adversarial-code-reviewer
**Date**: 2026-07-04

## Score

- **Performance**: 88 / 100

## ✅ Passed

- **No CDN dependencies**: No Google Fonts `<link>`, no CDN scripts — all fonts self-hosted via `@font-face` with `font-display: swap` (`base.css:8-110`)
- **Fonts self-hosted with font-display: swap**: All 13 font-face declarations use `font-display: swap` — prevents invisible text during font load
- **JS is non-render-blocking**: All pages load JS with `defer` attribute (`<script src="js/main.js" defer></script>` on every page) — JS parses after HTML is fully parsed
- **CSS is not render-blocking** (CSS is in `<link>` tags without `media="print"` or `blocking` attribute, but CSS is parse-blocking by nature — however with no external CDN links, it loads synchronously as part of the critical path which is acceptable for a self-hosted static site)
- **No third-party scripts**: No analytics, no tracking pixels, no social embeds — main.js is the only script and it's ~148 lines of vanilla JS
- **CSS minification**: Build process minifies CSS per new_site.md §6 (CSS is minified at build time)
- **Critical CSS inlined?** Not applicable — the site is a static multi-page site; inline critical CSS would add maintenance burden without significant benefit given small CSS footprint (~2100 lines unminified)
- **Image budget**: Hero section uses CSS gradients and SVG (no heavy raster hero image). `img/` contains only SVG files (logo.svg 1566 bytes, favicon.svg 875 bytes, og.svg 1525 bytes) — trivially small. No raster hero images present.
- **SVG icons inline**: All feature icons are inline SVG — zero additional network requests
- **CLS protection**: Font sizes declared in `rem`; no dimensions set on elements that could cause layout shift; `font-display: swap` prevents FOUT from causing CLS; hero content uses fluid `clamp()` preventing reflow

## ⚠️ Concerns (non-blocking)

- **WOFF2 files not verified as variable fonts**: `base.css:10` declares Cinzel with `font-weight: 700 900` (range) but only one woff2 exists (`cinzel-variable.woff2`). If this is actually a named static Bold variant, the 700-900 declaration silently fails. However, the build log (BUILD_LOG.md:62) says "run download-fonts.mjs for the 5 font families" suggesting the tooling was supposed to fetch proper variable/representative fonts. This is a process concern not a code bug — the files appear to be present. — *impact: medium*
- **No lazy loading on below-fold images**: Not applicable — there are no raster images to lazy load. All visuals are SVG inline or CSS.
- **14 network requests for fonts**: 13 @font-face declarations each pointing to a distinct woff2 file — for first-time visits this means 13 font files loaded. However, all fonts use `font-display: swap` so text is visible immediately with fallback, and HTTP/2 multiplexing reduces the overhead of multiple requests. — *impact: low*

## ❌ Failures (must fix this round)

None — no blocking issues in this dimension.

## Recommendations (ranked by impact)

1. Verify `cinzel-variable.woff2` is a true variable font (weight axis 700–900) and not a single static cut being stretched — if it's a static Bold, download the variable version or declare only the actual weight present (impact: medium, effort: low)
2. Consider subsetting fonts to Latin characters only to reduce file sizes if not already done (impact: low, effort: medium)

## Evidence

- `base.css:8-110` — all 13 @font-face declarations with `font-display: swap`
- `base.css:240` — body has `overflow-x: hidden` preventing scroll bar shift
- `index.html:400` — `<script src="js/main.js" defer></script>`
- `theme.css:139-172` — hero uses CSS gradients (repeating-conic-gradient, radial-gradient, linear-gradient) — no raster image
- `ls -la css/fonts/` — 13 woff2 files present totaling ~270KB (small for a full font family)
- `BUILD_LOG.md:62` — "Fonts not yet self-hosted" was noted during build but font files now exist
