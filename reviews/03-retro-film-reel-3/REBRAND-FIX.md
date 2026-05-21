# Rebrand Fix: 03-retro-film-reel-3

## Issue
Variant `03-retro-film-reel-3` was incorrectly using the "Film Noir" theme instead of the correct "Sunday Matinee" brand kit.

## Wrong Brand (Film Noir)
- **Colors**: noir-black `#0D0D0D`, noir-white `#FAFAFA`, noir-amber `#D4763B`
- **Fonts**: Oswald (headline), Lora (body), Courier New (code)
- **Style**: High contrast B&W, sharp corners, dramatic shadows, typewriter aesthetics

## Correct Brand (Sunday Matinee)
From `shared/data/brand-kits.json`:
- **Primary Colors**: retro_red `#C0392B`, cream `#F5E9D4`, teal `#1ABC9C`, black_outline `#111111`
- **Secondary**: mustard `#D4A017`, soft_brown `#8C5E3C`
- **Accent**: mint `#A3E4D7`
- **Fonts**: headline: Bebas Neue, body: Open Sans, ui: Nunito, code: Cousine
- **Style**: Soft family-friendly, popcorn vibes, warm and approachable, rounded corners

## Files Modified

### `variants/03-retro-film-reel-3/css/base.css`
- Replaced Film Noir color variables with Sunday Matinee brand colors
- Changed fonts from Oswald/Lora to Bebas Neue/Open Sans/Nunito/Cousine
- Updated border-radius from sharp (0.125rem) to rounded (0.25rem)
- Updated shadows from dramatic noir (solid black) to soft friendly shadows
- Fixed heading colors from noir-white to text color
- Fixed link colors to use retro_red and teal
- Fixed selection color to use teal/cream

### `variants/03-retro-film-reel-3/css/theme.css`
- Replaced font imports (Oswald, Lora → Bebas Neue, Open Sans, Nunito, Cousine)
- Updated variant comment from "Film Noir" to "Sunday Matinee"
- Fixed all `--color-noir-white` references to use `--color-cream` or `--color-text`
- Changed header box-shadow from dramatic noir to soft shadow
- Fixed nav hover colors to use teal

### `variants/03-retro-film-reel-3/css/components.css`
- Renamed `.noir-overlay` to `.retro-overlay` with Sunday Matinee colors
- Replaced all noir color references with appropriate brand colors
- Updated hero and page-header gradients from noir-amber to retro_red/teal
- Fixed button styles to use retro_red (primary) and teal (hover)
- Changed CTA banner from noir-amber to teal background
- Updated status-beta color from noir-amber to mustard
- Replaced shadow-play animation with popcorn-pop animation
- Fixed all text colors from noir-white to text color

## Verification
- `npm run build` completed successfully
- `npm run lint` passed with no errors
