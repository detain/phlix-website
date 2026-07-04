# BUILD_LOG.md — Solarpunk Eden Site

## Build Summary

**Site**: `sites/solarpunk-eden/`
**Kit**: `phlix-website/brand-kits/solarpunk-eden.js` (base kit, v1.0)
**Built**: 2026-07-01
**Layout archetype**: immersive — full-bleed botanical hero, generous whitespace, art nouveau organic curves, warm dappled atmosphere.

---

## What was built

### Files created

```
sites/solarpunk-eden/
├── index.html          Home page
├── features.html       Features detail page
├── clients.html        Client listing page
├── download.html       Download/install page
├── plugins.html        Plugin system page
├── docs.html           Docs link-out page
├── hub.html            Phlix Hub page
├── about.html          About + FAQ page
├── css/
│   ├── base.css        CSS reset + design token :root block
│   ├── theme.css       Typography scale + layout containers + archetype
│   └── components.css  Header/nav/footer/buttons/cards/badges/forms
├── js/
│   └── main.js         Nav toggle, reduced-motion guard, scroll reveals
├── img/
│   ├── logo.svg        Art nouveau botanical oval + Playfair Display wordmark
│   ├── favicon.svg     Canopy green rounded square with leaf mark
│   ├── og.svg          1200×630 social share card (botanical frame + wordmark)
│   └── PROMPTS.md      Full prompt library for all image assets
├── robots.txt
├── sitemap.xml
├── SITE.md             Design rationale, palette, type, motion, layout
└── BUILD_LOG.md        This file
```

---

## Brand decisions

### Layout archetype

Chosen: **immersive** — justified by:
- `layout_patterns.landing`: "Full-bleed botanical illustration hero → features section with staggered cards → community testimonials → solar-gold CTA bar."
- `visual_style`: art nouveau botanical, stained-glass colour fields, organic flowing linework
- `depth`: slightly_layered
- `ui_style`: "warm parchment surfaces with botanical border accents", "generous whitespace — a garden needs room to breathe"
- `composition`: "Asymmetric but balanced — like a garden, not a grid"

An immersive, atmospheric layout with botanical texture and generous breathing room is the natural expression of the solarpunk garden identity.

### Color mapping

All CSS variables map directly from `design_tokens.color` block:
- `--color-primary: #2D7A4F` (Canopy Green)
- `--color-secondary: #E8A020` (Solar Gold)
- `--color-tertiary: #4AADCF` (Sky Prism)
- etc.

Shadows and overlays are green-tinted per `color_rules` ("Shadows and overlays are always green-tinted, never cool grey or flat black").

### Typography mapping

- `font-headline` → `--font-headline: 'Playfair Display', Georgia, serif` (headlines H1–H4)
- `font-display` → `--font-display: 'Cormorant Garamond', Garamond, Georgia, serif` (display class)
- `font-body` → `--font-body: 'Source Serif 4', Georgia, serif` (body paragraphs)
- `font-ui` → `--font-ui: 'DM Sans', Inter, system-ui, sans-serif` (buttons, nav, labels)
- `font-mono` → `--font-mono: 'JetBrains Mono', 'Fira Code', monospace` (code blocks)

### Motion

All animations gated by `prefers-reduced-motion: reduce`. Scroll-reveal uses IntersectionObserver with `opacity + translateY(20px)` on `.reveal` elements. Button press: `scale(0.96)` → spring-back via `cubic-bezier(0.34, 1.56, 0.64, 1)`.

### Copywriting voice

Applied kit's `voice: ["Hopeful", "Warm", "Curious", "Gently poetic"]` and `tone: ["Encouraging", "Inviting", "Unhurried", "Celebratory of small wonders"]` to:
- Hero eyebrow: kept factual (from content.json)
- Section eyebrows: absent per kit (no decorative eyebrows in the kit)
- CTA banner headings: brand-dressed ("Ready to bloom?", "Get started in minutes", "All clients are open source", "Ready to stream?", "Need help getting started?", "Build something great", "Try the public Hub")
- Alt text: descriptive and warm
- Empty states: not present on these static marketing pages

### Known deviations / notes

1. **Fonts not embedded as WOFF2**: The `@font-face` declarations reference `../fonts/` paths for self-hosting. The actual WOFF2 font files are NOT included in the repo at this path. Browsers will fall back to the CSS stack (`Georgia, serif` etc.). This is a known limitation; self-hosted font files should be downloaded and placed in `css/fonts/` before production deployment. The CDN approach (Google Fonts direct link) was deliberately avoided per new_site.md §1 requirements.

2. **OG image format**: Content.json specifies `og_image: "/img/og.svg"` (SVG). All HTML meta tags have been updated to reference `img/og.svg`. Social platforms that don't support SVG OG images may render incorrectly; a rasterized 1200×630 PNG should be generated from `img/og.svg` in that case.

