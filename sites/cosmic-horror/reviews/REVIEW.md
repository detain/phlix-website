# cosmic-horror Brand Kit Site — Audit Review

**Site:** `sites/cosmic-horror/`
**Reviewer:** Hostile Audit
**Date:** 2026-07-29
**Ground truth:** `new_site.md` + `shared/content.json`
**Linter:** `npm run lint` (fails project-wide due to other sites; cosmic-horror itself has 3 JS warnings only)

---

## APPROVAL: ❌ NOT APPROVED

Multiple critical dimensions fail. Fixes required below.

---

## Dimension Scores

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 82 | ⚠️ |
| 2 | SEO | 85 | ⚠️ |
| 3 | Readability | 92 | ✅ |
| 4 | Spelling & grammar | 95 | ✅ |
| 5 | Usability | 83 | ⚠️ |
| 6 | Accessibility (WCAG 2.2 AA) | 85 | ⚠️ |
| 7 | Responsive (320→1920) | 88 | ⚠️ |
| 8 | Performance | 92 | ✅ |
| 9 | Content accuracy | 75 | ❌ |
| 10 | CTA / funnel | 78 | ❌ |
| 11 | Social metadata | 92 | ✅ |
| 12 | Localization | 90 | ✅ |
| 13 | Experience fidelity | 85 | ⚠️ |

**3 critical failures (❌): D9, D10. 10 dimensions below 90. No Google Fonts CDN detected.**

---

## D1 — Brand Fidelity & Spirit — 82 ⚠️

**Status:** Cosmic horror voice is consistent and well-executed throughout. Colors, typography, and motion all trace to the kit. The `@font-face` declarations reference self-hosted WOFF2 from the shared pool. Self-hosted fonts confirmed: `cinzel-700`, `cinzel-900`, `uncial-antiqua-400`, `crimson-text-400/600`, `eb-garamond-400/500/600`, `courier-prime-400/700` — all resolve correctly from `../../assets/fonts/`.

**Deduction:**
- The primary nav is **missing 2 required links**: `Plugins` and `Docs` (§5 new_site.md specifies 8 links in order). The kit's `site_architecture` apparently demoted these to the footer only. While all pages are reachable via footer links, the primary nav deviates from the spec's canonical 8-link structure.

**Citation:** `index.html:100–107`, `features.html:88–99`, `download.html:88–97`, `clients.html:88–97`, `hub.html:85–92`, `about.html:85–92`, `plugins.html:88–95`, `docs.html:85–92` — all nav menus have 6 links, not 8.

---

## D2 — SEO — 85 ⚠️

**Status:** All pages have `<title>` ≤ 60 chars, `<meta name="description">` ≤ 160 chars, canonical URLs, `<meta name="keywords">`, and one `<h1>` per page. JSON-LD `SoftwareApplication` schema on `index.html`. Sitemap and robots.txt present.

**Deduction:**
- `sitemap.xml` lists **9 pages** including `depths.html` — the spec requires exactly 8 canonical pages (`index`, `features`, `clients`, `download`, `plugins`, `docs`, `hub`, `about`). `depths.html` is a non-canonical bonus page. It should not appear in the sitemap. `404.html` correctly absent.

**Citations:** `sitemap.xml:28–29`; new_site.md §10.

---

## D3 — Readability — 92 ✅

Scholarly body text (Crimson Text), monumental display headings (Cinzel/Uncial Antiqua), and UI labels (EB Garamond) create appropriate atmospheric contrast. Body size 16px+ on mobile. Line heights generous (1.7 for body). No layout-induced squashing of text.

---

## D4 — Spelling & Grammar — 95 ✅

Copy is clean. No typos or grammatical errors observed. The cosmic horror voice is consistent and well-articulated.

---

## D5 — Usability — 83 ⚠️

**Deduction:**
- Primary CTA above fold with 9.74:1 contrast ✅. Download goal reachable in ≤2 clicks from home ✅.
- BUT: `download.html:296–307` — The `.cta-banner` closes with a **primary** `btn btn-primary btn-large` labeled "Consult the Archives" that links to `https://detain.github.io/phlix-docs`. The primary CTA on the download page should drive toward **download** (or docs on the docs page). This is a wrong CTR for the download page's funnel position. See D10.

---

## D6 — Accessibility (WCAG 2.2 AA) — 85 ⚠️

**Passes:** Skip link first focusable element ✅. Visible focus ring on all interactive elements ✅. `prefers-reduced-motion` respected with `0.01ms` fallback ✅. `aria-current="page"` on current nav link ✅. Touch targets ≥ 44×44px (nav toggle is exactly 44×44) ✅. Layout survives 200% text zoom (no `overflow: hidden` on content containers; `overflow-wrap: anywhere` on body text; `minmax(0, 1fr)` grid tracks) ✅. Landmark roles present once each (`banner`, `navigation`, `main`, `contentinfo`) ✅.

