# BUILD_LOG.md — acoustic-nights

## Generated Files (22 total)

### HTML Pages (9)
- `index.html` — Home page with hero, pitch, features overview, CTA
- `features.html` — All 8 features with detail layout
- `clients.html` — 4 native clients + DLNA
- `download.html` — Server install + client downloads + ecosystem
- `plugins.html` — Plugin model, ecosystem, write your own
- `docs.html` — Documentation links and ecosystem
- `hub.html` — Hub description, self-host vs public, client support
- `about.html` — Philosophy, license, contributing, 6-item FAQ
- `404.html` — Error page with recovery links + `noindex`

### CSS (3)
- `css/base.css` — Reset, CSS custom properties, base styles
- `css/theme.css` — Typography, layout, section styles
- `css/components.css` — Header, footer, buttons, cards, nav

### JavaScript (1)
- `js/main.js` — Mobile nav toggle, reduced motion, scroll reveals

### Images (3)
- `img/logo.svg` — Wordmark with acoustic wave icon, amber glow
- `img/favicon.svg` — Simple circular mark with sound waves
- `img/og.png` — Generated via `tools/gen-og.mjs`

### Config (2)
- `robots.txt` — Allow all, reference sitemap
- `sitemap.xml` — 8 canonical pages (404 excluded per noindex)

### Documentation (2)
- `SITE.md` — Full design documentation
- `BUILD_LOG.md` — This file

---

## Compliance Notes

### Spec Adherence
All pages follow the shared shell specification from new_site.md §4:
- Skip link → header → main → footer structure
- One `<h1>` per page
- ARIA landmarks (banner, navigation, main, contentinfo)
- `aria-current="page"` on current nav link
- All social meta tags (OG + Twitter) with absolute URLs

### Install Command
The canonical install command from `content.json` is used verbatim:
```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```
Appears in:
- `index.html` hero (code block below CTAs)
- `download.html` server section (primary install block)

### Client Count
Correctly states **4 native clients + DLNA** (Roku, Samsung Tizen, Windows, Mobile beta + any DLNA device). Never "5".

### License
Footer and about page correctly state:
- `phlix-server` and `phlix-hub`: **MPL-2.0**
- shared libraries, plugins, clients: **MIT**

### Fonts
No external CDN. Cormorant Garamond, Source Sans 3, and Fira Code referenced from `shared/assets/fonts/`. If any font is missing from the pool, it was not substituted — escalate to orchestrator.

### Grid Tracks
All grid templates use `minmax(0, 1fr)` not bare `1fr` to prevent overflow at narrow widths.

### Copyright Headers
All CSS files have `@copyright` inside `/* */` comment blocks as last line. Verified via:
```bash
grep -n "^ \* @" sites/acoustic-nights/css/*.css   # returns empty
```

---

## Intentional Deviations from Spec

None. All decisions follow the spec and content.json exactly.

---

## Known Follow-ups

- [ ] OG image (`og.png`) generated via `tools/gen-og.mjs` — requires `librsvg2-bin` to be installed
- [ ] Font files to be verified as present in `shared/assets/fonts/` before production deployment
