# Void Walker Build Log

## Date
2026-07-29

## What Was Built

Complete static site for the Void Walker brand kit — 9 HTML pages, 3 CSS files, 1 JavaScript file, image assets, and documentation.

## Pages Created

1. `index.html` — Home with hero, pitch bullets, features overview, CTA
2. `features.html` — All 8 features with detail cards
3. `clients.html` — 5 clients (4 native + DLNA)
4. `download.html` — Server install, clients, ecosystem
5. `plugins.html` — Plugin model, ecosystem, write your own
6. `docs.html` — Documentation links (external)
7. `hub.html` — Phlix Hub explanation
8. `about.html` — Philosophy, license, contributing, FAQ
9. `404.html` — Void-themed error page

## Assets Created

- `css/base.css` — Reset, tokens, base elements
- `css/theme.css` — Typography, layout, page sections
- `css/components.css` — Header, nav, footer, buttons, cards
- `js/main.js` — Nav toggle, reduced motion, scroll reveals
- `img/logo.svg` — Portal circle + Orbitron wordmark
- `img/favicon.svg` — Portal circle on void background
- `img/og.svg` — Social share card source (placeholder for PNG conversion)
- `robots.txt` — References sitemap
- `sitemap.xml` — 8 canonical pages
- `SITE.md` — Design rationale documentation
- `BUILD_LOG.md` — This file

## Content Notes

- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- License: MPL-2.0 (server/hub), MIT (clients/plugins)
- 4 native clients + DLNA
- 8 features from content.json
- 6 FAQ items from content.json
- Footer: 3 columns + tagline "Open-source media, on your terms."

## Deviations from Default

- Navigation labels replaced with dimensional metaphors per brand kit (e.g., "The Crossing" for home, "Portals" for features)
- Plugins and Docs demoted to footer-only per brand kit `site_architecture.demoted_pages`
- 404 page uses brand-specific "Lost in the Void" concept

## Follow-up Items

- [ ] Generate `og.png` from `img/og.svg` using `node tools/gen-og.mjs --site void-walker`
- [ ] Generate `sitemap.xml` using `node tools/gen-sitemap.mjs --site void-walker`
- [ ] Run `npm run lint` to verify
