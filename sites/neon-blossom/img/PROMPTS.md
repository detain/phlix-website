# img/PROMPTS.md — Neon Blossom Brand Kit Image Generation Prompts

> Every image asset in this site should be regenerated using the prompts below.
> These are derived from `brand-kits/neon-blossom.js` §16 AI Generation Guidance.
> Prefix with `image_prompt_prefix`, suffix with `image_prompt_suffix`, filtered by `negative_prompt`.

---

## Logo

**Prompt:**
```
Design a Neon Blossom logo: Cormorant Garamond Light wordmark in petal white on midnight black, with a minimal stylised orchid bloom to the left. Elegant, dark, no hard edges.
```

**Constraints (from `logo_rules`):**
- Wordmark in Cormorant Garamond Light, petal white (#F0EBF8) on midnight black (#08010F)
- Optional minimal orchid bloom icon, single stylised bloom silhouette
- Simple — legible at 24px height; bloom icon works as standalone favicon
- Generous dark negative space; logo floats in darkness
- Allowed symbols: stylised orchid bloom, single rose silhouette, firefly spark dot, moth wing outline
- Forbidden: generic play-button, camera/screen icons, neon sign text, mechanical/tech symbols

---

## Hero Illustration

**Prompt:**
```
Bioluminescent night garden digital painting, deep black background, glowing orchids and roses in electric neon colors, firefly sparks, lush layered botanical composition, soft sourceless light emanating from the flowers themselves, A bioluminescent night-garden landing page hero section with full-bleed bloom illustration, neon-pink CTA pill, midnight-black sections, rounded cards with violet glows, generous dark whitespace.
```

**Negative prompt (from `negative_prompt`):**
```
daytime, sunlight, warm golden hour, bright white background, cyberpunk tech elements, circuits, neon signs or text, harsh hard light, HDR overprocessed, chrome or metal, geometric or mechanical shapes, pastel or washed out, horror gore, cartoonish flat vector without depth
```

---

## Feature Section Backgrounds

**Prompt:**
```
Deep midnight-black background with very subtle radial violet glow at centre, scattered micro pollen-dot texture at 5% opacity, no harsh elements.
```

---

## Marketing Social Graphics

**Prompt:**
```
A dark botanical social graphic for {topic}: Cormorant Garamond headline in neon hot pink, bioluminescent bloom key art, midnight-black background, ethereal and cinematic.
```

---

## Background Texture (CSS fallback)

Use CSS-only atmospheric backgrounds instead of raster textures:
- Bloom at Midnight: `radial-gradient(ellipse at center, #FF2D78 0%, #9B30FF 45%, #08010F 100%)`
- Garden Depth: `linear-gradient(180deg, #1E0F38 0%, #08010F 100%)`
- Bioluminescent Pulse: `radial-gradient(ellipse at center, rgba(57,255,133,0.18) 0%, rgba(8,1,15,0) 70%)`

---

## Icon (inline SVG — feature icons)

**Template:**
```
Thin outlined icon of {subject}, 1.5px rounded stroke in petal white (#F0EBF8), no sharp corners, minimal botanical character, dark background.
```

The 7 feature icons are inline SVG paths in the HTML, using:
- Library: horizontal lines
- SyncPlay: clock circle
- Transcode: 3D box/hex
- Shield: shield shape
- Antenna: broadcast/radio waves
- Broadcast: DLNA signal
- Puzzle: puzzle piece
- Hub: hub/rays

All use `stroke="currentColor"` with `stroke-width="1.5"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"` on a 24x24 viewBox.

---

## Masthead / Favicon

**Prompt:**
```
Minimal stylised orchid bloom mark, single page icon, neon hot pink (#FF2D78) on midnight black (#08010F), 32x32px square canvas, rounded corners, glow effect.
```

---

## OG Image (1200×630 social card)

**Prompt:**
```
A bioluminescent night-garden social share card: Cormorant Garamond wordmark "Phlix" in petal white with a soft neon-pink text glow on midnight-black background, radial bloom gradient in pink/violet, scattered firefly dots, tagline "Where the Night Blooms." in italic serif, 1200x630px cinematic composition, ethereal and dark.
```

**Color palette to enforce:**
- Background: Midnight Black #08010F
- Primary bloom: Neon Hot Pink #FF2D78
- Secondary: Electric Violet #9B30FF
- Tertiary accent: Luminous Gold #FFD166
- Text: Petal White #F0EBF8
- Surface: Night Velvet #130822

**Negative:**
```
daytime, warm golden hour, bright backgrounds, pastel or washed out colors, geometric or tech elements, text neon signs, harsh chrome
```
