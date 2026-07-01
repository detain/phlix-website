# Dimension 5: Usability (Nielsen Heuristics)
**Navigation, CTAs, dead ends, external link handling**

---

## Score: 85 / 100

## Verdict: CONDITIONAL (≥80 or no ❌ but minor issues)

---

## Findings

### ✅ Download Reachable in ≤2 Clicks from Home
- index.html: Home → clicking "Get Phlix" (primary CTA) → download.html — 1 click ✅
- Primary CTA visible above fold on home page — ✅
- All 8 pages have working nav links to download.html — ✅

### ✅ Primary CTA Above Fold
- index.html: hero CTA buttons at line 89-90 — well within viewport on standard desktop
- The "Get Phlix" button is visually prominent in Neon Sakura — ✅

### ✅ Mobile Nav Works
- `components.css:121-160` — mobile nav at ≤900px breakpoint
- hamburger toggle button present with `aria-expanded` — `index.html:61-65` ✅
- Close on outside click — `js/main.js:26-32` ✅
- Close on Escape — `js/main.js:35-42` ✅
- Focus trap — `js/main.js:44-57` ✅
- aria-controls correctly links toggle to menu — ✅

### ✅ No Dead-End Pages
- All 8 pages link to other pages
- docs.html links out to external docs site — expected for a "link-out + summary" page per new_site.md §3.6
- plugins.html and hub.html link to external resources (plugin example, hub source) — appropriate
- No page with no CTA or no forward navigation path

### ✅ External Links Have rel="noopener noreferrer"
- All external links checked:
  - `https://detain.github.io/phlix-docs` — `index.html:90` ✅, `download.html:148` ✅, `plugins.html:104` ✅, `about.html:123` ✅
  - GitHub links — all have `rel="noopener noreferrer"` ✅

### ⚠️ Download Page CTA — Minor Inconsistency
- **File:** `download.html:125`
- **Issue:** On the download page, the CTA banner links to docs.html: `<a href="docs.html" class="btn btn-secondary">Read the docs</a>`
- Per new_site.md §5: "Every page ends in a `.cta-banner` that drives toward download (or docs on the download page)"
- This is arguably correct per the parenthetical exception, but the "secondary" style for the download page CTA is also consistent with the kit's secondary action style
- Not a defect — acceptable interpretation of the spec

### ✅ Visibility of System Status
- No explicit loading states or progress indicators in this static site — appropriate for a marketing site
- Skip link visible on focus — `base.css:195-199` ✅

---

## Summary

Usability is solid: download reachable in 1 click, primary CTA above fold, mobile nav correctly implements toggle/close-on-outside-click/Escape/focus-trap, no dead ends, all external links have noopener noreferrer. The only consideration is that the download page CTA correctly uses docs (per the parenthetical exception in the spec), which is an acceptable interpretation.
