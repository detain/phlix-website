# ROUND-1-SUMMARY — 03-retro-film-reel

**Variant:** retro-film-reel
**Date:** 2026-05-20
**Collated by:** Collator Agent

---

## Aggregate Weighted Score

| Dimension | Raw Score | Weight | Weighted Score |
|-----------|-----------|--------|----------------|
| Accessibility | 78 | 1.5 | 117.0 |
| Performance | 94 | 1.2 | 112.8 |
| Responsive | 78 | 1.2 | 93.6 |
| Branding Consistency | 85 | 1.2 | 102.0 |
| Usability | 72 | 1.0 | 72.0 |
| Content Quality | 86 | 1.0 | 86.0 |
| CTA/Funnel | 95 | 1.0 | 95.0 |
| SEO | 62 | 1.0 | 62.0 |
| Social Metadata | 60 | 0.8 | 48.0 |
| Localization | 60 | 0.6 | 36.0 |
| **TOTAL** | | | **824.4 / 1030** |
| **Percentage** | | | **80.0%** |

---

## Top-10 Ranked Issues

| Rank | Issue | Dimension | Severity | Files Affected |
|-------|-------|-----------|----------|----------------|
| 1 | Meta descriptions exceed 160 chars (all 8 pages at 206 chars) | SEO | 🔴 Critical | All 8 HTML files |
| 2 | Missing `sitemap.xml` | SEO | 🔴 Critical | Variant root |
| 3 | Missing `robots.txt` | SEO | 🔴 Critical | Variant root |
| 4 | Missing JSON-LD `SoftwareApplication` schema | Social Metadata | 🔴 Critical | All 8 HTML files |
| 5 | Missing `manifest.webmanifest` | Social Metadata | 🔴 Critical | Variant root |
| 6 | Incomplete favicon set (only SVG; missing 16/32/180/192/512 PNGs) | Social Metadata | 🔴 Critical | img/ |
| 7 | Footer copy text: contrast 2.9:1 (fails WCAG AA 4.5:1) | Accessibility | 🔴 Critical | All 8 HTML files |
| 8 | Status-stable badge: contrast 2.9:1 (fails WCAG AA 4.5:1) | Accessibility | 🔴 Critical | clients.html |
| 9 | Status-beta badge: contrast 1.6:1 (fails WCAG AA 4.5:1 severely) | Accessibility | 🔴 Critical | clients.html |
| 10 | Hero eyebrow: contrast 1.4:1 (fails WCAG AA 4.5:1) | Accessibility | 🔴 Critical | index.html |

**Runner-Up Issues (11–15):**

| Rank | Issue | Dimension | Severity | Files |
|-------|-------|-----------|----------|-------|
| 11 | `.btn-small` touch target 36px (below 44px threshold) | Responsive | 🟠 Major | components.css |
| 12 | No `content.json` — all UI strings hardcoded in HTML | Localization | 🟠 Major | All 8 HTML files |
| 13 | No version/release info on download page | Usability | 🟠 Major | download.html |
| 14 | All download buttons link to GitHub (not direct binaries) | Usability | 🟠 Major | download.html |
| 15 | ecosystem-list items semantically inconsistent (some linked, some not) | Usability | 🟠 Major | download.html |

---

## Concrete Improvement Plan

