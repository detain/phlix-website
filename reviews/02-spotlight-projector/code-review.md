# Code Review: `02-spotlight-projector`

**Files Reviewed:**
- `variants/02-spotlight-projector/index.html`
- `variants/02-spotlight-projector/features.html`
- `variants/02-spotlight-projector/clients.html`
- `variants/02-spotlight-projector/download.html`
- `variants/02-spotlight-projector/plugins.html`
- `variants/02-spotlight-projector/docs.html`
- `variants/02-spotlight-projector/hub.html`
- `variants/02-spotlight-projector/about.html`
- `variants/02-spotlight-projector/css/base.css`
- `variants/02-spotlight-projector/css/components.css`
- `variants/02-spotlight-projector/css/theme.css`
- `variants/02-spotlight-projector/js/main.js`

---

**Overall Assessment:** REQUEST_CHANGES

**Summary:** The variant implements solid structural foundations (semantic HTML, accessibility features, dark mode) but contains critical brand kit violations — two colors outside the assigned palette (burgundy, soft shadow gray) are used throughout, and font files referenced in CSS do not exist in the variant directory, meaning self-hosted fonts will fail to load.

---

## 🔴 Critical Issues

### 1. Non-existent font files — brand kit broken
- **File:** `css/theme.css:13,21,29,37`
- **Problem:** CSS references `../fonts/cinzel-bold.woff2`, `../fonts/lora-regular.woff2`, `../fonts/source-sans-pro-500.woff2`, `../fonts/fira-code.woff2` but the `fonts/` directory does not exist at `variants/02-spotlight-projector/fonts/`. Self-hosted font loading will silently fail, falling back to system fonts and breaking the brand kit.
- **Required Fix:** Either provide the actual WOFF2 font files under `variants/02-spotlight-projector/fonts/` or switch to Google Fonts CDN loading for the 4 brand fonts (Cinzel Bold, Lora Regular, Source Sans Pro, Fira Code).

