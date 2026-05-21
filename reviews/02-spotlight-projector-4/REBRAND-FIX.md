# Rebrand Fix: 02-spotlight-projector-4

## Issue Summary
Variant 02-spotlight-projector-4 was incorrectly branded as "Warm Spotlight" theme with wrong fonts and color palette.

## What Was Wrong

### Fonts (Incorrect)
- **Headline**: Vollkorn (should be Cinzel Bold)
- **Body**: Nunito (should be Lora Regular)
- **UI**: Nunito (should be Source Sans Pro)

### Colors (Incorrect)
- `--color-warm-brown`: #1a1208 (warm dark brown - not in brand kit)
- `--color-warm-cream`: #f5e6c8 (warm cream - not in brand kit)
- `--color-amber`: #e89b3c (amber - not in brand kit)
- `--color-text`: #3d2b1f (warm text - not in brand kit)
- `--color-muted`: #475569 (slate - not in brand kit)

## Correct Brand Kit (Modern Premium)

### Colors
| Token | Hex | Purpose |
|------|-----|---------|
| gold_spotlight | #F5C542 | Primary gold |
| deep_black | #000000 | Background |
| warm_white | #FFF7E6 | Text primary |
| burgundy | #7A1F1F | Secondary |
| soft_shadow_gray | #3A3A3A | Text secondary |
| amber_glow | #FFB84D | Accent |

### Fonts
| Role | Font |
|------|------|
| Headline | Cinzel Bold |
| Body | Lora Regular |
| UI | Source Sans Pro |
| Code | Fira Code |

## What Was Fixed

### base.css
- Replaced font imports: Vollkorn/Nunito → Cinzel/Lora/Source Sans Pro
- Updated CSS variables to correct brand colors
- Renamed shadow variables: `shadow-amber-glow*` → `shadow-gold-glow*`
- Updated skip-link, focus, and selection colors

### theme.css
- Updated header comment to reflect "Modern Premium" brand
- Replaced `--color-warm-cream` → `--color-warm-white`
- Replaced `--color-amber` → `--color-gold-spotlight`
- Replaced hardcoded `rgb(26, 18, 8)` warm brown backgrounds → `rgba(0, 0, 0)`
- Replaced hardcoded `rgb(232, 155, 60)` amber tones → `rgba(245, 197, 66)`

### components.css
- Updated header comment to reflect "Modern Premium" brand
- Replaced all occurrences of `--color-amber` → `--color-gold-spotlight`
- Replaced all occurrences of `--color-warm-cream` → `--color-warm-white`
- Replaced all occurrences of `--color-warm-brown` → `--color-deep-black`
- Replaced all occurrences of `--color-muted` → `--color-soft-shadow-gray`
- Replaced `shadow-amber-glow-hover` → `shadow-gold-glow-hover`
- Updated all hardcoded rgb values to use correct brand palette

## Verification
- Build: Passed (30 variants built successfully)
- Lint: Passed (no errors)
