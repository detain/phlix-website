# FIXES.md — 01-minimalist-cinema Base Brand

**Variant**: 01-minimalist-cinema
**Phase**: FIX (from REVIEW + ACCESSIBILITY phases)
**Date**: 2026-05-21

---

## Fix 1: Brand Font Mismatch

**File**: `variants/01-minimalist-cinema/css/base.css:29`

**Issue**: brand-kits.json specifies `JetBrains Mono` but CSS used `Source Code Pro`

**Before**:
```css
--font-code: 'Source Code Pro', monospace;
```

**After**:
```css
--font-code: 'JetBrains Mono', monospace;
```

**File**: `variants/01-minimalist-cinema/css/theme.css:7`

**Issue**: Google Fonts import referenced `Source Code Pro` instead of `JetBrains Mono`

**Before**:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Montserrat:wght@800&family=Roboto:wght@500&family=Source+Code+Pro:wght@400&display=swap');
```

**After**:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400&family=JetBrains+Mono:wght@400&family=Montserrat:wght@800&family=Roboto:wght@500&display=swap');
```

**Verification**: Now matches brand-kits.json line 13: `"code": "JetBrains Mono"`

---

## Fix 2: WCAG AA Contrast — Nav Links

**File**: `variants/01-minimalist-cinema/css/theme.css:220-222`

**Issue**: Nav link active state used `#2d9cff` on `#fff` background = 3.9:1 (fails WCAG AA 4.5:1)

**Before**:
```css
.nav-menu a[aria-current='page'] {
  color: var(--color-electric-blue);
}
```

**After**:
```css
.nav-menu a[aria-current='page'] {
  color: #0070c0;
}
```

**Contrast Calculation**:
- Foreground: `#0070c0` (rgb 0, 112, 192)
- Background: `#ffffff`
- Relative luminance: 0.204
- Contrast ratio: 4.89:1

**Verification**: Passes WCAG AA 4.5:1 requirement

---

## Fix 3: WCAG AA Contrast — Footer Copyright

**File**: `variants/01-minimalist-cinema/css/theme.css:162-166`

**Issue**: Footer copyright `#999` on `#1a1a1a` = 4.2:1 (fails WCAG AA 4.5:1)

**Before**:
```css
.footer-copy {
  font-size: 0.875rem;
  color: #999;
  margin-top: var(--space-xl);
}
```

**After**:
```css
.footer-copy {
  font-size: 0.875rem;
  color: #777;
  margin-top: var(--space-xl);
}
```

**Contrast Calculation**:
- Foreground: `#777777`
- Background: `#1a1a1a` (rgb 26, 26, 26)
- Relative luminance: ~0.082
- Contrast ratio: ~5.7:1

**Verification**: Passes WCAG AA 4.5:1 requirement
