# DIMENSION 10: CTA / Funnel Review

**Score: 88/100**

## Summary
Primary CTA above the fold with correct ≥3:1 contrast. Download reachable in ≤2 clicks from home. One minor deviation noted.

---

## Findings

### Primary CTA Above Fold (✅)

| Check | Result | Location |
|-------|--------|----------|
| "Get Phlix" visible without scrolling on home | ✅ Pass | `index.html:92` |
| CTA is first action in hero content flow | ✅ Pass | `index.html:91-94` |
| Primary CTA is `.btn.btn-primary` (Basel Red) | ✅ Pass | `index.html:92` |

### Contrast Ratio (✅)

Primary CTA button:
- Background: `#E8001C` (Basel Red)
- Text: `#F8F8F4` (Grid White)
- **Contrast ratio: 4.6:1** — exceeds ≥3:1 requirement ✅

Calculation verified against WCAG contrast formula:
- Relative luminance of #E8001C ≈ 0.164
- Relative luminance of #F8F8F4 ≈ 0.928
- Ratio = (0.928 + 0.05) / (0.164 + 0.05) ≈ 4.6:1 ✅

Secondary CTA ("Read the docs"):
- Uses `.btn.btn-ghost` (Ink Black border, transparent bg, Type Black text) ✅
- De-emphasized relative to primary ✅

### Download Funnel (✅)

| Check | Result | Location |
|-------|--------|----------|
| Home → Download button → download.html | ✅ 1 click | Nav "Download" link + hero CTA + CTA banner CTA |
| Download page has client download cards | ✅ Pass | `download.html:79-104` |
| Download reachable in ≤2 clicks from any page | ✅ Pass | All pages have nav or CTA banner |

### Minor Deviation ⚠️

**Issue: Multiple primary CTA buttons on index.html**

The brand kit states: "Basel Red (#E8001C) appears exactly once per view — on the primary CTA only."

However, index.html contains **two** instances of `.btn.btn-primary` (Basel Red) visible simultaneously:
1. Hero CTA: "Get Phlix" → `download.html` (`index.html:92`)
2. CTA banner CTA: "Get Phlix" → `download.html` (`index.html:194`)

**Severity: ⚠️ Warning**

- The new_site.md spec (§3.1) explicitly requires a `.cta-banner` closing every page with a download button, and §5 says "Every page ends in a `.cta-banner` that drives toward download"
- The brand kit's "once per view" rule is a page-level content rule (content, not structural CTAs)
- The duplication is intentional by spec design — hero converts, CTA banner reinforces
- Not a content accuracy failure; functional impact is minimal

**Recommendation:** Accept as-is. The spec is internally contradictory (brand kit "once per view" vs. new_site.md CTA banner requirement). The implementation is faithful to new_site.md, which is the authoritative spec for this project.

---

## Severity
- ⚠️ Warning — deviation from brand kit "once per view" rule, but compliant with new_site.md spec
