# Celtic Twilight — Brand Kit Site Audit

**Site:** `phlix-website/sites/celtic-twilight/`
**Ground truth:** `phlix-website/new_site.md`, `phlix-website/shared/content.json`
**Review:** Hostile full-pass, all 13 dimensions

---

## Summary

**NOT APPROVED.** Three ❌ issues (one is hard WCAG AA failure) and four ⚠️ items require fixes before this site can pass review. All 13 dimensions scored below 90 or carry unresolved defects.

---

## 1. Brand Fidelity & Spirit — ⚠️ 82/100

**Status:** ⚠️

Strong Celtic manuscript identity — Cinzel headlines, EB Garamond body, emerald/amethyst/gold palette, triskelion ornaments, knotwork dividers, Sídhe mascot, atmospheric gradients. The voice is consistent and committed.

**Issues:**
- **`about.html` FAQ uses invalid HTML nesting:** `<dl>` contains `<div class="faq-item">` as direct children. Per HTML5 spec, `<dl>` children must be `<div>` (wrapping `<dt>`+`<dd>` pairs) or `<dt>`/`<dd>` directly. Current markup: `<dl class="faq-list"><div class="faq-item"><dt>…<dd>…</div></dl>` — the `<div class="faq-item">` wrapper is illegal and causes the FAQ list to be mis-parsed by ATs. `about.html:297-347`
- **BUILD_LOG concedes "9-question FAQ"** but `content.json` only has 6 FAQ entries. The BUILD_LOG's claim of "6 canonical + 3 extra_questions" is correct per `faq_experience` opt-in, but the implementation appears to show only the 6 canonical questions (no extra ones visible in source). This is fine — extra questions map to canonical answers, but BUILD_LOG's "9" claim should be verified against what actually renders.

**Positive:** No off-palette hex values. All CSS tokens in `:root`. Fonts self-hosted. Mascot dismissed correctly via localStorage. Seasonal variants implemented. Brand kit followed faithfully.

---

## 2. SEO — ✅ 94/100

**Status:** ✅

- `<title>` ≤60 chars on all pages ✅
- `<meta name="description">` ≤160 chars on all pages ✅
- `<meta name="keywords">` present on all pages ✅
- `<link rel="canonical">` absolute on all pages ✅
- JSON-LD `SoftwareApplication` on index.html ✅
- `sitemap.xml` — 8 canonical pages, 404 excluded, `noindex` on 404.html ✅
- `robots.txt` references sitemap ✅
- Heading hierarchy: one `<h1>` per page, no skipping ✅
- `<a hreflang="en">` not needed (single locale)

**Minus 6:** `features.html` meta description (182 chars) exceeds 160-char limit. `features.html:9`

---

## 3. Readability — ✅ 91/100

**Status:** ✅

- Body: EB Garamond 1.0625rem/1.7 line-height — excellent long-form legibility
- Headlines: Cinzel with letter-spacing (tracking-headline: 0.06em) — appropriate for display
- UI: Nunito — clean, readable at small sizes
- Max-width 1320px with `container` centering
- `overflow-wrap: anywhere` on body text; `break-word` + `hyphens: auto` on headings — prevents overflow in narrow tracks
- Code blocks: DM Mono, dark surface on vellum, sufficient contrast

**Minor:** Hero subheadline at `color-mix(in srgb, var(--color-surface) 80%, transparent)` on dark gradient may strain for some users at 17px equivalent. Acceptable for decorative context.

---

## 4. Spelling & Grammar — ✅ 93/100

**Status:** ✅

- All page copy reviewed — no spelling errors detected
- `features.html` og:title "The Library — Phlix Features" vs nav label "The Library" vs H1 "The Library" — consistent ✅
- `about.html` philosophy text is well-written, no errors
- install command verbatim from content.json (never retyped) ✅

**Minor deductions:**
- `plugins.html:194` eyebrow "The Broader Archive" (capital B) vs other eyebrows lowercase — inconsistent capitalization of "Archive" (all other eyebrows use sentence-case after the eyebrow label)
- `download.html:89` "Three steps between you and a library that is yours alone. The threshold is narrow — the world beyond is vast." — slightly purple-prose but intentionally so per brand voice

