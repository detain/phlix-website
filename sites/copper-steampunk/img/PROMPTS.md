# img/PROMPTS.md — Copper Steampunk Image Generation Prompts

> Use these prompts to regenerate every image asset in the `img/` directory.
> All prompts follow the kit's `image_prompt_prefix` + `{subject}` + `image_prompt_suffix` pattern.
> Negative prompts are applied to every generation.

## Kit Context

**Brand:** Copper Steampunk
**Inspiration:** Victorian inventor's workshop, steampunk airship interiors, Edwardian scientific instruments and gauges, polished copper pipe-work and brass fittings, aged leather-bound engineering journals, riveted iron bulkheads and porthole windows.
**Art direction:** Victorian engineering plate or hand-engraved instrument manual; rich cross-hatching on dark surfaces; polished copper highlights catching warm amber gas-lamp light; aged patina on brass fittings; dense with purposeful detail but never cluttered.
**Lighting:** Gas-lamp amber, flickering filament. Warm. Hard shadows. High contrast. No cool light sources.

---

## Image Prompts

### 1. Logo (`logo.svg`)

**Prompt:**
```
Victorian steampunk engraving, amber gas-lamp lighting, polished copper and antique brass surfaces, mahogany and riveted iron panels, heavy cross-hatch texture, dark warm-toned background, dramatic chiaroscuro, Design a Copper Steampunk logo: Cinzel Decorative 'PHLIX' wordmark in antique brass inside an octagonal engraved shield; integrated gear cog; soot-black background; no neon, no flat design.
```

**Negative prompts:** `neon, cyberpunk, futuristic chrome, flat design, minimalist, pastel, cute, cartoonish, white background, cool blue light, plastic, glossy digital`

**Spec:** Octagonal brass-bordered shield badge, Cinzel Decorative wordmark, gear cog integrated, soot-black background. No play button, no neon glow, no film reel. Never on light backgrounds.

---

### 2. Favicon (`favicon.svg`)

**Prompt:**
```
Victorian mechanical gear cog icon: filled duotone, copper foreground (#B5651D), soot-black shadow (#1A1208), squared mechanical caps, gear/wrench motif, octagonal badge frame, amber warm tone.
```

**Negative prompts:** `neon, rounded, playful, pastel, cute, minimalist, white background, cool blue light, thin hairline`

**Spec:** Square 32×32 viewBox. Polished copper fill (#B5651D) as dominant. Gear cog central. Octagonal border. Rivet-dot detail.

---

### 3. OG Social Card (`og.svg`, 1200×630)

**Prompt:**
```
Victorian steampunk media server landing page social graphic: full-bleed airship workshop hero illustration, polished-copper CTA button, mahogany card feature section, parchment text, riveted iron dividers, warm sepia grade, Cinzel Decorative headline in brass, engraved illustration key art, hammered-iron border with rivet corners, no neon.
```

**Negative prompts:** `neon, cyberpunk, flat design, minimalist, pastel, cute, cartoonish, white background, cool blue light, digital UI, sleek modern`

**Spec:** 1200×630. Soot black to copper gradient background with cross-hatch texture overlay. Central octagonal shield badge with gear cog and PHLIX wordmark. Gas-lamp radial amber glow. Copper pipe horizontal rules. Riveted iron corner panels. Steam wisp animations (CSS only). Parchment (#E8D5A3) text.

---

## Asset Generation Notes

- All assets are generated as inline SVG — no raster images required.
- Render `og.svg` to raster `og.png` (1200×630) for Twitter Card compatibility using `rsvg-convert` or similar.
- Until real renders exist, SVG artwork is the production deliverable.
- When generating photography, apply: warm amber/sepia grade, heavy vignette, film grain overlay, dramatic single amber key light with deep shadows.

---

## Signature Motifs to Include in Artwork

- Polished copper pipes and fittings
- Brass gear cogs (various sizes)
- Steam pressure gauges
- Riveted iron panels with rivet dots
- Aged leather journal covers
- Porthole windows
- Mahogany instrument dashboards
- Parchment expedition maps
- Clockwork escapement mechanisms
- Airship propeller silhouettes
