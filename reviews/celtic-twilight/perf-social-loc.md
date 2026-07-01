# Celtic Twilight Site Review: Dimensions 8, 11, 12, 5, 9

## Dimension 8: Performance

### Score: 82/100

#### Findings

- **✅ No render-blocking JS** — All pages load JS with `defer` attribute:
  - `index.html:272` — `<script src="js/main.js" defer></script>`
  - `about.html:24`, `download.html:25`, etc. — same pattern across all 8 pages

- **✅ No CDN dependencies** — No Google Fonts `<link>`, no script CDNs. CSS uses only local files (`css/base.css`, `css/theme.css`, `css/components.css`). Fonts fall back to system stacks via CSS custom properties.

- **⚠️ Font-display: swap** — Not applicable in the strict sense because no `@font-face` declarations exist. `base.css:92-93` contains a comment acknowledging that "production build should self-host WOFF2 fonts" and that system font fallbacks are used. No external fonts are loaded, so `font-display` is moot by absence. However, the brand kit explicitly calls for Cinzel/EB Garamond/Nunito self-hosted as WOFF2 — this is a documented gap, not an immediate defect.

- **✅ Image weight reasonable** — Hero is a CSS gradient (`--gradient-dusk` defined in `base.css:44`), not a raster image. The `img/` directory contains only small SVGs:
  - `favicon.svg` (586 bytes)
  - `logo.svg` (1.7 KB)
  - `og.svg` (2.5 KB) — not a PNG
  No heavy raster assets in the deployed output.

- **✅ CLS budget maintained** — No `<img>` tags without dimensions. All images are inline SVGs with `viewBox` (e.g., feature icons in `index.html:144-211`). Logo `img` element has explicit `width="120" height="40"` (`index.html:59`). No layout shifts from unsized media.

#### Summary
Performance is solid. The one noted gap (self-hosted WOFF2 fonts) is acknowledged in comments and does not cause current defects since only system fonts are used. Hero is CSS-only, no CDN calls, JS deferred.

---

## Dimension 11: Social Metadata

### Score: 75/100 — One critical defect drops the score significantly

#### Findings

All 8 pages (`index.html`, `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html`) were checked.

- **✅ OG meta complete** on all pages: `og:type`, `og:site_name`, `og:url` (absolute), `og:title`, `og:description`.
- **✅ Twitter meta complete** on all pages: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator="@detain"`.
- **✅ All URLs absolute** — `og:url`, `og:image`, canonical, and all `twitter:image` use absolute `https://detain.github.io/phlix-website/celtic-twilight/...` URLs.
- **✅ `theme-color` = `#2D6A4F`** — Correctly set to the kit's primary color on every page.
- **✅ Favicon link present** — `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">` on every page.

#### ❌ CRITICAL DEFECT: og:image 404

**Every page** declares:
```html
<meta property="og:image" content="https://detain.github.io/phlix-website/celtic-twilight/img/og.png">
```

But `img/` contains only `og.svg` — **no `og.png` exists**. The social media scraper for Facebook, Twitter/X, LinkedIn, etc. will fetch `og.png` and receive a 404. The 1200×630 raster OG image is a required deliverable per `new_site.md:295-297` and the brand kit.

**Evidence:**
- `index.html:17`, `features.html:14`, `clients.html:14`, `download.html:14`, `plugins.html:14`, `docs.html:14`, `hub.html:14`, `about.html:14` — all point to `og.png`
- `img/` directory listing shows only: `favicon.svg`, `logo.svg`, `og.svg`, `PROMPTS.md`

#### ✅ og:description on index.html matches content.json

`index.html:16` uses `content.json` `meta.description` verbatim. However, some pages have custom og:description that do not come from content.json — this is acceptable for page-specific summaries (e.g., `download.html:17` "Download Phlix — the self-hostable PHP media server. PHP 8.3+, Workerman 5.x.").

---

## Dimension 12: Localization Readiness

### Score: 94/100

#### Findings

- **✅ `<html lang="en">`** — Correctly set on every page from `site.default_locale`. (`index.html:2`, `features.html:2`, etc.)

- **✅ All user-facing strings trace to content.json** — The substantive product copy (hero, pitch bullets, feature bodies, FAQ, footer columns) comes verbatim from `content.json`. Brand-flavored micro-copy (section eyebrows like "Begin your chronicle" on download, "The story so far" on about, tagline "Ancient light. Living screen.") is explicitly permitted by `new_site.md:109-113` as kit voice overlay.

- **✅ No locale-unsafe formatting** — No `new Date()` without locale, no `.toLocaleString()`, no hardcoded number formats. Grep for `new Date()|\.toLocale` returned zero matches across all HTML pages.

