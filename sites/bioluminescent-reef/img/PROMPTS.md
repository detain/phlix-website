# Image Generation Prompts — Bioluminescent Reef

> These prompts were used to generate every raster image asset in this site.
> All assets that can be generated are listed below. Until real renders exist,
> CSS/SVG-only artwork is used instead of raster placeholders.

## Brand Kit Identifiers

**image_prompt_prefix:**
> Deep sea bioluminescent illustration, hadal darkness, cold aqua and violet organism glow, jellyfish and siphonophore forms, midnight zone, absolute black background, living light,

**image_prompt_suffix:**
> , cold bioluminescent palette (hadal darkness, biolume aqua, abyssal violet, anglerfish amber), soft organic glow, translucent membranes, alien biology, high quality deep sea art.

**Negative prompt:**
> warm, golden hour, daylight, sunshine, tropical reef, shallow water, cheerful, pastel, coral reef colors, beach, surface ocean, cartoonish, sharp angular geometry, neon party, geometric grid, human architecture, city, street, corporate clean

---

## Logo (`img/logo.svg`)
> Design a Bioluminescent Reef logo: Cormorant Garamond italic wordmark in phosphor-white on hadal-darkness (#010B14), optional 1px biolume-aqua glow border, soft rounded corners, no warm colors, no sharp geometry. Jellyfish bell silhouette as the symbol, bioluminescent tendril traces.

Prompt:
```
Deep sea bioluminescent logo design, hadal darkness (#010B14) background, jellyfish bell silhouette in biolume aqua (#00E8C8), Cormorant Garamond italic wordmark "Phlix" in phosphor-white (#C8F0FF), soft organic glow radiating from organism, translucent membrane textures, radial glow ring device, no warm colors, no play-button triangle, no sharp geometry, organic and legible at all sizes, generous negative space
, cold bioluminescent palette (hadal darkness, biolume aqua #00E8C8, abyssal violet #7700FF), soft organic glow, translucent membranes, alien biology, high quality deep sea art
```
Negative: warm, golden hour, daylight, sunshine, tropical reef, shallow water, cheerful, pastel, coral reef colors, beach, surface ocean, cartoonish, sharp angular geometry, neon party, geometric grid, human architecture, city, street, corporate clean

---

## Favicon (`img/favicon.svg`)
> Jellyfish bell silhouette in biolume aqua on hadal-darkness square, 32×32, soft rounded corners, organic and legible at tiny size.

---

## OG Image (`img/og.svg` → 1200×630 PNG)
> Deep sea bioluminescent social card: hadal darkness background with radial aqua biolume bloom, Cormorant Garamond headline "In the Dark, Life Finds a Way." in phosphor-white, jellyfish organism illustration in aqua glow, no warm colors.

---

## Hero Background (CSS only — radial gradients, no raster needed)
> Implemented via CSS `var(--gradient-biolume-bloom)` on `.hero::before` — a radial gradient creating a jellyfish-pulse-outward effect in hadal darkness. No raster image required.

---

## Page Background Texture (CSS only)
> Subtle particle drift animation (dinoflagellates in suspension) implemented in CSS as floating pseudo-elements with `animation: drift 20s linear infinite` on the `body` — tiny aqua and violet dots with varying opacity and drift speed. Falls back gracefully with `prefers-reduced-motion`.

---

## Illustration Style
> Deep sea bioluminescent digital painting, scientific illustration meets dark fantasy, cold-spectrum glow on absolute black, translucent organic form rendering, fluid watercolor with luminescent spots.

---

## UI Generation Rules (from kit)
- Background is always hadal-darkness (#010B14) or abyssal-trench (#020F1C).
- Maximum two bioluminescent accent colors per screen.
- Primary CTA is anglerfish amber — use as a lure, not decoration.
- Soft rounded corners (12px+) everywhere except pill for badges.
- Use the spacing scale; breathing room on dark surfaces reads as ocean depth.
- Max content width 1400px.
- All text must meet WCAG AA against hadal-darkness or abyssal-trench backgrounds.
