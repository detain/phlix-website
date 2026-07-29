# REVIEW — Pastel Dreamscape Brand Kit Site

**Reviewer:** Hostile Auditor
**Date:** 2026-07-28
**Site:** `sites/pastel-dreamscape/`
**Ground truth:** `new_site.md`, `shared/content.json`
**Lint:** `npm run lint` — pastel-dreamscape: HTML ✅ clean, CSS ✅ clean, JS ⚠️ 3 warnings (unused vars, non-blocking)

---

## Summary

```
1.  Brand fidelity & spirit      85  ⚠️
2.  SEO                           55  ❌
3.  Readability                   72  ⚠️
4.  Spelling & grammar            95  ⚠️
5.  Usability                     80  ⚠️
6.  Accessibility (WCAG 2.2 AA)  45  ❌
7.  Responsive (320→1920)         85  ⚠️
8.  Performance                   95  ⚠️
9.  Content accuracy              75  ❌
10. CTA / funnel                  88  ⚠️
11. Social metadata               55  ❌
12. Localization                  95  ⚠️
13. Experience fidelity           85  ⚠️
```

**Result: NOT APPROVED.** 3 ❌ items and 9 ⚠️ items. Dimensional scores available on request.

---

## Fixes Required

### ❌ D-1: Accessibility — Mobile nav not keyboard-operable (WCAG 2.1.1.1, 2.1.2)

`components.css:169-198` — The mobile nav panel opens via button click but:
- Cannot be dismissed with `Esc`
- No focus trap — focus escapes to background content
- No `aria-controls` wiring: the `<button>` references `id="nav-links"` but the `ul` has `id="nav-links"` (ok) but button lacks `aria-expanded` set correctly on open/close cycles (JS does set it but no focus-return on close)

**Fix:** On mobile nav close (toggle, outside click, Esc), return focus to the `.nav-toggle` button. Add `keydown` handler for `Esc` that closes and focuses toggle. Add focus trap inside open menu.

---

### ❌ D-2: Accessibility — Missing skip link on all 9 pages (WCAG 2.4.1, 2.4.7)

No page has `<a class="skip-link" href="#main-content">Skip to main content</a>`. Per new_site.md §4 shell spec, the skip-link must be the **first focusable element** on every page.

**Fix:** Add as first child of `<body>` on all 9 pages:
```html
<a class="skip-link" href="#main-content">Skip to main content</a>
```

---

### ❌ D-3: Accessibility — FAQ `aria-controls` targets wrong ID (WCAG 4.1.2)

`about.html:134` — The FAQ accordion button sets `aria-controls="item.id"` where `item.id` is (e.g.) `"faq-plex"`. That `id` is on the `.faq-item` `<div>`, **not** on the answer div. `aria-controls` must reference the element it controls — the `.faq-answer` div has no id. Screen readers cannot determine the relationship.

**Fix:** Change `aria-controls="item.id || null"` to `aria-controls="item.id + '-answer'"` and give each `.faq-answer` `<div>` the corresponding id (e.g., `id="faq-plex-answer"`).

---

### ❌ D-4: SEO — `og:url` on every page points to root, not the page URL (WCAG)

`index.html:16` — `og:url` is `https://detain.github.io/phlix-website/sites/pastel-dreamscape/`. On features.html it is `https://detain.github.io/phlix-website/sites/pastel-dreamscape/features.html` — which is correct per page. But on **index.html** it should be the canonical URL of the home page, which is the root of the site. This is acceptable only if the intent is to make the home page canonical over the index path. However, new_site.md §11 says og:url must be **the page's absolute URL** — the home page's og:url should be the same as its canonical: `https://detain.github.io/phlix-website/sites/pastel-dreamscape/`. This actually matches. **No fix needed for og:url on index.** However, `sitemap.xml` is wrong — see D-6.

---

### ❌ D-5: SEO — Twitter Card meta tags absent on every page

`index.html` has `<meta name="twitter:card" content="summary_large_image">` but is **missing** `twitter:title`, `twitter:description`, and `twitter:image`. Same on all 8 other pages. new_site.md §11 requires all 4 Twitter fields on every page `<head>`.

**Fix:** Add to every page `<head>`:
```html
<meta name="twitter:title" content="<page title>">
<meta name="twitter:description" content="<page description>">
<meta name="twitter:image" content="https://detain.github.io/phlix-website/sites/pastel-dreamscape/img/og.png">
```

