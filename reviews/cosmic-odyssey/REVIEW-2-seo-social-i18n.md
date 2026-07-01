# Review: SEO + Social Metadata + Localization
# Site: sites/cosmic-odyssey/

## SEO
Score: 80/100 | Severity: ⚠️

**PASS (per-page)**

| Page | `<title>` | Len | `<meta name="description">` | Len | `<link rel="canonical">` | H1 | JSON-LD |
|------|-----------|-----|-----------------------------|-----|------------------------|----|---------|
| index.html:6 | `Phlix — Every Story, An Infinite Horizon.` | 43 | ✅ | 136 | ✅ index.html:9 | ✅ index.html:91 | ✅ index.html:33 |
| features.html:6 | `Features — Phlix` | 18 | ✅ | 136 | ✅ features.html:8 | ✅ features.html:68 | N/A |
| clients.html:6 | `Clients — Phlix` | 16 | ✅ | 136 | ✅ clients.html:8 | ✅ clients.html:68 | N/A |
| download.html:6 | `Download — Phlix` | 18 | ✅ | 136 | ✅ download.html:8 | ✅ download.html:68 | N/A |
| plugins.html:6 | `Plugins — Phlix` | 17 | ✅ | 136 | ✅ plugins.html:8 | ✅ plugins.html:68 | N/A |
| docs.html:6 | `Docs — Phlix` | 14 | ✅ | 136 | ✅ docs.html:8 | ✅ docs.html:68 | N/A |
| hub.html:6 | `Hub — Phlix` | 13 | ✅ | 136 | ✅ hub.html:8 | ✅ hub.html:68 | N/A |
| about.html:6 | `About — Phlix` | 15 | ✅ | 136 | ✅ about.html:8 | ✅ about.html:68 | N/A |

All titles ≤ 60 chars; all descriptions ≤ 160 chars; all canonicals absolute; one H1 per page; unbroken heading hierarchy h1→h2→h3 throughout. JSON-LD only required on home page (index.html:33-49) and is correctly formed with name, description, applicationCategory, operatingSystem, offers/price=0, license. sitemap.xml contains all 8 pages with absolute canonical URLs. robots.txt references the sitemap. Descriptive anchor text throughout — no "click here" or bare URLs found.

**DEFECTS**

1. **`og:image` points to SVG instead of required PNG** — new_site.md §8 requires `og.png (1200×630)` as the required asset, with `og.svg` as optional editable source. new_site.md §11 social meta requires og:image to be "absolute URL to the 1200×630 png." Every page's og:image meta (e.g. index.html:14, features.html:13, clients.html:13, download.html:13, plugins.html:13, docs.html:13, hub.html:13, about.html:13) references `img/og.svg`. The img/ directory contains `og.svg` only — no `og.png` exists. SVG is not a guaranteed valid OG image across all social consumers; PNG (1200×630) is explicitly required.

2. **`<meta name="keywords">` present on index.html only; missing from 7 pages** — new_site.md §10 requires `<meta name="keywords">` from content.json.meta.keywords on every page. Only index.html:8 carries it. All other pages (features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html) are missing this tag entirely.

---

## Social metadata
Score: 85/100 | Severity: ⚠️

**PASS** All 8 pages carry: `og:type=website`, `og:site_name=Phlix`, absolute `og:url`, absolute `og:image` (see SEO defect), `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, absolute `twitter:image`, `twitter:creator=@detain`. `<meta name="theme-color" content="#7B3FBE">` (all 8 pages, e.g. index.html:27). `<link rel="icon" type="image/svg+xml" href="img/favicon.svg">` (all 8 pages, e.g. index.html:30).

**DEFECT**

1. **`og:image` uses SVG instead of required PNG** — same root cause as SEO defect #1. new_site.md §8 specifies og.png (1200×630) as the required output; og.svg is the editable source, not the deployed artifact. All 8 pages reference the SVG: index.html:14, features.html:13, clients.html:13, download.html:13, plugins.html:13, docs.html:13, hub.html:13, about.html:13. Social image URLs are absolute (passing the absolute URL requirement), but the image format itself violates the stated spec.

---

## Localization
Score: 95/100 | Severity: ✅

**PASS**

- `<html lang="en">` present on all 8 pages (e.g. index.html:2) — matches `content.json.site.default_locale`.
- CSS uses logical properties throughout: `margin-inline`, `padding-inline`, `inset`, `margin-inline:auto`, `padding-inline:var(--gutter)`, `border-inline-start`, `inline-start`, `inline-end` — confirmed in base.css, theme.css, and components.css. No use of `left`/`right` for layout positioning; the few `left`/`right` occurrences in components.css:97-99 are inside a `@media(width <= 900px)` physical-media-query block (appropriate there).
- No locale-unsafe formatting found (no `toLocaleDateString`, `Intl.*` in JS, no `strftime`, etc.).
- User-facing strings on all 8 pages trace to content.json (`meta.description`, `footer.tagline`, `features[]` bodies, `clients[]` data, `ecosystem[]` data, `faq[]` data, etc.). Brand micro-copy overlays ("Every Story, An Infinite Horizon.", "Set course for something extraordinary.", "The universe of film, at your command.", "Your library. Your cosmos.") are intentional brand-kit voice per new_site.md §2 and §3 — not hardcoded English outside content.json.

**MINOR NOTE (not a defect)**

- CSS `components.css:97-99` uses physical `left:0`/`right:0` inside a `@media(width <= 900px)` block. This is appropriate inside a physical media query (screen width, not logical inline-size) and does not indicate locale-unsafe layout CSS.

---

## Verdict

### Must fix
1. **`<meta name="keywords">` missing on 7 pages** — add `<meta name="keywords" content="phlix, media server, plex alternative, jellyfin alternative, self-hosted streaming, php media server">` to features.html, clients.html, download.html, plugins.html, docs.html, hub.html, and about.html (matching content.json.meta.keywords used on index.html:8).

2. **og:image format** — generate the required 1200×630 `og.png` raster asset and update all 8 pages' `og:image` and `twitter:image` meta tags from `img/og.svg` to `img/og.png`. The SVG can be kept as the editable source per spec, but the meta must reference the PNG. Alternatively, if the SVG is intentional, the spec assumption needs correcting — but the current spec is explicit about PNG.

### Overall
The site is structurally sound across all three dimensions. Core SEO and social metadata are complete on every page. The two defects are clear spec violations (keywords missing, PNG vs SVG). Localization is excellent — logical CSS properties used consistently, no hardcoded user strings outside content.json, lang attribute correctly set.
