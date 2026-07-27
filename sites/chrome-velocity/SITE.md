# Chrome Velocity — Site Design Document

## Concept & Vision

Chrome Velocity is the pure sensation of speed distilled into a visual identity — carbon-fiber darkness split by racing red, chrome silver, and speed yellow, with the precision of a lap-time readout and the ferocity of a car cornering at 200 mph. The site feels like a Formula 1 pit wall: data-dense, high-contrast, every element racing-functional.

## Aesthetic Direction

**Reference:** Formula 1 pit lanes under stadium floodlights, carbon fiber weave textures, checkered flag motifs, telemetry data overlays.

**Feel:** Elite, technical, electrifying. Never soft, never warm. Every interaction snaps like a race engineer on the radio.

## Color System

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Racing Red | `#CC0000` | Primary CTAs, active states, critical accents |
| Secondary | Chrome Silver | `#C0C5CE` | Secondary actions, UI rails, metadata labels |
| Tertiary | Speed Yellow | `#FFD100` | Warnings, elite badges, sharp highlights |
| Background | Carbon Black | `#0D0D0F` | Default page background |
| Surface | Carbon Panel | `#17181C` | Card and panel surfaces |
| Surface Alt | Pit Dark | `#1F2026` | Alternate surfaces, hover states |
| Text | Signal White | `#F0F2F5` | Primary body and headline text |
| Text Muted | Tire Gray | `#C0C5CE` | Secondary text, metadata |
| Border | Titanium | `#2A2C32` | Default borders and dividers |
| Focus | Telemetry Cyan | `#00E5FF` | Keyboard focus rings |

## Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Headline | Barlow Condensed | 700 | ALL CAPS for section headers |
| Display | Barlow Condensed | 800 | Large numerals, splash text |
| Body | Barlow | 400, 500 | Clean, neutral paragraphs |
| UI | Barlow | 500, 600 | Buttons, labels, nav items |
| Mono | JetBrains Mono | 400, 600 | Telemetry, code, data |
| Number | Barlow Condensed | 700 | Stat numerals |

**Rules:**
- ALL CAPS for section headers and short labels
- Never use thin or light weights for headlines
- Monospace for all numerical data and telemetry readouts

## Spatial System

**Scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96px

**Layout:** Max 1400px content width, 1200px tight content, 1400px max container.

**Corners:** Sharp — 2px small, 4px medium, 6px large, 8px XL. No pill shapes.

**Borders:** Razor-thin 1px titanium lines. 2px racing-red for active/selected states.

## Motion Philosophy

**Speed:** Fast — 80–150ms micro, 250ms max for transitions.

**Style:** Sharp, kinetic, decisive. No bounce, no spring. Racing cars don't bounce.

**Easing:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (sharp) or `ease-out`.

**Scroll effects:** Speed-line sweep on section entry (desktop). Disabled under `prefers-reduced-motion`.

**Microinteractions:**
- Cards shift 4px up and apply a racing-red left-border flash on hover
- Button press snaps at 0.96 scale — instant precision
- Focus ring: 2px telemetry-cyan at 60ms

## Visual Assets

| Asset | Description |
|-------|-------------|
| `img/logo.svg` | Chrome Velocity wordmark |
| `img/favicon.svg` | Square favicon in racing red |
| `img/og.png` | 1200×630 social share card |
| `img/og.svg` | Editable OG source |
| `icon-*.png` | App icons |

**No images were generated for this kit.** CSS/SVG-only artwork for patterns and decorative elements.

## Component Patterns

- **Cards:** Carbon panel surface, titanium border. Hover: 2px racing-red left border + 4px upward translate.
- **Buttons:** Racing red primary, titanium-bordered secondary, sharp 4px corners, uppercase labels.
- **Focus rings:** 2px telemetry-cyan with 2px carbon-black offset.
- **Nav:** Carbon-black topbar, uppercase Barlow Condensed links, racing-red active underline.
- **Mascot (Vector):** Bottom-right HUD figure, telemetry lines pulse in idle, tips per section.

## Seasonal Variants

Three seasonal overrides are live-JS gated by date:
1. **Night Race** (Sep–Oct): Deeper black, brighter neon primary, cyan focus
2. **Championship Decider** (Nov): Gold tertiary, unchanged primary
3. **Season Opener** (Mar): Slightly brighter secondary

## Accessibility

- WCAG AA contrast ratios verified across all text/surface combinations
- Focus indicators visible and high-contrast on carbon surfaces
- `prefers-reduced-motion` respected throughout
- Touch targets minimum 44×44px
- Semantic HTML landmarks: banner, navigation, main, contentinfo
