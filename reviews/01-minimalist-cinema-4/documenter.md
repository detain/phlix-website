# Documenter Report — 01-minimalist-cinema-4 (Wave 4)

## Variant Overview
**Name:** Minimalist Cinema V4 — Warm Editorial  
**Personality:** Warm, Editorial, Magazine-Quality, Breathable, Sophisticated  
**Tagline:** "Your media. Your way."  
**Build Status:** ✅ Complete — All 8 pages, CSS, JS, images, fonts, and config files created

---

## File Inventory

### HTML Pages (8 files)
| File | Purpose |
|------|---------|
| `index.html` | Home page — hero, pitch bullets, features grid, CTA banner |
| `about.html` | About page — mission, BSD-3 license, contributing, FAQ accordion |
| `features.html` | Features detail page — 8 feature cards with icon + text layout |
| `clients.html` | Clients page — 5 client cards (Roku, Samsung Tizen, Windows, Mobile, DLNA) |
| `download.html` | Download page — install commands, client downloads, ecosystem list |
| `plugins.html` | Plugins page — plugin system docs, LifecycleInterface, example reference |
| `docs.html` | Documentation page — links to external docs (user guide, API reference, developer docs) |
| `hub.html` | Hub page — remote access via reverse-tunnel relay; public vs self-hosted |

### CSS Files (3 files)
| File | Lines | Purpose |
|------|-------|---------|
| `css/base.css` | 222 | CSS reset, @font-face declarations, design tokens (colors, spacing, shadows), accessibility (skip-link, focus, reduced-motion) |
| `css/theme.css` | 383 | Typography scale, header/footer, primary navigation, responsive nav, sticky header with backdrop blur |
| `css/components.css` | 452 | Buttons, hero, pitch bullets, feature cards, client cards, page headers, FAQ accordion, CTA banners |

### JavaScript (1 file)
| File | Lines | Purpose |
|------|-------|---------|
| `js/main.js` | 43 | Mobile nav toggle with hamburger animation, smooth scroll for anchor links (vanilla JS, no frameworks, 'use strict' IIFE) |

### Images (3 files)
| File | Purpose |
|------|---------|
| `img/logo.svg` | Phlix wordmark logo (terracotta X icon + "Phlix" text) |
| `img/favicon.svg` | 32×32 favicon (terracotta X on rounded square) |
| `img/og.svg` | Social share image (1200×630) with editorial styling |

### Fonts (4 files)
Self-hosted TTF fonts with `font-display: swap`:
- `fonts/lora-regular.ttf` — Lora serif for headlines (400 weight, 132KB)
- `fonts/lora-bold.ttf` — Lora serif for headlines (700 weight, 132KB)
- `fonts/source-sans-3-regular.ttf` — Source Sans 3 for body/UI (400 weight, 235KB)
- `fonts/source-sans-3-semibold.ttf` — Source Sans 3 for body/UI (600 weight, 235KB)

### Config Files (3 files)
| File | Purpose |
|------|---------|
| `manifest.webmanifest` | PWA manifest with theme colors and icon |
| `robots.txt` | Allow all crawlers, sitemap reference |
| `sitemap.xml` | All 8 pages indexed with priorities and changefreq |

---

## Architecture

### Directory Structure
```
01-minimalist-cinema-4/
├── index.html          (home)
├── about.html
├── features.html
├── clients.html
├── download.html
├── plugins.html
├── docs.html
├── hub.html
├── css/
│   ├── base.css        (reset, @font-face, design tokens, accessibility)
│   ├── theme.css       (typography, header/footer, nav, responsive)
│   └── components.css  (buttons, cards, sections, FAQ, nav toggle)
├── js/
│   └── main.js         (nav toggle, smooth scroll)
├── img/
│   ├── logo.svg        (wordmark)
│   ├── favicon.svg     (favicon)
│   └── og.svg         (social share)
├── fonts/
│   ├── lora-regular.ttf
│   ├── lora-bold.ttf
│   ├── source-sans-3-regular.ttf
│   └── source-sans-3-semibold.ttf
├── manifest.webmanifest
├── robots.txt
└── sitemap.xml
```

### Technology Stack
- **No frameworks** — pure HTML, CSS, vanilla JavaScript
- **Self-hosted fonts** — TTF with font-display: swap (zero external font requests)
- **Responsive** — Mobile-first with breakpoint at 768px, fine-tuned at 480px
- **Accessible** — Skip links, ARIA labels, semantic HTML, prefers-reduced-motion, 44×44px touch targets

---

## Key Implementation Decisions

