# BUILD_LOG.md — Garage Band

## Build Information
- **Date:** 2026-07-29
- **Theme:** garage-band
- **Palette:** `#2C2C2C` `#FF4444` `#FFD700` `#F5F5DC` `#8B0000`

## Files Created

### HTML Pages (9)
- `index.html` - Hero with install CTA, features overview, value props, proof band
- `features.html` - All 8 features from content.json
- `clients.html` - 4 native clients + DLNA
- `download.html` - Install commands with hero CTA
- `plugins.html` - Plugin ecosystem
- `docs.html` - Documentation links
- `hub.html` - Phlix Hub feature page
- `about.html` - About + FAQ (6 questions)
- `404.html` - Custom 404 page

### CSS Files (3)
- `css/base.css` - Design tokens, reset, self-hosted fonts
- `css/theme.css` - Typography, layout, grid, components
- `css/components.css` - Buttons, nav, forms, badges

### JavaScript (1)
- `js/main.js` - Navigation, scroll reveal, reduced motion

### Images (3)
- `img/logo.svg` - Phlix wordmark with sound waves
- `img/favicon.svg` - Simple "P" favicon
- `img/og.png` - Generated social card

### Config Files (2)
- `robots.txt` - Search engine indexing
- `sitemap.xml` - All pages indexed

### Documentation (2)
- `SITE.md` - Design document
- `BUILD_LOG.md` - This file

## Compliance Checklist

- [x] Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- [x] License: MPL-2.0 (server/hub), MIT (clients/plugins)
- [x] 4 native clients + DLNA — never "5"
- [x] 8 features from content.json
- [x] 6 FAQ from content.json
- [x] Footer: 3 columns + "Open-source media, on your terms."
- [x] No Google Fonts CDN — self-hosted fonts only
- [x] CSS @copyright inside `/* */` comment blocks
- [x] Grid: `minmax(0, 1fr)` not bare `1fr`
- [x] All pages: OG + Twitter meta, `twitter:creator=@detain`
- [x] Install command in hero CTA of index.html AND in download.html
