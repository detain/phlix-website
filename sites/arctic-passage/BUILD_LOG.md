# BUILD LOG — Arctic Passage Brand Kit Site

## Date: 2026-07-29

## What Was Built

A complete 9-page static HTML/CSS/JS marketing site for the Phlix media server using the **Arctic Passage** brand kit.

### Files Created

```
sites/arctic-passage/
├── index.html          (Home page with hero, pitch, features overview, CTAs)
├── features.html       (Full feature details grid)
├── clients.html        (Client cards: Roku, Tizen, Windows, Mobile, DLNA)
├── download.html       (Install command, client downloads, ecosystem)
├── plugins.html        (Plugin model, ecosystem, write your own)
├── docs.html           (Documentation links + ecosystem)
├── hub.html            (Hub description, self-host vs public, client support)
├── about.html          (Philosophy, license, contributing, FAQ)
├── 404.html            (Arctic-themed 404 page)
├── css/
│   ├── base.css        (Reset, tokens, typography base)
│   ├── theme.css       (Layout, hero, cards, sections)
│   └── components.css  (Header, nav, footer, buttons, badges)
├── js/
│   └── main.js         (Nav toggle, reduced motion, scroll reveals)
├── img/
│   ├── logo.svg        (Ice crystal + PHLIX wordmark)
│   └── favicon.svg     (Ice crystal on arctic night)
├── robots.txt
├── sitemap.xml
├── SITE.md             (Design documentation)
└── BUILD_LOG.md        (This file)
```

## Content Sources

All content from `shared/content.json`:
- Hero copy, pitch bullets, features (8), clients (5), ecosystem (5), FAQ (6), footer
- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- License: MPL-2.0 (server/hub), MIT (clients/plugins)

## Brand Kit Application

**Theme:** Arctic Passage — Arctic expedition through ice passages. Northern lights, glacier textures, cold blues and whites, polar silence.

**Palette:**
- Primary: `#0A1A2A` (deep arctic night)
- Secondary: `#1E3A5F` (glacier blue)
- Accent: `#5DADE2` (aurora cyan)
- Surface: `#A8D8EA` (ice blue)
- White: `#FFFFFF`

**Typography:**
- Display: Cinzel
- Body: Quicksand
- Mono: IBM Plex Mono

**Effects:**
- Aurora borealis gradient animations
- Glacial texture overlays
- Ice crystal logo mark

## Deviations/Notes

None — built to spec.

## Quality Checklist

- [x] All 9 pages + 404.html
- [x] CSS/JS/img directories with files
- [x] robots.txt and sitemap.xml
- [x] SITE.md and BUILD_LOG.md
- [x] Self-hosted fonts (no CDN)
- [x] Install command in hero CTA and download page
- [x] 4 native clients + DLNA (not "5")
- [x] 8 features from content.json
- [x] 6 FAQ from content.json
- [x] Footer: 3 columns + "Open-source media, on your terms."
- [x] `@copyright` inside CSS comment blocks
- [x] Grid: `minmax(0, 1fr)` not bare `1fr`
- [x] All pages: OG + Twitter meta, `twitter:creator=@detain`
- [x] FAQ uses `<details>/<summary>` in about.html
- [x] No Google Fonts CDN
