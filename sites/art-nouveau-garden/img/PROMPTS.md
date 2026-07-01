# img/PROMPTS.md — Art Nouveau Garden

> Exact prompts used to (re)generate every image asset in this site.
> Generated from the Art Nouveau Garden brand kit (`art-nouveau-garden.js`).
> Preference: CSS/SVG artwork over raster — until real renders exist.

---

## Image Prompt Construction

Every prompt follows:
```
{image_prompt_prefix} {subject}, [kit illustration_prompt_template substitutions] {image_prompt_suffix}
Negative: {negative_prompt.join(", ")}
```

**Kit constants used:**
- Prefix: `Belle Époque Art Nouveau illustration, Alphonse Mucha style, botanical watercolor with vine and peacock feather border, ivory vellum paper, soft sage greens and dusty rose, aged gold leaf accents, warm gaslit diffuse glow,`
- Suffix: `, cohesive Art Nouveau palette (aged gold, dusty rose, sage green, ivory cream, forest ink), organic flowing composition, elegant hand-drawn linework, gentle vellum texture, high quality.`
- Negative: `neon, cyberpunk, futuristic, dark mode, sharp geometric, digital gloss, HDR, heavy contrast, horror, minimalist-cold, corporate sans-serif, tech aesthetic, photorealistic render, harsh lighting`

---

## Assets

### `logo.svg`

**Prompt:**
```
Belle Époque Art Nouveau illustration, Alphonse Mucha style, botanical watercolor with vine and peacock feather border, ivory vellum paper, soft sage greens and dusty rose, aged gold leaf accents, warm gaslit diffuse glow,
Design an Art Nouveau Garden logo: Cormorant Garamond wordmark in aged gold on ivory cream, surrounded by a botanical oval frame with lily and vine border, elegant, no neon, no tech.
, cohesive Art Nouveau palette (aged gold, dusty rose, sage green, ivory cream, forest ink), organic flowing composition, elegant hand-drawn linework, gentle vellum texture, high quality.
```
**Negative:** `neon, cyberpunk, futuristic, dark mode, sharp geometric, digital gloss, HDR, heavy contrast, horror, minimalist-cold, corporate sans-serif, tech aesthetic, photorealistic render, harsh lighting`

**Status:** Hand-crafted SVG (not AI-generated). Conforms to `logo_rules`: botanical oval frame, lily blossom, vine tendril, aged gold wordmark on ivory. Forbidden symbols (gears, play-button triangle, circuits, neon, sharp geometric) are absent.

---

### `favicon.svg`

**Prompt:**
```
Belle Époque Art Nouveau illustration, Alphonse Mucha style, botanical watercolor with vine and peacock feather border, ivory vellum paper, soft sage greens and dusty rose, aged gold leaf accents, warm gaslit diffuse glow,
A minimalist Art Nouveau lily blossom favicon: 32x32, aged gold petals and center on ivory cream, simple enough to read at 16px.
, cohesive Art Nouveau palette (aged gold, dusty rose, sage green, ivory cream, forest ink), organic flowing composition, elegant hand-drawn linework, gentle vellum texture, high quality.
```
**Negative:** `neon, cyberpunk, futuristic, dark mode, sharp geometric, digital gloss, HDR, heavy contrast, horror, minimalist-cold, corporate sans-serif, tech aesthetic, photorealistic render, harsh lighting`

**Status:** Hand-crafted SVG.

---

### `og.svg` (1200×630 Open Graph image)

**Prompt:**
```
Belle Époque Art Nouveau illustration, Alphonse Mucha style, botanical watercolor with vine and peacock feather border, ivory vellum paper, soft sage greens and dusty rose, aged gold leaf accents, warm gaslit diffuse glow,
A Belle Époque botanical poster for Phlix media server: Playfair Display headline in aged gold, painted Art Nouveau border with peacock and lily motifs, ivory ground, elegant and refined.
, cohesive Art Nouveau palette (aged gold, dusty rose, sage green, ivory cream, forest ink), organic flowing composition, elegant hand-drawn linework, gentle vellum texture, high quality.
```
**Negative:** `neon, cyberpunk, futuristic, dark mode, sharp geometric, digital gloss, HDR, heavy contrast, horror, minimalist-cold, corporate sans-serif, tech aesthetic, photorealistic render, harsh lighting`

