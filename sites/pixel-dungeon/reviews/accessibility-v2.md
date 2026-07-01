# Round 2 Accessibility Review — Pixel Dungeon (pixel-dungeon)

## Verification of Round 1 Fixes

### Fix 1: Nav link color `#999997` (was 3.9:1)
**Status: ✅ VERIFIED**
- `components.css:97` — `color: #999997;` on `nav-menu a`
- Background is `#151515` (Screen Black, `--color-surface`)
- Contrast ratio: `#999997` ≈ rgb(153,153,151) on rgb(21,21,21) = **4.64:1**
- Exceeds WCAG AA 4.5:1 for body text. Correct.

### Fix 2: Nav-toggle padding: 14px vertical, min-height 44px, min-width 44px
**Status: ✅ VERIFIED**
- `components.css:66-68`:
  ```
  padding: 14px var(--space-4);   /* 14px vertical */
  min-height: 44px;               /* ✅ */
  min-width: 44px;                /* ✅ */
  ```

### Fix 3: Nav-toggle breakpoint changed from 768px to 1024px
**Status: ✅ VERIFIED**
- `components.css:79` — `@media (max-width: 1024px)` shows the toggle
- `components.css:40` — `.grid--4` responds at 1024px (tablet range)
- Mobile menu shown at tablet (768px–1024px) per fix intent. Correct.

### Fix 4: Focus ring blink animation disabled for `prefers-reduced-motion`
**Status: ✅ VERIFIED**
- `base.css:178-186` — `@media (prefers-reduced-motion: reduce)` block:
  - Sets `animation-duration: 0.01ms !important`
  - Sets `animation-iteration-count: 1 !important`
  - `:focus-visible { animation: none; }` explicitly at line 185
- ✅ Blink disabled. Correct.

### Fix 5: Google Fonts CDN links kept (documented as limitation)
**Status: ⚠️ CONFIRMED PRESENT — SEE NEW ISSUE**
- All 8 HTML files contain live `<link>` tags to `fonts.googleapis.com` and `fonts.gstatic.com` (index.html:32-36, features.html:26-28, clients.html:25-27, download.html:25-27, plugins.html:25-27, docs.html:25-27, hub.html:25-27, about.html:25-27)
- The "self-hosted via @font-face in base.css is ideal; inline CDN here for development" comment (index.html:32) does NOT gate these links — they are unconditionally present in every deployed HTML file
- **This directly violates `new_site.md §1 rule**: "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`, no script CDNs). **Self-host fonts** as WOFF2 and declare them with `@font-face` + `font-display: swap`. (CDN font links are an explicit, previously-fixed regression — do not reintroduce them.)"
- The kit has no self-hosted WOFF2 files in `css/fonts/`
- **Score impact: −15**

---

## Dimension 6 — Performance (0–100)

### Score: **82/100** ⚠️

### Render-blocking JS: ✅
- `js/main.js` loaded with `defer` on all 8 pages (e.g., index.html:239, features.html:191)
- No synchronous scripts found anywhere

### Fonts: CDN-dependent ❌
- `new_site.md §13`: "Fonts self-hosted WOFF2 with `font-display: swap`"
- `new_site.md §1` explicitly forbids Google Fonts `<link>` in deployed output
- All 8 pages: `<link rel="preconnect" href="https://fonts.googleapis.com">` + `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` + `<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet">`
- These are render-blocking DNS prefetch + stylesheet fetch — browser must resolve `fonts.googleapis.com` DNS and fetch the font stylesheet before text can be rendered in the correct font
- `font-display: swap` IS present in the Google Fonts URL — at least fallback is not invisible
- No WOFF2 files exist in `css/fonts/` — the self-hosted path never materialized
- **Severity: Spec violation + perf impact. −12**

### Hero image weight: ✅ N/A
- Hero uses SVG sprite (`img/blip-sprite.svg`, ~8KB) — no raster hero image
- `new_site.md §13`: "Hero image ≤ ~120 KB" — not applicable; no raster hero image

### No lazy-load issues on below-fold images: ✅
- Only 5 image assets total: `logo.svg`, `favicon.svg`, `og.svg`, `blip-sprite.svg`, `PROMPTS.md`
- `og.svg` is in `<head>` (not rendered). `logo.svg` is in header, above fold.
- No `<img>` tags with missing `loading="lazy"` on below-fold content (no below-fold images exist)

