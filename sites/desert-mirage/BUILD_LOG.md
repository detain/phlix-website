# BUILD LOG — Desert Mirage Brand Kit Site

## Generated: 2026-07-29

## What was built

- **9 HTML pages**: index.html, features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html, 404.html
- **3 CSS files**: css/base.css (reset + tokens), css/theme.css (typography + layout), css/components.css (header/nav/footer/buttons/forms)
- **1 JS file**: js/main.js (nav toggle, scroll reveals, reduced motion, FAQ accordion)
- **2 SVG assets**: img/logo.svg, img/favicon.svg
- **1 robots.txt** referencing sitemap
- **1 sitemap.xml** (8 canonical pages, 404.html excluded)
- **SITE.md** design rationale
- **BUILD_LOG.md** this file

## Key design decisions

### Typography
- Cinzel (600, 700) for headlines and display — warm serif with ancient, elegant feel
- Hind (400, 600) for body text — warm, readable sans-serif
- Quicksand (500, 600) for UI — soft, rounded, approachable
- IBM Plex Mono (400, 600) for code
- All fonts self-hosted from shared/assets/fonts/ pool

### Color system
- Primary #D4A574 (Desert Sand) for CTAs
- Secondary #87CEEB (Oasis Sky) for links and focus
- #8B4513 (Saddle Brown) for text and borders
- #F5DEB3 (Wheat) as universal background

### Notable compliance points
- Install command (`curl -fsSL ... | sudo bash`) appears in hero CTA on index.html AND in download.html
- 4 native clients + DLNA — never stated as "5" anywhere
- FAQ uses `<details>/<summary>` elements on about.html
- Footer: 3 columns + "Open-source media, on your terms."
- All OG + Twitter meta on every page, og:image as absolute URL
- `twitter:creator=@detain` on every page
- CSS `@copyright` inside `/* */` comment blocks
- Grid uses `minmax(0, 1fr)` not bare `1fr`
- No Google Fonts CDN — all fonts self-hosted WOFF2

## Deviations from spec

- No mascot implemented (brand kit `mascot: null`)
- No seasonal JS activation (brand kit `seasonal_activation.mode: "documented"`)
- 404.html uses the site's full shared shell (consistent with other pages rather than a true GitHub Pages shim, since the root 404.html shim is not present in this standalone build)

## Follow-ups

- Generate og.png using: `node tools/gen-og.mjs --site desert-mirage`
- Run `npm run lint` and `npm run linkcheck` to verify
- Run `node tools/render-check.mjs --site desert-mirage` for 320px–1280px render verification
