# Social Metadata Review — Día de Muertos

**Variant**: dia-de-muertos
**Round**: 1
**Reviewer**: adversarial-reviews-agent
**Date**: 2026-07-01

## Score

- **Social Metadata**: 89 / 100

## ✅ Passed

- `og:title` is present on all 8 HTML pages:
  - index.html:18 — "Phlix — Remember. Celebrate. Live."
  - features.html:20 — "Features — Phlix"
  - clients.html:20 — "Clients — Phlix"
  - download.html:20 — "Download — Phlix"
  - hub.html:20 — "Hub — Phlix"
  - docs.html:20 — "Docs — Phlix"
  - plugins.html:20 — "Plugins — Phlix"
  - about.html:20 — "About — Phlix"
- `og:description` is present on all 8 pages with appropriate page-specific copy (not all identical — clients.html uses a shorter specific description, download.html uses "Install the server, grab a client, start streaming.", about.html uses "Self-hosted media. Open source. No lock-in.").
- `og:image` is present on all 8 pages using the absolute URL `https://detain.github.io/phlix-website/sites/dia-de-muertos/img/og.svg`.
- `og:url` is present on all 8 pages using the absolute canonical URL for each page (e.g., index.html:29 = `https://detain.github.io/phlix-website/sites/dia-de-muertos/`; features.html:31 = `.../features.html`, etc.).
- `og:type` is present on all 8 pages as `website`.
- `og:site_name` is present on all 8 pages as "Phlix".
- Twitter card `twitter:card = summary_large_image` is set on all 8 pages — meets the rubric requirement.
- `twitter:image` uses the same absolute URL as `og:image` on all 8 pages.
- `twitter:creator = @detain` is present on all 8 pages.
- JSON-LD `SoftwareApplication` block is present in index.html (lines 59–70) with all required fields:
  - `@context: "https://schema.org"` ✓
  - `@type: "SoftwareApplication"` ✓
  - `name: "Phlix"` ✓
  - `description` ✓ (full product description)
  - `applicationCategory: "MultimediaApplication"` ✓
  - `operatingSystem: "PHP 8.3+"` ✓
  - `offers: { "@type": "Offer", "price: "0", "priceCurrency: "USD" }` ✓
  - `license: "https://opensource.org/licenses/BSD-3-Clause"` ✓
- `og:image` at `viewBox="0 0 1200 630"` (img/og.svg:1) — correctly sized at the required 1200×630 pixels for social sharing.
- All metadata URLs use absolute `https://` URLs — no protocol-relative or relative paths.
- Canonical `<link rel="canonical">` is present on all 8 pages with absolute HTTPS URLs.
- Favicon is set via `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">` on all 8 pages.

## ⚠️ Concerns (non-blocking)

- JSON-LD `SoftwareApplication` block is only present on index.html, not on features.html, clients.html, download.html, hub.html, docs.html, plugins.html, or about.html. While it is reasonable to have it only on the home page (schema.org structured data applies to the site as a whole), the rubric does not specify "home page only" — it says "JSON-LD SoftwareApplication block." If this is intended to validate that every page is marked up as the software application, this is a gap. — Move the JSON-LD block to a template fragment that is included in all page headers.
- The `og:image` SVG file uses web fonts (Cinzel Decorative, Playfair Display, Lora, IBM Plex Sans) in its `<text>` elements (og.svg:64–111). When social media crawlers (Facebook, Twitter/X) render the OG image, they do not have access to these fonts — the text will fall back to system serif/sans-serif fonts, potentially breaking the intended layout. The Cinzel Decorative "Phlix" wordmark will render in Times New Roman or Georgia, and the IBM Plex Sans subtitle will render in a system fallback. — Either: (a) convert text elements to paths/outlines in the SVG so fonts are baked in, or (b) accept that social previews will render in fallback fonts. Option (a) is strongly recommended.

## ❌ Failures (must fix this round)

- **`hub.html`, `docs.html`, `plugins.html`, `about.html`** — These pages lack the JSON-LD `SoftwareApplication` structured data block entirely. The rubric requires "JSON-LD SoftwareApplication block" on the site, which is ambiguous about scope. However, best practice for multi-page sites is to include Application schema on every page or use a more specific `WebPage` schema per page. Since only index.html has JSON-LD, this is a partial coverage failure. — Add the JSON-LD block to all remaining pages, or consolidate into a site-wide include. The JSON-LD block from index.html:59–70 can be copied to each page's `<head>`.

## Recommendations

1. Copy the JSON-LD `SoftwareApplication` block from index.html to all other pages (features.html, clients.html, download.html, hub.html, docs.html, plugins.html, about.html) to ensure full site has structured data (impact: high, effort: low)
2. Convert text elements in `img/og.svg` to SVG `<path>` elements using a tool like `fantasticon` or `svg-to-font`, so the Phlix wordmark and tagline render correctly in social previews regardless of font availability (impact: high, effort: medium)
3. Add `twitter:site` (`@phlixapp` or similar) in addition to `twitter:creator` for completeness, if the project has an official Twitter/X account (impact: low, effort: low)

## Evidence

- OG tags on index.html: lines 17–32
- OG tags on features.html: lines 20–34
- OG tags on clients.html: lines 20–34
- OG tags on download.html: lines 20–31
- OG tags on hub.html: lines 20–31
- OG tags on docs.html: lines 20–31
- OG tags on plugins.html: lines 20–31
- OG tags on about.html: lines 20–31
- Twitter card on all pages: `<meta name="twitter:card" content="summary_large_image" />`
- OG image dimensions: `img/og.svg:1` — `viewBox="0 0 1200 630"`
- JSON-LD on index.html: lines 59–70
- Absolute URL pattern on og:url: index.html:29
- Canonical URLs on all pages: e.g., index.html:15
- Favicon on all pages: e.g., index.html:51
