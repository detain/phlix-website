# img/PROMPTS.md — Tropical Lagoon Asset Generation Prompts

> Use these prompts to regenerate the image assets for the **Tropical Lagoon** brand-kit site.
> Build each prompt as: `image_prompt_prefix + subject + image_prompt_suffix` + `negative_prompt`.
> All images should feel like a high-end tropical travel magazine spread: saturated but never garish, lush but always composed.

## Brand Kit Reference
- **Primary:** Lagoon Turquoise `#00D4B8`
- **Secondary:** Sunset Coral `#FF6B35`
- **Tertiary:** Palm Lime `#90E050`
- **Background:** Lagoon Depths `#011A20`
- **Surface:** Reef Shadow `#02242C`
- **Text:** Sea Foam White `#F0FAF8`
- **Mascot:** Koa the Flame Angelfish (iridescent turquoise/coral, large bright eyes, flowing fins)
- **Style:** Semi-realistic, editorial illustration, botanical, vector, luminous wash

---

## Prompt Library

### Logo (`img/logo.svg`)
```
Tropical island paradise logo design: Pacifico wordmark "Phlix" in sea-foam white
on deep lagoon-teal background (#011A20), subtle turquoise caustic shimmer underline,
tropical wave form accents, rounded pill geometry, no sharp corners, lush and
sensory rich, high quality, island editorial style.

Negative: urban, cityscape, neon signs, dark noir, winter, snow, desert, cold, grey,
corporate, flat, sterile, gritty, harsh shadows, black and white, monochrome,
industrial, concrete, dry
```

### Hero Illustration (`img/hero-illustration.svg`)
```
Tropical island paradise illustration, lush and vibrant, turquoise lagoon water,
Polynesian or Maldivian setting, golden tropical light, coral reef, palm fronds,
frangipani, bird of paradise, deep lagoon-teal palette (#011A20 background,
#00D4B8 turquoise, #FF6B35 coral), luminous tropical colour grade, soft organic
shapes, island editorial style, high quality, lush and sensory rich.

Deep lagoon-teal background (#011A20) with luminous turquoise light bursts from
above the water surface, coral and gold accent elements, botanical palm fronds
framing the composition edges, underwater scene showing iridescent fish catching
light through the surface. Shadows are warm-teal, never grey or black. The world
is perpetually alive, mid-summer. Semi-realistic editorial style.

Negative: urban, cityscape, neon signs, dark noir, winter, snow, desert, cold, grey,
corporate, flat, sterile, gritty, harsh shadows, black and white, monochrome,
industrial, concrete, dry
```

### Background / Caustic Light Pattern (`img/bg-pattern.svg`)
```
Lagoon-depths background (#011A20) with subtle underwater caustic light pattern
in turquoise, very low opacity. No text. No hard edges. Organic wave forms,
water refraction caustic light overlay, tropical lagoon atmosphere, soft luminous
wash, high quality.

Negative: urban, cityscape, neon signs, dark noir, winter, snow, desert, cold, grey,
corporate, flat, sterile, gritty, harsh shadows, black and white
```

### Mascot: Koa the Flame Angelfish
```
Stylised flame angelfish character named Koa, iridescent scales in lagoon turquoise
#00D4B8 and sunset coral #FF6B35, large bright eyes catching turquoise light,
flowing fins that trail light like a comet, mid-swim pose, looking back with a
delighted expression that says 'follow me', on deep lagoon-teal background,
tropical lagoon brand style, luminous semi-realistic illustration, joyful and curious.

Negative: urban, cityscape, neon signs, dark noir, winter, snow, desert, cold, grey,
corporate, flat, sterile, gritty, harsh shadows, black and white, industrial
```

### Feature Icons (inline SVG — 7 features)
For each feature, use this template with the subject substituted:
```
Rounded outlined minimal icon of {subject}, 1.5px stroke with round caps,
sea-foam-white default (#F0FAF8), lagoon-turquoise active state (#00D4B8),
tropical warmth, clean confident strokes, no sharp corners, organic geometry.

Subjects:
- library: stacked bars (library organization)
- syncplay: clock with play triangle (synchronized playback)
- transcode: hexagon with gear (transcoding)
- shield: shield with check (auth/security)
- antenna: broadcast antenna (Live TV)
- broadcast: wifi/dish waves (DLNA)
- puzzle: puzzle piece (plugins)
- hub: connected nodes (Phlix Hub)

Negative: sharp corners, angular icons, cold grey tones, corporate look
```

### Marketing / Landing Page Hero
```
A tropical lagoon media landing page hero: full-bleed turquoise lagoon with
Josefin Sans headline in sea-foam white, turquoise pill CTA button, reef-shadow
card sections below, botanical wave dividers, warm coral accent lights, underwater
caustic shimmer background. Deep lagoon-teal palette, high-end tropical travel
magazine editorial style, lush and sensory rich.

Negative: urban, cityscape, neon signs, dark noir, winter, snow, desert, cold, grey,
corporate, flat, sterile, gritty, harsh shadows, black and white, industrial,
concrete, dry
```

### Social Marketing Graphic
```
A tropical lagoon poster-style social graphic for Phlix media server: Josefin Sans
headline in sea-foam white on lagoon-depths (#011A20), turquoise lagoon key art,
golden-hour sky, lush botanical palm frond composition, vibrant and joyful,
high-end island travel editorial style. Fully saturated tropical colour grade,
warm-teal shadows.

Negative: urban, cityscape, neon signs, dark noir, winter, snow, desert, cold, grey,
corporate, flat, sterile, gritty, harsh shadows, black and white, industrial
```

---

## Image Prompt Prefix (applied to every asset)
```
Tropical island paradise illustration, lush and vibrant, turquoise lagoon water,
Polynesian or Maldivian setting, golden tropical light, coral reef, palm fronds,
frangipani, bird of paradise,
```

## Image Prompt Suffix (applied to every asset)
```
, deep lagoon-teal palette (#011A20 background, #00D4B8 turquoise, #FF6B35 coral),
luminous tropical colour grade, soft organic shapes, island editorial style,
high quality, lush and sensory rich.
```

## Negative Prompt (applied to every asset)
```
urban, cityscape, neon signs, dark noir, winter, snow, desert, cold, grey, corporate,
flat, sterile, gritty, harsh shadows, black and white, monochrome, industrial,
concrete, dry
```

---

## Seasonal Variants (documented for future use)

### Monsoon Season (July 1 – September 30)
```
Heavier rain on palm leaves, lagoon goes slightly greener and deeper (#021C24 surface),
rainbow arcs at composition edges, monsoon-cloud texture overlay. Override primary
to #00B4D8, secondary to #90E050.
```

### Coral Bloom (March 1 – April 30)
```
Gentle particle animation of tiny white coral fragments drifting upward, warmer
coral and gold tones (secondary #FF8C61, tertiary #FFD166), underwater macro
motif emphasised. Override secondary to #FF8C61, tertiary to #FFD166.
```

### Tropical Christmas (December 15 – January 3)
```
Beach-Christmas: palm trees decorated with turquoise lights instead of baubles,
sunset coral #FF6B35 and palm lime #90E050 replace red/green, a sand-star
instead of a snow-star.
```
