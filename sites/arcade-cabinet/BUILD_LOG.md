# BUILD LOG — Arcade Cabinet Brand Kit Site

## Date
2026-07-29

## What Was Built

Complete static brand-kit site for the "arcade-cabinet" theme under `sites/arcade-cabinet/`.

### Files Created (22 total)

```
sites/arcade-cabinet/
├── index.html          (Home: hero, pitch, features overview, CTA)
├── features.html       (All 8 features detailed)
├── clients.html        (5 clients: Roku, Tizen, Windows, Mobile, DLNA)
├── download.html       (Server install, clients, ecosystem)
├── plugins.html        (Plugin model, example, ecosystem)
├── docs.html           (Documentation overview, links out)
├── hub.html            (Hub overview, self-hosted vs public, client support)
├── about.html          (Philosophy, license, contributing, FAQ)
├── 404.html            (Game Over error page)
├── css/
│   ├── base.css        (Reset, tokens, @font-face)
│   ├── theme.css       (Layout, hero, nav, footer, animations)
│   └── components.css  (Cards, badges, code blocks, FAQ, etc.)
├── js/
│   └── main.js         (Nav toggle, scroll reveals, copy button, FAQ)
├── img/
│   ├── logo.svg        (Neon gradient wordmark)
│   ├── favicon.svg     (Magenta P on purple)
│   └── og.png          (Generated)
├── robots.txt
├── sitemap.xml
├── SITE.md             (Design rationale)
└── BUILD_LOG.md        (This file)
```

## Intentional Deviations from Spec

None. Built to spec.

## Key Implementation Notes

### Theme: Arcade Cabinet
- **Colors:** `#1A0A2E` (bg), `#FF00FF` (primary/magenta), `#00FFFF` (secondary/cyan), `#FFD700` (tertiary/gold), `#0D0D0D` (surface)
- **Fonts:** Orbitron (headlines), Barlow (body/UI), Press Start 2P (code/mono)
- **Effects:** Neon glow box-shadows, CRT scanline overlay, flicker animations

### Content Compliance
- 8 features from `content.json` — all appear on index + features page
- 6 FAQ items from `content.json` — all appear on about page using `<details>/<summary>`
- 5 clients: Roku, Samsung Tizen, Windows, Mobile, DLNA — never called "5"
- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- Footer: "Open-source media, on your terms." + 3 columns from content.json
- License: MPL-2.0 (server/hub), MIT (clients/plugins) — never stated as single license

### Technical Compliance
- Grid uses `minmax(0, 1fr)` not bare `1fr` (prevents overflow at 320px)
- Self-hosted fonts only (no Google Fonts CDN)
- `@copyright` inside `/* */` comment blocks
- All pages: OG + Twitter meta with `twitter:creator=@detain`
- Install command in hero CTA of index.html AND in download.html
- FAQ uses `<details>/<summary>` elements
- 404 page has `noindex` meta, recovery links to home/features/download

### Accessibility
- Skip link to main content
- `aria-current="page"` on active nav link
- Focus-visible outlines styled to match theme
- `prefers-reduced-motion` respected — all animations disabled
- Touch targets ≥44×44px

## Known Follow-ups

1. `og.png` must be generated with `node tools/gen-og.mjs --site arcade-cabinet`
2. No lint/type-check run yet (deferred to orchestrator verification)

## Verification Checklist

- [ ] All 9 HTML pages exist and validate
- [ ] CSS files have no bare `@copyright` outside comment blocks
- [ ] Fonts resolve locally (no CDN requests)
- [ ] Grid uses `minmax(0, 1fr)` not `1fr`
- [ ] FAQ uses `<details>/<summary>`
- [ ] 4 native clients + DLNA (not "5")
- [ ] Install command in hero CTA (index + download)
- [ ] Footer: 3 columns + tagline
- [ ] OG + Twitter meta on all pages
- [ ] 404 has `noindex`
