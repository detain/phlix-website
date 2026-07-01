# Dimension 4 — Responsive

**Score: 78 / 100** (severity: ⚠️)

---

## ❌ FAIL

### `css/components.css:79–133` — 8-item horizontal nav overflows at 320px

At 320px viewport, the `.nav-toggle` is not yet visible (its `display: none` is overridden at `max-width: 768px` — meaning at 320px the **desktop horizontal nav is shown**). The nav has 8 items, each with Silkscreen font at ~44px content width plus 4px gap = ~384px for the `<ul>`. The viewport is 320px. This guarantees horizontal scroll at 320px.

```css
@media (max-width: 768px) {
  .nav-toggle { display: block; } /* at 320px this is NOT matched */
}
```

At 320px, `.nav-toggle` is still `display: none` (inherited from the base rule), so the horizontal `.nav-menu` (which is `display: flex`) is rendered. 8 nav items at ~48px each (including padding/gap) × 8 = ~384px > 320px viewport → **horizontal scrollbar appears**.

This is a genuine responsive failure at the smallest specified breakpoint (320px).

**Fix:** Either (a) add a `@media (max-width: 768px)` rule that activates the toggle at a wider breakpoint (e.g., `@media (max-width: 900px)`), or (b) add a 320px-specific breakpoint showing the toggle.

---

## ⚠️ WARNINGS

### `css/components.css:55–68` — Nav-toggle touch target < 44px (mobile)

Even when the nav-toggle IS visible on mobile, its height is ~27px — below the 44×44px touch target minimum (WCAG 2.2 SC 2.5.8). See Dimension 3.

---

### `index.html:1` — `scroll-behavior: smooth` on `<html>` not gated for reduced motion

The base CSS sets `scroll-behavior: smooth` globally. The `@media (prefers-reduced-motion)` rule in `base.css:183` does include `scroll-behavior: auto !important`, so the reset IS applied when the preference is set. This is not a failure — it is noted here for awareness only.

---

## ✅ PASSED

| Check | Status | Location |
|---|---|---|
| No horizontal scroll at 1280px | ✅ | Verified: all layout containers use `max-width` or fluid `width: 100%` |
| No horizontal scroll at 768px | ✅ | Nav toggles to mobile menu; no overflow |
| No horizontal scroll at 1920px | ✅ | Max-width 1280px, centered |
| No horizontal scroll at 320px (non-nav) | ✅ | All non-nav elements use fluid widths or `overflow-x: auto` for code blocks |
| Grid reflows to 1 column on phone | ✅ | `theme.css:46–48` — `max-width: 480px` collapses all grids to 1fr |
| Mobile nav: button toggles menu | ✅ | `main.js:14–17` — `.nav-toggle` click toggles `.is-open` |
| Mobile nav: closes on Escape | ✅ | `main.js:28–34` — `Escape` key removes `.is-open`, returns focus to toggle |
| Mobile nav: closes on outside click | ✅ | `main.js:20–25` — `document` click listener checks `!toggle.contains(e.target) && !menu.contains(e.target)` |
| `overflow-x: auto` on code-block | ✅ | `theme.css:156` — code snippets scroll horizontally |
| Hero Blip animation hidden on overflow | ✅ | `components.css:145` — `.hero { overflow: hidden }` |
| Font sizes scale appropriately | ✅ | `clamp()` used throughout; minimum ~9.6px at 320px for h2 (within brand constraints) |
| CTA banner text legible at all sizes | ✅ | `clamp(0.875rem, 3vw, 1.125rem)` — 320px: ~14px, 768px: ~19px, 1280px: ~18px |
| Container padding respected | ✅ | `theme.css:11` — `padding-inline: var(--space-4)` (16px) at all breakpoints |
| `gap` in flex/grid prevents cramped items | ✅ | Consistent `gap: var(--space-4)` (16px) in grids |
| Touch targets ≥ 44px on feature cards | ✅ | `.feature-card` — padding 16px + content = ~64px minimum height |
| `@media (prefers-reduced-motion)` resets scroll behavior | ✅ | `base.css:183` — `scroll-behavior: auto !important` |

---

## Notes

- The site does not have an explicit `@media (max-width: 320px)` or `@media (max-width: 375px)` breakpoint — but the CSS cascade from `max-width: 480px` handles smaller viewports (single-column reflow). The failure at 320px is specifically because the nav toggle breakpoint (`max-width: 768px`) is too wide: at sizes between 768px and 320px, the horizontal nav shows but overflows.
- The `max-width: 1280px` layout container is centered, which is correct. At very wide viewports (1920px+) the site is comfortably within the content width.
- At 320px, `.nav-menu a { padding: var(--space-3); font-size: 0.75rem; }` — the expanded mobile nav items are 48px wide plus 16px container padding = 64px per item, fitting within 320px. The issue is ONLY the non-mobile (desktop) horizontal nav at 320px.
