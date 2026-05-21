# Accessibility Review — 02-spotlight-projector-5 (Wave 5)

## Score: 78/100 — MARGINAL PASS

## What's Working
- Skip link present with correct href="#main-content" and focusable styling
- `lang="en"` on html element
- `aria-label` on nav toggle button
- `aria-expanded` and `aria-controls` on mobile nav toggle
- Semantic landmarks (role="banner", "navigation", "contentinfo")
- `:focus-visible` outlines styled with copper accent (#B87333)
- `prefers-reduced-motion` media query present
- 44px minimum touch targets on interactive elements
- SVG icons use `aria-hidden="true"`
- Focus trap implemented in mobile nav

## Critical Issues (blockers)
1. **FAQ accordion missing from docs.html** — JavaScript accordion code exists but docs.html has no FAQ section.
2. **Contrast** — Muted text #8B7355 on dark background ~4.2:1 passes for large text but fails for normal body text (<18px).

## Minor Issues (non-blockers)
1. FAQ accordion lacks `aria-controls` linking dt to dd with unique IDs
2. FAQ dt has `role="button"` without `aria-pressed` state indicator
3. Footer external links missing `rel="noopener noreferrer"`
4. No `aria-current="page"` on logo link when on homepage

## Recommendations
1. Add FAQ section to docs.html with proper dl/dt/dd structure and unique IDs
2. Add `aria-controls` and `aria-pressed` to FAQ toggles
3. Add `rel="noopener noreferrer"` to external footer links
4. Ensure muted text is only used for text ≥18px
