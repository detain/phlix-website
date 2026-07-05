# SEO Review — Festive Lantern

**Site:** `/home/sites/phlix/phlix-website/sites/festive-lantern/`
**Review date:** 2026-07-04

---

## Dimension 2 — SEO: Score 68 / 100

---

### 2.1 `<title>` tags

| Page | `<title>` | Length | Pass? |
|---|---|---|---|
| index.html | "Phlix — Your media. Your library. Your celebration." | 51 | ✅ ≤60 |
| features.html | "Features — Phlix" | 15 | ✅ ≤60 |
| clients.html | "Clients — Phlix" | 14 | ✅ ≤60 |
| download.html | "Download — Phlix" | 16 | ✅ ≤60 |
| plugins.html | "Plugins — Phlix" | 14 | ✅ ≤60 |
| docs.html | "Docs — Phlix" | 10 | ✅ ≤60 |
| hub.html | "Hub — Phlix" | 10 | ✅ ≤60 |
| about.html | "About — Phlix" | 12 | ✅ ≤60 |

All titles are page-specific and ≤60 chars. ✅

---

### 2.2 `<meta name="description">`

| Page | `<meta name="description">` | Length | Pass? |
|---|---|---|---|
| index.html | "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support." | 127 | ✅ ≤160 |
| features.html | "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support." | 127 | ✅ ≤160 |
| clients.html | "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support." | 127 | ✅ ≤160 |
| download.html | "Install Phlix in minutes. Requires PHP 8.3+ and Workerman 5.x. Available for Roku, Samsung Tizen, Windows, Mobile, and any DLNA device." | 150 | ✅ ≤160 |
| plugins.html | "Extend Phlix with a versioned plugin contract. LifecycleInterface + manifest schema. Drop a plugin in, the loader picks it up." | 126 | ✅ ≤160 |
| docs.html | "Phlix documentation — user guide, API reference, developer docs, and hub admin guide." | 88 | ✅ ≤160 |
| hub.html | "Phlix Hub — sign in once and reach any of your servers from anywhere via reverse-tunnel relay. Self-hostable or use the public relay." | 140 | ✅ ≤160 |
| about.html | "Phlix is BSD-3 licensed open-source software. Your library stays on your hardware. No lock-in, no subscriptions." | 113 | ✅ ≤160 |

All ≤160 chars. ✅

---

### 2.3 Duplicate meta descriptions ⚠️

`index.html`, `features.html`, and `clients.html` all share the identical meta description:
> "Self-hostable PHP media server with native apps for Roku, Samsung TV, Windows & mobile. SyncPlay, Live TV, DVR, DLNA support."

**This is a SEO issue.** Each page should have a unique meta description reflecting its specific content.

| File | Line |
|---|---|
| index.html | 7 |
| features.html | 7 |
| clients.html | 7 |

---

### 2.4 `<h1>` per page

| Page | `<h1>` | Count | Heading Hierarchy | Pass? |
|---|---|---|---|---|
| index.html | "Your media. Your library. Your Phlix." | 1 | h1 → h2 (pitch, features, cta-banner) | ✅ |
| features.html | "Features" | 1 | h1 → h2 (8 feature-detail headings) | ✅ |
| clients.html | "Clients" | 1 | h1 → h2 (5 client-card headings) | ✅ |
| download.html | "Download" | 1 | h1 → h2 (Server, Clients, Ecosystem) | ✅ |
| plugins.html | "Plugins" | 1 | h1 → h2 (Plugin model, Write your own) | ✅ |
| docs.html | "Docs" | 1 | h1 → h2 (Documentation, Ecosystem) | ✅ |
| hub.html | "Phlix Hub" | 1 | h1 → h2 (What the Hub does, Self-host, Hub mode) | ✅ |
| about.html | "About" | 1 | h1 → h2 (Philosophy, License, Contributing, FAQ) | ✅ |

One `<h1>` per page. Heading hierarchy is consistent (h1 → h2). No skips. ✅

---

### 2.5 `<link rel="canonical">` (absolute URL)

| Page | Canonical | Format | Pass? |
|---|---|---|---|
| index.html | `https://detain.github.io/phlix-website/sites/festive-lantern/` | ✅ absolute | ✅ |
| features.html | `https://detain.github.io/phlix-website/sites/festive-lantern/features.html` | ✅ absolute | ✅ |
| clients.html | `https://detain.github.io/phlix-website/sites/festive-lantern/clients.html` | ✅ absolute | ✅ |
| download.html | `https://detain.github.io/phlix-website/sites/festive-lantern/download.html` | ✅ absolute | ✅ |
| plugins.html | `https://detain.github.io/phlix-website/sites/festive-lantern/plugins.html` | ✅ absolute | ✅ |
| docs.html | `https://detain.github.io/phlix-website/sites/festive-lantern/docs.html` | ✅ absolute | ✅ |
| hub.html | `https://detain.github.io/phlix-website/sites/festive-lantern/hub.html` | ✅ absolute | ✅ |
| about.html | `https://detain.github.io/phlix-website/sites/festive-lantern/about.html` | ✅ absolute | ✅ |

All 8 pages have absolute canonical URLs. ✅

---

### 2.6 JSON-LD `SoftwareApplication`

| Page | JSON-LD | Pass? |
|---|---|---|
| index.html | ✅ Present — `SoftwareApplication` with name, description, applicationCategory, operatingSystem, offers (price: 0), license | ✅ |
| features.html | ❌ NOT PRESENT | ❌ |
| clients.html | ❌ NOT PRESENT | ❌ |
| download.html | ❌ NOT PRESENT | ❌ |
| plugins.html | ❌ NOT PRESENT | ❌ |
| docs.html | ❌ NOT PRESENT | ❌ |
| hub.html | ❌ NOT PRESENT | ❌ |
| about.html | ❌ NOT PRESENT | ❌ |

JSON-LD is only on index.html. Per the brief, `SoftwareApplication` should be on index.html — which is correct. ✅

**Note:** The SoftwareApplication offer has `price: "0"` and `priceCurrency: "USD"`. Consider adding `availability` and `downloadUrl` for completeness, but this is not required for a pass.

---

### 2.7 sitemap.xml ✅

| Check | Result |
|---|---|
| Present | ✅ `/home/sites/phlix/phlix-website/sites/festive-lantern/sitemap.xml` |
| All 8 pages included | ✅ index, features, clients, download, plugins, docs, hub, about |
| Correct URLs | ✅ `https://detain.github.io/phlix-website/sites/festive-lantern/...` |
| Valid XML | ✅ |

---

### 2.8 robots.txt ✅

| Check | Result |
|---|---|
| Present | ✅ `/home/sites/phlix/phlix-website/sites/festive-lantern/robots.txt` |
| Sitemap directive | ✅ |
| Non-blocking | ✅ `Allow: /` |

---

### SEO Defect Summary

| Severity | Issue | File |
|---|---|---|
| ⚠️ Medium | Duplicate meta description on 3 pages (index, features, clients — identical string) | index.html:7, features.html:7, clients.html:7 |
| 🔴 Minor | JSON-LD on non-index pages not expected; only index.html requires it | — |
