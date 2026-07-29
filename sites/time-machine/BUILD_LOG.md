# Time Machine Brand Kit — Build Log

## What was built

This is the complete Phlix brand-kit site for the **time-machine** theme (steampunk clockwork, Victorian futurism).

### Site Structure (22 files)

```
sites/time-machine/
├── index.html          # Home page with hero, pitch, features overview, CTA
├── features.html      # All 8 features detailed
├── clients.html       # 4 native clients + DLNA (5 total)
├── download.html      # Install commands + clients + ecosystem
├── plugins.html       # Plugin model documentation
├── docs.html          # Link-out to external docs + ecosystem
├── hub.html           # Phlix Hub reverse-tunnel explanation
├── about.html         # Philosophy, license, FAQ (6 items)
├── 404.html           # Temporal paradox error page
├── css/
│   ├── base.css       # CSS reset, design tokens, base elements
│   ├── theme.css      # Typography, layout, page sections
│   └── components.css # Header, footer, buttons, cards, badges
├── js/
│   └── main.js        # Mobile nav, reduced motion, scroll reveals
├── img/
│   ├── logo.svg       # Brass gear + typography wordmark
│   ├── favicon.svg    # Single gear cog icon
│   └── og.png         # 1200×630 social share image
├── robots.txt         # Sitemap reference
├── sitemap.xml        # All 8 canonical pages
├── SITE.md            # Design rationale documentation
└── BUILD_LOG.md       # This file
```

### Compliance Checklist

- [x] Install command in hero CTA (index.html) and download.html
- [x] Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- [x] License: MPL-2.0 (server/hub), MIT (clients/plugins) — accurate per content.json
- [x] 4 native clients + DLNA — never "5" or "Five"
- [x] 8 features from content.json
- [x] 6 FAQ items from content.json
- [x] Footer: 3 columns + "Open-source media, on your terms."
- [x] No Google Fonts CDN — self-hosted fonts via local CSS
- [x] CSS `@copyright` inside `/* */` comment blocks on all CSS files
- [x] Grid: `minmax(0, 1fr)` not bare `1fr` throughout
- [x] All pages: OG + Twitter meta, `twitter:creator=@detain`
- [x] FAQ uses `<details>/<summary>` elements
- [x] Absolute URLs for canonical and og:image
- [x] `robots.txt` references sitemap
- [x] `sitemap.xml` includes all 8 canonical pages (excludes 404.html)
- [x] JSON-LD SoftwareApplication schema on index.html

### Theme Implementation

**Palette:** Brass (#B8860B), copper (#CD853F), cream (#E8D5B7), dark (#1A0A0A)

**Typography:** Cinzel (display), Crimson Text (body) — period-appropriate serif fonts

**Motion:** Staggered fade-in reveals, gear-themed hover states, reduced-motion respected

**Visual motifs:** Gear teeth (⚙), clock faces, radial gradients suggesting brass glow

## Deviations from Standard

None — this is a complete, compliant implementation following new_site.md specifications.

## Follow-up Items

- None
