# R2 — Content Accuracy

## Round 1 Fixes: VERIFIED

| # | Issue | Status | Evidence |
|---|-------|--------|----------|
| 5 | Hub feature (8th) added to features overview | ✅ FIXED | index.html:174–181 — 8th feature-card with hub icon ✅ |
| 3 | og:image updated from og.svg to og.png | ✅ PARTIAL | All 8 pages reference og.png ✅ but file does not exist ❌ |

---

## NEW ISSUES

### ❌ CRITICAL: og.png does not exist — content.json meta references non-existent file

- **Severity:** Critical (social metadata)
- **File:** All 8 pages
- **Evidence:** `content.json:194` specifies `"og_image": "/img/og.svg"` — but the built site's meta tags reference `og.png`. The site pages reference og.png (not og.svg) because Round 1 was supposed to update to PNG. However, the PNG file was never actually created.
- **This creates an inconsistency:** content.json says og.svg but the built site says og.png. If content.json is the source of truth, the meta tag should reference og.svg. If the decision was to switch to PNG, the file must be created.
- **Also:** Even if og.svg were referenced, SVG cannot be used directly as og:image in most social crawlers (Facebook recommends JPEG/PNG; Twitter accepts SVG but recommends PNG).
- **Fix:** Either (a) create og.png by rasterizing og.svg at 1200×630, or (b) revert meta tags to reference og.svg

### ⚠️ MINOR: content.json's og_image path vs site's og.png

- **Severity:** Low
- **File:** content.json:194 vs built site meta tags
- **Evidence:** content.json specifies `/img/og.svg` (with leading slash implying root-relative path). The built site uses absolute URLs to `https://detain.github.io/phlix-website/marble-atrium/img/og.png`. The absolute URL format is correct per spec §11 ("absolute URL"), but the og_image value in content.json is not the one being used.
- **This is an inconsistency** but not a blocking issue since the HTML pages are correct in using absolute URLs.

---

## PRODUCT CLAIMS VERIFICATION

All product claims checked against spec §16 "Technical accuracy guardrails":

| Claim | Source | Verification |
|-------|--------|--------------|
| PHP 8.3+ | download.html:77 | ✅ "Phlix server requires PHP 8.3+" |
| Workerman 5.x | download.html:77 | ✅ "Workerman 5.x" |
| JWT auth, Argon2ID | features.html:106 | ✅ |
| Up to 5 profiles per user | features.html:106 | ✅ |
| 4- or 6-digit PINs | features.html:106 | ✅ |
| Rating filter G to NC-17 | features.html:106 | ✅ |
| TMDB, TVDB, Fanart.tv | pitch list index.html:107, features | ✅ |
| Local NFO with 24-hour cache | index.html:107 | ✅ |
| Adaptive HLS streaming | index.html:108 | ✅ |
| FFmpeg transcoding | index.html:108 | ✅ |
| Per-device quality profiles | features.html:98, index.html:108 | ✅ |
| SyncPlay with NTP | features.html:89 | ✅ |
| Live TV + DVR + EPG | index.html:109, features.html:113–114 | ✅ |
| DLNA (ContentDirectory/AvTransport/SSDP) | features.html:123, clients.html:125–127 | ✅ |
| Plugin contract (LifecycleInterface + manifest) | features.html:131–132, plugins.html:76 | ✅ |
| Phlix Hub (reverse-tunnel relay, NAT) | hub.html:76 | ✅ |
| Self-hostable hub | hub.html:81 | ✅ |
| Public hub | hub.html:81 | ✅ |
| Roku, Samsung Tizen, Windows, Mobile (RN), DLNA | clients.html:76–122, download.html:88–112 | ✅ |
| BSD-3-Clause | about.html:82 | ✅ |
| GitHub org: detain | about.html:87 | ✅ |

**No invented features or competitor trademark violations detected.** All claims match content.json exactly.

---

## EXTERNAL LINK ACCURACY

| Link | URL | Verified |
|------|-----|----------|
| Server source | https://github.com/detain/phlix-server | ✅ |
| Plugin example | https://github.com/detain/phlix-plugin-example | ✅ |
| Hub | https://github.com/detain/phlix-hub | ✅ |
| Docs | https://detain.github.io/phlix-docs | ✅ |
| GitHub org | https://github.com/detain | ✅ |
| phlix-hub reference in hub.html | hub.html:81 `hub.phlix.dev` | ⚠️ Not independently verified — this domain may or may not resolve. Not a content accuracy issue since it describes the public hub |

---

## SPELLING OF PRODUCT/BRAND NAMES

| Name | Correct | Used |
|------|---------|------|
| Phlix | ✅ | PH LIX, Phlix |
| SyncPlay | ✅ | SyncPlay |
| FFmpeg | ✅ | FFmpeg |
| DLNA | ✅ | DLNA |
| NAT | ✅ | NAT |
| TMDB | ✅ | TMDB |
| TVDB | ✅ | TVDB |
| Argon2ID | ✅ | Argon2ID |
| VitePress | ✅ | VitePress |
| Workerman | ✅ | Workerman |
| Electron | ✅ | Electron |
| React Native | ✅ | React Native |

---

## SCORE: 85/100

| Factor | Score | Notes |
|--------|-------|-------|
| Product claims accuracy | 100 | All claims match spec §16 and content.json |
| External links | 95 | All verified; hub.phlix.dev domain not independently checked |
| Features complete (all 8) | 100 | 8 features on home, 8 on features page ✅ |
| Clients complete (all 5) | 100 | 5 clients on clients page ✅ |
| FAQ complete (all 6) | 100 | All 6 FAQ items present on about page ✅ |
| Ecosystem complete (all 5) | 100 | download.html ecosystem section ✅ |
| Copyright year (2026) | 100 | Brand kit dated 2026; site uses 2026 ✅ |
| **og:image** | **0** | File doesn't exist |
| **Overall** | **85** | og:image missing is the only critical failure |

**Pass threshold: 80** — ✅ Passes (barely, due to og:image critical issue).

### Required fix
1. **og.png must be created** — rasterize og.svg to 1200×630px PNG, save as img/og.png
