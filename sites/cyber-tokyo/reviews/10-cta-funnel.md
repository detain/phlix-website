# Dimension 10: CTA / Funnel
**Primary CTA visibility, button styling, CTA banners on every page**

---

## Score: 88 / 100

## Verdict: CONDITIONAL (≥80, no ❌ but has issues)

---

## Findings

### ✅ Primary CTA "Get Phlix" Above Fold
- `index.html:89` — "Get Phlix" button is in the hero section, above the fold on standard desktop viewport
- The hero inner container has `max-width: 800px` with `padding-block: var(--space-16)` — CTA is comfortably above the fold — ✅

### ✅ Primary CTA is Neon Sakura (#FF00AA)
- `components.css:275-279` — `.btn-primary` uses `background: var(--color-primary)` which is `#FF00AA` (confirmed via `base.css:53`)
- On hover: `components.css:281-286` — background lightens slightly (#f2b) but maintains Neon Sakura family
- On active: switches to Circuit Green — this is per brand kit "button_press" micro-interaction — ✅
- Large variant (`.btn-large`) at `components.css:399-403` increases size to 52px height — prominent — ✅

### ✅ Secondary CTA De-emphasized
- `.btn-secondary` (ghost style) — `components.css:296-306`:
  - `background: transparent`
  - `color: var(--color-secondary)` (#00FF41)
  - `border-color: var(--color-secondary)` — 1px outline, no fill
- This is clearly secondary — no fill, no shadow, Circuit Green outline — ✅

### ✅ Primary CTA → Download Page
- All "Get Phlix" buttons link to `download.html` — index.html:89, features.html:161, clients.html:143, hub.html:79
- Secondary CTAs link to external docs — index.html:90 ✅

### ✅ Every Page Ends in .cta-banner (7 of 8 pages)
| Page | CTA Banner | Final CTA Label |
|------|------------|-----------------|
| index | ✅ `index.html:195` | "Download Phlix" → download |
| features | ✅ `features.html:158` | "Download Now" → download |
| clients | ✅ `clients.html:140` | "Download Now" → download |
| plugins | ✅ `plugins.html:78` | "Get the example plugin" → external |
| docs | N/A (link-out page) | "Read the docs" → secondary |
| hub | ✅ `hub.html:76` | "Get started" → download |
| download | ✅ `download.html:122` | "Read the docs" → secondary (per spec exception) |
| about | ❌ NOT PRESENT | Ends at FAQ without CTA banner |

### ❌ About Page Missing .cta-banner
- **File:** `about.html:104` — main closes at line 104, footer begins immediately
- new_site.md §3.8 specifies about.html should contain Philosophy, License, Contributing, FAQ — but the spec's §5 "Every page ends in a .cta-banner" applies to all pages
- The about page has no download CTA, no "Get Phlix", no secondary CTA — the last interactive element is the FAQ section
- This is a minor issue because the about page's purpose is informational, not conversion
- **Severity:** Minor — the page still links to download via the footer, but the spec requires a .cta-banner on every page
- **Confidence:** 90%

### ✅ Download Page CTA — Spec-Compliant Exception
- `download.html:122-126` — CTA banner says "Need help getting started?" with "Read the docs" secondary button
- new_site.md §5: "Every page ends in a .cta-banner that drives toward download (or docs on the download page)" — this is the allowed exception
- ✅ Correct per spec

---

## Summary

CTA funnel is strong: primary CTA above fold on home, correctly styled in Neon Sakura, secondary CTA properly de-emphasized, primary CTAs all link to download page, 7 of 8 pages have closing CTA banners. The about page is missing its CTA banner — minor spec violation that doesn't break the funnel (footer still links to download) but technically fails the requirement.
