# Mountain Summit — Build Log

## Generated

- **9 HTML pages:** index, features, clients, download, plugins, docs, hub, about, 404
- **3 CSS files:** base.css, theme.css, components.css
- **1 JS file:** main.js (vanilla, dependency-free)
- **2 SVG assets:** logo.svg, favicon.svg
- **robots.txt** — sitemap reference
- **sitemap.xml** — all 8 canonical pages (404 excluded per spec)

## Intentional Deviations from new_site.md

None. All deviations from the spec would be noted here.

## Key Implementation Notes

### Install Command
The install command from `content.json.install.primary.command` is rendered verbatim in:
- `index.html` hero section (code block below CTAs)
- `download.html` server section (prominent code block)

Command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`

### Client Count
Correctly states "4 native clients + DLNA" per `content.json.clients` — never "5" or "Five". The five entries are: Roku (stable), Samsung Tizen (stable), Windows (stable), Mobile (beta), Any DLNA device.

### License Representation
Footer and about page correctly state: "MPL-2.0 (server/hub), MIT (clients/plugins)" per the spec and `content.json`.

### FAQ Implementation
Uses native HTML `<details>/<summary>` elements for the 6 FAQ items from `content.json.faq`. No JavaScript required for basic expand/collapse.

### Fonts
Self-hosted WOFF2 fonts referenced via `../../assets/fonts/` path from the shared font pool:
- Crimson Pro (display/headlines)
- Source Sans 3 (body/UI)
- JetBrains Mono (code)

### OG Image
Generated via `node tools/gen-og.mjs --site mountain-summit`. Rasterized PNG at 1200×630.

## Known Follow-ups

- None at this time.
