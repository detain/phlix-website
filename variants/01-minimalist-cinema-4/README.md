# 01-minimalist-cinema-4

**Brand:** Minimalist Cinema (Warm Editorial variation)
**Concept:** Warm, magazine-quality aesthetic with serif headlines, generous whitespace, and terracotta accents

## Visual Personality

The Warm Editorial edition embraces a refined, magazine-like atmosphere. Where previous variants use darker or more dramatic palettes, -4 anchors itself in warm cream (#F7F3EE) with warm black text and terracotta (#C4583A) accents. The design feels like a quality publication — warm, inviting, and sophisticated.

- **Warm cream backgrounds** (#F7F3EE) with white cards for depth
- **Serif headlines** (Lora) at `clamp(2.75rem, 7vw, 5rem)` for dramatic editorial impact
- **Terracotta accent** used sparingly for CTAs, links, and hover states
- **Generous whitespace** with breathable layouts and relaxed spacing
- **Subtle shadows** on cards and elevated surfaces

## Pages

- `index.html` — Home page with hero, pitch section (bullet list), 8 feature cards, and CTA banner
- `about.html` — Project mission, BSD-3 license, contributing, FAQ accordion (6 questions)
- `features.html` — Detailed feature breakdown with 8 icon+text sections and CTA
- `clients.html` — 5 client cards: Roku (Stable), Samsung Tizen (Stable), Windows (Stable), Mobile (Beta), DLNA (Built-in)
- `download.html` — Installation commands (composer require), client download links, ecosystem list
- `plugins.html` — Plugin system docs with LifecycleInterface, manifest schema, example reference
- `docs.html` — Links to external documentation (user guide, API reference, developer docs, hub-admin)
- `hub.html` — Remote access via reverse-tunnel relay; public Hub vs self-hosted options

## Brand Tokens

- **Background:** `#F7F3EE` (Warm Cream)
- **Text:** `#2D2926` (Warm Black)
- **Accent:** `#C4583A` (Terracotta)
- **Muted:** `#7A6E66`
- **White:** `#FDFCFB`
- **Display font:** Lora (serif, 400/700)
- **Body font:** Source Sans 3 (humanist sans-serif, 400/600)

## Key Features

- **Warm editorial aesthetic** — Cream backgrounds with warm black text and terracotta accents
- **Serif typography** — Lora headlines at `clamp(2.75rem, 7vw, 5rem)` with editorial feel
- **Self-hosted fonts** — TTF with `font-display: swap`, zero external requests (privacy, offline, performance)
- **Sticky header with backdrop blur** — Modern glass-morphism effect on scroll
- **Animated nav links** — Underline grows from left on hover, terracotta on active page
- **Generous whitespace** — Relaxed spacing throughout, breathable layouts
- **Subtle shadows** — Soft elevation on cards and surfaces
- **FAQ accordion** — Accessible expand/collapse on about.html with ARIA states
- **Mobile nav with slide-in panel** — Hamburger menu with smooth CSS transform animation
- **PWA-ready** — manifest.webmanifest, SVG favicon, standalone display mode
- **SEO-optimized** — Canonical URLs, Open Graph + Twitter Cards, meta descriptions <160 chars
- **Reduced motion support** — Respects `prefers-reduced-motion` preference
- **8-page sitemap** — All pages indexed with priority and changefreq
- **44px minimum touch targets** — All buttons and interactive elements

## Structure

```
01-minimalist-cinema-4/
├── index.html          Home page
├── about.html          About + FAQ
├── features.html       Feature details
├── clients.html        Client cards
├── download.html       Install + clients
├── plugins.html       Plugin system
├── docs.html          Documentation links
├── hub.html            Remote access
├── css/
│   ├── base.css        Reset, @font-face, CSS variables, accessibility
│   ├── theme.css       Typography, header/footer, nav, responsive
│   └── components.css   Buttons, hero, cards, sections
├── js/
│   └── main.js         Nav toggle, smooth scroll
├── img/
│   ├── logo.svg        Phlix wordmark
│   ├── favicon.svg     Terracotta X favicon
│   └── og.svg          Social share image
└── fonts/
    ├── lora-regular.ttf
    ├── lora-bold.ttf
    ├── source-sans-3-regular.ttf
    └── source-sans-3-semibold.ttf
├── manifest.webmanifest
├── robots.txt
└── sitemap.xml
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
- Fonts are self-hosted TTF (~132-235KB each)
- Mobile breakpoint at 768px, fine-tuned at 480px
- Accessible: skip links, ARIA labels, semantic HTML5, reduced-motion, 44px touch targets
- Follows the "Warm Editorial" aesthetic — sophisticated, inviting, magazine-quality
- Serif headlines (Lora) create warm, flowing, editorial feel
- Terracotta accent (#C4583A) draws focus to CTAs and interactive elements
- Sticky header with backdrop blur adds modern depth
