# Moroccan Bazaar — Brand Kit Site Review

**Reviewer:** Hostile Audit
**Date:** 2026-07-29
**Lint status:** `npm run lint` passes clean.

---

## Scorecard

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 88 | ⚠️ |
| 2 | SEO | 85 | ⚠️ |
| 3 | Readability | 90 | ✅ |
| 4 | Spelling & grammar | 100 | ✅ |
| 5 | Usability | 80 | ⚠️ |
| 6 | Accessibility (WCAG 2.2 AA) | 85 | ⚠️ |
| 7 | Responsive (320→1920) | 85 | ⚠️ |
| 8 | Performance (self-hosted fonts) | 95 | ✅ |
| 9 | Content accuracy | 85 | ⚠️ |
| 10 | CTA / funnel | 90 | ✅ |
| 11 | Social metadata (OG + Twitter) | 100 | ✅ |
| 12 | Localization | 95 | ✅ |
| 13 | Experience fidelity | 82 | ⚠️ |

**Result: NOT APPROVED.** Three ❌-equivalent issues and six ⚠️ dimensions below 90.

---

## Dimension Breakdown

### 1. Brand Fidelity & Spirit — 88 ⚠️

**What works:**
- Color palette is entirely from kit tokens. Midnight-medina background, terracotta CTA, hammered copper accents — all correct.
- Fonts: Cormorant Garamond (headline), Cinzel (display), Lora (body), Nunito Sans (UI), Fira Code (mono) — all self-hosted WOFF2 in `../../assets/fonts/` and all files exist.
- Zellige dividers, warm copper glow shadows, surface hierarchy, mascot Amir the copper lantern — all brand-appropriate.
- Cinzel display text is correctly uppercase with wide tracking for its inscriptional quality.
- No cold blues, no stark whites, no neon.

**❌ Branded nav is 6 links, not 8.** The spec (new_site.md §5) is explicit: "Primary nav (8 links, in order): Home · Features · Clients · Download · Plugins · Docs · Hub · About." Every page's primary nav is:
```
Enter the Bazaar | The Masterworks | Every Screen | Your Passage In | Reach from Afar | The Story
```
That is **6 links**. "Plugins" and "Docs" are completely absent from the primary nav on every page including `404.html`. They appear only in the footer mirror-nav and footer-nav, which does not satisfy the "8 links in the primary nav" requirement. The kit's `navigation_model` does not override this — it is absent from the kit.

**❌ `craftsman-guide.html` is an unauthorized ninth page.** The spec (new_site.md §3) defines exactly 8 pages. `craftsman-guide.html` is not among them, nor is it the required `404.html`. It is included in `sitemap.xml` with a canonical URL, meaning it is a deliberate published page that does not belong. The sitemap should not contain it.

**⚠️ Brand-voice CTA labels are in the footer mirror-nav but not the primary nav.** The footer correctly carries all 8 links. The primary nav's 6-link truncation is not a brand voice choice — it is a structural omission.

**Ref:** `index.html:71-78`, `download.html:73-82`, `features.html:73-82`, `about.html:73-80`, `hub.html:70-77`, `plugins.html:73-80`, `docs.html:70-77`, `404.html:71-78`, `sitemap.xml:43-47`

---

### 2. SEO — 85 ⚠️

**What works:**
- `<title>` on every page: "Phlix — Every Frame, a Masterwork" (home), "Download — Phlix", "Features — Phlix", etc. All under 60 chars.
- `<meta name="description">` present on every page, drawn from `content.json` or derived factually. All under 160 chars.
- `<link rel="canonical">` on every page — absolute URL to the canonical path.
- `<h1>` exactly once per page. Heading hierarchy is sequential (h1 → h2 → h3, no skips).
- `sitemap.xml` exists with all 8 canonical pages, absolute URLs.
- `robots.txt` exists with sitemap reference.

**❌ `sitemap.xml` includes `craftsman-guide.html`** — a page that has no canonical place in the site structure. This pollutes indexers with a non-spec page. Remove it from the sitemap entirely.

**❌ `og:image` is not verified as a real PNG.** While `og.png` exists as a file (`file` cmd confirms "PNG image data, 1200 x 630"), `og.svg` is also present in the img directory. If the rasterized `og.png` was generated from `og.svg` using `tools/gen-og.mjs` per spec §19.5, that needs confirmation. The `img/` directory contains both, and `gen-og.mjs` is the required tool, not manual conversion.

