# img/PROMPTS.md — Street Mural Brand Kit Image Generation Prompts

All image assets for the `street-mural` brand kit site. Each prompt is constructed as:
`image_prompt_prefix + subject + image_prompt_suffix`

**Prefix:** `Urban street art mural on rough concrete, aerosol spray-can style, bold stencil outlines, high saturation, hard shadows, gritty texture,`
**Suffix:** `, spray-can red, electric blue, vivid yellow, chrome silver on dark concrete, wheat-paste layering, kinetic composition, community mural energy, high contrast.`
**Negative:** pastel, muted, watercolor, soft, warm golden light, white background, studio, minimalist, luxury, corporate, flat clean vector, rounded smooth, friendly mascot style, kawaii, light mode

---

## logo.svg
**Prompt:** `Urban street art mural on rough concrete, aerosol spray-can style, bold stencil outlines, high saturation, hard shadows, gritty texture, Phlix wordmark in Impact/Anton font, white fill on dark concrete badge, optional spray-arc accent, bold zero rounding, chrome dot, no neon., spray-can red, electric blue, vivid yellow, chrome silver on dark concrete, wheat-paste layering, kinetic composition, community mural energy, high contrast.`

## favicon.svg
**Prompt:** `Urban street art mural on rough concrete, aerosol spray-can style, bold stencil outlines, high saturation, hard shadows, gritty texture, square favicon badge, letter P in Impact/Anton, white on spray-red, angular corners, bold and readable at icon scale, no neon., spray-can red, electric blue, vivid yellow, chrome silver on dark concrete, wheat-paste layering, kinetic composition, community mural energy, high contrast.`

## og.png (1200×630)
**Prompt:** `Urban street art mural on rough concrete, aerosol spray-can style, bold stencil outlines, high saturation, hard shadows, gritty texture, Phlix logo wordmark on dark concrete panel left side, large hero headline "YOUR WALL. YOUR RULES." in Impact/Anton ALL CAPS with spray-gradient fill (red to yellow), subheadline text in Barlow Condensed, spray-can drips bottom right corner, concrete texture background, asymmetric kinetic layout, no neon., spray-can red, electric blue, vivid yellow, chrome silver on dark concrete, wheat-paste layering, kinetic composition, community mural energy, high contrast.`

---

## Hero / Section Art Prompts (CSS/SVG-only placeholder — upgrade when rendering available)

### Hero Background
```prompt
Urban street art mural on rough concrete, aerosol spray-can style, bold stencil outlines, high saturation, hard shadows, gritty texture, abstract spray-can arc blast composition with overspray halos, dark concrete background, asymmetric kinetic energy, elements bleed off canvas edges, no neon glow effect., spray-can red, electric blue, vivid yellow, chrome silver on dark concrete, wheat-paste layering, kinetic composition, community mural energy, high contrast.
```

### Feature Section Background
```prompt
Urban street art mural on rough concrete, aerosol spray-can style, bold stencil outlines, high saturation, hard shadows, gritty texture, layered wheat-paste poster aesthetic, multiple overlapping stencil elements, concrete aggregate texture, chromatic aberration slight edge bleed, no neon., spray-can red, electric blue, vivid yellow, chrome silver on dark concrete, wheat-paste layering, kinetic composition, community mural energy, high contrast.
```

### Mascot: Cap (Anthropomorphic aerosol can)
```prompt
Urban street art mural on rough concrete, aerosol spray-can style, bold stencil outlines, high saturation, hard shadows, gritty texture, anthropomorphic spray-can character named Cap, chrome silver body, spray-red cap, electric-blue nozzle tip, eyes behind paint-spattered safety mask, low snapback, fingerless gloves, mid-spray arc pose, athletic b-boy proportions, bold graphic stencil eyes, community hero energy, no kawaii soft edges., spray-can red, electric blue, vivid yellow, chrome silver on dark concrete, wheat-paste layering, kinetic composition, community mural energy, high contrast.
```

---

## Inline Feature Icons (SVG — stencil cut style)

All icons: single flat color fill, 3px minimum stroke weight, hard angular caps/joins, filled preferred over outlined, tag-black border.

### library icon
```prompt
Bold filled stencil icon of a grid of four squares, 3px hard outline, tag-black border, single flat color fill (spray-red or electric-blue), angular caps, no rounding.
```

### syncplay icon
```prompt
Bold filled stencil icon of an angled pencil or edit tool, 3px hard outline, tag-black border, single flat color fill, angular caps, no rounding.
```

### transcode icon
```prompt
Bold filled stencil icon of opposing arrows (swap/exchange), 3px hard outline, tag-black border, single flat color fill, angular caps, no rounding.
```

### auth/shield icon
```prompt
Bold filled stencil icon of a shield with checkmark, 3px hard outline, tag-black border, single flat color fill, angular caps, no rounding.
```

### livetv/antenna icon
```prompt
Bold filled stencil icon of an antenna or broadcast signal, 3px hard outline, tag-black border, single flat color fill, angular caps, no rounding.
```

### dlna/broadcast icon
```prompt
Bold filled stencil icon of concentric WiFi/broadcast arcs, 3px hard outline, tag-black border, single flat color fill, angular caps, no rounding.
```

### plugins/puzzle icon
```prompt
Bold filled stencil icon of a puzzle piece, 3px hard outline, tag-black border, single flat color fill, angular caps, no rounding.
```

### hub icon
```prompt
Bold filled stencil icon of a radiating hub/satellite with center dot, 3px hard outline, tag-black border, single flat color fill, angular caps, no rounding.
```

---

## Notes
- All assets use the kit's `image_prompt_prefix` and `image_prompt_suffix` verbatim.
- Real rendering should use the negative prompt list to avoid pastel, soft, studio, minimalist, or rounded aesthetics.
- Mascot (Cap) may be omitted per kit guidance; if featured, use the character_style spec above.
- All SVG icons are rendered inline as they must match the stencil cut style exactly — no external icon CDN.
