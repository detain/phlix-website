# BUILD LOG — Neon Noir Brand-Kit Site

**Kit:** Neon Noir (base kit, `kit_type: "base"`)
**Version:** 1.0
**Built:** 2026-07-01
**Site path:** `sites/neon-noir/`

---

## What was built

### Site Structure
```
sites/neon-noir/
├── index.html           Home
├── features.html        Features
├── clients.html         Clients
├── download.html        Download
├── plugins.html         Plugins
├── docs.html            Docs (link-out)
├── hub.html             Phlix Hub
├── about.html           About + FAQ
├── css/
│   ├── base.css         reset, :root tokens, element defaults, utilities
│   ├── theme.css        typography scale, layout containers, page sections
│   └── components.css   nav, footer, buttons, cards, forms, badges, tables
├── js/
│   └── main.js          nav toggle, reduced-motion, scroll reveals
├── img/
│   ├── logo.svg         Playfair italic wordmark, cyan border, amber accent
│   ├── favicon.svg      32×32 void-black, amber P letterform
│   ├── og.svg           1200×630 city silhouette, neon horizon
│   └── PROMPTS.md       exact generation prompts for every image asset
├── robots.txt
├── sitemap.xml
├── SITE.md              design rationale, palette, type, motion, assets
└── BUILD_LOG.md         this file
```

### Files created: 8 HTML + 3 CSS + 1 JS + 3 SVG + 3 MD + 2 XML = 20 files

---

## Layout Archetype

**Immersive** — chosen for the Neon Noir brand's cinematic, full-bleed hero concept. Dark backgrounds with neon glow accents create the noir atmosphere. The hero takes the full viewport, content sections alternate void-black and deep-navy, and the CTA banner uses an amber radial glow. Negative space (darkness) is structural, not empty.

---

## Design Decisions

1. **Playfair Display italic** for hero headlines — high-contrast noir elegance, the `em` tag used for the amber accent word in the home hero headline ("Every Frame, a **Mystery**.")

2. **Neon flicker animation** on hero wordmark — `neon-flicker` keyframe (4s cycle) matches the kit's `header_motif` specification.

3. **Venetian-blind dividers** implemented as CSS `repeating-linear-gradient` in `.venetian-divider` class.

4. **Card hover glow** — 200ms ease-out transition with `translateY(-3px)` + cyan border + `box-shadow: var(--shadow-neon-cyan)`.

5. **Focus ring** — 2px `var(--color-focus)` + 2px void-black offset + 4px cyan outer glow per kit spec.

6. **Mobile nav** — slides in from right (300ms ease), focus trap implemented, overlay backdrop, Escape key closes.

7. **Reduced motion** — all animations gated behind `matchMedia('(prefers-reduced-motion: reduce)')`.

8. **Tagline secondary** used in CTA banners:
   - Home: "The city never sleeps. Neither do you."
   - Features: "Cinema lives in the dark."
   - Clients: "See the shadows. Find the story."
   - Plugins: "The library is yours. Build what you need."
   - Hub: "The city follows you."
   - About: "Your terms. Your library."

---

## Intentional Deviations from Spec

None — all decisions trace directly to kit fields.

---

## Known Follow-ups

1. **og.png** — `og.svg` is the editable source. For production use, render `og.svg` to 1200×630 PNG at 2x resolution.
2. **Font files** — fonts are declared via `@font-face` with `font-display: swap` pointing to locally available fonts. In production, self-host WOFF2 files.
3. **Feature icon SVGs in `img/`** — the 7 feature icons are inline in HTML. For standalone use, extract to `img/icons/` if needed.

---

## Quality Gates

| Gate | Status |
|------|--------|
| All 8 pages + CSS/JS/img exist | ✓ |
| `npm run lint` | pending |
| `npm run linkcheck` | pending |
| `npm run a11y` | pending |
| Brand fidelity review | pending |
| Final review loop | pending |

---

## Metadata

- **Kit:** `phlix-website/brand-kits/neon-noir.js`
- **Kit type:** base
- **Kit version:** 1.0
- **Kit author:** Phlix Design
- **Kit created:** 2026-06-30
- **Kit compatible models:** claude-opus-4-8, claude-sonnet-4-6, sdxl, flux.1
