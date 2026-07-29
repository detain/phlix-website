# Vinyl Vault — Brand Kit Site

## Concept & Vision

Vinyl Vault is a warm, analog record collection aesthetic that evokes the tactile pleasure of flipping through crates of vinyl at a midnight record shop. The design draws from vintage radio dials, groove textures, and the warm sepia tones of aged album covers. Every element should feel like it belongs in a cozy listening room, not a sterile data center.

## Aesthetic Direction

**Theme:** Warm analog record collection — vintage radio dials, groove textures, sepia tones, and the nostalgic glow of a turntable's vacuum tube amplifier.

**Mood:** Intimate, cozy, sophisticated — like a private music collection passed down through generations.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Deep Espresso | `#2D1810` | Headings, primary text, dark surfaces |
| Secondary | Warm Tan | `#C4956A` | Accents, links, interactive elements |
| Tertiary | Saddle Brown | `#8B4513` | Hover states, secondary accents |
| Background | Cream Linen | `#E8D5B7` | Page background |
| Surface | Aged Paper | `#D4C4A8` | Card surfaces, elevated elements |
| Surface Alt | Worn Canvas | `#C9B896` | Secondary surfaces |
| Text | Deep Espresso | `#2D1810` | Body text |
| Neutral | Warm Umber | `#8B7355` | Muted text, borders |
| Accent Gold | Vintage Gold | `#FFD700` | Special highlights ( sparingly ) |

## Typography

**Display / Headlines:** Playfair Display — A sophisticated serif with vintage character, used for h1-h3 and display text.

**Body:** Lora — A warm, readable serif perfect for long-form content and the vintage reading experience.

**UI / Navigation:** Source Sans 3 — Clean sans-serif for functional elements like navigation and buttons.

**Monospace:** Courier Prime — For code blocks, evoking typewriter receipts from vintage record shops.

## Spatial System

- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Border radii: 4px (sm), 8px (md), 16px (lg), 24px (xl) — subtle, vintage
- Max content width: 1400px
- Measure (body text): 65ch

## Motion Philosophy

- Subtle, organic transitions — nothing jarring or digital-feeling
- Hover states that evoke the gentle movement of a tone arm on a turntable
- Reduced motion: replace animations with simple fades
- Page transitions: ease-in-out, 250-400ms

## Visual Assets

- **Logo:** Stylized vinyl record with "Phlix" wordmark in Playfair Display
- **Favicon:** Minimal vinyl record icon in Deep Espresso
- **Groove texture:** Subtle repeating radial gradient evoking record grooves
- **Icons:** Single-color stroke-based SVG icons (library, syncplay, transcode, shield, antenna, broadcast, puzzle, hub)

## Icon Style

Stroke-based, 1.5px stroke weight, rounded caps and joins. Each icon uses `currentColor` for easy theming.

## Layout Archetype

Editorial/vintage magazine feel — asymmetric layouts, generous whitespace, serif headlines that command attention, left-aligned body text.

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
