# Pop Art Explosion — Review: Dimension 2 (SEO) & Dimension 11 (Social Metadata)

**Site:** `sites/pop-art-explosion/`
**Reviewer:** Adversarial code review
**Severity threshold:** ✅ ≥90 · ⚠️ 80–89 · ❌ <80

---

## Scores

| Dimension | Score | Severity |
|-----------|-------|----------|
| SEO (§10) | **85 / 100** | ⚠️ |
| Social Metadata (§11) | **85 / 100** | ⚠️ |

---

## ❌ MUST-FIX (blockers)

### 1. `og:image` references SVG, not required 1200×630 PNG

- **Spec:** §11 requires `og:image` absolute URL to **1200×630** image. §8 further specifies `og.png (1200×630)`.
- **Actual:** All 8 pages point to `img/og.svg` — an SVG with no guaranteed dimensions.
  - `index.html:12` · `features.html:12` · `clients.html:12` · `download.html:12`
  - `plugins.html:12` · `docs.html:12` · `hub.html:12` · `about.html:12`
- **Why it matters:** Twitter/Facebook rasterize og:image to exact dimensions. An SVG with no intrinsic 1200×630 sizing will render at arbitrary size or be rejected by validators expecting raster. This is a guaranteed validator failure on `twitter:card` and Open Graph debuggers.
- **Fix:** Rename/generate `img/og.png` at exactly 1200×630; update all 8 pages to `og:image content="…/img/og.png"`.

### 2. Missing `<meta name="keywords">` on every page

- **Spec:** §10: `<meta name="keywords">` from `meta.keywords` is required on every page.
- **Actual:** No page carries a `keywords` meta tag.
  - Checked: `index.html` through `about.html` — none have `<meta name="keywords">`.
- **Fix:** Add `<meta name="keywords" content="phlix, media server, plex alternative, jellyfin alternative, self-hosted streaming, php media server">` to every page `<head>` (or page-specific values where `content.json` provides per-page meta).

---

## Per-page checklist

### index.html

| Check | Result | Detail |
|-------|--------|--------|
| `<title>` ≤60 chars | ✅ | `"Phlix — WHAM! Your media, amplified."` (40 chars) · `index.html:6` |
| `<meta name="description">` ≤160 | ✅ | 116 chars · `index.html:7` |
| `<link rel="canonical">` absolute | ✅ | `index.html:8` |
| One `<h1>` | ✅ | `index.html:79` — hero h1 |
| Heading hierarchy unbroken | ✅ | h1 → h2 (pitch, features-overview, cta-banner) |
| JSON-LD SoftwareApplication | ✅ | Full block at `index.html:30–45` — name, description, applicationCategory, operatingSystem, offers/price=0, license |
| `og:type=website` | ✅ | `index.html:14` |
| `og:site_name=Phlix` | ✅ | `index.html:15` |
| `og:url` absolute | ✅ | `index.html:13` |
| `og:title` | ✅ | `index.html:10` |
| `og:description` | ✅ | `index.html:11` |
| `og:image` absolute URL | ❌ | `index.html:12` — SVG, not PNG at 1200×630 |
| `twitter:card=summary_large_image` | ✅ | `index.html:17` |
| `twitter:title` | ✅ | `index.html:18` |
| `twitter:description` | ✅ | `index.html:19` |
| `twitter:image` absolute | ❌ | `index.html:20` — same SVG issue |
| `twitter:creator=@detain` | ✅ | `index.html:21` |
| `<meta name="theme-color">` = #FF1A1A | ✅ | `index.html:23` |
| Favicon SVG link | ✅ | `index.html:24` |
| `<meta name="keywords">` | ❌ | **Missing** |

---

### features.html

| Check | Result | Detail |
|-------|--------|--------|
| `<title>` ≤60 chars | ✅ | `"Features — Phlix"` (15 chars) · `features.html:6` |
| `<meta name="description">` ≤160 | ✅ | 116 chars · `features.html:7` |
| `<link rel="canonical">` absolute | ✅ | `features.html:8` |
| One `<h1>` | ✅ | `features.html:60` |
| Heading hierarchy unbroken | ✅ | h1 → h2 (feature-detail h2s) → cta-banner h2 |
| JSON-LD (home only) | N/A | Not required on sub-pages |
| All OG tags | ❌ | og:image SVG · `features.html:12` |
| All Twitter tags | ❌ | twitter:image SVG · `features.html:20` |
| `<meta name="theme-color">` | ✅ | `features.html:23` |
| Favicon SVG | ✅ | `features.html:24` |
| `<meta name="keywords">` | ❌ | **Missing** |

---

### clients.html

| Check | Result | Detail |
|-------|--------|--------|
| `<title>` ≤60 chars | ✅ | `"Clients — Phlix"` (14 chars) · `clients.html:6` |
| `<meta name="description">` ≤160 | ✅ | 116 chars · `clients.html:7` |
| `<link rel="canonical">` absolute | ✅ | `clients.html:8` |
| One `<h1>` | ✅ | `clients.html:60` |
| Heading hierarchy unbroken | ✅ | h1 → h2 (client-card h2s) → cta-banner h2 |
| All OG tags | ❌ | og:image SVG · `clients.html:12` |
| All Twitter tags | ❌ | twitter:image SVG · `clients.html:20` |
| `<meta name="theme-color">` | ✅ | `clients.html:23` |
| Favicon SVG | ✅ | `clients.html:24` |
| `<meta name="keywords">` | ❌ | **Missing** |

---

### download.html

