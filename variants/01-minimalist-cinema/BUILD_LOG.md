# BUILD_LOG — 01-minimalist-cinema

## 2026-05-20 — Initial Build

### Created Files

**CSS (3 files)**
- `css/base.css` — CSS reset, box-sizing, root variables for brand colors, skip-link, focus styles, reduced-motion support
- `css/theme.css` — Font imports (self-hosted with CDN fallback), typography scale, header/footer styles, navigation
- `css/components.css` — All UI components: buttons, cards, hero, pitch, features, clients, downloads, CTAs, FAQ, footer

**JavaScript (1 file)**
- `js/main.js` — Mobile nav toggle with focus trap, smooth scroll, FAQ accordion with keyboard support

**Images (4 files)**
- `img/logo.svg` — Film-strip X logo with sprocket holes and play button negative space
- `img/favicon.svg` — Minimalist film-strip X icon on electric blue background
- `img/og.svg` — Open Graph image placeholder with film-strip decorations
- `img/PROMPTS.md` — Documentation for AI image generation prompts

**HTML Pages (8 files)**
- `index.html` — Home page with hero, pitch bullets, features overview, CTA banner
- `features.html` — Detailed feature list with icons
- `clients.html` — Client cards with status badges
- `download.html` — Server installation, client downloads, ecosystem list
- `plugins.html` — Plugin system explanation
- `docs.html` — Documentation links
- `hub.html` — Phlix Hub explanation
- `about.html` — Philosophy, license, contributing, FAQ accordion

**Documentation (2 files)**
- `VARIANT.md` — Variant documentation and design decisions
- `BUILD_LOG.md` — This build log

### Design Notes
- All content rendered verbatim from `shared/content.json`
- All colors/fonts from brand kit exclusively
- No frameworks, bundlers, or runtime CDN dependencies
- Self-hosted fonts with Google Fonts fallback for development
- Full accessibility: skip-link, landmarks, ARIA, focus-visible, reduced-motion

### Deviations
- None — built to spec

### Next Steps
- Run linters (htmlhint, stylelint, eslint)
- Run npm build verification

---

## 2026-05-20 — Fixes Applied (Code Review Round 1)

### Stylelint Fixes (24 errors auto-fixed with `npx stylelint --fix`)

| File | Issue | Fix Applied |
|------|-------|------------|
| `css/base.css:10` | `color-hex-length` | `#FFFFFF` → `#FFF` |
| `css/base.css:49-52` | `color-function-alias-notation` | `rgba(r,g,b,a)` where a=1 → `rgb(r,g,b)` |
| `css/base.css:75` | `property-no-vendor-prefix` | Removed `-webkit-text-size-adjust` |
| `css/theme.css:12,20,28,45,53,61` | `font-family-name-quotes` | Removed quotes from font names in @font-face |
| `css/theme.css:163,231,337` | `color-function-alias-notation` | `rgba` → `rgb` where alpha=1 |
| `css/theme.css:306` | `media-feature-range-notation` | Converted to modern `(width <= 768px)` notation |
| `css/theme.css:318` | `declaration-block-no-redundant-longhand-properties` | Replaced `top/right/bottom/left` with `inset` shorthand |
| `css/components.css:176,228,351,436,521` | `color-function-alias-notation` | `rgba` → `rgb` where alpha=1 |
| `css/components.css:256,558` | `media-feature-range-notation` | Converted to modern range notation |

### Manual Fixes (Non-blocking Issues)

**1. Font stack definition (base.css:26-29)**
- **Issue**: Font-family values included weight descriptors (`'ExtraBold'`, `'Regular'`, `'Medium'`) which are interpreted as fallback font family names, not weight descriptors
- **Fix**: Simplified to `--font-headline: 'Montserrat', sans-serif;` (and similar for body/ui) — weight is declared via `font-weight: 800` in `theme.css:85`

**2. FAQ accordion semantic HTML (about.html:88-109 + main.js)**
- **Issue**: `<dt role="button" tabindex="0">` used as interactive element, less semantic than native `<button>`
- **Fix**: Wrapped `<dt>` content in `<button type="button">` element; updated `main.js` to target `button` inside `dt` instead of `dt` directly; updated `components.css` to style the button to look like plain text (inherits font, no background/border, full-width, left-aligned text)

### Verification
- **stylelint**: 0 errors
- **eslint**: 0 errors  
- **htmlhint**: 0 errors across all 8 HTML files

---

## 2026-05-20 — Round 2 Improvements (Code Review Round 1 - P0 Fixes)

### New Files Created
- `sitemap.xml` — XML sitemap listing all 8 pages with priorities and changefreq
- `robots.txt` — Allows all crawlers, references sitemap.xml
- `manifest.webmanifest` — PWA manifest with name, theme colors, icons

### Meta Description Fixes (8 files)
Trimmed all meta descriptions from 194 chars to ≤160 chars. Each page now has a unique, page-specific description:
- `index.html`: "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support."
- `about.html`: "Learn about Phlix — an open-source BSD-3 licensed media server you control."
- `features.html`: "Explore all Phlix features: SyncPlay, transcoding, DLNA, multi-user profiles, Live TV DVR, and plugin system."
- `download.html`: "Download Phlix server and native clients for Roku, Samsung Tizen, Windows, iOS, and Android."
- `clients.html`: "Native media player apps for Roku, Samsung Tizen, Windows, iOS, Android, and any DLNA device."
- `plugins.html`: "Extend Phlix with plugins using the versioned LifecycleInterface manifest contract."
- `docs.html`: "Phlix documentation, API reference, developer guides, and ecosystem overview."
- `hub.html`: "Access your Phlix server from anywhere via the reverse-tunnel hub relay."

### JSON-LD Schema (index.html)
Added `SoftwareApplication` schema.org structured data to index.html `<head>`

### PWA Manifest
Created `manifest.webmanifest` and added `<link rel="manifest">` to all 8 HTML files

### Accessibility Fixes

**Button contrast (components.css)**
- `.btn-primary` color changed from `#FFF` to `#1A1A1A` (charcoal) for ≥4.5:1 contrast ratio

**Touch targets (components.css)**
- `.btn-small` min-height increased from 36px to 44px (WCAG 2.5.5)

**Footer copyright (theme.css)**
- `.footer-copy` color changed from `rgb(255, 255, 255, 0.6)` to `#999999` for ≥4.5:1 contrast on charcoal

**Nav toggle (theme.css)**
- `.nav-toggle` added `min-width: 44px; min-height: 44px;` for touch target compliance

### Shared Content Fix
- Updated `shared/content.json` meta.description to match trimmed version

### Verification
- **htmlhint**: 0 errors across all 8 HTML files
- **stylelint**: 0 errors (ran with --fix)

