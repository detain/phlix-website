# Responsive & Performance Review — Phlix Afrofuturism Site

**Site root:** `/home/sites/phlix/phlix-website/sites/afrofuturism/`
**Review scope:** All 8 pages + CSS + JS + assets
**Spec baseline:** `new_site.md` §13 (perf budgets), §14 (responsive)
**Date:** 2026-06-30
**Reviewer:** Adversarial CodeReviewer (automated audit)

---

## Overall Score: 85 / 100

**VERDICT: FAIL** (threshold: 90)

The site ships clean HTML structure, correct render-blocking posture, and
efficient vanilla JS with IntersectionObserver. However it violates the §13
performance budget in two concrete ways — wrong `og:image` format (SVG when
spec demands PNG) and no `font-display: swap` (no @font-face loaded at all,
meaning the intended brand fonts — Montserrat, Bebas Neue, Nunito — are never
loaded, only their system-stack fallbacks). These are not cosmetic issues; the
Lighthouse perf target of ≥90 mobile/desktop cannot be hit when social share
images are the wrong format and brand typography is missing.

---

## Per-Area Scores

| Dimension | Score | Notes |
|---|---|---|
| Render performance | 95/100 | CSS in `<head>`, all JS deferred — correct |
| Responsive breakpoints | 90/100 | Mobile-first, `clamp()` fluid type, `auto-fill` grids, 768px query present; 1024px query absent (acceptable — fluid grids adapt without fixed breakpoints) |
| Asset loading | 55/100 | No `@font-face` + no `font-display: swap` (no self-hosted fonts at all); `og:image` is SVG instead of required PNG |
| CSS efficiency | 92/100 | Universal reset selector is justified; no layout thrashing; BEM naming; no framework imports |
| JS efficiency | 95/100 | `defer` on all scripts; IntersectionObserver for scroll reveals; proper `unobserve`; escape/outside-click handlers |
| Image optimization | 75/100 | All icons/logos SVG (good); explicit `width`/`height` on all `<img>` (good CLS); but `og:image` is SVG not PNG and no `loading="lazy"` on any img |
| Layout stability | 90/100 | `100svh` for hero (viewport-locked); `overflow: hidden` on hero; explicit img dimensions prevent CLS; no layout thrashing |
| No unused CSS | 95/100 | Purpose-built 3-file CSS (~1319 lines total); no framework overhead |

---

## Defects

### 🔴 CRITICAL

#### 1. `og:image` is SVG — spec mandates PNG (1200×630)
- **File:** `index.html:15`, `features.html:15`, `clients.html:15`, `download.html:15`, `plugins.html:15`, `docs.html:15`, `hub.html:15`, `about.html:19`
- **Line reference:** `meta property="og:image" content="https://detain.github.io/phlix-website/sites/afrofuturism/img/og.svg"`
- **Spec violation:** `new_site.md` §8: "`og.png` (1200×630) — social share card … Ship `og.svg` as the editable source **if used, but reference a rasterized `og.png` in meta`" and §11: "absolute URL to the 1200×630 png"
- **Impact:** Social media previews (Twitter, Facebook, LinkedIn) will render og.svg
  incorrectly or reject it. Twitter's card validator explicitly requires a
  raster image for `summary_large_image`. This directly undermines the
  shareability of the entire site.
- **Suggested fix:** Generate `img/og.png` at exactly 1200×630 from the SVG
  source, then update all 8 pages to reference `img/og.png`.

#### 2. No `@font-face` declarations — brand fonts never load
- **File:** `css/base.css` (tokens section)
- **Reference:** `css/base.css:65-69` — font stacks declared as CSS variables:
  ```css
  --font-headline: 'Montserrat', 'Arial Black', 'Helvetica Neue', sans-serif;
  --font-display:  'Bebas Neue', Impact, Haettenschweiler, sans-serif;
  --font-body:    'Nunito', 'Source Sans Pro', system-ui, sans-serif;
  --font-ui:      'Montserrat', system-ui, 'Helvetica Neue', sans-serif;
  --font-mono:    'JetBrains Mono', 'Courier New', Courier, monospace;
  ```
- **Spec violation:** `new_site.md` §1: "Self-hosted WOFF2 (optional but
  preferred)" and §13: "Fonts self-hosted WOFF2 with `font-display: swap`"
- **Impact:** Visitors see system fallback fonts (Arial Black, Helvetica,
  system-ui) instead of Montserrat/Bebas Neue/Nunito/JetBrains Mono. The entire
  Afrofuturism brand typography system is silent. No `font-display: swap` is
  possible without `@font-face`.
