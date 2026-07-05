# Content Accuracy

## Score: 100/100

## Severity: ✅

## Findings
No issues found. All product claims are verified against the ground truth references.

## What passes
- `index.html:86` — "Your media. Your library. Your Phlix." ✅ matches `content.json.hero.headline`
- `index.html:87` — Full subheadline matches `content.json.hero.subheadline` verbatim ✅
- `index.html:101-108` — All 7 pitch_bullets match `content.json.pitch_bullets` exactly ✅
- `index.html:124` — "Folder-watcher hashes mtimes, scanner parses S01E02 / (2020) titles, ItemRepository hydrates metadata_json. Add a file, see it appear." ✅ matches `content.json.features[0].body`
- `index.html:133` — "Weighted-mean NTP offset over 5 samples" ✅ matches `content.json.features[1].body`
- `index.html:142` — "QualitySelector profiles for mobile-low, mobile-high, web, and tv-4k. CRF 23/28 libx264/libx265" ✅ matches `content.json.features[2].body`
- `index.html:151` — "JWT auth with refresh tokens, Argon2ID password hashing, up to 5 profiles per user, 4- or 6-digit PINs, rating filter from G to NC-17." ✅ matches `content.json.features[3].body`
- `index.html:160` — "ChannelManager, GuideManager, and Recorder give you scheduled recordings and a guide that doesn't make you click through menus." ✅ matches `content.json.features[4].body`
- `index.html:169` — "ContentDirectory, AvTransport, and a DeviceRegistry" ✅ matches `content.json.features[5].body`
- `index.html:178` — "LifecycleInterface + manifest schema. Drop a plugin in, the loader picks it up. See phlix-plugin-example." ✅ matches `content.json.features[6].body`
- `index.html:187` — "Sign in once. Reverse-tunnel relay handles NAT. Self-hostable, or use the public hub." ✅ matches `content.json.features[7].body`
- `download.html:66` — "Requires PHP 8.3+ and phlix-server." ✅ matches `new_site.md §16` and `content.json`
- `download.html:101-106` — Ecosystem entries match `content.json.ecosystem[]` exactly ✅
- `download.html:74-84` — Client cards: "HLS playback, Hub mode, Skip intro/outro, SyncPlay" (Roku), "Vanilla JS + webpack, Direct play + HLS transcoded" (Samsung Tizen), "Electron + React + TypeScript, system tray, media keys" (Windows) — all match `content.json.clients[]` highlights ✅
- `download.html:89` — "React Native app in beta. Movies, TV, Music, Photos, offline downloads." ✅ matches `content.json.clients[3]`
- `download.html:94` — "No install required. ContentDirectory, AvTransport, Discovery via SSDP" ✅ matches `content.json.clients[4]`
- `about.html:78-98` — All 6 FAQ items match `content.json.faq[]` exactly ✅
- Technical facts from `new_site.md §16` verified throughout: PHP 8.3+ ✅, Workerman 5.x ✅, JWT ✅, Argon2ID ✅, SyncPlay + NTP sync ✅, DLNA/ContentDirectory/AvTransport ✅, FFmpeg/HLS ✅, Plugin LifecycleInterface ✅, Phlix Hub reverse-tunnel ✅, BSD-3-Clause ✅, TMDB/TVDB/Fanart.tv/NFO ✅, up to 5 profiles ✅, 4-/6-digit PINs ✅, G–NC-17 rating filter ✅
- Clients: Roku ✅, Samsung Tizen ✅, Windows ✅, Mobile (React Native, beta) ✅, Any DLNA device ✅ — all match `new_site.md §16`
- No invented features, no competitor trademark violations (no mentions of Plex/Jellyfin/Emby except factual comparison in FAQ)
- No mention of unsupported clients

## Verdict
Every product claim across all 8 pages matches the ground truth in `new_site.md §16` and `content.json` verbatim. Content accuracy is perfect — no deviations, no invented claims, no technical inaccuracies.
