# Velocity Rush — Build Log

## Build Date

2026-07-28

## Site Created

Built from `brand-kits/velocity-rush.js` brand kit specification.

## Files Created

### CSS (3 files)
- `css/base.css` — Reset, design tokens, @font-face (Barlow Condensed, Barlow, JetBrains Mono)
- `css/theme.css` — Layout, hero with speed streaks, footer with racing stripe accent
- `css/components.css` — All UI components, mascot Rush, easter eggs

### JS (1 file)
- `js/main.js` — Nav, scroll reveal, FAQ, copy button, seasonal, mascot Rush, easter eggs

### HTML (9 files)
- `index.html` — Home: LAUNCH hero, SPEED GRID, LAP RECORDS, FULL THROTTLE CTA
- `features.html` — All 8 features as lap-time readouts
- `clients.html` — 6 clients (Roku, Tizen, Windows, Android, iOS, Web)
- `download.html` — Server install, client selector, ecosystem repos
- `plugins.html` — Plugin manifest example and hook documentation
- `docs.html` — Links to full documentation site
- `hub.html` — Hub relay diagram and features
- `about.html` — Philosophy, License, Contributing, FAQ
- `404.html` — "Wrong exit" error page

### Images (3 files)
- `img/logo.svg` — VELOCITY RUSH wordmark with speed bolt, cyan on dark
- `img/favicon.svg` — Speed bolt favicon, 32x32, cyan on dark
- `img/og.svg` — Open Graph image, 1200x630, dark with speed streaks

### Config (4 files)
- `robots.txt` — Allow all
- `sitemap.xml` — All 9 pages listed
- `SITE.md` — This file
- `BUILD_LOG.md` — Build documentation

## Brand Kit Reference

Source kit: `brand-kits/velocity-rush.js`

Key design decisions from kit:
- Archetype: Outlaw — bold, competitive, fast
- Experience: immersive
- Palette: #00F5FF (cyan), #FF2D55 (pink), #1C1C1E (dark), #FF9500 (orange), #30D158 (green)
- Typography: Barlow Condensed (headlines), Barlow (body), JetBrains Mono (data)
- Animation: blur-to-focus reveal, elastic snap-back, speed streaks
- Mascot: Rush — speed bolt figure, bottom-right corner
- Signature element: lap-time counters replace progress bars

## Verification

- All HTML files link local CSS and JS (no CDN)
- All icons are inline SVG (no icon CDN)
- All fonts are self-hosted WOFF2 (no Google Fonts CDN)
- `prefers-reduced-motion` fully respected
- No console.log or debug statements
- robots.txt and sitemap.xml included
- OG image referenced in all page headers

## Lint Check

Run: `npm run lint 2>&1 | head -50`

Expected: Clean pass with no errors.

## Commit

```
git add sites/velocity-rush/ brand-kits/velocity-rush.js
git commit -m "feat: add velocity-rush brand kit and site (speed racing theme)"
git push origin master
```
