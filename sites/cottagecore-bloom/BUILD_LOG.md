# BUILD_LOG.md — cottagecore-bloom

## What was built

### Pages (9)
- `index.html` — Home (narrative-scroll with 6 sections, visitor paths fork, mascot, intensity toggle)
- `features.html` — Features (garden-room-tour, 8 feature details)
- `clients.html` — Clients / Guest Rooms (5 client cards with highlights and repo links)
- `download.html` — Download (seed-planting, 3 steps, server install snippet, client picks, ecosystem)
- `plugins.html` — Plugins (LifecycleInterface + manifest, ecosystem, write-your-own)
- `docs.html` — Docs (4 link-out cards, ecosystem list)
- `hub.html` — Hub / The Gatehouse (what/host/clients sections)
- `about.html` — About / Our Story (philosophy, licence from content.json verbatim, contributing, FAQ)
- `seasons.html` — Extra page (3 seasonal variant cards with colour swatches)
- `404.html` — Error page (Primrose alone in empty garden SVG, "This bloom didn't take", recovery links, `noindex`)

### Styles (3)
- `css/base.css` — Reset, tokens, `:root`, base element styles, skip-link, focus ring, reduced-motion
- `css/theme.css` — Font faces, typography scale, layout containers, botanical divider, code-block, scroll reveal, proof section, visitor paths
- `css/components.css` — Header/nav, buttons, cards (feature/client/download), badges, forms, footer, intensity toggle, hero, mascot, easter eggs, FAQ, seasonal banner, error page, guest rooms grid, ecosystem list, seasons cards

### JavaScript (1)
- `js/main.js` — Seasonal activation, scroll reveal, mobile nav, intensity toggle, mascot (Primrose) with idle float + hover-hold tip + dismiss + localStorage + click-easter-egg, typed-word easter egg (`garden`), logo click easter egg, FAQ accordion, visitor paths redirect

### Assets
- `img/favicon.svg` — Primrose bee silhouette favicon, Garden Rose on warm ivory, 32×32
- `img/og.svg` — 1200×630 social share card (editable source; rasterise to `og.png` with `node tools/gen-og.mjs --site cottagecore-bloom`)

### Config
- `robots.txt` — References sitemap
- `sitemap.xml` — 9 canonical URLs (404.html excluded as `noindex`)
- `REGEN_PLAN.md` — Field mapping, nav diff, home section order, carry-forwards, ambiguities
- `SITE.md` — Design rationale, palette, typography, motion, assets
- `BUILD_LOG.md` — This file

## Intentional Deviations from Default

1. **Nav labels**: All 6 kit nav labels used verbatim ("The Garden", "What Grows Here", etc.) — predecessor had no kit labels
2. **Extra page `seasons.html`**: Created per `site_architecture.extra_pages` — not in the default 8
3. **Plugins/docs in footer only**: Demoted per `site_architecture.demoted_pages`; pages still exist and are linked in footer
4. **Visitor paths fork**: Added after hero per `visitor_paths` field — not part of the default template
5. **Mascot Primrose**: Built per `mascot.behavior` — desktop fixed bottom-right, mobile in-flow, hover-hold tip, localStorage dismissal
6. **Intensity toggle**: "Quiet the Garden" in footer per `intensity_toggle`
7. **Seasonal CSS overrides**: `[data-season]` attribute on `<html>` triggers live CSS token changes via `main.js` date gate
8. **Strong colour**: `--color-strong: #6b2a1a` added for `<strong>` per §19.17 (Lora 500 alone at 100-unit step is imperceptible)

## Contrast Fixes Applied (§19.1)

- `--color-primary-safe: #ba4f63` derived from primary #C8556A — 4.5:1+ on ivory (primary at 4.02:1 fails small text)
- `--color-secondary-safe: #5e7a52` derived from secondary #7A9E6B — 4.5:1+ on ivory (secondary at 2.88:1 fails both)

## Font Notes

- Lora 600/700 files exist in shared pool but NOT vendored — declared weights are 400 and 500 only
- Nunito 700 NOT vendored despite pool file — declared weights 400, 500, 600 only
- Playfair 900 for `number` role NOT vendored — `number` uses 700

## Follow-ups Required

1. **`node tools/gen-og.mjs --site cottagecore-bloom`** — Rasterise `img/og.svg` to `img/og.png` (1200×630 PNG) before deployment
2. **`node tools/gen-sitemap.mjs --site cottagecore-bloom`** — Regenerate sitemap + robots with final URLs (already manually written, but re-run for validation)
3. All 9 pages need their actual screenshot/artwork assets — currently using CSS-only botanical motifs and inline SVG illustrations; real raster artwork would elevate the visual fidelity
4. The install command on `download.html` uses the raw GitHub URL; if the install script URL changes, update `content.json.install.primary.command` and this page
