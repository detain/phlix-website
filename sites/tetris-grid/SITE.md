# Site Design — tetris-grid

## Concept & Vision

A brand kit site for **Phlix** styled around the **tetris-grid** theme — a playful, puzzle-inspired aesthetic that evokes falling tetromino blocks, perfect-fit satisfaction, and the cascade of line clears. The visual language channels the iconic primary-on-dark palette of classic Tetris, transforming it into a modern, distinctive media server brand identity.

## Aesthetic Direction

The design embraces a **retro-gaming meets modern minimalism** aesthetic. Dark backgrounds provide contrast for vibrant tetromino-colored elements. Grid patterns subtly reference the playfield. The feeling is energetic yet clean — playful but not childish.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Background | Void | `#0A0A0A` |
| Surface | Dark Surface | `#141414` |
| Elevated | Card Surface | `#1E1E1E` |
| I-Piece (Primary) | Cyan | `#00FFFF` |
| O-Piece | Yellow | `#FFFF00` |
| T-Piece (Secondary) | Magenta | `#FF00FF` |
| S-Piece (Success) | Green | `#00FF00` |
| Z-Piece (Danger) | Red | `#FF0000` |
| J-Piece (Info) | Blue | `#0000FF` |
| L-Piece | Orange | `#FF8800` |
| Text | White | `#FFFFFF` |
| Text Muted | Gray | `#A0A0A0` |
| Border | Border | `#333333` |

## Typography

- **Display / Headings:** Space Mono (monospace) — evokes terminal/retro gaming
- **Body:** Space Grotesk (geometric sans) — clean readability with character
- **Code:** Fira Code (monospace) — ligatures for code blocks

## Spatial System

- Base unit: 8px grid
- Spacing scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px
- Corner radius: 2px (blocks), 4px (small), 8px (medium), 12px (large), 16px (xl)
- Max content width: 1400px

## Motion Philosophy

- **Tetromino floats:** Subtle vertical bobbing on decorative blocks
- **Line clear:** Quick horizontal scale + fade on error states
- **Hover states:** Border glow + slight lift (translateY)
- **Shimmer:** Gradient sweep across certain decorative elements
- All animations respect `prefers-reduced-motion: reduce`

## Visual Assets

- **logo.svg:** Phlix wordmark with integrated tetromino blocks (I-piece accent, T/S pieces as decorative elements)
- **favicon.svg:** T-piece tetromino in cyan on dark square background
- **og.png:** Generated social share card with brand colors, logo, and tagline

## Component Highlights

- Tetromino-colored eyebrow decorations
- Grid-line hero background pattern
- Gradient text on hero headline (white → cyan → magenta)
- Block-syle feature icons
- Glow effects on interactive elements
- FAQ using native `<details>`/`<summary>` with animated +/- indicator
