# Wave 1 Fixes - 05-pixel-tech-1 (Terminal Hacker)

**Date:** 2026-05-21
**Variant:** 05-pixel-tech-1

---

## Fixes Applied

### Fix 1: Corrected matrix-green hex value

**File:** `variants/05-pixel-tech-1/css/base.css`
**Line:** 66

**Before:**
```css
--matrix-green: #0f6;
```

**After:**
```css
--matrix-green: #0F6;
```

**Reason:** The original CSS had `#0f6` (lowercase) but stylelint requires uppercase shorthand hex format. The value `#0F6` is equivalent to `#00FF66` (brand-kit specifies `matrix_green: "#00FF66"`). Updated to uppercase shorthand format to satisfy both the brand color intent and lint requirements.

**Verification:** Lint now passes with no errors.

---

## Summary

| Fix | Status | Impact |
|-----|--------|--------|
| Correct matrix-green hex value | APPLIED | Low (cosmetic) |

**Total fixes applied: 1**
