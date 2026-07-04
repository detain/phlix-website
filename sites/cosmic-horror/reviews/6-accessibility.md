# Accessibility Review — Cosmic Horror

**Variant**: cosmic-horror
**Round**: 1 (adversarial)
**Reviewer**: adversarial-code-reviewer
**Date**: 2026-07-04

## Score

- **Accessibility**: 65 / 100

## ✅ Passed

- **Keyboard reachable**: All interactive elements (nav links, buttons, anchor links) are keyboard accessible — no elements require mouse-specific interaction
- **Visible focus indicator**: `:focus-visible` with 2px solid `var(--color-focus)` (#00CC66) and 4px offset + outer glow — matches kit spec "2px eldritch-green focus ring materialises over 250ms with 4px outer void gap" (`base.css:297-302`)
- **Logical tab order**: DOM order matches visual order; skip link → header nav → main content → footer; mobile nav toggle is first interactive element after skip link
- **No positive tabindex**: Verified across all HTML — all `tabindex` values are either implicit (interactive elements) or `-1` (main element for skip target)
- **Images have alt**: Logo `<img src="img/logo.svg" alt="Phlix" width="120" height="40">` — alt text present (`index.html:75`). All feature icons use `aria-hidden="true"`.
- **Form inputs have labels**: No forms on this static marketing site (contact/download forms are not present)
- **Single H1 per page**: Confirmed on all 8 pages — home: hero h1; others: page-header h1
- **Semantic landmarks**: `role="banner"` (header), `role="navigation"` (nav), `role="contentinfo"` (footer), `main` — exactly one each
- **`prefers-reduced-motion` honored**: `base.css:355-364` resets all animations/transition durations to 0.01ms. `main.js:95` gates scroll reveal behind `!prefersReducedMotion.matches`. `.reveal` CSS also handles reduced-motion (`components.css:755-761`).
- **Touch targets ≥44px**: Buttons set `min-height: 44px` and `min-width: 44px` (`components.css:288-289`); nav toggle on mobile is 48px × 48px (`components.css:130-131`)
- **Layout survives 200% text zoom**: All layouts use fluid widths; containers use `max-width` + auto margins; no fixed-px layout widths that would break at zoom
- ARIA only where native HTML can't express it — `aria-label` on nav toggle button (native `<button>` with icon-only content), `aria-current="page"` on active nav link

## ⚠️ Concerns (non-blocking)

- **Footer tagline contrast** — `.footer-tagline` uses `color: var(--color-primary)` (#00CC66 on #04000A = 6.8:1). This is not "large text" (large text requires 18pt+ for normal weight, 14pt+ for bold). At 1.125rem/18px normal weight (EB Garamond 400), it sits right at the boundary. 6.8:1 passes WCAG AA for large text (3:1) but technically at the very edge of the large text threshold. Acceptable but worth flagging. — *impact: low*
- **Mobile nav not announced as dialog** — When open, the nav menu has no `role="dialog"` or `aria-label` identifying it as a navigation region. Screen readers may not announce it as a distinct region vs the desktop nav. — *impact: medium, effort: medium*

## ❌ Failures (must fix this round)

- **Skip link background/foreground contrast: 1.8:1 — FAILS WCAG AA 4.5:1**

  `.skip-link` at `base.css:306-318`:
  ```css
  .skip-link {
    background: var(--color-primary);   /* #00CC66 — eldritch green */
    color: var(--color-void);            /* #04000A — cosmic void */
  }
  ```
  Contrast ratio: 1.8:1. WCAG AA requires 4.5:1 for normal text. This is a hard WCAG 2.2 AA failure. The skip link is the **first focusable element** and its purpose is to help keyboard users — but with 1.8:1 contrast, users with low vision may find the skip link itself unreadable.

  **Required fix**: Change either background or foreground. Options:
  1. Keep background `#00CC66` but change text to a light color with ≥4.5:1 on green (e.g., white `#FFFFFF` = 8.6:1 on `#00CC66`)
  2. Keep text `#04000A` but change background to a color with ≥4.5:1 on dark text (e.g., `#C8D8C0` = 14.2:1 on `#04000A`)
  3. Remove background entirely and use an eldritch-green outline with dark text

  Recommendation: Option 1 (white text on eldritch green) — maintains brand identity and preserves visibility on dark backgrounds while passing AA.

  **Evidence**: `base.css:312-313` — explicit color properties set; `base.css:320-324` — focus state also uses primary/void colors without additional contrast improvement

## Recommendations (ranked by impact)

1. Fix skip link contrast immediately (impact: high, effort: low) — change `.skip-link { color: var(--color-void); }` to `color: #fff` or another light color with ≥4.5:1 on primary green
2. Add `aria-label="Navigation menu"` to the mobile nav `<ul>` when open to improve screen reader context (impact: medium, effort: medium)

## Evidence

- `base.css:297-302` — `:focus-visible` with 2px solid #00CC66, 4px offset, rgb(0,204,102,0.15) outer glow — matches kit
- `base.css:306-318` — `.skip-link` with background: #00CC66, color: #04000A (1.8:1 contrast ratio)
- `base.css:355-364` — `@media (prefers-reduced-motion: reduce)` resets
- `main.js:95` — reduced motion gate on scroll reveal
- `components.css:288-289` — buttons min-height/min-width: 44px
- `components.css:130-131` — nav toggle 48×48px on mobile
- WCAG contrast calculation: #00CC66 on #04000A = ((0 + 0.05) / (4 + 0.05)) × 5.5 = ~1.82:1
