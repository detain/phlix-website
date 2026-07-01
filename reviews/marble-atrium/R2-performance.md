# R2 — Performance

## Round 1 Fixes: VERIFIED

None of the Round 1 fixes were performance-related (though og:image → og.png has performance implications).

---

## NEW ISSUES

### ⚠️ MODERATE: No font loading strategy — FOUT/FOIT possible

- **Severity:** Moderate
- **Files:** base.css:51–57 (font declarations), HTML head (no @font-face)
- **Evidence:** There are no `@font-face` declarations for Cormorant Garamond, Jost, or DM Mono. The CSS references these font families but they are never loaded. The logo.svg and og.svg use Georgia as a fallback (not self-hosted WOFF2 as spec §8 and brand kit §13 require).
- **Spec §8 requirement:** "Self-host fonts as WOFF2 and declare them with `@font-face` + `font-display: swap`."
- **Spec §13 performance:** "Keep marble-vein SVG patterns small and cached. Subset Cormorant Garamond and Jost to the characters actually in use."
- **Impact:** No custom fonts are loaded at all. The site renders entirely in system font fallbacks (Georgia, Helvetica/Arial). This means:
  1. Typography doesn't match brand kit (Cormorant Garamond → Georgia)
  2. Performance is actually slightly better (no font file requests), but brand fidelity suffers
- **Status:** This was explicitly listed as a "Known Limitation" in the user's Round 1 notes ("Self-hosted WOFF2 fonts: using system Georgia/Times New Roman as fallback"). Per user instruction, this is not blocking. Flagging for completeness.

### ⚠️ MINOR: No `font-display: swap` needed since no custom fonts loaded

- **Status:** N/A — no fonts to configure swap for. Not a violation.

### ⚠️ MINOR: No `preconnect` hints for font origins

- **Severity:** Low
- **Evidence:** If/when custom fonts are self-hosted, no `<link rel="preconnect">` hints are present. Not relevant since no external font requests exist currently.

### ⚠️ MODERATE: og.svg exists but og.png is missing — causes 404 on social crawler

- **Severity:** Moderate (affects external performance/perception, not page load)
- **File:** All 8 HTML pages, meta tags
- **Impact:** Social media crawlers that request og:image will receive a 404. This is a failed resource, not a slow resource, but it means social sharing previews are completely broken.
- **Note:** This is covered in detail in social-metadata review.

---

## PERFORMANCE POSITIVE ELEMENTS

| Element | Evidence |
|---------|----------|
| No render-blocking JS | All `<script>` have `defer` ✅ |
| CSS is modular (3 sheets) | base.css, theme.css, components.css ✅ |
| No analytics/tracking scripts | ✅ None found |
| No third-party CDNs | ✅ No external script links ✅ |
| CSS uses custom properties (fast lookup) | All values are CSS vars ✅ |
| SVG icons are inline (no icon font CDN) | All icons inline in HTML ✅ |
| No `backdrop-filter` usage | ✅ None found |
| No large background images | Hero uses CSS gradient + SVG pattern ✅ |
| Lazy loading not needed | No below-fold images ✅ |
| prefers-reduced-motion | Removes all animations, reduces paint ✅ |
| Favicon is SVG (tiny) | favicon.svg ✅ |
| Logo is SVG | logo.svg ✅ |
| Hero SVG grid is CSS-generated | No image request ✅ |
| IntersectionObserver for fade-in | js/main.js:54–67 — only observe when in viewport ✅ |

---

## CSS SIZE ESTIMATE

- base.css: ~229 lines
- theme.css: ~445 lines
- components.css: ~795 lines
- **Total: ~1,469 lines** — small, likely <30KB unminified
- Minified would be ~8–12KB — excellent

---

## JS SIZE ESTIMATE

- js/main.js: 86 lines — tiny, vanilla, no dependencies
- Likely <2KB minified

---

## ASSET BUDGET CHECK

Per spec §13:
- Hero image ≤ ~120 KB → No hero image (CSS/SVG only) → ✅ 0KB
- Total transferred per page ≤ ~500 KB → Only HTML + CSS + JS → Likely <50KB ✅
- Fonts: no font files loaded → 0KB ✅

---

## SCORE: 75/100

| Factor | Score | Notes |
|--------|-------|-------|
| Render-blocking JS | 100 | All deferred ✅ |
| Font loading | **0** | No @font-face declarations; no custom fonts loaded |
| External requests | 100 | No CDN links, no tracking ✅ |
| CSS size | 95 | ~1,469 lines — small ✅ |
| JS size | 100 | ~86 lines, dependency-free ✅ |
| Image budget | 100 | No raster images loaded ✅ |
| SVG favicon | 100 | Tiny SVG ✅ |
| Hero background | 100 | CSS-only, no image request ✅ |
| prefers-reduced-motion performance | 100 | No animation cost when reduced motion preferred ✅ |
| **Overall** | **75** | Font loading is a known limitation; not blocking per user |

**Pass threshold: 75** — ⚠️ Exactly at threshold.

**Note:** Font loading was listed as a known limitation. If treating that as "permitted," score would be ~95. With it counted as a gap, score is 75 (exactly at threshold).
