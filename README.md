# phlix-website

[![Pages](https://github.com/detain/phlix-website/actions/workflows/pages.yml/badge.svg)](https://github.com/detain/phlix-website/actions/workflows/pages.yml)
[![Lint](https://github.com/detain/phlix-website/actions/workflows/lint.yml/badge.svg)](https://github.com/detain/phlix-website/actions/workflows/lint.yml)
[![Link Check](https://github.com/detain/phlix-website/actions/workflows/linkcheck.yml/badge.svg)](https://github.com/detain/phlix-website/actions/workflows/linkcheck.yml)

The marketing / landing site for **[Phlix](https://github.com/detain/phlix-server)** — a self-hostable PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile.

This repo ships **five concurrent design variants**, one per brand-identity concept in `phlix-server/docs/brand/`. Each variant lives in its own subtree under `variants/` and consumes the same shared content from `shared/content.json`, so they differ in visual language only.

| # | Variant | Brand kit | Vibe |
|---|---------|-----------|------|
| 01 | [`minimalist-cinema`](variants/01-minimalist-cinema/) | Film-Strip X | Modern, tech-forward, electric blue + charcoal |
| 02 | [`spotlight-projector`](variants/02-spotlight-projector/) | Projector Beam | Cinematic, premium, gold + black |
| 03 | [`retro-film-reel`](variants/03-retro-film-reel/) | Film Reel Badge | Nostalgic, friendly, red + cream + teal |
| 04 | [`portal-hub`](variants/04-portal-hub/) | Portal Ring | Futuristic, glassmorphic, neon cyan + magenta |
| 05 | [`pixel-tech`](variants/05-pixel-tech/) | Pixel→Smooth | Cyberpunk, developer-energy, neon green + black |

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
[`phlix-server/docs/brand/`](https://github.com/detain/phlix-server/tree/main/docs/brand):
`brand_identity.md`, `logo_concepts.md`, `dash_ui_prompts.md`, `svg_prompts.md`.
Variants must consume those — do not invent new colors, fonts, or voice.

## Image generation

No AI image-generation model is currently wired in. SVG and CSS-only artwork is preferred; placeholder images live in `shared/assets/placeholders/` and should be swapped for real renders later. Each variant's `img/` folder includes a `PROMPTS.md` with the exact SVG/Midjourney/DALL·E prompt that should produce the artwork once a model is available.

## License

BSD-3-Clause. See [LICENSE](LICENSE).