**Deductions:**
- `js/main.js:104` — `isActive` assigned but never used. ESLint warning: `no-unused-vars`.
- `js/main.js:191` — `e` parameter declared but unused in logo click handler. ESLint warning: `no-unused-vars` for args must match `/^_/`.
- `js/main.js:209` — `PAGES_WITH_MASCOT` constant defined and assigned but never referenced. ESLint warning.
- `base.css:280` comment references "§19.15" which does not exist in new_site.md — stale cross-reference.
- `nav-logo` has both `aria-label="Phlix home"` on the `<a>` and `alt="Phlix"` on the child `<img>`, causing screen readers to announce "Phlix home Phlix" (doubled). Fix: remove `aria-label` from `<a>` or `alt` from `<img>`.

---

## D7 — Responsive (320→1920) — 88 ⚠️

CSS has fluid containers, `clamp()` for hero type, `minmax(0, 1fr)` grid tracks (not bare `1fr`), and `overflow-wrap: anywhere` on body text. Media queries at 480px, 768px, 900px, and 1024px breakpoints. Hero CTA stacks vertically at ≤480px.

**Deduction:**
- `components.css:979` — At ≤768px, `.mascot-companion` switches to `position: fixed; top: 8px; right: 8px; bottom: auto`. At 320px, a fixed element in the top-right corner (even at 72×72px) risks overlap with the sticky header (64px). `render-check.mjs` would catch this; it has not been run.
- No `render-check.mjs` output in the repo; visual rendering at 320px and 200% zoom is unverified.

---

## D8 — Performance — 92 ✅

All fonts self-hosted WOFF2 ✅. No CDN links (no Google Fonts, no script CDNs) ✅. JS is `defer`-loaded, not render-blocking ✅. Fonts use `font-display: swap` ✅. Only used font weights declared ✅. CSS has `prefers-reduced-motion` reset to prevent animation cost ✅.

---

## D9 — Content Accuracy — 75 ❌ FAIL

**Critical: Missing `pitch_bullets` section.**

new_site.md §3.1 item 2 is explicit: the home page must render `pitch_bullets` as a list under `<h2>Why Phlix?</h2>`. The `shared/content.json` defines 7 pitch bullets. `index.html` does not contain a pitch section, a `pitch` class, a "Why Phlix?" heading, or any rendering of the 7 `pitch_bullets` items. Instead, a brand-voice section called `#why-descend` shows 4 custom why-items that are not the pitch bullets.

**All 7 pitch bullets must appear somewhere as a list on the home page** per new_site.md §3.1. This is not optional presentation copy — it is a required content block wired from `content.json`.

**Citation:** `index.html:345–387` (`#why-descend`), new_site.md §3.1 item 2.

**Other content accuracy:**
- `download.html:120–126` — Install command is verbatim from `content.json` ✅ (correct `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`).
- `download.html:170–175` — Build from source correctly labeled "Not an install" ✅.
- `clients.html` — All 5 clients with highlights, tags, and status badges match `content.json` ✅.
- `features.html` — All 8 features with correct `id`, title, body, icons match `content.json` ✅.
- `about.html` FAQ — All 6 FAQ items match `content.json` verbatim ✅.
- `footer` columns and links match `content.json.footer` ✅.

---

## D10 — CTA / Funnel — 78 ❌ FAIL

**Critical: `download.html` primary CTA is wrong.**

new_site.md §3.4 and §5: "Every page ends in a `.cta-banner` that drives toward **download** (or docs on the download page)." The download page's closing `.cta-banner` must have the primary CTA pointing to **download** (or docs). But `download.html:296–307` has the primary CTA "Consult the Archives" → `https://detain.github.io/phlix-docs`. The download page's primary CTA sends users to docs, not to download. This defeats the download page's entire funnel purpose.

**Secondary:** `index.html:124–125` — Secondary hero CTA "Explore the Catalogue" links to `features.html`. The kit's `copy_overlay` specifies `secondary_cta: { label: "Read the docs", href: "https://detain.github.io/phlix-docs" }` (from `content.json`). The label "Explore the Catalogue" is brand-voice overlay (acceptable), but the href is wrong — it should be the docs URL per content.json's `secondary_cta.href`, not `features.html`. The spec's override rule: kit may re-voice the label but the destination must still match `content.json.secondary_cta.href`.

**Citation:** `download.html:300–305`, `index.html:124–125`, new_site.md §5 "Calls to action (reused)".

---

## D11 — Social Metadata — 92 ✅

