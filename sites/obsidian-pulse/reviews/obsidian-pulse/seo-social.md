# Obsidian Pulse — SEO & Social Metadata Review

**Review date:** 2026-07-01
**Reviewer:** Adversarial SEO & Social Metadata Auditor
**Pages reviewed:** 8 (index, features, clients, download, plugins, docs, hub, about)
**Ground truth:** `brand-kits/obsidian-pulse.js`, `new_site.md §10/§11`, `shared/content.json`

---

## Score: 65 / 100

| Dimension | Score | Notes |
|-----------|-------|-------|
| SEO tags (<title>, meta desc, canonical) | 17/20 | Minor: page-specific titles could be punchier |
| Heading structure (h1, hierarchy, no skips) | 7/10 | features.html CTA h2 follows article h2s ambiguously |
| Semantic landmarks | 8/8 | banner/navigation/main/contentinfo — one each, all present |
| Descriptive anchor text | 8/8 | No "click here" / "read more" found |
| JSON-LD (home only) | 8/8 | Present on index, correct fields |
| sitemap.xml | 8/8 | 8 pages, all absolute canonical URLs, valid XML |
| robots.txt | 5/5 | References sitemap correctly |
| Social metadata (og tags) | 4/8 | Missing absolute URL (relative path); wrong format (SVG not PNG) |
| Twitter card | 8/8 | All 5 required fields present on every page |
| theme-color | 8/8 | Correctly set to #00B4FF on all pages |
| Favicon | 8/8 | Present, SVG, on all pages |
| Font loading (CDN ban) | 0/8 | **All 8 pages load Google Fonts from CDN** |

**❌ Critical: 3** | **⚠️ Warnings: 2** | **✅ Passes: many**

---

## ❌ CRITICAL — Fix before ship

### 1. Google Fonts CDN on all 8 pages (spec §1 ban)

**Severity:** CRITICAL — spec explicitly forbids CDN font links
**Pages:** `index.html:33-35`, `features.html:33-35`, `clients.html:33-35`, `download.html:33-35`, `plugins.html:33-35`, `docs.html:33-35`, `hub.html:33-35`, `about.html:33-35`

Every page contains:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Space+Grotesk:wght@300;400;500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

`new_site.md §1` is unambiguous:
> "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`, no script CDNs). **Self-host fonts** as WOFF2 and declare them with `@font-face` + `font-display: swap`."

`base.css` already declares `@font-face` with `font-display: swap` for all 5 font families — the infrastructure is in place. The HTML just needs the 3 Google Fonts `<link>` lines removed. The CSS custom properties (`--font-headline`, `--font-body`, etc.) and the existing `@font-face` blocks will take over.

**Suggested fix (diff, per page):**
```diff
-  <link rel="preconnect" href="https://fonts.googleapis.com">
-  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
-  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Space+Grotesk:wght@300;400;500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

### 2. `og:image` is SVG, not PNG at 1200×630

**Severity:** CRITICAL — platform support + spec violation
**Pages:** All 8 (`index.html:14`, `features.html:14`, `clients.html:14`, `download.html:14`, `plugins.html:14`, `docs.html:14`, `hub.html:14`, `about.html:14`)

Every page points to `og:image` as:
```
https://detain.github.io/phlix-website/sites/obsidian-pulse/img/og.svg
```

Two distinct problems:

**A. Format:** `new_site.md §8` requires "**`og.png` (1200×630)** — social share card: brand background, logo/wordmark, `hero.headline` or `tagline_primary`. Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** in meta."

The editable SVG source is fine; the `<meta property="og:image">` must reference `og.png`, not `og.svg`. Facebook/Meta's crawler specifically requires a rasterized JPEG/PNG. Twitter also has limited SVG support. The SVG at `img/og.svg` does have the correct `viewBox="0 0 1200 630"` but this does not make it a compliant OG image.

**B. Path is absolute but format is wrong:** Path is correctly absolute (`https://.../og.svg`), which is better than the common relative-path bug. The fix is to rename the reference to `og.png`.

