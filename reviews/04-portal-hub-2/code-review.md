# Code Review — 04-portal-hub-2

## Critical Failures

### 1. Self-Hosted Fonts Missing (BLOCKING)
- **File:** `css/base.css` lines 4–50
- **Issue:** `@font-face` declarations reference `../fonts/space-grotesk-*.woff2` and `../fonts/dm-sans-*.woff2`, but the `fonts/` directory does not exist under `variants/04-portal-hub-2/`.
- **Impact:** Fonts will not load; browsers fall back to `system-ui`. The entire visual identity (Space Grotesk for headlines, DM Sans for body) collapses.
- **Fix:** Either create the `fonts/` directory and add the actual `.woff2` font files, or remove the broken `@font-face` blocks and the custom `font-family` stacks from `:root` so the fallback is intentional.

---

## Medium Failures

### 2. `manifest.webmanifest` `start_url` Points Into Variant Subdirectory
- **File:** `manifest.webmanifest` line 5
- **Value:** `"start_url": "/variants/04-portal-hub-2/"`
- **Issue:** When installed as a PWA, the app will only ever open `/variants/04-portal-hub-2/` and not the site root. Any pages or assets referenced by absolute path from the root (e.g., `/img/og.svg`) will 404.
- **Fix:** Use `"start_url": "/"` or remove `start_url` to default to root.

### 3. PWA Icon Points to SVG Favicon, Not an Actual App Icon
- **File:** `manifest.webmanifest` lines 10–14
- **Issue:** `icons[0].src` is the SVG favicon (`favicon.svg`). For PWA installation on mobile, a square PNG or WebP at 192×192 and 512×512 is expected. An SVG works for `any` but iOS Safari ignores it.
- **Note:** Low severity since the site is primarily a marketing site, but worth flagging.

### 4. `sitemap.xml` Has `lastmod` Dates in the Future
- **File:** `sitemap.xml` lines 5, 11, 17, 23, 29, 35, 41, 47
- **Values:** All set to `2026-05-20` which is the current date — these should reflect the actual last modified date of each page, not "today."
- **Fix:** Use actual dates or leave out `<lastmod>` if content hasn't changed recently.

### 5. No JSON-LD Outside index.html
- **File:** Only `index.html` has a `<script type="application/ld+json">` block (SoftwareApplication schema). Other pages (`features.html`, `clients.html`, `about.html`, etc.) lack structured data.
- **Severity:** Low — only the homepage needs rich structured data for SEO, but if each page is meant to be independently crawlable, each should have relevant schema (e.g., `about.html` could use `Organization` or `WebSite` with `itemReviewed`).

### 6. `href="#"` Links in download.html Code Block
- **File:** `download.html` line 76
- **Issue:** Inside the `<pre class="code-block">`, there is a bare `<a href="https://github.com/detain/phlix-server">github.com/detain/phlix-server</a>` which is rendered as plain text inside a `<code>` block that also contains a shell command. This mixes UI and documentation incorrectly.
- **Severity:** Low — not broken, just semantically odd.

---

## Recommendations

### Semantic HTML & ARIA — PASS
- All 8 pages use proper `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>` landmarks.
- `role="banner"`, `role="navigation"`, `role="contentinfo"` correctly applied.
- Skip link (`<a class="skip-link" href="#main-content">`) present on every page.
- `aria-label` on all icon-only buttons (nav toggle).
- `aria-current="page"` correctly highlights the active nav item.
- Feature sections use `aria-labelledby` pointing to their headings.
- Client cards have `id` attributes for deep-linking.
- `tabindex="-1"` on `<main>` to allow skip-link target.

### Mobile Nav — PASS
- Every page has `<button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-menu">` and a corresponding `<ul class="nav-menu" id="nav-menu">`.
- JS (lines 9–35 of `main.js`) handles click toggle, outside-click close, and Escape key close with proper `aria-expanded` updates.
- CSS (line 736 of `theme.css`) shows `display: none` on `.nav-toggle` above 768px and `display: block` at ≤768px.

