# Premiere Night — Brand Kit Site

## Concept & Vision

Movie premiere under spotlights. Red carpet glamour, velvet ropes, gold lettering, marquee lights. The premiere-night theme evokes the glamour and excitement of a Hollywood movie premiere — dark, rich colors punctuated by gleaming gold accents and the soft twinkle of marquee lights. It says "this is a premium experience, and you're invited."

## Aesthetic Direction

Inspired by classic Hollywood premieres: deep burgundy and black surroundings, gold lettering on marquees, velvet ropes, and the anticipation of spotlights. Every element should feel like you're walking the red carpet into your own media library.

## Color Palette

| Role       | Name              | Hex       | Usage                            |
|------------|-------------------|-----------|----------------------------------|
| Background | Dark Red-Black    | `#1A0A0A` | Page backgrounds                 |
| Primary    | Gold              | `#C9A227` | CTAs, highlights, accents        |
| Secondary  | Off-White         | `#F5F5F5` | Body text, light elements       |
| Tertiary   | Red               | `#FF0000` | Alert states, badges             |
| Surface    | Deep Burgundy     | `#2A1010` | Card backgrounds                 |
| Surface Alt| Dark Burgundy     | `#3D1515` | Elevated surfaces                |
| Border     | Muted Red         | `#4A2020` | Borders, dividers                |
| Neutral    | Dusty Rose        | `#B8A8A8` | Secondary text                  |
| Red Carpet | Dark Red          | `#8B0000` | Section dividers, accents       |

## Typography Roles

| Role      | Font                  | Weight | Usage                     |
|-----------|-----------------------|--------|---------------------------|
| Headline  | Playfair Display      | 700/900 | H1-H3, section titles     |
| Display   | Bebas Neue            | 400    | Large numbers, stat labels |
| Body      | IBM Plex Serif        | 400/500 | Paragraphs, descriptions  |
| UI        | IBM Plex Sans         | 400-600| Navigation, buttons, labels|
| Mono      | IBM Plex Mono         | 400/600| Code, technical strings   |

## Spatial System

- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Max content width: 1400px
- Content width: 900px
- Border radius: 2, 4, 8, 12, 999px

## Motion Philosophy

- Subtle gold shimmer effects on key elements
- Marquee light twinkle animations (CSS keyframes)
- Fade-in-gold entrance animations for hero content
- Scroll-reveal with fade + translateY
- All animations respect `prefers-reduced-motion`
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (cinematic)

## Visual Assets

- **Logo**: Gold "Phlix" italic serif wordmark on dark background with animated marquee dots
- **Favicon**: Gold "P" letter on dark red-black square
- **OG Image**: Dark background with gold Phlix wordmark and tagline
- **Icons**: Inline SVG sprite with stroke-based icons for features

## Icon List (inline SVG)

| Icon     | ViewBox | Usage                  |
|----------|---------|------------------------|
| library  | 0 0 24 24 | Library feature       |
| syncplay | 0 0 24 24 | SyncPlay feature      |
| transcode| 0 0 24 24 | Transcoding feature   |
| shield   | 0 0 24 24 | Auth/security feature |
| antenna  | 0 0 24 24 | Live TV feature       |
| broadcast| 0 0 24 24 | DLNA feature          |
| puzzle   | 0 0 24 24 | Plugin feature        |
| hub      | 0 0 24 24 | Hub feature           |

## Self-Hosted Fonts

All fonts are self-hosted WOFF2 from the shared pool:
- `playfair-display-700-latin.woff2`
- `playfair-display-900-latin.woff2`
- `bebas-neue-400-latin.woff2`
- `ibm-plex-serif-400-latin.woff2`
- `ibm-plex-serif-500-latin.woff2`
- `ibm-plex-sans-400-latin.woff2`
- `ibm-plex-sans-500-latin.woff2`
- `ibm-plex-sans-600-latin.woff2`
- `ibm-plex-mono-400-latin.woff2`
- `ibm-plex-mono-600-latin.woff2`
