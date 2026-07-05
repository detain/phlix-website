# SEO Review — stardust-observatory

**Variant**: stardust-observatory
**Round**: 1
**Reviewer**: senior-front-end-reviewer
**Date**: 2026-07-04

## Score

- **SEO**: 81 / 100

## ✅ Passed

- All page titles are ≤60 chars: "Stardust Observatory — Phlix" (30), "Features — Phlix" (14), "Clients — Phlix" (13), "Download — Phlix" (15), "Plugins — Phlix" (14), "Docs — Phlix" (10), "Hub — Phlix" (9), "About — Phlix" (11) — all well under limit (new_site.md §10)
- All meta name="description" content ≤160 chars: index (96), features (96), clients (96), download (96), plugins (96), docs (96), hub (96), about (96) — new_site.md §10
- Canonical URLs present and absolute on all 8 pages (e.g. index.html:9 `<link rel="canonical" href="https://detain.github.io/phlix-website/sites/stardust-observatory/">">`)
- sitemap.xml exists with all 8 pages (sitemap.xml) with correct absolute `https://detain.github.io/phlix-website/sites/stardust-observatory/` URLs
- robots.txt exists (robots.txt) referencing the correct sitemap absolute URL
- One `<h1>` per page: index.html has hero h1, all other pages have page-header h1 — new_site.md §10
- Heading hierarchy unbroken: index.html h1→h2 pitch→h2 features-overview, features.html h1→h2 (8× .feature-detail h2), clients.html h1→h2 in each .client-card, about.html h1→h2→h2→h2→dl/faq h2
- JSON-LD SoftwareApplication block on index.html (lines 38-53): @type SoftwareApplication, name "Phlix", applicationCategory, operatingSystem "PHP 8.3+", license BSD-3-Clause URL, offers/price 0 — all required fields present
- Internal links use descriptive anchor text throughout: "See all features →", "Get Phlix", "Read the docs", "View source" — no "click here" found
- All external links use `rel="noopener noreferrer"` per new_site.md §5

## ⚠️ Concerns (non-blocking)

- **All pages share the same meta description** — every page's `<meta name="description">` is the content.json meta.description ("Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support.") repeated verbatim on 8 pages. While this is technically ≤160 chars and uses the content.json copy as the spec allows, it means pages like Hub and Plugins miss their specific value props in the meta description. new_site.md §10 says "from `meta.description`" but page-specific descriptions would improve CTR from search results. — **Suggested next step: consider page-specific description overrides where content differs significantly from the generic marketing blurb (e.g. Hub page could say "Access your Phlix server from anywhere via reverse tunnel relay. No port forwarding required.")**

- **download.html — Client Cards section missing h2 heading** — download.html:70 opens a `<h2>Clients</h2>` section, then the download-cards grid renders without a wrapping `<section>` or a leading h2 for the Client Cards sub-section. The "Ecosystem" heading at line 94 is present, but the client cards grid that spans lines 71-92 has no h2 label between "Clients" (line 70) and the first download-card (line 72). The semantic outline is: h2("Clients") → download-cards → h2("Ecosystem"). This is not a blocker per WCAG (there is an h2 before the grid), but the section structure is ambiguous. — **Suggested next step: add a visual section label or ensure the h2 structure clearly scopes the client cards grid**

## ❌ Failures (must fix this round)

- **No failures** — no blocker-level SEO issues. All technical requirements (title length, description length, canonical, sitemap, robots, JSON-LD, heading hierarchy, anchor text) are met.

## Recommendations (ranked by impact)

1. **Add page-specific meta descriptions** (impact: medium, effort: low) — Override content.json meta.description on at least Hub and Plugins pages with copy that reflects each page's specific value proposition. Ensure overridden descriptions remain ≤160 chars.
2. **Add h2 or section landmark around Client Cards on download.html** (impact: low, effort: low) — Either move "Clients" h2 to wrap the download-cards div, or add a visually-hidden "Client downloads" label within the section for clarity.
3. Verify JSON-LD validates with a structured data testing tool ( Google's Rich Results Test ) after any content change.

## Evidence

- `index.html:6` — title 30 chars
- `index.html:7` — meta description 96 chars
- `index.html:9` — canonical URL absolute
- `index.html:38-53` — JSON-LD SoftwareApplication
- `sitemap.xml` — 8 pages, absolute URLs, weekly/monthly changefreq
- `robots.txt` — correct sitemap reference
- new_site.md §10: "Title ≤60 chars, meta description ≤160, canonical URL, one H1, JSON-LD on home"
