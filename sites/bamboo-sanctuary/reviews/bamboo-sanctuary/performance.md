# Performance

## Score: 55/100

## Findings
- ✅ No `<link href="fonts.googleapis.com">` CDN link in any HTML — all 8 pages verified — complies with new_site.md §8 prohibition
- ❌ **No `@font-face` declarations anywhere for any font family** — no `css/fonts/` directory exists, no WOFF2 files present. Cormorant Garamond (headline/display font), Lora (body), and DM Sans (UI) are all declared as CSS variable values but no font files are loaded. Browsers render these families only if present in the OS font stack; otherwise falls back to Georgia/serif or system-ui/sans-serif. The brand's typographic identity fundamentally depends on Cormorant Garamond and Lora — without them the site looks substantially different from the kit spec.
- ✅ JS is `defer` loaded on all 8 pages: `<script src="js/main.js" defer></script>` — index.html:300, features.html:230, etc.
- ✅ All CSS is in `<head>` without `media="print"` or other render-blocking patterns
- ✅ Hero backdrop is inline SVG — index.html:89-131 — no external image request
- ✅ All 7 feature icons are inline SVG — index.html:171-244, features.html:70-179
- ✅ CSS custom properties used throughout — no large raster images referenced anywhere
- ⚠️ `components.css:197` uses `border: 1px solid transparent` as base for `.btn` — transparent border is acceptable CSS, not a raster image
- ✅ No third-party analytics, tracking, or script CDNs
- ✅ Hero background uses `linear-gradient()` (CSS, not image) — theme.css:149, 287
- ✅ `.hero-bamboo svg` is inline, small, and has `opacity: 0.12` reducing visual impact — components.css:646
- ⚠️ `components.css:316` `.feature-icon { background: rgb(143, 175, 159, 0.12) }` — hardcoded rgba instead of a CSS variable. This is the primary color at 12% opacity — should use a CSS variable for consistency. Not a performance issue but noted.

## Summary
No CDN links, no render-blocking JS, no large hero images, all assets inline or CSS-native. This would score very high except for the critical missing font loading. Cormorant Garamond, Lora, and DM Sans are referenced in CSS variables but no `@font-face` declarations exist, no WOFF2 files are in the css/fonts/ directory, and no CDN fallback is used. The new_site.md spec says "Self-host fonts as WOFF2 and declare them with @font-face + font-display: swap." This is not optional. Without font files, the brand's typographic identity collapses to system serif/sans-serif fallbacks. This is a MUST-FIX before site can be approved. Score 55/100.
