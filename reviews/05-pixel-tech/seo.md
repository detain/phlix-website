# SEO Review — variant `05-pixel-tech`

**Reviewed**: 8 HTML pages (index, about, clients, docs, download, features, hub, plugins)
**Date**: 2026-05-20

---

## Summary

Solid structural SEO with proper semantic HTML, canonical URLs, and heading hierarchy. Critical failures: every meta description exceeds 160 chars, missing sitemap.xml and robots.txt, and no JSON-LD structured data. Minor concerns around generic anchor text in footer columns.

**Score: 58 / 100**

---

## Item-by-Item Results

### ✅ Title ≤60 chars

| Page | Title | Length |
|------|-------|--------|
| index.html | Your media. Your library. Your Phlix. | 36 |
| about.html | About — Phlix | 13 |
| clients.html | Clients — Phlix | 14 |
| docs.html | Docs — Phlix | 11 |
| download.html | Download — Phlix | 16 |
| features.html | Features — Phlix | 15 |
| hub.html | Hub — Phlix | 10 |
| plugins.html | Plugins — Phlix | 14 |

All pass. Clear, descriptive, well under the limit.

---

### ❌ Meta description ≤160 chars

| Page | Description | Length |
|------|------------|--------|
| index.html | Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay. | **203** |
| about.html | Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay. | **203** |
| hub.html | Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay. | **203** |
| docs.html | Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay. | **203** |
| plugins.html | Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay. | **203** |
| download.html | Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay. | **203** |
| clients.html | Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay. | **203** |
| features.html | Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay. | **203** |

**All 8 pages fail.** Every meta description is 203 characters — 43 over the limit. More critically, 7 of 8 pages reuse the exact same generic description instead of crafting page-specific summaries. This undermines both SEO and click-through rate in SERPs.

---

### ✅ Single H1 per page

| Page | H1 |
|------|----|
| index.html | Your media. Your library. Your Phlix. |
| about.html | About |
| clients.html | Clients |
| docs.html | Docs |
| download.html | Download |
| features.html | Features |
| hub.html | Phlix Hub |
| plugins.html | Plugins |

All pages have exactly one `<h1>`. No issues.

---

### ✅ Heading hierarchy (logical H1→H2→H3)

All 8 pages use a logical heading cascade:
- index.html: `h1` → `h2` (Why Phlix?, Everything your library needs, Ready to stream?) — clean
- about.html: `h1` → `h2` (Philosophy, License, Contributing, FAQ) — clean
- features.html: `h1` → `h2` (8 feature sections) — clean
- clients.html: `h1` → `h2` (client cards use `h2` inside `article`) — logical
- Other pages follow similar clean patterns

No skipped levels or improper nesting observed.

---

### ✅ Semantic HTML

All 8 pages use proper HTML5 elements throughout:
- `<header role="banner">` with `<nav role="navigation">`
- `<main id="main-content">` with `tabindex="-1"` for skip-link target
- `<section aria-labelledby>` with associated `id`
- `<article>` for cards and feature details
- `<footer role="contentinfo">` with `<nav aria-label="Footer navigation">`
- `<dl>` + `<dt>`/`<dd>` for FAQ in about.html
- Skip link (`<a class="skip-link">`) present on all pages
- ARIA labels on nav, buttons, and icon-only elements

Strong pass across all pages.

---

### ✅ Canonical URL

All 8 pages include a canonical URL pointing to the `detain.github.io/phlix-website/` domain:

```html
<link rel="canonical" href="https://detain.github.io/phlix-website/">
<link rel="canonical" href="https://detain.github.io/phlix-website/about.html">
<link rel="canonical" href="https://detain.github.io/phlix-website/clients.html">
... (all 8 pages)
```

Consistent and correct.

---

### ❌ sitemap.xml

**Missing.** No `sitemap.xml` found in `variants/05-pixel-tech/`. This is a significant SEO gap — search engines rely on sitemaps to discover all site pages, especially for static HTML sites without automated crawling signals.

---

### ❌ robots.txt

**Missing.** No `robots.txt` found in `variants/05-pixel-tech/`. While not required for SEO, robots.txt is standard practice for guiding crawlers, blocking low-value paths, and pointing to sitemap location.

---

### ⚠️ Descriptive anchor text

**Generally good, minor concerns.**

Most anchor text is contextually descriptive:
- Navigation links: "Features", "Clients", "Download", "Plugins", "Docs", "Hub", "About" ✅
- CTA links: "Get Phlix", "Read the docs", "Download Phlix", "See all features →" ✅
- External links: Full GitHub repository names ✅

