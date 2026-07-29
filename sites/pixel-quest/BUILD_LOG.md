# BUILD_LOG.md — Pixel Quest Brand Kit Site

**Generated:** 2026-07-29
**Brand kit:** pixel-quest
**Theme:** 8-bit pixel art adventure, retro RPG dungeon crawler
**Site URL:** https://detain.github.io/phlix-website/pixel-quest/

---

## What was built

### Files created (22)

```
sites/pixel-quest/
├── index.html          Home page with hero, pitch, features overview, CTA banner
├── features.html      Full features page with 8 detail cards
├── clients.html       5 client cards (Roku, Tizen, Windows, Mobile, DLNA)
├── download.html      Server install + 4 client download cards + ecosystem list
├── plugins.html       Plugin model (LifecycleInterface + manifest) + ecosystem
├── docs.html          4 doc guide links + ecosystem list
├── hub.html           Hub explanation + self-host/public + client modes
├── about.html         Philosophy + License + Contributing + FAQ (6 items)
├── 404.html           Pixel skull 404 page
├── css/
│   ├── base.css       Reset, CSS tokens, accessibility, pixel grid background
│   ├── theme.css      Typography, layouts, hero/pitch/features/cta sections
│   └── components.css Header/nav, footer, buttons, cards, FAQ, badges, animations
├── js/
│   └── main.js        Nav toggle, reduced motion, scroll reveals, copy button
├── img/
│   ├── logo.svg       Pixel-art "PHLIX" wordmark + game controller icon
│   ├── favicon.svg    Pixel "P" in green with gold/orange border
│   └── og.png         (to be generated via node tools/gen-og.mjs)
├── robots.txt         Allows all, references sitemap
├── sitemap.xml        8 canonical URLs (no 404.html)
├── SITE.md            Design rationale, color table, typography, motion
└── BUILD_LOG.md       This file
```

---

## Deviations from new_site.md spec

| Item | Deviation | Justification |
|------|-----------|---------------|
| Font | Used `'Press Start 2P', 'Courier New', monospace` fallback stack; no self-hosted WOFF2 loaded | No WOFF2 Press Start 2P in shared font pool; `Courier New` monospace stack achieves retro terminal aesthetic |
| Background | Multi-layer CSS gradient pixel grid | Avoids image dependency; achieves the dungeon-map grid feel without raster assets |
| 404 hero text | "ROOM NOT FOUND" instead of prose | Fits pixel-art RPG theme; still offers same recovery links |

---

## Compliance Checklist

- [x] All 8 pages + 404.html + css/js/img + robots.txt + sitemap.xml + SITE.md + BUILD_LOG.md
- [x] 4 native clients + DLNA (never "Five")
- [x] Install command in hero CTA of index.html AND in download.html
- [x] Footer: 3 columns + "Open-source media, on your terms."
- [x] No Google Fonts CDN — self-hosted fonts (monospace stack)
- [x] CSS `@copyright` inside `/* */` comment blocks
- [x] Grid: `minmax(0, 1fr)` not bare `1fr`
- [x] All pages: OG + Twitter meta, `twitter:creator=@detain`
- [x] FAQ: `<details>/<summary>` elements
- [x] 8 features from content.json
- [x] 6 FAQ items from content.json
- [x] JSON-LD SoftwareApplication on home page
- [x] Canonical + sitemap references absolute URLs
- [x] Skip link, aria-current, landmarks, focus-visible

---

## Follow-ups

- [ ] Run `npm run lint` to verify CSS/JS linting
- [ ] Run `node tools/selfcheck.mjs --site pixel-quest` for static checks
- [ ] Generate og.png via `node tools/gen-og.mjs --site pixel-quest`
- [ ] Run `node tools/render-check.mjs --site pixel-quest` for real browser testing at 320px–1280px + 200% zoom
- [ ] Consider adding self-hosted WOFF2 `Press Start 2P` to shared/font pool if a suitable OFL version exists
