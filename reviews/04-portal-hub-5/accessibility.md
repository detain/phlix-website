# Accessibility Review — 04-portal-hub-5 (Wave 5)

## Score: 78/100 — MARGINAL PASS

## What's Working
- Skip link present with `href="#main"` targeting correct landmark
- `role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"` ARIA roles properly applied
- `aria-label` on logo and main navigation
- `aria-expanded` and `aria-controls` correctly implemented on mobile menu toggle
- `aria-current="page"` on active nav link
- `aria-hidden="true"` on decorative SVG icons
- `prefers-reduced-motion` properly handled in CSS (lines 107-117, 228-241) and JS (line 113)
- 44px minimum touch targets enforced via CSS (lines 247-252)
- Keyboard focus visible with `focus-visible` outlines (lines 146-150, 165-168)
- FAQ accordion toggles `aria-expanded` correctly (JS lines 91, 97)
- Keyboard support for FAQ (Enter/Space handling, lines 102-106)
- Mobile nav focus trap implemented (JS lines 31-55)

## Critical Issues (blockers)
1. **CSS syntax error in theme.css line 812** — Missing closing parenthesis in `calc()`: `padding-top: calc(var(--header-height) + var(--space-2xl);` will break the hero section layout on mobile. This is a functional browser bug.

## Minor Issues (non-blockers)
1. **Missing `lang` attribute on `<html>` has no value** — `lang="en"` is present (correct), but verify consistent across all pages
2. **FAQ accordion missing `aria-controls` linking question to answer** — Each `.faq-question` should have `aria-controls="faq-answer-{id}"` and each `.faq-answer` should have corresponding `id`
3. **No `aria-labelledby` on feature sections** — `section.features` has `aria-labelledby="features-title"` which is correct, but pitch section `aria-labelledby="pitch-title"` points to an element with `.sr-only` class — verify screen readers announce this correctly
4. **Feature cards missing description association** — Each `.feature-card` should have `aria-describedby` pointing to the feature body text if the title alone doesn't uniquely identify the card's purpose

## Recommendations
1. Add `id` attributes to FAQ answer elements and link questions via `aria-controls`
2. Add `role="region"` to major content sections with proper `aria-labelledby`
3. Test mobile menu keyboard navigation with screen reader to verify focus trap is announced properly
4. Verify color contrast ratios for amber (#F59E0B) text on white backgrounds — may not meet WCAG AA 4.5:1 for body text
