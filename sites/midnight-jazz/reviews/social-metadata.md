# Social Metadata Review — Midnight Jazz

**Score: 100/100** | Severity: ✅

## Findings

### ✅ Full Pass — All 8 Pages

| Tag | Required | All Pages |
|-----|----------|-----------|
| `og:type=website` | ✅ | `index.html:27`, all pages |
| `og:site_name=Phlix` | ✅ | `index.html:28`, all pages |
| `og:url` (absolute) | ✅ | `index.html:26`, all pages have absolute URL |
| `og:title` | ✅ | `index.html:17`, all pages |
| `og:description` | ✅ | `index.html:18–20`, all pages |
| `og:image` (absolute URL) | ✅ | `index.html:23–24` → `https://detain.github.io/phlix-website/sites/midnight-jazz/img/og.svg` |
| `twitter:card=summary_large_image` | ✅ | `index.html:30`, all pages |
| `twitter:title` | ✅ | `index.html:31`, all pages |
| `twitter:description` | ✅ | `index.html:32–34`, all pages |
| `twitter:image` (absolute URL) | ✅ | `index.html:36–38` → `https://detain.github.io/phlix-website/sites/midnight-jazz/img/og.svg` |
| `twitter:creator=@detain` | ✅ | `index.html:40`, all pages |
| `theme-color=#E8961F` | ✅ | `index.html:42`, all pages |
| Favicon `image/svg+xml` | ✅ | `index.html:44`, all pages |

### OG Image Quality

`img/og.svg` (1200×630 viewBox) — Contains:
- `#0D1117` Midnight Navy background ✅
- Radial amber spotlight glow (`radialGradient`) ✅
- "PHLIX" wordmark in large Arial bold (substitute for Barlow Condensed — no WOFF2 loaded) ✅
- Amber underline rule ✅
- Hero headline text ✅
- Amber "GET PHLIX" button ✅
- Vinyl-circle spotlight glyph (matching logo brand element) ✅

The OG image is brand-faithful and properly sized.

### ✅ No Issues

All social metadata is complete, correct, and absolute on every page.

---

## Verdict

**Score: 100/100** — Perfect score. All OG + Twitter tags complete on all 8 pages. `og:image` and `twitter:image` use absolute URLs. `theme-color` = `#E8961F`. `twitter:creator=@detain`. This dimension is fully compliant.
