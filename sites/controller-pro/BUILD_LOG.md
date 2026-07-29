# Build Log: controller-pro

## What was built

Complete brand-kit site for the "controller-pro" theme — pro gaming controller aesthetic with esports RGB energy.

### Files created

- `index.html` — Home with hero, pitch bullets, 8-feature overview, CTA banner
- `features.html` — All 8 features with detailed cards
- `clients.html` — 4 native clients + DLNA (never "5")
- `download.html` — Server install command + client cards + ecosystem
- `plugins.html` — Plugin model explanation
- `docs.html` — Link-out to external docs + ecosystem
- `hub.html` — Phlix Hub explanation
- `about.html` — Philosophy + license + contributing + FAQ
- `404.html` — Themed error page with "Signal Lost" concept
- `css/base.css` — Reset, tokens, focus styles, reduced-motion
- `css/theme.css` — Typography, layout, content sections
- `css/components.css` — Header, footer, buttons, cards, badges
- `js/main.js` — Mobile nav, scroll reveals, FAQ accordion
- `img/logo.svg` — Wordmark with controller + RGB strip
- `img/favicon.svg` — Square controller mark
- `robots.txt` — Allows all, references sitemap
- `sitemap.xml` — All 8 canonical pages
- `SITE.md` — Design rationale
- `BUILD_LOG.md` — This file

## Compliance notes

- ✅ Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` in hero (index.html) AND download.html
- ✅ 4 native clients + DLNA — never "5" or "Five"
- ✅ 8 features from content.json
- ✅ 6 FAQ items from content.json with `<details>/<summary>`
- ✅ Footer: 3 columns + "Open-source media, on your terms."
- ✅ No Google Fonts CDN — self-hosted fonts
- ✅ CSS `@copyright` inside `/* */` comment blocks
- ✅ Grid: `minmax(0, 1fr)` not bare `1fr`
- ✅ OG + Twitter meta on all pages, `twitter:creator=@detain`
- ✅ MPL-2.0 license (phlix-server/phlix-hub), MIT (clients/plugins)

## Known follow-ups

- Generate og.png via `node tools/gen-og.mjs --site controller-pro`
- Full accessibility audit at 320px viewport
- Performance testing with Lighthouse
