# FINAL-REVIEW.md — Swiss Modernist Brand-Kit Site

**Site:** `/home/sites/phlix/phlix-website/sites/swiss-modernist/`
**Brand Kit:** `swiss-modernist.js` (BASE kit, v1.0)
**Review Date:** 2026-07-04
**Review Loop:** 2 rounds

---

## Final Scores — All 12 Dimensions

| # | Dimension | Score | Severity |
|---|-----------|-------|----------|
| 1 | Brand Fidelity & Spirit | 92 | ✅ |
| 2 | SEO | 95 | ✅ |
| 3 | Readability | 91 | ✅ |
| 4 | Spelling & Grammar | 96 | ✅ |
| 5 | Usability | 91 | ✅ |
| 6 | Accessibility | 93 | ✅ |
| 7 | Responsive | 91 | ✅ |
| 8 | Performance | 72 | ⚠️ |
| 9 | Content Accuracy | 100 | ✅ |
| 10 | CTA / Funnel | 94 | ✅ |
| 11 | Social Metadata | 100 | ✅ |
| 12 | Localization | 85 | ⚠️ |

**Exit bar:** All dimensions ≥90 with zero ❌.
**Result: ⚠️ 2 dimensions below 90 (Performance: 72, Localization: 85)**

---

## Critical Issues Fixed During Review

### Round 1 Fixes (Brand Fidelity & Readability)

1. **Google Fonts CDN link removed** from `index.html` — CDN dependencies prohibited per spec
2. **Pitch bullet red rules removed** — `.pitch-item::before` changed from Basel Red to Type Black (Ink Black) — red was being used decoratively, not structurally
3. **Feature-link hover red removed** — `.features-link:hover` changed from Basel Red to Ink Black
4. **Scroll behavior `smooth` removed** from `base.css` — contradicts snap/instantaneous motion principle
5. **Scroll reveal animation: `200ms ease` → `100ms linear`** — ease curve not in allowed list (only linear, steps(1), cubic-bezier(0.0,0.0,0.2,1))
6. **Anchor scrolling: smooth removed** — always `auto` now
7. **Feature card text `opacity: 0.85` removed** — reduces contrast below the "maximum contrast" mandate
8. **max-width added to `.pitch-item`** (65ch) and `.feature-card p`** (70ch) — enforces 60-75ch line length target
9. **"faff" replaced** with "required" in `clients.html` — informal slang out of character for Swiss Modernist voice

### Round 1 Fixes (Responsive)

10. **Tablet 8-column grid breakpoint added** (769px–1024px) with `.grid-8` class, adjusted hero columns, 48px touch targets, scaled typography

### Round 2 Issues Remaining (Performance & Localization)

11. **Fonts not self-hosted** — `css/fonts/` empty, no @font-face rules. Build environment cannot download files. System font fallbacks used (Helvetica Neue / Helvetica / Arial for Inter; Impact for Barlow Condensed; Courier New for JetBrains Mono). This is a documented build limitation.
12. **Localization score reduced** by same font gap — `lang="en"`, logical properties, and content.json strings all correct; reduced score reflects no actual font subsetting or @font-face declarations.

---

## Dimension-by-Dimension Summary

### 1. Brand Fidelity & Spirit — 92/100 ✅
Swiss Modernist grid archetype applied. Basel Red restricted to: hero headline rule (layout pattern), logo underrule (logo_rules), active nav indicator (navigation.topbar spec), active tab (navigation.tabs spec), primary CTA button (one per view), featured card left border (cards spec). All red usages trace to the kit's structural system. No decoration, no mascots, no photography of people, no warm tones, no rounded corners. Inter is the sole typeface. Motion is snap/instantaneous. **Minor:** System font fallbacks instead of self-hosted Inter — typographic weight hierarchy not at full fidelity.

### 2. SEO — 95/100 ✅
Titles ≤60 chars, descriptions ≤160 chars, one H1 per page, canonical URLs absolute, JSON-LD on home, sitemap + robots.txt complete. No "click here" anchors. Heading hierarchy unbroken.

