# Synthetic Soul Brand Kit — Design Rationale

## Concept & Vision

Synthetic Soul is an emotional AI brand experience for Phlix. The theme evokes genuine feeling and emotional intelligence — the sense that your media server understands you, responds to your mood, and adapts to your viewing patterns. It feels alive, perceptive, and warm, like having a wise companion who knows your taste inside and out.

The archetype is **Sage** — emotional, wise, perceptive. The experience is immersive and atmospheric, with heartbeat pulses, expression morphs, and organic circuits creating a sense of a living system that watches and responds.

## Aesthetic Direction

**Emotional AI atmosphere** — Deep void backgrounds with coral/teal accents, heartbeat monitor visualizations, and mood-responsive UI elements. The design should feel like a calm, intelligent presence rather than a cold machine.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Coral Heartbeat | `#FF6B6B` | CTAs, mood indicator, active states, heartbeat lines |
| Secondary | Teal Pulse | `#4ECDC4` | Links, secondary actions, grid lines, circuit nodes |
| Accent | Warm Yellow Glow | `#FFE66D` | Download cards, highlights, ambient glow |
| Dark | Deep Void | `#1A1A2E` | Cards, surfaces, code blocks |
| Light | Soft Mint | `#C7F9CC` | Success states, calm mood indicator |

## Typography

- **Display**: Cormorant Garamond — elegant serif with emotional warmth
- **Body**: Crimson Text — refined serif for readable body copy
- **Mono**: IBM Plex Mono — for code blocks and technical labels

## Spatial System

- Base unit: 8px
- Container max: 1200px
- Section gap: 96px
- Spacing scale: 0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128

## Motion Philosophy

Motion is **alive, not mechanical**. Heartbeat pulses, gentle floating, and mood-responsive animations create a living interface.

Key animations:
- **Heartbeat**: 1s ease-in-out infinite — primary mood indicator pulse
- **Pulse Wave**: 3s ease-in-out infinite — decorative heartbeat lines
- **Expression Morph**: 3s — state transitions in emotional faces
- **Glow**: 2s ease-in-out alternate — hover states and emphasis
- **Float**: 6s ease-in-out infinite — ambient decoration

All motion respects `prefers-reduced-motion: reduce`. Under reduced motion, animations resolve to instant transitions or gentle fades.

## Visual Assets

- **Logo**: Heartbeat line with heart icon, Phlix wordmark, animated pulse indicators
- **Favicon**: Heart shape with pulse line on dark background
- **OG Image**: Deep void background with grid, heartbeat line, heart icon, gradient text
- **Decorative**: Heart monitor waveforms, pulse lines, organic circuit patterns

## Component Notes

### Mood Indicator
A fixed-position heart that changes color and pulse rate based on user engagement:
- Calm (teal, 60 BPM): Idle/scrolled to top
- Engaged (yellow, 75 BPM): Moderate scrolling/hovering
- Excited (coral, 95 BPM): Deep scrolling engagement
- Contemplative (mint, 65 BPM): Mid-scroll reflection

### Heart Monitor Decorative
Animated ECG-style line on dark backgrounds, used in hero sections and 404 page to reinforce the emotional/alive theme.

### Gradient Backgrounds
Radial gradients emanating from coral and teal create depth and atmosphere without overwhelming the content.

## Accessibility

- Minimum contrast: 4.5:1 for body text, 3:1 for large text/UI
- All interactive elements have visible focus indicators
- Animations gated on `prefers-reduced-motion`
- Touch targets minimum 44×44px
- Layout survives 200% text zoom
