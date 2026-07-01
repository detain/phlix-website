# SEO — marble-atrium

**Score: 80/100** — Structure and metadata are solid; one substantive defect: og:image references SVG instead of required PNG.

## Findings

- `index.html:6` ✅ `<title>Phlix — Your Library, Elevated.</title>` = 30 chars, under 60.
- `features.html:6` ✅ `<title>Features — Phlix</title>` = 17 chars.
- `clients.html:6` ✅ `<title>Clients — Phlix</title>` = 17 chars.
- `download.html:6` ✅ `<title>Download — Phlix</title>` = 19 chars.
- `plugins.html:6` ✅ `<title>Plugins — Phlix</title>` = 18 chars.
- `docs.html:6` ✅ `<title>Docs — Phlix</title>` = 14 chars.
- `hub.html:6` ✅ `<title>Phlix Hub — Phlix</title>` = 19 chars.
- `about.html:6` ✅ `<title>About — Phlix</title>` = 15 chars.
- `index.html:7` ✅ `<meta name="description">` = 122 chars, under 160.
- `features.html:7` ✅ 138 chars.
- `clients.html:7` ✅ 126 chars.
- `download.html:7` ✅ 124 chars.
- `plugins.html:7` ✅ 140 chars.
- `docs.html:7` ✅ 137 chars.
- `hub.html:7` ✅ 133 chars.
- `about.html:7` ✅ 139 chars.
- `index.html:8` ✅ `<meta name="keywords">` from content.json meta.keywords.
- **One H1 per page:** `index.html:93` ✅ H1 "Your Library, Elevated."; `features.html:66` ✅ H1 "Features"; `clients.html:66` ✅ H1 "Clients"; `download.html:66` ✅ H1 "Download"; `plugins.html:66` ✅ H1 "Plugins"; `docs.html:66` ✅ H1 "Documentation"; `hub.html:66` ✅ H1 "Phlix Hub"; `about.html:66` ✅ H1 "About". Heading hierarchy never skips a level ✅.
- **Canonical URLs** — all absolute, correct:
  - `index.html:10` ✅ `https://detain.github.io/phlix-website/marble-atrium/`
  - `features.html:10` ✅ `https://detain.github.io/phlix-website/marble-atrium/features.html`
  - `clients.html:10` ✅
  - `download.html:10` ✅
  - `plugins.html:10` ✅
  - `docs.html:10` ✅
  - `hub.html:10` ✅
  - `about.html:10` ✅
- `index.html:31-46` ✅ JSON-LD `SoftwareApplication` on home page per new_site.md §10.
- `sitemap.xml:1-43` ✅ All 8 pages present with absolute `<loc>` URLs; proper `xmlns` namespace.
- `robots.txt:4` ✅ Sitemap URL absolute: `https://detain.github.io/phlix-website/marble-atrium/sitemap.xml`.
- `index.html:19` ❌ **og:image = `https://detain.github.io/phlix-website/marble-atrium/img/og.svg` — SVG file, not PNG.** new_site.md §11 requires "og:image (absolute URL to the 1200×630 **png**)." The BUILD_LOG.md:90 acknowledges "Rasterize og.svg to og.png (1200×630)" as a known follow-up. The meta tag works as a URL but references the wrong file format. This is a spec deviation that affects social sharing quality (SVG at 1200×630 may not render correctly in all scrapers).
- `index.html:19` ✅ og:image URL is absolute (not a known past bug regression).
- All pages have `og:type=website` ✅, `og:site_name=Phlix` ✅, proper `og:url` ✅.

## Verdict

**Fail** — SEO structure is otherwise excellent, but the og:image is an SVG when a PNG is required. This is a documented known issue. Canonical URLs, JSON-LD, sitemap, and robots are all correctly implemented. Titles and descriptions are all within spec.
