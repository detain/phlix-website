# BUILD LOG — Spotlight Projector V2 (02-spotlight-projector-2)

## Variant: Art Deco Elegance

**Built:** 2026-05-20
**Brand:** Spotlight Projector — Art Deco Elegance
**Personality:** Cinematic, Premium, Luxurious, Geometric, Sophisticated

---

## What Was Built

### Directory Structure
```
variants/02-spotlight-projector-2/
├── css/
│   ├── base.css       # Reset, CSS variables, typography, self-hosted fonts
│   ├── theme.css      # Art Deco visual theme with sunburst animations
│   └── components.css # All component styles with deco corner accents
├── js/
│   └── main.js        # Mobile nav, FAQ accordion, fade-in animations
├── img/
│   ├── logo.svg        # Art Deco sunburst medallion logo
│   ├── favicon.svg     # Compact geometric favicon
│   ├── og.svg         # Social sharing image with deco styling
│   └── PROMPTS.md     # Image generation prompts for designers
├── fonts/
│   ├── Cinzel-Bold.ttf
│   ├── Lora-Regular.ttf
│   ├── SourceSansPro-Regular.ttf
│   ├── SourceSansPro-SemiBold.ttf
│   └── FiraCode-Regular.ttf
└── pages/
    ├── index.html
    ├── about.html
    ├── features.html
    ├── clients.html
    ├── download.html
    ├── docs.html
    ├── hub.html
    └── plugins.html
```

### Configuration Files
- `sitemap.xml` — All pages indexed for search engines
- `robots.txt` — Allow crawling of variant
- `manifest.webmanifest` — PWA manifest with Art Deco theme colors

---

## Design Differentiation from V1

### Visual Metaphor
- **V1:** Classic cinematic with spotlight sweep, theater curtain textures
- **V2:** Art Deco geometric with sunburst rays, stepped corners, chevron borders

### Animation Style
- **V1:** Horizontal spotlight sweep (left to right across header)
- **V2:** Radial sunburst pulse and rotation (center-out, rotating rays)

### Card Presentation
- **V1:** Soft gradient cards with warm glow hover states
- **V2:** Geometric corner accents (L-shaped borders in gold), fade-in on scroll

### Color Usage
- **V1:** Burgundy gradients, warm shadows
- **V2:** Gold foil accents on corners and borders, cleaner separation

### Typography
- **Same:** Cinzel Bold (headlines), Lora (body), Source Sans Pro (UI)
- **Different:** Letter-spacing increased for Art Deco effect, uppercase UI elements

---

## Technical Implementation

### Self-Hosted Fonts (No CDN)
All fonts are self-hosted via `@font-face` with `font-display: swap`:
- Cinzel Bold — display headlines
- Lora Regular — body text
- Source Sans Pro — UI elements
- Fira Code — code blocks

### Art Deco Design Elements
1. **Sunburst background** — Rotating conic gradient in hero
2. **Geometric corner accents** — SVG corner decorations with stepped forms
3. **Gold foil borders** — Subtle gold lines as section dividers
4. **Chevron indicators** — Underline animation on nav hover
5. **Deco dividers** — Stepped line elements between sections

### Animations
- `@keyframes sunburst-pulse` — Header radial glow animation
- `@keyframes sunburst-rotate` — Hero background ray rotation (60s cycle)
- Intersection Observer fade-in — Cards animate in on scroll
- CSS transitions for all interactive elements

### Mobile Navigation
- Hamburger menu toggle with ARIA attributes
- Focus trap within mobile nav
- Escape key closes menu
- Smooth open/close transitions

### Accessibility
- Skip link to main content
- ARIA labels on all navigation elements
- Focus visible states matching theme
- Reduced motion support via `prefers-reduced-motion`

---

## Content Source
All page content sourced from `shared/content.json`:
- Hero section with Phlix tagline
- Features list (8 features)
- Clients list (5 clients)
- FAQ accordion (6 questions)
- Ecosystem links (5 projects)
- Footer with navigation columns

---

## Frontend Philosophy Checklist

- [x] **Typography:** Distinctive Cinzel serif for headlines (not Inter/Roboto)
- [x] **Color:** Bold gold (#F5C542) on deep black, committed contrast
- [x] **Motion:** Sunburst rotation and pulse — one coordinated animation, not scattered effects
- [x] **Space:** Generous spacing with geometric corner accents
- [x] **Depth:** Layered gold borders, subtle gradients, decorative line work

---

## Files Created
- `css/base.css` — 279 lines
- `css/theme.css` — 469 lines
- `css/components.css` — 571 lines
- `js/main.js` — 123 lines
- `img/logo.svg` — Art Deco sunburst logo
- `img/favicon.svg` — Geometric favicon
- `img/og.svg` — Social sharing image
- `img/PROMPTS.md` — Designer prompts
- `index.html` — Home page
- `about.html` — About page
- `features.html` — Features page
- `clients.html` — Clients page
- `download.html` — Download page
- `docs.html` — Documentation page
- `hub.html` — Hub page
- `plugins.html` — Plugins page
- `sitemap.xml` — Sitemap
- `robots.txt` — Robots rules
- `manifest.webmanifest` — PWA manifest
- `BUILD_LOG.md` — This file

**Total: 21 files**

---

## Notes
- Fonts copied from `-1` variant (same brand, different style interpretation)
- All HTML pages follow same structure as `-1` for consistency
- Art Deco styling applied through CSS class names, not structural changes
- Variant uses relative paths for all assets
- JSON-LD structured data on each page for SEO
