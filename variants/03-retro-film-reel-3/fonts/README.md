# Self-Hosted Fonts

This directory should contain the following font files for the Film Noir variant:

## Required Fonts

### Oswald (Display/Headlines)
- oswald-400.woff2 (Regular 400)
- oswald-500.woff2 (Medium 500)
- oswald-700.woff2 (Bold 700)

### Lora (Body/Serif)
- lora-400.woff2 (Regular 400)
- lora-400-italic.woff2 (Italic 400)
- lora-600.woff2 (Semi-bold 600)

## How to Obtain

1. Visit [Google Fonts](https://fonts.google.com/)
2. Search for "Oswald" and "Lora"
3. Download the WOFF2 files
4. Place them in this directory

## Note

The CSS is already configured to load these fonts with `font-display: swap` for performance. The site will fall back to system fonts if these files are not present.

Alternative: Use a font hosting service like [Fontsource](https://fontsource.org/) to self-host the fonts via npm.
