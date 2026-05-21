# Rebrand Fix: 01-minimalist-cinema-3

## Date: 2026-05-21

## Brand Kit Reference
- **Variant**: Minimalist Cinema V3 — Grid-Based
- **Colors**: primary(electric_blue #2D9CFF, charcoal #1A1A1A, white #FFFFFF), secondary(slate_gray #2E2E2E, soft_blue #A7D8FF), accent(neon_aqua #00F0FF)
- **Fonts**: headline: Montserrat ExtraBold, body: Inter Regular, ui: Roboto Medium, code: JetBrains Mono

## Issues Found

### 1. Wrong Color Scheme (Dark Mode instead of Light Mode)
The CSS was using dark mode colors that don't exist in the brand kit:
- `--color-primary: #0a0a0f` (invented dark color)
- `--color-secondary: #fafaf8` (off-white for dark backgrounds)
- `--color-muted: #6b6b73` (unbranded gray)
- Dark surface colors like `#12121a`, `#1a1a24`

### 2. Wrong Accent Color
- Used red accent `--color-accent: #e63946` which is completely wrong
- Brand specifies electric_blue #2D9CFF or neon_aqua #00F0FF

### 3. Wrong Fonts
- Headlines: Bebas Neue (should be Montserrat ExtraBold)
- Body/UI: Work Sans (should be Inter Regular / Roboto Medium)
- Code: Work Sans monospace (should be JetBrains Mono)

### 4. Hardcoded Dark Mode rgb() Values
Throughout the CSS, hardcoded `rgb(250, 250, 248)` and similar off-white values for dark mode borders/effects that needed to be converted to light mode equivalents using charcoal `rgba(26, 26, 26, X)`.

## Fixes Applied

### base.css
- Changed `--color-primary` from `#0a0a0f` to `#FFFFFF`
- Changed `--color-secondary` from `#fafaf8` to `#1A1A1A` (charcoal)
- Changed `--color-muted` from `#6b6b73` to `#2E2E2E` (slate_gray)
- Changed `--color-accent` from `#e63946` to `#2D9CFF` (electric_blue)
- Changed `--color-link-hover` from `#fafaf8` to `#00F0FF` (neon_aqua)
- Updated surface colors for light mode
- Changed shadows from dark-tinted to charcoal-tinted
- Updated font declarations to brand fonts

### theme.css
- Replaced Bebas Neue font-face with Montserrat ExtraBold
- Replaced Work Sans font-face with Inter Regular, Roboto Medium, JetBrains Mono
- Updated header background from `rgb(10, 10, 15, 0.95)` to `rgba(255, 255, 255, 0.95)`
- Updated border colors from light-on-dark to charcoal-on-light

### components.css
- Changed all `rgb(230, 57, 70, X)` red accent backgrounds to `rgba(45, 156, 255, X)` electric_blue
- Changed all `rgb(250, 250, 248, X)` dark-mode border colors to `rgba(26, 26, 26, X)`
- Changed `.code-block` background from `--color-primary` to `--color-secondary`
- Updated all border colors for light mode compatibility

## Verification
- `npm run build` passes with no errors
- `npm run lint` passes for 01-minimalist-cinema-3 CSS files (stylelint --fix applied)
- Build output confirms: `✓ 01-minimalist-cinema-3`
