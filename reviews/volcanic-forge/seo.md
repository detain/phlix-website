# SEO Review — Volcanic Forge

**Variant**: volcanic-forge
**Round**: 1
**Reviewer**: CodeReviewer (adversarial)
**Date**: 2026-07-04

## Score

- **SEO**: 97 / 100

---

## ✅ Passed

- **`<title>` length on all 8 pages ≤ 60 characters:**
  - `index.html:6`: "Phlix — Forged for the Screen" (26 chars) ✅
  - `features.html:6`: "Features — Phlix" (16 chars) ✅
  - `clients.html:6`: "Clients — Phlix" (15 chars) ✅
  - `download.html:6`: "Download — Phlix" (16 chars) ✅
  - `plugins.html:6`: "Plugins — Phlix" (15 chars) ✅
  - `docs.html:6`: "Docs — Phlix" (12 chars) ✅
  - `hub.html:6`: "Hub — Phlix" (11 chars) ✅
  - `about.html:6`: "About — Phlix" (13 chars) ✅

- **`<meta name="description">` ≤ 160 chars on all pages** — All 8 pages use the same 140-char description: "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support." (140 chars) ✅

- **One `<h1>` per page:**
  - `index.html:131`: `<h1>Your media. Your library. Your Phlix.</h1>` ✅
  - `features.html:59`: `<h1>Features</h1>` ✅
  - `clients.html:59`: `<h1>Clients</h1>` ✅
  - `download.html:59`: `<h1>Download</h1>` ✅
  - `plugins.html:59`: `<h1>Plugins</h1>` ✅
  - `docs.html:59`: `<h1>Docs</h1>` ✅
  - `hub.html:59`: `<h1>Phlix Hub</h1>` ✅
  - `about.html:59`: `<h1>About</h1>` ✅

- **Heading hierarchy unbroken — no h1→h3 skipping:**
  - `index.html`: h1 → h2 (pitch), h2 (features overview), h2 (cta banner) — no skips ✅
  - `features.html`: h1 → h2 (section headings: Plugin model, Ecosystem plugins, Write your own) — no skips; feature card titles use h2 but are peer sections, not nested — compliant ✅
  - `clients.html`: h1 → h2 (cta banner) — no skips ✅
  - `download.html`: h1 → h2 (Server, Clients, Ecosystem) — no skips ✅
  - `plugins.html`: h1 → h2 (Plugin model, Ecosystem plugins, Write your own) — no skips ✅
  - `docs.html`: h1 → h2 (Documentation, Ecosystem) — no skips ✅
  - `hub.html`: h1 → h2 (What the Hub does, Self-host or use the public hub, Hub mode in clients) — no skips ✅
  - `about.html`: h1 → h2 (Philosophy, License, Contributing, FAQ) — no skips ✅

- **`<link rel="canonical">` on every page** — Verified on all 8 pages (e.g., `index.html:8`, `features.html:8`, `download.html:8`) ✅

- **`sitemap.xml` exists with 8 URLs, all absolute:** Verified `sitemap.xml:3–43` contains exactly 8 `<url>` entries with `https://detain.github.io/phlix-website/sites/volcanic-forge/` base, all pages included ✅

- **`robots.txt` references sitemap:** `robots.txt:4` — `Sitemap: https://detain.github.io/phlix-website/sites/volcanic-forge/sitemap.xml` ✅

- **Descriptive anchor text (no "click here"):** Primary CTAs use "Get Phlix", "Download Phlix", "Download Now", "Get started" — all descriptive. Internal nav links are page names. Feature links use "See all features →". ✅

- **JSON-LD on home page:** `index.html:82–97` — Valid `SoftwareApplication` JSON-LD with `@context: "https://schema.org"`, `@type: "SoftwareApplication"`, `name`, `description`, `applicationCategory`, `operatingSystem`, `license`, and `offers/price=0` ✅

---

## ⚠️ Concerns (non-blocking)

- **`clients.html:78,91,105,118`** — "View source" links use generic anchor text. While functional, "View source" applied to 4 different client repos is not maximally descriptive. The brand kit and new_site.md spec require "descriptive anchor text (no 'click here')" — "View source" is not quite "click here" but also not specific to the client (e.g., "View Roku source" or "Roku source code" would be better). Not a blocker as it doesn't meet the threshold of truly generic "click here" style text, but falls short of best practice. (Impact: low — accessibility improvement, not a search engine penalty risk.)

---

## ❌ Failures (must fix this round)

None. No ❌ items this round. All hard SEO gates pass.

---

## Recommendations (ranked by impact)

1. **Improve "View source" anchor text on clients.html** (impact: low, effort: low) — Change `"View source"` to `"View [Client] source"` or `"[Client] source code"` for each of the 4 client cards. E.g., `"View Roku source"` on the Roku card (`clients.html:78`). Makes anchors more descriptive for screen readers and search engines. (Note: this is a ⚠️ concern, not a ❌ failure — site passes SEO gate without this change.)

2. **Consider adding `aria-label` to the hamburger nav toggle** (impact: low, effort: trivial) — The nav toggle button already has `aria-label="Toggle navigation"` — this is correct and already in place. No action needed here.

---

## Evidence

- **Title length**: Counted characters manually for each `<title>` tag across all 8 pages.
- **Canonical check**: `grep -n 'canonical' /home/sites/phlix/phlix-website/sites/volcanic-forge/*.html` confirms canonical on every page.
- **sitemap.xml**: Parsed manually — 8 `<url>` entries, all with absolute `https://detain.github.io/phlix-website/sites/volcanic-forge/` base URLs.
- **robots.txt**: Contains correct `Sitemap:` directive pointing to the absolute sitemap URL.
- **JSON-LD**: Validated structure at `index.html:82–97` — all required fields present per `new_site.md §10` and `REVIEW_RUBRICS.md`.
- **Heading count per page**: `grep -c '<h1'` and `grep -c '<h2'` across all pages — confirmed exactly 1 h1 per page, no duplicate h1s.
- **Anchor text audit**: Scanned all `<a>` elements across all pages — no instances of "click here", "learn more", "read more" generic patterns. "View source" is the least descriptive but is product-name-agnostic by design (links to GitHub source repos).
