# ACCESSIBILITY Review — 01-minimalist-cinema (base)

## Summary

| Check | Result |
|-------|--------|
| WCAG AA Contrast | **FAIL** |
| Keyboard Navigation | PASS |
| ARIA Labels | PASS (minor issues) |
| Focus Trap (mobile) | PASS |

---

## WCAG AA Contrast

**Status: FAIL**

### Critical Issues

1. **Nav links - electric blue on white**
   - Location: `.nav-menu a` (theme.css:195-222)
   - Colors: `#2d9cff` on `#fff`
   - Ratio: ~3.9:1 (AA requires 4.5:1 for normal text)
   - Severity: **major**
   - Recommendation: Change nav link color to `#1a1a1a` or darker, or add a background indicator

2. **Footer copyright text**
   - Location: `.footer-copy` (theme.css:162-166)
   - Colors: `#999999` on `#1a1a1a`
   - Ratio: ~4.2:1 (AA requires 4.5:1 for normal text, 3:1 for large text)
   - Severity: **major**
   - Recommendation: Increase to `#b3b3b3` or brighter

### Moderate Issues

3. **Hero eyebrow text**
   - Location: `.hero-eyebrow` (components.css:74-82)
   - Colors: `#2d9cff` on `#fff`
   - Ratio: ~3.9:1 (fails AA)
   - Severity: **major**
   - Recommendation: Either use a darker blue or ensure it's large text (18pt+ or 14pt bold)

4. **"See all features" link**
   - Location: `.features-more a` (components.css:214-218)
   - Colors: `#2d9cff` on `#fff` (page background)
   - Ratio: ~3.9:1 (fails AA)
   - Severity: **minor**
   - Recommendation: Use darker link color for sufficient contrast

5. **Primary button text on hover**
   - Location: `.btn-primary:hover` (components.css:32-36)
   - Colors: `#fff` on `#1a1a1a`
   - Ratio: ~16:1 (passes, but the inverse direction below fails)
   - Note: The primary button has good contrast when not hovered

### Passing Contrast

| Element | Colors | Ratio | Status |
|---------|--------|-------|--------|
| Body text (charcoal on white) | `#1a1a1a` on `#fff` | ~16:1 | PASS |
| Muted text (slate-gray on white) | `#2e2e2e` on `#fff` | ~12:1 | PASS |
| Footer white on charcoal | `#fff` on `#1a1a1a` | ~16:1 | PASS |
| Footer soft-blue links on charcoal | `#a7d8ff` on `#1a1a1a` | ~9.2:1 | PASS |
| Primary button (electric blue on charcoal) | `#2d9cff` on `#1a1a1a` | ~6.4:1 | PASS |
| Hero heading (charcoal on white) | `#1a1a1a` on `#fff` | ~16:1 | PASS |

---

## Keyboard Navigation

**Status: PASS**

### Strengths
- Skip link present and functional (`#main-content`) (index.html:62)
- All interactive elements focusable natively (links, buttons)
- `:focus-visible` styles defined (base.css:155-158) with 2px electric-blue outline
- No positive tabindex values found
- Tab order follows visual DOM order

### Minor Observations
- FAQ buttons use `<button>` elements (proper) - keyboard accessible
- Nav toggle has `min-width: 44px` and `min-height: 44px` for touch targets (good)

---

## ARIA Labels

**Status: PASS (minor issues)**

### Passing ARIA

| Element | ARIA | Status |
|---------|------|--------|
| Site header | `role="banner"` | PASS |
| Primary nav | `role="navigation"` + `aria-label="Primary navigation"` | PASS |
| Nav toggle | `aria-label="Toggle navigation"`, `aria-expanded`, `aria-controls` | PASS |
| Nav menu | `id="nav-menu"` linked via `aria-controls` | PASS |
| Main content | `id="main-content"`, `tabindex="-1"` | PASS |
| Hero section | `aria-labelledby="hero-heading"` | PASS |
| Pitch section | `aria-labelledby="pitch-heading"` | PASS |
| Footer | `role="contentinfo"` | PASS |
| Footer nav | `aria-label="Footer navigation"` | PASS |
| SVG icons | `aria-hidden="true"` on decorative icons | PASS |
| FAQ buttons | `aria-expanded` toggled correctly | PASS |

### Issues Found

1. **Logo image missing alt text**
   - Location: index.html:69
   - Code: `<img src="./img/logo.svg" alt="Phlix logo" width="120" height="40" />`
   - Issue: The parent `<a>` has `aria-label="Phlix home"` but image alt should describe the logo purpose, not just "Phlix logo"
   - Severity: **minor**
   - Recommendation: Change alt to "Phlix home" or remove alt and rely on aria-label

---

## Focus Trap (Mobile Nav)

**Status: PASS**

The mobile navigation implements a proper focus trap pattern:

- Focus trap activates when nav is open and Tab/Shift+Tab pressed (main.js:61-75)
- Cycle from last element wraps to first and vice versa
- Focus returns to toggle when nav closes (main.js:40)
- Escape key closes nav (main.js:54-58)
- Body scroll locked when nav open (main.js:24)
- First menu item receives focus when nav opens (main.js:27-30)
- Nav links close nav on click (main.js:78-84)
- Resize to desktop closes nav (main.js:87-91)

### Observation
- The focusable selectors string includes `button:not([disabled])` (main.js:17-18), but buttons aren't present in the nav menu - only links. This is correct behavior.

---

## Recommendations Summary

| Priority | Issue | Fix |
|---------|-------|-----|
| HIGH | Nav links contrast (3.9:1) | Change `.nav-menu a` color to `#1a1a1a` |
| HIGH | Footer copyright (4.2:1) | Change `#999` to `#b3b3b3` |
| MEDIUM | Hero eyebrow (3.9:1) | Use darker blue or larger font |
| MEDIUM | Features more link (3.9:1) | Use standard link color with better contrast |
| LOW | Logo alt text | Change to more descriptive text |

---

## Testing Performed

- Manual code review of HTML, CSS (base.css, theme.css, components.css), and JavaScript (main.js)
- Contrast calculations using standard luminance formulas
- ARIA attribute verification against WCAG patterns
- Focus trap logic review in JavaScript

*Review generated: 2026-05-21*
