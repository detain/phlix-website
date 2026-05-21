# 01-minimalist-cinema-2

**Brand:** Minimalist Cinema (Bold Typography variation)
**Concept:** Ultra-minimalist, editorial layout with cinema atmosphere

## Visual Personality

The Bold Typography edition shifts from the Ultra-Minimal (-1) aesthetic toward a magazine editorial feel. Where -1 uses centered layouts with icon boxes, -2 embraces:
- **Full-bleed dark hero** (deep navy) with left-aligned text
- **Dramatic serif headlines** (Cormorant Garamond) at clamp(2.5-5rem)
- **Cinema red accents** used sparingly as section dividers rather than button fills
- **Text-only cards** with a 3px left border accent — no icons, no boxes
- **Generous but editorial density** — breathable whitespace with tighter card spacing than -1

## Pages

- `index.html` — Home page with hero, pitch section, 8 feature cards, and CTA banner
- `about.html` — Project info with FAQ accordion (6 questions about Plex/Jellyfin/Emby comparison, NAT exposure, formats, mobile app, plugin development, license)
- `features.html` — Detailed feature breakdown with 8 feature sections and CTA
- `clients.html` — 5 client cards: Roku (Stable), Samsung Tizen (Stable), Windows (Stable), Mobile (Beta), DLNA (Built-in)
- `download.html` — Installation commands, system requirements (PHP 8.3+, FFmpeg), ecosystem list
- `plugins.html` — Plugin system docs with LifecycleInterface, manifest schema, example plugin reference
- `docs.html` — Links to external VitePress documentation (user guide, installation, configuration, API reference)
- `hub.html` — Remote access via reverse-tunnel relay; public Hub vs self-hosted options

## Brand Tokens

- **Primary:** `#1A1A2E` (Deep Navy)
- **Secondary:** `#F5F5F5` (Off-White)
- **Accent:** `#E63946` (Cinema Red)
- **Text:** `#2B2D42`
- **Muted:** `#8D99AE`
- **Display font:** Cormorant Garamond (700 weight) — dramatic serif
- **Body font:** Karla (400/500/700) — clean sans-serif

## Key Features

- **Bold typography scale** — H1 at `clamp(2.5rem, 6vw, 5rem)` with negative letter-spacing and 1.1 line-height
- **Self-hosted fonts** — WOFF2 with `font-display: swap`, zero external font requests
- **Text-only card design** — Left border accent in cinema red, hover transitions to navy with 4px translateX
- **Editorial hero** — Full-bleed dark navy with subtle gradient overlay, left-aligned text
- **FAQ accordion** — Accessible expand/collapse on about.html with ARIA states
- **Mobile nav with focus trap** — Keyboard-accessible hamburger menu
- **PWA-ready** — manifest.webmanifest, SVG favicon, standalone display
- **SEO-optimized** — Canonical URLs, JSON-LD schema on index, Open Graph + Twitter Cards
- **Reduced motion support** — Respects `prefers-reduced-motion` preference
- **8-page sitemap** — All pages indexed with priority and changefreq

## Structure

```
01-minimalist-cinema-2/
├── index.html          Home page
├── about.html          About + FAQ
├── features.html        Feature details
├── clients.html        Client cards
├── download.html       Install + requirements
├── plugins.html        Plugin system
├── docs.html           Documentation links
├── hub.html            Remote access
├── css/
│   ├── base.css        Reset, fonts, CSS variables
│   ├── theme.css       Typography, header/footer, nav
│   └── components.css  Buttons, cards, sections
├── js/
│   └── main.js         Nav toggle, FAQ accordion, smooth scroll
├── img/
│   ├── logo.svg        Film-frame X motif with red accent
│   ├── favicon.svg    32×32 minimal favicon
│   ├── og.svg          Social share image
│   └── PROMPTS.md      Image generation prompts
└── fonts/
    ├── cormorant-garamond-600.woff2
    ├── cormorant-garamond-700.woff2
    ├── karla-400.woff2
    ├── karla-500.woff2
    └── karla-700.woff2
```

## Commands

No build commands required. This is a static HTML/CSS/JS site — deploy directly to any static host (GitHub Pages, Netlify, Vercel, etc.).

To preview locally:
```bash
# Any static server works, e.g.:
python3 -m http.server 8000
# or
npx serve .
```

## Notes

- All content is static HTML — no build step, no framework dependencies
- Fonts are self-hosted WOFF2 (~13-21KB each)
- Mobile breakpoint at 768px
- Accessible: skip links, ARIA labels, focus trap, semantic HTML5
- Follows the "Bold Typography" editorial aesthetic — darker, more dramatic than -1 (Ultra-Minimal)