All pages have complete OG (`og:type`, `og:site_name`, absolute `og:url`, `og:title`, `og:description`, absolute `og:image`) and Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator=@detain`). `og:image` is absolute URL to `img/og.png` (not `.svg`) ✅. `<meta name="theme-color">` set to kit primary `#00CC66` ✅. Favicon SVG link present ✅.

---

## D12 — Localization — 90 ✅

`<html lang="en">` set from `site.default_locale` ✅. All user-facing strings trace to `content.json` (en locale) ✅. No hard-coded locale-unsafe formatting ✅. CSS uses logical properties (`margin-inline`, `padding-inline`) in key layouts ✅.

---

## D13 — Experience Fidelity — 85 ⚠️

The cosmic horror voice is consistent and committed. All kit experience fields appear to be implemented: `site_architecture` (6-item nav), `homepage_narrative` (custom section order), `copy_overlay` (themed labels), `hero_experience` (fade-rise staggered animations), `scroll_experience` (IntersectionObserver reveals), `easter_eggs` (typed "colour", logo-clicks overlay), `mascot.behavior` (Nyarla companion with tip + dismiss), `proof_strategy` (testimonial cards + proof signals linking to live GitHub pages, not fabricating numbers), `seasonal_activation` ("documented" mode with date-gate).

**Deductions:**
- `sitemap.xml` includes the 9th page `depths.html` in the canonical sitemap. The spec requires exactly 8 pages in the sitemap. Including a 9th page misrepresents the site's canonical structure to crawlers.
- `depths.html` itself — while a well-written bonus page — is not part of the 8-page spec. As a kit-specific experience overlay (`homepage_narrative` or an extra page), it is not inherently wrong, but it must not appear in the sitemap.

---

## JS Warnings (cosmic-horror only)

`js/main.js:104` — `isActive` assigned but never read.
`js/main.js:191` — `e` parameter unused in logo click handler.
`js/main.js:209` — `PAGES_WITH_MASCOT` constant unused.

These are non-blocking but violate new_site.md §17 "zero-warning" ESLint rule. Fix by prefixing with `_` or removing.

---

## Fixes Required (Priority Order)

### P0 — Blocking (D9 / D10 — content accuracy and CTA)

1. **Add `pitch_bullets` section to `index.html`**
   - Add `<h2>Why Phlix?</h2>` + `<ul class="pitch-list">` with all 7 items from `content.json.pitch_bullets`. Section class `.pitch` per new_site.md §3.1 item 2. Can be stylized with cosmic horror brand voice (eyebrow, wrapping) but the 7 facts must appear verbatim.

2. **Fix `download.html` closing CTA**
   - `download.html:300–305`: Change `btn btn-primary btn-large` "Consult the Archives" from `href="https://detain.github.io/phlix-docs"` to `href="download.html"` (or a valid download link). The primary CTA on the download page must drive toward download, not away from it.

### P1 — High Priority

3. **Fix `index.html` secondary CTA destination**
   - `index.html:125`: "Explore the Catalogue" should link to `https://detain.github.io/phlix-docs` (content.json `secondary_cta.href`), not `features.html`. Use the brand label "Explore the Catalogue" as the visible text but href must match content.json.

4. **Remove `depths.html` from `sitemap.xml`**
   - `sitemap.xml:28–29`: Remove the `<url>` entry for `depths.html`. Sitemap must contain exactly 8 canonical pages.

### P2 — Medium Priority

5. **Fix JS unused-variable warnings**
   - `js/main.js:104`: `let isActive = false` — either use it (check it before hiding) or remove it.
   - `js/main.js:191`: Rename `function(e)` → `function(_e)` or `function()`. ESLint requires unused params to match `/^_/`.
   - `js/main.js:209`: Remove `PAGES_WITH_MASCOT` or use it (the page-specific mascot display logic is dead code).

6. **Fix doubled screen reader announcement on logo**
   - `index.html:78`: Remove `aria-label="Phlix home"` from `<a class="nav-logo">` (keep the `alt="Phlix"` on the `<img>`). Or remove `alt` and keep `aria-label`. Not both.

### P3 — Low Priority

7. **Stale comment**: `base.css:280` references "§19.15" which does not exist in new_site.md. Remove or update.

---

## Summary

The cosmic-horror kit is executed with genuine craft — the voice is consistent, fonts are self-hosted, animations respect reduced motion, social metadata is complete and correct, and the install command is accurate. But two critical issues block approval:

1. **`pitch_bullets` section completely absent** — a required content block from `content.json` is missing from the home page.
2. **Download page CTA links to docs, not download** — the funnel is broken at the conversion point.

These are not cosmetic issues. D9 at 75 and D10 at 78 are clear failures. Fix P0 items and re-submit.