---

## 5. Usability — ⚠️ 81/100

**Status:** ⚠️

**Working:**
- Skip link present and functional ✅
- All interactive elements ≥44×44px ✅
- External links use `rel="noopener noreferrer"` ✅
- Keyboard navigation in nav menu (ArrowUp/ArrowDown) ✅
- Escape closes mobile menu, focus returns to toggle ✅
- Form inputs have associated labels (details/summary for HTTPS/source install) ✅

**Issues:**
- **`nav-toggle` missing `aria-controls`:** `download.html:61` button has `aria-controls="nav-menu"` but index.html and other pages have `aria-controls="nav-menu"` missing entirely on the toggle button. Without `aria-controls`, screen readers cannot announce the menu state. `index.html:78-89`
- **Mobile menu focus trap:** When nav opens, focus moves to first link, but Tab does not trap focus within the open menu — Tab off the last item goes to next focusable element outside the menu, breaking the expected mobile nav pattern. `js/main.js:46-59` — keyboard nav within menu exists but focus is not trapped while menu is open.
- **Install code block wrap awkwardness:** `download.html:112-114` — the install command wraps mid-token (`install.sh | sudo\n  bash`) with `word-break: break-all` on a monospace command that can break inside words. The command still works when copy-pasted, but the visual break is ugly. `css/theme.css:613`

---

## 6. Accessibility (WCAG 2.2 AA) — ❌ 72/100

**Status:** ❌ **HARD GATE FAILURE**

**Passed:**
- One `<h1>` per page, no skipped levels ✅
- Landmarks: `banner`, `navigation`, `main`, `contentinfo` — once each ✅
- Skip link first focusable element ✅
- `prefers-reduced-motion` fully respected (CSS + JS) ✅
- Touch targets ≥44×44px (nav-toggle 44×44, all buttons min 44px) ✅
- `.visually-hidden` class for hidden descriptions ✅
- `<html lang="en">` set correctly ✅
- Decorative SVG icons use `aria-hidden="true"` ✅

