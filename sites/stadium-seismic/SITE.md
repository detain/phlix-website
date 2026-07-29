# Stadium Seismic — Brand Kit Site

## Concept & Vision

**stadium-seismic** — massive arena concert energy, 100,000 person crowds. Light towers, crowd silhouettes, pyrotechnics. The visual language of a packed stadium at showtime: spotlights cutting through darkness, the roar of the crowd visible as a texture, the anticipation before the first note hits.

This kit should feel like standing in the venue when the lights go down and the screen comes alive — not watching a stream on a phone.

## Aesthetic Direction

Dark, dramatic, high-contrast. The palette draws from the visual language of concert staging: deep blacks and charcoals as the base, punctuated by the heat of stage lights — a red that burns, an orange that pops, a yellow that blazes. Typography is bold and uppercase, designed to read from a distance like venue signage.

The layout leans into vertical drama — deep hero sections, stacked card grids, generous use of full-bleed gradients. Motion is purposeful: pulse effects evoke the beat of music, staggered reveals suggest the building anticipation of a show.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Arena Red | `#E71D36` | CTAs, accent lines, primary brand moments |
| Secondary | Stage Orange | `#FF6B35` | Secondary accents, links, hover states |
| Accent | Spotlight Yellow | `#FFD93D` | Highlights, decorative elements, code blocks |
| Dark | Charcoal Stage | `#2D3436` | Card surfaces, elevated backgrounds |
| Near-black | Void Black | `#1A1A1A` | Page background, footer |
| Text | White | `#FFFFFF` | Headlines, primary text |
| Text Muted | Dim White | `rgba(255,255,255,0.7)` | Body copy, descriptions |

## Typography

- **Display/Headlines:** Anton (self-hosted) — all-caps, bold, stadium signage energy
- **Body:** Barlow 400/500/600 — readable, neutral, pairs well with bold display
- **Mono:** Barlow — used for code blocks to maintain consistency

All fonts are self-hosted WOFF2 from `shared/assets/fonts/`. No external font CDN.

## Spatial System

- **Max content width:** 1400px
- **Spacing scale:** 0.25rem base (4px), scale: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
- **Border radius:** 0.25rem (sm), 0.5rem (md), 1rem (lg), 1.5rem (xl), 9999px (full)
- **Grid:** `minmax(0, 1fr)` for all grid tracks to prevent overflow

## Motion Philosophy

Motion should feel like concert lighting — dramatic reveals, subtle pulses, no frivolous bouncing. Key patterns:

- **Hero entrance:** fade-in with upward translation (0.6s ease-out)
- **Card reveals:** staggered fade-in-up via IntersectionObserver
- **Hover states:** subtle lift (translateY -2px to -4px) with shadow enhancement
- **Reduced motion:** all animations disabled, instant state changes

Never: bounce, spring, or elastic easing. Avoid motion that feels playful rather than dramatic.

## Visual Assets

- **Logo:** `img/logo.svg` — Animated sound waves + "Phlix" wordmark with gradient fill
- **Favicon:** `img/favicon.svg` — Red rounded square with white "P"
- **OG Image:** `img/og.png` (source: `img/og.svg`) — 1200x630 concert scene with crowd silhouette, spotlight effects, logo, and tagline
- **Feature icons:** Inline SVG stroke icons (24x24 viewBox, 2px stroke, round linecap/join)
- **No external images** — all visuals are CSS/SVG generated

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| < 320px | Single column, 16px+ body text |
| 320-767px | Mobile nav (hamburger), single column grids |
| 768px+ | Desktop nav visible, 2-column grids |
| 1024px+ | Full nav, 4-column feature grid |
| 200% text zoom | No horizontal overflow, readable at all breakpoints |

## Accessibility

- WCAG 2.2 AA compliance
- Contrast ratios: primary CTA >= 4.5:1, large text >= 3:1
- Keyboard navigable, visible focus rings
- `prefers-reduced-motion` respected
- Touch targets >= 44x44px
