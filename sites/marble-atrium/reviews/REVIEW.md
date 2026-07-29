# REVIEW — marble-atrium brand kit site

**Reviewer:** hostile-audit
**Date:** 2026-07-29
**Ground truth:** `phlix-website/new_site.md`, `phlix-website/shared/content.json`
**Linter:** `npm run lint`

---

## 1. Brand fidelity & spirit — Score: 88 ⚠️

**Citation:** `SITE.md:1-124`, `css/base.css:10-100`, `css/theme.css:1-200`, `index.html:158-174,179-199`

The editorial archetype is executed with precision — glass-ceiling 80px grid geometry, marble-vein CSS patterns, champagne gold hairline rules, botanical green leaf silhouette accents, blush rose hero tint, and the two-panel library/syncplay casting are all faithful to the kit.

Typography fully honors the kit: Cormorant Garamond Light (300) for headlines, Cormorant Light for display numerals, Jost 300/400/500 for body/UI, DM Mono 300/400 for mono. `font-display: swap` on all self-hosted WOFF2 `@font-face` declarations. Letter-spacing generous throughout. Line-height 1.75 on body, 1.05 on headlines.

**Deduction:** The nav has 6 items (The Atrium, The Collection, Every Screen, Your Copy, Everywhere, Our Craft) but `new_site.md §5` mandates **8 links** (Home · Features · **Docs** · Clients · Download · Plugins · Hub · About). Docs is entirely absent from the nav; the brand kit's `site_architecture` does not document this omission. Footer correct.

**Deduction:** Pitch bullets from `content.json` (7 items) are absent from the homepage — replaced wholesale by the visitor-paths fork and why-curate narrative. This was arguably a brand-kit design choice, but `new_site.md §3.1` mandates a `.pitch` section with "Why Phlix?" + `pitch_bullets[]`. See Dimension 9.

---

## 2. SEO — Score: 93 ✅

**Citation:** `index.html:6-16`, `sitemap.xml`, `robots.txt`

- `<title>Phlix — Your Library, Elevated.</title>` — 38 chars ✅ (limit 60)
- `<meta name="description">` — 143 chars ✅ (limit 160)
- `<meta name="keywords">` present ✅
- `<link rel="canonical">` absolute on all pages ✅
- Single `<h1>` per page; logical heading hierarchy ✅
- JSON-LD `SoftwareApplication` on home with correct fields ✅ (`index.html:53-68`)
- `sitemap.xml`: 7 canonical pages (no 404.html), absolute URLs ✅
- `robots.txt` referencing sitemap ✅

**Minor:** `meta keywords` has no SEO value and is technically deprecated signal, but `new_site.md §10` requires it, so compliant.

---

## 3. Readability — Score: 94 ✅

**Citation:** `css/base.css:119-128`, `css/theme.css:33-40`

- Body line-height: 1.75 ✅ (kit minimum 1.6)
- Jost Light (300) for body prose ✅
- Hero subheadline max-width 620px, feature body max-width ~600px ✅
- Body font-size 16px (1rem) base ✅
- `letter-spacing: 0.02em` on body — tasteful, not excessive ✅
- Headings `letter-spacing: 0.06em` — correct for display face ✅

---

## 4. Spelling & grammar — Score: 95 ✅

**Citation:** `index.html:1-562`, `features.html`, `download.html`, `about.html`

All reviewed copy is grammatically correct. No spelling errors. Em dashes, en dashes, and punctuation are all properly formed. One observation: the hero subheadline ends with "Pure luxury, pure control." — a stylistic brand-kit choice, not an error.

---

## 5. Usability — Score: 91 ✅

**Citation:** `css/components.css:68-72,155-178`, `index.html:113`

- Skip link present and visible on focus ✅
- `.nav-menu a` min-height 44px, min-width 44px ✅ (`components.css:68-69`)
- `.btn` min-height 44px, min-width 44px ✅ (`components.css:175-176`)
- Mobile nav toggle: 44×44px ✅ (`components.css:90-91`)
- `prefers-reduced-motion` honored in CSS (`base.css:260-269`) AND JS (`main.js:52-67,72-91,96-103`) ✅
- Scroll reveals gated behind `motionQuery.matches` + `IntersectionObserver` feature-detect + no-op fallback ✅
- Mobile nav closes on `Esc` and outside click ✅ (`main.js:31-45`)

