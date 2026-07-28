# Blaze Runner — Brand Site

## Overview

Brand kit and marketing site for the **Blaze Runner** Phlix theme — a fire/ember aesthetic with particle systems, charred edges, and ember glow effects.

## Brand Identity

- **Palette**: Flame Orange (#FF4500), Bright Orange (#FF6B00), Gold (#FFD700), Cinder Red (#8B0000), Deep Black (#1A0A00)
- **Archetype**: Magician (transformative, powerful)
- **Experience**: Immersive (dark with fire glow)
- **Motion**: Ember particle rise, flame flicker, heat shimmer, burn-reveal transitions
- **Twist**: "Trending now" content glows ember gold (#FFD700)

## Site Architecture

```
blaze-runner/
├── index.html          # Homepage
├── features.html        # Feature grid
├── clients.html         # Client apps
├── download.html        # Install guide
├── plugins.html         # Plugin system
├── docs.html            # Documentation links
├── hub.html             # Phlix Hub relay
├── about.html           # Philosophy, license, FAQ
├── 404.html             # Error page
├── css/
│   ├── base.css         # CSS reset, design tokens, fonts
│   ├── theme.css        # Typography, layout, page structure
│   └── components.css   # Navigation, footer, buttons, cards
├── js/
│   └── main.js          # Ember particles, mobile nav, scroll reveals
├── img/
│   ├── logo.svg         # Full logo with flame motif
│   ├── favicon.svg      # Flame favicon
│   └── og.svg           # Open Graph image
├── robots.txt
├── sitemap.xml
├── SITE.md              # This file
└── BUILD_LOG.md         # Build and commit history
```

## Design Tokens

All tokens are defined in `css/base.css` as CSS custom properties:

- `--color-primary: #FF4500` — Flame Orange
- `--color-secondary: #FF6B00` — Bright Orange
- `--color-tertiary: #FFD700` — Gold (blaze twist glow)
- `--color-bg: #1A0A00` — Deep Black
- `--color-surface: #2D1500` — Charcoal
- `--color-surface-alt: #3D1F00` — Burnt Umber
- `--color-text: #FFF5E6` — Flame White
- `--color-shadow: rgba(45,10,0,0.60)` — Ember Shadow

## Key Features

- **Ember particle canvas**: Full-viewport canvas layer with rising ember particles (desktop only, disabled for `prefers-reduced-motion`)
- **Heat shimmer**: CSS keyframe animation on hero headline simulating heat distortion
- **Flame flicker**: Opacity pulse animation on key UI elements
- **Charred edge cards**: Layered box-shadow technique on all cards and panels
- **Tr blaze twist**: First 3 feature cards on the homepage have a gold ember glow halo via CSS `::before` pseudo-element
- **Self-hosted fonts**: Bangers, Barlow, Barlow Condensed, Barlow Semi Condensed, JetBrains Mono — all via shared WOFF2 pool at `../../../shared/assets/fonts/`

## Brand Kit

Full specification: `../../brand-kits/blaze-runner.js`

## Authors

- Joe Huss <detain@interserver.net>

## License

Phlix is MPL-2.0 (server/hub) and MIT (clients/plugins). This brand site is for Phlix marketing purposes.
