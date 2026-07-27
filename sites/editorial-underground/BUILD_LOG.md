# BUILD_LOG.md — editorial-underground

## What was built

Regenerated `editorial-underground` brand-kit site from scratch following the zine archetype.
Full 9-page static site: index, features, clients, download, plugins, docs, hub, about, 404.

## Deviations from spec

None intentional. All deviations are listed below.

## Kit ambiguities resolved

| Ambiguity | Resolution |
|-----------|-----------|
| Oswald font weight 500 requested in kit but no 500 file exists | Used 700 (nearest available, also declared in kit) |
| Kit's `conversion_funnel.cta_ladder` shows "[object Object]" strings | Ladder has 3 rungs: Take It → Pick a client → Paste and run. Wire hrefs to download/clients/download#server |
| `easter_eggs` second trigger "typed-word:phlix" vs `typed-word:riot` | Both implemented: "phlix" highlights word on page; "riot" triggers Riot's lightning flash |

## Artwork notes

Kit asks for `seasonal_variants[0].motif_assets` (seasonal SVG assets) and `img/seasonal/` assets — no such files exist in `img/`. Recorded one line below per spec §14.

**`img/seasonal/countdown-numerals.svg`:** requested by kit, does not exist. Not a defect — kit only asks for it as motif asset under seasonal activation.

**`img/seasonal/torn-newsprint-confetti.svg`:** requested by kit, does not exist. Same note.

**`img/seasonal/skull-halftone-stencil.svg`:** requested by kit, does not exist. Same note.

**`img/seasonal/crossed-heart.svg`:** requested by kit, does not exist. Same note.

## Technical notes

- All fonts self-hosted from `../../assets/fonts/` (WOFF2). No CDN references.
- `@font-face` for `anton-400`, `oswald-700`, `space-mono-400`, `space-mono-700` — only declared weights.
- CSS custom properties in `:root` from `design_tokens`.
- `minmax(0, 1fr)` on all grid tracks (not bare `1fr`) per §19.12.
- `overflow-wrap: anywhere` on `p, li, dt, dd, a, span, code, kbd, samp, pre` per §19.12.
- `@copyright 2026 Joe Huss <detain@interserver.net>` present in all 3 CSS files and `js/main.js`.
- No `stylelint --fix` run. Lint fixes applied by hand.
- Seasonal variant applies in JS at load: October (Punk Magenta primary), Feb 10-14 (Punk Magenta primary), Dec 28–Jan 3 (default colors).
- Konami code easter egg disabled in inputs/textarea/contenteditable; never calls `preventDefault`; exits on Esc.
- Typed-word easter egg same guard conditions; exits on Esc.
- Mascot dismissal persists via `localStorage`.

## Install command

Verbatim from `content.json.install.primary`:
```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```
Never retyped. `from_source` correctly labeled as "development, not an install" and not presented as the install method.

## Experience fields implemented

All 18 declared fields implemented: `site_architecture`, `homepage_narrative`, `page_blueprints`, `copy_overlay`, `feature_casting`, `copy_treatments`, `faq_experience`, `hero_experience`, `navigation_model`, `scroll_experience`, `easter_eggs`, `conversion_funnel`, `proof_strategy`, `experience_archetype`, `complexity_profile`, `seasonal_activation`, `error_page_experience`, `persona_vignettes`, `mascot.behavior`.

2 absent fields carry defaults: `visitor_paths` (null), `intensity_toggle` (null).

## Quality gates run

- `node tools/gen-og.mjs --site editorial-underground`
- `node tools/gen-sitemap.mjs --site editorial-underground`
- `node tools/selfcheck.mjs --site editorial-underground`
- `node tools/render-check.mjs --site editorial-underground`
