# Documenter Report — 01-minimalist-cinema-3

## Variant Overview
**Name:** Minimalist Cinema V3 — Dark Mode  
**Personality:** Sleek, Dark, Cinematic, Modern, Typography-Driven  
**Tagline:** "Your media. Your way."  
**Build Status:** ✅ Complete — All 8 pages, CSS, JS, images, fonts, and config files created

---

## File Inventory

### HTML Pages (8 files)
| File | Purpose |
|------|---------|
| `index.html` | Home page — hero, pitch bullets, features overview, CTA banner |
| `about.html` | About page — philosophy, license, contributing, FAQ accordion |
| `features.html` | Features detail page — 8 feature highlights with icon + text layout |
| `clients.html` | Clients page — 5 client cards (Roku, Samsung Tizen, Windows, Mobile, DLNA) |
| `download.html` | Download page — install commands, client downloads, ecosystem list |
| `plugins.html` | Plugins page — plugin system docs, LifecycleInterface, example reference |
| `docs.html` | Documentation page — links to external VitePress docs (user guide, API reference, developer docs) |
| `hub.html` | Hub page — remote access via reverse-tunnel relay; public vs self-hosted |

### CSS Files (3 files)
| File | Lines | Purpose |
|------|-------|---------|
| `css/base.css` | 175 | CSS reset, CSS custom properties (colors, spacing, shadows, transitions), accessibility (skip-link, focus, reduced-motion) |
| `css/theme.css` | 324 | Self-hosted font imports, typography scale, header/footer, primary navigation, responsive nav |
| `css/components.css` | 654 | All UI components: buttons, hero, pitch, features, client cards, download blocks, page headers, FAQ accordion, CTA banners |

### JavaScript (1 file)
| File | Lines | Purpose |
|------|-------|---------|
| `js/main.js` | 166 | Mobile nav toggle with focus trap, smooth scroll for anchor links, FAQ accordion, keyboard navigation enhancement (vanilla JS, no frameworks) |

### Images (4 files)
| File | Purpose |
|------|---------|
| `img/logo.svg` | Phlix wordmark logo |
| `img/favicon.svg` | Minimal 32×32 favicon |
| `img/og.svg` | Social share image (1200×630) with tagline |
| `img/PROMPTS.md` | Image generation prompts and placeholder strategy |

### Fonts (7 files)
Self-hosted WOFF2 fonts with `font-display: swap`:
- `fonts/bebas-neue-regular.woff2` — headlines (condensed uppercase sans-serif, 400 weight)
- `fonts/bebas-neue-regular.woff` — fallback for older browsers
- `fonts/work-sans-regular.woff2` — body text (regular, 400)
- `fonts/work-sans-medium.woff2` — body text (medium, 500)
- `fonts/work-sans-semibold.woff2` — body text (semibold, 600)
- Plus corresponding .woff fallbacks for each

### Config Files (3 files)
| File | Purpose |
|------|---------|
| `manifest.webmanifest` | PWA manifest with theme colors and icon |
| `robots.txt` | Allow all crawlers |
| `sitemap.xml` | All 8 pages indexed with priorities and changefreq |

### Documentation (1 file)
| File | Purpose |
|------|---------|
| `fonts/README.md` | Self-hosted fonts documentation — required files, download sources, rationale |

---

## Architecture

### Directory Structure
```
01-minimalist-cinema-3/
├── index.html          (home)
├── about.html
├── features.html
├── clients.html
├── download.html
├── plugins.html
├── docs.html
├── hub.html
├── css/
│   ├── base.css        (reset, variables, accessibility)
│   ├── theme.css       (fonts, typography, header/footer, nav)
│   └── components.css  (all UI components)
├── js/
│   └── main.js         (nav toggle, FAQ accordion, smooth scroll)
├── img/
│   ├── logo.svg
│   ├── favicon.svg
│   ├── og.svg
│   └── PROMPTS.md
├── fonts/
│   ├── bebas-neue-regular.woff
│   ├── bebas-neue-regular.woff2
│   ├── work-sans-regular.woff
│   ├── work-sans-regular.woff2
│   ├── work-sans-medium.woff
│   ├── work-sans-medium.woff2
│   ├── work-sans-semibold.woff
│   └── work-sans-semibold.woff2
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
└── fonts/README.md
```

### Technology Stack
- **No frameworks** — pure HTML, CSS, vanilla JavaScript
- **Self-hosted fonts** — WOFF2 with font-display: swap (zero external font requests)
- **Responsive** — Mobile-first with breakpoint at 768px
- **Accessible** — Skip links, ARIA labels, focus trap in mobile nav, semantic HTML, prefers-reduced-motion

---

## Key Implementation Decisions

