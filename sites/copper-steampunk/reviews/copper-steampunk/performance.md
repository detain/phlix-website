Score: 88/100 | Severity: ⚠️ | Summary: Strong performance profile — CSS-driven artwork, deferred JS, no render-blocking resources, all inline SVG. Minor issues with missing self-hosted fonts and broken scroll-reveal animation.

## Findings

- **Score: 88/100**
- **Severity: ⚠️ (warning)**

---

### ✅ Pass: No render-blocking JS

- **File:** `index.html:323`
- **Description:** `<script src="js/main.js" defer></script>` — `defer` attribute ensures script parses and executes after HTML is parsed, not blocking paint.
- **Recommendation:** None needed.

---

### ✅ Pass: No synchronous stylesheets blocking paint

- **File:** `index.html:51-54`
- **Description:** All three stylesheets are linked with standard `<link rel="stylesheet">` without `media="print"` tricks or blocking scripts. Browser loads them in parallel.
- **Recommendation:** None needed.

---

### ✅ Pass: No heavy raster images; hero uses CSS gradient

- **File:** `css/theme.css:142-149`
- **Description:** Hero backdrop is a pure CSS `linear-gradient` and `radial-gradient` composition — no image file. All artwork is inline SVG (hero gears, feature icons, nav toggle icon, logo).
- **Recommendation:** None needed.

---

### ✅ Pass: CSS custom properties used throughout; no per-element inline styles

- **File:** All CSS files
- **Description:** All colors, spacing, typography, shadows, and radii are defined as CSS custom properties in `:root` and referenced via `var(--…)`. Inline styles found only on a few structural `<div>` wrappers in `download.html:70,78,81,95,96` (h2/p styling) — cosmetic, not layout-breaking.
- **Recommendation:** Move the inline `style` attributes on `download.html:70,96` (h2 headings) to proper CSS classes in `theme.css`.

---

### ✅ Pass: Total transferred per page well within ~200KB budget

- **File:** All files
- **Description:** Combined size of base.css (285 lines) + theme.css (545 lines) + components.css (766 lines) + main.js (89 lines) + SVG assets (logo ~2KB, favicon ~1KB, og.svg ~3KB, hero SVG inline) totals under 50KB uncompressed. With gzip this is ~12–15KB. Excludes the absent `css/fonts/` directory which would add ~200–400KB if real font files were present.
- **Recommendation:** None needed for current state. When fonts are added, budget accordingly.

---

### ⚠️ Warning: Self-hosted fonts referenced but absent (no `css/fonts/` directory)

- **File:** `css/base.css:6-8`
- **Description:** CSS comments indicate fonts should be self-hosted in `./fonts/` with `@font-face` declarations pointing to WOFF2 files. No `css/fonts/` directory exists in the build. Browser falls back to system font stacks (Georgia/Times New Roman for serif, Courier New for mono) — acceptable for v1, but the brand's distinctive typography (Playfair Display, Cinzel Decorative, Josefin Slab) is absent.
- **Recommendation:** Either self-host WOFF2 subsets of Playfair Display, Cinzel Decorative, Josefin Slab, Crimson Text, Share Tech Mono, and Oswald in `css/fonts/`, or add Google Fonts `<link>` with `preconnect` and `font-display: swap`. The spec (new_site.md §1) explicitly forbids CDN dependencies — so self-host is the correct path.

---

### ❌ Defect: Scroll-reveal JS animation is fragile — no static fallback

- **File:** `js/main.js:45-77` and `css/components.css:760-765`
- **Description:** Elements selected for scroll reveal are set to `opacity: 0` and `translateY(12px)` at init time (main.js:65-68). The `.revealed` class that reverses this is dynamically injected as an inline `<style>` block via JavaScript. If JS has any error, delay, or race condition, elements remain invisible. The `prefers-reduced-motion` override at `components.css:760-765` only suppresses animation — it does not make elements visible on its own. Also, the `prefers-reduced-motion` check at `main.js:36` runs before the reveal init, which is correct, but with `reduce` motion the elements start at opacity:0 and never get revealed because the observer is never set up.
- **Recommendation:** Add a CSS rule for `.revealed` as a static class (not JS-injected) with `opacity: 1; transform: none;` so elements are visible by default, and only hide them via a `.will-reveal` class added by JS. See responsive.md for same issue.

---

### ✅ Pass: Fonts declared with `font-display: swap` semantics

- **File:** `css/base.css:116-122`
- **Description:** Font stacks use web-safe fallback lists (`Georgia, 'Times New Roman', serif` etc.) which act as instant swaps. No `@font-face` with `font-display: block` found.
- **Recommendation:** None needed (though true `@font-face` with `font-display: swap` would be better when fonts are self-hosted).

---

### ✅ Pass: CSS animations defined but unused

- **File:** `css/components.css:728-758`
- **Description:** `@keyframes gear-spin`, `steam-rise`, and `pulse-glow` are defined but no element in the HTML applies `.gear-spin`, `.steam-rise`, or `.pulse-glow` classes. These are dead styles — unused code, not a defect.
- **Recommendation:** Remove unused `@keyframes` to reduce CSS payload, or wire them to appropriate elements if intended for future use.
