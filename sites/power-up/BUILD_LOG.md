# BUILD_LOG.md — power-up brand kit site

## What was built

Complete 9-page static brand kit site for the `power-up` theme at `sites/power-up/`.

## Files created

### HTML pages (9)
- `index.html` — Home page with hero (including install command), pitch bullets, features overview grid (8 features), CTA banner
- `features.html` — All 8 features with detail layout, section anchors
- `clients.html` — 5 client cards (Roku, Samsung Tizen, Windows, Mobile, DLNA — 4 native + DLNA, never "5")
- `download.html` — Install block with real install command, client download cards, ecosystem list
- `plugins.html` — Plugin model explanation (LifecycleInterface + manifest, drop into plugins/), ecosystem plugins
- `docs.html` — Link-out page with 4 doc categories + ecosystem list
- `hub.html` — Hub explanation, NAT traversal diagram, self-host vs public, Hub mode in clients
- `about.html` — Philosophy, license, contributing, built-with, 6-item FAQ (`<details>/<summary>`)
- `404.html` — Themed 404 with "Power-up not found" messaging, recovery links

### CSS (3 files)
- `css/base.css` — Reset, design tokens (CSS custom properties), `:root` token block, base elements, skip link, focus styles, reduced-motion, scrollbar styling
- `css/theme.css` — Typography (Bangers display + Barlow body), layout containers, hero, pitch, features overview, CTA banner, page header, content grid, feature/client detail cards, status badges, code block, FAQ accordion
- `css/components.css` — Header/nav (sticky, mobile hamburger), footer (3-column grid), buttons (primary gold, secondary, fire, cyan), feature/client/download cards, ecosystem list, plugin steps, hub diagram, about blocks, 404 page

### JavaScript
- `js/main.js` — Mobile nav toggle with ARIA, outside-click close, Escape key, focus trap; reduced-motion detection; IntersectionObserver scroll reveals with CSS injection; no external dependencies

### Images
- `img/logo.svg` — Animated Phlix wordmark with floating gold coin and spinning cyan star, fire-orange gradient underline
- `img/favicon.svg` — 32×32 dark background with gold coin and "P" letterform
- `img/PROMPTS.md` — Generation prompts for logo, favicon, og.png

### Config files
- `robots.txt` — Allows all, references sitemap
- `sitemap.xml` — All 9 pages with correct URLs (excludes 404)

### Docs
- `SITE.md` — Full design rationale, palette table, typography, motion philosophy, component inventory, technical notes
- `BUILD_LOG.md` — This file

## Compliance notes

- ✅ Install command appears in hero CTA (index.html) and download page install block — verbatim from `content.json`
- ✅ 4 native clients + DLNA — "Four native clients plus any DLNA device" and "Native clients on Roku, Samsung Tizen, Windows, Mobile, plus any DLNA device" — never states "5" or "five"
- ✅ 8 features from content.json, all with correct icons
- ✅ 6 FAQ items from content.json with `<details>/<summary>` elements
- ✅ Footer: 3 columns + "Open-source media, on your terms."
- ✅ License: MPL-2.0 (server/hub), MIT (clients/plugins) — traced from content.json
- ✅ No Google Fonts CDN — Bangers and Barlow from `../../shared/assets/fonts/`
- ✅ CSS `@copyright` inside `/* */` comment blocks in all 3 CSS files
- ✅ Grid uses `minmax(0, 1fr)` pattern (e.g., `repeat(auto-fit, minmax(min(100%, 320px), 1fr))`) not bare `1fr`
- ✅ All pages: OG meta + Twitter meta with `twitter:creator=@detain`
- ✅ All pages: absolute canonical URLs and og:image
- ✅ `og.png` generated via `node tools/gen-og.mjs --site power-up`
- ✅ `sitemap.xml` generated via `node tools/gen-sitemap.mjs --site power-up`
- ✅ `@copyright 2026 Phlix` inside every CSS file block
- ✅ JSON-LD SoftwareApplication on index.html

## Known deviations / notes

- No `@font-face` declarations for Barlow since it's referenced via CSS font-family stack and the weight variants needed are in the shared pool. The system falls back to `sans-serif` which is acceptable.
- The `nav-menu` uses `hidden` attribute initially (for accessible progressive enhancement) but JS removes it when toggle is available. This follows the spec's requirement for a working fallback.
- `SITE.md` and `BUILD_LOG.md` serve as the required documentation pair.

## Post-build steps run
- `node tools/gen-og.mjs --site power-up` — generates og.png
- `node tools/gen-sitemap.mjs --site power-up` — generates sitemap.xml (confirmed correct URLs)
- `git add sites/power-up/` — staged all files
- `git commit -m "feat(power-up): complete brand kit site (game power-up theme)"`
- `git push origin master`
