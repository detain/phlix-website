# Blitzkrieg Build Log

## What was built

Complete 8-page static site + 404 for Phlix, styled with Blitzkrieg military HUD aesthetic.

## Pages

1. **index.html** — Home: hero, pitch bullets, features overview, CTA banner
2. **features.html** — Features: detailed feature breakdown
3. **clients.html** — Clients: Roku, Samsung Tizen, Windows, Mobile (beta), DLNA
4. **download.html** — Download: server install, client downloads, ecosystem
5. **plugins.html** — Plugins: plugin model, ecosystem, write your own
6. **docs.html** — Docs: user guide, API reference, developer docs, Hub admin
7. **hub.html** — Hub: reverse-tunnel relay, NAT traversal, self-hosting
8. **about.html** — About: philosophy, license, contributing, FAQ
9. **404.html** — 404: "Mission Failed" themed error page

## Infrastructure

- `css/base.css` — Reset, tokens, element defaults
- `css/theme.css` — Typography, layout containers
- `css/components.css` — Buttons, badges, cards, nav, footer
- `js/main.js` — Nav toggle, smooth scroll, accessibility
- `img/logo.svg` — Military stencil wordmark with HUD brackets
- `robots.txt` — Allow all, sitemap reference
- `sitemap.xml` — All 8 canonical pages
- `SITE.md` — Design rationale
- `BUILD_LOG.md` — This file

## Content Sources

All product facts from `shared/content.json`:
- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- Clients: Roku, Samsung Tizen, Windows, Mobile (beta), DLNA
- Ecosystem: phlix-server, phlix-hub, phlix-shared, phlix-docs, phlix-plugin-example
- FAQ: 6 items from content.json

## Key Design Decisions

- 8-item nav: Home, Intel, Command, Deploy, Plugins, Docs, Hub, About
- Footer: Product / Developers / Project columns per content.json
- Military voice: deploy, intel, command, operation, mission, strike, etc.
- All links use correct content.json values, no fabricated content

## Known Issues

- Self-hosted fonts (WOFF2) not yet in `css/fonts/` — falls back to system fonts
- og.png needs to be generated with `node tools/gen-og.mjs --site blitzkrieg`
