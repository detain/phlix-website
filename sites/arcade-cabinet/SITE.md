# Arcade Cabinet Brand Kit Site — Design Rationale

## Concept & Vision

Classic arcade cabinet meets neon-lit gaming den. The aesthetic evokes the golden age of coin-op gaming — glowing arcade cabinets in dimly lit arcades, high score tables, and the satisfying click of arcade buttons. Phlix is presented as the media server equivalent of that arcade experience: powerful, self-contained, and endlessly entertaining.

## Aesthetic Direction

A **neon arcade** style with deep purple-black backgrounds and vivid magenta/cyan/gold neon accents. Think Tron meets the local arcade. The design uses glowing effects, scanline textures, and arcade-style typography to create a sense of retro-futuristic excitement.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Background | Deep Purple Black | `#1A0A2E` |
| Surface | Near Black | `#0D0D0D` |
| Surface Alt | Dark Purple | `#251442` |
| Primary | Magenta (Coin-op Glow) | `#FF00FF` |
| Secondary | Cyan (Neon Accent) | `#00FFFF` |
| Tertiary | Gold (High Score) | `#FFD700` |
| Border | Muted Purple | `#3D2066` |
| Text | White | `#FFFFFF` |
| Neutral | Muted Lavender | `#B8A3C7` |

## Typography Roles

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Headlines | Orbitron | 700, 900 | Futuristic, bold, arcade-style |
| Display | Orbitron | 400, 700 | All-caps friendly |
| Body | Barlow | 400, 500, 600, 700 | Clean, readable, modern |
| UI | Barlow | 500, 600 | Clear navigation text |
| Mono/Code | Press Start 2P | 400 | Retro pixel font for authentic arcade code blocks |

## Spatial System

- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96px
- **Max content width:** 1400px
- **Content width:** 900px
- **Grid:** `repeat(auto-fill, minmax(280px, 1fr))` with `minmax(0, 1fr)` for proper shrink behavior
- **Radius:** 2px (sm), 4px (md), 8px (lg), 12px (xl), 999px (pill)

## Motion Philosophy

**Arcade flicker animation** — The hero elements use a flicker-in animation inspired by neon signs powering up. Key characteristics:

- Staggered entrance (eyebrow → headline → subheadline → buttons)
- Flicker effect: opacity pulses through 60% → 20% → 80% → 40% → 100%
- Smooth cubic-bezier easing (`cubic-bezier(0.175, 0.885, 0.32, 1.275)`)
- Scanline overlay on body for CRT authenticity
- Neon glow shadows on key interactive elements

**Reduced motion:** All animations disabled under `prefers-reduced-motion: reduce` — content remains visible immediately.

## Visual Assets

| Asset | Description |
|-------|-------------|
| `img/logo.svg` | Phlix wordmark with neon gradient (magenta → cyan → gold) and glowing P letterform |
| `img/favicon.svg` | 32×32 magenta P on deep purple background |
| `img/og.png` | 1200×630 social share card (generated) |

## Key Design Features

1. **Neon glow effects** — CSS box-shadows with multiple layers create authentic neon light bleed
2. **Scanline texture** — Repeating gradient overlay on body simulates CRT monitor
3. **Arcade grid** — Subtle grid lines in hero section evoke arcade cabinet displays
4. **Glitch animation** — 404 page uses a subtle glitch effect on the error code
5. **Coin-op color coding** — Magenta for primary actions, cyan for secondary, gold for highlights/warnings

## Compliance Notes

- All colors from the specified palette only — no off-palette colors
- Grid uses `minmax(0, 1fr)` not bare `1fr` to prevent overflow at narrow widths
- Self-hosted fonts only (no Google Fonts CDN)
- `@copyright` inside `/* */` comment blocks in all CSS files
- `@keyframes` namespaced to avoid conflicts
- Reduced motion fully respected
