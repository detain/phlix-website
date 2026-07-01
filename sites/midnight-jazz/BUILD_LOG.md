# BUILD_LOG.md — midnight-jazz

**Built:** 2026-07-01
**Kit:** midnight-jazz.js v1.0
**Layout archetype:** Immersive

## What was generated

- `css/base.css` — reset, tokens (:root CSS vars), accessibility, reduced-motion
- `css/theme.css` — typography scale, layout containers, hero, sections, cards
- `css/components.css` — header/nav, footer, buttons, forms, badges, microinteractions
- `js/main.js` — mobile nav toggle, reduced-motion gate, scroll reveals
- `index.html` — Home
- `features.html` — Features
- `clients.html` — Clients
- `download.html` — Download
- `plugins.html` — Plugins
- `docs.html` — Docs
- `hub.html` — Hub
- `about.html` — About + FAQ
- `img/logo.svg` — wordmark with amber spotlight circle
- `img/favicon.svg` — vinyl circle mark in amber/navy
- `img/og.svg` — social card 1200×630
- `img/PROMPTS.md` — image generation prompts
- `robots.txt` — sitemap reference
- `sitemap.xml` — all 8 pages
- `SITE.md` — design rationale

## Design decisions

- Chose **immersive** layout archetype — dark stage with amber spotlight focal points matches the late-night jazz club DNA perfectly.
- Hero includes smoke particle animation (CSS-only, disabled for reduced-motion) + radial amber spotlight glow.
- No CDN fonts used — system font fallbacks with CSS custom properties ready for WOFF2 drop-in.
- Primary CTA ("Get Phlix") is amber with dark text, per the kit's `buttons.primary` spec. Secondary CTA is ghost-style in Cool Slate.
- Card surfaces use Stage Charcoal (#1A2230) on Midnight Navy backgrounds.
- All shadows use cool indigo (#080D14) per the kit's color_rules.
- Voice is quiet, understated, no exclamation marks in UI copy — follows the kit's `writing_style`.

## Intentional deviations from other kits

- No festive illustrations or seasonal motifs
- No bright/pastel anywhere
- No pill buttons except the FAB (floating action play button)
- No warm shadows anywhere — all indigo-tinted

## Known follow-ups

- [ ] Add real photography / hero illustration (currently CSS radial gradient placeholder)
- [ ] Add Miles mascot SVG for empty states (kit defines mascot but illustration not yet generated)
- [ ] Self-hosted font WOFF2 files to improve Lighthouse font score (currently system fallbacks)
- [ ] Verify contrast ratios on all interactive elements with actual colorimeter
