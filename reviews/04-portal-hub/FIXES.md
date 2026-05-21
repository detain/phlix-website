# FIXES.md — 04-portal-hub (base variant)

## Lock File Protocol Compliance

- Checked for lock files before editing: **No lock files found**
- Created lock files before edits: `theme.css.lock`, `main.js.lock`
- Removed lock files immediately after edits: **Yes**

---

## Fixes Applied

### READABILITY Issue 1: Font sizes below 16px

**File:** `variants/04-portal-hub/css/theme.css`

| Selector | Before | After |
|----------|--------|-------|
| `.feature-card p` | `0.9rem` (14.4px) | `1rem` (16px) |
| `.footer-col a` | `0.9rem` (14.4px) | `1rem` (16px) |
| `.footer-copy` | `0.875rem` (14px) | `1rem` (16px) |
| `.client-highlights li` | `0.9rem` (14.4px) | `1rem` (16px) |

### READABILITY Issue 2: `prefers-reduced-motion` gaps

**File:** `variants/04-portal-hub/js/main.js`

1. **Scroll-reveal animations** (lines 73-103):
   - Wrapped entire IntersectionObserver setup in `if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches)`
   - Added `else` block that immediately adds `.revealed` class to all elements (making them visible without animation)
   - This ensures users with reduced motion preferences see content immediately without fade/slide animations

2. **Smooth scroll for anchor links** (lines 115-130):
   - Added check: `const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches`
   - Set `scrollBehavior` variable: `prefersReducedMotion ? 'auto' : 'smooth'`
   - Changed `target.scrollIntoView({ behavior: 'smooth', ... })` to use `scrollBehavior` variable
   - CSS `base.css` already had `scroll-behavior: auto !important` in reduced motion media query, but JS was overriding with `smooth`

### ACCESSIBILITY Issue 3: Mobile nav focus trap

**File:** `variants/04-portal-hub/js/main.js`

Added focus trap to mobile navigation when open:

1. **Focus first link on open** (lines 17-19):
   - When menu opens, focus moves to first menu link automatically

2. **Focus trap implementation** (lines 30-45):
   - Added `keydown` listener on `navMenu`
   - Traps Tab key: when Shift+Tab on first element, wraps to last; when Tab on last element, wraps to first
   - Uses `focus()` to redirect focus within menu items

---

## Issues Not Fully Fixed

None. All reported issues have been addressed.

---

## Summary

All READABILITY and ACCESSIBILITY issues from the review phases have been fixed:
- 4 font-size corrections (all 14.xpx → 16px)
- 2 prefers-reduced-motion gaps closed (CSS was correct, JS was not)
- 1 focus trap added for mobile nav keyboard accessibility

Files modified:
- `variants/04-portal-hub/css/theme.css` (4 font-size changes)
- `variants/04-portal-hub/js/main.js` (scroll-reveal motion check, smooth scroll motion check, focus trap)
