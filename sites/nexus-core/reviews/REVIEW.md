# REVIEW: nexus-core brand kit site

**Reviewer:** Hostile audit
**Date:** 2026-07-29
**Ground truth:** `new_site.md`, `shared/content.json`

---

## Summary

**❌ NOT APPROVED — 5 critical defects, multiple dimensions below threshold**

---

## 13-Dimension Audit

### 1. Brand fidelity & spirit — ✅ 92/100

Strong sci-fi "Nexus Core" identity throughout. Color palette (cyan #00F5FF, purple #7B2CBF, magenta #FF006E) is consistently applied. Brand voice uses appropriate terminology: "core", "nexus", "link", "calibrate", "bridge", "channels", "sync". Animations (orbital rings, energy core pulse, mascot Orb float) are coherent with the theme.

Cited: `index.html:76-108` (hero), `css/theme.css:128-166` (orbital animations), `js/main.js:226-271` (mascot Orb)

---

### 2. SEO — ⚠️ 75/100

**Issues:**

- Title tag format is inconsistent across pages:
  - `index.html:14`: "Phlix — All streams flow to the core." (no page name, tagline format)
  - `features.html:7`: "Features — Phlix Nexus Core"
  - `download.html:7`: "Download — Phlix Nexus Core"
  - `docs.html:6`: "Documentation — Nexus Core — Phlix" (wrong order, wrong separator)
- Per new_site.md §10: `<title>` should be page-specific ("<Page> — Phlix" / "Phlix — <tagline>")

**Positive:**
- Canonical URLs present and absolute on all pages
- `<meta name="description">` present on all pages
- `<meta name="keywords">` present on index.html
- Sitemap.xml covers all 8 pages with proper priorities

**Cited:** `features.html:7`, `download.html:7`, `docs.html:6`, `index.html:14`

---

### 3. Readability — ✅ 88/100

Body text is legible. Line-height 1.65 on body (`base.css:27`), typography scale is reasonable. `font-body` (Rajdhani) at 300 weight may be light for some users; verify against accessibility pass.

---

### 4. Spelling & grammar — ⚠️ 82/100

**Issues:**

- `about.html:84`: Missing space after colon — "SyncPlay, adaptive transcoding, and secure remote access" — missing comma after "SyncPlay"
- `about.html:99`: Grammar error — "iOS, Android, and Android TV apps are in development" should be "iOS and Android apps are in development" (apps plural only works for iOS+Android; Android TV is separate)
- `download.html:89`: "Available on the Roku Channel Store" — content.json has no store_url for Roku (it's null)

**Cited:** `about.html:84`, `about.html:99`, `download.html:89`

---

### 5. Usability — ⚠️ 80/100

**Critical issues:**

- `download.html:90,96,108,114`: Four "Coming Soon" buttons with `href="#"` — these are dead links and fail WCAG 2.1.2 (link text not descriptive, no valid href)
- `download.html:90`: "Coming Soon" on Roku download — this is a dead-end CTA

**Positive:**
- Primary download CTA works (`download.html:102` links to real GitHub release)
- Nav hamburger menu functional (`js/main.js:28-54`)
- Skip link present and functional

**Cited:** `download.html:90,96,108,114`

---

### 6. Accessibility (WCAG 2.2 AA) — ❌ 68/100

**Critical:**

- `download.html:90,96,108,114`: Dead "Coming Soon" `href="#"` links — fail WCAG 2.1.2, 2.4.4, 4.1.2
- `docs.html:25`: Skip link text is "Skip to content" instead of "Skip to main content" — inconsistent with all other pages and spec §4
- `docs.html:26-40`: Header uses non-standard markup (`<nav class="main-nav">` with `aria-label="Main navigation"` instead of `role="banner"` + correct nav structure per spec §4)
- No `<meta name="theme-color">` in any page `<head>` (required per new_site.md §11)
- `js/main.js:59-85`: `initReducedMotion()` only reads `prefers-reduced-motion` once at load — does not add a `change` listener (§19.20: "a reduced motion media query read once at load never sees the visitor change the setting")

**Positive:**
- Skip links present on all pages (except docs.html has wrong text)
- ARIA landmarks present: `role="banner"`, `role="contentinfo"`, `main id="main-content"`
- `aria-current="page"` on nav links
- `prefers-reduced-motion` respected in CSS (`base.css:242-251`, `components.css:701-703`)

**Cited:** `download.html:90,96,108,114`, `docs.html:25,26-40`, `index.html:43` (no theme-color in any head)

---

### 7. Responsive (320→1920) — ⚠️ 85/100

**Potential issues:**

- `components.css:318`: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` — `auto-fit` with `1fr` can cause overflow at 320px if content is wide (new_site.md §19.12: bare `1fr` has implicit auto minimum). Should use `minmax(0, 1fr)`.
- `components.css:490`: Same issue in `.client-cards` — `repeat(auto-fit, minmax(250px, 1fr))` should use `minmax(0, 1fr)`

**Positive:**
- `content-grid--2col` at line 401 uses `minmax(0, 1fr)` correctly
- Mobile hamburger menu implementation correct (`components.css:209-234`)

**Cited:** `components.css:318,490`

---

### 8. Performance — ✅ 90/100

- Fonts self-hosted WOFF2 with `font-display: swap` (`base.css:256-350`) ✅
- No CDN dependencies (Google Fonts checked — none found) ✅
- `og.png` is 119KB — just under 120KB limit ✅
- JS is `defer`-loaded ✅

**Note:** JS file is 477 lines with multiple features (mascot, easter eggs, seasonal activation, scroll parallax). While the spec says the 40KB "is guidance, not a target," this should be verified against actual byte size.

---

### 9. Content accuracy — ❌ 70/100

**Critical issues:**

- `download.html:71-77`: Lists "Ubuntu 20.04+ or Debian 11+" as requirements, but content.json `install.requirements` says "PHP 8.3+, MySQL, ffmpeg". The OS requirement is not in content.json; this is invented.
- `clients.html:116,131`: Shows Android and iOS/tvOS as **separate client cards**, but content.json `clients[]` has ONE entry `"id": "mobile", "name": "Mobile (iOS + Android)"` — they are one client.
- `download.html:89-90`: Roku shows "Available on the Roku Channel Store" + "Coming Soon" button, but content.json has `"store_url": null` for Roku (not available yet)
- `features.html:88-96`: Features page has features NOT in content.json's `features[]` — "Hardware acceleration support" is not in content.json
- `about.html:84`: "SyncPlay, adaptive transcoding, and secure remote access" — the features are not separated properly; content.json doesn't list features this way

**Positive:**
- Install command on `download.html:63` matches `content.json` verbatim ✅
- Footer columns on `index.html:331-357` match `content.json.footer.columns` exactly ✅
- FAQ on `about.html:81-111` uses content from `content.json.faq[]` with brand voice overlay ✅
- Ecosystem links on `hub.html:100` match `content.json.ecosystem[]` ✅

**Cited:** `download.html:71-77`, `clients.html:116,131`, `download.html:89-90`, `features.html:88-96`, `about.html:84`

---

### 10. CTA / funnel — ⚠️ 78/100

**Issues:**

- Primary funnel: index.html → download.html works in ≤2 clicks ✅
- BUT `download.html:90,96,108,114` have dead "Coming Soon" buttons blocking the client download path
- Footer on `features.html:201-214` is **incomplete** — only 2 Product links (missing Plugins), 2 Developer links (missing Plugin example, API reference), and no License or Issues links
- Footer on `hub.html:109-128` same truncated footer structure

**Positive:**
- index.html has working "Link to the core" CTAs
- features.html has working "Connect to the core" CTA

**Cited:** `download.html:90,96,108,114`, `features.html:201-214`, `hub.html:109-128`

---

### 11. Social metadata (OG + Twitter) — ❌ 60/100

**Critical:**

- `twitter:creator=@detain` is **MISSING from every page** (required per new_site.md §11 and content.json `meta`)
- `docs.html:15-18`: Missing Twitter card meta entirely

**Positive:**
- `og:image` is absolute URL to PNG on all pages ✅
- `og:site_name=Phlix` present ✅
- `twitter:card=summary_large_image` present on most pages ✅
- `og:type=website` present ✅

**Cited:** `index.html:27` (no twitter:creator), all other pages missing it too

---

### 12. Localization — ✅ 88/100

- `<html lang="en">` correctly set ✅
- Only `en` locale supported ✅
- `content.json` is the single source for all user-facing strings ✅
- Fonts subset to Latin ✅

**Note:** CSS uses logical properties in some places (e.g., `inset: 0`) but also uses physical properties in others (`top`, `left`). This is not a blocker but RTL readiness should be verified before adding locales.

---

### 13. Experience fidelity — ✅ 85/100

**Positive:**

- Implements experience overrides: `visitor_paths` (connect-paths section), `proof_strategy` (proof-band), `conversion_funnel` (CTA section)
- Mascot "Orb" with context-aware tips
- Seasonal activation (solar/void date-gates)
- Easter eggs: logo-clicks:5 (spectrum overlay) and typed-word:nexus (diffraction)
- Custom scroll experience with parallax

**Issues:**

- new_site.md §5 requires 8 nav links in order. The site has 7 links (no "Docs" nav item — docs links to external docs per new_site.md §5 "Docs may link to the external docs site instead of docs.html", so this is acceptable)
- The docs.html page (`docs.html`) uses a **completely different shell markup** from all other pages (non-standard nav, no role="banner", no .container, no .site-footer structure matching the other pages) — this is a significant deviation from spec §4 "Every page uses the same skeleton"

**Cited:** `docs.html:1-89` (different shell), `index.html:59-67` (7-link nav)

---

## Lint results

`npm run lint` exits with code 1 due to a tag-pair error in `sites/midnight-jazz/index.html` — **this is a different site, not nexus-core**. The nexus-core site does not appear to have HTML/CSS/JS lint errors.

**However:** the lint infrastructure is broken for the overall project (midnight-jazz failing causes the whole lint to fail), so we cannot confirm nexus-core is lint-clean.

---

## Critical fixes required (must fix before approval)

| # | Dimension | Issue | Fix |
|---|-----------|-------|-----|
| 1 | **Content accuracy** | `download.html:71-77` — invented OS requirements not from content.json | Replace with content.json `install.requirements` text: "PHP 8.3+, MySQL, ffmpeg" |
| 2 | **Content accuracy** | `clients.html:116,131` — Android/iOS shown as separate cards; content.json has ONE mobile client | Merge into one "Mobile (iOS + Android)" card |
| 3 | **Content accuracy** | `download.html:89-90` — Roku "Coming Soon" with null store_url | Link to actual repo or remove store claim |
| 4 | **Accessibility** | `download.html:90,96,108,114` — four dead `href="#"` links | Either link to real repos or remove buttons |
| 5 | **Social metadata** | Missing `twitter:creator=@detain` on every page | Add to all 9 pages' `<head>` |
| 6 | **Accessibility** | `docs.html:25` — wrong skip-link text | Change to "Skip to main content" |
| 7 | **Accessibility** | `docs.html` uses non-standard shell markup | Align with spec §4 shared shell |
| 8 | **Footer** | `features.html` and `hub.html` footers are truncated (missing links) | Match content.json.footer.columns exactly |

---

## APPROVAL CHECKLIST

| Dimension | Score | Status |
|-----------|-------|--------|
| Brand fidelity & spirit | 92 | ✅ |
| SEO | 75 | ⚠️ |
| Readability | 88 | ✅ |
| Spelling & grammar | 82 | ⚠️ |
| Usability | 80 | ⚠️ |
| Accessibility | 68 | ❌ |
| Responsive | 85 | ⚠️ |
| Performance | 90 | ✅ |
| Content accuracy | 70 | ❌ |
| CTA / funnel | 78 | ⚠️ |
| Social metadata | 60 | ❌ |
| Localization | 88 | ✅ |
| Experience fidelity | 85 | ⚠️ |

**Average: 80.5 | Min: 60 (Social metadata) | ❌ Dimensions: 2 (Accessibility, Content accuracy), ⚠️ Dimensions: 7**

---

## ❌ NOT APPROVED

**Reasons:**
1. Content accuracy failures (wrong client structure, invented requirements, wrong store claims)
2. Accessibility failures (dead href="#" links, missing theme-color, broken reduced-motion listener, docs.html shell deviation)
3. Missing required `twitter:creator` meta on all pages
4. Truncated footers on features.html and hub.html

**Fix the 8 critical issues above and re-submit for review.**
