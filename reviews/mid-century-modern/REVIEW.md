# REVIEW — mid-century-modern brand kit site

**Reviewer:** hostile automated audit
**Date:** 2026-07-29
**Ground truth:** `new_site.md`, `shared/content.json`

---

## Summary

**NOT APPROVED.** Two hard ❌ failures (content accuracy — client count, social metadata — twitter:creator) and one ⚠️ (lint JS warning for this site) must be resolved before the score can reach 90.

---

## 1. Brand fidelity & spirit — Score: 88 ⚠️

**Verdict:** Mostly faithful with one voice drift.

- Warm-dark palette (#111008 charcoal-evening, #1A1710 ebony-wood) correctly applied as the only backgrounds ✅
- Atomic teal (#00AFAF) used as the consistent brand anchor ✅
- Sunburst yellow (#F2B705) correctly reserved for primary CTAs ✅
- Atomic coral (#E8543C) used sparingly as accent ✅
- Typography follows kit: Josefin Sans headlines, Libre Baskerville body, Bebas Neue display, IBM Plex Mono — all self-hosted ✅
- Mid-century modern geometric motifs (sunburst rays, rocket SVG mascot, boomerang accents, teal rule lines) present ✅
- `overflow-wrap: anywhere` correctly applied to body text per §19.12 ✅
- `minmax(0, 1fr)` grid tracks used correctly (not bare `1fr`) ✅
- CSS `@copyright` comment: NOT a parse-breaking bare ` * @copyright` outside a block — **PASS** (`base.css:2`, `theme.css:2`, `components.css:2` are all inside `/* */` blocks)

**Deduction:**
- Hero eyebrow ("Self-hosted. Always forward.") is a custom brand-flavored overlay but is tonally slightly muted vs. the kit's "Optimistic, Clean, Sophisticated" voice which the rest of the page delivers better — not a fail, acceptable presentation override.

**Reference:** `brand-kits/mid-century-modern.js:222–374` (colors), `brand-kits/mid-century-modern.js:390–448` (typography)

---

## 2. SEO — Score: 85 ⚠️

**Verdict:** Core tags present. One issue: JSON-LD only on home page.

- `<title>` on every page — home: "Phlix — The Future Was Always Now" (≤60 chars ✅), other pages: "Page — Phlix Mid-Century Modern" ✅
- `<meta name="description">` ≤160 chars on all pages ✅
- `<meta name="keywords">` absent — spec says "from `meta.keywords`" but `meta.keywords` in content.json is present and not emitted. Not a hard spec requirement per new_site.md §10, but it is listed.
- `<link rel="canonical">` absolute on every page ✅
- One `<h1>` per page ✅; heading hierarchy intact ✅
- Descriptive anchor text (no "click here") ✅
- **JSON-LD**: present on `index.html` ✅ — but absent on all other 8 pages. new_site.md §10 says "Each site ships its own" (singular), and §18 gate says "all 8 pages + 404.html" exist and pass — implies each page should have meta. This is a gap: JSON-LD should be on all pages, not just home.
- `sitemap.xml` ✅ — 8 canonical pages, absolute URLs, 404 excluded, matches robots.txt ✅
- `robots.txt` ✅ — references sitemap

**Deduction:** JSON-LD missing on 8 of 9 pages. Content is accurate so SEO impact is moderate.

---

## 3. Readability — Score: 94 ✅

**Verdict:** Strong. One minor noise issue.

- Body font (Libre Baskerville) at 1rem/1.7 line-height ✅
- Heading line-heights 1.1 with tracking ✅
- Max-width containers (1400px max-width, 1100px content-width) ✅
- No centered long body copy blocks ✅ (left-aligned throughout)
- Code blocks have `overflow-x: auto` ✅
- `word-break: break-word` on headings via `overflow-wrap: break-word` ✅
- `::selection` uses primary teal ✅
- Custom scrollbar styled to brand ✅

**Deduction:** `a:focus-visible` uses `border-radius: var(--radius-sm)` which gives a small rounding on what is a focus ring — not harmful but slightly unusual. Acceptable.

---

## 4. Spelling & grammar — Score: 100 ✅

**Verdict:** No errors detected.

- All visible text reviewed — no spelling mistakes, no grammar issues
- Content accurately copied from content.json (install command, FAQ answers, pitch bullets, feature bodies)
- The brand's "space-age" vocabulary (orbit, launch, mission control) used consistently and correctly

---

## 5. Usability — Score: 82 ⚠️

**Verdict:** Strong structure, two issues.

- Download goal reachable in ≤2 clicks from home (nav → Download or hero CTA → download.html) ✅
- Primary CTA above fold ✅
- Contrast on primary CTA (yellow on dark): ~10:1 PASSES AAA ✅
- Mobile hamburger nav functional ✅
- `prefers-reduced-motion` respected in JS and CSS ✅
- `scroll-behavior: smooth` on html ✅
- Smooth scroll for anchor links ✅

**Deductions:**
- **Mascot (`display:none` inline)**: `index.html:519` — `<div class="mascot" aria-hidden="true" style="display:none;">` — the mascot is hard-coded `display:none` in the HTML but the JS `initMascot()` never sets it to `display:block`. This means the mascot never appears at all, defeating its purpose in the brand kit's `mascot.behavior` spec. The JS checks `localStorage` for dismissal but the element is already hidden and JS never unhides it. This is a broken feature, not just a missing enhancement.
- **`initCTALadder` unused**: `js/main.js:300` — function defined but never called. Dead code.
- All 8 nav links present on every page ✅; nav order: Home, Features, Clients, Download, Hub, Plugins, Docs, About — matches spec §5 exactly ✅

---

## 6. Accessibility (WCAG 2.2 AA, prefers-reduced-motion, 44px targets, 200% zoom) — Score: 91 ✅

**Verdict:** Solid baseline. One issue.

- Skip link first focusable element ✅; visible on focus ✅; targets `#main-content` ✅
- All landmarks present once: `role="banner"`, `role="navigation"` (×2: nav-primary + nav-mobile), `role="main"`, `role="contentinfo"` ✅
- `aria-current="page"` on active nav link ✅
- `aria-expanded` kept in sync on mobile nav toggle ✅
- `aria-label` on all icon-only buttons ✅
- Images: `alt` present on logo (decorative child has `aria-hidden="true"` SVG) ✅; decorative SVGs have `aria-hidden="true"` ✅
- Focus rings: 2px solid `var(--color-focus)` with 2px offset on all interactive elements ✅
- `prefers-reduced-motion`: CSS reset in `base.css:314–321` + JS check in `main.js:20–22` + `main.js:28` early return ✅
- Touch targets: nav links are 64px tall (≥44px ✅); buttons padding gives equivalent ✅; mobile nav links ≥44px ✅
- Layout at 200% zoom: `overflow-wrap: anywhere` on body text, `minmax(0,1fr)` grid tracks, no fixed-px layout widths ✅
- Contrast ratios:
  - Cream (#F5EFE8) on charcoal-evening (#111008): ~17:1 PASSES AAA ✅
  - Yellow (#F2B705) on charcoal (#111008): ~10:1 PASSES AAA ✅
  - Teal (#00AFAF) on charcoal: ~8.5:1 PASSES AA ✅ (per kit spec §21: large text passes)
  - Body neutral (#8C7B6A) on surface: ~4.5:1 borderline AA — acceptable for secondary text
  - Teal on ebony-wood: ~5.3:1 PASSES AA ✅
  - Primary CTA text (#111008) on yellow: ~10:1 PASSES AAA ✅

**Deduction:**
- FAQ accordion uses `display:none`/`display:block` toggling without `aria-expanded` on the question button. The button lacks `aria-expanded` — WCAG 4.1.2 violation. Per-failure impact: minor (the content is accessible via sight, keyboard works, just no ARIA state).

---

## 7. Responsive (320→1920) — Score: 88 ⚠️

**Verdict:** Good foundation with one structural risk.

- Fluid grid via `minmax(0, 1fr)` ✅ (no bare `1fr` in grid tracks)
- `clamp()` for all type scales ✅
- Mobile breakpoint at 768px (nav-primary hides, toggle appears) ✅; 900px (as used in `components.css:170`) — minor discrepancy between spec statement (768) and actual breakpoint (900) but not causing visible issues
- `@media (prefers-reduced-motion: reduce)` for reveals ✅
- `.grid--2/3/4` collapse to 1 column at 768px ✅
- `.grid--4` goes to 2-column at 1024px ✅
- Footer 3-column → 1-column at 768px ✅
- Footer nav 3-column → 2-column at 600px ✅

**Deduction:**
- **Fixed FAB button**: `components.css:433–457` — `.btn--fab` is `position: fixed; bottom: var(--space-8); right: var(--space-8);` — at 320px viewport, a 56×56 fixed element in the bottom-right corner can overlap the primary CTA or be in the way. The spec §19.11 explicitly requires checking fixed elements at 320px. The FAB appears only on pages where the mascot is shown (Home, Download, About) per brand kit. `render-check.mjs` is the required tool — not verified here, so marking as ⚠️.
- Component-level `@media (width <= 480px)` patches at `components.css:1001–1050` attempt to prevent overflow; the `!important` overrides suggest known prior issues.

---

## 8. Performance (self-hosted fonts, no CDNs) — Score: 100 ✅

**Verdict:** Perfect. Zero external requests.

- No `fonts.googleapis.com` links anywhere — confirmed via grep across all HTML ✅
- No `fonts.gstatic.com` links ✅
- No CDN script tags (no analytics, no third-party JS) ✅
- All fonts self-hosted WOFF2 in `shared/assets/fonts/` ✅; referenced via `../../assets/fonts/` path from CSS ✅
- All `@font-face` have `font-display: swap` ✅
- `js/main.js` is `defer`-loaded ✅
- No render-blocking scripts ✅
- Fonts loaded: Josefin Sans (400, 500, 600, 700), Bebas Neue (400), Libre Baskerville (400, 700), IBM Plex Mono (400, 600) — all weights match the kit's declared weights

---

## 9. Content accuracy (install from content.json) — Score: 62 ❌

**Verdict:** CRITICAL FAILURE. Client count error in 3 locations.

### ✅ Correct items

- **Install command** (download.html:115): `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash` — **exact match** to `content.json.install.primary.command` ✅. Label and description also match.
- **Install explanation** (download.html:108): description of what the install does — traced to `content.json.install.primary.what_it_does` ✅
- **Ecosystem items** (download.html:155–172): all 5 ecosystem links from `content.json.ecosystem[]` present with correct `what` descriptions ✅
- **All 8 features** present on features.html ✅ (library, syncplay, transcode, auth, livetv, dlna, plugins, hub)
- **FAQ** (about.html): all 6 questions from `content.json.faq[]` present with correct answers ✅
- **Footer columns** (all pages): 3 columns with correct headings and links from `content.json.footer.columns[]` ✅
- **License** (footer): correctly references MPL-2.0 per `content.json.footer.columns[2].links[3]` label "License (MPL-2.0)" ✅
- **Pitch bullets** on home: 3 of 7 shown (per `feature_casting.hero` opt-in — acceptable) ✅
- **Proof strategy**: GitHub repo links are real and verifiable ✅; quoted text from docs is verbatim ✅

### ❌ FAILURES

**1. Client count: "5 Native Clients" — THREE LOCATIONS**

new_site.md §19.14: "A kit says '5 native clients' (or any client/feature count) → **content.json wins on facts.** It is **four** native clients — Roku, Tizen, Windows, Mobile (beta) — **plus any DLNA device**. Two kits stated 5; both were wrong."

| Location | Claimed | Should be |
|---|---|---|
| `index.html:321` | `5 Native Clients` | 4 + any DLNA device |
| `index.html:363` | "5 Native clients — Roku, Samsung Tizen, Windows, Mobile, DLNA" | "4 native clients — Roku, Samsung Tizen, Windows, Mobile (beta) — plus any DLNA device" |
| `download.html:131` | "Five clients ready for deployment" | "Four native clients, plus any DLNA device" |

`content.json.clients[]` has 5 entries but the 5th is `id: "dlna"` with `name: "Any DLNA device"` and `repo: null` — DLNA is not a native client you "deploy." The spec is explicit: 4 native + DLNA. The site conflates the 5-client listing with 5 native clients.

**Reference:** `new_site.md:833` (§19.14), `shared/content.json:79–124`

---

## 10. CTA / funnel — Score: 85 ⚠️

**Verdict:** Functional with brand-flavored copy. One concern.

- Primary CTA (Download) visible above the fold on home ✅
- Primary CTA contrast ≥3:1 ✅
- Download reachable ≤2 clicks from home ✅
- All pages end in `.cta-banner` or equivalent funnel section ✅
- Closing CTA on features.html: "See All Eight Features" (→ features.html) ✅; on download: → docs ✅
- CTA button label on home: "Start the Launch Sequence" (custom brand overlay) — visible href is `download.html` which is honest ✅; per WCAG 2.5.3 the accessible name matches the action

**Deduction:**
- Custom CTA labels (not "Get Phlix"/"Read the docs") — acceptable as `copy_overlay` presentation copy but changes the canonical CTAs from the spec. Not a hard fail but worth noting.
- `initCTALadder` is dead code (`js/main.js:300`). The 3-step CTA ladder on home works but is CSS-only, not wired by JS. The dead function is a lint warning.

---

## 11. Social metadata (OG + Twitter, og:image PNG) — Score: 73 ❌

**Verdict:** CRITICAL FAILURE. Missing `twitter:creator` on all pages.

- **Open Graph**: `og:type=website`, `og:site_name=Phlix`, `og:url` (absolute), `og:title`, `og:description`, `og:image` (absolute URL to PNG) on all 9 pages ✅
- **og:image**: `img/og.png` exists ✅; all pages reference `https://detain.github.io/phlix-website/mid-century-modern/img/og.png` (absolute ✅)
- **og.svg** also present as source ✅
- **Twitter Card**: `twitter:card=summary_large_image` on all pages ✅
- `twitter:title` ✅, `twitter:description` ✅, `twitter:image` (absolute URL) ✅

### ❌ FAILURE

- **`twitter:creator=@detain`** — **missing from all 9 pages**. new_site.md §11 is explicit: "`twitter:creator=@detain`" is required in every page's `<head>`. Confirmed absent from index.html, download.html, about.html, features.html, clients.html, hub.html, plugins.html, docs.html, and 404.html.

**Reference:** `new_site.md:486`

---

## 12. Localization — Score: 94 ✅

**Verdict:** Well-structured.

- `<html lang="en">` on all pages ✅ (matches `site.default_locale`)
- All user-facing strings trace back to `content.json` ✅
- Logical CSS properties used (`margin-inline`, `inset`, etc.) ✅
- Fonts subset to Latin ✅
- `direction: ltr` implicit (LTR site) ✅

**Deduction:** `shared/content.json` only has `en` in `supported_locales: ["en"]`. The site is English-only, which is correct given no translations exist. No i18n infrastructure is needed. Not a failure.

---

## 13. Experience fidelity — Score: 92 ✅

**Verdict:** Strong mid-century modern translation with one broken feature.

- Full-bleed dark charcoal ground throughout ✅
- Atomic teal + sunburst yellow + coral on dark warm ground — coherent atomic age palette ✅
- Saul Bass-inspired flat geometric illustration (rocket SVG) in hero ✅
- Bebas Neue display numerals ✅
- Sunburst radial glow decorations on cards ✅
- Teal-glow card hover states ✅
- Orbital ring loading/animation motif ✅
- Warm mechanical transitions (200–350ms, `cubic-bezier(0.4, 0.0, 0.2, 1)`) ✅
- Mascot "Orbit" (rocket) defined in brand kit ✅
- Seasonal variant system (`initSeasonal()` in `main.js:117–136`) with live-js date gate ✅

**Deduction:**
- **Mascot is non-functional**: `index.html:519` has `style="display:none;"` hard-coded. The JS `initMascot()` never sets `display:block`. Result: the mascot never appears. The `mascot.behavior.spec` in the brand kit calls for "Bottom-right corner as a small hovering rocket; appears on Home, Download, and About pages." This is a broken opt-in feature.

---

## Lint status

**`npm run lint` — FAILS** (exits with code 1 due to 41 errors across the full project).

For mid-century-modern specifically:
- `js/main.js:300:12` — warning: `'initCTALadder' is defined but never used` — only a **warning**, not an error. The lint config allows unused vars matching `/^_/` but this one doesn't match that pattern.

The full lint run includes 41 errors and 118 warnings across all sites. While this site's JS has only a warning (not an error), `npm run lint` as a project-wide gate fails, and new_site.md §18 requires it to "pass clean."

**Reference:** `npm run lint` output, `sites/mid-century-modern/js/main.js:300`

---

## Dimension scores

| # | Dimension | Score | Status |
|---|---|---|---|
| 1 | Brand fidelity & spirit | 88 | ⚠️ |
| 2 | SEO | 85 | ⚠️ |
| 3 | Readability | 94 | ✅ |
| 4 | Spelling & grammar | 100 | ✅ |
| 5 | Usability | 82 | ⚠️ |
| 6 | Accessibility | 91 | ✅ |
| 7 | Responsive | 88 | ⚠️ |
| 8 | Performance | 100 | ✅ |
| 9 | Content accuracy | 62 | ❌ |
| 10 | CTA / funnel | 85 | ⚠️ |
| 11 | Social metadata | 73 | ❌ |
| 12 | Localization | 94 | ✅ |
| 13 | Experience fidelity | 92 | ✅ |

**Average: 87.2 — below 90 threshold**

---

## Fixes required (must resolve all ❌ before re-review)

### P0 — Content Accuracy ❌

1. **`index.html:321`** — Change "5 Native Clients" to "4 Native Clients + DLNA" in the stats grid
2. **`index.html:363`** — Change "5 Native clients — Roku, Samsung Tizen, Windows, Mobile, DLNA" to "4 native clients — Roku, Samsung Tizen, Windows, Mobile (beta) — plus any DLNA device" in the proof card
3. **`download.html:131`** — Change "Five clients ready for deployment" to something like "Four native clients, plus any DLNA device" or "Native apps + DLNA"

**Rule to apply:** new_site.md §19.14: `content.json` wins on facts. Four native clients (Roku, Samsung Tizen, Windows, Mobile beta) + DLNA as a protocol/device category. Never "5 native clients."

### P0 — Social Metadata ❌

4. **All 9 HTML pages** — Add `<meta name="twitter:creator" content="@detain" />` to every `<head>`, immediately after the other `twitter:` meta tags. Required by new_site.md §11.

### P1 — Usability

5. **`index.html:519`** (`mascot` div) — Remove `style="display:none;"` from the mascot element so `initMascot()` can show it. The current HTML hard-codes it hidden, making the JS ineffective. Either remove the inline style and let JS control visibility, or remove the mascot HTML and JS entirely (per §19.9: absence of an opt-in feature is not a defect, but a broken implementation of an opt-in is).

### P1 — Lint

6. **`js/main.js:300`** — Either call `initCTALadder()` in the `init()` function, or remove the dead function. A warning is blocking the zero-warning lint gate.

### P2 — SEO

7. **All 8 non-home pages** — Add JSON-LD `SoftwareApplication` block to `<head>`. new_site.md §10: "JSON-LD block on the home page" was the minimum spec, but the §18 gate implies all pages should validate. Adding it to all pages closes the ambiguity.

### P2 — Accessibility

8. **FAQ accordion buttons** (`about.html`, `.faq-item__question`) — Add `aria-expanded="true/false"` toggled by JS, and `aria-controls` pointing to the answer `div`. Current accordion only toggles `is-open` class; no ARIA state.

---

## APPROVAL DECISION

**NOT APPROVED.**

All 13 dimensions must score ≥90 with no ❌ for APPROVAL. This site has:
- ❌ Dimension 9 (Content accuracy): 62 — client count error in 3 locations
- ❌ Dimension 11 (Social metadata): 73 — `twitter:creator` missing from all pages

Fix the P0 items (client count + twitter:creator) and re-submit.
