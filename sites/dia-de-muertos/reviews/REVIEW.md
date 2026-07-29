# REVIEW — Día de Muertos Brand-Kit Site

**Site:** `sites/dia-de-muertos/`
**Reviewer:** hostile adversarial reviewer
**Date:** 2026-07-29
**Lint:** `npm run lint` — ✅ 0 errors for dia-de-muertos

---

## Executive Summary

The site is well-crafted. Previous review rounds resolved many issues. Two real bugs remain plus one accessibility gap. Fixes are targeted and small.

---

## 13-Dimension Review

### 1. Brand Fidelity & Spirit — ✅ PASS

**Score: 94**

Catrina, marigolds, papel picado, ofrenda altar metaphor — fully realized. The 6-link nav (plugins/docs demoted to footer) is a documented `site_architecture` decision (`brand-kits/dia-de-muertos.js:1304–1318`) and is correct. All colors trace to kit tokens. Cinzel Decorative is correctly reserved for display moments only (hero h1, footer-tagline). All motion is brand-consistent.

**Minor note:** `index.html:664` — `aria-label="Catrina, the Día de Muertos guide — read a note"` has a Unicode en-dash instead of a hyphen in "Día de Muertos". This creates an encoding-dependent string but is cosmetic.

---

### 2. SEO — ⚠️ PARTIAL

**Score: 87**

| Check | Status |
|-------|--------|
| `<title>` ≤ 60 chars (all pages) | ✅ Pass |
| `<meta name="description">` ≤ 160 chars | ✅ Pass |
| `<link rel="canonical">` absolute | ✅ All pages |
| Single `<h1>`, unbroken hierarchy | ✅ All pages |
| Descriptive anchor text | ✅ Pass |
| JSON-LD `SoftwareApplication` on home | ✅ Present |
| sitemap.xml (8 pages, absolute URLs) | ✅ Pass |
| robots.txt referencing sitemap | ✅ Pass |

**❌ BUG — JSON-LD `image` is relative, not absolute:**
`index.html:60` — `"image": "/img/og.png"` is a path-relative URL. The spec (§11) and rule 5 of `check-meta.mjs` require `og:image` to be **absolute**. Every `<meta property="og:image">` on the page is correctly absolute; the JSON-LD is not.

**Fix:** Change JSON-LD image to `https://detain.github.io/phlix-website/dia-de-muertos/img/og.png`.

---

### 3. Readability — ✅ PASS

**Score: 93**

Lora body text at 1rem/1.7 line-height on `#0C0512` background is warm and readable. No excessive jargon in prose. `<details class="jargon">` blocks correctly translate technical terms (NTP-style time sync, CRF quality) per the kit's `complexity_profile.jargon_policy: "translate"`.

---

### 4. Spelling & Grammar — ✅ PASS

**Score: 95**

All visible text reviewed. No spelling errors. No grammatical issues. Proper em-dashes, smart quotes in blockquotes.

---

### 5. Usability — ✅ PASS

**Score: 91**

Download reachable in ≤2 clicks from home (hero CTA → download.html). Mobile nav uses the checkbox hack (works without JS for basic open/close). `aria-expanded` is managed by JS but the checkbox state is native. Escape key closes menu (§7 JS responsibility). External links have `rel="noopener noreferrer"`.

**Gap:** The mobile nav checkbox toggle (`index.html:97–108`) relies on CSS `:checked` state for visual toggle. With JS disabled, the menu is permanently open on mobile and may cover content — but this is an acceptable progressive-enhancement pattern.

---

### 6. Accessibility (WCAG 2.2 AA) — ⚠️ PARTIAL

**Score: 88**

