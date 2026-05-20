# Responsive Dimension Review — 02-spotlight-projector

**Reviewed:** `variants/02-spotlight-projector/` CSS and JS assets
**Rubric:** 320/375/414/768/1024/1280/1920 breakpoints, no horizontal scroll, touch targets ≥44px, mobile menu, readable text, no fixed-px layout widths
**Score:** 65 / 100

---

## ✅ Passed Items

| Check | Evidence |
|---|---|
| **No horizontal scroll** | Layout containers use `max-width: var(--max-width)` (1200px CSS variable), grid uses `auto-fit` with `minmax()`. No overflow from fixed-px widths detected. |
| **Font sizes are responsive** | `h1 { font-size: clamp(2rem, 5vw, 3.5rem); }`, `h2 { clamp(1.5rem, 4vw, 2.5rem); }`, `h3 { clamp(1.25rem, 3vw, 1.75rem); }` — all fluid with viewport. |
| **No fixed-px widths on layout containers** | `.content-section`, `.site-header .nav-primary`, `.site-footer .footer-inner`, `.hero-inner` all use `max-width: var(--max-width)` (CSS variable), not hardcoded pixel values. |
| **Grid layouts use fluid minmax** | `.content-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }`, `.feature-cards { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }` — adapt to available space without fixed columns. |
| **Mobile menu JS is functional** | `main.js` lines 13–48: toggle with `classList.toggle('is-open')`, `aria-expanded` updates, escape-key close, focus trap — complete mobile nav behavior. |
| **Image max-width: 100%** | `base.css:101`: `max-width: 100%; height: auto;` on `img, picture, video, canvas, svg`. |

---

## ⚠️ Concerns (Non-blocking)

| Issue | Location | Detail |
|---|---|---|
| **Limited explicit breakpoints** | `theme.css:290` `@media (width <= 768px)`, `components.css:528` `@media (width <= 640px)` | Only 2 breakpoints defined (768px, 640px). No explicit handling for 320/375/414/1024/1280/1920. Relies on fluid clamp() typography and auto-fit grids to cover other widths — works, but is implicit. |
| **Large minmax values in grids** | `components.css:285` `minmax(280px, 1fr)`, `components.css:206` `minmax(260px, 1fr)` | At 320px viewport, a 280px card column will cause wrapping behavior that may leave very narrow remaining space. The 280px/260px floor is aggressive for small mobile. |
| **Fluid typography lower bounds** | `theme.css:43–45` | `clamp(2rem, 5vw, 3.5rem)` has a 2rem minimum. At 320px viewport, 5vw = 16px, which hits the `rem` unit minimum rather than scaling down fluidly. |
| **Footer nav wraps to column at 768px but doesn't gracefully handle mid-range** | `theme.css:324–327` | Only collapses to `flex-direction: column` at ≤768px. Between 769px–1024px footer nav items may crowd. |

---

## ❌ Failures (Must Fix)

| Issue | Location | Severity |
|---|---|---|
| **Touch target too small — `.site-header .nav-toggle`** | `theme.css:145–154` | Button has `padding: var(--space-sm)` (8px). With a 24×24 SVG icon, the total clickable area is approximately 40×40px — below the **44×44px minimum** WCAG target. |
| **Touch target too small — `.site-header .nav-menu a` links** | `theme.css:118` | Links have `padding: var(--space-sm) var(--space-xs)` = 8px vertical, 4px horizontal. With ~0.9rem font-size (14.4px) and ~1.4 line-height, the total height is approximately 32px — well **below 44px**. |
| **Mobile menu links at 768px also inherit small touch target** | `theme.css:319–321` | At mobile breakpoint, font-size increases to 1.125rem (18px) and padding to `var(--space-md)` (16px), yielding ~50px total height — this is fine for the mobile menu links themselves, but the header nav-toggle remains undersized. |

---

## Detailed Analysis

### Breakpoints
The stylesheet relies heavily on fluid CSS (`clamp()`, `auto-fit minmax()`, viewport units) rather than explicit media query breakpoints. This is generally good — fewer breakpoint islands means fewer places where content can "break" between pixel values. However:

- **320px**: With `minmax(280px, 1fr)`, a 280px card can't fit on a 320px screen in a single column — it would cause horizontal scroll OR force the browser to shrink the card below 280px, potentially breaking the layout.
- **414px (iPhone 14 Pro)**: `minmax(280px, 1fr)` with 2×16px padding = 312px available. A 280px card fits, but only ~16px breathing room.
- **1024px, 1280px, 1920px**: No explicit max-width containers or typography adjustments beyond `max-width: 1200px` on section wrappers. Content stays centered at all larger sizes, which is acceptable but lacks "large screen polish."