**Minor concern** — generic footer column headings use non-descriptive anchor labels:
- `about.html:212` — `<a href="https://github.com/detain">GitHub org</a>` (weak anchor for a username)
- `about.html:213` — `<a href="https://github.com/detain/phlix-server/issues">Issues</a>` (generic word without context)

These are non-blocking but represent missed keyword opportunities and reduce accessibility for screen readers navigating by link text.

---

### ❌ JSON-LD validates

**No structured data found on any page.** None of the 8 pages include JSON-LD schema markup. For a software project website, relevant schemas would include:
- `SoftwareApplication` / `SoftwareSourceCode`
- `Organization`
- `BreadcrumbList` (for navigation context)

This is a moderate SEO gap. Structured data doesn't directly affect rankings but improves SERP appearance (rich snippets) and helps crawlers understand page content.

---

## Score Breakdown

| Criterion | Weight | Score |
|-----------|--------|-------|
| Title ≤60 | 10% | 10 |
| Meta ≤160 | 15% | 0 |
| Single H1 | 10% | 10 |
| Heading hierarchy | 10% | 10 |
| Semantic HTML | 15% | 15 |
| Canonical URL | 10% | 10 |
| sitemap.xml | 10% | 0 |
| robots.txt | 5% | 0 |
| Anchor text | 5% | 4 |
| JSON-LD | 10% | 0 |
| **Total** | 100% | **58** |

---

## Recommendations (ranked by impact)

### 1. Fix meta descriptions (Critical — immediate)
**Impact: High** — Currently 0/8 pages pass. Every page has a 43-char overage.

- Trim to ≤160 chars per page
- Make each description page-specific (not identical copy-paste across 7 pages)
- Suggested trim for index.html (keep keyword-rich front):
  > "Phlix: self-hostable open-source PHP media server. Roku, Samsung Tizen, Windows, Mobile clients. SyncPlay, Live TV, transcoding, DLNA."
  (163 chars — still slightly over; refine to 156)
- Per-page examples:
  - **about.html**: "About Phlix — BSD-3 licensed, community-driven open-source media server. Self-host your library, no lock-in."
  - **hub.html**: "Phlix Hub: reverse-tunnel relay lets you access your home server from anywhere. Self-host or use the public relay."
  - **docs.html**: "Phlix documentation: user guide, API reference, developer docs, and hub admin guide."

### 2. Add sitemap.xml (Critical — immediate)
**Impact: High** — Search engines cannot auto-discover all variant pages.

Create `variants/05-pixel-tech/sitemap.xml` listing all 8 HTML pages with `<lastmod>`, `<priority>`, and `<changefreq>`.

### 3. Add robots.txt (Moderate — next sprint)
**Impact: Medium** — Standard practice; guides crawlers to sitemap.

Create `variants/05-pixel-tech/robots.txt` with:
```
User-agent: *
Allow: /
Sitemap: https://detain.github.io/phlix-website/sitemap.xml
```

### 4. Add JSON-LD structured data (Moderate — next sprint)
**Impact: Medium** — Rich snippets improve CTR; helps crawlers parse content.

Add `SoftwareSourceCode` schema to relevant pages, `Organization` to homepage, and `BreadcrumbList` for page hierarchy context.

### 5. Improve footer anchor text (Low — when editing)
**Impact: Low** — Minor accessibility and SEO gains.

Replace "GitHub org" with "Phlix on GitHub" and "Issues" with "Issue tracker" or "Report issues".

---

## Evidence

### Meta description lengths (all fail 160-char limit)

| File:Line | Current text (203 chars) |
|-----------|--------------------------|
| index.html:7 | `Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay.` |
| about.html:7 | Same |
| hub.html:7 | Same |
| docs.html:7 | Same |
| plugins.html:7 | Same |
| download.html:7 | Same |
| clients.html:7 | Same |
| features.html:7 | Same |

### Missing files

```
variants/05-pixel-tech/sitemap.xml     — NOT FOUND
variants/05-pixel-tech/robots.txt      — NOT FOUND
```

### JSON-LD

None found across any of the 8 HTML files. No `<script type="application/ld+json">` elements present.

---

## Files Reviewed

- `variants/05-pixel-tech/index.html`
- `variants/05-pixel-tech/about.html`
- `variants/05-pixel-tech/clients.html`
- `variants/05-pixel-tech/docs.html`
- `variants/05-pixel-tech/download.html`
- `variants/05-pixel-tech/features.html`
- `variants/05-pixel-tech/hub.html`
- `variants/05-pixel-tech/plugins.html`