- **✅ Logical CSS properties used** — The codebase uses logical properties throughout:
  - `margin-inline` (`theme.css:63`), `padding-inline` (`theme.css:63`)
  - `inset: 0` (`theme.css:86-87`) — used instead of `top:0;right:0;bottom:0;left:0`
  - Only 3 instances of physical properties found:
    - `base.css:150` — `left: var(--space-4)` on `.skip-link` (acceptable for skip-link positioning)
    - `components.css:469-470` — `left:0; right:0` on mobile nav menu (acceptable)
    These are all in non-layout-flow contexts (skip link, absolute-positioned overlay menu) and not systemic.

#### Minor Note
The `© 2026 Phlix` hardcoded year in footer (`index.html:269`) is technically locale-unsafe — a static year won't auto-update. However, this is micro-copy that would typically be localized via a template variable in a real i18n system, and 2026 is acceptably non-specific. Not scored as a defect.

---

## Dimension 5: Usability

### Score: 96/100

#### Findings

- **✅ Download ≤2 clicks from home** — Home (`index.html`) has primary CTA "Get Phlix" linking directly to `download.html`. One click from hero, two from any other section via the persistent nav CTA.

- **✅ Primary CTA above fold on home** — Hero section (`index.html:78-91`) has `min-height: 90vh` (`theme.css:75`) and contains "Get Phlix" as `.btn.btn-primary.btn-lg`. On any viewport ≥320px width, this CTA is visible without scrolling.

- **✅ No traps or broken flows** — All nav links are functional, all CTAs point to valid pages. No dead ends observed. The download page lists all clients with repo links. The docs page correctly links out to the external docs site.

- **✅ Keyboard navigation** — Skip link present, focus styles visible (`:focus-visible` with gold ring in `base.css:171-174`), all interactive elements have `min-height: 44px` (touch target requirement).

---

## Dimension 9: Content Accuracy

### Score: 100/100

#### Findings

All product claims were cross-referenced against `shared/content.json` and the ground truth in `new_site.md §16`.

- **✅ PHP 8.3+, Workerman 5.x** — Correctly stated on `download.html:60-61` (code block) and `download.html:13,17` (og:description). Matches `content.json:127`.
- **✅ JWT auth** — Feature card on `index.html:179-180` states "JWT auth with refresh tokens, Argon2ID password hashing" — matches content.json FAQ.
- **✅ Argon2ID** — Same feature card, correct.
- **✅ TMDB/TVDB/Fanart.tv/NFO** — Stated in pitch bullet `index.html:115` and feature card `index.html:150`, correct.
- **✅ SyncPlay with NTP-style time sync** — `index.html:111` and feature card `index.html:162`, correct.
- **✅ FFmpeg transcoding / HLS** — Stated in pitch bullet `index.html:119` and feature card `index.html:171`, correct.
- **✅ Live TV + DVR + EPG** — `index.html:123` and feature card `index.html:192`, correct.
- **✅ DLNA** — `index.html:107` pitch bullet and feature card `index.html:202`, correct.
- **✅ Plugin system with LifecycleInterface + manifest** — Feature card `index.html:213`, correct.
- **✅ Phlix Hub** — `index.html:75-76` and hub.html page, correct.
- **✅ Clients: Roku, Samsung Tizen, Windows, Mobile (React Native beta), DLNA** — `download.html:77-99` and `clients.html` listing, correct statuses (Roku/Tizen/Windows/DLNA = stable; Mobile = beta).
- **✅ BSD-3-Clause license** — About page `about.html:64`, correct.
- **✅ No competitor trademarks except factual framing** — "Plex / Jellyfin / Emby" only appears in FAQ (`about.html:79`) from `content.json:136`, no other mentions.
- **✅ No invented features** — All 7 pitch bullets, 7 feature cards, 6 FAQ items, 5 client entries, 5 ecosystem entries match content.json verbatim.

---

## Summary Table

| Dimension | Score | Critical Issues |
|-----------|-------|-----------------|
| 8: Performance | 82/100 | Font self-hosting gap (acknowledged, no current defect) |
| 11: Social metadata | 75/100 | **og.png missing (404)** — only og.svg exists |
| 12: Localization | 94/100 | Hardcoded year in footer (minor, non-blocking) |
| 5: Usability | 96/100 | None |
| 9: Content accuracy | 100/100 | None |

## Required Fixes

1. **[Dimension 11 — CRITICAL]** Generate `img/og.png` (1200×630 raster) from `img/og.svg` source. Update all 8 pages to reference the correct file, or generate a proper PNG from the SVG. All `og:image` meta tags point to a non-existent file.
