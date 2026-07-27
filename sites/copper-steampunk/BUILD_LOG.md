# BUILD_LOG.md — copper-steampunk

## What was built

Full regeneration of the Copper Steampunk brand-kit site. All 9 pages + CSS + JS + docs generated fresh.

## Pages

| Page | Status | Notes |
|------|--------|-------|
| index.html | ✅ | 5 narrative sections: boiler-rise, the-apparatus, why-this-workshop, proof-of-craft, commission-now |
| features.html | ✅ | All 8 features with detail layout, `data-gauge` for easter-egg hover-hold |
| clients.html | ✅ | 5 clients including DLNA; beta badge on Mobile |
| download.html | ✅ | Server commission block + client cards + ecosystem list |
| plugins.html | ✅ | LifecycleInterface + manifest model, link to phlix-plugin-example |
| docs.html | ✅ | Summary + link-out; ecosystem list |
| hub.html | ✅ | 3 hub features with inline SVG illustrations |
| about.html | ✅ | Philosophy, license (verbatim from content.json), contributing, FAQ × 9 |
| 404.html | ✅ | Cogsworth-broken-gear scene, all 3 recovery_links, `noindex` |
| expedition-guide.html | ✅ | Extra page: 6-step guided walkthrough from content.json facts |

## CSS

| File | Status | Notes |
|------|--------|-------|
| css/base.css | ✅ | Full token layer: 10 color roles, spacing scale, radius, font-face (10 faces, pool WOFF2 only), reset, element defaults, visually-hidden, skip-link, reduced-motion |
| css/theme.css | ✅ | Typography roles, hero/pitch/features/cta structure, homepage narrative sections, hub-feature grid, visitor-paths fork, grid helpers (minmax 0,1fr) |
| css/components.css | ✅ | Header/nav (gear animation, copper underline), footer (3-col + utility row + intensity toggle), all 6 button variants, badges, cards, forms, FAQ items, Cogsworth, copper divider, seasonal banner |

## JavaScript

| File | Status | Notes |
|------|--------|-------|
| js/main.js | ✅ | Seasonal activation, intensity toggle (localStorage), mobile nav toggle, reduced motion listener (change, not just load), scroll reveals, logo-clicks:5 egg, typed-word:catalogue egg (disabled in inputs, exits on Esc), hover-hold:2s on `[data-gauge]`, Cogsworth mascot (session dismiss, 4 contextual tips, idle key-wind animation), toast notification system |

## Other files

| File | Status | Notes |
|------|--------|-------|
| robots.txt | ✅ | Sitemap reference |
| sitemap.xml | ✅ | 9 pages (excludes 404) |
| REGEN_PLAN.md | ✅ | Full manifest |
| SITE.md | ✅ | Design rationale |
| BUILD_LOG.md | ✅ | This file |

## Seasonal motif SVG assets

- `seasonal_activation.motif_assets[]` declares 3 seasonal SVG motif files but these assets do not exist in the built site — per new_site.md §4.1 this is not a defect.

## Intentional deviations from default template

- Nav uses 6 items with 3 emphasis levels (default/primary/muted) + demoted plugins/docs to footer
- Homepage uses 5 named sections in specific order per `homepage_narrative`
- Hero uses kit copy_overlay voice throughout
- Footer includes intensity toggle in utility row + mirrored nav index
- Cogsworth mascot on home/features/download per `mascot.behavior.placement`
- 3 easter eggs wired per `easter_eggs`
- Seasonal live-js activation
- Visitor paths fork near hero

## Font notes

- Cinzel Decorative 900 NOT vendored (exists in pool but not declared by this kit)
- Crimson Text 700 NOT vendored (exists in pool but not declared by this kit)
- Install command copied verbatim from content.json.install.primary.command

## Artwork

- img/ already contained: logo.svg, favicon.svg, og.svg, og.png, icon-192.png, icon-512.png, icon-32x32.png, favicon-16x16.png, apple-touch-icon.png, favicon-32x32.png — all correct, untouched
- img/PROMPTS.md untouched
- No new imagery was generated; the kit asks for CSS/SVG-only artwork per spec

## Verification

```bash
node tools/gen-og.mjs --site copper-steampunk
node tools/gen-sitemap.mjs --site copper-steampunk
node tools/selfcheck.mjs --site copper-steampunk
node tools/render-check.mjs --site copper-steampunk
```