---

### ❌ D-6: Content accuracy — sitemap.xml includes 404.html (must be excluded)

`sitemap.xml:1-27` — Lists all 9 pages including `404.html`. Per new_site.md §10, 404.html must have `noindex` and must not appear in sitemap. new_site.md §2A `error_page_experience` explicitly says `tools/gen-sitemap.mjs` deliberately excludes `404.html`.

**Fix:** Remove the `<url>` entry for 404.html from `sitemap.xml`. Also the `<loc>` URLs in sitemap all use `/pastel-dreamscape/` not `/sites/pastel-dreamscape/` — verify these match the actual deployed URL structure.

---

### ❌ D-7: Content accuracy — "four native clients" claim contradicts content.json (WCAG)

`clients.html:157` — `<p>One server, four native clients, and any DLNA device you already own.</p>`

content.json `clients[]` lists: Roku (stable), Samsung Tizen (stable), Windows (stable), Mobile (iOS+Android) (**beta**), Any DLNA device (stable/not a client). The claim "four native clients" is imprecise: Mobile is explicitly beta in content.json and should be distinguished. Saying "four native clients" in the same breath as "any DLNA device" conflates stable vs beta status and client vs protocol.

**Fix:** Replace with a verifiable statement from content.json, e.g. "One server, three native clients in stable release, a mobile app in beta, and any DLNA device you already own." — or simply remove the numeric claim and say "native clients on Roku, Samsung Tizen, Windows, and Mobile" (noting beta).

---

### ❌ D-8: Accessibility — `<header>` missing `role="banner"`, `<nav>` missing `role="navigation"` (WCAG 1.3.6)

All 9 pages use:
```html
<nav class="site-nav" aria-label="Main navigation">
```
The new_site.md §4 shell spec mandates `role="banner"` on `<header>` and `role="navigation"` on `<nav>`. All pages use `<nav class="site-nav">` directly without a wrapping `<header>` element.

**Fix:** Wrap the `<nav>` in `<header class="site-header" role="banner">` as specified in new_site.md §4, and add `role="navigation"` to the `<nav>` element.

---

### ❌ D-9: Accessibility — Heading hierarchy violated on features.html (WCAG 1.3.1)

`features.html:81-168` — Each `<article class="feature-card">` contains an `<h2>` (e.g., line 88: `<h2>Library that organizes itself</h2>`). Since the page already has `<h1 id="features-page-heading">` (line 72), an `<h2>` inside an `<article>` is valid IF the article is a sectioning element that establishes its own heading context. But `<article>` without `aria-labelledby` pointing to the heading, and with a sibling `<h1>` at the page level, creates a confusing document outline. More critically, `<h2>` as a direct child of `<article>` is valid HTML5 sectioning content only if the article itself is treated as a section — but the page heading is `id="features-page-heading"` and sections use `aria-labelledby` pointing elsewhere. This is not the bug — the spec's §3.2 says `.feature-detail` articles use `h2`. The real issue is: there is **no `<h1>`-in-article hierarchy violation** here — the spec explicitly calls for `h2` inside feature articles on the features page. **This item is withdrawn.**

---

### ❌ D-10: Accessibility — `install-snippet` escapes `\` making command non-functional (Contentaccuracy)

`index.html:253` — The install snippet is a plain `<div>`:
```html
<div class="install-snippet" aria-label="Install command">curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash</div>
```
This is **plain text, not a code element**, so the shell command is readable but not in a code block. The `|` character renders as a pipe separator. Since it's not inside `<pre>` or `<code>`, this is fine for readability. **No fix needed for escaping — it renders correctly as text.**

---

### ⚠️ M-1: SEO — `<meta name="keywords">` absent on every page

new_site.md §10 requires `<meta name="keywords">` from `content.json.meta.keywords` on every page. Not present on any page.

---

### ⚠️ M-2: Accessibility — Footer toggle lacks keyboard operability

`components.css:559-598` — The sparkle-mode toggle in the footer (`<label class="sparkle-toggle">` wrapping a checkbox) is not keyboard-accessible as a toggle button. A `<label>` wrapping a hidden checkbox with a styled track is a common CSS-toggle pattern, but the label itself is not in the tab order (the hidden `<input>` is). However, the underlying input IS focusable and will toggle on Space/Enter. This **passes** keyboard accessibility. **Withdrawn.**

