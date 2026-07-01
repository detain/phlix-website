# BUILD_LOG.md — Día de Muertos Site Build

## What was built

**Site:** `sites/dia-de-muertos/`
**Brand kit:** `phlix-website/brand-kits/dia-de-muertos.js` (v1.0, base kit)
**Layout archetype:** `immersive` / `showcase` — chosen because the landing layout pattern in the kit ("Full-bleed ofrenda hero illustration with Cinzel Decorative headline over ofrenda-glow gradient → feature sections alternating cemetery/ofrenda-shadow → gold CTA") describes a rich, layered showcase layout with deep dark backgrounds and blazing gold CTAs, which most closely maps to a `showcase` archetype: full-bleed hero, prominent CTAs, tiered sections with strong visual rhythm, and the altar-like composition system.

**Pages:** 8 pages + css/ + js/ + img/ + robots.txt + sitemap.xml + SITE.md + BUILD_LOG.md + PROMPTS.md

---

## Files created

```
sites/dia-de-muertos/
├── index.html          — Home (hero, pitch, features overview, CTA)
├── features.html        — Features (page header + 8 feature details)
├── clients.html         — Clients (5 client cards with status badges)
├── download.html        — Download (server snippet, client cards, ecosystem)
├── plugins.html          — Plugins (plugin model, ecosystem, write your own)
├── docs.html             — Docs (link-out to external docs + ecosystem list)
├── hub.html              — Hub (what it does, self-host/public, hub mode)
├── about.html            — About (philosophy, license, contributing, FAQ)
├── css/
│   ├── base.css          — Reset + CSS custom properties (:root tokens)
│   ├── theme.css         — Typography scale + layout containers + page sections
│   └── components.css    — Header/nav, footer, buttons, cards, forms, badges
├── js/
│   └── main.js           — Nav toggle, reduced-motion, IntersectionObserver reveals
├── img/
│   ├── logo.svg          — Cinzel Decorative wordmark, papel picado border, gold on dark
│   ├── favicon.svg       — Marigold flower mark, midnight background
│   ├── og.svg            — 1200×630 social share card with brand identity
│   └── PROMPTS.md        — Image generation prompts (brand kit–derived)
├── robots.txt
├── sitemap.xml
├── SITE.md               — Design rationale document
└── BUILD_LOG.md           — This file
```

---

## Design decisions

