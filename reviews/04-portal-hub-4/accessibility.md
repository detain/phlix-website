# Accessibility Review: 04-portal-hub-4

**Reviewer**: Accessibility Reviewer (Wave 4)
**Date**: 2026-05-21
**Files Reviewed**: `index.html`, `css/base.css`, `js/main.js`

---

## Summary

| Category | Status | Issues Found |
|----------|--------|-------------|
| Contrast | ❌ FAIL | 1 critical |
| Keyboard Nav | ⚠️ MINOR | 1 minor |
| ARIA | ⚠️ MINOR | 1 minor |
| Semantic HTML | ✅ PASS | — |

---

## 1. Contrast

### ❌ CRITICAL: Secondary Text Color Fails WCAG AA

**Location**: `css/base.css` line 17

```css
--color-text-secondary: #64748B;
```

**Problem**: The gray text color `#64748B` on white background `#FFFFFF` has a contrast ratio of approximately **3.1:1**, which fails WCAG 2.1 Level AA minimum requirement of **4.5:1** for normal body text.

**Impact**: Any paragraph or text using `--color-text-secondary` (e.g., pitch items, feature descriptions, subtitles) is difficult to read for users with low vision or in suboptimal lighting conditions.

**Calculation**:
- `#64748B` → RGB(100, 116, 139)
- Relative luminance ≈ 0.29
- White luminance = 1.0
- Contrast ratio = (1.0 + 0.05) / (0.29 + 0.05) = **3.08:1**

**Recommendation**: Change `--color-text-secondary` to a value with at least 4.5:1 contrast. Suggested: `#475569` (Slate-600) which yields ~5.9:1, or `#334155` (Slate-700) for ~7.2:1.

---

## 2. Keyboard Navigation

### ⚠️ MINOR: Empty `<span>` Elements Inside Menu Toggle

**Location**: `index.html` lines 58-60

```html
<button class="menu-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="main-nav">
    <span></span>
    <span></span>
    <span></span>
</button>
```

**Problem**: The three `<span>` elements inside the button contain no text content. While `aria-label` provides an accessible name for the button itself, the empty spans are unnecessary and add no semantic value.

**Recommendation**: Either remove the spans if they're purely decorative (CSS handles styling), or consolidate into a single element with `aria-hidden="true"`.

---

### ✅ Positive Findings: Keyboard Navigation

- **Skip link** (line 31): Properly implemented with correct positioning and focus styling
- **Focus trap in mobile menu** (main.js lines 31-55): Correctly implemented for Tab/Shift+Tab cycling
- **Escape key handling** (main.js lines 22-28): Properly closes menu and returns focus to toggle
- **Focus-visible styles** (base.css lines 109-113, 128-131): Consistent 2px accent-colored outline with 2px offset
- **Touch targets** (base.css lines 209-214): Minimum 44px touch target for links and buttons
- **prefers-reduced-motion** support (base.css lines 70-80, main.js lines 112-115): Correctly disables animations when requested

---

## 3. ARIA

### ⚠️ MINOR: Redundant Landmark Roles

**Location**: `index.html` lines 33, 65, 256

```html
<header class="site-header" role="banner">
<main id="main" role="main">
<footer class="site-footer" role="contentinfo">
```

**Problem**: These are known ARIA landmark roles that are **implicitly assigned** to their respective HTML5 elements. Explicitly adding them is redundant (though not harmful) and suggests potential unfamiliarity with semantic HTML.

**Recommendation**: Remove the redundant `role` attributes since `<header>`, `<main>`, and `<footer>` already have the implicit roles. Keep `role="navigation"` on `<nav>` since there is no implicit role for navigation (only landmark designation).

---

### ✅ Positive Findings: ARIA

- **aria-labelledby** on sections correctly references heading IDs
- **aria-expanded/aria-controls** on mobile menu toggle correctly reflect state
- **aria-hidden** on decorative SVGs prevents screen reader announcement
- **Screen-reader-only heading** (line 80): `id="pitch-title"` with `class="sr-only"` provides proper association without visible text
- **Logo aria-label** (line 35): Provides clear "Phlix home" label for screen reader users

---

## 4. Semantic HTML

### ✅ PASS: All Checks Passed

**Positive findings**:

| Element | Usage | Assessment |
|---------|-------|------------|
| `<html lang="en">` | Line 2 | ✅ Correct language attribute |
| Skip link | Line 31 | ✅ Valid skip link targeting `#main` |
| `<header>` | Line 33 | ✅ Landmark element |
| `<nav>` with `aria-label` | Line 47 | ✅ Explicit "Main navigation" label |
| `<main>` | Line 65 | ✅ Single main content area |
| `<section>` with `aria-labelledby` | Lines 66, 78, 135, 244 | ✅ All sections properly labeled |
| `<h1>` | Line 69 | ✅ Single, page-level heading |
| `<article>` for cards | Lines 141, 154, etc. | ✅ Proper composition widgets |
| Heading hierarchy | h2 for sections, h3 for cards | ✅ Logical nesting |
| `<footer>` | Line 256 | ✅ Landmark element |

---

## Recommendations Summary

### Must Fix (Critical)

1. **Contrast ratio**: Change `--color-text-secondary` from `#64748B` to `#475569` or darker to meet 4.5:1 WCAG AA requirement.

### Should Fix (Minor)

2. **Empty spans**: Remove empty `<span>` elements inside `.menu-toggle` button, or use a single `<span aria-hidden="true">` for the hamburger icon.

3. **Redundant roles**: Remove `role="banner"`, `role="main"`, and `role="contentinfo"` from their respective implicit elements.

### Good Practices Already in Place

- Skip link for keyboard users
- Focus trap in mobile menu
- Escape key closes menu
- prefers-reduced-motion respected
- Consistent focus-visible styling
- Proper heading hierarchy
- ARIA labeling for navigation and sections
- aria-hidden on decorative icons

---

## Verdict

**Overall: ⚠️ NEEDS MINOR FIX**

The page is well-structured with solid keyboard navigation foundations and proper semantic HTML. However, the **text contrast failure is a critical WCAG AA violation** that must be addressed before production use. The other issues are minor but should be cleaned up for best practices.
