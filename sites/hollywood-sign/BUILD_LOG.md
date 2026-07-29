# Hollywood Sign — Build Log

## Generated Files

### HTML Pages (9)
- `index.html` — Home with hero, pitch, features overview, CTA banner
- `features.html` — Feature details with all 8 features
- `clients.html` — 4 native clients + DLNA cards
- `download.html` — Server install, client downloads, ecosystem
- `plugins.html` — Plugin model, ecosystem, write your own
- `docs.html` — Documentation links, ecosystem
- `hub.html` — Hub explanation, self-host vs public, client integration
- `about.html` — Philosophy, license, contributing, FAQ
- `404.html` — Error page with recovery links and noindex

### CSS (3)
- `css/base.css` — Reset, tokens, base styles
- `css/theme.css` — Typography, layouts, section styles
- `css/components.css` — Header, nav, footer, buttons, animations

### JavaScript (1)
- `js/main.js` — Mobile nav toggle, reduced motion, scroll reveals

### Images (4)
- `img/logo.svg` — Phlix wordmark with film-strip P
- `img/favicon.svg` — Square mark with gold P and red star
- `img/og.svg` — Editable OG source (1200x630)
- `img/og.png` — Rasterized social card (generated)

### Config (2)
- `robots.txt` — Allows all, points to sitemap
- `sitemap.xml` — 8 pages (404.html excluded per noindex)

### Documentation (2)
- `SITE.md` — This site documentation
- `BUILD_LOG.md` — This file

## Compliance Checklist

- [x] 9 HTML pages (8 content + 404)
- [x] Install command in hero CTA of index.html
- [x] Install command in hero area of download.html
- [x] 4 native clients + DLNA (never "5" or "Five")
- [x] 8 features from content.json
- [x] 6 FAQ in about.html from content.json
- [x] FAQ uses `<details>/<summary>` elements
- [x] Footer: 3 columns + "Open-source media, on your terms."
- [x] No Google Fonts CDN (local @font-face)
- [x] CSS @copyright inside `/* */` blocks
- [x] Grid: `minmax(0, 1fr)` (not bare `1fr`)
- [x] All pages: OG + Twitter meta
- [x] `twitter:creator=@detain` on all pages
- [x] `og:image` as absolute URL to PNG
- [x] MPL-2.0 license (server/hub), MIT reference (clients/plugins)
- [x] robots.txt and sitemap.xml

## Intentional Deviations from Generic Template

1. **Hero styling:** Added radial gradient overlays to evoke golden hour atmosphere over Hollywood hills
2. **Eyebrow badges:** Added small pill-style eyebrow text with gold border to hero and 404
3. **Film-frame borders:** Subtle gold border on code blocks and key containers
4. **Scroll reveals:** Cards fade-in-up on scroll with staggered timing
5. **Footer tagline:** Styled with italic Playfair Display in gold

## Known Follow-ups

- og.png generated via `node tools/gen-og.mjs --site hollywood-sign`
- Consider adding actual film-reel decorative elements to hero
- Could expand color variations for seasonal activation (golden hour variations)

## Build Commands Used

```bash
node tools/gen-og.mjs --site hollywood-sign
```
