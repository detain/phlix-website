# Content Accuracy Review — Psychedelic Groove

**Variant**: psychedelic-groove
**Round**: 2
**Reviewer**: Code Review Agent
**Date**: 2026-07-04

## Score

- **Content accuracy**: 94 / 100

## ✅ Passed

- **PHP 8.3+** — Correctly stated in download.html:65 "Requires PHP 8.3+" and in ecosystem lists. ✓
- **Workerman 5.x** — Correctly stated in ecosystem lists. ✓
- **JWT auth with refresh tokens** — index.html:140 "JWT auth with refresh tokens, Argon2ID password hashing" ✓
- **Argon2ID password hashing** — Correctly cited in index.html:140 and features.html:99. ✓
- **Up to 5 profiles per user** — index.html:140 "up to 5 profiles per user" ✓
- **4- or 6-digit PINs** — index.html:140 "4- or 6-digit PINs" ✓
- **Rating filter from G to NC-17** — index.html:140 "rating filter from G to NC-17" ✓
- **TMDB, TVDB, Fanart.tv, local NFO** — index.html:101 "Multi-source metadata: TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache" ✓
- **24-hour cache** — Correctly stated in index.html:101. ✓
- **Adaptive HLS streaming** — index.html:102 "Adaptive HLS streaming, FFmpeg transcoding" ✓
- **FFmpeg transcoding** — Correctly stated in index.html:102. ✓
- **Per-device quality profiles** — index.html:102 "per-device quality profiles" ✓
- **SyncPlay with NTP-style time sync** — index.html:100 "Real-time SyncPlay with NTP-style time sync so movie night actually stays in sync" ✓
- **Live TV with DVR + EPG** — index.html:103 "Live TV with DVR + EPG guide integration" ✓
- **DLNA (ContentDirectory, AvTransport, SSDP)** — index.html:154 "ContentDirectory, AvTransport, and a DeviceRegistry" ✓
- **Plugin LifecycleInterface + manifest** — index.html:161 "LifecycleInterface + manifest schema" ✓
- **Phlix Hub reverse-tunnel relay** — hub.html:64 "Sign in once. The Hub's reverse-tunnel relay handles NAT traversal" ✓
- **BSD-3-Clause license** — about.html:67 "BSD-3-Clause across all Phlix projects" ✓
- **All 5 clients correctly listed** with repo URLs, highlights, and status matching content.json. ✓
- **All 5 ecosystem projects** correctly listed with repo URLs and descriptions matching content.json. ✓
- **No invented features** — All feature claims trace to content.json or the factual §16 list. No made-up features detected.
- **No competitor trademark violations** — Jellyfin/Emby mentioned only in the factual "same job, different stack" framing from content.json. ✓

## ⚠️ Concerns (non-blocking)

- **features.html:11 and clients.html:11 use custom og:description** — These are brand-flavored but not verbatim from content.json. For og:description purposes, the social sharing context may justify custom copy, but for the content contract in new_site.md §2, the meta description copy should be verbatim. Impact is low — these are social descriptions, not product claims.

- **hub.html:70 "Every official client supports Hub mode"** — This may be slightly overstating for Tizen and Mobile (beta) clients where Hub mode may be planned but not fully implemented. Impact is low — the claim is not unsupported, just potentially imprecise.

## ❌ Failures (must fix this round)

None — no must-fix content accuracy failures found. This round's fixes (Google Fonts CDN removal, aria-hidden partial fix, component hover fixes, icon stroke-width) do not affect content accuracy.

## Recommendations (ranked by impact)

1. **Consider adding Hub mode to Tizen/Mobile client cards** (impact: low, effort: low) — If those clients support Hub mode, add it to the highlights list to make the hub.html claim fully accurate.
2. **Use verbatim content.json meta.description for og:description** (impact: low, effort: low) — For full content contract compliance on features.html and clients.html.

## Evidence

- Manually verified every product fact against new_site.md §16
- Cross-referenced all 7 pitch_bullets from content.json against index.html
- Verified all 8 feature titles and bodies match content.json
- Verified all 5 clients match content.json
- Verified all 5 ecosystem items match content.json
- Verified all 6 FAQ items match content.json