**Note:** Currently a hand-crafted SVG. For full Twitter card support, rasterize to `og.png` at 1200×630 with the same composition and color grade. Use `svgexport` or similar: `svgexport og.svg og.png 1200:630`.

---

### Hero botanical decorations (inline SVG, CSS-rendered)

**Prompt:**
```
Belle Époque Art Nouveau illustration, Alphonse Mucha style, botanical watercolor with vine and peacock feather border, ivory vellum paper, soft sage greens and dusty rose, aged gold leaf accents, warm gaslit diffuse glow,
Art Nouveau hero corner decoration: flowing botanical vine with lily blossoms and peacock feather accents, framing a large space for headline text. Diagonal composition from top-left corner.
, cohesive Art Nouveau palette (aged gold, dusty rose, sage green, ivory cream, forest ink), organic flowing composition, elegant hand-drawn linework, gentle vellum texture, high quality.
```
**Negative:** `neon, cyberpunk, futuristic, dark mode, sharp geometric, digital gloss, HDR, heavy contrast, horror, minimalist-cold, corporate sans-serif, tech aesthetic, photorealistic render, harsh lighting`

**Status:** Implemented as hand-crafted inline SVG in `index.html` hero. Botanical forms use kit color palette (sage #7D9B76, dusty rose #C08070, aged gold #B8960C, vine ink #2C3D28).

---

### Feature icons (inline SVG)

**Prompt:**
```
Fine 1.5px outlined botanical icon of {subject}, vine-ink green (#2C3D28), rounded stroke caps, a small leaf-tip accent, no harsh angles, Art Nouveau style.
```

**Status:** Hand-crafted inline SVGs using kit icon style: 1.5px stroke, rounded caps/joins, single botanical accent per icon, nature metaphors. 8 icons: library, syncplay, transcode, shield, antenna, broadcast, puzzle, hub.

---

## Color Palette Reference

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` (Aged Gold) | `#B8960C` | Primary CTAs, gilded accents |
| `--color-secondary` (Dusty Rose) | `#C08070` | Floral accents, hover states |
| `--color-tertiary` (Sage Garden) | `#7D9B76` | Badges, vine motif fills |
| `--color-bg` (Ivory Cream) | `#F5EFE0` | Default page background |
| `--color-surface` (Parchment) | `#FAF5EA` | Cards and panels |
| `--color-surface-alt` (Sage Mist) | `#EAF0E6` | Alternate surfaces |
| `--color-text` (Forest Ink) | `#1F2E1A` | Body and headline text |
| `--color-text-muted` (Warm Umber) | `#7A6352` | Muted text, dividers |
| `--color-border` (Vine Ink) | `#2C3D28` | Fine botanical borders |
| `--color-peacock` | `#3D7A8A` | Links, info states |
| `--color-success` (Lily Pad) | `#A8C8A0` | Success confirmations |
| `--color-warning` (Amber Petal) | `#D4A83C` | Warnings |
| `--color-error` (Faded Crimson) | `#9E4848` | Errors, destructive actions |

---

## Typography Reference

| Role | Font | Weights | Tracking |
|------|------|---------|---------|
| Headline | Cormorant Garamond | 600, 700 | 0.04em |
| Display | Playfair Display | 700, 900 | 0.06em |
| Body | EB Garamond | 400, 500 | 0.01em |
| UI | Josefin Sans | 300, 400, 600 | 0.08em |
| Mono | Courier Prime | 400, 700 | 0em |

---

## Seasonal Variants (documented, not applied)

The kit defines 4 seasonal variants — see `SITE.md` §Seasonal Variants. To apply one, uncomment its token overrides in `theme.css`.

1. **Midsummer Bloom** (Jun 1–Aug 31): Warmer ivory, terracotta rose, fresh sage
2. **Autumn Harvest Bower** (Sep 22–Nov 30): Amber/bronze gold, harvest palette
3. **Winter Conservatory** (Dec 1–Feb 28): Frosted sage, cool ivory, muted gold
4. **Spring Awakening** (Mar 1–May 31): Cherry blossom pink, fresh sage, new tendrils

---

*Last generated: 2026-06-30 — Art Nouveau Garden v1.0*
