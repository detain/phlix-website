# BUILD_LOG.md — Moroccan Bazaar

## Build Summary

**Brand kit:** `moroccan-bazaar.js` v1.0
**Site slug:** `moroccan-bazaar`
**Built:** 2026-07-27 (regeneration)
**Layout archetype:** Immersive — full-bleed dark hero, layered depth, warm lantern-lit atmosphere

## What Was Generated

```
sites/moroccan-bazaar/
├── index.html              Home — archway-opens hero, the-treasures features,
│                           why-handcraft story, trusted-artisans proof,
│                           step-inside CTA
├── features.html           Feature detail grid (8 features)
├── clients.html            Client cards (5 clients)
├── download.html           Server install + clients + ecosystem
├── plugins.html            Plugin model + ecosystem + write your own
├── docs.html               Documentation link-out + ecosystem
├── hub.html                Hub description + CTA
├── about.html              Philosophy + license + contributing + FAQ
├── 404.html                Custom 404 — lantern + recovery links, noindex
├── craftsman-guide.html    Extra page — plugin/API/contributing guide
├── css/
│   ├── base.css            Reset, tokens (:root), @font-face (self-hosted),
│                           base styles, focus ring, reduced-motion, strong emphasis
│   ├── theme.css           Typography scale, layout containers, hero, pitch,
│                           features overview, content grids, cards, code-block,
│                           FAQ, zellige divider
│   └── components.css      Site header, nav (6 labels), footer (mirror-nav +
│                           3 columns), buttons (all variants), badges,
│                           forms, mascot (Amir), responsive
├── js/
│   └── main.js             Mobile nav, reduced-motion listener (transition+animation
│                           both off, §19.2), scroll reveals, mascot Amir (tips,
│                           click:3 + hover-hold easter, dismiss via sessionStorage),
│                           logo-clicks:5 easter, typed-word:bazaar easter,
│                           FAQ accordion, seasonal date-gate (3 variants, live-js)
├── img/                    (pre-existing — logo.svg, favicon.svg, og.svg, og.png,
│                           5 icon PNGs — not modified)
├── robots.txt              Sitemap pointer
├── sitemap.xml             9 canonical pages (no 404.html)
├── SITE.md                 (regenerated — see new content)
└── REGEN_PLAN.md           Field → output manifest
```

## Experience Fields Implemented

| Field | Status |
|-------|--------|
| `site_architecture.nav` | ✅ 6 labels — Enter the Bazaar / The Masterworks / Every Screen / Your Passage In / Reach from Afar / The Story — 3 emphasis levels (primary/default/muted) |
| `site_architecture.demoted_pages` | ✅ plugins + docs in footer only |
| `site_architecture.extra_pages` | ✅ craftsman-guide.html |
| `homepage_narrative.sections` | ✅ archway-opens, the-treasures, why-handcraft, trusted-artisans, step-inside |
| `mascot.behavior` | ✅ Amir companion — fixed desktop / in-flow mobile, tips on home/features/download, click:3 + hover-hold easter, dismiss persists via sessionStorage |
| `easter_eggs` | ✅ logo-clicks:5 → zellige cascade; typed-word:bazaar → parchment flash |
| `seasonal_activation` | ✅ live-js date-gate — 3 variants (Ramadan/Harvest/Rose Water), CSS token override |
| `intensity_toggle` | N/A — null in kit |
| `error_page_experience` | ✅ custom 404.html with real content, noindex, relative paths, recovery links |

## Design Decisions

1. **Nav labels** — verbatim from kit `site_architecture.nav`: "Enter the Bazaar", "The Masterworks", "Every Screen", "Your Passage In", "Reach from Afar", "The Story". Demoted pages (plugins, docs) appear only in footer mirror-nav.

2. **Fonts** — self-hosted WOFF2 from `../../assets/fonts/` pool (per §19.3). Weights trimmed per brief: Cormorant Garamond 600+700, Cinzel 400+700, Lora 400+500, Nunito Sans 400+500+600, Fira Code 400+500.

3. **Install command** — copied verbatim from `content.json` `install.primary.command`. `install.from_source` correctly labelled as "not an install" in a `<details>` block.

4. **Strong emphasis** — `font-weight: 500` + `color: #B87828` (hammered copper) as second channel. Brief noted weight 500 alone is sub-perceptual; copper at 4.96:1 on bg passes AA.

5. **Secondary color** — `#1A4580` fails WCAG AA on dark surfaces (brief contrast table). Used for decorative borders only; any text use replaced with safe substitute `#5f7da6` where needed.

6. **Zellige dividers** — SVG `data:` URI geometric star pattern, 8-pointed, 6% opacity — no raster assets required.

7. **Hero** — dark atmospheric with geometric star watermark (SVG data URI). No hero illustration asset requested (brief §19.9: absence is not a defect).

8. **Seasonal assets** — `seasonal_activation.motif_assets` (ramadan-fanous-lanterns.svg etc.) not present in img/. Not created (no raster image generation capability). CSS date-gate still fires and swaps CSS tokens. Documented in Known Follow-ups.

9. **Reduced motion** — `prefers-reduced-motion: reduce` in base.css switches off BOTH `transition` AND `animation` (§19.2). JS motion listener added in main.js for dynamic changes.

10. **Focus ring** — `outline` + `box-shadow` in one `:focus-visible` rule (not separate), so both apply. Copper outer halo (4px rgba copper) paired with terracotta 2px ring.

11. **Mascot at 320px** — Amir is `position: relative` below 768px (in-flow), not fixed. At 320px there is no fixed element to cover the CTA.

12. **CTA ladder** — 3 rungs: "Enter the Bazaar" (hero primary CTA) → "Your Passage In" (download page) → "Read the docs" (secondary CTA / docs).

## Deviations from Previous Build

- Added missing 404.html
- Nav labels corrected to kit labels (previous build had none)
- Home sections corrected to kit `homepage_narrative.sections` IDs
- Mascot Amir added (was explicitly not added in previous build)
- `install.from_source` correctly labelled "not an install" per §19.22
- Self-hosted fonts from `../../assets/fonts/` pool, not Google Fonts CDN
- `easter_eggs` implemented (logo-clicks:5 + typed-word:bazaar)
- `seasonal_activation` live-js date-gate added
- `@copyright` banners added to all css/js files (§19.24)

## Known Follow-ups

- **Seasonal motif SVGs** — `img/seasonal/ramadan-fanous-lanterns.svg`, `img/seasonal/harvest-spice-texture.svg`, `img/seasonal/rose-water-petals.svg` referenced in `seasonal_activation.motif_assets` but not present. CSS date-gate and token override work without them; motif assets are visual-only.
- **OG image text** — og.svg may need `gen-og.mjs` rerun if og.svg text was edited

## Verification

- `node tools/selfcheck.mjs --site moroccan-bazaar` — must PASS
- `node tools/render-check.mjs --site moroccan-bazaar` — must PASS