### 1. Warm Editorial Color System
| Token | Hex | Usage |
|-------|-----|-------|
| Background (Cream) | `#F7F3EE` | Page backgrounds |
| Warm Black | `#2D2926` | Primary text, headlines |
| Terracotta | `#C4583A` | CTAs, accent highlights, icons |
| Muted | `#7A6E66` | Secondary text, borders |
| White | `#FDFCFB` | Cards, elevated surfaces |
| Surface | `#F7F3EE` | Header background with backdrop blur |

### 2. Self-Hosted Fonts
- **Lora** — serif typeface for headlines (weights 400/700), warm and readable with editorial feel
- **Source Sans 3** — humanist sans-serif for body/UI (weights 400/600), clean and versatile
- All loaded via @font-face with `font-display: swap`
- No Google Fonts CDN — complete privacy and offline capability

### 3. Typography Scale
- H1: `clamp(2.25rem, 5vw, 3.75rem)` — Lora bold, warm black
- H2: `clamp(1.75rem, 3.5vw, 2.5rem)` — Lora bold
- H3: `clamp(1.25rem, 2.5vw, 1.5rem)` — Lora bold
- Hero headline: `clamp(2.75rem, 7vw, 5rem)` — extra large for impact
- Line-height: 1.2 for headings, 1.75 for body text
- Lora provides that warm, editorial, magazine-quality feel

### 4. Sticky Header with Backdrop Blur
```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border);
}
```

### 5. Navigation Link Animation
- Underline grows from left on hover using `::after` pseudo-element
- Active page link shows terracotta underline permanently
- `aria-current="page"` styling for current page indicator

### 6. Hero Section
- Large headline with `clamp(2.75rem, 7vw, 5rem)` for dramatic impact
- Eyebrow label with uppercase tracking
- Terracotta accent on eyebrow and CTA buttons
- Generous vertical padding

### 7. SEO & Metadata
- Canonical URLs pointing to GitHub Pages variant URL
- Open Graph + Twitter Card meta on every page
- Meta descriptions under 160 characters
- Theme color meta tag matching terracotta accent

### 8. PWA Ready
- manifest.webmanifest with theme colors matching brand
- SVG favicon
- Standalone display mode

---

## Key Differences from -3 (Dark Mode)

| Aspect | -3 (Dark Mode) | -4 (Warm Editorial) |
|--------|---------------|---------------------|
| Background | Near-Black `#0A0A0F` | Warm Cream `#F7F3EE` |
| Text | Off-White `#FAFAF8` | Warm Black `#2D2926` |
| Accent | Red `#E63946` | Terracotta `#C4583A` |
| Display Font | Bebas Neue (condensed sans) | Lora (serif) |
| Typography Style | Cinematic uppercase | Editorial flowing prose |
| Feel | Dark, dramatic, sleek | Light, warm, inviting |
| Cards | Dark surfaces, accent borders | White surfaces, subtle shadows |
| Overall Mood | Movie theater lobby | Quality magazine editorial |

---

## Compliance with Brand Kit

**Brand Kit Source:** `brand-kits.json` — Minimalist Cinema V4 (Warm Editorial)

### ✅ Colors — Match
| Token | Brand Kit | CSS Variable |
|-------|----------|--------------|
| Background | `#F7F3EE` | `--color-cream` / `--color-background` |
| Accent | `#C4583A` | `--color-terracotta` |
| Text | `#2D2926` | `--color-warm-black` |
| Muted | `#7A6E66` | `--color-muted` |

### ✅ Typography — Match
- **Headlines:** Lora 400/700 — warm serif with editorial feel (brand kit: "serif typeface for headlines")
- **Body:** Source Sans 3 400/600 — humanist sans-serif (brand kit: "clean sans-serif")
- **Scale:** `clamp(2.75rem, 7vw, 5rem)` for hero h1 — dramatic editorial impact

### ✅ UI Style — Match
- Warm cream backgrounds ✅
- Serif headlines (Lora) for editorial feel ✅
- Terracotta accent used sparingly for CTAs ✅
- Generous whitespace and breathing room ✅
- Subtle shadows on cards ✅
- Magazine-quality, sophisticated feel ✅

### ✅ Voice — Match
- Warm, inviting, sophisticated — matches editorial brand voice ✅
- Tagline: "Your media. Your way." ✅

---

## Technical Notes

- All content sourced from `shared/content.json`
- Fonts: ~132-235KB per TTF file (verified)
- No build process required — static files deploy directly to GitHub Pages
- No external JS dependencies
- CSS custom properties for all brand tokens
- Semantic HTML5 elements throughout
- Mobile breakpoint at 768px, fine-tuned at 480px
- All external links use `rel="noopener noreferrer"` where appropriate