- **Suggested fix:** Download WOFF2 subsets of Montserrat (700, 800, 900),
  Bebas Neue (400), Nunito (400, 600, 700), JetBrains Mono (400), place them in
  `css/fonts/`, add `@font-face` declarations with `font-display: swap` in
  `base.css` before the `:root` block.

---

### 🟡 MODERATE

#### 3. No `loading="lazy"` on any `<img>` tag
- **Files:** `index.html:45` (nav logo), all 8 pages (same pattern)
- **Spec hint:** `new_site.md` §13: "Lazy-load below-the-fold imagery"
- **Impact:** Below-fold images (if any are added later, or the logo if it
  grows) block rendering on slow connections. Currently no below-fold raster
  images exist, so the practical impact is low — but the pattern is missing.
- **Suggested fix:** Add `loading="lazy"` to all decorative or non-critical
  `<img>` tags. Keep `loading="eager"` (or omit) for the LCP element (hero
  image if added, or above-fold content).

#### 4. Missing 1024px responsive probe in components.css footer
- **File:** `css/components.css:310-312`
- **Reference:** `css/components.css:310`:
  ```css
  @media (max-width: 640px) {
    .footer-grid { grid-template-columns: 1fr; gap: var(--space-6); }
  }
  ```
- **Spec:** `new_site.md` §14: "Probe at **320, 375, 414, 768, 1024, 1280, 1920**"
- **Impact:** The footer collapses to 1 column at 640px (mobile) but there is no
  explicit handling at 1024px. The 3-column footer persists well into
  large-desktop widths. This is acceptable for fluid grids but deviates from the
  explicit probe requirement.
- **Suggested fix (advisory):** Add a 1024px media query to fine-tune footer or
  nav spacing for large-tablet/laptop viewports, or add a comment explaining why
  1024px is intentionally omitted.

#### 5. `hero__kente-border` CSS animation runs for all users including reduced-motion
- **File:** `css/theme.css:181`
- **Reference:** `css/theme.css:183-186`:
  ```css
  @keyframes kente-slide {
    0%   { background-position: 0 0; }
    100% { background-position: 80px 0; }
  }
  ```
  Applied unconditionally at `theme.css:181`.
- **Spec violation:** `new_site.md` §12: "Honor `prefers-reduced-motion: reduce`"
- **Impact:** The kente border animation runs for users who have
  `prefers-reduced-motion: reduce` enabled. JS main.js:66-68 does suppress it,
  but suppression via JS `style.animation = 'none'` is fragile (it requires JS
  to execute first and overrides CSS cascade in an anti-pattern way).
- **Suggested fix:** Move the animation into a `@media (prefers-reduced-motion:
  no-preference)` guard in CSS directly:
  ```css
  @media (prefers-reduced-motion: no-preference) {
    .hero__kente-border { animation: kente-slide 8s linear infinite; }
  }
  ```

#### 6. `content-section` has no 1024px layout adjustment
- **File:** `css/theme.css:415-421`
- **Reference:** `css/theme.css:423-428`:
  ```css
  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    ...
  }
  ```
- **Spec:** `new_site.md` §14: probe at 1024px
- **Impact:** The content grid works correctly via `auto-fill` at all sizes, but
  the spec requires explicit responsive handling. The card grid at 1024px shows 3
  columns of ~300px cards which may be too narrow for a 1024px viewport.

---

### 🟢 MINOR / ADVISORY

#### 7. Inline `style="display:inline-block;vertical-align:middle;margin-right:4px"` on SVG in hero eyebrow
- **File:** `index.html:76`
- **Impact:** Inline styles on SVG elements are harder to maintain and override.
  Should be a utility class or part of the component's CSS.
- **Suggested fix:** Extract to CSS class `.eyebrow__star` or similar.

#### 8. No `rel="preload"` for critical assets
- **Files:** All 8 HTML pages
- **Impact:** The hero content is the LCP candidate; with no preload hints for
  critical CSS or fonts, the browser discovers them late in the parse.
- **Suggested fix:** For `css/base.css` (the first stylesheet with critical
  tokens), add `<link rel="preload" href="css/base.css" as="style">`. For the
  hero section's visual assets (kente border, starfield), preload hints would
  help LCP.

#### 9. `sitemap.xml` and `robots.txt` exist but have not been verified
- **Files:** `/home/sites/phlix/phlix-website/sites/afrofuturism/robots.txt`,
  `/home/sites/phlix/phlix-website/sites/afrofuturism/sitemap.xml`
- **Status:** Files present per spec §10 requirements, but not read for this
  review. Verify they are valid and contain correct absolute URLs.

