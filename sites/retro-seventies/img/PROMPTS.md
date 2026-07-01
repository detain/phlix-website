# img/PROMPTS.md — Retro Seventies Brand Kit
# Exact prompts for regenerating every image asset

All prompts follow the kit's `illustration_prompt_template`:
`{image_prompt_prefix} {subject}, in the Retro Seventies style, {mood}, set against a warm earthy mahogany ground with psychedelic geometric accents {image_prompt_suffix}`

With:
- `image_prompt_prefix`: "1970s retro illustration, warm earth tones, burnt orange and harvest gold and avocado green, psychedelic geometric patterns, analog warmth, record sleeve art,"
- `image_prompt_suffix`: ", warm earthy palette (deep mahogany, burnt orange, harvest gold, avocado green, cream paper), 35mm film grain, Kodachrome color grade, rounded organic shapes, retro silkscreen illustration style, high quality."
- `negative_prompt`: "cold, blue shadows, neon electric, cyberpunk, minimalist, clinical, corporate, sterile, hyper-modern, futuristic chrome, pastel soft, flat white background, dark noir, angular sharp geometry, sans-texture"

---

## logo.svg
**Subject**: "Phlix wordmark in Playfair Display bold on deep mahogany"
**Mood**: "bold, legible, warm editorial"
**Prompt**:
```
1970s retro illustration, warm earth tones, burnt orange and harvest gold and avocado green, psychedelic geometric patterns, analog warmth, record sleeve art, Phlix wordmark in Playfair Display bold on deep mahogany, bold legible warm editorial, set against a warm earthy mahogany ground with psychedelic geometric accents, warm earthy palette (deep mahogany, burnt orange, harvest gold, avocado green, cream paper), 35mm film grain, Kodachrome color grade, rounded organic shapes, retro silkscreen illustration style, high quality.
```
**Negative**: cold, blue shadows, neon electric, cyberpunk, minimalist, clinical, corporate, sterile, hyper-modern, futuristic chrome, pastel soft, flat white background, dark noir, angular sharp geometry, sans-texture

---

## favicon.svg (32x32)
**Subject**: "Square icon with vinyl record grooves in burnt orange on deep mahogany"
**Mood**: "bold, simple, recognizable at small sizes"
**Prompt**:
```
1970s retro illustration, warm earth tones, burnt orange and harvest gold and avocado green, psychedelic geometric patterns, analog warmth, record sleeve art, square icon with vinyl record grooves in burnt orange on deep mahogany, bold simple recognizable at small sizes, set against a warm earthy mahogany ground with psychedelic geometric accents, warm earthy palette (deep mahogany, burnt orange, harvest gold, avocado green, cream paper), 35mm film grain, Kodachrome color grade, rounded organic shapes, retro silkscreen illustration style, high quality.
```
**Negative**: cold, blue shadows, neon electric, cyberpunk, minimalist, clinical, corporate, sterile, hyper-modern, futuristic chrome, pastel soft, flat white background, dark noir, angular sharp geometry, sans-texture

---

## og.svg (1200x630)
**Subject**: "Full-bleed social share card with Phlix wordmark, vinyl groove circles, and tagline 'Rewind. Replay. Relive.'"
**Mood**: "groovy, warm, editorial"
**Prompt**:
```
1970s retro illustration, warm earth tones, burnt orange and harvest gold and avocado green, psychedelic geometric patterns, analog warmth, record sleeve art, full-bleed social share card with Phlix wordmark, vinyl groove circles, and tagline "Rewind. Replay. Relive.", groovy warm editorial, set against a warm earthy mahogany ground with psychedelic geometric accents, warm earthy palette (deep mahogany, burnt orange, harvest gold, avocado green, cream paper), 35mm film grain, Kodachrome color grade, rounded organic shapes, retro silkscreen illustration style, high quality.
```
**Negative**: cold, blue shadows, neon electric, cyberpunk, minimalist, clinical, corporate, sterile, hyper-modern, futuristic chrome, pastel soft, flat white background, dark noir, angular sharp geometry, sans-texture

---

## Hero illustration (CSS/SVG — vinyl groove concentric circles)
Built entirely in CSS/SVG inline. No raster image prompt needed.
The hero uses inline SVG concentric circles (`<circle>` elements) with the brand's
`--color-primary` (#D4570D) and `--color-tertiary` (#C9A22B) at low opacity,
plus the CSS `radial-gradient` ambient warm glow and the wood-grain repeating
linear gradient overlay.

---

## Feature section backgrounds
CSS-only using:
- Wood-grain overlay: `repeating-linear-gradient(92deg, transparent 0px, transparent 3px, rgba(122,106,82,0.04) 3px, rgba(122,106,82,0.04) 4px)`
- Warm ambient glow: `radial-gradient(ellipse 70% 60% at 50% 40%, rgba(212,87,13,0.18) 0%, transparent 70%)`
- Wood-paneling top border on `.pitch`: `linear-gradient(90deg, #D4570D, #C9A22B, #8B9B3A)`

---

## Mascot: Groove the lava lamp blob
**Subject**: "Groove, a friendly anthropomorphic lava lamp blob character in burnt orange with harvest gold lamp base, bell-bottom trousers, holding a vinyl record"
**Mood**: "laid-back, endlessly enthusiastic, warm-hearted, grooving"
**Prompt**:
```
1970s retro illustration, warm earth tones, burnt orange and harvest gold and avocado green, psychedelic geometric patterns, analog warmth, record sleeve art, Groove the lava lamp blob character — rounded wobbling orange blob with small round eyes and wide friendly grin, housed in a classic chrome lava lamp silhouette with harvest gold base and avocado green accents, wearing tiny bell-bottom trousers, holding a vinyl record, laid-back endlessly enthusiastic warm-hearted grooving mood, set against a warm earthy mahogany ground with psychedelic geometric accents, warm earthy palette (deep mahogany, burnt orange, harvest gold, avocado green, cream paper), 35mm film grain, Kodachrome color grade, rounded organic shapes, retro silkscreen illustration style, high quality.
```
**Negative**: cold, blue shadows, neon electric, cyberpunk, minimalist, clinical, corporate, sterile, hyper-modern, futuristic chrome, pastel soft, flat white background, dark noir, angular sharp geometry, sans-texture
