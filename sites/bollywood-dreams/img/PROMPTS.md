# img/PROMPTS.md — Bollywood Dreams Image Generation Prompts

This file documents the exact generation prompts used to create every image asset
in the Bollywood Dreams brand-kit site. All prompts follow the brand kit's
`image_prompt_prefix`, `image_prompt_suffix`, `negative_prompt`, and
`prompt_library` fields.

---

## logo.svg

**Prompt:**
> Bollywood Dreams logo: Playfair Display italic wordmark in jasmine-white on
> midnight-mandir (#0A0505), optional 1px marigold-gold (#F5A800) Mughal arch
> frame with rangoli corner ornaments, warm glow, no cold colours. Generous
> negative space. Subtle peacock feather accent.

**Negative:**
> cold, grey, desaturated, minimalist, stark, clinical, corporate, neon
> cyberpunk, blue-white lighting, dark gritty, western modern, flat bland

**Tool used:** Human-designed SVG (inline, hand-crafted, not AI-generated)

---

## favicon.svg

**Prompt:**
> Square favicon for Bollywood Dreams: marigold gold (#F5A800) concentric
> ring/rangoli eye motif on midnight-mandir (#0A0505) square background,
> 32×32 viewBox, highly legible at 16px.

**Negative:**
> cold, grey, desaturated, minimalist, stark, clinical, corporate

**Tool used:** Human-designed SVG

---

## og.svg (Social Share Card — 1200×630)

**Prompt:**
> Bollywood Dreams social card 1200×630: midnight-mandir background with
> subtle Holi Burst gradient overlay (fuchsia/marigold/teal), large Playfair
> Display italic "Phlix" in jasmine-white centred, "Every Story Deserves a
> Grand Entrance." in marigold gold italic below, Mughal arch decorative
> top border, rangoli mandala background geometry in burnished copper
> (#3D1A0A) at 30% opacity, peacock feather accents in bottom corners.

**Negative:**
> cold, grey, desaturated, minimalist, stark, clinical, corporate, neon
> cyberpunk, blue-white lighting, harsh midday light, dark gritty

**Tool used:** Human-designed SVG

---

## Hero Illustration (CSS-rendered, no raster)

The hero uses CSS-rendered gradients and SVG decorative elements (rangoli
mandala, Mughal arch frame) rather than a raster illustration. If a
Bollywood-poster-style illustration is needed in future:

**Prompt:**
> Bollywood cinema illustration, opulent Indian aesthetic, warm marigold gold
> and fuchsia silk palette, deep midnight-mandir background, Mughal miniature
> border details, rangoli geometry, {subject}, in the Bollywood Dreams style,
> {mood}, set in a warm marigold-gold chandelier-lit scene with Mughal
> architectural detail, warm celebratory palette (midnight mandir black,
> marigold gold, fuchsia silk, peacock teal, jasmine cream), chandelier warm
> lighting, rich fabric textures, high quality, opulent.

**Negative:**
> cold, grey, desaturated, minimalist, stark, clinical, corporate, neon
> cyberpunk, blue-white lighting, dark gritty, western modern, flat bland,
> cold shadows, harsh midday light

---

## Feature Icons (7 inline SVGs)

Each icon is a single-color stroke-based inline SVG in the brand's
warm outlined style (1.5–2px stroke, rounded caps/joins, jasmine-white default,
marigold-gold active state). The library-specific icons use folk-art
conventions where specified.

**Prompt template for each:**
> Warm rounded outlined icon of {subject}, 1.5–2px stroke, jasmine-white
> default (#FFF5E0), marigold-gold active state (#F5A800), folk-art-inflected,
> Bollywood Dreams aesthetic.

**Icon subjects:**
1. `library` — Books/shelf icon
2. `syncplay` — Clock with sync arrows
3. `transcode` — Lightning bolt
4. `shield` — Auth/security shield with checkmark
5. `antenna` — Live TV signal waves
6. `broadcast` — DLNA/wifi broadcast icon
7. `puzzle` — Plugin puzzle piece
8. `hub` — Sun/rays hub/relay icon

---

## Priya the Mascot (SVG illustration, optional future asset)

The brand kit defines a geometric folk-art peacock mascot named "Priya."
If a raster illustration is needed:

**Prompt:**
> Bollywood Dreams mascot Priya: a geometric Rajasthani folk-art peacock,
> bold black outlines, mirror-work dot accents, no gradients, fanlike tail
> of concentric circles in marigold (#F5A800), fuchsia (#CC0066), and peacock
> teal (#00A8CC), crown of five marigold blossoms atop the head, full tail
> fan displayed, wings extended in welcome pose. Background: midnight-mandir
> (#0A0505).

**Negative:**
> cold, grey, desaturated, minimalist, stark, clinical, corporate, blue
> tones, Western modernist, photorealistic, gradients, soft shading

**Mascot usage note:** Per new_site.md rules, the mascot is documented
in PROMPTS but not built into the site shell. It appears in loading screens,
empty states, and celebration moments if implemented as a future asset.
