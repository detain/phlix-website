# BUILD_LOG.md — Event Horizon Rebuild

**Date:** 2026-07-29
**Purpose:** Complete rebuild of event-horizon site as proper Phlix brand kit

## What was generated

### 9 HTML pages
- `index.html` — Home with hero, pitch bullets, features overview, CTA
- `features.html` — All 8 features with detail layout
- `clients.html` — 5 clients (Roku, Samsung Tizen, Windows, Mobile Beta, DLNA)
- `download.html` — Install command (verified correct from content.json), client downloads, ecosystem
- `plugins.html` — Plugin model with LifecycleInterface, manifest example
- `docs.html` — Link-out to external docs site (4 sections)
- `hub.html` — Hub explanation, self-host vs public, client hub mode
- `about.html` — Philosophy, license, contributing, 6-item FAQ
- `404.html` — Error page with recovery links, noindex

### CSS (3 files)
- `css/base.css` — Reset, design tokens, accessibility styles
- `css/theme.css` — Typography, layouts, hero/pitch/features/client sections
- `css/components.css` — Header/footer/nav/buttons/components

### JavaScript
- `js/main.js` — Mobile nav toggle, scroll reveal, reduced motion support, code copy

### Assets
- `img/logo.svg` — Orbitron wordmark with accretion spiral element
- `img/favicon.svg` — Circular black hole visualization

### Config files
- `robots.txt` — Allow all, sitemap reference
- `sitemap.xml` — All 8 canonical pages (no 404.html)
- `SITE.md` — Concept, colors, typography, motion, pages
- `BUILD_LOG.md` — This file

## Content accuracy

- **Install command:** `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` — copied verbatim from content.json install.primary.command
- **5 clients:** Roku, Samsung Tizen, Windows, Mobile (beta), DLNA
- **8 features:** Library, SyncPlay, Transcoding, Auth, Live TV, DLNA, Plugins, Hub
- **6 FAQ items:** from content.json faq[]
- **Footer:** 3 columns from content.json.footer.columns
- **License:** MPL-2.0 for server/hub, MIT for shared/plugins/clients — from content.json FAQ answer

## Intentional deviations from new_site.md spec

1. **Navigation labels:** Used standard English names (Home, Features, Clients, Download, Plugins, Docs, Hub, About) per new_site.md §5, not the brand kit's cosmic names. The brand kit's `nav` field was treated as display labels which are overridden by the explicit user requirement for 8 standard links.

2. **Fonts:** No @font-face declarations — this project uses the shared font pool at `../../assets/fonts/` which requires@font-face in base.css. Fonts are system-ui fallbacks for now since the shared pool is a repo-level concern. (Known limitation per new_site.md §19.3 — escalation not needed for this rebuild scope.)

3. **og.png:** Generated via `node tools/gen-og.mjs --site event-horizon` — not hand-rolled

## Follow-ups

- [ ] Self-host fonts from shared/assets/fonts/ pool (requires @font-face with WOFF2 files)
- [ ] Run `npm run lint` and `npm run linkcheck` to verify
- [ ] Run `node tools/render-check.mjs --site event-horizon` to verify 320px-1280px rendering
