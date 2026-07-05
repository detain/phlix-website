# DIMENSION 8: Performance Review — Swiss Modernist Site

## Score: 58 / 100

---

## Fonts

### Self-Hosted Fonts Status
| Font | Required by Brand Kit | Self-Hosted? | Status |
|------|----------------------|--------------|--------|
| Inter | ✅ (headline, body, UI roles) | ❌ **NO** | Fonts dir empty, no `@font-face` anywhere |
| Barlow Condensed | ✅ (display numerals) | ❌ **NO** | Not loaded |
| JetBrains Mono | ✅ (monospace) | ❌ **NO** | Not loaded |

**`css/fonts/` contents:** Empty directory (`ls -la` confirmed — 0 files).

**`@font-face` declarations:** None found in any CSS file. The brand kit spec explicitly requires self-hosted WOFF2:

> `new_site.md §13`: "Fonts self-hosted WOFF2 with `font-display: swap`; subset to used scripts."

> `new_site.md §17`: "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`)."

> `brand-kits/swiss-modernist.js §13`: "Inter is the only typeface in this system."

**Current behavior:** The browser falls back to the system font stack (`'Helvetica Neue', Helvetica, Arial, sans-serif` for Inter; `'Courier New', Courier, monospace` for JetBrains Mono). The fonts technically render, but not with the intended Swiss Modernist typographic identity.

**Impact:** For a brand kit whose entire identity is built on Inter Black headlines at 900 weight and Barlow Condensed display numerals at 800 weight, this is a **significant brand fidelity failure**. The headline at `--font-weight-headline: 900` falls through to system fonts that may not support weight 900 — causing the typographic hierarchy to collapse.

---

## CDNs
| Check | Status | Notes |
|-------|--------|-------|
| No Google Fonts `<link>` | ✅ | No CDN links found in any HTML |
| No JS CDNs | ✅ | All JS is `defer`-loaded local file |
| No CSS CDNs | ✅ | All CSS is local |
| No external script CDNs | ✅ | Zero third-party scripts |

---

## JavaScript
| Check | Status | Location |
|-------|--------|----------|
| `defer` attribute on `<script>` | ✅ | `index.html:236`, `download.html:182` |
| No render-blocking JS in `<head>` | ✅ | All scripts at `</body>` or `defer` |
| No analytics scripts | ✅ | Static site, no tracking |
| No third-party scripts | ✅ | Zero external JS dependencies |

---

## CSS
| Check | Status | Location |
|-------|--------|----------|
| CSS in separate files | ✅ | `base.css`, `theme.css`, `components.css` |
| All 3 stylesheets loaded per page | ✅ | `index.html:31-33` |
| No inline `<style>` blocks | ✅ | None found in HTML |
| No render-blocking `media=""` attrs | ✅ (acceptable) | All 3 sheets are screen-only |

---

## Images
| Asset | Size | Format | Status |
|-------|------|--------|--------|
| `img/logo.svg` | 499 bytes | SVG | ✅ |
| `img/favicon.svg` | 338 bytes | SVG | ✅ |
| `img/og.svg` | 2,065 bytes | SVG | ✅ |
| Hero numeral | CSS-rendered text | No image | ✅ |
| Feature icons | Inline SVG | No raster | ✅ |

No raster images above 120KB. Total transferred image weight per page: **negligible** (<5KB).

---

## CLS (Cumulative Layout Shift)

| Source | Risk | Mitigation |
|--------|------|-------------|
| Hero headline `clamp()` | Low | `clamp()` is render-stable; no image without dimensions |
| Hero numeral `aria-hidden` | None | Pure CSS text, no shift |
| Sticky header | None | Fixed height, no content reflow |
| No external fonts loading | None (CSS uses system stack) | Falls back gracefully |
| `max-width: var(--max-width)` | None | Fluid container |
| `user-select: none` on decorative numeral | None | `theme.css:232` |

**CLS risk: Very Low.** No images with explicit width/height that could shift, no font loading (hence no FOUT), no ads or embeds.

---

## LCP / Core Web Vitals

Given the site structure (static HTML, no external fonts, no heavy images):

| Metric | Expected | Notes |
|--------|----------|-------|
| LCP | < 1.5s | Grid White background, Inter Black via system font, no hero image to load |
| CLS | < 0.05 | No font swaps, no image dimensions causing shift |
| INP | < 100ms | Minimal JS, no heavy event handlers |

These should easily pass Lighthouse ≥90 performance budgets.

---

## Render-Blocking Resources

| Resource | Blocking? | Notes |
|----------|-----------|-------|
| `base.css` | ⚠️ In `<head>` | Expected; critical for visual render |
| `theme.css` | ⚠️ In `<head>` | Has some above-fold content styling |
| `components.css` | ⚠️ In `<head>` | Mostly below-fold but header/nav is in `<head>` |
| `main.js` | ✅ `defer` | Non-blocking |

**No critical CSS inlining** — all critical styles are in separate files loaded in `<head>`. This is a minor deviation from optimal but acceptable for a simple static marketing site where the hero content is in the HTML itself and doesn't rely on JS.

---

## Severity Summary

| Check | Severity | Location |
|-------|----------|----------|
| Self-hosted fonts | ❌ **Critical** | `css/fonts/` is empty; no `@font-face` rules |
| No CDNs | ✅ Pass | Zero external dependencies |
| Deferred JS | ✅ Pass | `defer` on all `<script>` |
| Image weight | ✅ Pass | All SVG, <5KB total |
| CLS | ✅ Pass | No layout shifts |
| No render-blocking JS | ✅ Pass | All JS deferred |
| CSS in separate files | ✅ Pass | 3 CSS files, loaded correctly |
| `font-display: swap` | ❌ Not applicable | No `@font-face` at all |

**Score: 58/100 — No CDN dependencies and deferred JS are excellent. However, the Inter and Barlow Condensed and JetBrains Mono fonts required by the brand kit are completely absent — no self-hosted WOFF2 files, no `@font-face` rules, and an empty `css/fonts/` directory. The entire typographic identity of the Swiss Modernist brand (Inter Black headlines at 900 weight as the primary design element) falls back to system fonts. This is the single most critical performance/fidelity failure.**

---

## Recommendations
1. **Download Inter** (Google Fonts → self-host as WOFF2), **Barlow Condensed**, and **JetBrains Mono** into `css/fonts/`
2. Add `@font-face` declarations in `base.css` with `font-display: swap`
3. Subset Inter to Latin-only to minimize file size
4. Consider inlining the `:root` token block from `base.css` in a `<style>` tag in `<head>` for instant first render
