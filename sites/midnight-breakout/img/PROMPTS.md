# PROMPTS — Midnight Breakout Image Asset Generation

> These prompts record the exact generation inputs for every raster image asset.
> Use with the brand kit's `image_prompt_prefix`, `image_prompt_suffix`, and `negative_prompt`.
> Generate with your preferred image model, then commit the output to `img/`.

---

## OG Image (1200×630) — Social Share Card

**Subject:** Dark cinematic social share card for Phlix media server

**Prompt (ImageGen / DALL-E / Midjourney):**
```
Midnight Breakout brand aesthetic: near-black background (#1A1A1A), chain-link fence grid pattern in the corners, a single harsh white searchlight beam cutting diagonally across the frame from upper-left. Center: "PHLIX" in bold condensed all-caps Oswald typeface, white (#ECF0F1), large, centered. Below: amber (#F39C12) thin underline sweep. Bottom third: "BREAK FREE. OWN YOUR MEDIA." in Source Sans 3, gray (#95A5A6). Bottom bar: navy blue (#2C3E50) strip with "SELF-HOSTED • OPEN SOURCE • NO LOCK-IN" in small tracked caps. Style: high-contrast neo-noir industrial, flat graphic, cinematic searchlight drama, sharp hard shadows. No photography, pure graphic design. No warm tones, no golden light, no soft gradients. 16:9 ratio.
```

**Negative prompt:**
```
warm tones, golden hour, sunset, cozy, pastel, soft gradient, rounded shapes, friendly characters, smiling people, leisure scenes, pastoral, natural, soft lighting, low contrast, muted colors, playful, cartoon, decorative
```

**Output:** `og.png` (1200×630, rasterized from `og.svg` via `rsvg-convert`)

---

## Logo Lockup (200×50 SVG → PNG for dark contexts)

**Subject:** Phlix logo lockup for dark-background use

**Prompt:**
```
Minimalist logo design for "PHLIX" text: bold condensed sans-serif (Oswald/Impact style), white (#ECF0F1). Left accent: small chain-link fence pattern in dark gray (#4A4A4A). The "L" letter in amber (#F39C12) to suggest a broken chain link. Thin amber underline beneath the full wordmark. Clean, industrial, no decoration beyond the chain-link motif. Dark background. High contrast. Flat graphic.
```

**Output:** `img/logo.svg` (already SVG — for raster: `logo.png`)

---

## Hero Background Texture (CSS-generated)

No raster image needed — the hero background is fully CSS:
```css
/* Chain-link grid overlay */
background-image:
  repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(74,74,74,0.15) 28px, rgba(74,74,74,0.15) 30px),
  repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(74,74,74,0.15) 28px, rgba(74,74,74,0.15) 30px);

/* Searchlight sweep radial */
background: var(--gradient-floodlight);

/* Amber sweep */
background: var(--gradient-searchlight-sweep);

/* Conic searchlight rotation ::after */
background: conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(243,156,18,0.04) 30deg, transparent 60deg);
animation: searchlight-rotate 12s linear infinite;
```

---

## Feature Card Illustration (8 cards)

Each feature card uses inline SVG iconography (no raster needed). The card surface textures are CSS-only:
- Dark steel background (#232323)
- Steel-gray border (#4A4A4A)
- Amber hover glow (box-shadow + border-color transition)
- Chain-link top-border reveal animation on hover

---

## Notes

All visual drama comes from CSS — no raster images are required for the site to function.
The `og.png` is the only external raster asset required, and it's generated from `og.svg`.
