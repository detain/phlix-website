# SEO

## Score: 92/100

## Findings
- ✅ index.html `<title>` = "Phlix — Your media. Your library. Your Phlix." (43 chars) — ≤60
- ✅ features.html `<title>` = "Features — Phlix" (16 chars) — ≤60
- ✅ clients.html `<title>` = "Clients — Phlix" (16 chars) — ≤60
- ✅ download.html `<title>` = "Download — Phlix" (17 chars) — ≤60
- ✅ plugins.html `<title>` = "Plugins — Phlix" (16 chars) — ≤60
- ✅ docs.html `<title>` = "Docs — Phlix" (13 chars) — ≤60
- ✅ hub.html `<title>` = "Hub — Phlix" (12 chars) — ≤60
- ✅ about.html `<title>` = "About — Phlix" (13 chars) — ≤60
- ✅ index.html `<meta name="description">` = 117 chars — ≤160
- ✅ features.html `<meta name="description">` = 97 chars — ≤160
- ✅ clients.html `<meta name="description">` = 95 chars — ≤160
- ✅ download.html `<meta name="description">` = 90 chars — ≤160
- ✅ plugins.html `<meta name="description">` = 94 chars — ≤160
- ✅ docs.html `<meta name="description">` = 97 chars — ≤160
- ✅ hub.html `<meta name="description">` = 97 chars — ≤160
- ✅ about.html `<meta name="description">` = 107 chars — ≤160
- ✅ All 8 pages have `<link rel="canonical">` with absolute URL
- ✅ index.html has `<script type="application/ld+json">` with SoftwareApplication schema — correct fields: name, description, applicationCategory, operatingSystem, offers.price=0, license
- ✅ sitemap.xml exists with all 8 page `<loc>` entries using absolute URLs
- ✅ robots.txt references sitemap at correct absolute path
- ⚠️ features.html: heading hierarchy — the `.content-grid` uses `grid-template-columns: 1fr` (features.html:65), and each `<article class="feature-detail">` contains a standalone `<h2>` — there is no H1 on this page's feature list (H1 is the page header). This means the feature sections have H2 siblings of the page header's H1. The actual document outline: H1 "Features" (page-header) → H2 "Library that organizes itself", H2 "SyncPlay...", etc. This is correct H1→H2 hierarchy with no level skips. ✅
- ✅ No heading level skips detected across any page: index.html: H1 hero → H2 pitch/Why Phlix/CTA; features.html: H1 → H2s; clients.html: H1 → H2s; download.html: H1 → H2s; plugins.html: H1 → H2s; docs.html: H1 → H2s; hub.html: H1 → H2s; about.html: H1 → H2s (Philosophy, License, Contributing, FAQ) → no further nesting

## Summary
SEO fundamentals are solid across all 8 pages: titles and descriptions all within spec, canonical URLs absolute and present everywhere, JSON-LD on index correct, sitemap and robots.txt both present and correct. Heading hierarchy is unbroken (H1 → H2) throughout. No broken heading skips. Score 92/100 — slight扣 for the feature section's structural use of sibling H2s (technically valid but worth noting). Not a defect.
