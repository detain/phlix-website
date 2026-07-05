# img/PROMPTS.md — Speakeasy Gold Image Generation Prompts

> These prompts are used to generate the visual assets for the Speakeasy Gold brand kit.
> They follow the kit's `image_prompt_prefix` + subject + `image_prompt_suffix` + `negative_prompt[]` structure.

## Prompt prefix
> Art Deco 1920s speakeasy illustration, gilded line engraving on midnight black lacquer, champagne gold geometric ornament, warm amber candlelight, deep moody shadows,

## Prompt suffix
> , cohesive Speakeasy Gold palette (champagne #C9A84C, midnight #0A0806, bourbon amber, ivory cream, Art Deco emerald), geometric sunburst and stepped-arch framing, high contrast, glamorous and clandestine atmosphere, premium quality.

## Negative prompts
```
daylight, bright white backgrounds, pastel, flat minimal, corporate,
neon, cyberpunk, futuristic, blue cool tones, HDR, horror,
cartoonish, family-friendly primary colors, rough textures, grungy
```

---

## Asset prompts

### `logo.svg`
**Subject:** PHLIX wordmark in Poiret One champagne gold on midnight black, inside a stepped-arch Art Deco badge with double gold rule borders. Elegant, glamorous, 1920s. No neon, no film reels.

**Full prompt:**
`Art Deco 1920s speakeasy illustration, gilded line engraving on midnight black lacquer, champagne gold geometric ornament, warm amber candlelight, deep moody shadows, PHLIX wordmark in Poiret One champagne gold on midnight black, inside a stepped-arch Art Deco badge with double gold rule borders. Legible, glamorous, 1920s. No neon, no film reels., cohesive Speakeasy Gold palette (champagne #C9A84C, midnight #0A0806, bourbon amber, ivory cream, Art Deco emerald), geometric sunburst and stepped-arch framing, high contrast, glamorous and clandestine atmosphere, premium quality.`

**Negative:** `daylight, bright white backgrounds, pastel, flat minimal, corporate, neon, cyberpunk, futuristic, blue cool tones, HDR, horror, cartoonish, family-friendly primary colors, rough textures, grungy`

---

### `og.svg` (1200×630 social share)
**Subject:** 1920s Art Deco speakeasy social graphic: PHLIX in Poiret One champagne gold, Art Deco sunburst, midnight black ground, stepped-arch frame. Premium quality.

**Full prompt:**
`Art Deco 1920s speakeasy illustration, gilded line engraving on midnight black lacquer, champagne gold geometric ornament, warm amber candlelight, deep moody shadows, 1920s Art Deco speakeasy social graphic: PHLIX in Poiret One champagne gold headline, Art Deco sunburst, stepped-arch doorway silhouette, midnight black ground, champagne bubble particles, geometric filigree border. Glamorous and clandestine., cohesive Speakeasy Gold palette (champagne #C9A84C, midnight #0A0806, bourbon amber, ivory cream, Art Deco emerald), geometric sunburst and stepped-arch framing, high contrast, glamorous and clandestine atmosphere, premium quality.`

**Negative:** `daylight, bright white backgrounds, pastel, flat minimal, corporate, neon, cyberpunk, futuristic, blue cool tones, HDR, horror, cartoonish, family-friendly primary colors, rough textures, grungy`

---

### `favicon.svg`
**Subject:** Art Deco hexagonal badge mark with PHLIX P letterform in champagne gold on midnight black. Simple, legible at 32×32.

**Full prompt:**
`Art Deco 1920s speakeasy illustration, gilded line engraving on midnight black lacquer, champagne gold geometric ornament, warm amber candlelight, deep moody shadows, Art Deco hexagonal badge mark with P letterform in champagne gold on midnight black, simple geometric icon, elegant, legible at small sizes, no neon, no film reels., cohesive Speakeasy Gold palette (champagne #C9A84C, midnight #0A0806, bourbon amber, ivory cream, Art Deco emerald), geometric sunburst and stepped-arch framing, high contrast, glamorous and clandestine atmosphere, premium quality.`

**Negative:** `daylight, bright white backgrounds, pastel, flat minimal, corporate, neon, cyberpunk, futuristic, blue cool tones, HDR, horror, cartoonish, family-friendly primary colors, rough textures, grungy`

---

### Hero section artwork (CSS-only, no external image)
The hero uses a CSS-generated Art Deco sunburst pattern (repeating conic-gradient) with a gilded-candelabra radial gradient. No external image needed — the atmosphere is built entirely from CSS.

---

### Feature card imagery (inline SVG icons)
7 inline SVG icons are hand-coded in the Speakeasy Gold Art Deco geometric style:
- `library` — horizontal lines (organize)
- `syncplay` — clock/timer (SyncPlay)
- `transcode` — 3D cube (transcode)
- `shield` — shield (auth)
- `antenna` — broadcast/antenna (Live TV)
- `broadcast` — signal waves (DLNA)
- `puzzle` — puzzle piece (plugins)
- `hub` — hub/network nodes (Hub)

All use 1.5px stroke weight, Art Deco geometric forms, champagne gold (#C9A84C) on dark backgrounds.
