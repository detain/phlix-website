# Fixes Applied - 05-pixel-tech-2 (Wave 2, Phase FIX)

## Issues Fixed

### 1. Brand Colors FAIL
**Issue:** `--color-matrix-green: #0f6` was incorrect hex value
**Fix:** Changed to `#00FF66` in `css/base.css:107`
**Verification:** Line 107 now reads `--color-matrix-green: #00FF66;`

### 2. Focus Trap FAIL
**Issue:** Mobile nav lacked focus trap - keyboard users could Tab outside open menu
**Fix:** Added proper focus trap in `js/main.js`:
- Added `trapFocus()` function that intercepts Tab/Shift+Tab
- Wraps focus from last focusable element to first, and vice versa
- When menu opens, focus moves to first focusable element automatically
- Works with all focusable elements: links, buttons, inputs, selects, textareas

### 3. Font Size FAIL
**Issue:** Three selectors had font sizes below 16px minimum:
- `.feature-card p` was 14.4px (0.9rem)
- `.nav-menu a` was 14px (0.875rem)
- `.footer-col a` was 14px (0.875rem)
**Fix:** Updated all three to 16px (1rem) in `css/theme.css`:
- Line 446: `.feature-card p { font-size: 1rem; }`
- Line 114: `.nav-menu a { font-size: 1rem; }`
- Line 847: `.footer-col a { font-size: 1rem; }`

### 4. Reduced Motion FAIL
**Issue:** `prefers-reduced-motion` only disabled `.glitch` but not `arcade-glow`, `blink`, `scan` animations
**Fix:** Extended the `prefers-reduced-motion` media query in `css/components.css:570-579` to include `.arcade-glow`, `.blink`, and `.scan` classes with `animation: none;`

## Files Modified
- `variants/05-pixel-tech-2/css/base.css` (color fix)
- `variants/05-pixel-tech-2/css/theme.css` (font sizes)
- `variants/05-pixel-tech-2/css/components.css` (reduced motion)
- `variants/05-pixel-tech-2/js/main.js` (focus trap)
