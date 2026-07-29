# Rave Cave — Brand Kit Site

## Concept & Vision

Rave Cave is an underground warehouse rave aesthetic — blacklight-reactive, fog-filled, neon-soaked. It should feel like stepping into a dark room that erupts in UV light, where glow sticks pulse and the bass reverberates through the walls. The site is for the underground, the self-hosted, the bold.

## Aesthetic Direction

Underground warehouse rave. UV-reactive colors. Glow sticks and blacklight. Fog machines and pounding bass. Neon on black. Electric energy in the dark.

**Mood references:** Warehouse raves, blacklight posters, neon signs in fog, glow stick bracelets, underground electronic music scenes.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Background | Void Black | `#0A0A0B` |
| Background Elevated | Deep Black | `#111111` |
| Background Card | Card Black | `#0f0f0f` |
| Background Input | Input Black | `#161616` |
| Primary | Electric Purple | `#CC00FF` |
| Primary Glow | Purple Glow | `rgba(204, 0, 255, 0.4)` |
| Secondary | Neon Green | `#00FF00` |
| Secondary Glow | Green Glow | `rgba(0, 255, 0, 0.4)` |
| Accent | Electric Orange | `#FF6600` |
| Accent Glow | Orange Glow | `rgba(255, 102, 0, 0.4)` |
| Deep | Deep Blue | `#3300CC` |
| Deep Glow | Blue Glow | `rgba(51, 0, 204, 0.3)` |
| Text | Near White | `#EEEEEE` |
| Text Muted | Soft Grey | `#AAAAAA` |
| Text Dim | Dim Grey | `#666666` |
| Border | Purple Border | `rgba(204, 0, 255, 0.25)` |
| Border Hover | Purple Hover | `rgba(204, 0, 255, 0.6)` |

## Typography

- **Display/Headings:** Orbitron — futuristic, geometric, all-caps energy. Uppercase with letter-spacing for headlines.
- **UI/Mono:** Share Tech Mono — technical, readable, used for nav, labels, badges, code.
- **Body:** Rajdhani — semi-condensed, clean, readable at body sizes.
- **Note:** Self-hosted fonts referenced. No Google Fonts CDN.

## Spatial System

- Max content width: `1400px`
- Header height: `72px`
- Spacing scale: 0.25rem base (4px), up to 6rem
- Border radius: 4px–24px scale with `radius-full: 9999px`
- Cards use `radius-xl` (16px) to `radius-2xl` (24px)

## Motion Philosophy

- Neon glow pulses (CSS keyframe `pulse-glow`) on accent elements
- Float animation on decorative elements (gentle 4s translateY)
- Scroll reveals via IntersectionObserver — fade + translateY(20px)
- All animations respect `prefers-reduced-motion: reduce`
- Hover states lift cards with glow shadows
- No jarring motion — the vibe is smooth electronic flow

## Visual Assets

- **logo.svg** — Orbitron wordmark "PHLIX" with gradient fill and purple glow, stylized "P" mark with accent circle
- **favicon.svg** — Purple "P" on black square, matches brand
- **og.png** — 1200×630 rasterized social card (use `tools/gen-og.mjs` to regenerate)
- **Inline SVG icons** — Single-color stroke-based icons for 8 features (library, syncplay, transcode, shield, antenna, broadcast/dlna, puzzle, hub)
- **Decorative glow lines** — Gradient horizontal rules separating sections

## Component Patterns

- **Cards:** Dark backgrounds with glowing border on hover, lift transform
- **Buttons:** Primary = solid purple with glow shadow, Secondary = transparent with purple border
- **Code blocks:** Dark input background, green monospace text
- **Badges:** Small colored pills (stable=green, beta=orange)
- **Footer:** 3-column grid with colored headings, tagline in brand gradient

## Technical Notes

- CSS custom properties for all tokens — no raw hex in components
- Grid tracks use `minmax(0, 1fr)` to prevent overflow from long words
- `overflow-wrap: anywhere` on body text, `break-word` on headings
- Mobile nav with focus trap, escape-to-close, outside-click-to-close
- `defer`-loaded vanilla JS — no dependencies, no CDNs
