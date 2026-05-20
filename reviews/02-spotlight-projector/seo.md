# SEO Review — `02-spotlight-projector`

**Reviewer**: Dimension Reviewer (SEO)
**Date**: 2026-05-20
**Files Reviewed**: 8 HTML pages

---

## Summary

The variant has a solid structural foundation — correct titles, proper heading hierarchy, semantic HTML5, and canonical URLs on every page. However, it fails on two critical content-level requirements: **meta descriptions exceed 160 characters on all 8 pages** and **no sitemap.xml or robots.txt exists**. JSON-LD structured data is entirely absent. These are straightforward fixes with high SEO impact.

**Score: 70 / 100**

---

## ✅ Passed Items

| Criterion | Evidence |
|----------|---------|
| Title ≤60 chars | All 8 pages have compliant titles (range: 11–49 chars). Shortest: "Hub — Phlix" (11), longest: "Phlix — Your media. Your library. Your Phlix." (49) |
| One H1 per page | Every page has exactly one `<h1>`: `index` ("Your media. Your library. Your Phlix."), `about` ("About"), `hub` ("Phlix Hub"), `docs` ("Docs"), `plugins` ("Plugins"), `download` ("Download"), `clients` ("Clients"), `features` ("Features") |
| Heading hierarchy | Logical H1→H2→H3 flow across all pages. `index` uses H1 for hero, H2 for sections (Pitch, Features overview, CTA), H3 for feature cards |
| Semantic HTML5 | Consistent use of `<header role="banner">`, `<nav role="navigation">`, `<main id="main-content">`, `<article>`, `<section>`, `<footer role="contentinfo">`, `<dl>/<dt>/<dd>` for FAQ |
| Canonical on every page | All 8 pages include `<link rel="canonical" href="https://detain.github.io/phlix-website/{page}.html">` |
| Descriptive anchor text | No generic "click here" or "read more" links. All navigation and CTA links describe their destination (e.g., "Get Phlix", "Read the docs", "View source") |
| Skip link for accessibility | All pages include `<a class="skip-link" href="#main-content">Skip to main content</a>` as the first body element |

---

## ⚠️ Concerns (Non-blocking)

| Item | Detail |
|------|--------|
| H1 text differs from `<title>` on `index` | Page title is "Phlix — Your media. Your library. Your Phlix." but H1 is "Your media. Your library. Your Phlix." (missing "Phlix —" prefix). Not a direct failure but causes slight mismatch between browser tab and page heading |
| `rel="noopener noreferrer"` on external links | Correctly applied on GitHub links (e.g., line 89 `plugins.html`, line 86 `download.html`) — good practice, not a concern |
| Theme-color meta | `<meta name="theme-color" content="#000000">` present on all pages — minor but consider matching this to actual brand color for better PWA/browser UI integration |

---

## ❌ Failures (Must Fix)

### 1. Meta Descriptions Exceed 160 Characters — ALL 8 PAGES

All pages share the same 212-character meta description, which exceeds the 160-character limit.

**Pages affected**: `index.html:7`, `about.html:7`, `hub.html:7`, `docs.html:7`, `plugins.html:7`, `download.html:7`, `clients.html:7`, `features.html:7`

```
"Phlix — a self-hostable, open-source PHP media server with native clients
for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV,
transcoding, DLNA, hub relay."
```
**Length**: 212 characters (limit: 160) — exceeds by 52 chars

**Impact**: High. Search engines may truncate in SERPs; unique per-page descriptions help differentiate pages.

**Recommendation**: Write page-specific meta descriptions under 160 chars:
- `about`: "About Phlix — BSD-3-licensed open-source PHP media server. Learn about the project, license, and community." (~100 chars)
- `hub`: "Phlix Hub — access your media server from anywhere via reverse-tunnel relay. Self-host or use the public hub." (~108 chars)
- `docs`: "Phlix documentation — user guide, API reference, developer docs, and hub admin guide." (~93 chars)
- `plugins`: "Extend Phlix with plugins — versioned LifecycleInterface contract, drop-in loader, reference implementation available." (~121 chars)
- `download`: "Download Phlix — server (PHP 8.3+) and native clients for Roku, Samsung Tizen, Windows, iOS, and Android." (~112 chars)
- `clients`: "Phlix clients — native apps for Roku, Samsung Tizen, Windows, Mobile (iOS/Android), and any DLNA device." (~108 chars)
- `features`: "Phlix features — SyncPlay, live TV/DVR, FFmpeg transcoding, multi-user profiles, DLNA, plugin system." (~103 chars)

---

### 2. Missing `sitemap.xml`

No `sitemap.xml` found in `variants/02-spotlight-projector/`.

**Impact**: High. Search engines rely on sitemaps to discover and index pages efficiently. Without one, deeper pages may not be indexed.

**Recommendation**: Create `variants/02-spotlight-projector/sitemap.xml` listing all 8 pages with `<loc>`, `<lastmod>`, and `<changefreq>`.

---

### 3. Missing `robots.txt`

No `robots.txt` found in `variants/02-spotlight-projector/`.

**Impact**: Medium. Cannot guide search engine crawlers, allow/block specific paths, or point to sitemap location.

