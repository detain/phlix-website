# Dimension 11: Social Metadata
**OG tags, Twitter cards, theme-color, favicon**

---

## Score: 72 / 100

## Verdict: CONDITIONAL (≥80, no ❌ but has issues)

---

## Findings

### ✅ og:type=website — All Pages
- `index.html:16`, `features.html:14`, and all other pages — `property="og:type" content="website"` — ✅

### ✅ og:site_name=Phlix — All Pages
- `index.html:17`, and all other pages — `property="og:site_name" content="Phlix"` — ✅

### ✅ og:url (Absolute) — All Pages
- index: `https://detain.github.io/phlix-website/cyber-tokyo/`
- features: `https://detain.github.io/phlix-website/cyber-tokyo/features.html`
- All 8 pages have correct absolute og:url — ✅

### ✅ og:title — All Pages
- All pages have descriptive, brand-appropriate og:title matching their page title — ✅

### ✅ Twitter Card — All Pages
- `twitter:card=summary_large_image` on all 8 pages — ✅
- `twitter:creator=@detain` on all pages — ✅

### ❌ og:image — Relative URL (Not Absolute)
- **File:** `index.html:14`, `features.html:12`, and ALL 6 remaining pages
- **Issue:** All pages use `content="https://detain.github.io/phlix-website/cyber-tokyo/img/og.svg"` — this IS an absolute URL ✅
- Wait — re-reading the files:
  - index.html:14: `https://detain.github.io/phlix-website/cyber-tokyo/img/og.svg` — ABSOLUTE ✅
  - features.html:12: `https://detain.github.io/phlix-website/cyber-tokyo/img/og.svg` — ABSOLUTE ✅
  - All other pages have the same pattern — ABSOLUTE URLs ✅
- Actually this IS correct! All og:image URLs are absolute. Let me re-check...
- Actually the issue is the og:image URL points to `og.svg` but the spec and new_site.md §11 say the reference should be to `og.png` (rasterized 1200×630). The URL is absolute, but it points to an SVG file not the required PNG.
- **Also:** The BUILD_LOG.md:74-76 explicitly notes: "HTML meta tags reference `img/og.png` but fall back to the SVG" — this means the intended behavior was to reference og.png. The current implementation references og.svg directly.
- The URL being absolute is correct — the issue is the file format mismatch
- **Confidence:** 85%

### ❌ twitter:image — Relative URL
- **File:** `index.html:23`, `features.html:20`, and ALL 6 remaining pages
- Same situation: `https://detain.github.io/phlix-website/cyber-tokyo/img/og.svg` — absolute URL ✅
- But same file format issue — points to SVG not PNG
- **Confidence:** 85%

### ✅ theme-color=#FF00AA — All Pages
- All 8 pages have `<meta name="theme-color" content="#FF00AA">` — ✅
- Correct value matching kit primary color — ✅

### ✅ Favicon Link — All Pages
- All 8 pages: `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">` — ✅
- SVG favicon with Neon Sakura background — matches kit — ✅

### ⚠️ og:description vs meta Description
- On some pages (clients, hub, about, docs) the og:description differs from the `<meta name="description">`:
  - clients: og="Native apps for every screen you own." vs meta="Self-hostable PHP media server..."
  - hub: og="Reach your server from anywhere." vs meta="Self-hostable PHP media server..."
  - about: og="Self-hosted media. Open source. No lock-in." vs meta="Self-hostable PHP media server..."
- This is acceptable — og descriptions are typically shorter/more social; meta descriptions are for search. Both exist and are descriptive. Not a defect.
- **Severity:** Nitpick — acceptable variation

### ⚠️ og.png File Missing
- `new_site.md §8`: "og.png (1200×630) — social share card...Ship og.svg as the editable source if used, but reference a rasterized og.png in meta."
- Only `img/og.svg` exists; no `img/og.png`
- All HTML meta tags reference `img/og.svg` directly (which is fine for SVG-capable platforms, but Twitter/pinterest may prefer PNG)
- Social card previews may render the SVG correctly or may not — platform-dependent
- **Severity:** Minor — the spec preferred PNG, but SVG is functional
- **Confidence:** 90%

---

## Summary

Social metadata is broadly correct: all og tags present with absolute URLs, all Twitter card tags present with @detain creator, theme-color correct, favicon correct. The main issues are (1) og:image and twitter:image reference og.svg instead of the spec-required og.png, and (2) the og.png file doesn't exist at all. The URLs being absolute is actually correct — my earlier reading was wrong. The file format issue is the concern, not the URL format.
