# Rebrand Fix: 05-pixel-tech-4 (Matrix Rain)

## Summary
Fixed brand misalignments in variant 05-pixel-tech-4 to match the brand kit requirements for "Pixel Tech V4 — Matrix Rain" theme.

## Brand Kit Requirements
- **Primary Colors**: neon_green (#39FF14), black (#000000), silver (#C0C0C0)
- **Secondary Colors**: dark_gray (#1A1A1A), matrix_green (#00FF66)
- **Accent**: electric_purple (#9B30FF) - used sparingly
- **Theme**: Matrix digital rain, falling code, hacker documentary aesthetic
- **Dominant Color**: Green monochrome (neon green #39FF14)

## Issues Fixed

### 1. base.css
- **FIXED**: `::selection` color was using electric purple (#9B30FF) - changed to neon green (#39FF14) to match the dominant green monochrome requirement
- **ADDED**: Missing CSS variable aliases for backward compatibility:
  - `--color-primary` → aliases `--color-bg-primary` (black)
  - `--color-secondary` → aliases `--color-bg-secondary` (dark_gray)
  - `--color-text` → aliases `--color-text-primary` (silver)
  - `--color-muted` → aliases `--color-dark-gray`

### 2. theme.css
- **FIXED**: All instances of `rgb(255, 149, 0)` (amber/orange) - replaced with `rgba(57, 255, 20, X)` (neon green) as this color is NOT in the brand kit
- **FIXED**: All instances of undefined `var(--color-accent)` used as dominant colors - replaced with `var(--color-text-secondary)` (neon green #39FF14)
- **RENAMED**: `@keyframes amber-glow` → `@keyframes matrix-glow` and updated colors to green
- **RENAMED**: `@keyframes amber-flicker` → `@keyframes matrix-flicker` and updated colors to green
- **FIXED**: Hero section radial gradients that used amber tones - changed to matrix green tones
- **FIXED**: Navigation hover states that used amber - changed to neon green
- **FIXED**: All heading colors that used electric purple as dominant - changed to neon green
- **FIXED**: Button borders and shadows using amber - changed to neon green

### 3. components.css
- **FIXED**: All instances of `rgb(255, 149, 0)` (amber/orange) - replaced with `rgba(57, 255, 20, X)` (neon green)
- **FIXED**: All instances of undefined `var(--color-accent)` - replaced with `var(--color-text-secondary)` (neon green)
- **RENAMED**: `.amber-text` → `.matrix-text` with updated green colors
- **RENAMED**: `.amber-text-alt` → `.matrix-text-alt` with updated green colors
- **RENAMED**: `.amber-spinner` → `.matrix-spinner` with updated green colors
- **RENAMED**: `@keyframes amber-sweep` → `@keyframes matrix-sweep` with updated green colors
- **RENAMED**: `@keyframes amber-spin` → `@keyframes matrix-spin` with updated green colors
- **RENAMED**: `.grid-overlay` comment from "Amber Grid" to "Matrix Grid"
- **FIXED**: Button primary/secondary styles that used amber glow - changed to matrix green glow
- **FIXED**: Hover lift shadows using amber - changed to neon green

## Color Mappings Applied
| Old Color/Variable | New Color/Variable | Reason |
|------------------|------------------|--------|
| `rgb(255, 149, 0)` (amber) | `rgba(57, 255, 20, X)` (neon green) | Amber not in brand kit |
| `var(--color-accent)` (dominant use) | `var(--color-text-secondary)` | Electric purple is accent only, neon green is dominant |
| `::selection { electric_purple }` | `::selection { neon_green }` | Green monochrome dominant theme |
| `amber-glow` animation | `matrix-glow` animation | Align with Matrix Rain theme naming |
| `amber-flicker` animation | `matrix-flicker` animation | Align with Matrix Rain theme naming |
| `amber-sweep/amber-spin` | `matrix-sweep/matrix-spin` | Align with Matrix Rain theme naming |

## Verification
- ✅ `npm run build` - passes
- ✅ `npm run lint` - passes
- ✅ No instances of `rgb(255, 149, 0)` (amber) remain in CSS
- ✅ No instances of undefined `var(--color-accent)` remain in CSS
- ✅ All semantic colors correctly reference brand kit colors
