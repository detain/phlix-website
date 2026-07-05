# Dimensions 7–12 Review: Wabi-Sabi Brand-Kit Site

**Site:** `/home/sites/phlix/phlix-website/sites/wabi-sabi/`
**Reviewed against:** `brand-kits/wabi-sabi.js`, `new_site.md`, `shared/content.json`
**Reviewer:** automated 6-dimension audit
**Date:** 2026-07-04

---

## DIMENSION 7 — Responsive

**Score: 92 / 100 — Severity: ⚠️ (Minor structural gap — no live viewport testing performed)**

### Findings

| Check | Status | Citation |
|---|---|---|
| 320→1920px breakpoints | ⚠️ | Structural CSS present; no live browser testing at 320/375/414/768/1024/1280/1920px |
| No horizontal scroll | ✅ | All layout containers use fluid `max-width` + `width: 100%`. No fixed-px layout widths. Grid uses `auto-fit minmax()` which reflows naturally. |
| Readable on phones (body ≥16px) | ✅ | `html { font-size: 16px; }` (`base.css:90`) + `body { font-size: 1rem; }` (`base.css:96`) = 16px floor on all devices. |
| Fluid layouts | ✅ | CSS Grid `auto-fit minmax()` (`theme.css:221`, `theme.css:266`), flexbox throughout, no fixed-px container widths. |
| Mobile nav functional | ✅ | `main.js:15–35` wires click toggle, ESC close, outside-click close, `aria-expanded` sync. `.nav-menu.is-open` display toggling in `components.css:123–125`. |
| Font scaling 200% | ✅ | Fluid `clamp()` typography scale used throughout (`theme.css:18`, `theme.css:27`). Max-width constrains reflow. |

### Notes
- Structural CSS is well-constructed. The fluid `clamp()` type scale and `auto-fit` grids should handle all breakpoints correctly, but no live viewport audit (e.g., Chrome DevTools device toolbar) was performed to confirm zero overflow at every listed width.
- The mobile nav menu uses `left: 0; right: 0` (`components.css:113–114`) instead of `inset-inline: 0`. This is a minor RTL-unsafe hardcoded direction, not a functional defect.

---

## DIMENSION 8 — Performance

**Score: 72 / 100 — Severity: ⚠️ (Known regression; must fix before prod)**

### Findings

| Check | Status | Citation |
|---|---|---|
| No CDN JS dependencies | ✅ | `js/main.js` is self-contained, 93 lines, zero external script CDN links. |
| Google Fonts CDN (dev shortcut) | ⚠️ | `theme.css:11` contains `@import url('https://fonts.googleapis.com/css2?family=...')`. This is a render-blocking font load. BUILD_LOG.md:75 acknowledges it but the production self-hosting step was never implemented. |
| Deferred JS | ✅ | All 8 pages use `<script src="js/main.js" defer>` (`index.html:239`, `features.html:214`, `clients.html:189`, `download.html:155`, `plugins.html:126`, `docs.html:126`, `hub.html:124`, `about.html:145`). |
| No render-blocking CSS | ⚠️ | The Google Fonts `@import` inside `theme.css` (loaded via `<link>` in `<head>`) is itself a render-blocking import. |
| CSS custom properties (design tokens) | ✅ | `:root` token block in `base.css:16–85` is the single source of truth for all colors, spacing, radii, shadows, and fonts. All three stylesheets reference `var(--color-*)`, `var(--space-*)`, etc. |
| Hero text not an image | ✅ | `index.html:86` — `<h1>Your media. Your library. Your Phlix.</h1>` is real HTML text. |

### Defect
**`theme.css:11` — Google Fonts CDN `@import` is render-blocking.**
The spec (`new_site.md:84–87`) explicitly forbids Google Fonts CDN links and requires self-hosted WOFF2 with `@font-face` + `font-display: swap`. BUILD_LOG.md:75 acknowledges the deviation but the fix (download WOFF2 files, declare `@font-face` locally) is listed as an unresolved follow-up (`BUILD_LOG.md:83`). Until fonts are self-hosted, this is an active spec violation that will hurt Lighthouse performance scores.

---

## DIMENSION 9 — Content Accuracy

**Score: 98 / 100 — Severity: ✅ (Pass; one trivial punctuation variance)**

### Findings

Every substantive product claim on all 8 pages was cross-checked against `new_site.md §16` and `content.json`. All matched verbatim.

