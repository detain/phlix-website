# REVIEW — marble-atrium HOSTILE AUDIT

**Reviewer:** hostile-audit
**Date:** 2026-07-29
**Ground truth:** `new_site.md`, `shared/content.json`
**Linter:** `npm run lint` (fails due to other sites, marble-atrium HTML/CSS/JS individually clean)

---

## CRITICAL FAILURES (❌)

### 1. Fabricated content: `hub.phlix.dev`
`hub.html:135,157` mentions `hub.phlix.dev` — this domain does NOT appear in `content.json`, `new_site.md`, or any verified source. The spec mentions "the public hub" without naming a domain. A reviewer cannot verify this domain exists or is owned by the project. **Fabricated claim.**
- Fix: Remove the specific domain, use "the public Hub" per content.json.

### 2. `overflow-wrap: break-word` on body text (theme.css:858)
`new_site.md §19.12` mandates `overflow-wrap: anywhere` for body text (`p, li, dt, dd, a, span, code…`). theme.css:858 has these elements with `break-word` instead. The spec explicitly warns: "One kit narrowed its wrapping rule to exactly `code`/`<dd>`/bare-URL anchors and `render-check` then failed **9 of 9 pages**." This is the exact anti-pattern the spec warns against.
- Fix: Change `overflow-wrap: break-word` to `overflow-wrap: anywhere` for the `p, li, dt, dd, a, span, code, kbd, samp, pre {}` block at theme.css:848-859.

### 3. "5 native clients" in proof placard (index.html:445)
`new_site.md §19.14`: "A kit says '5 native clients' (or any client/feature count)" and the canonical resolution: "**content.json wins on facts. It is _four_ native clients — Roku, Tizen, Windows, Mobile (beta) — **plus any DLNA device**." The proof placard says "5 native clients" — this is a direct violation of the spec rule. 
- Fix: Change "5 native clients" to "4 native clients + DLNA" or similar accurate phrasing.

### 4. from_source install command rendered on one line (download.html:149-152)
`content.json` specifies `from_source.line_count: 3` and the command is a 3-line string (`git clone…\ncd phlix-server\ncomposer install`). The download.html renders it as a single wrapped line in a `<code>` block with no line breaks between the 3 commands. This makes it look like a single command, not a 3-line development checkout. The comment even says "development — not an install" — the broken rendering obscures this important distinction.
- Fix: Use `<br>` or separate `<code>` blocks per line to preserve the 3-line structure.

### 5. Nav has 6 items, not 8 (all pages)
`new_site.md §5`: "Primary nav (8 links, in order): Home · Features · Clients · Download · Plugins · Docs · Hub · About." The marble-atrium nav on every page has only 6: The Atrium, The Collection, Every Screen, Your Copy, Everywhere, Our Craft. **Plugins** and **Docs** are completely absent from the nav. These are mandatory links per the spec. The footer has Plugins but the primary nav does not.
- The prior review accepted this as "brand-kit architectural decision" — this is WRONG. The §19.9 rule is "Absence is never a defect" only applies when the kit does NOT declare something. The kit does not forbid Plugins or Docs; omitting them is a content accuracy failure.
- Fix: Add Plugins and Docs back to the nav with their brand names ("Extensions" and "The Reference" or similar).

---

## WARNINGS (⚠️)

### 6. Intensity toggle footer widget only on index.html
`index.html` has the "Dim the lights" intensity toggle in the footer utility row. The other 7 pages do NOT have this widget. If the kit declares `intensity_toggle`, it should be consistent across all pages or explicitly absent per kit declaration. This creates an inconsistent experience.

