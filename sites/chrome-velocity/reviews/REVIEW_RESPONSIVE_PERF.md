# Review: Responsive & Performance

## Responsive (score: 100/100, severity: ✅)

### Issues found
None. The site passes all responsive checks.

**Evidence:**

- `css/theme.css:9` — h1 uses `clamp(2.5rem, 6vw, 5rem)` — fully fluid, no fixed px
- `css/theme.css:18` — h2 uses `clamp(1.75rem, 3.5vw, 2.75rem)` — fully fluid
- `css/theme.css:27` — h3 uses `clamp(1.1rem, 2vw, 1.5rem)` — fully fluid
- `css/theme.css:62-67` — `.container` uses `width: 100%` + `max-width: var(--content-width)` (1200px) — fluid with max cap
- `css/theme.css:69-71` — `.container--wide` uses `max-width: var(--max-width)` (1440px) — fluid with max cap
- `css/theme.css:237` — `.feature-cards` uses `repeat(auto-fill, minmax(280px, 1fr))` — fluid CSS grid
- `css/theme.css:433` — `.content-grid` uses `repeat(auto-fill, minmax(320px, 1fr))` — fluid CSS grid
- `css/components.css:44-50` — `.nav-toggle` is `display: none` by default — hidden on desktop
- `css/components.css:105-148` — `@media (width <= 900px)` shows `.nav-toggle` (`display: flex`) and toggles `.nav-menu.is-open` (`display: flex`) — correct mobile breakpoint
- `css/theme.css:145-154` — `@media (width <= 480px)` adjusts hero inner padding and CTA direction — mobile-specific refinement
- `css/theme.css:77-81, 208-216, 291-303, 335-343, 381-389, 419-428` — multiple `@media (width <= 768px)` breakpoints adjust container padding and grid columns — appropriate tablet/mobile breakpoints
- `css/theme.css:524-528` — `.client-cards` collapses to `1fr` at 768px
- `css/base.css:97` — body `font-size: 16px` — body text never drops below 16px on phones
- `js/main.js:15` — `classList.toggle('is-open')` toggles mobile menu visibility
- `js/main.js:26-32` — `Escape` key closes mobile menu and returns focus to toggle — keyboard accessible

---

## Performance (score: 95/100, severity: ✅)

### Issues found

`all HTML files (e.g. index.html:33-35)` — Google Fonts loaded from external servers vs. self-hosted — ⚠️ Minor (not a hard failure; acceptable per ground truth "Google Fonts with preconnect")

**Evidence:**

- `index.html:249` — `<script src="js/main.js" defer></script>` — script is deferred, not render-blocking
- `about.html:145`, `clients.html:188`, `download.html:160`, `docs.html:126`, `features.html:210`, `hub.html:137`, `plugins.html:126` — all 8 HTML files have `defer` on `<script>`
- `index.html:33-35` — `<link rel="preconnect" href="https://fonts.googleapis.com">` + `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` + Google Fonts URL with `display=swap` — preconnect eliminates DNS/connection latency, `display=swap` prevents FOIT
- `index.html:37-40` — all 3 stylesheets are in `<head>`, none in `<body>` — no render-blocking stylesheets in body
- `index.html:66` — logo is `img/logo.svg` (SVG, not raster)
- `img/og.svg`, `img/favicon.svg`, `img/logo.svg` — all logo/UI images are SVG, no heavy raster images anywhere
- CSS total estimated: ~6KB (base.css) + ~22KB (theme.css) + ~16KB (components.css) ≈ 44KB minified — reasonable
- `js/main.js` — 62 lines of vanilla JS, no dependencies, tiny footprint
- Below-fold content (feature-cards, client-cards, download-cards, ecosystem-list) — no lazy loading attributes present, but content is text-heavy with SVG icons, not heavy images, so lazy loading is not critical
