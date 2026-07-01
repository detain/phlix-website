# Performance Review — Solarpunk Eden

**Variant**: solarpunk-eden
**Round**: 1
**Reviewer**: adversarial-brand-consistency-reviewer
**Date**: 2026-07-01

## Score

- **Performance**: 88 / 100

## ✅ Passed

- No Google Fonts CDN links — `@font-face` declarations use `../fonts/` relative paths — `base.css:100-144` — compliant with new_site.md §1 rule "No CDN dependencies"
- All JS is `defer`-loaded — `index.html:244` and all other pages use `<script src="js/main.js" defer></script>`
- CSS custom properties used throughout all stylesheets — no raw off-palette hex in component CSS (one exception: `#4AADCF` in theme.css:107, which is a known issue in Brand Fidelity review)
- No render-blocking JS — `defer` attribute ensures non-blocking load
- `@font-face` has `font-display: swap` — `base.css:105`, `base.css:114`, `base.css:123`, `base.css:133`, `base.css:143`
- Fonts subset to used weights: Playfair Display 700/900, Cormorant Garamond 600/700, Source Serif 4 400/600, DM Sans 400/500/700, JetBrains Mono 400/700 — matches kit `fonts{}` spec
- Scroll-reveal uses `IntersectionObserver` — lazy, not render-blocking — `main.js:45-59`
- Fallback for IntersectionObserver: `document.querySelectorAll('.reveal').forEach` adds `is-visible` immediately — `main.js:63-65`
- Minimal JS footprint: 79 lines total, dependency-free, no analytics, no third-party scripts
- CSS: base (266 lines) + theme (406 lines) + components (656 lines) = ~1328 lines total — reasonable size
- Hero section has no raster image — uses CSS gradient + SVG vine overlay; no hero image to block LCP
- SVG icons inlined in HTML (no external icon sprite requests)
- `scroll-behavior: smooth` on html element — `base.css:148` — native CSS, not JS

## ⚠️ Concerns (non-blocking)

- **hero-vine SVG** is inline in HTML (`index.html:96-102`) — 6 path/circle elements, small but not lazy-loaded. If hero section is LCP element, the inline SVG is in the critical path. Acceptable for size but the animation runs unconditionally (accessibility issue).
- **CSS file ordering**: base.css → theme.css → components.css, all `<link rel="stylesheet">` in `<head>` without `media="print"` or `preload` — standard approach, no render blocking from JS but CSS is parser-blocking (unavoidable for non-critical per new_site.md §13)
- **No `preload`** for font files — `font-display: swap` handles FOIT but a `preload` for critical font weights would improve LCP. Not required by spec.
- **No image compression metadata** — og.svg is SVG (vector), fine for social metadata but new_site.md §8 says "Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** in meta." — this is a social metadata issue, not a performance issue directly.

## ❌ Failures (must fix this round)

- **No failures** in performance budget — no CDN links, no render-blocking JS, self-hosted fonts with swap, no large raster hero image, CSS custom properties throughout (with one raw hex exception in theme.css).

## Recommendations (ranked by impact)

1. Add `<link rel="preload" href="../fonts/PlayfairDisplay-700.woff2" as="font" type="font/woff2" crossorigin>` for critical font to improve LCP — (impact: medium, effort: low)
2. Consider `loading="lazy"` on below-fold images when raster images are added (currently all SVGs or CSS) — (impact: low, effort: low)

## Evidence

- `grep -n "fonts.googleapis\|cdn\|preconnect\|render\|defer\|font-display" /home/sites/phlix/sites/solarpunk-eden/css/*.css /home/sites/phlix/sites/solarpunk-eden/*.html`
- JS file line count: `wc -l /home/sites/phlix/sites/solarpunk-eden/js/main.js` = 79 lines