| Check | Result | Detail |
|-------|--------|--------|
| `<title>` ≤60 chars | ✅ | `"Download — Phlix"` (16 chars) · `download.html:6` |
| `<meta name="description">` ≤160 | ✅ | 116 chars · `download.html:7` |
| `<link rel="canonical">` absolute | ✅ | `download.html:8` |
| One `<h1>` | ✅ | `download.html:60` |
| Heading hierarchy unbroken | ✅ | h1 → h2 (Server/Clients/Ecosystem) → cta-banner h2 |
| All OG tags | ❌ | og:image SVG · `download.html:12` |
| All Twitter tags | ❌ | twitter:image SVG · `download.html:20` |
| `<meta name="theme-color">` | ✅ | `download.html:23` |
| Favicon SVG | ✅ | `download.html:24` |
| `<meta name="keywords">` | ❌ | **Missing** |

---

### plugins.html

| Check | Result | Detail |
|-------|--------|--------|
| `<title>` ≤60 chars | ✅ | `"Plugins — Phlix"` (15 chars) · `plugins.html:6` |
| `<meta name="description">` ≤160 | ✅ | 116 chars · `plugins.html:7` |
| `<link rel="canonical">` absolute | ✅ | `plugins.html:8` |
| One `<h1>` | ✅ | `plugins.html:60` |
| Heading hierarchy unbroken | ✅ | h1 → h2 (Plugin model/Ecosystem/Write your own) → cta-banner h2 |
| All OG tags | ❌ | og:image SVG · `plugins.html:12` |
| All Twitter tags | ❌ | twitter:image SVG · `plugins.html:20` |
| `<meta name="theme-color">` | ✅ | `plugins.html:23` |
| Favicon SVG | ✅ | `plugins.html:24` |
| `<meta name="keywords">` | ❌ | **Missing** |

---

### docs.html

| Check | Result | Detail |
|-------|--------|--------|
| `<title>` ≤60 chars | ✅ | `"Docs — Phlix"` (11 chars) · `docs.html:6` |
| `<meta name="description">` ≤160 | ✅ | 116 chars · `docs.html:7` |
| `<link rel="canonical">` absolute | ✅ | `docs.html:8` |
| One `<h1>` | ✅ | `docs.html:60` |
| Heading hierarchy unbroken | ✅ | h1 → h2 (Documentation/Ecosystem) |
| All OG tags | ❌ | og:image SVG · `docs.html:12` |
| All Twitter tags | ❌ | twitter:image SVG · `docs.html:20` |
| `<meta name="theme-color">` | ✅ | `docs.html:23` |
| Favicon SVG | ✅ | `docs.html:24` |
| `<meta name="keywords">` | ❌ | **Missing** |

---

### hub.html

| Check | Result | Detail |
|-------|--------|--------|
| `<title>` ≤60 chars | ✅ | `"Hub — Phlix"` (10 chars) · `hub.html:6` |
| `<meta name="description">` ≤160 | ✅ | 116 chars · `hub.html:7` |
| `<link rel="canonical">` absolute | ✅ | `hub.html:8` |
| One `<h1>` | ✅ | `hub.html:60` — "Phlix Hub" |
| Heading hierarchy unbroken | ✅ | h1 → h2 (What the Hub does/Self-host or use/Hub mode in clients) → cta-banner h2 |
| All OG tags | ❌ | og:image SVG · `hub.html:12` |
| All Twitter tags | ❌ | twitter:image SVG · `hub.html:20` |
| `<meta name="theme-color">` | ✅ | `hub.html:23` |
| Favicon SVG | ✅ | `hub.html:24` |
| `<meta name="keywords">` | ❌ | **Missing** |

---

### about.html

| Check | Result | Detail |
|-------|--------|--------|
| `<title>` ≤60 chars | ✅ | `"About — Phlix"` (12 chars) · `about.html:6` |
| `<meta name="description">` ≤160 | ✅ | 116 chars · `about.html:7` |
| `<link rel="canonical">` absolute | ✅ | `about.html:8` |
| One `<h1>` | ✅ | `about.html:60` |
| Heading hierarchy unbroken | ✅ | h1 → h2 (Philosophy/License/Contributing/FAQ) |
| All OG tags | ❌ | og:image SVG · `about.html:12` |
| All Twitter tags | ❌ | twitter:image SVG · `about.html:20` |
| `<meta name="theme-color">` | ✅ | `about.html:23` |
| Favicon SVG | ✅ | `about.html:24` |
| `<meta name="keywords">` | ❌ | **Missing** |

---

## sitemap.xml

| Check | Result | Detail |
|-------|--------|--------|
| All 8 pages present | ✅ | `sitemap.xml:3–42` — all 8 pages with absolute URLs |
| All URLs absolute | ✅ | `https://detain.github.io/phlix-website/sites/pop-art-explosion/…` |
| Format valid | ✅ | Valid XML sitemap |

---

## robots.txt

| Check | Result | Detail |
|-------|--------|--------|
| References sitemap | ✅ | `robots.txt:4` — correct sitemap URL |

---

## Summary

**Two blocker issues apply to every page:**

1. **`og:image` / `twitter:image` → SVG instead of required 1200×630 PNG** — All 8 pages reference `img/og.svg`. The spec explicitly requires PNG at 1200×630. Twitter Card validators and Open Graph debuggers will flag this. See `new_site.md §8` (og.png) and §11 (1200×630).

2. **Missing `<meta name="keywords">`** — Required on every page per `new_site.md §10`. None of the 8 pages carry it.

The og:image issue appears to be a systematic pattern across all brand-kit sites (confirmed: `neon-noir` and `pop-art-explosion` both have only `og.svg` in `img/`). This should be addressed at the build/scaffold level, but for this review it is a per-page failure on every page.