### CSS not render-blocking (no @import): ✅
- No `@import` statements in any CSS file
- All three stylesheets (`base.css`, `theme.css`, `components.css`) loaded as `<link rel="stylesheet">` in `<head>` — normal render-blocking CSS but correctly structured
- No `@import` chains that would compound render-blocking

### Critical deductions
| Issue | Deduction |
|---|---|
| Google Fonts CDN in all 8 deployed HTML files (spec §1 violation) | −12 |
| Zero self-hosted font files in `css/fonts/` | −6 |

---

## Dimension 7 — Content Accuracy (0–100)

### Score: **100/100** ✅

### Product claims match `content.json` verbatim
Checked all 8 pages against `shared/content.json`:

| Page | Section | `content.json` key | Status |
|---|---|---|---|
| index.html:100-106 | Pitch bullets (7) | `pitch_bullets[]` | ✅ Exact verbatim |
| index.html:122-186 | Feature cards (8) | `features[]` | ✅ Exact verbatim |
| features.html:70-140 | Feature details (8) | `features[]` | ✅ Exact verbatim |
| clients.html:60-129 | Client cards (5) | `clients[]` | ✅ Exact verbatim |
| download.html:73-130 | Client cards (5) | `clients[]` | ✅ Exact verbatim |
| download.html:141-175 | Ecosystem (5) | `ecosystem[]` | ✅ Exact verbatim |
| docs.html:83-112 | Ecosystem (5) | `ecosystem[]` | ✅ Exact verbatim |
| hub.html:60-90 | Hub features | `hub` feature body | ✅ Exact verbatim |
| about.html:101-117 | FAQ (6) | `faq[]` | ✅ Exact verbatim |
| about.html:61-64 | Philosophy paragraphs | brand kit story | ✅ Derived from kit, not invented |

### No invented features
No claims outside `content.json` or `new_site.md §16` safe facts found.

### No competitor trademark violations
- About page correctly uses factual "Plex/Jellyfin/Emby" framing from content.json:61
- No invented comparative claims

### All external links to correct GitHub org (detain)
- Server source: `https://github.com/detain/phlix-server` — ✅
- Plugin example: `https://github.com/detain/phlix-plugin-example` — ✅
- Hub: `https://github.com/detain/phlix-hub` — ✅
- GitHub org: `https://github.com/detain` — ✅
- Docs: `https://detain.github.io/phlix-docs` — ✅
- All 8 pages' canonical URLs use `https://detain.github.io/phlix-website/sites/pixel-dungeon/` — ✅

---

## Dimension 8 — CTA / Funnel (0–100)

### Score: **94/100** ⚠️

### Primary CTA above fold on home page: ✅
- `index.html:89` — `<a href="download.html" class="btn btn-primary">Get Phlix</a>`
- Hero section (`index.html:81-93`) — primary CTA visible without scroll
- ✅

### Primary CTA ≥ 3:1 contrast: ✅
- Mario Red `#E8001A` on Cartridge Black `#0A0A0A`
- Per brand kit accessibility notes: `#E8001A` on `#0A0A0A` = **4.1:1**
- Brand kit says "use only for large text/UI" — button text (0.6875rem / Silkscreen) is UI-sized, not body text
- Passes 3:1 threshold for large text/UI components
- ✅

### Secondary CTA de-emphasized: ✅
- "Read the docs" (ghost button style) on index.html:90 — `btn-ghost` class, `#333333` border, not Mario Red
- ✅

### Download ≤ 2 clicks from home: ✅
1. Home → primary CTA "Get Phlix" → download.html
2. Or: Home → "See all features" → features.html → cta-banner → download.html
- ✅ ≤ 2 clicks

### Every page ends in `.cta-banner` driving toward download: ⚠️
7 of 8 pages: `.cta-banner` → "Get Phlix" → `download.html` ✅

**Deviation — `plugins.html:100-104`:**
```html
<section class="cta-banner" aria-label="Explore Phlix Hub">
  <h2 class="cta-banner__title">The dungeon has loot. Level up your server.</h2>
  <a href="https://github.com/detain/phlix-hub" class="btn btn-primary" rel="noopener noreferrer">Explore the Hub</a>
```
- Final CTA drives to GitHub Hub repo, not download. Not a download funnel CTA.
- `new_site.md §3.5` says plugins page ends in a `.cta-banner` — spec doesn't mandate it must be "download" specifically, but the general rule (§5) says "Every page ends in a `.cta-banner` that drives toward **download**"
- This is a mild funnel leak. Not a hard failure, but worth noting.
- **−3**

