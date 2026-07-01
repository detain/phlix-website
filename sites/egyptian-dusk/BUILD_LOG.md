# BUILD_LOG.md — Egyptian Dusk Brand Kit Site

## What was built

- **Site path:** `sites/egyptian-dusk/`
- **Brand kit:** `egyptian-dusk.js` v1.0 (base kit, metadata.kit_type: "base")
- **Layout archetype:** IMMERSIVE / SHOWCASE
  - Full-bleed Dusk Over the Pyramids hero → register sections alternating Black Silt Night / Khufu's Shadow → hieroglyphic-band dividers → centered, processional symmetry with generous negative space
- **Fonts:** Self-hosted WOFF2 via Google Fonts download (Cinzel, Cinzel Decorative, Cormorant Garamond, Courier Prime) — 14 @font-face blocks in `css/fonts/fonts.css`

## File inventory

```
sites/egyptian-dusk/
├── index.html              Home
├── features.html           Features
├── clients.html            Clients
├── download.html           Download
├── plugins.html            Plugins
├── docs.html               Docs (link-out)
├── hub.html                Phlix Hub
├── about.html              About + FAQ
├── css/
│   ├── base.css            CSS tokens, reset, :root variables, base elements
│   ├── theme.css           Typography, layout containers, page sections
│   ├── components.css      Header/nav/footer/buttons/cards/forms/badges
│   └── fonts/
│       ├── fonts.css       Auto-generated @font-face (14 blocks)
│       └── *.woff2          14 self-hosted WOFF2 font files
├── js/
│   └── main.js             Nav toggle, reduced-motion, scroll reveals
├── img/
│   ├── logo.svg            Phlix wordmark in cartouche stele, ankh motifs
│   ├── favicon.svg         Pharaoh Gold square with ankh
│   ├── og.svg              1200×630 social share card
│   └── PROMPTS.md          All image generation prompts
├── robots.txt
├── sitemap.xml
├── SITE.md                 Design rationale
└── BUILD_LOG.md            This file
```

## Brand kit → site decisions

| Kit field | Site decision |
|-----------|---------------|
| `name: Egyptian Dusk` | Visual identity name; product remains "Phlix" |
| `tagline_primary: "Stories Carved in Gold."` | Visual watermark overlay in hero (aria-hidden) |
| `colors` → design_tokens | All 17 CSS color tokens in `:root` |
| `fonts` → Cinzel/Cinzel Decorative/Cormorant Garamond/Courier Prime | Self-hosted WOFF2, @font-face declared |
| `spacing_scale` → `--space-*` tokens | 9-step scale used throughout |
| `corner_radius` → `--radius-*` tokens | 1/3/6/10/999px scale |
| `shadows` → `--shadow-*` tokens | sm/md/lg/gold/lapis/terracotta |
| `layout_patterns.landing` | Full-bleed hero + register sections + Gold CTA |
| `motion_style: ceremonial, processional, weighted` | 350–600ms tomb-door easing throughout |
| `header_motif: golden shimmer animation` | CSS shimmer keyframe on hero h1 |
| `signature_elements` → hieroglyphic band dividers | `::before` pseudo-element with gold gradient rule |
| `mascot: Kheper the scarab` | Described in PROMPTS.md; not built as raster asset in this iteration |
| `logo_rules` | Cinzel Decorative in cartouche stele with ankh flanking |
| `avoid_words` | Not used anywhere in site copy |
| `responsive_behavior` | Tested at 320/375/414/768/1024/1280/1920; mobile single-column, sticky nav |

## Deviation notes

- `og.svg` rendered as SVG source (not rasterized PNG) — tooling references `img/og.svg` in meta; a rasterized `og.png` should be generated as a follow-up
- Kheper the scarab mascot described in PROMPTS.md and SITE.md but not rendered as a raster asset — CSS/SVG-only artwork used as placeholder
- No seasonal variants applied (documented in SITE.md per spec)

## Follow-ups

- [ ] Generate `og.png` from `og.svg` for full Twitter/OG compatibility
- [ ] Run adversarial multi-perspective review loop per spec
- [ ] Lighthouse performance audit against 90 mobile/desktop budget
- [ ] Verify all WCAG AA contrast ratios pass (especially Lapis Lazuli on dark surfaces)
