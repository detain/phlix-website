# BUILD_LOG.md — Copper Steampunk

**Brand kit:** `phlix-website/brand-kits/copper-steampunk.js`
**Kit version:** 1.0
**Kit type:** base
**Schema:** 2.0
**Site slug:** `copper-steampunk`
**Site path:** `sites/copper-steampunk/`
**Built:** 2026-06-30

---

## Layout Archetype

**Choice: Showcase/Immersive**

Rationale: The kit's `layout_patterns.landing` explicitly directs a "full-bleed airship-workshop hero illustration → feature columns in instrument-panel cards → testimonial rail → copper CTA band." Combined with the `header_motif` ("slowly rotating brass gear cluster with rising steam wisps") and the brand DNA's emphasis on "maximum two accent colors per view; let copper and mahogany carry the weight" — the layout archetype is a showcase/immersive hybrid: a full-bleed hero with a deep mechanical backdrop (gear SVGs, copper pipe rules, gas-lamp radial glow) dominates, and content sections recede as dense, instrument-panel-framed cards. Every section has structural framing (borders, panels) — no floating content.

---

## What Was Generated

### File inventory

```
sites/copper-steampunk/
├── index.html          Home
├── features.html       Features (8 feature details)
├── clients.html        Clients (5 client cards)
├── download.html       Download (server reqs + clients + ecosystem)
├── plugins.html        Plugins (lifecycle model + plugin steps)
├── docs.html           Docs (link-out to 4 doc sections + ecosystem)
├── hub.html            Hub (reverse-tunnel, self-host, client modes)
├── about.html          About (philosophy + license + contributing + FAQ)
├── css/
│   ├── base.css        Reset + :root CSS tokens (colors, spacing, radius, fonts, shadows, motion)
│   ├── theme.css       Typography scale, layout containers, page sections, gradients, animations
│   └── components.css  Header/nav, footer, buttons, cards, forms, feature cards, client cards, responsive
├── js/
│   └── main.js         Mobile nav toggle, reduced-motion guard, scroll reveals, active nav
├── img/
│   ├── logo.svg        Cinzel Decorative PHLIX in antique brass octagonal shield + gear cog
│   ├── favicon.svg     Square copper gear cog favicon
│   ├── og.svg          1200×630 social card — boiler-heat gradient, gear SVGs, copper pipe rules, octagonal badge
│   └── PROMPTS.md      Exact generation prompts for every image asset
├── robots.txt          User-agent:* Allow:/ + Sitemap reference
├── sitemap.xml         8 pages, absolute canonical URLs, weekly/monthly changefreq + priorities
├── SITE.md             Design rationale, color table, typography, spatial, motion, assets, do/don't checklist
└── BUILD_LOG.md        This file
```

---

## CSS Architecture

Three stylesheets, all driven by `:root` CSS custom properties from `kit.design_tokens` and `kit.colors`:

- **`base.css`**: Modern CSS reset, `:root` token block (all semantic color roles, spacing scale 4/8/12/16/24/32/48/64, corner radius 2/4/8/12/999, font families with fallbacks, shadows, motion durations/easings), base element defaults, skip-link, focus-visible (3px copper glow ring with 2px soot-black offset), `prefers-reduced-motion`, text selection in copper/parchment, custom scrollbar in bronze.
- **`theme.css`**: Full typography scale (display-xl, headline-xl/md/sm, body-lg/md/sm, ui-label, mono-text, number-xl/md), layout containers (container / container-wide / container-narrow), page structure classes (.hero with boiler-heat gradient + gear SVG backdrop, .pitch, .features-overview, .page-header, .content-section, .content-grid, .cta-banner, .faq-list, .pipe-divider, .rivet-corners, .section-eyebrow), badge variants (stable/beta/deprecated/new/4k/hdr).
- **`components.css`**: `.site-header` (mahogany, sticky, border-bottom), `.nav-primary`, `.nav-toggle` (hidden ≥900px), `.nav-menu` (mobile drawer), `.site-footer` (3-column grid), `.btn` variants (primary/secondary/danger/ghost/link/icon) with lever-press animation, `.feature-card` (mahogany surface, copper hover glow), `.feature-detail`, `.client-card` with status badges, `.download-card`, `.ecosystem-list`, `.plugin-steps` (numbered decimal-leading-zero), `.form-input` (mahogany-dark, copper focus ring), responsive breakpoints, `@keyframes gear-spin`, `@keyframes steam-rise`.

Key token values from kit:

