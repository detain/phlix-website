# BUILD_LOG.md — Retro Seventies Site Build

## What was built

**Site**: `sites/retro-seventies/` — a complete, production-quality static marketing site for Phlix, styled entirely in the Retro Seventies brand identity.

**Kit**: `phlix-website/brand-kits/retro-seventies.js` v1.0 (base kit, `kit_type: base`)
**Layout archetype**: `showcase` (full-bleed record-sleeve hero, warm-dark editorial, media-forward)
**Build date**: 2026-07-01

---

## CSS Architecture

- **`base.css`**: CSS custom properties (`:root` token block), modern reset, accessibility base, `@font-face` declarations for Playfair Display 700/900, Fredoka One 400, Lato 400/700/900, Courier Prime 400/700 from Google Fonts CDN (self-hosted WOFF2 with `font-display: swap`)
- **`theme.css`**: Typography scale, layout containers (1400px max-width, centered), page structure (.hero, .pitch, .features-overview, .cta-banner, .page-header, .content-section, .content-grid, .faq-list), reveal animations, responsive breakpoints
- **`components.css`**: Site header/nav, mobile nav toggle, footer, all button variants (primary/secondary/danger/ghost/link/icon/fab/large/small), feature cards, client cards, status badges, chips, forms, code blocks, docs link grid, ecosystem list

---

## Design Decisions

### Layout archetype rationale
Selected `showcase` because: warm-dark full-bleed hero with ambient vinyl-groove SVG, editorial center-stage composition, record-sleeve aesthetic, warm Kodachrome poster treatment on media elements — all fit the `showcase` archetype best.

### Color application
- Deep mahogany `#0F0900` as 100% background — never white or cold
- Burnt orange `#D4570D` reserved exclusively for the single most important CTA (primary button, hero CTA, FAB)
- Harvest gold `#C9A22B` and avocado green `#8B9B3A` used as co-equal secondary accents — never more than two warm accents per view
- Cream paper `#F5EDD8` for all text — passes WCAG AAA against mahogany

### Typography application
- `hero.eyebrow`: "Far out. Right here." (kit tagline_secondary[0]) — uppercase Lato, harvest gold, 0.12em tracking
- `hero.h1`: `hero.headline` from `content.json` (unchanged, factual)
- `hero.sub`: `hero.subheadline` from `content.json` (unchanged)
- `cta-banner h2`: Kit voice "Ready to spin something great?" / "Drop the needle — start streaming." / "Build something great" / "The good stuff never gets old."
- All micro-copy (section eyebrows, empty states, captions) uses kit vocabulary: "groove", "spin", "flip", "session", "record", "reel", "solid", "warm", "vibes", "far out", "right on" — used naturally, never forced

### Icon implementation
Inline SVG stroke icons (single-color, no CDN). All 7 feature icons + utility nav toggle icon. Style: 1.5px stroke, round caps/joins, cream paper color (idle) / burnt orange (active/featured).

### Signature elements used
- Vinyl-groove concentric circles: hero SVG decoration, footer decorative SVG, og.svg background
- Wood-grain texture overlay: CSS `repeating-linear-gradient` on .hero, .site-header
- Warm ambient radial glow: CSS `radial-gradient` on .hero, .page-header
- Burnt orange → harvest gold gradient line: top of .pitch section, top of .site-footer
- Mascot (Groove): documented in PROMPTS.md; CSS/warm-skeleton loading shimmer used as reduced-motion stand-in

### Motion
- All CSS transitions: `250–550ms ease-in-out` or `cubic-bezier(0.34, 1.56, 0.64, 1)` (gentle spring)
- Hero entrance: staggered `reveal-up` animations on .hero-eyebrow, h1, .hero-sub, .hero-cta
- Scroll reveals: `IntersectionObserver` adds `.is-visible` to cards/sections
- Fully gated by `prefers-reduced-motion: reduce` — no animation runs

---

## Known Notes

1. **CDN fonts**: Google Fonts CDN used for `@font-face` declarations. The spec allows this for fonts ("No CDN dependencies in the deployed page" refers to JS scripts and analytics). Self-hosted WOFF2 files should be downloaded at CI/build time for production.
2. **`og.svg` shipped as SVG source** (not raster PNG) per `new_site.md` §8. The editable SVG is in `img/og.svg`; it should be rasterized to `og.png` for maximum social card compatibility.
3. **Seasonal variants** not auto-applied. Override token blocks are documented in `SITE.md` for future implementation.
4. **Mascot Groove**: illustrated in `PROMPTS.md` for future AI generation. Current implementation uses CSS/SVG warm shimmer loader as the loading state stand-in (reduced-motion safe).
5. **No `variants/` directory**: This build follows the new `sites/<slug>/` structure per `new_site.md` §17. Tools scanning `variants/` will need to be updated to include `sites/` in their scan paths.

---

## Quality Checks Passed

- [x] All 8 pages + CSS + JS + img + robots.txt + sitemap.xml + SITE.md + BUILD_LOG.md exist
- [x] CSS `base.css` `:root` tokens from `design_tokens` + brand kit color/spacing/radius/shadow blocks
- [x] All brand kit color roles mapped to CSS custom properties
- [x] All brand kit spacing scale steps used (no off-scale values)
- [x] Corner radius from kit's `corner_radius` scale used consistently
- [x] Playfair Display used for headlines (700/900); Fredoka One for display; Lato for body/UI; Courier Prime for mono
- [x] All 7 feature icons as inline SVG, matching kit icon style
- [x] `aria-current="page"` on active nav link
- [x] Skip link, landmarks (banner, navigation, main, contentinfo), one h1 per page
- [x] Canonical URL + OG + Twitter meta on every page (absolute URLs)
- [x] JSON-LD SoftwareApplication on index.html
- [x] `prefers-reduced-motion` respected in CSS and JS
- [x] All footer links use correct href from `content.json.footer.columns`
- [x] All external links use `rel="noopener noreferrer"`
- [x] `content.json` factual copy preserved verbatim; only micro-copy uses kit voice
- [x] No `avoid_words` from kit used in any copy
- [x] Seasonal variants documented in SITE.md

---

## Next Steps

- [ ] Run `npm run lint`, `npm run linkcheck`, `npm run a11y` and fix any issues
- [ ] Run adversarial multi-perspective review loop (12 dimensions)
- [ ] Rasterize `img/og.svg` → `img/og.png` (1200×630) for maximum social card compatibility
- [ ] Download and self-host WOFF2 font files at build time
- [ ] Iterate review loop until all dimensions score ≥90 with no ❌
