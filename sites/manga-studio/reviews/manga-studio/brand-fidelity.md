# Brand Fidelity & Spirit Review — Manga Studio

**Reviewer:** CodeReviewer (adversarial, 12-dimension)
**Score: 68 / 100**
**Status: ⚠️ Should Fix**

---

## Summary

The site executes the Manga Studio kit's visual DNA well in most areas — near-zero radii, hard offset shadows, ink-black borders, the speed-line radial hero motif via CSS `repeating-conic-gradient`, and Black Han Sans headlines. However, there are **critical deviations**: Google Fonts CDN instead of self-hosted WOFF2, Spot Red overused per-page-fold rule (4 instances in hero fold), `text-transform: uppercase` modifying content.json FAQ content, and Impact Yellow appearing on the status-beta badge in addition to kit-allowed uses.

---

## Findings

### ✅ PASS — Correct

| Check | Evidence |
|-------|----------|
| CSS variables match design tokens | `--color-primary: #D0021B`, `--color-bg: #F8F8F4`, `--color-text: #0D0D0D`, `--color-border: #0D0D0D`, `--color-secondary: #FFD000` all match kit exactly |
| Black Han Sans for headlines | `--font-headline: 'Black Han Sans','Anton',impact,sans-serif` in base.css:98 |
| Rampart One for display | `--font-display: 'Rampart One','Black Han Sans',impact,sans-serif` in base.css:99 |
| M PLUS 1p for UI | `--font-ui: 'M PLUS 1p','Noto Sans JP',system-ui,sans-serif` in base.css:101 |
| Noto Sans JP for body | `--font-body: 'Noto Sans JP','Hiragino Kaku Gothic Pro',sans-serif` in base.css:100 |
| Source Code Pro for mono | `--font-mono: 'Source Code Pro','Courier New',monospace` in base.css:102 |
| Manga White #F8F8F4 background | `--color-bg: #F8F8F4` in base.css:60 |
| Spot Red #D0021B primary CTA | `.btn-primary { background: var(--color-primary); }` components.css:248 |
| Impact Yellow #FFD000 secondary | `--color-secondary: #FFD000` in base.css:58 |
| Ink Black #0D0D0D text/border | `--color-text: #0D0D0D` base.css:63, `--color-border: #0D0D0D` base.css:70 |
| Near-zero corner radius | `--radius-sm: 2px` base.css:91, `--radius-md: 4px` base.css:92 on structural elements |
| Hard offset shadows | `--shadow-md: 2px 4px 0px rgb(13,13,13,1)` base.css:130, `--shadow-lg: 4px 6px 0px rgb(13,13,13,1)` base.css:131 |
| Kit avoid_words NOT used | No "leverage", "synergy", "seamless", "robust", "cutting-edge", "cozy", "warm", "cuddly", "wholesome", "delightful" found anywhere |
| Speed-line radial hero motif | `repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 4deg, rgb(13,13,13,0.06) 4deg, rgb(13,13,13,0.06) 5deg)` in theme.css:167–173 |
| 2px panel borders | `--border-default: 2px solid #0D0D0D` base.css:134 |
| Headlines use Black Han Sans 900 | All headline classes use `font-weight: 900` and `font-family: var(--font-headline)` |
| Negative tracking on headlines | `--tracking-headline: -0.01em` base.css:105 |
| Card hover diagonal shift | `.feature-card:hover { transform: translate(3px,3px); }` components.css:365 |
| Font-display: swap | Google Fonts URL includes `&display=swap` |

### ⚠️ SHOULD FIX

**1. Google Fonts CDN used instead of self-hosted WOFF2 (VIOLATION)**
- **File:** `css/base.css:7`
- **Issue:** `@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans...')` — CDN dependency
- **Spec rule (new_site.md §1):** "No CDN dependencies in the deployed page... Self-host fonts as WOFF2 and declare them with `@font-face` + `font-display: swap`"
- **BUILD_LOG.md:52** acknowledges this as intentional: "Google Fonts CDN used instead of self-hosted WOFF2"
- **Impact:** Render-blocking @import (not deferred like scripts); violates explicit spec prohibition
- **Fix:** Download WOFF2 files for all 5 font families, declare with `@font-face` in base.css, remove `@import`

