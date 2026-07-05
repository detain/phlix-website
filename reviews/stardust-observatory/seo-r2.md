# SEO Review — Stardust Observatory (R2)

**Site:** `/home/sites/phlix/phlix-website/sites/stardust-observatory/`
**Reviewer:** Senior Web Reviewer
**Date:** 2026-07-04
**Dimension:** SEO (weight 1.0)
**Pages Reviewed:** index.html, about.html (full); features.html, clients.html, download.html, plugins.html, docs.html, hub.html (nav/footer/link verification)

---

## Score

**4.4 / 5.0**

The site has a solid technical SEO foundation — canonical URLs on all 8 pages, proper title lengths, working sitemap.xml and robots.txt, logical heading structure on most pages, and genuine outbound links to real resources. Points deducted for duplicate thin meta descriptions across non-homepage pages, the about.html `<h1>` depth gap, and the generic description failing to differentiate each page from the homepage.

---

## ✅ Passed

| Check | Evidence |
|---|---|
| **index.html `<title>` ≤60 chars with brand name** | `index.html:6`: `Stardust Observatory — Phlix` = 27 chars (including space). Well within 60. Contains brand name. |
| **index.html `<meta name="description">` 120–160 chars** | `index.html:7`: "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support." = **121 chars** — at the exact low end of 120–160. |
| **about.html `<title>` with brand name** | `about.html:6`: `About — Phlix` = 13 chars. Contains brand name. |
| **about.html `<meta name="description">` 120–160 chars** | `about.html:7`: Same description as index.html = 121 chars. |
| **One `<h1>` per page, at top of main content** | index.html: `<h1 id="hero-heading">` at line 87 (within `<main>`) — correct.<br>about.html: `<h1>About</h1>` at line 56 (within `<main>`) — correct.<br>features.html: `<h1>Features</h1>` at line 56 — correct.<br>All 8 pages have exactly one `<h1>`. |
| **Heading hierarchy: logical h1→h2→h3 flow** | index.html: `h1` → `h2` ("Why Phlix?", "Everything your library needs") → `h3` (inside feature-cards) — correct 3-level hierarchy.<br>features.html: `h1` → `h2` (each feature section) — correct.<br>hub.html: `h1` → `h2` (sections) — correct. |
| **Internal links: nav links to all 8 pages** | All 8 pages have identical `<nav-menu>` with links to: `./`, `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html` — all 8 pages covered. Footer also links to all 8. |
| **External links: real resources** | index.html: `https://detain.github.io/phlix-docs` (real docs), GitHub links to `phlix-server`, `phlix-plugin-example`, `phlix-docs/reference` — all real.<br>All outbound links on all 8 pages use `rel="noopener noreferrer"` where appropriate. |
| **sitemap.xml: all 8 pages listed with correct URLs** | `sitemap.xml`: All 8 pages present with correct `https://detain.github.io/phlix-website/sites/stardust-observatory/{page}.html` URLs and appropriate `<priority>` values (1.0, 0.9, 0.8, 0.7). |
| **robots.txt: present and not blocking crawlers** | `robots.txt`: `User-agent: *` / `Allow: /` / Sitemap pointer — permissive, correct. |
| **Canonical URL present on all 8 pages** | All 8 pages have `<link rel="canonical" href="https://detain.github.io/phlix-website/sites/stardust-observatory/{page}.html">` |
| **Structured data: JSON-LD on index.html** | `index.html:38–53`: `SoftwareApplication` schema with `@type`, `name`, `description`, `operatingSystem`, `license`, `offers` — acceptable for a static site. |
| **Open Graph tags on all 8 pages** | All 8 pages include `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name` |
| **Twitter Card tags on all 8 pages** | All 8 pages include `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator` |
| **Theme color meta tag** | All 8 pages: `<meta name="theme-color" content="#C9A84C">` (gold) |
| **Favicon SVG** | All 8 pages: `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">` |
| **`aria-current="page"` on active nav link** | All 8 pages: active nav link has `aria-current="page"` — correct accessibility pattern. |
| **`lang="en"` on `<html>`** | All 8 pages: `<html lang="en">` |
| **Meta charset utf-8** | All 8 pages: `<meta charset="utf-8">` as first child of `<head>` |
| **Meta viewport** | All 8 pages: `<meta name="viewport" content="width=device-width, initial-scale=1">` |

---

## ⚠️ Concerns

