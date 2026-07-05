# Content Accuracy Review — Street Mural site

**Score: 100/100** ✅
**Severity: ✅** (zero ❌, zero ⚠️)

---

## Findings

All product claims verified against ground-truth specs in `new_site.md §16` (Technical accuracy guardrails) and `shared/content.json`. Round 2 changes (Google Fonts removal, "Ecosystem"→"Tools" rename, nav toggle bump, line-length constraints, hero gradient) are all CSS/presentation changes that do not affect product copy.

---

### ✅ PASS — PHP 8.3+, Workerman 5.x

`download.html:111`:
> "The media server itself — PHP 8.3+, Workerman 5.x"

Matches `content.json` ecosystem entry: *"The media server itself — PHP 8.3+, Workerman 5.x"* ✅

---

### ✅ PASS — Auth: JWT + Argon2ID, 5 profiles, PINs, rating filter

`features.html:99`:
> "JWT auth with refresh tokens, Argon2ID password hashing, up to 5 profiles per user, 4- or 6-digit PINs, rating filter from G to NC-17."

Matches `content.json` feature body verbatim ✅

---

### ✅ PASS — Metadata: TMDB, TVDB, Fanart.tv, local NFO, 24h cache

`index.html:116`:
> "Multi-source metadata: TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache"

Matches `content.json` pitch_bullets[3] verbatim ✅

---

### ✅ PASS — SyncPlay with NTP-style time sync

`index.html:115`:
> "Real-time SyncPlay with NTP-style time sync so movie night actually stays in sync"

Matches `content.json` pitch_bullets[2] verbatim ✅

`features.html:79-80`:
> "Weighted-mean NTP offset over 5 samples keeps every device locked to the same frame."

Matches `content.json` features[syncplay].body verbatim ✅

---

### ✅ PASS — Adaptive HLS, FFmpeg transcoding, per-device quality profiles

`index.html:117`:
> "Adaptive HLS streaming, FFmpeg transcoding, per-device quality profiles"

Matches `content.json` pitch_bullets[4] verbatim ✅

`features.html:91`:
> "QualitySelector profiles for mobile-low, mobile-high, web, and tv-4k. CRF 23/28 libx264/libx265 with HLS master and variant playlists."

Matches `content.json` features[transcode].body verbatim ✅

---

### ✅ PASS — Live TV + DVR + EPG

`index.html:118`:
> "Live TV with DVR + EPG guide integration"

Matches `content.json` pitch_bullets[5] verbatim ✅

`features.html:107-108`:
> "ChannelManager, GuideManager, and Recorder give you scheduled recordings and a guide that doesn't make you click through menus."

Matches `content.json` features[livetv].body verbatim ✅

---

### ✅ PASS — DLNA (ContentDirectory/AvTransport/SSDP)

`index.html:119`:
> "Plugin system with a versioned manifest contract"

Matches `content.json` pitch_bullets[6] verbatim ✅

`features.html:119-120`:
> "ContentDirectory, AvTransport, and a DeviceRegistry mean your old smart TV doesn't need a new app."

Matches `content.json` features[dlna].body verbatim ✅

---

### ✅ PASS — Plugin system: LifecycleInterface + manifest

`features.html:132`:
> "LifecycleInterface + manifest schema. Drop a plugin in, the loader picks it up. See phlix-plugin-example."

Matches `content.json` features[plugins].body verbatim ✅

`plugins.html:63`:
> "Every plugin implements LifecycleInterface and ships a manifest."

Matches spec §16: *"Plugin contract (LifecycleInterface + manifest)"* ✅

---

### ✅ PASS — Phlix Hub: reverse-tunnel relay, NAT traversal

`index.html:120` (hub feature body):
> "Sign in once. Reverse-tunnel relay handles NAT. Self-hostable, or use the public hub."

Matches `content.json` features[hub].body verbatim ✅

`hub.html:63`:
> "The Hub is a cloud directory and reverse-tunnel relay. When your Phlix server starts, it opens an outbound connection to the Hub and keeps it alive."

Matches spec §16: *"Phlix Hub reverse-tunnel relay"* ✅

---

### ✅ PASS — Clients: Roku, Samsung Tizen, Windows, Mobile (React Native, beta), DLNA

`clients.html` and `download.html` correctly list all 5 clients:

| Client | Tagline | Status | Highlights match content.json |
|--------|---------|--------|------------------------------|
| Roku | "Native Roku channel" | stable | HLS playback, Hub mode, Skip intro/outro, SyncPlay ✅ |
| Samsung Tizen | "Smart TV app" | stable | Vanilla JS + webpack, Direct play + HLS transcoded, Remote-optimized UI ✅ |
| Windows | "Native desktop" | stable | Electron + React + TypeScript, System tray, Media keys, Hub mode ✅ |
| Mobile (iOS + Android) | "React Native app" | beta | Movies, TV, Music, Photos, Offline downloads, Token refresh ✅ |
| Any DLNA device | "No install required" | stable | ContentDirectory, AvTransport, Discovery via SSDP ✅ |

