# R2 — SEO

## Round 1 Fixes: VERIFIED

None of the Round 1 fixes were SEO-related (those were contrast, buttons, og:image, empty style). All 8 pages were checked for og:image reference to og.png — they all now reference og.png in meta tags (see social metadata for the og.png file existence issue).

---

## NEW ISSUES

### ❌ CRITICAL: og:image points to non-existent file

- **Severity:** Critical
- **Files:** All 8 pages `<meta property="og:image">`
- **Evidence:** `ls img/` confirms og.png does NOT exist — only og.svg is present. This means every social crawler that fetches og:image will get a 404.
- **Impact:** When shared on Facebook, LinkedIn, Slack, Twitter/X, the og:image preview will be broken. Google may also use og:image for rich snippets in some contexts.
- **Also:** Spec §11 requires og:image to be an absolute URL to a 1200×630 PNG. The spec explicitly says "Ship og.svg as the editable source if used, but reference a rasterized og.png in meta" — the rasterization step was never completed.

### ⚠️ Minor: `<title>` on home page is not page-specific

- **Severity:** Low
- **File:** index.html:6
- **Evidence:** `<title>Phlix — Your Library, Elevated.</title>` uses the brand tagline rather than a page-specific title. Spec §10 says "≤ 60 chars, page-specific (`<Page> — Phlix` / `Phlix — <tagline>`)" — the home page title `Phlix — Your Library, Elevated.` could be considered acceptable as the brand tagline page, but a more conventional home title would be `Phlix — Your Library, Elevated.` which this is. The other pages correctly use `Features — Phlix`, `Clients — Phlix`, etc. This is borderline — technically correct. Not a violation.

### ⚠️ Minor: JSON-LD only on home page (correct per spec)

- **Spec requirement:** JSON-LD SoftwareApplication on home page only. ✅ All other pages correctly omit it.

---

## WHAT'S WORKING

| Element | Evidence |
|---------|----------|
| `<title>` ≤ 60 chars all pages | index:31, features:6, clients:6, download:6, plugins:6, docs:6, hub:6, about:6 ✅ |
| `<meta name="description">` ≤ 160 chars | All within spec ✅ (longest: features description at 101 chars) |
| `<meta name="keywords">` present | All 8 pages ✅ |
| `<link rel="canonical">` absolute | All 8 pages ✅ |
| One `<h1>` per page | All 8 pages ✅ |
| Semantic heading hierarchy | h1 → h2/h3 ✅, no heading skip ✅ |
| Descriptive anchor text | All internal links use meaningful text ✅ |
| `<a rel="noopener noreferrer">` on external links | All GitHub/docs links ✅ |
| `sitemap.xml` exists and correct | sitemap.xml with all 8 pages, absolute URLs ✅ |
| `robots.txt` references sitemap | robots.txt:4 ✅ |
| JSON-LD on home page | index.html:31–46 ✅ |
| Keywords from content.json | meta keywords match content.json ✅ |

---

## TECHNICALLY ACCURATE EXTERNAL LINKS (verified)

| Link | URL | Status |
|------|-----|--------|
| Docs | https://detain.github.io/phlix-docs | ✅ |
| Server source | https://github.com/detain/phlix-server | ✅ |
| Plugin example | https://github.com/detain/phlix-plugin-example | ✅ |
| Hub | https://github.com/detain/phlix-hub | ✅ |
| GitHub org | https://github.com/detain | ✅ |

---

## SCORE: 70/100

| Factor | Score | Notes |
|--------|-------|-------|
| Title tags | 90 | All ≤60 chars; home title borderline acceptable |
| Meta description | 95 | All ≤160 chars, descriptive |
| Canonical URLs | 100 | All absolute ✅ |
| Headings | 100 | Correct hierarchy on all pages |
| Keywords | 95 | Present, relevant |
| Content structure | 100 | Lists, paragraphs, semantic HTML |
| sitemap.xml | 100 | All 8 pages present |
| robots.txt | 100 | Correct |
| JSON-LD | 100 | Home page correct |
| **og:image** | **0** | **File doesn't exist — complete failure** |
| External links | 100 | All correct |
| Overall | 70 | **og:image 404 is a critical failure** |

**Pass threshold: 80** — ❌ Does not pass.

### Required fix
1. **Create og.png** — rasterize og.svg at 1200×630px, save to img/og.png
