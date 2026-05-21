# Fix Report — 03-retro-film-reel-1

## Summary
Fixed 1 critical issue: removed invented marketing copy from download.html.

## Critical Issues Status

### 1. Google Fonts CDN Violation
**Status: ALREADY FIXED (prior to this round)**

All 8 HTML pages have self-hosted WOFF2 fonts with `font-display: swap`:
- `css/fonts/bebas-neue.woff2`
- `css/fonts/open-sans.woff2`
- `css/fonts/nunito-bold.woff2`
- `css/fonts/cousine.woff2`

The `@font-face` declarations use local paths (`url('css/fonts/...')`), not `fonts.gstatic.com`. No CDN violation exists.

### 2. og:image .png Reference
**Status: ALREADY FIXED (prior to this round)**

All 8 HTML pages have `og:image` meta tags pointing to `/img/og.svg` (not `.png`). The SVG file exists at `img/og.svg`.

### 3. Invented Marketing Copy
**Status: FIXED IN THIS ROUND**

- **File:** `download.html`
- **Line:** 111
- **Before:** `<p class="page-header__desc">Set up Phlix in minutes. Self-hosted media streaming, your way.</p>`
- **After:** `<p class="page-header__desc">Open-source media, on your terms.</p>`
- **Source:** `shared/content.json` → `footer.tagline`

This text is now sourced from `content.json` (the only authorized copy available for this context).

**Note:** The invented copy issue on `index.html:187` ("Stop renting access to your own media...") was already fixed in a prior round (confirmed in BUILD_LOG.md line 74).

## Verification

| Issue | Verification | Result |
|-------|--------------|--------|
| Google Fonts CDN | `grep -r "fonts.gstatic.com" variants/03-retro-film-reel-1/*.html` | 0 matches |
| og:image .png | `grep "og:image.*og\.png" variants/03-retro-film-reel-1/*.html` | 0 matches |
| Invented copy | `grep -r "Set up Phlix in minutes" variants/03-retro-film-reel-1/*.html` | 0 matches |

## Confirmation

- [x] Google Fonts CDN is eliminated — all fonts are self-hosted with `font-display: swap`
- [x] No invented copy remains — all page copy now uses content from `shared/content.json`
- [x] og:image references correct `.svg` file
