# deep-abyss Brand Kit Site — Design Rationale

## Concept & Vision

Deep Abyss channels the mystery and grandeur of the ocean's midnight zone — the realm of bioluminescent creatures, crushing pressure, and boundless darkness. The site evokes the feeling of descending into an alien yet beautiful world, where glowing organisms navigate the endless black. It's both intimidating and mesmerizing — like standing at the edge of a abyss with lights slowly appearing from below.

## Aesthetic Direction

**Reference:** Deep sea documentary cinematography, bioluminescent jellyfish photography, abyssal oceanographic art. The visual metaphor is "discovery in the darkness."

**Mood:** Mysterious, vast, otherworldly, hypnotic. The palette creates depth without flatness, and the bioluminescent cyan accents act as points of life in the darkness.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background (deepest) | Abyss Black | `#0A1628` | Page background, surfaces |
| Background (deep) | Deep Ocean | `#0E4D64` | Secondary backgrounds, gradients |
| Background (mid) | Ocean Blue | `#1B8ABC` | Accent regions, tertiary surfaces |
| Accent (primary) | Bioluminescent Cyan | `#00F5D4` | CTAs, highlights, glows, icons |
| Accent (secondary) | Abyssal Purple | `#7B2CBF` | Secondary accents, decorative |
| Text (primary) | Light Foam | `#E8F4F8` | Headings, primary text |
| Text (secondary) | Sea Mist | `#A8D4E6` | Body text, secondary content |
| Text (muted) | Deep Current | `#6B9DB5` | Captions, subtle text |

**Color Relationships:**
- The darkest tones anchor the page, creating infinite depth
- Bioluminescent cyan provides the primary interaction color — it's the "life" in the darkness
- Abyssal purple adds mystery and secondary depth without competing with cyan
- Text uses high-contrast light colors against the dark backgrounds

## Typography

**Display/Headings:** System UI stack for maximum compatibility and clean rendering
- The display font is used for headlines to create impact
- Letter-spacing on headings adds a sense of expansion/floating

**Body:** System UI stack
- Chosen for reliability and fast loading (self-hosted requirement met)
- Generous line-height (1.65) for comfortable reading in the dark theme

**Mono:** System monospace for code blocks

**Type Scale:**
- Display: 3rem–3.75rem (hero headlines)
- H1: 3rem, H2: 2.25rem, H3: 1.875rem
- Body: 1rem with 1.65 line-height
- Small: 0.875rem

## Spatial System

- **8-point spacing grid** — all spacing is a multiple of 0.25rem
- Generous vertical padding on sections (6rem–10rem) creates breathing room
- Content max-width: 1400px (1400px container for layouts)
- Narrow container: 800px (for docs, download blocks)
- Card grids use `minmax(0, 1fr)` to prevent overflow at small sizes

## Motion Philosophy

**Principle:** Motion represents bioluminescence — organic, flowing, purposeful. Nothing bounces or snaps. Everything flows like underwater movement.

**Primary Animation:** Scroll-reveal fade-ins — elements emerge from the darkness as you scroll

**Secondary:** Subtle glow pulses on accent elements — like bioluminescent organisms slowly pulsing

**Hover States:** Smooth lifts with glow intensification — the creature "notices" you

**Reduced Motion:** Fully honored — no animation plays if `prefers-reduced-motion: reduce` is set

## Visual Assets

**Logo:** A bioluminescent jellyfish mark — the bell represents discovery, the tentacles represent streaming content reaching out. The wordmark uses the display font with subtle letter-spacing.

**Favicon:** Simplified jellyfish silhouette in cyan on dark background

**Icons:** Stroke-based, single-color (cyan), consistent 1.5px stroke weight. Simple, clean, legible at small sizes.

**Background:** Radial gradients create the sense of depth and light sources from different directions — like the ocean's different depth zones.

**Decorative Elements:** CSS-only glow effects, no raster decorations needed

## Component Styling

**Cards:** Dark surface (`#0D1F35`) with subtle border. Hover triggers cyan glow and slight lift.

**Buttons:** Primary is solid cyan with glow shadow. Secondary is outlined cyan. Ghost is subtle bordered.

**Code Blocks:** Dark surface with subtle cyan border, monospace font.

**Badges:** Small pills with cyan or purple backgrounds at low opacity, matching borders.

**Footer:** Mirrors the global dark depth aesthetic, with the three-column layout providing clear navigation.

## Accessibility Notes

- All text passes WCAG AA contrast on dark backgrounds
- Cyan on dark backgrounds provides excellent contrast ratios
- Focus states are clearly visible with cyan outline
- All interactive elements meet 44x44px touch target minimum

## Implementation Notes

- No Google Fonts CDN — uses system fonts only for performance and compliance
- All CSS custom properties defined in `:root` for easy theming
- Grid layouts use `minmax(0, 1fr)` to prevent content overflow
- `overflow-wrap: anywhere` on body text for narrow containers
