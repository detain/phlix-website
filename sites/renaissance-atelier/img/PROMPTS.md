# Image Generation Prompts — Renaissance Atelier

This file records the exact prompts used (or that would be used) to generate every
image asset for the Renaissance Atelier brand kit site.

All prompts follow the kit's `image_prompt_prefix` + subject + `image_prompt_suffix` +
`negative_prompt` formula per brand kit §16.

---

## 1. `logo.svg`

**Subject**: Phlix wordmark "Phlix" in Cormorant Garamond semibold, enclosed in an
ochre-gold oval tondo frame with a fine double-rule border.

**Prompt**:
```
Italian Renaissance oil painting style, sfumato chiaroscuro lighting, single
warm candlelight source from upper left, deep lapis lazuli shadows, ochre and
ivory highlights, parchment ground texture, Florentine bottega atmosphere,
Phlix wordmark in Cormorant Garamond semibold, enclosed in an ochre-gold oval
tondo frame with double-rule border, lapis lazuli (#2B4A8C) wordmark on ivory
parchment (#F4ECD8) ground, small candle lantern accent symbol, masterful
Renaissance composition, golden-ratio layout, rich earthy pigments, high
detail, no neon, no digital effects, museum-quality rendering.
```

**Negative**: `neon cyberpunk synthwave flat design minimalist white cool grey HDR lens flare chrome glossy plastic digital gradients cartoonish anime low detail muddy oversaturated blue shadows`

---

## 2. `favicon.svg`

**Subject**: A 32×32 square favicon with lapis lazuli (#2B4A8C) background, a
subtle ochre-gold (#C8971A) single-rule tondo oval, and the letter "P" in ochre
gold as the Phlix initial.

**Prompt**:
```
Italian Renaissance oil painting style, sfumato chiaroscuro, lapis lazuli
background, ochre-gold tondo oval frame, serif letterform "P" in ochre gold,
minimalist composition, clean legible mark, high detail at small size, no neon,
no digital effects.
```

**Negative**: `neon cyberpunk flat design minimalist-white cool-grey HDR cartoonish anime low-detail muddy oversaturated`

---

## 3. `og.svg` (1200×630 social share image)

**Subject**: A full-bleed Open Graph social card showing the Phlix hero with
chiaroscuro lapis-to-ochre gradient, the headline "Your media. Your library.
Illuminated." in ivory and ochre gold Cormorant Garamond, with gold rule accents
and a subtle tondo logo mark.

**Prompt**:
```
Italian Renaissance oil painting style, sfumato chiaroscuro lighting, single
warm candlelight source from upper left, deep lapis lazuli shadows, ochre and
ivory highlights, parchment ground texture, Florentine bottega atmosphere,
a grand hero composition with the headline "Your media. Your library.
Illuminated." in ivory Cormorant Garamond with ochre gold on a chiaroscuro
lapis-to-ochre gradient backdrop, subtle gold rule lines, small Phlix wordmark
in an ochre-gold tondo oval at top right, calm noble Renaissance atmosphere,
masterful composition, golden-ratio layout, high detail, no neon, no digital
effects, museum-quality rendering.
```

**Negative**: `neon cyberpunk synthwave flat design minimalist-white cool-grey HDR lens flare chrome glossy plastic digital gradients cartoonish anime low-detail muddy oversaturated blue shadows`

---

## 4. Feature icons (inline SVG, 7 total)

Each feature icon is a hand-drawn quill-style SVG with:
- 1.5px stroke weight in underdrawing brown (#3D1A0A)
- Outlined, slightly imperfect strokes — quill pen sensibility
- Rounded caps, classical joins
- Lapis lazuli (#2B4A8C) for state-bearing icons; underdrawing brown for neutral

### `icon-library.svg`
**Subject**: An open folio / bookshelf icon in Renaissance style.
```
Quill-drawn classical icon of an open folio or library shelf, 1.5px burnt
sienna (#3D1F0A) stroke, slightly imperfect hand-drawn quality, no sharp
geometric corners, outled style, single colour.
```

### `icon-syncplay.svg`
**Subject**: A clock face with sync/play symbols — representing synchronized playback.
```
Quill-drawn classical icon of a clock face with a small play triangle at
centre, 1.5px burnt sienna stroke, slightly imperfect hand-drawn quality,
outlined style, duotone lapis + ochre accent on the clock hand.
```

### `icon-transcode.svg`
**Subject**: A gem/crystal being faceted — representing quality transcoding.
```
Quill-drawn classical icon of a multifaceted gem or crystal, 1.5px burnt
sienna stroke, slightly imperfect hand-drawn quality, outlined style, lapis
lazuli fill on one facet.
```

### `icon-shield.svg`
**Subject**: A Renaissance shield with a lock — representing auth/security.
```
Quill-drawn classical icon of a Renaissance shield with a keyhole, 1.5px
burnt sienna stroke, slightly imperfect hand-drawn quality, outlined style,
duotone lapis + ochre.
```

### `icon-antenna.svg`
**Subject**: An antenna/signal icon — representing Live TV.
```
Quill-drawn classical icon of an antenna or signal tower, 1.5px burnt sienna
stroke, slightly imperfect hand-drawn quality, no sharp geometric corners,
outlined style.
```

### `icon-broadcast.svg`
**Subject**: A broadcast/waves icon — representing DLNA.
```
Quill-drawn classical icon of concentric broadcast waves, 1.5px burnt
sienna stroke, slightly imperfect hand-drawn quality, no sharp geometric
corners, outlined style.
```

### `icon-puzzle.svg`
**Subject**: A puzzle piece / connector — representing plugins.
```
Quill-drawn classical icon of a puzzle piece or gear-connector, 1.5px burnt
sienna stroke, slightly imperfect hand-drawn quality, no sharp geometric
corners, outlined style, duotone lapis + ochre.
```

### `icon-hub.svg`
**Subject**: A hub/compass — representing Phlix Hub.
```
Quill-drawn classical icon of a compass or hub symbol with radiating lines,
1.5px burnt sienna stroke, slightly imperfect hand-drawn quality, no sharp
geometric corners, outlined style, lapis lazuli for the compass needle.
```

**Global icon negative**: `sharp geometric Material icons Heroicons unmodified multiple colours filled solid heavy`

---

## 5. Hero illustration (CSS-only, not raster)

The hero section uses layered CSS gradients to achieve the sfumato chiaroscuro
effect without a raster illustration:
- `gradient-lapis` radial from #2B4A8C to #1A2D5A (deep lapis background)
- `gradient-chiaroscuro` linear 160° from #2C1A0E through #A0522D to #C8971A
- `gradient-candle-bloom` radial warm glow from ochre gold

This approach is intentionally CSS/SVG-only per new_site.md §8 ("Until real renders
exist, CSS/SVG-only artwork is preferred over raster placeholders").

---

## 6. Background texture (CSS-only)

Parchment grain texture is achieved via:
- `background-color: var(--color-bg)` (#F4ECD8 ivory parchment)
- Subtle CSS `box-shadow` inset effects for depth
- No external texture images required

---

*Prompts in this file follow the kit's `illustration_prompt_template`:
`{prefix} {subject}, in the Renaissance Atelier style, sfumato chiaroscuro
atmosphere, Florentine bottega setting, {mood}, rendered in earthy pigments
on parchment ground {suffix}`*
