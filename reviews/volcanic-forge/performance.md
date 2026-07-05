# Performance Review — Volcanic Forge

**Score: 77 / 100** ⚠️

---

## Self-hosted fonts with `font-display: swap`

✅ **PASS** — `index.html:33-75` declares all `@font-face` rules with `font-display: swap`.
Font families: Anton, Barlow, Barlow Semi Condensed, Barlow Condensed, JetBrains Mono.

```css
/* index.html:33-39 example */
@font-face {
  font-family: 'Anton';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Anton'), local('Anton-Regular'), url('css/fonts/anton.woff2') format('woff2');
}
```

**HOWEVER — the `css/fonts/` directory does not exist.** The WOFF2 files are referenced in the CSS but are absent from the filesystem. The `local()` fallbacks (e.g. `local('Anton')`) rely on the font being installed on the user's OS — Anton is not a system font on most systems. **Result: custom fonts silently fail to load on most browsers; site falls back to Georgia/Impact system fonts.** This is a functional breakage, not just a performance issue.

---

## No CDNs (no Google Fonts `<link>` in HTML)

✅ **PASS** — No `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` tags found across any of the 8 HTML pages. All fonts are self-hosted. No other CDN resources (JS, CSS, images) detected.

---

## No render-blocking JS (all scripts have `defer`)

✅ **PASS** — The single `<script src="js/main.js" defer></script>` tag on every page uses the `defer` attribute. It does not block HTML parsing.

```
index.html:284          <script src="js/main.js" defer></script>
download.html:156        <script src="js/main.js" defer></script>
features.html:202        <script src="js/main.js" defer></script>
clients.html:180         <script src="js/main.js" defer></script>
plugins.html:122         <script src="js/main.js" defer></script>
docs.html:122            <script src="js/main.js" defer></script>
hub.html:120             <script src="js/main.js" defer></script>
about.html:141           <script src="js/main.js" defer></script>
```

---

## Hero image ≤120KB (CSS gradient only = great)

✅ **PASS** — The hero section at `index.html:128-138` uses only CSS gradients:

```css
/* theme.css:92-106 */
.hero::before { background: var(--gradient-forge-horizon); }
.hero::after  { background: var(--gradient-eruption); }
```

`--gradient-forge-horizon` = `linear-gradient(180deg, #D4820A, #E8611A, #0E0C0A)` (CSS only)
`--gradient-eruption` = `radial-gradient(ellipse at center, rgb(232,97,26,0.35), rgb(14,12,10,0.0) 70%)` (CSS only)

No raster hero image is used. Zero KB transferred for the hero backdrop. Excellent.

---

## Total page transferred ≤500KB

✅ **PASS** — Estimated total:
- HTML (largest page ~30KB): ~200KB across 8 pages (loaded one at a time)
- CSS: `base.css` (200L) + `theme.css` (435L) + `components.css` (597L) = ~50KB minified
- JS: `main.js` (61 lines) = ~2KB
- Images: All SVGs — `favicon.svg`, `logo.svg`, `og.svg` (all vector, tiny)
- Fonts: Attempted but missing (0KB served, browser uses system fallback)

**Total per page load: ~80–120KB max.** Well under 500KB.

---

## Summary

| Check | Result |
|---|---|
| Self-hosted fonts + `font-display: swap` | ⚠️ CSS correct, but font files missing from `css/fonts/` |
| No CDNs | ✅ PASS |
| No render-blocking JS | ✅ PASS |
| Hero image ≤120KB | ✅ PASS (CSS gradient only) |
| Total page ≤500KB | ✅ PASS |

**Critical action required:** Add the missing WOFF2 font files to `css/fonts/`:
- `anton.woff2`
- `barlow.woff2`
- `barlow-medium.woff2`
- `barlow-semi-condensed-semibold.woff2`
- `barlow-condensed-bold.woff2`
- `jetbrains-mono.woff2`

Without these, the site renders with system fallback fonts (Impact/Georgia) which breaks the Volcanic Forge typographic identity defined in the brand kit (`index.html:33` declares Anton for headlines, Barlow for body).
