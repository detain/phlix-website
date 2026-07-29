# Movie Camera — Brand Kit Site

## Concept & Vision

The movie-camera brand kit evokes the precision engineering and mechanical artistry of vintage cinema equipment — Bolex, Arriflex, Panavision. The design language draws from the warm patina of aged brass and leather, the rhythmic click of film reels, and the focused elegance of professional cinematography tools. This is media serving for the filmmaker's soul.

## Aesthetic Direction

**Theme:** Vintage cinema equipment — a mechanical film camera on a tripod, with visible film reels and precision brass fittings. The aesthetic captures the tactile satisfaction of well-engineered hardware and the romantic nostalgia of celluloid.

## Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary background | Charcoal | `#1C1C1C` |
| Secondary text | Silver | `#C0C0C0` |
| Accent | Saddle Brown | `#8B4513` |
| Highlight | Gold | `#FFD700` |
| Secondary accent | Dark Slate | `#2F4F4F` |

## Typography

- **Display:** Impact / Bebas Neue (self-hosted WOFF2 via shared font pool)
- **Body:** Source Sans Pro / Open Sans (self-hosted)
- **Mono:** JetBrains Mono / Fira Code (self-hosted)

## Spatial System

- Max content width: 1400px
- Spacing scale: 4px base (0.25rem increments)
- Border radius: 4px–16px (subtle, mechanical feel)
- Shadows: Layered, deep — emphasizing equipment weight

## Motion Philosophy

- **Film reel spin:** Subtle continuous rotation on decorative elements (CSS `filmSpin` keyframe, 8s)
- **Card lifts:** Gentle 4px lift on hover, shadow expansion — like raising a viewfinder
- **Scroll reveals:** Fade-up reveals with 0.6s duration, staggered 100ms — like scenes fading in
- **Reduced motion:** All animations respect `prefers-reduced-motion` — no animation when preferred

## Visual Assets

- **logo.svg:** Film reel icon with "PHLIX" wordmark in Impact
- **favicon.svg:** Square film reel on charcoal background
- **og.png:** Generated via `tools/gen-og.mjs` with film-reel motif
- **Inline SVG icons:** Single-color stroke icons for all features (consistent 1.5px stroke weight)

## Icon Library

All feature and navigation icons are inline SVGs with stroke-based rendering:
- `library` — Book with lines
- `syncplay` — Clock with spokes
- `transcode` — Camera aperture
- `auth` / `shield` — Shield with checkmark
- `livetv` / `antenna` — Signal broadcast curves
- `dlna` / `broadcast` — TV with antenna
- `plugins` / `puzzle` — Puzzle pieces
- `hub` — Sun/lightning bolt hub pattern

## Layout Archetype

Single-column hero with asymmetric feature grid. Dense information hierarchy. Heavy use of horizontal rules and border dividers evoking film-strip sprocket holes.

## Responsive Behavior

- Desktop: Multi-column grids (2-3 columns)
- Tablet: 2-column grids collapse to adjusted spacing
- Mobile: Single column, hamburger nav, generous touch targets (44px min)
- Fluid typography scaling between breakpoints
- 200% text zoom support with no clipping

## Component States

- **Buttons:** Primary (gold bg), Secondary (silver outline), Accent (brown bg)
- **Cards:** Default border, hover lift + shadow + accent border glow
- **Badges:** Stable (green), Beta (orange), Deprecated (red)
- **Code blocks:** Dark surface with subtle border, copy button top-right
