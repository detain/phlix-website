# IMAGE GENERATION PROMPTS — Cybernetic Surge

This file records the exact prompts used to generate (or regenerate) every image asset in this brand kit site.

## Image Generation Rules (from brand kit)

**Prefix:**
```
Cybernetic chrome aesthetic, bionic augmentation illustrations, electric teal circuit traces
glowing against deep navy, chrome reflective surfaces, HUD overlay elements, angular geometric forms,
neural implant port graphics, surgical-precision cyberware,
```

**Suffix:**
```
, premium cyberpunk quality, deep navy and chrome palette, electric teal glow
accents, sharp clean edges, no warm tones, high contrast, kinetic energy.
```

**Negative prompt:**
```
warm colors, orange tones, flesh-only, organic, soft blur, retro,
nostalgic, cartoon, rounded corners, pastel, earthy, rustic,
lo-fi, static interface, warm lighting, natural textures,
```

---

## Logo (`img/logo.svg`)

**Prompt:**
```
Design a Cybernetic Surge Phlix logo: Orbitron wordmark in chrome white on deep navy,
optional hexagonal circuit-trace badge border in electric teal, minimal, angular geometry.
```

**Status:** Manually designed SVG, follows brand kit logo_rules.

---

## Favicon (`img/favicon.svg`)

**Prompt:**
```
A simple square favicon for Cybernetic Surge: hexagonal circuit node in electric teal on
deep navy background, angular geometry, minimal.
```

**Status:** Manually designed SVG.

---

## OG Image (`img/og.svg` → `img/og.png`)

**Prompt:**
```
A cybernetic chrome social graphic: Orbitron "PHLIX" wordmark in chrome white with teal glow,
"Upgrade Your Stream." tagline, circuit trace decorations, deep navy background with
subtle teal circuit grid, angular geometric forms, no warm tones.
```

**Generation command:**
```bash
node tools/gen-og.mjs --site cybernetic-surge
```

**Note:** og.svg is the editable source. tools/gen-og.mjs rasterizes it to og.png (1200×630).

---

## Feature Icons (inline SVG in HTML)

Feature icons are inline SVGs with the following style:
- 1–1.5px stroke weight
- Angular geometric joins — no rounded caps
- Electric teal (#00FF9F) as primary tint on dark surfaces
- Circuit node dots at connection points

**Icon subjects:**
1. **Library** — Book or folder with circuit traces
2. **SyncPlay** — Clock with sync/connection symbol
3. **Transcode** — Cubes or layers with transformation
4. **Auth** — Shield with checkmark
5. **Live TV** — Antenna or broadcast dish
6. **DLNA** — Screen/display with broadcast waves
7. **Plugins** — Puzzle piece or extension
8. **Hub** — Radiating connections or network node

---

## Syntha Mascot (`index.html` hero section)

**Prompt:**
```
A genderless humanoid form assembled from interlocking chrome panels and glowing teal
circuit traces. Syntha projects themselves as a holographic overlay — part HUD interface,
part bionic silhouette. Their body is partially transparent, revealing circuit pathways
within. Standing with one arm extended, projecting an upgrade interface. Calibrated focus expression.
```

**Note:** Simplified SVG representation included in index.html hero. Full mascot illustration not included in initial build.

---

## Background Texture

**Prompt:**
```
Deep navy background with ultra-subtle teal circuit trace grid at 4% opacity,
no warm tones, angular geometric wireframe at very low opacity.
```

**Status:** Implemented as CSS `circuit-bg` class using CSS gradients.
