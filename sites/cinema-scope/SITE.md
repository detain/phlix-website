# Cinema Scope — Brand Kit Site

## Concept & Vision

Cinema Scope channels the widescreen grandeur of classic anamorphic film — the letterbox bars, the lens flare, the epic scale. This site feels like stepping into a darkened theater just before the film starts. Every element breathes with cinematic weight: deep blacks punctuated by warm gold accents, dramatic typography that commands attention, and motion that flows like a perfectly timed dolly shot.

The aesthetic honors the craft of filmmaking while showcasing a modern, self-hosted media server. It says: "This is serious technology, built with passion."

## Aesthetic Direction

**Reference:** Cinemascope / Panavision widescreen films of the 1950s–60s, with modern dashboard UI sensibilities. Think: the elegance of a film studio's internal tools, not a generic streaming service.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Void | `#0A0A0F` | Primary page background — the darkness before the film |
| Surface | Night | `#1A1A2E` | Cards, nav background — the letterbox bar color |
| Accent | Gold | `#C9A227` | Primary accent — anamorphic lens flare gold |
| Accent Alt | Blue | `#4A90D9` | Secondary accent — cool highlight within the night |
| Text | Cream | `#F5F5F5` | Primary text — projected light |
| Text Muted | — | `rgba(245,245,245,0.6)` | Secondary text |

## Typography

- **Display:** Georgia / Times New Roman (serif) — dramatic, cinematic headlines in uppercase with letter-spacing
- **UI:** Inter / system-ui — clean, readable interface text
- **Mono:** JetBrains Mono / Consolas — code blocks, technical content

## Spatial System

8px base spacing scale. Generous padding in hero sections (10rem vertical) to create dramatic breathing room. Tighter spacing within cards and content sections for information density where needed.

## Motion Philosophy

Subtle, purposeful animations that evoke the smoothness of a film camera:
- Fade-in with upward slide for content reveals
- Gold glow effects on hover states (like lens flare catching)
- Smooth transitions on all interactive elements (300ms ease-out default)
- No bouncing or playful animations — everything is measured, cinematic

## Visual Assets

- **Logo:** Film reel aperture mark + "PHLIX" wordmark in serif with generous letter-spacing
- **Favicon:** Circular aperture motif in gold on dark background
- **Icons:** Stroke-based, single-color SVG icons in gold
- **Decorative:** Subtle radial gradients suggesting lens flare, letterbox bars on hero

## Responsive Behavior

Mobile-first with breakpoints at 480px, 768px, 1024px. Mobile nav collapses to hamburger menu. Grid tracks use `minmax(0, 1fr)` to prevent overflow. Hero letterbox bars scale with viewport.

## Key Implementation Notes

- Grid tracks use `minmax(0, 1fr)` — not bare `1fr` — to prevent overflow from long unbreakable strings
- `overflow-wrap: anywhere` on body text in narrow tracks; `break-word` on headings
- `prefers-reduced-motion` respected: all animations disabled, content visible immediately
- No Google Fonts CDN — fonts are self-hosted WOFF2 with `font-display: swap`
- CSS `@copyright` inside `/* */` comment blocks (not bare ` * @copyright` outside a block)
