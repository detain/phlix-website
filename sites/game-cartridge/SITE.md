# Game Cartridge Brand Kit — Design Rationale

## Concept & Vision

A nostalgic tribute to the golden age of gaming — NES/SNES-era ROM cartridges. The site feels like flipping through a dusty game collection, complete with embossed labels, connector pins, and the satisfying click of a cartridge slot. This theme appeals to retro gaming enthusiasts who appreciate the tactility of physical media while embracing modern streaming technology.

## Aesthetic Direction

Vintage game cartridge aesthetic with ROM chip influences. The visual language borrows from classic game packaging: embossed labels, metallic connectors, scanline textures, and the distinctive colors of plastic shells from the 8-bit and 16-bit era.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Charcoal Shell | `#2D2D2D` | Page background, primary surface |
| Surface | Dark Plastic | `#4A4A4A` | Cards, elevated surfaces |
| Surface Alt | Medium Gray | `#3A3A3A` | Secondary surfaces |
| Border | Cartridge Slot | `#555555` | Dividers, borders |
| Text | Light Gray | `#E0E0E0` | Body text |
| Text Dim | Screen Gray | `#B0B0B0` | Secondary text |
| Muted | Inactive | `#888888` | Disabled states |
| Primary | Phosphor Green | `#00FF00` | CTAs, accents, links |
| Accent | Gold Contact | `#FFD700` | Headings, highlights |
| Highlight | Silver Pin | `#C0C0C0` | Decorative accents |

## Typography

**Display Font:** Press Start 2P (self-hosted)
- Headlines, buttons, navigation
- Authentic 8-bit pixel aesthetic
- Uppercase, letter-spaced

**Body Font:** VT323 (self-hosted)
- Paragraphs, descriptions
- Clean monospace with retro character
- High readability at larger sizes

**Monospace:** Courier New (system)
- Code blocks, technical content
- Terminal/command aesthetic

## Spatial System

- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 128px
- Max content width: 1400px
- Border radius: 2px (small), 4px (medium), 8px (large)

## Motion Philosophy

- **Scanline effect:** Subtle horizontal lines on backgrounds evoke CRT displays
- **Glow pulses:** Green glow on primary CTAs and links
- **Hover lifts:** Cards and buttons lift with shadow on hover
- **Reduced motion:** Respects `prefers-reduced-motion` — all animations disabled

## Visual Assets

| Asset | Description |
|-------|-------------|
| `logo.svg` | Cartridge-shaped wordmark with phosphor green PHLIX text |
| `favicon.svg` | Mini cartridge with play button |
| `og.png` | Generated social share card |

## Grid System

- Use `minmax(0, 1fr)` for grid tracks (not bare `1fr`)
- Feature grids: `repeat(auto-fit, minmax(280px, 1fr))`
- Content grids: `repeat(auto-fit, minmax(min(100%, 320px), 1fr))`
