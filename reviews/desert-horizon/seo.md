# SEO Review — Desert Horizon

**Variant**: desert-horizon
**Round**: 1
**Reviewer**: adversarial-seo
**Date**: 2026-07-01

## Score

- **SEO**: 55 / 100

## ✅ Passed

- All `<title>` tags are ≤60 chars and page-specific (index:44, features:16, clients:16, download:18, plugins:16, docs:12, hub:12, about:13) — index.html:6
- All `<meta name="description">` tags are ≤160 chars (133 chars each) — e.g. index.html:9
- All 8 pages have exactly one `<h1>` — confirmed per-page manual inspection
- Heading hierarchy is unbroken on all pages (h1 → h2 → h3, no skips) — confirmed per-page
- All 8 pages carry `<link rel="canonical">` pointing to their absolute URL — e.g. index.html:15
- No "click here" or equivalent generic anchor text found anywhere — all internal anchors use descriptive labels ("See all features", "View source", "Get Phlix", "Read the docs")
- JSON-LD `SoftwareApplication` block present on home page (index.html:57-72) with name, description, applicationCategory, operatingSystem, offers/price=0, license — validates as correct Schema.org structure
- `sitemap.xml` exists with all 8 pages at absolute canonical URLs, proper `<urlset>` wrapping
- `robots.txt` exists with `Sitemap:` directive pointing to the sitemap

## ⚠️ Concerns (non-blocking)

- **download.html:173** — DLNA "Built in" action uses a `<span class="btn btn-ghost" style="opacity: 0.6; cursor: default">` rather than a real `<button>` or styled `<div>` with proper disabled semantics — not an SEO issue but poor accessibility/HTML semantics — replace with a proper disabled button or static label if DLNA is always built-in and no action is available

## ❌ Failures (must fix this round)

- **All 8 pages (index.html:9, features.html:9, clients.html:9, download.html:9, plugins.html:9, docs.html:9, hub.html:9, about.html:9)** — All pages share the **same identical** `<meta name="description">` content: `"Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support."` (133 chars) — **Required outcome**: Every page must carry a **page-specific** meta description that accurately reflects that page's content. The spec (new_site.md §10) says `<meta name="description">` must be from `meta.description` but the rubrics explicitly require page-specific descriptions for SEO. At minimum, override the description on features.html, clients.html, plugins.html, hub.html, and about.html with page-specific copy (e.g. "Features — Phlix: Library organization, SyncPlay, transcoding, multi-user auth, Live TV, DLNA, and a plugin system.") so search engines can distinguish pages. Home and download pages may retain the general description since they are broad summaries. All meta description lengths must remain ≤160 chars.
- **All 8 pages (index.html:12-14, features.html:12-14, etc.)** — All pages share the **same identical** `<meta name="keywords">` content. While `<meta keywords>` carries negligible SEO weight, using the same generic list on every page is a content-duplication signal. — **Required outcome**: At minimum the brand-kit-specific keywords from the kit's `keywords` array should appear on the home page; inner pages can use a focused subset relevant to their content.

## Recommendations

1. **Rewrite meta descriptions per page** (impact: high, effort: low) — Each of the 8 pages needs a unique `<meta name="description">` that reflects that page's specific content. Recommended descriptions: **index**: retain general "Self-hostable PHP media server…" (current); **features**: "Phlix features: library organization, SyncPlay, adaptive transcoding, multi-user profiles with parental controls, Live TV + DVR, DLNA, and an extensible plugin system." (~148 chars); **clients**: "Phlix clients: native apps for Roku, Samsung Tizen, Windows, iOS/Android, and any DLNA device — all open source." (~134 chars); **download**: "Download Phlix: PHP 8.3+ server, official clients for Roku, Samsung Tizen, Windows, and Mobile (beta), plus the full ecosystem." (~139 chars); **plugins**: "Extend Phlix with a versioned plugin contract — implement LifecycleInterface, drop in your plugins/ directory, no fork required." (~130 chars); **docs**: "Phlix documentation: user guide, API reference, developer docs, and hub admin guide — self-hosted media server." (~121 chars); **hub**: "Phlix Hub: reverse-tunnel relay to access your media server from anywhere, no port-forwarding required. Self-host or use the public relay." (~142 chars); **about**: "About Phlix: BSD-3 licensed, self-hosted media server built in PHP 8.3+ on Workerman. FAQ, philosophy, and contributing guide." (~134 chars)
2. **Add page-specific `<meta name="keywords">` subsets** (impact: low, effort: low) — Inner pages should carry a focused 3-5 keyword subset rather than the full 6-keyword list; new_site.md §10 specifies keywords come from `meta.keywords` but page-specific overrides are legitimate for SEO differentiation

## Evidence

- index.html:6 — `<title>Your media. Your library. Your Phlix. — Phlix</title>` (44 chars)
- index.html:9 — `<meta name="description" content="Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support.">` (133 chars)
- index.html:15 — `<link rel="canonical" href="https://detain.github.io/phlix-website/sites/desert-horizon/" />`
- index.html:57-72 — JSON-LD `SoftwareApplication` block with all required fields
- features.html:17 — canonical to features.html
- sitemap.xml — all 8 pages present with correct absolute URLs
- robots.txt — references sitemap.xml correctly
- All 8 pages: manual H1 count confirmed exactly 1 per page; heading hierarchy confirmed unbroken (h1 → h2 → h3 where applicable, no level skips)
- No "click here" pattern found across any of the 8 pages via text inspection
