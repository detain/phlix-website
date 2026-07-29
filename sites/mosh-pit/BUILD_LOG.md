# BUILD_LOG.md — mosh-pit Brand Kit

## Generated

- `sites/mosh-pit/index.html` — Home page with hero, pitch, features overview, CTA banner
- `sites/mosh-pit/features.html` — All 8 features with detail cards
- `sites/mosh-pit/clients.html` — 4 native clients + DLNA device
- `sites/mosh-pit/download.html` — Server + clients + ecosystem, install command
- `sites/mosh-pit/plugins.html` — Plugin model, ecosystem plugins, link to example
- `sites/mosh-pit/docs.html` — Documentation links + ecosystem list
- `sites/mosh-pit/hub.html` — Hub explanation with visual diagram
- `sites/mosh-pit/about.html` — Philosophy, license, contributing, 6 FAQ
- `sites/mosh-pit/404.html` — Error page with recovery links
- `sites/mosh-pit/css/base.css` — Reset, tokens, fonts, accessibility
- `sites/mosh-pit/css/theme.css` — Typography scale, layout, page sections
- `sites/mosh-pit/css/components.css` — Header, footer, buttons, cards
- `sites/mosh-pit/js/main.js` — Mobile nav, reduced motion, scroll reveals
- `sites/mosh-pit/img/logo.svg` — Skewed P + HLIX wordmark
- `sites/mosh-pit/img/favicon.svg` — Square mark with red P, yellow slash, green dot
- `sites/mosh-pit/robots.txt` — Allows all, references sitemap
- `sites/mosh-pit/sitemap.xml` — 8 canonical pages (no 404.html)
- `sites/mosh-pit/SITE.md` — This documentation

## Intentional Deviations from new_site.md

1. **Font choice:** Spec referenced Bebas Neue for display but it was not in the shared font pool. Used Montserrat 800/900 instead — equally bold and uppercase-friendly.

2. **Noise texture:** Implemented as inline SVG data URI (`feTurbulence` filter) rather than a raster image, saving an HTTP request and keeping the texture crisp at any resolution.

3. **Grid implementation:** Used `minmax(0, 1fr)` throughout per §19.12 guidance. Verified no overflow at 320px.

## Known Follow-ups

- [ ] `og.png` must be generated via `node tools/gen-og.mjs --site mosh-pit` — rasterized version required for social meta
- [ ] Run `npm run lint` to verify zero CSS/JS warnings
- [ ] Run `node tools/render-check.mjs --site mosh-pit` for browser verification at multiple breakpoints
