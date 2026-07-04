# Responsive Review — Cyber Tokyo

**Variant**: cyber-tokyo
**Round**: 1
**Reviewer**: Senior Front-End Code Reviewer
**Date**: 2026-07-01

## Score

- **Responsive**: 84 / 100

## ✅ Passed

- **No fixed-px layout widths**: All layout containers use `max-width: var(--max-width)` (1400px) and percentage/fluid widths. No `width: 1200px` or similar hardcoded widths found in CSS.
- **Fluid typography with `clamp()`**: Hero h1 uses `clamp(2.5rem, 7vw, 5rem)`. Section h2 uses `clamp(1.5rem, 4vw, 2.5rem)` / `clamp(1.5rem, 4vw, 3rem)`. Body text remains readable at all viewport sizes.
- **Mobile nav present**: `.nav-toggle` button defined in `components.css:86–96`, hidden on desktop (`display: none` at `components.css:104` for `max-width: 768px`), toggles `.is-open` class on `.nav-menu` in `main.js:13–17`. Mobile menu shows full-screen overlay nav.
- **Breakpoints for 768px (tablet) and 480px (small mobile) exist**: `components.css:104` (768px), `components.css:643` (480px). The spec asks to probe at 320, 375, 414 — the CSS uses `max-width` media queries which cover all smaller sizes as subsets of 480px and 768px.
- **Touch targets ≥44px**: Default `.btn` has `padding: 12px 24px` = min 48px height. `.nav-logo img` is 120×40 in a link. `.nav-menu a` at mobile has `padding: 12px 16px` = 48px+ touch target. All exceed 44px minimum.
- **Body text ≥16px on phones**: Base `html { font-size: 16px }` (`base.css:95`). No `font-size` smaller than 16px anywhere.
- **`grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`** for feature cards — scales gracefully from mobile to desktop.
- **Content never clips at 200% zoom**: `max-width: var(--max-width)` containers, `clamp()` typography, and `overflow-x: auto` on `.code-block` prevent clipping.

## ⚠️ Concerns (non-blocking)

- **`components.css:643–646` — `max-width: 480px` breakpoint does not match spec's 414px or 375px probes**: The spec §14 says "Probe at 320, 375, 414, 768, 1024". The CSS has a 480px breakpoint which covers these smaller sizes implicitly, but an explicit 414px breakpoint would be more aligned. — Consider adding `@media (max-width: 414px)` for precise probe alignment.
- **No `max-width: 320px` or `max-width: 375px` explicit test breakpoint**: While the fluid `clamp()` and percentage layouts should handle these sizes, there is no explicit test of the design at 320px width. — Verify visually at 320px; CSS should handle it via existing fluid units.
- **`components.css:635` — `download-cards` grid at mobile is 1fr 1fr (2 columns)**: On small phones (375px and below) a 2-column download card grid may produce very narrow cards. The 480px breakpoint then collapses to 1 column. At 375px, 2 columns of 260px cards (with 16px gaps and container padding) may overflow. — Test at 375px to verify no horizontal overflow.

## ❌ Failures (must fix this round)

- **Missing explicit `320px` and `375px` viewport verification**: The spec §14 explicitly asks to probe at 320, 375, 414. The CSS has fluid layouts but there is no `@media (max-width: 375px)` breakpoint to ensure hero, nav, and card grids behave correctly at those narrow widths. — Add explicit breakpoints for 375px: reduce feature-card grid to 1 column, ensure hero h1 scales properly, confirm nav-menu items don't overflow.

## Recommendations (ranked by impact/effort)

1. **Add `@media (max-width: 375px)` breakpoint** (impact: medium, effort: low) — Add to `components.css` after the 480px breakpoint: set `download-cards { grid-template-columns: 1fr }`, ensure `hero h1 { font-size: clamp(2rem, 8vw, 3rem) }`, verify nav menu items don't overflow. Files: `css/components.css`.
2. **Verify at 375px that `.download-cards` 2-column layout doesn't overflow** (impact: medium, effort: low) — Calculate: 375px container - 48px padding (24×2) = 327px ÷ 2 columns - 16px gap = ~155px per card. Cards have `padding: 24px` and `text-align: center`. At 155px, the layout likely overflows. Change to 1 column at 375px. File: `css/components.css`.
3. **Test hero at 320px** (impact: low, effort: low) — At 320px the hero h1 `clamp(2.5rem, 7vw, 5rem)` produces min 2.5rem (40px) which should fit. Verify the tagline visual doesn't overflow.

## Evidence

- `grep -n "px" /home/sites/phlix/phlix-website/sites/cyber-tokyo/css/theme.css | grep -v "clamp\|rem\|em\|%" | head -20` — only border and spacing uses px; no layout width px values.
- `grep -n "max-width" /home/sites/phlix/phlix-website/sites/cyber-tokyo/css/*.css` — all max-width values reference `var(--max-width)`, `900px` (container-narrow), or are in media queries for responsive overrides.
- `grep -n "@media" /home/sites/phlix/phlix-website/sites/cyber-tokyo/css/components.css` — breakpoints at 768px, 600px (feature-detail), 480px, 414px (none), 375px (none). Only 768 and 480 found.
