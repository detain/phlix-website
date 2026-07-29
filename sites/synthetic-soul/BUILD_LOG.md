# Synthetic Soul — Build Log

## What Was Built

Complete Phlix brand kit site for `synthetic-soul` with emotional AI / heartbeat pulse theme.

### Files Created (22 total)

**HTML Pages (9)**
- `index.html` — Home with hero, pitch, features overview, CTA
- `features.html` — All 8 feature details with expanded descriptions
- `clients.html` — 5 clients (Roku, Samsung Tizen, Windows, Mobile, DLNA)
- `download.html` — Server install, client downloads, ecosystem links
- `plugins.html` — Plugin system documentation with LifecycleInterface and manifest schema
- `docs.html` — Documentation link-out page with user guide, API reference, dev docs, hub admin
- `hub.html` — Phlix Hub reverse-tunnel relay explanation
- `about.html` — Philosophy, license (MPL-2.0/MIT), contributing, FAQ (6 items)
- `404.html` — Error page with heart monitor visualization

**CSS (3)**
- `css/base.css` — Reset, CSS custom properties, base element styles
- `css/theme.css` — Typography, layout containers, section components, animations
- `css/components.css` — Header/nav, footer, buttons, cards, badges, FAQ accordion

**JavaScript (1)**
- `js/main.js` — Nav toggle, mood indicator, FAQ accordion, scroll reveals, code block copy, heartbeat hover effects

**Images (3)**
- `img/logo.svg` — Heartbeat line with heart icon and Phlix wordmark
- `img/favicon.svg` — Heart shape with pulse line
- `img/og.svg` — Social share card (1200×630)

**Config (2)**
- `robots.txt` — Sitemap reference
- `sitemap.xml` — 8 canonical pages

**Documentation (2)**
- `SITE.md` — Design rationale, color table, typography, motion philosophy
- `BUILD_LOG.md` — This file

### Content Notes

- **Install command**: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` (copied verbatim from content.json)
- **Clients**: 4 native + DLNA (NOT 5 — no fabricated client)
- **License**: MPL-2.0 (server/hub), MIT (clients/plugins) — stated correctly per content.json
- **FAQ**: 6 items from content.json, verbatim
- **Features**: 8 features from content.json, verbatim
- **No fabricated stats, pricing, or testimonials**

### Theme Implementation

The synthetic-soul kit's emotional AI theme was expressed through:
- Coral/teal/mint color palette with gradient backgrounds
- Heart monitor waveform decorations (`.heart-monitor`)
- Animated mood indicator that tracks scroll depth
- Pulsing animation on primary CTA buttons
- `Cormorant Garamond` / `Crimson Text` typography pairing
- Organic circuit decorative elements (CSS-only)

### Deviations from new_site.md

- No `img/PROMPTS.md` generated (using CSS/SVG-only artwork as per §8 guidance)
- `og.png` shipped as `og.svg` source (PNG rasterization requires external tool per §19.5)

### Known Follow-ups

- Run `node tools/gen-og.mjs --site synthetic-soul` to generate rasterized `og.png`
- Test at 320px and 200% zoom with `node tools/render-check.mjs --site synthetic-soul`
