# mosh-pit Brand Kit

## Concept & Vision

Hardcore punk applied to a media server. Aggressive, raw, and unapologetic — this kit is for users who want control without the corporate polish. Distortion textures, chaotic typography, and high-contrast color blocking create an identity that feels like it was made in a basement, not a design studio.

## Aesthetic Direction

**Reference:** DIY punk show flyers, band merchandise, skate culture graphics. Intentionally imperfect, deliberately loud, proudly non-corporate.

**Mood:** Underground energy. Power users who host their own media and don't need friendly rounded corners.

## Color Table

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Background | Black | `#000000` | Page backgrounds, surfaces |
| Surface | Near-black | `#111111` | Cards, elevated surfaces |
| Text | White | `#FFFFFF` | Primary text, headlines |
| Text Muted | Gray | `#888888` | Secondary text, descriptions |
| Primary | Red | `#FF0000` | CTAs, accents, links |
| Secondary | Yellow | `#FFFF00` | Highlights, hover states |
| Accent | Green | `#00FF00` | Status indicators, success |
| Border | Dark gray | `#333333` | Dividers, card borders |

## Typography

**Display font:** Montserrat 800/900 (self-hosted, `../../assets/fonts/montserrat-800-latin.woff2` and `../../assets/fonts/montserrat-900-latin.woff2`)

**Body font:** Space Grotesk 400/500/700 (self-hosted, `../../assets/fonts/space-grotesk-{weight}-latin.woff2`)

**Mono font:** JetBrains Mono 500/600/700 (self-hosted, `../../assets/fonts/jetbrains-mono-{weight}-latin.woff2`)

**Type roles:**
- Display: Montserrat 800/900, all-caps, tight letter-spacing, glitch text-shadow on hero
- Body: Space Grotesk, 16px base, 1.7 line-height
- UI: Space Grotesk, 14px
- Mono: JetBrains Mono, code blocks, tech labels

## Spatial System

**Spacing scale (CSS variables):**
- `--space-1`: 0.25rem
- `--space-2`: 0.5rem
- `--space-4`: 1rem
- `--space-6`: 1.5rem
- `--space-8`: 2rem
- `--space-12`: 3rem
- `--space-16`: 4rem
- `--space-24`: 6rem

**Layout:** Max-width 1400px, centered. Page sections use `minmax(0, 1fr)` grid tracks (never bare `1fr`).

## Motion Philosophy

**Glitch aesthetic:** Hero headline has a subtle CSS animation that alternates text-shadow colors to simulate glitch. Disabled under `prefers-reduced-motion`.

**Hover interactions:** Cards lift with `translateY(-4px)` and a top border that scales in from left.

**Scroll reveals:** Feature cards fade up on scroll-into-view (via IntersectionObserver). Respects reduced motion.

**Color:** No gradients on large surfaces — the palette is flat and punchy. Noise texture overlays at low opacity add grit without distraction.

## Visual Assets

- **logo.svg:** Skewed "P" + stretched "HLIX" with yellow slash accent and gradient glitch overlay
- **favicon.svg:** Black square with skewed red "P", yellow slash, green accent dot
- **og.png:** Generated via `node tools/gen-og.mjs --site mosh-pit`
- **Icons:** Inline SVG, single-color stroke-based, 2px stroke-width, matching the raw aesthetic

## Key Deviations from Spec

- Used Montserrat instead of a display font that didn't exist in the pool (Bebas Neue was not available)
- Added noise texture via inline SVG data URI — avoids external requests for texture
- Hero glitch animation uses `text-shadow` instead of clip-path manipulation for broader browser support

## Compliance Notes

- 4 native clients + DLNA (never "5")
- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- Footer: 3 columns + "Open-source media, on your terms."
- No Google Fonts CDN — all fonts self-hosted
- CSS `@copyright` inside `/* */` comment blocks on all CSS files
- Grid uses `minmax(0, 1fr)` not bare `1fr`
- All pages: OG + Twitter meta, `twitter:creator=@detain`
- 8 features, 6 FAQ, license correct (MPL-2.0 server/hub, MIT clients/plugins)
