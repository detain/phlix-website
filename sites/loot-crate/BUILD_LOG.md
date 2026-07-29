# BUILD_LOG.md — Loot Crate Brand Kit Site

## What was built

Complete Phlix brand kit site at `sites/loot-crate/` with:

### Files created (22+)

```
sites/loot-crate/
├── index.html              (hero + pitch + features overview + CTA)
├── features.html           (8 feature details grid)
├── clients.html            (5 client cards with rarity badges)
├── download.html           (server install + clients + ecosystem)
├── plugins.html            (plugin model + example link)
├── docs.html               (documentation link-out + ecosystem)
├── hub.html                (hub description + self-host options)
├── about.html              (philosophy + license + contributing + FAQ)
├── 404.html                (empty crate themed error page)
├── css/
│   ├── base.css            (reset + tokens + accessibility)
│   ├── theme.css           (typography + layout + components)
│   └── components.css      (header/footer/buttons/nav)
├── js/
│   └── main.js             (nav toggle + reduced motion + scroll reveals + copy buttons)
├── img/
│   ├── logo.svg            (crate + star + PHLIX wordmark)
│   ├── favicon.svg         (32x32 crate icon)
│   └── og.png              (generated via tools/gen-og.mjs)
├── robots.txt
├── sitemap.xml
├── SITE.md
└── BUILD_LOG.md
```

## Deviations from spec / Notes

- Fonts (Chakra Petch, IBM Plex Sans, IBM Plex Mono) referenced but not included in `shared/assets/fonts/` — the site's CSS will fall back to system fonts until the font pool is updated by the orchestrator. No CDN links used per compliance requirement.
- `og.png` generated via `node tools/gen-og.mjs --site loot-crate`
- No seasonal_activation, mascot, or easter eggs — kit did not declare them
- No intensity_toggle — kit did not declare it

## Verification

- HTML: 9 pages, all pass HTML structure validation
- CSS: 3 files, all have @copyright inside `/* */` comment blocks
- JS: 1 file with @copyright in comment block
- All pages have OG + Twitter meta with `twitter:creator=@detain`
- All canonical URLs absolute
- Grid uses `minmax(0, 1fr)` — no bare `1fr`
- FAQ uses `<details>/<summary>` — correct
- 4 native clients + DLNA — correct, no mention of "5"
- Install command present on index.html (hero CTA) and download.html (#server section)

## Commands used

```bash
node tools/gen-og.mjs --site loot-crate
node tools/gen-sitemap.mjs --site loot-crate
git add sites/loot-crate/
git commit -m "feat(loot-crate): complete brand kit site (gaming loot crate theme)"
git push origin master
```
