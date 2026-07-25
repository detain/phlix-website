# Performance Review — Cottagecore Bloom

**Variant**: cottagecore-bloom
**Round**: 1
**Reviewer**: adversarial reviewer (Claude Opus 5)
**Date**: 2026-07-25

## Score

- **Performance**: 93 / 100

Per the owner ruling (`new_site.md` §2A, 2026-07-25) and the review brief, **no
finding is filed for JS or CSS byte count**. `selfcheck` warns at 40 KB; this site
ships 15.5 KB of JS. What is assessed below is real cost: requests, blocking,
layout stability and rendering work.

## ✅ Passed

- **Total critical-path weight is small.** `index.html` (44.7 KB) +
  `base.css` (14.4) + `theme.css` (19.1) + `components.css` (31.9) +
  `main.js` (15.8) = **126 KB uncompressed**, ~30–35 KB over the wire with gzip.
  Well inside the 500 KB page budget.
- **Zero raster images on the critical path.** There is no hero image at all —
  the diorama is five inline SVGs and the linen texture is two
  `repeating-linear-gradient`s (`base.css:176-178`), which is exactly what the
  kit's own `do_dont.performance` asks for ("use CSS box-shadow for botanical
  glows — do not use glow images", "compress all botanical texture and paper grain
  overlays aggressively"). `og.png` (155 KB, correctly 1200×630) is never fetched
  by the browser — it is a social-preview asset only. Hero image budget: **0 KB
  against 120 KB**.
- **No render-blocking JS.** One `defer`red script, no third-party requests, no
  analytics, no font CDN, no dependencies at all.
- **All twelve `@font-face` rules use `font-display: swap`** and point at the
  shared latin-subset WOFF2 pool — no FOIT, and the kit's
  `do_dont.performance.dont` "Block render on web font load" is respected.
- **CLS risk is low.** Every `<img>` on the site carries explicit `width` and
  `height` (logo 132×42; seasonal motifs 56×56; the JS-injected banner image sets
  `img.width`/`img.height` before insertion, `js/main.js:441-443`). Icons are
  inline `<symbol>` with fixed px sizing. The `.reveal` entrance animates only
  `opacity` and `transform`, both compositor-only — no layout thrash.
- **The icon sprite is one same-document `<symbol>` block per page**, so icons cost
  zero requests. This also survives `file://`, which an external sprite reference
  would not.
- **Scroll and pointer handling is correct.** `js/main.js:135-163`:
  `requestAnimationFrame` coalescing with a `queued` flag, both listeners
  `{ passive: true }`, `pointermove` filtered to `pointerType === 'mouse'` so
  touch devices do no parallax work at all, and `scrollY` clamped to the diorama
  height. `isStill()` short-circuits the whole loop under reduced motion or calm
  mode — no wasted frames.
- Two `IntersectionObserver`s rather than scroll listeners for the reveal and tip
  systems. The reveal observer's 2500 ms safety net (`:117`) is a single
  `setTimeout`, not a poll.
- The seasonal motif SVGs are `loading="lazy"` and are only ~1 KB each; they are
  never requested outside an active season.
- No `SVG filter` (`feGaussianBlur`) on any large surface — another explicit kit
  `dont` respected. The only filter uses are a `drop-shadow` on a 64px bee and a
  `saturate(0.72)` on passed sections.

## ⚠️ Concerns (non-blocking)

- **Three separate blocking stylesheets in `<head>`** (`index.html:47-49`) — 65 KB
  across three round trips before first paint. On HTTP/2 GitHub Pages the
  multiplexing cost is small, and the split is genuinely useful for authoring, so
  this is a note rather than a defect. If LCP ever needs shaving, the cheapest win
  is inlining the `:root` token block and the above-the-fold hero rules.
- **`will-change: transform` is set unconditionally on all five `.hero-plane`
  elements** (`theme.css:173`). This promotes five compositor layers for the
  lifetime of the page, including on touch devices where the parallax never runs
  (`pointermove` is filtered to mouse) and under reduced motion / calm mode where
  `request()` returns immediately. On a low-memory phone that is five layers of
  GPU memory for a static illustration. Scope it — e.g. set it from JS only when
  `!isStill()` and a mouse pointer has been seen, or move it behind
  `@media (hover: hover) and (prefers-reduced-motion: no-preference)`.
- **`html { scroll-behavior: smooth }`** (`base.css:28`) applies globally, so every
  in-page anchor — including the skip link and the `visitor_paths` fragment
  targets — animates. It is correctly reset under `prefers-reduced-motion`
  (`:352-355`), which is the important half, but smooth-scrolling a skip link
  slows keyboard navigation for everyone else. Consider scoping it off
  `.skip-link`.

## ❌ Failures (must fix this round)

_None._

## Recommendations (ranked by impact)

1. Gate `will-change: transform` behind hover + no-reduced-motion, or set it from JS (impact: medium, effort: low).
2. Exempt the skip link from `scroll-behavior: smooth` (impact: low, effort: low).
3. If LCP needs work later, inline the token block plus hero rules (impact: low, effort: medium).

## Evidence

- Byte counts: `wc -c` over `index.html` + the three CSS files + `main.js`.
- `og.png` header parse → 1200×630, 155 KB (social-only, not on the critical path).
- `grep -c 'font-display: swap' css/base.css` → 12 of 12 `@font-face` rules.
- Source read of `js/main.js` (452 lines) — rAF coalescing, passive listeners,
  pointer-type filter, `isStill()` short-circuit all confirmed.
- `node tools/render-check.mjs --site cottagecore-bloom --shots` → PASS, no
  console errors and no failed requests on any of the 10 pages × 4 viewports.
- Lighthouse was **not** run (repo-wide npm gates are out of scope for this
  review); this score is from static and runtime inspection, not from an LHCI run.