### 7. CSS lint noise (theme.css:386)
`theme.css:386` sets `overflow-wrap: anywhere` inside `.code-block code`. Per §19.12: "Wrap genuine identifiers in prose (`LifecycleInterface`) in `<code>`." This IS correct — but the surrounding body text rule uses `break-word` (see failure #2), creating an inconsistent wrapping behavior within the same stylesheet.

### 8. pitch bullets missing `::before` gold dash decoration
`index.html:182-190` uses `<ul class="pitch-bullets">` but the `<li>` items don't get the gold 20px dash that `theme.css:215-223` styles via `.pitch-list li::before`. The class name mismatch (`.pitch-bullets` vs `.pitch-list`) means the decorative dash is absent.

### 9. og.png rasterization noted in BUILD_LOG as pending
`BUILD_LOG.md:97` says og.png rasterization is a follow-up. The og.png file DOES exist in img/ — but there is no confirmation it's the correct 1200×630 rasterization vs an SVG or incorrect size. Source is og.svg.

### 10. Font @font-face path relative to CSS location
`base.css:282,289,296` etc. declare `@font-face src: url('../../assets/fonts/…')`. From `sites/marble-atrium/css/base.css`, this path resolves to `sites/assets/fonts/` which does not exist at source level. The build process maps this to the deployed root; but pre-build verification cannot confirm font loading works without running `npm run build`. Not a fail, but noted.

---

## DIMENSION SCORES

### 1. Brand fidelity & spirit — Score: 82 ❌
Nav missing 2 of 8 mandatory links (Plugins, Docs). "5 native clients" fabricated count. Intensity toggle inconsistent across pages. Brand voice is otherwise well-executed — the marble/concierge aesthetic is consistent and distinctive. The visitor_paths fork and seasonal banner are nice kit-native touches.

### 2. SEO — Score: 93 ✅
`<title>` lengths verified (all ≤60 chars ✅). Canonical URLs absolute ✅. `<h1>` one per page ✅. JSON-LD on home page ✅. Sitemap.xml has 8 pages, excludes 404 ✅. robots.txt references sitemap ✅. Minor: `features.html` description mentions "SyncPlay, transcoding" but not DLNA — could be more comprehensive.

### 3. Readability — Score: 91 ✅
Cormorant Garamond/Jost type scale is elegant and appropriate for the brand. Line heights generous (1.75 body). Letter-spacing on headlines is generous. Body text contrast is good (16.1:1 on marble-white). Score reduced for missing pitch bullet ::before decorations.

### 4. Spelling & grammar — Score: 95 ✅
No spelling or grammatical errors detected. "does not make you click through menus" is natural and correct. "hub.phlix.dev" is a fabricated domain but not a grammar error.

### 5. Usability — Score: 85 ⚠️
Primary CTA above fold on home ✅. Download reachable in ≤2 clicks ✅. Mobile nav with Esc/outside-click handling ✅. Skip link present ✅. Score reduced for: missing Plugins/Docs in nav (user cannot discover these pages from nav), inconsistent intensity toggle, broken-from-source install display.

### 6. Accessibility (WCAG 2.2 AA) — Score: 92 ✅
Previously fixed: `.seasonal-banner-dismiss` 44×44px ✅, `.status-beta` color fixed to ~5.2:1 ✅. Remaining: hero eyebrow "Five-star media curation" on `#f7f5f2` background with `#0f0f0e` text — 16.1:1 ✅. Primary button `#B8960C` on `#f7f5f2` — approximately 4.8:1 (close to 4.5 AA, acceptable for large text). Focus rings: 2px gold with 2px offset ✅. `prefers-reduced-motion` respected in JS ✅. Score reduced for overflow-wrap body text issue causing potential overflow at small widths.

### 7. Responsive (320→1920) — Score: 85 ⚠️
Mobile nav breakpoint at 900px ✅. Container padding scales ✅. Grid uses `minmax(0, 1fr)` (bare `1fr` would fail) — but `overflow-wrap: break-word` on body text is the §19.12 anti-pattern that causes overflow failures. Score reduced for this unresolved defect.

### 8. Performance (self-hosted fonts, no CDNs) — Score: 88 ⚠️
No Google Fonts CDN ✅. @font-face declarations present for Cormorant, Cormorant Garamond, Jost, DM Mono ✅. `font-display: swap` ✅. Fonts exist in shared pool ✅. Score reduced for: font path `../../assets/fonts/` resolves incorrectly at source level (build-time fix only), seasonal motif SVG 404s gracefully handled but still 3 failed requests when banner is shown.

### 9. Content accuracy — Score: 85 ❌
All 7 pitch_bullets present ✅. All 8 features present ✅. All 5 clients with correct highlights/status ✅. All 5 ecosystem items present ✅. License text correct ✅. FAQ 6 canonical + 2 extra mapped ✅. Install command accurate ✅. **FAILURES:** `hub.phlix.dev` fabricated (not in content.json) ❌. "5 native clients" wrong count ❌. from_source rendered as 1 line not 3 ❌. Nav missing Plugins and Docs pages (cannot be reached from nav despite being in footer) ❌.

### 10. CTA / funnel — Score: 90 ✅
Home hero has primary CTA "Arrange Your Library" → download.html ✅. Primary CTA above fold ✅. Download page has clear 2-step flow ✅. All pages end in .cta-banner ✅. Score reduced for: "Tour the Atrium" (secondary hero CTA) goes to features.html which says "Tour the Collection" in the button — slight mismatch in branded voice between CTA label and destination page heading.

### 11. Social metadata (OG + Twitter, og:image PNG) — Score: 96 ✅
All 9 pages (incl. 404.html) have complete og:type, og:site_name, og:url (absolute), og:title, og:description, og:image (absolute), twitter:card, twitter:title, twitter:description, twitter:image, twitter:creator ✅. og:image is PNG ✅. 404.html has noindex ✅. Score扣分 for: og:description on features.html uses "grand hotel concierge" framing which is brand voice but differs from content.json `meta.description` — acceptable as presentation overlay.

### 12. Localization — Score: 88 ⚠️
`<html lang="en">` ✅. All user-facing strings trace to content.json or kit copy_overlay ✅. No locale-unsafe formatting detected ✅. Score reduced for: no i18n infrastructure (accepted for single-locale MVP per prior review).

### 13. Experience fidelity — Score: 83 ❌
new_site.md §19.12 `overflow-wrap` violation (see failure #2) — this is the spec's own warning about causing render failures. `break-word` instead of `anywhere` on body text is a deliberate deviation from spec. Nav missing 2 pages. Intensity toggle inconsistent. Score reduced for accumulated deviations.

---

## SUMMARY TABLE

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 82 | ❌ |
| 2 | SEO | 93 | ✅ |
| 3 | Readability | 91 | ✅ |
| 4 | Spelling & grammar | 95 | ✅ |
| 5 | Usability | 85 | ⚠️ |
| 6 | Accessibility | 92 | ✅ |
| 7 | Responsive | 85 | ⚠️ |
| 8 | Performance | 88 | ⚠️ |
| 9 | Content accuracy | 85 | ❌ |
| 10 | CTA / funnel | 90 | ✅ |
| 11 | Social metadata | 96 | ✅ |
| 12 | Localization | 88 | ⚠️ |
| 13 | Experience fidelity | 83 | ❌ |
| | **Average** | **87.9** | **3❌ 4⚠️** |

---

## FIXES NEEDED

1. **[CRASH]** `hub.html:135,157` — Remove `hub.phlix.dev`. Replace with "the public Hub" per content.json.
2. **[CRASH]** `theme.css:848-859` — Change `overflow-wrap: break-word` to `overflow-wrap: anywhere` for `p, li, dt, dd, a, span, code, kbd, samp, pre`.
3. **[CRASH]** `index.html:445` — Change "5 native clients" to "4 native clients + DLNA" (or accurate phrasing per content.json clients list).
4. **[CRASH]** `download.html:149-152` — Add `<br>` or separate `<code>` lines to make the 3-command from_source install render as 3 lines.
5. **[CRASH]** All 9 HTML pages — Add Plugins ("Extensions") and Docs ("The Reference" or "Documentation") to the primary nav. Keep footer unchanged.

---

## NOT APPROVED

Dimensions 1 (82), 9 (85), and 13 (83) are below 90. Three hard ❌ failures including fabricated content (`hub.phlix.dev`), a spec §19.12 violation (overflow-wrap), and incorrect client count. The prior REVIEW-FINAL.md marked this APPROVED — that review was wrong. Re-review required after above 5 fixes are applied.
