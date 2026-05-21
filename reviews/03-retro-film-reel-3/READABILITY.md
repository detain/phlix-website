# READABILITY - 03-retro-film-reel-3 (wave 3)

## Font Sizes
- **MINOR ISSUE**: `--text-xs` uses `clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)` which resolves to a **minimum of 0.75rem = 12px** (at 16px base), falling **below the 14px minimum** threshold
- Used by: `.nav-menu a` (navigation links) and `.footer-copy`
- Body text (`--text-base`): minimum 1rem = 16px ✓
- Hero subtext: `--text-lg` = minimum 1.125rem = 18px ✓
- Headings: fluid scale from 2.5rem to 4rem ✓

## Line Heights
- Body text: `line-height: 1.7` ✓ (meets 1.5 minimum)
- Headings: `line-height: 1.1` - slightly below 1.2-1.4 typical range, but acceptable given uppercase letter-spaced display fonts
- Paragraph spacing: `margin-bottom: var(--space-md)` (1rem) ✓

## Text Contrast
- **ISSUE**: `--color-text-muted: #8c5e3c` (soft-brown) on `--color-bg: #f5e9d4` (cream) yields approximately **4.14:1 contrast ratio**
- This **fails the 4.5:1 minimum** for body-sized text
- Primary text (`#111` on `#f5e9d4`) = ~16:1 ✓ Excellent
- Muted text is used for: feature card descriptions (`--text-sm`), footer links, footer tagline, pitch bullets

## Reduced Motion
- **PASS**: CSS `@media (prefers-reduced-motion: reduce)` properly defined in base.css:97-109
- **PASS**: JavaScript checks `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before entrance animations (main.js:135-143)
- **PASS**: Smooth scroll behavior disabled when preference set (base.css:97-100)
- **PASS**: All animations/transitions set to `0.01ms` duration when preference active

## Motion Safety
- **PASS**: No content flashes more than 3 times per second
- **PASS**: No rapid color changes that could cause photosensitive reactions
- Animations present: card hover lifts (`translateY(-4px)`), button hover lifts (`translateY(-2px)`), `.popcorn-pop` keyframe animation
- All animations are subtle and non-distracting

## Score: 75/100

**Deduction Summary:**
- -15: `--text-xs` minimum 12px (fails 14px minimum)
- -10: Muted text contrast 4.14:1 (fails 4.5:1 for body-sized text)

## Pass/Fail: MARGINAL FAIL

The variant is close to passing but has two issues: small text at 12px below the 14px threshold, and muted text contrast at 4.14:1 falling short of the 4.5:1 requirement for body-sized text.