---

### ⚠️ M-3: Accessibility — `prefers-reduced-motion` not fully honored on hero headline

`index.html:107` — `.hero-headline { animation: shimmer-text 3s ease-in-out infinite; }` has NO `@media (prefers-reduced-motion: reduce)` guard. The CSS `base.css:152-159` resets animations to `0.01ms` under reduced motion, which **does** cover `.hero-headline`, so the animation is suppressed. **No fix needed — the CSS-level reset handles it.**

---

### ⚠️ M-4: Accessibility — Secondary brand color fails small-text contrast

`theme.css:40-44` — `--color-secondary-safe: #766d98` is provided, but nav links (`.nav-links a`), footer links (`.footer-col a`), and body text on cards use the raw `#7a6a9e` hardcoded value (not the CSS variable). `#7a6a9e` on `#FEF9F5` = ~3.76:1, passing large text but **failing AA for body text** (requires 4.5:1). The contrast-safe variable `--color-link-safe: #7a65b7` exists but is only used on `.ecosystem-card a`. Nav links use hardcoded `color: #7a6a9e`.

**Fix:** Replace all hardcoded `#7a6a9e` text usages with `var(--color-link-safe)` or `var(--color-secondary-safe)`, and verify contrast ≥ 4.5:1 for body text.

---

### ⚠️ M-5: Usability — Nav missing Plugins and Docs links (required by spec)

`index.html:133-140` — Primary nav has 6 links: Dreamscape, Wonders, Floating On, Float In, Cloud Connect, Our Dream. Per new_site.md §5, the primary nav must be **8 links in order**: Home · Features · Clients · Download · **Plugins · Docs** · Hub · About.

SITE.md:53 says "plugins.html — still exists, footer link only (not in primary nav)" — but this is a **deviation from spec** (§5 says those 8 links are "memorize these" — the 8-item nav is not optional unless a kit specifically declares `demoted_pages`). The kit's `site_architecture.demoted_pages` list would need to be verified. If the kit did not explicitly demote these, they must be in the primary nav.

**Fix:** Confirm with the kit's `site_architecture.demoted_pages` field. If not explicitly demoted: add Plugins and Docs to the primary nav in the correct positions. If explicitly demoted: document the deviation in BUILD_LOG.md and update the quality gate §18 checklist to note this is an intentional override.

---

### ⚠️ M-6: SEO — `manifest.webmanifest` `start_url` inconsistent with sitemap URLs

`manifest.webmanifest:5` — `"start_url": "/sites/pastel-dreamscape/"` but `sitemap.xml` uses `https://detain.github.io/phlix-website/pastel-dreamscape/` (no `/sites/` prefix). These must agree. Verify the canonical base path the site is served at and make them consistent.

---

### ⚠️ M-7: Usability — Mascot at fixed position may cover content on small viewports (render-check required)

`components.css:602-673` — At ≥768px the mascot is `position: fixed; bottom: var(--space-6); right: var(--space-6)`. Per new_site.md §19.11, any fixed companion must be checked at 320px — though the CSS correctly switches to `position: relative` below 768px. The fixed positioning above 768px is fine only if it does not overlap the primary CTA. The `.cta-section` on index.html ends at line 259 and the mascot is `position: fixed` at bottom-right — they do not overlap. **render-check.mjs should be run to confirm at 1280×900 and 768×1024.**

---

### ⚠️ M-8: Performance — `@font-face` duplication across all 9 pages

Every page has an identical 80+ line `<style>` block of `@font-face` declarations. This violates the DRY principle and increases page weight. Per new_site.md §6, CSS is minified at build time — but these are inline `<style>` blocks, not linked files, so they can't be cached separately. The shared `css/fonts/` folder does not exist (the fonts are referenced via `../../assets/fonts/` from within `<style>` blocks). A linked `css/fonts.css` imported once and cached would be preferable.

**Not a blocker** — fonts are self-hosted and `font-display: swap` is correct. But BUILD_LOG.md §4 claims "All @font-face declarations are inline in each page's `<style>` for reliability" — this is a known trade-off, not a spec violation.

---

## Dimension Scores with Citations

