# Social Metadata — Cottagecore Bloom

**Dimension:** Social metadata
**Score:** 72/100
**Severity:** ⚠️

---

## Summary

OG and Twitter Card metadata is present on all 8 pages with complete fields. All URLs are absolute. The site correctly uses `og:type=website`, `og:site_name=Phlix`, and `twitter:card=summary_large_image` with `@detain` as the creator. The known pre-existing issue: meta tags reference `img/og.svg` (SVG) but `new_site.md §8` specifies `og.png` (1200×630 raster). This is a spec misalignment — OG crawlers prefer the PNG format; SVG may work but is not the recommended format.

---

## Findings

### ✅ Correct implementations

**OG tags complete** — All pages include: `og:title`, `og:description`, `og:image`, `og:url`, `og:type=website`, `og:site_name=Phlix`. ✓

**OG URLs absolute** — `og:url` on all pages uses full absolute URL (e.g., `https://detain.github.io/phlix-website/cottagecore-bloom/`). Not relative. ✓

**OG image URL absolute** — `og:image` on all pages uses `https://detain.github.io/phlix-website/cottagecore-bloom/img/og.svg`. Absolute URL. ✓

**Twitter Card complete** — All pages include `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:creator=@detain`. ✓

**Twitter image URL absolute** — `twitter:image` on all pages uses absolute URL to `img/og.svg`. ✓

**Canonical URL absolute** — `<link rel="canonical">` on all pages uses absolute URL. ✓

**`theme-color` set** — `<meta name="theme-color" content="#C8556A">` on all pages. ✓

**Favicon SVG link** — `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">` on all pages. ✓

### ❌ Violations

**og:image references SVG instead of PNG** — `new_site.md §8` states: "Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** (1200×630) in meta." The meta tags across all 8 pages use `img/og.svg` in the `og:image` and `twitter:image` attributes:
- `index.html:13`: `<meta property="og:image" content="https://detain.github.io/phlix-website/cottagecore-bloom/img/og.svg">`
- Same on features.html:12, clients.html:20, download.html:20, plugins.html:20, docs.html:20, hub.html:20, about.html:20

The `img/` directory contains `og.svg` but no `og.png`. While Facebook and Twitter both support SVG for `og:image` in modern crawlers, the Open Graph specification was written for raster images and some scrapers (particularly older bots, LinkedIn, and Pinterest) may not handle SVG properly. The spec requirement for a 1200×630 PNG is not met.

- **Fix:** Either (a) update meta tags to point to an actual `og.png` file (1200×630 rasterized version of `og.svg`), or (b) if keeping SVG, update `new_site.md` to explicitly allow `og.svg` for brand-kit sites where no raster asset is generated. Per the known pre-existing issue, this is already acknowledged — the `og.svg` IS present, just not the PNG.

### ⚠️ Notes

**og:image dimensions** — `og.svg` as a vector file doesn't have intrinsic pixel dimensions. Social platform scrapers will attempt to render it, but the lack of a fixed 1200×630 canvas means the rendered size depends on the viewer's parsing. An SVG with a `viewBox="0 0 1200 630"` and explicit width/height attributes should render correctly at the right size. If `og.svg` has these attributes set correctly, this is acceptable.

**og:description identical on all pages** — All 8 pages use the same 133-char description from `content.json`. This is valid but suboptimal for social sharing — each page should ideally have page-specific social copy.

---

## Verdict

Social metadata infrastructure is complete and all URLs are absolute. The main defect is the `og:image` SVG/Png mismatch with the spec requirement, which is the known pre-existing issue.
