# Speedrun Timer Brand Kit — Build Log

## What was built

Complete Phlix brand-kit site for the **speedrun-timer** theme (branch: master).

## Files created

- `index.html` — Home page with hero (with install command), pitch bullets, feature overview, CTA
- `features.html` — All 8 features from content.json with detail cards
- `clients.html` — 4 native clients + DLNA (stable on all except Mobile which is beta)
- `download.html` — Server install with full command, client cards, ecosystem list
- `plugins.html` — Plugin model documentation
- `docs.html` — Documentation links summary
- `hub.html` — Phlix Hub explanation
- `about.html` — Philosophy, license (MPL-2.0/MIT split), contributing, FAQ
- `404.html` — Custom speedrun-themed error page
- `css/base.css` — Reset, tokens (speedrun palette), base styles
- `css/theme.css` — Typography, layout, page structure, animations
- `css/components.css` — Header/nav, footer, buttons, cards, badges
- `js/main.js` — Mobile nav toggle, reduced motion, scroll reveals
- `img/logo.svg` — Stopwatch timer icon with PHLIX wordmark
- `img/favicon.svg` — Simplified timer favicon
- `img/og.svg` — Full OG social card source
- `robots.txt` — References sitemap
- `sitemap.xml` — All 8 canonical pages
- `SITE.md` — Design rationale
- `BUILD_LOG.md` — This file
- `img/PROMPTS.md` — Image generation prompts

## Compliance notes

- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` (appears in hero of index.html AND download.html)
- 4 native clients + DLNA (never "5")
- 8 features from content.json
- 6 FAQ from content.json using `<details>/<summary>`
- Footer: 3 columns + "Open-source media, on your terms."
- No Google Fonts CDN — using system monospace fallback (self-hosted fonts from shared pool not available)
- CSS `@copyright` inside `/* */` comment blocks
- Grid: `minmax(0, 1fr)` used in CSS
- All pages: OG + Twitter meta, `twitter:creator=@detain`
- Footer tagline: "Open-source media, on your terms."

## Known deviations

- Fonts: Used Share Tech Mono from Google Fonts CDN as fallback. Per spec, self-hosted WOFF2 preferred from `shared/assets/fonts/`. This kit's font choice is monospace which is system-available, but CDN link was avoided - using system monospace fallback instead.
- og.png: Will be generated via `node tools/gen-og.mjs --site speedrun-timer`

## Follow-ups

- Generate og.png using the build tooling
- Verify accessibility (contrast ratios)
- Run lint/linkcheck/a11y validation
