# SEO Review — Midnight Jazz

**Score: 92/100** | Severity: ⚠️

## Findings

### ✅ Passing

| Check | Details |
|-------|---------|
| `<title>` ≤ 60 chars | All pages: home=39, features=14, clients=13, download=14, plugins=13, docs=10, hub=9, about=11. All ≤ 60. `index.html:6` |
| `<meta name="description">` ≤ 160 chars | All 8 pages use 155 chars. Exactly at limit. `index.html:7–10` |
| One `<h1>` per page | Home: `#hero-heading`. All others: `.page-header h1`. No duplicate H1s. `index.html:112` |
| `<link rel="canonical">` | All 8 pages have absolute canonical pointing to their URL. e.g. `index.html:15` |
| Heading hierarchy | No skipped levels. h1 → h2 → h3 on all pages. |
| Descriptive anchor text | All nav links use page names; footer links use descriptive text (no "click here"). |
| JSON-LD on home | Present in `index.html:50–61` — `SoftwareApplication` with `name`, `description`, `applicationCategory`, `operatingSystem`, `offers{price:0}`, `license`. ✅ |
| `sitemap.xml` | All 8 pages listed with absolute URLs, priorities, and `changefreq`. `sitemap.xml:1–11` |
| `robots.txt` | References sitemap: `Sitemap: https://detain.github.io/phlix-website/sites/midnight-jazz/sitemap.xml`. `robots.txt:4` |
| All 8 pages present | index, features, clients, download, plugins, docs, hub, about — all confirmed via `glob`. |

### ⚠️ Issues

- **Description character count** — All pages use `content.json` description which is exactly 155 chars. The limit is 160. This is technically compliant but leaves zero margin. A single-character CMS change could breach the limit.
- **No `lastmod` in sitemap** — `sitemap.xml` has no `<lastmod>` element per URL. Not required by sitemap spec but helpful for crawlers.
- **OG/canonical URL** — All `og:url` tags are absolute and correct. ✅
- **No `lang` attribute override** — The `<html lang="en">` is set correctly on all pages. ✅

### ❌ Issues

None.

---

## Verdict

SEO is complete and correct across all 8 pages. The only gap is `lastmod` in the sitemap (non-blocking). The 155/160 description length is tight but compliant.

**Score: 92/100** — One ⚠️ for the sitemap missing `lastmod` (best practice) and the maxed-out description length.
