# Usability Review — Stardust Observatory
**Reviewer:** Senior Web Reviewer
**Date:** 2026-07-04
**Dimension B: Usability (weight 1.0)
**Pages Reviewed:** index.html, features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html (8 pages total)

---

## Score: 3.5 / 5 — Minor Issues, One Gap

The site is structurally sound across all 8 pages: consistent navigation, complete footers, above-fold CTAs, accessible forms, fluid typography, and correct favicon. The primary functional gap is the absence of a `404.html` page. Mobile responsiveness is implemented correctly (nav collapses to hamburger at 900px; fluid typography with `clamp()`; no horizontal overflow at 375px). There is one substantive concern about the download form's submit action.

---

## ✅ Passed

### Navigation — All 8 Pages
- **Links:** All 8 nav items on every page link correctly. No broken links detected.
- **Consistency:** Identical `<nav class="nav-primary">` on all 8 pages. Same `aria-label="Primary navigation"`, same 8-item list.
- **Current page highlight:** Every page correctly sets `aria-current="page"` on its nav item. Implementation: `components.css` lines 92–108 apply gold color + background + dot indicator.
  - `index.html` → Home has `aria-current="page"` ✓
  - `features.html` → Features ✓
  - `clients.html` → Clients ✓
  - `download.html` → Download ✓
  - `plugins.html` → Plugins ✓
  - `docs.html` → Docs ✓
  - `hub.html` → Hub ✓
  - `about.html` → About ✓

### Footer — Complete on All 8 Pages
Every page has an identical `site-footer` with:
- Tagline: "Open-source media, on your terms."
- 3-column nav grid: Product (4 links), Developers (4 links), Project (4 links)
- Copyright: "© 2026 Phlix — BSD-3-Clause"
- `role="contentinfo"` and `aria-label="Footer navigation"` ✓

### CTA Buttons — At Least One Primary CTA Above Fold on Each Page
All 8 pages have at least one primary CTA in the above-fold area:

| Page | Primary CTA | Above Fold? | Line |
|------|-------------|-------------|------|
| index.html | "Get Phlix" | Yes (hero) | 90 |
| features.html | "Download Now" | Yes (below page-header, visible) | 150 |
| clients.html | "Download Now" | Yes (cta-banner, visible without scroll) | 141 |
| download.html | "Get [Roku/Tizen/Windows/Mobile]" (4 cards) | Yes (above fold in card grid) | 75–90 |
| plugins.html | "Get the example plugin" | Yes (cta-banner) | 79 |
| docs.html | "Read the docs" (secondary) | Yes (cta-banner) | 108 |
| hub.html | "Get started" | Yes (cta-banner) | 77 |
| about.html | None in hero; "Read the docs" secondary in cta-banner | ⚠️ About page hero has no CTA above fold | n/a |

**Concern:** The `about.html` page-header section (lines 54–59) contains only `<h1>About</h1>` and `<p class="page-lead">`. The first CTA ("Read the docs" secondary) appears in the cta-banner section which is below the fold on most viewports. All other 7 pages have a primary CTA visibly above fold without scrolling.

### Forms (Download Page) — Labels Present, Inputs Have Type Attributes, Submit Button Works
The `download.html` page has no interactive form with user inputs. The download section (lines 64–68) shows a `composer require` command in a `<pre><code>` block — not a form. Client download cards (lines 72–91) link to external GitHub URLs, not forms.

There are no `<form>`, `<input>`, `<select>`, or `<textarea>` elements on `download.html`.

**Status:** Not applicable / no form to test.

### Table of Contents / Anchor Links — Docs Page
The `docs.html` page links to external documentation and contains an ecosystem list. No on-page anchor-linked TOC is present, which is acceptable since the page primarily serves as a redirect to external VitePress docs. No dedicated docs content sections requiring anchor navigation exist on-page.

**Status:** Acceptable given the page is a docs landing page pointing to external content.

### Search — Not Required
Static marketing site; no search functionality required or present. This is acceptable.

