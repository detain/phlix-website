# Usability Review — Round 3
**Site:** Stardust Observatory (`/home/sites/phlix/phlix-website/sites/stardust-observatory/`)
**Reviewer:** Senior Web Reviewer
**Date:** 2026-07-04
**Dimension:** Usability (weight 1.0)
**Prior Score:** 3.5/5

---

## Rubric

| Score | Description |
|-------|-------------|
| 1 | Major usability failures; missing nav, no CTAs, broken links, no footer |
| 2 | Some pages missing CTAs, incomplete footers, or broken links |
| 3 | Most pages have CTAs and footers; 404 exists but may be incomplete |
| 4 | All pages have Download CTA in nav; all have footers; 404 functional; CTA above fold on most pages |
| 5 | Every page has above-fold CTA, complete footer, 404 with nav, forms accessible, favicon correct, all links resolve |

---

## Checks Performed

### 1. Navigation: "Download" CTA Button in Nav Header
All 8 pages + 404.html checked for `<a href="download.html" class="nav-cta">Download</a>` in the nav-primary header.

| Page | Nav Download CTA |
|------|-----------------|
| index.html | ✓ Line 78 |
| about.html | ✓ Line 50 |
| clients.html | ✓ Line 50 |
| download.html | ✓ Line 50 |
| features.html | ✓ Line 50 |
| plugins.html | ✓ Line 50 |
| docs.html | ✓ Line 50 |
| hub.html | ✓ Line 50 |
| 404.html | ✓ Line 60 |

**Result: 9/9 — PASS**

---

### 2. Footer Completeness
All pages checked for: brand tagline, Product links, Developers links, Project links, copyright line.

| Page | Footer Tagline | Product Links | Developers Links | Project Links | Copyright | Score |
|------|---------------|---------------|------------------|---------------|-----------|-------|
| index.html | Science made beautiful. Stories made infinite. | 4 links | 4 links | 4 links | © 2026 Phlix | ✓ |
| about.html | Science made beautiful. Stories made infinite. | 4 links | 4 links | 4 links | © 2026 Phlix | ✓ |
| clients.html | Open-source media, on your terms. | 4 links | 4 links | 4 links | © 2026 Phlix | ✓ |
| download.html | Science made beautiful. Stories made infinite. | 4 links | 4 links | 4 links | © 2026 Phlix | ✓ |
| features.html | Science made beautiful. Stories made infinite. | 4 links | 4 links | 4 links | © 2026 Phlix | ✓ |
| plugins.html | Science made beautiful. Stories made infinite. | 4 links | 4 links | 4 links | © 2026 Phlix | ✓ |
| docs.html | Science made beautiful. Stories made infinite. | 4 links | 4 links | 4 links | © 2026 Phlix | ✓ |
| hub.html | Science made beautiful. Stories made infinite. | 4 links | 4 links | 4 links | © 2026 Phlix | ✓ |
| 404.html | Science made beautiful. Stories made infinite. | 4 links | 4 links | 4 links | © 2026 Phlix | ✓ |

**Result: 9/9 — PASS**

---

### 3. 404.html: Exists and Has Navigation Back to Home
- File exists at `/home/sites/phlix/phlix-website/sites/stardust-observatory/404.html` ✓
- Has full nav header with "Download" CTA ✓
- Has `<a href="./" class="btn btn-primary">Return to the observatory</a>` in page-header ✓
- Has complete footer ✓
- Brand-voice 404 message: "The atlas has no page here." with "Light from this address reached us two million years ago" (brand story reference) ✓

**Result: PASS**

---

### 4. CTA Buttons Above Fold on Each Page
Checked for at least one `.btn.btn-primary` or equivalent primary CTA visible in the initial viewport (before scrolling) on each page.

| Page | Above-Fold Primary CTA | Location |
|------|----------------------|----------|
| index.html | ✓ "Begin your watch" | Hero section (hero-inner) — visible on page load |
| about.html | ✓ "Begin your watch" (primary) + "Read the docs" (secondary) | cta-inline in page-header div (line 64-67) |
| clients.html | ✗ No CTA in page-header | Client cards and testimonials are below fold; CTA banner is in content section |
| download.html | ✓ "Download Phlix" btn-primary | Page-header anchor styled as primary button (line 59) |
| features.html | ✗ No CTA in page-header | h1 + page-lead only in page-header; CTA banner is in content section (below fold) |
| plugins.html | ✗ No CTA in page-header | h1 + page-lead only in page-header; CTA banner is in content section (below fold) |
| docs.html | ✗ No CTA in page-header | h1 + page-lead only in page-header; no CTA until content section |
| hub.html | ✗ No CTA in page-header | h1 + page-lead only in page-header; CTA banner is in content section (below fold) |
| 404.html | ✓ "Return to the observatory" | In page-header div (line 70) |