---

## Dimension-by-Dimension Analysis

### Render Blocking (95/100)

| Page | CSS position | JS position |
|---|---|---|
| All 8 pages | `<head>` (lines 23-25) | `</body>` with `defer` |
| index.html | 3 link rel=stylesheet | `js/main.js defer` at line 256 |

✅ **Correct:** CSS is in `<head>` (not render-blocking in the traditional
sense for a single-threaded parse — browser can still render). JS is
`defer`-ed and placed just before `</body>`. No synchronous `<script>` tags.

**Minor:** `index.html:26-37` has an inline `<script type="application/ld+json">`
for JSON-LD schema. This is render-blocking as an inline script, but it's tiny
(~200 bytes) and structured data must be in `<head>` per spec §10. Acceptable.

---

### Responsive Breakpoints (90/100)

**What's implemented:**
- Mobile-first via `clamp()` for typography (`css/theme.css:14`, `20`, `26`)
- `grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))` and
  `repeat(auto-fit, minmax(260px, 1fr))` — fluid, no fixed breakpoints
- `@media (max-width: 768px)` for mobile nav toggle (`components.css:112`)
- `@media (max-width: 640px)` for footer single-column (`components.css:310`)
- `@media (prefers-reduced-motion: reduce)` in both CSS and JS

**What's missing:**
- Explicit `@media (max-width: 1024px)` probe for layout adjustment at the
  spec-mandated breakpoint. Fluid grids handle this implicitly, but §14 requires
  "probing" at 1024px.

**Layout stability:** `min-height: 100svh` on `.hero` (theme.css:128) is
viewport-relative, preventing hero height from causing CLS.

---

### Asset Loading (55/100 — largest gap)

**No @font-face declarations exist anywhere.** The CSS variable system defines
font stacks as fallbacks, but no WOFF2 font files are loaded. This means:
- Montserrat Black (900) renders as Arial Black on most systems
- Bebas Neue renders as Impact
- Nunito renders as system-ui
- JetBrains Mono renders as Courier New

The spec §13 explicitly requires: "Fonts self-hosted WOFF2 with
`font-display: swap`". Not implemented. This is a hard spec failure.

**og:image** is `og.svg`. Spec §8 and §11 both require a 1200×630 PNG. SVG is
not a valid replacement for raster social share images on Twitter and Facebook.

No `<link rel="preconnect">` to Google Fonts (because no Google Fonts link is
present — this is correct for the "no CDN" rule, but the replacement
(self-hosted) was never implemented).

---

### CSS Efficiency (92/100)

**Universal selector usage:**
- `base.css:13`: `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`
- This is the standard modern reset and is appropriate. `box-sizing: border-box`
  on `*` does not cause layout thrashing; it prevents it.

**Selector complexity:** All selectors are BEM-style with 1-2 classes max.
No descendant selectors beyond 2 levels. No attribute selectors for layout.
No `!important` in layout properties.

**Layout thrashing:** No `offsetWidth`/`offsetHeight` reads adjacent to style
writes. CSS custom properties used for all animation values. No forced
synchronous layouts.

**No framework imports:** Pure purpose-built CSS across 3 files (~1319 lines
total). Excellent.

---

### JS Efficiency (95/100)

**main.js analysis (all 90 lines):**
1. `'use strict'` — ✅
2. `defer` on the script tag — ✅ (browser loads in parallel, executes after parse)
3. `IntersectionObserver` for `.animate-on-scroll` — ✅ (lines 45-62)
   - `unobserve` called after first intersection — ✅ (line 53) — prevents
     memory leaks and repeated callbacks
   - `threshold: 0.12` with `rootMargin: '0px 0px -40px 0px'` — reasonable
4. `prefers-reduced-motion` check gates all animations — ✅ (lines 9, 46, 66-68)
5. Mobile nav: escape key handler (line 36-42), outside click (lines 28-33) — ✅
6. Active nav link on scroll via `sectionObserver` (lines 70-88) — ✅
   - `unobserve` called? No. **This observer is never disconnected.**
   - **Potential memory leak:** `sectionObserver` holds references to all
     `section[id]` elements indefinitely.

**No memory leak for scroll reveals** (observer.unobserve is called).
**Minor leak for active nav observer** (never disconnected — stays in memory
for page lifetime). Impact: negligible (tiny page, few sections).

---

### Image Optimization (75/100)

**SVG for all icons and logos:** ✅ All 8 pages use inline SVG icons
(hero eyebrow star, feature card icons, nav hamburger, etc.). No raster icons.

