# Stellar Command Image Prompts

This file documents the generation prompts used to create visual assets for the stellar-command brand kit site.

## og.svg (1200x630 Social Share Image)

**Prompt used:**
Starship command bridge interface, deep space navy background with grid overlay, large starship silhouette in cyan/teal, HUD corner brackets, "Your media. Your library. Your Phlix." headline in white and cyan accent, open-source media server branding, cinematic sci-fi aesthetic, dark theme, high contrast

**Generation tool:** Manual SVG creation

**Negative prompt:** N/A (manual SVG)

**Output:** `/home/sites/phlix/phlix-website/sites/stellar-command/img/og.svg`

## logo.svg (Brand Wordmark)

**Prompt used:**
Minimal starship/spacecraft icon with navigation beacon glow, clean geometric design, teal/cyan accent color on dark background, technology/space theme

**Output:** `/home/sites/phlix/phlix-website/sites/stellar-command/img/logo.svg`

## favicon.svg (32x32 Favicon)

**Prompt used:**
Square favicon with starship command beacon, HUD corner brackets, teal/cyan glow on deep navy background

**Output:** `/home/sites/phlix/phlix-website/sites/stellar-command/img/favicon.svg`

---

**Note:** The `og.png` (1200x630 raster PNG) is generated from `og.svg` using:
```bash
node tools/gen-og.mjs --site stellar-command
```

This requires `librsvg2-bin` for proper SVG rasterization.