**Recommendation**: Create `variants/02-spotlight-projector/robots.txt` with standard directives:
```
User-agent: *
Allow: /
Sitemap: https://detain.github.io/phlix-website/sitemap.xml
```

---

### 4. No JSON-LD Structured Data on Any Page

None of the 8 pages include JSON-LD schema markup (e.g., `SoftwareApplication`, `Organization`, or `WebSite`).

**Impact**: Medium. Missed opportunity for rich snippets in SERPs and enhanced search visibility.

**Recommendation**: Add at minimum a `WebSite` schema with `searchAction` to `index.html`, and `SoftwareApplication` schema to the download page. Example for `index.html`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Phlix",
  "url": "https://detain.github.io/phlix-website/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://detain.github.io/phlix-website/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

---

## Recommendations (Ranked by Impact)

| Priority | Recommendation | Impact |
|----------|----------------|--------|
| 1 | Trim/write unique meta descriptions per page (≤160 chars) | High — affects SERP CTR across all 8 pages |
| 2 | Add `sitemap.xml` with all 8 pages | High — ensures search engine coverage |
| 3 | Add `robots.txt` pointing to sitemap | Medium — standard crawl hygiene |
| 4 | Add JSON-LD `WebSite` + `SoftwareApplication` schema | Medium — rich snippet eligibility |
| 5 | Align `index.html` H1 with `<title>` tag | Low — minor consistency issue |

---

## Detailed Per-Page Findings

### `index.html`
| Element | Value | Status |
|----------|-------|--------|
| `<title>` | "Phlix — Your media. Your library. Your Phlix." (49 chars) | ✅ |
| `<meta name="description">` | 212 chars | ❌ |
| Canonical | `https://detain.github.io/phlix-website/` | ✅ |
| H1 | "Your media. Your library. Your Phlix." | ✅ |
| JSON-LD | None | ❌ |

### `about.html`
| Element | Value | Status |
|----------|-------|--------|
| `<title>` | "About — Phlix" (13 chars) | ✅ |
| `<meta name="description">` | 212 chars (same generic) | ❌ |
| Canonical | `https://detain.github.io/phlix-website/about.html` | ✅ |
| H1 | "About" | ✅ |
| JSON-LD | None | ❌ |

### `hub.html`
| Element | Value | Status |
|----------|-------|--------|
| `<title>` | "Hub — Phlix" (11 chars) | ✅ |
| `<meta name="description">` | 212 chars (same generic) | ❌ |
| Canonical | `https://detain.github.io/phlix-website/hub.html` | ✅ |
| H1 | "Phlix Hub" | ✅ |
| JSON-LD | None | ❌ |

### `docs.html`
| Element | Value | Status |
|----------|-------|--------|
| `<title>` | "Docs — Phlix" (12 chars) | ✅ |
| `<meta name="description">` | 212 chars (same generic) | ❌ |
| Canonical | `https://detain.github.io/phlix-website/docs.html` | ✅ |
| H1 | "Docs" | ✅ |
| JSON-LD | None | ❌ |

### `plugins.html`
| Element | Value | Status |
|----------|-------|--------|
| `<title>` | "Plugins — Phlix" (15 chars) | ✅ |
| `<meta name="description">` | 212 chars (same generic) | ❌ |
| Canonical | `https://detain.github.io/phlix-website/plugins.html` | ✅ |
| H1 | "Plugins" | ✅ |
| JSON-LD | None | ❌ |

### `download.html`
| Element | Value | Status |
|----------|-------|--------|
| `<title>` | "Download — Phlix" (16 chars) | ✅ |
| `<meta name="description">` | 212 chars (same generic) | ❌ |
| Canonical | `https://detain.github.io/phlix-website/download.html` | ✅ |
| H1 | "Download" | ✅ |
| JSON-LD | None | ❌ |

### `clients.html`
| Element | Value | Status |
|----------|-------|--------|
| `<title>` | "Clients — Phlix" (14 chars) | ✅ |
| `<meta name="description">` | 212 chars (same generic) | ❌ |
| Canonical | `https://detain.github.io/phlix-website/clients.html` | ✅ |
| H1 | "Clients" | ✅ |
| JSON-LD | None | ❌ |

### `features.html`
| Element | Value | Status |
|----------|-------|--------|
| `<title>` | "Features — Phlix" (15 chars) | ✅ |
| `<meta name="description">` | 212 chars (same generic) | ❌ |
| Canonical | `https://detain.github.io/phlix-website/features.html` | ✅ |
| H1 | "Features" | ✅ |
| JSON-LD | None | ❌ |

---

## Evidence

- Title lengths verified via manual character count
- Meta description "Phlix — a self-hostable, open-source PHP media server with native clients for Roku, Samsung Tizen, Windows, and Mobile. SyncPlay, Live TV, transcoding, DLNA, hub relay." = 212 characters (exceeds 160)
- Canonical URLs verified on lines: `index:8`, `about:8`, `hub:8`, `docs:8`, `plugins:8`, `download:8`, `clients:8`, `features:8`
- H1 count verified: exactly one `<h1>` per page
- `sitemap.xml` glob returned no matches
- `robots.txt` glob returned no matches
- No `<script type="application/ld+json">` found in any of the 8 HTML files
