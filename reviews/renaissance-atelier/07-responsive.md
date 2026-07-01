# Responsive Review — Renaissance Atelier

**Variant**: renaissance-atelier
**Round**: 1
**Reviewer**: adversarial-reviewer-batch2
**Date**: 2026-07-01

## Score
- **Responsive**: 83 / 100

## ✅ Passed

- **No horizontal scroll at any width**: All layout containers use `max-width` + `padding-inline` fluid pattern (`theme.css:108–119`). No `width` declarations with fixed-px values on layout containers. Grids use `auto-fill, minmax()` (e.g., `theme.css:257`, `components.css:337`). At 320px, `minmax(260px, 1fr)` on feature cards would force a minimum 260px column — but the mobile breakpoint at `theme.css:415` switches `.feature-cards` to `grid-template-columns: 1fr`, eliminating overflow. ✅
- **Mobile nav works**: `.nav-toggle` button appears at `width <= 900px` (`components.css:95–100`). When toggled, `.nav-menu` receives `is-open` class and `display: flex` with `flex-direction: column` (`components.css:118–120`). JS in `js/main.js:14–34` handles toggle, outside-click close, and Escape key close. `aria-expanded` is kept in sync. ✅
- **Body text never below 16px**: Base font size is `var(--font-size-base)` = 17px (`base.css:122`). At 320px, pitch bullets explicitly set `font-size: 0.95rem` (`theme.css:434–436`) — 0.95rem × 17px base ≈ 16.15px. All body text stays above 16px. ✅
- **Images scale**: `img { max-width: 100%; height: auto; }` in `base.css:194–198`. ✅
- **No fixed-px widths on layout containers**: Confirmed no `width: 1200px` or similar hard pixel values on `.container`, `.nav-primary`, `.feature-cards`, or any structural element. All use `max-width`, `flex`, or `grid` with fluid units. ✅
- **Responsive CSS breakpoints exist**: `@media (width <= 768px)` (`theme.css:415`), `@media (width <= 480px)` (`theme.css:439`), `@media (width <= 600px)` (`components.css:201`), `@media (width <= 900px)` (`components.css:95`), `@media (width <= 600px)` for `.feature-detail` (`components.css:445`). Adequate breakpoints. ✅
- **Layout survives 200% zoom**: All font sizes in `rem`. Layout uses fluid grid. At 200% zoom, text is 34px (base) but containers flex. Horizontal overflow not triggered by zoom since max-width containers shrink to viewport. ✅
- **Gutter scales down**: At ≤768px, `--gutter` switches from 48px to 24px (`theme.css:416–418`). At ≤480px, `--gutter` switches to 16px (`theme.css:440–442`). Progressive tightening appropriate for mobile. ✅

## ⚠️ Concerns (non-blocking)

- **Mobile nav does NOT implement bottom tab bar**: The brand kit `responsive_behavior.mobile` (`renaissance-atelier.js:1081–1084`) specifies: "Single-column, **bottom tab bar in parchment with lapis active indicator**, full-width poster cards, sticky lapis play bar above tab bar." The current implementation uses a top-positioned sticky header (`components.css:7–14`) with the nav menu dropping down as an absolute-positioned dropdown below the header (`components.css:102–120`). There is no bottom tab bar, no sticky lapis play bar, and no lapis active indicator on a bottom navigation. — *The mobile nav is a standard top-dropdown pattern, not the bottom tab bar specified by the kit. This is a brand-consistency deviation.*
- **Nav toggle touch target slightly below 44px**: The `.nav-toggle` button (`components.css:38–57`) has `padding: var(--space-2)` (8px) on all sides and a 24×24 SVG icon. Total tap area: 24 + 8 + 8 = 40px. Below the 44×44px minimum specified in the brand kit `accessibility.touch_target` (`renaissance-atelier.js:1173`). The nav menu links above the toggle are sufficiently large (16px padding gives 44px+ touch targets), but the toggle button itself is undersized. — *Recommended fix: increase `.nav-toggle` padding to `var(--space-3)` (12px) to reach 48px total tap area.*
- **No poster/card image grid scaling at 320px**: At 320px viewport, `.feature-cards` switches to `1fr` column (`theme.css:431`) and `.pitch-bullets li` keeps `padding: var(--space-4) var(--space-6)` (`theme.css:436`). 16px + 24px + 16px = 56px horizontal padding on a 320px screen leaves 320 - 32 - 48 = 240px content width. Adequate but tight. The `minmax(260px, 1fr)` for feature-cards would overflow at 320px without the mobile breakpoint override. The mobile breakpoint handles this correctly. ✅

