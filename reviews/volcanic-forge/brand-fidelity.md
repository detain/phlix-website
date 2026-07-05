# Brand Fidelity Review — Volcanic Forge (Round 2)

**Review date:** 2026-07-04
**Reviewer:** CodeReviewer
**Site:** `/home/sites/phlix/phlix-website/sites/volcanic-forge/`
**Brand kit:** `/home/sites/phlix/phlix-website/brand-kits/volcanic-forge.js`

---

## Score: 74 / 100 — ❌ FAIL

Two open issues remain, plus one new avoid_words violation introduced since Round 1.

---

## Prior Issues — Status

| # | Location | Issue | Status |
|---|----------|-------|--------|
| 1 | `css/components.css:191` | `#cf5516` off-palette hex in `.btn-primary:hover` | ✅ FIXED — now uses `color-mix(in srgb, var(--color-primary) 85%, #000)` |
| 2 | `css/components.css:225` | `#8a120e` off-palette hex in `.btn-danger:hover` | ❌ NOT FIXED — `#8a120e` is still hardcoded; brand error token is `#A01810` |
| 3 | `download.html` | Multiple primary CTAs on one screen | ✅ FIXED — only Roku carries `btn-primary`; Tizen/Windows/Mobile/DLNA all use `btn-secondary` |
| 4 | `css/components.css:231` | `btn-small` was 36px (brand min = 44px) | ✅ FIXED — `min-height: 44px` confirmed |

---

## Round 2 Findings

### ❌ CRITICAL — Off-Palette Hex (Still Open)

**File:** `css/components.css:225`
```css
.btn-danger:hover {
  background: #8a120e;   /* ← off-palette */
```
- **Expected:** `var(--color-error)` → `#A01810` (brand token `design_tokens.color."--color-error"`)
- **Actual:** `#8a120e` — a distinct dark red that does not appear anywhere in the brand palette
- **Brand rule violated:** `color_rules` — "Never use off-palette hex values; all colors reference brand tokens"
- **Severity:** CRITICAL — affects interactive state of a destructive-action button

---

### ❌ CRITICAL — avoid_words Violation (NEW)

**Files:** `download.html:102`, `docs.html:75`, `css/theme.css:318`

The word **"ecosystem"** is a brand `avoid_word` (line 702–705 of brand kit):
```js
avoid_words: [
  "cozy", "friendly", "warm", "cute", "delightful", "nice", "fun",
  "leverage", "synergy", "utilize", "seamless", "journey", "ecosystem",
]
```

Usage found:
- `download.html:102` — `<ul class="ecosystem-list">`
- `docs.html:75` — `<ul class="ecosystem-list">`
- `css/theme.css:318` — `.ecosystem-list { ... }`

**Fix:** Rename `.ecosystem-list` → `.project-stack` or `.stack-list` (referencing the "Project Stack" section heading). All three locations must be updated together to avoid a broken class reference.

---

## Verified Clean ✅

| Check | Result |
|-------|--------|
| No other off-palette hex values in CSS | ✅ All other `#` hexes in CSS resolve to brand tokens or gradient stops defined in base.css tokens |
| No multiple molten-orange CTAs per screen | ✅ download.html confirmed: 1 btn-primary (Roku), rest are btn-secondary |
| No `brand_opposites` terms in site code | ✅ No occurrences of pastel, soft-focus, warm cream, light background, white background, neon blue, acid green, cyberpunk, flat design, cartoonish, gentle lighting, overcast, daylight, studio white in HTML/CSS/JS |
| No other avoid_words in body copy | ✅ No cozy, friendly, warm, cute, delightful, nice, fun, leverage, synergy, utilize, seamless, journey in visible page copy |
| `btn-small` ≥ 44px | ✅ `min-height: 44px` at components.css:231 |
| Primary CTA uses brand token | ✅ `.btn-primary` references `var(--color-primary)` → `#E8611A` |

---

## Required Fixes (Priority Order)

1. **`css/components.css:225`** — Replace `#8a120e` with `var(--color-error)` or `#A01810`
2. **`download.html:102`, `docs.html:75`, `css/theme.css:318`** — Rename `ecosystem-list` → `project-stack` (or similar non-avoid_word name)

After both fixes are applied, re-score. Target: **≥90** with no ❌ for a clean round.