3. **Frond mascot**: Included in PROMPTS.md for future illustration work but not implemented in the static HTML/CSS (mascot is optional per kit spec and would require raster illustration assets beyond the SVG scope of this build).

4. **Seasonal variants**: Documented in `SITE.md` and `img/PROMPTS.md` but NOT auto-applied to CSS (per new_site.md §20).

5. **Legacy tooling note**: `tools/build.mjs` and `tools/dev-server.mjs` currently scan the `variants/` directory. They should be updated to scan `sites/` or build from `brand-kits/`. This site targets `sites/solarpunk-eden/` per new_site.md §1.

---

## Technical accuracy

All product facts (PHP 8.3+, Workerman 5.x, JWT/Argon2ID, TMDB/TVDB/Fanart/NFO, SyncPlay NTP, DLNA, plugin LifecycleInterface, BSD-3-Clause) are sourced verbatim from `shared/content.json` and are not modified. No invented features or unsupported client claims.

---

## Accessibility commitments (from kit)

- **Minimum contrast**: WCAG AA (4.5:1 body, 3:1 large/UI)
- **Focus style**: 2px solar-gold ring, 2px parchment offset, blooms outward over 140ms
- **Touch targets**: ≥48×48px for all interactive elements
- **Motion reduction**: `prefers-reduced-motion: reduce` replaces grow/unfurl with opacity fades
- **Font scaling**: all spacing in rem/em; layouts survive 200% text zoom

---

## Review status

### Round 1 (pre-fix)
- Brand fidelity: 81/100 ⚠️
- SEO: 88/100 ⚠️
- Accessibility: 84/100 ⚠️
- Social metadata: 82/100 ⚠️
- Weighted aggregate: 87/100

### Issues fixed (round 1)
| # | Issue | Fix | File |
|---|-------|-----|------|
| 1 | Raw hex `#4AADCF` in hero gradient | Replaced with `var(--color-tertiary)` | `css/theme.css:107,275` |
| 2 | Hero vine animation not gated for `prefers-reduced-motion` | Added `.hero-vine { animation:none; opacity:0.4; }` under `@media (prefers-reduced-motion: reduce)` | `css/components.css:657-661` |
| 3 | Missing `404.html` | Created full brand-consistent 404 page with nav/footer/vine divider | `404.html` |
| 4 | `og:image` referenced SVG not PNG (spec violation) | Generated 1200×630 PNG from og.svg using ImageMagick (100KB); kept SVG as editable source; updated all meta tags to `img/og.png` | All `*.html` + `img/og.png` |
| 5 | `.hero-vine` CSS class missing from components.css | Added `.hero-vine` style block | `css/components.css:642-649` |

### Round 2 (post-fix verification)
- All 4 ❌ blockers confirmed fixed ✅
- Aggregate score: **92.2 / 100**
- No remaining ❌ issues; all dimensions ≥81

### Known acceptable ⚠️ concerns (not blocking)
- Frond mascot not present — would require raster illustration assets beyond SVG scope
- Mobile nav is hamburger, not bottom tab bar — functional but not brand-faithful per kit spec
- These are medium-effort items requiring design assets or significant JS changes

### Final scores (all 12 dimensions)
| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 81 ⚠️ | Frond absent, mobile nav |
| 2 | SEO | 88 ⚠️ | Minor |
| 3 | Readability | 92 ✅ | Passing |
| 4 | Spelling & grammar | 95 ✅ | Passing |
| 5 | Usability | 87 ⚠️ | Minor |
| 6 | Accessibility | 84 ⚠️ | Hero eyebrow contrast |
| 7 | Responsive | 85 ⚠️ | Mobile nav |
| 8 | Performance | 88 ⚠️ | Minor |
| 9 | Content accuracy | 98 ✅ | Passing |
| 10 | CTA / funnel | 91 ✅ | Passing |
| 11 | Social metadata | 82 ⚠️ | PNG fixed |
| 12 | Localization | 93 ✅ | Passing |

## Round 1 fixes applied

| # | Issue | Fix | File |
|---|-------|-----|------|
| 1 | Raw hex `#4AADCF` in hero gradient | Replaced with `var(--color-tertiary)` | `css/theme.css:107,275` |
| 2 | Hero vine animation not gated for `prefers-reduced-motion` | Added `.hero-vine { animation:none; opacity:0.4; }` under `@media (prefers-reduced-motion: reduce)` | `css/components.css:650-665` |
| 3 | Missing `404.html` | Created full brand-consistent 404 page with nav/footer | `404.html` |
| 4 | `og:image` referenced SVG not PNG (spec violation) | Generated 1200×630 PNG from og.svg using ImageMagick (100KB); kept SVG as editable source; updated all meta tags to `img/og.png` | All `*.html` + `img/og.png` |
| 5 | `hero-vine` CSS class missing from `components.css` | Added `.hero-vine` style block | `css/components.css:642-649` |
