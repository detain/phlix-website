<!-- PROMPTS.md — Storm Chaser image asset generation prompts -->

# Storm Chaser — Image Asset Prompts

This file records the exact prompts used to generate every raster image asset.
Until real renders exist, CSS/SVG-only artwork is the preferred approach.

---

## img/logo.svg

**Status:** SVG — hand-authored, no generation needed.

**Description:** Bebas Neue wordmark "PHLIX" in lightning white (#F0F4FF) on a transparent background,
with an animated vortex mark on the left: concentric amber rings with a lightning bolt at the center.
Cloud wisps in storm navy add depth.

**Editable source:** `img/logo.svg` — modify directly in any vector editor.

---

## img/favicon.svg

**Status:** SVG — hand-authored.

**Description:** 32×32 square favicon in storm navy (#1B1464) with an amber lightning bolt centered.
Use as-is as the site favicon and as the basis for theme-color.

---

## img/og.svg

**Status:** SVG — hand-authored. NOTE: meta tags require a rasterized `og.png` at 1200×630.
Generate with: `node tools/gen-og.mjs --site storm-chaser`

**Description:** Full-bleed storm-night background (#0D0B1E) with a radial storm-navy gradient overlay,
a decorative vortex mark in the right half (concentric amber rings + lightning bolt),
"Bebas Neue PHIX" wordmark in lightning white, and the tagline in storm gray.

**Prompt:** (SVG hand-authored — no generation prompt needed)

---

## img/PHLIX-logo.png (social share)

**Status:** Rasterize og.svg via `node tools/gen-og.mjs --site storm-chaser`

---

## CSS/SVG Artwork Principles

- **Hero backgrounds:** CSS-only using radial-gradient, conic-gradient, and layered backgrounds.
  Do not ship a raster hero image — use the CSS storm atmosphere.
- **Icons:** Inline SVGs per the icon style (stroke-based, 2px weight, sharp corners, amber accent).
- **Decorative elements:** CSS-only rain streaks (repeating-linear-gradient at -60deg),
  vortex rings (CSS animation on ::before pseudo-elements), lightning flicker (CSS keyframe animation on text-shadow).
- **If a raster illustration is needed:** Use the following prompt template:

### Prompt template for raster illustrations:
```
{prefix} {subject} in the Storm Chaser supercell aesthetic, {mood},
set against a dramatic lightning-charged storm sky, deep storm-night background,
electric amber lightning highlights, blue-gray storm cloud,
diagonal rain, cinematic composition, high quality, dramatic weather.

Negative: pastel, soft focus, warm golden hour, light background, white background,
blue sky, sunny, calm, peaceful, warm tones, cozy, cartoonish, cute, gentle.
```

### Prefix:
`Supercell storm at night, dramatic lightning bolts across storm-navy sky,
rotating cloud vortex, rain streaks, electric amber highlights, digital
HUD overlay aesthetic, high contrast cinematic storm photography,`

### Suffix:
`, deep storm-night background, electric amber lightning, blue-gray storm cloud,
diagonal rain, cinematic composition, high quality, dramatic weather, Storm Chaser brand palette.`

---

## Icon Prompt (for future raster icon set)

"Design icons for the Storm Chaser brand: 8 media server feature icons,
bold outlined style, 2px stroke, storm-gray default (#7F8C8D), electric amber
active state (#F7981D), sharp corners, HUD aesthetic, no soft rounded joins,
storm chaser brand, icon set for library, syncplay, transcode, shield, antenna, broadcast, puzzle, hub."
