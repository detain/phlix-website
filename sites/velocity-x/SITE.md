# Velocity X — Site Specification

## Overview

Velocity X is an extreme sports-themed brand kit and marketing site for Phlix Media Server. The aesthetic fuses BMX, skateboarding, and motocross culture with the media server experience — raw, kinetic, rebellious, and unapologetically bold.

## Brand Kit

**File:** `brand-kits/velocity-x.js`

**Palette:**
- Hot Pink: `#FF0055` — Primary CTA, main accent
- Electric Blue: `#00AAFF` — Secondary actions, hover states
- Volt Yellow: `#FFFF00` — Warnings, elite badges
- Pitch Black: `#000000` — Universal background
- Concrete Gray: `#333333` — Muted UI, borders

**Archetype:** Outlaw (bold, rebellious, extreme)
**Experience Archetype:** Immersive (kinetic, energetic, dynamic)

## Design Language

### Typography
- **Headlines:** Bebas Neue (condensed, bold, uppercase)
- **Body:** Space Grotesk (modern, legible)
- **Monospace:** Space Mono (technical data, code)

### Visual Elements
- Spray paint splatter texture overlays
- Bold angular slash dividers (15–30 degree cuts)
- Sticker-bomb layer effects
- Wheel spin mark motifs
- No rounded corners (max 2px radius)

### Motion
- Kickflip card transitions
- Wheel spin scroll effects
- Spray burst reveals
- All animations respect `prefers-reduced-motion`
- Fast animation speeds (80–250ms)

## Site Structure

```
sites/velocity-x/
├── index.html         # Homepage — hero, features, stats, CTA
├── features.html      # Full feature list (8 features)
├── clients.html      # Platform support (8 platforms)
├── download.html     # Server + client installation
├── plugins.html      # Plugin ecosystem
├── docs.html         # Documentation links
├── hub.html          # Remote access relay
├── about.html        # Philosophy, license, contributing, FAQ
├── 404.html          # Wipeout error page
├── css/
│   ├── base.css      # Reset, tokens, global styles
│   ├── theme.css     # Layout, hero, buttons, cards
│   └── components.css # Tabs, accordion, badges, etc.
├── js/
│   └── main.js       # Scroll animations, nav, interactions
├── img/
│   ├── logo.svg      # Brand logo
│   ├── favicon.svg   # Favicon
│   └── og.svg        # Open Graph image
├── robots.txt
└── sitemap.xml
```

## Key Pages

### Homepage (`index.html`)
- Full-bleed hero with wheel spin decoration
- Animated stat counters
- Feature cards with sticker-bomb hover
- CTA strip

### Features (`features.html`)
- 8 feature cards with icons
- Lead trick badges on featured features
- Platform CTA

### Clients (`clients.html`)
- 8 platform cards (Roku, Apple TV, Android TV, iOS, Windows, macOS, Linux, Web)
- DLNA note

### Download (`download.html`)
- Server install (curl command)
- Docker command
- 8 client download links
- Ecosystem section

### About (`about.html`)
- Philosophy (4 pillars)
- GPLv3 license block
- Contributing guide
- FAQ with accordion

## Navigation

```
DROP IN (home) | THE LINEUP (features) | THE CREW (clients) | GET IT (download) | THE RELAY (hub) | THE STATS (about)
```

## Interactions

- Mobile hamburger nav
- Scroll-triggered entrance animations
- Accordion FAQ
- Copy-to-clipboard on code blocks
- Counter animation on stats
- Tab panels
- `prefers-reduced-motion` honored throughout

## Accessibility

- Skip-to-content link
- Semantic HTML (`<header>`, `<main>`, `<nav>`, `<footer>`)
- ARIA labels on interactive elements
- 2px hot-pink focus ring
- WCAG AA contrast ratios maintained

## Build Notes

- Self-hosted fonts (Bebas Neue, Space Grotesk, Space Mono)
- No Google Fonts CDN
- No icon CDNs — inline SVG only
- CSS custom properties for all design tokens
- CSS-only animations where possible (JS for scroll triggers)
