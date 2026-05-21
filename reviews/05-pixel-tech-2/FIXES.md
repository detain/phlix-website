# Wave 2 Fixes - 05-pixel-tech-2 (Arcade Cabinet)

**Date:** 2026-05-21
**Variant:** 05-pixel-tech-2

---

## Fixes Applied

### Fix 1: Corrected primary colors to match brand-kit

**File:** `variants/05-pixel-tech-2/css/base.css`
**Lines:** 101-103

**Before:**
```css
--color-neon-green: #00ff41;
--color-black: #0d0d0d;
--color-silver: #e8e8e8;
```

**After:**
```css
--color-neon-green: #39FF14;
--color-black: #000;
--color-silver: #c0c0c0;
```

**Reason:** Brand-kit specifies neon_green: #39FF14, black: #000000, silver: #C0C0C0.

### Fix 2: Corrected matrix-green color

**File:** `variants/05-pixel-tech-2/css/base.css`
**Line:** 107

**Before:**
```css
--color-matrix-green: #00ff41;
```

**After:**
```css
--color-matrix-green: #0F6;
```

**Reason:** Brand-kit specifies matrix_green: #00FF66 (shorthand #0F6).

### Fix 3: Corrected font families to match brand-kit

**File:** `variants/05-pixel-tech-2/css/base.css`
**Lines:** 121-125

**Before:**
```css
--font-headline: 'Share Tech Mono', 'Courier New', courier, monospace;
--font-body: 'Fira Sans', system-ui, -apple-system, sans-serif;
--font-ui: 'Roboto Mono', 'Courier New', courier, monospace;
--font-code: 'Roboto Mono', 'Courier New', courier, monospace;
```

**After:**
```css
--font-headline: 'Orbitron', monospace;
--font-body: 'Inter', sans-serif;
--font-ui: 'Roboto Mono', monospace;
--font-code: 'JetBrains Mono', monospace;
```

**Reason:** Brand-kit specifies Orbitron Bold (headline), Inter Medium (body), Roboto Mono (ui), JetBrains Mono (code).

### Fix 4: Updated @font-face declarations to match brand fonts

**File:** `variants/05-pixel-tech-2/css/theme.css`
**Lines:** 9-43

**Before:**
```css
@font-face {
  font-family: 'Share Tech Mono';
  src: url('../fonts/ShareTechMono-Regular.ttf') format('truetype');
  ...
}
@font-face {
  font-family: 'Fira Sans';
  ...
}
...
```

**After:**
```css
@font-face {
  font-family: 'Orbitron';
  src: url('../fonts/orbitron-bold-700.woff2') format('woff2');
  font-weight: 700;
  ...
}
@font-face {
  font-family: 'Inter';
  src: url('../fonts/inter-medium-500.woff2') format('woff2');
  font-weight: 500;
  ...
}
...
```

**Reason:** Font files must match the brand-kit specification.

### Fix 5: Fixed body background color in CRT effect

**File:** `variants/05-pixel-tech-2/css/base.css`
**Line:** 74

**Before:**
```css
background:
  radial-gradient(ellipse at center, rgba(57, 255, 20, 0.02) 0%, transparent 70%),
  linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%);
```

**After:**
```css
background:
  radial-gradient(ellipse at center, rgba(57, 255, 20, 0.02) 0%, transparent 70%),
  linear-gradient(180deg, #000 0%, #1a1a1a 50%, #000 100%);
```

**Reason:** CSS shorthand for #000000 is #000.

---

## Summary

| Fix | Status | Impact |
|-----|--------|--------|
| Correct primary colors (neon-green, black, silver) | APPLIED | High |
| Correct matrix-green color | APPLIED | Medium |
| Correct font families | APPLIED | High |
| Update @font-face declarations | APPLIED | High |
| Fix body background color | APPLIED | Low |

**Total fixes applied: 5**
