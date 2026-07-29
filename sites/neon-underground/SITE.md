# Neon Underground — Brand Kit Site

## Concept & Vision

Neon Underground captures the raw energy of underground club culture — bass drops, strobing lights, fog machines, and laser grids. The site pulses with electric life, featuring neon colors against deep black backgrounds, scanline overlays, and flickering text effects that evoke late-night dance floors and DIY venue aesthetics.

## Aesthetic Direction

Underground club scene meets digital neon. Think CRT monitors in a dark basement venue, LED strip lighting casting colorful glows, and laser grids cutting through smoke. The visual language is unapologetically bold — bright neons on near-black backgrounds with a sense of controlled chaos and underground authenticity.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary | Neon Magenta | `#FF00FF` |
| Secondary | Neon Green | `#00FF88` |
| Accent | Electric Yellow | `#FFFF00` |
| Hot | Hot Pink | `#FF0080` |
| Background | Near Black | `#0A0A0A` |
| Surface | Dark Surface | `#141414` |
| Elevated | Dark Elevated | `#1E1E1E` |
| Text | Off White | `#F0F0F0` |
| Text Muted | Gray | `#A0A0A0` |

## Typography

- **Display**: Orbitron (700) — futuristic, tech-forward, all-caps with letter-spacing
- **Body**: Exo 2 (400) — clean, readable, slight sci-fi feel
- **Mono**: JetBrains Mono (500) — for code blocks and terminal elements

All fonts are self-hosted from the shared font pool (`../../assets/fonts/`).

## Spatial System

- Spacing scale: 4px base (0.25rem) up to 96px (6rem)
- Border radius: 4px to 24px
- Max content width: 1400px
- Grid: `minmax(0, 1fr)` for all flexible tracks

## Motion Philosophy

1. **Scanline overlay**: Subtle horizontal lines animate vertically across hero sections
2. **Flicker effect**: Eyebrow text occasionally flickers like a neon sign
3. **Glow pulses**: Buttons and accents have soft neon glow that pulses
4. **Hover transforms**: Cards lift with enhanced glow on hover
5. **Scroll reveals**: Content fades in as it enters viewport (gated by prefers-reduced-motion)

All motion is disabled under `prefers-reduced-motion: reduce`.

## Visual Assets

- **Logo**: "Phlix" wordmark with P in magenta-to-pink gradient, rest in off-white, accent line in neon green
- **Favicon**: Dark square with glowing P in magenta-to-green gradient
- **OG Image**: 1200x630 with dark gradient background, grid pattern, centered wordmark and tagline
- **Icons**: Stroke-based inline SVGs in neon green with glow filter

## Icon Set (8 features)

All inline SVG, stroke-based, single color (neon green):
1. `library` — book icon
2. `syncplay` — clock with play indicator
3. `transcode` — lightning bolt
4. `shield` — security shield
5. `antenna` — broadcast/signal waves
6. `broadcast` — TV screen with signal
7. `puzzle` — puzzle piece
8. `hub` — globe with network lines

## Component States

- **Buttons**: Glow intensity increases on hover, inverts on primary hover
- **Cards**: Border color shifts, shadow intensifies, subtle lift on hover
- **Links**: Color transitions from green to magenta

## Technical Notes

- No external CDN requests (fonts, scripts, or styles)
- All colors defined as CSS custom properties
- Grid tracks use `minmax(0, 1fr)` to prevent overflow
- Self-hosted fonts: Orbitron 700, Exo 2 400, JetBrains Mono 500, Fira Code 400
