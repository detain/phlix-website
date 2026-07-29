# Film Reel Brand Kit — Build Log

## Build Date
2026-07-29

## Built by
Claude (OpenCode coder agent)

## Theme
**film-reel** — Classic cinema projection theme with spinning reels, sprocket holes, silver and black metal, film strip borders.

## Files Generated

### HTML Pages (9)
- `index.html` — Home page with hero, pitch bullets, feature overview, CTA banner
- `features.html` — All 8 features in detail view
- `clients.html` — 4 native clients + DLNA
- `download.html` — Server install command + clients + ecosystem
- `plugins.html` — Plugin model documentation
- `docs.html` — Documentation links (external)
- `hub.html` — Phlix Hub explanation
- `about.html` — Philosophy, license, contributing, FAQ
- `404.html` — 404 page with film-reel styling

### CSS (3)
- `css/base.css` — Reset, tokens, typography, sprocket texture
- `css/theme.css` — Layout, hero, features, cards, code blocks, FAQ
- `css/components.css` — Header, footer, buttons, forms, animations

### JavaScript (1)
- `js/main.js` — Mobile nav, reduced motion, scroll reveals, FAQ accordion, code copy

### Images (2)
- `img/logo.svg` — Film reel icon + Phlix wordmark
- `img/favicon.svg` — Film reel icon on charcoal

### Config (2)
- `robots.txt` — References sitemap
- `sitemap.xml` — All 8 canonical pages (no 404.html)

### Documentation (2)
- `SITE.md` — Design rationale
- `BUILD_LOG.md` — This file

### Not Generated (deferred)
- `img/og.png` — Generated via `node tools/gen-og.mjs --site film-reel`

## Compliance Notes

### Product Facts
- ✅ 4 native clients (Roku, Samsung Tizen, Windows, Mobile) + DLNA — never "5"
- ✅ 8 features from `content.json`
- ✅ 6 FAQ items using `<details>/<summary>`
- ✅ Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- ✅ Footer: 3 columns + "Open-source media, on your terms."

### Technical
- ✅ License: MPL-2.0 (server/hub), MIT (clients/plugins)
- ✅ No Google Fonts CDN — self-hosted via `@font-face`
- ✅ CSS `@copyright` inside `/* */` comment blocks
- ✅ Grid: `minmax(0, 1fr)` not bare `1fr`
- ✅ All pages: OG + Twitter meta, `twitter:creator=@detain`
- ✅ Install command in hero CTA of `index.html` AND in `download.html`
- ✅ FAQ: `<details>/<summary>` elements
- ✅ Footer 3 columns from `content.json`

## Design Decisions

1. **Film reel decorations:** Used CSS `::before`/`::after` with repeating-linear-gradient to create sprocket hole patterns on section borders and header/footer
2. **Projector light effect:** Conic gradient animation in hero to simulate rotating projector light
3. **Spinning reels:** Decorative absolutely-positioned elements with rotation animation
4. **Color philosophy:** Dark charcoal backgrounds with silver text and red accents evoke the classic cinema projection booth aesthetic

## Deviations from Spec
None intentional.
