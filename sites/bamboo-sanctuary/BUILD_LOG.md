# BUILD_LOG.md — Bamboo Sanctuary

**Brand kit:** `phlix-website/brand-kits/bamboo-sanctuary.js`
**Kit version:** 1.0
**Kit type:** base
**Schema:** 2.0
**Site slug:** `bamboo-sanctuary`
**Site path:** `sites/bamboo-sanctuary/`
**Built:** 2026-06-30

---

## Layout Archetype

**Choice: Immersive/Showcase**

Rationale: The kit's `layout_patterns.landing` explicitly directs a "full-bleed bamboo hero with overlay tagline." The `header_motif` is "slow-swaying bamboo silhouette with filtered-light dapple animation," which demands a full-bleed treatment. The brand DNA ("filtered green light of a Kyoto bamboo grove") and design_principles ("the interface is the garden wall, not the garden"; "one focal point per view") together point to an immersive, showcase-oriented layout — full-bleed hero dominant, content panels quiet and spacious.

This is the highest-impact archetype for this identity: the hero IS the brand, and every subsequent section recedes gracefully rather than competing.

---

## What Was Generated

### File inventory

```
sites/bamboo-sanctuary/
├── index.html          Home
├── features.html       Features (7 feature details + Hub)
├── clients.html        Clients (5 client cards)
├── download.html       Download (server + clients + ecosystem)
├── plugins.html        Plugins (lifecycle model + ecosystem)
├── docs.html           Docs (link-out + ecosystem)
├── hub.html            Hub (reverse-tunnel, self-host, client modes)
├── about.html          About (philosophy + license + contributing + FAQ)
├── css/
│   ├── base.css        Reset + :root CSS tokens (colors, spacing, radius, fonts, shadows, motion)
│   ├── theme.css       Typography scale, layout containers, page sections
│   └── components.css  Header/nav, footer, buttons, cards, badges, forms, feature cards, responsive
├── js/
│   └── main.js         Mobile nav toggle, reduced-motion guard, IntersectionObserver scroll reveals
├── img/
│   ├── logo.svg        Cormorant Garamond Light wordmark + bamboo stalk mark, charcoal on washi
│   ├── favicon.svg     Celadon ring with center dot — zen bamboo node / stone circle
│   ├── og.svg          1200×630 bamboo grove social card — raked gravel, bamboo silhouettes, centered wordmark + tagline
│   └── PROMPTS.md      Exact generation prompts for every image asset + negative prompts
├── robots.txt          User-agent:* Allow:/ + Sitemap reference
├── sitemap.xml         8 pages, absolute canonical URLs, weekly/monthly changefreq + priorities
├── SITE.md             Design rationale, color table, typography, spatial, motion, assets, do/don't checklist
└── BUILD_LOG.md        This file
```

---

## CSS Architecture

Three stylesheets, all driven by `:root` CSS custom properties from `kit.design_tokens` and `kit.colors`:

- **`base.css`**: Modern CSS reset, `:root` token block (all semantic color roles, spacing scale, corner radius, font families, shadows, motion), base element defaults, skip-link, focus-visible, `prefers-reduced-motion`.
- **`theme.css`**: Typography scale classes (.headline-xl, .body-lg, .ui-label, etc.), layout containers (.container, .container-wide, .container-narrow), page structure (.hero, .pitch, .features-overview, .page-header, .content-section, .cta-banner, .faq-list, etc.).
- **`components.css`**: `.site-header/.nav-*`, `.site-footer/.footer-*`, `.btn` variants, `.feature-card`, `.feature-detail`, `.client-card`, `.download-card`, `.ecosystem-list`, `.plugin-steps`, `.badge` variants, responsive breakpoints, animation keyframes.

Key token values sourced from kit:

| Token | Value | Source |
|-------|-------|--------|
| `--color-primary` | `#8FAF9F` | kit.colors.primary.hex |
| `--color-bg` | `#F2EDE5` | kit.colors.background.hex |
| `--color-text` | `#2A2A25` | kit.colors.text.hex |
| `--font-headline` | `'Cormorant Garamond', Georgia, serif` | kit.fonts.headline.family |
| `--font-body` | `'Lora', Georgia, serif` | kit.fonts.body.family |
| `--font-ui` | `'DM Sans', system-ui, sans-serif` | kit.fonts.ui.family |
| `--space-1` – `--space-24` | `4/8/16/24/32/48/72/96px` | kit.spacing_scale |
| `--radius-sm/md/lg/xl/pill` | `3/6/12/20/999px` | kit.corner_radius |
| `--shadow-sm/md/lg` | cool-charcoal rgba | kit.shadows |

---

## Intentional Deviations from `new_site.md`

1. **Fonts**: Fonts are declared with `@font-face` via Google Fonts helper (`google-fonts-helper` devDependency), but are not yet downloaded as local WOFF2 files. The spec says "self-hosted WOFF2 (optional but preferred)". The CSS currently uses the Google Fonts CDN `<link>` approach for development. In a production build, these should be downloaded as local WOFF2 files and declared via `@font-face`. [TODO: ttf2woff2 conversion and local font serving]

2. **No raster images**: The site ships zero JPEG/PNG/WebP images. All artwork is inline SVG (hero bamboo backdrop, feature icons, logo, OG, favicon). The spec's `img/` directory expectation for raster assets is met by SVG equivalents. Rasterization of `og.svg` to `og.png` is recommended for full Twitter Card compatibility.

3. **Seasonal variants**: All 4 seasonal variants are documented in `SITE.md` with their CSS token overrides. They are NOT auto-applied (per spec). The CSS override block for each is not yet in `theme.css`.

4. **`og.png` not yet generated**: `og.svg` is the source, but Twitter Card requires an `og:image` pointing to a raster PNG. A `tools/gen-og.mjs` run to rasterize `og.svg` to `og.png` is recommended before production deployment.

---

## Technical Notes

- All 8 pages are standalone pre-rendered HTML — no runtime template engine required.
- All intra-site links are relative (`./`, `features.html`, etc.). All external links use `rel="noopener noreferrer"`.
- `aria-current="page"` set on the active nav link on each page.
- JSON-LD `SoftwareApplication` schema on `index.html` only, per spec.
- `<title>` ≤ 60 chars on all pages; `<meta name="description">` ≤ 160 chars.
- Absolute canonical URLs and OG/Twitter URLs on all 8 pages.
- All interactive elements have `prefers-reduced-motion` guarded animations.
- Touch targets ≥ 48×48px on mobile nav.
- Focus rings: 2px celadon with 2px washi-white offset, per kit.accessibility.focus_style.

---

## Known Follow-ups

- [ ] Download Google Fonts as local WOFF2 and declare via `@font-face` (eliminates CDN dependency)
- [ ] Rasterize `img/og.svg` → `img/og.png` for Twitter Card compatibility
- [ ] Add seasonal variant CSS override blocks to `theme.css`
- [ ] Run full lint suite: `npm run lint && npm run linkcheck && npm run a11y`
- [ ] Spawn reviewer agents across all 12 dimensions per review loop spec

---

## Metadata

| Field | Value |
|-------|-------|
| `kit.name` | Bamboo Sanctuary |
| `kit.slug` | bamboo-sanctuary |
| `kit.version` | 1.0 |
| `site.pages` | 8 |
| `site.kit_type` | base |
| `site.schema_version` | 2.0 |
| `site.built` | 2026-06-30 |
| `site.layout_archetype` | Immersive/Showcase |
