# BUILD_LOG.md — manga-studio

## What was built

Full regeneration of the manga-studio brand-kit site, implementing all 20 declared experience fields.

## Files written / overwritten

- `REGEN_PLAN.md` — manifest of field mappings, resolutions, deviations
- `SITE.md` — design rationale and token documentation
- `BUILD_LOG.md` — this file
- `css/base.css` — reset, tokens, @font-face (font-weight:900→400 fix), overflow-wrap, @copyright header
- `css/theme.css` — typography scale, layout, page structure, manifesto/credential sections, @copyright header
- `css/components.css` — nav emphasis levels, footer mirror-nav, buttons, cards, mascot, easter overlays, intensity toggle; @copyright header
- `js/main.js` — nav toggle, reduced-motion change listener, scroll reveals, seasonal activation (live-js), intensity toggle, easter-egg:logo-clicks:5, easter-egg:typed-word:ink, Sen mascot companion, scroll panel flash
- `index.html` — 5-section home (hero-panel, craft-manifesto, hero-features, craft-proof, call-to-action) + pitch + features overview + visitor paths fork
- `features.html` — chapter-grid with 8 .feature-detail articles
- `clients.html` — device-tier cards for all 5 clients
- `download.html` — 3-act release page (server, clients, ecosystem) with verbatim install command
- `plugins.html` — LifecycleInterface + manifest contract explanation
- `docs.html` — link-out to docs site + ecosystem list
- `hub.html` — Hub relay explanation with two-panel self-host vs public comparison
- `about.html` — philosophy, license (verbatim from content.json), contributing, FAQ letters-to-Sen
- `404.html` — "Missed Deadline" gag: Sen + blank panel SVG, recovery links, `noindex` meta

## Deviations / notes

1. **Black Han Sans weight**: kit asks for `font-weight: 900` but only `black-han-sans-400-latin.woff2` exists in the shared font pool. `@font-face` declares `font-weight: 400`; the browser synthesises the display weight. Noted in REGEN_PLAN.md §5.

2. **Impact Yellow contrast**: `#FFD000` on `#F8F8F4` = 1.38:1 (fails AA). Used for decorative badges/accents only; `--color-secondary-text` token set to `#876e00` for any text use.

3. **No 900 weight file for number role**: same as #1 — using Black Han Sans 400.

4. **Strong emphasis**: `<strong>` uses `font-weight: 700` from Noto Sans JP 700 (declared and available in pool).

5. **Seasonal assets**: `seasonal_activation.motif_assets` (`img/seasonal/*.svg`) are requested but do not exist in img/ — noted as "artwork that does not exist, write one line in BUILD_LOG.md and move on" per instructions.

## Verification

- `node tools/gen-og.mjs --site manga-studio` — generates img/og.png from img/og.svg
- `node tools/gen-sitemap.mjs --site manga-studio` — generates sitemap.xml and robots.txt
- `node tools/selfcheck.mjs --site manga-studio` — 17 static checks
- `node tools/render-check.mjs --site manga-studio` — real browser at 320px and 1280px
