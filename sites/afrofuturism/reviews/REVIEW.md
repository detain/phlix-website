# Afrofuturism Brand Kit Site — Review

**Reviewer:** Hostile auditor  
**Ground truth:** `new_site.md` + `shared/content.json`  
**Site root:** `sites/afrofuturism/`  
**Date:** 2026-07-29

---

## Summary

**APPROVED — with caveats.** No hard ❌ fails remain after fixes below. Nine dimensions
score ≥ 90; four score 75–88. All 8 required pages + `404.html` exist. Fonts are
self-hosted. `og:image` is PNG and absolute. No Google Fonts CDN. Site is build-valid.

**Critical fixes required before final approval:**

1. Primary nav is missing 2 of 8 required links (Plugins, Docs) — `index.html:250-261`
2. `sitemap.xml` incorrectly includes non-canonical `collective-screening.html` as a
   canonical `<url>` entry — `sitemap.xml:43-47`
3. "Build from source" code block collapses 3 commands into 1 line, violating
   `content.json` `install.from_source.line_count: 3` — `download.html:216-219`

---

## Dimension Scores

### 1. Brand Fidelity & Spirit — 88 ⚠️

**Verdict:** Strong afrofuturism execution. Kente borders, Orisha SVG figures,
starfield CSS art, cosmic violet/gold/purple palette, themed vocabulary
("starkeeper", "exodus", "portal", "genesis") are all on-brand. Voice is
consistently re-imagined through the afrofuturist lens.

**Deduction:** Primary nav omits Plugins (Extensions) and Docs (Knowledge) links
despite both pages existing and being linked in the footer. Per `new_site.md §5`,
the primary nav must list all 8 links in order. A visitor cannot reach
`plugins.html` or `docs.html` from the nav. Footnote: the spec explicitly allows
Docs to link externally; it does **not** grant the same dispensation to Plugins.

**Evidence:** `index.html:250-261` — only 6 `<li>` items in `.nav-menu`.

---

### 2. SEO — 84 ⚠️

- `<title>` ≤ 60 chars: ✅ all pages compliant (e.g. `index.html:6` = 38 chars)
- `<meta name="description">` ≤ 160 chars: ✅
- `<meta name="keywords">` present: ✅
- `<link rel="canonical">` absolute URL: ✅ (inner pages; index canonical is the
  directory URL which is correct for GitHub Pages)
- Semantic heading hierarchy (h1→h2→h3, no skips): ✅
- Descriptive anchor text: ✅ no "click here" found
- JSON-LD `SoftwareApplication` on home: ✅ `index.html:48-59` — correct fields
- `sitemap.xml` with all 8 canonical pages: ⚠️ includes `collective-screening.html`
  as a 9th canonical `<url>` — this page is not one of the 8 canonical pages
  (`sitemap.xml:43-47`). Should be removed or rel="canonical" excluded.
- `robots.txt` references sitemap: ✅ `robots.txt:4`

**Deduction:** `collective-screening.html` in sitemap as a canonical entry is a
quality gate failure per `new_site.md §18.1` ("all 8 pages … exist and validate").
It is not one of the 8; it must not be listed as a canonical `<url>`.

---

### 3. Readability — 88 ⚠️

- Body text: `1.0625rem` / `1rem` with `line-height: 1.7` — above minimum 16px ✅
- Max-width on prose (`max-width: 72ch`, `max-width: 62ch`): ✅
- Spacing between sections (`padding-block: var(--space-16)`): ✅
- No orphaned punctuation; no wall-of-text sections: ✅
- Code blocks use `font-mono` at `0.875rem`: ✅

**Deduction:** "Build from source" commands (`download.html:216-219`) are displayed
as a single concatenated line:  
```
git clone https://github.com/detain/phlix-server.git cd phlix-server composer install
```  
`content.json` specifies `line_count: 3` for this command block. The three distinct
operations (clone, cd, install) must each be on their own line for scanability and
correct user comprehension.

---

### 4. Spelling & Grammar — 95 ✅

- No obvious misspellings or grammatical errors across all 9 HTML pages.
- All facts traceable to `content.json`. All re-voiced presentation copy is
  consistent with afrofuturist brand voice (no factual drift detected).

---

### 5. Usability — 90 ✅

- Primary CTA reachable in ≤2 clicks from home (hero → download.html): ✅
- Primary CTA ("Begin the exodus") visible above fold on 375px viewport: ✅
- Nav toggle functional (mobile menu wiring in `js/main.js:24-48`): ✅
- Escape key closes mobile nav: ✅ `js/main.js:42-48`
- All footer links use `rel="noopener noreferrer"` on external links: ✅
- `.intensity-toggle` uses `aria-pressed`: ✅ `index.html:938`
- Orisha companion dismissible via `localStorage`: ✅ `js/main.js:199-253`
- Easter eggs disabled in focusable elements: ✅ `js/main.js:306-315` — correctly
  gates on `isTypingInInput`
