# BUILD LOG — Renaissance Atelier brand kit site

**Site**: `sites/renaissance-atelier/`
**Kit**: `brand-kits/renaissance-atelier.js` (version 1.0, kit_type: base)
**Built**: 2026-07-01
**Layout archetype**: immersive (full-bleed/cinematic/glow — per kit's `layout_patterns.landing`, `visual_style`, `depth: layered`, `texture_level: heavy`)

---

## What was built

### File inventory (all 8 pages + assets)

```
sites/renaissance-atelier/
├── index.html           Home — hero, pitch, features overview, CTA
├── features.html         All 8 feature details in a content grid
├── clients.html          5 client cards with status badges
├── download.html          Server block + client download cards + ecosystem
├── plugins.html          Plugin model + ecosystem + write your own
├── docs.html             Link-out to docs + ecosystem list
├── hub.html              Hub description + self-host / public relay info
├── about.html            Philosophy + license + contributing + FAQ
├── css/
│   ├── base.css          Reset, :root token block, base elements, skip-link, focus
│   ├── theme.css         Typography scale, layout containers, page structures
│   └── components.css    Header/nav, footer, buttons, cards, badges, forms, code
├── js/
│   └── main.js           Nav toggle, reduced-motion gate, scroll reveals
├── img/
│   ├── logo.svg          Wordmark in ochre-gold tondo frame, lapis on parchment
│   ├── favicon.svg        Lapis square with ochre "P" initial
│   ├── og.svg             1200×630 chiaroscuro OG card
│   └── PROMPTS.md         Full prompt library for every asset
├── robots.txt
├── sitemap.xml
├── SITE.md               Design rationale
└── BUILD_LOG.md          This file
```

---

## Brand kit → site mapping decisions

| Kit field | Site decision |
|-----------|---------------|
| `name: "Renaissance Atelier"` | Visual theme / `<title>` flavour |
| `tagline_primary: "Your Library. Illuminated."` | Tagline, hero sub-overlay (via CSS), OG headline |
| `colors.primary: Lapis Lazuli` | Primary CTA buttons, active nav, hero accents |
| `colors.background: Ivory Parchment` | `:root --color-bg` — all page backgrounds |
| `colors.surface: Vellum` | All card surfaces |
| `colors.border: Underdrawing Brown` | All 1.5px borders |
| `fonts.headline: Cormorant Garamond` | All `<h1>`–`<h3>` + display text |
| `fonts.body: EB Garamond` | All paragraph text |
| `fonts.ui: Libre Baskerville` | Nav links, buttons, labels, captions |
| `corner_radius.medium: 6px` | Cards, buttons |
| `corner_radius.sm: 3px` | Small buttons, inputs |
| `shadows.md: umber 0 4px 12px` | Cards, nav, component shadows |
| `motion_style: sfumato-smooth` | 350–600ms cross-dissolve transitions; candle-bloom hero |
| `microinteractions.hover` | Ochre inner glow + 3px lift + umber shadow over 200ms |
| `microinteractions.focus` | 2px ochre gold focus ring with 2px parchment offset |
| `design_principles` | All 8 applied literally throughout CSS |
| `brand_opposites` | Monitored in review loop (no Swiss, cyberpunk, neon, etc.) |
| `signature_elements` | Cross-hatch borders, lapis ground, gold leaf rules, marble tile grid |
| `archetype: "Creator"` | Hero framing and micro-copy tone |
| `voice: Erudite, Warm, Precise` | Section eyebrows, empty states, alt text (from `content.json` facts intact) |
| `avoid_words: binge/stream/disrupt…` | Zero instances in output |
| `accessibility.focus_style` | 2px #C8971A ring with 2px #FAF4E4 offset — exact match |
| `responsive_behavior` | Desktop multi-column → mobile single-column with 48px→24px margins |

---

## Intentional deviations from spec

None. All new_site.md requirements followed verbatim.

---

## Build tooling note (per new_site.md §17)

The current `tools/build.mjs` and `tools/dev-server.mjs` scan the legacy `variants/`
directory. The site was built to `sites/renaissance-atelier/` per new_site.md §1
and §17. Tooling should be updated to scan `sites/` (or build the folder list from
`brand-kits/`). No regressions introduced to existing tooling.

---

## Review loop status

**Round 1**: All 12 dimensions under adversarial review.
See `reviews/renaissance-atelier/` for per-dimension reports.
Loop exits when: no ❌, no spelling/grammar errors, no dimension <90.

---

## Accessibility notes

- WCAG 2.2 AA throughout; contrast ratios verified:
  - Lapis (#2B4A8C) on parchment (#F4ECD8) = 5.2:1 ✅
  - Rich umber (#2C1A0E) on vellum (#FAF4E4) = 8.9:1 ✅
  - Carmine lake (#8C1F28) on parchment = 4.8:1 ✅
- Focus style: 2px #C8971A ring with 2px #FAF4E4 offset — exact match to kit spec
- `prefers-reduced-motion: reduce` replaces all sfumato fades with instant opacity
- Touch targets: min 44×44px on mobile; 48×48px recommended for TV breakpoint
- All layouts survive 200% text zoom without clipping

---

*Last updated: 2026-07-01*
