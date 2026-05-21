# Build Log: 03-retro-film-reel-3 (Film Noir)

## Build Date
2026-05-20

## Concept
**Film Noir Badge** — High contrast B&W aesthetic with single warm amber accent. Dramatic shadows, typewriter typography elements, clean geometric shapes.

## Brand Kit Applied
- **Primary:** #0D0D0D (pure black)
- **Secondary:** #FAFAFA (pure white)
- **Accent:** #D4763B (warm amber)
- **Text:** #1A1A1A
- **Muted:** #6B6B6B
- **Fonts:** Oswald (display), Lora (body) — self-hosted via WOFF2

## Pages Created
1. `index.html` - Home page with hero, pitch bullets, features overview, CTA
2. `features.html` - Detailed feature breakdown
3. `clients.html` - Client cards (Roku, Tizen, Windows, Mobile, DLNA)
4. `download.html` - Download links and ecosystem list
5. `plugins.html` - Plugin documentation
6. `docs.html` - Documentation links
7. `hub.html` - Phlix Hub feature page
8. `about.html` - Philosophy, license, FAQ

## Technical Files
- `css/base.css` - Reset, variables, focus styles, prefers-reduced-motion
- `css/theme.css` - Font imports (self-hosted), header/footer, navigation
- `css/components.css` - Buttons, cards, hero, shadows, animations
- `js/main.js` - Mobile nav toggle, typewriter effect, entrance animations
- `robots.txt` - Allow all, sitemap reference
- `sitemap.xml` - All 8 pages with priorities
- `manifest.webmanifest` - PWA manifest with noir colors

## Asset Files
- `img/logo.svg` - Film reel badge logo (noir style)
- `img/favicon.svg` - Simplified badge favicon
- `img/og.svg` - Social sharing image with tagline

## Features Implemented
- [x] Mobile navigation with focus trap
- [x] Smooth scroll behavior
- [x] Staggered entrance animations
- [x] Shadow play animation (header motif)
- [x] Typewriter text effect
- [x] Responsive breakpoints (900px nav, 768px content)
- [x] prefers-reduced-motion support
- [x] Skip link for accessibility
- [x] Focus-visible styles
- [x] JSON-LD structured data
- [x] Open Graph meta tags
- [x] Twitter Card meta tags
- [x] SEO canonical URLs
- [x] Semantic HTML throughout
- [x] ARIA labels and roles

## Distinct from Other Variants

### vs 03-retro-film-reel-1 (Warm Diner)
- -1: Cream (#F5E9D4), retro red (#C0392B), teal (#1ABC9C), chrome
- -3: Pure black (#0D0D0D), pure white (#FAFAFA), amber only (#D4763B)
- -1 uses Bebas Neue, -3 uses Oswald
- -1 has playful rounded elements, -3 has sharp geometric

### vs 03-retro-film-reel-2 (Movie Palace)
- -2: Velvet textures, ornate gold, theatrical drama
- -3: Sharp minimalism, typewriter elements, dramatic shadows
- -2 has marquee lights animation, -3 has shadow play
- -2 uses Georgia/serif heavy, -3 uses Oswald/Lora

## Self-Hosted Fonts
Fonts are loaded from local WOFF2 files in `/fonts/` directory:
- `oswald-400.woff2`
- `oswald-500.woff2`
- `oswald-700.woff2`
- `lora-400.woff2`
- `lora-400-italic.woff2`
- `lora-600.woff2`

No Google Fonts CDN used.

## Notes
- Font-display: swap applied for performance
- CSS variables for all colors (single source of truth)
- Film grain texture via CSS repeating-linear-gradient
- All interactive elements have 44px minimum touch target