**Explicit dimensions on `<img>`:** ✅ All `<img>` tags have `width` and
`height` attributes, preventing CLS:
- `index.html:45`: `<img ... width="120" height="40">`
- All 8 pages repeat the same nav logo pattern

**Issues:**
- `og.image` meta across all 8 pages points to `og.svg` — wrong format
- No `loading="lazy"` attribute on any `<img>` (including non-critical images)
- The logo SVG file (`img/logo.svg`) is 240×64px but displayed at 120×40 —
  this is fine as CSS scales it, but the intrinsic aspect ratio is preserved

**Images referenced in CSS:** The hero starfield is entirely CSS-generated
(radial-gradient) — no raster image request. ✅

---

### Layout Stability / CLS (90/100)

**Hero section (`theme.css:126-254`):**
- `min-height: 100svh` — stable, viewport-relative unit
- `overflow: hidden` — contains absolutely positioned children
- Starfield is `::before` pseudo-element with `radial-gradient` (no image request)
- Glow is `position: absolute` with `pointer-events: none`
- `content-visibility: auto` not set (not needed for above-fold content)

**No images without dimensions:** All `<img>` elements have explicit `width`
and `height`. ✅

**No layout shifts from web fonts:** No fonts are loaded, so no FOUT/FOIT.
This is actually a non-issue (zero CLS from fonts), but only because the fonts
are missing entirely.

**`contain` not used:** For a static marketing page, not using `contain`
is acceptable. Layout is not complex enough to need it.

---

### Unused CSS (95/100)

**File sizes:**
- `base.css`: ~174 lines (tokens + reset + base elements)
- `theme.css`: ~584 lines (typography + layout + hero + sections + utilities)
- `components.css`: ~561 lines (header/nav + footer + buttons + cards + forms +
  badges + animations)

Total: ~1319 lines of purpose-built CSS. No framework imports. No Tailwind
CDN. No Bootstrap.

**Unused classes:** No dead CSS detected by visual inspection. All classes
appear to be used in the 8 HTML files. A production audit with
`coverage.css` or `purgecss` would confirm.

**Animations only run when elements exist:** The `.animate-on-scroll` class is
conditionally applied by JS when IntersectionObserver fires. No unused
animation code.

---

## Recommendations (Priority Order)

| Priority | Action | Impact |
|---|---|---|
| **P0** | Generate `img/og.png` at 1200×630 from `img/og.svg`; update all 8 pages to reference it | Social share cards work correctly; directly affects Lighthouse shareability score |
| **P0** | Download Montserrat 700/800/900, Bebas Neue 400, Nunito 400/600/700 WOFF2; place in `css/fonts/`; add `@font-face` with `font-display: swap` in `base.css` before `:root` | Brand typography loads correctly; eliminates layout shift from font swap (CLS improvement); fixes spec §13 violation |
| **P1** | Add `loading="lazy"` to all non-critical `<img>` elements | Reduces initial page weight; improves LCP |
| **P1** | Move kente border animation into `@media (prefers-reduced-motion: no-preference)` in CSS, remove JS override | Accessible by default without JS dependency |
| **P1** | Disconnect `sectionObserver` on page unload or use `{ once: true }` option | Eliminates minor memory leak in active nav scroll spy |
| **P2** | Add `rel="preload"` for `css/base.css` in `<head>` | Improves LCP by hinting browser to fetch critical CSS earlier |
| **P2** | Add explicit `@media (max-width: 1024px)` probe for footer / content grid | Meets spec §14 explicit breakpoint requirement |

---

## Lighthouse Estimate (Budget Target: ≥90)

Based on code analysis only (not live measurement):

| Metric | Estimate | Notes |
|---|---|---|
| LCP | ~1.2-1.8s | No hero image (CSS-only starfield); no render-blocking fonts; `defer` JS; LCP is the H1 text render |
| CLS | 0.05-0.08 | Explicit img dimensions; `100svh` hero; no font swap (no fonts loaded); may exceed 0.1 if fonts ever added without `font-display: swap` |
| INP | <100ms | Minimal JS; no heavy event handlers; deferred script is tiny (90 lines) |
| FCP | ~0.8-1.2s | CSS in head; no external font blocking; CSS-only hero background |
| TBT | <50ms | Single small deferred script; no heavy main-thread work |

**Estimated Lighthouse Perf: 88-93** (conditional on font loading — if fonts
are added without `font-display: swap`, CLS rises and score drops below 85).

---

*Generated by adversarial responsive/performance review. All file:line
references are from absolute paths under `/home/sites/phlix/phlix-website/sites/afrofuturism/`.*
