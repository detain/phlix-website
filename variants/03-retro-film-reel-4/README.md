# Retro Film Reel V4 — Sci-Fi Retro

**Tagline:** "Timeless stories. Modern streaming."

A Phlix website variant that channels retro-futuristic aesthetics — deep navy backgrounds, glowing teal accents, chrome highlights, and vintage technology meets modern streaming. Sleek, technological, and cinematic.

## Visual Identity

### Color Palette

| Role | Name | Hex |
|------|------|-----|
| Primary Background | Deep Navy | `#0A1628` |
| Primary Text | Ice White | `#E8F0F8` |
| Accent | Teal | `#00D4AA` |
| Muted Text | Steel Gray | `#5A7A8A` |
| Elevated Background | Dark Navy | `#0D1F35` |
| Higher Elevation | Navy | `#112640` |
| Card Surface | Surface | `#142848` |
| Chrome Highlight | Chrome Silver | `#C0C8D0` |
| Border | Navy Border | `#1E3A5F` |

### Typography

- **Headlines:** Oxanium — retro-futuristic, wide letter-spacing
- **Body:** IBM Plex Sans — clean, highly readable sans-serif
- **UI:** Oxanium — same as headlines for visual cohesion
- **Code:** IBM Plex Mono — monospace

### Animation

| Element | Effect | Duration |
|---------|--------|----------|
| Cards | Lift + shadow intensifies on hover | 150ms |
| Buttons | Lift + shadow on hover | 150ms |
| Logo | Subtle scale on hover | 150ms |
| Nav links | Background + color shift on hover | 150ms |
| Active nav | Teal underline with glow | — |
| Reduced motion | All animations disabled | — |

### Visual Effects

- **Teal glow** — Subtle rgba(0,212,170,0.X) box-shadows on interactive elements
- **Glassmorphism header** — Sticky header with backdrop-filter: blur(12px)
- **Chrome accents** — Silver highlights for metallic sci-fi feel
- **Gradient footer line** — Teal gradient accent at top of footer
- **Smooth borders** — Rounded corners (4px-16px) for sleek appearance

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
├── components.css  # Buttons, cards, hero, pitch, features, CTA, client cards, download, docs, FAQ, print
└── fonts/          # Self-hosted font files (Oxanium 400/500/600/700, IBM Plex Sans 300/400/500/600, IBM Plex Mono 400/500)
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
- Visible focus styles (2px teal outline)
- Keyboard navigable
- `prefers-reduced-motion` support

## Distinction from Previous Waves

| Aspect | -1 (Classic Diner) | -2 (50s Movie Theater) | -3 (Film Noir) | -4 (Sci-Fi Retro) |
|--------|-------------------|------------------------|----------------|---------------------|
| Primary feel | Red/cream diner contrast | Velvet red/gold Hollywood glamour | High-contrast B&W cinema | Deep navy + teal tech |
| Background | Cream `#F5E9D4` | Velvet red `#7A1F1F` | Noir black `#0D0D0D` | Deep navy `#0A1628` |
| Text color | Dark brown `#111` | Cream `#F5E9D4` | Off-white `#FAFAFA` | Ice white `#E8F0F8` |
| Accent color | Teal `#1ABC9C` | Gold `#D4A017` | Amber `#D4763B` | Teal `#00D4AA` |
| Shadow style | Minimal, subtle | Gold glow offset | Harsh black offset | Subtle teal glow |
| Texture | Halftone dots | Velvet gradient | Film grain | Chrome highlights |
| Headline font | Bebas Neue | Bebas Neue | Oswald | Oxanium |
| Body font | Quicksand | Open Sans | Lora | IBM Plex Sans |
| Card hover | Teal border | Gold gradient fill | Amber border + lift | Teal glow + lift |
| Focus color | Teal `#1ABC9C` | Gold `#D4A017` | Amber `#D4763B` | Teal `#00D4AA` |

**-1:** Fun, friendly, casual diner energy
**-2:** Glamorous, warm, sophisticated palace elegance
**-3:** Dramatic, mysterious, cinematic noir sophistication
**-4:** Sleek, futuristic, retro-futuristic technological sophistication

## Build Info

- **Build Start:** 2026-05-21
- **Build End:** 2026-05-21
- **Files:** 8 HTML pages, 3 CSS files, 1 JS file, 10 fonts, 3 images
- **Code Review Score:** 94/100 (PASS)

## SEO & PWA

- `sitemap.xml` — All 8 pages with priorities
- `robots.txt` — Standard allow-all with sitemap reference
- `manifest.webmanifest` — PWA manifest with deep navy theme
- JSON-LD `SoftwareApplication` schema on homepage
- Full Open Graph and Twitter Card meta on all pages