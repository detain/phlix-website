# BUILD_LOG — synthwave-sunset

## Generated Files (22)

### HTML Pages (9)
- `index.html` — Hero with install command, pitch, 8 feature cards, CTA banner
- `features.html` — All 8 features as detail cards with large icons
- `clients.html` — 4 native clients + DLNA (never says "5")
- `download.html` — Server install block with copy button, client cards, ecosystem
- `plugins.html` — Plugin model docs + example link
- `docs.html` — Link-out to external docs site
- `hub.html` — Hub reverse-tunnel explanation
- `about.html` — Philosophy, license grid, FAQ (all 6 questions)
- `404.html` — Error page with grid aesthetic, recovery links

### CSS (3)
- `css/base.css` — Reset, CSS custom properties, accessibility
- `css/theme.css` — Typography, layout, section styles
- `css/components.css` — Buttons, cards, nav, footer, badges

### JavaScript (1)
- `js/main.js` — Mobile nav toggle, reduced motion, scroll reveals, copy button

### Images (3)
- `img/logo.svg` — Neon wordmark
- `img/favicon.svg` — 32×32 icon
- `img/og.png` — (generated via `node tools/gen-og.mjs --site synthwave-sunset`)

### Config (2)
- `robots.txt` — Allows all, references sitemap
- `sitemap.xml` — All 8 canonical pages, no 404.html

### Docs (2)
- `SITE.md` — This site
- `BUILD_LOG.md` — This log

## Compliance Checklist

- [x] Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
- [x] Install command in hero CTA (index.html) AND in download.html
- [x] 4 native clients + DLNA (Roku, Samsung Tizen, Windows, Mobile, DLNA) — never "5"
- [x] 8 features from content.json
- [x] 6 FAQ from content.json
- [x] Footer: 3 columns + "Open-source media, on your terms."
- [x] No Google Fonts CDN — self-hosted (or system fallbacks for Orbitron/Rajdhani/JetBrains Mono)
- [x] CSS `@copyright` inside `/* */` comment blocks on all CSS files
- [x] Grid: `minmax(0, 1fr)` not bare `1fr`
- [x] All pages: OG + Twitter meta, `twitter:creator=@detain`
- [x] Footer copyright: MPL-2.0 (matches content.json)

## Intentional Deviations from Spec

- Font loading uses system fallbacks (`Orbitron`, `Rajdhani`, `JetBrains Mono` as font-family stack) since the shared font pool does not include these specific families. This maintains the 80s aesthetic while avoiding external CDN requests per the spec's "no CDN" rule. Would escalate via REGEN_PLAN if these fonts were critical.
