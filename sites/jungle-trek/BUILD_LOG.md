# Jungle Trek — BUILD LOG

## Site Overview
**Theme:** Dense rainforest expedition, canopy layers, exotic wildlife
**Palette:** `#0D2B0D` (dark forest), `#228B22` (forest green), `#8B7355` (earthy brown), `#F5DEB3` (wheat), `#FFD700` (gold)

## Build Date
2026-07-29

## Files Created

### HTML Pages (9)
- [x] `index.html` — Hero landing, install command in CTA
- [x] `features.html` — 8 feature details + 6 FAQ items
- [x] `clients.html` — 4 native clients + DLNA
- [x] `download.html` — Install block + client cards + ecosystem
- [x] `plugins.html` — Plugin contract + example + ideas
- [x] `docs.html` — Documentation links grid
- [x] `hub.html` — How it works + self-hosted vs public
- [x] `about.html` — Project info + ecosystem + licenses
- [x] `404.html` — Path not found page

### CSS (3 - already existed)
- [x] `css/base.css` — Reset, tokens, self-hosted fonts
- [x] `css/theme.css` — Typography scale, colors
- [x] `css/components.css` — Header, footer, cards, badges, etc.

### JavaScript (1)
- [x] `js/main.js` — Navigation, mascot (Trek), seasonal variants, easter eggs

### Images (3)
- [x] `img/logo.svg` — Jungle Trek wordmark with leaf motif
- [x] `img/favicon.svg` — Leaf in emerald circle favicon
- [x] `img/og.png` — Generated via `node tools/gen-og.mjs --site jungle-trek`

### Config (4)
- [x] `robots.txt` — Allow all, point to sitemap
- [x] `sitemap.xml` — All 9 pages with priorities
- [x] `SITE.md` — Theme documentation
- [x] `BUILD_LOG.md` — This file

## Compliance Checklist

### Branding
- [x] Palette used: `#0D2B0D` `#228B22` `#8B7355` `#F5DEB3` `#FFD700`
- [x] Theme: jungle/rainforest/expedition
- [x] Navigation uses jungle-themed labels (BASE CAMP, THE EXPEDITION, etc.)
- [x] Mascot "Trek" with safari outfit (hat, binoculars, compass)

### Content
- [x] 8 features from content.json
- [x] 6 FAQ from content.json
- [x] 4 native clients + DLNA (never "5" or "Five")
- [x] Footer: 3 columns + "Open-source media, on your terms."

### Technical
- [x] No Google Fonts CDN — self-hosted fonts (Libre Baskerville)
- [x] CSS @copyright inside `/* */` comment blocks
- [x] Grid uses `minmax(0, 1fr)` not bare `1fr`
- [x] All pages: OG + Twitter meta
- [x] `twitter:creator=@detain` on all pages
- [x] Install command in hero CTA of index.html
- [x] Install command in download.html hero section

### Install Command (SINGLE SOURCE OF TRUTH from content.json)
```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

## Git Commit
```
feat(jungle-trek): complete brand kit site (rainforest expedition theme)
```