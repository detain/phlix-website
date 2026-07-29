# Site: map-explorer

## Concept & Vision

A brand kit site for Phlix media server with a **fantasy map cartography** theme. The aesthetic evokes treasure maps, compass roses, aged parchment, and unexplored territories — suggesting discovery, adventure, and self-guided exploration of your media library.

The visual language should feel like opening an antique map chest: warm, textured, deliberate, and slightly mystical — without crossing into Halloween territory.

## Aesthetic Direction

**Reference:** Antique treasure maps, nautical charts, cartographer's workrooms, Victorian-era exploration journals.

**Mood:** Warm discovery. A sense that your media library is an uncharted territory waiting to be explored — not a sterile database.

**What to avoid:** Gothic darkness, pirate kitsch, Halloween aesthetics, neon or cyber themes.

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Dark Mahogany | `#2C1810` | Headings, primary text, dark surfaces |
| Secondary | Saddle Brown | `#8B4513` | Links, secondary text, warm accents |
| Accent Gold | Antique Gold | `#C9A227` | CTAs, highlights, compass elements, borders |
| Accent Tan | Parchment Tan | `#D4A574` | Decorative elements, muted text |
| Background | Aged Cream | `#F5E6D3` | Page background |
| Surface | Light Parchment | `#FFF8F0` | Cards, elevated surfaces |
| Text | Ink | `#2C1810` | Body text |
| Text Muted | Muted Brown | `#5C4033` | Secondary text, captions |

## Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Display | Cinzel | 700 | Headlines, page titles, logo — medieval/fantasy serif |
| Body | Crimson Text | 400 | Paragraphs, descriptions — elegant readable serif |
| UI | Rajdhani | 500 | Navigation, buttons, labels — clean sans with character |
| Mono | Inconsolata | 400 | Code blocks, technical text |

**Font files (self-hosted WOFF2):**
- `../../shared/assets/fonts/cinzel-700-latin.woff2`
- `../../shared/assets/fonts/crimson-text-400-latin.woff2`
- `../../shared/assets/fonts/rajdhani-500-latin.woff2`
- `../../shared/assets/fonts/inconsolata-400-latin.woff2`

## Spatial System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 0.25rem | Micro gaps |
| `--space-2` | 0.5rem | Tight spacing |
| `--space-3` | 0.75rem | Compact |
| `--space-4` | 1rem | Base unit |
| `--space-5` | 1.5rem | Comfortable |
| `--space-6` | 2rem | Section gaps |
| `--space-7` | 3rem | Section padding |
| `--space-8` | 4rem | Large section gaps |
| `--space-9` | 6rem | Hero/pitch spacing |
| `--space-10` | 8rem | Maximum |

**Border radius:** `0.25rem` (sm), `0.5rem` (md), `0.75rem` (lg), `1rem` (xl)

**Shadows:** Subtle warm shadows using `rgba(44, 24, 16, ...)` — never pure black.

## Motion Philosophy

Motion should feel **deliberate and nautical** — not bouncy or playful. Think: the sweep of a compass needle, the unfurling of a map.

- **Entrance animations:** Subtle fade-up (opacity 0→1, translateY 20px→0) over 400-600ms
- **Hover states:** Gentle lift (translateY -2px to -4px) with shadow deepening
- **Transitions:** 150-250ms ease — never instant, never sluggish
- **Reduced motion:** Respects `prefers-reduced-motion` — all animations disabled, content preserved

**No bounce, no pulse, no elastic easing.** Keep it smooth and measured.

## Visual Assets

### SVG Icons
- **Compass rose motifs** — used in logo, decorative dividers, and 404 page
- **Inline SVG feature icons** — stroke-based, single-color (#C9A227), matching the fantasy cartography aesthetic
- **No icon fonts or external CDNs**

### Images
- `img/logo.svg` — Phlix wordmark with compass rose, dark brown + gold
- `img/favicon.svg` — Compass rose in a circle, gold on cream, 32×32
- `img/og.png` — 1200×630 social share card with brand background and hero headline

### Decorative Elements
- Subtle compass rose patterns as CSS background decorations
- Gold gradient borders on cards and sections
- Radial gradient overlays suggesting aged parchment lighting

### No raster images used — all decorative elements are CSS/SVG