### Touch Targets
Two critical failures:

1. **`.nav-toggle`** (`theme.css:145–154`): The hamburger button for mobile navigation uses `padding: var(--space-sm)` = 8px. The visible SVG icon is 24×24. Effective touch area: (24+16)×(24+16) = 40×40px. **Below 44px threshold.**

2. **`.nav-menu a`** (`theme.css:112–121`): Desktop nav links use `padding: var(--space-sm) var(--space-xs)` = 8px vertical. With 14.4px font size and 1.4 line-height: 8+14.4+8 = ~30px total height. **Well below 44px threshold.**

The mobile variant of nav links (`theme.css:319–321`) correctly increases padding to `var(--space-md)` (16px), yielding ~50px total height, which is sufficient. The fix should target the desktop nav links and the nav-toggle button.

### Fixed-Px Widths
No instances of `width: 1200px`, `width: 960px`, or similar hardcoded pixel values on layout containers. Layout uses CSS variables (`--max-width: 1200px`) and `max-width: var(--max-width)`, which is acceptable. The value is a single definition at `base.css:66`.

### Mobile Menu
`main.js` provides a complete implementation:
- Toggle click handler with `aria-expanded`
- Focus to first menu link on open
- Escape key to close
- Focus trap within open menu

The CSS in `theme.css:290–328` handles the visual transitions with `transform: translateY(-100%)` → `translateY(0)` and `opacity`/`visibility` changes.

---

## Score Breakdown

| Category | Score | Max | Notes |
|---|---|---|---|
| No horizontal scroll | 100 | 100 | Fluid grids, no fixed-px overflow |
| Touch targets ≥44px | 40 | 100 | nav-toggle ~40px, nav-menu links ~30px |
| Mobile menu works | 95 | 100 | JS complete, CSS correct, aria attributes present |
| Text remains readable | 85 | 100 | clamp() used but 320px lower bound of 2rem may be large |
| No fixed-px layout widths | 100 | 100 | CSS variable usage, fluid grids |
| Breakpoint coverage | 50 | 100 | Only 768px + 640px explicit; no 320/375/414/1024/1280/1920 |

**Weighted Score: 65 / 100**

---

## Recommendations (Ranked by Impact)

1. **[High] Increase `.nav-toggle` padding** — `theme.css:151`: Change `padding: var(--space-sm)` to `padding: 12px` (or `var(--space-md)`) to achieve ≥44px touch target. The hamburger icon is 24px; 10px additional padding on each side yields 44×44px.

2. **[High] Increase `.site-header .nav-menu a` vertical padding** — `theme.css:118`: Change `padding: var(--space-sm) var(--space-xs)` to `padding: 16px var(--space-md)` to reach ≥44px touch target height for desktop nav links.

3. **[Medium] Reduce `minmax` floor for mobile grids** — `components.css:285`: Change `minmax(280px, 1fr)` to `minmax(240px, 1fr)` or use `minmax(min(280px, 100%), 1fr)` to prevent overflow/reflow issues at 320px viewport.

4. **[Medium] Add explicit breakpoint for 1024px+** — Consider an `@media (width >= 1024px)` to:
   - Constrain hero text size at max (prevent over-wide text at 1920px)
   - Adjust grid columns from `auto-fit` to `auto-fill` with explicit column counts for large screens

5. **[Low] Constrain body text line-length** — At 1920px with `max-width: 1200px` content, text lines within that container could be very long. Consider adding `max-width: 65ch` to `p` or body copy to maintain readable line lengths.

---

## Evidence

```
File: variants/02-spotlight-projector/css/base.css
- Line 66: --max-width: 1200px (CSS variable, not fixed-px)
- Line 67: --header-height: 72px
- Line 101: max-width: 100%; height: auto; on media

File: variants/02-spotlight-projector/css/theme.css
- Line 43–45: clamp() typography scale
- Line 76: max-width: var(--max-width) on .nav-primary
- Line 112–121: nav-menu a padding = 8px 4px (TOO SMALL)
- Line 145–154: nav-toggle padding = 8px (TOO SMALL)
- Line 290–328: @media (width <= 768px) mobile nav styles
- Line 319–321: mobile nav link padding = 16px (SUFFICIENT)

File: variants/02-spotlight-projector/css/components.css
- Line 283–287: content-grid auto-fit minmax(280px, 1fr)
- Line 204–208: feature-cards auto-fit minmax(260px, 1fr)
- Line 528–553: @media (width <= 640px) small screen adjustments

File: variants/02-spotlight-projector/js/main.js
- Lines 13–48: Mobile nav toggle with aria, escape key, focus trap
```
