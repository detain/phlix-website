# Performance Review — Psychedelic Groove

**Variant**: psychedelic-groove
**Round**: 2
**Reviewer**: Code Review Agent
**Date**: 2026-07-04

## Score

- **Performance**: 81 / 100

## ✅ Passed

- **JS is defer-loaded** — All pages load JS with `<script src="./js/main.js" defer></script>`. This prevents render-blocking. ✓
- **No render-blocking JS** — main.js is tiny (86 lines) and defer-loaded. No analytics, no third-party scripts, no blocking scripts. ✓
- **Reasonable critical CSS** — CSS is split into base.css (336 lines), theme.css (473 lines), components.css (794 lines), and fonts.css (55 lines). The reset and tokens are in base.css which loads first. ✓
- **Font-display: swap** — All self-hosted @font-face blocks in fonts.css use `font-display: swap`. This prevents invisible text during font load. ✓
- **Self-hosted fonts** ✅ — fonts.css no longer uses Google Fonts CDN `@import`. All fonts are declared via @font-face with local WOFF2 files present in css/fonts/ (Lobster-Regular.woff2, FredokaOne-Regular.woff2, Nunito-Regular/SemiBold/Bold.woff2, SpaceMono-Regular/Bold.woff2). This eliminates the ~100-300ms CDN latency on first visit.
- **Lazy loading** — No `<img>` tags with external sources exist (all images are inline SVG or local files). Below-the-fold images not applicable in this static site context.
- **CSS transitions use GPU-accelerated properties** — Animations use `transform`, `opacity`, and `box-shadow` which are GPU-accelerated in modern browsers. No layout-thrashing animations.
- **Minimal DOM depth** — Navigation has 1 level of nested lists, feature cards are flat. No deeply nested structures.
- **No N+1 patterns** — Static HTML site with no database or API calls — N+1 not applicable.

## ⚠️ Concerns (non-blocking)

- **@font-face format hint is wrong** — All 7 @font-face blocks in fonts.css use `format('truetype')` but the actual font files are `.woff2` format. The correct hint should be `format('woff2')`. Using `format('truetype')` for WOFF2 files may cause the browser to skip the font and use a fallback in some browsers, potentially causing a FOUT (Flash of Unstyled Text) on first load. While the woff2 files are present locally, the wrong format hint undermines the reliability of self-hosted font loading. This is a medium-severity issue that should be fixed. **Fix: Change all `format('truetype')` to `format('woff2')` in fonts.css:12,19,26,33,40,47,54.**

- **hero-breath animation on every page load** — The hero texture animation (theme.css:116-140) runs continuously (12s cycle) on index.html. Uses `transform` and `opacity` which are GPU-accelerated but still consume compositor resources. Minor battery concern on mobile.

- **og.png is 135KB** — The social share image is 138,612 bytes (~135KB). The budget says "~120KB hero image." Since og.png is only loaded when a link is shared (not on normal page loads), the practical impact is minimal. Not a blocker.

## ❌ Failures (must fix this round)

- **css/fonts/fonts.css:12,19,26,33,40,47,54** — All @font-face declarations use `format('truetype')` but the font files are WOFF2 format. The format hint must match the actual font format: `format('woff2')` for .woff2 files. A wrong format hint can cause the browser to skip the @font-face declaration entirely, falling back to system fonts and causing FOUT. **Required fix: Change all 7 occurrences of `format('truetype')` to `format('woff2')` in fonts.css.** Note: The self-hosting infrastructure is correctly in place (woff2 files present, no CDN dependency), but the format hint is incorrect and must be corrected.

## Recommendations (ranked by impact)

1. **Fix @font-face format hints** (impact: high, effort: low) — Change `format('truetype')` → `format('woff2')` in all 7 @font-face blocks. This ensures browsers correctly identify and load the WOFF2 fonts.
2. **Consider preloading the Lobster font** (impact: medium, effort: low) — Add `<link rel="preload" href="css/fonts/Lobster-Regular.woff2" as="font" type="font/woff2" crossorigin>` for the hero headline font to reduce FOUT on first load.
3. **Reduce hero-breath animation on mobile** (impact: low, effort: low) — Consider using `animation-play-state: paused` on mobile via media query.

## Evidence

- Verified JS defer in all HTML files
- Verified Google Fonts CDN removed (no googleapis.com, no gstatic.com in site files)
- Verified font files present in css/fonts/: `ls /home/sites/phlix/phlix-website/sites/psychedelic-groove/css/fonts/` — all 7 woff2 files present
- Verified @font-face format hints are wrong: fonts.css:12,19,26,33,40,47,54 all have `format('truetype')` but files are `.woff2`
- Verified font-display: swap in all @font-face blocks
- Verified og.png file size: 138,612 bytes (~135KB)
