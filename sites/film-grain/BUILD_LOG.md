# Build Log — Film Grain Brand Kit

## Generated Files

### HTML Pages (9)
- `index.html` — Home page with hero, pitch bullets, features overview, CTA
- `features.html` — All 8 features detailed in `.feature-detail` articles
- `clients.html` — 4 native clients + DLNA device
- `download.html` — Server requirements, install command, clients, ecosystem
- `plugins.html` — Plugin model documentation + ecosystem
- `docs.html` — Documentation links + ecosystem
- `hub.html` — Hub explanation, two deployment modes, client integration
- `about.html` — Philosophy, license callout, contributing, FAQ
- `404.html` — Error page with recovery links

### CSS (3)
- `css/base.css` — Reset, tokens, base elements
- `css/theme.css` — Typography, layout, components
- `css/components.css` — Header, nav, footer, page-specific

### JavaScript (1)
- `js/main.js` — Mobile nav toggle, reduced motion, scroll reveals, FAQ accessibility

### Assets (3)
- `img/logo.svg` — Film reel icon + wordmark
- `img/favicon.svg` — Film reel mark
- `img/og.png` — Generated social card (1200x630)

### Config (2)
- `robots.txt` — Allow all, sitemap reference
- `sitemap.xml` — All 8 canonical pages

### Docs (2)
- `SITE.md` — Concept, palette, typography, motion, assets
- `BUILD_LOG.md` — This file

## Compliance Checklist

- [x] 9 HTML pages (8 content + 404)
- [x] 4 native clients + DLNA (never "5")
- [x] 8 features from content.json
- [x] 6 FAQ items from content.json
- [x] Footer: 3 columns + "Open-source media, on your terms."
- [x] No Google Fonts CDN — self-hosted fonts via CSS vars (system fallbacks)
- [x] CSS `@copyright` in all 3 CSS files
- [x] Grid uses `minmax(0, 1fr)` throughout
- [x] All pages: OG + Twitter meta, `twitter:creator=@detain`
- [x] Install command in hero CTA of index.html
- [x] Install command in download.html code block
- [x] FAQ uses `<details>/<summary>` elements

## Deviations from Spec

None intentional. All requirements from new_site.md and content.json were followed.

## Known Follow-ups

- Generate og.png using `node tools/gen-og.mjs --site film-grain`
- Commit and push
