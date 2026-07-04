# SITE.md — Cyber Tokyo brand-kit site

## Concept & Vision

Cyber Tokyo is the sensory overload of a Tokyo midnight — hot pink kanji signs bleeding neon into rain-soaked asphalt, electric lime bullet-train streaks against a near-black violet sky. Every screen built in this identity should feel like stepping into Neo Tokyo at the hour the city never sleeps: fast, electric, overwhelming, alive. The product is Phlix; the vibe is Shibuya crossing at 2 a.m.

**Brand DNA (condensed):**
Cyber Tokyo is the intersection of near-pure darkness and maximum neon saturation. It is #050308 void broken by hot pink, electric lime, and neon mandarin — every element serves sensation before decoration. It is never muted, never Western, never sparse. Density is a feature, not a problem.

## Design Language

### Aesthetic Direction
Tokyo cyberpunk cinematic — hyper-dense neon, J-aesthetic digital glitch, anime title-card geometry, high-contrast holographic. Full-bleed immersive hero with multi-source neon practical lighting.

**Layout archetype:** `immersive` — full-bleed cinematic hero with neon bloom, dense information sections alternating Tokyo Night and Shinjuku Dark surfaces, Neon Sakura CTAs throughout.

### Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Neon Sakura | #FF00AA | Dominant signal — CTAs, active states, halos |
| Secondary | Circuit Green | #00FF41 | Secondary paths, links, data, racing stripes |
| Tertiary | Neon Mandarin | #FF6600 | Badges, urgency, emotional emphasis |
| Background | Tokyo Night | #050308 | Page base — near-pure black violet |
| Surface | Shinjuku Dark | #0D0918 | Card/panel surfaces |
| Surface Alt | Kabukicho Shadow | #130E20 | Alternate panels, hover states |
| Text | Screen White | #F0EEF8 | Body and headline text |
| Border | Neon Wire | #2D1F3D | Card borders, dividers |
| Success | Mizu Green | #00E676 | Success toasts |
| Warning | Amber Kanji | #FFB300 | Warnings |
| Error | Danger Pink | #FF1744 | Errors, destructive |
| Info | Hologram Blue | #00B0FF | Informational banners |
| Focus | Focus Sakura Pulse | #FF00AA | Focus ring |

**Gradients:**
- `Shibuya Crossing`: linear 135deg, #FF00AA → #00FF41 — hero backdrop
- `Akihabara Bloom`: radial, rgba(255,0,170,0.40) → transparent — ambient neon bloom
- `Shinjuku Depth`: linear 180deg, #0D0918 → #050308 — surface depth
- `Circuit Stripe`: linear 90deg, #050308 → #00FF41 → #050308 — racing-stripe divider

### Typography

| Role | Family | Weight | Notes |
|------|--------|--------|-------|
| Headline | Space Grotesk | 700, 900 | Page titles, hero headlines |
| Display | Bebas Neue | 400 | Oversized stat numerals, cinematic titles |
| Body | IBM Plex Sans | 400, 500 | Descriptions, long-form copy |
| UI | IBM Plex Sans | 400, 500, 600 | Buttons, labels, nav |
| Mono | IBM Plex Mono | 400, 600 | Code, data readouts, glitch moments |
| Number | Bebas Neue | 400 | Stats, counters |

**Rules:** Space Grotesk headlines bold (700+); Bebas Neue always uppercase; IBM Plex Sans body never all-caps except micro-labels; Noto Serif JP for kanji/katakana decorative text.

### Spacing Scale

4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 px — only these steps are used.

### Motion Philosophy

Motion is a **bullet train: fast, precise, purposeful.** All transitions are 80–200ms with `cubic-bezier(0.25, 0, 0, 1)` (sharp ease-out) or `steps(4, end)` (brutalist). Never spring/bounce/elastic. Reduced motion: replace glitch cuts with cross-fades, disable strobe/scanline effects.

**Signature transitions:** rapid glitch cut (3-frame chromatic aberration dissolve), horizontal scan-line wipe, neon-sakura flash frame, bullet-train speed blur.

### Visual Assets

- **Logo:** Space Grotesk bold wordmark on Tokyo Night, 1px Neon Sakura border rectangle, pink outer glow, katakana mark
- **Icons:** Sharp 1.5–2px stroke, square corners, duotone (Neon Sakura active, Screen White default)
- **Decorative elements:** scan-line overlays, vertical kanji/katakana text columns, circuit-stripe dividers, glitch displacement on hover
- **OG image:** Full-bleed dark with neon accents, Space Grotesk wordmark, tagline in Neon Sakura glow

## Spatial System

Max content width: 1400px, centered. Hero: full-viewport height. Sections alternate Tokyo Night (background) and Shinjuku Dark (surface) to create visual rhythm through density. Padding is generous on hero, tighter on feature card grids (density is intentional).

## Component Inventory

| Component | States |
|-----------|--------|
| `.btn-primary` | default (hot pink + pink glow), hover (stronger glow + lift 2px), active (scale 0.98), focus (2px sakura ring) |
| `.btn-secondary` | default (circuit green ghost), hover (green glow + lift), active, focus |
| `.feature-card` | default (shinjuku-dark + wire border), hover (1px sakura border + pink glow + 2px lift + glitch icon animation) |
| `.client-card` | default, hover (sakura border + glow) |
| `.client-status` | stable (mizu green), beta (amber), deprecated (smoke violet) |
| `.nav-menu a` | default (screen white 75%), hover (sakura color + bg tint), aria-current (sakura underline + glow) |
| `.site-header` | sticky, backdrop-filter blur, 1px wire bottom border |

## Accessibility

- WCAG 2.2 AA minimum contrast: Screen White on Tokyo Night = 19.2:1 (AAA), Neon Sakura on Tokyo Night = 5.8:1 (AA), Circuit Green on Tokyo Night = 8.9:1 (AAA).
- Focus ring: 2px Neon Sakura + 4px pink outer glow.
- Touch targets: minimum 48×48px on mobile/TV, 44×44px on desktop.
- Reduced motion: all glitch animations replaced with simple fades.
- 200% zoom survival required.
