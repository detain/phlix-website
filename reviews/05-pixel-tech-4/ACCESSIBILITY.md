# ACCESSIBILITY Review: 05-pixel-tech-4 (Wave 4)

**Variant:** 05-pixel-tech
**Phase:** ACCESSIBILITY
**Reviewer:** Automated Accessibility Review
**Date:** 2026-05-21

---

## Summary

| Category | Status |
|----------|--------|
| WCAG AA Contrast Ratios | :warning: ISSUES FOUND |
| Keyboard Navigation | :white_check_mark: PASS |
| ARIA Labels | :white_check_mark: PASS |
| Focus Trap in Mobile Nav | :x: FAIL |

---

## 1. WCAG AA Contrast Ratios

### Methodology
Analyzed CSS custom properties and computed colors against WCAG 2.1 AA requirements:
- Normal text (`:root` `--color-text-primary` = `#c0c0c0` silver) on background (`#000`)
- Secondary text (`--color-text-secondary` = `#39ff14` neon green) on background (`#000`)
- Muted text (`--color-muted` = `--color-dark-gray` = `#1a1a1a`) on background (`#000`)

### Findings

| Element | Foreground | Background | Ratio | AA Normal | Status |
|---------|-----------|-----------|-------|----------|--------|
| Primary text | #c0c0c0 | #000000 | 12.6:1 | 4.5:1 | :white_check_mark: PASS |
| Secondary text (neon green) | #39ff14 | #000000 | 15.3:1 | 4.5:1 | :white_check_mark: PASS |
| Skip link text | #000000 | #39ff14 | 15.3:1 | 4.5:1 | :white_check_mark: PASS |
| Muted text | #1a1a1a | #000000 | 1.7:1 | 4.5:1 | :x: **FAIL** |

### Issues Found

**Issue 1: Low contrast muted text**
- **Severity:** AA Non-Compliance
- **Location:** `css/base.css:105` and throughout the design system
- **Specifics:** `--color-muted: #1a1a1a` on `--color-bg-primary: #000` yields only **1.7:1** contrast ratio
- **Affected elements:**
  - `.footer-col a` uses `color: var(--color-text)` which maps to `--color-text-primary: #c0c0c0` - PASS
  - But `.footer-copy` uses `color: var(--color-muted)` - **FAIL**
  - `.feature-card p` uses `color: var(--color-text)` - PASS
  - `.hero-sub` uses `color: var(--color-text)` - PASS
  - Client status badges (`status-stable`, `status-beta`) - text colors may fail

**Issue 2: Feature card body text**
- **Location:** `css/theme.css:415`
- **Specifics:** `.feature-card p` uses `--color-text` which is `#c0c0c0` on `#000` - PASS (12.6:1)

