# SEO

**Score: 72/100**  
**Severity: ⚠️**

## Findings

### ❌ CRITICAL: Home page title deviates from spec title format (index.html:6)
Title is "Phlix — Your media. Your library. Your Phlix." The spec (§10) requires title format "Phlix — [tagline]" using the page's own tagline. The hero H1 uses brand `tagline_primary` instead of `content.json` hero.headline. The title should be "Phlix — Every Story Deserves a Grand Entrance" (the tagline_primary), not the hero headline text.

Additionally, this title contains the product name twice ("Phlix" and "Your Phlix" at end), which is redundant. Title format on interior pages ("Features — Phlix", "Clients — Phlix", etc.) is correct.

**Fix:** Set title to `tagline_primary` for home: "Every Story Deserves a Grand Entrance — Phlix" OR use a proper site tagline if one exists.

### ⚠️ WARNING: og:image is SVG, not the required 1200×630 PNG (index.html:38–40, sitemap.xml)
All pages reference `og:image` as `https://detain.github.io/phlix-website/bollywood-dreams/img/og.svg`. The spec (§8) requires `og.png (1200×630)` and says "Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** in meta."

`og.svg` is a valid vector but Twitter and many crawlers expect a raster image for `summary_large_image` cards. The sitemap.xml `image:loc` also references og.svg.

**Fix:** Generate a 1200×630 PNG raster version of og.svg; update all `og:image` meta tags and sitemap.xml to point to `img/og.png`.

### ⚠️ WARNING: og:description is identical across all 8 pages
Every page carries the same 160-character description from `content.json.meta.description`. While technically within spec, page-specific meta descriptions (e.g., unique to features, clients, download) would be better SEO practice.

**Fix:** This is acceptable per spec, but note for future improvement.

## What Passed

- ✅ All page titles ≤60 characters (Home: 47 chars, Features: 16, Clients: 15, Download: 17, Plugins: 15, Docs: 12, Hub: 11, About: 13)
- ✅ All meta descriptions exactly 160 chars from content.json
- ✅ `<meta name="keywords">` present on all pages from content.json keywords
- ✅ `<link rel="canonical">` present on all 8 pages with absolute URLs
- ✅ One `<h1>` per page: home (hero H1), features (page-header H1), clients (page-header H1), download (page-header H1), plugins (page-header H1), docs (page-header H1), hub (page-header H1), about (page-header H1)
- ✅ Semantic heading hierarchy: h1 → h2 → h3, no skipped levels
- ✅ Descriptive anchor text throughout (no "click here", no bare URLs as link text)
- ✅ JSON-LD SoftwareApplication on home page (index.html:67–82): name, description, applicationCategory, operatingSystem, offers/price=0, license all present
- ✅ sitemap.xml present with all 8 pages, absolute canonical URLs, weekly/monthly changefreq, proper priorities
- ✅ robots.txt present and references the sitemap at the correct absolute URL
- ✅ `og:type=website`, `og:site_name=Phlix` on all pages
- ✅ `og:url` is absolute on all pages
- ✅ `twitter:card=summary_large_image` on all pages
- ✅ `twitter:creator=@detain` on all 8 pages
