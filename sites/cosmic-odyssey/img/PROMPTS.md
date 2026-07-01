# img/PROMPTS.md — Cosmic Odyssey image generation prompts

All prompts assembled from `cosmic-odyssey.js` §16 AI generation guidance.
Negative prompts apply to all unless noted.

---

## Brand rules (kit §16)

- **image_prompt_prefix**: "Deep space astrophotography-illustration hybrid, dark near-black background with faint blue-indigo undertone, soft violet and magenta nebula clouds, stardust-gold motes, NASA golden-age poster style, cool stellar lighting,"
- **image_prompt_suffix**: ", cohesive cosmic palette (nebula violet #7B3FBE, cosmic magenta #C0399A, stardust gold #E8C44A, deep space black #080B14), crisp technical linework overlays, high contrast, cinematic scale, 4K resolution."
- **negative_prompt**: warm tones, golden hour, earthy browns, paper textures, neon cyberpunk, cartoon, chibi, pastel, white background, busy clutter, warm artificial light, horror, gore, tropical, lush greenery

---

## logo.svg

**Subject**: Design a Cosmic Odyssey logo for Phlix: Orbitron wordmark in star-white on deep-space-black, optional hexagonal mission-patch border in stardust-gold, minimal, precise, legible at small sizes. No warm colors.

**Full prompt**:
`Deep space astrophotography-illustration hybrid, dark near-black background with faint blue-indigo undertone, soft violet and magenta nebula clouds, stardust-gold motes, NASA golden-age poster style, cool stellar lighting, Design a Cosmic Odyssey logo for Phlix: Orbitron wordmark in star-white on deep-space-black, optional hexagonal mission-patch border in stardust-gold, minimal, precise, legible at small sizes. No warm colors., cohesive cosmic palette (nebula violet #7B3FBE, cosmic magenta #C0399A, stardust gold #E8C44A, deep space black #080B14), crisp technical linework overlays, high contrast, cinematic scale, 4K resolution.`

**Negative**: warm tones, golden hour, earthy browns, paper textures, neon cyberpunk, cartoon, chibi, pastel, white background, busy clutter, warm artificial light, horror, gore, tropical, lush greenery

---

## favicon.svg

**Subject**: Outlined precision icon of a star / constellation point, 1.5px stroke, single nebula-violet color, rounded caps, technically clean, cosmic context. Square format, minimal.

**Full prompt**:
`Deep space astrophotography-illustration hybrid, dark near-black background with faint blue-indigo undertone, soft violet and magenta nebula clouds, stardust-gold motes, NASA golden-age poster style, cool stellar lighting, Outlined precision icon of a star / constellation point, 1.5px stroke, single nebula-violet color, rounded caps, technically clean, cosmic context. Square format, minimal., cohesive cosmic palette (nebula violet #7B3FBE, cosmic magenta #C0399A, stardust gold #E8C44A, deep space black #080B14), crisp technical linework overlays, high contrast, cinematic scale, 4K resolution.`

**Negative**: warm tones, golden hour, earthy browns, paper textures, neon cyberpunk, cartoon, chibi, pastel, white background, busy clutter, warm artificial light

---

## og.svg (1200×630 social share)

**Subject**: A cosmic media-server landing page: full-bleed parallax star field hero, Orbitron headline in star-white on deep-space-black, nebula-violet CTA, void-panel feature cards, stardust-gold accent badges, vast dark negative space.

**Full prompt**:
`Deep space astrophotography-illustration hybrid, dark near-black background with faint blue-indigo undertone, soft violet and magenta nebula clouds, stardust-gold motes, NASA golden-age poster style, cool stellar lighting, A cosmic media-server landing page: full-bleed parallax star field hero, Orbitron headline in star-white on deep-space-black, nebula-violet CTA, void-panel feature cards, stardust-gold accent badges, vast dark negative space., cohesive cosmic palette (nebula violet #7B3FBE, cosmic magenta #C0399A, stardust gold #E8C44A, deep space black #080B14), crisp technical linework overlays, high contrast, cinematic scale, 4K resolution.`

**Negative**: warm tones, golden hour, earthy browns, paper textures, neon cyberpunk, cartoon, chibi, pastel, white background, busy clutter, warm artificial light, horror, gore, tropical, lush greenery

---

## Hero backdrop (CSS/SVG — no raster generation needed)

The hero backdrop is built entirely in CSS + inline SVG:
- Deep-space-black (#080B14) base
- Nebula Bloom radial gradient: #7B3FBE → #C0399A → transparent
- Scattered star dots in #E8EAF0 and stardust-gold accents
- Subtle Starfield Sweep linear gradient overlay
- Animation: `nebula-drift` (nebula pulse) + `star-drift` (star field parallax)
- All animations gated behind `prefers-reduced-motion: reduce`

---

## Feature icons (inline SVG)

Each icon is a single-color stroke icon, 1.5px stroke weight, rounded caps, matching the kit's `icon_rules`:
- library: `<path d="M4 6h16M4 12h16M4 18h12"/>` — deep space black background, violet stroke
- syncplay: `<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>` — clock-and-ring, violet
- transcode: `<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>` — hexagonal box, violet
- shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>` — violet
- antenna: `<path d="M4.93 4.93l14.14 14.14M6.34 17.66l11.31 11.31M2 12l4-4 4 4M12 2l4 4-4 4..."/>` — radiating lines, violet
- broadcast: `<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9M7 16.5c3-3 7.5-3.5 10.5-1.5M9 9.5c3.5-3.5 9-3.5 12.5 0..."/>` — signal waves, violet
- puzzle: `<circle cx="12" cy="12" r="3"/><path d="M19.4...` — plugin puzzle, violet
- hub: `<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4..."/>` — hub/radar, violet

---

## Signature elements used (kit §4)

These recurring motifs are incorporated into the visual design via CSS/SVG, not raster art:
- Star fields and nebula clouds — hero backdrop + CTA banner radial gradient
- Astronaut silhouettes — not used in static marketing site (kit mascot Vela not deployed as it's a UI mascot)
- Star-atlas grid lines and celestial coordinates — subtle border/dividers in constellation-line blue (#2D3A5E)
- Lens-flare starburst from distant suns — badge glow + card hover glow effects
- Glowing cosmic dust trails — stardust-gold accent dots in CSS backgrounds
- Mission patch / badge insignia — badge shapes, orbital arc in logo

---

## Seasonal variants (kit §20) — not applied, documented for future

- **Perseid Meteor Shower** (08-10..08-14): Animated meteor trails (stardust-gold #FFD580 streaks)
- **Winter Solstice — Aurora** (12-18..01-06): Aurora Curtain gradient undulates (green → blue → violet)
- **Galaxy Season** (03-01..05-31): Milky Way core as low-opacity magenta-violet background texture
