# Pop Art Explosion — Build Log

## What was built

### CSS (3 files)

- **css/base.css**: Font faces, CSS custom properties, resets, typography, grid system, Ben-Day dot utilities, speech bubble, starburst, panel card, skip link
- **css/theme.css**: Navigation, hero, buttons, dotty scene, warhol grid, proof section, CTA pop, footer, seasonal variants, mascot
- **css/components.css**: Feature panels, FAQ accordion, client cards, install panels, ecosystem list, plugin cards, docs layout, hub feature, about cards, 404 page, utilities

### JS (1 file)

- **js/main.js**: Seasonal activation (live-js date-gate), reduced-motion listener, mobile nav toggle, FAQ accordion (aria-expanded), copy install command, mascot companion (tips, dismiss via localStorage), easter egg: logo-clicks:5 (confetti), easter egg: typed-word:dots (dot burst), easter egg: typed-word:kapow (KAPOW! text explosion), smooth scroll

### HTML (9 files)

- **index.html**: 5-section narrative: starburst-intro → dotty-scene → the-grid → proof-burst → cta-pop
- **features.html**: Comic-panel grid of 6 features
- **clients.html**: 5 client cards with highlights and status badges
- **download.html**: Install panels (primary one-liner + HTTPS variant + from-source dev checkout), ecosystem repos
- **hub.html**: 3 hub feature alternating sections
- **about.html**: 4-card brand grid + FAQ accordion (6 items from content.json)
- **plugins.html**: Plugin contract explanation + code block
- **docs.html**: Quick links to VitePress docs
- **404.html**: Dotty apologizes in speech bubble; noindex; relative asset paths

### Static

- **robots.txt**: Allow all, sitemap reference, license comment
- **sitemap.xml**: All 8 indexed pages with priorities

## Design decisions

1. **Ben-Day dots**: CSS SVG data-URI patterns for dot fields — zero image requests
2. **Starburst hero**: `-webkit-text-stroke` + `paint-order: stroke fill` for outlined text on colored backgrounds
3. **Speech bubble thought-tail**: CSS `::before`/`::after` on `.hero-sub` and `.error-subtitle` creates the bubble tail using circles (Lichtenstein style)
4. **Warhol grid**: 2×3 grid with alternating primary fills; text uses `currentColor` so white text on red/blue, black text on yellow
5. **Hard offset shadows**: `box-shadow: 4px 4px 0 #0A0A0A` — zero blur throughout
6. **Seasonal activation**: `data-season` attribute on `<html>` set by JS date-gate; CSS selectors `[data-season="summer"]` override tokens
7. **Mascot at 320px**: Below 768px the fixed companion becomes `position: static` flex row — never overlaps CTA
8. **Strong emphasis**: `font-weight: 600` using Barlow Condensed 600 which is declared in the kit and exists in pool

## CSS rules applied from new_site.md §19.12

- `grid-template-columns: repeat(N, minmax(0, 1fr))` — bare `1fr` avoided
- `overflow-wrap: anywhere` on `p, li, dt, dd, a, span, code, kbd, samp, pre`
- `hyphens: auto; overflow-wrap: break-word` on headings

## Known issues resolved during build

- Removed `hidden` attribute from `.faq-answer` in about.html — CSS `max-height` transition handles visibility; `hidden` was conflicting
- Seasonal variant `orange` (#FF6B00) on white = 2.86:1 fail — orange only used as a background/border accent, never for text on white
- `conversion_funnel.cta_ladder` showed `[object Object]` — resolved to three real CTAs: Get Phlix →, BAM! Install →, See the Source →

## Verification

- `selfcheck.mjs` — all 17 checks target
- `render-check.mjs` — browser at 320px, 375px, 768px, 1280px + 200% text zoom
- `gen-og.mjs` → og.png (rasterised from og.svg)
- `gen-sitemap.mjs` → sitemap.xml + robots.txt
