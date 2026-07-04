# Responsive Review — Día de Muertos

**Variant**: dia-de-muertos
**Round**: 1
**Reviewer**: adversarial-reviews-agent
**Date**: 2026-07-01

## Score

- **Responsive**: 81 / 100

## ✅ Passed

- Layout containers use fluid CSS Grid and flexbox — no fixed-px widths on layout wrappers. `.container` and `.container-full` use `max-width` and `padding-inline` (fluid), not hard pixel widths.
- Two breakpoints implemented (768px and 480px). All grids collapse to single column at ≤768px: `.pitch-bullets`, `.feature-cards`, `.client-cards`, `.download-cards`, `.feature-detail` all go 1-column.
- `clamp()` used on all hero and heading sizes — e.g., `.hero h1` uses `clamp(2rem, 8vw, 3rem)` (theme.css:761–763); h1 at ≤768px uses `clamp(2.5rem, 5vw, 4rem)` (theme.css:724–726). Text scales smoothly across viewport range.
- Mobile nav toggle is 44×44px (`components.css:55–56`) — meets the 44px minimum touch target requirement.
- Body text size is 1rem (16px) via `--text-base: 1rem` (base.css:116) — readable on phones, not the 12px trap common in mobile-first sites.
- `overflow: hidden` on `.hero` (theme.css:103) and `.pitch` (theme.css:181) prevents background bleed during horizontal scroll scenarios.
- Images use `display: block; max-width: 100%` (base.css:37–38) — scale correctly on all viewports.
- `prefers-reduced-motion` is handled at the reset level in base.css (lines 273–282) and again for petal-loader in components.css (lines 585–594) — disables animations globally when requested.

## ⚠️ Concerns (non-blocking)

- No explicit ≤360px or ≤320px breakpoint. The 480px breakpoint (theme.css:770–774) only tightens container padding; font sizes still use clamp values that *should* handle 320px, but the smallest tested layout step is not explicitly verified. — At 320px viewport with an 8-item nav menu (8 items × ~48px each = 384px of nav links + logo + 44px toggle button), the horizontal space pressure on `.nav-primary` could cause word-wrapping before the mobile menu kicks in. — Add an explicit `@media (width <= 360px)` or `@media (max-width: 320px)` breakpoint to ensure the hamburger menu appears before nav links overflow.
- `width: 120px; height: 40px` on `.nav-logo img` (components.css:39–40) with `flex-shrink: 0` (components.css:30) — at 320px viewport the nav may be crowded. The `flex-shrink: 0` prevents the logo from compressing, which is correct for brand visibility, but the nav-toggle + logo + wrapped nav links could exceed viewport width before the 900px mobile breakpoint triggers. — Consider `max-width: 120px` instead of fixed `width: 120px` so the logo can shrink if needed.

## ❌ Failures (must fix this round)

- **`theme.css:724–726`** — At the 768px breakpoint, `h1` is set to `var(--text-4xl)` which resolves to `2.25rem` (~36px) but the font-size is not clamped — it is a direct variable assignment, not `clamp()`. This means on tablets (768px–1024px) the heading is a fixed pixel-equivalent size with no fluid scaling. More critically, the 768px breakpoint overrides `.hero h1`'s `clamp(2rem, 8vw, 3rem)` (theme.css:762) with a plain `var(--text-4xl)` (2.25rem ≈ 36px). This creates an unintended size jump — the hero headline at 768px is 2rem but jumps to 2.25rem at 769px (before the desktop range fully takes over). — Ensure h1 sizes at each breakpoint use `clamp()` for smooth fluid scaling, or verify that the jump from clamp floor to breakpoint override is intentional and not a regression.

## Recommendations

1. Add explicit `@media (width <= 360px)` stylesheet section to tighten nav and ensure hamburger triggers before text overflow (impact: high, effort: low)
2. Change `.nav-logo img` from `width: 120px` to `max-width: 120px; width: 100%` to allow graceful shrinking (impact: medium, effort: low)
3. Audit h1 font-size behavior across the 768px breakpoint boundary to confirm the 36px override is intentional rather than a copy-paste error from base.css (impact: medium, effort: low)

## Evidence

- CSS breakpoint at 768px: `theme.css:723–768`
- CSS breakpoint at 480px: `theme.css:770–774`
- Hero h1 clamp: `theme.css:761–763`
- Nav toggle 44×44: `components.css:55–56`
- Image fluid: `base.css:37–38`
- Body font size: `base.css:116`
- prefers-reduced-motion: `base.css:273–282`, `components.css:585–594`
- Logo dimensions: `components.css:38–41`
- `overflow: hidden` on hero: `theme.css:103`
- Mobile nav toggle display at 900px: `components.css:104–138`
