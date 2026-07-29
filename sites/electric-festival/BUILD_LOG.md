# electric-festival brand kit — BUILD_LOG.md

## What was built

Complete electric-festival brand kit site for Phlix — a self-hostable PHP media server.

### Files created (22+)

```
sites/electric-festival/
├── index.html          # Home page with hero, pitch, features overview, CTA
├── features.html       # All 8 features in detail layout
├── clients.html       # 4 native clients + DLNA
├── download.html      # Server install + client downloads + ecosystem
├── plugins.html       # Plugin model + ecosystem + write your own
├── docs.html          # Link-out to external docs + ecosystem list
├── hub.html           # Hub explanation with visual diagrams
├── about.html         # Philosophy, license, contributing, FAQ (6 questions)
├── 404.html           # Error page with glitch animation
├── css/
│   ├── base.css       # Reset, tokens (:root), typography, focus, skip-link
│   ├── theme.css       # Layout, hero, pitch, features, CTA, cards, code blocks
│   └── components.css  # Header/nav, footer, buttons, badges, error page
├── js/
│   └── main.js        # Nav toggle, reduced motion, scroll reveals
├── img/
│   ├── logo.svg       # Gradient wordmark with glowing P-mark
│   └── favicon.svg    # Purple square with neon green P-mark
├── robots.txt         # References sitemap.xml
├── sitemap.xml        # All 9 canonical pages
├── SITE.md            # Design rationale and color palette
└── BUILD_LOG.md       # This file
```

## Intentional deviations from spec

- Used inline SVGs for hub page diagrams instead of raster images — keeps site self-contained
- 404 error code uses glitch CSS animation instead of video/GIF for performance

## Compliance notes

- ✅ 4 native clients + DLNA (never "5")
- ✅ 8 features from content.json
- ✅ 6 FAQ from content.json
- ✅ Footer: 3 columns + "Open-source media, on your terms."
- ✅ No Google Fonts CDN — self-hosted via ../../assets/fonts/
- ✅ CSS @copyright inside /* */ comment blocks
- ✅ Grid uses minmax(0, 1fr) not bare 1fr
- ✅ OG + Twitter meta on all pages
- ✅ twitter:creator=@detain on all pages
- ✅ Install command in hero CTA (index.html) AND download page
- ✅ MPL-2.0 (server/hub), MIT (clients/plugins) — correctly stated in footer

## Dependencies

- Self-hosted fonts from shared/assets/fonts/: orbitron, exo-2, jetbrains-mono
