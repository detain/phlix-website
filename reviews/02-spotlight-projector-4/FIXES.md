# FIXES Applied - 02-spotlight-projector-4 (Wave 4)

## Issues Fixed

### 1. `--color-muted` undefined CSS variable (Accessibility + Readability)
- **Problem**: `--color-muted` was used throughout theme.css and components.css but never defined in base.css, causing it to fall back to an inaccessible color with ~3.74:1 contrast on dark backgrounds.
- **Fix**: Added `--color-muted: #a3988c;` to the semantic aliases section in base.css. This warm gray provides 4.5:1+ contrast ratio on the dark background.

### 2. Feature card text at 15px instead of 16px (Readability)
- **Problem**: Feature card text was styled at `0.9375rem` (15px) which was below the recommended 16px minimum.
- **Fix**: Changed `font-size` from `0.9375rem` to `1rem` in the `.feature-card p` selector in components.css.

## Files Modified
- `variants/02-spotlight-projector-4/css/base.css` (line ~66: added `--color-muted` definition)
- `variants/02-spotlight-projector-4/css/components.css` (line ~241-244: updated font-size to 1rem)

## Overall Result
**PASS** - Both accessibility and readability issues have been resolved:
- `--color-muted` is now properly defined with a contrast ratio meeting WCAG AA standards (4.5:1+)
- Feature card body text now meets the 16px minimum size requirement
