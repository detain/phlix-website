# img/PROMPTS.md — Día de Muertos Brand Kit Image Generation Prompts

> Exact prompts to (re)generate every raster image asset from the Día de Muertos brand kit.
> Built from `brand-kits/dia-de-muertos.js` §16 AI Generation Guidance.
> Use the `image_prompt_prefix` + subject + `image_prompt_suffix` + `negative_prompt[]` pattern.

---

## Brand-wide prompt constants

**image_prompt_prefix:**
```
Mexican Día de Muertos folk art illustration, vivid marigold gold and papel picado
purple against deep midnight-cemetery dark, sugar skull floral patterns,
candlelit ofrenda altar aesthetic, warm celebratory,
```

**image_prompt_suffix:**
```
, warm dark palette (midnight purple-black, cempasúchil marigold gold, papel picado
purple, calavera pink, candlelight white), folk-art ornate detail,
culturally celebratory, Día de Muertos aesthetic, high quality illustration.
```

**negative_prompt (shared):**
```
halloween horror, scary skulls, grim reaper, western death, gothic horror,
cold blue, corporate clean, flat minimalist, spooky, creepy, eerie,
blood, gore, fearful, morbid, dark depressing,
pastel soft, cartoon cute only, neon modern, sci-fi, tech
```

---

## img/logo.svg

**Prompt:**
```
{image_prompt_prefix} a Día de Muertos brand logo: "Phlix" wordmark in
Cinzel Decorative font in cempasúchil gold on midnight-cemetery dark
background, framed by a papel picado ornamental border with diamond
cut-paper geometric pattern in papel picado purple, arch-topped panel
(ofrenda niche form), warm marigold glow radiating from the text,
8px rounded corners, ornate but legible, folk art rewards detail at
scale, culturally celebratory, no spooky imagery, no Halloween
iconography {image_prompt_suffix}
```

**Negative:** `halloween horror, scary skulls, grim reaper, western death, gothic horror, cold blue, corporate clean, flat minimalist`

**Output file:** `img/logo.svg`
**Format:** SVG (editable) — rasterize to `img/logo.png` for favicon use

---

## img/favicon.svg

**Prompt:**
```
{image_prompt_prefix} a Día de Muertos favicon: stylized 8-petal
marigold (cempasúchil) flower in cempasúchil gold on midnight-cemetery
dark background, center circle in calavera pink, papel picado corner
accents in papel picado purple, simple and bold at 32x32, folk-art
ornamental detail, celebratory, warm {image_prompt_suffix}
```

**Negative:** `halloween horror, scary skulls, grim reaper, western death, gothic horror, cold blue, corporate clean`

**Output file:** `img/favicon.svg`

---

## img/og.svg (1200×630 social share card)

**Prompt:**
```
{image_prompt_prefix} a Día de Muertos social media share card 1200x630:
midnight-cemetery dark background with warm marigold radial glow
from center-top, papel picado geometric cut-paper border pattern
in papel picado purple along all four edges, "Phlix" wordmark in
Cinzel Decorative gold centered at top, "Remember. Celebrate. Live."
tagline in Playfair Display candlelight white below, subtle floating
marigold petal accents, "Your media. Your library. Your Phlix."
hero headline in Lora, "Get Phlix →" CTA pill button in
cempasúchil gold at bottom, rich layered composition like an
ofrenda altar, celebratory and warm {image_prompt_suffix}
```

**Negative:** `halloween horror, scary skulls, grim reaper, western death, gothic horror, cold blue, corporate clean, flat minimalist, text overlapping faces`

**Output file:** `img/og.svg` — rasterize to `img/og.png` 1200×630 for production

---

## Hero illustration (index.html hero background)

