# Performance Review — 01-minimalist-cinema-5 (Wave 5)

## Score: 75/100 — PASS (with caveats)

## What's Working
- Self-hosted fonts present in `fonts/` directory with `font-display: swap`
- Zero CDN requests for core assets — all CSS, JS, fonts are self-hosted
- Vanilla JavaScript only — no jQuery, React, Vue, or other frameworks
- JS is loaded with `defer` attribute allowing non-blocking parse
- No render-blocking CSS imports
- SVG favicon and manifest.webmanifest for efficient favicon delivery
- Minimal JS footprint — only 147 lines
- No images on index.html — all visual elements are CSS/SVG

## Critical Issues (blockers)
1. **Google Fonts fallback import defeats self-hosting**: theme.css line 8 has `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display...')` — Every page load will make a request to fonts.googleapis.com. This should be removed.

## Minor Issues (non-blockers)
1. **fonts/ directory contains wrong fonts**: Playfair Display and Work Sans are the wrong fonts per brand kit (should be Montserrat and Inter).
2. **No font preloading**: The critical fonts are not preloaded with `<link rel="preload">`.
3. **SVG og:image**: SVG files don't compress as well as raster formats for a 1200x630 image.

## Recommendations
1. **Remove Google Fonts import** from theme.css line 8 entirely
2. **Replace self-hosted fonts**: Replace playfair-display-*.woff2 and work-sans-*.woff2 with montserrat-*.woff2 and inter-*.woff2 files
3. **Add font preloading** for the headline font in `<head>`
4. Consider converting og.svg to a compressed PNG
