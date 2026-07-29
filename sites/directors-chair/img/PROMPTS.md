# Image Generation Prompts

This file records how the image assets for the Directors Chair brand kit were generated.

## logo.svg

**Purpose:** Brand wordmark/lockup for the site header

**Description:** Clapperboard icon combined with PHLIX wordmark. Features a film clapperboard with film reel circles, all in the Directors Chair theme colors (gold on dark).

**Creation:** Direct SVG authoring (not AI-generated)

## favicon.svg

**Purpose:** Square favicon in brand primary color

**Description:** Simplified clapperboard icon in 32x32 viewBox, gold (#FFD93D) stroke on dark background (#1C1C1C).

**Creation:** Direct SVG authoring (not AI-generated)

## og.svg / og.png

**Purpose:** 1200×630 social share card

**Description:** Dark gradient background with spotlight effect, large clapperboard icon, PHLIX wordmark in Impact font with gold accent underline, tagline "MEDIA SERVER" and "Your media. Your library. Your Phlix.", decorative corner accents.

**Creation:** Direct SVG authoring, rasterized to PNG via `rsvg-convert`

**Generation command:** `node tools/gen-og.mjs --site directors-chair`
