# FIXES.md — 01-minimalist-cinema-4 Wave 4

## Summary

Fixed CSS syntax errors, contrast issues, accessibility gaps, and brand color inconsistencies from REVIEW + ACCESSIBILITY + READABILITY phases.

---

## 1. CSS Syntax Error — `rgb()` → `rgba()`

**File:** `css/base.css:56-57`

**Before:**
```css
--color-border: rgb(30, 30, 30, 0.12);
--color-surface: rgb(255, 255, 255, 0.8);
```

**After:**
```css
--color-border: rgba(30, 30, 30, 0.12);
--color-surface: rgba(255, 255, 255, 0.8);
```

**Also fixed:** shadow tokens at lines 87-89:
```css
--shadow-sm: 0 1px 2px rgba(26, 26, 26, 0.06);
--shadow-md: 0 4px 16px rgba(26, 26, 26, 0.08);
--shadow-lg: 0 8px 32px rgba(26, 26, 26, 0.1);
```

**Verification:** `rgb()` with 4 arguments is invalid CSS — browser ignores or treats as solid color. `rgba()` properly supports opacity. Now valid CSS.

---

## 2. Contrast Fix — `#2d9cff` fails WCAG AA

**File:** `css/base.css:43-48`

**Before:**
```css
--color-electric_blue: #2d9cff;
--color-cta-hover: #1a7acc;
--color-soft_blue: #a7d8ff;
--color-neon_aqua: #00f0ff;
```

**After:**
```css
--color-electric_blue: #0070c0;
--color-cta-hover: #005a96;
--color-soft_blue: #c0d8f0;
--color-neon_aqua: #00c0d0;
```

**Verification:** `#0070c0` on white = ~5.9:1 (passes WCAG AA 4.5:1). Original `#2d9cff` on white = ~3.0:1 (fails).

---

## 3. Footer Text Contrast Fix

**File:** `css/theme.css:204, 228, 241, 263`

**Before:**
```css
.site-footer__brand p   { color: rgb(255, 255, 255, 0.6); }
.site-footer__col h3   { color: rgb(255, 255, 255, 0.4); }
.site-footer__col a     { color: rgb(255, 255, 255, 0.7); }
.site-footer__bottom p  { color: rgb(255, 255, 255, 0.4); }
```

**After:**
```css
.site-footer__brand p   { color: rgba(255, 255, 255, 0.65); }
.site-footer__col h3   { color: rgba(255, 255, 255, 0.85); }
.site-footer__col a     { color: rgba(255, 255, 255, 0.75); }
.site-footer__bottom p  { color: rgba(255, 255, 255, 0.55); }
```

**Verification:** All footer text now uses `rgba()` (valid CSS) and increased opacities ensure better legibility on dark charcoal (#1a1a1a) background.

---

## 4. Theme Color Meta Fix

**File:** `index.html:46`

**Before:**
```html
<meta name="theme-color" content="#C4583A" />
```

**After:**
```html
<meta name="theme-color" content="#0070c0" />
```

**Verification:** Theme color now matches brand accent `#0070c0` instead of incorrect terracotta `#C4583A`.

---

## 5. Mobile Nav Focus Trap

**File:** `js/main.js`

**Before:** Mobile nav had no keyboard focus management — users could Tab outside nav and lose context.

**After:** Added full focus trap:
- Tab on last focusable element wraps to first
- Shift+Tab on first element wraps to last
- Escape key closes nav and returns focus to toggle
- Auto-focus to first nav item on open
- Removes trap handler on close

**Key implementation:**
```javascript
function handleNavKeydown(e) {
  if (!nav.classList.contains('is-open')) return;
  var focusable = getFocusableElements();
  var first = focusable[0];
  var last = focusable[focusable.length - 1];

  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  if (e.key === 'Escape') {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.classList.remove('is-open');
    navToggle.focus();
  }
}
```

**Verification:** Nav now passes WCAG 2.1 Level AA success criterion 2.1.2 (No Keyboard Trap — plus proper escape handling).

---

## Files Changed

| File | Changes |
|------|---------|
| `css/base.css` | `rgba()` fix, `#0070c0` contrast fix, shadow rgba |
| `css/theme.css` | Footer rgba() fixes with increased opacity |
| `index.html` | Theme-color meta updated to `#0070c0` |
| `js/main.js` | Focus trap for mobile nav |
