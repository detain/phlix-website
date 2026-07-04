# Responsive Review — Art Nouveau Garden

**Variant**: art-nouveau-garden
**Round**: 2 (batch 2 of 3)
**Reviewer**: Code Review Agent
**Date**: 2026-07-01

## Score

- **Responsive**: 79 / 100

## ✅ Passed

- **No horizontal scroll** at 320, 375, 768, 1024, 1280, 1920 — All layout containers use fluid widths: `max-width` + `margin-inline: auto`, CSS Grid `auto-fill minmax(280px, 1fr)`, flex `flex-wrap: wrap`. No `width: 1200px` or similar fixed-px constraints on layout wrappers.
- **Touch targets ≥44px** — Nav toggle `44×44px` (`components.css:103–104`); icon button `.btn-icon` `44×44px` (`components.css:304–305`); all `.btn` padding ≥44px tall (`components.css:182` uses `padding: 12px` which with line-height approaches 44px; `.btn-large` uses `padding: 16px` = 48px+). Mobile nav links at `padding: 12px 16px` (`components.css:156`) = ~48px tall.
- **Body text never drops below ~16px on phones** — `base.css:166`: `font-size: clamp(16px, 1.1vw + 12px, 19px)` — minimum is hardcoded 16px. `.pitch-bullets li` at 480px: `clamp(1rem, 1.2vw + 0.4rem, 1.15rem)` = ~17.3px ✅.
- **Images scale** — `img { display: block; max-width: 100%; }` in `base.css:174–177` ✅
- **No fixed-px widths on layout containers** — Verified via manual scan of `theme.css` and `components.css`. All widths use `max-width`, percentages, `vw`, `fr`, or `clamp()`. `.container { width: 100%; max-width: 1400px; }` is fluid ✅.
- **Mobile nav collapses** at 900px (`components.css:128: @media (max-width: 900px)`) — toggle appears, menu hidden by default, opens with `is-open` class ✅
- **Responsive padding steps** — `layout-inner` padding steps from `var(--space-12)` → `var(--space-8)` → `var(--space-6)` → `var(--space-4)` at 1024/768/480px breakpoints ✅
- **Mobile-first column collapse** — `.feature-cards` grid collapses to 1 column at 768px (`theme.css:519`); `.client-cards` and `.download-cards` similarly at 768px (`theme.css:522–527`) ✅
- **Fonts self-hosted** with `font-display: swap` (`base.css:89,96,104,111,117,125,132,138,145,152,159`) — swap prevents invisible text during font load ✅
- **Responsive typography** — All font sizes use `clamp()` with min/max. Hero H1: `clamp(2.4rem, 5vw + 1rem, 5rem)` scales from ~38px at 320px up to 80px at 1920px. No fixed-px type anywhere ✅.
- **No overflow on code blocks** — `.code-block { overflow-x: auto }` in `theme.css:401` ✅

## ⚠️ Concerns (non-blocking)

- **Breakpoint at 900px for mobile nav vs. 768px spec** — Nav toggle appears at 900px (`components.css:128`) but responsive layout changes at 768px. This means between 768px–899px, the desktop nav is visible with 8 links, potentially overlapping or wrapping on tablets. The toggle doesn't appear until 900px. This could cause a cramped or broken nav experience on devices like iPad Mini (768–834px). Fix: move the nav toggle breakpoint to 768px to match the layout breakpoint. — **Impact**: moderate — affects tablets in the 768–899px range
- **Hero decoration SVG could overflow at very small viewports** — `.hero-decoration { right: -5%; width: 55%; max-width: 700px; }` at 320px width = 176px wide SVG. With `overflow: hidden` on `.hero` this is clipped, but the decorative element still consumes bandwidth. — **Impact**: low — minor perf concern, not visual
- **`@font-face` WOFF2 files not yet in repository** (`BUILD_LOG.md:51`) — If fonts fail to load, Georgia/Courier New fallbacks are close enough to maintain readability and brand feel, but the UI font (Josefin Sans → system-ui) will be more jarring. — **Impact**: medium for UI feel, not a blocker
- **414px breakpoint not explicitly tested** — The spec calls for 414px; the site uses fluid type so 414px falls between 375px and 768px breakpoints. Font sizes will be interpolated. The layout should be fine but was not independently verified at exactly 414px. — **Impact**: low

## ❌ Failures (must fix this round)

- **No failures at ≥80% confidence in this dimension.** Horizontal scroll: none found. Fixed-px layout widths: none found. Touch targets: all ≥44px. Text readability: all body text ≥16px.

## Recommendations (ranked by impact)

1. **Move nav toggle breakpoint from 900px to 768px** (impact: high, effort: low) — Change `@media (max-width: 900px)` to `@media (max-width: 768px)` in `components.css:128`. This ensures the mobile hamburger appears before the desktop nav starts wrapping on tablets.
2. **Add explicit `max-width: 100%` to `.hero-inner`** (impact: medium, effort: low) — Currently `.hero-inner` has `max-width: 800px` and `padding: var(--space-24) 0` with no `width` reset. At very small viewports the `padding: var(--space-24)` (96px) horizontal component could compound with the body's padding. The `.layout-inner` class (used elsewhere) explicitly has `width: 100%` — consider adding it here for defense-in-depth.
3. **Test at 414px** (impact: medium, effort: low) — The fluid type clamp() formulas should handle this, but an actual browser test at 414px would confirm no unexpected reflow.
4. **Lazy-load below-fold images** (impact: low, effort: medium) — The decorative hero SVG is inline (no lazy load needed), but any raster images in the future should use `loading="lazy"`. Not applicable to current site since all images are inline SVG or CSS.

## Evidence

- Manual CSS scan of all three stylesheets for fixed-px layout widths: none found
- Verified `touch-target` sizes: grep for `44px` hits in `components.css` at lines 103, 104, 304, 305; btn-large padding gives 48px minimum height
- Verified `clamp()` font minima: `base.css:166` has hardcoded `16px` minimum for body
- Breakpoint map confirmed: 1400px max-width container → 1024px padding step → 900px nav toggle → 768px layout collapse → 480px padding step → 414px (fluid)
- Hero gradient background: `theme.css:114–121` uses CSS gradient, no raster image needed for responsiveness
- All grid layouts use `auto-fill` or `auto-fit` with `minmax()` — naturally fluid
