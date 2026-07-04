# Performance

**Score: 45/100**  
**Severity: ❌**

## Findings

### ❌ CRITICAL: Google Fonts loaded from CDN (base.css:117–121)
`base.css:117–121` declares font families as:
```css
--font-headline: "Playfair Display", georgia, serif;
--font-display: "Cinzel Decorative", "Poiret One", georgia, serif;
--font-body: "Lora", palatino, georgia, serif;
--font-ui: "Hind", "Noto Sans", system-ui, sans-serif;
--font-mono: "JetBrains Mono", "Courier New", monospace;
```

These are Google Fonts identifiers. The browser will automatically resolve these to `fonts.googleapis.com/css?family=...` requests. The spec (§1, §13) explicitly forbids CDN dependencies: "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`). Self-host fonts as WOFF2 and declare them with `@font-face` + `font-display: swap`."

No `css/fonts/` directory exists; no `@font-face` blocks are present. The browser makes external requests to Google Fonts for all 5 font families.

**Fix:** Download WOFF2 files for Playfair Display (700, 900 weights), Cinzel Decorative (400, 700), Lora (400, 500), Hind (400, 500, 600), JetBrains Mono (400, 600). Subset to Latin only. Place in `css/fonts/`. Add `@font-face` blocks with `font-display: swap`. Remove Google Fonts CDN references.

### ❌ CRITICAL: No self-hosted fonts means fonts will cause render delay or FOUT
Without self-hosted fonts and without any font loading strategy declaration, the fallback system fonts will be used until Google Fonts loads. This causes Flash of Unstyled Text (FOUT) and delays Largest Contentful Paint.

**Fix:** As above — self-host fonts with `font-display: swap` in `@font-face`.

### ❌ CRITICAL: Google Fonts preconnect link missing (and shouldn't be needed)
The spec forbids Google Fonts entirely. A preconnect would be ` <link rel="preconnect" href="https://fonts.googleapis.com">` — but this should not be added; fonts should be self-hosted per spec.

### ⚠️ WARNING: Hero gradient layers may cause extra paint (theme.css:191–207)
The hero section has two pseudo-elements with gradients layered: `.hero::before` (Holi Burst, opacity 0.15) and `.hero::after` (Marigold Chandelier radial). These create stacked backgrounds. With `background-attachment: fixed` on body (base.css:193), this combination can cause scrolling performance issues on mobile.

### ⚠️ WARNING: Body `background-attachment: fixed` on mobile performance (base.css:193)
`background-attachment: fixed` on body is widely known to cause scroll jank on mobile browsers. The fixed marigold chandelier radial gradient is decorative but may impact scrolling performance on low-end devices.

**Fix:** Consider changing `background-attachment: fixed` to `scroll` — the gradient effect will still render but without scroll jank.

## What Passed

- ✅ No render-blocking JavaScript: `<script src="js/main.js" defer></script>` on all pages
- ✅ No analytics, no third-party scripts, no external JS dependencies
- ✅ CSS is split into 3 files (base, theme, components) — could benefit from critical CSS inline but not a failure
- ✅ No heavy hero image (~0 bytes raster image in hero — all decorative effects are CSS/SVG)
- ✅ SVG favicon and logo are tiny (favicon.svg 22 lines, logo.svg 57 lines)
- ✅ Marquee animation uses CSS only, no JS animation frame loops
- ✅ Scroll reveal uses IntersectionObserver (not scroll event listeners) — efficient
- ✅ No images above the fold except logo.svg (small) and decorative CSS gradients
- ✅ CSS custom properties enable efficient token-based styling with no runtime overhead