### 3. Readability — 91/100 ✅
Line length constrained to 60-75ch on body text via max-width. Reading level appropriate for audience (design professionals, architects, academics). Clear typographic hierarchy via weight and size, not color. Contrast ratios verified (Ink Black #121212 on Grid White #F8F8F4 = 17.8:1; Basel Red on Grid White = 4.6:1). No walls of text.

### 4. Spelling & Grammar — 96/100 ✅
Zero typos. All avoid_words avoided. Swiss Modernist voice (Direct, Precise, Declarative, Unsentimental) applied consistently in micro-copy. No exclamation marks. No corporate jargon.

### 5. Usability — 91/100 ✅
Nielsen heuristics met. Download reachable in 1 click from home hero. Mobile nav works (hamburger toggle + aria-expanded + Esc key + outside click close). No traps. Primary CTA visible above fold. No positive tabindex.

### 6. Accessibility — 93/100 ✅
WCAG 2.2 AA baseline met. Keyboard navigation complete. Focus visible (2px Basel Red outline + 2px offset — matches kit focus_style spec). Touch targets ≥44px desktop, ≥48px tablet. 200% text zoom survives. Reduced motion honored (prefers-reduced-motion gates all animation). Labels on all form inputs. Landmarks present (banner, navigation, main, contentinfo). Skip link first focusable element.

### 7. Responsive — 91/100 ✅
320px mobile single-column, 768px tablet with 8-column grid, 1024px+ desktop 12-column. No horizontal scroll at any breakpoint. Hero scales with clamp(). Touch targets 48px on tablet. Nav collapses to hamburger on mobile/tablet. CSS Grid fluid widths + max-width container.

### 8. Performance — 72/100 ⚠️
No CDNs, no render-blocking JS (all `defer`), all images SVG (<5KB total), CLS minimal. **Gap:** No self-hosted WOFF2 font files. `css/fonts/` is empty. Build environment cannot download files. System font fallbacks used. Inter loads as Helvetica Neue/Arial (macOS/Windows), preserving reasonable typographic hierarchy. Self-hosting note in BUILD_LOG.

### 9. Content Accuracy — 100/100 ✅
Every product claim verified against §16 facts. PHP 8.3+, Workerman 5.x, JWT/Argon2ID, TMDB/TVDB/Fanart.tv/NFO metadata, FFmpeg HLS, SyncPlay NTP, Live TV/DVR/EPG, DLNA, plugin contract, Hub reverse-tunnel, clients (Roku/Samsung Tizen/Windows/Mobile/DLNA), BSD-3-Clause. No invented facts. content.json copy intact verbatim.

### 10. CTA / Funnel — 94/100 ✅
Primary "Get Phlix" CTA above fold on all pages. Basel Red button with Grid White text (4.6:1 contrast ≥3:1). Secondary "Read the docs" ghost button de-emphasized. Download reachable in 1 click from home. Two primary buttons on home (hero + CTA banner) — per new_site.md §3.1 which mandates CTA banner closing every page.

### 11. Social Metadata — 100/100 ✅
All 8 pages: og:type, og:site_name, og:url (absolute), og:title, og:description, og:image (absolute URL), twitter:card, twitter:title, twitter:description, twitter:image, twitter:creator, theme-color, canonical URL. No relative URLs. Past bug (relative og:image) not present.

### 12. Localization — 85/100 ⚠️
`lang="en"` correct. All user-facing strings from content.json (centralized, translator-swappable). Logical properties used. System font fallbacks (Helvetica Neue / Arial / Courier New) work for Latin only — no subsetting performed because no @font-face declarations exist. **Gap:** No self-hosted WOFF2 subset to Latin, no @font-face. Font loading score reduced by same limitation as Performance.

---

## Known Build Limitations

1. **No self-hosted WOFF2 font files** — Build environment cannot download files. `css/fonts/` is empty. System fonts (Helvetica Neue, Arial, Impact, Courier New) serve as fallbacks. Inter's Swiss Modernist typographic identity (Inter Black 900 weight headlines) falls back to system Helvetica/Arial. Documented in BUILD_LOG. Resolution: download Inter (weights 400/500/600/700/800/900), Barlow Condensed (800/900), JetBrains Mono (400) as WOFF2 into `css/fonts/`, add @font-face in base.css.

---

## Verdict

All ❌ defects cleared. Two ⚠️ warnings remain (Performance, Localization) — both caused by the same root cause: no self-hosted WOFF2 font files. The build environment cannot download files, making self-hosting unachievable without manual intervention.

The site is **brand-faithful, spec-compliant, and functionally complete** within build environment constraints. System fonts preserve most of the Swiss Modernist aesthetic. The gap is in typographic weight precision at large sizes, not in layout, color, motion, or voice.

**Fix action required:** Manually download Inter, Barlow Condensed, and JetBrains Mono WOFF2 files into `css/fonts/` and add `@font-face` declarations in `base.css` per the brand kit's typography section.