`content.json` clients[3].status is "beta" — mobile is correctly marked beta on clients.html ✅

---

### ✅ PASS — "Ecosystem" → "Tools" heading change (round 2 fix, no content impact)

The section heading on `download.html:107` and `docs.html:83` was changed from "Ecosystem" to "Tools". This is a **visual heading label only** — the `ecosystem-item` cards remain unchanged with their correct `what` descriptions from `content.json`. No product claims are modified. ✅

| Name | `what` from content.json | Site copy | Match |
|------|--------------------------|-----------|-------|
| phlix-server | "The media server itself — PHP 8.3+, Workerman 5.x" | ✅ exact | ✅ |
| phlix-hub | "Cloud directory + reverse-tunnel relay" | ✅ exact | ✅ |
| phlix-shared | "Shared interfaces, DTOs, event types — Composer package" | ✅ exact | ✅ |
| phlix-docs | "End-user, developer, and hub-admin docs (VitePress)" | ✅ exact | ✅ |
| phlix-plugin-example | "Reference metadata-provider plugin" | ✅ exact | ✅ |

---

### ✅ PASS — FAQ: all 6 questions match content.json verbatim

`about.html:113-138` — all 6 FAQ items match `content.json` faq[] exactly:

1. "Is Phlix like Plex / Jellyfin / Emby?" ✅
2. "Do I need to expose my server to the internet?" ✅
3. "What formats are supported?" ✅
4. "Is there a mobile app?" ✅
5. "Can I write plugins?" ✅
6. "What's the license?" ✅

---

### ✅ PASS — Footer columns match content.json

All 3 footer columns (Product / Developers / Project) with all 12 links match `content.json.footer.columns` exactly ✅

---

### ✅ PASS — License: BSD-3-Clause stated correctly

`about.html:96-97`:
> "Phlix is released under the BSD-3-Clause license."

Matches `new_site.md §16`: *"License: BSD-3-Clause"* ✅

Footer copyright also states "BSD-3-Clause" on every page ✅

---

### ✅ PASS — External link targets correct

All external links use the required URLs from `new_site.md §5`:

| Target | Required | Found |
|--------|----------|-------|
| Server source | `https://github.com/detain/phlix-server` | ✅ every page |
| Docs | `https://detain.github.io/phlix-docs` | ✅ every page |
| Plugin example | `https://github.com/detain/phlix-plugin-example` | ✅ |
| Hub | `https://github.com/detain/phlix-hub` | ✅ |
| GitHub org | `https://github.com/detain` | ✅ |

All external links use `rel="noopener noreferrer"`. ✅

---

### ✅ PASS — No invented features

Checking all pages for any claims not in `content.json` or `new_site.md §16`:

- No unsupported clients mentioned
- No made-up features (AI recommendations, streaming rights, etc.)
- No marketing superlatives without basis
- No competitor trademarks except the factual "Plex/Jellyfin/Emby alternative" framing on about.html (explicitly permitted by spec §16)

---

### ✅ PASS — Hero headline + subheadline verbatim from content.json

`index.html:99`:
> "Your media. Your library. Your Phlix."

`index.html:100`:
> "An open-source PHP media server that streams to your Roku, Samsung TV, Windows desktop, phone, and any DLNA device — with SyncPlay, Live TV, transcoding, and a hub that follows you anywhere."

Both match `content.json.hero.headline` and `content.json.hero.subheadline` exactly ✅

---

### ✅ PASS — All 7 pitch_bullets present verbatim

`index.html:113-120` — all 7 pitch bullets in order, exact text from `content.json.pitch_bullets` ✅

---

### ✅ PASS — All 8 feature descriptions verbatim

`index.html:130-199` and `features.html:64-142` — all 8 feature items with titles, bodies, and icons matching `content.json.features` exactly ✅

---

## Summary

| Check | Result |
|-------|--------|
| PHP 8.3+ / Workerman 5.x | ✅ |
| JWT / Argon2ID auth details | ✅ |
| TMDB/TVDB/Fanart.tv/NFO metadata | ✅ |
| SyncPlay NTP sync | ✅ |
| Adaptive HLS / FFmpeg transcoding | ✅ |
| Live TV + DVR + EPG | ✅ |
| DLNA (ContentDirectory/AvTransport) | ✅ |
| Plugin LifecycleInterface + manifest | ✅ |
| Hub reverse-tunnel relay | ✅ |
| All 5 clients with correct details | ✅ |
| All 5 ecosystem items verbatim ("Tools" heading only, not product copy) | ✅ |
| All 6 FAQ answers verbatim | ✅ |
| BSD-3-Clause license | ✅ |
| content.json copy intact | ✅ |
| No invented features | ✅ |
| No forbidden competitor trademarks | ✅ |
| External links correct | ✅ |

**Exit criteria: PASS** — Score 100 ≥ 90, zero ❌.

(End of file - total 224 lines)
