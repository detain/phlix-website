# Performance Review — Abstract Canvas

> Supersedes the 2026-06-30 review of the **predecessor** site (recoverable from git history).

**Variant**: abstract-canvas
**Round**: 1 (regen pass, `regen/wave-1`)
**Reviewer**: adversarial reviewer (independent)
**Date**: 2026-07-24

## Score

- **Performance**: 87 / 100

Lighthouse could not be run in this environment, so this is a budget-and-critical-path audit plus
browser measurements, not a Lighthouse score. Nothing found here is a blocker.

## ✅ Passed

- **No raster images on any page.** The hero composition, all 8 feature icons, the hub diagram, the
  three persona vignettes, Palette and the 404 canvas are CSS gradients + inline SVG. `og.png`
  (74 KB) is metadata only and never fetched by a visitor. Hero image budget (≤120 KB) is trivially
  met — there is no hero image.
- **JS: 13.9 KB, one file, `defer`, dependency-free, hand-written** — inside the §2A ~15 KB budget,
  and `hero_experience.js_budget_kb: 0` is honoured literally (the hero is pure markup, verified with
  JS disabled). No render-blocking script, no CDN, no library.
- **All 10 `@font-face` rules are `font-display: swap`** and point at existing vendored WOFF2s in the
  shared latin-subset pool; zero external font requests (§19.3 clean).
- CSS is three files, 57.6 KB unminified, no `@import`, no web-font `@import`, no filter/backdrop
  effects on large areas; `npm run build` minifies them for `dist/`.
- Depth is `box-shadow`, never glow images (`do_dont.performance.do` respected); the canvas grain is
  two repeating gradients rather than a texture asset, and it is dropped at print.
- Layout stability: the logo carries `width`/`height` attributes; no injected content shifts the page
  on load in the default (out-of-season) state.

## ⚠️ Concerns (non-blocking)

- **Fonts dominate the payload: ~312 KB** across the 8 faces a page actually exercises (Bebas 400
  13.8 KB; Cormorant 600 + 700 = 75.3 KB; **Inter 400 + 500 + 600 = 144.8 KB**; Lora 400 37.8 KB;
  JetBrains Mono 400 40.4 KB). Total first-load ≈ 385 KB — inside the ~500 KB budget, but 80% of it
  is type, and Inter 500 appears to be used only by `.skip-link` (`css/base.css:288-290`). Dropping
  one Inter weight recovers ~48 KB. — ROUND-1 #22.
- `body::before` is a **fixed**, full-viewport, two-gradient overlay at `opacity: .5`
  (`css/base.css:151-161`). Cheap in principle, but a fixed-position painted layer is the classic
  cause of scroll-repaint cost on mid-range phones; the kit's `responsive_behavior.tablet` even asks
  for reduced effect intensity on mid-range devices. Worth a scroll-jank check on real hardware.
- The seasonal banner is created and inserted **before** `<header>` after first paint
  (`js/main.js:388-395`), i.e. a CLS event at the top of the document — inert today (no active range),
  live for 4 months of the year. — ROUND-1 #26.
- Print output loses all 13 `.reveal` blocks (not a speed issue, but a `.reveal`-gating side effect
  worth fixing while in the file). — ROUND-1 #24.

## ❌ Failures (must fix this round)

- None.

## Recommendations (ranked by impact)

1. Verify whether Inter 500 (and Lora 500) are used at all; drop unused weights from the vendored
   block (impact: medium, effort: low — but the sentinel block is tool-owned, so regenerate rather
   than hand-edit).
2. Reserve space for the seasonal banner (or render it server-side, hidden) so an active season does
   not shift the header (impact: low, effort: low).
3. Spot-check scroll performance with the fixed grain layer on a mid-range phone; if it costs, gate it
   behind `@media (min-width: 900px)` (impact: low, effort: low).

## Evidence

- Byte counts: `css/base.css` 12.5 KB, `css/theme.css` 30.0 KB, `css/components.css` 15.0 KB,
  `js/main.js` 13.9 KB, `img/logo.svg` 1.8 KB, `img/favicon.svg` 0.7 KB, `img/og.png` 74.9 KB;
  fonts measured in `shared/assets/fonts/` (390 KB for all 10 declared faces, ~312 KB for the 8
  exercised).
- `node tools/render-check.mjs --site abstract-canvas` reports no failed requests and no console
  errors on any of the 9 pages at either viewport.
- `selfcheck` reports "10 @font-face rule(s) … js 13.6 KB".
