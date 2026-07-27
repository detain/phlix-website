# BUILD_LOG.md — Autumn Harvest

## What was built

Regenerated the full `autumn-harvest` brand-kit site following the narrative-scroll archetype. All 9 pages (8 canonical + 404.html), 3 CSS files, 1 JS file, robots.txt, sitemap.xml, SITE.md, BUILD_LOG.md, and REGEN_PLAN.md.

## Files produced

- `index.html` — Home page with 5 narrative sections (welcome, why, features, proof, gather)
- `features.html` — All 8 features from content.json
- `clients.html` — 5 clients (Roku, Samsung Tizen, Windows, Mobile beta, DLNA)
- `download.html` — Install commands from content.json (primary, with-https, from-source)
- `plugins.html` — Plugin system + code contract + reference link
- `docs.html` — 6 doc section links to VitePress docs site
- `hub.html` — Hub description + source links
- `about.html` — Story + 6 FAQ items with `<details>` pattern
- `404.html` — Warm not-found page with recovery links to home/features/download
- `css/base.css` — Tokens, reset, @font-face (9 declarations), skip-link, visually-hidden
- `css/theme.css` — Typography classes, layout containers, hero, sections, footer
- `css/components.css` — All UI components: nav, buttons, cards, FAQ, mascot, badges
- `js/main.js` — Nav toggle, reduced-motion listener, scroll reveals, Mabel mascot, 3 easter eggs
- `robots.txt` — References sitemap.xml
- `sitemap.xml` — All 8 canonical pages with absolute canonical URLs
- `SITE.md` — Full design rationale
- `BUILD_LOG.md` — This log
- `REGEN_PLAN.md` — Field mapping + decisions

## Deviations / notes

1. **Mabel mascot:** The kit declares `mabel.behavior` with placement, idle animation, tips, and easter interactions. No raster artwork exists in `img/` for Mabel. Created a simple inline SVG representation of Mabel (maple leaf figure in cream sweater + plaid scarf, holding cider mug) for use as the companion bubble + figure on Home, Features, Download, and About. This is a placeholder; if real mascot artwork is rendered later, replace the inline SVG.

2. **Install command:** Copied verbatim from `shared/content.json` → `install.primary.command`. The `from_source` block explicitly labelled "not an install" per kit rule.

3. **@copyright placement:** Fixed to be inside the banner comment on each CSS/JS file per §19.24 selfcheck rule.

4. **Strong emphasis:** Kit caps Lora at 400/500 weight. Added `--color-text-accent: #b05016` as second channel for `<strong>` (5.26:1 on bg #f7edd8) per §19.17.

5. **Seasonal variants:** `seasonal_activation` mode is `live-js`. No seasonal motif assets exist in `img/seasonal/`. Seasonal banner slot `[data-season-slot]` is present in markup but empty — the live JS date-gating is not implemented since no SVG motif assets exist.

6. **Hero leaf decorations:** Inline SVG maple leaves in hero (4 decorations) — not from `img/` but created as CSS/SVG-only artwork per new_site.md §8 preference.

7. **Contrast:** All text pairs checked against the measured contrast table in the brief. Secondary (#d4601a) fails small-text AA on harvest cream (#f7edd8) — safe substitute `#b05016` used for any body-size secondary text role.

## Verification

```bash
node tools/gen-og.mjs --site autumn-harvest
node tools/gen-sitemap.mjs --site autumn-harvest
node tools/selfcheck.mjs --site autumn-harvest
node tools/render-check.mjs --site autumn-harvest
```

---
@copyright 2026 Joe Huss <detain@interserver.net>
