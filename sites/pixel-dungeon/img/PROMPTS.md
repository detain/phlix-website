# Pixel Dungeon — Image Generation Prompts
# All prompts built from brand kit field 16 (AI Generation Guidance)

## Logo
```
8-bit pixel art logo: Press Start 2P wordmark "PHLIX" in Screen White (#F5F5F0) on
Cartridge Black (#0A0A0A), 2px Mario Red (#E8001A) rectangular border,
2px hard black drop shadow, 0px radius, no smooth gradients, optional pixel sword icon.
```
Expected output: `img/logo.svg` — wordmark with Mario Red border on black.

## Favicon
```
16×16 pixel art favicon, "P" letterform in Press Start 2P style,
Mario Red (#E8001A) fill, Screen White (#F5F5F0) text, 0px radius,
hard pixel edges, Cartridge Black background.
```
Expected output: `img/favicon.svg` — Mario Red square with white P.

## Hero Blip Sprite
```
16×16 pixel art character sprite, 8-bit NES style, Blip the hero:
red tunic (Mario Red #E8001A), blue trousers (#0055AA),
2×2 pixel white eyes with 1×1 black pupils, 2-frame walk cycle.
Two poses: (1) left foot forward, (2) right foot forward.
Cartridge Black background. No anti-aliasing.
```
Expected output: `img/blip-sprite.svg` — 16×16 pixel sprite with 2-frame walk.

## OG Image (1200×630)
```
8-bit retro gaming social graphic: Cartridge Black (#0A0A0A) background,
Press Start 2P "PHLIX" wordmark in Screen White at 80px,
"Insert Coin. Begin Story." in Coin Yellow (#FFCC00) and Screen White,
five 8-bit coin sprites across the bottom row,
Mario Red (#E8001A) 4px border frame, NES cartridge label art style,
CRT scanline overlay at 5% opacity.
```
Expected output: `img/og.svg` (1200×630) — social share card.

## Feature Icons (inline SVG, 7 total)
Each icon: 16×16 or 32×32 pixel grid, 4-color palette
(black outline + dark fill + mid fill + white highlight), no anti-aliasing,
fill-based (not stroke-based), NES sprite style.

1. **library** — Grid of 4 tiles in 2×2, representing organized media.
2. **syncplay** — Concentric circles with radiating lines (time sync metaphor).
3. **transcode** — Rectangle with play triangle (HLS/video processing).
4. **shield** — Classic RPG shield shape (auth/multi-profile).
5. **antenna** — TV antenna with broadcast waves (Live TV/DVR).
6. **broadcast/dlna** — Monitor with broadcast waves (DLNA).
7. **puzzle** — 2×2 grid of square puzzle pieces (plugin system).
8. **hub** — Circle with checkmark inside (connected hub).

All rendered as inline SVG paths filled with currentColor, matching the
kit's icon rules (fill-based, pixel-perfect, max 4 colors per icon).

## Background Texture
```
Cartridge Black (#0A0A0A) background with subtle 8×8 pixel tile pattern
in #111111. CRT scanline overlay (2px stripe, 5% black).
No text. Tileable.
```

## Landing Page Illustration
```
8-bit retro gaming media landing page hero illustration:
Cartridge Black background, Press Start 2P headline in Screen White,
pixel-art hero scene with Blip sprite running across the hero area,
Mario Red CTA button, Screen Black card sections,
CRT scanline overlay — NES cartridge label art style.
```

## Dashboard Illustration
```
8-bit retro game HUD dashboard on Cartridge Black:
Press Start 2P stat numerals in Coin Yellow-Green (#88BB00),
Screen Black (#151515) cards with 2px #333333 borders,
heart and coin pixel sprites as stat icons,
2px hard drop shadows everywhere.
```
