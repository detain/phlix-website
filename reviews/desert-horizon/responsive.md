# Responsive Review — Desert Horizon

**Variant**: desert-horizon
**Round**: 1
**Reviewer**: adversarial-responsive
**Date**: 2026-07-01

## Score

- **Responsive**: 83 / 100

## ✅ Passed

- `base.css:120-126` — `img, svg, video` have `max-width: 100%; height: auto` — images scale properly
- `base.css:112` — `body { font-size: 1rem; }` — 16px minimum text size maintained
- `components.css:744-788` — Mobile nav toggle (`display: flex`) and slide-in menu (`width: min(320px, 85vw)`) properly implemented at ≤768px
- `components.css:173-174` — `.btn` has `min-height: 44px` touch target
- `components.css:73-92` — `.nav-toggle` is 44×44px — meets WCAG AA minimum
- `theme.css:253-256` — Feature cards grid uses `repeat(auto-fill, minmax(280px, 1fr))` — responsive collapse pattern
- `theme.css:397-407` — `.content-grid` properly collapses: 2-col at 768px, 3-col at 1024px
- `base.css:284-289` — `.container` uses `max-width: var(--max-width)` (1400px CSS variable), not hardcoded px
- `base.css:269-278` — `prefers-reduced-motion` fully honored across all animations
- `theme.css:171` — Hero h1 uses `clamp(2.8rem, 6vw + 1rem, 5rem)` — fluid type, survives 200% zoom
- No fixed-px widths on any layout containers — confirmed via grep across all CSS/JS files
- `main.js:32-60` — Mobile nav has proper focus trap, backdrop click-to-close, Escape key handling
- `main.js:92-117` — Scroll reveal animations respect `prefers-reduced-motion`

## ⚠️ Concerns (non-blocking)

- **Touch targets at 44px vs brand kit's 48px** — `components.css:78,174,266-267` use 44px minimum which satisfies WCAG AA but falls short of the brand kit's §18 `48px min on tablet/mobile` specification. The brand kit accessibility spec says "Minimum 48×48px on mobile; 44×44px minimum everywhere." The implementation meets the secondary figure but not the primary mobile figure. — Consider bumping `.nav-toggle` and `.btn` to 48px to fully honor the brand spec. This is especially relevant for the tablet breakpoint.

- **Feature-cards grid `minmax(280px, 1fr)` edge case at 320px** — At 320px viewport with 24px+24px container padding (48px total), the available content width is ~272px. The `minmax(280px, 1fr)` minimum exceeds this, meaning the grid cannot collapse to 1 column at this exact breakpoint. At 375px (available ~327px) it would work. This is a very narrow edge case — 320px is an uncommon device width. — Change `minmax(280px` to `minmax(240px` to ensure graceful single-column collapse before horizontal overflow occurs.

## ❌ Failures (must fix this round)

- **None** — No critical responsive failures found. The site handles all probed breakpoints (375, 414, 768, 1024, 1280, 1920) without horizontal overflow. The 320px edge case is a non-blocking concern.

## Recommendations

1. **Change feature-cards `minmax(280px, 1fr)` to `minmax(240px, 1fr)`** (impact: high, effort: low) — This ensures single-column collapse at the 320px breakpoint without overflow. The same change should be applied to `.download-cards` and `.client-cards` which share the same `minmax(260px, 1fr)` pattern.

2. **Bump touch targets to 48px on mobile** (impact: medium, effort: low) — Update `.nav-toggle`, `.btn`, and `.btn-icon` `min-height` from 44px to 48px inside a `@media (max-width: 768px)` block to align with the brand kit's §18 tablet/mobile specification.

3. **Add a 320px-specific media query for hero typography** (impact: low, effort: low) — The hero `clamp()` may produce large type on a 320px screen. Consider adding `font-size: clamp(2rem, 8vw, 3rem)` specifically at 320px if the current hero text feels oversized on the smallest screens.

## Evidence

- Media query inventory (grep -rn "@media" on all CSS files):
  - `base.css:269` — `prefers-reduced-motion`
  - `components.css:381` — `.feature-detail` 2-col grid at 768px
  - `components.css:677` — `.site-footer` 2-col at 768px
  - `components.css:744` — mobile nav at ≤768px
  - `components.css:808` — `.reveal` reduced-motion override
  - `theme.css:397` — `.content-grid` 2-col at 768px
  - `theme.css:403` — `.content-grid` 3-col at 1024px

- No fixed-px layout widths found: `grep -rn "width:[0-9]*px\|max-width:[0-9]*px"` on all CSS/JS returned zero matches.

- Mobile nav implementation confirmed in `main.js:12-60` with full keyboard/focus handling.
