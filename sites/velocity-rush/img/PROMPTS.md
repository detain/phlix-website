# img/PROMPTS.md — Velocity Rush Asset Generation Prompts

This file documents the exact prompts used (or that would be used) to generate each image asset for the Velocity Rush brand kit site.

## Logo (`logo.svg`)

**Status:** Created as inline SVG (not raster)

```prompt
Velocity Rush logo: 'VELOCITY RUSH' wordmark in Barlow Condensed 800, all caps,
electric cyan (#00F5FF) on dark black (#1C1C1E), inside an angular parallelogram badge.
Sharp, no rounding. Optional speed-line undercut.
```

**SVG approach:** Created manually as inline SVG with:
- Speed streak "V" mark with cyan-to-pink gradient
- "VELOCITY" in bold white, "RUSH" in cyan
- Speed line accents to the right

## Favicon (`favicon.svg`)

**Status:** Created as inline SVG (not raster)

```prompt
Square favicon with dark background (#1C1C1E), a speed-streak V mark in cyan,
and a small hot pink accent dot.
```

## OG Image (`og.svg` / `og.png`)

**Status:** Created as `og.svg` (1200×630)

```prompt
A dark cinematic social graphic for Phlix:
- Dark asphalt background (#1C1C1E to #2A2A30 gradient)
- Speed-line streaks across the background (cyan to pink gradient)
- Bold 'PHLIX' in Barlow Condensed 800, white, centered
- Subtext 'Your media. Your library.' in Barlow 400, muted gray
- Accent line in glowing cyan
- Tagline 'ZERO TO PLAY. ZERO WAIT.' in cyan Barlow Condensed
- Angular corner accents in cyan and pink
```

**Rasterization:** Run `node tools/gen-og.mjs --site velocity-rush` to generate `og.png` from `og.svg`.

## Feature Icons

Each feature icon is an inline SVG defined in the HTML. They follow this pattern:

```prompt
Sharp technical icon, 1.5px stroke weight, single electric cyan color,
square corners, no rounding, night racing HUD aesthetic.
```

Icons created for:
- `library` — horizontal lines (folder/library)
- `syncplay` — circle with clock hands
- `transcode` — 3D cube/box
- `shield` — security/shield
- `antenna` — signal/antenna waves
- `broadcast` — DLNA broadcast icon
- `puzzle` — plugin/puzzle piece
- `hub` — hub/relay icon (circle with spokes)

## Background Elements

### Speed Lines (CSS-generated)
```css
/* Gradient streak across hero */
background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
animation: speed-line 3s linear infinite;
```

### Hero Glow (CSS-generated)
```css
/* Radial cyan glow behind hero content */
background: radial-gradient(ellipse at 50% 0%, rgba(0, 245, 255, 0.08) 0%, transparent 60%);
```

## Notes

- All icons are stroke-based inline SVGs with 1.5px stroke weight
- Background decorations use CSS gradients and animations (no raster images needed)
- The dark theme means no need for texture overlays or photography
- Neon glow effects achieved with CSS `box-shadow` and `filter: drop-shadow()`
- Speed-line animations use CSS keyframes with `prefers-reduced-motion` fallback
