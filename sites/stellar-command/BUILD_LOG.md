# Stellar Command — Build Log

## What Was Built

Complete Phlix brand-kit site for the `stellar-command` brand kit.

### Files Created (22+)

```
sites/stellar-command/
├── index.html          # Home page
├── features.html       # Features detail page
├── clients.html        # Clients showcase
├── download.html       # Download + install instructions
├── plugins.html        # Plugin system documentation
├── docs.html           # Documentation links
├── hub.html            # Phlix Hub information
├── about.html          # About + FAQ
├── 404.html            # Error page
├── css/
│   ├── base.css        # Reset + design tokens
│   ├── theme.css       # Typography + layout
│   └── components.css  # Components + animations
├── js/
│   └── main.js         # Mobile nav + scroll reveals
├── img/
│   ├── logo.svg        # Starship wordmark
│   ├── favicon.svg     # 32x32 beacon icon
│   ├── og.svg          # Social card (editable source)
│   └── PROMPTS.md      # Image generation documentation
├── robots.txt          # Crawler instructions
├── sitemap.xml         # Search engine sitemap
├── SITE.md             # Design rationale
└── BUILD_LOG.md        # This file
```

## Design Decisions

### Starship Command Theme
Applied the stellar-command brand kit's "starship bridge" concept throughout:
- Deep space navy backgrounds (#0B132B)
- Navigation beacon cyan accents (#5BC0BE)
- HUD-style corner brackets on featured elements
- Warp-speed blur and beam-up animation effects
- Console-style code blocks with glowing top bezels
- Beacon pulse animations on status indicators

### Typography
Used the brand kit's system UI font stack for both display and body text, with:
- Tight letter-spacing (-0.02em) on headlines
- Uppercase + letter-spaced labels for UI elements
- Generous line-height (1.6) for body text readability

### Layout
- Max content width: 1400px (default), 1200px (narrow)
- 4-column grid for feature cards on desktop
- 2-column responsive grid for feature details
- Generous section padding (4rem) for breathing room

## Content Notes

All content sourced directly from `shared/content.json`:
- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- 8 features, 6 FAQ items, 4 native clients + DLNA
- Ecosystem: phlix-server, phlix-hub, phlix-shared, phlix-docs, phlix-plugin-example
- License: MPL-2.0 (server/hub), MIT (clients/plugins)

## Known Follow-ups

### og.png Generation
The `og.png` (1200x630 raster PNG for social sharing) was not manually created. The SVG source exists at `img/og.svg`. To generate the rasterized PNG:

```bash
node tools/gen-og.mjs --site stellar-command
```

This requires `librsvg2-bin` installed on the system.

### Font Self-Hosting
Per spec requirements, no external CDN fonts are used. The site uses system fonts which are available on all target platforms. If self-hosted WOFF2 fonts are later added to the shared pool, they can be referenced via `../../assets/fonts/...` from the CSS.

## Verification Performed

- All 9 HTML pages created with complete shell structure
- Navigation includes all 8 required links in correct order
- Footer includes all 3 columns from content.json
- All external links point to correct GitHub/docs URLs
- No fabricated content — all facts traceable to content.json
- Install command copied verbatim from content.json.install.primary

## Build Commands

```bash
# Generate OG image
node tools/gen-og.mjs --site stellar-command

# Generate sitemap
node tools/gen-sitemap.mjs --site stellar-command

# Run lint
npm run lint

# Full build
npm run build
```

## Date

Built: 2026-07-29
