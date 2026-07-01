# R2 — Brand Fidelity & Spirit

## Round 1 Fixes: VERIFIED

| # | Issue | Status | Evidence |
|---|-------|--------|----------|
| 1 | Hero eyebrow contrast (neutral→text) | ✅ FIXED | index.html:88 `color: var(--color-text)` — #0F0F0E on #F7F5F2 = 16.1:1 |
| 6 | Empty style block removed | ✅ FIXED | index.html `<head>` now contains only meta/link/script, no empty `<style>` |

---

## NEW ISSUES

### ❌ CRITICAL: og.png referenced but missing

- **Severity:** Critical (blocks social sharing entirely)
- **File:** All 8 HTML pages, meta tags
- **Evidence:** Every page has `<meta property="og:image" content="https://detain.github.io/phlix-website/marble-atrium/img/og.png">` but `ls img/` reveals only `favicon.svg logo.svg og.svg PROMPTS.md` — **og.png does not exist**
- **Impact:** Every social share (Facebook, LinkedIn, Slack, Twitter/X) will fail to load og:image; og.svg cannot be used directly because browsers treat SVG as a document, not an image
- **Fix required:** Rasterize og.svg → 1200×630 PNG, or switch meta back to og.svg (which breaks spec §11)

### ⚠️ BRAND VIOLATION: Ghost button "fix" is partially wrong

- **Severity:** Moderate
- **File:** components.css:225–235
- **Evidence:** Round 1 report claimed "changed btn-ghost color from var(--color-neutral) to var(--color-text)." The `color` property was changed, but the `border-color` was not — `.btn-ghost` still has `border-color: var(--color-border)` (#C8C4BC) which is hairline stone. The brand kit §13 specifies ghost button as "1px Hairline Stone border; for de-emphasised tertiary actions." The fix only addressed the text color, not the border color.
- **Also:** The hover state at line 232 changes `border-color: var(--color-neutral)` — this is a regression toward the original problem. A hover that dims the border further hurts contrast.
- **Contrast check:** Ghost button text #0F0F0E on #F7F5F2 background = 16.1:1 ✅. Border #C8C4BC on #F7F5F2 = 1.7:1 (insufficient as a separate element but the border is decorative, not a text contrast issue).

### ⚠️ BRAND VIOLATION: 8 gold feature icons on one view

- **Severity:** Moderate
- **File:** index.html:120–181 (features-overview); features.html:74–142 (feature-detail)
- **Evidence:** All 8 `.feature-card .feature-icon` and `.feature-detail .feature-icon` are styled with `color: var(--color-primary)` (champagne gold, #B8960C) in components.css:312 and :343
- **Brand kit violation:** Kit §13 icons rules: "Single color by default (Jet Black or Veining Grey); **Gold only for primary-action icons**" and §9: "Use Gold colour only to the single most important icon in context" and color_rules: "No more than two accent colors visible simultaneously in any single view."
- **8 simultaneous gold icons violates the "single gold per view" rule.** A hero's single CTA button could legitimately be the sole gold accent; these 8 icons are not primary-action icons, they are feature identifiers. Should be Jet Black (#0F0F0E) or Veining Grey (#A0A09A).

### ⚠️ MINOR: Logo uses Georgia serif — acceptable per kit fallback list but suboptimal

- **Severity:** Low (per kit fallbacks)
- **File:** img/logo.svg:7, img/og.svg:27,39,49
- **Evidence:** Font stack is `Georgia, 'Times New Roman', serif` — not Cormorant Garamond. The kit explicitly lists Cormorant Garamond with Georgia as a fallback. This is technically correct per the kit's fallback list, but Georgia is a thick, common serif that lacks the thin-spaced elegance of Cormorant Garamond.
- **Brand kit note:** The kit's own fallback chain (`'Cormorant Garamond', 'Garamond', Georgia, serif`) documents Georgia as acceptable when self-hosted WOFF2 is not available. This is a known limitation (per the user's round 1 notes). Not a new violation — flagging for visibility only.

### ⚠️ MINOR: Focus ring lacks 2px white offset

- **Severity:** Low
- **File:** base.css:178–181
- **Evidence:** `outline: 2px solid var(--color-focus); outline-offset: 2px;` — this is a single 2px gold ring with a 2px transparent/gap offset. The kit §21 accessibility specifies "2px Champagne Gold focus ring with 2px Marble White offset — reads as a precision engraved frame." The white offset is not present.
- **Impact:** Focus ring reads as gold outline, not engraved-frame. Technically functional for visibility, but not brand-faithful.

---

## WHAT'S WORKING (Brand-positive)

| Element | Evidence |
|---------|----------|
| Typography — headline weight 300 serif | theme.css:14–22 ✅ |
| Typography — body Jost 300 | base.css:99 ✅ |
| Letter-spacing generous throughout | theme.css:21,51,81–83 ✅ |
| Max content width 1280px | theme.css:92 ✅ |
| Container padding 48px | theme.css:94 ✅ |
| No accent colors stacked | Only gold + botanical green used, controlled ✅ |
| Hairline borders 1px stone | base.css:67 ✅ |
| Card border-radius 4px | components.css:295 ✅ |
| Button radius 2px | components.css:165 ✅ |
| Shadow opacity ≤14% | base.css:28–30 ✅ |
| prefers-reduced-motion respected | base.css:220–228, theme.css:438–444, js/main.js ✅ |
| Glass-ceiling grid motif on hero | theme.css:131–141 ✅ |
| Marble-vein reveal animation | theme.css:416–423 ✅ |
| Nav gold underline on active page | components.css:78–84 ✅ |
| Blush Rose for selection | base.css:190–193 ✅ |
| Footer italic tagline | components.css:589 ✅ |

---

## SCORE: 78/100

| Dimension | Score | Notes |
|-----------|-------|-------|
| Brand colors | 85 | All from kit, no off-palette. Violation: 8 gold icons. |
| Typography | 82 | Georgia fallback acceptable (known). Cormorant/Jost correct. |
| Spacing | 95 | All spacing from kit scale ✅ |
| Motion | 85 | Correct tokens. Focus ring offset missing. |
| Iconography | 60 | 8 gold icons = violation of single-gold rule |
| Overall fidelity | 78 | og.png missing is critical; icon gold overuse moderate |

**Pass threshold: 80** — ❌ Does not pass.

### Required fixes
1. **og.png must exist** — rasterize og.svg to 1200×630 PNG
2. **Feature icons should be Jet Black** — remove gold from non-primary feature icons
3. **Focus ring white offset** — add `outline: 2px solid white` behind the gold ring, or use a box-shadow approach

### Suggested improvements
4. Ghost button hover should not regress border to neutral
