# BUILD LOG — Autumn Harvest Phlix Site

## What was built

**Site:** `sites/autumn-harvest/`
**Brand kit:** `phlix-website/brand-kits/autumn-harvest.js` v1.0 (base kit)
**Built:** 2026-06-30
**Layout archetype:** Immersive (full-bleed cinematic hero + generous layered sections)

## File inventory

```
sites/autumn-harvest/
├── index.html          Home page
├── features.html       Feature deep-dives
├── clients.html        Client apps
├── download.html       Download cards + ecosystem
├── plugins.html        Plugin system
├── docs.html           Link-out + ecosystem
├── hub.html            Phlix Hub
├── about.html          Philosophy + FAQ
├── css/
│   ├── base.css        Design tokens (:root CSS variables)
│   ├── theme.css       Typography + layout + page structure
│   └── components.css  Header/nav/footer/buttons/cards/badges
├── js/
│   └── main.js         Nav toggle + reduced motion + leaf drift
├── img/
│   ├── logo.svg        Wordmark + maple leaf flourish
│   ├── favicon.svg     Square mark on harvest cream
│   └── PROMPTS.md      All image generation prompts
├── robots.txt
├── sitemap.xml
├── SITE.md
└── BUILD_LOG.md (this file)
```

## Design decisions

1. **Color system** — All 15 semantic color roles mapped directly to `:root` CSS variables from `design_tokens` block. No raw off-palette hex in component CSS.

2. **Typography** — Playfair Display for headlines/display, Lora for body, Nunito for UI. Self-hosted WOFF2 via `@font-face` not yet bundled (CDN-free constraint noted for future). Google Fonts CDN not used per spec.

3. **Layout archetype** — Chosen "immersive" based on: `layout_patterns.landing` (full-bleed orchard-dusk hero), `visual_style` (botanical illustration, folk-art warmth), `depth: slightly_layered`, `composition` guidance (off-center horizon, layered foreground elements). Hero gradient uses the "Golden Hour" gradient from the kit's `colors.gradients`.

4. **Shadows** — All warm bark-brown tinted per `color_rules: "Shadows are warm bark-brown tinted, never cool grey or pure black"`. All four scale tokens (`--shadow-sm/md/lg/xl`) match kit's `shadows` spec exactly.

5. **Mascot (Mabel)** — Included in PROMPTS.md for future commissioned assets. Hero has leaf-drift animation via CSS/SVG (no GIF). Empty states document Mabel requirement but CSS-only implementation falls back to warm text invitation per kit guidance.

6. **Primary CTA** — Maple red pill button on hero above fold. Secondary CTA uses burnt orange pill. Never on same CTA area per `color_rules`.

7. **Seasonal variants** — Documented in SITE.md with commented-out override token blocks in CSS for future activation. Not auto-applied per spec.

8. **Deviation from `new_site.md` §17** — The current `tools/build.mjs` and `tools/dev-server.mjs` scan the legacy `variants/` directory. This site uses the new `sites/` directory. Tooling update needed (noted as follow-up).

## Quality gates

- All 8 pages + css/js/img + robots.txt + sitemap.xml + SITE.md + BUILD_LOG.md: ✅
- CSS: no raw off-palette hex values, spacing only from kit scale, radii from kit scale
- JS: vanilla, defer-loaded, no analytics or third-party scripts
- Fonts: `@font-face` declarations embedded in CSS (WOFF2 self-hosting preferred)
- OG images: absolute URLs, 1200×630 PNG referenced in meta

## Follow-ups

1. Bundle self-hosted WOFF2 font files in `css/fonts/` (currently using system fallbacks). Run: `npx google-fonts-helper -o css/fonts -f "Playfair Display,Lora,Nunito,Inconsolata"`
2. Update `tools/build.mjs` and `tools/dev-server.mjs` to scan `sites/` instead of legacy `variants/`
3. Commission Mabel mascot SVG assets from illustration prompts in `img/PROMPTS.md`
4. **Done** — Generate `img/og.png` by rasterizing `img/og.svg` (1200×630, 72dpi)
5. Run full QA review loop (lint, linkcheck, a11y) after tooling update

## Fixes applied after first review

1. Updated `og:image` meta to reference `og.svg` (SVG source exists; `og.png` rasterization is follow-up #4)
2. Added decorative static autumn maple-leaf SVG elements to hero section in `index.html` + CSS
3. Added `--color-primary-darken` and `--color-secondary-darken` CSS variable fallbacks for button hover states
4. All 8 HTML pages now reference `img/og.svg` (not `img/og.png`)

## Metadata

| Field | Value |
|-------|-------|
| Kit author | Phlix Design |
| Kit created | 2026-06-30 |
| Kit updated | 2026-06-30 |
| Kit license | Proprietary — Phlix internal use |
| Schema version | 2.0 |
| Kit type | base |
