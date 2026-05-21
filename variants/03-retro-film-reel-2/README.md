# Retro Film Reel V2 — 50s Movie Theater

**Tagline:** "Timeless stories. Modern streaming."

A Phlix website variant that channels the glamour of 1950s Hollywood movie palaces — velvet textures, ornate marquee borders, art deco gold accents, and spotlight effects. Warm, nostalgic, and sophisticated.

## Visual Identity

### Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary | Velvet Red | `#7A1F1F` |
| Primary Dark | Velvet Dark | `#4A0F0F` |
| Secondary | Vintage Gold | `#D4A017` |
| Background | Cream | `#F5E9D4` |
| Text | Dark Text | `#111` |
| Accent | Retro Red | `#C0392B` |
| Muted | Soft Brown | `#8C5E3C` |

### Typography

- **Headlines:** Bebas Neue — bold, retro, cinematic uppercase
- **Body:** Open Sans — friendly, readable
- **UI:** Nunito — warm, rounded, approachable
- **Code:** Cousine — monospace

### Animation

| Element | Effect | Duration |
|---------|--------|----------|
| Logo | Marquee lights chase (gold text-shadow pulse) | 2s cycle |
| Hero | Spotlight sweep (radial gradient rotation) | 8s cycle |
| Cards | Lift + gold shadow intensifies on hover | 150ms |
| FAQ | Plus icon rotates to X (45deg) | 250ms |
| Scroll | Fade-in-up on card elements | 500ms |
| Reduced motion | All animations disabled | — |

## Pages

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Hero + pitch bullets + features preview + CTA |
| Features | `features.html` | All 8 feature cards |
| Clients | `clients.html` | 5 client cards + ecosystem grid |
| Download | `download.html` | Requirements, 3 install methods, quickstart |
| Plugins | `plugins.html` | Plugin system, example card, types grid |
| Docs | `docs.html` | 4 doc sections + ecosystem grid |
| Hub | `hub.html` | What is Hub, key features, public vs self-hosted |
| About | `about.html` | Philosophy, comparison table, FAQ accordion |

## Technical Stack

- **Pure HTML5, CSS3, Vanilla JavaScript** — no frameworks, no bundlers
- **Self-hosted fonts** via `@font-face` with `font-display: swap`
- **CSS Architecture:** `base.css` (tokens/reset) → `theme.css` (layout/components) → `components.css` (specific patterns)
- **Minimal JS footprint** — ~3KB unminified

## CSS File Organization

```
css/
├── base.css        # CSS custom properties, reset, typography, velvet scrollbar
├── theme.css        # Layout, header marquee lights, hero spotlight sweep, velvet/gold cards, buttons, footer
├── components.css   # Plugin cards, FAQ accordion, hub features, ecosystem grid, philosophy block, code blocks
└── fonts/           # Self-hosted font files (Bebas Neue, Open Sans, Nunito, Cousine)
```

## JavaScript Features

- Mobile hamburger menu toggle with Escape key close
- FAQ accordion with keyboard support (Enter/Space)
- Smooth scroll for anchor links
- Active navigation highlighting
- IntersectionObserver scroll animations (respects reduced motion)
- Logo animation management

## Accessibility

- Skip link (visually hidden until focused)
- Semantic HTML landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`)
- Single `<h1>` per page
- ARIA attributes on interactive elements
- Visible focus styles (3px gold outline)
- Keyboard navigable
- `prefers-reduced-motion` support

## Distinction from -1 (Classic Diner)

| Aspect | -1 (Classic Diner) | -2 (50s Movie Theater) |
|--------|-------------------|----------------------|
| Primary feel | Red/cream diner contrast | Velvet red/gold Hollywood glamour |
| Header | Cream background, neon red flicker | Velvet red gradient, gold trim |
| Cards | Black border + offset shadow | Gold border + gold shadow + gradient fill |
| Texture | Halftone dot overlay | Velvet gradient + spotlight sweep |
| Accents | Teal highlights | Gold highlights throughout |
| Focus color | Teal `#1ABC9C` | Gold `#D4A017` |
| Scrollbar | Soft brown thumb | Velvet red thumb |
| Motion | Neon sign flicker | Marquee lights chase |

**-1:** Fun, friendly, casual diner energy  
**-2:** Glamorous, warm, sophisticated palace elegance

## Build Info

- **Build Start:** 2026-05-20
- **Build End:** 2026-05-20
- **Files:** 8 HTML pages, 3 CSS files, 1 JS file, 4 fonts, 4 images
- **Code Review Score:** 92/100 (PASS)

## SEO & PWA

- `sitemap.xml` — All 8 pages with priorities
- `robots.txt` — Standard allow-all with sitemap reference
- `manifest.webmanifest` — PWA manifest with theme colors
- JSON-LD `SoftwareApplication` schema on homepage
- Full Open Graph and Twitter Card meta on all pages