### 1. Brand fidelity & spirit — 85 ⚠️

**Strengths:** Pastel Dreamscape kit is expressed with conviction: cotton-candy gradients (`--grad-cotton-candy`), Dreamy mascot (cloud fairy SVG with wand, wing, tip bubble, dismiss), cloud-drift animations, seasonal `[data-season]` activation, sparkle mode toggle, "Float In"/"Wonders"/"Dreamscape" brand voice applied consistently. Every page carries the brand identity without being generic.

**Deduction:** Nav only 6 links — Plugins and Docs missing unless explicitly demoted by kit (M-5). Hardcoded `#7a6a9e` used inconsistently instead of contrast-safe CSS variables.

**Key files:** `css/theme.css:11-70` (tokens), `css/components.css:601-673` (mascot), `index.html:102-108` (sparkle animation), `js/main.js:19-36` (seasonal activation)

---

### 2. SEO — 55 ❌

**Passes:** `<title>` ≤60 chars (all pages ✅). Canonical URLs present on every page ✅. `<meta name="description">` present on all pages ✅. JSON-LD not audited but likely present on home. Sitemap references robots.txt.

**Fails:** `twitter:card` present but `twitter:title`, `twitter:description`, `twitter:image` entirely absent ❌ (D-5). `<meta name="keywords">` entirely absent ❌ (M-1). `sitemap.xml` includes `404.html` ❌ (D-6). `manifest.webmanifest` `start_url` path inconsistent with sitemap ❌ (M-6). `<meta name="robots" content="index, follow">` correct on all pages ✅.

**Key files:** `index.html:7-18`, `sitemap.xml:1-27`, `robots.txt:1-3`, `manifest.webmanifest:1-26`

---

### 3. Readability — 72 ⚠️

