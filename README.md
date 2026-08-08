# phlix-website

[![Pages](https://github.com/detain/phlix-website/actions/workflows/pages.yml/badge.svg)](https://github.com/detain/phlix-website/actions/workflows/pages.yml)
[![Lint](https://github.com/detain/phlix-website/actions/workflows/lint.yml/badge.svg)](https://github.com/detain/phlix-website/actions/workflows/lint.yml)
[![Link Check](https://github.com/detain/phlix-website/actions/workflows/linkcheck.yml/badge.svg)](https://github.com/detain/phlix-website/actions/workflows/linkcheck.yml)
[![Lighthouse](https://github.com/detain/phlix-website/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/detain/phlix-website/actions/workflows/lighthouse.yml)

The marketing / landing site for **[Phlix](https://github.com/detain/phlix-server)** — a self-hostable PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile.

This repo ships **one brand-themed site per brand kit**: every kit in `brand-kits/<slug>.js` gets its own subtree under `sites/<slug>/` and consumes the same shared content from `shared/content.json`, so they differ in visual language only. The earlier five-variant `variants/` tree was removed on 2026-06-30 — `tools/render.mjs` is legacy and is no longer part of the deploy path.

| Site | Brand kit | Live Preview |
|------|-----------|-------------|
| [`stellar-command`](sites/stellar-command/) | `brand-kits/stellar-command.js` | https://detain.github.io/phlix-website/stellar-command/ |
| [`storm-chaser`](sites/storm-chaser/) | `brand-kits/storm-chaser.js` | https://detain.github.io/phlix-website/storm-chaser/ |
| [`swiss-modernist`](sites/swiss-modernist/) | `brand-kits/swiss-modernist.js` | https://detain.github.io/phlix-website/swiss-modernist/ |
| [`terraform`](sites/terraform/) | `brand-kits/terraform.js` | https://detain.github.io/phlix-website/terraform/ |
| [`velocity-x`](sites/velocity-x/) | `brand-kits/velocity-x.js` | https://detain.github.io/phlix-website/velocity-x/ |
| [`void-walker`](sites/void-walker/) | `brand-kits/void-walker.js` | https://detain.github.io/phlix-website/void-walker/ |

Every other kit follows the same pattern — `brand-kits/` holds the full set, `sites/` holds the ones already built, and `npm run build` publishes `dist/<slug>/` for each kit that has a site plus a top-level gallery.

## Quick start

```bash
npm install
npm run dev                                       # every site at http://localhost:5173/<slug>/
node tools/dev-server.mjs --site abstract-canvas  # serve a single site
npm run preview                                   # kit index + all sites at http://localhost:5174/
npm run build                                     # static dist/ with each site under dist/<slug>/
npm run test                                      # unit tests + lint + link check + meta audit
```

Per-site checks used while authoring, reviewing, or fixing a site:

```bash
npm run lint                                       # htmlhint + stylelint + eslint
npm run a11y                                       # pa11y-ci sweep
npm run meta                                       # per-page SEO / social meta audit
node tools/kit-brief.mjs --site <slug>             # everything an authoring agent needs, in one call
node tools/render-check.mjs --site <slug> --shots  # real-browser render defects + PNGs
```

No PHP, no backend — the site is pure static HTML/CSS/JS. The Phlix server itself lives in [`detain/phlix-server`](https://github.com/detain/phlix-server).

## Repo layout

```
phlix-website/
├── brand-kits/<slug>.js      one brand kit per site: palette, type, motion, voice
├── brand-kits/expected-kits.json
│                             the pinned list of kits the build expects (see below)
├── shared/
│   ├── content.json          single source of marketing copy
│   ├── data/                 brand-kits.json, font-sources.json
│   └── assets/fonts/         vendored OFL font families + OFL.txt
├── sites/<slug>/
│   ├── index.html
│   ├── features.html
│   ├── clients.html
│   ├── download.html
│   ├── plugins.html
│   ├── docs.html             link-out + summary
│   ├── about.html
│   ├── hub.html
│   ├── 404.html
│   ├── SITE.md               kit brief the site was built from
│   ├── BUILD_LOG.md
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── css/
│   ├── js/
│   ├── img/                  site-specific brand artwork
│   └── reviews/
├── reviews/<slug>/           review outputs (one md file per dimension)
├── tools/                    dev-server, build, lint, a11y, og, sitemap, kit-brief
├── new_site.md               brand-agnostic rulebook: what a site must contain
├── orchestrator_prompt.md    agent pipeline driver (spawns author/review/fix workers)
├── new_site_prompt.md        author-worker prompt
├── regen_site_prompt.md      regenerate an existing site against its kit's experience schema
├── review_site_prompt.md     review-worker prompt
├── fix_site_prompt.md        fix-worker prompt
├── docs/
│   ├── PLAN.md               full architecture + agent pipeline
│   ├── AGENT_CONTRACTS.md    worker input/output contracts
│   ├── REVIEW_RUBRICS.md     scoring rubric per review dimension
│   └── HANDOFF_PROMPT.md     paste-into-fresh-session kickoff prompt
└── .github/workflows/
    ├── pages.yml             deploy sites to GH Pages
    ├── lint.yml              html/css/js + a11y
    ├── linkcheck.yml         broken-link sweep
    └── lighthouse.yml        Lighthouse CI budgets
```

## Brand source of truth

Brand kits, taglines, and prompt language live in
[`phlix-server/docs/brand/`](https://github.com/detain/phlix-server/tree/master/docs/brand):
`brand_identity.md`, `logo_concepts.md`, `dash_ui_prompts.md`, `svg_prompts.md`.
Sites must consume those plus their own `brand-kits/<slug>.js` — do not invent
new colors, fonts, or voice.

## Image generation

No AI image-generation model is currently wired in. SVG and CSS-only artwork is preferred. Each site's `img/` folder includes a `PROMPTS.md` with the exact SVG/Midjourney/DALL·E prompt that should produce the artwork once a model is available.

## Variant Scores (Wave Review Summary)

Historical — scores for the legacy `variants/` tree (removed 2026-06-30). All 25 variants scored on 10 dimensions: Accessibility, Branding, Content Quality, CTA Funnel, Localization, Performance, Responsive, SEO, Social Metadata, Usability.

| Variant | Wave 1 (Final) | Wave 2 | Wave 3 | Wave 4 | Wave 5 | Avg |
|---------|----------------|--------|--------|--------|--------|-----|
| 01-minimalist-cinema | **80** | 71 | 61 | 79 | 75 | **73.2** |
| 02-spotlight-projector | **79** | 68 | 72 | **83** | 79 | **76.2** |
| 03-retro-film-reel | **57** | 78 | FAIL* | 78 | **81** | **73.5** |
| 04-portal-hub | **78** | 55 | FAIL* | 72 | 76 | **70.3** |
| 05-pixel-tech | **82** | 62 | FAIL* | 80 | 74 | **74.5** |

\* Wave 3 variants 03, 04, 05 scored qualitative FAIL due to systematic brand aesthetic mismatches.

**Top performers:** 02-spotlight-projector-4 (83), 05-pixel-tech-1 (82), 03-retro-film-reel-5 (81)

**Full comparison:** See [reviews/COMPARISON.md](reviews/COMPARISON.md)

## Phase I Fixes Applied (2026-05-21)
- Removed Google Fonts CDN from 01-minimalist-cinema-5, 04-portal-hub-4
- Fixed brand CSS variables (colors/fonts) in 01-minimalist-cinema-5, 04-portal-hub-4
- og:image: relative → absolute URLs (97 HTML files)
- sitemap.xml: root → variant-specific URLs (13 files)
- Muted text contrast fixed for WCAG AA (01-4, 02-4, 02-5, 03-4)
- Mobile nav focus trap added to 05-pixel-tech-5
- og:site_name added to 9 index files, twitter:creator to all 25

## Tooling notes

### Adding or removing a brand kit — update `brand-kits/expected-kits.json`

`npm run build` fails if `brand-kits/*.js` does not match the list pinned in
`brand-kits/expected-kits.json`, and it fails if any kit will not `import()`.
Both are deliberate. Adding a kit is therefore a two-file change: drop in
`brand-kits/<slug>.js` **and** add the filename to the pin (`kits` and `count`).
The build error names the exact file and what to do.

Why the pin exists at all: the build used to warn and skip past any kit it
could not load, then report the length of the list it had just filtered. 79 kit
files were reported as "76 brand kit(s), 76 built site(s)", exit 0 — both
numbers counted the survivors, so the sentence was self-consistent no matter
how many kits broke. Three kits had been silently dropped for months, each with
a complete site subtree that was never published. A count taken from the
directory would have caught those, but it still self-adjusts to a *deletion*
(78/78/78 is just as self-consistent), so the expected list is pinned
independently and compared as an exact set in both directions. It is
hand-maintained on purpose: there is no regeneration flag, because a manifest a
tool can rewrite from its own subject is not a pin.

A kit must be an ES module — this package is `"type": "module"`, so
`module.exports = kit` or `window.X = kit` exports **nothing**. Use
`export default kit`.

### Stylelint v17 / `stylelint-config-standard` v40

The dev stack pins `stylelint@^17`, `stylelint-config-standard@^40`,
and `stylelint-config-recommended@^18`. **Do not** mix these majors —
v17 of stylelint requires the v40 / v18 configs; pairing v17 with the
older v3x configs surfaces a peer-dep conflict at `npm install` time
and `npm` will refuse to resolve. If you need to bump stylelint,
bump all three packages together.

### eslint config

`eslint.config.js` (flat config; `js.configs.recommended` +
`globals.browser`) runs zero-warning on every site in `sites/`.
Unused parameters are silenced via the standard
`argsIgnorePattern: '^_'` convention — prefix any deliberately-unused
parameter with `_` rather than disabling the rule inline.

### Node 24

`engines.node` is `>=24`. The CI workflows use Node-24-native action
majors (`actions/checkout@v6`, `actions/setup-node@v6`) — the older
`FORCE_JAVASCRIPT_ACTIONS_TO_NODE24` env shim is no longer needed and
has been removed. See
[`phlix-docs / dev / contributing`](https://detain.github.io/phlix-docs/dev/contributing#ci-github-actions-policy)
for the cross-repo action-version policy.

## License

MIT. See [LICENSE](LICENSE).

This repository's own contents are MIT. The fonts vendored under
`shared/assets/fonts/` are **not** ours — all 70 families are under the SIL Open
Font License 1.1 and are redistributed under its terms, which require their
copyright notices to travel with them. Those are in
[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md), with the licence text bundled
beside the fonts at `shared/assets/fonts/OFL.txt`. Regenerate both after adding
a family:

```bash
node tools/gen-font-notices.mjs
```

Note that the **sites** this repo builds describe Phlix the software, which is
licensed separately: Phlix Server and the Hub are MPL-2.0, and the shared
libraries, plugins, and clients are MIT. `shared/content.json` is the authority
for what the sites may claim.
