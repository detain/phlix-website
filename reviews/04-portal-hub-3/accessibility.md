# Accessibility Review — 04-portal-hub-3

**Reviewer:** Accessibility Reviewer (Wave 3)
**Date:** 2026-05-21
**Files Reviewed:** `index.html`, `css/base.css`, `css/theme.css`, `css/components.css`, `js/main.js`

---

## Executive Summary

**Verdict:** Requires Minor Corrections

This variant demonstrates solid foundational accessibility practices with proper semantic HTML, ARIA landmarks, keyboard navigation support, and a functional skip link. However, **one critical bug** (broken `aria-labelledby` references) and **one significant color contrast issue** require fixing before this variant can be considered fully accessible.

**WCAG 2.1 Level:** AA compliance with minor issues

---

## Critical Issues (Must Fix)

### Issue 1: Broken `aria-labelledby` References

**WCAG Criterion:** 1.3.1 Info and Relationships  
**Severity:** Critical

**Problem:**  
Multiple `<section>` elements use `aria-labelledby` pointing to heading `id` attributes that **do not exist** in the DOM:

| Section | `aria-labelledby` Value | Expected `id` on `<h2>` | Status |
|---------|------------------------|-------------------------|--------|
| Hero | `hero-heading` | `id="hero-heading"` | Missing |
| Pitch | `pitch-heading` | `id="pitch-heading"` | Missing |
| Features Overview | `features-overview-heading` | `id="features-overview-heading"` | Missing |
| CTA Banner | `cta-banner-heading` | `id="cta-banner-heading"` | Missing |

**Current code:**
```html
<section class="hero" aria-labelledby="hero-heading">
  <h1 id="hero-heading">Your media. Your library. Your Phlix.</h1>
```

The `h1` heading exists but the `id="hero-heading"` is on the wrong element. The section's `aria-labelledby="hero-heading"` points to... nothing. Screen readers will announce "hero heading (text missing)" or skip the label entirely.

**Fix:**  
Add the corresponding `id` attributes to each heading:
```html
<h2 id="pitch-heading">> Why Phlix?</h2>
```

> **Note:** The hero uses `h1` (correct for page title), but `aria-labelledby="hero-heading"` should reference `id="hero-heading"` on that `h1`.

---

### Issue 2: Insufficient Color Contrast for Secondary Text

**WCAG Criterion:** 1.4.3 Contrast (Minimum)  
**Severity:** Significant

**Problem:**  
The secondary/muted text color `#1A4D1A` (`--color-muted`) used throughout the site **fails WCAG AA** for normal text (requires 4.5:1).

**Contrast analysis:**
| Foreground | Background | Contrast Ratio | WCAG AA Required | Status |
|------------|------------|----------------|------------------|--------|
| `#1A4D1A` (muted) | `#001A00` (secondary bg) | ~3.5:1 | 4.5:1 | ❌ FAIL |
| `#1A4D1A` (muted) | `#0D1A0D` (primary bg) | ~2.8:1 | 4.5:1 | ❌ FAIL |

**Where used:**
- `.hero-sub` — paragraph text
- `.pitch-bullets li` — feature bullet points
- `.feature-card p` — card descriptions
- `.nav-menu a` — navigation links

**Fix:**  
Increase the luminance of `--color-muted` to meet 4.5:1. Suggested fix in `base.css`:

```css
:root {
  /* Current (fails) */
  --color-muted: #1A4D1A;

  /* Fixed — approximately 4.8:1 on #001A00 */
  --color-muted: #2A7A2A;
}
```

Or choose a lighter shade that maintains the CRT terminal aesthetic while passing contrast requirements.

---

## Notable Strengths

### Skip Link
```html
<a class="skip-link" href="#main-content">Skip to main content</a>
```
Properly positioned off-screen until focused, visible on focus with good styling. ✓

