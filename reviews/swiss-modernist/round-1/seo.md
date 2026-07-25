# SEO Review — Swiss Modernist

**Variant**: swiss-modernist
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **SEO**: 82 / 100

## ✅ Passed

- Titles are unique per page and all ≤ 60 chars: `Phlix — Grid. Type. Truth.` (26),
  `Features — Phlix`, `Clients — Phlix`, `Download — Phlix`, `Plugins — Phlix`,
  `Documentation — Phlix`, `Hub — Phlix`, `About — Phlix`, `404 — Phlix`. The home title uses
  the kit's `tagline_primary`, which is the right differentiator across 50 sites.
- Meta description is 131 chars, within the 160 limit, and is `content.json.meta.description`
  verbatim — correct under §16 (it is a shared fact, not per-page prose to invent).
- Canonical URL on all nine pages, each pointing at its own absolute URL.
- `sitemap.xml` lists 8 URLs (correctly excluding `404.html`); `robots.txt` allows all and
  points at the sitemap.
- `404.html` carries `<meta name="robots" content="noindex">` (`404.html:15`) and uses only
  relative asset paths.
- Valid JSON-LD `SoftwareApplication` on every page with `name`, `description`,
  `applicationCategory`, `operatingSystem`, `offers` and a `license` URL that resolves to the
  real MPL-2.0 text.
- Semantic HTML throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`,
  `<dl>`/`<dt>`/`<dd>` for spec tables and the FAQ, `<figure>`/`<blockquote>`/`<figcaption>` for
  the proof quote. `<pre><code>` for commands.
- Exactly one `<h1>` per page on all nine pages.
- Internal anchor text is descriptive: "See all eight features in full", "Step 2 — pick your
  client", "Stars — live count on GitHub", "phlix-hub — relay infrastructure",
  "Installation documentation". No "click here", no bare "read more".
- Every `<section>` carries `aria-labelledby` pointing at its own heading, which also gives
  crawlers a clean section/heading association.

## ⚠️ Concerns (non-blocking)

- **`docs.html:135, 146`** — `<h1>06 Documentation</h1>` followed immediately by
  `<h2>01 Documentation</h2>`. Identical keyword at two levels adds no signal and reads as an
  authoring slip. Rename the inner section.
- **`docs.html` §02 Ecosystem vs `download.html` §03 Ecosystem** — the same five-repo list,
  verbatim, on two indexable pages. Mild internal duplicate-content signal; link one to the
  other instead.
- **All nine pages share one meta description.** Compliant (it is the only description
  `content.json` supplies) but it means `features.html`, `clients.html`, `hub.html` etc. have no
  page-specific snippet. Worth raising to the orchestrator as a `shared/content.json` question
  rather than fixing per-site — do not invent per-page descriptions here.

## ❌ Failures (must fix this round)

- **`features.html:145, 152, 164, 176, 187, 200, 213, 226, 238`** — the heading hierarchy is
  broken on the site's highest-intent content page. The section heading "01 The inventory" is an
  `<h2>`, and the eight feature titles nested inside that section are also `<h2>`s, so the
  outline is `H1 → H2 → H2 ×8` with no level-3 tier and no machine-readable section boundary.
  The equivalent content on `index.html` is correctly `<h3>`, so the site contradicts itself.
  Fails the rubric's "Heading hierarchy unbroken".
  **Required outcome**: the eight `.feature-detail` titles become `<h3>`; retarget
  `css/components.css:383-389` from `.feature-detail h2` to `.feature-detail h3`.

## Recommendations (ranked by impact)

1. Demote the eight feature titles to `<h3>` (impact: high, effort: low).
2. Rename `docs.html`'s inner section and deduplicate the ecosystem list (impact: low, effort: low).

## Evidence

- `<title>` and `<meta name="description">` extracted from all nine pages.
- `sitemap.xml` → 8 `<url>` entries; `robots.txt` verified.
- Heading outline dumped for all nine pages via Puppeteer.
