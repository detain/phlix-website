# Blitzkrieg Site — Design Rationale

## Concept & Vision

Blitzkrieg is a military command center aesthetic — lightning-speed assault on buffering. Every interaction feels like a precision military operation. The HUD framing, tank-tread navigation, artillery strike loading animations, and dog-tag identifiers create an authoritative, strategic atmosphere.

## Aesthetic Direction

Military HUD command center at night. Deep navy dominates (#1A1A2E), combat red (#E94560) marks critical targets and CTAs, tactical blue (#0F3460) runs HUD overlays, and slate steel (#94A3B8) handles chrome. Lighting is technical: cool blue-white displays against dark surfaces, red warning indicators, and occasional radar-sweep green.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary | Combat Red | #E94560 |
| Secondary | Tactical Blue | #0F3460 |
| Tertiary | Radar Green | #00FF88 |
| Background | Deep Navy | #1A1A2E |
| Surface | Command Black | #0D0D1A |
| Surface Alt | HUD Dark | #1F1F3A |
| Text | Display White | #F0F4FF |
| Text Muted | Slate Steel | #94A3B8 |
| Border | Grid Line | #2A2A4A |
| Success | Strike Green | #00FF88 |
| Warning | Alert Amber | #FFB800 |
| Error | Critical Red | #FF1744 |

## Typography

- **Headlines**: Black Ops One — stencil military authority, Impact fallback
- **Display**: Russo One — oversized stat readouts, coordinate displays
- **Body/UI**: Rajdhani — technical, readable, commanding, Roboto fallback
- **Mono**: Share Tech Mono — coordinate readouts, radar data, Courier New fallback

## Spatial System

4px base unit: 4, 8, 12, 16, 24, 32, 48, 64, 96px

## Motion Philosophy

- Tank-tread navigation: mechanical, deliberate, powerful
- Artillery reload transitions: chamber → aim → fire — three-phase precision
- Radar sweep ambient: 360° rotation in hero background
- Tactical zoom: scope-like scaling on media cards
- Explosion ring effects on button press

All animations respect `prefers-reduced-motion`.

## Visual Assets

- **logo.svg**: Military stencil wordmark with HUD corner brackets
- **favicon.svg**: Simple mark in primary color
- **og.png**: 1200×630 social share card with brand background

## Signature Elements

- HUD corner brackets framing key elements
- Tank-tread link navigation
- Dog-tag content badges
- Artillery strike loading animation
- Radar sweep ambient effect
- Crosshair/target overlays
- Clipped-corner cards (mission document aesthetic)
