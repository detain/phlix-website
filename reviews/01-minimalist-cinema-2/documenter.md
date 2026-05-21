# Documenter Report — 01-minimalist-cinema-2

## Variant Overview
**Name:** Minimalist Cinema V2 — Bold Typography Edition  
**Personality:** Modern, Confident, Editorial, Tech-forward, Typography-obsessed  
**Tagline:** "Stream what you love. Own what you stream."  
**Build Status:** ✅ Complete — All 8 pages, CSS, JS, images, fonts, and config files created

---

## File Inventory

### HTML Pages (8 files)
| File | Purpose |
|------|---------|
| `index.html` | Home page — hero, pitch, features overview, CTA banner |
| `about.html` | About page — project info, Hub, plugin system, FAQ accordion |
| `features.html` | Features detail page — all 8 feature highlights with CTA |
| `clients.html` | Clients page — 5 client cards (Roku, Samsung Tizen, Windows, Mobile, DLNA) |
| `download.html` | Download page — install commands, system requirements, ecosystem |
| `plugins.html` | Plugins page — plugin system docs, example, getting started |
| `docs.html` | Documentation page — links to external docs (VitePress) |
| `hub.html` | Hub page — remote access via reverse-tunnel relay |

### CSS Files (3 files)
| File | Lines | Purpose |
|------|-------|---------|
| `css/base.css` | 217 | CSS reset, font-face declarations, CSS custom properties, root variables |
| `css/theme.css` | 283 | Typography scale, header/footer, navigation, layout helpers |
| `css/components.css` | 641 | All UI components: buttons, cards, hero, pitch, CTA, page headers, FAQ accordion |

### JavaScript (1 file)
| File | Lines | Purpose |
|------|-------|---------|
| `js/main.js` | 167 | Mobile nav toggle with focus trap, smooth scroll, FAQ accordion (vanilla JS, no frameworks) |

### Images (4 files)
| File | Purpose |
|------|---------|
| `img/logo.svg` | Film-frame X motif with red accent; wordmark "Phlix" in Georgia serif |
| `img/favicon.svg` | Minimal 32×32 favicon with film-frame X on deep navy |
| `img/og.svg` | Social share image (1200×630) with tagline |
| `img/PROMPTS.md` | Image generation prompts and placeholder strategy |

### Fonts (5 files)
Self-hosted WOFF2 fonts with `font-display: swap`:
- `fonts/cormorant-garamond-700.woff2` — headlines (700 weight)
- `fonts/cormorant-garamond-600.woff2` — headlines (600 weight)
- `fonts/karla-400.woff2` — body text (regular)
- `fonts/karla-500.woff2` — body text (medium)
- `fonts/karla-700.woff2` — body text (bold)

### Config Files (3 files)
| File | Purpose |
|------|---------|
| `manifest.webmanifest` | PWA manifest with theme colors and icon |
| `robots.txt` | Allow all crawlers; references sitemap |
| `sitemap.xml` | All 8 pages indexed with priorities and changefreq |

### Documentation (2 files)
| File | Purpose |
|------|---------|
| `VARIANT.md` | Variant specification — brand tokens, UI style, key differences from -1 |
| `BUILD_LOG.md` | Build log — assets created, technical notes, build status |

---

## Architecture

### Directory Structure
```
01-minimalist-cinema-2/
├── index.html          (home)
├── about.html
├── features.html
├── clients.html
├── download.html
├── plugins.html
├── docs.html
├── hub.html
├── css/
│   ├── base.css        (reset, fonts, variables)
│   ├── theme.css       (typography, header/footer, nav)
│   └── components.css (all UI components)
├── js/
│   └── main.js         (interactivity)
├── img/
│   ├── logo.svg
│   ├── favicon.svg
│   ├── og.svg
│   └── PROMPTS.md
├── fonts/
│   ├── cormorant-garamond-600.woff2
│   ├── cormorant-garamond-700.woff2
│   ├── karla-400.woff2
│   ├── karla-500.woff2
│   └── karla-700.woff2
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
├── VARIANT.md
└── BUILD_LOG.md
```

### Technology Stack
- **No frameworks** — pure HTML, CSS, vanilla JavaScript
- **Self-hosted fonts** — WOFF2 with font-display: swap
- **Responsive** — Mobile-first with breakpoints at 768px
- **Accessible** — Skip links, ARIA labels, focus trap in mobile nav, semantic HTML

---

## Key Implementation Decisions

