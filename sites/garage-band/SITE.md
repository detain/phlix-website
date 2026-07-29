# Garage Band — Site Design Document

## Concept & Vision

Garage Band is a DIY recording studio aesthetic — raw, authentic, and unapologetically handcrafted. Think foam acoustic panels on cinder block walls, vintage beer posters, band stickers covering everything, and that warm analog sound. The design should feel like walking into a real working studio, not a corporate headquarters.

## Aesthetic Direction

**Reference:** A DIY recording garage. Beer posters, foam panels, band stickers, worn amp knobs, setlists on the wall. Raw authenticity over polish.

**Feel:** Warm, lived-in, genuine. The opposite of sterile. Every element feels hand-placed by someone who actually uses this space.

## Color System

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Amplifier Red | `#FF4444` | Primary CTAs, active states, critical accents |
| Secondary | Goldenrod | `#FFD700` | Highlights, badges, interactive elements |
| Tertiary | Cream | `#F5F5DC` | Text on dark, warm accents |
| Background | Charcoal | `#2C2C2C` | Default page background |
| Surface | Garage Gray | `#383838` | Card and panel surfaces |
| Surface Alt | Panel Gray | `#444444` | Alternate surfaces, hover states |
| Text | Cream | `#F5F5DC` | Primary body and headline text |
| Text Muted | Muted Gray | `#AAAAAA` | Secondary text, metadata |
| Border | Steel Gray | `#555555` | Default borders and dividers |
| Focus | Goldenrod | `#FFD700` | Keyboard focus rings |
| Dark Red | `#8B0000` | Deep accents, shadows |

## Typography

| Role | Font | Notes |
|------|------|-------|
| Headline | Permanent Marker | Handwritten feel, casual confidence |
| Display | Permanent Marker | Consistent with headlines |
| Body | Patrick Hand | Handwritten, approachable |
| UI | Patrick Hand | Consistent with body |
| Mono | Special Elite | Typewriter feel, retro documentation |
| Number | Bangers | Comic book impact for stats |

**Rules:**
- Never use Inter, Roboto, or system defaults
- Handwritten fonts throughout for authentic DIY feel
- Monospace for technical content (install commands, code)

## Spatial System

**Scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96px

**Layout:** Max 1400px content width, 1000px narrow content.

**Corners:** Subtle — 2px small, 4px medium, 6px large, 8px XL. Not too sharp, not too round.

**Borders:** 2px solid borders for definition.

## Motion Philosophy

**Speed:** Quick — 100–200ms micro, 400ms for reveals.

**Style:** Slight bounce for interactions. Nothing too smooth — handcrafted feel.

**Easing:** Slight bounce on transforms. Nothing too corporate.

**Scroll effects:** Fade-in-up on content entry. Disabled under `prefers-reduced-motion`.

## Visual Assets

| Asset | Description |
|-------|-------------|
| `img/logo.svg` | Phlix wordmark with rock/sound wave styling |
| `img/favicon.svg` | Square favicon with "P" and accent color |
| `img/og.png` | 1200x630 social share card |

**Decorative elements:** CSS-only noise textures, subtle grid patterns.

## Component Patterns

- **Cards:** Garage gray surface, 2px border. Hover: slight rotation + lift + red border.
- **Buttons:** Red primary with bounce effect, goldenrod secondary.
- **Focus rings:** 2px goldenrod with offset.
- **Nav:** Sticky topbar with handwritten-style links.
- **Feature cards:** Slight rotation on hover, playful not corporate.

## Accessibility

- WCAG AA contrast ratios verified across all text/surface combinations
- Focus indicators visible and high-contrast on dark surfaces
- `prefers-reduced-motion` respected throughout
- Touch targets minimum 44×44px
- Semantic HTML landmarks: banner, navigation, main, contentinfo
