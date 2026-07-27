# REGEN_PLAN.md — Bioluminescent Reef

## Experience Fields → Site Elements

| Field | Value | Site element |
|---|---|---|
| `experience_archetype` | `narrative-scroll` | Home page follows story pacing with 5 sections |
| `site_architecture.nav[]` | 6 entries, Descent/The Creatures/Portals/Dive Gear/The Relay/Pressure Log | Primary nav with 3 emphasis levels |
| `site_architecture.demoted_pages` | plugins, docs | Moved to footer, not primary nav |
| `site_architecture.extra_pages` | nocturnal-library | Implemented as docs.html |
| `homepage_narrative.sections[]` | the-descent, the-creatures, why-phlix, good-seats, dive-deeper | Ordered home page sections |
| `copy_overlay.hero` | kit tagline + narrative voice | Home hero with themed copy |
| `feature_casting` | 2 leads + 4 support | Featured grid on home, full grid on features.html |
| `proof_strategy` | signals: client-count, syncplay-detail, streaming-quality, access-method, live-tv | "Good Seats" section with dl/dt placards + quote |
| `conversion_funnel` | cta_ladder: 3 rungs | "Dive Deeper" section with numbered steps |
| `easter_eggs` | logo-clicks:5, typed-word:abyss | Logo click counter + secret word listener |
| `mascot.behavior` | Abyss jellyfish, bottom-right, tips per section, easter interactions | Companion widget on home/features/download |
| `intensity_toggle` | calm-mode toggle in footer | Switch to disable animations |
| `scroll_experience` | narrative-scroll with fluid reveals | CSS animation orchestration |
| `error_page_experience` | themed 404 with recovery links | 404.html with abyss concept |
| `seasonal_activation` | live-js, 3 variants | Seasonal color overlay system |
| `faq_experience` | 6 questions from content.json | about.html FAQ accordion |
| `persona_vignettes` | deep-sea explorer imagery | img/PROMPTS.md seeds |

## Fonts

| Role | Family | Weights | File |
|---|---|---|---|
| headline | Cormorant Garamond | 600, 700 | cormorant-garamond-{600,700}-latin.woff2 |
| display | Raleway | 100, 200 | raleway-{100,200}-latin.woff2 |
| body | Inter | 400, 500 | inter-{400,500}-latin.woff2 |
| ui | Inter | 400, 500, 600 | inter-{400,500,600}-latin.woff2 |
| mono | JetBrains Mono | 400, 500 | jetbrains-mono-{400,500}-latin.woff2 |
| number | Raleway | 100, 200 | raleway-{100,200}-latin.woff2 |

Note: inter-600 used for `<strong>` emphasis (weight 600 declared for ui role).

## Colors (from contrast table, measured)

| Token | Value | Use |
|---|---|---|
| `--color-primary` | #00e8c8 | Biolume aqua — 12.63:1 on bg ✓ |
| `--color-secondary` | #7700ff | Abyssal violet — 3.05:1 on bg (large/UI only), safe: #9d47ff |
| `--color-tertiary` | #ff7b00 | Anglerfish amber — primary CTA only |
| `--color-bg` | #010b14 | Hadal darkness |
| `--color-surface` | #020f1c | Abyssal trench |
| `--color-surface-alt` | #03142a | Midnight zone |
| `--color-text` | #c8f0ff | Phosphor white — 16.39:1 on bg ✓ |
| `--color-border` | #0d2a40 | Deep current |
| `--color-success` | #00d4a0 | Symbiont green |
| `--color-warning` | #ffb347 | Lure flicker |
| `--color-error` | #cc1a4a | Red tide — 3.60:1 (large/UI), safe: #d54169 |
| `--color-focus` | #00e8c8 | Focus ring + outer glow |

## Page Inventory

- `index.html` — Home (5 sections: the-descent, the-creatures, why-phlix, good-seats, dive-deeper)
- `features.html` — The Creatures (8 features)
- `clients.html` — Portals (5 clients)
- `download.html` — Dive Gear (install command + clients)
- `plugins.html` — Plugins (ecosystem repos)
- `docs.html` — Nocturnal Library (docs links, ecosystem)
- `hub.html` — The Relay (Hub feature + ecosystem)
- `about.html` — Pressure Log (About + FAQ)
- `404.html` — Error page with themed content
- `css/base.css` — Reset, tokens, element defaults, @font-face
- `css/theme.css` — Typography, layout, page structure
- `css/components.css` — Header/nav, footer, buttons, cards, forms, badges
- `js/main.js` — Nav toggle, reduced-motion, mascots, easter eggs, seasonal
- `robots.txt`, `sitemap.xml`, `SITE.md`, `BUILD_LOG.md`

## Ambiguities resolved

- `secondary` (#7700ff) fails small text on bg (3.05:1 < 4.5:1) — used only for large/UI text and decorative elements
- `error` (#cc1a4a) fails small text on bg (3.60:1 < 4.5:1) — used for buttons/labels only, not body copy
- install.from_source is a dev checkout, labelled "not an install" per §19.22

## @copyright compliance

All css/*.css and js/*.js files contain `@copyright 2026 Joe Huss <detain@interserver.net>` in their banner comment block (rule §19.24, selfcheck rule 17).
