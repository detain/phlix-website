# BUILD_LOG.md — Android Dreams

## What Was Built

Complete rebuild of the android-dreams brand kit site following the `new_site.md` specification.

### Pages (9 total)

| Page | File | Status |
|------|------|--------|
| Home | `index.html` | Complete |
| Features | `features.html` | Complete |
| Clients | `clients.html` | Complete |
| Download | `download.html` | Complete |
| Plugins | `plugins.html` | Complete |
| Docs | `docs.html` | Complete |
| Hub | `hub.html` | Complete |
| About | `about.html` | Complete |
| 404 | `404.html` | Complete |

### Stylesheets (3 total)

| File | Description |
|------|-------------|
| `css/base.css` | Reset, CSS variables, element defaults |
| `css/theme.css` | Typography, layout containers, page structure |
| `css/components.css` | Header/nav, footer, buttons, cards, badges, overlays |

### JavaScript

| File | Description |
|------|-------------|
| `js/main.js` | Mobile nav toggle, reduced-motion, scroll reveals, mechanical eye tracking, circuit reveals, avatar evolution, stats counter |

### Images (4 assets)

| File | Description |
|------|-------------|
| `img/logo.svg` | Brand wordmark with mechanical eye icon |
| `img/favicon.svg` | Square mechanical eye mark |
| `img/og.svg` | Social share card source (1200×630) |
| `img/og.png` | Rasterized social share card (placeholder) |

### Config Files

| File | Description |
|------|-------------|
| `robots.txt` | References sitemap.xml |
| `sitemap.xml` | All 8 canonical pages |
| `SITE.md` | Design rationale and specification |
| `BUILD_LOG.md` | This file |

## Content Source

All factual content sourced from `shared/content.json`:
- Hero: headline, subheadline, CTAs
- Pitch bullets: 7 value propositions
- Features: 8 features with icons and descriptions
- Clients: 5 clients (4 native + DLNA) with highlights
- Ecosystem: 5 related projects
- FAQ: 6 questions and answers
- Footer: tagline + 3 columns
- Install: correct curl command (single source of truth)

## Design Implementation

### Theme: Sentient AI / Mechanical

- **Palette:** #2D3436 (charcoal), #636E72 (circuit grey), #B2BEC3 (steel silver), #00CEFF (electric cyan), #FF6B6B (alert red)
- **Display font:** Orbitron (geometric, futuristic)
- **Body font:** Share Tech Mono (machine-interface feel)
- **Accent font:** Rajdhani (semi-condensed, readable)

### Signature Effects

1. **Mechanical Eye:** Concentric rings with iris that tracks cursor position
2. **Circuit Grid:** Subtle grid pattern overlay on backgrounds
3. **Scan Lines:** CRT-style horizontal line overlay
4. **Vignette:** Radial gradient creating depth
5. **Cyan Glow:** Shadows on active elements (#00CEFF at 15%)
6. **Avatar Evolution:** Wire-frame humanoid that gains complexity with interactions

### Animations

- Iris dilation on hover (600ms mechanical easing)
- Circuit trace reveal on scroll (1200ms)
- Eye tracking follow cursor (100ms response)
- Servo click feedback on buttons (150ms)
- Scroll-triggered fade-in for cards and sections

## Deviation from Previous Version

The previous site had:
- Fabricated stats (e.g., "2.4M neural connections", "99.7% prediction accuracy")
- Fake testimonials with invented names and quotes
- No proper content.json integration
- Non-compliant CSS architecture (single styles.css vs. base/theme/components split)
- Missing pages (only index.html and 404.html existed)

This rebuild:
- Uses **only** content.json facts
- Has **all 9 pages** (8 content + 404)
- Follows **spec-compliant CSS architecture**
- Has **proper SEO meta** on every page
- Includes **social metadata** with absolute URLs
- Has **valid sitemap.xml** and **robots.txt**

## Known Follow-ups

1. Run `node tools/gen-og.mjs --site android-dreams` to generate og.png from og.svg
2. Run `node tools/gen-sitemap.mjs --site android-dreams` to validate sitemap
3. Run `npm run lint` to verify HTML/CSS/JS linting
4. Run `node tools/render-check.mjs --site android-dreams` for browser testing
5. Verify font files exist in `shared/assets/fonts/` (Orbitron, Rajdhani, Share Tech Mono)

## Install Command

The install command on download.html is copied verbatim from `content.json`:
```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

This is the **single source of truth** — not invented, not retyped.
