# BUILD_LOG.md — Manga Studio (manga-studio.js)

## Build summary

**Brand kit:** `manga-studio.js` v1.0 (base kit)
**Kit type:** `base`
**Built:** 2026-07-01
**Layout archetype:** `editorial`

## What was built

```
sites/manga-studio/
├── index.html              Home (hero + pitch + features overview + CTA)
├── features.html           Features (8 feature-detail cards)
├── clients.html            Clients (5 client cards + status badges)
├── download.html           Download (server block + clients + ecosystem)
├── plugins.html            Plugins (lifecycleinterface + link to example)
├── docs.html               Docs (link-out to external docs + ecosystem)
├── hub.html                Hub (reverse tunnel relay + self-host docs)
├── about.html              About (philosophy + license + FAQ)
├── css/
│   ├── base.css            Reset + CSS tokens (colors, spacing, radius, font vars)
│   ├── theme.css           Typography scale + layout + page structure
│   └── components.css      Nav/footer/buttons/cards/badges/responsive
├── js/
│   └── main.js             Nav toggle + reduced-motion + scroll reveals
├── img/
│   ├── logo.svg            Wordmark + panel border + pen nib accent (Spot Red)
│   ├── favicon.svg         Square Spot Red panel + pen nib
│   ├── og.svg              1200×630 editorial social card
│   └── PROMPTS.md          All image generation prompts + rules
├── robots.txt              Allow all + sitemap reference
├── sitemap.xml             8 pages, absolute canonical URLs
├── SITE.md                 Design rationale + palette + type + motion
└── BUILD_LOG.md            This file
```

## Design decisions

1. **Fonts via Google Fonts CDN (non-render-blocking)** — Black Han Sans, Rampart One, Noto Sans JP, M PLUS 1p, Source Code Pro. Loaded via `<link rel="preconnect">` × 2 + `<link rel="stylesheet">` in every HTML `<head>` (not CSS `@import`). `font-display: swap` included. Preconnect to `fonts.googleapis.com` and `fonts.gstatic.com` enables early DNS resolution.
2. **No self-hosted WOFF2** — CDN fonts are acceptable for static site CDN deployment. In a fully self-hosted scenario, download all 5 WOFF2 families and declare with `@font-face` in base.css.
3. **Hero speed-line radial** — CSS-only via `repeating-conic-gradient` at 4-degree intervals, opacity 0.5, over an ink-wash gradient overlay. No raster images needed.
4. **Hard offset shadows** — `--shadow-md: 2px 4px 0px rgb(13,13,13,1)` and `--shadow-lg: 4px 6px 0px rgb(13,13,13,1)` per the kit's "manga spot art" shadow technique.
5. **Card hover** — 3px diagonal translate + border width 2px→3px + shadow-md→shadow-lg, all `transition: 0ms` for instant snap. No scale transform (per kit microinteraction rules).
6. **CTA banner** — Ink Black (#0D0D0D) background, white text, no gradient. Spot Red reserved exclusively for the primary CTA button in the hero fold per kit "weaponized emphasis" rule.
7. **Mascot (Sen)** — Kit has a mascot defined but the site does not include mascot imagery. Empty states are text-only from `content.json` + kit `empty_state_messages`.
8. **Corner radius** — 2px (--radius-sm/--radius-md) on structural elements per kit spec. Pills only for badge/chip components (--radius-pill: 999px).
9. **Spot Red discipline** — Kit rule: "Spot Red appears exactly once per page fold as primary CTA." Hero fold has exactly one Spot Red element: the `.btn-primary` "Get Phlix" button. All other heading colors, eyebrows, and banners use Ink Black or neutral gray.
10. **Impact Yellow discipline** — Kit rule: "Impact Yellow is used at most once per page." Beta status badges use Screentone Gray (not Impact Yellow) to avoid per-page over-use.

## Post-review fixes applied (adversarial loop, round 1 → 2)

- ✅ Google Fonts `@import` removed from base.css; fonts loaded via `<link>` in all 8 HTML files with `preconnect`
- ✅ Spot Red overuse fixed: `.hero-eyebrow` → neutral gray; `.pitch h2`, `.features-overview h2` → Ink Black; `.cta-banner` bg → Ink Black; only `.btn-primary` remains Spot Red in hero fold
- ✅ FAQ `<dt>` `text-transform: uppercase` removed; content.json FAQ questions display verbatim
- ✅ Feature cards: added `@media (width <= 360px)` single-column breakpoint to prevent overflow at 320px
- ✅ Beta status badge: changed from Impact Yellow bg to Screentone Gray bg (avoids Impact Yellow over-use)
- ✅ Nav hover: `border-left-color` → `border-inline-start-color` for RTL readiness

## Known limitations

- `og:image` is SVG (img/og.svg, 1200×630). Twitter's card validator may not render SVG; a PNG fallback is recommended for full Twitter card support.

## QA commands

```bash
cd /home/sites/phlix/phlix-website
npm run lint        # html + css + js lint
npm run linkcheck  # broken link sweep
npm run a11y       # pa11y-ci accessibility check
npm test           # lint + linkcheck + meta
```

## Next steps

- [x] Run adversarial review loop (12 dimensions) — CLEAR GO, 93/100
- [x] Fix all ❌ findings (3 blocking + 4 ⚠️ should-fix)
- Self-host WOFF2 fonts for fully self-hosted production deployment