**Prompt:**
```
{image_prompt_prefix} a Día de Muertos hero illustration for a
media server landing page: full-bleed dark ofrenda altar scene at
midnight, layered with candles in warm candlelight glow, cempasúchil
marigold flower garlands and petals scattered across the altar,
sugar skull decorated with intricate floral patterns in pink and
gold, papel picado flags strung across the top in purple and gold,
a dark cemetery night sky with warm purple undertones, folk-art
style, symmetrical altar composition, celebratory not morbid,
the feeling of welcome and remembrance {image_prompt_suffix}
```

**Negative:** `halloween horror, scary skulls, grim reaper, western death, gothic horror, cold blue, corporate clean, flat minimalist, somber mournful`

**Output file:** `img/hero-illustration.svg` (if rasterized)

---

## Feature section artwork (decorative backgrounds)

**Prompt:**
```
{image_prompt_prefix} a subtle Día de Muertos decorative background:
midnight-cemetery dark surface with a very low-opacity papel picado
geometric mandala pattern in papel picado purple at 10% opacity,
warm marigold radial glow in one corner, no text, no faces,
celebratory, ornate folk-art detail visible only on close inspection,
suitable as a section background {image_prompt_suffix}
```

**Negative:** `halloween horror, scary skulls, grim reaper, western death, gothic horror, cold blue, corporate clean, flat minimalist, text`

**Output file:** `img/section-bg.svg`

---

## Catrina mascot illustration (loading states / empty states)

**Prompt:**
```
{image_prompt_prefix} a Día de Muertos Catrina mascot illustration:
an elegant La Catrina skeleton figure in a wide-brimmed hat crowned
with cempasúchil marigolds and papel picado flags, wearing a richly
embroidered folk dress in purple and gold, sugar-skull face painted
with floral patterns in pink and gold, smiling radiantly, standing
before a full ofrenda altar with candles, marigold petals floating
around her, warm candlelight glow, folk-art style, Posada-inspired
engraving line work, joyful and celebratory not morbid {image_prompt_suffix}
```

**Negative:** `halloween horror, scary skulls, grim reaper, western death, gothic horror, cold blue, corporate clean, flat minimalist, somber mournful, fearful`

**Output file:** `img/catrina-mascot.svg`

---

## Marketing photography style (if real photos used later)

**Photo prompt base:**
```
Mexican Día de Muertos festival photography: night cemetery lit
by candles and marigolds, ofrenda altar close-ups with layered
offerings, warm gold and purple color grade, shallow depth of
field with bokeh marigold petals and candle flames, joyful
people in folk dress celebrating, festival street photography
with papel picado overhead {image_prompt_suffix}
```

**Photo negative:** `halloween horror, scary skulls, grim reaper, western death, gothic horror, cold blue-grey color grade, blue-teal cinematic LUT, sad mournful people, HDR clinical sharpness`

---

## UI generation rules (from brand kit §16)

For AI-assisted UI art generation:
1. Background is always midnight-cemetery (#0C0512) or ofrenda-shadow (#130820)
2. Maximum two vivid accent colors per screen — gold primary, then purple or pink
3. Primary CTA is always cempasúchil gold with midnight-cemetery text
4. Rounded corners (8px standard) — folk art is warm and curved, not sharp
5. Use the spacing scale; prefer generous spacing — altars need breathing room
6. Max content width 1400px
7. All text must meet WCAG AA against warm dark background
8. Decorative borders may use papel picado pattern overlays at 8–12% opacity

---

## Page-specific generation rules (from brand kit §16)

- **Hero sections:** Full-bleed dark ofrenda hero folk-art illustration with Cinzel Decorative headline in gold, marigold CTA button, ofrenda-shadow card sections, papel picado dividers, warm candlelight atmosphere
- **Dashboard:** Warm dark media dashboard on midnight-cemetery with Cinzel Decorative cempasúchil-gold stats, ofrenda-shadow cards with gold glow edges, rounded corners, IBM Plex Mono for secondary data, papel picado ornamental dividers
- **Marketing:** Día de Muertos poster-style social graphic: Cinzel Decorative headline in cempasúchil gold, folk-art key art, ofrenda altar aesthetic, marigold and purple palette on midnight-cemetery, culturally celebratory composition