## ❌ Failures (must fix this round)

- **No bottom tab bar per kit spec** — `renaissance-atelier.js:1082` — The kit's `responsive_behavior.mobile` explicitly requires a "bottom tab bar in parchment with lapis active indicator". The current mobile implementation at ≤900px (`components.css:95–131`) uses a top-sticky header with a dropdown menu. There is no bottom tab bar at all, no lapis active indicator on a bottom nav, and no sticky lapis play bar above it. The mobile navigation deviates from the brand kit specification. — *Required outcome: Either implement the bottom tab bar as specified, or formally accept this as an intentional deviation and document it in `SITE.md`. If implementing: `<nav class="nav-mobile-tabs" role="navigation" aria-label="Mobile navigation">` with `position: fixed; bottom: 0; background: var(--color-bg); border-top: var(--border-default)` and lapis indicator on active tab.*
- **Nav toggle touch target 40px, not 44px** — `components.css:40–48` — `.nav-toggle` with 8px padding and 24px icon = 40px tap area, below the 44px minimum. — *Required outcome: Increase `.nav-toggle` padding to `var(--space-3)` (12px minimum) to achieve 48px touch target.*

## Recommendations (ranked by impact)

1. **Consider implementing bottom tab bar** (impact: high, effort: medium) — The current top-nav pattern works but deviates from the kit spec. A bottom tab bar with the 4 most important destinations (Home, Features, Download, About) would better match the mobile pattern users expect on content sites. The lapis active indicator would reinforce brand identity on mobile.
2. **Increase nav toggle padding** (impact: high, effort: low) — Change `.nav-toggle` padding from `var(--space-2)` to `var(--space-3)` in `components.css:46`.
3. **Add `min-width` cap on feature card grids** (impact: low, effort: low) — At very narrow viewports (under 300px), `minmax(260px, 1fr)` could still cause overflow before the 768px breakpoint kicks in. Consider adding `@media (width <= 320px)` with explicit single-column rules for all grids.
4. **Test at 320, 375, 768, 1024, 1280, 1920** (impact: medium, effort: medium) — No automated responsive testing observed in the codebase. Recommend adding Playwright or similar visual regression tests at these breakpoints.

## Evidence

- **Breakpoint at 900px for nav**: `components.css:95` — `@media (width <= 900px)` triggers nav toggle display and menu repositioning. ✅
- **Breakpoint at 768px for layout**: `theme.css:415` — `@media (width <= 768px)` sets `--gutter: var(--space-6)` and single-column grids. ✅
- **Breakpoint at 480px for hero**: `theme.css:439` — `@media (width <= 480px)` adjusts hero height and CTA direction to column. ✅
- **Breakpoint at 600px for footer and feature detail**: `components.css:201`, `components.css:445`. ✅
- **Gutter token scale**: `--gutter` defined as `var(--space-12)` (48px) in `base.css:155`, switches to 24px at 768px, 16px at 480px. Progressive mobile-first scaling. ✅
- **Touch target on nav menu links**: `components.css:122–126` — `padding: var(--space-4)` = 16px × 2 + text = well over 44px. ✅
- **No horizontal overflow check at 1920px**: Site max-width is 1400px (`base.css:153`), centered in any viewport. No overflow at large desktop. ✅
- **Hero gradient is CSS-only**: `theme.css:124–147` — Only CSS `linear-gradient` and `radial-gradient` for all hero visuals. No raster images. ✅
