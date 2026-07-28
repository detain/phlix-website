# Cyber Pursuit — Site Specification

## Overview

Cyber Pursuit is the **Outlaw archetype** brand kit for Phlix — a hacker/Matrix-terminal themed site that embodies the rebellion against corporate media lock-in. The aesthetic is dark, technical, and immersive with Matrix-style falling green code, terminal windows, and boot sequence animations.

## Design Language

### Colors
- **Primary**: `#00FF41` (Matrix Green)
- **Secondary**: `#39FF14` (Cyber Lime)
- **Tertiary**: `#003B00` (Deep Forest)
- **Background**: `#0D0D0D` (Void Black)
- **Surface**: `#1F1F1F` (Terminal Dark)
- **Surface Alt**: `#2A2A2A` (Terminal Alt)
- **Text**: `#E0E0E0` (Phosphor White)
- **Border**: `#333333` (Dim Grid)
- **Error**: `#FF3131` (Glitch Red)
- **Info**: `#00D4FF` (Data Cyan)
- **Warning**: `#FFB000` (Warning Amber)

### Typography
- **Headlines/UI**: Share Tech Mono (Google Fonts fallback: Courier New)
- **Display/Numbers**: VT323 (Google Fonts fallback: Courier)
- **Body**: Share Tech Mono

### Motion
- Matrix-style falling code rain animation (canvas)
- CRT scanline overlay effect
- Typing/reveal animations for hero text
- Glitch flicker on hover states
- Boot sequence animations
- All animations respect `prefers-reduced-motion`

## Site Architecture

### Pages (9 HTML files)
1. **index.html** — Homepage with hero, story, features, stats, CTAs
2. **features.html** — 8 feature modules in terminal window cards
3. **clients.html** — 5 client options (Roku, Samsung, Windows, Mobile, DLNA)
4. **download.html** — Server and client download instructions
5. **plugins.html** — Plugin hook registry and manifest format
6. **docs.html** — Documentation index linking to external docs
7. **hub.html** — Remote access tunnel feature explanation
8. **about.html** — Project story, developer info, FAQ
9. **404.html** — Terminal-style error page

### CSS Files (3)
1. **base.css** — Reset, design tokens, fonts
2. **theme.css** — Layout, navigation, hero, footer, animations
3. **components.css** — Buttons, cards, terminal windows, grids

### JavaScript (1)
1. **js/main.js** — Matrix rain canvas, navigation, scroll reveal, copy buttons

### Assets
- **img/logo.svg** — Phlix wordmark logo
- **img/favicon.svg** — Favicon (32x32)
- **img/og.svg** — Open Graph image
- **robots.txt** — SEO crawler instructions
- **sitemap.xml** — Page index for search engines
- **manifest.webmanifest** — PWA manifest

## Navigation Structure

```
Home → Features → Clients → Download → Plugins → Docs → Hub → About
```

## Key Features

### Matrix Rain
Canvas-based falling code animation with green phosphor glow effect. Runs at ~30fps, respects reduced motion.

### Scanlines
CSS-based horizontal scanline overlay for CRT terminal aesthetic.

### Terminal Windows
Styled containers with header bar showing filename/status, green accent top border.

### Mascot: Ghost
Pulsing cursor character in bottom-right corner. Dismissible via localStorage.

### Glitch Effects
Text glitch animation on wordmark and hero hover states.

## Brand Personality

- **Voice**: Technical, direct, rebellious, wry
- **Tone**: Understated, command-line terse
- **Copy patterns**: `> command output`, `root@phlix:~#`, module/file names
- **Avoid**: warm language, exclamation marks, consumer-friendly phrasing

## Accessibility

- WCAG AA minimum contrast ratios
- Keyboard navigation with visible focus states
- Skip link to main content
- `prefers-reduced-motion` fully respected
- Screen reader friendly HTML structure
