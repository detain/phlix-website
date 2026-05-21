# Rebrand Fix: 03-retro-film-reel-4

## Issue Summary
The variant `03-retro-film-reel-4` was incorrectly using the **"Sci-Fi Retro"** theme instead of the correct **"Hollywood Golden Age"** brand as defined in `shared/data/brand-kits.json`.

## Wrong Theme: Sci-Fi Retro
- **Colors**: Deep navy `#0A1628`, teal `#00D4AA`, chrome/silver
- **Fonts**: Oxanium (headline), IBM Plex Sans (body), IBM Plex Mono (code)
- **Style**: Retro-futuristic, deep space backgrounds, chrome highlights

## Correct Brand: Hollywood Golden Age (from brand-kits.json)
- **Colors**:
  - Primary: `retro_red #C0392B`, `cream #F5E9D4`, `teal #1ABC9C`, `black_outline #111111`
  - Secondary: `mustard #D4A017`, `soft_brown #8C5E3C`
  - Accent: `mint #A3E4D7`
- **Fonts**: Bebas Neue (headline), Open Sans (body), Nunito (ui), Cousine (code)
- **Style**: Hollywood glamour, spotlights, velvet rope elegance, red carpet touches

## Files Modified
1. `variants/03-retro-film-reel-4/css/base.css` - Root CSS variables
2. `variants/03-retro-film-reel-4/css/theme.css` - Font imports and header styling
3. `variants/03-retro-film-reel-4/css/components.css` - Component styling

## Changes Made

### base.css
- Changed variant comment from "Sci-Fi Retro" to "Hollywood Golden Age"
- Replaced CSS variables:
  - `--color-bg`: `#0a1628` → `#111`
  - `--color-bg-alt`: `#0d1f35` → `#1a1a1a`
  - `--color-bg-elevated`: `#112640` → `#222`
  - `--color-surface`: `#142848` → `#2a2a2a`
  - `--color-text-muted`: `#5a7a8a` → `#D4A017` (mustard)
  - `--color-primary`: `#00d4aa` → `#C0392B` (retro_red)
  - `--color-accent`: `#00d4aa` → `#1ABC9C` (teal)
  - `--color-border`: `#1e3a5f` → `#3a3a3a`
  - `--color-chrome`: removed (not in brand)
- Changed fonts:
  - `--font-headline`: `'Oxanium'` → `'Bebas Neue'`
  - `--font-body`: `'IBM Plex Sans'` → `'Open Sans'`
  - `--font-ui`: `'Oxanium'` → `'Nunito'`
  - `--font-code`: `'IBM Plex Mono'` → `'Cousine'`
- Updated shadow values to use retro_red and teal with appropriate opacity

### theme.css
- Changed variant comment from "Sci-Fi Retro" to "Hollywood Golden Age"
- Replaced all font imports:
  - Removed: Oxanium (400, 500, 600, 700), IBM Plex Sans (300, 400, 500, 600), IBM Plex Mono (400, 500)
  - Added: Bebas Neue (400), Open Sans (300, 400, 500, 600), Nunito (400, 500, 600), Cousine (400, 500)
- Updated `.site-header` background from `rgb(10, 22, 40)` to `rgba(17, 17, 17, 0.95)`
- Updated header box-shadow glow from `rgb(0, 212, 170)` to `rgba(26, 188, 156, 0.05)`

### components.css
- Changed file comment from "Sci-Fi Retro" to "Hollywood Golden Age"
- Replaced all `rgb(0, 212, 170, ...)` (wrong teal) with `rgba(26, 188, 156, ...)` (correct teal)
- Replaced all `rgb(10, 22, 40, ...)` (wrong navy) with `rgba(17, 17, 17, ...)` (correct dark background)

## Verification
- `npm run build` - Passed (30 variants built successfully)
- `npm run lint` - Shows pre-existing lint issues across all variants (not introduced by this fix)

## Status
**FIXED** - Variant now correctly uses Hollywood Golden Age brand tokens.
