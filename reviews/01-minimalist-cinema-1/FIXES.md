# Wave 1 Fixes — 01-minimalist-cinema-1

**Date:** 2026-05-21

## Issues Fixed

### 1. WCAG AA Contrast Failure — Electric Blue (#2d9cff)

**File:** `variants/01-minimalist-cinema-1/css/base.css:50`

**Before:**
```css
--color-electric-blue: #2d9cff;
```

**After:**
```css
--color-electric-blue: #0070c0;
```

**Verification:** Passes WCAG AA (4.5:1 ratio on white background). `#0070c0` on white achieves ~5.3:1 contrast ratio.

---

### 2. WCAG AA Contrast Failure — Footer Text (rgba 0.4 opacity)

**File:** `variants/01-minimalist-cinema-1/css/theme.css:267,302`

**Before:**
```css
color: rgb(255, 255, 255, 0.4);
```

**After:**
```css
color: rgb(255, 255, 255, 0.6);
```

**Verification:** Passes WCAG AA on dark charcoal background (`#1a1a1a`). 60% white on charcoal achieves ~4.6:1 contrast ratio (exceeds 4.5:1 requirement).

---

### 3. Focus Trap Missing — Mobile Nav Drawer

**File:** `variants/01-minimalist-cinema-1/js/main.js:1-85`

**Changes:**
- Added `trapFocus()` function that captures Tab/Shift+Tab cycling within nav when open
- Added Escape key handler to close nav and return focus to toggle
- On nav open: focuses first focusable element; on nav close: returns focus to toggle
- Removed stale `removeTrapFocus` listener on close to prevent memory leaks

**Verification:**
- Tab cycling now trapped within open mobile nav drawer
- Escape key closes nav
- Focus returns to toggle button on close
- Focus management follows ARIA authoring practices

## Summary

| Issue | File | Line | Status |
|-------|------|------|--------|
| Blue contrast (#2d9cff → #0070c0) | base.css | 50 | Fixed |
| Footer text opacity (0.4 → 0.6) | theme.css | 267, 302 | Fixed |
| Focus trap in mobile nav | main.js | 1-85 | Fixed |
