# Synthwave Sunset — Brand Kit Site

## Concept & Vision

Synthwave Sunset channels the electric energy of 80s retrofuturism — neon pink and cyan sunsets bleeding into chrome horizons, a digital horizon stretching to infinity. The aesthetic is nostalgic yet futuristic, like booting up a forgotten arcade machine that somehow knows exactly what you want to watch.

## Aesthetic Direction

**Theme:** 80s retrowave — neon pink and cyan, grid horizons, chrome reflections, scanlines.
**Mood:** Energetic, nostalgic, electric — like driving through a synthwave music video at midnight.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Neon Pink | `#FF2E63` | Headings, primary CTAs, glow effects |
| Secondary | Electric Cyan | `#08D9D6` | Links, accents, neon glow |
| Tertiary | Ultraviolet | `#9D4EDD` | Hover states, secondary accents |
| Background | Midnight | `#252A34` | Page background, dark surfaces |
| Surface | Dark Panel | `#1E2229` | Card surfaces |
| Surface Alt | Grid Cell | `#2A303C` | Elevated elements |
| Text | Chrome White | `#EAEAEA` | Body text |
| Neutral | Steel Grey | `#8892A0` | Muted text |

## Typography

**Display / Headlines:** Orbitron — Angular, geometric, futuristic display face for headings and display text.

**Body:** Exo 2 — Technical yet readable sans-serif with a futuristic edge.

**UI / Navigation:** Source Sans 3 — Clean, functional for navigation and buttons.

**Monospace:** Share Tech Mono — Retro-computing aesthetic for code blocks.

## Spatial System

- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Border radii: 2px (sm), 4px (md), 8px (lg), 12px (xl) — geometric, sharp
- Max content width: 1400px
- Measure (body text): 65ch

## Motion Philosophy

- Neon glow pulses on hover states
- Grid perspective animations
- Reduced motion: all glows and pulses replaced with solid colors
- Smooth ease-in-out transitions, 150-400ms

## Visual Assets

- **Logo:** Sun/horizon icon with Phlix wordmark in Orbitron
- **Favicon:** Minimal sun and horizon icon in brand colors
- **OG Image:** Sun setting over perspective grid with brand text
- **Icons:** Stroke-based SVG with neon glow effects

## Compliance Notes

- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- License: MPL-2.0 (server/hub), MIT (clients/plugins)
- 4 native clients + DLNA — never "5"
- 8 features from content.json
- 6 FAQ items from content.json
- Footer: 3 columns + "Open-source media, on your terms."
- Self-hosted fonts from `../../../shared/assets/fonts/`
- CSS `@copyright` inside `/* */` comment blocks
- Grid uses `minmax(0, 1fr)` not bare `1fr`
- All pages: OG + Twitter meta, `twitter:creator=@detain`