### 2. Brand color kit violation — Burgundy (#7A1F1F)
- **Files:** `css/base.css:15`, `css/components.css:91,340,486`, `css/theme.css:240`, and throughout gradient usage
- **Problem:** Burgundy `#7A1F1F` is used in the hero gradient (`rgba(122, 31, 31, 0.2)`), CTA banner background (`rgba(122, 31, 31, 0.15)`), and client status badge (`status-beta`). This color is NOT in the assigned brand kit (only Gold #F5C542, Deep black #000000, Warm white #FFF7E6, Amber #FFB84D are permitted).
- **Required Fix:** Replace Burgundy with an approved brand color or adjust opacity/usage of existing brand colors.

### 3. Brand color kit violation — Soft shadow gray (#3A3A3A)
- **Files:** `css/base.css:16,22`, `css/components.css:147,211,230,269,304,374,393,394,506`, `css/theme.css` (used as surface color via CSS variable)
- **Problem:** `--color-soft-shadow-gray: #3A3A3A` is defined and used as `--color-surface` throughout the design but is NOT in the assigned brand kit.
- **Required Fix:** Remove `--color-soft-shadow-gray` and map surface/card backgrounds to approved brand colors only (e.g., use `rgba(245, 197, 66, 0.1)` for card backgrounds instead of gray-tinted surfaces).

---

## 🟠 Major Issues

### 4. Stylelint — 61 auto-fixable errors
- **Files:** `css/base.css`, `css/components.css`, `css/theme.css`
- **Problem:** 61 stylelint errors across all 3 CSS files:
  - `color-function-alias-notation`: `rgba()` should be `rgb()` (55 occurrences)
  - `color-hex-length`: `#000000` should be `#000` (1 occurrence — `base.css:13`)
  - `property-no-vendor-prefix`: `-webkit-text-size-adjust`, `-webkit-backdrop-filter` (2 occurrences)
  - `font-family-name-quotes`: Unexpected quotes around "Cinzel" and "Lora" (2 occurrences — `theme.css:9,17`)
  - `media-feature-range-notation`: `context` media feature range notation (2 occurrences)
  - `declaration-block-no-redundant-longhand-properties`: `inset` shorthand expected (1 occurrence)
- **Note:** All 61 errors are auto-fixable with `npx stylelint --fix`. These should be resolved before merge per the Builder contract ("stylelint — errors exist in your variant CSS").

### 5. CSS font-family declarations don't match brand kit names
- **File:** `css/base.css:30-33`
- **Problem:** CSS variables define `--font-headline: 'Cinzel', 'Bold', serif` etc., but brand kit font names should be used exactly: "Cinzel Bold" is not the same as "Cinzel" with weight 700. The declarations suggest the font-family name should be just the base name (Cinzel, Lora, Source Sans Pro) while weight is set via `font-weight`. However, self-hosted `@font-face` in `theme.css` uses `font-family: 'Cinzel'` with `font-weight: 700` — this is correct, but the CSS variable setup is confusing and inconsistent.
- **Required Fix:** Align `--font-headline` to just `'Cinzel'` (not `'Cinzel', 'Bold'`), since the `@font-face` already sets weight 700.

---

## 🟡 Minor Issues

### 6. Missing `prefers-reduced-motion` in CSS but JS animations exist
- **File:** `css/theme.css:338-361` (spotlight-sweep keyframe animation)
- **File:** `css/theme.css:363-367` (correctly has `@media (prefers-reduced-motion: reduce)` turning it off)
- **Status:** ✅ Actually handled correctly — the `spotlight-sweep` animation IS disabled via the reduced-motion media query at line 363. No action needed.

### 7. Missing `prefers-reduced-motion` for smooth scroll
- **File:** `js/main.js:59-62`
- **Problem:** `scrollIntoView({ behavior: 'smooth' })` always uses smooth scrolling. Should respect `prefers-reduced-motion` by checking `window.matchMedia('(prefers-reduced-motion: reduce)')` before enabling smooth behavior.
- **Concern (non-blocking):** This may cause unexpected scrolling behavior for users with motion sensitivity who did not enable OS-level reduced motion.

### 8. No horizontal scroll observed at tested viewports
- **Status:** ✅ CSS uses `overflow: hidden` on `.hero` and responsive grids via `auto-fit` / `clamp()`. No horizontal scroll detected in 320px–1920px range from code inspection.

### 9. Dark mode by default — background is deep black
- **Status:** ✅ `css/base.css:89` sets `--color-background: var(--color-deep-black)` = `#000000`. Body background is `#000000`. Not white/cream.

---

## 🟢 Positive Observations

1. **HTML structure is excellent** — All pages have `<html lang="en">`, `<nav>`, `<main>`, `<header>`, `<footer>`, single `<h1>` per page, proper ARIA labels on nav and interactive elements.
2. **Skip link present and functional** — `base.css:139-158` implements skip-link with visible focus state. ✅
3. **Visible focus styles** — `:focus-visible` defined at `base.css:161-164` with gold outline. ✅
4. **Complete meta tag set** — Every HTML page has title (≤60 chars), meta description (≤160), og:title, og:description, og:image, og:url, og:type, og:site_name, twitter:card, twitter:title, twitter:description, twitter:image. ✅
5. **eslint clean** — `main.js` passes eslint with no errors. ✅
6. **htmlhint clean** — All 8 HTML files pass htmlhint with no errors. ✅
7. **Accessibility good** — `aria-label` on nav toggle, `aria-expanded`, `aria-controls`, `aria-current="page"`, `aria-hidden="true"` on decorative SVGs, `role` attributes on lists, `tabindex="-1"` on main for skip-link target. ✅
8. **FAQ accordion is keyboard accessible** — `main.js:84-88` handles Enter/Space keydown on `<dt>` elements. ✅
9. **Mobile nav has focus trap** — `main.js:32-47` implements focus trapping within mobile nav when open. ✅
10. **Copy matches content.json** — Hero headline, pitch bullets, feature titles/bodies, client data, ecosystem links, FAQ content all match `shared/content.json` exactly. No hardcoded marketing copy deviations. ✅

---

## ✅ Passed Items (Builder Contract Checklist)

| Requirement | Status |
|-------------|--------|
| `<html lang="en">` | ✅ All 8 pages |
| Skip link | ✅ `index.html:37`, all pages |
| Visible focus styles | ✅ `base.css:161-164` |
| `prefers-reduced-motion` | ✅ `base.css:173-181` (CSS), `theme.css:363-367` (animation) |
| `<nav>` | ✅ All pages |
| `<main>`, `<header>`, `<footer>` | ✅ All pages |
| Single `<h1>` per page | ✅ All pages |
| Meta: title ≤60 | ✅ All pages (e.g., "Phlix — Your media. Your library. Your Phlix." = 48 chars) |
| Meta: description ≤160 | ✅ All pages (158 chars) |
| Meta: og:title, og:description, og:image, og:url, og:type | ✅ All pages |
| Meta: twitter:card | ✅ All pages |
| Responsive 320→1920px | ✅ `clamp()`, `auto-fit` grids, media queries at 640px, 768px |
| Touch targets ≥44px | ✅ Buttons use 44px+ padding |
| Color brand kit compliance | ❌ Burgundy and gray outside kit |
| Font brand kit compliance | ❌ Font files missing; declarations need alignment |
| htmlhint clean | ✅ No errors |
| eslint clean | ✅ No errors |
| stylelint clean | ❌ 61 errors |
| No hard-coded copy | ✅ All copy matches content.json |
| All images have alt | ✅ Logo img has `alt="Phlix logo"`, og.svg used as decorative img |

---

## Philosophy Compliance

| Principle | Status |
|-----------|--------|
| Early Exit (Guard Clauses) | N/A (no complex branching JS) |
| Parse, Don't Validate | PASS — JS validates DOM queries before use |
| Atomic Predictability | PASS — main.js is pure DOM manipulation, no side effects |
| Fail Fast, Fail Loud | PASS — JS throws on unexpected states via early returns |
| Intentional Naming | PASS — class names read like English (`.skip-link`, `.hero-eyebrow`, `.feature-card`) |
| Security | PASS — No user input, no hardcoded secrets, no injection vectors |
| Performance | PASS — Minimal JS, no N+1, CSS animations use `transform`/`opacity` |

---

## Score: 72/100

**Breakdown:** The variant is structurally excellent and passes most contract requirements. It loses significant points for the critical brand color violations (burgundy, gray) used pervasively throughout CSS, the completely missing font files that will break self-hosted font loading, and the 61 stylelint errors. With those fixes applied, this would score in the 90s.

**Verdict:** ❌ REQUEST_CHANGES — Critical brand kit violations and missing font assets must be resolved before approval.
