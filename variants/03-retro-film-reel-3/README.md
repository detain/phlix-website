# Retro Film Reel V3 — Film Noir

**Tagline:** "Timeless stories. Modern streaming."

A Phlix website variant that channels the drama of film noir cinema — high-contrast black and white, a single amber accent, dramatic offset shadows, and subtle film grain textures. Sophisticated, mysterious, and cinematic.

## Visual Identity

### Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary Background | Noir Black | `#0D0D0D` |
| Primary Text | Noir White | `#FAFAFA` |
| Accent | Noir Amber | `#D4763B` |
| Elevated Background | Dark Gray | `#1A1A1A` |
| Card Background | Dark Gray Alt | `#242424` |
| Border | Subtle Border | `#3A3A3A` |
| Body Text | Muted | `#9A9A9A` |

### Typography

- **Headlines:** Oswald — bold, uppercase, wide letter-spacing
- **Body:** Lora — classic serif, readable
- **UI:** Oswald — same as headlines for visual cohesion
- **Code:** Courier New — monospace

### Animation

| Element | Effect | Duration |
|---------|--------|----------|
| Logo | Shadow play (dramatic text-shadow depth) | 3s cycle |
| Cards | Lift + shadow intensifies on hover | 150ms |
| Buttons | Lift + shadow on hover | 150ms |
| Links | Color shift to white on hover | 150ms |
| Reduced motion | All animations disabled | — |

### Visual Effects

- **Film grain overlay** — Subtle repeating-linear-gradient on hero and page-header sections
- **Radial glow** — Amber accent glow on hero backgrounds
- **Dramatic shadows** — Hard offset box-shadows (not blur) for noir depth
- **High contrast** — B&W palette with single amber accent point

## Pages

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Hero + pitch bullets + features preview + CTA |
| Features | `features.html` | All 8 feature cards |
| Clients | `clients.html` | 5 client cards + ecosystem grid |
| Download | `download.html` | Requirements, 3 install methods, ecosystem list |
| Plugins | `plugins.html` | Plugin system, example card, types grid |
| Docs | `docs.html` | 4 doc sections + ecosystem grid |
| Hub | `hub.html` | What is Hub, key features, public vs self-hosted |
| About | `about.html` | Philosophy, comparison table, FAQ accordion |

## Technical Stack

- **Pure HTML5, CSS3, Vanilla JavaScript** — no frameworks, no bundlers
- **Self-hosted fonts** via `@font-face` with `font-display: swap`
- **CSS Architecture:** `base.css` (tokens/reset) → `theme.css` (layout/nav) → `components.css` (components/effects)
- **Minimal JS footprint** — mobile nav, smooth scroll, active nav, scroll animations

## CSS File Organization

```
css/
├── base.css        # CSS custom properties, reset, typography, scrollbar, reduced motion
├── theme.css       # Font-face loading, layout, header, footer, navigation, responsive nav
├── components.css   # Buttons, cards, hero, pitch, features, CTA, client cards, download, docs, FAQ, print
└── fonts/          # Self-hosted font files (Oswald 400/500/700, Lora 400/400-italic/600)
```

## JavaScript Features

- Mobile hamburger menu toggle with ARIA attributes
- Smooth scroll for anchor links
- Active navigation highlighting based on current page
- IntersectionObserver scroll animations (respects reduced motion)

## Accessibility

- Skip link (visually hidden until focused)
- Semantic HTML landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`)
- Single `<h1>` per page
- ARIA attributes on interactive elements
- Visible focus styles (2px amber outline)
- Keyboard navigable
- `prefers-reduced-motion` support

## Distinction from -1 and -2

| Aspect | -1 (Classic Diner) | -2 (50s Movie Theater) | -3 (Film Noir) |
|--------|-------------------|----------------------|---------------|
| Primary feel | Red/cream diner contrast | Velvet red/gold Hollywood glamour | High-contrast B&W cinema |
| Background | Cream `#F5E9D4` | Velvet red `#7A1F1F` | Noir black `#0D0D0D` |
| Text color | Dark brown `#111` | Cream `#F5E9D4` | Off-white `#FAFAFA` |
| Accent color | Teal `#1ABC9C` | Gold `#D4A017` | Amber `#D4763B` |
| Shadow style | Minimal, subtle | Gold glow offset | Harsh black offset |
| Texture | Halftone dots | Velvet gradient | Film grain |
| Headline font | Bebas Neue | Bebas Neue | Oswald |
| Body font | Quicksand | Open Sans | Lora |
| Card hover | Teal border | Gold gradient fill | Amber border + lift |
| Focus color | Teal `#1ABC9C` | Gold `#D4A017` | Amber `#D4763B` |

**-1:** Fun, friendly, casual diner energy  
**-2:** Glamorous, warm, sophisticated palace elegance  
**-3:** Dramatic, mysterious, cinematic noir sophistication

## Build Info

- **Build Start:** 2026-05-20
- **Build End:** 2026-05-20
- **Files:** 8 HTML pages, 3 CSS files, 1 JS file, 6 fonts, 4 images
- **Code Review Score:** 94/100 (PASS)

## SEO & PWA

- `sitemap.xml` — All 8 pages with priorities
- `robots.txt` — Standard allow-all with sitemap reference
- `manifest.webmanifest` — PWA manifest with noir black theme
- JSON-LD `SoftwareApplication` schema on homepage
- Full Open Graph and Twitter Card meta on all pages