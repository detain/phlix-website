# SITE.md — Solarpunk Eden Brand-Kit Site

## Concept & Vision

Solarpunk Eden is a lush, sun-drenched utopia where nature and technology grow
together in joyful harmony. It is the media home for optimists — a garden
pavilion of streaming, roofed in solar glass, threaded with climbing vines,
and humming with community warmth. The site should feel like stepping into a
botanical greenhouse on a perfect morning: bright, generous, unhurried, and
alive with the quiet energy of things growing.

**Layout archetype: immersive** — full-bleed botanical illustration hero,
generous breathing room, flowing art nouveau decorative elements. The layout
prioritizes atmosphere and warmth over information density. Every page feels
like a page from an art nouveau botanical field guide brought to life.

---

## Design Language

### Aesthetic Direction
Art nouveau botanical greenhouse — hand-painted watercolor + linocut hybrid
illustration, sun-dappled glass canopy lighting, organic flowing curves
everywhere. Nothing sharp, nothing cold, nothing hurried.

### Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| `--color-primary` | Canopy Green | `#2D7A4F` | Primary CTAs, active nav, key interactive |
| `--color-secondary` | Solar Gold | `#E8A020` | Secondary actions, highlights, accents |
| `--color-tertiary` | Sky Prism | `#4AADCF` | Links, focus states, sky/water accents |
| `--color-neutral` | Warm Clay | `#8B6347` | Muted chrome, dividers, earthy depth |
| `--color-bg` | Morning Parchment | `#F4EFE0` | Default page background |
| `--color-surface` | Greenhouse Glass | `#FAFAF2` | Card and panel surfaces |
| `--color-surface-alt` | Meadow Mist | `#E8F0E2` | Alternate surfaces, hover states |
| `--color-text` | Deep Canopy | `#1A2E1E` | Primary body and headline text |
| `--color-success` | New Leaf | `#7DC98A` | Success states |
| `--color-warning` | Marigold | `#F0B429` | Warnings, caution states |
| `--color-error` | Rust Bloom | `#C0472E` | Errors, destructive actions |
| `--color-info` | Rainwater Blue | `#2F8FAB` | Informational banners |
| `--color-focus` | Sunbeam Focus | `#E8A020` | Keyboard focus ring (solar gold) |
| `--color-border` | Garden Ink | `#2A3D2E` | Card outlines, dividers, borders |
| `--color-shadow` | Vine Shadow | `rgba(45,122,79,0.20)` | Green-tinted soft shadows |

### Gradients

- **Eden Canopy** `linear 160deg`: `#2D7A4F` → `#4AADCF` — hero backdrops, section dividers
- **Solar Bloom** `linear 120deg`: `#E8A020` → `#F4EFE0` — CTA section backgrounds
- **Dappled Sunlight** `radial`: `rgba(232,160,32,0.18)` → transparent — hero glow
- **Prism Mist** `linear 90deg`: `#7DC98A` → `#4AADCF` → `#E8A020` — stained-glass accents

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Headline | Playfair Display | 700, 900 | Hero titles, section headlines |
| Display | Cormorant Garamond | 600, 700 | Oversized display, pull-quotes |
| Body | Source Serif 4 | 400, 600 | Paragraphs, long-form reading |
| UI | DM Sans | 400, 500, 700 | Buttons, nav, labels, chips |
| Mono | JetBrains Mono | 400, 700 | Code snippets, tokens |
| Number | Playfair Display | 700 | Stats, counters, dashboard figures |

**Typography rules (hard)**:
- Headlines use Playfair Display; body text uses Source Serif 4 — never swap.
- UI chrome always uses DM Sans.
- Body line-length: 60–72 characters.
- Body line-height: ≥1.7.
- Avoid ALL CAPS except small UI labels and badge text.

### Spatial System

Spacing scale (the only allowed increments): `4, 8, 12, 16, 24, 32, 48, 64, 96px`

Max content width: `1200px`
Max site width: `1440px`

### Motion Philosophy

Motion should feel like watching something grow — unhurried, organic,
gentle unfurling. Spring easing on interactions. Slow reveal animations.
Everything animated respects `prefers-reduced-motion`.

Key microinteractions:
- **Hover**: cards tilt 1deg + lift 3px + vine-shadow brightens
- **Button press**: organic compress to 0.96 → spring-back + small golden pulse
- **Focus**: solar-gold focus ring blooms outward over 140ms
- **Success**: small leaf burst radiates from action point

### Visual Assets

- **Illustrations**: Art nouveau botanical plate style, watercolor + linocut hybrid
- **Icons**: 2px stroke, rounded caps/joins, outlined, single-color Canopy Green
- **Mascot**: Frond — animated seedling-sprout character (curious, gentle, quietly enthusiastic)
- **Decorative**: climbing vines, honeybee silhouettes, dappled-light overlays, art nouveau oval frames
- **Photography style**: Natural light in real gardens/greenhouses, warm golden-hour dapple, Kodak Ektar warmth

---

## Layout & Structure

### Page Architecture

- **Home**: Full-bleed botanical gradient hero → pitch bullets on parchment → features overview on meadow mist → solar-gold CTA banner
- **Features**: Page header with gradient → feature detail grid on parchment
- **Clients**: Page header → client cards grid on parchment
- **Download**: Page header → server block → client download cards → ecosystem list
- **Plugins/Docs/Hub**: Page header → content section with code blocks
- **About**: Page header → philosophy/license/contributing → FAQ list

### Navigation

- Sticky greenhouse-glass header with Playfair Display wordmark logo lockup
- DM Sans nav links with rounded active pill in Canopy Green (leaf bullet)
- Mobile: hamburger → full-width dropdown with rounded links

### Responsive Strategy

- Desktop: multi-column poster rails, max 1440px
- Tablet: 2–3 column grids, 48px min touch targets
- TV (10-foot): large Playfair Display type, solar-gold focus ring, nature-dark overlay
- Mobile: single column, bottom-nav considerations, sticky mini-player bar

---

## Component Inventory

### Buttons

| Variant | Background | Text | Border | Radius |
|---------|-----------|------|--------|--------|
| Primary | `#2D7A4F` | `#F4EFE0` | transparent | pill |
| Secondary | `#E8A020` | `#1A2E1E` | transparent | pill |
| Danger | `#C0472E` | `#FAFAF2` | transparent | pill |
| Ghost | transparent | `#2D7A4F` | `#2A3D2E` | pill |
| Link | transparent | `#4AADCF` | none | 0 |

### Cards

- **Feature card**: greenhouse-glass surface, 2px garden-ink border, 24px radius, 24px padding, hover lifts 3px with vine-shadow
- **Client card**: greenhouse-glass surface, 2px garden-ink border, 24px radius; header has name + status badge
- **Download card**: surface, 2px garden-ink border, 24px radius; centered layout with CTA

### Badges

- Quality badges (4K/HDR/Dolby Vision): solar gold on deep canopy text, pill, 2px outline
- Status badges (New/Community Pick): canopy green, pill
- Favorite: rust bloom on greenhouse glass

---

## Technical Approach

Pure static HTML + CSS + vanilla JS. No framework, no build step required.
CSS custom properties throughout for brand token consistency.
Self-hosted WOFF2 fonts via @font-face with `font-display: swap`.
All images SVG (inline or referenced); OG image SVG at 1200×630.
