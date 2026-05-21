# 01-minimalist-cinema-3

**Brand:** Minimalist Cinema (Dark Mode variation)
**Concept:** Dark, cinematic aesthetic with condensed uppercase typography and red accent highlights

## Visual Personality

The Dark Mode edition embraces a sleek, theater-like atmosphere. Where previous variants use lighter backgrounds, -3 anchors itself in near-black (#0A0A0F) with off-white text and red (#E63946) accents. The design feels like a cinema lobby display — dramatic, modern, and focused.

- **Near-black backgrounds** (#0A0A0F) with surface layers for depth
- **Condensed uppercase headlines** (Bebas Neue) at `clamp(2.5-4.5rem)` with letter-spacing
- **Red accent** used for CTAs, icon backgrounds, hover states, and visual highlights
- **Icon boxes** — 48×48px accent-tinted containers with stroke icons
- **Dark surface cards** with subtle borders, hover to accent border + lift effect

## Pages

- `index.html` — Home page with hero, pitch section (checkmark bullets), 8 feature cards, and CTA banner
- `about.html` — Project philosophy, BSD-3 license, contributing, FAQ accordion (6 questions)
- `features.html` — Detailed feature breakdown with 8 icon+text sections and CTA
- `clients.html` — 5 client cards: Roku (Stable), Samsung Tizen (Stable), Windows (Stable), Mobile (Beta), DLNA (Built-in)
- `download.html` — Installation commands (composer require), client download links, ecosystem list
- `plugins.html` — Plugin system docs with LifecycleInterface, manifest schema, example reference
- `docs.html` — Links to external VitePress documentation (user guide, API reference, developer docs, hub-admin)
- `hub.html` — Remote access via reverse-tunnel relay; public Hub vs self-hosted options

## Brand Tokens

- **Primary:** `#0A0A0F` (Near-Black)
- **Secondary:** `#FAFAF8` (Off-White)
- **Accent:** `#E63946` (Red)
- **Surface:** `#12121A`
- **Surface Elevated:** `#1A1A24`
- **Text:** `#F5F5F0`
- **Muted:** `#6B6B73`
- **Display font:** Bebas Neue (condensed uppercase sans-serif)
- **Body font:** Work Sans (humanist sans-serif, 400/500/600)

## Key Features

- **Dark mode aesthetic** — Near-black backgrounds (#0A0A0F) with layered surface colors
- **Condensed uppercase typography** — Bebas Neue headlines at `clamp(2.5rem, 6vw, 4.5rem)` with 0.02em letter-spacing
- **Self-hosted fonts** — WOFF2 with `font-display: swap`, zero external requests (privacy, offline, performance)
- **Icon box design** — 48×48px containers with `rgba(230, 57, 70, 0.1)` background, stroke icons in accent color
- **Cinematic hero** — Dark gradient background, accent line element above, centered text
- **FAQ accordion** — Accessible expand/collapse on about.html with ARIA states
- **Mobile nav with focus trap** — Keyboard-accessible hamburger menu with scroll lock
- **PWA-ready** — manifest.webmanifest, SVG favicon, standalone display mode
- **SEO-optimized** — Canonical URLs, JSON-LD schema on index, Open Graph + Twitter Cards
- **Reduced motion support** — Respects `prefers-reduced-motion` preference
- **8-page sitemap** — All pages indexed with priority and changefreq
- **44px minimum touch targets** — All buttons and interactive elements

## Structure

```
01-minimalist-cinema-3/
├── index.html          Home page
├── about.html          About + FAQ
├── features.html       Feature details
├── clients.html        Client cards
├── download.html       Install + clients
├── plugins.html       Plugin system
├── docs.html          Documentation links
├── hub.html            Remote access
├── css/
│   ├── base.css        Reset, CSS variables, accessibility
│   ├── theme.css       Font imports, typography, header/footer, nav
│   └── components.css   Buttons, hero, cards, sections
├── js/
│   └── main.js         Nav toggle, FAQ accordion, smooth scroll
├── img/
│   ├── logo.svg        Phlix wordmark
│   ├── favicon.svg     32×32 favicon
│   ├── og.svg          Social share image
│   └── PROMPTS.md      Image generation prompts
└── fonts/
    ├── bebas-neue-regular.woff
    ├── bebas-neue-regular.woff2
    ├── work-sans-regular.woff
    ├── work-sans-regular.woff2
    ├── work-sans-medium.woff
    ├── work-sans-medium.woff2
    ├── work-sans-semibold.woff
    └── work-sans-semibold.woff2
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
└── fonts/README.md
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
- Accessible: skip links, ARIA labels, focus trap, semantic HTML5, reduced-motion
- Follows the "Dark Mode" cinematic aesthetic — sleek, dramatic, modern
- Typography-forward: condensed uppercase display font creates movie-poster feel
- Red accent (#E63946) draws focus to CTAs and interactive elements