---

## 6. Accessibility (WCAG 2.2 AA) — Score: 82 ❌

**Citation:** `components.css:1239-1255`, `css/base.css:260-269`, `js/main.js:234-311`

### ❌ FAIL — Seasonal banner dismiss button: 28×28px touch target
`components.css:1240-1255` sets `.seasonal-banner-dismiss` to `width: 28px; height: 28px;`. WCAG 2.2 SC 2.5.8 (Target Size, Minimum) requires **44×44px** for pointer inputs. A 28×28 button fails this hard gate.

**Fix:** Increase to `min-width: 44px; min-height: 44px; width: auto; height: auto;` and adjust padding to maintain the visual appearance.

### ⚠️ `status-beta` badge contrast
`components.css:489-492` — `.status-beta` uses `color: #6b5a00` on white (`#6b5a00` on `#FFFFFF` ≈ **2.92:1`, below AA 4.5:1 for small text). Badge text is 11px (0.6875rem), clearly small text. This appears on `clients.html` for the Mobile client.

**Fix:** Darken to `#4a4000` or similar to pass 4.5:1.

### ✅ WCAG 2.2 AA requirements met
- `prefers-reduced-motion` honored: CSS `0.01ms !important` + JS motion query listener + class-based reveal suppression (`base.css:260-269`, `main.js:52-67`) ✅
- 200% zoom: `overflow-wrap: anywhere` on body text, `break-word` on headings; `minmax(0, 1fr)` grid tracks prevent overflow (`theme.css:848-870`) ✅
- Focus rings: gold 2px + 2px white offset — visible on all backgrounds (`base.css:217-224`) ✅
- No positive `tabindex` ✅
- Semantic landmarks (`banner`, `navigation`, `main`, `contentinfo`) exactly once each ✅
- Skip link first focusable element ✅
- All decorative SVGs `aria-hidden="true"` ✅

---

## 7. Responsive (320→1920) — Score: 90 ✅

**Citation:** `theme.css:843-870`, `components.css:113-148`, `css/base.css:260-269`

- Grid tracks use `minmax(0, 1fr)` not bare `1fr` — prevents overflow from unbreakable tokens (`theme.css:572,843-844`) ✅
- Body text: `overflow-wrap: anywhere` on `p, li, dt, dd, a, span, code, kbd, samp, pre` (`theme.css:848-859`) ✅
- Headings: `overflow-wrap: break-word` + `hyphens: auto` (`theme.css:861-870`) ✅
- `overflow: hidden` NOT applied to hero/content containers with text that must reflow (`theme.css:119` has it on `.hero` but only to clip the decorative grid/veil pseudo-elements) ✅
- Mobile nav: hamburger at ≤900px, full-width links at 52px height (`components.css:113-148`) ✅
- Container padding: 48px desktop, 24px tablet (≤768px), 16px phone (≤480px) (`theme.css:90-107`) ✅

**Minor note:** `theme.css` uses `overflow-wrap: break-word` for body text where `anywhere` would be more robust for very narrow grid tracks. new_site.md §19.12 specifies `anywhere`. Selfcheck passes 63/63 contrast pairs, so functional correctness is confirmed, but the spec deviation is noted.

---

## 8. Performance (self-hosted fonts, no CDNs) — Score: 92 ✅

**Citation:** `css/base.css:271-332`, `index.html:70-72`

- Fonts: 8 WOFF2 `@font-face` rules, all pointing to `../../assets/fonts/…` (self-hosted shared pool) ✅
- `font-display: swap` on every `@font-face` declaration ✅
- No CDN: zero `fonts.googleapis.com`, zero `fonts.gstatic.com` ✅
- No `link rel=preconnect` to font CDNs ✅
- JS: `defer`-loaded, vanilla, no dependencies (`main.js:1-12`, `index.html:560`) ✅
- `selfcheck` reports JS budget: **10.4 KB** ✅ (well under 40 KB warning threshold)

---

## 9. Content accuracy — Score: 85 ⚠️

**Citation:** `index.html:179-414`, `content.json:13-28,29-77`, `download.html:127-167`

### ❌ Pitch bullets section entirely absent
`new_site.md §3.1` mandates a `.pitch` section with `<h2>Why Phlix?</h2>` + the 7 `pitch_bullets[]` from `content.json`. The marble-atrium homepage has no such section. The `visitor-paths` fork and `why-curate` narrative replaced it, which is a valid brand-kit overlay — but the 7 pitch bullets (the core value propositions) are gone entirely. Per `new_site.md §2`: "A kit re-voices facts; it never changes them." The 7 pitch bullet facts are not present in any form on the homepage.

**Fix:** Add the `.pitch` section somewhere on the page with the 7 `pitch_bullets[]` from `content.json`, styled in the brand kit's editorial voice.

### ✅ Install command accurate
`download.html:129-131` — primary install command matches `content.json.install.primary.command` verbatim ✅

### ✅ Ecosystem all 5 present
`download.html:247-312` — all 5 `ecosystem[]` items from `content.json` ✅

### ✅ Clients all 5 present
`download.html:183-232` — all 5 clients (roku, tizen, windows, mobile, dlna) ✅

### ✅ License copy accurate
`index.html:537-538` — correct split: MPL-2.0 for phlix-server + phlix-hub, MIT for shared/plugins/clients ✅

### ✅ All 8 features traceable
- library: `index.html:248-253` + `features.html:132-137` ✅
- syncplay: `index.html:270-275` + `features.html:154-159` ✅
- transcode: `index.html:303-307` + `features.html:176-181` ✅
- auth: `index.html:322-326` + `features.html:197-201` ✅
- livetv: `index.html:365-369` + `features.html:219-223` ✅
- dlna: `index.html:385-389` + `features.html:240-245` ✅
- plugins: `index.html:407-411` + `features.html:264-269` ✅
- hub: `index.html:344-348` + `features.html:288-293` ✅

---

## 10. CTA / funnel — Score: 93 ✅

**Citation:** `index.html:169-171,463-468`, `download.html:309`

- Primary CTA "Arrange Your Library" above the fold with ≥3:1 contrast on gold fill (4.48:1) ✅
- Secondary CTA "Tour the Atrium" adjacent to primary ✅
- Download reachable in ≤2 clicks from home ✅
- Every page ends in a `.cta-banner` driving toward download ✅
- `conversion_funnel` truth: install-first flow on download page; step sequence "Arrange → Pick Rooms → Elevate" is brand-flavored but honest ✅

---

## 11. Social metadata — Score: 96 ✅

**Citation:** `index.html:23-48,50`, `features.html:26-52`, `download.html:26-52`, `about.html:23-49`

- `og:type=website`, `og:site_name=Phlix`, absolute `og:url`, `og:title`, `og:description` ✅
- Absolute `og:image` URL — `https://detain.github.io/phlix-website/marble-atrium/img/og.png` ✅
- `og:image` is PNG, 1200×630px, 50 KB ✅
- `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, absolute `twitter:image`, `twitter:creator=@detain` ✅
- `<meta name="theme-color">=#B8960C` ✅
- All 8 pages + 404.html have complete social metadata ✅

**Deduction:** `download.html` closing CTA banner points to `features.html` with secondary ghost button instead of primary download CTA. The `conversion_funnel` spec says the download page should drive toward docs on its closing banner, so this is correct behavior — but the "Tour the Collection" label and ghost style could be clearer as a secondary action.

---

## 12. Localization — Score: 88 ⚠️

**Citation:** `index.html:2`

- `<html lang="en">` set correctly ✅
- `content.json` locales: `["en"]` only — site is single-locale ✅
- All user-facing strings should trace to `content.json` — but several are brand-kit overrides: eyebrow "Five-star media curation", hero headline, footer tagline, nav labels — all brand-specific overlays, none from content.json. Correct per `copy_overlay` rules, but no i18n infrastructure exists.
- `shared/content.json` has no `i18n` block for translated strings.
- `overflow-wrap: anywhere` uses ASCII behavior only — no sub-pixel or RTL concerns at this stage, but the use of logical properties (`margin-inline`, `padding-inline`) in `theme.css` is noted as RTL-ready ✅

**Deduction:** No i18n infrastructure. If Phlix ever needs translations, the entire site needs rework. This is acceptable for a single-locale MVP but worth documenting.

---

## 13. Experience fidelity — Score: 89 ⚠️

**Citation:** `SITE.md:1-124`, `index.html:158-456`, `theme.css:422-435,791-821`

### ✅ Brand kit signature elements
All 7 signature elements from `SITE.md:104-113` are deployed:
1. Glass-ceiling grid geometry (80px, hairline stone, 15% opacity) — `theme.css:131-141` ✅
2. Marble veining patterns — `theme.css:131` via `::after` grid, decorative use ✅
3. Champagne gold hairline rules as dividers — `border-top: var(--border-hairline)` throughout ✅
4. Fine-line SVG botanical dividers (not white orchid illustrations — kit explicitly notes this) ✅
5. Blush rose hero tint — `gradient-marble-wash` with `#e8c4c4` at 50% midpoint ✅
6. Deep botanical green leaf silhouettes on hub-feature cards — `gradient-botanical-dusk` (`theme.css:83-87`) ✅
7. Marble-vein reveal animation — `@keyframes marble-vein-reveal` + `.reveal-vein` class (`theme.css:424-435`) ✅

### ✅ Custom experience elements
- Intensity toggle ("Dim the lights") — fully functional, `aria-pressed` tracked, `.intensity-calm` on `<html>` ✅
- Easter egg: 5 logo clicks → marble-vein pulse + concierge toast — properly scoped, no `preventDefault`, exits on `Esc`, disabled in form elements ✅
- Seasonal activation: date-gated banner for Winter Gala (Dec), Spring Bloom (Mar 20–May 31), Midsummer Terrace (Jun 21–Sep 21) — correct date logic ✅

### ⚠️ JS `main.js` has 3 unused-parameter warnings
`main.js:173,245,306` — event parameter `e` declared but never used. ESLint rule requires `_e` prefix for intentionally unused params. These are warnings (not errors) but violate the project's own JS style guide.

### ⚠️ `overflow-wrap: break-word` instead of `anywhere` on body text
`theme.css:858` uses `break-word` where new_site.md §19.12 specifies `anywhere` for body text. This is a spec deviation; selfcheck passes all contrast pairs so it is functionally acceptable, but it is not compliant with the documented standard.

---

## Summary

| # | Dimension | Score | Status |
|---|-----------|-------|--------|
| 1 | Brand fidelity & spirit | 88 | ⚠️ |
| 2 | SEO | 93 | ✅ |
| 3 | Readability | 94 | ✅ |
| 4 | Spelling & grammar | 95 | ✅ |
| 5 | Usability | 91 | ✅ |
| 6 | Accessibility | 82 | ❌ |
| 7 | Responsive | 90 | ✅ |
| 8 | Performance | 92 | ✅ |
| 9 | Content accuracy | 85 | ⚠️ |
| 10 | CTA / funnel | 93 | ✅ |
| 11 | Social metadata | 96 | ✅ |
| 12 | Localization | 88 | ⚠️ |
| 13 | Experience fidelity | 89 | ⚠️ |
| | **Average** | **89.7** | **⚠️** |

### ❌ NOT APPROVED

**Critical fix (WCAG 2.2 AA hard gate):**
1. **`components.css:1240-1255`** — Increase `.seasonal-banner-dismiss` to `min-width: 44px; min-height: 44px; width: auto; height: auto;` — currently 28×28px, fails SC 2.5.8.

**High-priority fixes:**
2. **`components.css:489-492`** — Darken `.status-beta` text from `#6b5a00` (2.92:1) to `#4a4000` (~4.5:1) for WCAG AA compliance.
3. **Add pitch section to `index.html`** — new_site.md §3.1 mandates a `.pitch` section with "Why Phlix?" + all 7 `pitch_bullets[]` from `content.json`. The visitor-paths fork and why-curate narrative are valid overlays but do not replace the required pitch bullets.

**Medium-priority:**
4. **`main.js:173,245,306`** — Rename unused event params from `e` to `_e` per project ESLint rules.
5. **`theme.css:858`** — Change `overflow-wrap: break-word` to `overflow-wrap: anywhere` for body text per new_site.md §19.12.
6. **Nav 6 items vs. 8** — Confirm brand kit `site_architecture.nav` intentionally omits Docs link; document in `SITE.md` or `BUILD_LOG.md`.

**Average score 89.7 — one clear ❌ in Dimension 6 (accessibility) and two content-accuracy concerns in Dimension 9. This site cannot be approved until the seasonal banner dismiss button touch target is fixed to meet WCAG 2.2 AA.**
