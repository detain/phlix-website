# SEO Review — Retro Seventies

## Score: 73/100 — ⚠️ Warning

### Hard Failures (❌)

**1. Broken footer license link — wrong repository path**

`index.html:238` and all other pages:
```html
<a href="https://github.com/phlix-website/blob/master/LICENSE" rel="noopener noreferrer">License (BSD-3)</a>
```

`phlix-website` is not a valid GitHub org/repo. The correct URL per `new_site.md §5` is:
```
https://github.com/detain/phlix-website/blob/master/LICENSE
```
Should be:
```
https://github.com/detain/phlix-server/blob/master/LICENSE
```

`about.html:238`, `clients.html:177`, `download.html:149`, `plugins.html:115`, `docs.html:115`, `hub.html:113`, `about.html:134`

---

### ⚠️ Warnings

**2. `og:description` custom on clients.html diverges from `content.json`**

`clients.html:12` — uses custom description "Native apps for every screen you own — Roku, Samsung Tizen, Windows, Mobile, and any DLNA device." instead of `content.json` `meta.description`.

The `new_site.md §10` requires the description to come from `meta.description` for all pages unless page-specific copy is justified by content. Since the page header already has "Native apps for every screen you own." as its lead text, this duplication in OG meta is redundant but not harmful.

**Severity:** Warning — not a hard failure since the page-level OG copy is related.

**3. Per-page OG/Twitter title could be more descriptive on some pages**

`hub.html:11` — `og:title = "Phlix Hub — Reach any server from anywhere"` — good
`hub.html:12` — `og:description = "Sign in once. Reverse-tunnel relay handles NAT. Self-hostable, or use the public hub."` — from `content.json` hub feature body, appropriate

`docs.html:12` — `og:description = "Everything you need to know about running Phlix."` — custom, not from content.json. Minor deviation.

---

### ✅ PASS

- `<title>` tags — all under 60 chars:
  - Home: "Phlix — Rewind. Replay. Relive." (30 chars) ✅
  - Features: "Features — Phlix" (17 chars) ✅
  - Clients: "Clients — Phlix" (16 chars) ✅
  - Download: "Download — Phlix" (17 chars) ✅
  - Plugins: "Plugins — Phlix" (16 chars) ✅
  - Docs: "Docs — Phlix" (12 chars) ✅
  - Hub: "Hub — Phlix" (11 chars) ✅
  - About: "About — Phlix" (14 chars) ✅

- `<meta name="description">` — all ≤160 chars from `content.json` description (133 chars) ✅

- `<meta name="keywords">` — present on all pages ✅

- `<link rel="canonical">` — present on every page with absolute URL ✅

- Heading hierarchy — one `<h1>` per page; `h2` sections follow logically; no skipped levels ✅

- Semantic landmarks: `role="banner"`, `role="navigation"`, `main`, `role="contentinfo"` on every page ✅

- Descriptive anchor text: "View source", "Get Phlix", "Read the docs" — no "click here" ✅

- JSON-LD on `index.html:38-49` — valid `SoftwareApplication` with required fields (name, description, applicationCategory, operatingSystem, offers/price=0, license) ✅

- `sitemap.xml` — all 8 pages with absolute URLs, `weekly`/`monthly` changefreq, correct priorities ✅

- `robots.txt` — references correct sitemap URL ✅
