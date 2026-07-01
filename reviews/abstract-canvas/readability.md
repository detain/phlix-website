# Readability — Abstract Canvas Site Review

**Dimension:** Readability
**Score: 82 / 100**

---

## Findings

### ✅ PASS — Reading Level Appropriate for Audience

Content is drawn verbatim from `content.json` and reads at an accessible, cultured level suited to adults 30–55 who appreciate cultural depth and aesthetic intention. Language is clear, direct, and literate without being pretentious. No jargon beyond standard technical terms appropriate for a self-hosted media server audience.

---

### ⚠️ WARN — Line Length Could Exceed 75ch in Some Contexts

**Hero subheadline (`index.html:103`):** CSS constrains it to `max-width: 56ch` (theme.css:196). ✅

**Pitch item paragraphs (`theme.css:274–279`):** The `.pitch-item` is in a `grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr))` (theme.css:252). At full width on a large viewport, a 320px minimum column could produce ~70–75ch of body text at the default font size, which is at the upper limit. Not a failure, but worth noting.

**Feature card body (`theme.css:333–338`):** `font-size: 0.9375rem` in a card with `padding: var(--space-6)` — the card grid uses `minmax(min(100%, 280px), 1fr)`, so at max the card is 280px wide = ~65ch. ✅

**CTA banner paragraph (`theme.css:363–371`):** `max-width: 52ch` ✅

**Download/code page body:** `.body-text` at `line-height: 1.7` (base.css:161–164) is appropriate.

---

### ✅ PASS — Clear Hierarchy with Adequate White Space

- Gallery breathing room is evident: `padding: var(--space-24) 0` on major sections ✅
- `.content-container` with `max-width: 1200px` and `padding-inline: var(--gutter)` (24px) provides good margins ✅
- `gap: var(--space-6)` (24px) on grids provides inter-element breathing room ✅
- `.section-title` and `.page-header` have proper bottom margins (`margin-bottom: var(--space-12)`) ✅
- Generous whitespace between `.about-section` blocks ✅

---

### ❌ FAIL — Low Contrast: Raw Umber on Gallery Linen

The kit warns: *"Raw Umber (#8A8070) on Gallery Linen: check individually — may require larger text."*

Several elements use `--color-neutral` (#8A8070 / raw umber) as text on `--color-bg` (#F0EDE4 / gallery linen):

| Element | Location | Size | Contrast Ratio | WCAG AA Target | Status |
|---|---|---|---|---|---|
| `.body-small` | `theme.css:59–64` | 0.875rem (~14px) | ~4.3:1 | 4.5:1 (normal text) | ❌ FAIL |
| `.ui-small` | `theme.css:75–81` | 0.8125rem (~13px) | ~4.3:1 | 4.5:1 (normal text) | ❌ FAIL |
| `.caption` | `theme.css:102–109` | 0.9375rem (~15px) | ~4.3:1 | 4.5:1 (normal text) | ❌ FAIL |
| Footer tagline | `components.css:253–260` | 1.5rem italic | ~4.3:1 | 3:1 (large text) | ✅ Pass |

**Contrast check:** `#8A8070` on `#F0EDE4`:
- Relative luminance of `#F0EDE4` ≈ 0.88
- Relative luminance of `#8A8070` ≈ 0.21
- Contrast ratio ≈ 4.3:1 — **below the 4.5:1 threshold for body text**

For `.caption` at 15px (large text threshold), the 3:1 requirement passes. But `.body-small` and `.ui-small` at 13–14px fail WCAG AA for normal body text.

---

### ✅ PASS — Body Copy from content.json Used Verbatim

All feature bodies, pitch bullets, client descriptions, FAQ answers, ecosystem descriptions are drawn directly from `content.json` without rephrasing. ✅

---

### ✅ PASS — Color Contrast for Primary Text Passes

| Element | Colors | Contrast Ratio | Requirement | Status |
|---|---|---|---|---|
| Body text (`.body-text`) | `#141210` on `#F0EDE4` | ~18:1 | ≥4.5:1 | ✅ Pass |
| Primary CTA text | `#F0EDE4` on `#1A1A1A` | ~16.8:1 | ≥4.5:1 | ✅ Pass |
| Headlines (`.headline`) | `#1A1A1A` on `#F0EDE4` | ~16.8:1 | ≥3:1 (large) | ✅ Pass |
| Cadmium red links | `#CC2200` on `#F0EDE4` | ~5.8:1 | ≥4.5:1 | ✅ Pass |
| Ultramarine focus | `#0055AA` on `#F0EDE4` | ~7.3:1 | ≥3:1 (UI) | ✅ Pass |

---

### ✅ PASS — Font Families Support Reading

- Body text: Lora (serif) at `line-height: 1.7` — warm, literary, appropriate for long-form reading ✅
- Headlines: Cormorant Garamond at tight `line-height: 1.08` — editorial authority ✅
- UI text: Inter at `line-height: 1.35` — clean legibility for navigation/chips ✅

---

### ✅ PASS — Typography Scale is Readable

Font sizes use `clamp()` for fluid scaling across viewports. Minimum body size is 1rem (16px) on all pages. No text ever drops below ~13px (the `.ui-small` is labels/copyright, not body copy).

---

### ✅ PASS — Content Never Re-worded

`new_site.md §2` requires that substantive product claims and feature bodies come verbatim from `content.json`. All feature descriptions, pitch bullets, client taglines, FAQ answers, and ecosystem text match the source exactly. ✅

---

### ⚠️ WARN — Hub Page Body Copy Not in content.json

`hub.html` has substantive body text on the Hub page (lines 70–96) that does not appear in `content.json`. This text is accurate and brand-appropriate, but the spec's `§2` contract says the source of truth is `content.json`. The Hub section content (`hub.html:68–97`) appears to be original writing, not sourced from content.json.

---

## Summary

The site reads well — warm typography, appropriate line heights, generous gallery breathing room, and strong primary text contrast. Body copy is used verbatim from content.json as required.

**The primary failure** is low-contrast raw umber text (`.body-small`, `.ui-small`, `.caption`) falling slightly below the 4.5:1 WCAG AA threshold at small sizes. The kit itself flagged this risk.

**Secondary concern:** The Hub page has substantive body text not sourced from content.json, which may violate the "single source of truth" content contract, though the content itself is accurate and on-brand.

**Score: 82/100** — Strong readability foundation undermined by raw umber contrast issues at small text sizes.
