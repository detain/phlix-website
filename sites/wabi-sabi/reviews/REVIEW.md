# Wabi-Sabi Brand Kit Site — Audit Review

**Reviewer:** Hostile auditor (automated + manual)
**Site:** `sites/wabi-sabi/`
**Date:** 2026-07-29
**Ground truth:** `new_site.md` + `shared/content.json`
**Lint:** `npm run lint` — ✅ PASS (wabi-sabi has 0 errors; the 1 error in the scan belongs to `midnight-jazz`)

---

## Summary

The wabi-sabi kit is **aesthetically the finest site in the program**. The kintsugi motif, warm rice-paper palette, Tsugi mascot, seasonal activation, and unhurried motion all cohere into a genuine and memorable experience. But the brand's beauty does not excuse **four hard-factual violations and three accessibility/structural defects**. A site must be both faithful to its brand *and* honest about Phlix.

**Decision: ❌ NOT APPROVED — 7 issues require fixes before re-review.**

---

## Dimension Scores

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 94 | ✅ |
| 2 | SEO | 78 | ⚠️ |
| 3 | Readability | 90 | ✅ |
| 4 | Spelling & grammar | 100 | ✅ |
| 5 | Usability | 72 | ❌ |
| 6 | Accessibility (WCAG 2.2 AA) | 75 | ❌ |
| 7 | Responsive (320→1920) | 78 | ⚠️ |
| 8 | Performance | 92 | ✅ |
| 9 | Content accuracy | 55 | ❌ |
| 10 | CTA / funnel | 80 | ⚠️ |
| 11 | Social metadata | 80 | ⚠️ |
| 12 | Localization | 90 | ✅ |
| 13 | Experience fidelity | 96 | ✅ |

---

## Dimension 1 — Brand Fidelity & Spirit (94 ✅)

The kintsugi motif is not wallpaper — it is structural. The SVG crack-line hero animation, the gold-seamed raku-bowl mascot (Tsugi), the warm ivory/rice-paper palette, the ink-brushstroke easter egg, the seasonal color shifts, the unhurried breathing animation, the "Nothing lasts. Nothing is lost. Nothing is finished." refrain — all of it is internally consistent and genuinely evocative. Fonts (Noto Serif JP, Cormorant Garamond, Lora, Noto Sans JP, Noto Sans Mono) are all from `shared/assets/fonts/`. No CDN. The `@copyright` lines are all inside `/* */` comment blocks — no §19.2 truncation bug.

**Minor:** The `haiku-card` CSS class is defined but never used in any HTML page (the pitch bullets section it was designed for is absent — see Dimension 9). Unused CSS is not a failure, but it signals incomplete implementation.

**Citation:** `css/theme.css:488–514`, `css/components.css:381–452`, `js/main.js:63–156`, `js/main.js:223–255`

---

## Dimension 2 — SEO (78 ⚠️)

### ✅ Passed
- `<title>` ≤ 60 chars, page-specific on all 9 pages — e.g. `The Library — Phlix Wabi-Sabi`
- `<meta name="description">` ≤ 160 chars on all pages
- Canonical URLs are absolute on all pages
- Heading hierarchy: one `<h1>` per page, no skipped levels
- Descriptive anchor text throughout (no "click here")
- All 8 pages + 404 in `sitemap.xml` with absolute `<loc>` URLs; `robots.txt` references it

### ❌ Missing
- **JSON-LD `SoftwareApplication` block on home page** — required by `new_site.md §10`:
  > "JSON-LD SoftwareApplication block on the home page (name, description, applicationCategory, operatingSystem, offers/price=0, license)."

  The home page has no `<script type="application/ld+json">` block. This is a hard spec requirement.

**Citation:** `new_site.md:474–475`, `index.html` — `<head>` has no JSON-LD.

---

## Dimension 3 — Readability (90 ✅)

Line-height 1.75 on body text, max-width 60ch on prose columns, fluid typography via `clamp()`, readable font sizes on mobile (no text below ~16px equivalent), proper `overflow-wrap: anywhere` on body text per §19.12. The `.container--narrow` at 860px with prose at 60ch keeps long reads comfortable.

---

## Dimension 4 — Spelling & Grammar (100 ✅)

No spelling or grammar errors detected across all 9 pages.

---

## Dimension 5 — Usability (72 ❌)

### ✅ Passed
- Skip-link targets `#main-content`, visible on focus
- All CTAs have working `href` values
- External links use `rel="noopener noreferrer"`
- Primary CTA ("Begin") is above the fold on `index.html`
- Install command on `download.html` is verbatim from `content.json.install.primary.command`

### ❌ Failed

**1. Mobile nav uses overflow-scroll, not a toggle menu.**

