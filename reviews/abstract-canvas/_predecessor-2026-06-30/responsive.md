# Dimension 7: Responsive — Review

**Score: 68/100**

---

## Findings

### ✅ PASS — No horizontal scroll at any width
- `base.css:90` — `--max-width: 1400px` + `--gutter: 24px`
- All containers use `width: 100%; max-width: ...; margin-inline: auto`
- `theme.css:115-127` — `.container` and `.content-container` are fluid with max-width clamps
- `theme.css:155-158` — Font sizes use `clamp()` (e.g., `h1 { font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem); }`)
- `theme.css:252` — pitch-list uses `grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr))` — fully fluid
- `theme.css:295` — features-grid uses `minmax(min(100%, 280px), 1fr)` — fully fluid
- No `position: fixed` widths that could cause overflow

### ⚠️ WARN — Body text drops to 15px on feature cards (below 16px minimum)
- `theme.css:335` — `.feature-card p { font-size: 0.9375rem; }` = **15px**
- Brand kit spec says "Body text never drops below ~16px on phones"
- 15px is technically acceptable for WCAG body text minimum (which is 16px for source, affected by user agent), but violates the brand-kit requirement
- `theme.css:59-64` — `.body-small` is also 0.875rem (14px), used in ecosystem-item descriptions

### ⚠️ WARN — Nav toggle is 44×44px, below 48px tablet touch target
- `components.css:99-100` — `.nav-toggle { width: 44px; height: 44px; }`
- Brand kit: "Tablet: 2–3 column grids, touch targets ≥48px"
- Note: 44×44px is the WCAG absolute minimum; brand kit requires 48px for tablet

### ✅ PASS — Mobile menu works (hamburger toggle, opens/closes)
- `components.css:95-115` — `.nav-toggle` with SVG hamburger icon, `display: none` at desktop, `display: flex` at 768px
- `components.css:506-539` — mobile nav styles with `position: fixed`, `transform: translateX(-100%)`, `.is-open` slides in
- `components.css:74` — `aria-expanded="false"` on toggle button, updated by JS
- `components.css:81` — `aria-controls="nav-menu"` on toggle button
- `js/main.js:15-27` — `openNav()` / `closeNav()` correctly toggle `aria-expanded` and `.is-open` class
- `js/main.js:44-50` — Closes on Escape key
- `js/main.js:53-61` — Closes on outside click
- `js/main.js:48` — Returns focus to toggle on close

### ⚠️ WARN — No TV breakpoint (10-foot UI, D-pad spatial navigation, Bebas Neue at 2× scale)
- Brand kit `responsive_behavior: { tv: "10-foot UI: Bebas Neue numerals at 2× scale, bold 4px cadmium-red focus ring, D-pad spatial navigation..." }`
- No `@media (min-width: 1920px)` or TV-specific breakpoint exists in CSS
- No mention of D-pad spatial navigation in the JS
- This is an **expected regression for a marketing site** (TV UI would be in the actual Phlix client, not a marketing page), but it should be noted

### ✅ PASS — Desktop multi-column, max-width 1400px
- `base.css:90` — `--max-width: 1400px`
- `theme.css:117` — `.container { max-width: var(--max-width); }` = 1400px centered
- Multi-column grids on desktop: features-grid, client-cards, pitch-list all use CSS Grid with multiple columns

### ✅ PASS — No fixed-px layout widths
- All widths use `100%`, `max-width`, `fr`, `ch`, `clamp()`, or `auto-fill minmax()` — no `width: 960px` type declarations

### ⚠️ WARN — Tablet: 2–3 column grids verified, but touch targets inconsistent
- `theme.css:252` — pitch-list: `minmax(min(100%, 320px), 1fr)` — gives 2-3 cols on tablet
- `theme.css:295` — features-grid: `minmax(min(100%, 280px), 1fr)` — gives 2-3 cols on tablet
- `components.css:99-100` — nav-toggle at 44px is below the 48px tablet threshold

---

## Summary

The site is broadly responsive and fluid — no horizontal scroll, correct max-width, mobile menu works with proper ARIA and keyboard handling. Three issues prevent a higher score: (1) feature card body text at 15px violates the brand-kit floor of ~16px; (2) nav-toggle at 44px is under the 48px tablet touch target; (3) no TV/10-foot breakpoint exists, though that is arguably out-of-scope for a marketing site.
