# Accessibility

**Score: 78/100**  
**Severity: ⚠️**

## Findings

### ❌ CRITICAL: FAQ accordion JS selector is wrong — custom expand/collapse never initializes (main.js:146–163, about.html:204–254)
As noted in Usability: `document.querySelectorAll(".faq-item details")` finds no elements because the `<details>` is a direct child of `.faq-item`, not nested inside. The custom toggle handler never runs. Native browser disclosure widget still works, but the JS-mediated ARIA `aria-expanded` sync and reduced-motion handling in `initFaq` are dead code.

**Fix:** Change selector to `.faq-item > details` or simply `.faq-item details` to match direct children.

### ❌ CRITICAL: Toast animation name mismatch (main.js:216, 224)
As noted in Usability: JS sets `animation: "toastIn 300ms ease-in reverse both"` but CSS keyframe is named `toast-in` (kebab-case). Toast dismiss animation never fires. This is an accessibility concern because toasts are announced via `role="alert"` and `aria-live="polite"` — if they don't animate out, screen readers may retain stale announcements.

**Fix:** Change main.js:216 and :224 from `"toastIn"` to `"toast-in"`.

### ⚠️ WARNING: Form placeholder text contrast (WCAG AA borderline) (components.css:567–570, 555)
`.form-input::placeholder { color: var(--color-neutral); }` — sandalwood (#7A5040) on dark-vermillion (#160808) yields ~5.4:1 contrast. This passes WCAG AA (4.5:1) but the brand kit specifically warns: "Always verify fuchsia-on-surface combinations — fuchsia on dark-vermillion is tight." The same caution applies to neutral/sandalwood on dark-vermillion.

The brand kit's own contrast table puts sandalwood contrast at 4.8:1 on midnight-mandir — near the edge. On dark-vermillion it would be slightly better but still tight for placeholder text.

**Fix:** Darken placeholder color to improve contrast ratio, or use jasmine-white at reduced opacity (e.g., rgba(255,245,224,0.5)).

### ⚠️ WARNING: fuchsia (#CC0066) on surface (#160808) passes AA but tight
The brand kit notes this combination is "tight". For small/decorative use it's fine, but verify large UI use cases. Secondary buttons use transparent bg with fuchsia border + text — the text on transparent bg has no contrast issue (no bg). The risk is low.

### ⚠️ WARNING: focus ring box-shadow offset may clip at small viewport widths (base.css:387)
`:focus-visible { box-shadow: 0 0 0 4px rgb(245, 168, 0, 0.22); }` — the 4px outer glow with the 2px outline and 2px offset may be clipped by `overflow: hidden` parents. Not observed in current CSS, but worth noting.

## What Passed

- ✅ WCAG AA compliant contrast ratios: jasmine-white (#FFF5E0) on midnight-mandir (#0A0505) = ~19.1:1 (AAA), marigold gold (#F5A800) on midnight-mandir = ~8.4:1 (AAA), marigold gold on dark-vermillion = ~8.7:1 (AAA)
- ✅ Fuchsia (#CC0066) on midnight-mandir = ~4.8:1 (AA pass)
- ✅ Body text ≥4.5:1 on all primary backgrounds
- ✅ Large text (≥18px or bold ≥14px) ≥3:1 for all UI labels
- ✅ All interactive elements have visible focus indicator (2px marigold gold ring + 2px offset + 4px warm outer glow, brand-compliant)
- ✅ Keyboard navigation: all buttons and links reachable via Tab, logical order
- ✅ No positive tabindex — all interactive elements use default tab order
- ✅ Skip link as first focusable element, visible on focus, targets #main-content
- ✅ `aria-label` on nav toggle ("Toggle navigation"), nav menu (`id="nav-menu"`), footer nav (`aria-label="Footer navigation"`)
- ✅ `aria-current="page"` on active nav link across all pages
- ✅ All SVG icons have `aria-hidden="true"` (decorative) or descriptive `aria-label`/`aria-labelledby`
- ✅ Images: logo.svg has `<title>Phlix</title>` and `<desc>Bollywood Dreams branding...`, favicon.svg has `<title>` and `<desc>`, decorative SVG rangoli-divider has `aria-hidden="true"`
- ✅ `<html lang="en">` on all 8 pages
- ✅ Landmarks: exactly one `role="banner"` (header), one `role="navigation"` (nav), one `id="main-content"` main, one `role="contentinfo"` (footer) — no duplicate landmarks
- ✅ Touch targets: nav toggle 44×44px, all buttons min-height 44px, FAB 56×56px — all ≥44×44px
- ✅ `prefers-reduced-motion` honored: base.css:394–402 resets all animations to 0.01ms, JS gates scroll reveals and FAQ accordion
- ✅ 200% text zoom survives: fluid typography (clamp), no fixed px font sizes, flex/grid layouts
- ✅ Forms: labels via `.form-label` class, associated via adjacency (label + input siblings)
- ✅ Color is not the only means of conveying information (status badges use text labels + color + border)
