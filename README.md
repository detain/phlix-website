# phlix-website

[![Pages](https://github.com/detain/phlix-website/actions/workflows/pages.yml/badge.svg)](https://github.com/detain/phlix-website/actions/workflows/pages.yml)
[![Lint](https://github.com/detain/phlix-website/actions/workflows/lint.yml/badge.svg)](https://github.com/detain/phlix-website/actions/workflows/lint.yml)
[![Link Check](https://github.com/detain/phlix-website/actions/workflows/linkcheck.yml/badge.svg)](https://github.com/detain/phlix-website/actions/workflows/linkcheck.yml)

The marketing / landing site for **[Phlix](https://github.com/detain/phlix-server)** — a self-hostable PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile.

This repo ships **five concurrent design variants**, one per brand-identity concept in `phlix-server/docs/brand/`. Each variant lives in its own subtree under `variants/` and consumes the same shared content from `shared/content.json`, so they differ in visual language only.

| # | Variant | Brand kit | Vibe | Live Preview |
|---|---------|-----------|------|-------------|
| 01 | [`minimalist-cinema-1`](variants/01-minimalist-cinema-1/) | Minimalist Cinema V1 (Ultra-Minimal) | Ultra-minimal, electric blue, single-column | https://detain.github.io/phlix-website/01-minimalist-cinema-1/ |
| 02 | [`spotlight-projector-1`](variants/02-spotlight-projector-1/) | Projector Beam | Cinematic, premium, gold + black | https://detain.github.io/phlix-website/02-spotlight-projector-1/ |
| 03 | [`retro-film-reel-1`](variants/03-retro-film-reel-1/) | Film Reel Badge | Nostalgic, friendly, red + cream + teal — Classic Diner | https://detain.github.io/phlix-website/03-retro-film-reel-1/ |
| 04 | [`portal-hub-1`](variants/04-portal-hub-1/) | Portal Ring | Futuristic, glassmorphic, neon cyan + magenta | https://detain.github.io/phlix-website/04-portal-hub-1/ |
| 05 | [`05-pixel-tech-1`](variants/05-pixel-tech-1/) | Pixel→Smooth | Cyberpunk, developer-energy, neon green + black | https://detain.github.io/phlix-website/05-pixel-tech-1/ |

## Quick start

```bash
npm install
npm run dev:01     # preview the minimalist-cinema variant at http://localhost:5173
npm run preview    # serve all five side-by-side at http://localhost:5174/<variant>/
npm run build      # produce static dist/ with all variants under dist/<variant>/
npm run test       # lint + link check
```

No PHP, no backend — the site is pure static HTML/CSS/JS. The Phlix server itself lives in [`detain/phlix-server`](https://github.com/detain/phlix-server).

## Repo layout

```
phlix-website/
├── shared/
│   ├── content.json          single source of marketing copy
│   ├── data/                 client list, FAQ, feature matrix
│   └── assets/               brand-neutral icons, screenshots
├── variants/<NN>-<slug>/
│   ├── index.html
│   ├── features.html
│   ├── clients.html
│   ├── download.html
│   ├── plugins.html
│   ├── docs.html             link-out + summary
│   ├── about.html
│   ├── css/
│   ├── js/
│   └── img/                  variant-specific brand artwork
├── reviews/<NN>-<slug>/      review outputs (one md file per dimension)
├── docs/
│   ├── PLAN.md               full architecture + agent pipeline
│   └── HANDOFF_PROMPT.md     paste-into-fresh-session kickoff prompt
└── .github/workflows/
    ├── pages.yml             deploy variants to GH Pages
    ├── lint.yml              html/css/js + a11y
    └── linkcheck.yml         broken-link sweep
```

## Brand source of truth

Brand kits, taglines, and prompt language live in
[`phlix-server/docs/brand/`](https://github.com/detain/phlix-server/tree/master/docs/brand):
`brand_identity.md`, `logo_concepts.md`, `dash_ui_prompts.md`, `svg_prompts.md`.
Variants must consume those — do not invent new colors, fonts, or voice.

## Image generation

No AI image-generation model is currently wired in. SVG and CSS-only artwork is preferred; placeholder images live in `shared/assets/placeholders/` and should be swapped for real renders later. Each variant's `img/` folder includes a `PROMPTS.md` with the exact SVG/Midjourney/DALL·E prompt that should produce the artwork once a model is available.

## Variant Scores (Wave Review Summary)

All 25 variants scored on 10 dimensions: Accessibility, Branding, Content Quality, CTA Funnel, Localization, Performance, Responsive, SEO, Social Metadata, Usability.

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

### Stylelint v17 / `stylelint-config-standard` v40

The dev stack pins `stylelint@^17`, `stylelint-config-standard@^40`,
and `stylelint-config-recommended@^18`. **Do not** mix these majors —
v17 of stylelint requires the v40 / v18 configs; pairing v17 with the
older v3x configs surfaces a peer-dep conflict at `npm install` time
and `npm` will refuse to resolve. If you need to bump stylelint,
bump all three packages together.

### eslint config

`eslint.config.js` (flat config; `js.configs.recommended` +
`globals.browser`) runs zero-warning on every variant in `variants/`.
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

BSD-3-Clause. See [LICENSE](LICENSE).
