# Bollywood Dreams — Brand Kit Site Audit

**Site:** `sites/bollywood-dreams/`
**Reviewer:** Hostile Auditor
**Date:** 2026-07-29
**Ground truth:** `new_site.md` + `shared/content.json`

---

## Executive Summary

**NOT APPROVED.** Two ❌ issues and multiple ⚠️ warnings prevent approval. The brand expression is rich and immersive, but structural regressions and missing content accuracy fixes block the gate.

---

## 1. Brand Fidelity & Spirit — Score: 88 ⚠️

**Verdict:** Rich Bollywood cinema identity. Rangoli SVG borders, peacock mascot Priya, Holi burst gradient, marigold/teal/fuchsia palette, Cinzel Decorative + Playfair Display type, marquee bulb nav style. But:

- ❌ **Nav has only 6 links** (The Lobby, Now Showing, Box Seats, Buy Your Ticket, The Marquee, The Story) — missing **Plugins** and **Docs** from primary nav. Spec §5 requires 8 links. These pages exist (`plugins.html`, `docs.html`) and appear in footer, sitemap, and mirror nav — but are inaccessible from primary nav without a dropdown.

**Evidence:**
- `index.html:94-101` — only 6 `<li>` items
- `features.html:77-86`, `download.html:77-88`, `clients.html:77-86`, `hub.html:71-80`, `plugins.html:74-81`, `docs.html:74-81`, `about.html:74-81`, `404.html:83-90` — all 8 pages have the same 6-link nav

---

## 2. SEO — Score: 75 ❌

**Verdict:** Partial. Critical regressions on hub, plugins, docs.

- ❌ **hub.html, plugins.html, docs.html** — use generic meta descriptions copied from content.json default instead of page-specific descriptions. Spec §10 requires page-specific `<meta name="description">` ≤ 160 chars.
  - `hub.html:8-10` — "Self-hostable PHP media server with native apps..." (generic content.json meta)
  - `plugins.html:8-10` — same generic description
  - `docs.html:8-10` — same generic description
- ❌ **hub.html title** — "Hub — Phlix" instead of "Hub — Phlix Bollywood Dreams". Spec §10 requires `— Phlix Bollywood Dreams` suffix on all pages.
  - `hub.html:6`
- ❌ **plugins.html title** — "Plugins — Phlix" instead of "Plugins — Phlix Bollywood Dreams"
  - `plugins.html:6`
- ❌ **docs.html title** — "Docs — Phlix" instead of "Docs — Phlix Bollywood Dreams"
  - `docs.html:6`
- ✅ All pages have `<link rel="canonical">` (absolute URLs)
- ✅ Heading hierarchy maintained, no skipped levels
- ✅ Descriptive anchor text throughout

---

## 3. Readability — Score: 90 ✅

- ✅ Fluid type scale (`clamp()`), 1.7 line-height on body and li
- ✅ `--max-width-prose: 720px` constrains reading line length
- ✅ `overflow-wrap: anywhere` on body text prevents overflow in narrow tracks
- ✅ No orphan words, logical section breaks
- ⚠️ Hero gradient text (`-webkit-text-fill-color: transparent`) may be unreadable for some users — but the fallback gradient is specified in background-clip

**Evidence:** `theme.css:246-255`, `base.css:129-137`

---

## 4. Spelling & Grammar — Score: 100 ✅

- ✅ All prose appears grammatically correct and typo-free
- ✅ Installation commands are verbatim from `content.json` (`curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`)
- ✅ No contractions in marketing copy that violate brand voice

---

## 5. Usability — Score: 82 ⚠️

- ✅ Mobile nav toggle works (`.nav-toggle` → `.nav-menu.open` class toggle)
- ✅ `aria-expanded` kept in sync
- ✅ Esc key closes menu (line 150-157 `main.js`)
- ✅ Backdrop click closes menu
- ✅ Focus trapped correctly in open menu
- ❌ **Plugins and Docs not reachable from primary nav** — users must use footer or scroll to find them. This is a navigation discoverability failure, especially on mobile where footer is below the fold.
- ✅ Priya mascot dismissible, persists to localStorage
- ✅ Intensity toggle works and persists

**Evidence:** `main.js:128-158`

---

## 6. Accessibility (WCAG 2.2 AA) — Score: 78 ⚠️

- ✅ Skip link present and visible on focus
- ✅ Landmark roles (`role="banner"`, `role="navigation"`, `role="main"`, `role="contentinfo"`)
- ✅ `aria-current="page"` on active nav links
- ✅ `aria-label` on icon-only buttons and SVGs
- ✅ `prefers-reduced-motion` respected (main.js line 107-123, CSS line 409-418)
- ✅ All touch targets ≥ 44×44px (`.btn`, `.nav-toggle` at 44×44px)
- ⚠️ **`a { color: var(--color-secondary); }` at `base.css:226`** — #c06 on #0a0505 = 3.63:1, failing 4.5:1 AA for small text. This is the default link color in the cascade. While all major contexts (nav, footer, buttons) have explicit overrides, any body-text link without an explicit override (e.g., inline links in FAQ answers, ecosystem list items) inherits the failing color. The brand kit's own CSS acknowledges this: `/* Contrast-safe secondary (replaces #c06 on surface bg — measured 3.63:1 → needed 4.5:1) */ --color-secondary-safe: #d63385;` (`base.css:86-87`).
- ✅ No `positive tabindex`
- ✅ No keyboard traps

