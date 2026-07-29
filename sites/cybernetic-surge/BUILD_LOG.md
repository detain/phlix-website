# BUILD_LOG.md — Cybernetic Surge Site Build

**Date:** 2026-07-29
**Brand kit:** cybernetic-surge.js (v1.0)
**Build type:** Complete rebuild from scratch

---

## What Was Built

### Pages (9 total)
| Page | File | Notes |
|------|------|-------|
| Home | `index.html` | Hero with Syntha mascot, pitch bullets, features overview, CTA |
| Features | `features.html` | All 8 features in detail grid |
| Clients | `clients.html` | 5 clients (Roku, Tizen, Windows, Mobile, DLNA) |
| Download | `download.html` | Install command, clients, ecosystem |
| Plugins | `plugins.html` | Plugin model, LifecycleInterface code, example link |
| Docs | `docs.html` | Link-out to external docs with ecosystem list |
| Hub | `hub.html` | Relay explanation, deployment options |
| About | `about.html` | Philosophy, license, contributing, FAQ |
| 404 | `404.html` | Signal lost error page |

### Assets
| Asset | File | Notes |
|-------|------|-------|
| CSS: Reset + Tokens | `css/base.css` | Modern reset, CSS custom properties |
| CSS: Theme | `css/theme.css` | Typography, layout, page sections |
| CSS: Components | `css/components.css` | Header, nav, footer, buttons, cards |
| JavaScript | `js/main.js` | Nav toggle, reduced motion, scroll reveals |
| Logo | `img/logo.svg` | Orbitron wordmark + hexagonal circuit badge |
| Favicon | `img/favicon.svg` | Hexagonal circuit node |
| OG Image | `img/og.svg` | SVG source (PNG generated via tools/gen-og.mjs) |
| Prompts | `img/PROMPTS.md` | Image generation prompts |

### Config Files
| File | Purpose |
|------|---------|
| `robots.txt` | References sitemap |
| `sitemap.xml` | All 8 canonical pages |
| `SITE.md` | Design rationale |
| `BUILD_LOG.md` | This file |

---

## Content Notes

### Install Command
Used verbatim from `shared/content.json`:
```bash
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

### Clients
- 4 native clients: Roku, Samsung Tizen, Windows, Mobile (beta)
- 1 built-in: Any DLNA device

### License
- Server (phlix-server, phlix-hub): **MPL-2.0**
- Clients, plugins, shared libs: **MIT**

### Nav Labels (from brand kit override)
- Home → Signal
- Features → Calibrate
- Clients → Interfaces
- Download → Install
- Hub → Relay
- About → System

Demoted pages (in footer only):
- Plugins
- Docs

---

## Intentional Deviations from Default Structure

1. **Custom nav labels** — Used brand kit's `site_architecture.nav` instead of standard labels
2. **Demoted pages** — plugins and docs moved to footer per brand kit's `demoted_pages` spec
3. **Syntha mascot** — Simplified SVG in hero section per brand kit's `mascot.behavior`
4. **Footer tagline** — Used brand kit's `copy_overlay.footer_tagline`

---

## Known Follow-ups

1. **og.png** — SVG source created, but PNG must be generated with:
   ```bash
   node tools/gen-og.mjs --site cybernetic-surge
   ```
2. **Self-check** — Run when ready:
   ```bash
   node tools/selfcheck.mjs --site cybernetic-surge
   node tools/render-check.mjs --site cybernetic-surge
   ```

---

## Files Created

```
sites/cybernetic-surge/
├── index.html
├── features.html
├── clients.html
├── download.html
├── plugins.html
├── docs.html
├── hub.html
├── about.html
├── 404.html
├── css/
│   ├── base.css
│   ├── theme.css
│   └── components.css
├── js/
│   └── main.js
├── img/
│   ├── logo.svg
│   ├── favicon.svg
│   ├── og.svg
│   └── PROMPTS.md
├── robots.txt
├── sitemap.xml
├── SITE.md
└── BUILD_LOG.md
```

**Total: 22 files**
