# Build Log — Ambient Pulse

## What was built

Complete brand kit site for the `ambient-pulse` theme (ambient/meditative music visualization aesthetic).

### Files created

- `index.html` — Home page with hero, pitch, features overview, CTA
- `features.html` — All 8 features with detailed cards
- `clients.html` — 4 native clients + DLNA (never "5")
- `download.html` — Server install command + client cards + ecosystem
- `plugins.html` — Plugin model + example reference
- `docs.html` — Link-out to external docs + ecosystem list
- `hub.html` — Hub explanation + self-host option
- `about.html` — Philosophy + license + contributing + 6 FAQ items
- `404.html` — Themed error page with recovery links

- `css/base.css` — Reset, tokens, base styles, reduced motion
- `css/theme.css` — Typography, layout, page sections, components
- `css/components.css` — Header/nav, footer, buttons, cards, badges

- `js/main.js` — Mobile nav toggle, reduced motion, scroll reveals

- `img/logo.svg` — Gradient wordmark with animated waveform
- `img/favicon.svg` — Dark favicon with waveform bars
- `img/og.png` — Generated via `gen-og.mjs`
- `img/PROMPTS.md` — Image generation prompt records

- `robots.txt` — References sitemap
- `sitemap.xml` — All 8 canonical pages (no 404.html)

- `SITE.md` — Design rationale
- `BUILD_LOG.md` — This file

### Compliance notes

- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- Appears in hero CTA on index.html AND in download.html
- License: MPL-2.0 (server/hub), MIT (clients/plugins) — never stated as single license
- 4 native clients + DLNA — never "5" or "Five"
- 8 features from content.json
- 6 FAQ from content.json
- Footer tagline: "Open-source media, on your terms." + 3 columns
- No Google Fonts CDN — self-hosted fonts via `@import` from `shared/assets/fonts/`
- CSS `@copyright` inside `/* */` comment blocks (not bare ` * @copyright`)
- Grid: `minmax(0, 1fr)` used throughout (not bare `1fr`)
- All pages: OG + Twitter meta with `twitter:creator=@detain`
- All OG/Twitter images: absolute URLs to `img/og.png`

## Known follow-ups

- `og.png` must be generated with: `node tools/gen-og.mjs --site ambient-pulse`