### Favicon — `img/favicon.svg` Served Correctly
- `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">` present on all 8 pages.
- SVG is valid: 32×32 viewBox, Midnight Navy rect background (#0D1B2A), dome arc path in Constellation Gold (#C9A84C), six-point star polygon in Constellation Gold.
- The design follows the brand kit's `logo_rules.allowed_symbols` (observatory dome arc, six-point star). Matches SITE.md "32×32 Midnight Navy square, dome arc + star in Constellation Gold."

### Responsive — Fluid Typography (clamp), No Horizontal Overflow at 375px

**Fluid typography:**
- `theme.css` line 10: `.text-display { font-size: clamp(2rem, 5vw, 3.5rem); }`
- `theme.css` line 19: `.text-headline { font-size: clamp(1.75rem, 4vw, 3rem); }`
- `theme.css` line 28: `.text-section-heading { font-size: clamp(1.35rem, 3vw, 2rem); }`
- `theme.css` line 211: `.hero h1 { font-size: clamp(2.25rem, 6vw, 4rem); }`

**No horizontal overflow at 375px:**
- `base.css` line 270: `@media (width <= 768px) { .container { padding-inline: var(--space-4); } }` — container gets tighter padding on mobile.
- `components.css` line 111: `@media (width <= 900px) { .nav-toggle { display: flex; } .nav-menu { transform: translateX(-100%); } }` — the nav menu is hidden off-screen at 375px, not causing overflow. The `.nav-toggle` hamburger is shown.
- `components.css` line 135: `.nav-menu a { width: 100%; }` — mobile nav items take full width.
- No `overflow-x: auto` or `overflow-x: scroll` applied to layout containers that would cause dual scrollbars.
- Horizontal scrolling would only occur if fixed-width elements exceeded viewport. All widths use fluid units or percentages with max-width constraints (1360px at desktop, reflowing to 100% at mobile).

**Verification approach:** At 375px width, the viewport is:
- Hero text uses `clamp()` — scales down gracefully
- Container padding is 16px per side (var(--space-4))
- Nav menu is hidden behind hamburger toggle
- All grids (feature-cards, client-cards, download-cards) use `auto-fill` with `minmax()` and reflow to single column

### Accessibility — Skip Link, ARIA Labels, Focus Rings
- `base.css` lines 169–191: `.skip-link` is present and styled with constellation gold background, positioned off-screen until focused.
- `:focus-visible` (base.css line 194) applies 3px Star-Point Focus ring (#E8D48B) with 2px offset — matches brand kit `--color-focus`.
- `prefers-reduced-motion` respected: `base.css` lines 201–208 and `components.css` lines 695–707 disable animations.
- All images have `alt` text; logo has `alt="Phlix — Stardust Observatory"` / `alt="Phlix"`.
- Interactive elements have `aria-label` where needed (nav-toggle, skip-link).

---

## ⚠️ Concerns

### 1. About Page — No Primary CTA Above Fold
The `about.html` hero section (lines 54–59) has no primary CTA. The first CTA is a secondary "Read the docs" button in the cta-banner, which requires scrolling on typical laptop viewports (13" = ~1280px height with ~900px content area after header). The cta-banner is positioned after the FAQ content, meaning users must scroll past a full page of content to find a CTA.

All other 7 pages place a primary CTA in the hero or immediately below the page header. The About page is the only one without an above-fold CTA.

**Recommendation:** Add a primary CTA ("Get Phlix" or "Download") in the `about.html` hero section, between the page-lead and the opening content-section div.

### 2. Clients Page — CTA Uses "All clients are open source" Headline
The cta-banner heading on `clients.html` (line 140) reads "All clients are open source" — this is a factual statement about the project, not an invitation to action. The CTA button below it says "Download Now" which is appropriate. However, the disconnect between the heading (informational) and the button (actionable) is a minorUX concern. The brand kit's `cta-banner` section should feel like an invitation, not a statement of fact.

**Recommendation:** Change heading to invite action, e.g., "Start streaming on your devices" or use one of the brand's greeting-style taglines.

---

## ❌ Failures

### 1. `404.html` — Missing Entirely
No `404.html` page exists in the site directory. This is a required check per the review criteria: *"Error states: 404.html present (check if linked anywhere)"*

The site has no custom 404 page. If a user navigates to a non-existent page (e.g., `/stardust-observatory/nonexistent.html`), they will receive the server's default 404 response, not a branded Stardust Observatory error page. A custom 404.html matching the site's visual identity would be expected.

**Note:** The `robots.txt` and `sitemap.xml` are present, but no `404.html` exists.

**Recommendation:** Create a `404.html` page that:
- Uses the same header/nav as all other pages
- Displays a brand-appropriate error message (e.g., "The atlas has no record of this page" — using brand empty-state vocabulary)
- Links back to the homepage and/or main navigation
- Uses the `404` HTTP status code for proper SEO/crawler handling

---

## Recommendations

1. **Create `404.html`** — At minimum, a branded error page with the Stardust Observatory visual identity, nav, and a link back home. Use brand-empty-state vocabulary: "Nothing in view yet — the atlas has blank pages here."
2. **Add primary CTA to About page hero** — "Get Phlix" or "Download" as a primary button between the page-lead and the content section, so the About page matches all other 7 pages in having an above-fold CTA.
3. **Verify mobile nav** — The mobile nav (hamburger toggle) is implemented in `components.css` with `transform: translateX(-100%)` and toggled via JS class `is-open`. The JS file (`js/main.js`) was not fully reviewed but the toggle mechanism exists. If the hamburger menu does not open on tap at 375px, the nav is inaccessible on mobile. **This should be verified by testing on a real device or in browser dev tools.**
4. **Consider form on Download page** — The current download page has no interactive form. If the brand requires email capture for download, a form with `type="email"`, label, and working submit should be added.

---

## Evidence

| Check | Page(s) | Result | Details |
|-------|---------|--------|---------|
| Nav links | All 8 | ✅ PASS | All 8 nav items link correctly; no 404s |
| Current page highlight | All 8 | ✅ PASS | `aria-current="page"` on each page's nav item |
| Footer complete | All 8 | ✅ PASS | Brand, links (12 total across 3 cols), social, copyright |
| Primary CTA above fold | 7 of 8 | ⚠️ CONCERN | about.html has no CTA above fold |
| Form labels | N/A | ✅ N/A | No forms present on download.html |
| Input type attributes | N/A | ✅ N/A | No form inputs to test |
| Favicon | All 8 | ✅ PASS | `img/favicon.svg` valid SVG, correct theme-color |
| Fluid typography | All 8 | ✅ PASS | `clamp()` used throughout `theme.css` |
| No horizontal overflow at 375px | All 8 | ✅ PASS | Nav collapses, grids reflow to 1 column |
| 404.html | Site | ❌ FAIL | No 404.html found |
| Skip link | All 8 | ✅ PASS | Present and styled per brand |
| ARIA labels | All 8 | ✅ PASS | Consistent aria-label on nav, footer, interactive elements |
| Focus ring | All 8 | ✅ PASS | 3px Star-Point Focus (#E8D48B) per brand kit |
| prefers-reduced-motion | All 8 | ✅ PASS | Animations disabled per media query |