**Evidence:** `base.css:86-87, 225-229`

---

## 7. Responsive (320→1920) — Score: 88 ⚠️

- ✅ Fluid grid using `minmax(0, 1fr)` (not bare `1fr`) — avoids unbreakable-word overflow
- ✅ Breakpoints at 480px, 768px, 900px, 1024px
- ✅ Mobile nav goes full-width at 480px (`components.css:228-231`)
- ✅ Hero text scales via `clamp()`
- ✅ `overflow-wrap: anywhere` on body text; `break-word` on headings
- ⚠️ **Cannot verify 200% text zoom** without browser render-check (new_site.md §19.10 requires `node tools/render-check.mjs --site bollywood-dreams`). Selfcheck reports JS 20.4 KB.
- ⚠️ **Priya mascot at 320px** — `components.css:1015-1025` positions `.priya-companion` as `position: fixed` at `bottom: var(--space-6); right: var(--space-6)`. At 320px viewport width, this could overlap the CTA depending on footer height. Spec §19.11 requires explicit render-check at 320px.

**Evidence:** `theme.css:103-118`, `components.css:1015-1100`

---

## 8. Performance (self-hosted fonts, no CDNs) — Score: 100 ✅

- ✅ **No Google Fonts CDN** — `base.css:425-501` declares `@font-face` blocks pointing to `../../assets/fonts/...` — self-hosted WOFF2 files
- ✅ `font-display: swap` on all font-face declarations
- ✅ No `fonts.googleapis.com` or `fonts.gstatic.com` in any HTML file (confirmed via grep)
- ✅ JS is vanilla, dependency-free, `defer`-loaded
- ✅ No render-blocking scripts
- ⚠️ 11 `@font-face` rules declared — verify only used weights are loaded (Playfair Display 700+900, Cinzel Decorative 400+700, Lora 400+500, Hind 400+500+600, JetBrains Mono 400+600)

**Evidence:** `base.css:425-501`, grep confirmed zero CDN font references

---

## 9. Content Accuracy — Score: 85 ⚠️

- ✅ Install command verbatim from `content.json.install.primary.command`
- ✅ All 8 features present on `features.html` with correct IDs and descriptions
- ✅ All 5 clients on `clients.html` with correct highlights and status badges
- ✅ All 5 ecosystem items on `download.html`
- ✅ All 6 FAQ items on `about.html` with answers verbatim from `content.json`
- ❌ **Home page feature grid shows only 4 cards** (transcode, auth, livetv, hub). DLNA and plugins mentioned only in footnote: "Also: DLNA for devices you already own, and a plugin system..." (`index.html:386-388`). Spec §3.1 requires "a card grid of all 8 `features`". Note: `feature_casting.hero` lists 2 features (syncplay, library) for the hero section; the `support[]` features should be in the grid. The current grid has 4 + footnote, not 8 cards.
- ⚠️ Footer tagline: index/404 use "Every night is opening night." but hub/plugins/docs/about use "Open-source media, on your terms." from content.json verbatim. Inconsistent brand voice.

**Evidence:** `index.html:294-388`, `content.json:29-77`

---

## 10. CTA / Funnel — Score: 92 ✅

- ✅ Primary CTA "Buy Your Ticket" (→ download.html) above fold on home hero
- ✅ Home → Download reachable in ≤2 clicks
- ✅ Download page has install block + client cards + ecosystem list
- ✅ All pages end with `.cta-banner` driving to download/docs
- ✅ CTA labels use brand voice ("Buy Your Ticket", "See the House Guide")
- ⚠️ download.html CTA says "Dim the Lights (Install)" which is thematically mixed — "Dim the Lights" is the intensity toggle label but here is used as a section heading

**Evidence:** `index.html:134-136`, `download.html:308-320`

---

## 11. Social Metadata (OG + Twitter, og:image PNG) — Score: 75 ❌

- ✅ All pages have `og:type=website`, `og:site_name=Phlix`, absolute `og:url`, absolute `og:image`
- ✅ `twitter:card=summary_large_image` on all pages
- ✅ `twitter:creator=@detain` on all pages
- ✅ `og:image` is PNG (1200×630), not SVG
- ❌ **hub.html, plugins.html, docs.html** — `og:description` is the generic content.json meta instead of page-specific. Same issue as meta description.
  - `hub.html:28-30`, `plugins.html:30-32`, `docs.html:30-32`
