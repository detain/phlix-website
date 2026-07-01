# Content Accuracy Review — Retro Seventies

## Score: 95/100 — ⚠️ Warning

### ✅ PASS — All product claims match new_site.md §16

**Verified claims:**
- PHP 8.3+ ✅ — mentioned in download.html:68, ecosystem lists
- Workerman 5.x ✅ — ecosystem lists on download.html, docs.html
- JWT auth with refresh tokens, Argon2ID password hashing ✅ — features.html:111, index.html:157
- Up to 5 profiles per user, 4-/6-digit PINs, G–NC-17 rating filter ✅ — features.html:111, index.html:157
- TMDB, TVDB, Fanart.tv, local NFO with 24-hour cache ✅ — index.html:110, features.html:75
- Adaptive HLS, FFmpeg transcoding, per-device quality profiles ✅ — index.html:111, features.html:99
- Direct play when supported ✅ — clients.html:90, download.html:82
- SyncPlay with NTP-style time sync ✅ — index.html:109, features.html:87
- Live TV + DVR + EPG ✅ — index.html:112, features.html:123
- DLNA (ContentDirectory/AvTransport/SSDP) ✅ — index.html:175, features.html:135, clients.html:131-135
- Plugin contract (LifecycleInterface + manifest) ✅ — index.html:183, features.html:147, plugins.html:67
- Phlix Hub reverse-tunnel relay ✅ — hub.html:67, features.html:193
- Clients: Roku, Samsung Tizen, Windows, Mobile (RN, beta), DLNA ✅ — clients.html (all 5 clients), download.html:73-100
- BSD-3-Clause ✅ — about.html:70, footer on all pages

**No competitor trademark violations** — site correctly uses "Plex / Jellyfin / Emby" framing from content.json:135

---

### ⚠️ Warnings

**1. Features page shows 8 feature cards — spec §3.2 says "all 7 `features`"**

`features.html:67-161` — all 8 content.json features are shown on the features page. The spec §3.2 for features.html says "one per `features[]`" which means all 8 is technically correct since there are 8 items in the array. However, the features-overview on index.html (which the spec calls for showing "7 features") shows all 8 cards.

This is tracked in Brand Fidelity (dimension 1) as a ⚠️ minor issue.

**2. download.html — download-card summary text**

`download.html:77-98` — the download cards use summary text for each client. These are condensed/paraphrased versions of `content.json.clients[].highlights[]`. For example:
- "Native Roku channel — HLS playback, Hub mode, SyncPlay." (download.html:77) — paraphrased from highlights

This is appropriate paraphrasing for UI cards, not verbatim copy required. Acceptable.

---

### ✅ PASS — content.json copy is intact verbatim

All pitch bullets match `content.json pitch_bullets` exactly ✅
All feature bodies match `content.json features[].body` exactly ✅
All client taglines match `content.json clients[].tagline` exactly ✅
All client highlights match `content.json clients[].highlights` exactly ✅
All FAQ Q&As match `content.json faq[]` exactly ✅
All ecosystem entries match `content.json ecosystem[]` exactly ✅

---

### ✅ PASS — No invented claims

All claims are traceable to either content.json or the verified product facts in new_site.md §16. No unverified features, no invented capabilities.

---

### ❌ FAIL — None

No hard failures. Content is accurate.
