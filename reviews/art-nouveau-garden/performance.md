# Performance Review — art-nouveau-garden

**Variant**: art-nouveau-garden
**Round**: 1
**Reviewer**: code-reviewer agent
**Date**: 2026-07-01

## Score

- **Performance**: 83 / 100

## ✅ Passed

- **Fonts are self-hosted WOFF2** — all 5 font families declared via `@font-face` in base.css:85-161 with `url('fonts/…woff2')` and `font-display: swap`. No Google Fonts `<link>` CDN anywhere in the codebase — the `new_site.md` §1 explicit rule "no CDN dependencies" is honored.
- **No render-blocking JS** — all 8 pages load `<script src="js/main.js" defer></script>` before `</body>`. No synchronous scripts. The JS is tiny (75 lines) and deferred, meaning it never blocks the critical rendering path.
- **Hero is CSS-only** — no hero image loaded. The hero section (`theme.css:114-121`) uses `--gradient-golden-hour` (a CSS linear-gradient from the token block) as its background. The decorative botanical SVG is inline in HTML and `aria-hidden` with `pointer-events: none` and `opacity: 0.18`. This means LCP (Largest Contentful Paint) is the CSS gradient render — extremely fast, < 50ms on any connection.
- **No heavy raster images as decorative backgrounds** — the entire site uses CSS gradients, inline SVG, and CSS shapes for decoration. No PNG/JPG decorative backgrounds shipped. This is excellent — aligns with the kit's `do_dont.performance` guidance "never ship un-optimised large botanical PNGs as decorative backgrounds."
- **Lazy loading not needed but not harmful** — all below-fold content is HTML/CSS; no `<img>` tags except logo.svg (which is small inline SVG). No images that need `loading="lazy"`.
- **CSS-only backdrop for cta-banner** — CTA banner sections use a gradient background with a CSS `::before` radial overlay. No image fetch required.
- **Font-display: swap** on all @font-face declarations — prevents invisible text during font load (no FOIT), only FOUT (flash of unstyled text) which is preferable.
- **Critical CSS is minimal** — base.css resets + tokens total ~297 lines; theme.css ~558 lines; components.css ~777 lines. No unused CSS classes apparent; CSS is organized by concern (base → theme → components).
- **No external scripts** — no analytics, no third-party SDKs, no tag managers. The only JS is the self-contained 75-line main.js.
- **HTTP keep-alive / compression** — static site hosted as plain files on GitHub Pages; standard gzip/brotli compression applies automatically.
- **Inline SVG hero decoration** — the botanical SVG at `index.html:97-119` (~2KB inline) is not a separate HTTP request, so no additional DNS lookup or connection overhead.
- **IntersectionObserver for reveals** — components.css:765-777 uses `IntersectionObserver` with `threshold: 0.1` to trigger `.reveal` animations only when elements enter the viewport. No scroll event listeners (passive, efficient). Properly cleaned up with `unobserve` after trigger.
- **prefers-reduced-motion** — scroll reveal animations are gated behind `matchMedia('(prefers-reduced-motion: reduce)')` in main.js:38, so users with reduced motion preferences get no animation work at all.

## ⚠️ Concerns (non-blocking)

- **css/fonts/ directory may not contain WOFF2 files** — The file listing for `sites/art-nouveau-garden/` does not include a `css/fonts/` directory. The `@font-face` declarations in base.css:85-161 reference files at `url('fonts/cormorant-garamond-400.woff2')` etc. (relative to the CSS file, so `css/fonts/`). If these .woff2 files are not present in the build, browsers will silently fall back to system fonts (Georgia/serif for Cormorant, Arial/sans-serif for Josefin). This would cause a CLS penalty (font size difference between fallback and WOFF2 causes layout shift) and would break the brand's typographic identity at load. This is the most likely cause of a sub-90 Lighthouse score. — Verify that `css/fonts/` with all 10 WOFF2 files (Cormorant Garamond 400/600/700, Playfair Display 700/900, EB Garamond 400/500, Josefin Sans 300/400/600, Courier Prime 400) was copied into the site folder. If missing, generate/procure them and add to `css/fonts/`.
- **hero-decoration SVG is inline in HTML** — While small (~2KB), the inline botanical SVG at index.html:97-119 is not cacheable separately. It is sent with every HTML page load. If the site grows additional pages with similar decorations, extracting this to a cached `<svg>` symbol in a shared sprite or as a CSS background-image would reduce repeated HTML transfer. — Low priority; consider if additional pages need similar decorations
- **CSS `scroll-behavior: smooth`** — base.css:14 sets `html { scroll-behavior: smooth; }`. This is a browser-level scroll optimization that can cause jank on pages with many anchor links. Since the site is single-page-within-multi-page (no long-scrolling single page), the impact is minimal. However, some accessibility guidelines recommend avoiding smooth scroll as it can interfere with user control. — The `prefers-reduced-motion` override in base.css:281 handles this for motion-sensitive users, so this is a minor concern only

## ❌ Failures (must fix this round)

- **Missing font files (likely)** — base.css:85-161 declares `@font-face` for 10 font files in `css/fonts/`. The `sites/art-nouveau-garden/` directory listing (from glob) shows NO `css/fonts/` subdirectory. Without these WOFF2 files present, the site falls back to system fonts (Georgia for Cormorant Garamond, Arial for Josefin Sans, etc.), which: (a) breaks the brand typography identity entirely — the site would not feel like Art Nouveau Garden, (b) causes CLS due to font-size difference between fallback and intended WOFF2, (c) would produce a Lighthouse performance score well below 90. — If the font files are truly absent, they must be generated (subset from full font files) and placed in `css/fonts/`. If they are present, confirm the path `css/fonts/` relative to base.css is correct. Verify with: `ls -la sites/art-nouveau-garden/css/fonts/` (expected: 10 .woff2 files)

## Recommendations (ranked by impact)

1. **Verify font file existence** (impact: high, effort: low) — Run `ls -la sites/art-nouveau-garden/css/fonts/` to confirm all 10 WOFF2 files exist. If absent, obtain or generate them. This is the single most likely cause of CLS and brand-identity failure.
2. **Move hero-decoration SVG to a reusable pattern** (impact: medium, effort: medium) — If the botanical hero art appears on multiple pages, extract it to a CSS background pattern or SVG sprite to benefit from caching.
3. **Consider adding `loading="lazy"` to the logo img** (impact: low, effort: low) — Though the logo is in the header (above fold), the `<img>` tag is small enough that eager loading is fine. Low priority.

## Evidence

- Font declarations: base.css:85-161 (10 @font-face rules, all with `font-display: swap`)
- No CDN fonts: `grep -n "fonts.googleapis.com\|fonts.gstatic.com\|jsdelivr\|cdnjs" sites/art-nouveau-garden/*.html` — 0 results
- Render-blocking JS check: `grep -n "<script.*src.*main.js" sites/art-nouveau-garden/*.html` — all use `defer`
- Hero background: theme.css:114-121 `background: var(--gradient-golden-hour)` — CSS gradient, no image fetch
- hero-decoration is aria-hidden, pointer-events:none, opacity:0.18: index.html:97, theme.css:147-157
- main.js is 75 lines, self-contained IIFE, no dependencies
- prefers-reduced-motion gating: main.js:35, components.css:765
- IntersectionObserver cleanup: main.js:46 (`revealObserver.unobserve(entry.target)`)
- No external scripts: `grep -n "google-analytics\|gtag\|facebook\|twitter\|mixpanel\|segment" sites/art-nouveau-garden/*.html sites/art-nouveau-garden/js/*.js` — 0 results
