# BUILD_LOG.md — map-explorer

## Generated

- **9 HTML pages:** index.html, features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html, 404.html
- **3 CSS files:** base.css, theme.css, components.css
- **1 JS file:** main.js (vanilla, dependency-free)
- **2 SVG assets:** logo.svg, favicon.svg
- **robots.txt, sitemap.xml**
- **SITE.md, BUILD_LOG.md**
- **og.png** (generated via `node tools/gen-og.mjs --site map-explorer`)

## Intentional Deviations from Spec

None. All deviations documented below if any were discovered during implementation.

## Implementation Notes

### Fonts
- Used Cinzel 700 for display headings (fantasy/medieval feel appropriate to theme)
- Used Crimson Text 400 for body (elegant serif, good readability)
- Used Rajdhani 500 for UI elements (clean, slightly technical)
- Used Inconsolata 400 for code/mono

### Clients
- 4 native clients (Roku, Samsung Tizen, Windows, Mobile beta) + DLNA = **4 native + DLNA** (never "5")
- Correctly labeled Mobile as "beta" status per content.json

### Install Command
- Displayed in hero of index.html and prominently in download.html
- Single source of truth from `content.json.install.primary.command`

### FAQ
- 6 FAQ items using `<details>/<summary>` elements per spec
- All questions and answers from content.json

### License
- Read from content.json footer columns — "License (MPL-2.0)"
- Never hard-coded a single license name across the project

### Footer
- 3 columns from content.json.footer.columns
- Tagline: "Open-source media, on your terms."

## Known Issues / Follow-ups

- None identified at build time