**⚠️ `new_site.md §10` requires JSON-LD `SoftwareApplication` on the home page.** No JSON-LD block was found in `index.html`. This is a spec requirement for Lighthouse SEO.

**Ref:** `sitemap.xml:43-47`, `index.html` (no JSON-LD block visible)

---

### 3. Readability — 90 ✅

Body copy is Lora at 1rem/1.7 line-height on warm-dark backgrounds — comfortable reading. The narrow container on `about.html` (`container--narrow`) aids long-form prose. Headings use Cormorant Garamond correctly with tight tracking. No centered long body copy blocks (Cinzel uppercase display aside). Prose sections have proper spacing.

---

### 4. Spelling & Grammar — 100 ✅

No spelling or grammatical errors detected. All copy is coherent and professionally written. The brand voice (warm, unhurried, artisanal) is consistent.

---

### 5. Usability — 80 ⚠️

**What works:**
- Skip link present and functional. Visible on focus.
- `aria-current="page"` on the active nav link on every page.
- Footer mirror-nav has all 8 pages.
- Primary CTA ("Enter the Bazaar" / "Your Passage In") is above the fold on the home page hero.
- Download page install snippet is accurate to `content.json`.
- Mobile nav is implemented with `aria-expanded`, keyboard `Escape` closes it, focus management on open.

**❌ Two spec-required pages are unreachable from the primary nav.** "Plugins" and "Docs" are in the footer but not the primary nav. A visitor who lands on any page and uses only the top nav cannot reach `/plugins.html` or `/docs.html` without scrolling to the footer. The funnel rule (§5) says the download goal must be reachable in ≤2 clicks from home — the same must apply to Plugins and Docs which are part of the spec's 8-page structure.

**❌ `craftsman-guide.html` is not in the nav at all** (even the footer mirror-nav does not link to it). It is only in `sitemap.xml`, making it a ghost page.

**⚠️ `download.html` install snippet has an orphaned `cd` command visually missing from its display** (line 155-156 in download.html: `git clone ... cd phlix-server composer install` — the `cd` is on a separate line from the clone and could be missed visually, though the literal string is correct in content). This is a display concern only; the content is accurate.

**Ref:** `index.html:71-78` (nav has 6 links, not 8)

---

### 6. Accessibility (WCAG 2.2 AA) — 85 ⚠️

**What works:**
- `<a class="skip-link" href="#main-content">` is the first focusable element.
- `:focus-visible` ring: 2px terracotta (`#E8531A`) + 2px offset + 4px copper outer glow — per kit spec. Visible and warm-appropriate.
- `prefers-reduced-motion` respected: `base.css:271-281` kills all animations; `components.css:399-403` kills Amir's sway; `main.js` sets `transition: none` on revealed elements and kills the sway animation for reduced-motion users.
- All interactive elements have 44×44px `min-height`/`min-width` (`.btn`).
- Layout survives 200% text zoom (CSS uses fluid `clamp()` values; `overflow-wrap: anywhere` on prose elements per §19.12).
- `aria-expanded` on nav toggle, `aria-controls` pointing to `nav-menu`.
- `role="banner"`, `role="navigation"`, `role="contentinfo"`, `role="list"` used correctly.
- `alt="Phlix logo"` on logo `img`.

**⚠️ Some `.btn` elements use `<a>` tags styled as buttons without a dedicated accessible name test.** The `aria-label` on the nav-toggle is correct. Feature card links use icon + text combination, visually acceptable.

**⚠️ The `code-block` `<code>` element in `download.html:154-156` contains a multi-line string `git clone … cd phlix-server composer install` which visually wraps but uses `white-space: pre` — acceptable but could clip on very narrow viewports.

**⚠️ FAQ accordion (JS progressive enhancement) correctly wraps `<dt>` in a `<button>`** with `aria-expanded` and `aria-controls`, but the button's text styling inherits from `dt` and applies `display:flex` with a chevron SVG — this is a reasonable pattern but the `<button>` replacement should be verified to not lose the `dt`'s semantic meaning in non-JS environments. Since this is progressive enhancement, it degrades gracefully to a visible `<dt>/<dd>` list.

