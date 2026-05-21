# Build Log: 01-minimalist-cinema-4

## Variant: Minimalist Cinema V4 — Warm Editorial

**Build Date:** 2026-05-21
**Aesthetic:** Warm Editorial — warm off-white backgrounds, terracotta accents, generous whitespace, magazine-quality typography

## Brand Tokens

### Colors
- Primary (Background): `#F7F3EE` (warm cream)
- Secondary (Text): `#2D2926` (warm black)
- Accent: `#C4583A` (terracotta)
- Muted: `#7A6E66`
- White: `#FDFCFB`

### Typography
- **Display/Headlines:** Lora (self-hosted TTF)
- **Body/UI:** Source Sans 3 (self-hosted TTF)
- Fallbacks: Georgia, serif / system-ui, sans-serif

### UI Style
- Warm editorial, magazine-quality
- Generous whitespace
- Terracotta as CTA accent only
- Subtle shadows and rounded corners

## Pages Built (8 total)

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, pitch bullets, feature grid, CTA |
| Features | `features.html` | All 8 features with icon cards |
| Clients | `clients.html` | 5 client platforms (Roku, Tizen, Windows, Mobile, DLNA) |
| Download | `download.html` | Install commands, system requirements, ecosystem |
| Plugins | `plugins.html` | Plugin system documentation |
| Hub | `hub.html` | Remote access via reverse tunnel |
| Docs | `docs.html` | Links to user guide, developer guide, API reference |
| About | `about.html` | Mission statement, FAQ |

## Supporting Files

| File | Purpose |
|------|---------|
| `css/base.css` | Reset, design tokens, self-hosted fonts |
| `css/theme.css` | Typography, layout, header/footer |
| `css/components.css` | Buttons, cards, bullet lists, responsive nav |
| `js/main.js` | Mobile nav toggle, smooth scroll |
| `img/favicon.svg` | Terracotta X icon favicon |
| `img/logo.svg` | Terracotta X icon + "Phlix" wordmark |
| `img/og.svg` | Open Graph image |
| `robots.txt` | Search engine crawling rules |
| `sitemap.xml` | All 8 pages with priorities |
| `manifest.webmanifest` | PWA manifest |
| `fonts/*.ttf` | Lora + Source Sans 3 (self-hosted) |

## Content Source

All content sourced from `shared/content.json`:
- Hero section (eyebrow, headline, subheadline, CTAs)
- Pitch bullets (7 items)
- Features (8 items with icons)
- Clients (5 platforms with highlights)
- Ecosystem (5 repositories)
- FAQ (6 questions)
- Footer (columns and links)

## Philosophy Compliance

- [x] **Typography:** Lora serif for headlines, Source Sans 3 for body — distinctive, non-generic
- [x] **Color:** Warm cream background, terracotta accent used sparingly for CTAs
- [x] **Motion:** CSS transitions on buttons and cards (hover effects)
- [x] **Space:** Generous whitespace, breathable layouts
- [x] **Depth:** Subtle shadows on cards, warm color palette with muted tones

## Notes

- Fonts downloaded as TTF from Google Fonts (woff2 conversion not needed for modern browser support)
- Mobile navigation uses CSS transforms for smooth slide-in panel
- All external links use `rel="noopener noreferrer"` where appropriate
- Semantic HTML throughout (header, main, footer, nav, article)
