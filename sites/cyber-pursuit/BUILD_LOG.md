# Cyber Pursuit — Build Log

## Build Information
- **Date**: 2026-07-28
- **Site**: cyber-pursuit
- **Brand Kit**: `/home/sites/phlix/phlix-website/brand-kits/cyber-pursuit.js`
- **Site Directory**: `/home/sites/phlix/phlix-website/sites/cyber-pursuit/`

## Site Structure

```
sites/cyber-pursuit/
├── index.html          (Homepage)
├── features.html       (Feature modules)
├── clients.html        (Client options)
├── download.html       (Downloads & install)
├── plugins.html        (Plugin system)
├── docs.html           (Documentation index)
├── hub.html            (Remote access)
├── about.html          (About & FAQ)
├── 404.html            (Error page)
├── css/
│   ├── base.css        (Reset, tokens, fonts)
│   ├── theme.css       (Layout, nav, animations)
│   └── components.css  (UI components)
├── js/
│   └── main.js         (Matrix rain, interactions)
├── img/
│   ├── logo.svg        (Wordmark)
│   ├── favicon.svg     (Favicon)
│   └── og.svg          (Open Graph)
├── robots.txt
├── sitemap.xml
├── manifest.webmanifest
├── SITE.md             (This file)
└── BUILD_LOG.md        (Build metadata)
```

## Files Created

### HTML Pages (9)
- [x] index.html — Homepage with Matrix theme hero
- [x] features.html — 8 module cards in terminal windows
- [x] clients.html — 5 client options grid
- [x] download.html — Server install + Docker + clients
- [x] plugins.html — Hook registry + manifest JSON
- [x] docs.html — 6 documentation links
- [x] hub.html — Tunnel explanation + 3 steps
- [x] about.html — Story + dev info + FAQ accordion
- [x] 404.html — Terminal-style error display

### CSS Files (3)
- [x] css/base.css — 165 lines, design tokens, reset
- [x] css/theme.css — 650+ lines, layout, animations
- [x] css/components.css — 400+ lines, UI components

### JavaScript (1)
- [x] js/main.js — Matrix rain, nav toggle, scroll reveal, copy buttons

### Assets (3)
- [x] img/logo.svg — Phlix wordmark on black
- [x] img/favicon.svg — 32x32 favicon
- [x] img/og.svg — 1200x630 Open Graph image

### Config (3)
- [x] robots.txt — Allow all crawlers
- [x] sitemap.xml — All 9 pages
- [x] manifest.webmanifest — PWA manifest

### Documentation (2)
- [x] SITE.md — Site specification
- [x] BUILD_LOG.md — This file

## Brand Kit Created

- [x] brand-kits/cyber-pursuit.js — Complete brand kit with all schema fields

## Design Implementation

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| primary | #00FF41 | Matrix Green — CTAs, accents |
| secondary | #39FF14 | Cyber Lime — hover, highlights |
| tertiary | #003B00 | Deep Forest — depth |
| bg | #0D0D0D | Void Black — background |
| surface | #1F1F1F | Terminal Dark — cards |
| surface-alt | #2A2A2A | Terminal Alt — hover states |
| text | #E0E0E0 | Phosphor White — body text |
| border | #333333 | Dim Grid — borders |
| error | #FF3131 | Glitch Red — errors |

### Typography
- **Headlines**: Share Tech Mono (monospace terminal aesthetic)
- **Display**: VT323 (digital/retro terminal numbers)
- **Body**: Share Tech Mono
- **Fallbacks**: Courier New, Courier (all monospace)

### Animations
- [x] Matrix falling code rain (canvas, 30fps)
- [x] CRT scanline overlay (CSS)
- [x] Typing effect on hero eyebrow
- [x] Boot sequence lines animation
- [x] Glitch text on wordmark hover
- [x] Scroll reveal with IntersectionObserver
- [x] Cursor blink on mascot
- [x] All respect prefers-reduced-motion

### Components
- [x] Terminal window cards
- [x] Code blocks with copy buttons
- [x] Pitch/feature lists
- [x] Client cards
- [x] Download cards
- [x] FAQ accordion
- [x] Steps layout
- [x] Security cards
- [x] Trust stats band
- [x] CTA ladder

## Quality Checks

- [x] All 9 HTML pages validate structure
- [x] CSS uses design tokens from brand kit
- [x] JS respects prefers-reduced-motion
- [x] No Google Fonts CDN (self-hosted fonts)
- [x] No icon CDNs (inline SVG sprite)
- [x] All interactive elements have focus states
- [x] Skip link present for accessibility
- [x] robots.txt allows crawling
- [x] sitemap.xml lists all pages

## Next Steps

1. Run `npm run lint` to check for errors
2. Fix any lint errors
3. Commit with `git add sites/cyber-pursuit/ brand-kits/cyber-pursuit.js && git commit -m "feat: add cyber-pursuit brand kit and site (hacker terminal theme)" && git push origin master`