**Suggested fix (diff, per page):**
```diff
-  <meta property="og:image" content="https://detain.github.io/phlix-website/sites/obsidian-pulse/img/og.svg">
+  <meta property="og:image" content="https://detain.github.io/phlix-website/sites/obsidian-pulse/img/og.png">
```

And produce `img/og.png` — a rasterized 1200×630 export of the SVG at 2× pixel density for sharp rendering on retina displays. Keep `og.svg` as the editable source.

---

### 3. features.html:181 — ambiguous heading hierarchy

**Severity:** CRITICAL — broken heading hierarchy
**File:** `features.html:181`

The page structure around the CTA banner:

```
index:68  <main id="main-content">
index:70  <div class="page-header"> → h1 "Features"      ← ONE h1
index:78  <div class="content-section">
index:79  <div class="content-grid">
index:80  <article class="feature-detail" id="library"> → h2 "Library that organizes itself"
index:92  <article class="feature-detail" id="syncplay"> → h2 "SyncPlay..."
...7 more article h2s...
index:175 </div><!-- content-grid -->
index:176 </div><!-- content-section -->
index:178 <!-- CTA banner -->
index:179 <section class="cta-banner">
index:181 <h2>Get started in minutes</h2>             ← h2 after h2s
```

The CTA banner's `<h2>Get started in minutes</h2>` at line 181 follows 8 consecutive `<article class="feature-detail">` elements each containing an `<h2>`. There is no wrapping section or divider heading to separate the feature articles from the CTA. A screen reader user navigating by heading will encounter: h1 "Features" → h2 "Library..." → h2 "SyncPlay..." → ... → h2 "Get started in minutes". The CTA h2 reads as a sibling to the feature h2s rather than a distinct closing section.

**Suggested fix — add a section boundary heading or wrap in a section with `aria-labelledby`:**

Option A (preferred — `features.html:179`):
```diff
-    <section class="cta-banner">
+    <section class="cta-banner" aria-labelledby="cta-banner-heading">
       <div class="cta-banner-inner">
-        <h2>Get started in minutes</h2>
+        <h2 id="cta-banner-heading">Get started in minutes</h2>
```

Option B — change the CTA h2 to h3 to make it a clear sub-element of the `.cta-banner` section:
```diff
-        <h2>Get started in minutes</h2>
+        <h3>Get started in minutes</h3>
```
(And update CSS selectors accordingly if using `.cta-banner h3` for styling.)

---

## ⚠️ WARNINGS — Address when possible

### 4. download.html:81 — external link without `rel="noopener noreferrer"`

**File:** `download.html:81`

```html
<p>Requires PHP 8.3+ and <a href="https://github.com/detain/phlix-server">phlix-server</a>.</p>
```

The `new_site.md §1` rule for external links is: "External links use absolute `https://` URLs and `rel="noopener noreferrer"`." This link is missing the `rel` attribute. All other external links on the site (footer columns, CTA buttons, ecosystem list items) correctly carry `rel="noopener noreferrer"`.

**Suggested fix:**
```diff
-  <p>Requires PHP 8.3+ and <a href="https://github.com/detain/phlix-server">phlix-server</a>.</p>
+  <p>Requires PHP 8.3+ and <a href="https://github.com/detain/phlix-server" rel="noopener noreferrer">phlix-server</a>.</p>
```

---

### 5. features.html:179 — CTA banner missing `aria-labelledby`

**File:** `features.html:179`

```html
<section class="cta-banner">
```

On `index.html:199`, the same element correctly carries `aria-labelledby="cta-banner-heading"`. The features page CTA omits it. Not critical for WCAG 2.2 AA compliance (the heading is programmatically associated as a label), but it is an inconsistency that reduces the robustness of assistive-technology navigation between pages.

