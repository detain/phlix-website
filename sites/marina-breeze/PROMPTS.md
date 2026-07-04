# Image Generation Prompts — Marina Breeze for Phlix

> These prompts (re)generate every image asset in `sites/marina-breeze/img/`.
> Use the kit's `image_prompt_prefix`, subject, `image_prompt_suffix`, and
> `negative_prompt` array verbatim. Keep this file in sync with the brand kit.

---

## Kit Prompt Primitives

**Prefix:**
```
Coastal nautical illustration in the Marina Breeze style — vintage sailing-club poster
aesthetic, clean engraving line work over gentle watercolor washes of navy and sea-glass
teal, sailcloth white background with subtle grain, bright airy coastal light,
```

**Suffix:**
```
, cohesive palette (deep navy #1B3A5C, sea glass teal #5BA3A0, sailcloth white #F5F1E8,
sandy beige #EDE3CC, coral #E07A5F), open horizon, serene and optimistic, high quality,
balanced composition.
```

**Negative prompt (always append):**
```
neon, cyberpunk, futuristic HUD, harsh dramatic lighting, orange/red color cast,
tropical kitch, HDR, dark moody, grungy, horror, industrial, pure black background,
busy cluttered foreground
```

---

## img/logo.svg

> Design a Marina Breeze logo: Playfair Display italic wordmark in deep navy (#1B3A5C),
> optionally paired with a small compass rose, on sailcloth white (#F5F1E8). Simple,
> classic, no neon or tropical elements.

**Full prompt:**
```
Coastal nautical illustration in the Marina Breeze style — vintage sailing-club poster
aesthetic, clean engraving line work over gentle watercolor washes of navy and sea-glass
teal, sailcloth white background with subtle grain, bright airy coastal light,
design a Marina Breeze logo: Playfair Display italic wordmark in deep navy (#1B3A5C),
optionally paired with a small compass rose, on sailcloth white (#F5F1E8). Simple,
classic, no neon or tropical elements.
, cohesive palette (deep navy #1B3A5C, sea glass teal #5BA3A0, sailcloth white #F5F1E8,
sandy beige #EDE3CC, coral #E07A5F), open horizon, serene and optimistic, high quality,
balanced composition.
```
**Negative:** neon, cyberpunk, futuristic HUD, harsh dramatic lighting, orange/red color cast, tropical kitch, HDR, dark moody, grungy, horror, industrial, pure black background, busy cluttered foreground

---

## img/favicon.svg

> A simple compass rose mark in deep water navy (#1B3A5C) on a square canvas,
> suitable for a 32×32 favicon. Clean, outlined, nautical. No text.

**Full prompt:**
```
Coastal nautical illustration in the Marina Breeze style — vintage sailing-club poster
aesthetic, clean engraving line work over gentle watercolor washes of navy and sea-glass
teal, sailcloth white background with subtle grain, bright airy coastal light,
a simple compass rose mark in deep water navy (#1B3A5C) on a square canvas, suitable
for a 32x32 favicon. Clean, outlined, nautical. No text.
, cohesive palette (deep navy #1B3A5C, sea glass teal #5BA3A0, sailcloth white #F5F1E8,
sandy beige #EDE3CC, coral #E07A5F), open horizon, serene and optimistic, high quality,
balanced composition.
```
**Negative:** neon, cyberpunk, futuristic HUD, harsh dramatic lighting, orange/red color cast, tropical kitch, HDR, dark moody, grungy, horror, industrial, pure black background, busy cluttered foreground

---

## img/og.svg (1200×630 social share image)

> A coastal media landing page hero illustration: wide full-bleed harbor scene with
> an open horizon, sailboats, and calm water reflections. Deep navy (#1B3A5C) dominant
> with sea glass teal (#5BA3A0) accents. Lighthouse sweep light from upper left.
> "Set Sail for Tonight." as the headline overlay in Playfair Display italic.

**Full prompt:**
```
Coastal nautical illustration in the Marina Breeze style — vintage sailing-club poster
aesthetic, clean engraving line work over gentle watercolor washes of navy and sea-glass
teal, sailcloth white background with subtle grain, bright airy coastal light,
a coastal media landing page hero illustration: wide full-bleed harbor scene with an open
horizon, sailboats, and calm water reflections. Lighthouse sweep light from upper left.
"Set Sail for Tonight." as the headline overlay in Playfair Display italic, in white.
, cohesive palette (deep navy #1B3A5C, sea glass teal #5BA3A0, sailcloth white #F5F1E8,
sandy beige #EDE3CC, coral #E07A5F), open horizon, serene and optimistic, high quality,
balanced composition, 1200x630 aspect ratio.
```
**Negative:** neon, cyberpunk, futuristic HUD, harsh dramatic lighting, orange/red color cast, tropical kitch, HDR, dark moody, grungy, horror, industrial, pure black background, busy cluttered foreground

---

## Feature Icons (inline SVG — reference for AI generation)

Each icon follows the kit's icon rules:
- 1.5px–2px stroke weight
- Rounded line caps and joins
- Single-color (Deep Water Navy #1B3A5C or Sea Glass Teal #5BA3A0)
- Duotone (navy + teal) for featured/hero contexts
- Nautical metaphors: anchor = bookmark, helm = settings, compass = explore

**Icon generation template:**
```
Clean outlined nautical icon of {subject}, 2px stroke, rounded caps, single color
deep navy (#1B3A5C) or sea-glass teal (#5BA3A0), no sharp corners.
```

### Library icon (grid/shelves)
```
Clean outlined nautical icon of a library or bookshelf grid, 2px stroke,
rounded caps, single color deep navy (#1B3A5C), no sharp corners.
```

### SyncPlay icon (connected nodes)
```
Clean outlined nautical icon of synchronized connected nodes or sync arrows,
2px stroke, rounded caps, single color deep navy (#1B3A5C), no sharp corners.
```

### Transcode icon (gear)
```
Clean outlined nautical icon of a quality selector gear, 2px stroke,
rounded caps, single color deep navy (#1B3A5C), no sharp corners.
```

### Auth/Shield icon
```
Clean outlined nautical icon of a shield with a checkmark, 2px stroke,
rounded caps, single color deep navy (#1B3A5C), no sharp corners.
```

### Live TV/Antenna icon
```
Clean outlined nautical icon of a TV antenna or broadcast tower, 2px stroke,
rounded caps, single color deep navy (#1B3A5C), no sharp corners.
```

### DLNA/Broadcast icon
```
Clean outlined nautical icon of a DLNA broadcast or media streaming symbol,
2px stroke, rounded caps, single color deep navy (#1B3A5C), no sharp corners.
```

### Plugins icon (puzzle or connector)
```
Clean outlined nautical icon of a plugin module or puzzle connector,
2px stroke, rounded caps, single color deep navy (#1B3A5C), no sharp corners.
```

### Hub icon (network hub)
```
Clean outlined nautical icon of a network hub or lighthouse beacon,
2px stroke, rounded caps, single color deep navy (#1B3A5C), no sharp corners.
```

---

## Hero Illustration (page top, behind hero text)

> A wide panoramic coastal harbor illustration with open horizon line at the lower
> third, sailboats, calm water reflections, lighthouse in the distance. Lighthouse
> beam sweeping from upper left as a radial light effect. Bright, optimistic,
> vintage sailing-club poster style. Open negative space in upper sky area for
> text overlay.

**Full prompt:**
```
Coastal nautical illustration in the Marina Breeze style — vintage sailing-club poster
aesthetic, clean engraving line work over gentle watercolor washes of navy and sea-glass
teal, sailcloth white background with subtle grain, bright airy coastal light,
a wide panoramic coastal harbor illustration with open horizon line at the lower third,
sailboats, calm water reflections, lighthouse in the distance. Lighthouse beam sweeping
from upper left as a radial light effect. Bright, optimistic, vintage sailing-club poster
style. Open negative space in upper sky area for text overlay.
, cohesive palette (deep navy #1B3A5C, sea glass teal #5BA3A0, sailcloth white #F5F1E8,
sandy beige #EDE3CC, coral #E07A5F), open horizon, serene and optimistic, high quality,
balanced composition.
```
**Negative:** neon, cyberpunk, futuristic HUD, harsh dramatic lighting, orange/red color cast, tropical kitch, HDR, dark moody, grungy, horror, industrial, pure black background, busy cluttered foreground

---

## Background Texture

> Airy sailcloth-white background with subtle paper grain, gentle lighthouse-sweep
> radial gradient from upper left, no clutter, no neon.

**Full prompt:**
```
Coastal nautical illustration in the Marina Breeze style — vintage sailing-club poster
aesthetic, clean engraving line work over gentle watercolor washes of navy and sea-glass
teal, sailcloth white background with subtle grain, bright airy coastal light,
airy sailcloth-white background with subtle paper grain, gentle lighthouse-sweep radial
gradient from upper left, no clutter, no neon.
, cohesive palette (deep navy #1B3A5C, sea glass teal #5BA3A0, sailcloth white #F5F1E8,
sandy beige #EDE3CC, coral #E07A5F), open horizon, serene and optimistic, high quality,
balanced composition.
```
**Negative:** neon, cyberpunk, futuristic HUD, harsh dramatic lighting, orange/red color cast, tropical kitch, HDR, dark moody, grungy, horror, industrial, pure black background, busy cluttered foreground

---

## UI Generation Rules (from kit)

These rules apply to ALL generated UI/image assets:

1. Sailcloth white background (#F5F1E8), bright sail surfaces (#FDFAF4) for cards.
2. Round corners (≥10px for utility; pill only for tags/badges).
3. Primary CTA is always Deep Water Navy (#1B3A5C).
4. Max 3 accent colors per screen; coral is the most restrained.
5. Generous whitespace — min 24px gutters.
6. Max content width 1400px with centered layout.
7. Hero sections always contain a wide coastal illustration with an open horizon.
8. Cards are rounded, on bright-sail surfaces, with tide-line borders (#2E4E6E).
9. CTA buttons are deep-navy rounded rectangles — never pills.
