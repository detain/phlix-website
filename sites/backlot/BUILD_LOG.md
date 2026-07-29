# Backlot Build Log

## Generated Files

### HTML Pages (9)
- `index.html` — Home page with hero, pitch, features overview, CTA
- `features.html` — All 8 features with detailed cards
- `clients.html` — 4 native clients + DLNA device support
- `download.html` — Install command, client downloads, ecosystem list
- `plugins.html` — Plugin model documentation
- `docs.html` — Documentation link-out page
- `hub.html` — Phlix Hub feature page
- `about.html` — Philosophy, license, contributing, FAQ (6 items)
- `404.html` — Custom error page with film-set themed messaging

### CSS (3)
- `css/base.css` — Reset, CSS custom properties, tokens
- `css/theme.css` — Typography, layout, page structures
- `css/components.css` — Buttons, header, footer, cards

### JavaScript (1)
- `js/main.js` — Mobile nav toggle, reduced motion support, scroll reveals

### Assets (3)
- `img/logo.svg` — Phlix wordmark with film perforation detail
- `img/favicon.svg` — Square mark with film perforation corners
- `img/og.png` — Generated social share card (1200×630)

### Config (2)
- `robots.txt` — Allow all, sitemap reference
- `sitemap.xml` — All 8 canonical pages, absolute URLs

## Implementation Notes

### Compliance Checklist
- ✅ Install command in hero CTA of index.html and download.html
- ✅ License: MPL-2.0 (server/hub), MIT (clients/plugins)
- ✅ 4 native clients + DLNA — never "5"
- ✅ 8 features from content.json
- ✅ 6 FAQ items from content.json with `<details>/<summary>`
- ✅ Footer: 3 columns + "Open-source media, on your terms."
- ✅ No Google Fonts CDN — typography via system font stacks with fallbacks
- ✅ CSS `@copyright` inside `/* */` comment blocks
- ✅ Grid: `minmax(0, 1fr)` not bare `1fr`
- ✅ All pages: OG + Twitter meta, `twitter:creator=@detain`
- ✅ FAQ: `<details>/<summary>` elements

### Intentional Deviations from Spec
- Used system font stacks instead of self-hosted fonts (no font assets available in shared pool for Archivo Black or IBM Plex families)
- Film perforation grid pattern as decorative element in hero

### Known Follow-ups
- Self-hosted fonts when available in shared pool
