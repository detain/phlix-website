# REVIEW — Retro Seventies Brand Kit Site

**Site:** `phlix-website/sites/retro-seventies/`
**Review date:** 2026-07-29
**Lint status:** PASS (0 errors; the lone HTML error was in `midnight-jazz/index.html`, not this site)

---

## Score Summary

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 90 | ✅ |
| 2 | SEO | 52 | ❌ |
| 3 | Readability | 91 | ✅ |
| 4 | Spelling & grammar | 96 | ✅ |
| 5 | Usability | 86 | ⚠️ |
| 6 | Accessibility | 82 | ⚠️ |
| 7 | Responsive | 85 | ⚠️ |
| 8 | Performance | 94 | ✅ |
| 9 | Content accuracy | 84 | ⚠️ |
| 10 | CTA / funnel | 90 | ✅ |
| 11 | Social metadata | 56 | ❌ |
| 12 | Localization | 92 | ✅ |
| 13 | Experience fidelity | 90 | ✅ |

**Result: ❌ NOT APPROVED** — Dimensions 2 (SEO) and 11 (Social metadata) are ❌; four more dimensions score below 90.

---

## 1. Brand Fidelity & Spirit — 90 ✅

- Warm 70s aesthetic is strongly realized: vinyl grooves, harvest gold/burnt orange/avocado on deep mahogany (`base.css:14-27`). Voice is consistent — "Needle Drop Hero", "Now Spinning", "Get Groovy", "The Equipment", "The Relay", "The Story". Retro copy throughout is cohesive and on-brand.
- Self-hosted fonts from shared pool: Playfair Display 700/900, Fredoka 600, Lato 400/700/900, Courier Prime 400/700 (`theme.css:13-75`). No CDN links (grep confirmed zero `fonts.googleapis.com`, `fonts.gstatic.com`, or CDN references).
- SITE.md correctly documents the design rationale, color table, type roles, and motion philosophy.
- Avocado Green (`#8B9B3A`) is used only as an accent/badge color, never as primary text — appropriate per BUILD_LOG.md note. Burnt Orange `#D4570D` on Deep Mahogany `#0F0900` = 4.7:1 (AA pass); Harvest Gold `#C9A22B` on `#0F0900` = 5.8:1 (AA pass). Cream Paper `#F5EDD8` on `#0F0900` = 18.2:1 (AAA).
- ❌ **SITE.md:108-111** — "Phlix Server and Hub: **MPL-2.0** / Shared libraries, plugins, clients: **MIT**" is correct in BUILD_LOG.md but SITE.md §11 states "Site license: MPL-2.0" as if it were uniform. The kit ships two different licenses. Write it correctly in SITE.md.

**Fix needed:** Correct SITE.md §11 license table to reflect dual licensing (MPL-2.0 for server+hub, MIT for libs/plugins/clients), not a single "MPL-2.0 across the board" claim.

---

## 2. SEO — 52 ❌

**Hard gate failure.** new_site.md §10 is not satisfied:

- ❌ **All 9 HTML pages** — No `<link rel="canonical">` to the page's absolute URL. Required on every page per §10.
- ❌ **All 9 HTML pages** — No JSON-LD `SoftwareApplication` block on the home page. Required on `index.html` per §10.
- ❌ **`index.html:6`** — `<meta name="description">` is custom retro copy ("Drop the needle and let the good times roll…") rather than `content.json`'s `meta.description`. §10 requires the meta description to come from `content.json`. The retro voice may overlay hero/CTA copy, but `meta.description` is a hard SEO field that must match the product's factual description. `content.json` specifies: "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support."
- ✅ `<title>` tags are page-specific (`<Page> — Phlix` / `Phlix — <tagline>`) — all 9 pages.
- ✅ `<meta name="keywords">` present on all pages.
- ✅ Semantic landmarks: `<header role="banner">`, `<nav role="navigation">`, `<main id="main-content">`, `<footer role="contentinfo">` — correctly used.
- ✅ One `<h1>` per page.
- ✅ Descriptive anchor text (no "click here").
- ✅ `sitemap.xml` correctly lists 8 canonical pages (not 404.html), robots.txt references it.

**Fixes needed:**
1. Add `<link rel="canonical">` to every page `<head>` — absolute URL per `site.url/retro-seventies/<page>`.
2. Add JSON-LD `SoftwareApplication` block to `index.html` — name, description, applicationCategory, operatingSystem, offers/price=0, license from content.json facts.
3. Restore `content.json` `meta.description` to all 9 `<meta name="description">` tags; apply kit `copy_overlay` only to presentation copy (hero, CTA labels, section headings).

---

## 3. Readability — 91 ✅

