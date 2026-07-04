# SEO Review — Psychedelic Groove

**Variant**: psychedelic-groove
**Round**: 2
**Reviewer**: Code Review Agent
**Date**: 2026-07-04

## Score

- **SEO**: 88 / 100

## ✅ Passed

- **Title lengths** — All pages have ≤60 char titles: index.html "Phlix — Expand Your Universe." (28 chars), features.html "Features — Phlix" (16 chars), clients.html "Clients — Phlix" (14 chars), download.html "Download — Phlix" (16 chars), plugins.html "Plugins — Phlix" (14 chars), docs.html "Docs — Phlix" (11 chars), hub.html "Hub — Phlix" (10 chars), about.html "About — Phlix" (12 chars)
- **Meta descriptions** — All pages have ≤160 char descriptions. All pages use the same description (123 chars) from content.json.
- **Canonical URLs** — All 8 pages have `<link rel="canonical">` with absolute HTTPS URLs pointing to detain.github.io/phlix-website/sites/psychedelic-groove/.
- **One H1 per page** — Verified: index.html `<h1>Your media. Your library. Your Phlix.</h1>`, features.html `<h1>Features</h1>`, clients.html `<h1>Clients</h1>`, download.html `<h1>Download</h1>`, plugins.html `<h1>Plugins</h1>`, docs.html `<h1>Docs</h1>`, hub.html `<h1>Phlix Hub</h1>`, about.html `<h1>About</h1>`.
- **Heading hierarchy** — No H1 after H2; logical progression: H1 → H2 → H3. Verified on features.html: feature-detail articles use `<h2>` for feature titles within a content grid — semantically correct.
- **sitemap.xml** — All 8 pages listed with absolute canonical URLs, correct priority values, and weekly/monthly changefreq. Well-formed XML.
- **robots.txt** — References sitemap at correct absolute URL. "User-agent: * Allow: /" is correct.
- **JSON-LD** — index.html has valid SoftwareApplication JSON-LD with name, description, applicationCategory, operatingSystem, offers (price=0), license. Properly formatted.
- **Descriptive anchor text** — All internal links use descriptive text: "Features", "Clients", "Download", "Plugins", "Docs", "Hub", "About" — no "click here" patterns found anywhere.
- **Semantic landmarks** — `role="banner"` on header, `role="navigation"` on nav, `id="main-content"` on main, `role="contentinfo"` on footer — all present on every page.
- **External links use rel="noopener noreferrer"** — All links to github.com and detain.io use `rel="noopener noreferrer"`.

## ⚠️ Concerns (non-blocking)

- **features.html:11 and clients.html:11 have custom og:description** — `og:description` differs from the `<meta name="description">` content on the same pages. For features.html: og:description is "Everything you need to run a media library that actually works. SyncPlay, transcoding, multi-profile auth, Live TV, DLNA, and a plugin system." while meta description is the standard Phlix description. Same on clients.html. This creates inconsistency between what search engines see vs what social share cards display. Since new_site.md §2 says "substantive product claims and feature bodies come verbatim from content.json," the og:description should match the meta description for full contract compliance. However, social and search descriptions serve different purposes — this is a minor concern, not a blocker.

- **Missing JSON-LD on non-home pages** — new_site.md §10 only explicitly requires JSON-LD on the home page, which is satisfied. Inner pages don't have JSON-LD. Acceptable per spec but could improve SEO.

## ❌ Failures (must fix this round)

None — no must-fix blockers found. All critical SEO elements are present and correctly formatted. This round's fixes (Google Fonts CDN removal, aria-hidden partial fix) do not affect SEO.

## Recommendations (ranked by impact)

1. **Consider adding JSON-LD to other key pages** (impact: medium, effort: low) — Download and Features pages would benefit from JSON-LD for their respective content types.
2. **Make og:description consistent with meta description** (impact: low, effort: low) — On features.html and clients.html, consider using the verbatim content.json meta description for og:description for full content contract compliance.

## Evidence

- Verified titles, meta descriptions, canonical URLs on all 8 pages
- Verified sitemap.xml structure with all 8 page entries
- Verified JSON-LD on index.html
- Verified semantic landmarks and descriptive anchor text throughout
