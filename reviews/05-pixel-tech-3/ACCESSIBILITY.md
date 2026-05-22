# ACCESSIBILITY Review: 05-pixel-tech-3 (Wave 3)

**Reviewer:** Manual Code Review + Contrast Analysis
**Date:** 2026-05-21
**Variant:** 05-pixel-tech-3
**Brand:** 05-pixel-tech
**Phase:** ACCESSIBILITY

---

## Summary

| Check | Status | Notes |
|-------|--------|-------|
| WCAG AA Contrast | ⚠️ PARTIAL | One failure: electric purple on black |
| Keyboard Navigation | ✅ PASS | Skip link, logical tab order |
| ARIA Labels | ✅ PASS | All interactive elements properly labeled |
| Focus Trap (Mobile Nav) | ❌ FAIL | Focus escapes mobile nav when open |

---

## 1. WCAG AA Contrast Ratios

### Method
Analyzed CSS custom properties and computed contrast ratios using relative luminance formula.

### Results

| Element | Colors | Ratio | WCAG AA | WCAG AAA |
|---------|--------|-------|----------|----------|
| Primary text (silver #c0c0c0 on black #000) | #c0c0c0 on #000 | 11.54:1 | ✅ PASS | ✅ PASS |
| Secondary text (neon green #39ff14 on black) | #39ff14 on #000 | 15.49:1 | ✅ PASS | ✅ PASS |
| Matrix green (#0f6) on black | #0f6 on #000 | 15.50:1 | ✅ PASS | ✅ PASS |
| Nav links on dark gray header | #c0c0c0 on #1a1a1a | 9.57:1 | ✅ PASS | ✅ PASS |
| Neon green on dark gray | #39ff14 on #1a1a1a | 12.84:1 | ✅ PASS | ✅ PASS |
| **Electric purple (#9b30ff) on black** | #9b30ff on #000 | **4.26:1** | ⚠️ **BORDERLINE** | ❌ FAIL |

### Issue Found

**Electric purple (#9b30ff) fails AA normal text requirement (needs 4.5:1)**

- Used for: `.skip-link` background, `::selection`, some accent borders
- At 4.26:1, this **fails WCAG AA** for any text using this color
- This color appears in:
  - Skip link button background (`--color-accent`)
  - Focus outline (`--color-accent`) - but focus indicators don't require contrast
  - `::selection` background - doesn't require contrast

### Additional CSS Bug (Non-contrast)

The `.skip-link` has:
```css
background: var(--color-accent);        /* electric purple #9b30ff */
color: var(--color-primary);            /* BUG: --color-primary is undefined! */
```

The variable `--color-primary` is not defined in base.css or theme.css. It would either:
- Fall back to browser default (typically black or currentcolor)
- If the browser resolves it as black on purple (#000 on #9b30ff), the ratio would be ~4.26:1 (same failure)

---

## 2. Keyboard Navigation with Tab Key

### Checkpoints Verified

| Test | Result |
|------|--------|
| Skip link present and functional | ✅ PASS |
| Skip link is first focusable element | ✅ PASS |
| Tab order follows visual layout | ✅ PASS |
| Focus visible on all interactive elements | ✅ PASS |
| Focus style has 2px outline with offset | ✅ PASS |

### Tab Order Sequence

```
1.  [Skip to main content] - skip-link
2.  [Phlix logo] - nav-logo (home link)
3.  [Toggle navigation] - nav-toggle (hamburger, visible on mobile)
4.  [Home] - nav menu link
5.  [Features] - nav menu link
6.  [Clients] - nav menu link
7.  [Download] - nav menu link
8.  [Plugins] - nav menu link
9.  [Docs] - nav menu link
10. [Hub] - nav menu link
11. [About] - nav menu link
12. [Get Phlix] - CTA button
13. [Read the docs] - CTA button
14. [See all features →] - text link
15. [Download Phlix] - CTA button (footer)
... (footer nav links continue)
```

### CSS Focus Style

```css
:focus-visible {
  outline: 2px solid var(--color-accent);  /* Electric purple outline */
  outline-offset: 2px;
  background: transparent;
}
```

**Issue:** The purple outline at 4.26:1 contrast on black fails WCAG AA, but since it's a focus indicator (not static content), contrast requirements technically don't apply.

---

## 3. ARIA Labels on Interactive Elements

### Checkpoints Verified

| Element | ARIA Attribute | Value | Status |
|---------|-----------------|-------|--------|
| nav-primary | role | "banner" | ✅ PASS |
| nav-primary | aria-label | "Primary navigation" | ✅ PASS |
| nav-logo | aria-label | "Phlix home" | ✅ PASS |
| nav-toggle | aria-label | "Toggle navigation" | ✅ PASS |
| nav-toggle | aria-expanded | "false" (initial) | ✅ PASS |
| nav-toggle | aria-controls | "nav-menu" | ✅ PASS |
| nav-menu | id | "nav-menu" | ✅ PASS |
| nav-menu | role | "list" | ✅ PASS |
| Nav links | aria-current | "page" (when active) | ✅ PASS |
| main | id | "main-content" | ✅ PASS |
| main | tabindex | "-1" | ✅ PASS |
| hero section | aria-labelledby | "hero-heading" | ✅ PASS |
| SVG icons | aria-hidden | "true" | ✅ PASS |
| feature-card articles | - | None | ⚠️ Could use role="article" |

### Missing ARIA (Minor)

- Feature cards (`<article class="feature-card">`) could use `aria-labelledby` pointing to their `<h3>` title for screen reader users browsing landmarks
- Footer columns `<div class="footer-col">` could use `role="contentinfo"` or be proper `<aside>` elements

---

## 4. Focus Trap in Mobile Nav

### Checkpoints Verified

| Test | Result |
|------|--------|
| Mobile nav exists with toggle | ✅ PASS |
| Toggle updates aria-expanded | ✅ PASS |
| Escape key closes mobile nav | ✅ PASS |
| Escape returns focus to toggle | ✅ PASS |
| Click on link closes mobile nav | ✅ PASS |
| **Focus remains in nav when open** | ❌ **FAIL** |

### Issue Found: No Focus Trap

**Location:** `variants/05-pixel-tech-3/js/main.js:11-43` and CSS `theme.css:818-834`

**Problem:** When the mobile nav is open (`is-open` class applied), there is **no focus trap**. A keyboard user can Tab outside the nav menu to:
- Background page content
- Footer links
- Any other focusable element outside the nav

**Expected Behavior:** When mobile nav is open, Tab/Shift+Tab should cycle only through the nav menu links. Focus should be constrained to the nav until the nav is closed.

**Current Mobile Nav CSS:**
```css
@media (width <= 768px) {
  .nav-menu {
    position: fixed;
    inset: 0;                        /* Covers viewport */
    /* ... */
    transform: translateX(100%);     /* Hidden off-screen */
    z-index: 999;
  }

  .nav-menu.is-open {
    transform: translateX(0);       /* Visible */
  }
}
```

**Current Mobile Nav JS:**
```javascript
// Close menu on escape - good
// Close menu when clicking a link - good
// BUT no focus trap implementation
```

### Recommended Fix

Add a focus trap when mobile nav opens:

```javascript
function trapFocus(element) {
  const focusableEls = element.querySelectorAll('a[href], button:not([disabled])');
  const firstFocusable = focusableEls[0];
  const lastFocusable = focusableEls[focusableEls.length - 1];

  element.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });
}
```

And call `trapFocus(menu)` when the mobile nav opens.

---

## Additional Findings

### Positive Notes
- Skip link present (`#main-content` target exists)
- `prefers-reduced-motion` respected for animations
- Semantic HTML structure (header, main, footer, nav, section, article)
- All SVG icons have `aria-hidden="true"` to hide from screen readers
- Form labels and relationships are properly associated
- Language attribute set (`lang="en"`)

### Accessibility Improvements Suggested

1. **High Priority:**
   - Fix `.skip-link` color variable bug (`--color-primary` undefined)
   - Implement focus trap in mobile navigation

2. **Medium Priority:**
   - Use a darker purple or add purple text on lighter backgrounds to pass AA
   - Add `role="article"` and `aria-labelledby` to feature cards

3. **Low Priority:**
   - Add `lang` attribute to any foreign language text spans
   - Consider `aria-describedby` for icon-only buttons

---

## Test Commands Used

```bash
# Contrast analysis
python3 -c "
# (see contrast calculations above)
"

# File structure check
ls -la variants/05-pixel-tech-3/
```

---

## Conclusion

| Criterion | Verdict |
|-----------|---------|
| WCAG AA Contrast | ⚠️ 1 FAIL (electric purple), rest PASS |
| Keyboard Navigation | ✅ PASS |
| ARIA Labels | ✅ PASS |
| Focus Trap (Mobile Nav) | ❌ FAIL |

**Overall: Needs remediation before production release**

The variant shows good accessibility fundamentals but has two issues requiring fixes:
1. Electric purple at 4.26:1 fails AA for any text uses
2. Mobile nav lacks focus trap, allowing keyboard users to escape
