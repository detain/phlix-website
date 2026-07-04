# SEO Review — Día de Muertos

**Variant**: dia-de-muertos
**Round**: 1
**Reviewer**: adversarial-reviews-agent
**Date**: 2026-07-01

## Score

- **SEO**: 68 / 100

## ✅ Passed

- `index.html:6` title "Phlix — Remember. Celebrate. Live." is 33 characters — well under the 60-char limit
- `download.html:6` title "Download — Phlix" is 17 chars — under limit
- `about.html:6` title "About — Phlix" is 11 chars — under limit
- `plugins.html:6` title "Plugins — Phlix" is 14 chars — under limit
- `docs.html:6` title "Docs — Phlix" is 10 chars — under limit
- `hub.html:6` title "Hub — Phlix" is 10 chars — under limit
- All page meta descriptions are 155 chars or under the 160-char limit
- `index.html:15` has canonical URL: `https://detain.github.io/phlix-website/sites/dia-de-muertos/`
- All 9 pages have canonical URLs pointing to their respective pages
- `sitemap.xml` exists and lists all 8 pages with `<loc>`, `<changefreq>`, and `<priority>` values
- `robots.txt` exists with `User-agent: *` and Sitemap directive
- Heading hierarchy is correct on `clients.html`: h1=Clients → h2 for each client (Roku, Samsung Tizen, Windows, Mobile, DLNA)
- Heading hierarchy is correct on `download.html`: h1=Download → h2 for section headings (Server, Clients, Ecosystem) → h3 for individual download cards
- Heading hierarchy is correct on `about.html`: h1=About → h2 for Philosophy, License, Contributing, FAQ
- Heading hierarchy is correct on `features.html`: h1=Features → h2 for each feature detail (Library, SyncPlay, Transcoding, etc.)
- `index.html:59-70` has valid JSON-LD SoftwareApplication schema with `name`, `description`, `applicationCategory`, `operatingSystem`, `offers`, `license`
- Internal anchor text is descriptive across all pages: "Features", "Clients", "Download", "Plugins", "Docs", "Hub", "About" — no "click here" or "read more" patterns
- Single H1 per page on all pages except features.html: index (h1=Your media. Your library. Your Phlix.), clients (h1=Clients), download (h1=Download), about (h1=About), plugins (h1=Plugins), docs (h1=Docs), hub (h1=Phlix Hub)

## ⚠️ Concerns (non-blocking)

- `features.html:6` title "Features — Phlix" is only 14 characters (displayed as "Features — Phlix"). With 8 feature sections on this page, a longer more descriptive title would better serve SEO. This is not a failure but is suboptimal
- `clients.html:22-23` og:description "Native apps for Roku, Samsung Tizen, Windows, Mobile, and any DLNA device." is specific and good, but the meta description at `clients.html:8-9` is the generic Phlix description. These should be consistent
- `hub.html:21` og:description "Reach your server from anywhere." is only 38 characters — this page's description could be more descriptive for social sharing
- `sitemap.xml` omits `lastmod` values — adding `<lastmod>` would improve SEO signals
- No `lang` attribute variation — all pages have `lang="en"` which is correct for this site

## ❌ Failures (must fix this round)

- **`features.html`** — The page has a visually rendered `<h1>Features</h1>` at `features.html:96` inside the `.page-header-inner` div, not a standalone `<h1>` in the main content. However, the actual semantic structure: the `.page-header` div contains `<h1>Features</h1>`, then `.content-section` begins with `<div class="content-grid">` (not a `<section>` with a heading). The feature articles use `<h2>` for each feature name (Library that organizes itself, SyncPlay across the room...). This creates a situation where the page's H1 is "Features" and then immediately H2 elements follow for individual items, which is technically correct heading hierarchy. The features overview section on `index.html` also uses h2 properly. However, the `features.html` page's `<title>` is only "Features — Phlix" (14 chars) which is sub-optimal but not a blocking failure. The heading hierarchy itself (H1=Features → H2s) is actually correct
- **`features.html`** — JSON-LD is entirely absent. `index.html` has a `SoftwareApplication` JSON-LD block at lines 59-70, but `features.html`, `clients.html`, `download.html`, `about.html`, `plugins.html`, `docs.html`, `hub.html` have zero JSON-LD. For a product site, having structured data only on the homepage is a significant SEO gap. The brand kit and SEO best practices both require JSON-LD on all pages to support rich snippets. Required: add `SoftwareApplication` or `WebPage` JSON-LD to all 8 sub-pages
- **`clients.html:23`** — og:description is "Native apps for Roku, Samsung Tizen, Windows, Mobile, and any DLNA device." but the meta description at `clients.html:8-9` is the generic "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support." These two descriptions are inconsistent within the same page. The og:description is more specific but the meta description is generic. For SEO consistency the meta description and og:description should be aligned on the most relevant description for that page

## Recommendations (ranked by impact)

1. Add JSON-LD to all 8 sub-pages — at minimum a `WebPage` or `SoftwareApplication` block (impact: high, effort: low)
2. Align meta description with og:description on clients.html and hub.html (impact: high, effort: low)
3. Expand short titles on features/docs/hub/plugins pages (impact: medium, effort: low)
4. Add `lastmod` to sitemap.xml entries (impact: medium, effort: low)
5. Consider adding FAQ structured data (FAQPage JSON-LD) on about.html since it contains an FAQ section (impact: medium, effort: medium)

## Evidence

- SEO check command: N/A (static HTML review)
- sitemap.xml verified at `sites/dia-de-muertos/sitemap.xml`
- robots.txt verified at `sites/dia-de-muertos/robots.txt`
- JSON-LD on index.html: `index.html:59-70`
- JSON-LD absent from all other pages: verified by content search across 8 HTML files
