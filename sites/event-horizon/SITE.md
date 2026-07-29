# Event Horizon — Phlix Brand Kit Site

## Concept & Vision

A cosmic, void-themed marketing site for Phlix — self-hosted media server software. The visual language draws from astrophysical black hole visualizations: deep void-black backgrounds, accretion violet plasma glows, ionized magenta accents, and the overwhelming scale of gravitational forces. Every page should feel like falling into something inevitable.

## Aesthetic Direction

**Theme:** Cosmic void / event horizon — the view from inside the accretion disk of a supermassive black hole.

- Absolute void-black (#000000) as the universal background
- Accretion violet (#7B2CBF) as the primary accent — the plasma glow of matter being consumed
- Ionized magenta (#5A189A) as secondary — the energy spectrum of high-temperature plasma
- Hawking White (#E8EAF0) for all body text — radiation barely escaping the void's edge
- Motion is always inward, spiral, gravitational — never outward or bouncy

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Deep Void | #000000 | Universal page background |
| Primary | Accretion Violet | #7B2CBF | Primary CTAs, active states, links |
| Secondary | Ionized Magenta | #5A189A | Gradient anchors, secondary accents |
| Tertiary | Void Purple | #3C096C | Muted UI chrome, dividers |
| Surface | Ergosphere | #240046 | Card and panel surfaces |
| Surface Alt | Dark Purple | #3C096C | Hover states, nested panels |
| Text | Hawking White | #E8EAF0 | All body and headline text |
| Success | Photon Green | #34D399 | Success states |
| Warning | Tidal Amber | #FBBF24 | Warnings, 30-day items |
| Error | Singularity Red | #EF4444 | Errors, destructive actions |
| Info | Quasar Blue | #60A5FA | Informational |
| Border | Photon Ring | #2D3A5E | Card borders, dividers |

## Typography

- **Headlines:** Orbitron (700, 900) — weight 700+, wide letter-spacing (0.08em), uppercase
- **Display:** Exo 2 (300, 400) — oversized stats, watermark text
- **Body:** Inter (400, 500) — all paragraph text
- **UI:** Rajdhani (400, 500, 600) — buttons, navigation, labels
- **Mono:** Space Mono (400, 700) — code blocks, technical metadata

## Spatial System

| Token | Value |
|-------|-------|
| --space-1 | 4px |
| --space-2 | 8px |
| --space-3 | 12px |
| --space-4 | 16px |
| --space-6 | 24px |
| --space-8 | 32px |
| --space-12 | 48px |
| --space-16 | 64px |
| --space-24 | 96px |

## Motion Philosophy

- **Inward spiral motion** — all animations suggest falling toward the singularity
- **Spaghettification** — cards exhibit subtle vertical stretch on hover (2-3%)
- **Slow, inevitable easing** — `cubic-bezier(0.22, 0.61, 0.36, 1)` — nothing snaps, everything falls
- **Reduced motion:** Replace spiral animations with glow pulses; honor `prefers-reduced-motion`

## Visual Assets

- **logo.svg:** Orbitron wordmark "PHLIX" with subtle accretion spiral element, gradient text from Hawking White to Accretion Violet
- **favicon.svg:** Circular black hole visualization — event horizon ring, photon sphere, central singularity
- **og.png:** 1200×630 social card — void-black background, logo, tagline
- **Icons:** Inline SVG, 1.5px stroke, circular/duotone style, accretion violet or hawking white fill

## Layout

- Max content width: 1400px, centered
- Mobile-first responsive: 320px → 1920px breakpoints
- Sticky header with blur backdrop
- Cards: void-purple surface (#240046), 1px photon ring border (#2D3A5E), accretion glow on hover

## Pages

1. **index.html** — Hero with install CTA, pitch bullets, features overview grid, CTA banner
2. **features.html** — Page header, 8 feature details with icons
3. **clients.html** — Page header, 5 client cards (Roku, Tizen, Windows, Mobile, DLNA)
4. **download.html** — Server install command, client download cards, ecosystem list
5. **plugins.html** — Plugin model explanation, LifecycleInterface, manifest example
6. **docs.html** — Four documentation sections linking to external docs site
7. **hub.html** — Hub explanation, self-host vs public, client hub mode
8. **about.html** — Philosophy, license (MPL-2.0/MIT), contributing, 6-item FAQ
9. **404.html** — Error page with "crossed the event horizon" copy, recovery links

## Technical Notes

- No external font CDNs — fonts self-hosted via shared/assets/fonts/ pool
- No external JS dependencies — vanilla JS only
- All social metadata uses absolute URLs for og:image and og:url
- JSON-LD SoftwareApplication schema on home page only
- 404.html has noindex robots meta
