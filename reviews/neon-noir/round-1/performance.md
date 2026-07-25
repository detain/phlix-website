# Performance Review — Neon Noir

**Variant**: neon-noir
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Performance**: 88 / 100

## ✅ Passed

- No render-blocking JavaScript: both scripts are `defer` and at the end of `<body>` (`index.html:737-738`). No third-party script, no CDN, no framework — vanilla and dependency-free.
- All thirteen `@font-face` rules carry `font-display: swap`, and every `src` is a self-hosted latin-subset WOFF2 from the shared pool. `do_dont.performance` "Block render on web font load" avoided.
- **All glow is CSS `box-shadow`/`text-shadow`/`drop-shadow` — no glow images and no SVG glow filters anywhere**, exactly as `do_dont.performance` requires. Textures (rain, grain, blinds, venetian rules) are all `repeating-linear-gradient`/`radial-gradient`, so they cost zero bytes.
- All illustration is inline SVG geometry (hero alley, 404 alley, Lux, feature icons, client icons) — no raster art on any page.
- Total page weight is small: largest HTML 30 KB (`index.html`), CSS 60 KB across three files, JS 14.6 KB across two, `og.png` 85 KB (not fetched by the page). Well inside the 500 KB budget; `selfcheck`'s only size threshold (40 KB JS) is not approached.
- `og.png` is correctly 1200×630 at 85 KB.
- `IntersectionObserver` is feature-detected and `unobserve`s each target after firing (`js/main.js:57,66`) — no leaked observers, no scroll listeners at all.
- `js/main.js:75` skips arming anything already above the fold, so the initial paint is never re-animated — this also means a JS or CSS failure can never hide content, since nothing is hidden by the stylesheet alone.
- No layout-thrashing patterns: the cut/wipe animations use `opacity`, `transform` and `clip-path` only (compositor-friendly); no `width`/`height`/`top` animation anywhere.
- CLS risk is low: `img` carries `width`/`height` (`index.html:69`), `.opener__art` reserves `min-height`, and the seasonal banner injects into a pre-existing `<div data-season-slot>` rather than prepending to `<body>`.
- `defer` ordering is safe: `main.js` runs before `experience.js`, and the `phlix:calm` event listener registered in `main.js` correctly catches the calm state that `experience.js` restores afterwards (`js/main.js:82-87`), so a returning calm-mode visitor never sees an armed section.

## ⚠️ Concerns (non-blocking)

- **`css/base.css:19-97`** — ten redundant `@font-face` rules duplicating the generated `vendor-fonts` block (`:400-497`): 23 declarations where 13 suffice. Because the `src` values are identical the browser will not double-download, so the cost is parse time and confusion, not bytes — but it should go.
- **`css/theme.css:937`, `css/theme.css:336`, `css/components.css:864`** — three `infinite` animations. `sign-flicker` animates `text-shadow`, which is **not** compositor-accelerated and will repaint the `<h1>` every cycle for as long as the hero is on screen. `lux-shift` runs forever on a `position: fixed` element. This is a battery/CPU cost on the page users spend the longest on, and `do_dont.animation.dont` forbids "continuous looping animations without pause" independently. Give them finite counts or long pauses.
- **`css/base.css:232-249`** — `body` carries a 3px `radial-gradient` dot lattice as a full-page background-image on every page. Cheap, but it is a repaint surface behind everything; the comment acknowledges the tradeoff. Fine as-is, worth knowing.
- Three CSS files means three requests before first paint. On GitHub Pages over HTTP/2 this is acceptable, but a single concatenated sheet would shorten the critical path.
- `img/og.svg` (4.9 KB) ships alongside `og.png` and is never referenced by any page — dead weight in the deployed directory.

## ❌ Failures (must fix this round)

None.

## Recommendations (ranked by impact)

1. Give the three infinite animations finite iteration counts or pauses — especially `sign-flicker`, which repaints text-shadow forever (impact: medium, effort: trivial).
2. Delete the duplicated hand-authored `@font-face` block (impact: low, effort: trivial).
3. Consider concatenating the three stylesheets (impact: low, effort: low).

## Evidence

- `wc -c sites/neon-noir/*.html sites/neon-noir/css/* sites/neon-noir/js/*` — HTML 11–30 KB, CSS 13.6/24.3/21.8 KB, JS 11.8/3.1 KB.
- `node tools/selfcheck.mjs --site neon-noir` → "js 14.6 KB", 23 `@font-face` rule(s).
- PNG header read: `og.png` 1200×630, 85 KB.
- `grep -rn "infinite" css/` → 3 hits.
- Note per the review brief: byte-count findings are explicitly out of scope on this program; richness outranks size. Nothing here is filed on size grounds.