### 1. Dark Mode Color System
| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#0A0A0F` | Near-black backgrounds |
| Secondary | `#FAFAF8` | Off-white for text on dark |
| Accent | `#E63946` | Red for CTAs, icons, accents |
| Surface | `#12121A` | Card backgrounds |
| Surface Elevated | `#1A1A24` | Elevated surfaces |
| Muted | `#6B6B73` | Secondary text, borders |

### 2. Self-Hosted Fonts
- **Bebas Neue** — condensed uppercase display font (weight 400), dramatic cinematic feel
- **Work Sans** — humanist sans-serif for body/UI (weights 400/500/600)
- All loaded via @font-face with `font-display: swap`
- No Google Fonts CDN — complete privacy and offline capability

### 3. Typography Scale
- H1: `clamp(2.5rem, 6vw, 4.5rem)` — uppercase, letter-spacing 0.02em
- H2: `clamp(1.75rem, 3.5vw, 2.75rem)` — uppercase
- H3: `clamp(1.25rem, 2vw, 1.75rem)` — uppercase
- Line-height: 1.1 for headings, 1.6 for body
- Bebas Neue provides that cinematic "movie poster" feel

### 4. Component Style: Icon Boxes
- Feature cards have accent-colored icon containers (48×48px)
- Icon containers use `rgba(230, 57, 70, 0.1)` background
- Icons are stroke-based SVGs in accent color
- Hover: border-color transitions to accent, card lifts -2px

### 5. Layout Pattern
- Dark hero with gradient (primary → surface) and centered accent line above
- Pitch section: dark surface with checkmark bullet points
- Feature cards: icon + text grid, auto-fit columns at minmax(280px)
- CTA banners: surface background with centered text

### 6. SEO & Metadata
- Canonical URLs pointing to GitHub Pages variant URL
- Open Graph + Twitter Card meta on every page
- JSON-LD structured data on index.html (SoftwareApplication schema)
- Meta descriptions optimized for each page

### 7. PWA Ready
- manifest.webmanifest with theme colors matching brand
- SVG favicon
- Standalone display mode

### 8. Accessibility
- Skip link to main content
- ARIA labels on navigation (role="banner", role="navigation", aria-label)
- `aria-current="page"` on active nav items
- Focus trap in mobile nav (Tab/Shift+Tab cycling)
- `aria-expanded` on mobile toggle and FAQ accordion
- `prefers-reduced-motion` support (disables hover animations, smooth scroll)
- All interactive elements have minimum 44×44px touch targets

---

## Key Differences from -2 (Bold Typography)

| Aspect | -2 (Bold Typography) | -3 (Dark Mode) |
|--------|---------------------|----------------|
| Background | Deep Navy `#1A1A2E` | Near-Black `#0A0A0F` |
| Display Font | Cormorant Garamond (serif) | Bebas Neue (condensed sans) |
| Typography Style | Dramatic serif, flowing | Uppercase sans, cinematic |
| Card Style | Text-only, left border accent | Icon box + text |
| Accent Usage | Section dividers, sparse | Icon backgrounds, CTAs, hover states |
| Bullet Style | Red top border on section | Red checkmark circles |
| Surface Cards | `#1A1A2E` | `#12121A` |
| Overall Feel | Editorial magazine | Dark cinema, sleek |

---

## Compliance with Brand Kit

**Brand Kit Source:** `brand-kits.json` — Minimalist Cinema V3 (Dark Mode)

### ✅ Colors — Match
| Token | Brand Kit | CSS Variable |
|-------|----------|--------------|
| Primary | `#0A0A0F` | `--color-primary` |
| Secondary | `#FAFAF8` | `--color-secondary` |
| Accent | `#E63946` | `--color-accent` |
| Text | `#F5F5F0` | `--color-text` |
| Muted | `#6B6B73` | `--color-muted` |

### ✅ Typography — Match
- **Headlines:** Bebas Neue 400 — condensed uppercase sans-serif (brand kit: "condensed uppercase display")
- **Body:** Work Sans 400/500/600 — humanist sans-serif (brand kit: "clean sans-serif")
- **Scale:** `clamp(2.5rem, 6vw, 4.5rem)` for h1 — matches brand kit specification

### ✅ UI Style — Match
- Dark background with off-white text ✅
- Condensed uppercase display font ✅
- Red accent for CTAs and highlights ✅
- Icon boxes with red accent backgrounds ✅
- Clean, sleek, cinematic feel ✅

### ✅ Voice — Match
- Direct, modern, tech-forward — matches base brand voice ✅
- Tagline: "Your media. Your way." ✅

---

## Technical Notes

- All content sourced from shared content strategy
- Fonts: ~13-21KB per WOFF2 file (verified)
- No build process required — static files deploy directly to GitHub Pages
- No external JS dependencies
- CSS custom properties for all brand tokens
- Semantic HTML5 elements throughout
- Image assets referenced in img/PROMPTS.md (generation prompts included)