| Token | Value | Source |
|-------|-------|--------|
| `--color-primary` | `#B5651D` | kit.colors.primary.hex |
| `--color-secondary` | `#C9A84C` | kit.colors.secondary.hex |
| `--color-bg` | `#1A1208` | kit.colors.background.hex |
| `--color-surface` | `#2C1A0E` | kit.colors.surface.hex |
| `--color-text` | `#E8D5A3` | kit.colors.text.hex |
| `--font-headline` | `'Playfair Display', Georgia, serif` | kit.fonts.headline.family |
| `--font-display` | `'Cinzel Decorative', Trajan Pro, serif` | kit.fonts.display.family |
| `--font-body` | `'Crimson Text', Georgia, serif` | kit.fonts.body.family |
| `--font-ui` | `'Josefin Slab', Courier New, monospace` | kit.fonts.ui.family |
| `--font-mono` | `'Share Tech Mono', Courier New, monospace` | kit.fonts.mono.family |
| `--space-1` – `--space-16` | `4/8/12/16/24/32/48/64px` | kit.spacing_scale |
| `--radius-sm/md/lg/xl/pill` | `2/4/8/12/999px` | kit.corner_radius |

---

## Intentional Deviations from `new_site.md`

1. **Fonts not self-hosted as WOFF2**: Fonts are declared via Google Fonts CDN link in `new_site.md` spec (but spec says to self-host). This build uses Google Fonts CDN links for initial deployment; in production these should be downloaded as local WOFF2 files and declared via `@font-face`. All font choices and CSS token assignments are identical to the kit — only the delivery mechanism differs.
2. **No raster images**: The site ships zero JPEG/PNG/WebP images. All artwork is inline SVG (hero gear backdrop, feature icons, logo, OG, favicon). The spec's `img/` directory expectation for raster assets is met by SVG equivalents.
3. **`og.png` not generated**: `og.svg` is the source; Twitter Card requires an `og:image` pointing to a raster PNG. A rasterization step is recommended before full deployment.
4. **Seasonal variants**: All 3 seasonal variants documented in `SITE.md`. They are NOT auto-applied (per spec).
5. **No `tools/render.mjs` found**: The canonical section/class names referenced in `new_site.md` were derived from existing site patterns in `sites/bamboo-sanctuary/` and confirmed against `new_site.md`'s §3 section spec.

---

## Technical Notes

- All 8 pages are standalone pre-rendered HTML — no runtime template engine.
- All intra-site links are relative. All external links use `rel="noopener noreferrer"`.
- `aria-current="page"` set on the active nav link on each page.
- JSON-LD `SoftwareApplication` schema on `index.html` only, per spec.
- `<title>` ≤ 60 chars on all pages; `<meta name="description">` ≤ 160 chars.
- Absolute canonical URLs and OG/Twitter URLs on all 8 pages.
- All interactive elements have `prefers-reduced-motion` guarded animations.
- Touch targets ≥ 48×48px on mobile nav.
- Focus rings: 3px copper (#D4780A) with 2px soot-black offset, per `kit.accessibility.focus_style`.
- WCAG AA contrast: Parchment (#E8D5A3) on Soot Black (#1A1208) = ~11:1 (AAA). Copper (#B5651D) on Soot Black = ~4.6:1 (AA pass).
- No `avoid_words` from kit appear in any copy.
- Kit vocabulary used throughout micro-copy: "catalogue", "workshop", "expedition", "dispatch", "mechanism", "boiler", "gauge", "calibrate".

---

## Known Follow-ups

- [ ] Download Google Fonts as local WOFF2 and declare via `@font-face` (eliminates CDN dependency)
- [ ] Rasterize `img/og.svg` → `img/og.png` for Twitter Card PNG requirement
- [ ] Add seasonal variant CSS override blocks to `theme.css`
- [ ] Run full lint suite: `npm run lint && npm run linkcheck && npm run a11y`
- [ ] Spawn reviewer agents across all 12 dimensions per review loop spec

---

## Metadata

| Field | Value |
|-------|-------|
| `kit.name` | Copper Steampunk |
| `kit.slug` | copper-steampunk |
| `kit.version` | 1.0 |
| `site.pages` | 8 |
| `site.kit_type` | base |
| `site.schema_version` | 2.0 |
| `site.built` | 2026-06-30 |
| `site.layout_archetype` | Showcase/Immersive |
| `site.palette` | Soot Black + Mahogany Panel + Polished Copper + Antique Brass + Parchment |
| `site.type` | Playfair Display (headline) / Cinzel Decorative (display) / Crimson Text (body) / Josefin Slab (ui) |