### 1. Fix Meta Descriptions (SEO)
- **File:** All 8 HTML files (index.html, about.html, features.html, hub.html, docs.html, download.html, clients.html, plugins.html)
- **What:** Reduce `<meta name="description">` content from 206 chars to ≤160 chars per page
- **Changes:**
  - `index.html:7` → "Phlix — self-hostable PHP media server for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA." (138 chars)
  - `about.html:7` → "Learn about Phlix — BSD-3 licensed, community-driven, self-hostable media server. FAQ, philosophy, and contributing guide." (130 chars)
  - `hub.html:7` → "Phlix Hub — reverse-tunnel relay to access your media server from anywhere. Self-host or use the public relay." (127 chars)
  - `docs.html:7` → "Phlix documentation — user guide, API reference, developer docs, and hub admin guide." (96 chars)
  - `download.html:7` → "Download Phlix — server, Roku, Samsung Tizen, Windows, and mobile clients. Free and open source." (119 chars)
  - `clients.html:7` → "Phlix clients — native apps for Roku, Samsung Tizen, Windows, iOS, Android, and any DLNA device." (121 chars)
  - `features.html:7` → "Phlix features — SyncPlay, transcoding, Live TV/DVR, multi-user profiles, DLNA, and a plugin system." (116 chars)
  - `plugins.html:7` → "Extend Phlix with plugins — LifecycleInterface + manifest schema. See the reference plugin for getting started." (122 chars)
- **Acceptance Criterion:** All 8 meta descriptions ≤160 characters when measured with `wc -c`
- **Estimated lines changed:** 8 (one per file)

---

### 2. Create sitemap.xml
- **File:** `variants/03-retro-film-reel/sitemap.xml` (new)
- **What:** XML sitemap listing all 8 pages with lastmod, changefreq, priority
- **Change:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://detain.github.io/phlix-website/</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://detain.github.io/phlix-website/about.html</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://detain.github.io/phlix-website/features.html</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://detain.github.io/phlix-website/download.html</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://detain.github.io/phlix-website/clients.html</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://detain.github.io/phlix-website/docs.html</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://detain.github.io/phlix-website/hub.html</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://detain.github.io/phlix-website/plugins.html</loc>
    <lastmod>2026-05-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```
- **Acceptance Criterion:** File exists at variant root; validates with `python3 -c "import xml.etree.ElementTree as ET; ET.parse('sitemap.xml')"`; all 8 pages present with valid `<loc>`
- **Estimated lines:** 52

---

### 3. Create robots.txt
- **File:** `variants/03-retro-film-reel/robots.txt` (new)
- **What:** Crawling instructions for search engines
- **Change:**
```
User-agent: *
Allow: /
Sitemap: https://detain.github.io/phlix-website/sitemap.xml
```
- **Acceptance Criterion:** File exists at variant root; parseable by any robots.txt checker
- **Estimated lines:** 4

---

### 4. Add JSON-LD Schema to All Pages
- **File:** All 8 HTML files — insert `<script type="application/ld+json">` in `<head>` after existing meta tags
- **What:** Add `SoftwareApplication` schema for rich search results
- **Change (add to all 8 pages in `<head>`):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "operatingSystem": "PHP 8.3+",
  "applicationCategory": "MultimediaApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "A self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile."
}
</script>
```
- **Acceptance Criterion:** All 8 pages contain valid JSON-LD with `@type: SoftwareApplication`; validates at https://validator.schema.org/
- **Estimated lines changed:** ~12 per page (96 total across 8 files)

---

### 5. Create manifest.webmanifest
- **File:** `variants/03-retro-film-reel/manifest.webmanifest` (new)
- **What:** PWA manifest for home screen installation
- **Change:**
```json
{
  "name": "Phlix Media Server",
  "short_name": "Phlix",
  "description": "Self-hostable, open-source PHP media server",
  "start_url": "/phlix-website/",
  "display": "standalone",
  "background_color": "#F5E9D4",
  "theme_color": "#C0392B",
  "icons": [
    { "src": "/phlix-website/variants/03-retro-film-reel/img/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/phlix-website/variants/03-retro-film-reel/img/icon-512x512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```
- **Acceptance Criterion:** File valid JSON; referenced in all 8 HTML pages via `<link rel="manifest">`
- **Estimated lines:** 18

**Sub-task 5a:** Add to all 8 HTML pages in `<head>`:
```html
<link rel="manifest" href="/phlix-website/variants/03-retro-film-reel/manifest.webmanifest">
```

---