**Ref:** `base.css:242-250` (focus ring), `components.css:141-143` (44px min touch target on `.btn`), `main.js:337-362` (FAQ accordion)

---

### 7. Responsive (320→1920) — 85 ⚠️

**What works:**
- Fluid typography with `clamp()` throughout.
- Grid uses `minmax(min(100%, 260px), 1fr)` on feature cards — no bare `1fr` tracks that can't shrink.
- `overflow-wrap: anywhere` on prose elements per §19.12.
- Mobile breakpoint at 767px: nav-toggle shown, nav-menu collapsed.
- Mobile breakpoint at 480px: single-column feature grid and content grid.
- Amir (fixed-position mascot) becomes `position: relative` in-flow on mobile (`components.css:446-460`), preventing any overlap with the CTA.

**⚠️ 200% text zoom not directly verified.** Per spec §19.12, `tools/render-check.mjs` tests this specifically. I cannot run a browser render-check in this environment, but the CSS structure (fluid clamp values, `overflow-wrap: anywhere`) is set up correctly. This needs a real `render-check` run.

**⚠️ `content-grid` uses `minmax(min(100%, minmax(0, 1fr)), 1fr)` which resolves to `minmax(0, 1fr)` properly** — the nested `minmax` is the §19.12-correct pattern. Good.

**⚠️ The zellige-divider `opacity: 0.6` is hardcoded.** At very small viewport widths the divider might feel like a visual gap rather than a warm transition — this is aesthetic preference, not a functional failure.

**Ref:** `theme.css:293-297`, `theme.css:326-330`, `base.css:211-234`

---

### 8. Performance (self-hosted fonts, no CDNs) — 95 ✅

**✅ Zero CDN dependencies.** No Google Fonts `<link>`, no `fonts.googleapis.com`, no `fonts.gstatic.com`. All fonts are `@font-face` WOFF2 from `../../assets/fonts/`.

**✅ Font files exist** in `shared/assets/fonts/`:
- `cormorant-garamond-600-latin.woff2`, `cormorant-garamond-700-latin.woff2`
- `cinzel-400-latin.woff2`, `cinzel-700-latin.woff2`
- `lora-400-latin.woff2`, `lora-500-latin.woff2`
- `nunito-sans-400-latin.woff2`, `nunito-sans-500-latin.woff2`, `nunito-sans-600-latin.woff2`
- `fira-code-400-latin.woff2`, `fira-code-500-latin.woff2`

All with `font-display: swap`.

**⚠️ Amir's SVG lantern is inline in the HTML, not lazy-loaded** — acceptable as it's only on 4 pages and small. The `setTimeout` in inline `<script>` blocks that show the mascot use vanilla JS with no external calls.

**⚠️ `scroll-behavior: smooth` on `html`** (base.css:17) — smooth scroll is a nice-to-have but is overridden by `prefers-reduced-motion` reset (`scroll-behavior: auto`). This is correct behavior.

**Ref:** `base.css:77-154`

---

### 9. Content Accuracy — 85 ⚠️

**What works:**
- Install snippet in `download.html` is verbatim from `content.json.install.primary.command`. Correct.
- `download.html` ecosystem cards are verbatim from `content.json.ecosystem[]`.
- `clients.html` client cards match `content.json.clients[]` — correct names, highlights, taglines, status badges, repos.
- All 8 features present on `features.html` with correct `id` anchors.
- FAQ on `about.html` has all 6 items from `content.json.faq[]` with correct answers.
- License copy on `about.html` and in footer is factually correct: "Phlix Server and the Hub are MPL-2.0. The shared libraries, plugins, and clients are MIT." — not a blanket "across the board" license claim.
- Footer columns match `content.json.footer.columns` link-for-link.

**❌ `craftsman-guide.html` is content that is not sourced from `content.json`.** The page contains developer documentation content (plugin authoring, brand-kit building, contributing) that does not appear in `content.json` and was not generated from any kit field. It is an extra page that augments the spec's required 8 pages with content invented outside the content contract. It must be removed.

**❌ `sitemap.xml` lists 9 URLs.** The spec requires 8 canonical pages + `404.html`. The sitemap currently lists 9 including `craftsman-guide.html` and also lists `404.html` (which should be `noindex` per spec §4 and is excluded from the required 8).

