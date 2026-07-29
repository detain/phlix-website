# Image Generation Prompts — premiere-lens

This file documents the image assets for the premiere-lens brand kit site.

## Logo (img/logo.svg)

**Concept:** Camera lens barrel with focus ring markings and aperture blade suggestion
**Size:** 200×60 viewBox
**Colors:** #00CED1 (cyan), #FFD700 (gold), #FFFFFF (text)
**Style:** Stroke-based, precision optics feel

## Favicon (img/favicon.svg)

**Concept:** Minimal lens icon, square format
**Size:** 32×32 viewBox
**Colors:** #0D0D0D (background), #00CED1 (lens rings), #FFD700 (center)
**Style:** Simple, recognizable at small sizes

## OG Image (img/og.svg → og.png)

**Concept:** Dark background with lens-focused composition
**Size:** 1200×630 viewBox (OG standard ratio)
**Colors:** #0D0D0D, #00CED1, #FFD700, #FFFFFF
**Content:** Brand logo, tagline "Your media. Your library. Your Phlix.", decorative aperture rings
**Generated:** `node tools/gen-og.mjs --site premiere-lens`

## Notes

- All SVG assets use inline SVG (no external references)
- Logos/icons are simple enough to not need raster generation
- OG PNG generated from og.svg using librsvg