**Issue 3: Status badges**
- **Location:** `css/theme.css:507-516`
- **Specifics:** `.status-stable` has `color: var(--color-text-secondary)` (#39ff14) on `background: rgb(57, 255, 20, 0.1)` - ratio approximately 15:1 - PASS
- **Issue:** `.status-beta` has `color: var(--color-muted)` (#1a1a1a) on `background: rgb(139, 115, 85, 0.2)` - approximately 2.3:1 - **FAIL**

---

## 2. Keyboard Navigation with Tab Key

### Findings

| Check | Status |
|-------|--------|
| Skip link present | :white_check_mark: PASS |
| Skip link target valid (`#main-content`) | :white_check_mark: PASS |
| Focus styles via `:focus-visible` | :white_check_mark: PASS |
| Tab order follows visual order | :white_check_mark: PASS |
| Interactive elements focusable | :white_check_mark: PASS |
| Touch target minimum 44px | :white_check_mark: PASS |
| Reduced motion support | :white_check_mark: PASS |

### Details

**Positive findings:**
- Skip link at line 72: `<a class="skip-link" href="#main-content">Skip to main content</a>`
- Skip link styled with `background: var(--color-neon-green)` and `color: var(--color-black)` for high contrast
- `:focus-visible` defined in `base.css:154-158` with 2px green outline
- `scroll-behavior: smooth` in `html` (respects `prefers-reduced-motion`)
- All animations respect `prefers-reduced-motion: reduce`
- Mobile toggle has `min-width: var(--touch-target)` and `min-height: var(--touch-target)` (44px)

**Minor issue:**
- The mobile nav menu items (`nav-menu a`) are always in the DOM even when hidden via `transform: translateX(100%)`. They will be focusable via Tab but visually hidden. This is acceptable behavior but could be improved with `visibility: hidden` or `display: none` when closed.

---

## 3. ARIA Labels on Interactive Elements

### Findings

| Element | ARIA Attribute | Value | Status |
|---------|---------------|-------|--------|
| Nav toggle button | aria-label | "Toggle navigation" | :white_check_mark: PASS |
| Nav toggle button | aria-expanded | "false" (updated via JS) | :white_check_mark: PASS |
| Nav toggle button | aria-controls | "nav-menu" | :white_check_mark: PASS |
| Nav logo link | aria-label | "Phlix home" | :white_check_mark: PASS |
| Logo img | alt | "Phlix logo" | :white_check_mark: PASS |
| All SVG icons | aria-hidden | "true" | :white_check_mark: PASS |
| Primary nav | role | "navigation" | :white_check_mark: PASS |
| Primary nav | aria-label | "Primary navigation" | :white_check_mark: PASS |
| Footer | role | "contentinfo" | :white_check_mark: PASS |
| Hero section | aria-labelledby | "hero-heading" | :white_check_mark: PASS |
| Current page link | aria-current | "page" | :white_check_mark: PASS |
| Main content | tabindex | "-1" | :white_check_mark: PASS |

### Details

**Positive findings:**
- Nav toggle has complete ARIA attributes: `aria-label`, `aria-expanded`, `aria-controls`
- JS correctly updates `aria-expanded` on toggle click (line 19 in main.js)
- SVG icons all have `aria-hidden="true"` preventing screen reader announcement
- Nav landmark properly labeled: `<nav class="nav-primary" role="navigation" aria-label="Primary navigation">`
- Main content has `tabindex="-1"` for skip link target
- All links have descriptive text or `aria-label`

---

## 4. Focus Trap in Mobile Nav

### Findings

| Check | Status |
|-------|--------|
| Mobile nav has close mechanism | :white_check_mark: PASS |
| Escape key closes menu | :white_check_mark: PASS |
| Focus moves to toggle on close | :white_check_mark: PASS |
| Click on link closes menu | :white_check_mark: PASS |
| Focus trapped within open menu | :x: **FAIL** |
| First menu item focused on open | :x: **FAIL** |
| Last item does not escape menu | :x: **FAIL** |

### Issues Found

**Issue 1: No focus trap when mobile nav is open**
- **Severity:** WCAG 2.1.2 (Level A) - Keyboard Navigation
- **Location:** `js/main.js:11-43` (initMobileNav function)
- **Specifics:** When the mobile menu is open (`is-open` class applied), Tab key can move focus **behind** the overlay to:
  - Skip link (`.skip-link`)
  - Header logo and elements
  - Any other focusable elements behind the modal overlay
- **Expected behavior:** Focus should be trapped within the open menu until closed
- **Actual behavior:** User can Tab out of the menu overlay

**Issue 2: Focus not moved to first menu item on open**
- **Severity:** Usability
- **Location:** `js/main.js:17-23`
- **Specifics:** When menu opens, focus remains on the toggle button. Screen reader users may not know the menu has opened.
- **Expected behavior:** Move focus to first menu item or the menu container itself

**Code reference:**
```javascript
// js/main.js:17-23 - No focus management on open
toggle.addEventListener('click', function () {
  const isOpen = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', isOpen.toString());
  document.body.style.overflow = isOpen ? 'hidden' : '';
  // Missing: focus trap implementation
  // Missing: focus移到first menu item
});
```

**Issue 3: Nav menu CSS allows Tab navigation when hidden**
- **Location:** `css/theme.css:804-807`
- **Specifics:** The menu uses `transform: translateX(100%)` to hide, but elements inside remain focusable
- **CSS:** `transform: translateX(100%)` does not affect tab order

---

## Recommendations

### High Priority

1. **Focus Trap (Mobile Nav)**
   ```javascript
   // Add to initMobileNav in main.js:
   // When menu opens, trap focus within
   // When menu closes, return focus to toggle
   ```

2. **Fix Muted Text Contrast**
   - Change `--color-muted` from `#1a1a1a` to a color with at least 4.5:1 ratio on black
   - Recommended: `#808080` (gray) = 6.3:1 ratio
   - Or `#666666` = 4.7:1 ratio

3. **Fix Status Badge Beta Contrast**
   - `.status-beta` currently uses `--color-muted` for text
   - Change to a contrasting color

### Medium Priority

4. **Focus Management on Menu Open**
   - When menu opens via toggle, move focus to first menu item or menu container
   - Add `aria-expanded` to nav menu element itself

---

## Test Commands

To verify fixes, test with:
- Browser DevTools: Check computed colors and contrast
- Tab key: Navigate through all interactive elements
- Screen reader: Navigate with VoiceOver/NVDA
- Mobile viewport: Test focus trap on touch devices

---

*Review generated: 2026-05-21*
*Variant: 05-pixel-tech-4*
*Wave: 4*