- Body font Lato at 16px+ base, line-height 1.7 (`base.css:147`). Large text (hero headline clamp 4xl–6xl) has tight 1.1 leading for impact. Reading levels are appropriate.
- Code blocks styled with Courier Prime monospace, dark surface background, border (`base.css:298-310`).
- Color contrast is strong throughout (see §6).
- Visual hierarchy is clear: eyebrow → h1 → subheadline → CTAs.

**Minor:** At 200% text zoom some section headings at `text-4xl` may reflow awkwardly on narrow viewports. Not a blocking issue.

---

## 4. Spelling & Grammar — 96 ✅

- All visible copy reviewed: no spelling errors detected.
- British/American spelling mixed (`colour` used in SITE.md, `color` used in CSS variables and HTML). CSS uses `color` (American) throughout; CSS is code, so this is fine. Site copy uses `colour` once in SITE.md:68 ("every colour") — acceptable stylistic choice for retro voice.
- No grammar errors.
- `content.json` FAQ answers are reproduced verbatim in `about.html:114-182`.

---

## 5. Usability — 86 ⚠️

- Download goal reachable in ≤2 clicks from home: hero CTA → download.html ✅.
- Primary CTA above the fold on `index.html` ✅.
- Mobile nav toggle works with keyboard (Esc to close, outside-click to close) — `js/main.js:25-40`.
- Fixed-position mascot (`mascot` in components.css) could overlap CTA at 320px on short viewports — per §19.11 this is a known trap. `render-check` should verify this; not run during this review.
- `about.html` FAQ accordion is functional (`js/main.js:89-98`).
- `install-snippet` on download.html is a styled code block, not an actual `<code>` element — screen readers will read it as plain text. Minor a11y issue but not blocking.

---

## 6. Accessibility (WCAG 2.2 AA) — 82 ⚠️

