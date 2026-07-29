# Havoc Brand Kit Site — Build Log

## What was built

- `sites/havoc/index.html` — Home page with hero, pitch, features overview, CTA
- `sites/havoc/features.html` — Full features page with 8 feature-detail articles
- `sites/havoc/clients.html` — Clients page with 5 client cards (4 native + DLNA)
- `sites/havoc/download.html` — Download page with server install + client cards + ecosystem
- `sites/havoc/plugins.html` — Plugin model docs + ecosystem + write-your-own
- `sites/havoc/docs.html` — Documentation links + ecosystem list
- `sites/havoc/hub.html` — Hub explanation + self-host/public + client support
- `sites/havoc/about.html` — Philosophy + license + contributing + FAQ (6 items)
- `sites/havoc/404.html` — Custom error page with glitch effect
- `sites/havoc/css/base.css` — Reset, tokens, :root variables
- `sites/havoc/css/theme.css` — Layout, hero, pitch, features, CTA sections
- `sites/havoc/css/components.css` — Header/nav, footer, buttons, cards, badges, FAQ
- `sites/havoc/js/main.js` — Mobile nav toggle, reduced-motion, scroll reveals
- `sites/havoc/img/logo.svg` — Explosion burst logo with PHLIX wordmark
- `sites/havoc/img/favicon.svg` — Explosion burst favicon with P letter
- `sites/havoc/robots.txt` — References sitemap
- `sites/havoc/sitemap.xml` — All 8 canonical pages
- `sites/havoc/SITE.md` — Design rationale
- `sites/havoc/BUILD_LOG.md` — This file

## Content sourcing

All content from `shared/content.json`:
- 8 features (library, syncplay, transcode, auth, livetv, dlna, plugins, hub)
- 6 FAQ items (Plex comparison, NAT exposure, formats, mobile app, plugins, license)
- 5 clients (Roku, Samsung Tizen, Windows, Mobile beta, DLNA)
- 5 ecosystem projects (phlix-server, phlix-hub, phlix-shared, phlix-docs, phlix-plugin-example)
- Footer 3-column links
- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`

## Deviations from default

None. Content sourced verbatim from `content.json`. No fabricated claims.

## Design notes

- Palette uses all 5 Havoc colors: #F72585, #7209B7, #3A0CA3, #4361EE, #4CC9F0
- Void black (#0D0D0D) background with explosion cloud radial overlays
- Sharp corners (0px radius) throughout per brand kit spec
- Anton headline font (with Impact/Arial Black fallback)
- Exo 2 body font (with Rajdhani fallback)
- Share Tech Mono for code
- Earthquake wobble and glitch text animations on hero
- No CDN dependencies — self-hosted fonts (system fallback until WOFF2 pool available)
- og.png is 1200×630 PNG (placeholder — needs rasterization from og.svg source)
