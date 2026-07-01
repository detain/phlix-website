# Round 2 Performance Review — Pixel Dungeon (pixel-dungeon)

## Dimension 6 — Performance

**Score: 82/100** ⚠️

---

## Render-blocking JS: ✅

All 8 pages load `js/main.js` with `defer`:

- `index.html:239` — `<script src="js/main.js" defer></script>`
- `features.html:191`
- `clients.html:179`
- `download.html:224`
- `plugins.html:133`
- `docs.html:150`
- `hub.html:167`
- `about.html:155`

No synchronous scripts. No third-party analytics. No script CDNs.

---

## Fonts: CDN-dependent — SPEC VIOLATION ❌

**Penalty: −18**

`new_site.md §1` is unambiguous:

> "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`, no script CDNs). **Self-host fonts** as WOFF2 and declare them with `@font-face` + `font-display: swap`. (CDN font links are an explicit, previously-fixed regression — do not reintroduce them.)"

All 8 HTML files contain unconditional Google Fonts CDN links:

**index.html:32-36:**
```html
<!-- Google Fonts — self-hosted via @font-face in base.css is ideal;
     inline CDN here for development with font-display: swap -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet">
```

The comment admits the ideal is self-hosted but the deployed output contains the CDN link. There is no conditional, no `<!-- dev-only -->`, no swap. The site at `sites/pixel-dungeon/` is the deployed output.

**Same pattern in:** `features.html:26-28`, `clients.html:25-27`, `download.html:25-27`, `plugins.html:25-27`, `docs.html:25-27`, `hub.html:25-27`, `about.html:25-27`

**Performance impact:**
- DNS prefetch to `fonts.googleapis.com` and `fonts.gstatic.com` fires on every page load
- Browser must fetch `fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&display=swap` as a render-blocking stylesheet
- Only then does the browser have the actual font declarations to fetch WOFF2 files
- Two additional DNS lookups + an additional render-blocking request before fonts render
- `font-display: swap` IS present, so text is not invisible — but FOUT is unavoidable on first load

**No self-hosted WOFF2 files exist:**
- `css/fonts/` directory does not exist
- `base.css` does not contain any `@font-face` declarations
- The declared font stacks fall back to `Courier New` (system monospace) on first paint, then swap when the CDN responds

**Contrast with `base.css:53-57`:**
```css
--font-headline: 'Press Start 2P', 'Courier New', monospace;
--font-display:  'Press Start 2P', 'Courier New', monospace;
--font-body:     'Silkscreen', 'Courier New', monospace;
--font-ui:       'Silkscreen', 'Courier New', monospace;
--font-mono:     'Press Start 2P', 'Courier New', monospace;
```
The monospace fallbacks show the intent was progressive enhancement, but the CDN is not progressive — it blocks.

---

## Hero image weight: ✅ N/A

No raster hero image. The hero uses `img/blip-sprite.svg` (an SVG ~8KB) which is not a raster image subject to the ~120KB budget.

---

## No images without lazy-load on below-fold content: ✅

All 5 image assets:
- `img/logo.svg` — in `<header>`, above fold
- `img/blip-sprite.svg` — in hero section, above fold
- `img/og.svg` — in `<head>`, not rendered as `<img>`
- `img/favicon.svg` — in `<head>`
- `img/PROMPTS.md` — text file, not an image

No `<img loading="lazy">` patterns needed because there are no below-fold raster images. No CLS risk from unsized images.

---

## CSS not render-blocking (no @import): ✅

No `@import` statements in `base.css`, `theme.css`, or `components.css`.

All three stylesheets loaded via `<link rel="stylesheet">` in `<head>` — normal render-blocking behavior but unavoidable and correctly structured. No CSS-in-JS, no inline `<style>` blocking.

---

## Summary table

| Check | Status | File:Line |
|---|---|---|
| No render-blocking JS (`defer` on all scripts) | ✅ | All 8 HTML files |
| Fonts self-hosted or CDN with `font-display: swap` | ❌ CDN only | All 8 HTML files:32-36 |
| Hero image weight ≤ ~120KB | ✅ N/A | No raster hero |
| No images without lazy-load on below-fold | ✅ | N/A |
| CSS not render-blocking (no @import) | ✅ | All CSS files |

**Required fix:** Self-host WOFF2 fonts in `css/fonts/`, add `@font-face` declarations in `base.css`, remove Google Fonts CDN `<link>` tags from all 8 HTML files.
