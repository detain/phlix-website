# Digital Combat Zone — Site Specification

## Overview

This is the **Digital Combat Zone** brand kit site for [Phlix](https://github.com/detain/phlix-server) — a self-hosted PHP media server. The site follows an aggressive, combat-arena aesthetic where media battles for attention.

## Brand Identity

- **Name:** Digital Combat Zone
- **Tagline:** Your Library. Your Arena. Your Fight.
- **Concept:** A virtual arena where media battles for attention. Quick cuts between streaming content like fight choreography.
- **Palette:**
  - Combat Red: `#FF3E3E`
  - Deep Space: `#1A1A2E`
  - Fire Orange: `#FF6B35`
  - Electric Cyan: `#00D9FF`
  - Midnight Navy: `#16213E`

## Design Elements

### Typography
- Headlines: Bebas Neue (system fonts with web font fallback)
- Body: Exo 2
- Mono: Share Tech Mono

### Visual Effects
- Particle explosion bursts on CTA clicks
- Speed lines radiating from key elements
- Glitching borders on cards and borders
- Screen-shake micro-effect on major interactions
- Impact rings on hover states

### Motion
- Impact entrance animations (scale + blur)
- Fast, punchy transitions
- All animations respect `prefers-reduced-motion`

## Site Structure

```
digital-combat-zone/
├── index.html        # Homepage (8 sections)
├── features.html     # Evidence Files
├── clients.html      # The Network
├── download.html     # Get Access
├── plugins.html      # Plugin System
├── docs.html         # Documentation
├── hub.html          # Reach Anywhere
├── about.html        # Combat Logs
├── 404.html          # Mission Failed
├── css/
│   ├── base.css      # Reset + Design Tokens
│   ├── theme.css     # Layout + Typography
│   └── components.css # Buttons + Cards
├── js/
│   └── main.js       # Nav + FAQ + Effects
├── img/
│   ├── logo.svg      # Combat target + wordmark
│   ├── favicon.svg   # Target reticle icon
│   └── og.svg        # Social sharing image
├── robots.txt
├── sitemap.xml
├── SITE.md           # This file
└── BUILD_LOG.md      # Build log
```

## Pages

1. **index.html** — Hero + Story + Features + Proof + CTA
2. **features.html** — 8 feature cards
3. **clients.html** — 5 client platforms
4. **download.html** — Install + Clients
5. **plugins.html** — Plugin system
6. **docs.html** — Documentation links
7. **hub.html** — Hub connectivity
8. **about.html** — Story + FAQ
9. **404.html** — Mission Failed

## Technical Notes

- Self-hosted fonts via WOFF2 from shared asset pool
- Inline SVG icons (no external icon CDNs)
- CSS animations only (no JS animation libraries)
- All `prefers-reduced-motion` respected
- No Google Fonts CDN
- WCAG AA contrast compliance

## Build

```
npm run lint
git add sites/digital-combat-zone/ brand-kits/digital-combat-zone.js
git commit -m "feat: add digital-combat-zone brand kit and site"
git push origin master
```

## License

MPL-2.0 — Joe Huss 2026