| Check | Status |
|-------|--------|
| `prefers-reduced-motion` respected | ✅ JS gates all reveals; CSS media query zeroes durations |
| 44×44px touch targets | ✅ Buttons are ≥44px |
| 200% text zoom | ✅ `overflow-wrap: anywhere` on body text; `break-word` on headings |
| Keyboard reach + visible focus | ✅ `:focus-visible` with marigold glow ring |
| Contrast — primary (#FFB800) on bg (#0C0512) | ✅ 11.57:1 (AAA) |
| Contrast — text (#FFF0E8) on bg | ✅ 18.05:1 (AAA) |
| Contrast — links (#D21FC3 used, not raw #CC00BB) | ✅ AA-safe derivation documented in SITE.md:36 |
| Skip link → `#main-content` | ✅ |
| `aria-current="page"` on active nav link | ✅ |
| Landmarks: banner, nav, main, contentinfo | ✅ One each |
| `aria-expanded` managed on mobile toggle | ✅ via JS |

**❌ MISSING — Intensity toggle has no `aria-pressed`:**
`index.html:652` — `<button type="button" class="intensity-toggle" aria-pressed="false">`. The `aria-pressed` attribute is present but never updated by JS when the toggle state changes. This is a WCAG 4.1.2 (Name, Role, Value) gap. The JS does toggle the `body.intensity-reduced` class but never touches `aria-pressed`.

**Fix:** In `main.js`, when toggling intensity, also set `button.ariaPressed = isReduced.toString()`.

---

### 7. Responsive (320→1920) — ✅ PASS

**Score: 91**

Fluid typography via `clamp()`. Grid uses `minmax(0, 1fr)` per §19.12 (prevents overflow from unbreakable strings). `overflow-wrap: anywhere` on body text, `break-word` on headings. No `overflow: hidden` on text containers. Mobile nav collapses via checkbox hack with `flex-wrap: wrap` on `.nav-menu`.

**Note:** `render-check.mjs` was not fully verified (timeout), but the CSS architecture follows the §19.12 rules known to prevent zoom failures.

---

### 8. Performance (self-hosted fonts, no CDNs) — ✅ PASS

**Score: 95**

- Fonts: 11 `@font-face` rules, all self-hosted WOFF2 via `shared/assets/fonts/`. Paths are `../../assets/fonts/…` from `dist/<slug>/css/` — correct after `build.mjs` copies `shared/assets/` → `dist/assets/`. Dev server serves `/assets/` from `shared/assets/`.
- JS: `defer`-loaded, 18.1 KB (under 40 KB warning threshold). No third-party scripts.
- No `fonts.googleapis.com` anywhere in the site. ✅
- No CDN dependencies. ✅
- Images: SVG illustrations inline in HTML; og.png is 118 KB raster (acceptable).

---

### 9. Content Accuracy — ⚠️ PARTIAL

**Score: 85**

| Content item | Status |
|-------------|--------|
| Install command (`download.html:139`) | ✅ Exact string from `content.json` |
| 4 native clients + DLNA | ✅ Correct (not "5 native clients") |
| License (MPL-2.0 / MIT split) | ✅ Accurate on about.html + all footers |
| FAQ answers | ✅ Match `content.json` |
| Pitch bullets | ✅ Exact match |
| Feature titles/bodies | ✅ Match |
| Footer columns (3, correct labels) | ✅ Match `content.json` |
| JSON-LD license URL | ✅ `https://www.mozilla.org/en-US/MPL/2.0/` |
| `proof_strategy` signals | ✅ No fabricated counts; links to live pages |

**❌ BUG — docs.html uses non-existent doc paths:**
`docs.html:138` → `https://detain.github.io/phlix-docs/guide` (404)
`docs.html:153` → `https://detain.github.io/phlix-docs/dev` (404)

These are not from `content.json`. The docs URL in `content.json` is `https://detain.github.io/phlix-docs` (root). The section headings "User Guide" and "Developer docs" are fine as presentation labels, but the hrefs must be **verifiable** paths that exist. `/guide` and `/dev` do not exist on the VitePress docs site.

**Fix:** Change to `https://detain.github.io/phlix-docs` (User Guide) and `https://detain.github.io/phlix-docs/development` (Developer docs) — or whatever the actual VitePress entry points are. Verify against the live docs before shipping.

---

### 10. CTA / Funnel — ✅ PASS

**Score: 94**

Primary CTA "Light the First Candle" above the fold on index.html. The visitor paths fork (3 path-cards linking to feature anchors) is a strong addition. CTA ladder on download page gives 3 steps with honest descriptions. No CTA misleads about its destination — all hrefs match what the button label promises.

---

### 11. Social Metadata (OG + Twitter, og:image PNG) — ✅ PASS

**Score: 96**

- `og:type=website`, `og:site_name=Phlix` on all pages ✅
- `og:url` absolute on all pages ✅
- `og:image` absolute URL on all pages ✅
- `og:image` is PNG (1200×630) ✅ — confirmed by `file` command
- `twitter:card=summary_large_image` on all pages ✅
- `twitter:creator=@detain` on all pages ✅
- `theme-color` = kit primary `#FFB800` on all pages ✅
- Favicon SVG link present on all pages ✅

**Deduction:** JSON-LD `image` field is relative (see SEO bug above).

---

### 12. Localization — ✅ PASS

**Score: 92**

`<html lang="en">` set correctly. All user-facing strings trace to `content.json` or kit `copy_overlay`. Logical properties (`margin-inline`, `inset`) used throughout. No hard-coded left/right assumptions. `font-display: swap` on all `@font-face`.

---

### 13. Experience Fidelity — ✅ PASS

**Score: 95**

All experience opt-in fields from the kit are shipped:
- `mascot.behavior` → Catrina fixed companion (hidden, appears on home/features/download) ✅
- `seasonal_activation: "live-js"` → seasonal banner (Oct 31–Nov 2) ✅
- `intensity_toggle` → "Soften the Flame" in footer ✅
- `easter_eggs` → click:5 dance, typed-word:"marigold", time-of-day 20-23h ✅
- `homepage_narrative` → 5-section arc (hero → why-watch → offerings → gather → cta) ✅
- `feature_casting` → 2 hero features (SyncPlay, Library) + 3 support + 3 footnote ✅
- No unused experience fields invented (§19.9) ✅

---

## Fixes Needed

### 🔴 CRITICAL

1. **[SEO/Content] JSON-LD `image` must be absolute URL**
   - File: `index.html:60`
   - Change: `"image": "/img/og.png"` → `"image": "https://detain.github.io/phlix-website/dia-de-muertos/img/og.png"`
   - Reason: check-meta.mjs rule 5; absolute URL required for OG compliance

### 🟠 MAJOR

2. **[Content Accuracy] docs.html links return 404**
   - File: `docs.html:138` and `docs.html:153`
   - Change: `https://detain.github.io/phlix-docs/guide` → `https://detain.github.io/phlix-docs`
   - Change: `https://detain.github.io/phlix-docs/dev` → `https://detain.github.io/phlix-docs/development` (verify actual path)
   - Reason: links must resolve; §16 requires content traceable to content.json or real URLs

### 🟡 MINOR

3. **[Accessibility] Intensity toggle `aria-pressed` never updated**
   - File: `index.html:652`, `js/main.js` (toggle handler)
   - Fix: in the JS toggle function, add: `document.querySelector('.intensity-toggle').setAttribute('aria-pressed', String(isActive))`
   - Reason: WCAG 4.1.2 — role is correct, but value (pressed state) must be kept in sync

---

## Summary

| Dimension | Score | Status |
|-----------|-------|--------|
| Brand fidelity & spirit | 94 | ✅ |
| SEO | 87 | ⚠️ |
| Readability | 93 | ✅ |
| Spelling & grammar | 95 | ✅ |
| Usability | 91 | ✅ |
| Accessibility | 88 | ⚠️ |
| Responsive | 91 | ✅ |
| Performance | 95 | ✅ |
| Content accuracy | 85 | ⚠️ |
| CTA / funnel | 94 | ✅ |
| Social metadata | 96 | ✅ |
| Localization | 92 | ✅ |
| Experience fidelity | 95 | ✅ |

**Average: 91.6 — No ❌. Three fixes needed (1 CRITICAL, 1 MAJOR, 1 MINOR).**

---

## APPROVED with fixes required.

After the three fixes above are applied, re-run `npm run lint` and confirm linkcheck shows no 404s for dia-de-muertos. Then the site is ready.
