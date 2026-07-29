# Metal Machine — Brand Kit Site

## Concept & Vision

**Heavy metal aesthetics for a serious media server.** The metal-machine theme channels the raw power and distortion of heavy metal — chrome surfaces, iron textures, flame accents, and aggressive typography. This is a brand kit for a self-hosting media server that means business. The visual language is industrial, commanding, and unapologetically bold.

## Aesthetic Direction

- **Theme:** Heavy metal — distortion, raw power, chrome, iron textures, flame accents
- **Mood:** Industrial, commanding, powerful, unapologetic
- **Reference:** Heavy metal album art, industrial design, chrome machinery

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Flame Red | `#FF0000` | Primary accent, CTAs, active states |
| Secondary | Gold | `#FFD700` | Secondary accent, highlights, badges |
| Background | Iron Black | `#0D0D0D` | Primary background |
| Surface | Dark Steel | `#1A1A1A` | Cards, elevated surfaces |
| Surface Light | Steel Light | `#2A2A2A` | Hover states, borders |
| Text | Chrome Silver | `#C0C0C0` | Body text, borders |
| Text Muted | Muted Steel | `#808080` | Secondary text, captions |

## Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display | Anton | 400 | Hero headlines, dramatic text |
| Headline | Bebas Neue | 400 | Section titles, card headers |
| Body | Barlow | 400, 500, 600, 700 | Body text, UI elements |
| Mono | IBM Plex Mono | 400 | Code blocks, technical content |

**Font strategy:** Self-hosted WOFF2 from shared font pool. No Google Fonts CDN.

## Spatial System

- **Max content width:** 1400px
- **Header height:** 4rem
- **Spacing scale:** 0.25rem base unit (space-1 through space-32)
- **Border radius:** Small (0.25rem), Medium (0.5rem), Large (0.75rem), XL (1rem)
- **Grid:** `minmax(0, 1fr)` for all grid tracks (prevents overflow at narrow widths)

## Motion Philosophy

- **Purpose:** Motion conveys power and energy — flame glows, chrome reflections
- **Hero:** Subtle flame gradient animation in hero background
- **Cards:** Lift + glow on hover (translateY + red box-shadow)
- **Navigation:** Smooth expand/collapse on mobile
- **Scroll reveals:** Fade-in on scroll (IntersectionObserver)
- **Reduced motion:** All animations respect `prefers-reduced-motion: reduce`

## Visual Assets

| Asset | Description |
|-------|-------------|
| `img/logo.svg` | Wordmark with stylized "P" with flame accent, chrome text, flame underline |
| `img/favicon.svg` | 32x32 favicon — dark background with chrome "P" and red flame accents |
| `img/og.png` | Social share card (1200×630) — generated via `node tools/gen-og.mjs --site metal-machine` |

## Layout Archetype

**Heavy metal industrial** — dark backgrounds with metallic accents, aggressive uppercase typography, bold red highlights, and subtle flame gradient effects. Dense information architecture with clear visual hierarchy.

## Compliance Notes

- **Clients:** 4 native clients + DLNA (Roku, Samsung Tizen, Windows, Mobile + any DLNA device) — never "5"
- **Install command:** `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- **License:** MPL-2.0 (server/hub), MIT (shared libraries, plugins, clients)
- **Footer tagline:** "Open-source media, on your terms."
- **Social meta:** All pages include OG + Twitter meta with `twitter:creator=@detain`

## Features Implemented

- 9 pages: index, features, clients, download, plugins, docs, hub, about, 404
- 8 features from content.json (library, syncplay, transcode, auth, livetv, dlna, plugins, hub)
- 6 FAQ items from content.json (about page)
- Install command in hero CTA (index.html) AND download page
- WCAG 2.2 AA accessibility (contrast ratios, keyboard navigation, focus states)
- Responsive at 320px through 1920px breakpoints