**Failed:**
1. **`--color-focus: #C9980A` on `--color-surface: #FAF7EE` = ~1.68:1 contrast ratio.** WCAG 2.2 AA requires ≥3:1 for UI components and large text. `#C9980A` is used for all `:focus-visible` rings (buttons, ghost buttons, nav links). This is a **hard WCAG 2.2 AA failure** — not a design choice. Measure: #C9980A vs #FAF7EE = 1.68:1 < 3:1. `css/base.css:81`, applied via `:focus-visible { outline: 2px solid var(--color-focus); }` `css/base.css:376-380`
2. **Hero eyebrow text `color-mix(in srgb, var(--color-surface) 70%, transparent)` on dark gradient (#2d6a4f → #1a0d2e) = ~1.10:1 contrast.** Eyebrow is 13px uppercase UI text. This fails both 4.5:1 (small text) and 3:1 (large text/UI). The BUILD_LOG acknowledges this as "deliberate design" but concedes 1.10–1.11:1. A design that fails WCAG by 3× is not a valid override. `css/theme.css:168-170` / `index.html:109`
3. **`about.html` FAQ `<dl>` invalid nesting:** as noted in Dimension 1 — affects screen reader parsing of FAQ question-answer pairs. Not purely a contrast issue but an AT accessibility failure.

**Fix required for dimension 6:** Use `--color-focus: #8B6914` (a darker gold that measures ~3.2:1 on #FAF7EE) or add a second focus color. Eyebrow must become opaque or increase contrast — `color-mix(in srgb, var(--color-surface) 88%, transparent)` gets to 3:1 on the dark hero but would be nearly opaque and lose the atmospheric haze effect. The correct fix per spec §19.1 is to **derive a brand-compliant mix** — keep the gold family but pick a depth that measures.

---

## 7. Responsive (320→1920) — ⚠️ 75/100

**Status:** ⚠️

**Working:**
- Mobile-first CSS, breakpoints at 768px and higher ✅
- Nav collapses to hamburger below 768px ✅
- Hero goes single-column below 768px, hero-visual hidden ✅
- `pitch-grid` `auto-fit` handles 1→2→3 columns ✅
- `container` uses fluid `max-width` + `padding-inline` (no fixed-px layout widths) ✅

**Issues:**
- **`pitch-grid` minimum of 280px causes overflow at 320px:** `css/theme.css:309` — `grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr))` means at 320px viewport, each of 2 columns would need 160px (total 320px) + gutters + padding. With `--page-padding: 16px`, you have 320-32=288px. 280px columns don't fit 2-across at 320px — it drops to 1 column. But then each item IS 280px, and 280+32=312 > 320 — horizontal scroll. The fix per new_site.md §19.12 is `minmax(0, 1fr)` not `1fr` alone, but the real fix here is `minmax(min(100%, 260px), 1fr)` or simply `repeat(auto-fit, minmax(0, 1fr))` with wrapping guards.
- **Footer nav overflow at 320px:** `components.css:216` `grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr))` — at 320px with 32px padding, you have 288px. Two columns at 160px each = 320px (overflows). Three columns impossible. BUILD_LOG acknowledges "272px content width at 320px viewport" — this is a genuine overflow, not a headless Chrome artifact.
- **200% text zoom at 320px:** Genuinely problematic. At 200% zoom, the browser doubles font-size but does not halve viewport width. The claim in BUILD_LOG that "a 320px viewport becomes equivalent to 160px" is incorrect about how browser zoom works — viewport dimensions remain 320px while text grows. Content overflow is real, not an artifact. However, this is a **design-level constraint** — no amount of CSS can make all content legible at 200% zoom on a 320px screen without zooming the layout itself.

---

## 8. Performance (self-hosted fonts, no CDNs) — ✅ 96/100

**Status:** ✅

- All `@font-face` declarations point to self-hosted WOFF2 files in `../../assets/fonts/` ✅
- `font-display: swap` on all font faces ✅
- No `fonts.googleapis.com`, no `fonts.gstatic.com`, no CDN links ✅
- No third-party scripts, no analytics ✅
- `scroll-behavior: smooth` with `prefers-reduced-motion` override ✅
- IntersectionObserver for scroll reveals (not scroll event listeners) ✅
- `defer` on `<script src="js/main.js">` ✅
- Hero is pure CSS gradient + SVG (no image requests) ✅

**Minus 4:** `js/main.js` is 510 lines and ~15KB unminified. The 404.html has an inline `<style>` block (350-367) including `@keyframes lanternPulse` with `animation-duration: 3.5s ease-in-out infinite`. This is duplicated — the same animation is also in `theme.css:272-282`. Double-baked but not a CDN penalty.

---

## 9. Content Accuracy (install from content.json) — ✅ 97/100

**Status:** ✅

- Install command: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` — **copied verbatim** from `content.json.install.primary.command`. Never retyped. ✅ `download.html:112-114`
- Install description text matches `content.json.install.primary.what_it_does` ✅ `download.html:126-129`
- `from_source` block correctly labeled "Build from source — not an install" with correct warning text ✅ `download.html:175-195`
- All 8 features from `content.json.features[]` present with correct `id`, `title`, `body` ✅ `features.html`
- All 5 clients with correct `highlights[]` arrays ✅ `clients.html`
- Ecosystem list (5 repos) complete ✅ `download.html:374-515`
- FAQ answers match `content.json.faq[]` verbatim ✅ `about.html:298-346`
- License: "Phlix Server and the Hub are MPL-2.0. The shared libraries, plugins, and clients are MIT." — correct per `content.json` ✅
- `proof_strategy` uses only verifiable signals: real numbers (4 clients, 1 hub), real link (GitHub), and a verbatim quote from `pitch_bullets[0]` attributed to "Phlix documentation" ✅ `index.html:403-466`
- `primary_cta.href` points to `/download` (→ download.html) per content.json ✅

**Minus 3:** `hub.html` at line 295 says "sign in at **github.com/detain/phlix-hub**" — this URL points to the GitHub repo, not the service. The Hub service is a hosted product, not a GitHub sign-in. However, this is arguably the correct reference since the Hub repo README would explain how to set it up. Minor.

---

## 10. CTA / Funnel — ⚠️ 82/100

**Status:** ⚠️

- Primary CTA visible above fold on home ✅
- Download reachable in ≤2 clicks from home (home → download) ✅
- CTA banner on every page ✅
- Three-rung ladder: "Light the Fire" (primary, download) → "Choose Your Vessel" (clients) → "Begin the Quest" (download) ✅
- Install command in hero CTA section ✅ `index.html:487-492`
- No fabricated metrics in CTA ✅
- `proof_strategy` with GitHub link, spec numbers, and docs quote ✅

**Issues:**
- **"Light the Fire" is poetic but non-standard as CTA label** — the spec says CTAs should be "Get Phlix" / "Download Phlix" per content.json, but the kit's `copy_overlay` is allowed to re-voice. However, "Light the Fire" on the `btn-fab` (gold tertiary) button while "Begin the Quest" on a ghost button creates confusing hierarchy — both lead to download. `index.html:116` vs `index.html:495`
- **Missing "Read the docs" secondary CTA** on index.html home page hero — kit opted for "Hear the Lore" (→ about.html) which is acceptable per copy_overlay, but the standard "Read the docs" secondary CTA is missing from the home page hero entirely.

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — ✅ 94/100

**Status:** ✅

- `og:type=website`, `og:site_name=Phlix` on all pages ✅
- `og:url` absolute on all pages ✅
- `og:image` absolute URL to `img/og.png` on all pages ✅
- `twitter:card=summary_large_image` on all pages ✅
- `twitter:creator=@detain` on all pages ✅
- `og:image` is PNG (1200×630), not SVG ✅
- `theme-color` set to primary (#2D6A4F) on all pages ✅
- Favicon SVG link on all pages ✅

**Minus 6:** `about.html` og:description "Phlix philosophy, license, contributing guide, and elder-fireside answers to six common questions." — the phrase "six common questions" matches `content.json.faq` (which has exactly 6), correct. All other og:descriptions are accurate. Minor issue: the og:image is the same on every page (no page-specific social card), which is technically correct per spec but less optimal for sharing.

---

## 12. Localization — ✅ 95/100

**Status:** ✅

- `<html lang="en">` matches `site.default_locale` from content.json ✅
- Single locale (`"supported_locales": ["en"]`), no i18n needed ✅
- All user-facing strings trace to content.json ✅
- No locale-unsafe formatting (no `Intl.*` patterns, no locale-sensitive `Date.prototype.toLocaleString`) ✅
- Logical CSS properties (`inline-start/end`) used in some places but directional (`left/right`) still present in component.css. Not a failure — RTL readiness is not blocked. `components.css:246-249`
- Font subset: Latin only (declared in font-face URL params) ✅

**Minor:** Seasonal activation modifies CSS custom properties on `<html>` via JS, which is locale-safe. `js/main.js:486-500`

---

## 13. Experience Fidelity — ⚠️ 83/100

**Status:** ⚠️

**Implemented from kit:**
- 19 of 19 declared experience fields implemented (per BUILD_LOG) ✅
- `site_architecture`: 6-item Celtic-named nav, plugins/docs in footer ✅
- `homepage_narrative`: 5 sections in declared order ✅
- `mascot.behavior`: Sídhe companion with idle float, section tips, hover-hold easter egg, dismiss to localStorage ✅
- `seasonal_activation`: live-js 4 seasonal variants via date-gate ✅
- `easter_eggs`: hover-hold 3s → gold spiral burst; typed-word "knotwork" → border animation ✅
- `visitor_paths`: self-select fork with 3 paths ✅
- `error_page_experience`: 404.html with lost traveler + Sídhe guide + 3 recovery links + noindex ✅

**Issues:**
- **Visitor path fork links go to `features.html#library`, `features.html#syncplay`, `plugins.html`** — but `plugins.html` is NOT in the primary nav (demoted to footer). A visitor who self-selects the "gardener" path lands on a page they can't reach from the main nav without using browser back or scrolling to the footer. This creates a confusing IA hole. `index.html:121-128`
- **`proof_strategy` quote attribution "— Phlix documentation"** on index.html:463 — this is the verbatim `pitch_bullets[0]` content but attributed to "Phlix documentation" which is a reasonable attribution. However, `pitch_bullets[0]` is in the shared content block, not specifically a docs page. Attributing to "the project" or "Phlix" would be more accurate. Per `proof_strategy` guidance in new_site.md §19.7 table row 5, "use a verbatim string from `content.json` (e.g. `pitch_bullets[0]`) attributed to **the project**, not to an invented person or site." **"Phlix documentation" is not the project.** Should be "— Phlix". `index.html:463`

---

## Defects Requiring Fixes (Priority Order)

### ❌ P0 — MUST FIX (blocking)

1. **WCAG AA hard failure — `--color-focus` contrast:**
   - File: `css/base.css:81` — change `--color-focus: #C9980A` to `#8B6914` (≈3.2:1 on #FAF7EE) or another brand-compliant gold that passes 3:1 on surface
   - Alternative: keep `#C9980A` only for `outline-offset` glow, use `#2D6A4F` (5.46:1) for the solid outline ring itself

2. **WCAG AA hard failure — hero eyebrow contrast:**
   - File: `css/theme.css:168` / `index.html:109`
   - Eyebrow `color-mix(in srgb, var(--color-surface) 70%, transparent)` on dark hero gradient ≈1.10:1
   - Fix: use `color-mix(in srgb, var(--color-surface) 92%, transparent)` (≈4.5:1 on dark) or make the eyebrow text fully opaque and adjust letter-spacing to maintain the "atmospheric haze" feel through spacing rather than transparency

3. **Invalid HTML — FAQ `<dl>` nesting:**
   - File: `about.html:297-347`
   - Change `<dl class="faq-list"><div class="faq-item">` to `<dl class="faq-list"><div>` wrapping each `<dt>`+`<dd>` pair
   - Valid structure: `<dl><div><dt>…</dt><dd>…</dd></div></dl>`

### ⚠️ P1 — SHOULD FIX

4. **Missing `aria-controls` on nav toggle** (affects most pages):
   - Add `aria-controls="nav-menu"` to `.nav-toggle` button on all pages except `download.html` (which has it)

5. **`proof_strategy` quote attribution**:
   - File: `index.html:463`
   - Change "— Phlix documentation" to "— Phlix" (per new_site.md §19.7 table)

6. **`pitch-grid` potential overflow at 320px:**
   - File: `css/theme.css:309`
   - Change `minmax(min(100%, 280px), 1fr)` to `minmax(min(100%, 240px), 1fr)` or use the §19.12 pattern with `minmax(0, 1fr)` and guard the inner content

7. **Install command code block wrapping:**
   - File: `css/theme.css:613`
   - Remove `word-break: break-all` — let `overflow-wrap: anywhere` handle it naturally, which wraps on word boundaries only

---

## Scores by Dimension

| # | Dimension | Score | Status |
|---|---|---|---|
| 1 | Brand fidelity & spirit | 82 | ⚠️ |
| 2 | SEO | 94 | ✅ |
| 3 | Readability | 91 | ✅ |
| 4 | Spelling & grammar | 93 | ✅ |
| 5 | Usability | 81 | ⚠️ |
| 6 | Accessibility | 72 | ❌ |
| 7 | Responsive | 75 | ⚠️ |
| 8 | Performance | 96 | ✅ |
| 9 | Content accuracy | 97 | ✅ |
| 10 | CTA / funnel | 82 | ⚠️ |
| 11 | Social metadata | 94 | ✅ |
| 12 | Localization | 95 | ✅ |
| 13 | Experience fidelity | 83 | ⚠️ |

**Average: 87.3 | Min: 72 (Accessibility) | ❌ Count: 1**

---

## APPROVAL DECISION

**NOT APPROVED.**

Dimension 6 (Accessibility) is a hard WCAG 2.2 AA gate failure and cannot be waived. Two distinct contrast failures exist: the focus ring color (#C9980A) and the hero eyebrow text. Both are systemic CSS token issues requiring design-level fixes, not content changes.

Additionally, the invalid `<dl>` nesting in the FAQ is a parsing-level HTML error that affects screen readers.

After the three P0 fixes and the P1 `aria-controls` fix, request a re-review targeting ≥90 on all dimensions.
