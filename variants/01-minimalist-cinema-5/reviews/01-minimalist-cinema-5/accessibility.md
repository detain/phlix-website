# Accessibility Review — 01-minimalist-cinema-5 (Wave 5)

## Score: 65/100 — FAIL

## What's Working
- Skip link present on all pages (`<a class="skip-link" href="#main-content">`)
- Mobile nav toggle has `aria-expanded` and `aria-controls` attributes
- Focus trap implemented in mobile nav (main.js lines 56–70)
- `prefers-reduced-motion` support in base.css and components.css
- 44px touch targets on nav-toggle and buttons (theme.css line 273; components.css line 22)
- FAQ accordion uses `aria-expanded`, `hidden` attributes, and keyboard-focusable buttons
- All icon SVGs have `aria-hidden="true"`
- Semantic HTML structure: `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>` for cards
- `tabindex="-1"` on main content for skip link target
- Focus styles using `:focus-visible` with 2px accent outline

## Critical Issues (blockers)
1. **WCAG AA contrast failure — body text on dark background**: Muted text colors `#AAAAAA` (base.css line 82), `#666666` (base.css line 12), `#888888` (components.css lines 108, 341) all fail 4.5:1 contrast ratio on `#000000` background. These appear in paragraphs, hero subheadings, and page leads. Minimum contrast for normal text is 4.5:1; these colors only achieve ~2.2–2.8:1.
2. **WCAG AA contrast failure — gold accent on dark**: `#FFD700` (the accent gold `--color-accent`) achieves ~10.8:1 on `#000000` for large/bold text (PASS), but when used at normal weight/size (e.g., eyebrow text at components.css line 98), the contrast may be borderline. However this is acceptable for large text (≥18pt bold or ≥24pt normal).

## Minor Issues (non-blockers)
1. The nav menu items don't have individual `aria-current="page"` on non-active links (only active page gets it). This is acceptable but adding it would improve screen reader experience.
2. The FAQ accordion buttons don't have `aria-controls` pointing to the dd element ID. Currently JS works via DOM traversal but explicit `aria-controls` would be more robust.
3. Mobile nav close button doesn't have an explicit `aria-label` like "Close navigation" — relies on the svg aria-hidden. Should add explicit close label.
4. No `lang` attribute variation for localized content sections (not applicable since site is English-only, but noted for future).

## Recommendations
1. **Fix contrast ratios immediately**: Replace `#AAAAAA`, `#666666`, `#888888` with colors that pass 4.5:1 on black:
   - Use `#C0C0C0` (≈4.6:1) or `#D0D0D0` (≈5.6:1) for muted body text
   - Or switch to the brand secondary color `#A7D8FF` (soft_blue) for muted text as it passes on dark backgrounds
2. Add explicit `aria-controls` to FAQ accordion buttons matching their dd element ID
3. Add descriptive close label to mobile nav close action
4. Consider adding `aria-current` to all nav links for consistent screen reader experience
