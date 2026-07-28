# BUILD_LOG.md — Obsidian Pulse

## Build summary

- **Date**: 2026-07-27
- **Author**: Coder Agent (autonomous)
- **Tool version**: phlix-website `regen_site_prompt.md` workflow

## What was built

Regenerated `obsidian-pulse` brand-kit site from scratch per `regen_site_prompt.md` STEP 1–4.

### Pages (9)

- `index.html` — Home (5-section narrative: hero signal / core features / precision proof / client hardware / download station)
- `features.html` — Features (8 feature cards + support/footnote + CTA)
- `clients.html` — Clients (5-device rack: Roku, Tizen, Windows, Mobile, DLNA)
- `download.html` — Download (workbench: server install one-liner + client selector + ecosystem shelf)
- `hub.html` — Hub (how-it-works steps + hub features + CTA)
- `about.html` — About (philosophy / license / contributing / FAQ / persona vignettes)
- `plugins.html` — Plugins (reference plugin + extensibility grid)
- `docs.html` — Documentation (docs links → VitePress site)
- `404.html` — Error page (dark, "Signal not found", recovery links, noindex)

### Assets

- `css/base.css` — Reset, @font-face (10 declarations), CSS tokens
- `css/theme.css` — Color/spacing/radius/shadow tokens, typography utility classes
- `css/components.css` — All component styles: nav, buttons, cards, hero (scan line animation), spec-band, device-rack, footer, 404, easter egg glow
- `js/main.js` — Mobile nav toggle, clipboard copy, easter egg (logo-clicks:5), seasonal live-js activation
- `SITE.md` — Design decisions and token documentation
- `REGEN_PLAN.md` — Compact change manifest

## CSS rules from §19.12 — applied from start

1. `grid-template-columns: repeat(n, minmax(0, 1fr))` — no bare `1fr` tracks
2. `overflow-wrap: anywhere` on `p, li, dt, dd, a, span, code, kbd, samp, pre`
3. `hyphens: auto; overflow-wrap: break-word` on `h1–h6, blockquote`
4. No `overflow: hidden` on containers whose text must reflow

## Fonts resolved

All 6 families confirmed in `shared/assets/fonts/`: DM Sans (300,400,500), Space Grotesk (300,400), Inter (400,500,600), JetBrains Mono (400,500).

## Licenses applied

- Phlix Server + Phlix Hub: **MPL-2.0** — footer link → `https://github.com/detain/phlix-server/blob/master/LICENSE`
- Plugins + clients + shared libs: **MIT**
- Never stated "across the board" or "no strings attached"

## Install command

Verbatim from `content.json.install.primary.command` — not retyped:

```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

## Sibling comparison (same archetype: minimal)

- `bamboo-sanctuary` — regenerated; used for structural comparison only

## CSS @copyright compliance (§19.24)

`grep -n "^ \* @" sites/obsidian-pulse/css/*.css` — confirmed empty.

## Notes

- `@font-face` declarations placed in `base.css` per convention
- `og:image` generated via `node tools/gen-og.mjs --site obsidian-pulse` (not committed as SVG)
- `sitemap.xml` + `robots.txt` generated via `node tools/gen-sitemap.mjs --site obsidian-pulse`
- `selfcheck` and `render-check` results recorded after fix round
