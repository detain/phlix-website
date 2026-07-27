# BUILD_LOG.md — holographic-future

## What was built

Full regeneration of the holographic-future brand-kit site under `sites/holographic-future/`.

### Files created / overwritten

| File | Notes |
|------|-------|
| `index.html` | Home — 5 sections: hero-reveal, core-dimensions, proof-band, visit-paths, cta-portal |
| `features.html` | Spec-sheet layout — all 8 features as detail cards |
| `clients.html` | Device-rack layout — 5 clients with highlights |
| `download.html` | Portal-entry layout — install command, client picker, ecosystem |
| `plugins.html` | Plugin model + ecosystem + write your own |
| `docs.html` | Link-out to external VitePress docs |
| `hub.html` | Hub relay explanation + self-host vs public + client modes |
| `about.html` | Philosophy + License + Contributing + FAQ (man-page, Lux persona) |
| `404.html` | Signal Lost — Lux in dark dimension, 3 recovery links, noindex |
| `css/base.css` | Reset, tokens, @font-face declarations, skip-link, reduced-motion |
| `css/theme.css` | Typography, containers, glassmorphism, code blocks |
| `css/components.css` | Nav, footer, buttons, cards, FAQ, device-rack, portal, visitor paths, mascot, easter eggs |
| `js/main.js` | Nav toggle, reduced-motion (both transitions AND animations), seasonal activation, logo egg, typed-word egg, Lux mascot, scroll parallax, scroll reveal |
| `robots.txt` | Sitemap reference |
| `sitemap.xml` | 8 pages, no 404.html |
| `REGEN_PLAN.md` | Experience field table, nav diff, carry-forward, ambiguities |
| `SITE.md` | Design rationale |
| `BUILD_LOG.md` | This file |

### Deviation: img/lux.svg not available

The kit's `mascot.behavior` calls for Lux the holographic companion. `img/lux.svg` is not in the `img/` directory (no pre-generated mascot sprite was provided). The hero section uses a CSS-only prismatic shard representation (`<div id="mascot-lux">` with gradient and box-shadow) so JS behavior and tip system remain fully wired without an external image. The CSS selector `#mascot-lux` still matches. The JS and behavior are fully functional.

**Resolution:** CSS prismatic shard div; no missing asset.

### Deviation: Orbitron 300 not available

The font pool has `orbitron-400-latin.woff2` and `orbitron-700-latin.woff2` but no `orbitron-300-latin.woff2`. The kit asks for weight 300 in the headline face. Used 400 as the nearest declared available weight. Documented in REGEN_PLAN.md.

### Old site carry-forward

- `img/` directory (logo.svg, favicon.svg, og.svg, og.png, icon PNGs, PROMPTS.md) — kept exactly as-is
- `manifest.webmanifest` — retained from old build (not in required inventory but harmless)

### Old site issues fixed

- **Missing 404.html** — added
- **Wrong nav labels** — generic Home/Features/… replaced with Signal/Calibrate/Dimensions/Interface/Relay/Spectrum
- **Missing section ids** — 5 new ids: hero-reveal, core-dimensions, proof-band, visit-paths, cta-portal
- **Wrong font weights** — removed all 300/500/600/900 references for faces without those files
- **Missing @copyright** — added to all 3 CSS files and main.js
- **No contrast-safe substitutes** — used measured safe colors from kit-brief contrast table
- **No seasonal activation** — live-js date-gate added
- **No easter eggs** — both (logo-clicks:7, typed-word:refract) wired
- **No reduced-motion** — both transition AND animation disabled
- **Wrong strong font-weight** — used 500 (Inter declared at 300/400/500)
