# Build Log — Variant 01-minimalist-cinema-3

## Variant Overview

**Name:** Minimalist Cinema V3 — Dark Mode
**Built:** 2026-05-20
**Style:** Dark mode, minimalist, cinema atmosphere
**Tagline:** "Your media. Your way."

---

## Brand Kit Applied

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| primary | #0A0A0F | Near-black background |
| secondary | #FAFAF8 | Warm white text |
| accent | #E63946 | Cinema red (used sparingly) |
| text | #F5F5F0 | Body text |
| muted | #6B6B73 | Muted/secondary text |

### Typography
- **Display:** Bebas Neue (self-hosted)
- **Body:** Work Sans (self-hosted)
- **Note:** All fonts loaded via @font-face from local fonts/ directory

### UI Style
- Dark mode base
- Minimalist composition
- Cinema atmosphere with film-strip motifs
- Red accent used sparingly (only for key CTAs and highlights)
- Warm whites on near-black backgrounds

---

## Files Created

### HTML Pages (8)
- [x] `index.html` — Homepage with hero, pitch, features overview, CTA
- [x] `about.html` — About page with philosophy, license, FAQ accordion
- [x] `features.html` — Detailed feature list with icons
- [x] `clients.html` — Client cards for Roku, Tizen, Windows, Mobile, DLNA
- [x] `hub.html` — Hub relay explanation page
- [x] `download.html` — Download page with server and client cards
- [x] `docs.html` — Documentation links page
- [x] `plugins.html` — Plugin system explanation

### CSS (3)
- [x] `css/base.css` — Reset, CSS variables, skip link, focus styles
- [x] `css/theme.css` — Typography, header/footer, navigation, self-hosted fonts
- [x] `css/components.css` — Buttons, cards, hero, CTA banners, FAQ accordion

### JavaScript (1)
- [x] `js/main.js` — Mobile nav toggle, smooth scroll, FAQ accordion

### Static Files
- [x] `robots.txt` — Allow all, sitemap reference
- [x] `sitemap.xml` — All 8 pages with priorities
- [x] `manifest.webmanifest` — PWA manifest with dark theme colors
- [x] `img/logo.svg` — Logo with film-strip X motif
- [x] `img/favicon.svg` — 32x32 favicon
- [x] `img/og.svg` — 1200x630 Open Graph image

### Documentation
- [x] `img/PROMPTS.md` — Image generation prompts
- [x] `BUILD_LOG.md` — This file

### Fonts (placeholder)
- [x] `fonts/` — Directory created for self-hosted fonts

---

## Technical Implementation

### Self-Hosted Fonts
Fonts are loaded via @font-face in theme.css:
```
@font-face {
  font-family: 'Bebas Neue';
  src: url('../fonts/bebas-neue-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

**Note:** Actual font files (.woff/.woff2) need to be downloaded and placed in `fonts/`:
- `bebas-neue-regular.woff` / `.woff2`
- `work-sans-regular.woff` / `.woff2`
- `work-sans-medium.woff` / `.woff2`
- `work-sans-semibold.woff` / `.woff2`

### SEO & Metadata
Each page includes:
- Unique `<title>` and `<meta description>`
- Open Graph tags (og:title, og:description, og:image, og:url, og:type)
- Twitter Card meta
- JSON-LD Schema (index.html only)
- Canonical URLs
- Theme color meta

### Accessibility
- Skip link to main content
- ARIA labels on navigation
- `aria-current="page"` on active nav items
- Focus-visible styles with accent color
- Mobile nav with focus trap

### Mobile Navigation
- Hamburger toggle visible ≤768px
- Full-screen overlay menu
- Focus trap within open menu
- Close on Escape key
- Close when clicking nav links
- Close on resize to desktop

---

## Differentiation from -1 and -2

| Aspect | V1 (Ultra-Minimal) | V2 (Bold Typography) | V3 (Dark Mode) |
|--------|-------------------|---------------------|----------------|
| Background | White | White | Near-black #0A0A0F |
| Text | Charcoal | Charcoal | Warm white #FAFAF8 |
| Accent | Electric blue | Electric blue | Cinema red #E63946 |
| Feel | Light, airy | Editorial | Cinematic, moody |
| Fonts | Montserrat/Inter | Montserrat/Inter | Bebas Neue/Work Sans |

---

## Frontend Philosophy Checklist

- [x] **Typography:** Distinctive fonts (Bebas Neue for display), avoided generic system fonts
- [x] **Color:** Bold dark palette with cinema red accent used sparingly
- [x] **Motion:** Standard transitions, subtle hover states with red accent
- [x] **Space:** Generous spacing maintained in dark mode context
- [x] **Depth:** Subtle shadows, surface colors for layering on dark background

---

## Build Verification

- [ ] HTML validation (WCAG compliance)
- [ ] CSS validation
- [ ] JavaScript linting
- [ ] Font files present in fonts/
- [ ] All links point to correct variant paths
- [ ] Social metadata accurate for each page
