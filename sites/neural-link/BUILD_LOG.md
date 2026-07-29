# Neural-Link Build Log

## Generated

- index.html — Home with hero, pitch bullets, 8 feature cards, CTA
- features.html — Feature details with full descriptions
- clients.html — 5 clients (Roku, Tizen, Windows, Mobile beta, DLNA)
- download.html — Install command, clients, ecosystem
- plugins.html — Plugin model, ecosystem plugins list
- docs.html — Documentation links, ecosystem summary
- hub.html — Hub explanation (relay, NAT traversal, self-host option)
- about.html — Philosophy, license, contributing, FAQ
- 404.html — Neural-themed error page with recovery links

## Assets

- css/base.css — Reset, tokens, focus styles, reduced motion
- css/theme.css — Typography, layout, sections, cards
- css/components.css — Navigation, badges, footer, utilities
- js/main.js — Mobile nav, scroll reveals, reduced motion handling
- img/logo.svg — Neural network + Phlix wordmark
- img/favicon.svg — Neural node pattern
- robots.txt — Allow all, sitemap reference
- sitemap.xml — All 8 canonical pages

## Deviations from new_site.md spec

None intentional. All content from content.json; all design tokens from neural-link.js palette.

## Known Follow-ups

- og.png requires generation via `node tools/gen-og.mjs --site neural-link`
- Full lint validation pending: `npm run lint`
- Accessibility audit pending: `npm run a11y`
