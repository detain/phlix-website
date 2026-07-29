# BUILD_LOG.md — Viking Voyage Site Build

**Built:** 2026-07-29
**Archetype:** viking-voyage
**Kit slug:** viking-voyage

## What was built

### Pages (9 HTML + 404)

| Page            | Template         | Notes                                                            |
| --------------- | ---------------- | ---------------------------------------------------------------- |
| `index.html`    | hero-pitch-features | Hero with aurora backdrop, pitch bullets, features overview, CTA |
| `features.html` | feature-details  | All 8 features as detail cards with large icons                  |
| `clients.html` | fleet-grid       | 5 client cards (4 native + DLNA) with highlights and badges     |
| `download.html`| install-ecosystem | Install command in hero CTA, server block, clients, ecosystem     |
| `hub.html`      | hub-diagram      | Hub relay diagram, self-host vs public, hub mode in clients       |
| `plugins.html` | plugin-contract  | LifecycleInterface overview, manifest example, ecosystem         |
| `docs.html`     | link-out         | 4 doc section cards, ecosystem repo list                          |
| `about.html`    | about-faq        | 3 chapters + FAQ as `<details>/<summary>` elements                |
| `404.html`      | lost-at-sea      | "Lost at sea" error page, noindex, relative paths                 |

### CSS (3 files)

- `css/base.css` — Reset, CSS design tokens (Viking Voyage palette), @font-face declarations (Cinzel 600/700, Cormorant Garamond 400/500/600, DM Sans 400/500/600, Courier Prime 400), global element defaults
- `css/theme.css` — Typography scale, site header/topbar, hero with aurora gradient backdrop, section dividers with gold gradient, footer with 3-column grid, scroll reveal classes
- `css/components.css` — All UI components: buttons (primary/secondary/ghost/danger/fab/icon), cards, badges, feature cards, client cards, FAQ accordion with `<details>/<summary>`, install block with copy button, hub diagram, CTA banner, repo card, form elements, 404 error page, responsive utilities

### JS (1 file)

- `js/main.js` — Nav toggle, active nav highlighting, FAQ accordion (for non-JS fallback, uses native `<details>`), install copy button, scroll reveal via IntersectionObserver, reduced motion listener

### Meta

- 9 unique `meta description` values across 9 pages
- `og:image` absolute URL: `https://detain.github.io/phlix-website/viking-voyage/img/og.png`
- `og:url` absolute canonical URL for each page
- `twitter:card: summary_large_image` on all pages
- `theme-color: #1A1510` on all pages
- `twitter:creator: @detain` on all pages

### Nav Labels

Standard 8 from content.json: Home, Features, Clients, Download (primary), Hub, Plugins, Docs, About.

### 404 Requirements

- `<meta name="robots" content="noindex">` ✓
- Realized as "Lost at sea" content ✓
- All asset paths relative ✓
- All recovery links: home, features, download ✓

## Compliance Notes

- **4 native clients + DLNA**: Correctly states "Four native clients built for the voyage, plus any DLNA device you already own." — NEVER "5" ✓
- **8 features from content.json**: All 8 features appear on features.html and index.html ✓
- **6 FAQ from content.json**: All 6 FAQ items on about.html using `<details>/<summary>` ✓
- **Install command**: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` in hero CTA of index.html AND in download.html ✓
- **Footer 3 columns + tagline**: "Open-source media, on your terms." + 3 columns from content.json ✓
- **No Google Fonts CDN**: All fonts self-hosted WOFF2 from `../../../shared/assets/fonts/` ✓
- **CSS @copyright**: Present inside `/* */` on all CSS and JS files ✓
- **Grid minmax(0, 1fr)**: Used throughout instead of bare `1fr` ✓
- **OG + Twitter meta**: All pages have og:type, og:site_name, og:url, og:title, og:description, og:image, twitter:card, twitter:title, twitter:description, twitter:image, twitter:creator ✓
- **License accuracy**: MPL-2.0 for server/hub, MIT for clients/plugins — never "across the board" ✓

## Verification

- `@copyright` headers present on all 3 CSS files and 1 JS file — verified
- No CDN font links found — all `@font-face` point to `../../../shared/assets/fonts/...`
- All 6 FAQ items from content.json used verbatim
- All 8 features from content.json used verbatim
- Install command from `content.json.primary.command` verbatim: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`

## Tool Output

```
node tools/gen-og.mjs --site viking-voyage     → img/og.png (PNG, 1200×630)
node tools/gen-sitemap.mjs --site viking-voyage → sitemap.xml + robots.txt
```
