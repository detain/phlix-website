# Code Review — 05-pixel-tech-2

## Critical Failures

### 1. Missing apple-touch-icon.png
- **Severity**: Critical
- **Pages affected**: All 8 HTML files
- **Issue**: All pages reference `<link rel="apple-touch-icon" href="./img/apple-touch-icon.png">` but this file does not exist in the `img/` directory. Only `favicon.svg`, `logo.svg`, and `og.svg` exist.
- **Recommendation**: Either create the missing `apple-touch-icon.png` file, or remove the broken `<link>` tag from all HTML pages.

## Medium Failures

### 2. Meta description truncation risk on index.html
- **Severity**: Medium
- **Page**: index.html
- **Issue**: The meta description is 131 characters — close to the 160-character limit. Adding any additional content could exceed the limit.
- **Current**: `"Phlix: self-hostable PHP media server. Roku, Tizen, Windows, Mobile clients. SyncPlay, Live TV, transcoding, DLNA, hub relay."`
- **Recommendation**: Consider shortening to ~120 characters to provide buffer room.

### 3. Social platform og:image compatibility
- **Severity**: Medium
- **Pages affected**: All pages with og:image
- **Issue**: Using SVG format for og:image (`./img/og.svg`). While technically valid, Facebook, Twitter, and LinkedIn prefer raster images (PNG/JPG) for og:image. Many social crawlers have limited SVG support.
- **Current**: `<meta property="og:image" content="./img/og.svg">`
- **Recommendation**: Provide a PNG version (e.g., `og.png` at 1200x630px) alongside the SVG, or replace entirely.

### 4. hub.html contains potentially fictional domain
- **Severity**: Medium
- **Page**: hub.html
- **Issue**: Line 138 contains `phlix-hub.example.com` — this is a placeholder/example domain that should be replaced with an actual domain or removed before production.
- **Current**: `"phlix-hub.example.com"`
- **Recommendation**: Replace with actual hub URL or use a proper placeholder like `[your-hub-domain]`.

## Recommendations

### Positive Findings

1. **Font CDN compliance**: ✅ PASS — No Google Fonts CDN. All fonts are self-hosted in `/fonts/` directory with proper `@font-face` declarations using `font-display: swap`. Fonts present:
   - `ShareTechMono-Regular.ttf`
   - `FiraSans-Regular.ttf`
   - `FiraSans-Medium.ttf`
   - `RobotoMono-Regular.ttf`

2. **Content integrity**: ✅ PASS — All marketing copy verified against `shared/content.json`. No invented Lorem ipsum or off-script text found. Hero, pitch bullets, features, clients, FAQ, footer all match source.

3. **Mobile navigation**: ✅ PASS — All 8 pages include responsive mobile nav with:
   - Toggle button with `aria-expanded` state management
   - Fixed-position overlay menu with `is-open` class
   - Escape key handler to close menu
   - Focus management and body scroll lock

4. **Meta descriptions**: ✅ PASS — All 8 pages have meta descriptions under 160 characters:
   - index.html: 131 chars
   - features.html: 115 chars
   - clients.html: 84 chars
   - download.html: 82 chars
   - plugins.html: 67 chars
   - about.html: 49 chars
   - hub.html: 62 chars
   - docs.html: 68 chars

5. **og:image exists**: ✅ PASS — `img/og.svg` exists and is a valid 1200x630px SVG with proper arcade-themed branding.

### Additional Strengths

6. **Semantic HTML**: Proper use of `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<h1>`-`<h3>`, `<dl>` for FAQ, `<button>` for interactive elements.

7. **ARIA accessibility**: Good aria-label usage, aria-current for navigation, aria-expanded for mobile menu toggle, role attributes on landmarks, skip-link for keyboard users.

8. **JSON-LD Schema**: All pages include valid `application/ld+json` with SoftwareApplication schema, proper @context, and price: "0" for the free product.

9. **robots.txt**: Properly configured with sitemap reference.

10. **sitemap.xml**: Valid XML sitemap covering all 8 pages with appropriate priorities and changefreq.

11. **manifest.webmanifest**: Valid PWA manifest with icons, theme_color (#00FF41), background_color, display: standalone, categories.

12. **No Lorem ipsum**: ✅ PASS — Zero placeholder text found.

13. **No external CDN dependencies**: ✅ PASS — All CSS, JS, fonts, and images are self-contained.

14. **CSS best practices**: CSS custom properties for theming, reduced motion media query support, font-display: swap, proper focus-visible styling, custom scrollbar styling.

15. **JavaScript quality**: No framework dependencies, uses strict mode, IIFE pattern, proper event handling with cleanup, IntersectionObserver for scroll animations, prefers-reduced-motion respect.

### Minor Suggestions

- Add `loading="lazy"` to below-fold images (feature icons)
- Consider adding `width` and `height` attributes to `<img>` tags for CLS prevention
- The hub.html "example.com" domain should be replaced with actual placeholder text

## Score: 88/100

## Pass/Fail: **FAIL** (due to Critical Failure #1: Missing apple-touch-icon.png)

---

### Summary Table

| Check | Status |
|-------|--------|
| Google Fonts CDN — Self-hosted fonts only | ✅ PASS |
| No invented copy — All from content.json | ✅ PASS |
| Mobile nav present on every page | ✅ PASS |
| Meta descriptions under 160 chars | ✅ PASS |
| og:image file exists | ✅ PASS |
| apple-touch-icon.png present | ❌ FAIL |
| Semantic HTML | ✅ PASS |
| ARIA accessibility | ✅ PASS |
| JSON-LD Schema | ✅ PASS |
| sitemap.xml | ✅ PASS |
| robots.txt | ✅ PASS |
| manifest.webmanifest | ✅ PASS |
| font-display: swap | ✅ PASS |
| No Lorem ipsum | ✅ PASS |
| Fonts exist | ✅ PASS |