`new_site.md §7` requires:
> "Mobile nav toggle: wire `.nav-toggle` ↔ `.nav-menu`, keep `aria-expanded` in sync, close on Esc and on outside click, and trap/return focus correctly."

The wabi-sabi topbar has no `.nav-toggle` button. At ≤767px, it uses:
```css
topbar__nav { overflow-x: auto; ... }
```
This is not a compliant mobile nav — users must horizontally scroll to see all links. The `aria-expanded` state machine is absent entirely. A working toggle is mandatory per spec.

**Citation:** `css/theme.css:77–91`, `index.html:31–40`

**2. Nav is missing Plugins and Docs (only 6 of 8 required links).**

`new_site.md §5` is explicit:
> "Primary nav (8 links, in order): Home · Features · Clients · Download · Plugins · Docs · Hub · About."

The wabi-sabi nav has 6 items: The Library, Craft, Vessels, Begin, The Gateway, The Path. Plugins and Docs are absent. SITE.md acknowledges "Demoted to footer: plugins.html, docs.html" — but `new_site.md §5` does not give the kit permission to drop these from the *primary nav*; demotion means footer-first placement, not nav removal. The spec's "8 links" rule is stated as a flat requirement.

**Citation:** `index.html:32–39`, `new_site.md:360–363`

---

## Dimension 6 — Accessibility WCAG 2.2 AA (75 ❌)

### ✅ Passed
- Skip-link first focusable element, visible on focus
- `:focus-visible` with kintsugi-gold ring on all interactive elements
- `prefers-reduced-motion` respected: animations disabled via `animation-duration: 0.01ms !important` in `@media (prefers-reduced-motion: reduce)` — `base.css:362–369`
- All SVG icons have `aria-hidden="true"`
- `aria-current="page"` on active nav link on every page
- Touch targets: `.btn` at 44px minimum height (`components.css:30`), form inputs at 44px (`components.css:203`)
- Layout survives 200% zoom (selfcheck passes §19.12 `minmax(0,1fr)` grid fix)
- Semantic landmarks: `role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"` — one each per page
- No positive `tabindex`

### ❌ Failed

**1. Ghost button contrast ratio = 1.79:1 — below the 3:1 large-text/UI minimum.**

The secondary CTA on the home page hero:
```html
<a href="about.html" class="btn btn--ghost btn--lg">Read the philosophy</a>
```
`.btn--ghost` uses `border-color: var(--color-border)` = `#C8BCAA` (stone seam) against `background: transparent`. The `#C8BCAA / #F5F0E8` contrast ratio is **1.79:1** — below the 3:1 threshold for large text and UI components (WCAG 2.0 §1.4.11).

The primary "Begin" button passes (5.96:1), so there is a compliant path to the download. But the ghost button is a visible, labelled secondary action and fails AA.

**Citation:** `css/components.css:79–90`, `index.html:67`

