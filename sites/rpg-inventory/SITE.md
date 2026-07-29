# RPG Inventory Brand Kit — Design Rationale

## Concept & Vision

A treasure-hunt dungeon aesthetic that transforms the Phlix media server into an RPG inventory system. The site feels like opening a well-organized loot chest — every feature is a valuable item slot, every page a different view of your adventurer's gear. The tone is playful but sophisticated, evoking the satisfaction of a perfectly arranged inventory in a beloved RPG.

## Aesthetic Direction

Medieval treasure vault meets modern media server. Shield motifs, parchment textures, gold trim, and a color palette inspired by legendary loot drops.

## Color Palette

| Role       | Name            | Hex       | Usage                                    |
|------------|-----------------|-----------|------------------------------------------|
| Background | Deep Purple     | `#1A0A2E` | Main background, header                  |
| Elevated   | Royal Purple    | `#251540` | Cards, sections, elevated surfaces      |
| Primary    | Gold            | `#FFD700` | CTAs, headings, accents, borders         |
| Accent     | Saddle Brown    | `#8B4513` | Secondary elements, leather textures      |
| Success    | Emerald Green   | `#2ECC71` | Health/stats, stable badges              |
| Danger     | Crimson Red     | `#E74C3C` | Warnings, error states                   |
| Text       | Parchment       | `#F5E6D3` | Primary text                             |
| Muted      | Dusty Lavender  | `#A890B8` | Secondary text, descriptions             |
| Border     | Twilight Purple | `#3D2066` | Card borders, dividers                   |

## Typography Roles

| Role      | Font Family                     | Weight    | Usage                      |
|-----------|---------------------------------|-----------|----------------------------|
| Display   | Cinzel, Times New Roman, serif  | Bold      | Headings, hero text        |
| Body      | Lato, Helvetica Neue, sans-serif| Regular   | Paragraphs, UI text        |
| Mono      | Fira Code, Consolas, monospace  | Regular   | Code blocks                |

## Spatial System

- Spacing scale: 4px base unit (4, 8, 16, 24, 32, 40, 64, 80, 96, 128px)
- Border radius: 4px (sm), 8px (md), 12px (lg)
- Max content width: 1400px
- Header height: 72px

## Motion Philosophy

Subtle, purposeful animations that evoke the satisfying "item acquired" feeling:
- Hover states with golden glow effects
- Staggered fade-in reveals for feature cards
- Smooth transitions on interactive elements
- Respects `prefers-reduced-motion`

## Visual Assets

- **Logo:** Shield with play triangle, gold on deep purple
- **Favicon:** Simplified shield mark in gold
- **Icons:** Single-color stroke-based SVG icons for features
- **Decorative elements:** Radial gradient glows, parchment textures via CSS

## Icon Inventory

- Library: Box/storage icon
- SyncPlay: Play button with sync arrows
- Transcode: Gear/cog with radiating lines
- Auth: Shield icon
- Live TV: Television with antenna
- DLNA: Broadcast/waves icon
- Plugins: Puzzle piece
- Hub: Globe with connection points
