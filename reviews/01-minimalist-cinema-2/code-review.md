# Code Review — 01-minimalist-cinema-2

## Critical Failures
| Check | Result | Evidence |
|--------|---------|----------|
| Google Fonts CDN | **PASS** | No `fonts.googleapis.com` or `fonts.gstatic.com` links found. All fonts (Cormorant Garamond, Karla) are self-hosted via `@font-face` in `base.css` pointing to `../fonts/` directory. |
| No invented copy | **FAIL** | Several pages contain marketing text not present in `shared/content.json`:<br><br>**about.html**: "Built by developers, for developers." — invented<br>**about.html**: Full "The Story", "Philosophy" sections — invented content not in content.json<br>**download.html**: "Self-host your media in minutes. Runs on any PHP 8.3+ server." — invented<br>**download.html**: System requirements copy ("Workerman 5.x for async processing", "For transcoding and media processing", "Raspberry Pi, NAS, VPS, or bare metal") — invented<br>**download.html**: "Phlix is open-source and free forever." — invented<br>**hub.html**: "Your servers, accessible from anywhere." — invented<br>**hub.html**: "Two Options" section with "Public Hub" / "Self-Hosted" cards — invented<br>**hub.html**: "Try the public Hub" CTA — invented<br>**plugins.html**: "Extend Phlix with a versioned plugin contract." — invented<br>**plugins.html**: "What Can You Build?" section with metadata providers, transcoding profiles, new features — invented<br>**plugins.html**: "Build something great" CTA — invented<br>**docs.html**: "Everything you need to know about running Phlix." — invented<br>**features.html**: "Everything you need to run a media library that actually works." — invented<br>**features.html**: "Get started in minutes" CTA — invented<br>**clients.html**: "Native apps and zero-install options for every screen you own." — invented<br>**clients.html**: "Ready to watch?" CTA — invented<br>**about.html**: "Yes — same job, different stack..." FAQ answer diverges slightly from content.json (content.json: "Yes — same job, different stack. Phlix is built in PHP 8.3+ on Workerman...") — matches, but additional text added |
| Mobile nav present | **PASS** | All 8 HTML pages have hamburger nav-toggle button with `aria-controls="nav-menu"`, `aria-expanded="false"`. `main.js` handles open/close, focus trap, escape key, and resize close. |
| Meta descriptions | **PASS** | All 8 pages have meta descriptions under 160 characters:<br>index.html: 125 chars<br>about.html: 127 chars<br>hub.html: 116 chars<br>docs.html: 110 chars<br>plugins.html: 145 chars<br>download.html: 125 chars<br>clients.html: 112 chars<br>features.html: 127 chars |
| og:image file exists | **PASS** | All pages reference `./img/og.svg`. File exists at `variants/01-minimalist-cinema-2/img/og.svg`. |

## Medium Failures
| Check | Result | Evidence |
|--------|---------|----------|
| Semantic HTML | **PASS** | All pages use proper `header`/`main`/`nav`/`footer` structure. h1-h6 hierarchy is correct (h1 on each page, h2 for sections, h3 for cards/items). |
| ARIA labels on interactive elements | **PASS** | `nav-toggle` has `aria-label="Toggle navigation"`, `aria-expanded="false"`, `aria-controls="nav-menu"`. FAQ buttons have `aria-expanded`. Links use `aria-label` where helpful. |
| JSON-LD structured data | **PASS** | `index.html` has JSON-LD `SoftwareApplication` schema with name, description, offers, sameAs. Other pages don't need it. |
| sitemap.xml present | **PASS** | `sitemap.xml` exists and is valid XML with all 8 pages, proper `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"` namespace, priorities and changefreqs set. |
| robots.txt present | **PASS** | `robots.txt` exists with `User-agent: *` and `Sitemap:` directive. |
| manifest.webmanifest present | **PASS** | `manifest.webmanifest` exists and is valid PWA manifest with name, short_name, description, start_url, display, background_color, theme_color, icons. |
| font-display: swap on @font-face | **PASS** | All 5 `@font-face` declarations in `base.css` include `font-display: swap`. |
| No Lorem ipsum | **PASS** | No Lorem ipsum or placeholder text found anywhere in the codebase. |
| Self-hosted fonts exist in fonts/ | **PASS** | All 5 font files exist:<br>`cormorant-garamond-700.woff2`<br>`cormorant-garamond-600.woff2`<br>`karla-400.woff2`<br>`karla-500.woff2`<br>`karla-700.woff2` |

## Recommendations
1. **Create a content.json mapping for all pages** — The about, hub, plugins, docs, features, and clients pages all have substantial body copy that should come from a structured source (content.json or similar). Currently only the homepage hero, pitch bullets, feature cards, and footer match the authorized content.json.

2. **Consider moving all meta descriptions to content.json** — The `meta.description` field in content.json is the authoritative version. Some pages (e.g., about.html uses a custom description not in content.json).

3. **Page title consistency** — `index.html` uses "Phlix — Stream what you love. Own what you stream." which is a tagline, not the site name + page context. Consider aligning with other pages that use "PageName — Phlix" format.

## Score: 75/100

The variant is well-built technically (semantic HTML, ARIA, responsive nav, self-hosted fonts, proper manifest/sitemap/robots) but has significant copy drift — several pages contain invented marketing text that doesn't exist in `shared/content.json`.

## Pass/Fail: **FAIL**

**Reason**: The "No invented copy" critical check fails. Only the homepage (index.html) strictly adheres to shared/content.json. Pages like about.html, download.html, hub.html, plugins.html, docs.html, features.html, and clients.html all contain marketing copy invented at build time that does not appear in shared/content.json.
