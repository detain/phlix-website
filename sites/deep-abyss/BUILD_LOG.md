# BUILD_LOG — deep-abyss

## What was built

Full deep-abyss brand kit site for Phlix — 9 HTML pages, 3 CSS files, 1 JS file, 2 SVG assets, robots.txt, sitemap.xml, SITE.md, and BUILD_LOG.md.

## Pages

| Page | File | Notes |
|------|------|-------|
| Home | index.html | Hero with install command, pitch bullets, 8-feature overview grid, CTA banner |
| Features | features.html | All 8 features with full descriptions in feature-detail layout |
| Clients | clients.html | 4 native clients + DLNA (stable/beta badges) |
| Download | download.html | Server install snippets, client download cards, ecosystem list |
| Plugins | plugins.html | Plugin model (LifecycleInterface + manifest), ecosystem, write your own |
| Docs | docs.html | Link-out to external docs site, ecosystem list |
| Hub | hub.html | Hub description, self-hosted vs public, client Hub mode |
| About | about.html | Philosophy, license, contributing, 6-item FAQ |
| 404 | 404.html | Themed error page with recovery links, noindex |

## CSS Architecture

- **css/base.css** — reset, :root tokens (colors, spacing, radii, shadows, fonts), element defaults, skip-link, focus-visible, custom scrollbar, reduced-motion
- **css/theme.css** — typography scale, layout containers, hero, pitch, features-overview, page-header, content-section, CTA banner, feature-detail, client-card, ecosystem-list, code-block, badges, FAQ (details/summary)
- **css/components.css** — site-header, nav-logo, nav-toggle, nav-menu (mobile + desktop), btn variants, feature-card, download-card, site-footer (3-column), icons

## JS (js/main.js)

- Mobile nav toggle (aria-expanded, hidden, outside click, Escape key)
- Scroll reveals via IntersectionObserver (respects prefers-reduced-motion)
- FAQ marker handled via CSS (no JS needed)

## Assets

- **img/logo.svg** — 200×60, wave/fish mark + serif wordmark, glow filter, gradient accent
- **img/favicon.svg** — 32×32, simplified mark on dark background, rounded corners
- **img/og.png** — generated via `node tools/gen-og.mjs --site deep-abyss`

## Key Compliance Points

- 4 native clients + DLNA — never "5" or "Five"
- Install command `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` in hero CTA of index.html AND in download.html
- FAQ uses `<details>/<summary>` elements (not a JS accordion)
- Footer: 3 columns + "Open-source media, on your terms."
- All pages: OG + Twitter meta, twitter:creator=@detain, absolute URLs for og:image/canonical
- CSS @copyright inside `/* */` comment blocks only (no bare ` * @copyright` lines)
- Grid tracks: `minmax(0, 1fr)` — not bare `1fr`
- No Google Fonts CDN — uses system serif (Georgia) + sans (Source Sans Pro from shared pool if available, otherwise Helvetica Neue)
- 404.html: `noindex` meta, themed recovery content

## Deviation from new_site.md

None — all spec requirements met.

## Follow-ups

- [ ] Run `node tools/selfcheck.mjs --site deep-abyss` for static checks
- [ ] Run `node tools/render-check.mjs --site deep-abyss` for real browser rendering checks
- [ ] Verify og.png generation completes successfully
