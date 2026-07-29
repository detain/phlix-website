# Atlantis — Site Design Rationale

## Concept & Vision

Atlantis evokes the mystery of a sunken underwater kingdom — coral architecture rising from bioluminescent depths, sea creature murals adorning ancient walls, blue-green light filtering through the water. The aesthetic is simultaneously ancient and alien, combining the grandeur of a lost civilization with the wonder of deep-sea exploration.

This is not the cheerful tropical ocean — this is the profound, quiet depths where light behaves differently and life finds creative solutions to darkness. The site should feel like discovering a forgotten library at the bottom of the sea.

## Aesthetic Direction

- **Theme**: Sunken underwater kingdom, bioluminescent depths
- **Mood**: Mysterious, ancient, serene, otherworldly
- **Visual metaphor**: Coral architecture, bioluminescent glow, sea creature murals
- **Inspiration**: Lost civilizations, deep ocean exploration, bioluminescent marine life

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Deep Navy | `#001A2E` | Primary background — the hadal depths |
| Surface | Dark Teal | `#004455` | Cards, panels, elevated surfaces |
| Surface Alt | Deep Teal | `#003B55` | Alternate surfaces, hover states |
| Primary | Dark Turquoise | `#00CED1` | Primary CTAs, active states, key accents |
| Secondary | Aquamarine | `#7FFFD4` | Secondary accents, highlights, glows |
| Text | Off-White | `#F5F5F5` | Primary body and headline text |
| Text Muted | Aquamarine | `#7FFFD4` | Muted text, secondary information |
| Border | Dark Teal | `#004455` | Borders, dividers |

## Typography

- **Display font**: Georgia / Times New Roman (serif) — evokes ancient scrolls and classical architecture
- **Body font**: Lato / Helvetica Neue (sans-serif) — clean, readable body text
- **Mono font**: Fira Code / Courier New — code blocks, technical content

The serif display font paired with a clean sans-serif body creates a classic-meets-modern feel appropriate for the "ancient kingdom" theme.

## Spatial System

- **Content width**: 1400px
- **Max width**: 1600px
- **Spacing scale**: 0.25rem base (4px)
- **Border radius**: 4px to 24px (sm to xl), full-round for badges

## Motion Philosophy

Motion is slow and fluid — like creatures drifting through zero-gravity salt water.

- **Entrance animations**: Gentle fade-in-up reveals with 600ms duration
- **Hover states**: Subtle lift (translateY -2px to -4px) with glow shadow
- **Transitions**: 300ms ease-out cubic-bezier(0.4, 0, 0.2, 1)
- **Background pattern**: Slow drift animation (20s period) suggesting underwater current
- **Reduced motion**: All animations collapse to instant transitions

## Visual Assets

- **Logo**: Text wordmark "Phlix" in gradient (turquoise to aquamarine) with SVG glow filter, wave decoration underneath
- **Favicon**: Deep navy square with "P" in turquoise
- **OG image**: Generated with underwater kingdom theme, gradient background, text overlay
- **Icons**: Single-color stroke-based inline SVG icons throughout
- **Patterns**: Subtle dot grid pattern with drift animation for hero backgrounds

## Component Notes

### Header
- Sticky positioning with backdrop blur
- Semi-transparent dark background
- Turquoise glow effect on logo hover

### Cards
- Teal background surfaces
- Border with subtle glow on hover
- Lift animation on hover

### Buttons
- Primary: Turquoise background with glow shadow, glow strengthens on hover
- Secondary: Transparent with aquamarine border, subtle background on hover

### Typography
- Eyebrow text: uppercase, letter-spaced, aquamarine color
- Display text: large serif, gradient or white
- Body text: off-white with muted aquamarine for secondary content

### Code blocks
- Dark navy background with teal border
- Monospace text in aquamarine
- Generous padding

### FAQ
- Uses native `<details>/<summary>` elements
- Plus icon rotates to X when open
- Smooth expand/collapse animation (handled by browser)
