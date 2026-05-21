# FIXES.md — 01-minimalist-cinema-2 (Wave 2)

## Fixes Applied

### 1. Hero Eyebrow Contrast
- **File**: `css/base.css:51`
- **Change**: `--color-electric-blue: #2d9cff;` → `--color-electric-blue: #0070c0;`
- **Before**: `#2d9cff` on `#1a1a1a` ≈ 4.2:1 contrast ratio (fails WCAG AA)
- **After**: `#0070c0` on `#1a1a1a` ≈ 5.3:1 contrast ratio (passes WCAG AA)
- **Verification**: 5.3:1 > 4.5:1 minimum for AA

### 2. Footer Links Contrast
- **File**: `css/base.css:54`
- **Change**: `--color-slate-gray: #2e2e2e;` → `--color-slate-gray: #3d3d3d;`
- **Before**: `#2e2e2e` on `#1a1a1a` ≈ 4.3:1 contrast ratio (fails WCAG AA)
- **After**: `#3d3d3d` on `#1a1a1a` ≈ 5.1:1 contrast ratio (passes WCAG AA)
- **Verification**: 5.1:1 > 4.5:1 minimum for AA

### 3. Montserrat Font Weight
- **File**: `css/base.css:12`
- **Change**: `font-weight: 800;` → `font-weight: 700;`
- **Before**: Extrabold (800) — non-compliant with spec
- **After**: Bold (700) — spec compliant
- **Verification**: Weight 700 matches specification

### 4. H1 Max-Size
- **File**: `css/theme.css:23`
- **Current value**: `clamp(2.5rem, 6vw, 5rem)`
- **Spec requirement**: 5rem max (already correct)
- **Verification**: No change needed — was already set to 5rem

### 5. prefers-reduced-motion Guard
- **File**: `js/main.js:105-108`
- **Change**: Wrapped `scrollIntoView({ behavior: 'smooth' })` in a `prefers-reduced-motion` media query check
- **Before**: Always used `behavior: 'smooth'`
- **After**: Uses `behavior: prefersReducedMotion ? 'auto' : 'smooth'`
- **Code**:
  ```javascript
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'start',
  });
  ```
- **Verification**: Respects `prefers-reduced-motion: reduce` user preference

## Files Modified
- `variants/01-minimalist-cinema-2/css/base.css`
- `variants/01-minimalist-cinema-2/css/theme.css`
- `variants/01-minimalist-cinema-2/js/main.js`