| Content Block | File | Verbatim? | Notes |
|---|---|---|---|
| `hero.eyebrow` ("Self-hosted media server") | `index.html:85` | ✅ | Matches `content.json hero.eyebrow` exactly. |
| `hero.headline` ("Your media. Your library. Your Phlix.") | `index.html:86` | ✅ | Matches `content.json hero.headline` exactly. |
| `hero.subheadline` | `index.html:87` | ✅ | Full text matches `content.json hero.subheadline`; apostrophes correctly entity-encoded as `&apos;`. |
| All 7 `pitch_bullets[]` | `index.html:100–106` | ✅ | Exact match to `content.json pitch_bullets[]`. |
| All 8 `features[]` (title + body) | `index.html:122–186` / `features.html:76–162` | ✅ | Exact match to `content.json features[]`. Entity encoding in `features.html:125` (`&apos;`) is correct. |
| All 5 `clients[]` | `clients.html:69–138` | ✅ | Exact match to `content.json clients[]`. |
| All 5 `ecosystem[]` | `download.html:101–106`, `docs.html:79–84` | ✅ | Exact match to `content.json ecosystem[]`. |
| All 6 `faq[]` | `about.html:79–102` | ✅ | Exact match to `content.json faq[]`. |
| PHP 8.3+ claim | `download.html:70` | ✅ | "Requires PHP 8.3+ and phlix-server." |
| Workerman 5.x claim | `download.html:101`, `docs.html:79` | ✅ | "PHP 8.3+, Workerman 5.x" |
| JWT / Argon2ID | `index.html:150` | ✅ | "JWT auth with refresh tokens, Argon2ID password hashing" |
| TMDB / TVDB / Fanart.tv | `index.html:103` | ✅ | "TMDB, TVDB, Fanart.tv, and local NFO" |
| Adaptive HLS | `index.html:104` | ✅ | "Adaptive HLS streaming" |
| SyncPlay | `index.html:102` | ✅ | "Real-time SyncPlay with NTP-style time sync" |
| DLNA | `index.html:104`, `index.html:168` | ✅ | "any DLNA device", "ContentDirectory, AvTransport" |
| BSD-3-Clause | `about.html:72` | ✅ | "BSD-3-Clause across all Phlix projects." |
| Download clients (Roku, Samsung Tizen, Windows, Mobile, DLNA) | `download.html:77–96` | ✅ | Matches `content.json clients[]` status and highlights. |

### Minor Note
`features.html:71` says "See the reference plugin" with a trailing period, while `content.json features[6].body` ends with no trailing period ("See phlix-plugin-example"). This is a trivial micro-copy variance, not a factual inaccuracy.

---

## DIMENSION 10 — CTA / Funnel

**Score: 85 / 100 — Severity: ⚠️ (og:image 404 reduces effective funnel quality)**

### Findings

| Check | Status | Citation |
|---|---|---|
| Primary CTA "Get Phlix" above fold | ✅ | `index.html:89` — `<a href="download.html" class="btn btn-primary btn-large">Get Phlix</a>` sits inside `.hero-cta` div within the hero section. Hero is `min-height: 90vh` (`theme.css:121`). CTA is in the first content block. |
| Primary CTA contrast ≥3:1 | ✅ | `btn-primary` background: `#7C5230` (weathered oak) on `#F5F0E8` (rice paper). Brand kit states ~5.8:1 (`wabi-sabi.js:1066`). WCAG AA for normal text is 4.5:1; for large text/UI it's 3:1. Button text is `0.9375rem` / `1rem` (large variant), so 3:1 threshold applies — 5.8:1 passes. |
| Secondary CTA present and de-emphasized | ✅ | `index.html:90` — `.btn-secondary` (ghost style: transparent bg, lichen-green border/text) is visually subordinate to `.btn-primary`. Properly de-emphasized. |
| Download reachable in ≤2 clicks from home | ✅ | Home → nav "Download" link → `download.html` (1 click). Home → hero CTA "Get Phlix" → `download.html` (1 click). Home → CTA banner "Download Phlix" on home itself (0 clicks). |

### Defect
**`og.png` 404 degrades social sharing effectiveness.**
When a user shares a page and the crawler encounters a 404 on `og:image`, social embeds render without a preview card — significantly reducing the CTA conversion rate from social traffic. This is not a CTA design defect but a social sharing infrastructure defect that directly impacts the download funnel from social sources.

---

## DIMENSION 11 — Social Metadata

**Score: 72 / 100 — Severity: ⚠️ (Critical: og:image file missing)**

### Findings

**Every page (all 8) has complete OG + Twitter Card meta, all absolute URLs:**

| Tag | All 8 pages? | Absolute? | Citation |
|---|---|---|---|
| `og:title` | ✅ | — | `index.html:11`, `features.html:10`, etc. |
| `og:description` | ✅ | — | `index.html:12`, `features.html:11`, etc. |
| `og:image` | ✅ | ✅ | e.g. `index.html:13` → `https://detain.github.io/phlix-website/sites/wabi-sabi/img/og.png` |
| `og:url` | ✅ | ✅ | `index.html:14` → `https://detain.github.io/phlix-website/sites/wabi-sabi/` |
| `og:type` | ✅ | — | `index.html:15` → `website` |
| `og:site_name` | ✅ | — | `index.html:16` → `Phlix` |
| `twitter:card` | ✅ | — | `index.html:19` → `summary_large_image` |
| `twitter:title` | ✅ | — | `index.html:20` |
| `twitter:description` | ✅ | — | `index.html:21` |
| `twitter:image` | ✅ | ✅ | `index.html:22` |
| `twitter:creator` | ✅ | — | `index.html:23` → `@detain` |
| `theme-color` | ✅ | — | `index.html:26` → `#7C5230` |