### ARIA Landmarks
Correct use of `role="banner"`, `role="navigation"`, `role="contentinfo"` on semantic wrappers. Navigation has `aria-label="Primary navigation"` and `aria-label="Footer navigation"`. ✓

### Focus Visibility
```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```
Appropriate focus indicator that doesn't rely solely on color. ✓

### Keyboard Navigation
- Mobile nav toggle properly toggles `aria-expanded` ✓
- `aria-controls` links the toggle to the menu ✓
- Escape key closes menu and returns focus to toggle ✓
- Outside click closes menu ✓

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Also implemented in JavaScript. ✓

### Decorative Icons
```html
<div class="feature-icon" aria-hidden="true">
  <svg width="24" height="24" ...>
</div>
```
All decorative SVGs correctly hidden from screen readers. ✓

### Image Alt Text
```html
<img src="./img/logo.svg" alt="Phlix logo" width="120" height="36">
```
Descriptive alt text for the logo. ✓

### Semantic List Structure
Lists use proper `<ul>`/`<li>` with appropriate `role="list"` for redundancy. ✓

### Buttons with Adequate Touch Targets
```css
min-height: 44px;
min-width: 44px;
```
Buttons meet 44x44px minimum touch target size. ✓

---

## Minor Issues (Recommended)

### Issue 3: Missing `id` on Footer Heading Groups

**WCAG Criterion:** 2.4.6 Headings and Labels  
**Severity:** Minor

**Problem:**  
The footer uses heading elements inside `nav` without being referenced by any `aria-labelledby`:
```html
<nav class="footer-nav" aria-label="Footer navigation">
  <div class="footer-col">
    <h3>Product</h3>
    ...
  </div>
```

**Impact:** Low — `aria-label` on `<nav>` provides sufficient context.

**Fix (optional):** Add `id` attributes to footer headings for future-proofing:
```html
<h3 id="footer-product-heading">Product</h3>
```

---

### Issue 4: `role="list"` Redundancy

**WCAG Criterion:** 4.1.2 Name, Role, Value (Best Practice)  
**Severity:** Minor

**Problem:**
```html
<ul class="nav-menu" id="nav-menu" role="list">
<ul role="list">
```

`role="list"` on a `<ul>` is redundant since `<ul>` already has the list role implicitly. While this doesn't break anything, it's unnecessary noise.

**Impact:** Extremely low — redundant ARIA is ignored by screen readers.

---

### Issue 5: Animation Flicker on Hero Eyebrow

**WCAG Criterion:** 2.3.1 Three Flashes or Below Threshold  
**Severity:** Minor

**Problem:**
```css
@keyframes flicker {
  0%, 100% { opacity: 1; }
  92%       { opacity: 1; }
  93%       { opacity: 0.8; }
  94%       { opacity: 1; }
  96%       { opacity: 0.9; }
  97%       { opacity: 1; }
}
```

The flicker animation causes opacity dips to 0.8 and 0.9. While above the "three flashes" threshold, the animation is **distracting and potentially problematic** for users with photosensitivity or vestibular disorders.

**Current mitigation:** `prefers-reduced-motion` is implemented, but the flicker animation is not explicitly disabled for reduced-motion users in CSS.

**Fix (optional):** Add to `components.css` reduced-motion block:
```css
@media (prefers-reduced-motion: reduce) {
  .hero-eyebrow {
    animation: none !important;
    opacity: 1;
  }
}
```

---

## Verdict

| Category | Status |
|----------|--------|
| Perceivable | ⚠️ Color contrast issue |
| Operable | ✓ Good |
| Understandable | ✓ Good |
| Robust | ✓ Good |

**Required actions before approval:**
1. Fix broken `aria-labelledby` references by adding missing `id` attributes to headings
2. Increase `--color-muted` contrast to meet 4.5:1 ratio

**Recommended actions:**
3. Disable flicker animation for `prefers-reduced-motion` users
4. Remove redundant `role="list"` attributes

---

*Review generated by Accessibility Reviewer — Wave 3*
