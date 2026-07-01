# Responsive Review — Solarpunk Eden

**Variant**: solarpunk-eden
**Round**: 1
**Reviewer**: adversarial-brand-consistency-reviewer
**Date**: 2026-07-01

## Score

- **Responsive**: 85 / 100

## ✅ Passed

- Layout uses fluid widths (`max-width` + `padding-inline`) not fixed-px widths — `theme.css:80-96`
- Content max-width: 1200px — within kit's 1440px maximum — `base.css:87`
- No horizontal scroll bars expected at 320px — container uses `margin-inline: auto` + `%` or `max-width`; no fixed widths on layout containers
- Feature cards grid: `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))` — responsive auto-fill — `theme.css:224`
- Client cards grid: `repeat(auto-fill, minmax(320px, 1fr))` — `theme.css:333`
- Download cards grid: `repeat(auto-fill, minmax(240px, 1fr))` — `theme.css:340`
- Touch targets: primary CTA btn-large = 52px — `components.css:308`; nav links = 44px — `components.css:74`; feature cards ≥300px wide on mobile single column
- Mobile nav breakpoint at 768px — `components.css:97`
- Mobile menu slides down from top, is-open class toggles display — `components.css:119-121`
- Mobile hamburger button is `display: flex` at 768px, hidden above — `components.css:98-102`
- Body font-size never drops below 16px on phones — `base.css:156`
- H1 scales with `clamp(2.25rem, 5vw + 1rem, 3.75rem)` — fluid typography — `theme.css:12`
- Images: `max-width: 100%; height: auto` — `base.css:165-169`
- Footer nav uses `grid-template-columns: repeat(auto-fit, minmax(160px, 1fr))` — responsive — `components.css:154`

## ⚠️ Concerns (non-blocking)

- **Mobile nav uses hamburger menu** not the kit's `responsive_behavior.mobile` spec ("bottom tab bar with leaf-icon active indicator"). Hamburger works functionally but deviates from explicit kit mobile pattern. This is a brand fidelity concern more than a functional responsive concern.
- **Download page feature detail grid** uses `grid-template-columns: auto 1fr` with `gap: var(--space-8)` — on very narrow screens (<360px) the 72px icon + 32px gap + text might overflow. However `@media (max-width: 600px)` switches to single column — `components.css:410-422`. Should be sufficient.
- **No actual breakpoint testing performed** — this is a static analysis of CSS rules. Manual testing at 320/375/414/768/1024/1280/1920 would be required to confirm no overflow.

## ❌ Failures (must fix this round)

- No critical responsive failures found. All layouts use fluid/relative units; all containers have proper max-width and auto margins.

## Recommendations (ranked by impact)

1. At 768px breakpoint, add `.hide-mobile { display: none !important }` utility; at 769px+, `.hide-desktop { display: none !important }` — already present in `components.css:650-656` but used nowhere. Consider removing unused classes or actually using them for contextual content show/hide.
2. Consider implementing the kit's bottom-tab-bar pattern for mobile instead of hamburger menu — (impact: medium, effort: high)

## Evidence

- CSS audit: `grep -n "max-width\|minmax\|clamp\|media" /home/sites/phlix/sites/solarpunk-eden/css/*.css`
- Layout audit: all containers use fluid or max-width + auto margin; no `width: 1200px` fixed widths found