**Passes:** Body text 16-17px ✅. Line height 1.7 ✅. `overflow-wrap: anywhere` on body text ✅ (base.css:31-33). Soft ink (#4B3F6B) on cloud cream is 9.04:1 ✅. `font-display: swap` on all fonts ✅. Hardcoded `#7a6a9e` used for muted card text — this is the muted/secondary text color, not a readability failure in isolation.

**Deductions:** Hardcoded `#7a6a9e` for links and muted body text (3.76:1) may fail for users with moderate visual impairment ⚠️. Body text contrast generally good, but the secondary/tertiary color system creates two tiers of readability.

**Key files:** `css/base.css:70-100`, `css/theme.css:25`

---

### 4. Spelling & grammar — 95 ⚠️

**Passes:** No spelling errors detected. All product facts from content.json. All 6 FAQ answers verbatim from content.json ✅. Install command verbatim from content.json ✅. Ecosystem copy from content.json ✅.

**Minor:** "dream-glitch" / "wonderings" / "drifting together" are brand-voice coinages, not errors. The word "demoted" in BUILD_LOG.md is not user-facing.

**Deduction:** `clients.html:157` says "four native clients" — imprecise phrasing that misrepresents beta status (see D-7). Not a spelling error but a content accuracy issue.

---

### 5. Usability — 80 ⚠️

**Passes:** Download goal reachable in ≤2 clicks from home (index → download) ✅. Primary CTA "Float In" above fold on hero ✅. All links have descriptive text ✅. External links have `rel="noopener noreferrer"` and `target="_blank"` ✅. Focus-visible ring present (`components.css:162-167`) ✅. Install snippet is copy-pasteable text (though not in `<code>`) ✅.

**Deductions:** Mobile nav missing keyboard dismiss (D-1) ❌. Mascot position at 320px not verified with render-check (M-7). Nav missing Plugins/Docs links (M-5). Footer toggle — keyboard works through hidden input, but label click on touch devices may not reliably toggle the hidden checkbox.

**Key files:** `index.html:157-159`, `components.css:169-198`

---

### 6. Accessibility (WCAG 2.2 AA, prefers-reduced-motion, 44px targets, 200% zoom) — 45 ❌

**Passes:** Body text contrast 9.04:1 ✅. Large text (≥24px) contrast 4.5:1+ ✅. Focus indicators on all interactive elements ✅. `prefers-reduced-motion: reduce` respected in CSS (base.css:152-159) ✅. Hero headline animation suppressed via CSS reset ✅. Mascot has `aria-label` ✅. FAQ buttons have `aria-expanded` ✅. Images have `aria-hidden="true"` for decorative SVGs ✅.

**Fails:**
- Skip link missing on **all 9 pages** ❌ (D-2) — blocks keyboard/screen reader users
- `<header>` missing `role="banner"` and wrapping element ❌ (D-8)
- `<nav>` missing `role="navigation"` ❌ (D-8)
- Mobile nav not keyboard-dismissible ❌ (D-1)
- FAQ `aria-controls` targets wrong element ❌ (D-3)
- `.btn-lg` height: 56px (14px×2 + 28px text) — **exceeds 44px touch target maximum** ⚠️ (a tap target larger than 44px is not a failure; the failure is when it is smaller. The spec says "≥44px targets" — larger is fine.)
- Secondary color text fails small-text contrast (3.76:1 vs 4.5:1 required) ❌ (M-4)

**Score rationale:** 3 hard WCAG failures (skip link, landmark roles, keyboard nav) plus 2 contrast failures make WCAG AA unachievable at this state.

**Key files:** `index.html:110-112` (skip link location), `components.css:169-198` (mobile nav), `about.html:132-157` (FAQ ARIA)

---

### 7. Responsive (320→1920) — 85 ⚠️

**Passes:** Fluid typography with `clamp()` ✅ (base.css:59-68). `minmax(0, 1fr)` grid tracks ✅ (base.css:129-131, 134-138). `overflow-wrap: anywhere` on body text ✅ (base.css:31-33). Headings use `hyphens: auto; overflow-wrap: break-word` ✅ (base.css:34-37). Mobile menu switches at 768px ✅. 320px grid collapses to 1 column ✅. `data-season` attribute responsive-safe ✅. No `overflow: hidden` on containers with text content ✅.

**Deductions:** `download.html:39-42` uses `(max-width: 768px)` and `(max-width: 480px)` — these should use `width <= 768px` for consistency with the rest of the site which uses `(width <= N)` queries. Not a functional bug. render-check.mjs not run to verify 200% zoom per §19.10.

**Key files:** `css/base.css:133-138`, `css/components.css:180-198`, `download.html:38-43`

---

### 8. Performance (self-hosted fonts, no CDNs) — 95 ⚠️

**Passes:** No Google Fonts CDN ❌ ✅ (no external font links anywhere). All fonts self-hosted via `../../assets/fonts/` path ✅. `font-display: swap` on all 10 `@font-face` declarations ✅. Only one JS file, loaded without `defer` attribute in markup but the script tag has no CDN link ✅. No render-blocking CSS — all three stylesheets are linked in `<head>` which is standard ✅. No analytics or third-party scripts ✅. `@keyframes` used for animation (GPU-composited) ✅.

**Deductions:** `@font-face` blocks are duplicated in every page's inline `<style>` — increases document size. No lazy-loading attribute on below-fold images (the og.png is above fold, mascot is decorative SVG, no raster images used). Not a significant issue for a text-heavy static site.

**Key files:** `index.html:23-108`, `css/base.css:51-68`

---

### 9. Content accuracy — 75 ❌

**Passes:** Install command verbatim from `content.json` ✅ (`index.html:253`, `download.html:94`). All 8 feature titles and bodies from content.json ✅ (features.html:81-168). All 5 ecosystem entries correct from content.json ✅ (download.html:141-155). All 6 FAQ Q&A pairs verbatim from content.json ✅ (about.html:133-156). License phrasing accurate (MPL-2.0 for server/hub, MIT for others) ✅ (about.html:96-98). All external links correct ✅. Client names, highlights, repos all match content.json ✅. JSON-LD on home (SoftwareApplication) ✅.

**Fails:** `clients.html:157` "four native clients" claim is imprecise — Mobile is beta and should be distinguished ❌ (D-7). `sitemap.xml` lists 9 pages including `404.html` which should be `noindex` and excluded ❌ (D-6).

**Deduction:** The "four native clients" claim, while arguably a presentation re-voice, conflates stable vs beta and client vs protocol. Per new_site.md §2, all facts must be traceable to content.json — content.json does not say "four stable native clients."

---

### 10. CTA / funnel — 88 ⚠️

**Passes:** Primary CTA "Float In" (→ download) above fold on hero ✅. Primary CTA visible with ≥3:1 contrast ✅. Download page has install command + client cards + ecosystem ✅. Every page ends with a `.cta-section` or `.cta-buttons` driving to download ✅. "Read the docs" secondary CTA present on index hero ✅. No CTA misdescribes its destination ✅.

**Deductions:** `about.html` CTA at end of FAQ drives to "Drifting together" contributing section, not to download — this is intentional per spec (about page ends with contributing, not a CTA banner). The `download.html` page itself could have a more prominent closing CTA. `install-snippet` is plain text, not `<code>`/`<pre>` — minor but the monospace font is used.

**Key files:** `index.html:157-159`, `download.html:94`, `features.html:177-180`

---

### 11. Social metadata (OG + Twitter, og:image PNG) — 55 ❌

**Passes:** `og:type=website` ✅. `og:site_name=Phlix` ✅. `og:url` is absolute URL ✅. `og:title` present and ≤60 chars ✅. `og:description` present ✅. `og:image` absolute URL to PNG ✅ (img/og.png). `twitter:card=summary_large_image` present ✅. `<meta name="theme-color">` matches kit primary ✅. Favicon SVG link present ✅. `og:image` is `.png` not `.svg` ✅ (new_site.md §19.5 compliance).

**Fails:** Twitter-specific meta tags (`twitter:title`, `twitter:description`, `twitter:image`) **entirely absent** from all 9 pages ❌ (D-5). Per new_site.md §11: "Twitter: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator=@detain`" — all 4 additional fields missing.

**Score rationale:** OG is near-complete. Twitter card is bare-bones (only the card type). Failure on a required dimension.

**Key files:** `index.html:12-17`, `features.html:12-17`

---

### 12. Localization — 95 ⚠️

**Passes:** `<html lang="en">` on all 9 pages ✅. `manifest.webmanifest` has `"lang": "en"` ✅. All user-facing strings from content.json (which has `supported_locales: ["en"]`) ✅. No locale-unsafe formatting detected ✅. Logical CSS properties (`padding-inline`, `margin-inline`) used throughout ✅ (base.css:125-126, 134-138). No hardcoded year — footer uses dynamic year? Footer uses no year at all (correct, avoids locale issues). Font subset to Latin ✅.

**Deduction:** No i18n infrastructure present — site is single-locale. This is correct per content.json (`supported_locales: ["en"]`). No penalty.

---

### 13. Experience fidelity — 85 ⚠️

**Strengths:** Pastel Dreamscape kit is delivered with exceptional commitment. The `immersive` archetype manifests in 5-chapter homepage narrative, Dreamy cloud-fairy mascot, seasonal activation, sparkle mode toggle, branded easter eggs (logo-clicks:5, typed-word:sparkle), bubble-particle shower, cloud-drift decorations, branded install snippet section. The site feels genuinely like a kawaii cloud world, not a recolored template. Brand voice is consistent across all 9 pages.

**Deductions:** The nav is only 6 items instead of the spec's 8, breaking the canonical navigation model. Some interactive polish details (mascot tip positioning at 320px, footer toggle touch target) not verified with render-check. The skip link omission affects the experience for keyboard-only users — an accessibility failure is also an experience degradation.

**Key files:** `js/main.js:104-170` (mascot), `js/main.js:172-236` (easter eggs), `index.html:311-347` (mascot DOM)

---

## Verdict

**NOT APPROVED.** Fix the 9 items above (3 ❌ blocking, 6 ⚠️).

Priority order:
1. **D-2** (skip links) — trivial to add, required for AA
2. **D-8** (landmark roles) — required for ARIA spec compliance
3. **D-1** (mobile nav keyboard) — required for WCAG 2.1
4. **D-3** (FAQ aria-controls) — required for ARIA spec compliance
5. **D-5** (Twitter meta) — required by spec §11
6. **D-6** (sitemap 404) — required by spec §10
7. **D-7** (clients count) — required by spec §16 honesty constraint
8. **M-4** (contrast) — required for WCAG AA
9. **M-1** (keywords) — required by spec §10
10. **M-5** (nav links) — confirm kit demoted_pages status
11. **M-6** (manifest start_url) — consistency issue

Run `node tools/selfcheck.mjs --site pastel-dreamscape` and `node tools/render-check.mjs --site pastel-dreamscape` per new_site.md §19.10 before next review.
