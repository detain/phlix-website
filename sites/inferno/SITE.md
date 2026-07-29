# Inferno Site — SITE.md

## Overview

The Inferno brand kit site showcases Phlix with a "blazing intensity meets sleek media management" aesthetic. The design draws from active volcanic eruptions, magma flows, ember particles, and volcanic glass formations.

## Brand Identity

- **Kit**: Inferno
- **Archetype**: Magician (transformative, powerful)
- **Experience Archetype**: immersive
- **Palette**: #DC143C #FF5349 #FFB347 #8B0000 #2F1772
- **Tagline**: "Ignite Your Vision."

## Design Language

### Typography
- Headlines: Cinzel uppercase with generous letter-spacing
- Body: Rajdhani for readability
- UI elements: Rajdhani Semi Condensed

### Color
- Crimson flame (#DC143C) as primary CTA color
- Obsidian with violet undertone (#0A0510) for backgrounds
- Ember gold (#FFB347) for accents and ratings
- Blood red (#8B0000) for error states
- Violet crystal (#2F1772) for info elements

### Motion
- Ember particles rising continuously
- Lava drip animation from hero top
- Heat shimmer distortion on hover
- Explosive bloom on click interactions
- Heartbeat pulse on Live TV badge

## Navigation
- Ignite (Home)
- Temper (Features)
- Conduits (Clients)
- Erupt (Download)
- Channel (Hub)
- Origin (About)

## Technical Notes

### Fonts
All fonts are self-hosted WOFF2 in `../../assets/fonts/`:
- Cinzel 700
- Russo One 400
- Rajdhani 500, 600, 700
- Share Tech Mono 400

### Animations
All animations respect `prefers-reduced-motion`:
- Ember particles disabled
- Lava drip disabled
- Heat shimmer disabled
- Bloom effect disabled
- Scroll reveals become instant

### Accessibility
- Skip link to main content
- ARIA labels on navigation and interactive elements
- Keyboard-focusable with visible focus rings
- WCAG AA contrast ratios maintained
