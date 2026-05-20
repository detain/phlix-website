# SEO Review — `03-retro-film-reel`

**Variant:** 03-retro-film-reel
**Reviewer:** Dimension Reviewer (SEO)
**Date:** 2026-05-20
**Pages Reviewed:** 8 (index, about, hub, docs, plugins, download, clients, features)

---

## Score: 62 / 100

---

## ✅ Passed Items

| Criterion | Evidence |
|---|---|
| **Title ≤60 chars** | All 8 pages have titles within limit. Shortest: "About — Phlix" (13 chars). Longest: index "Phlix — Your media. Your library. Your Phlix." (48 chars). |
| **Single H1** | Every page has exactly one `<h1>`. Index uses the hero phrase, all others use a page-specific heading. |
| **Heading hierarchy** | All pages follow logical H1→H2→H3 structure. No skipped levels. Feature pages use `<article>` wrappers with proper nested headings. |
| **Semantic HTML** | Consistent use of `<header role="banner">`, `<main>`, `<footer role="contentinfo">`, `<nav role="navigation">`, `<section aria-labelledby>`, `<article>`. Skip link present. ARIA labels on nav, buttons, and landmark roles throughout. |
| **Canonical URL** | All 8 pages carry `<link rel="canonical" href="https://detain.github.io/phlix-website/{page}.html">` — correct, absolute, HTTPS. |
| **Descriptive anchor text (most)** | Internal nav links are clear ("Features", "Clients", "Download"). CTA anchors like "Get Phlix", "Read the docs", "See all features →" are descriptive. Footer links to GitHub org and docs are properly labeled. |
| **Open Graph + Twitter Card** | All pages have `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`. Twitter Card with `summary_large_image` present on all pages. |

---

## ⚠️ Concerns (Non-blocking)

| Issue | Location | Evidence |
|---|---|---|
| **Same meta description on every page** | All 8 HTML files, line 7 | `about.html`, `hub.html`, `docs.html`, `plugins.html`, `download.html`, `clients.html`, `features.html` all repeat the homepage description verbatim. Search engines may penalize duplicate descriptions or fail to surface page-specific snippets. |
| **Relative OG image path** | All 8 files, line 13 | `content="/variants/03-retro-film-reel/img/og.svg"` — relative path works when shared, but some scrapers prefer absolute OG image URLs. |
| **Generic anchor text on some external links** | `clients.html:92`, `download.html:91,96,101,106`, `plugins.html:96` | "View source" appears on 4 client cards and the plugin example button. Not catastrophic, but "View phlix-roku-client source" would be more descriptive. |

---

## ❌ Failures (Must Fix)

| Issue | Evidence |
|---|---|
| **Meta description >160 chars (all pages)** | All 8 pages carry the same description: "Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay." — **206 characters**, exceeds the 160-char limit by 46. |
| **Missing `robots.txt`** | No `robots.txt` found at variant root or site root within this variant directory. Search engines have no explicit crawling instructions. |
| **Missing `sitemap.xml`** | No `sitemap.xml` found. All 8 pages are effectively undiscoverable via XML sitemap. |

---

## Recommendations (Ranked by Impact)

1. **🔴 Rewrite meta descriptions per page** (HIGHEST PRIORITY)
   - Reduce each to ≤160 characters
   - Make each page-specific. Examples:
     - `about.html` → "Learn about Phlix — BSD-3 licensed, community-driven, self-hostable media server. FAQ, philosophy, and contributing guide."
     - `hub.html` → "Phlix Hub — reverse-tunnel relay to access your media server from anywhere. Self-host or use the public hub relay."
     - `docs.html` → "Phlix documentation — user guide, API reference, developer docs, and hub admin guide."
     - `download.html` → "Download Phlix — server, Roku, Samsung Tizen, Windows, and mobile clients. Free and open source."
     - `clients.html` → "Phlix clients — native apps for Roku, Samsung Tizen, Windows, iOS, Android, and any DLNA device."
     - `features.html` → "Phlix features — SyncPlay, transcoding, Live TV/DVR, multi-user profiles, DLNA, and a plugin system."
     - `plugins.html` → "Extend Phlix with plugins — LifecycleInterface + manifest schema. See the reference plugin for getting started."
     - `index.html` → Keep as-is or trim to ≤160: "Phlix — self-hostable PHP media server for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA."

2. **🔴 Add `sitemap.xml`** (HIGH PRIORITY)
   - Create at variant root listing all 8 pages with `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`
   - Include all variant pages plus any root-level files
   - Example structure for each page:
     ```xml
     <url>
       <loc>https://detain.github.io/phlix-website/</loc>
       <lastmod>2026-05-20</lastmod>
       <changefreq>weekly</changefreq>
       <priority>1.0</priority>
     </url>
     ```

3. **🔴 Add `robots.txt`** (HIGH PRIORITY)
   - Place at variant root:
     ```
     User-agent: *
     Allow: /
     Sitemap: https://detain.github.io/phlix-website/sitemap.xml
     ```
   - If variant is served at a subdirectory and should not be indexed independently, add:
     ```
     Disallow: /variants/03-retro-film-reel/
     ```

4. **🟠 Add JSON-LD structured data** (MEDIUM PRIORITY)
   - Add a `SoftwareApplication` or `WebSite` schema to `index.html`:
     ```json
     {
       "@context": "https://schema.org",
       "@type": "SoftwareApplication",
       "name": "Phlix",
       "description": "Self-hostable open-source PHP media server",
       "applicationCategory": "MultimediaApplication",
       "operatingSystem": "PHP 8.3+",
       "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
     }
     ```
   - Consider `Organization` schema on about page

5. **🟠 Use absolute OG image URLs** (MEDIUM PRIORITY)
   - Change `content="/variants/03-retro-film-reel/img/og.svg"` to `content="https://detain.github.io/phlix-website/variants/03-retro-film-reel/img/og.svg"` on all pages

6. **🟡 Improve anchor text "View source"** (LOW PRIORITY)
   - Change to "View phlix-roku-client source", "View phlix-windows-client source" etc. to be fully descriptive

---

## Evidence Summary

| Page | Title (chars) | Meta Desc (chars) | Canonical | H1 Count |
|---|---|---|---|---|
| `index.html` | 48 ✅ | 206 ❌ | ✅ | 1 ✅ |
| `about.html` | 13 ✅ | 206 ❌ | ✅ | 1 ✅ |
| `hub.html` | 12 ✅ | 206 ❌ | ✅ | 1 ✅ |
| `docs.html` | 12 ✅ | 206 ❌ | ✅ | 1 ✅ |
| `plugins.html` | 15 ✅ | 206 ❌ | ✅ | 1 ✅ |
| `download.html` | 16 ✅ | 206 ❌ | ✅ | 1 ✅ |
| `clients.html` | 15 ✅ | 206 ❌ | ✅ | 1 ✅ |
| `features.html` | 16 ✅ | 206 ❌ | ✅ | 1 ✅ |

| File | Present? |
|---|---|
| `robots.txt` | ❌ Not found |
| `sitemap.xml` | ❌ Not found |
| JSON-LD | ❌ Not found |

---

**Conclusion:** The variant demonstrates solid foundational SEO — proper canonical URLs, semantic HTML, correct title lengths, and single-H1-per-page discipline. The three critical failures (over-length meta descriptions on every page, missing sitemap.xml, and missing robots.txt) drag the score significantly. Resolving those three items would bring the score well above 85.
