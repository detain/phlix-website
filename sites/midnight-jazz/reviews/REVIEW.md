# Midnight Jazz — Brand Kit Site Review

**Reviewer:** Hostile Auditor
**Date:** 2026-07-29
**Site:** `sites/midnight-jazz/`
**Ground truth:** `shared/content.json`, `new_site.md`

---

## 13-Dimension Audit

### 1. Brand Fidelity & Spirit — ✅ 94

The Midnight Jazz identity is expressed with discipline and authenticity. The jazz club metaphor is the throughline: "Lobby" for Home, "Now Showing" for Features, "Box Office" for Clients, "Get Tickets" for Download, "The Marquee" for Hub, "Our Story" for About. Colors trace verbatim to the kit (`--color-primary: #E8961F`, `--color-bg: #0D1117`, etc.). Typography roles are correct: Barlow Condensed for headlines, Playfair Display italic for editorial moments, Inter for body, JetBrains Mono for code. Mascot Miles (trumpet silhouette) is implemented per `mascot.behavior.spec`: bottom-right fixed position, tip bubble per section, dismiss persists via `localStorage`, easter eggs (logo click + typed "deepcut") wired correctly, idle disabled under `prefers-reduced-motion`. The `intensity_toggle` ("House lights up") switches off all decorative animation via `body.intensity-calm` class + localStorage. No off-palette hex values in component CSS. Self-hosted fonts via `@font-face` from the shared pool (`../../assets/fonts/`). No Google Fonts CDN.

**Deduction:** The logo easter egg calls `e.preventDefault()` at `js/main.js:168`, which silently defeats the logo's href navigation to `./` without providing an alternative route. This is a functional defect in the brand experience.

---

### 2. SEO — ✅ 94

Every page carries a `<title>` well under 60 chars ("Now Showing — Phlix" = 18 chars; "Get Tickets — Phlix" = 18 chars). `<meta name="description">` present and accurate on all 9 pages. `<meta name="keywords">` from `content.json`. `<link rel="canonical">` to absolute URL on every page. Single `<h1>` per page; heading hierarchy is unbroken (h1 → h2 → h3, no skips). Descriptive anchor text throughout — no "click here" patterns. JSON-LD `SoftwareApplication` schema on `index.html` only (per spec, only home needs it). `sitemap.xml` includes all 8 canonical pages (index, about, clients, docs, download, features, hub, plugins) and deliberately excludes `404.html`. `robots.txt` references the sitemap.

**Deduction:** The sitemap includes only 8 pages. Per new_site.md §2, a finished site needs all 8 pages + `404.html` + css/js/img + robots.txt + sitemap.xml + SITE.md + BUILD_LOG.md — all present. The sitemap count is correct (404 excluded). Minor deduction for sitemap not including `404.html` explicitly but this is intentional per `noindex` rule.

---

### 3. Readability — ✅ 92

Body text is `Inter` at 1rem with 1.65 line-height on dark backgrounds — above the recommended 1.6 for dark-ground body copy. `.body-text` uses `overflow-wrap: anywhere`. Pitch bullets use `font-ui` at 0.95rem with proper line-height. FAQ answers at 0.95rem with 1.65 line-height and `overflow-wrap: anywhere`. No excessive ALL CAPS in prose. Jazz voice is consistent and cool: "dry, understated, knowing" per the kit's `writing_style`.

**Deduction:** `about.html` uses both `.body-text` and `.faq-item__a` with 0.85 opacity, which is visually slightly dimmer than the kit's specified Linen White (#EDE8DF). Not a defect but marginally below optimal readability.

---

### 4. Spelling & Grammar — ✅ 100

No spelling or grammar errors detected across any page. The jazz voice is consistent without being forced. No exclamation marks in UI copy (per kit rule).

---

### 5. Usability — ⚠️ 84

Primary CTA "Get Your Tickets" is above the fold on home. Download is reachable in 1 click from the hero CTA. Secondary CTA "Read the Liner Notes" links to the external docs correctly. Mobile nav is functional: Escape key closes, outside click closes, focus is trapped and returned correctly. Skip link is the first focusable element and visible on focus.

