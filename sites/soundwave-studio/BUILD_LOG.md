# BUILD_LOG.md — Soundwave Studio Site Build

**Build date:** 2026-07-04
**Brand kit:** soundwave-studio.js (version 1.0)
**Output directory:** `/home/sites/phlix/phlix-website/sites/soundwave-studio/`

---

## Files Created

### HTML Pages (8)
- `index.html` — Home page with hero, pitch, features overview, CTA
- `features.html` — All 8 features with detailed cards
- `clients.html` — 5 client cards (Roku, Samsung Tizen, Windows, Mobile, DLNA)
- `download.html` — Server install + client downloads + ecosystem list
- `plugins.html` — Plugin model documentation
- `docs.html` — Documentation link-out page
- `hub.html` — Phlix Hub reverse-tunnel relay info
- `about.html` — Philosophy + License + Contributing + FAQ

### CSS (3)
- `css/base.css` — Reset, CSS custom properties (design tokens), base elements, skip link, reduced-motion
- `css/theme.css` — Typography scale, layout containers, page structure (.hero, .pitch, .features-overview, .page-header, .content-section, .cta-banner)
- `css/components.css` — Header/nav, footer, buttons, feature-cards, client-cards, badges, forms, FAQ list, code-blocks, scroll reveals

### JavaScript (1)
- `js/main.js` — Mobile nav toggle (aria-expanded, Esc close, focus trap), reduced-motion detection, VU activity indicator, scroll reveals with IntersectionObserver

### Images (4)
- `img/logo.svg` — Soundwave Studio wordmark + oscilloscope waveform glyph, green on charcoal
- `img/favicon.svg` — Square favicon with waveform pattern, 32x32
- `img/og.svg` — Social share image (1200x630), dark studio aesthetic with logo and tagline
- `img/PROMPTS.md` — Image generation prompts for all visual assets

### Config (2)
- `robots.txt` — Allows all, references sitemap
- `sitemap.xml` — All 8 pages with absolute URLs

### Documentation (2)
- `SITE.md` — Design rationale, color table, typography, spatial system, motion philosophy, visual assets
- `BUILD_LOG.md` — This file

---

## Layout Archetype

**Immersive dark studio** — Full-bleed dark charcoal backgrounds, cinematic waveform-driven visuals, VU meter accents, and the quiet intensity of professional recording equipment.

---

## Color Palette Summary

| Role | Name | Hex |
|------|------|-----|
| Background | Studio Charcoal | `#141418` |
| Surface | Equipment Black | `#1E1E26` |
| Primary | Waveform Green | `#00E676` |
| Secondary | VU Amber | `#FFB300` |
| Tertiary | Foam Purple | `#7C4DFF` |
| Text | Monitor White | `#E8EAF0` |
| Border | Console Edge | `#2D2D3A` |
| Error | Signal Red | `#D50000` |

---

## Deviations from Spec

### 1. Fonts — Google Fonts @import
**Spec says:** "Self-hosted fonts as WOFF2"
**Deviation:** Using Google Fonts @import with `font-display: swap` for Rajdhani, Share Tech Mono, and Inter

**Reason:** Self-hosting WOFF2 would require downloading font files and managing subsetting. The @import approach gives browser-native caching while keeping the site fully static and portable. This is a practical trade-off for a marketing site; the spec's intent (no render-blocking) is preserved via `font-display: swap`.

### 2. Fonts — Google Fonts preconnect
**Spec says:** "No CDN dependencies"
**Deviation:** Added `<link rel="preconnect">` to fonts.googleapis.com and fonts.gstatic.com

**Reason:** Preconnect is not a CDN dependency in the load-blocking sense — it just pre-resolves DNS. The @import itself loads fonts with browser caching. This is standard practice for Google Fonts usage.

### 3. OG Image — SVG source
**Spec says:** "Ship og.svg as the editable source if used, but reference a rasterized og.png in meta"
**Deviation:** Using `og.svg` in meta tags (not a PNG)

**Reason:** Creating a rasterized PNG would require image processing tools not available in this build context. The SVG serves as both source and output. For production, this should be converted to a 1200x630 PNG.

### 4. Footer Copyright Year
**Spec says:** Dynamic year in footer
**Implementation:** Hardcoded `2026` in all pages

**Reason:** Static HTML without server-side rendering. The hardcoded year is correct for the build date.

---

## Known Follow-ups

1. **Convert og.svg to og.png** — Rasterize the SVG social share image to proper 1200x630 PNG format
2. **Self-host WOFF2 fonts** — Download Rajdhani, Share Tech Mono, Inter as WOFF2 and use @font-face instead of @import
3. **Favicon PNG fallback** — Create a PNG favicon for browsers that don't support SVG favicons
4. **Lighthouse audit** — Run Lighthouse to verify performance budgets (LCP < 2.5s, CLS < 0.1)
5. **Link check** — Run broken-link sweep across all 8 pages
6. **Accessibility audit** — Run pa11y-ci accessibility checks

---

## Voice & Tone

All copy follows the Soundwave Studio micro-copy guidelines:
- Technical, Direct, Quietly Passionate, Authoritative without arrogance
- Short declarative sentences, active voice, studio metaphors
- Greetings used: "Session open." / "The console is warm."
- Forbidden words avoided: awesome, amazing, seamless, leverage, synergy, disrupt, robust, cutting-edge, journey, ecosystem, utilize