**2. Spot Red appears 4+ times in hero fold (OVERUSE)**
- **Files:** `index.html:74,78,79`, `theme.css:243,289`
- **Issue:** Kit rule: "Spot Red appears exactly once per page fold as primary CTA" (manga-studio.js:904). Hero fold contains:
  - `.hero-eyebrow` color: `var(--color-primary)` (index.html:191) — **1**
  - `.btn-primary` "Get Phlix" (index.html:78) — **2**
  - `.btn-secondary` "Read the docs" (index.html:79, components.css:279 uses `#primary` on hover) — **3**
  - `.cta-banner` background `#D0021B` (theme.css:320) — **4**
  - Pitch h2 color `#D0021B` (theme.css:243) — **5**
  - Features overview h2 color `#D0021B` (theme.css:289) — **6**
- **Impact:** Dilutes the "weaponized emphasis" brand principle; each additional Spot Red instance weakens the impact of the primary CTA
- **Fix:** Reserve Spot Red for ONE element per fold. Change pitch h2 to Ink Black or Screentone Gray. Change features overview h2 to Ink Black. Move CTA banner below the fold or make it secondary (Ink Black) on index.html.

**3. FAQ question text is `text-transform: uppercase` (CONTENT VIOLATION)**
- **File:** `css/theme.css:401–408`
- **Issue:** `.faq-item dt` has `text-transform: uppercase` (theme.css:405)
- **Source content (content.json:135):** `"Is Phlix like Plex / Jellyfin / Emby?"` (title case)
- **Visible result:** "IS PHLIX LIKE PLEX / JELLYFIN / EMBY?" — content.json text has been visually altered
- **Spec rule (new_site.md §2):** "all user-facing strings trace back to `content.json`" and "Substantive product claims and feature bodies come verbatim from content.json. If the kit's voice wants a different headline, treat it as a visual headline overlay, not a replacement of the factual copy."
- **Impact:** Content inaccuracy — the factual FAQ answers are displayed in altered form
- **Fix:** Remove `text-transform: uppercase` from `.faq-item dt` in theme.css. Use kit typography rules for the visual style without modifying the actual content string.

**4. Impact Yellow appears more than once per page**
- **Files:** `css/components.css:507–511`
- **Issue:** `.client-status.status-beta` uses `background: var(--color-secondary)` (Impact Yellow). On clients.html, the Mobile beta card has this badge. On download.html, the Mobile beta card also has this badge. That's at least 2 instances.
- **Kit rule (manga-studio.js:907):** "Impact Yellow is used at most once per page"
- **Impact:** Impact Yellow loses its "shock" value when repeated
- **Fix:** Use a different visual treatment for beta status (e.g., Ink Black border + label text, or a Screentone Gray fill with dark text) that doesn't use Impact Yellow

---

## Severity Classification

| # | Finding | Severity | Type |
|---|---------|----------|------|
| 1 | Google Fonts CDN instead of self-hosted WOFF2 | ⚠️ Should Fix | Performance / Spec |
| 2 | Spot Red 4+ times in hero fold | ⚠️ Should Fix | Brand Violation |
| 3 | `text-transform: uppercase` on FAQ content | ⚠️ Should Fix | Content Accuracy |
| 4 | Impact Yellow > 1× per page | ⚠️ Should Fix | Brand Violation |

No ❌ Critical findings (no security vulnerabilities, no completely broken elements).

---

## Score Breakdown

| Category | Points | Notes |
|----------|--------|-------|
| Color tokens match kit | 15/15 | Perfect match |
| Typography tokens | 12/15 | Fonts correct; Google CDN is the issue |
| Shapes/radius/shadows | 10/10 | Perfect — 2px radii, hard-offset shadows |
| Brand voice/vocabulary | 8/10 | No avoid_words; kit vocabulary not required in body |
| Motif presence | 10/10 | Speed-line radial present in hero |
| CTA discipline | 4/10 | 4–6 Spot Red instances in hero fold |
| Social metadata | 9/10 | Complete OG/Twitter; og:image uses SVG (minor) |
| **Total** | **68/100** | |

---

*Review generated by CodeReviewer — Manga Studio adversarial review, dimension: Brand Fidelity & Spirit*
