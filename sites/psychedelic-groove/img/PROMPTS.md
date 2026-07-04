# Image Generation Prompts — Psychedelic Groove

This file documents the prompts used to generate visual assets for the Psychedelic Groove brand kit site.
All prompts follow the kit's `image_prompt_prefix`, `image_prompt_suffix`, and `negative_prompt` templates.

## Logo (`img/logo.svg`)

**Prompt:**
```
Design a Psychedelic Groove logo: Lobster wordmark in lysergic white (#F5F0FF) on
blacklight indigo (#0A0018), optional 2px ultra-violet pill border with UV glow,
no sharp corners, no warm or corporate tones.
```

**Style notes:**
- Wordmark in Lobster font with UV glow filter
- Swirling paisley mandala as subtle background texture (18% opacity)
- Cosmic rainbow accent line below wordmark
- Blacklight indigo background (#0A0018)
- Allowed symbols: paisley teardrop, peace sign, flower motifs, kaleidoscope

---

## Open Graph Image (`img/og.svg` → `img/og.png`)

**Prompt:**
```
A psychedelic media landing page hero graphic: full-bleed UV-dark background
with Lobster headline in lysergic white, acid-lime pill CTA button, cosmic-rainbow
gradient section breaks, deep purple haze card sections, UV glow halos on all
featured elements.
```

**Style notes:**
- 1200×630px canvas
- Full-bleed blacklight indigo background
- Large paisley mandala (8% opacity) as background texture
- "Phlix" wordmark in Lobster with UV text glow
- "Expand Your Universe." tagline in Fredoka One, acid lime
- Peace sign decorative elements (40% opacity)
- Rainbow accent bar at bottom
- Corner flower accents

---

## Favicon (`img/favicon.svg`)

**Prompt:**
```
Simple favicon for Psychedelic Groove: ultra-violet (#9B00FF) rounded square with
"Lobster-style P" in lysergic white (#F5F0FF), no sharp corners.
```

---

## Feature Icons (Inline SVG)

All feature icons follow the kit's icon rules:
- 2px stroke weight
- Fully rounded caps and joins
- Ultra-violet (#9B00FF) default color
- Generous corner radius (8px+ minimum)
- Filled variant preferred for active states

**Icon subjects:**
- library: horizontal lines (M4 6h16M4 12h16M4 18h12)
- syncplay: circle with clock hands
- transcode: 3D box/hexagon shape
- shield: security shield
- antenna: broadcast/signal lines
- broadcast: DLNA wave pattern
- puzzle: interconnected puzzle piece
- hub: central circle with radiating lines

---

## Background Texture (CSS/SVG)

**Prompt:**
```
Blacklight indigo background (#0A0018) with subtle paisley pattern at 5% opacity
and a soft UV radial glow (ultra-violet) in the center. No warm light. No text.
```

---

## Hero Texture Animation (`hero-bg-texture` in CSS)

Paisley organic shapes created via CSS radial gradients:
- Ellipse 600×400px at 20% 30% — ultra-violet (60% opacity) → transparent
- Ellipse 400×600px at 80% 70% — cosmic orange (40% opacity) → transparent
- Ellipse 300×300px at 60% 20% — acid lime (30% opacity) → transparent

Animated with `hero-breath` keyframe: scale 1→1.06, rotate 0→2deg, opacity 0.04→0.07 over 12s ease-in-out infinite.

---

## Prompt Template Used

```
{image_prompt_prefix} {subject} {image_prompt_suffix}
```

**Prefix:**
```
1960s psychedelic poster art, day-glo blacklight colors, Peter Max style,
swirling organic paisley, deep UV indigo background, ultra-violet and acid-lime
and cosmic orange accents,
```

**Suffix:**
```
, blacklight poster palette (UV indigo, ultra-violet, acid lime, cosmic orange),
flat bold vector illustration, swirling composition, flower power aesthetic,
kaleidoscopic, high saturation, high quality.
```

**Negative prompt (avoid):**
```
dark noir, monochrome, desaturated, muted, corporate, minimal,
sharp angles, cold steel, geometric sans-serif, serious, gloomy,
realistic photo, warm brown, beige, grey, flat white background,
hard shadows, horror, dystopia
```

---

## Mascot Note

The kit specifies `mascot: null` — no mascot should be invented.
Paisley is expressed as a decorative SVG mandala texture, not as a character.