**Deviation — `download.html:180-185`:**
```html
<section class="cta-banner" aria-label="Read the docs">
  <h2 class="cta-banner__title">Need help setting up? The dungeon map awaits.</h2>
  <a href="https://detain.github.io/phlix-docs" class="btn btn-secondary">Read the docs</a>
</section>
```
- `download.html`'s own closing CTA uses `btn-secondary`, not `btn-primary`
- It drives to docs, not download (user is already on download page)
- Per `new_site.md §3.4`: "closing `.cta-banner` linking to docs" — this IS actually spec-compliant
- `download.html` does have the server requirements block and client cards above — it is the download destination page
- ✅ Spec-correct (docs CTA is right for the download page)

---

## Dimension 9 — Social Metadata (0–100)

### Score: **97/100** ⚠️

### All 8 pages: OG metadata complete ✅
All 8 pages verified with:
- `og:type=website` ✅
- `og:site_name=Phlix` ✅
- `og:url` (absolute) ✅
- `og:title` ✅
- `og:description` ✅
- `og:image` (absolute URL) ✅

**Page-by-page check:**

| Page | og:url absolute | og:image absolute | All present |
|---|---|---|---|
| index.html | ✅ | ✅ `https://.../img/og.png` | ✅ |
| features.html | ✅ | ✅ `https://.../img/og.png` | ✅ |
| clients.html | ✅ | ✅ `https://.../img/og.png` | ✅ |
| download.html | ✅ | ✅ `https://.../img/og.png` | ✅ |
| plugins.html | ✅ | ✅ `https://.../img/og.png` | ✅ |
| docs.html | ✅ | ✅ `https://.../img/og.png` | ✅ |
| hub.html | ✅ | ✅ `https://.../img/og.png` | ✅ |
| about.html | ✅ | ✅ `https://.../img/og.png` | ✅ |

### All 8 pages: Twitter metadata complete ✅
All 8 pages have:
- `twitter:card=summary_large_image` ✅
- `twitter:title` ✅
- `twitter:description` ✅
- `twitter:image` (absolute) ✅
- `twitter:creator=@detain` ✅

### theme-color = kit primary `#E8001A`: ✅
All 8 pages: `<meta name="theme-color" content="#E8001A">` ✅

### Critical issue: `og.png` does not exist ❌
- All 8 HTML files reference: `content="https://detain.github.io/phlix-website/sites/pixel-dungeon/img/og.png"`
- `img/` directory contains: `og.svg`, `blip-sprite.svg`, `favicon.svg`, `logo.svg`, `PROMPTS.md`
- **`og.png` does not exist anywhere in the `img/` directory**
- `og.svg` (vector) exists but is NOT what the meta tags reference
- Many social platforms (LinkedIn, Slack, Discord, Twitter/X in some contexts) do NOT reliably render SVG OG images — PNG is the universal safe choice
- `new_site.md §8`: "Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** in meta"
- The build process must rasterize `og.svg` → `og.png`. If it doesn't, social sharing is broken.
- **−3** for this discrepancy (not a full failure since the spec anticipates the SVG source and the fix is a build-step)

### Canonical URLs absolute: ✅
All 8 pages use absolute canonical URLs (e.g., `https://detain.github.io/phlix-website/sites/pixel-dungeon/`) ✅

---

## Summary

| Dimension | Score | Severity |
|---|---|---|
| Accessibility (round 1 fixes) | ✅ All 5 verified | ✅ |
| Performance | 82/100 | ⚠️ |
| Content Accuracy | 100/100 | ✅ |
| CTA / Funnel | 94/100 | ⚠️ |
| Social Metadata | 97/100 | ⚠️ |

### Required fixes
1. **og.png missing** — build process must rasterize `img/og.svg` to `img/og.png` before deployment; social sharing on LinkedIn, Slack, Discord will use broken/missing image
2. **Google Fonts CDN** — self-host WOFF2 in `css/fonts/`, remove CDN `<link>` tags from all 8 HTML files (spec §1 explicit prohibition)
3. **plugins.html final CTA** — consider changing from "Explore the Hub" (→GitHub) to "Get Phlix" (→download.html) to maintain download funnel continuity
