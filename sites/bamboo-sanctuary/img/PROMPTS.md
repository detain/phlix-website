# img/PROMPTS.md — Bamboo Sanctuary

> Exact generation prompts for every visual asset in this site.
> Built from `phlix-website/brand-kits/bamboo-sanctuary.js` — Bamboo Sanctuary kit.

All assets for this site are currently **inline SVG** — no raster images are shipped.
These prompts document the target look so future AI-rendered assets remain brand-faithful.

---

## Logo

```
Design a Bamboo Sanctuary logo: 'Phlix' wordmark in Cormorant Garamond Light,
charcoal ink (#2A2A25) on washi white (#F2EDE5). Optional: a single thin bamboo
stalk mark to the left of the wordmark. Extremely simple, generous negative space
around the mark, no neon, no bright color, no play button, no gear, no circuit.
Readable at 20px. Abundant surrounding air equal to the mark's own height.
```

SVG source: `img/logo.svg` — hand-authored Cormorant Garamond 300 wordmark + single bamboo stalk.

---

## Favicon

```
Minimal favicon for Bamboo Sanctuary: a single celadon (#8FAF9F) circle ring
on washi white (#F2EDE5) background. Zen bamboo node / stone circle aesthetic.
No letter P, no play button, no gear, no neon. 32x32 viewBox.
```

SVG source: `img/favicon.svg` — hand-authored celadon ring with center dot.

---

## OG Social Card (1200×630)

```
Full-bleed bamboo grove scene: muted Japanese ink wash illustration, sumi-e style,
fine rice paper grain, soft diffuse light filtering through bamboo, celadon (#8FAF9F)
and charcoal (#2A2A25) palette, washi white (#F2EDE5) background, bamboo-tan (#C5A97B)
silhouette stalks in the distance, raked gravel pattern at the base. Centered
'Phlix' wordmark in Cormorant Garamond Light at 96px, charcoal ink. Below it,
'Watch with intention.' tagline in DM Sans light weight, stone gray (#8E8E85).
Asymmetric composition with open washi space on the right. Wabi-sabi aesthetic,
no bright colors, no chrome or gloss, contemplative atmosphere.
```

SVG source: `img/og.svg` — hand-authored with bamboo stalks, raked gravel lines, radial mist glow, centered typography.

---

## Hero Backdrop (inline SVG in index.html)

```
Inline SVG hero backdrop: bamboo grove silhouette in muted sage (#7A9E89) at 20-30%
opacity on washi white (#F2EDE5). Two bamboo stalk clusters — left and right edges —
with horizontal joint marks. Center wisps of single stalks. Raked gravel parallel
curved lines at base in gravel-path tone (#E8E3DA). Diagonal filtered-light dapple
via radial gradient (morning mist veil). Asymmetric, generous negative space (ma),
no decorative flourishes, no warm orange tones. Slow sway animation (CSS, 8s loop).
```

Current implementation: `index.html` inline SVG hero section with CSS `gentle-sway` keyframe.

---

## Feature Icons (inline SVG)

All 7 feature icons are hand-authored inline SVGs (no AI generation).

**Design rules applied:**
- 1.5px stroke weight, thin and brushed
- Single charcoal (#2A2A25) color by default; celadon (#8FAF9F) for active/selected
- Rounded caps; rounded joins on curves, square joins on angular geometry
- Nature-inspired motifs where contextually appropriate
- Readable at 16px with no extraneous detail
- No fill (outlined only)

| Feature | Icon motif |
|---------|-----------|
| Library | Horizontal rule lines (folder/listing) |
| SyncPlay | Clock face with hands |
| Transcode | 3D cube/box |
| Auth (shield) | Shield outline |
| Live TV | Television with antenna |
| DLNA/broadcast | Network/dispersion circles |
| Plugins | Gear/puzzle union |
| Hub | Radiating sun/relay |

---

## Negative Prompts (applied to all image generations)

- neon, bright saturated color, HDR, lens flare
- futuristic HUD, cartoon, anime eyes, cheerful
- glossy, chrome, warm orange tones, busy composition
- dark moody horror, cyberpunk, maximalist
- no bamboo grove with harsh direct sunlight
- no concrete, glass, steel, modern interiors
- no busy patterns filling the frame

---

## Rendering Style Reference

- Rendering: watercolor + paper grain texture + linocut + vector
- Texture level: medium
- Depth: layered
- Realism: semi-realistic
- Lighting: diffuse filtered sunlight, no dramatic rim light, cool-green tint from bamboo overhead
- Contrast: low
- Composition: asymmetric (kanso + ma), single focal subject, generous open space, low horizon