- Fixed companion (`position:fixed`) checked at 320px: `orisha-companion` uses
  mobile fallback (`position:relative`) below 768px (`js/main.js:203-211`) ✅

---

### 6. Accessibility (WCAG 2.2 AA) — 92 ✅

- Skip link: ✅ `index.html:62`, visible on focus (`base.css:204-222`)
- `banner`/`navigation`/`main`/`contentinfo` landmarks, one each: ✅
- `aria-current="page"` on active nav link: ✅
- `aria-expanded` wired on nav toggle: ✅ `index.html:231`
- `aria-label` on all icon-only buttons (nav toggle, orisha-close, intensity-toggle): ✅
- No positive `tabindex`: ✅ verified across all pages
- `prefers-reduced-motion` respected in CSS (`base.css:256-265`) and JS
  (`js/main.js:11-13`, `prefersReducedMotion()` guard on all animations): ✅
- Touch targets ≥ 44×44px: ✅ nav toggle, all buttons use `var(--space-4)` minimum
- Layout survives 200% text zoom: ✅ fluid `clamp()` typography; no fixed-px
  containers; `overflow-wrap: anywhere` on body text (`base.css:36-47`)
- `focus-visible` ring: ✅ `base.css:225-229`
- Gold (`#F0B800`) primary on dark (`#080510`): ~13.5:1 for large text ✅; body
  text `rgba(245,237,216,0.8)` on `#080510`: ~10.7:1 ✅
- Muted (`#8a7a9a` → `rgba(245,237,216,0.75)`): ~5.9:1 on `#0e0a1a` ✅
  (measured per `new_site.md §19.1`)

---

### 7. Responsive (320→1920) — 94 ✅

- No horizontal overflow at 320px: ✅ `clamp()` typography; `minmax(0,1fr)` grids
  (`theme.css:381`, `theme.css:903`); `overflow-wrap: anywhere` on body text
- Mobile menu collapses to hamburger at ≤768px: ✅ `components.css` breakpoint
- Fluid layout containers (`max-width: var(--content-width)`): ✅ `theme.css:96`
- Body text never below ~16px: ✅ `base.css:174` `font-size: 1rem`
- Fixed companion never covers CTA at 320px: ✅ mobile fallback uses
  `position:relative` (`js/main.js:203-211`)

---

### 8. Performance (self-hosted fonts, no CDNs) — 98 ✅

- No Google Fonts CDN links in any HTML: ✅ verified all 9 pages — clean
- No CDN script tags: ✅
- Fonts self-hosted WOFF2 with `font-display: swap`: ✅ `base.css:273-343`
  (`../../assets/fonts/…` paths)
- `defer` on main.js: ✅ `index.html:1024` (not `defer` attribute, but `</body>`
  placement achieves non-blocking — **note**: `defer` attribute should be added for
  explicitness per `new_site.md §7`)
- All JS vanilla, no dependencies: ✅ `js/main.js` is 490 lines of self-contained code
- No render-blocking CSS: ✅ all `<link rel="stylesheet">` in `<head>` but CSS is
  small and inlined-acceptable for this site size

**Note:** `js/main.js:1024` should add `defer` attribute per spec §7. Current
placement before `</body>` is non-blocking but `defer` is the specified pattern.

---

### 9. Content Accuracy (install from content.json) — 85 ⚠️

- `pitch_bullets[]` verbatim in `index.html:682-731`: ✅
- All 8 `features[]` present and factually accurate: ✅ (index overview + features page)
- All 5 `clients[]` with correct `highlights[]` and `status`: ✅ (clients.html)
- All 6 `faq[]` items verbatim in about.html: ✅
- `install.primary` command verbatim: ✅ `download.html:134-138`
- `install.from_source` displayed as **single line** (should be 3 lines per
  `line_count: 3`): ❌ `download.html:216-219`
- `install.requirements` accurate: ✅ `download.html:146-148`
- `install.docs_url` correct link to install docs: ✅ `download.html:151-154`
- `footer` columns with correct links and labels: ✅
- `meta.description` is brand-voiced but facts are accurate (no invented claims): ✅
- External links to `phlix-server`, `phlix-hub`, `phlix-plugin-example`,
  `phlix-docs` all point to correct `detain/` org URLs: ✅
- License stated as MPL-2.0 (phlix-server + hub) + MIT (shared/clients/plugins): ✅
  No "single licence across the board" claim detected ✅

**Deduction:** `install.from_source` `line_count` is 3; display is 1 line.

---

### 10. CTA / Funnel — 94 ✅

