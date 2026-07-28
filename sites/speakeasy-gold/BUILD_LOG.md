# BUILD_LOG.md — Speakeasy Gold

## Generated 2026-07-28

## What was built

- **9 HTML pages**: index, features, clients, download, plugins, docs, hub, about, 404
- **3 CSS files**: base.css, theme.css, components.css
- **1 JS file**: main.js
- **Static assets**: robots.txt, sitemap.xml, SITE.md, BUILD_LOG.md, REGEN_PLAN.md

## Design decisions

- **experience_archetype**: narrative-scroll — homepage sections scroll as distinct "acts" with narrative flow
- **site_architecture**: 6 nav items (The Lobby, The Vault, Every Room, Get the Password, The Tunnel, Our Story) with plugins/docs demoted to footer
- **homepage_narrative.sections[]**: curtain-rise → the-vault → why-belong → good-seats → knock-on-door
- **mascot**: Gilda appears on home, download, and about pages (bottom-right corner on desktop, in-flow on mobile)
- **intensity_toggle**: "Dim the House Lights" toggle in footer — session-persistent
- **easter_eggs**: logo-clicks:7 (champagne burst + Gilda) and typed-word:"speakeasy" (amber glow pulse)
- **error_page_experience**: "No Show" card with Gilda and empty marquee icon

## Deviation from kit notes

- Kit uses `content.json` facts only — no invented copy
- Kit uses measured contrast substitutes per §19.1
- Cormorant Garamond strong at 600 (not 500) per §19.17

## CSS architecture

- Uses `minmax(0, 1fr)` on all grid tracks per §19.12
- Uses `overflow-wrap: anywhere` on body text per §19.12
- No `overflow: hidden` on content containers

## Fonts

All from shared pool, self-hosted:
- Poiret One 400
- Cinzel Decorative 400, 700
- Cormorant Garamond 400, 500, 600
- Josefin Sans 300, 400, 600, 700
- Share Tech Mono 400

## Follow-ups

- Generate og.png with `node tools/gen-og.mjs --site speakeasy-gold`
- Run render-check if puppeteer issue resolves