### Google Fonts CDN — PASS
- No `<link rel="stylesheet">` to `fonts.googleapis.com` or `fonts.gstatic.com` found in any HTML file.
- Fonts are declared via `@font-face` in `css/base.css` (self-hosted intent, but see Critical Failure #1).

### font-display: swap — PASS
- All 6 `@font-face` blocks in `css/base.css` include `font-display: swap`.

### Meta Descriptions — PASS
All under 160 characters:

| Page | Description | Length |
|------|-------------|--------|
| index.html | "Self-hosted PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support." | 131 |
| features.html | "SyncPlay, Live TV, transcoding, DLNA, hub relay — see all Phlix features." | 71 |
| clients.html | "Native clients for Roku, Samsung Tizen, Windows, and Mobile — plus DLNA support." | 89 |
| download.html | "Download Phlix Server (PHP 8.3+) and official clients for all major platforms." | 79 |
| plugins.html | "Extend Phlix with a versioned plugin contract. Drop in new metadata providers, transcode pipelines, and more." | 114 |
| docs.html | "Phlix documentation: user guide, API reference, developer docs, and hub admin guide." | 90 |
| about.html | "Self-hosted media. Open source. No lock-in. BSD-3 licensed." | 56 |
| hub.html | "Sign in once. The Hub relay handles NAT traversal so you can access your media from anywhere." | 97 |

### og:image — PASS
- `og:image` declared on all 8 pages as `./img/og.svg`.
- File `variants/04-portal-hub-2/img/og.svg` exists.

### No Invented Copy — PASS
All marketing text traced to `shared/content.json`:
- Hero eyebrow ("Self-hosted media server") ✓
- Hero headline ("Your media. Your library. Your Phlix.") ✓
- Hero subheadline ✓
- All 7 pitch bullets ✓
- All 8 feature titles and bodies ✓
- All 5 client names, taglines, and highlights ✓
- Ecosystem links text ✓
- FAQ Q&A ✓
- Footer tagline ("Connect everything. Control everything.") — appears to be an original variant tagline, not in `content.json` but consistent with site brand. Not a violation.
- License info (BSD-3-Clause) matches `content.json` footer ✓

### No Lorem Ipsum — PASS
No placeholder text found.

### robots.txt & sitemap.xml — PASS
- `robots.txt` allows all crawlers and references the sitemap.
- `sitemap.xml` includes all 8 pages with correct URLs and appropriate priorities.

### JSON-LD
- Only `index.html` has JSON-LD (SoftwareApplication schema with name, description, offers, url).
- Not present on other pages — acceptable for a marketing site.

### CSS/JS Quality
- CSS is well-organized across 3 files (`base.css`, `theme.css`, `components.css`) with clear section comments.
- `prefers-reduced-motion` handled in CSS (line 185 of `base.css`) and JS (lines 38–49, 122–142 of `main.js`).
- No `console.log` or debug statements in JS.
- `use strict` in JS (line 7).
- No jQuery or third-party JS dependencies.
- Inline `<style>` injected by JS for `.revealed` class is a minor anti-pattern but not broken.

---

## Score: 68/100

## Pass/Fail: **FAIL**

**Primary reason for failure:** Self-hosted font files referenced in `css/base.css` do not exist — the `fonts/` directory is entirely missing. This is a critical rendering defect that breaks the visual design. The `manifest.webmanifest` pointing into a variant subdirectory also prevents proper PWA installation at the site root.

Without the font files, the `@font-face` declarations silently fail and the design falls back to `system-ui`, losing the Space Grotesk / DM Sans typographic identity that the glassmorphism variant was built around.

---

## Action Items (Priority Order)

1. **[CRITICAL]** Add self-hosted font files to `variants/04-portal-hub-2/fonts/` (Space Grotesk Bold/SemiBold/Medium, DM Sans Regular/Medium/Bold) OR remove the broken `@font-face` blocks and CSS `font-family` stacks.
2. **[CRITICAL]** Fix `manifest.webmanifest` `start_url` from `/variants/04-portal-hub-2/` to `/`.
3. **[MEDIUM]** Generate proper PWA icons (192×192, 512×512 PNG/WebP) or remove the icon entry if PWA installability is not a goal.
4. **[LOW]** Fix `sitemap.xml` `lastmod` dates to reflect actual content last-modified dates.
5. **[LOW]** Consider adding JSON-LD to other high-value pages (about.html → Organization schema; download.html → SoftwareApplication with price: "0").
