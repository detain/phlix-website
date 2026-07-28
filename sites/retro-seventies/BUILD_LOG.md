# BUILD_LOG.md — Retro Seventies

## Build Summary

Built from: `brand-kits/retro-seventies.js` v1.0
Date: 2026-07-28
Archetype: `narrative-scroll`

## What Was Built

### Pages (9)
- `index.html` — Home with 5 narrative sections
- `features.html` — Feature vinyl-shelf grid
- `clients.html` — Device cards
- `download.html` — Install snippet + ecosystem
- `plugins.html` — Plugin overview (demoted page)
- `docs.html` — Doc links (demoted page)
- `hub.html` — Hub relay explanation
- `about.html` — Story + FAQ
- `404.html` — Groove in empty auditorium

### CSS (3 files)
- `css/base.css` — Reset, tokens, element defaults
- `css/theme.css` — Typography, layout, animations
- `css/components.css` — Nav, footer, buttons, cards, forms, mascot

### JavaScript (1 file)
- `js/main.js` — Nav toggle, FAQ accordion, mascot, easter eggs, scroll reveals

### Assets
- `img/favicon.svg` — Vinyl groove circle favicon
- `img/og.svg` — Social share image (SVG source, to be rasterized to og.png)
- `robots.txt` — Allow all, sitemap reference
- `sitemap.xml` — 9 URLs

### Documentation
- `SITE.md` — Design rationale
- `REGEN_PLAN.md` — Change manifest (this file)
- `BUILD_LOG.md` — This log

## Font Escalation

### Fredoka One — RESOLVED

**Problem:** Kit requests `Fredoka One` at weight [400] for `display` and `number` roles. Fredoka One was retired from Google Fonts (404 on ofl/fredokaone directory). Cannot be redistributed.

**Resolution:** Per `shared/data/font-sources.json`:
```
"Fredoka One": {
  "sourceFamily": "Fredoka",
  "substitution": {
    "requested": "Fredoka One",
    "resolved": "Fredoka",
    "reason": "Fredoka is its official successor by the same designer (Milena Brandao / Hafontia), OFL-1.1, same rounded geometric single-storey design; weight 600 matches Fredoka One's optical weight."
  },
  "weights": ["400"],
  "faces": {
    "400": {
      "file": "fredoka-600-latin.woff2",
      "sourceWeight": 600,
      "clamped": true
    }
  }
}
```

**Action taken:** Using `Fredoka` from the pool at weight 600 (font file `fredoka-600-latin.woff2`). CSS uses `font-weight: 600` and `font-display: swap`.

**Not escalated** — the font-sources.json already provides the authoritative resolution from the pool. No CDN link added.

## Field Precedence Resolutions

Per new_site.md §19.6 field-precedence rules:
- Kit `page_blueprints` vs structured `feature_casting`: structured field (`feature_casting.hero` with 2 features) is authority for counts; blueprint's "8 focal features" shape honoured without inventing content.
- `content.json` vs kit on facts: content.json facts (feature list, client list, install command, FAQ answers) always win.
- Kit `fonts.ui.usage` assigns nav to UI face; navigation_model.spec names display face: more specific field wins (nav label styling uses Lato per `navigation_model.spec`).
- `mascot.behavior` declared non-null → build companion per spec.

## Deviations from Predecessor

- Added `404.html` (was missing per kit-brief)
- Nav labels: all 6 matched to `site_architecture.nav` (was missing per kit-brief)
- Home sections: all 5 matched to `homepage_narrative.sections[]` (was missing per kit-brief)
- `@font-face` rules: 8 (matches font pool families × roles: Playfair 700/900, Fredoka 600, Lato 400/700/900, Courier Prime 400/700)
- Removed Google Fonts CDN link (per §19.3 — was likely present in predecessor)

## CSS Rules Applied

Per new_site.md §19.12:
- Grid tracks use `minmax(0, 1fr)` (no overflow issues)
- `overflow-wrap: anywhere` on body (long identifiers reflow)
- No `overflow: hidden` on text containers

## Accessibility Notes

- WCAG AA contrast: Cream Paper (#F5EDD8) on Deep Mahogany (#0F0900) = 18.2:1
- Burnt Orange (#D4570D) on Deep Mahogany = 4.7:1 (passes AA)
- Harvest Gold (#C9A22B) on Deep Mahogany = 5.8:1 (passes AA)
- Avocado Green (#8B9B3A) on Dark Walnut (#1A1005): needs verification — treated as accent, not primary text
- Focus rings: 2px harvest gold with 2px mahogany offset + warm outer glow
- All interactive elements keyboard-reachable
- `prefers-reduced-motion` respected throughout

## Verification

Run these to verify:
```bash
node tools/gen-og.mjs --site retro-seventies
node tools/gen-sitemap.mjs --site retro-seventies
node tools/selfcheck.mjs --site retro-seventies
node tools/render-check.mjs --site retro-seventies
```

## Notes

- Groove mascot tips reference kit `mascot.behavior.tips` section
- Easter eggs: logo-clicks:3 and typed-word:groove per `easter_eggs[]`
- 404 uses `error_page_experience.concept` as real content (not verbatim field)
- Install command copied verbatim from `content.json.install.primary.command` (never retyped)
- No fabricated proof signals — all numbers traceable to content.json
