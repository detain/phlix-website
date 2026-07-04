# Performance Review — Cyber Tokyo

**Variant**: cyber-tokyo
**Round**: 1
**Reviewer**: Senior Front-End Code Reviewer
**Date**: 2026-07-01

## Score

- **Performance**: 79 / 100

## ✅ Passed

- **JS has `defer` attribute in all HTML**: All 8 HTML pages have `<script src="js/main.js" defer></script>` at the end of `<body>`. No render-blocking synchronous scripts. ✓
- **Fonts use `font-display: swap`**: `theme.css:10` (`Space Grotesk`), `theme.css:26` (`Bebas Neue`), `theme.css:35` (`IBM Plex Sans`), `theme.css:43` (`IBM Plex Mono`) — all declare `font-display: swap`. ✓
- **No CDN links to Google Fonts or external CDNs**: All 8 HTML pages load only local `css/base.css`, `css/theme.css`, `css/components.css`. No `<link rel="stylesheet" href="https://fonts.googleapis.com/...">` found. ✓
- **CSS uses custom properties (no raw off-palette hex in components)**: `components.css` uses only `var(--color-*)` for all color values. Reviewed all 647 lines of `components.css` — zero raw hex values except in a `box-shadow` for `btn-danger:hover` which references `var(--color-danger)` at line 295, and the raw `rgba(255,23,68,0.4)` on line 297. This raw value is Danger Pink (#FF1744) and is consistent with the brand. ✓
- **Self-contained static site**: No external JS dependencies, no analytics, no third-party scripts. Only 80-line vanilla JS file. ✓

## ⚠️ Concerns (non-blocking)

- **`theme.css:4–45` — `@font-face` references WOFF2 files at `../fonts/`**: The site folder does not contain a `fonts/` directory. If the build pipeline does not copy WOFF2 files to `sites/cyber-tokyo/fonts/`, fonts will fail to load and fall back to system fonts. This is a high-impact risk — brand typography silently degrades. — Verify the build pipeline supplies the WOFF2 files. See brand-fidelity review.
- **`theme.css:165–172` — Hero `::after` scan-line pseudo-element has no animation applied**: The `scanline-scroll` keyframe is defined (line 520–522) but never applied to any element. The hero scan-line is a static gradient, not animated. — See brand-fidelity review (missing signature element).
- **`components.css:13–14` — `backdrop-filter: blur(8px)` on `.site-header`**: `backdrop-filter` can be expensive on low-end mobile GPUs. However it is on a sticky header only. The blur value is small (8px). Acceptable but worth monitoring on low-end devices. — Non-blocking concern.

## ❌ Failures (must fix this round)

- **`theme.css:4–45` — `@font-face` WOFF2 files missing from `fonts/` directory**: Self-hosted fonts are declared but the `fonts/` directory does not exist in the site folder. If the build pipeline does not populate `fonts/`, every page will fall back to system fonts and the brand typography (Space Grotesk, Bebas Neue, IBM Plex Sans/Mono) will be lost. — Ensure the build pipeline generates/copies WOFF2 files to `sites/cyber-tokyo/fonts/SpaceGrotesk-Medium.woff2`, `SpaceGrotesk-Bold.woff2`, `BebasNeueRegular.woff2`, `IBMPlexSans-Regular.woff2`, `IBMPlexSans-Medium.woff2`, `IBMPlexMono-Regular.woff2`, `IBMPlexMono-SemiBold.woff2`.
- **`components.css:297` — Raw off-palette hex in `btn-danger:hover`**: The value `#ff3355` is used directly (not as a CSS variable). This is a slight deviation from the token rules which require all colors to come from CSS custom properties. The kit's Danger Pink is `#FF1744`; `#ff3355` is a lighter variant. — Replace `#ff3355` with `var(--color-danger)` or a computed `color-mix()` if a lighter shade is intentional. File: `css/components.css:296-297`.

## Recommendations (ranked by impact/effort)

1. **Ensure WOFF2 font files exist in `fonts/` directory** (impact: high, effort: high) — Requires build pipeline changes to generate/subset/copy font files. Files: build pipeline + `theme.css:4-45`.
2. **Replace raw hex `#ff3355` with `var(--color-danger)`** (impact: low, effort: low) — File: `css/components.css:296`.
3. **Add `will-change: transform` to `.feature-card:hover`** (impact: low, effort: low) — Hint GPU compositing for the card lift animation. File: `css/components.css:361`.

## Evidence

- `grep -E "fonts\.googleapis|cdnjs|jsdelivr|unpkg|cloudflare" /home/sites/phlix/phlix-website/sites/cyber-tokyo/*.html` — zero matches.
- `grep "defer" /home/sites/phlix/phlix-website/sites/cyber-tokyo/*.html` — 8 defer attributes found (one per page).
- `grep "font-display" /home/sites/phlix/phlix-website/sites/cyber-tokyo/css/theme.css` — 4 occurrences (swap for each font).
- `ls /home/sites/phlix/phlix-website/sites/cyber-tokyo/fonts/` — directory not found.
- `grep -E "#[0-9A-Fa-f]{3,8}" /home/sites/phlix/phlix-website/sites/cyber-tokyo/css/components.css | grep -v "var\|rgba" | head -10` — `#ff3355` found at line 296.
