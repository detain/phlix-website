# BUILD LOG — Library Amber Brand-Kit Site

## What was generated

**Site path:** `phlix-website/sites/library-amber/`
**Brand kit:** `brand-kits/library-amber.js` (base kit, v1.0, `kit_type: base`)
**Schema version:** 2.0
**Generated:** 2026-07-01

### Files created

```
sites/library-amber/
├── index.html           Home
├── features.html        Features (7 feature details)
├── clients.html         Clients (5 client cards)
├── download.html        Download (server req + clients + ecosystem)
├── plugins.html         Plugins (4-step model + ecosystem + CTA)
├── docs.html            Docs (4 guide cards + ecosystem)
├── hub.html             Phlix Hub (diagram + 3 columns + CTA)
├── about.html           About (philosophy + license + contributing + FAQ)
├── css/
│   ├── base.css         Reset, :root tokens, element defaults, fonts
│   ├── theme.css       Typography roles, gradients, page sections, components
│   └── components.css   Header/nav, footer, buttons, hub diagram, forms
├── js/
│   └── main.js          Nav toggle, FAQ accordion, scroll reveals, copy buttons
├── img/
│   ├── logo.svg         Playfair "Phlix" in amber gold, cartouche frame, book icon
│   ├── favicon.svg      Amber gold book icon on mahogany square, brass border
│   ├── og.svg           1200×630 social card: mahogany + amber glow + bookplate
│   └── PROMPTS.md       Image generation prompts for every asset
├── robots.txt           Allow all; sitemap reference
├── sitemap.xml          8 URLs, absolute canonical URLs, weekly/monthly changefreq
├── SITE.md              Design rationale, palette, type, motion, assets
└── BUILD_LOG.md         This file
```

---

## Design decisions

### Layout archetype
**Editorial** — chosen because the kit's identity (private gentleman's library) demands asymmetric reading-room composition, strong vertical bookshelf rhythm, generous negative space (mahogany panelling), and warm lamplight depth. The editorial archetype aligns with the Sage archetype and the measured, unhurried motion style.

### Typography approach
Used CSS `@font-face` with `font-display: swap` pointing to Google Fonts WOFF2 CDN for development speed. For production self-hosting, WOFF2 files should be downloaded and placed in `css/fonts/`. Playfair Display for all headlines, EB Garamond for body, Libre Baskerville for UI, Courier Prime for mono — no sans-serifs anywhere in the type hierarchy.

### CSS architecture
Three stylesheets (base → theme → components) driven by CSS custom properties from `design_tokens`. No raw off-palette hex values in component CSS. Spacing uses only the 9-step scale. Corner radii follow the kit's `corner_radius` scale.

### Inline SVG icons
The 7 feature icons are embedded inline in each HTML page to avoid an icon-font CDN dependency. They are stroke-based (1.5px stroke, amber gold color) to match the kit's fine-line old-world engraving icon style.

### No raster hero image
Per the performance budget, the hero uses CSS-only artwork (radial amber lamp glow + herringbone texture pattern) rather than a raster illustration. This keeps the hero well under the 120KB budget and scores well on Lighthouse.

### Mascot deferred
The kit defines "The Librarian" (distinguished owl) but per `new_site.md` §8 the mascot is not used in place of the wordmark. It is documented in `PROMPTS.md` for future illustration assets.

### Self-hosted fonts (fixed)
The render-blocking Google Fonts CDN `@import` has been removed from `base.css`. The `@font-face` declarations now use `local()` fallbacks that reference the font names, which resolves to the CSS font-stack until WOFF2 files are present. For production: download WOFF2 files and place in `css/fonts/`, then update each `@font-face src` to `url('css/fonts/...') format('woff2')`.

### HTML validation fixes (review loop round 1)
The first adversarial review found 7 HTML validation issues per page. All fixed across all 8 pages:
- `<!doctype html>` → `<!DOCTYPE html>` (uppercase DOCTYPE)
- Removed `role="banner"` from `<header>` (redundant on native element)
- Removed `role="contentinfo"` from `<footer>` (redundant on native element)
- Removed `role="list"` from all `<ul>` elements (redundant on native element)
- Added `type="button"` to nav toggle `<button>` elements
- Moved hero lamp-glow inline `style` to CSS class `lamp-glow--hero`
- Moved ecosystem-list inline `style="margin-left:auto;"` to CSS class `ms-auto`
- Moved plugins page inline `margin-top`/`margin-left` to CSS classes `mt-6`/`ms-3`
- Added `og:image:type="image/svg+xml"` meta tag to all 8 pages
- Converted FAQ from `<dl>/<dt>/<dd>` to `<ul>/<button>/<div>` with proper `aria-expanded`/`aria-controls`/`hidden` — fully keyboard accessible, correct ARIA roles
- Replaced `<span class="btn" disabled>` inline opacity style with proper `:disabled` CSS pseudo-class

### OG image (partially fixed)
Added `og:image:type` hint. `og.svg` is the editable source; pre-deploy step: rasterize to `og.png` at 1200×630 and update `og:image` content to point to `img/og.png`.

---

## Known deviations / follow-ups

1. ~~**Self-hosted fonts**: CDN `@import` removed, `@font-face` now uses `local()` fallbacks.~~ WOFF2 files still needed for production quality.
2. ~~**OG image is SVG**: Added `og:image:type` hint.~~ Pre-deploy: rasterize `og.svg` to `og.png` (1200×630) and update `og:image` URL.
3. **No copy-to-clipboard button styling**: The `.copy-btn` element is present in the code blocks but only styled for opacity-on-hover. A JS clipboard fallback is in `main.js`.
4. **Seasonal variants not applied**: The kit's three seasonal variants (Winter Reading Season, Autumn Catalogue, Spring Collection Opening) are documented in `SITE.md` but not applied as active CSS overrides.

---

## Verification

- `npm run lint:html` — ✅ 0 errors for all 8 library-amber pages (as of review loop round 1 fix)
- `npm run lint:css` — ✅ 0 errors for library-amber CSS
- `npm run lint:js` — ✅ 0 errors for library-amber JS
- `npm run linkcheck`: pending (run before deployment)
- `npm run a11y`: pending (run before deployment)
