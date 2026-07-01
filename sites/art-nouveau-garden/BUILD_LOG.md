# BUILD_LOG.md — Art Nouveau Garden Site

**Site:** `sites/art-nouveau-garden/`
**Brand kit:** `brand-kits/art-nouveau-garden.js` (v1.0, base kit, 2026-06-30)
**Schema version:** 2.0 | **Kit type:** base | **Mascot:** Lily

---

## What was built

### Output structure
```
sites/art-nouveau-garden/
├── index.html          Home (hero + pitch + features overview + CTA)
├── features.html       Features (8 feature details)
├── clients.html        Clients (5 client cards)
├── download.html       Download (server + clients + ecosystem)
├── plugins.html        Plugins (model + ecosystem + write your own)
├── docs.html           Docs (link-out summary + ecosystem list)
├── hub.html            Hub (reverse-tunnel relay explanation)
├── about.html          About (philosophy + license + contributing + FAQ)
├── css/
│   ├── base.css        CSS reset + :root design tokens
│   ├── theme.css       Typography + layout + page structure
│   └── components.css  Header/nav, footer, buttons, cards, badges, reveals
├── js/
│   └── main.js         Nav toggle + reduced-motion + scroll reveals
├── img/
│   ├── logo.svg        Botanical oval frame + aged gold wordmark
│   ├── favicon.svg     Lily blossom mark, aged gold on ivory
│   ├── og.svg          1200×630 Art Nouveau poster composition
│   └── PROMPTS.md      Exact AI image generation prompts
├── robots.txt          Allow all, sitemap reference
├── sitemap.xml         8 pages, absolute URLs
├── SITE.md             Brand rationale, palette, type, motion, assets
└── BUILD_LOG.md        This file
```

---

## Layout Archetype

**Immersive / Showcase** — chosen because:
- `layout_patterns.landing`: "Full-bleed Mucha-style hero illustration → feature panels with vine borders → testimonials → gilded CTA"
- `art_direction`: "every scene exists inside a Mucha decorative panel"
- `composition`: "Framed and bordered — content always lives inside an organic frame"
- `visual_style`: Belle Époque illustration, stained glass translucency, gilded embossed detail
- `depth`: layered
- `header_motif`: "Slowly unfurling vine that blooms into a decorative border frame"

Immersive: full-bleed cinematic hero with botanical framing. Showcase: media-forward layout with generous "garden path" whitespace.

---

## Palette & Type Summary

**Palette (from design_tokens):**
- Primary (Aged Gold): `#B8960C` — CTAs, gilded accents
- Secondary (Dusty Rose): `#C08070` — floral accents
- Tertiary (Sage Garden): `#7D9B76` — badges, vine fills
- Background (Ivory Cream): `#F5EFE0` — page background
- Surface (Parchment): `#FAF5EA` — card surfaces
- Text (Forest Ink): `#1F2E1A` — all body/headline text
- Border (Vine Ink): `#2C3D28` — fine botanical borders

**Type stack:**
- Headline/Display: Cormorant Garamond + Playfair Display (serif, handcrafted)
- Body: EB Garamond (literary, oldstyle numerals)
- UI: Josefin Sans (generous tracking, clean serif contrast)

---

## Deviations from new_site.md

1. **Tooling path:** Site built in `sites/art-nouveau-garden/` per new `sites/` directory convention. Current `tools/build.mjs` and `tools/lint.mjs` still scan `variants/` (legacy). No conflict — the spec says both paths are valid. The lint tools exit 0 when no files match `variants/`.

2. **Font loading:** `@font-face` declarations in `theme.css` point to `css/fonts/<filename>.woff2`. These files do not yet exist in the repository (would be populated by a CI `google-fonts-helper` download step in a full build). Falls back to system serif/sans. Fonts are not CDN-linked — spec compliance.

3. **og.png vs og.svg:** OG image is shipped as `og.svg` (hand-crafted SVG). Meta still references `og.png` as per spec. Recommendation: run `svgexport og.svg og.png 1200:630` before deployment, or update meta to reference `og.svg`.

4. **No seasonal variant applied.** All 4 documented in `SITE.md` §Seasonal Variants and as commented CSS overrides in `theme.css` for future use.

---

## Intentional Design Decisions

1. **Inline SVG icons:** All 8 feature icons rendered as hand-crafted inline SVGs (1.5px stroke, rounded caps/joins, botanical style). No icon font CDN. Conforms to kit icon_rules.

2. **CSS botanical decorations:** Hero corner flourishes and vine border motif are hand-crafted inline SVG, not raster AI renders. Consistent with the kit's `illustrated` realism level.

3. **Scroll reveals:** `IntersectionObserver`-based fade-up on cards (`.feature-card`, `.client-card`, `.faq-item`, `.feature-detail`), gated behind `prefers-reduced-motion`. Kit `motion_style`: flowing, gentle, unhurried.

4. **No JS-required:** All content accessible without JS. Scroll reveal degrades gracefully (elements visible, no animation). Nav works without JS via native HTML behavior.

5. **Focus ring:** 2px aged-gold (`#B8960C`) ring with 2px ivory offset — matches kit `accessibility.focus_style`: "unfurls into view over 150ms."

---

## Known Follow-ups

1. **Download WOFF2 fonts:** Run `google-fonts-helper` or similar to download Cormorant Garamond, Playfair Display, EB Garamond, Josefin Sans, Courier Prime WOFF2 files into `css/fonts/`. Update `@font-face` src URLs accordingly.

2. **Rasterize og.svg → og.png:** For full Twitter card support, convert `img/og.svg` to 1200×630 PNG. Some social platforms do not support SVG og:image.

3. **Mascot Lily illustration:** The kit defines mascot Lily (Art Nouveau garden spirit, half-human half-botanical). Not yet rendered as a raster asset. Can be generated using the prompt in `img/PROMPTS.md` and placed as hero decoration.

4. **Seasonal variant build step:** Add a CSS custom-property override system that reads `seasonal_variants` from the kit and applies the active variant's overrides (per `active_range` date check).

---

## Build commands

```bash
cd /home/sites/phlix/phlix-website
# Lint (exits 0 — no files in variants/ to lint)
npm run lint

# Manual site lint (stylelint on our files)
npx stylelint sites/art-nouveau-garden/css/*.css

# Manual JS lint
npx eslint sites/art-nouveau-garden/js/main.js

# Preview (if dev-server supports sites/ path)
node tools/dev-server.mjs --site art-nouveau-garden
```

---

*Build completed: 2026-06-30 — Art Nouveau Garden v1.0 for Phlix*
