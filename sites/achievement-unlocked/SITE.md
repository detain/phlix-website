# Site Design: Achievement Unlocked

## Concept & Vision

A gaming achievement system themed site for Phlix — celebrating the "100% completion" culture of trophy hunting and badge unlocking. The experience should feel like opening a rare achievement: gold shimmer, triumphant presence, and the satisfaction of progress made visible.

## Aesthetic Direction

Gaming UI meets trophy room — dark backgrounds with metallic gold/silver/bronze accents, XP progress bars, achievement badge styling, and level-up celebratory elements.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary Background | Deep Navy | `#1A1A2E` |
| Secondary Background | Dark Navy | `#16213E` |
| Primary Accent | Gold | `#FFD700` |
| Secondary Accent | Silver | `#C0C0C0` |
| Tertiary Accent | Bronze | `#CD7F32` |
| Text Primary | White | `#FFFFFF` |
| Text Body | Off-White | `#F0F0F0` |
| Text Muted | Gray | `#A0A0B0` |

## Typography

- **Display/Headlines:** Oswald (Google Fonts alternative would be Arial Black) — bold, uppercase, gaming feel
- **Body:** Source Sans 3 (fallback to Arial) — clean, readable
- **Mono:** Fira Code (fallback to Consolas) — for code blocks

## Spatial System

- Spacing scale: 4px base (0.25rem) up to 128px (8rem)
- Border radius: 4px (sm) through 16px (xl), full rounded for badges
- Layout max-width: 1400px

## Motion Philosophy

- Subtle gold glows on hover (box-shadow animations)
- Card lift transforms on hover (translateY)
- XP bar gradient shimmer effect
- Scroll reveal with fade-up for sections
- Respects `prefers-reduced-motion`

## Visual Assets

- **Logo:** Trophy icon with Phlix wordmark
- **Favicon:** Trophy icon on navy background
- **Decorative elements:** XP progress bar, trophy/medal icons, level badges
- **Icons:** Stroke-based inline SVGs for features (single-color, gold accent)

## Component Styling

### Buttons
- Primary: Gold gradient with glow shadow
- Secondary: Silver outline
- Tertiary: Bronze outline

### Cards
- Dark surface with gold border on hover
- Lift animation with glow effect

### Badges
- Gold/Silver/Bronze gradients for status
- Full-rounded pill shape

### Code Blocks
- Dark background (#0D0D1A)
- Gold text for code
- Gold label tag above

## Implementation Notes

- All CSS uses custom properties from design tokens
- Grid uses `minmax(0, 1fr)` to prevent overflow issues
- `@copyright` comments inside `/* */` blocks as required
- No external font CDN — uses system font fallbacks
- Mobile-first responsive design with breakpoints at 320, 375, 414, 768, 900, 1024, 1280, 1920
