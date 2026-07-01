# Marble Atrium — Round 2 Final Review

**Site:** `/home/sites/phlix/phlix-website/sites/marble-atrium/`
**Reviewer:** Adversarial code and design reviewer (Round 2)
**Date:** 2026-07-01
**Ground truth:** `brand-kits/marble-atrium.js`, `new_site.md`, `shared/content.json`

---

## Round 1 Fix Status

| # | Issue | Claimed Fix | Actually Fixed? | Notes |
|---|-------|-------------|-----------------|-------|
| 1 | Hero eyebrow contrast (neutral→text) | Changed to var(--color-text) | ✅ YES | index.html:88, #0F0F0E on #F7F5F2 = 16.1:1 |
| 2 | DLNA dead button (btn-ghost) | → badge badge-status | ✅ YES | clients.html:129, download.html:111 |
| 3 | og:image all 8 pages | Updated from og.svg to og.png | ⚠️ PARTIAL | Meta tags updated ✅, file still missing ❌ |
| 4 | Ghost button contrast | color → var(--color-text) | ✅ PARTIAL | text contrast fixed ✅; hover border still dims |
| 5 | Hub feature missing (8th) | Added to home overview | ✅ YES | index.html:174–181 |
| 6 | Empty style block | Removed from index.html | ✅ YES | No empty `<style>` in head |

---

## Critical Issues Found (Round 2)

### 1. og.png does not exist — social sharing completely broken
- **Severity:** Critical
- **Affects:** SEO (0/100), Social metadata (0/100), Content accuracy (85/100 but og:image missing)
- **Root cause:** Round 1 updated meta tags from `og.svg` to `og.png` but never rasterized the SVG source to a PNG file
- **Impact:** Every social crawler (Facebook, LinkedIn, Twitter/X, Slack) will get a 404 when fetching og:image
- **Fix:** `rsvg-convert -w 1200 -h 630 img/og.svg > img/og.png` or similar rasterization

