# neon-blossom Brand Kit Site Review

**Reviewer:** Hostile audit  
**Date:** 2026-07-29  
**Ground truth:** `new_site.md` + `shared/content.json`  
**Linter:** `npm run lint` — **PASS** (zero warnings)

---

## 13-Dimension Assessment

### 1. Brand Fidelity & Spirit — ⚠️ 88/100

**Strong.** Neon blossom aesthetic is cohesive: dark (#08010f) background, hot pink (#FF2D78) primary, violet (#9B30FF) secondary, gold (#FFD166) tertiary, green (#39FF85) quaternary. Typography stack (Cormorant Garamond headline, Lato body, DM Sans UI, Fira Code mono) matches the "midnight garden" narrative. Mascot "Lumia" the moth fits the theme. Seasonal color overrides in JS (§2A opt-in) are brand-consistent.

**Deduction:** Nav only has 6 links instead of required 8, so Plugins and Docs pages exist but are unreachable from primary navigation. This breaks the shared shell contract.

---

### 2. SEO — ❌ FAIL (62/100)

**Issues:**
- ❌ `<link rel="canonical">` **missing from every page** — spec §10 requires absolute canonical URL on each page
- ❌ No JSON-LD `SoftwareApplication` block on home page — spec §10 explicitly requires this
- ✅ Title tags are page-specific and under 60 chars
- ✅ Meta descriptions present and under 160 chars
- ✅ Keywords meta present
- ✅ Sitemap has all 8 pages with absolute URLs (but 404.html correctly excluded)

**Fixes needed:** Add `<link rel="canonical">` to every page `<head>`. Add JSON-LD to index.html.

---

### 3. Readability — ✅ 92/100

**Strong.** 1rem base with 1.7 line-height. `max-width: 68ch` on `<p>` prevents line overstretch. `clamp()`-based type scale from 2.5rem→4.5rem on h1 down to 0.75rem on text-xs. Sufficient contrast ratios (secondary-safe tokens at 4.5:1 for small text). Body copy is clean and brand-voiced.

---

### 4. Spelling & Grammar — ✅ 95/100

**Clean.** No spelling or grammar errors detected in any content. Brand copy (e.g., "Where the Night Blooms", "Every petal, electric", "Plant your first seed") is consistent with the neon garden voice. Content.json facts are accurately rendered.

---

### 5. Usability — ❌ FAIL (70/100)

**Critical issue:** The primary navigation on **every page** only has 6 links:

```
Home · Features · Clients · Download · Hub · About
```

Spec §5 requires 8 links in order: **Home · Features · Clients · Download · Plugins · Docs · Hub · About**

The **Plugins** and **Docs** pages exist (confirmed: `plugins.html`, `docs.html` in sitemap and filesystem), but they are **not in the primary nav** on ANY page. Users cannot discover these pages from the main navigation. This is a fundamental navigation regression.

**Secondary issues:**
- Download page has broken install command formatting (lines 303-305: `git clone... cd phlix-server composer install` all on one line — missing newlines between commands)
- The `download.html` page also uses `features.html` → `clients.html` → docs ladder which is appropriate

---

### 6. Accessibility (WCAG 2.2 AA) — ⚠️ 85/100

**Issues:**
- ❌ `aria-expanded` on FAQ buttons defaults to `false` but never gets toggled to `true` on open — should be `aria-expanded="true"` when `.faq-item--open` is present
- ❌ The FAQ buttons do not use `aria-controls` to associate with their answer panels
- ❌ Mascot `role="img"` with `aria-label` is correct, but the dismiss button inside has no accessible name context beyond "Dismiss Lumia" — `aria-label` is on button but text content is just "×"
- ✅ Skip link present and targets `#main-content`
- ✅ All landmarks (`banner`, `navigation`, `main`, `contentinfo`) appear exactly once
- ✅ `aria-current="page"` on active nav link
- ✅ `prefers-reduced-motion` respected: CSS reset in base.css AND JS implementation with localStorage persistence
- ✅ All touch targets ≥44×44px (nav-toggle 44×44, buttons have padding giving equivalent)
- ✅ Layout survives 200% zoom (fluid grids, `clamp()` typography, `overflow-wrap: anywhere` on text)

**Note:** The `reduce-motion-toggle` has `aria-label="Reduce motion"` on the checkbox input — this is redundant with the adjacent `<span>` but not incorrect.

---

### 7. Responsive (320→1920) — ⚠️ 88/100

**Good.** Fluid grids use `minmax(0, 1fr)` correctly (§19.12 fix applied — no `1fr` bare tracks). `clamp()` typography prevents text overflow. Footer grid collapses properly (3→2→1 columns). Mobile nav is a toggle with `aria-expanded` synced.

**Deduction:** Grid is `grid-template-columns: repeat(3, minmax(0, 1fr))` on desktop, but the features-overview and proof-grid sections could use explicit `minmax(0, 1fr)` to be spec-compliant. At 320px the install command block overflows horizontally in the hero section on download.html due to the concatenated one-liner.

---

### 8. Performance (self-hosted fonts, no CDNs) — ✅ 95/100

**Excellent.** 
- ✅ Zero CDN dependencies. No Google Fonts links found.
- ✅ All `@font-face` declarations point to `../../assets/fonts/*.woff2` — self-hosted WOFF2
- ✅ `font-display: swap` on all font faces
- ✅ `defer` on `<script src="js/main.js">`
- ✅ CSS is split into base/theme/components (non-render-blocking)
- ✅ No analytics or third-party scripts

**Deduction:** Font files are loaded via `../../assets/fonts/` paths from inline `<style>` blocks in `<head>` — these block rendering. Could be improved by moving to CSS files, but acceptable.

---

### 9. Content Accuracy (install from content.json) — ❌ FAIL (70/100)

**Critical bug:** `download.html:303-305` renders the `from_source` install block as:

```
git clone https://github.com/detain/phlix-server.git cd phlix-server composer install
```

All three commands are concatenated onto **one line without newlines**. The spec in `new_site.md §2` and `content.json` shows:

```
"command": "git clone https://github.com/detain/phlix-server.git\ncd phlix-server\ncomposer install"
```

The `\n` newlines are lost — this renders as a single-line string that would fail if copy-pasted. **This is a content regression.**

**Secondary:** The from_source block label correctly says "Build from source (development, not an install)" — accurate to content.json.

---

### 10. CTA / Funnel — ✅ 90/100

**Strong.** Primary CTA "Get Phlix" links to `/download` (→ `download.html`). Secondary CTA "Read the docs" links to external docs. Download page has prominent install block. All pages end in a `.cta-section` driving toward download or docs. The funnel from home to download is ≤2 clicks. Labels are honest (no mismatched href/text).

---

### 11. Social Metadata (OG + Twitter, og:image PNG) — ❌ FAIL (72/100)

**Missing:**
- ❌ `twitter:creator=@detain` is **missing from ALL pages** — spec §11 explicitly requires `twitter:creator=@detain`
- ❌ `theme-color` meta tag is **missing from ALL pages** — spec §11 requires `<meta name="theme-color">` = kit primary color
- ❌ `<link rel="canonical">` missing (also an SEO issue)
- ✅ `og:image` is absolute URL: `https://detain.github.io/phlix-website/neon-blossom/img/og.png`
- ✅ `og.png` exists as 115KB PNG (not SVG)
- ✅ All OG tags present: `og:type=website`, `og:site_name`, `og:url`, `og:title`, `og:description`
- ✅ Twitter card is `summary_large_image`

---

### 12. Localization — ✅ 94/100

**Good.** `<html lang="en">` set correctly from `site.default_locale`. All user-facing strings trace to content.json. `overflow-wrap: anywhere` on body text supports longer translations. CSS uses logical properties (`margin-inline`, `inset`) where appropriate, not hard-coded `left/right`. Fonts are subset to Latin.

**Deduction:** No `lang` attribute variant (not expected since only `en` is supported in `supported_locales`).

---

### 13. Experience Fidelity — ⚠️ 85/100

**Good brand execution.** The neon garden aesthetic is fully realized: electric orchid purples, neon pink glows, gold accents, midnight dark surfaces, organic "bloom" animations, floating moth mascot with pollen particle effects. Seasonal color overrides via JS. The reduced-motion toggle is persistent via localStorage.

**Deductions:**
- The mascot can cover CTA at certain viewport sizes (mascot is `position: fixed; bottom: var(--space-8); right: var(--space-8)` — at 320px this may overlap content; spec §19.11 warns against this)
- Nav only has 6 links instead of 8, breaking discoverability of Plugins and Docs pages

---

## Summary

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 88 | ⚠️ |
| 2 | SEO | 62 | ❌ |
| 3 | Readability | 92 | ✅ |
| 4 | Spelling & grammar | 95 | ✅ |
| 5 | Usability | 70 | ❌ |
| 6 | Accessibility | 85 | ⚠️ |
| 7 | Responsive | 88 | ⚠️ |
| 8 | Performance | 95 | ✅ |
| 9 | Content accuracy | 70 | ❌ |
| 10 | CTA / funnel | 90 | ✅ |
| 11 | Social metadata | 72 | ❌ |
| 12 | Localization | 94 | ✅ |
| 13 | Experience fidelity | 85 | ⚠️ |

---

## FIXES NEEDED

### P0 — Must fix before approval

1. **Nav regression** — Add `Plugins` and `Docs` links to primary nav on every page. Order must be: Home · Features · Clients · Download · Plugins · Docs · Hub · About (`index.html:124-131`, `features.html:111-118`, `download.html:118-125`, `clients.html`, `hub.html`, `about.html`, `docs.html`, `plugins.html`)

2. **Missing canonical URLs** — Add `<link rel="canonical" href="https://detain.github.io/phlix-website/neon-blossom/{page}.html">` to `<head>` of every page

3. **Missing JSON-LD** — Add SoftwareApplication JSON-LD block to `index.html` per spec §10

4. **Missing twitter:creator** — Add `<meta name="twitter:creator" content="@detain">` to every page `<head>`

5. **Missing theme-color** — Add `<meta name="theme-color" content="#ff2d78">` to every page `<head>`

6. **Broken from_source install command** — `download.html:303-305` renders three commands on one line. Must preserve the `\n` line breaks in the rendered output so the command can be copy-pasted line by line.

### P1 — Should fix

7. **FAQ accessibility** — Add `aria-controls` to `.faq-question` buttons and toggle `aria-expanded` on open/close

8. **Mascot placement check** — Verify mascot doesn't overlap CTA at 320px viewport (spec §19.11)

---

## NOT APPROVED

Multiple ❌ dimensions and P0 fixes required. Site is 82/100 weighted average but has blocking regressions in SEO, usability (nav), and content accuracy (broken install command).