- ❌ **hub.html, plugins.html, docs.html** — `og:title` missing "Bollywood Dreams" suffix. "Hub — Phlix" should be "Hub — Phlix Bollywood Dreams"

**Evidence:** `hub.html:25-32`, `plugins.html:28-35`, `docs.html:28-35`

---

## 12. Localization — Score: 90 ✅

- ✅ `<html lang="en">` set correctly
- ✅ All user-facing strings traceable to content.json (brand-overlay copy is distinct)
- ✅ `content.json` locale infrastructure present (`default_locale: "en"`, `supported_locales: ["en"]`)
- ✅ Logical CSS properties (`margin-inline`, `padding-block`) used throughout
- ⚠️ No RTL preparation visible, but font subsetting to Latin only is appropriate for `en` locale

---

## 13. Experience Fidelity — Score: 91 ✅

- ✅ Bollywood cinema identity is fully expressed — marquee theater, peacock mascot, Holi palette, Cinzel/Playfair Display, rangoli SVG decorations, film-still section names ("curtain-rise", "house-proof", "get-tickets")
- ✅ Priya mascot with idle animation, contextual tips, easter eggs (click:5 → petal burst, typed "namaste" → cursor change + toast), dismiss to localStorage
- ✅ Intensity toggle ("Dim the house lights") persists and affects animations
- ✅ Seasonal activation with date-gated color variant overrides (Diwali, Holi, Monsoon, New Year)
- ✅ `visitor_paths` self-select fork on homepage with 3 paths to different feature anchors
- ⚠️ The branded voice is strong but some pages (hub, plugins, docs) have generic meta descriptions that feel template-generated, breaking the immersive experience when shared on social

---

## Lint Results

```
npm run lint  —  ✖ 169 problems (47 errors, 122 warnings) across all sites
Bollywood Dreams: NO lint errors found in its files
Selfcheck: [PASS] bollywood-dreams — 11 @font-face; 6 nav labels; 5 narrative sections
```

**Lint verdict:** bollywood-dreams files are clean. Errors/warnings are from other sites.

---

## Fixes Needed

### Critical (blocking — must fix)

1. **[SEO / Social Metadata]** Add page-specific `<meta name="description">` and `og:description` to hub.html, plugins.html, docs.html. Write descriptive brand-voice descriptions for each page. Add "Bollywood Dreams" to og:title on these pages.
   - hub: describe the reverse-tunnel relay, NAT traversal, self-host option
   - plugins: describe LifecycleInterface + manifest contract
   - docs: describe user guide / API / dev docs / hub admin link-out

2. **[Navigation]** Add Plugins and Docs links to the primary nav (`.nav-menu`) on all 9 pages. The spec requires 8 links; the brand kit's theatrical naming can accommodate: perhaps "The Extensions" or keep "Plugins" / "The Library" or similar brand voice.

### Important (should fix)

3. **[Accessibility — Contrast]** Change `a { color: var(--color-secondary); }` at `base.css:226` to `color: var(--color-secondary-safe);` (#d63385, measured 4.5:1 on dark bg). This affects any body-text link without an explicit override.

4. **[Content Accuracy]** Add DLNA and Plugins as explicit cards in the home page feature grid, or elevate them from footnote to full `.feature-card` cards. The current footnote treatment "Also: DLNA... and a plugin system..." doesn't match the spec's "card grid of all 8 features."

5. **[Experience Fidelity]** Make footer tagline consistent across all pages — either all use "Every night is opening night." or all use content.json's "Open-source media, on your terms." — pick one brand voice and stick with it.

### Verification (run these)

6. **`node tools/render-check.mjs --site bollywood-dreams`** — verify 200% text zoom and 320px viewport (Priya mascot overlap check per §19.11)

---

## Summary Table

| Dimension | Score | Status |
|-----------|-------|--------|
| 1. Brand fidelity & spirit | 88 | ⚠️ |
| 2. SEO | 75 | ❌ |
| 3. Readability | 90 | ✅ |
| 4. Spelling & grammar | 100 | ✅ |
| 5. Usability | 82 | ⚠️ |
| 6. Accessibility | 78 | ⚠️ |
| 7. Responsive | 88 | ⚠️ |
| 8. Performance | 100 | ✅ |
| 9. Content accuracy | 85 | ⚠️ |
| 10. CTA / funnel | 92 | ✅ |
| 11. Social metadata | 75 | ❌ |
| 12. Localization | 90 | ✅ |
| 13. Experience fidelity | 91 | ✅ |
| **Lint** | ✅ | PASS |

**Average score (excl. lint): 87.2**

---

## Verdict

**NOT APPROVED.** Two dimensions score below 80 (SEO: 75, Social metadata: 75) and three more score below 90 (Brand fidelity: 88, Usability: 82, Accessibility: 78). The brand expression is genuinely impressive — the Bollywood cinema atmosphere is cohesive and immersive — but the structural regressions (wrong meta descriptions on 3 pages, missing nav links, contrast violation in base cascade) must be fixed before approval.
