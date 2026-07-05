# BUILD_LOG.md — Tropical Lagoon Brand-Kit Site

## Build Summary
- **Kit:** `tropical-lagoon` (base kit, v1.0)
- **Built:** 2026-07-04
- **Layout archetype:** `immersive` — full-bleed cinematic hero with caustic light animation, alternating depth/shadow sections, horizon compositions. Chosen because: the kit's `art_direction` specifies "spread in a high-end tropical travel magazine", `depth` is "layered", and `layout_patterns.landing` calls for "full-bleed tropical hero illustration with Josefin Sans headline over lagoon-surface gradient". This strongly implies immersive/editorial composition.

## What Was Built

### File Inventory
```
sites/tropical-lagoon/
├── index.html          Home page
├── features.html        Features (8 feature details)
├── clients.html         Clients (5 client cards)
├── download.html        Download + ecosystem
├── plugins.html         Plugins
├── docs.html            Docs (link-out)
├── hub.html             Phlix Hub
├── about.html           About + FAQ (6 items)
├── css/
│   ├── base.css         Reset + CSS design tokens (:root variables)
│   ├── theme.css        Typography scale + page structure
│   └── components.css   Header, footer, buttons, cards, badges, forms
├── js/
│   └── main.js          Nav toggle, reduced-motion, scroll reveals
├── img/
│   ├── logo.svg         Wordmark: "Phlix" in Pacifico + caustic wave underline
│   ├── favicon.svg      "P" in Pacifico on lagoon-depths background
│   ├── og.svg           1200×630 social share card with logo + tagline
│   └── PROMPTS.md       Full prompt library for regenerating assets
├── robots.txt           Allows all, references sitemap
├── sitemap.xml         8 pages, absolute URLs
├── SITE.md              Design rationale
└── BUILD_LOG.md         This file
```

## Design Decisions

### Color Application
- **Backgrounds:** Always `#011A20` (Lagoon Depths) — the kit's "dark lagoon" is the canvas
- **Primary CTA:** `#00D4B8` (Lagoon Turquoise) pill button — the lagoon itself
- **Secondary elements:** `#FF6B35` (Sunset Coral) for warmth, reward, secondary CTAs
- **Tertiary accent:** `#90E050` (Palm Lime) — used sparingly, one per section maximum
- **Cards/surfaces:** `#02242C` (Reef Shadow) with `1px solid #0A3D4A` border
- **Text:** `#F0FAF8` (Sea Foam White) on all dark backgrounds

### Typography Application
- `h1–h6`: Josefin Sans semibold, 0.04em tracking, line-height 1.1
- `.text-display`: Pacifico for hero tagline overlay
- Body copy: Nunito 400, 1.7 line-height, sentence case
- UI labels/buttons: Nunito 600, 0.02em tracking

### Motion Application
- **Hero:** `caustic-drift` keyframe animation — background radial gradients shift 5% over 12s, creating underwater caustic light shimmer. Disabled with `prefers-reduced-motion: reduce`.
- **Card hover:** `translateY(-4px)` + `box-shadow` + `border-color` transition over 220ms `ease-out`
- **Button hover:** `translateY(-1px)` + saturate-shift on primary
- **Scroll reveals:** `IntersectionObserver` with `opacity 0 → 1` + `translateY(16px → 0)` over 400ms `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — elements float up like rising through water

### Shape Language
- All cards: `border-radius: 20px` (large), `12px` (medium)
- All buttons: `border-radius: 999px` (pill) — "palm-friendly", never sharp
- Borders: `1px solid #0A3D4A` — tidal edge teal, rounded

### Signature Element Execution
- Caustic light pattern: CSS `radial-gradient` + `animation: caustic-drift` in hero
- Palm frond accents: SVG paths in `og.svg` and as decorative elements
- Wave-form decorative lines: `border-bottom` accent on section headings
- Turquoise glow shadows: `0 0 14px rgba(0,212,184,0.5), 0 0 36px rgba(0,212,184,0.18)` on hover states

## Deviation Notes

- **Fonts:** Self-hosted WOFF2 declared in `theme.css` via `@font-face`, but actual font files are not yet downloaded. The site will fall back to the CSS stack (Futura, Century Gothic, sans-serif for Josefin; Righteous/cursive for Pacifico; Lato/system-ui for Nunito). Download the WOFF2 files from Google Fonts for production.
- **og.png:** Referenced as `og.png` in meta but only `og.svg` is shipped. Update meta to reference `og.svg` or rasterize the SVG to PNG.
- **JSON-LD:** Applied on `index.html` only (home page spec in new_site.md §10).

## Build Commands (for CI/checking)
```bash
npm run lint        # HTML + CSS + JS lint (zero warnings)
npm run linkcheck   # Broken-link sweep
npm run a11y        # pa11y-ci accessibility
```

## Review Loop Status
- [ ] Initial build complete
- [ ] Review round 1 — all 12 dimensions
- [ ] Fixes applied
- [ ] Final review clean — all dimensions ≥90, no ❌
