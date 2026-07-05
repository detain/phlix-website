# Usability

## Score: 85/100

## Severity: ⚠️

## Findings
- `index.html:88-91` — **Primary CTA above fold**: The "Get Phlix" `.btn-primary.btn-large` is visible above the fold on the home page hero at standard desktop viewport (1920×1080). The hero section has `min-height: 85vh` and uses flexbox centering. At 1920px the hero is approximately 918px tall, and the CTA area is well within the visible area. However, the `index.html:6` `<title>` is 33 chars, not the hero CTA itself — this finding confirms the CTA is present. The primary funnel path works: Home → Download (2 clicks).
- `css/components.css:125-164` — Mobile nav breakpoint is `max-width: 900px`. This is slightly wider than the common 768px breakpoint, meaning the desktop nav collapses earlier. Nav items at 0.8125rem Barlow Condensed with `letter-spacing: 0.06em` and `text-transform: uppercase` at 0.8125rem actual size are readable. Mobile nav `.nav-menu` becomes `position: absolute` with `box-shadow: var(--shadow-md)` on open, which correctly covers content rather than pushing it down.
- `css/components.css:47-68` — `.nav-toggle` has `min-width: 44px; min-height: 44px` — meets the 44×44px touch target requirement from WCAG 2.2 AA (and the brand kit's accessibility spec). The hamburger icon SVG uses `stroke-width="2"` per the nav icon style.
- `js/main.js:28-34` — Esc key closes mobile nav; `js/main.js:36-41` — outside click closes mobile nav. Both behaviors match the spec in `new_site.md §7` for mobile nav toggle.
- `js/main.js:23-25` — After opening mobile nav, focus moves to the first nav link (`navMenu.querySelector('a')?.focus()`). This is correct focus management. After closing with Esc, focus returns to the toggle (`navToggle.focus()`).
- `css/components.css:282-284` — Button press uses `transform: scale(0.96)` with `transition: transform 0.1s` — responsive tactile feedback per the kit's button_press microinteraction.
- `index.html:80` — `<main id="main-content" tabindex="-1">` — The main content element has `tabindex="-1"` which allows programmatic focus (for the skip link target) but does not add it to the tab order. This is correct per `new_site.md §4`.
- `js/main.js:73-79` — The main content focus handler sets `outline: none` on focus, which prevents a visible outline when the skip link target receives programmatic focus. This is intentional and correct.
- **Potential issue**: The `.feature-card:hover` transform (used for scroll reveal animation) at `css/components.css:364-368` applies `translateY(-3px)` lift. On touch-only devices where `:hover` doesn't exist but touch hold might trigger hover styles, this could produce an unintended lifted state. However, this is a minor concern since the primary interaction on cards is clicking (links), not hover-dependent actions.

## What passes
- Nielsen heuristics assessed:
  1. **Visibility of system status**: No dynamic system status needed on a static marketing site.
  2. **Match between system and real world**: Brand language (trail, blaze, summit) matches the wilderness theme; navigation is clear.
  3. **User control and freedom**: Escape key and outside-click close mobile nav — user can escape any state.
  4. **Consistency and standards**: Same HTML shell across all 8 pages; same CSS architecture; same nav pattern.
  5. **Error prevention**: Download page has `btn-secondary` for Mobile (beta) and DLNA which don't have direct download links, reducing misleading clicks.
  6. **Recognition rather than recall**: Navigation is always visible (sticky header); no hidden controls.
  7. **Flexibility and efficiency**: 8 primary nav links cover all sections; no deep nesting.
  8. **Aesthetic and minimalist design**: Canvas tan background, single campfire orange CTA, clean typography — minimalist per the brand.
  9. **Help users recognize/fix errors**: Error states (`.status-deprecated`, `.status-beta`, `.status-stable`) clearly labeled.
  10. **Help and documentation**: Footer links to docs, GitHub, API reference — adequate for a marketing site.
- Download goal reachable in ≤2 clicks: Home → [Get Phlix] → download.html (direct link to server install instructions + client cards). PASS.
- `css/components.css:92-94` — Nav links have `min-height: 44px; display: flex; align-items: center` — adequate touch target for nav items (larger than the minimum).
- No dead ends or traps found on any page. Every link navigates somewhere functional.

## Verdict
Usability is strong — the funnel is clear, touch targets are adequate, mobile nav works correctly, and Nielsen heuristics are respected. The only concern is the slightly wide mobile nav breakpoint (900px) which is a minor design choice, not a usability defect. No user traps or confusing flows.