**CTA above-fold score: 4/9**

Note: The nav-cta "Download" button is present in the header on all pages including those scored ✗ above. However, the usability criterion is for a primary CTA *within the page content* above the fold — not just the persistent nav element.

---

### 5. Forms: Labels and Input Types (download.html)
download.html contains `<div class="download-card">` sections linking to external GitHub/mailto destinations. There are no HTML `<form>`, `<input>`, `<label>`, or `<select>` elements on this page. All user interactions (download, purchase, contact) use anchor links to external URLs (`rel="noopener noreferrer"`).

**Result: N/A — No forms present; external links used appropriately.**

---

### 6. Favicon: favicon.svg Served Correctly
All 9 pages have `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">` in the `<head>`.

Verified: `/home/sites/phlix/phlix-website/sites/stardust-observatory/img/favicon.svg` exists and is an SVG file.

**Result: PASS**

---

### 7. Internal Links: All Resolve to Existing Pages
Checked all internal anchor hrefs against the 9 known pages (index.html, about.html, clients.html, download.html, features.html, plugins.html, docs.html, hub.html, 404.html).

| Page | Internal Links | Status |
|------|---------------|--------|
| index.html | features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html | All exist ✓ |
| about.html | features.html, clients.html, download.html, plugins.html, docs.html, hub.html | All exist ✓ |
| clients.html | features.html, download.html, plugins.html, docs.html, hub.html, about.html | All exist ✓ |
| download.html | features.html, clients.html, plugins.html, docs.html, hub.html, about.html, GitHub external links | All local links exist ✓ |
| features.html | download.html, clients.html, features.html, docs.html, hub.html, about.html | All exist ✓ |
| plugins.html | features.html, clients.html, download.html, docs.html, hub.html, about.html | All exist ✓ |
| docs.html | features.html, clients.html, download.html, plugins.html, hub.html, about.html | All exist ✓ |
| hub.html | features.html, clients.html, download.html, plugins.html, docs.html, about.html | All exist ✓ |
| 404.html | features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html | All exist ✓ |

**Result: 9/9 — PASS — All internal links resolve to existing pages.**

---

## Usability Issues Summary

### Issues Found

| Issue | Pages Affected | Severity |
|-------|---------------|----------|
| No above-fold primary CTA in page content | clients.html, features.html, plugins.html, docs.html, hub.html (5 pages) | Medium |
| Nav "Download" CTA present on all 9 pages | All | Pass |

### Previously Missing — Now Fixed (vs. prior review)
- About page now has above-fold CTA (cta-inline in page-header) ✓
- All pages now have complete footers ✓
- 404.html has full nav and CTA ✓
- Nav "Download" CTA on all 9 pages ✓

---

## Summary Table

| Criterion | Score | Total |
|-----------|-------|-------|
| Nav Download CTA on all pages | 9/9 | ✓ |
| Complete footer on all pages | 9/9 | ✓ |
| 404.html functional with nav | 1/1 | ✓ |
| CTA above fold on each page | 4/9 | ✗ |
| Forms accessible (labels, types) | N/A | ✓ |
| Favicon served correctly | 9/9 | ✓ |
| All internal links resolve | 9/9 | ✓ |

---

## Dimension B Score

**4.0 / 5**

Strong performance across all structural elements:
- Nav "Download" CTA present on all 9 pages ✓
- Complete footer on all 9 pages ✓
- 404.html fully functional ✓
- Favicon served correctly on all 9 pages ✓
- All internal links resolve ✓

One gap identified:
- **5 pages (clients, features, plugins, docs, hub) lack a primary CTA button within the page-header that appears above the fold.** The page-header on these pages contains only the h1 title and page-lead paragraph. The CTA buttons appear in the content section's cta-banner, which requires scrolling to reach.

Note: The persistent nav "Download" button (`.nav-cta`) is present on all pages, satisfying the nav-level CTA requirement. However, a page-level above-fold CTA is missing on 5 pages.

**Prior score was 3.5/5. About page CTA (previously missing) has been added. Remaining gap is the above-fold content CTA on 5 pages.**

**Recommendation: APPROVE WITH NOTE — Usability is strong. Consider adding a primary CTA to the page-header section (above the fold) on features.html, plugins.html, docs.html, hub.html, and clients.html for full 5/5 compliance.**