**⚠️ `download.html` mentions `hub.phlix.tv` as the "public Hub"** (`hub.html:110-111`). This domain is not in `content.json`. The FAQ answer for "Do I need to expose my server to the internet?" says "use the public one" without naming it, and `content.json` contains no domain name for the hub. `hub.phlix.tv` is an unverified claim.

**⚠️ The "visitor-paths" fork on `index.html:101-156`** is a `visitor_paths` experience override that is not declared in the kit. The kit's schema does not include `visitor_paths`. This appears to be a self-applied override that the kit did not authorise. While the three paths (library, syncplay, plugins) map to real features, the section header "Who visits the bazaar today?" and the card labels are brand-voiced but not kit-sanctioned copy.

**Ref:** `download.html:110-112` (hub.phlix.tv), `sitemap.xml` (9 URLs)

---

### 10. CTA / Funnel — 90 ✅

**What works:**
- Primary CTA "Enter the Bazaar" / "Your Passage In" is above the fold on home.
- Primary CTA uses `.btn-primary` (terracotta `#E8531A`) — correct for the brand.
- Secondary CTA "Read the docs" / "See the Craftsmanship" on home, ghost copper style.
- Every page ends with a `.cta-banner` driving toward download or docs.
- Download page correctly drives to docs as the final CTA (per spec §3.4).
- Download page has "Full install docs →" link to `https://detain.github.io/phlix-docs/install/linux` — matches `content.json.install.docs_url`.

**⚠️ The `index.html` hero CTA "See the Craftsmanship" points to `features.html`** — the secondary CTA is to features, not to docs. Per spec §3.1 the secondary CTA should be `hero.secondary_cta` which in `content.json` is "Read the docs". The secondary CTA label was re-voiced to "See the Craftsmanship" (acceptable as brand voice) but correctly points to `features.html`. The link destination is inconsistent with `content.json.hero.secondary_cta.href` (`https://detain.github.io/phlix-docs`), but since this is a `copy_overlay` re-voice of the label only, the spec (§19.7) says the destination should stay honest — here it goes to features which is a valid destination.

**Ref:** `index.html:94-95`

---

### 11. Social Metadata (OG + Twitter) — 100 ✅

**All pages have complete social metadata:**
- `og:type=website`, `og:site_name=Phlix`, absolute `og:url`, `og:title`, `og:description`, absolute `og:image` pointing to `https://detain.github.io/phlix-website/moroccan-bazaar/img/og.png`
- `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator=@detain`
- `theme-color=#E8531A` (terracotta, kit primary)
- `<link rel="icon" href="img/favicon.svg" type="image/svg+xml">`
- `og:image` is a real PNG (1200×630 confirmed by `file` command), not SVG

**Ref:** `index.html:16-38`, same pattern on all 8 pages + 404.html + craftsman-guide.html

---

### 12. Localization — 95 ✅

**What works:**
- `<html lang="en">` on every page — from `site.default_locale` ("en").
- All user-facing copy is ASCII English. No hard-coded localeUnsafe formatting.
- Font subset to Latin scripts only.
- `overflow-wrap: anywhere` / `break-word` handles long tokens in narrow tracks for RTL readiness.
- Logical CSS properties (`margin-inline`, `inset`) used throughout, not `margin-left`/`margin-right`.

**⚠️ No `lang` attribute switching for alternate locales.** The spec says "localization readiness" not "full i18n." The site has one locale (`en`). The `html lang="en"` is correct for its single-locale scope.

**Ref:** `index.html:2` — all pages

---

### 13. Experience Fidelity — 82 ⚠️

**What works:**
- Amir the copper lantern mascot is present on home and download pages per kit's `mascot.behavior` spec. The implementation follows the spec: sway animation (`amir-sway` keyframe, 4s ease-in-out infinite), copper glow drop-shadow, dismiss button "Amir, tend the lamp" with `sessionStorage` persistence, easter egg (click:3 → zellige cascade), hover-hold (2s → whisper).
- Seasonal activation (live-js) is implemented in `main.js:11-52` — Ramadan Lanterns, Harvest Souk, Rose Water Spring — matching the kit's `seasonal_activation` spec exactly.
- Visitor path cards, zellige dividers, copper glow shadows, warm dark surfaces — all present and brand-consistent.
- The `typed-word` easter egg (typing "bazaar") is implemented without `preventDefault`, disabled in inputs/textareas, exits on `Esc` — per §19.8.
- `hero_experience` is the default static fallback per spec (no special JS hero interaction declared).
- `navigation_model` is the standard topbar fallback (per kit, no exotic nav model declared).

