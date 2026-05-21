# READABILITY Review - 02-spotlight-projector-3 (Wave 3)

## Font Sizes

### Body text size check (min 16px)
- **Body text**: `1.0625rem` (17px) in `base.css:127` ✅ PASS
- **Hero sub text**: `1.125rem` (18px) in `components.css:131` ✅ PASS
- **Pitch bullet text**: `1rem` (16px) in `components.css:172` ✅ PASS
- **Feature card paragraph**: `0.9375rem` (15px) in `components.css:242` ❌ FAIL - below 16px minimum
- **Footer nav links**: `0.875rem` (14px) in `theme.css:212` ❌ FAIL - below 16px minimum
- **Footer column headings**: `0.75rem` (12px) in `theme.css:196` ❌ FAIL - well below 16px minimum

### Heading hierarchy check
- H1: `clamp(2.25rem, 5vw, 3.75rem)` ✅
- H2: `clamp(1.75rem, 4vw, 2.75rem)` ✅
- H3: `clamp(1.375rem, 3vw, 1.875rem)` ✅
- Heading hierarchy is well-defined and scales appropriately.

## Line Heights & Spacing

### Line height adequacy (1.5+ for body)
- Body line-height: `1.7` in `base.css:128` ✅ PASS
- Hero sub line-height: `1.75` in `components.css:135` ✅ PASS

### Paragraph margins
- Paragraph bottom margin: `1rem` (`var(--space-md)`) in `theme.css:49` ✅
- Consistent spacing system using CSS custom properties.

## Contrast

### Text contrast check
- **Primary text** (`--color-warm-white: #fff7e6`) on black background (#000) provides ~16.1:1 contrast ratio ✅ EXCELLENT
- **Gold accent** (`--color-gold-spotlight: #f5c542`) on black provides ~13.5:1 contrast ratio ✅ EXCELLENT
- **Secondary text** (`--color-soft-shadow-gray: #3a3a3a`) on black provides only ~2.4:1 contrast ratio ❌ FAILS WCAG AA

**Critical Issue**: `--color-muted` is referenced in `theme.css` (lines 53, 132, 213, 224, 259, 293) and `components.css` (lines 133, 174, 243, 353, 382, 408, 428, 528, 570) but is **never defined** in any CSS file. This variable is not declared in `:root` in base.css or anywhere else. This will cause these text elements to render with an invalid/undefined color.

## Motion Safety

### prefers-reduced-motion support
- Global reduction at `base.css:214-222` ✅ Sets `animation-duration: 0.01ms !important`, `animation-iteration-count: 1 !important`, `transition-duration: 0.01ms !important`, and `scroll-behavior: auto !important`
- Ambient pulse animation disabled at `theme.css:358-361` ✅

### Any excessive motion/flash
- No rapid flashing animations detected.
- Ambient pulse animation is subtle (opacity 0.4 to 0.7 over 6 seconds) and safe.
- All transitions use `ease` timing, not `linear` (which can feel jarring).

## Overall Assessment

### FAIL

**Critical Issues:**
1. **Undefined CSS variable `--color-muted`**: Over 15+ elements use `--color-muted` which is never defined. This affects footer text, muted text paragraphs, and feature card descriptions. The browser will treat this as invalid, defaulting to an unpredictable color that likely fails contrast requirements.

2. **Small body text in cards and footer**: Feature card paragraphs (15px), footer nav links (14px), and footer headings (12px) are all below the 16px minimum for body text, violating readability standards.

**Minor Issues:**
- Several footer text elements are undersized (14px, 12px) - while common in footers, they fall below the stated 16px minimum threshold.

**Recommendations:**
1. Define `--color-muted` in `:root` in `base.css` (suggest using `--color-soft-shadow-gray: #3a3a3a` or a lighter shade for better contrast)
2. Increase feature card paragraph font size to at least `1rem`
3. Increase footer nav link font size to at least `1rem`
4. Consider increasing footer heading size to at least `0.875rem` (14px)