### 1. Bold Typography Scale
- H1: `clamp(2.5rem, 6vw, 5rem)` — dramatic, editorial
- H2: `clamp(1.75rem, 4vw, 3rem)`
- H3: `clamp(1.25rem, 2.5vw, 1.75rem)`
- Line-height: 1.1 for headings, 1.7 for body
- Negative letter-spacing (-0.02em) for headlines

### 2. Self-Hosted Fonts
- **Cormorant Garamond** (serif) — headlines, weight 600/700
- **Karla** (sans-serif) — body/UI, weight 400/500/700
- ~13-21KB per font file; verified via jsDelivr CDN

### 3. Color System
| Token | Hex | Usage |
|-------|-----|-------|
| Deep Navy | `#1A1A2E` | Primary backgrounds, hero, headings |
| Off-White | `#F5F5F5` | Backgrounds, text on dark |
| Cinema Red | `#E63946` | Accents, dividers, CTAs |
| Text | `#2B2D42` | Body text |
| Muted | `#8D99AE` | Secondary text, borders |

### 4. Card Style: Text-Only with Left Border
- No icon boxes (unlike -1)
- Left border accent in Cinema Red
- Hover: border transitions to navy, slight translateX(4px)
- Minimal visual noise — editorial feel

### 5. Layout Pattern
- Full-bleed dark hero (navy) with subtle gradient overlay
- Pitch section: off-white with 4px red top border
- Feature cards: left-bordered text cards in a CSS grid
- CTA banner: dark navy with red top border

### 6. SEO & Metadata
- Canonical URLs pointing to GitHub Pages variant URL
- Open Graph + Twitter Card meta on every page
- JSON-LD structured data on index.html (SoftwareApplication schema)
- Meta descriptions <160 characters

### 7. PWA Ready
- manifest.webmanifest with theme colors
- SVG favicon
- Standalone display mode

### 8. Accessibility
- Skip link to main content
- ARIA labels on navigation
- `aria-current="page"` on active nav items
- Focus trap in mobile nav
- `prefers-reduced-motion` support

---

## Key Differences from -1 (Ultra-Minimal)

| Aspect | -1 (Ultra-Minimal) | -2 (Bold Typography) |
|--------|-------------------|----------------------|
| Hero | Centered, white bg | Left-aligned, dark navy bg with gradient |
| Typography | `clamp(2-3.5rem)` | `clamp(2.5-5rem)` headlines |
| Card style | Icon boxes + text | Text-only, left border accent |
| Accent usage | Blue for CTAs/hover | Red as section dividers, sparingly |
| Spacing | Maximum whitespace | Generous but denser |
| Color block | Soft blue pitch section | Off-white with red top border |
| Display font | Sans-serif | Dramatic serif (Cormorant Garamond) |

---

## Compliance with Brand Kit

**Brand Kit Source:** `brand-kits.json` — Minimalist Cinema V2 (Bold Typography)

### ✅ Colors — Match
| Token | Brand Kit | CSS Variable |
|-------|----------|--------------|
| Primary | `#1A1A2E` | `--color-deep-navy` |
| Secondary | `#F5F5F5` | `--color-off-white` |
| Accent | `#E63946` | `--color-cinema-red` |
| Text | `#2B2D42` | `--color-text` |
| Muted | `#8D99AE` | `--color-muted` |

### ✅ Typography — Match
- **Headlines:** Cormorant Garamond 700 — dramatic serif (brand kit: "dramatic serif")
- **Body:** Karla 400/500/700 — clean sans-serif (brand kit: "clean sans-serif")
- **Scale:** `clamp(2.5rem, 6vw, 5rem)` for h1 — matches brand kit specification

### ✅ UI Style — Match
- Bold typography with large headlines (clamp 3-6rem) ✅
- Magazine editorial feel with generous line-height (1.1 for headings, 1.7 for body) ✅
- Cinema red used as section dividers, not button fills ✅
- Text-only cards with left border accent ✅
- More breathable spacing than -1, but editorial density ✅

### ✅ Voice — Match
- Direct, clear, slightly theatrical — matches base brand voice ✅
- Tagline: "Stream what you love. Own what you stream." ✅

---

## Technical Notes

- All content sourced from shared `content.json` (referenced in BUILD_LOG)
- Fonts downloaded via jsDelivr CDN (verified file sizes ~13-21KB)
- No build process required — static files deploy directly to GitHub Pages
- No external JS dependencies
- CSS custom properties for all brand tokens
- Semantic HTML5 elements throughout
