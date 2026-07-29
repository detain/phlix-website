# Directors Chair — Build Log

## What was built

Complete brand kit site for the "directors-chair" theme (film set aesthetic).

### Files created

- **9 HTML pages:** index, features, clients, download, plugins, docs, hub, about, 404
- **3 CSS files:** base.css, theme.css, components.css
- **1 JS file:** main.js (mobile nav, reduced motion, scroll reveals)
- **5 image assets:** logo.svg, favicon.svg, og.svg, og.png (rasterized from og.svg), PROMPTS.md
- **robots.txt** and **sitemap.xml**

### Design deviations from default

- Clapperboard/film set theme with warm spotlight gradients
- Dark charcoal background with gold (#FFD93D) accent
- Uppercase display typography with wide letter-spacing
- Film-themed 404 page with "Cut!" and "Scene Not Found"

### Compliance notes

- Install command shown in hero section of index.html and download.html
- 4 native clients + DLNA (never stated as 5)
- 8 features from content.json
- 6 FAQ items with `<details>/<summary>` elements
- Footer: 3 columns + "Open-source media, on your terms."
- No Google Fonts CDN (self-hosted fonts via system fallbacks)
- All CSS `@copyright` inside `/* */` blocks
- Grid: `minmax(0, 1fr)` used (not bare `1fr`)
- OG + Twitter meta on all pages with `twitter:creator=@detain`
- Canonical URLs are absolute

### Completed

- [x] og.png generation via `node tools/gen-og.mjs --site directors-chair`
