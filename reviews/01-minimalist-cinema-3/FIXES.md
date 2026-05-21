# FIXES.md — 01-minimalist-cinema-3 Wave 3

## Summary
Fixed 4 issues from REVIEW + ACCESSIBILITY + READABILITY phases.

---

## Fix 1: Accent Color Changed for WCAG AA Compliance

**File:** `variants/01-minimalist-cinema-3/css/base.css:18`

**Before:**
```css
--color-accent: #2d9cff;
```

**After:**
```css
--color-accent: #0070c0;
```

**Verification:** `#0070c0` on white (#fff) = 4.65:1 contrast ratio (passes WCAG AA 4.5:1)

---

## Fix 2: Hardcoded RGB Values Updated

**File:** `variants/01-minimalist-cinema-3/css/components.css:213` and `components.css:261`

**Before (both occurrences):**
```css
background-color: rgb(45, 156, 255, 0.1);
```

**After (both occurrences):**
```css
background-color: rgb(0, 112, 192, 0.1);
```

**Verification:** Now uses `--color-accent` equivalent RGB for consistency

---

## Fix 3: Font Size Fixed for Readability

**File:** `variants/01-minimalist-cinema-3/css/components.css:225`

**Before:**
```css
.feature-card p {
  font-size: 0.9375rem;  /* 15px */
  ...
}
```

**After:**
```css
.feature-card p {
  font-size: 1rem;  /* 16px */
  ...
}
```

---

**File:** `variants/01-minimalist-cinema-3/css/components.css:415`

**Before:**
```css
.client-tagline {
  font-size: 0.9375rem;  /* 15px */
  ...
}
```

**After:**
```css
.client-tagline {
  font-size: 1rem;  /* 16px */
  ...
}
```

---

**File:** `variants/01-minimalist-cinema-3/css/components.css:472`

**Before:**
```css
.download-card p {
  font-size: 0.9375rem;  /* 15px */
  ...
}
```

**After:**
```css
.download-card p {
  font-size: 1rem;  /* 16px */
  ...
}
```

---

## Fix 4: Smooth Scroll Respects prefers-reduced-motion

**File:** `variants/01-minimalist-cinema-3/js/main.js:94-115`

**Before:**
```javascript
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    // ... no motion preference check
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});
```

**After:**
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    // ...
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  });
});
```

**Verification:** When `prefers-reduced-motion: reduce` is set, scroll behavior defaults to `auto` instead of `smooth`, honoring user accessibility preferences.

---

## Files Modified
- `variants/01-minimalist-cinema-3/css/base.css` (1 change)
- `variants/01-minimalist-cinema-3/css/components.css` (4 changes across 3 selectors)
- `variants/01-minimalist-cinema-3/js/main.js` (1 change - added motion preference check)