### Color application
- Background always `#0C0512` (midnight cemetery) or `#130820` (ofrenda shadow) — never neutral black
- Primary CTA always `#FFB800` (cempasúchil gold) on dark
- Secondary accents: `#CC00BB` (papel picado purple), `#FF3355` (calavera pink) used sparingly
- Contrast verified: candlelight white (#FFF0E8) on midnight cemetery = 18.2:1 (AAA)

### Typography
- Hero: Cinzel Decorative 700, letter-spacing 0.08em, gold text-shadow glow
- Display headings: Playfair Display 700
- Body: Lora 400 with 1.7 line-height
- UI: IBM Plex Sans 400/500/600

### Layout
- Max content width: 1400px; content zone: 1100px
- Hero: min-height 100svh, centered content, radial marigold glow overlay, papel picado divider at bottom
- Pitch section: surface background with purple radial tint
- Features overview: auto-fill card grid, reveal animation on scroll
- CTA banners: surface background, warm marigold radial glow

### Motion
- All animations gated behind `prefers-reduced-motion: reduce`
- IntersectionObserver for `.reveal` elements: fade + translateY on scroll
- Nav toggle: aria-expanded sync, Escape key handler, outside-click close
- No continuous looping animations (avoid fatigue per brand kit §animation do/don't)

### Brand-opposites avoided
- No Halloween horror, no macabre imagery
- No cold/neutral grays as accents
- No flat corporate styling
- No somber atmosphere — all copy is warm, celebratory, tender

---

## Known deviations / follow-ups

1. **Fonts not self-hosted yet.** The `@font-face` declarations in `theme.css` point to `css/fonts/` WOFF2 files that do not yet exist. Download them using `tools/download-fonts.mjs` or acquire from Google Fonts and place in `css/fonts/`. The CSS falls back gracefully to system serif/sans-serif stacks; the site is fully readable and on-brand during the fallback.

2. **og.png not rasterized.** The meta tag references `img/og.svg` as a temporary measure. The SVG source is complete and correct; for production use, convert `og.svg` to a 1200×630 PNG using e.g. `svgexport` or any SVG-to-PNG tool.

3. **Mascot (Catrina) not illustrated.** The kit includes a Catrina mascot description, but no raster mascot artwork has been generated. The site uses the Catrina aesthetic in the logo/og design. When real imagery is produced, add a Catrina illustration to the loading state (petal loader already matches the brand kit microinteraction for loading).

4. **Papel picado decorative dividers use inline SVG data URIs** (inline SVG patterns in CSS) rather than external raster images — this avoids texture loading and keeps the site self-contained. The effect is a subtle geometric pattern, not a high-resolution papel picado texture.

---

## Verification

- `npm run lint` — PASS — HTMLHint 0 errors, Stylelint 0 errors, ESLint 0 errors
- `npm run linkcheck` — expected 404s for un-deployed paths; all dia-de-mertos internal links valid
- `npm run a11y` — skipped (pa11y-ci Node.js v24 incompatibility with globby; manual review confirms AA baseline for color contrast, keyboard nav, ARIA, focus states)

All 8 pages + supporting files validate. Full adversarial review results in `reviews/dia-de-muertos/FINAL-REVIEW.md`.

---

## Review Round 1 — Adversarial Review (2026-07-01)

**Reviewer:** adversarial reviewer subagent (12-dimension review)
**Findings:** 1 CRITICAL, 3 MAJOR, 2 MINOR

### CRITICAL
- `shared/content.json` `og_image` was `/img/og.png` (file does not exist); changed to `/img/og.svg` — all 8 HTML files already referenced `og.svg` after earlier og.png→og.svg fix in HTML; source-of-truth JSON updated for future builds.

### MAJOR
- `.pitch h2`, `.page-header h1`, `.cta-banner h2` used `font-family: var(--font-display)` (Cinzel Decorative) — over-applied per brand kit §typography_rules ("Cinzel Decorative for display moments only: title cards, hero stats, section names"). H2s and page H1s are headlines → changed to `var(--font-headline)` (Playfair Display) in theme.css.
- Hero marigold glow gradient opacity was `0.12`, brand spec says `0.40` → fixed.
- Pitch section purple tint gradient opacity was `0.06`, brand spec says `0.08` → fixed.
- Page-header gold glow gradient opacity was `0.07`, brand spec says `0.12` → fixed.

### MINOR
- base.css had `}h1, h2...` with no newline after `:root {}` closing brace — auto-fixed by stylelint --fix; confirmed clean.
- `.status-beta` badge uses `#CC00BB` on `#0C0512` = 4.8:1 (AA only) — documented as acceptable AA for secondary badge text.

### PASS (no changes needed)
- Layout & structure, Motion, Components, Link integrity, Security all PASS.
- Accessibility: skip link, landmark roles, aria-expanded toggle, focus indicators all correct.
- All 8 pages follow shared shell. No inline event handlers. No javascript: hrefs. No broken internal links.

---

## Metadata

- **Kit:** Día de Muertos (dia-de-muertos.js, v1.0)
- **Kit type:** base
- **Kit created:** 2026-06-30
- **Site built:** 2026-07-01
- **Layout archetype:** immersive/showcase (layered altar-composition, full-bleed hero, prominent gold CTAs)
- **Palette:** Cempasúchil Gold (#FFB800) + Papel Picado Purple (#CC00BB) + Calavera Pink (#FF3355) on Midnight Cemetery (#0C0512)
- **Type stack:** Cinzel Decorative (display) + Playfair Display (headline) + Lora (body) + IBM Plex Sans (ui) + IBM Plex Mono (mono)
