# CTA / Funnel — Round 2 Review

**Variant:** `01-minimalist-cinema`
**Review Date:** 2026-05-20
**Reviewer:** Dimension Reviewer

---

## Summary

Re-audit of CTA/Funnel dimension following Phase I `.btn-primary` color change. Primary CTA contrast remains compliant after the change from `#FFF` to `#1A1A1A` text. However, the secondary CTA is visually indistinguishable from the primary CTA, creating a funnel failure.

**Overall Assessment:** ⚠️ CONCERNS — Secondary CTA fails distinguishability requirement

---

## Evidence

### Primary CTA Contrast (RE-VERIFIED)

The primary CTA button (`.btn-primary`) uses:
- **Background:** `var(--color-electric-blue)` → `#2D9CFF`
- **Text:** `var(--color-charcoal)` → `#1A1A1A`

**Contrast Calculation:**
```
Relative Luminance(#2D9CFF) = 0.3327
Relative Luminance(#1A1A1A) = 0.0272
Contrast Ratio = (0.3327 + 0.05) / (0.0272 + 0.05) = 4.95:1
```

| Criterion | Required | Actual | Status |
|-----------|----------|--------|--------|
| Primary CTA above fold contrast | ≥3:1 | 4.95:1 | ✅ PASS |

**Evidence:** `css/components.css:26-30`, `css/base.css:8-9`

---

### Secondary CTA Distinguishability (NEW ISSUE)

The secondary CTA (`.btn-secondary`) uses:
- **Background:** `transparent`
- **Text:** `var(--color-charcoal)` → `#1A1A1A`
- **Border:** `var(--color-slate-gray)` → `#2E2E2E`

| Criterion | Required | Actual | Status |
|-----------|----------|--------|--------|
| Secondary CTA distinguishable from primary | Yes | **NO** | ❌ FAIL |

**Problem:** The secondary CTA has nearly identical visual treatment:
- Same button shape (`border-radius: var(--radius-full)`)
- Same font styling (`.btn` base shared, same size/weight)
- Same text color (`#1A1A1A` charcoal) on both buttons
- Difference is only a 2px gray border vs filled background — visually subtle

When a user sees two adjacent buttons ("Get Phlix" / "Read the docs"), they appear to be equal-weight options, making it unclear which is the primary action.

**Evidence:** `css/components.css:38-47`, `index.html:94-95`

---

### Navigation Path to Download

| Click Path | Status |
|------------|--------|
| Home → Primary CTA → Download | 1 click ✅ |

**Evidence:** `index.html:94` — href points directly to `/variants/01-minimalist-cinema/download.html`

---

### Surprise Modals

| Check | Status |
|-------|--------|
| Modal dialogs present | None found |
| JS shows only nav toggle + FAQ accordion | ✅ No surprise modals |

**Evidence:** `js/main.js` — only contains mobile nav toggle (lines 10-91) and FAQ accordion (lines 115-155). No modal logic.

---

### Auto-Play Media with Sound

| Check | Status |
|-------|--------|
| `<video>` with autoplay | None |
| `<audio>` with autoplay | None |
| `<iframe>` embeds | None |
| `autoplay` attribute | None |

**Evidence:** Grep across all variant files found no matches for `(autoplay|<video|<audio|<iframe)`.

---

## Score Breakdown

| Criterion | Weight | Score | Max |
|-----------|--------|-------|-----|
| Primary CTA contrast ≥3:1 | 30% | 30 | 30 |
| Secondary CTA distinguishable | 30% | 0 | 30 |
| ≤2 clicks home→download | 20% | 20 | 20 |
| No surprise modals | 10% | 10 | 10 |
| No auto-play media with sound | 10% | 10 | 10 |
| **Total** | 100% | **70** | **100** |

**Final Score: 70/100**

---

## Round 1 vs Round 2 Comparison

| Criterion | Round 1 | Round 2 | Change |
|-----------|--------|--------|--------|
| Primary CTA contrast | 4.21:1 | 4.95:1 | ✅ Improved |
| Secondary CTA distinguishable | Unknown | ❌ FAIL | NEW |
| Home→download clicks | 1 | 1 | — |
| Surprise modals | Pass | Pass | — |
| Auto-play media | Pass | Pass | — |

**Note:** The Round 1 report mentioned contrast was 4.21:1. After the color change (`.btn-primary` text from `#FFF` to `#1A1A1A`), the contrast improved to 4.95:1, which is still compliant but the color change created a new problem — both CTAs now share the same charcoal text color, reducing distinguishability.

---

## Recommendations

### Priority: HIGH

1. **Make secondary CTA visually distinct** — Choose ONE of these approaches:
   - **Option A:** Use outline style (transparent bg, electric-blue border, electric-blue text)
   - **Option B:** Use a muted/neutral style (gray text on light gray bg)
   - **Option C:** Differentiate by size (e.g., `btn-small` for secondary)
   - **Option D:** Add an icon to primary CTA only (e.g., download arrow)

### Priority: MEDIUM

2. **Verify hover states still distinguishable** — When hovering, both buttons currently shift to charcoal bg with white text (`components.css:32-36` and `:44-47`). Consider giving secondary a unique hover treatment as well.

---

## Rubric Compliance Summary

| Rule | Status |
|------|--------|
| Primary CTA above fold ≥3:1 contrast | ✅ PASS (4.95:1) |
| Secondary CTA distinguishable | ❌ FAIL |
| ≤2 clicks home→download | ✅ PASS (1 click) |
| No surprise modals | ✅ PASS |
| No auto-play media with sound | ✅ PASS |

---

## Files Reviewed

- `variants/01-minimalist-cinema/css/base.css`
- `variants/01-minimalist-cinema/css/components.css`
- `variants/01-minimalist-cinema/css/theme.css`
- `variants/01-minimalist-cinema/index.html`
- `variants/01-minimalist-cinema/download.html`
- `variants/01-minimalist-cinema/js/main.js`
