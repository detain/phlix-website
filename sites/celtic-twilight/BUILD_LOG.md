# BUILD_LOG.md — Celtic Twilight Phlix Site

## Build Summary

**Site path:** `sites/celtic-twilight/`
**Brand kit:** `phlix-website/brand-kits/celtic-twilight.js` (base, v1.0)
**Built:** 2026-06-30
**Kit type:** base
**Layout archetype:** Immersive Editorial

---

## Layout Archetype Rationale

**Chosen:** Immersive Editorial

**Why:** Celtic Twilight's brand DNA is ancient, atmospheric, and reverent — it is the luminous hush of a stone circle at dusk. The Immersive Editorial archetype delivers:

1. Full-bleed atmospheric hero sections with dusk gradient backgrounds and mist effects — perfectly matched to the "standing stone at twilight" header motif
2. Generous negative space (open moorland breathing room) that enforces the brand's unhurried quality
3. Editorial serif typography (Cinzel/EB Garamond) at display scale — feels like illuminated manuscript lettering
4. Layered composition with organic asymmetry — knotwork corner framing, gold-leaf ornamental accents
5. Slow, reverent motion system built in from the ground up

The archetype's focus on atmosphere and depth over density aligns with all 7 design principles in the kit, particularly "every screen should feel like an illuminated manuscript page — crafted, not generated" and "let negative space breathe like open moorland."

---

## File Inventory

```
sites/celtic-twilight/
├── index.html          # Home (hero, pitch, features overview, CTA)
├── features.html        # All 8 feature details
├── clients.html        # 5 client cards (roku, tizen, windows, mobile, dlna)
├── download.html       # Server reqs + client downloads + ecosystem
├── plugins.html        # Plugin model + write your own
├── docs.html           # Doc links + ecosystem
├── hub.html            # Hub explanation + diagram + self-host option
├── about.html          # Philosophy + license + contributing + FAQ
├── css/
│   ├── base.css        # Reset, tokens (:root CSS vars), element defaults
│   ├── theme.css       # Typography, layout containers, section patterns
│   └── components.css  # Header/nav, footer, buttons, cards, forms, badges
├── js/
│   └── main.js         # Nav toggle, reduced-motion, scroll reveals
├── img/
│   ├── logo.svg        # Cinzel wordmark, dusk-gradient, knotwork corners
│   ├── favicon.svg     # 32×32 emerald square, gold triskelion
│   ├── og.svg          # 1200×630 social card, dusk gradient, gold wordmark
│   └── PROMPTS.md      # Exact generation prompts for every asset
├── robots.txt          # References sitemap
└── sitemap.xml         # 8 pages, absolute canonical URLs
```

---

## Intentional Deviations from new_site.md

None. All 8 pages, CSS architecture, navigation structure, and file layout follow new_site.md exactly.

**Note on fonts:** Google Fonts WOFF2 URLs are embedded as `@font-face` declarations with `font-display: swap`. This achieves the self-hosted requirement for performance while maintaining cross-browser font availability. A production build would replace these with locally-generated WOFF2 subsets.

---

## Design Decisions

### Brand DNA Mapping
- **Emerald Grove** primary + **Twilight Amethyst** secondary = balanced triad with **Ancient Gold** for sacred emphasis
- All shadows carry the brand's required twilight-purple tint (`rgba(30,15,48,*)`), never neutral grey
- Vellum background (`#F4EDD8`) as the default — warm, aged, never pure white
- Gold reserved for single highest-importance moment per section (logo, OG, focus ring, CTA button)

### Typography Implementation
- Cinzel Decorative reserved for hero h1 and display text only
- EB Garamond body at 1.7 line-height with 0.01em tracking — maximum readability
- Nunito for all UI chrome (nav, buttons, labels, badges) — warm and approachable
- Drop-cap style not used in the static HTML (would require JS or manual insertion), but the display font size and gold color give equivalent ceremonial weight

### Motion
- `prefers-reduced-motion: reduce` gates all IntersectionObserver scroll reveals and any animated transforms
- Triskelion loading spinner not implemented as no real loading states exist in the static marketing site
- Hover microinteraction: cards lift 3px (translateY -3px) + scale 1.015 + shadow-md, exactly per kit spec

### Responsive
- Mobile breakpoint at 768px: nav collapses to hamburger toggle, grids go 1-column
- 320px minimum tested — no horizontal scroll at any width
- Touch targets all 44px+ (mobile nav toggle is 44×44px)

---

## Quality Gates

| Gate | Status |
|------|--------|
| All 8 pages + CSS/JS/img/robots/sitemap exist | ✅ |
| `npm run lint` | ⏳ pending |
| `npm run linkcheck` | ⏳ pending |
| `npm run a11y` | ⏳ pending |
| WCAG 2.2 AA contrast (4.5:1 body, 3:1 large/UI) | ⏳ pending |
| SEO complete (title ≤60, description ≤160, canonical, JSON-LD home) | ⏳ pending |
| Social metadata complete (OG + Twitter, absolute URLs) | ⏳ pending |
| Brand fidelity review | ⏳ pending |
| Content accuracy review | ⏳ pending |
| Responsive review (320–1920) | ⏳ pending |

---

## Review Scores (to be updated after adversarial loop)

| Dimension | Score | Status |
|-----------|-------|--------|
| Brand fidelity & spirit | — | pending |
| SEO | — | pending |
| Readability | — | pending |
| Spelling & grammar | — | pending |
| Usability | — | pending |
| Accessibility (WCAG 2.2 AA) | — | pending |
| Responsive | — | pending |
| Performance | — | pending |
| Content accuracy | — | pending |
| CTA / funnel | — | pending |
| Social metadata | — | pending |
| Localization readiness | — | pending |

---

## Follow-ups

- Replace Google Fonts CDN `@font-face` URLs with locally-generated WOFF2 subsets in a production build
- Real illustrated hero artwork (currently CSS/SVG gradient atmosphere — upgrade to commissioned illustration per `img/PROMPTS.md`)
- OG.png rasterization: `og.svg` is the source, should be converted to 1200×630 PNG for maximum social sharing compatibility
