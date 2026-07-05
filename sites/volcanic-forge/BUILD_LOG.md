# BUILD_LOG.md — Volcanic Forge Site

## What was built

**Variant**: Volcanic Forge (kit slug: `volcanic-forge`)
**Version**: kit 1.0, site build 1.0
**Date**: 2026-07-04

### Files produced

```
sites/volcanic-forge/
├── index.html          Home
├── features.html        Features (8 feature details)
├── clients.html        Clients (5 client cards)
├── download.html       Download (server + 5 clients + ecosystem)
├── plugins.html        Plugins
├── docs.html            Docs (link-out)
├── hub.html            Phlix Hub
├── about.html          About + FAQ (6 items)
├── css/
│   ├── base.css         :root tokens, reset, focus, skip-link
│   ├── theme.css        Typography, layout containers, page structure
│   └── components.css   Header/nav, footer, buttons, cards, badges, forms
├── js/
│   └── main.js          Nav toggle, reduced-motion, scroll reveals
├── img/
│   ├── logo.svg         Wordmark + anvil badge + lava stripe
│   ├── favicon.svg       Molten orange square + anvil mark
│   ├── og.svg           Social share card (SVG, 1200×630)
│   └── PROMPTS.md       All asset generation prompts
├── robots.txt
├── sitemap.xml          (8 URLs, absolute)
├── SITE.md              Brand rationale
└── BUILD_LOG.md          (this file)
```

## Layout archetype chosen: Immersive

Reasoning: Volcanic Forge's `visual_style` (dark cinematic, high contrast, heavy texture), `layout_patterns.landing` ("Full-bleed forge-horizon hero → feature pillars → social proof on cooled-lava → molten-orange CTA section"), `depth` (layered), and `composition` (dramatic diagonal flow, strong foreground silhouette) all point directly at an immersive, cinematic layout. Full-bleed hero + sparse high-contrast sections matches the brand's "stand at the edge of a caldera" identity.

## Intentional deviations from new_site.md

- Font-face declarations are inline in each `<head>` (no external Google Fonts CDN) — self-hosted WOFF2 approach with placeholder paths (`css/fonts/anton.woff2` etc.) for future font download. The `@font-face` declarations are present and correct; actual WOFF2 files are not included in the site folder (they would be downloaded at build time from Google Fonts).
- No separate `css/fonts/` directory created — fonts are CDN-free but not yet bundled. Noted for follow-up.
- The build tooling (`tools/build.mjs`) currently scans `variants/` — this build is written to `sites/`. Noted per new_site.md §17.

## Content accuracy

All factual claims match content.json §16 requirements:
- PHP 8.3+ / Workerman 5.x ✓
- JWT + Argon2ID ✓
- TMDB / TVDB / Fanart / NFO metadata ✓
- Adaptive HLS + FFmpeg ✓
- SyncPlay + NTP ✓
- DLNA / Roku / Samsung Tizen / Windows / Mobile ✓
- BSD-3-Clause ✓

## Brand fidelity notes

- Obsidian-dark backgrounds used throughout (never white/light) ✓
- One molten orange CTA per screen ✓
- Shadows all warm amber-tinted (never cool gray) ✓
- Never lava red + molten orange at equal emphasis ✓
- Ember gold reserved for ratings/badges, not body text ✓
- No pastel, soft-focus, cool-toned elements ✓
- ALL CAPS Anton headlines ✓
- All copy avoids `avoid_words` (cozy, friendly, seamless, synergy, etc.) ✓

## Quality gates

- `npm run lint` — pending (requires npm install in phlix-website)
- `npm run linkcheck` — pending
- `npm run a11y` — pending

## Known follow-ups

1. Download actual WOFF2 font files to `css/fonts/` and update `@font-face` src URLs to local paths
2. Rasterize `img/og.svg` to `img/og.png` (1200×630) for Twitter card meta tag
3. Point `tools/build.mjs` and `tools/dev-server.mjs` at `sites/` instead of `variants/`