**❌ The `craftsman-guide.html` experience is not defined in the kit's schema or `content.json`.** It presents itself as a "Craftsman's Guide" for developers but the kit has no such declared `site_architecture` or `page_blueprints` entry. This is an orphan page that dilutes the experience fidelity — visitors find a developer guide that was never announced in the nav or the kit's declared information architecture.

**⚠️ `visitor_paths` on index.html is a `visitor_paths` experience override the kit did not declare.** The kit's schema (§2A) lists `visitor_paths` as an opt-in field. The kit does not declare it. Applying an undeclared experience override violates the "override rule" — absent a field, the default behavior is retained.

**⚠️ The `index.html` homepage sections include a "visitor-path selector" (lines 101-156) and a "trusted-artisans" proof section (lines 361-429) that are not part of the standard home page spec (§3.1).** The spec defines: hero → pitch → features overview → CTA banner. The visitor-paths and trusted-artisans sections are additions. They are brand-consistent in style, but they expand the page beyond the spec without being declared as a `homepage_narrative` override in the kit.

**Ref:** `index.html:101-156`, `index.html:361-429`, `craftsman-guide.html` (unauthorized page)

---

## Critical Fixes Required

### ❌ P0 — Fix #1: Add "Plugins" and "Docs" to every primary nav

The primary nav on every HTML file (all 9 files including 404.html) currently has 6 links. Add:

```html
<li><a href="plugins.html">Plugins</a></li>
<li><a href="docs.html">Docs</a></li>
```

Between "Your Passage In" (download) and "Reach from Afar" (hub). Full 8-link order per new_site.md §5:
`Home | Features | Clients | Download | Plugins | Docs | Hub | About`

### ❌ P0 — Fix #2: Remove `craftsman-guide.html`

This page is not a spec page, has no canonical place, is not in the nav, and is not sourced from `content.json` or any kit field. It must be deleted from the filesystem and removed from `sitemap.xml`. If developer documentation is needed, it should be served from the external docs site (`https://detain.github.io/phlix-docs`) — the `docs.html` page already links there.

### ❌ P0 — Fix #3: Remove `craftsman-guide.html` from `sitemap.xml`

Delete the `<url>` entry for `craftsman-guide.html` from `sitemap.xml`. The sitemap must contain only the 8 canonical pages. `404.html` should not be in the sitemap either (it is `noindex`).

### ⚠️ P1 — Fix #4: Remove `hub.phlix.tv` from `hub.html`

`hub.html:110` mentions "The public Hub at `hub.phlix.tv`". This domain does not appear in `content.json`. Remove it or replace with "the public Hub" without a specific domain.

### ⚠️ P1 — Fix #5: Verify `og.png` was generated via `tools/gen-og.mjs`

Confirm that `img/og.png` was rasterized from `img/og.svg` using `node tools/gen-og.mjs --site moroccan-bazaar` (per §19.5), not manually. If it was manual, re-run the tool.

### ⚠️ P2 — Fix #6: Add JSON-LD `SoftwareApplication` block to `index.html`

Per new_site.md §10, the home page must include a JSON-LD structured data block with `SoftwareApplication` schema (name, description, applicationCategory, operatingSystem, offers/price=0, license).

---

## Summary of Violations

| Severity | Count | Issue |
|----------|-------|-------|
| ❌ P0 | 3 | Missing Plugins + Docs from primary nav; unauthorized craftsman-guide.html; craftsman-guide in sitemap |
| ⚠️ P1 | 2 | Unverifiable og.png generation; hub.phlix.tv domain not in content.json |
| ⚠️ P2 | 1 | Missing JSON-LD on home page |
| ⚠️ P3 | 3 | visitor_paths override not declared in kit; homepage sections beyond spec; seasonal variant live mode confirmed |

**Linter:** `npm run lint` passes clean. No HTML/CSS/JS lint errors.

**Recommendation:** NOT APPROVED until all P0 issues are resolved. P1 issues should be resolved before deployment. P2/P3 issues are lower priority but accumulate.
