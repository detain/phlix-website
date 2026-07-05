# DIMENSION 2: SEO — Swiss Modernist Site Review

## Score: 85 / 100

---

## Severity Scale
- ✅ Pass
- ⚠️ Minor issue
- ❌ Fail

---

## 1. Page Titles

| Page | Title | Length | Verdict |
|------|-------|--------|---------|
| Home | `Phlix — Grid. Type. Truth.` | 24 chars | ✅ ≤60 |
| Features | `Features — Phlix` | 16 chars | ✅ ≤60 |
| Clients | `Clients — Phlix` | 14 chars | ✅ ≤60 |
| Download | `Download — Phlix` | 16 chars | ✅ ≤60 |
| Plugins | `Plugins — Phlix` | 15 chars | ✅ ≤60 |
| Docs | `Docs — Phlix` | 11 chars | ✅ ≤60 |
| Hub | `Hub — Phlix` | 11 chars | ✅ ≤60 |
| About | `About — Phlix` | 12 chars | ✅ ≤60 |

All titles are well under the 60-character limit. The format `<Page> — Phlix` is consistent and descriptive. ✅

---

## 2. Meta Descriptions

| Page | Description | Length | Verdict |
|------|-------------|--------|---------|
| Home | `Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support.` | 138 chars | ✅ ≤160 |
| Features | `Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support.` | 138 chars | ✅ ≤160 |
| Clients | `Native apps for Roku, Samsung Tizen, Windows, Mobile, plus any DLNA device.` | 72 chars | ✅ ≤160 |
| Download | `Download Phlix server and clients. PHP 8.3+, self-hosted, BSD-3-Clause.` | 66 chars | ✅ ≤160 |
| Plugins | `Phlix plugin system with a versioned manifest contract. Implement LifecycleInterface, ship a manifest, drop it in.` | 107 chars | ✅ ≤160 |
| Docs | `Phlix documentation: user guide, API reference, developer docs, and hub admin guide.` | 83 chars | ✅ ≤160 |
| Hub | `Phlix Hub — reverse-tunnel relay for accessing your media server from anywhere. Self-hostable or use the public hub.` | 121 chars | ✅ ≤160 |
| About | `Phlix is an open-source PHP media server. BSD-3-Clause. Self-hostable. No subscription.` | 86 chars | ✅ ≤160 |

All descriptions ≤160 characters. ✅

---

## 3. Heading Structure

### One H1 Per Page ✅

| Page | H1 |
|------|----|
| Home | `Your media. Your library. Your Phlix.` |
| Features | `Features` |
| Clients | `Clients` |
| Download | `Download` |
| Plugins | `Plugins` |
| Docs | `Documentation` |
| Hub | `Phlix Hub` |
| About | `About Phlix` |

Each page has exactly one `<h1>`. ✅

### Heading Hierarchy ✅

All pages maintain logical h1 → h2 → h3 hierarchy with no skipped levels. The home page uses h1 (hero), h2 (sections), h3 (feature card titles). Interior pages use h1 (page header), h2 (section headers), h3 (subsection or card titles). ✅

---

## 4. Canonical URLs ✅

All pages have `<link rel="canonical">` pointing to their absolute URL:
- `index.html:9` → `https://detain.github.io/phlix-website/sites/swiss-modernist/`
- `features.html:9` → `https://detain.github.io/phlix-website/sites/swiss-modernist/features.html`
- (and so on for all pages)

All canonical URLs are absolute and correct. ✅

---

## 5. JSON-LD (Home Only) ✅

`index.html:105-120` contains a valid `SoftwareApplication` JSON-LD block:
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Phlix",
  "description": "Self-hostable PHP media server...",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "PHP 8.3+",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "license": "https://opensource.org/licenses/BSD-3-Clause"
}
```
Contains: name, description, applicationCategory, operatingSystem, offers/price=0, license. All required fields present. ✅

No JSON-LD on other pages (correct — spec calls for it on home only). ✅

---

## 6. Sitemap ✅

`sitemap.xml` — all 8 pages present with absolute URLs, priority values, and changefreq:
1. `/` (priority 1.0)
2. `/features.html` (0.9)
3. `/clients.html` (0.9)
4. `/download.html` (0.9)
5. `/plugins.html` (0.8)
6. `/docs.html` (0.8)
7. `/hub.html` (0.8)
8. `/about.html` (0.7)

Correct. ✅

---

## 7. robots.txt ✅

`robots.txt:4` correctly references the sitemap:
```
Sitemap: https://detain.github.io/phlix-website/sites/swiss-modernist/sitemap.xml
```
✅

---

## 8. Anchor Text ✅

All internal and external links use descriptive anchor text. No instances of "click here" found anywhere in the site. ✅

Selected examples:
- `features.html` — "See all features" ✅
- `download.html` — "Get Phlix" ✅
- Footer — "Documentation", "Server source", "Plugin example", "API reference", "GitHub org", "Issues", "Hub", "License (BSD-3)" — all descriptive ✅

---

## 9. Keywords Meta ✅

`index.html:8`:
```html
<meta name="keywords" content="phlix, media server, plex alternative, jellyfin alternative, self-hosted streaming, php media server">
```
Keywords are present on the home page. Content matches `content.json` keywords. ✅

---

## Issues Found

### Minor

1. **Title brevity** — All titles are 11–24 characters. The spec suggests `≤60` and the pattern `<Page> — Phlix` is followed correctly, but very short titles ("Hub — Phlix" at 11 chars) provide minimal SEO context. Not a hard failure, just suboptimal. ⚠️

2. **Meta keywords on interior pages** — `features.html`, `clients.html`, `download.html`, `plugins.html`, `hub.html`, and `about.html` lack `<meta name="keywords">`. Only `index.html` has it. The `new_site.md` spec (§10) says "`<meta name="keywords">` from `meta.keywords`" as a per-page requirement, though meta keywords have minimal SEO value today. ⚠️

3. **`new_site.md` section 10 canonical URL** — The spec says "from `site.url`" which is `https://detain.github.io/phlix-website` without the brand-kit subdirectory. The canonical for `index.html` points to `/sites/swiss-modernist/` which is the correct deployed location. This is an implementation artifact of hosting under a brand-kit subdirectory — the canonical is **technically correct for the deployed location**, not a spec violation. ✅

---

## Summary

| Check | Result | File:Line |
|-------|--------|-----------|
| All titles ≤60 chars | ✅ | All pages |
| All descriptions ≤160 chars | ✅ | All pages |
| One H1 per page | ✅ | All pages |
| Heading hierarchy intact | ✅ | All pages |
| Canonical URL present | ✅ | All pages |
| JSON-LD on home | ✅ | `index.html:105-120` |
| sitemap.xml (8 pages, absolute) | ✅ | `sitemap.xml` |
| robots.txt references sitemap | ✅ | `robots.txt:4` |
| No "click here" anchors | ✅ | All pages |
| Descriptive anchor text | ✅ | All pages |
| Meta keywords on all pages | ⚠️ | Interior pages missing |
