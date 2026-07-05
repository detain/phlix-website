# img/PROMPTS.md — Wilderness Trail Brand Kit Image Generation Prompts

All image assets for the Wilderness Trail brand kit should be generated using the prompts below.
Each prompt is built from the kit's `image_prompt_prefix` + subject + `image_prompt_suffix`
plus the `negative_prompt` list.

---

## Prompt formula

```
{prefix} {subject}, in the Wilderness Trail style — vintage NPS poster lithograph,
{mood}, pine green and campfire orange on canvas tan, topo-contour background texture
{suffix}

Negative: neon, cyberpunk, futuristic HUD, photorealistic, airbrushed gradient,
cold blue lighting, HDR overprocessed, chrome or metallic gloss, urban or interior
setting, pastel or soft washed-out colors, cartoon cute style, minimalist flat icon
```

Where:
- **prefix** = `Vintage National Park Service travel poster illustration, WPA woodblock print style, flat earthy color planes with confident ink outlines, canvas-tan background, pine green and campfire orange dominant, golden-hour alpenglow lighting,`
- **suffix** = `, cohesive wilderness palette (pine green, granite gray, campfire orange, sky blue, canvas tan, trail brown), topo-contour texture overlay, bold lithographic composition, high-quality, panoramic framing.`

---

## Logo

**Prompt:**
```
Vintage National Park Service travel poster illustration, WPA woodblock print style, flat earthy color planes with confident ink outlines, canvas-tan background, pine green and campfire orange dominant, golden-hour alpenglow lighting, Wilderness Trail wordmark in Playfair Display Bold on canvas tan inside a trail-blaze rectangle badge with an ink-pine 2px border, small mountain-peak silhouette above the text, pine tree on the left, cohesive wilderness palette (pine green, granite gray, campfire orange, sky blue, canvas tan, trail brown), topo-contour texture overlay, bold lithographic composition, high-quality, panoramic framing.

Negative: neon, cyberpunk, futuristic HUD, photorealistic, airbrushed gradient, cold blue lighting, HDR overprocessed, chrome or metallic gloss, urban or interior setting, pastel or soft washed-out colors, cartoon cute style, minimalist flat icon
```

**Notes:** Simple, legible at small sizes, bold enough to read on a trailhead post. Use only allowed symbols (mountain peak, pine tree, campfire flame, trail-blaze diamond). Never use play-button triangle alone, gears, neon, or photographic imagery.

---

## Hero illustration

**Prompt:**
```
Vintage National Park Service travel poster illustration, WPA woodblock print style, flat earthy color planes with confident ink outlines, canvas-tan background, pine green and campfire orange dominant, golden-hour alpenglow lighting, sweeping panoramic wilderness landscape: granite peaks at sunset, pine tree silhouette ridgeline in foreground, low horizon giving sky dominance, a single campfire flame as a point of warmth, topo-contour overlay texture at low opacity, cohesive wilderness palette (pine green, granite gray, campfire orange, sky blue, canvas tan, trail brown), topo-contour texture overlay, bold lithographic composition, high-quality, panoramic framing.

Negative: neon, cyberpunk, futuristic HUD, photorealistic, airbrushed gradient, cold blue lighting, HDR overprocessed, chrome or metallic gloss, urban or interior setting, pastel or soft washed-out colors, cartoon cute style, minimalist flat icon
```

---

## Background texture (topo wash)

**Prompt:**
```
Canvas-tan textured background with a faint topo-contour line overlay at 8% opacity in sky blue, subtle paper grain, no neon, no artificial sources, WPA lithograph print texture, flat earthy canvas surface, cohesive wilderness palette (pine green, granite gray, campfire orange, sky blue, canvas tan, trail brown), bold lithographic composition, high-quality.

Negative: neon, cyberpunk, futuristic HUD, photorealistic, airbrushed gradient, cold blue lighting, HDR overprocessed, chrome or metallic gloss, urban or interior setting, pastel or soft washed-out colors, cartoon cute style, minimalist flat icon
```

---

## OG social card (1200×630)

**Prompt:**
```
Wilderness Trail landing page: full-bleed Alpenglow gradient hero with a Playfair Display headline, campfire-orange CTA button, canvas-tan sections, aged-canvas cards with ink-pine borders, topo-contour texture, vintage NPS poster lithograph, golden-hour alpenglow lighting, cohesive wilderness palette (pine green, granite gray, campfire orange, sky blue, canvas tan, trail brown), bold lithographic composition, high-quality, 1200x630 social card format.

Negative: neon, cyberpunk, futuristic HUD, photorealistic, airbrushed gradient, cold blue lighting, HDR overprocessed, chrome or metallic gloss, urban or interior setting, pastel or soft washed-out colors, cartoon cute style, minimalist flat icon
```

---

## Feature section artwork (library, syncplay, transcode, etc.)

Each feature has a woodblock-print style inline SVG icon matching the kit's icon rules (2px stroke, rounded caps/joins, pine green, trail-relevant metaphors). These are hand-crafted inline SVGs in the HTML, not raster assets. For future illustrated hero/artwork versions:

**Prompt (library theme):**
```
Vintage NPS travel poster illustration, WPA woodblock print, folder and document stack in pine green and ink-pine outlines on canvas tan, topographic line texture in background, bold lithographic style, golden-hour alpenglow lighting, cohesive wilderness palette.

Negative: neon, cyberpunk, futuristic HUD, photorealistic, airbrushed gradient, cold blue lighting, HDR overprocessed, chrome or metallic gloss, urban or interior setting, pastel or soft washed-out colors, cartoon cute style, minimalist flat icon
```

---

## Mascot — Scout (optional)

The kit defines a mascot "Scout" — an illustrated backcountry ranger figure. To generate Scout artwork:

**Prompt:**
```
Scout the backcountry ranger mascot, vintage NPS travel poster style, flat WPA woodblock illustration, compact sturdy figure in a pine-green wide-brimmed hat and canvas pack, holding a topographic map in one hand and a tin mug in the other, confident ink-pine outline, flat color planes, canvas-tan background, topo-contour texture, wilderness palette (pine green, campfire orange, sky blue, canvas tan, trail brown), bold lithographic composition, high-quality.

Negative: neon, cyberpunk, futuristic HUD, photorealistic, airbrushed gradient, cold blue lighting, HDR overprocessed, chrome or metallic gloss, urban or interior setting, pastel or soft washed-out colors, cartoon cute style
```
