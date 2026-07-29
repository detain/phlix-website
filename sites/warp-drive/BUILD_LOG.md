# BUILD_LOG.md — Warp-drive Brand Kit Site

## What was built

A complete 9-page static marketing site for Phlix under the warp-drive brand kit.

## Pages (9 HTML files)

- index.html — Home (hero, pitch, features overview, CTA)
- features.html — All 8 features with detail layout (from previous session)
- clients.html — 5 client cards (4 native + DLNA) (from previous session)
- download.html — Install command, clients, ecosystem
- plugins.html — Plugin model, ecosystem, example link
- docs.html — Link-out to external docs
- hub.html — Hub features, self-host vs public
- about.html — Philosophy, license grid, contributing, FAQ (6)
- 404.html — Warp-bubble-burst themed error page

## CSS Fixes Applied

- components.css line 301: `1fr` → `minmax(0, 1fr)` (footer nav mobile)
- theme.css line 557: `1fr` → `minmax(0, 1fr)` (responsive grid)

## Assets

- css/base.css — reset, design tokens (from previous session)
- css/theme.css — typography, layout (with fixes)
- css/components.css — header/nav/footer/buttons (with fixes)
- js/main.js — nav toggle, scroll reveals (from previous session)
- img/logo.svg — Phlix wordmark with warp streak (from previous session)
- img/favicon.svg — square favicon in cyan (from previous session)
- img/og.png — generated from og.svg
- img/og.svg — warp-burst composition source
- robots.txt, sitemap.xml, SITE.md, BUILD_LOG.md

## Notes

- 4 native clients + DLNA — never "Five" per content.json
- Install command copied verbatim from content.json
- Footer tagline: "Open-source media, on your terms."
- twitter:creator=@detain on all pages
- No Google Fonts CDN
