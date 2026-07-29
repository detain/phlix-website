# Turntablejs — Site Design Document

## Concept & Vision

Turntablejs draws inspiration from professional DJ equipment — the tactile feel of vinyl, the precision of tone arms, the glow of LED indicators, and the rhythm of BPM counters. The site should feel like stepping into a DJ booth: dark, focused, with neon accents that pulse with energy. Every interaction should feel like manipulating real DJ hardware — scratching vinyl, adjusting RPM, and dropping beats.

## Aesthetic Direction

**Theme:** Interactive vinyl scratching interface with tone arm, platters, RPM gauges, and BPM counters.

The design uses a dark, studio-inspired palette with bright green LED accents and coral/red warning indicators. Typography is bold and uppercase, evoking the display panels on professional audio equipment. Motion is purposeful — vinyl spins, LEDs pulse, and interactions have satisfying tactile feedback.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | LED Green | `#1DB954` | CTAs, active states, brand accent |
| Secondary | Coral Red | `#FF6B6B` | Hover states, secondary accents, warnings |
| Background | Studio Black | `#0A0A0A` | Page backgrounds |
| Surface | Panel Gray | `#1A1A1A` | Cards, panels, elevated surfaces |
| Surface Alt | Dark Gray | `#252525` | Secondary surfaces, code blocks |
| Border | Bezel | `#333333` | Dividers, borders, inactive elements |
| Text | Pure White | `#FFFFFF` | Headlines, primary text |
| Text Muted | Dimmed | `#999999` | Secondary text, descriptions |

## Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Headline | Oswald | 700, 600 | H1-H3, feature titles, nav items |
| Display | Oswald | 800 | Hero headlines, special emphasis |
| Body | Roboto | 400, 500 | Paragraphs, descriptions |
| UI | Roboto | 500 | Navigation, buttons, labels |
| Mono | JetBrains Mono | 400, 600 | Code blocks, technical content |

All fonts are self-hosted WOFF2 from the shared pool (`../../assets/fonts/`).

## Spatial System

- **Base unit:** 4px
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96px
- **Max content width:** 1400px
- **Border radius:** 2px (sm), 4px (md), 8px (lg), 12px (xl), 100px (pill)
- **Shadows:** Subtle layered shadows with green/red glow for emphasis

## Motion Philosophy

- **Vinyl spin:** Continuous 4s rotation for decorative vinyl elements (disabled under reduced motion)
- **LED pulse:** Subtle opacity animation on accent elements (1.5-2s cycle)
- **Scratch effect:** Quick rotation oscillation on vinyl click/easter egg
- **Hover states:** Translate + border glow + shadow lift (150ms)
- **Scroll reveals:** Fade + translateY (300ms ease-out) with IntersectionObserver

All animations respect `prefers-reduced-motion: reduce`.

## Visual Assets

### Icons
- Inline SVG stroke-based icons for features (48x48 in cards, 64x64 in detail views)
- Single-color, 1.5px stroke weight, matching the DJ equipment aesthetic
- Icons: library, syncplay (circuits), transcode (document), auth (shield), livetv (antenna), dlna (broadcast), plugins (puzzle), hub (bell)

### Logo
- SVG vinyl record mark + "PHLIX" wordmark in Oswald Bold
- Green accent on center label
- Used at 120x40px in header

### Favicon
- 32x32 SVG square with rounded corners
- Simplified vinyl record in primary green on studio black
- Derives theme-color meta tag (#1DB954)

### Decorative Elements
- Vinyl record animation (spin, scratch)
- LED indicator dots
- RPM gauge displays
- EQ bar visualizations
- Tone arm decorative element (CSS only)

## Layout Archetype

**DJ Booth Layout** — Dark studio environment with:

- Full-width hero sections with radial gradient backgrounds
- Grid-based feature/client cards with hover lift effects
- 4-column responsive grid (→ 2 → 1)
- Sticky header with backdrop blur
- Fixed DJ companion (vinyl character) on desktop
- Footer with 3-column nav + centered tagline

## Component States

### Buttons
- Primary: Green background, dark text, glow on hover
- Secondary: Transparent with green border, green text
- Ghost: Transparent with gray border, white text
- Focus: Green outline + glow ring

### Cards
- Surface background with border
- Top accent line on hover (green gradient)
- Lift + shadow + border glow on hover

### Navigation
- Sticky with backdrop blur
- Active page: Green text color
- Mobile: Full-screen slide-in menu

## Accessibility

- WCAG 2.2 AA compliant
- All text meets 4.5:1 contrast ratio
- Focus states visible on all interactive elements
- Keyboard navigation fully supported
- `prefers-reduced-motion` respected
- Skip link for keyboard users
- Touch targets minimum 44x44px

## Technical Notes

- Pure static HTML/CSS/JS — no build step, no frameworks
- Self-hosted fonts only (no Google Fonts CDN)
- CSS custom properties for all design tokens
- Semantic HTML with proper landmarks
- OG + Twitter meta on every page
- JSON-LD SoftwareApplication schema on home page