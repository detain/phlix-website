# Velocity Rush — Brand Site

## Overview

Velocity Rush is a speed-first brand kit for Phlix media server, styled around night racing aesthetics. The site uses electric cyan (#00F5FF) as primary, hot pink (#FF2D55) as secondary, and a dark #1C1C1E background. Typography uses Barlow Condensed for headlines and JetBrains Mono for data/lap-time readouts.

## Brand Kit

- **File:** `brand-kits/velocity-rush.js`
- **Archetype:** Outlaw (bold, fast, competitive)
- **Experience archetype:** immersive
- **Palettes:** #00F5FF (cyan), #FF2D55 (hot pink), #1C1C1E (dark), #FF9500 (orange), #30D158 (green)

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/velocity-rush/` | Blur-to-focus hero, speed grid features, lap records trust band, CTA |
| Features | `/velocity-rush/features.html` | All 8 features as live lap-time readouts |
| Clients | `/velocity-rush/clients.html` | 6 clients: Roku, Samsung Tizen, Windows, Android, iOS, Web |
| Download | `/velocity-rush/download.html` | Server install one-liner + client selector + ecosystem repos |
| Plugins | `/velocity-rush/plugins.html` | Plugin system with manifest.json example |
| Docs | `/velocity-rush/docs.html` | Link to full documentation site |
| Hub | `/velocity-rush/hub.html` | Phlix Hub relay diagram and features |
| About | `/velocity-rush/about.html` | Philosophy, License, Contributing, FAQ |
| 404 | `/velocity-rush/404.html` | "Wrong exit" error page |

## Design System

### CSS Files

- `css/base.css` — Reset, design tokens, @font-face declarations
- `css/theme.css` — Typography, layout, page structure, hero backdrop animation
- `css/components.css` — Buttons, cards, badges, forms, FAQ, trust band, mascot

### Key Visual Elements

- **Speed streaks:** Repeating gradient backgrounds animated via CSS
- **Blur-to-focus:** `@keyframes blur-reveal` on hero content (respects `prefers-reduced-motion`)
- **Elastic snap-back:** Hover transforms use `cubic-bezier(0.34, 1.56, 0.64, 1)` for overshoot
- **Lap-time readouts:** Monospace stat cards showing sync specs
- **Parallax racing stripes:** Skewed gradient dividers between sections
- **Mascot Rush:** Speed-bolt figure in bottom-right corner with tips and easter eggs

### Typography

- Headlines: Barlow Condensed 700/800
- Body: Barlow 400/500
- Data/lap-time: JetBrains Mono 400/600
- All fonts self-hosted via WOFF2 from shared `assets/fonts/` pool

### Accessibility

- Skip link to main content
- `aria-current="page"` on active nav links
- `prefers-reduced-motion` honored: blur effects become instant sharp, parallax disabled, mascot idle animation disabled
- All icons use `aria-hidden="true"` with `focusable="false"`
- Focus rings use `--color-focus` with outer glow

### JavaScript Features

- Mobile hamburger nav toggle
- Scroll reveal via IntersectionObserver
- FAQ accordion (one open at a time)
- Install code copy button
- Seasonal activation (Night Circuit 09-01..10-31, Championship Lap 11-01..11-30)
- Mascot Rush: tips, dismiss via localStorage, 5-click speed trail easter egg
- Typed "velocity" → speed trail easter egg
- Section blur-to-focus on scroll

## Navigation Labels (Velocity Rush branding)

| Page | Label |
|------|-------|
| Home | LAUNCH |
| Features | SPEED GRID |
| Clients | PIT CREW |
| Download | GET IN |
| Hub | RELAY |
| About | DATA |
| Plugins | (demoted, linked from features) |
| Docs | (demoted, footer link) |

## File Structure

```
velocity-rush/
├── index.html
├── features.html
├── clients.html
├── download.html
├── plugins.html
├── docs.html
├── hub.html
├── about.html
├── 404.html
├── css/
│   ├── base.css
│   ├── theme.css
│   └── components.css
├── js/
│   └── main.js
├── img/
│   ├── logo.svg
│   ├── favicon.svg
│   └── og.svg
├── robots.txt
└── sitemap.xml
```

## Build

Site is static — no build step required. CSS and JS are served directly.

## Theme Color

`#1C1C1E` — Night Asphalt dark background for the entire site.