**Suggested fix (included in the critical fix #3 above):**
```diff
-  <section class="cta-banner">
+  <section class="cta-banner" aria-labelledby="cta-banner-heading">
```

---

## ✅ PASSES — No action required

### Per-page checks (all 8 pages)

| Check | index | features | clients | download | plugins | docs | hub | about |
|-------|-------|----------|--------|---------|---------|------|-----|-------|
| `<title>` ≤ 60 chars | ✅ 23 | ✅ 15 | ✅ 14 | ✅ 16 | ✅ 14 | ✅ 11 | ✅ 10 | ✅ 13 |
| `<meta name="description">` ≤ 160 chars | ✅ 131 | ✅ 131 | ✅ 131 | ✅ 131 | ✅ 131 | ✅ 131 | ✅ 131 | ✅ 131 |
| Exactly one `<h1>` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Canonical absolute URL | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `role="banner"` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `role="navigation"` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `role="main"` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `role="contentinfo"` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Descriptive anchor text | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `og:type=website` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `og:site_name=Phlix` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `og:url` absolute | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `og:title` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `og:description` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `twitter:card=summary_large_image` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `twitter:title` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `twitter:description` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `twitter:image` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `twitter:creator=@detain` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `meta name="theme-color"=#00B4FF` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `<link rel="icon" type="image/svg+xml">` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Title character counts (all well within 60):**
- `index.html` — "Signal. Refined. — Phlix" (23 chars)
- `features.html` — "Features — Phlix" (15 chars)
- `clients.html` — "Clients — Phlix" (14 chars)
- `download.html` — "Download — Phlix" (16 chars)
- `plugins.html` — "Plugins — Phlix" (14 chars)
- `docs.html` — "Docs — Phlix" (11 chars)
- `hub.html` — "Hub — Phlix" (10 chars)
- `about.html` — "About — Phlix" (13 chars)

---

### JSON-LD (index.html:43-58) ✅

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "description": "Self-hostable PHP media server that streams to Roku, Samsung TV, Windows, mobile, and any DLNA device.",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "PHP 8.3+",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "license": "https://opensource.org/licenses/BSD-3-Clause"
}
```

All required spec §10 fields present. `price: "0"` and `priceCurrency` included. License points to BSD-3-Clause URL.

---

### sitemap.xml ✅

`/home/sites/phlix/phlix-website/sites/obsidian-pulse/sitemap.xml`

- All 8 pages present with absolute canonical `<loc>` URLs
- Valid XML 1.0
- `index.html` priority 1.0; `about.html` priority 0.6 (lowest)
- `about.html` changefreq monthly; rest weekly
- No duplicates, no stale URLs

---

### robots.txt ✅

`/home/sites/phlix/phlix-website/sites/obsidian-pulse/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://detain.github.io/phlix-website/sites/obsidian-pulse/sitemap.xml
```

Correct. Sitemap URL is absolute.

---

## Summary table

| # | Severity | Finding | File(s) |
|---|----------|---------|---------|
| 1 | ❌ CRITICAL | Google Fonts CDN — 3 `<link>` tags per page, all 8 pages | `index.html:33-35`, `features.html:33-35`, `clients.html:33-35`, `download.html:33-35`, `plugins.html:33-35`, `docs.html:33-35`, `hub.html:33-35`, `about.html:33-35` |
| 2 | ❌ CRITICAL | `og:image` is SVG, not PNG at 1200×630 | All 8 pages, `index.html:14` et al. |
| 3 | ❌ CRITICAL | features.html CTA h2 follows article h2s without section boundary | `features.html:181` |
| 4 | ⚠️ WARNING | External link without `rel="noopener noreferrer"` | `download.html:81` |
| 5 | ⚠️ WARNING | features.html CTA banner missing `aria-labelledby` | `features.html:179` |

**Total: 3 ❌ critical · 2 ⚠️ warnings**

**Score: 65/100** — The site is structurally sound on most dimensions but has 3 critical spec violations that block quality-gate sign-off, all of which have simple, well-understood fixes.

---

*Review produced by adversarial SEO & social metadata auditor. All findings cite file:line. Suggested diffs are advisory — no code was modified.*
