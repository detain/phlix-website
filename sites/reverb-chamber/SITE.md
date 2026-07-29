# Reverb Chamber — Brand Kit Site

## Concept & Vision

The reverb-chamber theme evokes sound waves bouncing through visual space — an aesthetic drawn from recording studios, acoustic panels, and studio foam. The site feels like stepping inside a visualization of audio signal processing: dynamic wave animations, layered depth, and a palette that balances deep darks with electric accents.

## Aesthetic Direction

**Theme identity:** Sound wave visualizations, acoustic panels, studio foam
**Mood:** Technical precision meets artistic motion — a server that handles complexity while making it feel effortless

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Background | Deep Void | `#1A1A2E` |
| Background Secondary | Dark Panel | `#16213E` |
| Background Card | Acoustic Dark | `#0F3460` |
| Primary | Electric Purple | `#7B2CBF` |
| Primary Light | Violet Glow | `#9D4EDD` |
| Accent | Hot Pink | `#E94560` |
| Accent Alt | Cyan Wave | `#00F5FF` |
| Accent Warm | Studio Yellow | `#FFD93D` |
| Text | Soft White | `#EAEAEA` |
| Text Muted | Panel Gray | `#A0A0B0` |
| Border | Purple Edge | `rgba(123, 44, 191, 0.3)` |

## Typography

- **Display/Headlines:** Space Grotesk — geometric, modern, tech-forward
- **Body/UI:** IBM Plex Sans — readable, professional, pairs well with Space Grotesk
- **Mono/Code:** JetBrains Mono — developer-friendly, distinctive ligatures

## Spatial System

Based on a 0.25rem (4px) base unit:

| Token | Value |
|-------|-------|
| space-1 | 0.25rem |
| space-2 | 0.5rem |
| space-3 | 0.75rem |
| space-4 | 1rem |
| space-5 | 1.5rem |
| space-6 | 2rem |
| space-7 | 3rem |
| space-8 | 4rem |
| space-9 | 6rem |
| space-10 | 8rem |

## Motion Philosophy

- **Primary animation:** Sound wave bars — vertically oscillating bars that suggest audio visualization
- **Secondary animation:** Wave patterns at page bottom — continuous horizontal wave motion
- **Interaction animation:** Card hover lifts with glow shadows, nav link color transitions
- **Respect for `prefers-reduced-motion`:** All animations degrade gracefully

## Visual Assets

### Icons
- Inline SVG icons for all 8 features
- Single-color, stroke-based, consistent 2px stroke width
- Custom sound wave SVG for logo

### Decorations
- Sound wave bar animations in hero section
- Wave pattern backgrounds at section bottoms
- Acoustic panel grid patterns as subtle background textures
- Glow effects on interactive elements

### Logo
- Animated sound wave bars + "Phlix" wordmark
- Gradient from cyan through purple to pink
- Subtle wave trail decoration

## Component Patterns

### Cards
- Rounded corners (radius-lg: 1rem)
- Semi-transparent background with border
- Hover: lift + glow shadow
- Sound wave animation accent where appropriate

### Buttons
- Primary: gradient purple with glow shadow
- Secondary: transparent with cyan border
- Ghost: text-only with hover background
- Min-height 44px for touch targets

### Navigation
- Sticky header with backdrop blur
- Mobile hamburger menu with full-screen overlay
- Active page indicator with cyan accent

### Code Blocks
- Dark background (#16213E)
- Cyan text for code content
- Subtle purple border

## Grid Specifications

All CSS grids use `minmax(0, 1fr)` to prevent overflow from long unbreakable strings.

## Accessibility

- Contrast ratios meet WCAG 2.2 AA
- All interactive elements keyboard accessible
- Focus visible rings on all focusables
- Skip link for keyboard navigation
- Reduced motion support throughout