### Critical Defect
**`img/og.png` does not exist — all `og:image` meta tags point to a 404.**

```
$ ls /home/sites/phlix/phlix-website/sites/wabi-sabi/img/
favicon.svg  logo.svg  og.svg  PROMPTS.md
```

Every page's `<meta property="og:image" content=".../img/og.png">` and `<meta name="twitter:image" content=".../img/og.png">` will return HTTP 404 when crawled by social media bots. The file is `og.svg` (which does exist and contains valid 1200×630 SVG markup), but all 8 HTML files reference `og.png`.

`BUILD_LOG.md:76` explicitly notes: "og.png is delivered as og.svg (scalable SVG at correct 1200×630 dimensions). The build system can rasterize to PNG if needed." That rasterization step was never completed. Twitter Card validation in particular requires a rasterized image for `summary_large_image` cards; SVG is not universally supported.

### Secondary Note
While `og.svg` exists and is presumably valid SVG at the right dimensions, the official spec (`new_site.md:295–297`) explicitly requires "ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** in meta." The rasterized PNG does not exist.

---

## DIMENSION 12 — Localization

**Score: 95 / 100 — Severity: ✅ (Pass; one minor RTL gap in mobile nav)**

### Findings

| Check | Status | Citation |
|---|---|---|
| `<html lang="en">` set | ✅ | `index.html:2` — `<html lang="en">`. All 8 pages: `<html lang="en">`. |
| All user-facing strings from content.json / brand kit | ✅ | Hero copy, pitch bullets, feature bodies, client data, ecosystem, FAQ, footer columns, footer tagline — all trace to `content.json`. Nav items (Home, Features, Clients, etc.) are the required 8 nav links per `new_site.md §5` and use the exact labels from the spec. |
| No locale-unsafe formatting | ✅ | No `toLocaleString()`, `Intl.*`, `Date.prototype.toLocaleDateString()`, or `Number.prototype.toLocaleString()` calls anywhere. No template literals with locale-sensitive tokens. All numbers are static. |
| Logical properties (inline-start/end) | ⚠️ | `base.css:205` uses `margin-inline: auto` ✓. `base.css:206` uses `padding-inline` ✓. However `components.css:113–114` uses `left: 0; right: 0` for the mobile nav absolute positioning, not `inset-inline: 0`. This is a minor RTL-unsafe direction. |
| `prefers-reduced-motion` honored | ✅ | `base.css:190–199` resets all animations; `main.js:40–42` checks `matchMedia` before applying scroll reveals; `theme.css:411–420` zeroes animation on reduced-motion preference. |

### Minor RTL Gap
`components.css:113–114`:
```css
left: 0;
right: 0;
```
Should be:
```css
inset-inline: 0;
```
This is not a functional defect in an English-only site but is a deviation from the localization-readiness requirement in `new_site.md §15`.

---

## Summary Table

| Dimension | Score | Severity | Blocking? | Primary Finding |
|---|---|---|---|---|
| 7 — Responsive | 92 | ⚠️ | No | Structural CSS sound; no live viewport testing at breakpoints |
| 8 — Performance | 72 | ⚠️ | Yes (prod) | Google Fonts CDN `@import` is render-blocking; self-hosting not implemented |
| 9 — Content Accuracy | 98 | ✅ | No | All claims accurate; one trivial punctuation variance |
| 10 — CTA / Funnel | 85 | ⚠️ | No | Primary CTA above fold with correct contrast; og:image 404 reduces social conversion |
| 11 — Social Metadata | 72 | ⚠️ | Yes | All 8 pages reference `img/og.png` which does not exist (only `og.svg` present) |
| 12 — Localization | 95 | ✅ | No | `<html lang="en">` correct; one minor RTL gap in mobile nav positioning |

## Required Actions Before Production

1. **P0 — Fix `og:image` 404:** Either rasterize `og.svg` → `og.png` (1200×630) or update all 8 pages to reference `og.svg` (noting Twitter Card SVG limitations).
2. **P1 — Self-host fonts:** Replace the Google Fonts CDN `@import` in `theme.css:11` with local `@font-face` declarations and download WOFF2 files to `css/fonts/`.
3. **P2 — RTL fix:** Replace `left: 0; right: 0` with `inset-inline: 0` in `components.css:113–114` for RTL readiness.
