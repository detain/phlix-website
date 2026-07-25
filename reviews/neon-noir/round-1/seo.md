# SEO Review — Neon Noir

**Variant**: neon-noir
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **SEO**: 86 / 100

## ✅ Passed

- Exactly one `<h1>` on each of the nine pages (verified by count).
- No heading level is skipped on any page.
- `<title>` lengths all well under 60 chars — `Phlix — Every Frame, a Mystery.` (31), `Dead End — Phlix` (16).
- `<meta name="description">` is 139 chars, under the 160 limit.
- `<link rel="canonical">` present on every page, absolute, with the correct `/neon-noir/` path segment.
- `sitemap.xml` lists all nine URLs with the correct absolute base; `robots.txt` present and points at it.
- `404.html` carries `<meta name="robots" content="noindex">` and is correctly excluded from indexing intent.
- Semantic landmarks throughout: `<header>`, `<nav aria-label>`, `<main>`, `<aside aria-labelledby>`, `<footer>`, `<article>`, `<section aria-labelledby>`. Every `<section>` that carries a heading is associated with it.
- Internal anchor text is descriptive, never "click here" / "read more": "Open all eight evidence files", "Read the phlix-server source", "Open the plugin dossier", "Every node on the network", "Read the licence in the server repository".
- JSON-LD `SoftwareApplication` block is well-formed and factually correct, including `"license": "https://www.mozilla.org/en-US/MPL/2.0/"` matching `content.json`, `"operatingSystem": "PHP 8.3+"` and a free `Offer`.
- Deep-linkable section ids on the pages that need them (`#server`, `#agents`, `#toolkit`, `#evidence`, `#network`, and the five home narrative ids), and the ladder's rung 3 actually uses `download.html#server`.
- `<html lang="en">` on all nine pages.

## ⚠️ Concerns (non-blocking)

- **All nine pages share a byte-identical `<meta name="description">`, `og:description` and `twitter:description`** (the `content.json` `meta.description`). Nine pages competing on one description is weak differentiation — the Features, Clients, Download, Hub and About pages each have distinctive first-paragraph copy (`.t-lead`) that would make a far better per-page description. This is likely a shared-template baseline rather than a neon-noir regression, so flagging for the orchestrator to rule on scope.
- **`features.html:147,190,229,271,311,351,395,435`** and **`clients.html:150,186,…`** — the eight feature titles and five client titles are `<h2>`, siblings of their own section's `<h2>`. No level is skipped so no automated check fires, but the document outline loses the parent/child relationship, which weakens the semantic grouping crawlers use. `download.html:179,194,…` gets this right with `<h3>`; the inconsistency is internal to this site.
- **`404.html:16`** — a `<link rel="canonical">` on a `noindex` page is contradictory. Harmless in practice; likely template-derived.
- `sitemap.xml` entries carry no `<lastmod>`, `<changefreq>` or `<priority>`. Optional, but cheap to add.

## ❌ Failures (must fix this round)

None.

## Recommendations (ranked by impact)

1. Give each page its own `<meta name="description">` from its existing `.t-lead` copy (impact: medium, effort: low) — pending an orchestrator ruling on whether shared-template meta is in scope.
2. Demote card titles to `<h3>` on `features.html` and `clients.html` (impact: low, effort: low).
3. Drop the canonical from `404.html` (impact: low, effort: trivial).

## Evidence

- `grep -c '<h1' sites/neon-noir/*.html` → 1 for all nine.
- `grep -on '<h[1-6]' features.html download.html` — heading sequences captured.
- `sites/neon-noir/sitemap.xml`, `robots.txt` read in full.
- JSON-LD block at `index.html:49-61`.
