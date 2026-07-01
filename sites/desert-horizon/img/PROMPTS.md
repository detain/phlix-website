# img/PROMPTS.md — Desert Horizon

Exact prompts used to generate every image asset for the Desert Horizon brand kit site.
Built from `desert-horizon.js` `image_prompt_prefix` + subject + `image_prompt_suffix` + `negative_prompt`.

---

## Logo (`logo.svg`)

**Prompt:**
```
Design a Desert Horizon logo: Playfair Display wordmark in terracotta (#C2542A) on sandstone (#F2E4C8),
paired with a clean saguaro cactus silhouette badge, simple, legible at all sizes, no neon or chrome.
```

**Negative prompt:** neon, cyberpunk, futuristic HUD, blue/cool color grade, HDR, lens flare, chrome, glossy, dark horror, minimalist white, corporate grey, electric colors, Scandinavian minimal, sci-fi, glitch art

**Constraints per `logo_rules`:**
- Clean and legible at small sizes — no more than two visual elements
- Generous clear space; the logo breathes like the desert
- Terracotta wordmark on sandstone, OR sandstone wordmark on terracotta
- Turquoise inlay accent only
- Allowed symbols: saguaro cactus, Navajo diamond, pottery wheel motif, mesa horizon line
- Forbidden: gears, circuits, neon halos, generic play-button triangle alone, globe

---

## Hero Illustration (CSS-only SVG — `hero::before` in theme.css)

**Concept:** Wide Sonoran Desert at golden hour — low horizon line, vast sky, saguaro silhouettes against a burning amber sky. WPA travel poster aesthetic.

**Prompt:**
```
American Southwest desert golden-hour illustration, WPA travel-poster style,
hand-printed linocut on warm sandstone paper, earthy terracotta and turquoise
palette, confident umber ink outlines, low sun warm light,
wide horizontal panorama, low horizon line, vast sky,
saguaro cactus silhouettes at dusk, mesa plateaus, canyon walls,
in the Desert Horizon style, serene and expansive,
set against the wide Sonoran Desert at golden hour
, cohesive Southwest palette (terracotta, mesa turquoise, sandstone, burnt umber, sage green, sunset coral), Navajo-pattern geometric accents, paper grain texture, wide open sky composition, high quality.
```

**Negative prompt:** neon, cyberpunk, futuristic HUD, blue/cool color grade, HDR, lens flare, chrome, glossy, dark horror, minimalist white, corporate grey, electric colors, Scandinavian minimal, sci-fi, glitch art

---

## Favicon (`favicon.svg`)

**Prompt:**
```
Southwest craft icon of a saguaro cactus, 2px umber stroke on terracotta square,
slightly rounded caps, hand-drawn feel, single color (sandstone on terracotta), no sharp corners, earthy.
```

**Negative prompt:** neon, cyberpunk, futuristic HUD, blue/cool color grade, HDR, lens flare, chrome, glossy, dark horror, minimalist white, corporate grey, electric colors, Scandinavian minimal, sci-fi, glitch art

---

## Feature Icons (inline SVG — 7 icons)

Each icon uses a Southwest craft hand-drawn style: 2px stroke weight, burnt-umber default color, slightly rounded caps and joins, single-color by default, subjects lean Southwest.

**General icon prompt template:**
```
Southwest craft icon of {subject}, 2px umber stroke on sandstone,
slightly rounded caps, hand-drawn feel, single color, no sharp corners, earthy.
```

**Icon subjects from features:**
- `library` — "stack of pottery vessels" (abstract horizontal lines preferred)
- `syncplay` — "two saguaro arms reaching toward each other" (clock/circle preferred as abstract)
- `transcode` — "mesa signal tower" (wave/chart preferred as abstract)
- `shield` — "adobe arch fortification"
- `antenna` — "mesa broadcast tower with signal arcs"
- `broadcast` — "desert radio waves emanating from a central mesa"
- `puzzle` — "interlocking pottery shard pieces"
- `hub` — "sun rising over two mesa peaks"

**Negative prompt (all icons):** neon, cyberpunk, futuristic HUD, blue/cool color grade, HDR, lens flare, chrome, glossy, hairline weight, geometric perfection

---

## Social Share Image (`og.svg`)

**Prompt:**
```
A Desert Horizon social graphic: full-bleed WPA-poster hero on golden horizon
gradient, terracotta sky blending to sandstone foreground, saguaro silhouettes
at the horizon, turquoise diamond accents, Playfair Display headline "Your Stories,
Wide Open." in terracotta, sandstone background, generous whitespace, umber double-line frame.
```

**Negative prompt:** neon, cyberpunk, futuristic HUD, blue/cool color grade, HDR, lens flare, chrome, glossy, dark horror, minimalist white, corporate grey, electric colors, Scandinavian minimal, sci-fi, glitch art

---

## Navajo Pattern Strips

Used as section dividers (4px horizontal strips in terracotta, turquoise, coral, and umber).

**Prompt:**
```
Navajo geometric diamond pattern strip, terracotta and turquoise on sandstone,
hand-printed linocut feel, 4px tall repeating band, no neon, high quality.
```

---

## Background Texture

**Prompt:**
```
Warm sandstone paper background with subtle linocut grain, faint Navajo diamond
pattern in terracotta at 8% opacity, no neon, no harsh light, paper texture.
```

---

## Page-specific Prompts

### Landing page hero
```
A Desert Horizon landing page: full-bleed WPA-poster hero on golden horizon
gradient, terracotta CTA button, sandstone feature sections, adobe-dust cards
with umber borders, generous whitespace, saguaro silhouette focal point.
```

### Marketing social graphic
```
A Southwest travel-poster social graphic for {topic}: bold Playfair Display
headline, WPA-style painted illustration, sandstone border with umber double-line frame,
terracotta and turquoise accents, warm golden-hour palette.
```

### Dashboard (future)
```
A spacious Southwest media dashboard on sandstone, bold Arvo slab numerals in
terracotta, warm earthy stat cards with Navajo-strip accents, rounded everything.
```

---

*All prompts follow the kit's `image_prompt_prefix` and `image_prompt_suffix` verbatim.
All assets should feel handcrafted, warm, and unhurried — never slick, neon, or corporate.*
