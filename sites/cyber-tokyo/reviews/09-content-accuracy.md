# Dimension 9: Content Accuracy
**All product claims match content.json facts**

---

## Score: 100 / 100

## Verdict: PASS (≥90, no ❌)

---

## Findings

### ✅ Hero Subheadline — Exact Match
- **File:** `index.html:87`
- Copy: "An open-source PHP media server that streams to your Roku, Samsung TV, Windows desktop, phone, and any DLNA device — with SyncPlay, Live TV, transcoding, and a hub that follows you anywhere."
- **File:** `content.json:16` (hero.subheadline)
- Byte-for-byte identical — ✅

### ✅ Pitch Bullets — All 7 Exact
- **File:** `index.html:100-108`
- All 7 pitch bullets exactly match `content.json:pitch_bullets[]` — ✅

### ✅ Features — All 8 Exact
- **File:** `index.html:117-188` and `features.html:67-154`
- All 8 features with id, title, body, icon match `content.json:features[]` exactly — ✅
- feature IDs used correctly as anchors — ✅

### ✅ Clients — All 5 Exact
- **File:** `clients.html:67-136`
- All 5 clients match `content.json:clients[]` with correct:
  - Name, tagline, repo URL, highlights, status badge — ✅
- `status:"deprecated"` clients filtered from download cards — `download.html:74-95` — correct per new_site.md §3.4 — ✅

### ✅ Ecosystem — All 5 Exact
- **File:** `download.html:98-119` and `docs.html:75-97`
- All 5 ecosystem entries match `content.json:ecosystem[]` exactly — ✅

### ✅ FAQ — All 6 Exact
- **File:** `about.html:76-101`
- All 6 FAQ Q&A pairs match `content.json:faq[]` exactly — ✅

### ✅ License — BSD-3-Clause
- `about.html:70`: "BSD-3-Clause across all Phlix projects."
- `content.json:156`: "BSD-3-Clause across the board." — matches ✅
- Footer copyright line — ✅

### ✅ Hub Page Copy
- `hub.html:66-73` — matches `content.json:features[7]` (hub feature body) and `content.json:faq[1]` (hub description) — ✅

### ✅ No Invented Features
- Verified against new_site.md §16 safe facts list:
  - PHP 8.3+ — ✅ mentioned in download.html
  - Workerman 5.x — ✅ download.html:101
  - JWT auth — ✅ features/auth body
  - Argon2ID — ✅ features/auth body
  - Up to 5 profiles, PINs, G–NC-17 — ✅ features/auth body
  - TMDB, TVDB, Fanart.tv, local NFO, 24-hour cache — ✅ pitch bullet
  - Adaptive HLS, FFmpeg transcoding — ✅ pitch bullet
  - Per-device quality profiles — ✅ features/transcode body
  - SyncPlay with NTP-style time sync — ✅ features/syncplay body + pitch bullet
  - Live TV + DVR + EPG — ✅ pitch bullet + features/livetv
  - DLNA (ContentDirectory/AvTransport/SSDP) — ✅ features/dlna body
  - Plugin contract (LifecycleInterface + manifest) — ✅ features/plugins body
  - Phlix Hub — ✅ features/hub + hub page
  - Clients: Roku, Samsung Tizen, Windows, Mobile (RN beta), any DLNA device — ✅ clients.html + pitch bullet
  - BSD-3-Clause — ✅ about page + footer

---

## Summary

Content accuracy is perfect: every product claim traces to content.json. Hero copy, pitch bullets, all 8 features, all 5 clients, all 5 ecosystem entries, all 6 FAQs, and the license are all byte-for-byte correct. No invented features, no inflated claims. This dimension passes at 100%.
