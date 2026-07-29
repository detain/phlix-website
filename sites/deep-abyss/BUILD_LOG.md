# deep-abyss BUILD LOG

## What Was Built

Complete brand kit site for `deep-abyss` theme — Phlix marketing site themed as an abyssal ocean discovery experience.

### Site Structure
```
sites/deep-abyss/
├── index.html          # Home page with hero, pitch, features overview, CTA
├── features.html       # All 8 features with detailed cards
├── clients.html        # 5 clients (4 native + DLNA)
├── download.html      # Server install + clients + ecosystem
├── plugins.html        # Plugin system documentation
├── docs.html           # Documentation links
├── hub.html            # Phlix Hub information
├── about.html          # Philosophy, license, FAQ (6 items)
├── 404.html            # Custom error page
├── css/
│   ├── base.css        # Reset, tokens, base styles
│   ├── theme.css       # Typography, layout, page sections
│   └── components.css  # Header, nav, footer, buttons, cards
├── js/
│   └── main.js         # Mobile nav, reduced motion, scroll reveals
├── img/
│   ├── logo.svg        # Jellyfish logo mark + wordmark
│   ├── favicon.svg     # Simplified jellyfish favicon
│   └── og.png          # Social share image (generated)
├── robots.txt
├── sitemap.xml
├── SITE.md             # Design rationale
└── BUILD_LOG.md        # This file
```

## Key Implementation Details

### Theme Application
- **Background:** Deep ocean gradient (`#0A1628` → `#0E4D64` → `#1B8ABC`)
- **Accent:** Bioluminescent cyan (`#00F5D4`) for CTAs, icons, glows
- **Secondary accent:** Abyssal purple (`#7B2CBF`) for decorative elements
- **Typography:** System fonts (no CDN) with generous spacing

### Content Compliance
- 8 features from `content.json` — all rendered with icons
- 6 FAQ items on about page — all from `content.json`
- 5 clients — 4 native (Roku, Tizen, Windows, Mobile beta) + DLNA
- Install command copied verbatim from `content.json.install.primary`
- Footer tagline: "Open-source media, on your terms."

### Technical Compliance
- Grid uses `minmax(0, 1fr)` for proper overflow handling
- CSS `@copyright` inside `/* */` blocks
- OG image + Twitter meta on every page
- `twitter:creator=@detain` on all pages
- `noindex` on 404.html only
- Self-hosted fonts (system UI stack)

## Deviations from Spec

None — all content sourced from `content.json`, all technical requirements met.

## Build Commands Used

```bash
node tools/gen-og.mjs --site deep-abyss
git add sites/deep-abyss/
git commit -m "feat(deep-abyss): complete brand kit site (ocean depths theme)"
git push origin master
```

## Verification Checklist

- [x] All 9 HTML pages present and valid
- [x] CSS files with proper `@copyright` blocks
- [x] JS file with mobile nav and reduced motion support
- [x] SVG logo and favicon
- [x] og.png generated
- [x] robots.txt and sitemap.xml present
- [x] SITE.md and BUILD_LOG.md created
- [x] Install command on index.html AND download.html
- [x] 8 features rendered
- [x] 6 FAQ rendered
- [x] Footer with 3 columns + tagline
- [x] No Google Fonts CDN
- [x] Grid uses minmax(0, 1fr)