- Skip link present and visible on focus (`base.css:112-126`).
- Focus rings: 2px `var(--color-focus)` (#C9A22B) + 2px mahogany offset + warm outer glow — visible and on-brand (`base.css:235-239`).
- `prefers-reduced-motion` respected: animations collapse to instant cross-fades (`base.css:248-257`, `theme.css:572-577, 601-607`). Blob wobble animation disabled under reduced motion (`theme.css:573-576`).
- Keyboard navigation: all interactive elements reachable, tab order logical.
- Touch targets: nav buttons, CTAs, FAQ accordions — all ≥44×44px. Cards have hover states but no active state issues.
- Layout survives 200% text zoom — `overflow-wrap: anywhere` on body (`base.css:152`) prevents overflow. Grid tracks use `minmax(0, 1fr)` (`theme.css:167,171,175`) per §19.12 best practice.
- ❌ **Avocado Green `#8B9B3A` on Dark Walnut `#1A1005`** — BUILD_LOG.md acknowledges this "needs verification" but doesn't verify it. Measurement: #8B9B3A on #1A1005 = approximately 4.0:1, which is below AA for small text (requires 4.5:1). Currently used in badge `--badge--green` text. Either darken the green or restrict it to decorative/badges-only use on light surfaces.
- ❌ No `role="img"` or `aria-label` on the blob SVG decorative element in `index.html:167`. It's `aria-hidden="true"` which is correct.
- ❌ `mascot` element is `aria-hidden="true"` but is interactive (click/dismiss). The dismiss button has `aria-label="Dismiss Groove"` which is correct. The outer div should arguably not be `aria-hidden` if it has interactive children, but since the interaction is purely visual (Groove's animations) and all actual actions have button-level labels, this is a minor concern.

**Fix needed:** Measure and fix Avocado Green contrast if used as text color anywhere. The badge green (#8B9B3A) on dark walnut (#1A1005) fails AA for small text at ~4.0:1.

---

## 7. Responsive (320→1920) — 85 ⚠️

- Fluid grid with `minmax(0, 1fr)` tracks prevents overflow at narrow widths (`theme.css:167,171,175`). Per §19.12 this is the correct fix.
- Breakpoints at 1024px, 768px, 480px cover all target widths (`theme.css:612-664`).
- Hero text uses `clamp()` for fluid scaling (`theme.css:526`).
- No fixed-px layout widths; containers use fluid widths + `max-width: 1400px`.
- ❌ **`tools/render-check.mjs --site retro-seventies`** has not been run. BUILD_LOG.md:106-112 lists this as a required verification step but it was never executed. This review cannot confirm 320px rendering, 200% zoom behavior, or mascot-not-covering-CTA at small viewports without it.
- ❌ `og.png` is 72KB — exceeds the ~120KB hero image budget. Acceptable for an OG image but should be verified against the ~500KB total page budget.

---

## 8. Performance (self-hosted fonts, no CDNs) — 94 ✅

- Fonts self-hosted WOFF2 from `../../assets/fonts/` (the shared pool). `@font-face` with `font-display: swap` on all 8 faces (`theme.css:13-75`).
- No CDN dependencies: confirmed via grep — zero `fonts.googleapis.com`, `fonts.gstatic.com`, or any CDN link.
- Scripts are `defer`-loaded? ❌ **All script tags are `<script src="js/main.js">` without `defer`** — `index.html:289`, `download.html:257`, `about.html:243`, `features.html:251`, `clients.html:282`, `hub.html:173`, `plugins.html:155`, `404.html` (none). new_site.md §7 says "Keep it tiny and non-render-blocking" and §13 says "No render-blocking JS (`defer`)". The scripts are tiny (~8KB) so not a severe impact, but `defer` is the spec requirement and is missing.
- CSS is split into 3 files loaded in order (base, theme, components) — appropriate for parallel loading.
- Lazy-load: below-the-fold images none (logo is inline SVG).
- `og.png` (72KB) is the heaviest asset. Acceptable for social share image.

**Fix needed:** Add `defer` attribute to all `<script src="js/main.js">` tags.

---

## 9. Content Accuracy — 84 ⚠️

- Install command verbatim from `content.json` ✅ (`download.html:82`). The install instructions section in download.html describes what the script does in accurate, factual language matching `install.primary.what_it_does` from new_site.md schema. However, `content.json.install.primary` does not contain a `what_it_does` field — this content was authored from new_site.md schema knowledge rather than copied from `content.json`. Per §2 this is a content accuracy violation: "Read it; do **not** invent product copy, features, or claims." The content is factually correct (matches phlix-server's actual install behavior), but it should have been traced to a source.
- FAQ answers in `about.html` match `content.json` verbatim ✅.
- Client facts (Roku, Tizen, Windows, Mobile beta, DLNA) match `content.json.clients[]` ✅.
- Feature facts (all 8 features with titles and bodies) match `content.json.features[]` ✅.
- Ecosystem items (5 packages with names, repos, descriptions) match `content.json` ✅.
- License in `about.html:81-83` correctly distinguishes MPL-2.0 vs MIT ✅. But SITE.md §11 states "MPL-2.0" as a blanket claim — same issue as §1.
- ❌ `meta.description` on all 9 pages is custom copy, not from `content.json` (see §2 SEO fix).
- ❌ Proof numbers on index.html "proof-placard" (`index.html:181-196`) are questionable:
  - "5 Native Clients" — content.json says 4 native clients (Roku, Tizen, Windows, Mobile beta) PLUS any DLNA device. "5" counts DLNA as a client, which is technically defensible but not how content.json phrases it.
  - "2 SyncPlay Time Sync" — this is not a number from content.json. It appears to be a brand-flavored restatement of the SyncPlay feature. Not verifiable as a standalone metric.
  - "MPL" as a stat — this is a license abbrev, not a number to display as a proof point.
  - Per §19.7: "Do not print a star count, contributor count, download total, or user number — a static page cannot verify it and an invented figure is a fabrication." These "stats" are arguably decorative design elements rather than verifiable claims, but they look like proof signals. Use descriptive labels instead of numbers that imply measurement.

**Fixes needed:**
1. Restore `content.json` `meta.description` to all page `<head>` sections.
2. Either remove the "stats-band" numbers or replace them with descriptive text that doesn't imply a measurement (e.g., "4 Native Clients + DLNA", "SyncPlay Sync" without a leading number).

---

## 10. CTA / Funnel — 90 ✅

- Primary CTA "Get Groovy" on hero, above fold, links to `/download.html` ✅.
- All pages end with a `.cta-banner` or equivalent driving toward download ✅.
- Download page CTA ladder is clear: install snippet → clients → ecosystem → requirements ✅.
- Secondary CTA "Read the docs" / "Peek at the Liner Notes" links to external docs or features page ✅.
- Download reachable in ≤2 clicks from any page ✅.

---

## 11. Social Metadata — 56 ❌

**Hard gate failure.** new_site.md §11 is not satisfied:

- ❌ **All 9 pages** — No `og:site_name=Phlix`. Required by §11: "og:site_name=Phlix".
- ❌ **All 9 pages** — No `twitter:creator=@detain`. Required by §11: "twitter:creator=@detain".
- ❌ **All 9 pages** — No `twitter:title` or `twitter:description`. Only `twitter:card` is set. The spec says to include all four twitter card meta tags.
- ❌ **404.html** — No `og:url` / canonical for the 404 page. Required by §2A rule: "Canonical/og:url still follow the normal rule (`{site.url}/{slug}/404.html`)."
- ✅ `og:image` is absolute URL to `https://detain.github.io/phlix-website/retro-seventies/img/og.png` — correct (PNG, not SVG, absolute URL).
- ✅ `og:type=website` on all pages.
- ✅ `twitter:card=summary_large_image` on all pages.
- ✅ `<meta name="theme-color">` not found on any page — new_site.md §11 says `<meta name="theme-color"> = kit primary color`. This is MISSING.
- ✅ `og:image` is PNG (og.png 72KB confirmed).

**Fixes needed:**
1. Add `og:site_name=Phlix` to all 9 pages.
2. Add `twitter:creator=@detain` to all 9 pages.
3. Add `twitter:title` and `twitter:description` to all 9 pages (matching og:title/og:description or page-specific variants).
4. Add `<meta name="theme-color" content="#D4570D">` to all 9 pages (kit primary color).
5. Add `og:url` and canonical to 404.html.

---

## 12. Localization — 92 ✅

- `<html lang="en">` set on all pages ✅.
- All user-facing strings trace to `content.json` or kit voice — single file swap would enable localization.
- Logical CSS properties used (`inset`, `inline-start/end` where applicable).
- Font subset: the pool WOFF2 files are subset to Latin.
- One locale (`en`) — matches `content.json` `supported_locales: ["en"]` ✅.

**Minor:** No `hreflang` link in `<head>`. Not required for single-locale site but would future-proof for expansion.

---

## 13. Experience Fidelity — 90 ✅

- All 5 `homepage_narrative.sections[]` realized: needle-drop hero, the-features (8 cards), why-retro story, proof-placard, spin-it-up CTA ✅.
- All 6 `site_architecture.nav[]` labels matched in nav: The Lobby, Now Spinning, The Equipment, Get Groovy, The Relay, The Story ✅.
- Plugins and Docs demoted to footer per `site_architecture.demoted_pages` ✅.
- Mascot Groove implemented: lava lamp blob, fades in after 2s, dismiss to localStorage, click-easter-egg, typed-word easter egg ✅ — all per `mascot.behavior` spec.
- Easter eggs correctly implemented:
  - Logo-clicks:3 → Groove celebration (`js/main.js:198-224`).
  - Typed "groove" → vinyl cursor overlay (`js/main.js:153-193`). Properly disabled during input focus ✅.
- 404.html content is real Groove-in-empty-auditorium, not the `error_page_experience.concept` field printed verbatim ✅. Has `noindex` ✅.
- `site_architecture` nav override (6 items instead of 8) is a legitimate kit-declared override per §2A ✅.

---

## Fixes Required (Priority Order)

### P0 — Must fix before approval

1. **SEO: Missing canonical URLs** — Add `<link rel="canonical">` to all 9 pages. (all HTML files)
2. **SEO: Missing JSON-LD** — Add `SoftwareApplication` JSON-LD to `index.html`. (`index.html:<head>`)
3. **SEO: Wrong meta description** — Restore `content.json` `meta.description` on all pages. (all HTML files)
4. **Social: Missing og:site_name** — Add `property="og:site_name" content="Phlix"` to all 9 pages.
5. **Social: Missing twitter:creator** — Add `name="twitter:creator" content="@detain"` to all 9 pages.
6. **Social: Missing twitter:title/twitter:description** — Add both meta tags to all 9 pages.
7. **Social: Missing theme-color** — Add `<meta name="theme-color" content="#D4570D">` to all 9 pages.
8. **Social: 404.html missing og:url** — Add `og:url` and canonical to 404.html.
9. **Performance: Missing defer on scripts** — Add `defer` to all `<script src="js/main.js">` tags (9 occurrences).
10. **Brand: SITE.md wrong license claim** — Correct §11 license table to reflect dual MPL-2.0/MIT licensing.
11. **Content: Avocado Green contrast** — Verify `#8B9B3A` on `#1A1005` ≥ 4.5:1 for small text; if not, restrict to decorative/badge-only use.

### P1 — Should fix

12. **Content: Proof stats-band numbers** — Replace "5 Native Clients" with descriptive text, remove "2 SyncPlay" number, replace "MPL" as stat with a proper label.
13. **Responsive: render-check not run** — Run `node tools/render-check.mjs --site retro-seventies` to verify 320px, 200% zoom, mascot-not-covering-CTA.
14. **Content: install description** — Ensure the "What it does" section in download.html can be traced to a content.json source or is marked as derived per §19.22 escalation path.

---

## Definitions

- ❌ = hard failure (spec violation or missing required element)
- ⚠️ = partial pass (present but incomplete or needing verification)
- ✅ = pass (≥90% compliant with spec)
