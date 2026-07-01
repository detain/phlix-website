# Social Metadata — marble-atrium

**Score: 85/100** — OG + Twitter complete on all 8 pages; absolute URLs correct; theme-color correct; twitter:creator=@detain correct. One definitive defect: og:image references SVG instead of required PNG.

## Findings

- **All 8 pages have complete OG metadata:**
  - `og:type=website` ✅
  - `og:site_name=Phlix` ✅
  - `og:url` absolute ✅
  - `og:title` ✅
  - `og:description` ✅
  - `og:image` absolute URL ✅ (but wrong format — see below)
- **All 8 pages have complete Twitter metadata:**
  - `twitter:card=summary_large_image` ✅
  - `twitter:title` ✅
  - `twitter:description` ✅
  - `twitter:image` absolute URL ✅
  - `twitter:creator=@detain` ✅ — correct per new_site.md §11 requirement.
- `index.html:28` ✅ `<meta name="theme-color" content="#B8960C">` — kit primary color.
- `index.html:11` ✅ `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">` — SVG favicon, matches `image/svg+xml` declared.
- `index.html:19` ❌ **`og:image = img/og.svg` — SVG file, not PNG as spec requires.** new_site.md §8 says "Ship og.svg as the editable source if used, but reference a rasterized **og.png** (1200×630) in meta." The meta references the SVG, not a rasterized PNG. Social media scrapers may handle SVG as og:image but not all do reliably — Twitter in particular prefers exact dimensions (1200×630) which a vector SVG doesn't provide in the same way. BUILD_LOG.md:90 acknowledges this as a known follow-up.
- `sitemap.xml` — All 8 pages with `og:image` meta set. The sitemap correctly includes all pages ✅.
- Per-page verification:
  - `features.html:18,23` ✅ og:image and twitter:image both absolute URLs pointing to `og.svg`.
  - `clients.html:18,23` ✅
  - `download.html:18,23` ✅
  - `plugins.html:18,23` ✅
  - `docs.html:18,23` ✅
  - `hub.html:18,23` ✅
  - `about.html:18,23` ✅
- All `og:url` values are correct absolute URLs per page ✅.

## Verdict

**Fail** — social metadata is otherwise complete and correct on all 8 pages, with proper absolute URLs, twitter:creator=@detain, and theme-color=#B8960C. The one definitive defect is og:image referencing SVG instead of the required PNG. This is a documented known issue. While SVG technically works as a URL, it doesn't meet the spec requirement for a 1200×630 rasterized PNG.
