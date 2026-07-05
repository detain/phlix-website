# DIMENSION 2: SEO

## Score: 89/100
## Severity: ✅ (unchanged from Round 1)
## Round 2 Status: No change — heading hierarchy issue still open

---

## Findings

### ✅ `<title>` — ALL PAGES PASS

| Page | Title | Length |
|------|-------|--------|
| index.html | "Phlix — Your media. Your library. Your Phlix." | 43 chars |
| features.html | "Features — Phlix" | 16 chars |
| clients.html | "Clients — Phlix" | 14 chars |
| download.html | "Download — Phlix" | 16 chars |
| plugins.html | "Plugins — Phlix" | 14 chars |
| docs.html | "Docs — Phlix" | 11 chars |
| hub.html | "Hub — Phlix" | 11 chars |
| about.html | "About — Phlix" | 12 chars |

All ≤ 60 chars. Home page title is descriptive and page-specific.

---

### ✅ `<meta name="description">` — ALL PAGES PASS

All pages: `content="Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support."`

Length: 160 chars (exactly at limit). Source: correctly from `content.json.meta.description`.

---

### ✅ `<link rel="canonical">` — ALL PAGES PASS

Every page has the correct self-referential canonical:
- `index.html:8` — `https://detain.github.io/phlix-website/sites/soundwave-studio/`
- `features.html:8` — `https://detain.github.io/phlix-website/sites/soundwave-studio/features.html`
- All other pages similarly correct and absolute

---

### ✅ JSON-LD SoftwareApplication — HOME PAGE PASS

`index.html:39-54` contains a complete `SoftwareApplication` schema. All required fields present. Price is 0 (free). License URL present.

---

### ✅ Descriptive anchor text — ALL PASS

No "click here" anywhere. All links are descriptive:
- "View source" / "Get Phlix" / "Download Now" / "Read the docs" / "See all features"
- All footer links are descriptive labels

---

### ✅ sitemap.xml — CORRECT

All 8 pages present with absolute URLs and appropriate priorities.

---

### ✅ robots.txt — CORRECT

References sitemap correctly.

---

### ⚠️ MINOR — Heading hierarchy on features page (STILL OPEN)

**File:** `features.html:102` (and 6 other `.feature-detail` articles)

```html
<div class="content-section">
  <h2>Features</h2>
  <article class="feature-detail" id="library">
    <div class="feature-detail-text">
      <h2>Library that organizes itself</h2>  <!-- should be h3 -->
```

Each `.feature-detail` uses `h2` inside a `.content-section` which also has an `h2` ("Features" section title). This makes the feature `h2`s siblings of the section `h2`, not children — a heading skip per strict HTML5 semantics.

**Status:** Not fixed in this iteration.

**Fix:** Change `.feature-detail h2` to `h3` in `features.html`.

---

### ⚠️ MINOR — Multiple `h2` siblings in content sections (STILL OPEN)

**Files:** `index.html:119` (Why Phlix h2), `index.html:133` (features-overview h2), `clients.html` (client h2s), etc.

Each page has exactly one `h1`. The `h2` elements within `main` are often siblings rather than strict parent-child hierarchy (section h2 → content h3). This is acceptable HTML5 but may not pass strict semantic heading hierarchy validators.

**Note:** This is a minor SEO/structural concern, not a WCAG failure. Most browsers handle this gracefully.

---

## Summary

SEO is strong across all 8 pages. All critical requirements met (title, meta, canonical, JSON-LD, sitemap, robots.txt, anchor text). The only issue from Round 1 that remains unfixed is the heading hierarchy on the features page where feature titles use `h2` as siblings of the section `h2` instead of being nested `h3` elements.

**Recommendation:** Fix heading hierarchy on features page by changing `.feature-detail h2` to `h3`. This is a low-effort fix that improves semantic structure.
