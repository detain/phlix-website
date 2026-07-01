# BUILD_LOG.md — Afrofuturism Brand Kit Site

## What was built

- **Brand kit:** `afrofuturism.js` v1.0 — base/parent kit, `metadata.kit_type: "base"`
- **Layout archetype:** `immersive` — full-bleed cosmic dark, centered powerful hero, Kente Gold radiating through as the sacred accent. Chosen because: `visual_style` = "Afrofuturist bold geometric / cosmic starfield / Pan-African chromatic"; `depth` = "layered"; `composition` = "centered and powerful"; `layout_patterns.landing` calls for "full-bleed Orisha hero illustration on starfield". The dark cosmic depth + warm golden overhead lighting + vibrant geometric composition = immersive cinematic.
- **Output path:** `sites/afrofuturism/`

## File inventory

- `index.html`, `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html`
- `css/base.css`, `css/theme.css`, `css/components.css`
- `js/main.js`
- `img/logo.svg`, `img/favicon.svg`, `img/og.svg`, `img/icon-*.svg` (7 feature icons)
- `img/PROMPTS.md`
- `robots.txt`, `sitemap.xml`
- `SITE.md`, `BUILD_LOG.md`

## CSS architecture

All CSS custom properties map directly from `design_tokens` and the color/spacing/radius/shadow blocks:
- `--color-primary: #F0B800` (Kente Gold)
- `--color-secondary: #6600CC` (Cosmic Violet)
- `--color-bg: #080510` (Cosmic Earth)
- `--color-surface: #0E0A1A` (Wakanda Night)
- `--color-text: #F5EDD8` (Warm Star White)
- Spacing scale: 4,8,12,16,24,32,48,64,96px
- Radius scale: 3,6,10,16,999px
- Shadows: sm/md/lg + gold_glow/violet_glow/tribal_glow

## Fonts (self-hosted)

`Montserrat` (headline/UI), `Bebas Neue` (display), `Nunito` (body), `JetBrains Mono` (mono). WOFF2 files to be sourced. Declared with `font-display: swap`. Fallback stacks match kit fallbacks.

## Intentional deviations from spec

- No CDN Google Fonts — self-hosted WOFF2 declared with `@font-face` + `font-display: swap`
- `og.png` produced as SVG source `og.svg` — PNG rasterization deferred to asset pipeline; `<meta property="og:image">` references absolute `/img/og.png` per spec
- Kente border animated strip on hero implemented in pure CSS (respects `prefers-reduced-motion`)

## Review loop

- Initial build: all 8 pages + CSS + JS + assets
- To be reviewed through 12 adversarial dimensions
- Final scores to be recorded in `reviews/afrofuturism/FINAL-REVIEW.md`

## Kit metadata

- `author`: Phlix Design
- `created/updated`: 2026-06-30
- `license`: Proprietary — Phlix internal use.
- `compatible_models`: claude-opus-4-8, claude-sonnet-4-6, sdxl, flux.1
- `schema_version`: 2.0
