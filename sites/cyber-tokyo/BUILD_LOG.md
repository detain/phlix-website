# BUILD_LOG.md — Cyber Tokyo brand-kit site

## Build Summary

**Kit:** cyber-tokyo (base kit)
**Version:** 1.0
**Built:** 2026-07-26
**Layout archetype:** immersive — hyper-dense neon Tokyo midnight aesthetic
**Site path:** `sites/cyber-tokyo/`

## What was built

- **10 HTML pages** (index, features, clients, download, plugins, docs, hub, about, 404.html, city-tour.html)
- **3 CSS files** (base.css — token foundation, theme.css — typography/layout, components.css — UI components)
- **1 JS file** (main.js — nav toggle, reduced-motion, scroll reveals, glitch hover, easter eggs, mascot, seasonal activation)
- **Image assets** (logo.svg, favicon.svg, og.svg, og.png — preserved from previous build)
- **4 support files** (robots.txt, sitemap.xml, SITE.md, BUILD_LOG.md, REGEN_PLAN.md)

## Changes from Previous Build

### Nav labels fixed
- Changed from generic (Home, Features, Clients, Download, Plugins, Docs, Hub, About)
- To kit-specific (Signal, Channels, Screens, Install, Relay, Contact)
- Plugins and Docs demoted to footer links only

### Homepage section IDs added
1. `#neon-opening` (hero)
2. `#signal-strength` (features-overview)
3. `#why-signal` (pitch)
4. `#proof-of-signal` (proof section)
5. `#join-network` (CTA banner)

### New pages created
- **404.html** — "Signal Lost" concept, neon-glitch aesthetic, recovery links to home/features/download
- **city-tour.html** — Visual showcase of Cyber Tokyo brand elements (colors, typography, shadows, motion)

### Install command corrected
- Changed from wrong `composer require` to correct one-liner from content.json:
  `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- `from_source` labeled explicitly as "(development checkout, not an install)"

### Easter eggs implemented
1. `logo-clicks:5` — Logo click counter triggers "SIGNAL FOUND" neon flash
2. `typed-word:neon` — Type "neon" anywhere triggers "ネオン — NEON" flash
3. `konami-code` — Up Up Down Down Left Right Left Right B A triggers "コード完了 — ACCESS GRANTED"

### Mascot (Pixel the koi fish) implemented
- Appears on Home, Download, Clients, Features pages
- Bottom-right floating position (in-flow on mobile)
- Idle animation (drifting) disabled under reduced-motion
- Hover tip shows contextual message
- Dismiss persists via localStorage
- Click triggers spin animation

### Seasonal activation
- Live-js date gating activates seasonal color overrides:
  - Sakura Season (03-20..04-15): primary #FF69B4, secondary #FF00AA
  - Obon Night (08-13..08-16): primary #FF6600, secondary #FFB300
  - New Year (12-29..01-03): primary #FFD700, secondary #00FF41

## CSS additions
- `.proof-section` / `.proof-inner` — proof-of-signal section styles
- `.error-page` / `.error-kanji` / `.glitch-char` — 404 page styles
- `.tour-section` / `.color-grid` / `.color-swatch` — city-tour page styles
- `.type-showcase` / `.shadow-showcase` / `.mascot-pixel` — additional components

## Font notes
- Self-hosted WOFF2 via @font-face pointing to shared pool (`../../assets/fonts/`)
- Space Grotesk 900 weight mapped to 700 file (900 not available in pool)
- IBM Plex Sans 600 used for UI role (declared in kit)
- All @copyright headers present on all CSS/JS files

## Verification

```
[selfcheck] 1/1 site(s) pass
```

- 8 @font-face rules present
- 6 kit nav labels all present
- 5/5 narrative sections in correct order
- 17 hex colors, 59 pairs clear 4.5:1 contrast
- JS size: 13.9 KB

## Technical accuracy

All product claims match `content.json` and new_site.md §16. No invented features. All links use correct external targets. License correctly stated as MPL-2.0 (server + hub) / MIT (libs + plugins + clients).

## Intentionally omitted

- Artwork for seasonal motif assets (`img/seasonal/sakura-petals.svg`, etc.) — kit requests them but files don't exist. Noted; not a defect per spec.