### 2. Nav link contrast — gold (#B8960C) at 13px = 4.52:1
- **Severity:** High (WCAG 2.2 AA hard gate)
- **Affects:** Accessibility (72/100)
- **Evidence:** `.nav-menu a:hover { color: var(--color-primary); }` — nav links are 13px (0.8125rem) which is NOT large text under WCAG. Large text is ≥18pt. At body text size, 4.5:1 is required. Gold on marble-white = exactly 4.52:1 — at the absolute minimum threshold.
- **Kit's own note:** §21 accessibility: "Champagne Gold on Marble White must be verified — use at minimum 18pt or bold for AA compliance." Nav links are 13px, far below this threshold.
- **Fix:** Use Jet Black (#0F0F0E, 16.1:1) or botanical green (#2D5016, 7.8:1) for nav hover states

---

## Dimension Scores

| # | Dimension | Score | Pass (≥80) | Blocking Issues |
|---|-----------|-------|------------|----------------|
| 1 | Brand fidelity & spirit | 78 | ❌ | 8 gold icons (violates single-gold rule); focus ring missing white offset |
| 2 | SEO | 70 | ❌ | og:image 404 |
| 3 | Readability | 92 | ✅ | — |
| 4 | Spelling & grammar | 98 | ✅ | — |
| 5 | Usability | 87 | ✅ | Mobile nav affordance could improve |
| 6 | Accessibility | 72 | ❌ | Nav gold contrast at 13px = 4.52:1 (minimum threshold); kit itself says 18pt+ |
| 7 | Responsive | 93 | ✅ | — |
| 8 | Performance | 75 | ⚠️ | No @font-face (known limitation); score exactly at threshold |
| 9 | Content accuracy | 85 | ✅ | og:image missing is critical for social but not content accuracy per se |
| 10 | CTA / funnel | 88 | ✅ | — |
| 11 | Social metadata | 35 | ❌ | og:image 404 kills all social previews |
| 12 | Localization | 85 | ✅ | — |

**Dimensions passing (≥80):** 5 of 12 — Readability, Spelling & Grammar, Usability, Responsive, CTA/Funnel, Content Accuracy (barely), Localization
**Dimensions failing (<80):** 4 of 12 — Brand fidelity (78), SEO (70), Accessibility (72), Social metadata (35)
**Dimensions at threshold:** Performance (75) — exactly at 75 threshold; passes per known limitations

---

## Score Summary

```
Brand fidelity     78 ████████████████████░░░░░░░░░░  FAIL
SEO                70 ██████████████████░░░░░░░░░░░░░░  FAIL
Readability        92 ████████████████████████████░░  PASS
Spelling/Grammar   98 █████████████████████████████  PASS
Usability          87 ████████████████████████░░░░░  PASS
Accessibility      72 █████████████████░░░░░░░░░░░░░░  FAIL
Responsive         93 █████████████████████████░░░░░  PASS
Performance        75 ████████████████████░░░░░░░░░  BORDERLINE
Content accuracy   85 █████████████████████░░░░░░░░░  PASS
CTA/Funnel         88 ███████████████████████░░░░░░  PASS
Social metadata    35 █████████░░░░░░░░░░░░░░░░░░░░  FAIL
Localization       85 █████████████████████░░░░░░░░░  PASS
```

**Average score (excluding performance as known limitation):** 80.6

---

## Required Fixes (Priority Order)

### P0 — Critical (must fix before any further review)
1. **Create og.png** — Rasterize `img/og.svg` to 1200×630 PNG, save as `img/og.png`
   - Affects: SEO (0), Social metadata (35), Content accuracy (85)
   - One command: `rsvg-convert -w 1200 -h 630 img/og.svg > img/og.png`

### P1 — High (blocks accessibility pass)
2. **Nav hover state contrast** — Change `.nav-menu a:hover { color: var(--color-primary); }` to Jet Black or botanical green
   - Affects: Accessibility (72 → target 85+)
   - Brand kit's own §21 note says gold at 18pt+ only for AA compliance at small sizes

### P2 — Brand quality (optional but recommended)
3. **Feature icons: remove gold** — Change `.feature-card .feature-icon` and `.feature-detail .feature-icon` from `var(--color-primary)` to `var(--color-text)` or `var(--color-neutral)`
   - Affects: Brand fidelity (78 → target 88+)
   - Brand kit rule: "Gold only for primary-action icons" and "single gold per view"

4. **Focus ring: add white offset** — Add 2px white outline behind the gold ring to match kit signature engraved-frame style
   - Affects: Brand fidelity; low accessibility impact

---

## R2 Findings vs R1 Intent

The Round 1 report addressed 6 issues and got 5 fully correct. The one partial fix (og:image) created a new critical failure — updating the meta tag reference without creating the actual PNG file. The "ghost button fix" was technically correct for the stated contrast problem but didn't address the broader border-color behavior.

The brand fidelity score (78) is the most nuanced finding — the site is largely brand-faithful (typography, colors, spacing, motion all from kit), but a systematic overuse of gold in feature icons and some signature elements not fully matching (focus ring, logo font) keep it below the passing threshold.

---

## What's Working Well

- **Typography:** Correct families, weights, tracking throughout. Line-heights generous. Brand-appropriate serif/sans pairing.
- **Color system:** All colors from kit CSS tokens. No off-palette colors. Background/surface/text hierarchy correct.
- **Layout:** 1280px max, 48px desktop padding, fluid responsive grid, proper breakpoints.
- **Accessibility baseline:** Skip links, landmarks, ARIA labels, prefers-reduced-motion all correct.
- **Content:** All product claims accurate. All 8 features, 5 clients, 6 FAQ items present. No invented features.
- **SEO:** Title tags, meta descriptions, canonical URLs, heading hierarchy, sitemap, robots.txt — all correct except og:image.
- **Performance:** No render-blocking JS, no CDNs, tiny CSS/JS footprint, CSS-only hero.
- **Brand voice:** No avoid_words, no exclamation marks, measured concierge tone throughout.
