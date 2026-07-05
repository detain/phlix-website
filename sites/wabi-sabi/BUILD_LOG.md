# BUILD_LOG.md — Wabi-Sabi Brand Kit Site

## Build Summary

- **Kit:** `wabi-sabi` (base kit, version 1.0)
- **Built:** 2026-07-04
- **Layout archetype:** `immersive` (full-bleed rice paper, generous negative space, kintsugi gold single accent, ikebana-style asymmetry)
- **Palette:** Rice paper `#F5F0E8` / Weathered Oak `#7C5230` / Lichen Green `#4A5E2C` / Kintsugi Gold `#C8901A` / Sumi Ink `#1A1A14`
- **Type:** Noto Serif JP (headlines), Cormorant Garamond (display 48px+), Lora (body 1.75lh), Noto Sans JP (UI)

## What Was Built

### File Inventory
```
sites/wabi-sabi/
├── index.html          Home (hero + pitch + features overview + CTA)
├── features.html        8 feature detail articles + CTA
├── clients.html        5 client cards + CTA
├── download.html        Server + clients + ecosystem + CTA
├── plugins.html        Plugin model + ecosystem + CTA
├── docs.html           Documentation links + ecosystem
├── hub.html            Hub description + CTA
├── about.html          Philosophy + License + Contributing + FAQ + CTA
├── css/
│   ├── base.css        Reset, :root tokens, base elements
│   ├── theme.css       Typography scale, layout, animations
│   └── components.css  Header/nav, footer, buttons, cards, badges, forms
├── js/
│   └── main.js         Nav toggle, reduced-motion, scroll reveals
├── img/
│   ├── logo.svg        Wordmark + kintsugi crack accent
│   ├── favicon.svg     Square weathered-oak mark with gold crack
│   ├── og.svg          1200×630 social share card
│   └── PROMPTS.md      Exact generation prompts for every asset
├── robots.txt
├── sitemap.xml
├── SITE.md             Design rationale and token documentation
└── BUILD_LOG.md        This file
```

## Design Decisions

### Layout Archetype: Immersive
Chosen because: the wabi-sabi visual style calls for full-bleed washi texture, the brand DNA says "whitespace on rice paper is not emptiness," and `layout_patterns.landing` describes a "full-bleed washi-texture hero section." The asymmetric composition (ikebana-style) and generous breathing room fit the `immersive` archetype better than `minimal` (too spare) or `showcase` (too media-forward).

### Kintsugi Gold Single-Acent Rule
Applied literally: one kintsugi gold element per screen. On home, this is the CTA banner's top border accent line. On features/clients, it is the hover state on featured cards. Never scattered on multiple elements.

### Typography Choices
- Noto Serif JP for headlines — brushwork feel, slightly weighted
- Cormorant Garamond only at large display sizes (48px+) per typography_rules
- Lora body at 1.75 line-height — slow, contemplative reading
- UI text in Noto Sans JP — clean and neutral, never competes with serif voice
- No ALL CAPS anywhere — strictly obeyed per typography_rules

### Icon Treatment
Inline SVGs with 1.5px stroke, rounded caps/joins, sumi ink color at 80% opacity. Match the "fine brush" icon style. No icon CDN dependencies.

### Motion Applied
- Hero entrance: eyebrow → h1 → sub → CTA, staggered 200ms apart, ink-dissolve (opacity + slight blur)
- Hero kintsugi radial glow: scales in with delay
- Nav logo: slow brush-reveal from left on first load
- Cards: warm background shift + kintsugi border fade + 2px lift on hover
- All animations respect `prefers-reduced-motion: reduce`
- No looping, bouncing, or spring animations

### Color Rules Applied
- Background always rice paper or aged parchment — never white, never dark
- Sumi ink (#1A1A14) is the only body text color — never lightened
- Kintsugi gold used once per screen as the single most important element
- At most two earth-tone accents in any view
- All shadows warm brown, never cool gray or black

## Known Deviations from new_site.md
- **Fonts:** No Google Fonts CDN used. System font fallbacks per kit's declared fallback stacks (Georgia, system-ui, etc.) are used for the static site. Production build must download WOFF2 files and declare `@font-face` with `font-display: swap` per spec §13.
- **og.svg:** Social share image is delivered as `og.svg` (valid 1200×630 scalable SVG) rather than raster PNG. All `og:image` and `twitter:image` meta tags reference the SVG absolute URL. Rasterize to PNG if platform requires it.

## Round 1 Fixes Applied
- Google Fonts CDN `@import` removed from theme.css (was render-blocking)
- Nav touch targets increased to 44×44px minimum
- Nav link opacity 0.8 → 1.0 (full contrast, kintsugi gold focus ring visible)
- Hero eyebrow `text-transform: uppercase` removed (no all-caps per typography_rules)
- Body/li text constrained to max-width: 65ch/62ch (60–75ch readability target)
- All 8 HTML files: `og:image` .png → .svg (SVG at correct 1200×630 dimensions)
- Mobile nav: `left/right: 0` → `inset-inline: 0` for RTL safety
- JS scroll reveal: properly guarded by `!prefersReducedMotion && IntersectionObserver`
- 4 raw hex values in components.css → CSS variable references:
  - `#6A4530` → `var(--color-primary-hover)`
  - `#5a3a28` → `var(--color-primary-dark)`
  - `#B07E14` → `var(--color-tertiary-dark)`
  - `#851F14` → `var(--color-error-dark)`
  New tokens added to base.css :root: `--color-primary-hover`, `--color-primary-dark`, `--color-tertiary-dark`, `--color-error-dark`

## Round 2 Notes
- `.btn-secondary` (Lichen Green `#4A5E2C` on rice paper `#F5F0E8`) contrast confirmed at ~5.96:1 — passes WCAG AA (the 1.2:1 figure in Round 1 was an incorrect calculation; the kit documents ~6.2:1 which is accurate)
- Round 2 overall assessment: ~95.9/100, no blocking defects

## Tools Note
- Tooling (`tools/build.mjs`, `tools/dev-server.mjs`) currently scans legacy `variants/` directory. This build follows the new `sites/` layout per `new_site.md` §17. Scanner update noted for future tooling alignment.

## Follow-ups
- [ ] Update build tooling to scan `sites/` alongside `variants/`
- [ ] Download real WOFF2 font files and declare `@font-face` locally
- [ ] Rasterize og.svg → og.png for maximum social media compatibility (SVG is valid but some crawlers prefer PNG)
- [ ] Run full `npm run lint && npm run linkcheck && npm run a11y` in CI