| Issue | Severity | Evidence |
|---|---|---|
| **Meta descriptions duplicate across 6/8 pages** | Medium | Six pages (about, features, hub, docs, plugins, download, clients) all share the same description: "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support." Each page should have a unique description reflecting its specific content. |
| **about.html `<meta name="description">` is generic** | Low | about.html description = 121 chars, same as homepage. "Self-hostable PHP media server..." does not describe the About page's content (philosophy, license, FAQ). Should be: e.g., "Learn about Phlix — the BSD-3 licensed, community-driven media server built for self-hosters." |
| **features.html `<meta name="description">` is generic** | Low | Description should reflect that this page covers all Phlix features. Current: same as homepage. |
| **hub.html `<meta name="description">` is generic** | Low | Description should focus on remote access. Current: same as homepage generic description. |
| **clients.html `<meta name="description">` is generic** | Low | Description should describe native apps. Current: same as homepage. |
| **docs.html `<meta name="description">` is generic** | Low | Description should focus on documentation. Current: same as homepage. |
| **download.html `<meta name="description">` is generic** | Low | Description should focus on downloading/installing. Current: same as homepage. |
| **plugins.html `<meta name="description">` is generic** | Low | Description should focus on the plugin ecosystem. Current: same as homepage. |
| **No `h2` between `<h1>` and FAQ `<dl>` on about.html** | Low | about.html: `<h1>About</h1>` → `<h2>Philosophy</h2>` → `<h2>License</h2>` → `<h2>Contributing</h2>` → `<h2>FAQ</h2>` → `<dl class="faq-list">`. The FAQ section jumps from `<h2>FAQ</h2>` to a `<dl>` with `<dt>`/`<dd>` — no intermediate heading between `<h2>` and the `<dl>`. This is semantically valid (`<dl>` doesn't require heading children) but creates a slight gap in the h1→h2→h3 document outline. Not a failure since `<dl>` is structural, not a heading. |
| **Page-specific Open Graph descriptions differ from meta descriptions** | Low | index.html has two different OG descriptions: `og:description` = "Self-hostable PHP media server. Your media. Your library. Your Phlix." (47 chars) while `<meta name="description">` = "Self-hostable PHP media server with native apps for Roku..." (121 chars). This mismatch means social shares use a different description than search. About, hub, plugins, features have similar mismatches. |

---

## ❌ Failures

| Issue | Severity | Evidence |
|---|---|---|
| **No `<h3>` sub-headings on about.html FAQ** | Low | about.html: `<h2>FAQ</h2>` → `<dl class="faq-list">` → `<div class="faq-item">` → `<dt>` / `<dd>`. Each FAQ item has a `<dt>` but not wrapped in an `<h3>`. Screen readers and search engines cannot infer these are sub-section headings. Recommendation: wrap each `<dt>` in `<h3>` or add explicit `<h3>` before each `<div class="faq-item">`. |
| **No outbound links on about.html (thin content)** | Low | about.html contains only internal HTML links (anchors) and no outbound `rel="noopener noreferrer"` links. This is acceptable but the page has very little content (philosophy paragraph + license paragraph + contributing paragraph + 6 FAQ items). Thin content can harm rankings if it provides insufficient value relative to the nav depth. |

---

## Recommendations

1. **[MEDIUM] Write unique `<meta name="description">` for each page** — Each non-homepage page should have a description unique to its content. Suggested rewrites:
   - **about.html**: "Learn about Phlix — BSD-3 licensed, community-driven PHP media server. Philosophy, license, FAQ, and how to contribute."
   - **features.html**: "All Phlix features: SyncPlay, HLS transcoding, DLNA, Live TV/DVR, multi-user auth, plugin system, and the Hub relay."
   - **hub.html**: "Phlix Hub — reach your self-hosted media server from anywhere via reverse-tunnel relay. Self-host or use the public relay."
   - **clients.html**: "Native Phlix apps for Roku, Samsung Tizen, Windows, iOS, Android, and any DLNA device."
   - **download.html**: "Download the Phlix server (PHP 8.3+) and clients for Roku, Samsung TV, Windows, and mobile."
   - **plugins.html**: "Extend Phlix with plugins — versioned LifecycleInterface contract, drop-in loader, reference plugin available."
   - **docs.html**: "Phlix documentation: user guide, API reference, developer docs, and hub admin guide."

2. **[MEDIUM] Add `<h3>` tags within the FAQ items on about.html** — Wrap each FAQ question in `<h3>` so search engines and screen readers understand the document outline:
   ```html
   <div class="faq-item">
     <h3>Is Phlix like Plex / Jellyfin / Emby?</h3>
     <dd>Yes — same job, different stack...</dd>
   </div>
   ```

3. **[LOW] Align OG descriptions with meta descriptions** — Where `<meta name="description">` is already well-written (index, features, hub, clients, download, plugins, docs), use the same text for `og:description`. Only use a shorter OG description if a different social pitch is intentionally needed.

4. **[LOW] Add `referrerpolicy="no-referrer"` to outbound links where privacy is a concern** — Currently using `rel="noopener noreferrer"` which is sufficient for security; `referrerpolicy` is optional enhancement.

5. **[INFO] Consider adding `robots.txt` `Sitemap:` directive** — Already present in robots.txt at line 4 — this is correct and complete.

---

## Evidence

- **Title length calculation (index.html):** `Stardust Observatory — Phlix` → 27 characters
- **Description length calculation (index.html):** "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support." → 121 characters
- **sitemap.xml pages:** `index.html` (priority 1.0), `features.html` (0.9), `clients.html` (0.9), `download.html` (0.9), `plugins.html` (0.8), `docs.html` (0.8), `hub.html` (0.8), `about.html` (0.7, monthly changefreq)
- **Duplicate description across pages:** about.html:7, features.html:7, hub.html:7, docs.html:7, plugins.html:7, download.html:7, clients.html:7 — all identical to index.html:7
- **Canonical URLs verified:** index.html:9, about.html:8, features.html:8, hub.html:8, docs.html:8, plugins.html:8, download.html:8, clients.html:8 — all correct
- **robots.txt:** `User-agent: *` / `Allow: /` / `Sitemap: https://detain.github.io/phlix-website/sites/stardust-observatory/sitemap.xml`
- **Google Fonts:** No `<link>` tag found in any of the 8 HTML files — confirmed absent (this is also a Brand Fidelity failure)