**Critical defect:** `js/main.js:168` — the logo easter egg calls `e.preventDefault()` on every logo click. The logo `<a href="./">` should navigate to home, but `preventDefault()` defeats this silently. The five-click reward triggers but no navigation occurs. This breaks the fundamental affordance of the logo as a home link.

---

### 6. Accessibility (WCAG 2.2 AA, prefers-reduced-motion, 44px targets, 200% zoom) — ⚠️ 82

| Check | Status |
|---|---|
| Body text contrast (Linen White #EDE8DF on Midnight Navy #0D1117) | ✅ ~15.6:1 |
| Primary CTA on background | ✅ ~4.8:1 |
| Links (Cool Slate #7A9BB5 on Midnight Navy) | ⚠️ ~4.26:1 (borderline for small text; acceptable for UI components at 3:1) |
| Touch targets ≥44×44px | ✅ buttons have `min-height: 44px; min-width: 44px` (components.css:353-354) |
| `prefers-reduced-motion` | ✅ gated in base.css:263-271, theme.css:471-477, JS `getReducedMotion()` at main.js:39 |
| 200% text zoom | ✅ all font sizes in `rem`/`clamp`; `overflow-wrap: anywhere` on body text |
| Focus ring visible | ✅ `2px solid var(--color-focus)` + 2px navy offset on all interactive elements (base.css:253-257) |
| Landmark roles (banner, navigation, main, contentinfo) | ✅ exactly once each |
| `aria-current="page"` on active nav link | ✅ |
| **404.html skip link target** | ❌ **MISSING** |

**❌ CRITICAL: `404.html:77`** — `<a class="skip-link" href="#main-content">` has no corresponding `<main id="main-content">` in the page. The skip link targets a non-existent ID. This is a WCAG 2.2 AA failure (SC 2.4.1).

---

### 7. Responsive (320→1920) — ✅ 93

Grid uses `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` with `minmax(0, 1fr)` on proof-section. All body text uses `overflow-wrap: anywhere`; headings use `hyphens: auto` + `overflow-wrap: break-word`. Font sizes use `clamp()`. Mobile nav activates at ≤768px. The `.features-grid` correctly shows 2-up at 320px (per `feature_casting.hero` from brand kit). No `overflow: hidden` on text containers that would mask clipping at zoom (per spec §19.13).

**Deduction:** The `features-grid` and `content-grid` both use `1fr` as the second argument to `minmax()` (e.g., `minmax(280px, 1fr)`). While `auto-fill` + a fixed minimum makes this generally safe, `minmax(0, 1fr)` would be more robust per spec §19.12 guidance. No render-check tool output is available to verify at 320×640.

---

### 8. Performance (self-hosted fonts, no CDNs) — ✅ 100

All 8 font families (Barlow Condensed 700/800, Playfair Display 700/900-italic, Inter 400/500, Barlow 400/500/600, JetBrains Mono 400/600) are self-hosted WOFF2 via `@font-face` from `../../assets/fonts/` in `theme.css`. `font-display: swap` on all declarations. No Google Fonts CDN links anywhere. No CDN dependencies. JS is vanilla, dependency-free, `defer`-loaded. The `@copyright` CSS parse-error bug (new_site.md §19.2) is absent — all CSS comments are properly enclosed in `/* */` blocks.

---

### 9. Content Accuracy (install from content.json) — ⚠️ 86

| Check | Status |
|---|---|
| Install command verbatim | ✅ `index.html:276`, `download.html:123` — `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh \| sudo bash` |
| License in footer | ✅ "Phlix Server and the Hub are MPL-2.0. Shared libraries, plugins, and clients are MIT." |
| All 6 FAQ items from `content.json` | ✅ about.html has all 6 FAQ items verbatim |
| All 5 ecosystem items | ✅ download.html and docs.html both list all 5 |
| Client data from `content.json` | ✅ Roku/Tizen/Windows/Mobile/DLNA with exact highlights, taglines, status badges |
| **"5 Native clients" claim** | ❌ `index.html:222` — fabricated; `content.json` specifies 4 native clients + DLNA |

**❌ CRITICAL: `index.html:222`** — `.proof-stat__number` displays "5" for "Native clients". Per new_site.md §19.7: "A kit says '5 native clients' (or any client/feature count)" — **`content.json` wins on facts.** Content.json defines exactly 4 native clients (Roku, Samsung Tizen, Windows, Mobile (beta)) plus DLNA as a fifth option that is not a "native client." Printing "5 Native clients" is fabrication. The clients.html meta description also says "Five ways to reach your Phlix server" which reinforces this false count.

---

### 10. CTA / Funnel — ✅ 94

Primary CTA "Get Your Tickets" is above the fold on home with ≥3:1 contrast. Download reachable in ≤1 click from the hero CTA. Secondary CTA "Read the Liner Notes" correctly points to `https://detain.github.io/phlix-docs`. The install snippet is in the home page CTA banner section with context ("One line and you're the projectionist"). Visitor paths fork ("Where to next?") below the main funnel. All CTAs have labels that accurately describe their destination.

**Deduction:** The logo's primary function as a home navigation element is broken by the easter egg `preventDefault()` (see dimension 5).

---

### 11. Social Metadata (OG + Twitter, og:image PNG) — ⚠️ 89

| Page | og:image | og:url | twitter:card | twitter:creator |
|---|---|---|---|---|
| index.html | ✅ `https://.../midnight-jazz/img/og.png` (PNG, absolute) | ✅ absolute | ✅ `summary_large_image` | ✅ `@detain` |
| features.html | ✅ PNG, absolute | ✅ | ✅ | ✅ |
| clients.html | ✅ PNG, absolute | ✅ | ✅ | ✅ |
| download.html | ✅ PNG, absolute | ✅ | ✅ | ✅ |
| plugins.html | ✅ PNG, absolute | ✅ | ✅ | ✅ |
| docs.html | ✅ PNG, absolute | ✅ | ✅ | ✅ |
| hub.html | ✅ PNG, absolute | ✅ | ✅ | ✅ |
| about.html | ✅ PNG, absolute | ✅ | ✅ | ✅ |
| **404.html** | ❌ **MISSING** | ❌ | ❌ | ❌ |

**❌ 404.html has zero social metadata.** No `og:*`, no `twitter:*`, no `theme-color`. When shared, the 404 page will render with no preview card. All other 8 pages are correct.

---

### 12. Localization — ✅ 94

`<html lang="en">` from `site.default_locale`. All user-facing strings trace back to `content.json` (facts) or `copy_overlay` (presentation per brand kit). No locale-unsafe formatting. Logical CSS properties (`inline-start`/`inline-end`) used in some places. Fonts subset to Latin scripts. The site declares `supported_locales: ["en"]` only.

**Deduction:** No RTL considerations visible, but this is expected given `default_locale: "en"`.

---

### 13. Experience Fidelity — ⚠️ 86

The site faithfully implements the Midnight Jazz kit's declared experience:

| Kit declaration | Implementation | Status |
|---|---|---|
| `site_architecture.nav` (6 items) | Nav has exactly 6 items (Plugins/Docs demoted to footer per `demoted_pages`) | ✅ |
| `feature_casting.hero` (2 features) | Home shows exactly 2 features (library + syncplay) | ✅ |
| `copy_overlay.hero` | Jazz-flavored paraphrase of `hero.subheadline` — all facts traceable | ✅ |
| `faq_experience.frame: "letters-column"` | FAQ styled as letters column with Miles persona framing | ✅ |
| `proof_strategy` | Uses MPL-2.0, NTP, FFmpeg — verifiable, no invented numbers | ✅ |
| `intensity_toggle` | "House lights up" switch in footer, body class + localStorage | ✅ |
| `mascot.behavior` | Miles shown on home/download, tip bubble, dismiss persists | ✅ |
| `easter_eggs` | logo-clicks:5 (vinyl reward) + typed-word:deepcut (spotlight) — both wired | ✅ |
| `visitor_paths` | "Where to next?" fork on home | ✅ |
| `seasonal_activation` | Live-JS mode declared but date-gate appears dormant (no visible seasonal behavior) | ⚠️ |
| **FAQ question_order** | about.html renders FAQ in `content.json` order, NOT `faq_experience.question_order` | ⚠️ |

**⚠️ FAQ question order:** `about.html` renders FAQ items in `content.json` order: like-plex, expose-internet, formats, mobile-app, plugins, license. The brand kit (`faq_experience.question_order`) specifies: `["like-plex", "expose-internet", "formats", "mobile-app", "plugins", "license"]`. Wait — those ARE the same. The brand kit's `question_order` happens to match `content.json`'s order here. No defect. Strike this finding.

**⚠️ Logo easter egg `preventDefault()`** — breaks logo navigation (see dimension 5).

---

## Summary

| Dimension | Score | Symbol |
|---|---|---|
| Brand fidelity & spirit | 94 | ✅ |
| SEO | 94 | ✅ |
| Readability | 92 | ✅ |
| Spelling & grammar | 100 | ✅ |
| Usability | 84 | ⚠️ |
| Accessibility | 82 | ⚠️ |
| Responsive | 93 | ✅ |
| Performance | 100 | ✅ |
| Content accuracy | 86 | ⚠️ |
| CTA / funnel | 94 | ✅ |
| Social metadata | 89 | ⚠️ |
| Localization | 94 | ✅ |
| Experience fidelity | 86 | ⚠️ |

**Average score: 90.6**

---

## ❌ BLOCKERS (must fix before approval)

### 1. 404.html: Missing `#main-content` landmark
- **File:** `404.html:77, 129`
- **Issue:** `<a class="skip-link" href="#main-content">` targets an ID that does not exist in the page body. There is no `<main id="main-content">` anywhere in 404.html.
- **Fix:** Wrap `.error-page` in `<main id="main-content" tabindex="-1">…</main>`

### 2. index.html: Fabricated "5 Native clients" count
- **File:** `index.html:222`
- **Issue:** `.proof-stat__number` shows "5" for "Native clients." Per `content.json` and new_site.md §19.7: there are **4 native clients** (Roku, Samsung Tizen, Windows, Mobile) + 1 DLNA option. "5 Native clients" is a fabricated number. The `clients.html` description "Five ways to reach your Phlix server" also implies 5 native clients.
- **Fix:** Change to "4" and update the label to "Native clients" + "(+DLNA)" or similar; OR link to the live clients page with a descriptive label per `proof_strategy` rules.

---

## ⚠️ MEDIUM (should fix)

### 3. 404.html: Missing social metadata
- **File:** `404.html`
- **Issue:** No `og:*`, `twitter:*`, or `theme-color` meta tags. All 8 other pages have complete social metadata.
- **Fix:** Add the standard OG + Twitter meta block pointing to the 404's canonical URL and the site's og.png.

### 4. js/main.js: Logo `preventDefault()` breaks navigation
- **File:** `js/main.js:168`
- **Issue:** `e.preventDefault()` on the logo click defeats the `<a href="./">` navigation. Users clicking the logo expecting to go home get nothing.
- **Fix:** Remove `e.preventDefault()` from the logo click handler. The easter egg should count clicks without preventing navigation, or use a separate non-navigation click target.

---

## Fixes Summary

1. **`404.html`:** Add `<main id="main-content" tabindex="-1">` wrapping the error content, and add social metadata block.
2. **`index.html:222`:** Change `.proof-stat__number` from "5" to "4"; add "(+ any DLNA device)" to the label or restructure as "4 native + DLNA".
3. **`js/main.js:168`:** Remove `e.preventDefault()`. The reward can still trigger on the 5th click without preventing navigation.

After these 3 fixes (one is a 2-part change), all dimensions score ≥90 and no ❌ remain.
