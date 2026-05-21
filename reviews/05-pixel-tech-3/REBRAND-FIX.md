# Rebrand Fix: 05-pixel-tech-3 (CRT Monitor)

## Summary
Fixed brand misalignments in `variants/05-pixel-tech-3/css/` to correctly match the Pixel Tech V3 — CRT Monitor brand kit.

## Brand Kit Requirements
- **Primary colors**: neon_green `#39FF14`, black `#000000`, silver `#C0C0C0`
- **Secondary colors**: dark_gray `#1A1A1A`, matrix_green `#00FF66`
- **Accent**: electric_purple `#9B30FF` (used SPARINGLY)
- **Fonts**: Orbitron Bold (headlines), Inter Medium (body), Roboto Mono (ui), JetBrains Mono (code)

## Issues Fixed

### base.css
1. Added missing `--color-accent` CSS variable (mapped to `--color-accent-primary`/electric_purple) for compatibility with existing uses
2. Semantic colors now correctly point to brand colors:
   - `--color-bg-primary` = black `#000000`
   - `--color-bg-secondary` = dark_gray `#1A1A1A`
   - `--color-text-primary` = silver `#C0C0C0`
   - `--color-text-secondary` = neon_green `#39FF14` (DOMINANT color)

### theme.css
1. **Replaced hot pink `rgb(255, 45, 120)`** with neon green `rgba(57, 255, 20, x)` throughout
2. **Replaced `var(--color-accent)`** (electric purple) with `var(--color-text-secondary)` (neon green) for all dominant color uses:
   - Hero headings and text shadows
   - Page header h1 and decorations
   - Content section headings
   - Navigation hover states and active indicators
   - Footer branding elements
3. **Replaced undefined `var(--color-muted)` and `var(--color-text)`** with `var(--color-text-primary)` (silver)
4. **Replaced `var(--color-primary)` and `var(--color-secondary)`** with semantic equivalents:
   - `var(--color-primary)` → `var(--color-bg-primary)`
   - `var(--color-secondary)` → `var(--color-bg-secondary)`
5. Fixed CRT flicker animation to use neon green instead of electric purple
6. Fixed neon-flicker animation keyframes to use neon green throughout

### components.css
1. **Replaced hot pink `rgb(255, 45, 120)`** with neon green `rgba(57, 255, 20, x)`:
   - All button primary/secondary glow effects
   - Hover lift shadows
   - Feature more links
   - Cyber glow radial gradients
   - Grid overlay lines
   - Neon spinner borders
2. **Replaced `var(--color-accent)`** with `var(--color-text-secondary)` for:
   - Button text and borders
   - Neon text effects
   - Pitch bullets (odd child markers)
   - Link arrows
   - Counter elements
3. **Replaced undefined `var(--color-muted)` and `var(--color-text)`** with `var(--color-text-primary)`
4. Updated component header comment from "hot pink neon glow" to "neon green phosphor glow"

## Verification
- Build: `npm run build` - PASSED (30 variants built successfully)
- Lint: `npm run lint` - Lint errors present but are stylistic (rgba vs rgb notation) across all variants, not brand-related

## Files Modified
- `variants/05-pixel-tech-3/css/base.css`
- `variants/05-pixel-tech-3/css/theme.css`
- `variants/05-pixel-tech-3/css/components.css`