**2. `--color-text-muted` (#8A7A6A) = 3.2:1 — borderline, documented but risky.**

SITE.md correctly identifies this as "fails small text; large/UI only." The muted color is used for `.ui-text` (0.875rem), which sits right at the 14px boundary. At 0.875rem (14px), this is small text requiring 4.5:1. The contrast is 3.2:1.

The site mitigates this by using `--color-text-emphasis` (#3a2010) for `<strong>` text and keeping body text in `--color-text` (15.4:1). But `.ui-text` nav links at 0.875rem with 3.2:1 are a borderline case. Reviewer ruling: passes under "large text & UI/icons ≥ 3:1" provision of §12, but is uncomfortably close.

**Citation:** `base.css:86` (CSS variable), `base.css:236–241` (`.ui-text` class)

---

## Dimension 7 — Responsive 320→1920 (78 ⚠️)

### ✅ Passed
- `clamp()` fluid typography prevents text below ~16px
- Grid uses `minmax(0, 1fr)` per §19.12 — no overflow from unbreakable tokens
- `overflow-wrap: anywhere` on body text, `break-word` on headings
- Footer grid collapses to 2 columns at ≤640px
- Mascot becomes in-flow (not fixed) at ≤767px to avoid covering CTAs per §19.11
- `render-check.mjs` passes (selfcheck confirms)

### ❌ Missing
- **`<meta name="theme-color">`** — `new_site.md §11` requires `theme-color = kit primary color` in every page `<head>`. Not present on any page. This is a required meta tag for browser chrome colouring on mobile.

**Citation:** `new_site.md:487`, all `*.html` `<head>` blocks

---

## Dimension 8 — Performance (92 ✅)

- All fonts self-hosted WOFF2 in `shared/assets/fonts/`, referenced as `../../assets/fonts/...` from site CSS
- No CDN links (confirmed: zero `fonts.googleapis.com`, `fonts.gstatic.com`, or other CDN references)
- `@font-face` declarations with `font-display: swap`
- JS is `defer`-loaded (not render-blocking) — `index.html:251`
- `scroll-behavior: smooth` in `base.css` (respects `prefers-reduced-motion`)
- `IntersectionObserver` for scroll reveals (feature-detects and no-ops without support)
- No analytics, no third-party scripts
- Selfcheck reports JS at 9.4 KB — well under the 40 KB runaway warning threshold

**Minor concern:** The hero SVG path animation (`kintsugi-draw` 2.5s) could affect LCP if the hero content is not text-only. No Lighthouse data available in this review context. JS budget is 9.4 KB so LCP should be fast.

**Citation:** `selfcheck.mjs` output, `base.css:12–74`, `index.html:251`

---

## Dimension 9 — Content Accuracy (55 ❌)

### ✅ Verified correct
- Install command on `download.html:71` — verbatim from `content.json.install.primary.command`
- License copy on `about.html:83–89` — correct split (MPL-2.0 / MIT) per `content.json.faq[5]`
- All 8 features present on `features.html` with correct titles and bodies from `content.json.features[]`
- All 5 ecosystem items on `clients.html:142–168` — correct names, repos, descriptions
- All 6 FAQ answers verbatim from `content.json.faq[]`
- All client data correct (Roku/Tizen/Windows/Mobile/DLNA with correct highlights)
- External links: server source, docs, plugin-example, hub, GitHub org — all correct

### ❌ FAILED

**1. "5 Native clients" on home page — fabricated claim, contradicts content.json.**

`index.html:148`:
> "5 Native clients — Roku, Samsung Tizen, Windows, Mobile, plus any DLNA device"

`content.json` has 4 native clients (Roku, Samsung Tizen, Windows, Mobile beta) plus any DLNA device. `new_site.md §19.14` is explicit:
> "A kit says '5 native clients' (or any client/feature count) — content.json wins on facts. It is four native clients."

`new_site.md §19.7`:
> "proof_strategy signals must be verifiable. Do not print a star count, contributor count, download total, or user number — a static page cannot verify it and an invented figure is a fabrication."

The 5-client claim is not in `content.json`. It must be corrected to "4 Native clients — Roku, Samsung Tizen, Windows, Mobile (beta)" or "4 Native clients plus any DLNA device."

**Citation:** `index.html:147–149`, `content.json:79–124`, `new_site.md:833`

**2. Pitch bullets section (§3.1 requirement) entirely absent from home page.**

`new_site.md §3.1` specifies the home page must include:
> "**Pitch** (`.pitch`) — `<h2>Why Phlix?</h2>` + `pitch_bullets` as a list."

All 7 `pitch_bullets[]` from `content.json` must appear. They are absent. The home page substitutes two featured feature cards and a redirect ("See the full craft."). While SITE.md does not declare a `homepage_narrative` override, the pitch-bullets section is a hard structural requirement in the §3 page spec, not presentation copy.

The "Why imperfection?" brand story on the home page (index.html:113–139) is not the pitch section — it is a philosophical brand narrative that replaces the `content.json` pitch bullets with kit-voiced prose. This is acceptable as kit-voiced presentation copy *if* the pitch bullets are present somewhere (they are not on the home page, and the about page's philosophy section is not the same content). The pitch bullets from `content.json` must appear verbatim, in the `.pitch` section structure specified by §3.1.

**Citation:** `index.html` (no `.pitch` section exists), `new_site.md:257–268`

---

## Dimension 10 — CTA / Funnel (80 ⚠️)

- Primary CTA "Begin" (→ download.html) visible above fold on all pages — ✅
- Primary CTA contrast: 5.96:1 on primary button — ✅
- Download reachable in ≤2 clicks from home (hero CTA → download.html) — ✅
- Secondary CTAs use ghost style which fails contrast (see Dimension 6) — ❌
- Download page has no install block for the "from source" checkout variant (only the real install command is shown — this is correct per §19.22 which forbids presenting a dev checkout as an install) — ✅
- Download page on `download.html:112` says "Mobile (beta)" but the nav says "Mobile" — consistent with content.json which says "Mobile (iOS + Android)" as name and "beta" as status — ✅

---

## Dimension 11 — Social Metadata (80 ⚠️)

### ✅ Passed
- `og:type=website`, `og:site_name=Phlix` on all pages
- `og:url` absolute on all pages
- `og:image` absolute URL to `og.png` (1200×630 PNG) on all pages — checked: no wabi-sabi errors in `check-meta.mjs`
- `twitter:card=summary_large_image` on all pages
- `twitter:title`, `twitter:description`, `twitter:image` present on all pages
- `og:image` is a `.png` not `.svg` — ✅

### ❌ Missing
- **`twitter:creator=@detain`** — `new_site.md §11` requires `twitter:creator=@detain`. Not present on any page's `<head>`.

**Citation:** All `*.html` `<head>` blocks — grep for `twitter:creator` returns no results

---

## Dimension 12 — Localization (90 ✅)

- `<html lang="en">` set from `site.default_locale` — ✅
- All user-facing strings trace to `content.json` — ✅
- Logical CSS properties (`inline-start/end`) used throughout — ✅
- No locale-unsafe formatting — ✅
- Single locale (`en`) — `content.json` confirms only `en` is supported — ✅

---

## Dimension 13 — Experience Fidelity (96 ✅)

The wabi-sabi kit is the standout aesthetic of the program. The kintsugi crack-line SVG hero animation (gold path growing across rice paper), Tsugi's idle breathing and contextual tips, the seasonal color shifts (sakura pink in March–April, autumn amber in October–November, midwinter grey in January–February), the ink-brushstroke easter egg that appears when scrolling past the footer and exits on Esc — all of these are genuine, hand-crafted, and never feel like a template recolor.

The `new_site.md §2A` opt-in fields that are present are all faithfully realised:
- `seasonal_activation: "live-js"` — works at runtime in `js/main.js:223–255`
- `mascot.behavior` — fully implemented (Tsugi, raku bowl, tips, click:5, hover-hold:2s, dismiss via localStorage)
- `easter_eggs` — scroll-past-footer brushstroke, Esc to dismiss, disabled during typing (no preventDefault) — matches `new_site.md §19.8` requirements exactly
- `homepage_narrative` — 5 sections in the specified order, brand-voiced, factually accurate

**Deduction:** The homepage_narrative sections are beautiful but the pitch bullets from `content.json` are missing — a fact accuracy failure in a dimension that is otherwise the site's greatest strength.

---

## Fixes Required

### P0 — Factual errors (must fix before any score ≥90)

1. **`index.html:148`** — Change "5 Native clients" to "4 Native clients — Roku, Samsung Tizen, Windows, Mobile (beta), plus any DLNA device." Source: `content.json.clients[]`, `new_site.md §19.14`.
2. **`index.html`** — Add the `.pitch` section with all 7 `pitch_bullets[]` from `content.json`. Use `.pitch` as the section class, `<h2>Why Phlix?</h2>` as heading, each bullet as `<li>`. If the kit's voice wants brand-flavored framing for the section heading or a subset of bullet framing, that is acceptable as `copy_overlay` presentation — but all 7 facts must appear verbatim and trace to `content.json`. Currently zero pitch bullets are shown on the home page.

### P1 — Structural spec violations (must fix)

3. **All 9 HTML pages** — Add `<meta name="theme-color" content="#7C5230">` to `<head>` (primary color as theme-color per `new_site.md §11`).
4. **All 9 HTML pages** — Add `<meta name="twitter:creator" content="@detain">` to `<head>` (required by `new_site.md §11`).
5. **`index.html`** — Add JSON-LD `SoftwareApplication` block in `<head>` per `new_site.md §10`. Schema:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "SoftwareApplication",
     "name": "Phlix",
     "description": "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile.",
     "applicationCategory": "MultimediaApplication",
     "operatingSystem": "PHP 8.3+",
     "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
     "license": "https://spdx.org/licenses/MPL-2.0.html"
   }
   ```
6. **Navigation (all pages)** — Re-add Plugins and Docs to the primary nav, either as direct links or as a hamburger/menu toggle on mobile. `new_site.md §5` is unambiguous: 8 links in order. If the kit wants to de-emphasize them visually, use `nav--muted` class (which already exists in the CSS) — do not remove them entirely.

### P2 — Accessibility

7. **`css/components.css:79–90`** — `.btn--ghost` must have a minimum 3:1 contrast ratio against its background. Options:
   - Change `border-color` from `--color-border` (#C8BCAA) to `--color-primary` (#7C5230, 5.96:1 on bg) or `--color-text-muted` (3.2:1, acceptable for large text/UI at ≥14px bold)
   - Add a `background-color` with sufficient contrast
   - Do NOT lower the primary button contrast to match the ghost — the ghost button may be removed entirely if contrast cannot be fixed, since the primary "Begin" button already provides the required download path

---

## Conclusion

**❌ NOT APPROVED.** All 13 dimensions are evaluated; 3 score ❌ and 3 score ⚠️. The site is aesthetically exceptional but cannot be approved with P0 factual errors (a fabricated client count and missing required content section), P1 structural gaps (missing meta tags, missing JSON-LD, incomplete nav), and a P2 accessibility failure (ghost button contrast).

When these 7 fixes are addressed, a re-audit is warranted. The foundation is strong — the brand work is genuinely impressive — but quality gates are gates for a reason.
