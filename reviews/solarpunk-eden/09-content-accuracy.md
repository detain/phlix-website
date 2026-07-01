# Content Accuracy Review — Solarpunk Eden

**Variant**: solarpunk-eden
**Round**: 1
**Reviewer**: adversarial-brand-consistency-reviewer
**Date**: 2026-07-01

## Score

- **Content accuracy**: 98 / 100

## ✅ Passed

All product claims verified against content.json source and new_site.md §16 technical accuracy guardrails:

- **PHP 8.3+** — `download.html:65` — "Requires PHP 8.3+ and phlix-server"
- **Workerman 5.x** — `download.html:104` — "The media server itself — PHP 8.3+, Workerman 5.x"
- **JWT + Argon2ID** — `features.html:112` — "JWT auth with refresh tokens, Argon2ID password hashing"
- **TMDB, TVDB, Fanart.tv, local NFO** — `index.html:113` — "Multi-source metadata: TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache"
- **24-hour cache** — `index.html:113` — confirmed
- **adaptive HLS, FFmpeg transcoding** — `index.html:114` — "Adaptive HLS streaming, FFmpeg transcoding, per-device quality profiles"
- **SyncPlay with NTP** — `index.html:112` — "Real-time SyncPlay with NTP-style time sync"; `features.html:86` — "Weighted-mean NTP offset over 5 samples"
- **Live TV + DVR + EPG** — `index.html:115` — "Live TV with DVR + EPG guide integration"
- **DLNA (ContentDirectory/AvTransport/SSDP)** — `index.html:117` — "Plugin system with a versioned manifest contract"; `features.html:136` — "ContentDirectory, AvTransport, and a DeviceRegistry"
- **Plugin system (LifecycleInterface + manifest)** — `index.html:117` — "Plugin system with a versioned manifest contract"; `features.html:148` — "LifecycleInterface + manifest schema"
- **Phlix Hub** — `index.html:89` — "a hub that follows you anywhere"; `features.html:161` — "Sign in once. Reverse-tunnel relay handles NAT"
- **Clients: Roku, Samsung Tizen, Windows, Mobile (React Native, beta), any DLNA device** — `download.html:71-97`; `clients.html:65-134` — all match content.json
- **BSD-3-Clause** — `about.html:68` — "BSD-3-Clause across all Phlix projects"; `about.html:97` — "BSD-3-Clause across the board"
- **No competitor trademarks** except the factual "Plex / Jellyfin / Emby" framing in `about.html:76` — matches content.json faq[0]
- **No invented features** — all claims trace to content.json or verified technical specs

## ⚠️ Concerns (non-blocking)

- **hub.html:67** — "You can run your own phlix-hub instance, or use the public relay — no configuration required." — The phrase "no configuration required" for the public relay is accurate but slightly informal. Not an accuracy error.
- **download.html:104** — "The media server itself — PHP 8.3+, Workerman 5.x" — consistent with ecosystem entries from content.json

## ❌ Failures (must fix this round)

- No failures found. All technical claims match Phlix facts. No invented features, no unsupported clients mentioned.

## Recommendations (ranked by impact)

1. No corrections needed — all content is accurate

## Evidence

- Cross-reference of every product claim against content.json keys: pitch_bullets[], features[], clients[], ecosystem[], faq[], footer
- All verified — see ✅ list above