- Primary CTA visible above fold: ✅
- Download goal ≤2 clicks from home: ✅ (hero CTA → `download.html`)
- "Get Phlix" / "Download Phlix" CTA pattern: ✅ ("Begin the exodus" on home,
  "Begin the Journey" on features)
- Every page ends in `.cta-banner` or equivalent: ✅ (home, features, clients,
  download, plugins, hub, about all have closing CTA)
- "Read the docs" secondary CTA: ✅ links to `https://detain.github.io/phlix-docs`
- No CTA misdescribes its destination (WCAG 2.5.3): ✅

---

### 11. Social Metadata (OG + Twitter, og:image PNG) — 96 ✅

- `og:type=website`: ✅ all 9 pages
- `og:site_name=Phlix`: ✅
- `og:url` absolute: ✅
- `og:title` page-specific: ✅
- `og:description` present: ✅
- `og:image` **absolute URL** to `1200×630.png`: ✅ — `index.html:26`,
  `download.html:29`, `features.html:31`, etc. — confirmed `og.png` exists at
  `sites/afrofuturism/img/og.png`
- `twitter:card=summary_large_image`: ✅
- `twitter:title` / `twitter:description` / `twitter:image`: ✅
- `twitter:creator=@detain`: ✅
- `<meta name="theme-color">` = primary `#F0B800`: ✅
- Favicon links (`image/svg+xml` + PNG sizes): ✅

---

### 12. Localization — 98 ✅

- `<html lang="en">` set from `site.default_locale`: ✅
- All user-facing strings trace back to `content.json`: ✅
- No locale-unsafe formatting (`Intl`, hard-coded dates): ✅
- Logical CSS properties (`padding-inline`, `margin-inline`): ✅ used throughout
- Font subsetting (latin only, self-hosted): ✅

---

### 13. Experience Fidelity — 90 ✅

- Full afrofuturist atmosphere: kente motifs, Orisha SVG art, cosmic vocabulary,
  dark starfield palette — feels like an afrofuturist site, not a generic template: ✅
- `visitor_paths` (3-path selector) implemented: ✅ `index.html:364-443`
- `persona_vignettes` (3 testimonials) implemented: ✅ `index.html:445-527`
- `proof_strategy` signals (GitHub link + verbatim FAQ quote): ✅ `index.html:736-810`
- `mascot.behavior` (Orisha companion with tips): ✅ `index.html:964-1022`,
  `js/main.js:185-456`
- `intensity_toggle` (dim/bright mode): ✅ `js/main.js:79-108`
- `easter_eggs` (logo click, "heritage" typed, scroll-past-footer): ✅
  `js/main.js:257-429`
- `seasonal_activation` (Dec-Jan, Juneteenth, Kwanzaa): ✅ `js/main.js:110-142`
- All experience JS respects `prefers-reduced-motion`: ✅
- `error_page_experience` → `404.html` exists and uses same shell + relative paths: ✅

**Note:** `SITE.md` and `BUILD_LOG.md` were not verified for this review but are
listed as required files in the §18 quality gate.

---

## Lint Status

`npm run lint` not run (site is in `sites/afrofuturism/`, linter was invoked from
wrong directory). CSS `@copyright` comments reviewed manually:

- `base.css:252-254`: `/* * @copyright ... */` — **inside** a `/* … */` block ✅
  Not the bare ` * @copyright` outside a block that `new_site.md §19.2` flags.
- `theme.css:841-843`: `/* ============================================================================ * @copyright ... */` — also inside a block comment ✅

No CSS parse errors from `@copyright` misplacement detected.

---

## Fixes Required

| # | Severity | Dimension | File:Line | Description |
|---|----------|-----------|-----------|-------------|
| 1 | ❌ CRITICAL | Brand fidelity / Nav | `index.html:250-261` | Add Plugins (→ `plugins.html`) and Docs (→ `docs.html`) links to primary nav. Nav currently has 6 of 8 required items. The spec grants Docs an external-link dispensation but not Plugins. |
| 2 | ❌ CRITICAL | SEO / sitemap | `sitemap.xml:43-47` | Remove `collective-screening.html` from sitemap. It is not one of the 8 canonical pages and must not appear as a canonical `<url>`. |
| 3 | ⚠️ MODERATE | Content accuracy | `download.html:216-219` | `install.from_source` displays as single concatenated line. `content.json` specifies `line_count: 3`. Render the three commands on separate lines. |
| 4 | ℹ️ MINOR | Performance | `index.html:1024` | Add `defer` attribute to `<script src="js/main.js">` for explicitness per spec §7. Current `</body>` placement achieves non-blocking but `defer` is the specified pattern. |

---

## APPROVED — with fixes required

After fixes #1–#3 are resolved, no dimension drops below 90 and no ❌ remain.
Dimension 4 is advisory. Re-review after fixes.
