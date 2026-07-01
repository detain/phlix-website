# Performance — marble-atrium

**Score: 50/100** — CSS architecture is excellent with no raw values; JS is defer-loaded correctly; but the brand kit's core performance requirement (self-hosted WOFF2 fonts) is entirely unimplemented.

## Findings

- `index.html:52-54` ✅ CSS loaded in correct order: base → theme → components, all non-render-blocking (no `<link rel="preload">` blocking).
- `index.html:230` ✅ `<script src="js/main.js" defer>` — JS is deferred, not render-blocking ✅.
- `js/main.js:1-86` ✅ Vanilla, dependency-free JS — no third-party scripts, no analytics, no CDN deps ✅.
- `css/base.css:10-76` ✅ All color/spacing/radius/shadow/font tokens defined as CSS custom properties — no raw off-palette hex values in component CSS. The entire CSS architecture is token-driven ✅.
- `css/base.css:28-30` ✅ Shadow tokens use `rgb(140, 140, 132, N)` — only non-variable values in the token block, but these are intentional cool-neutral stone-shadow tones per kit spec. They are in the token block (not scattered in components) — acceptable.
- `css/base.css:51-57` ✅ Font family tokens mapped but **no actual WOFF2 files present** (see critical finding below).
- `css/base.css:48-51` ❌ **Comments claim "Font face declarations handled in CSS; include minimal preconnect here" and "include minimal preconnect here" — but there are zero `@font-face` declarations and zero font files.** The CSS tokens define `font-family: 'Cormorant Garamond', 'Garamond', Georgia, serif` but the browser resolves to Georgia (or system serif) because no custom font files exist. This is the single biggest performance and brand fidelity defect.
- `BUILD_LOG.md:89` ⚠️ **Known follow-up: "Self-host WOFF2 fonts for Cormorant Garamond, Cormorant, Jost, DM Mono (currently using system serif/sans-stack; web font integration pending host CDN decision)"** — the build itself acknowledges this is unfixed.
- No large images — all imagery is inline SVG (logo.svg, favicon.svg, og.svg, feature SVG icons inline in HTML) ✅.
- `css/theme.css:130-141` ✅ Hero grid pattern is pure CSS `background-image` — zero image weight.
- `index.html:49-51` ❌ Empty `<style>` block with only a comment: "/* Font face declarations handled in CSS; include minimal preconnect here */" — this is dead code placeholder that should either contain actual preconnect hints or be removed entirely. It's not render-blocking but it's noise.
- `sitemap.xml` and `robots.txt` are static text files — negligible size ✅.
- No `backdrop-filter: blur()` — avoids the kit's performance anti-pattern noted in do_dont.performance ✅.
- Fonts subset: Not applicable — no actual font files to subset.
- `css/theme.css:426-436` ✅ Fade-in uses `IntersectionObserver` with `threshold: 0.1` — efficient, doesn't block main thread.
- No external CDN links anywhere in deployed HTML ✅ — new_site.md §1 explicitly forbids CDN font links.

## Verdict

**Fail** — the CSS architecture is arguably the best in class: token-driven, no raw values, no render-blocking JS, no large images, no external dependencies. But the brand kit's single most explicit performance requirement (self-hosted WOFF2 fonts, not CDN links) is entirely unimplemented. The site falls back to Georgia/Times New Roman system fonts — not the brand's Cormorant Garamond/Jost typefaces. The BUILD_LOG correctly identifies this. Without actual font files, the "self-hosted WOFF2" spec is not met.