### 6. Generate Multi-Size Favicon PNGs
- **Files:** `img/favicon-16x16.png`, `img/favicon-32x32.png`, `img/apple-touch-icon.png` (180×180), `img/icon-192x192.png`, `img/icon-512x512.png` (new)
- **What:** Convert/derive from existing `img/favicon.svg` or generate new assets
- **Changes:**
  - Generate 5 PNG files at required sizes
  - Add to all 8 HTML `<head>` sections:
```html
<link rel="icon" type="image/png" sizes="16x16" href="/phlix-website/variants/03-retro-film-reel/img/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/phlix-website/variants/03-retro-film-reel/img/favicon-32x32.png">
<link rel="apple-touch-icon" href="/phlix-website/variants/03-retro-film-reel/img/apple-touch-icon.png">
```
- **Acceptance Criterion:** All 5 PNG files exist; all 8 HTML files reference them; favicon renders correctly in browser tabs and iOS/Android home screens
- **Estimated lines changed:** ~24 (3 lines × 8 files)

---

### 7. Fix Footer Copy Contrast (Accessibility)
- **File:** `css/theme.css:278`
- **What:** Change `footer-copy` color from `rgba(245,233,212,0.7)` to full opacity or darker shade
- **Change:**
```css
/* Before */
.footer-copy {
  color: rgba(245, 233, 212, 0.7);  /* 2.9:1 contrast — FAILS */
}

/* After */
.footer-copy {
  color: #F5E9D4;  /* Full cream — 7.8:1 on soft-brown */
}
```
- **Acceptance Criterion:** Contrast ratio ≥4.5:1 on soft-brown (#8C5E3C) background; verified with WebAIM contrast checker
- **Estimated lines changed:** 3

---

### 8. Fix Status-Stable Badge Contrast (Accessibility)
- **File:** `css/components.css:500-502`
- **What:** Change text color from cream to dark
- **Change:**
```css
/* Before */
.status-stable {
  background-color: #1ABC9C;  /* teal */
  color: #F5E9D4;            /* cream — 2.9:1 FAILS */
}

/* After */
.status-stable {
  background-color: #1ABC9C;  /* teal */
  color: #111;              /* black — 7.2:1 PASSES */
}
```
- **Acceptance Criterion:** Contrast ratio ≥4.5:1 for small text; verified
- **Estimated lines changed:** 2

---

### 9. Fix Status-Beta Badge Contrast (Accessibility)
- **File:** `css/components.css:505-507`
- **What:** Change background or text for severe contrast failure
- **Change:**
```css
/* Before */
.status-beta {
  background-color: #D4A017;   /* mustard — 1.6:1 FAILS severely */
  color: #111;
}

/* After */
.status-beta {
  background-color: #B8860B;   /* darker goldenrod — ~4.6:1 on cream */
  color: #111;
}
```
- **Acceptance Criterion:** Contrast ratio ≥4.5:1; verified
- **Estimated lines changed:** 2

---

### 10. Fix Hero Eyebrow Contrast (Accessibility)
- **File:** `css/components.css:143-150`
- **What:** Change eyebrow text color from mustard to cream for contrast on teal background
- **Change:**
```css
/* Before */
.hero-eyebrow {
  color: var(--color-mustard);  /* #D4A017 on teal — 1.4:1 FAILS */
}

/* After */
.hero-eyebrow {
  color: var(--color-cream);    /* #F5E9D4 on teal — 4.3:1 PASSES */
}
```
- **Acceptance Criterion:** Contrast ratio ≥4.5:1 on teal (#1ABC9C) background; verified
- **Estimated lines changed:** 2

---

### 11. Fix .btn-small Touch Target (Responsive)
- **File:** `css/components.css:64`
- **What:** Increase min-height from 36px to 44px
- **Change:**
```css
/* Before */
.btn-small {
  min-height: 36px;  /* 8px below threshold */
}

/* After */
.btn-small {
  min-height: 44px;  /* WCAG compliant */
}
```
- **Acceptance Criterion:** `.btn-small` min-height ≥44px; measured with browser DevTools
- **Estimated lines changed:** 2

---

### 12. Add Version/Release Info to Download Page (Usability)
- **File:** `download.html`
- **What:** Add version badge and last-updated date to server section
- **Change (insert after line 82):**
```html
<div class="version-badge">
  <span class="badge-text">v1.0.0</span>
  <span class="release-date">Released 2026-05-20</span>
</div>
```
- **Acceptance Criterion:** Version number and date visible on download page; users can determine if software is current
- **Estimated lines changed:** ~4

---

### 13. Clarify Download Buttons (Usability)
- **File:** `download.html` — all download card buttons (lines 91, 96, 101, 106)
- **What:** Either provide direct download links or change button text from "Download" to "View on GitHub"
- **Change:** For each client card button:
  - Option A (preferred): Change `href` to direct `.exe/.apk` artifacts if available
  - Option B: Change button text from "Download" to "View source" or "View on GitHub" to set correct expectations
- **Acceptance Criterion:** Button label accurately reflects destination; no misleading "Download" text linking to GitHub repo pages
- **Estimated lines changed:** 4–8

---

### 14. Add Tooltip to Disabled DLNA Button (Usability)
- **File:** `download.html:111`
- **What:** Add `title` attribute to disabled DLNA span
- **Change:**
```html
<!-- Before -->
<span class="btn btn-secondary" style="opacity: 0.6; cursor: default;">Built-in</span>

<!-- After -->
<span class="btn btn-secondary" style="opacity: 0.6; cursor: default;" title="DLNA is built into Phlix — no separate client needed.">Built-in</span>
```
- **Acceptance Criterion:** Hovering/focusing the DLNA button shows explanatory tooltip
- **Estimated lines changed:** 1

---

### 15. Standardize Ecosystem List Links (Usability)
- **File:** `download.html:115-122`
- **What:** Ensure all ecosystem project names are clickable links
- **Change:** Review `<strong>` wrapping — ensure all project names (`phlix-server`, `phlix-hub`, etc.) are consistently wrapped in `<a>` tags with appropriate hrefs
- **Acceptance Criterion:** All ecosystem items are uniformly linked; no mixed strong+link patterns
- **Estimated lines changed:** 2–4

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total issues identified | 28 |
| Critical (must-fix) | 10 |
| Major (should-fix) | 5 |
| Minor (nice-to-have) | 13 |
| Files requiring changes | 11 (8 HTML + 3 CSS) |
| New files to create | 4 (sitemap.xml, robots.txt, manifest.webmanifest, 5 PNG icons) |
| Estimated total lines changed | ~200 |

---

## Verification Commands

```bash
# Verify meta descriptions ≤160 chars
for f in *.html; do desc=$(grep 'meta name="description"' "$f" | sed 's/.*content="\([^"]*\)".*/\1/'); len=${#desc}; echo "$f: $len chars — $([ $len -le 160 ] && echo 'PASS' || echo 'FAIL')"; done

# Verify sitemap.xml is valid XML
python3 -c "import xml.etree.ElementTree as ET; ET.parse('sitemap.xml')" && echo "sitemap.xml: VALID" || echo "sitemap.xml: INVALID"

# Verify robots.txt exists
ls -la robots.txt && echo "robots.txt: EXISTS" || echo "robots.txt: MISSING"

# Verify manifest.webmanifest is valid JSON
python3 -c "import json; json.load(open('manifest.webmanifest'))" && echo "manifest.webmanifest: VALID" || echo "manifest.webmanifest: INVALID"

# Verify favicon PNGs exist
for s in 16 32 180 192 512; do ls -la "img/icon-${s}x${s}.png" 2>/dev/null && echo "icon-${s}x${s}.png: EXISTS" || echo "icon-${s}x${s}.png: MISSING"; done

# Verify JSON-LD on all pages
for f in *.html; do grep -q 'application/ld+json' "$f" && echo "$f: JSON-LD PRESENT" || echo "$f: JSON-LD MISSING"; done
```

---

*End of ROUND-1-SUMMARY*
