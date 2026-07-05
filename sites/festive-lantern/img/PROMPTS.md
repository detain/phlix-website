# img/PROMPTS.md — Festive Lantern Image Generation Prompts

This file records the exact prompts used (or to be used) to regenerate every visual asset
for the Festive Lantern brand-kit site. All prompts build from the kit's:

- `image_prompt_prefix`
- `image_prompt_suffix`
- `negative_prompt[]`
- `prompt_library{}`
- `illustration_prompt_template`

---

## Core prompt components (from kit)

**Prefix:**
```
East Asian lantern festival illustration, lacquer-black night sky, hundreds
of glowing vermillion silk lanterns floating upward, imperial gold calligraphy
accents, paper-cut silhouette style, warm firelight glow,
```

**Suffix:**
```
, rich festival palette (vermillion red, imperial gold, lacquer black, jade green,
lucky orange, pearl white), layered depth, celebratory atmosphere, high quality.
```

**Negative prompt (avoid):**
```
cold, blue lighting, desaturated, minimalist grey, corporate clean,
harsh shadows, neon electric, cyberpunk, horror, solitary isolation,
clinical white, flat boring palette, daylight glare
```

**Template:**
```
{prefix} {subject}, in the Festive Lantern style, {mood}, set in a glowing
East Asian lantern festival night {suffix}
```

---

## Logo

**Prompt (logo):**
```
Design a Festive Lantern logo: Noto Serif SC wordmark in imperial gold on
lacquer black, optional double-line scroll frame with cloud-scroll corner accents,
no cold colors, no sharp geometric shapes. Paper-cut plum blossom and lantern
silhouette as decorative elements. Elegant, ceremonial, celebratory.
```

**Kit logo_rules applied:**
- Shape: Wordmark in Noto Serif SC inside a double-line scroll frame with cloud-scroll corner details
- Colors: Pearl white or imperial gold wordmark on lacquer black; vermillion badge option
- Allowed symbols: silk lantern silhouette, paper-cut plum blossom, cloud-scroll motif, chrysanthemum burst, tassel detail
- Forbidden: play-button triangle cliché alone, gears or circuits, cold-blue geometric shapes, neon electric sign forms

---

## Hero / Landing page illustration

**Prompt:**
```
{prefix} festive media server hero scene, a vast lacquer-black night sky filled
with hundreds of glowing vermillion silk lanterns rising upward, paper-cut
silhouettes of families gathered in celebration, dragon and phoenix motifs in
decorative cloud-scroll borders, firework chrysanthemum bursts blooming overhead,
imperial gold calligraphy brushstroke accents, warm omnidirectional lantern-glow
lighting from below {suffix}
```

**Negative:**
```
cold, blue lighting, desaturated, minimalist grey, corporate clean,
harsh shadows, neon electric, cyberpunk, horror, solitary isolation,
clinical white, flat boring palette, daylight glare, flat composition
```

---

## Feature section illustrations (×7)

**Prompt:**
```
{prefix} [subject — e.g. "a glowing library shelf with film reels and scrolls,
paper-cut illustration style"] in the Festive Lantern style, warm and celebratory,
set against lacquer-black background with subtle vermillion glow {suffix}
```

**Per-feature subjects:**
1. library — glowing library shelf with film reels and scrolls
2. syncplay — multiple figures watching together, connected by golden threads
3. transcode — chrysanthemum burst pattern transforming into a film reel
4. auth — a vermillion-lacquered shield with golden keyhole
5. livetv — antenna with paper-cut birds and floating lanterns
6. dlna — smart TV silhouette surrounded by floating lanterns
7. plugins — puzzle piece with lantern and plum blossom motifs

---

## Client card illustrations

**Prompt:**
```
{prefix} [device silhouette — e.g. "Roku streaming device with vermillion silk
lantern glowing from within"] in the Festive Lantern style, paper-cut illustration,
lacquer-black background, jade green accents {suffix}
```

---

## About / Philosophy section

**Prompt:**
```
{prefix} serene paper-cut illustration of diverse groups gathered around glowing
lanterns in a courtyard, warm firelight, all ages sharing stories together,
chrysanthemum and plum blossom motifs, lacquer-black sky with subtle gold stars
{suffix}
```

---

## Background texture

**Prompt:**
```
Lacquer-black background with a subtle ink-wash indigo sky wash, a faint
festival-glow radial warmth at center, no text, no harsh light, paper-cut
silhouette texture overlay, celebratory atmosphere.
```

---

## Social / marketing graphic

**Prompt:**
```
A festive lantern festival poster for [topic]: bold Noto Serif SC headline in imperial
gold, paper-cut illustration, lacquer-black background, vermillion and gold palette,
chrysanthemum accents, layered depth, celebratory atmosphere, high quality.
```

---

## OG image (1200×630)

**Prompt:**
```
Festive Lantern media server social share card: 1200x630, lacquer-black gradient
sky background with floating vermillion lantern silhouettes rising, Phlix wordmark
in Noto Serif SC pearl-white, "EVERY NIGHT, A CELEBRATION" in Cinzel Decorative
imperial gold, chrysanthemum burst corner accents, paper-cut cloud-scroll decorative
borders, warm firelight glow radiating from center, no text on background except
brand name, maximum contrast, celebratory atmosphere.
```
