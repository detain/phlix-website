# Neural-Link Brand Kit Site — Phlix

## Concept & Vision

A brain-computer interface aesthetic for Phlix — the neural-link theme visualizes media streaming as synaptic communication. Neural pathways pulse with data, and the interface feels like a direct connection to your library. The theme is intelligent, immersive, and distinctly technical.

## Aesthetic Direction

**Archetype:** Sage — intelligent, neural, connected.

The visual language draws from EEG visualizations, neural network diagrams, and synaptic flashes. Dark backgrounds with cyan, magenta, and purple accents create a high-tech, immersive feel. Motion suggests data flowing through pathways.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary | Neural Cyan | #00F2FF |
| Secondary | Synaptic Purple | #7B2FFF |
| Accent | Synapse Green | #00FF9F |
| Dark | Deep Space | #0A0A0A |
| Dark Mid | Neural Dark | #1A1A2E |
| Surface | Membrane | rgba(26, 26, 46, 0.85) |
| Text | Neural White | #E8E8FF |
| Text Muted | Dim Signal | #8888AA |
| Border | Pathway | rgba(0, 242, 255, 0.2) |

## Typography

| Role | Font | Weight |
|------|------|--------|
| Display/Headlines | Orbitron | 700 |
| Body | Exo 2 | 400 |
| Monospace | Share Tech Mono | 400 |

All fonts sourced from the shared pool at `../../assets/fonts/`.

## Spatial System

- **Container max:** 1400px
- **Spacing unit:** 8px
- **Grid gutter:** 24px
- **Border radii:** 4px (sm), 8px (md), 12px (lg), 20px (xl)

## Motion Philosophy

- **Reduced motion:** All animations respect `prefers-reduced-motion: reduce`
- **Key animations:**
  - Pulse glow on interactive elements
  - Fade-in on scroll reveals (IntersectionObserver)
- Motion suggests synaptic firing — brief, energetic bursts rather than continuous motion

## Visual Assets

- **Logo:** Neural network nodes with Phlix wordmark — cyan/purple/green gradient accents
- **Favicon:** Minimal neural network node pattern on dark background
- **Icons:** Inline SVG, stroke-based, single-color (currentColor)
- **Background:** Layered radial gradients creating depth and neural atmosphere

## Layout

- 8 primary pages + 404
- Sticky header with blur backdrop
- 3-column footer matching content.json structure
- Feature cards in responsive grid (auto-fill, minmax)
- Client cards in responsive grid
- CTA banners between sections

## Design Decisions

- No Google Fonts CDN — all fonts from shared pool
- No fabricated stats, pricing, or testimonials
- Real Phlix content from content.json
- Install command from content.json install.primary
- License: MPL-2.0 (server/hub), MIT (clients/plugins)
