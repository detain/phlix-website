# Performance Review — stardust-observatory

**Variant**: 01-minimalist-cinema
**Round**: 1
**Reviewer**: Senior Front-End Reviewer
**Date**: 2026-07-04

## Score

- **Performance**: 45 / 100

## ✅ Passed

- Scripts use `defer` attribute — no render-blocking JS (`index.html:224` — `<script src="js/main.js" defer></script>`)
- CSS design tokens defined as CSS custom properties in `:root` (`css/base.css:49-136`)
- Hero background uses CSS gradients (`--gradient-celestial-zenith`, `--gradient-nebula-bloom`) and `radial-gradient` star-field (`css/theme.css:136-169`) — no heavy raster images
- img/ folder contains only lightweight SVG assets (favicon.svg 543B, logo.svg 1.2KB, og.svg 3.2KB) — no unoptimized PNGs
- `font-display: swap` declared on all `@font-face` rules (`css/base.css:13,21,29,37,45`)

## ⚠️ Concerns (non-blocking)

- Star-field `radial-gradient` animation (`css/theme.css:169`) runs continuously without `requestAnimationFrame` check — low impact on CLS but wastes CPU on static pages — brand kit §22 performance do_dont flags this
- No lazy-loading attributes on below-the-fold images (spec §13 recommends but doesn't require for SVG-only sites)

## ❌ Failures (must fix this round)

- **css/base.css:10-46** — Fonts loaded from `https://fonts.gstatic.com` CDN, NOT self-hosted WOFF2 in `css/fonts/` — violates new_site.md §13 explicit requirement: "Fonts self-hosted WOFF2 with `font-display: swap` (no CDN links in deployed pages)" and new_site.md §1: "No CDN dependencies in the deployed page...Self-host fonts as WOFF2 and declare them with `@font-face` + `font-display: swap`." The WOFF2 files must be downloaded and placed in `css/fonts/` with relative `@font-face src: url('css/fonts/...')` paths.
- **No fonts/ folder exists** — `css/` contains only base.css, theme.css, components.css; `css/fonts/` is empty/absent per `ls -la css/` output

## Recommendations (ranked by impact)

1. **Download all 5 Google Font families as WOFF2** (impact: high, effort: medium) — Playfair Display, IM Fell English, Lora, Jost, DM Mono from fonts.gstatic.com; place in `css/fonts/`; update `@font-face src` URLs to relative `css/fonts/*.woff2` paths. This is a **blocker** — site cannot pass review without it.
2. **Add `will-change: opacity` to `.hero::after` star-field** (impact: medium, effort: low) — promotes the animated layer to its own compositor; prevents layout recalc during `star-breath` animation.
3. **Wrap star-breath in prefers-reduced-motion** (impact: medium, effort: low) — the star-field opacity animation runs unconditionally; brand kit §22 requires honoring `prefers-reduced-motion`.

## Evidence

- CSS @font-face sources verified: `css/base.css:10` (Playfair Display), `css/base.css:18` (IM Fell English), `css/base.css:26` (Lora), `css/base.css:34` (Jost), `css/base.css:42` (DM Mono) — all point to `https://fonts.gstatic.com/s/...`
- CSS custom properties confirmed: `css/base.css:49-136` — all color/spacing/typography tokens use `--color-*`, `--space-*`, `--font-*` vars
- Hero gradient confirmed: `css/theme.css:142` uses `var(--gradient-celestial-zenith)` which expands to `linear-gradient(180deg, #1A2744 0%, #0D1B2A 100%)`
- img/ assets confirmed via `ls -la`: favicon.svg 543B, logo.svg 1.2KB, og.svg 3.2KB, PROMPTS.md 4.7KB — no raster images
- JS defer confirmed: `index.html:224`
