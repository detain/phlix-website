# Image Generation Prompts — Loot Crate

## logo.svg
- **Prompt:** Gaming/loot-crate brand logo for "PHLIX" media server. Dark purple background crate box with glowing gold star/loot symbol and gradient text wordmark. Neon gaming aesthetic.
- **Negative:** generic, plain, low quality
- **Output:** `img/logo.svg` (1200×400 viewBox)

## favicon.svg
- **Prompt:** 32x32 favicon. Dark purple background square with purple crate icon and gold star. Gaming aesthetic, simplified for small size.
- **Negative:** busy, complex, text
- **Output:** `img/favicon.svg` (32×32 viewBox)

## og.svg → og.png
- **Prompt:** 1200×630 social share card for Phlix media server. Dark purple background with purple/gold gradient, glowing crate icon on left, PHLIX wordmark in gradient, tagline "Your media. Your library. Your Phlix.", client platform badges (Roku/Samsung Tizen/Windows/Mobile/DLNA), and rarity glow effects.
- **Negative:** blurry, low contrast, generic fonts
- **Output:** `img/og.svg` (source, editable) → `img/og.png` (1200×630, via `rsvg-convert`)
- **Generator:** `node tools/gen-og.mjs --site loot-crate`
