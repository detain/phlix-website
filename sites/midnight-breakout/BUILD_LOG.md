# BUILD LOG — Midnight Breakout Site

**Site slug:** `midnight-breakout`
**Brand kit:** `brand-kits/midnight-breakout.js`
**Date:** 2026-07-28
**Built by:** Claude (coder agent)

---

## What Was Built

### Files Created

```
sites/midnight-breakout/
├── brand-kits/midnight-breakout.js     (brand kit spec — rich, ~500 fields)
├── index.html                           (home — hero, pitch, 8-feature overview, CTA)
├── features.html                        (8 feature detail cards)
├── clients.html                        (5 client cards with status badges)
├── download.html                       (server install + 5 client cards + ecosystem)
├── plugins.html                        (plugin model + ecosystem + write your own)
├── docs.html                           (link-out to docs + ecosystem list)
├── hub.html                             (hub explainer + self-host/public + client support)
├── about.html                          (philosophy + license + contributing + 6 FAQ items)
├── 404.html                             (cell block theme — "This cell is empty")
├── css/
│   ├── base.css                        (~180 lines — reset + tokens + accessibility)
│   ├── theme.css                       (~550 lines — typography + layout + animations)
│   └── components.css                 (~500 lines — header/footer/buttons/cards/404)
├── js/
│   └── main.js                          (~130 lines — nav toggle + reduced-motion + reveals + easter eggs)
├── img/
│   ├── logo.svg                         (PHLIX wordmark + chain-link accent + amber L)
│   ├── favicon.svg                      (square, Prison Navy, chain-link, P letterform)
│   ├── og.svg                           (1200×630 — dark + spotlight + tagline)
│   ├── icon-library.svg
│   ├── icon-syncplay.svg
│   ├── icon-transcode.svg
│   ├── icon-shield.svg
│   ├── icon-antenna.svg
│   ├── icon-broadcast.svg
│   ├── icon-puzzle.svg
│   └── icon-hub.svg
├── robots.txt
├── sitemap.xml
├── SITE.md                              (design rationale)
├── BUILD_LOG.md                         (this file)
└── PROMPTS.md                           (image generation prompts for future raster assets)
```

### Quality Gates Passed

- `npm run lint` — TODO
- `npm run linkcheck` — TODO
- `npm run a11y` — TODO

### Known Deviations from `new_site.md`

1. **`og.png` not rasterized:** The `og.svg` was created but `og.png` (1200×630 raster) requires `librsvg2-bin` (`rsvg-convert`). The meta tag references `og.png`; generate with: `node tools/gen-og.mjs --site midnight-breakout`

2. **`content.json` FAQ copy used verbatim:** The about.html FAQ uses the exact `content.json` strings. The kit's `copy_overlay` was applied only to hero copy (headline, subheadline, CTAs).

3. **No `intensity_toggle` or `mascot`** — the brand kit correctly specified these as `null`.

### Brand Kit Highlights

- **Archetype:** Magician (mysterious/suspestive, dramatic revelation)
- **Experience archetype:** `immersive` — dark, cinematic, high-contrast
- **Header motif:** Animated searchlight sweep + conic-gradient rotation
- **Jailbreak animation:** Lock-rotate conic glow on premium cards
- **Easter egg:** Konami code → "YOU BROKE FREE!" flash
- **Logo click:** 5 clicks → chain-shatter flash
- **Typography:** Oswald (headline/display), Source Sans 3 (body/UI), JetBrains Mono (code)
- **Palette:** Navy + Red + Amber on near-black — all self-hosted fonts, zero CDN deps

### Follow-ups

- [ ] Run `node tools/gen-og.mjs --site midnight-breakout` to rasterize `og.png`
- [ ] Run full lint/linkcheck/a11y suite after rasterization
- [ ] Review loop: spawn general agent for 13-perspective review
