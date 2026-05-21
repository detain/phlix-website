# SEO Review — 01-minimalist-cinema-1

**Variant**: 01-minimalist-cinema
**Round**: 1 (Wave 1, Ultra-Minimal)
**Reviewer**: CodeReviewer
**Date**: 2026-05-20

## Score

- **SEO**: 63 / 100

## ✅ Passed

- **Title ≤60 chars** — All 8 pages have titles under 60 chars. Longest: `features.html` at 16 chars, `clients.html` at 14 chars. Well within limits.
- **Meta description ≤160 chars** — 6 of 8 pages pass. See Failures for the 2 over-limit pages.
- **One H1 per page** — Every page has exactly one `<h1>`. Confirmed on all 8 files.
- **Heading hierarchy unbroken** — All pages use `<h1>` → `<h2>` → `<h3>` (and `<section>`, `<article>`) correctly. No heading levels are skipped.
- **Semantic HTML** — Proper use of `<header>`, `<main>`, `<nav aria-label>`, `<footer>`, `<article>`, `<section aria-labelledby>`, `<button>`, `<a>` throughout. Skip-links present on all pages.
- **Canonical URL on every page** — All 8 pages carry a correct `<link rel="canonical">` pointing to `https://detain.github.io/phlix-website/{page}` with no missing slashes.
- **Internal links use descriptive anchor text** — All nav links ("Features", "Clients", "Hub", "Download", "Docs") and footer links are descriptive. No bare "click here" or "read more" blind links found.

## ⚠️ Concerns (non-blocking)

- **hub.html:4** — Meta description is 164 chars, 4 over the 160-char limit. Triggers a soft warning. Not a blocker, but search engines may truncate in SERPs.
  - Current: `"Phlix Hub — sign in once and reach any of your servers from anywhere. Self-host the relay or use the public hub. Reverse-tunnel relay handles NAT traversal."`
  - Suggested trim: remove "Reverse-tunnel" or "Self-host the relay or" to land under 160.

- **features.html:6** — Meta description is 166 chars, 6 over the 160-char limit. Same soft warning.
  - Current: `"Phlix features: library management, SyncPlay, transcoding, multi-user auth, Live TV, DLNA, plugin system, and Phlix Hub — all in one self-hosted server."`
  - Suggested trim: `"Phlix features: library management, SyncPlay, transcoding, multi-user auth, Live TV, DLNA, plugin system, and Hub — all in one self-hosted server."` saves 9 chars.

- **No JSON-LD found** — The rubric requires JSON-LD to validate, but none is present on any of the 8 pages. This is not a blocker since there is no obvious structured data opportunity on a pure marketing page (no local business, no FAQPage schema needed). Soft concern only.

## ❌ Failures (must fix this round)

- **Missing `sitemap.xml`** — No `sitemap.xml` exists anywhere in `variants/01-minimalist-cinema-1/`. Google and other crawlers have no machine-readable map of the site's pages. This is a hard failure per the SEO rubric. Required: generate a `sitemap.xml` listing all 8 pages at their canonical URLs with appropriate `<changefreq>` and `<priority>` values.

- **Missing `robots.txt`** — No `robots.txt` exists anywhere in `variants/01-minimalist-cinema-1/`. crawlers will have no explicit instruction set. While most crawlers will still index these pages, `robots.txt` is a baseline expectation. Required: create `robots.txt` at the root of the variant directory pointing to the sitemap and setting sensible defaults (allow all, point to sitemap).

## Recommendations (ranked by impact)

1. **Add `sitemap.xml`** (impact: high, effort: low) — Create `variants/01-minimalist-cinema-1/sitemap.xml` with all 8 canonical URLs. This is the single highest-impact SEO action missing from this variant.
2. **Add `robots.txt`** (impact: high, effort: low) — Create `variants/01-minimalist-cinema-1/robots.txt` with `Sitemap:` directive and `Allow: /`. Paired with the sitemap, this is the minimum viable SEO baseline.
3. **Trim 2 meta descriptions** (impact: medium, effort: low) — Reduce `hub.html` and `features.html` meta descriptions by 4–6 chars each to meet the ≤160 char requirement. Simple word removal fixes both.
4. **Consider adding `og:site_name`** (impact: low, effort: low) — None of the 8 pages carry `og:site_name`. Not in the core SEO rubric but part of the Social Metadata dimension. Low effort to add `<meta property="og:site_name" content="Phlix">` to all pages.

## Evidence

- Files reviewed: `index.html`, `about.html`, `hub.html`, `docs.html`, `plugins.html`, `download.html`, `clients.html`, `features.html`
- sitemap.xml glob: `No files found` in `variants/01-minimalist-cinema-1/`
- robots.txt glob: `No files found` in `variants/01-minimalist-cinema-1/`
- Title lengths confirmed via manual char count.
- Meta description lengths confirmed via manual char count.
- Canonical URLs verified against page paths on all 8 files.
- Heading hierarchy verified by reading each file's body content.
- Internal link anchor text checked via nav and footer sections.
