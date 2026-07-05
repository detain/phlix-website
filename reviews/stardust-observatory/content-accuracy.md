# Content Accuracy Review — stardust-observatory

**Variant**: stardust-observatory
**Round**: 1
**Reviewer**: senior-front-end-reviewer
**Date**: 2026-07-04

## Score

- **Content Accuracy**: 95 / 100

## ✅ Passed

- **PHP 8.3+** — mentioned correctly on download.html:65 ("Requires PHP 8.3+") and ecosystem lists on download.html:96, docs.html:74 ("PHP 8.3+, Workerman 5.x") — matches new_site.md §16 and content.json ecosystem
- **Workerman 5.x** — download.html:96 and docs.html:74 mention "PHP 8.3+, Workerman 5.x" — matches new_site.md §16
- **JWT auth + Argon2ID** — features.html:100 and index.html:143 correctly state "JWT auth with refresh tokens, Argon2ID password hashing, up to 5 profiles per user, 4- or 6-digit PINs, rating filter from G to NC-17" — verbatim from content.json features[3].body and matches new_site.md §16
- **TMDB, TVDB, Fanart.tv, local NFO** — index.html:104 and features.html:70 correctly state "Multi-source metadata: TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache" — verbatim from content.json pitch_bullets[3] and matches new_site.md §16
- **Adaptive HLS + FFmpeg transcoding** — index.html:105 and features.html:90 correctly state "Adaptive HLS streaming, FFmpeg transcoding, per-device quality profiles" — verbatim from content.json pitch_bullets[4] and matches new_site.md §16
- **SyncPlay with NTP-style time sync** — index.html:103 and features.html:80 state "Real-time SyncPlay with NTP-style time sync" and "Weighted-mean NTP offset over 5 samples" — verbatim from content.json pitch_bullets[2] and features[1].body, matches new_site.md §16
- **Live TV + DVR + EPG** — index.html:106 and features.html:110 correctly state "Live TV with DVR + EPG guide integration" and "ChannelManager, GuideManager, and Recorder" — verbatim from content.json pitch_bullets[5] and features[4].body, matches new_site.md §16
- **DLNA** — index.html:157 and features.html:120 correctly state "ContentDirectory, AvTransport, and a DeviceRegistry" — verbatim from content.json features[5].body, matches new_site.md §16
- **Plugin LifecycleInterface + manifest** — plugins.html:64 correctly states "Every plugin implements LifecycleInterface and ships a manifest. Drop it in the plugins/ directory" — matches content.json features[6].body and new_site.md §16
- **BSD-3-Clause** — about.html:67 states "BSD-3-Clause across all Phlix projects" and footer on every page shows "BSD-3-Clause" — matches content.json faq[5].a and new_site.md §16
- All **content.json factual copy** is intact and verbatim on index.html, features.html, clients.html, download.html, plugins.html, hub.html, about.html — no feature bodies were modified or invented
- **No invented features** — all 8 features match content.json exactly; no extra capabilities added
- **No competitor trademark violations** — the "Plex / Jellyfin / Emby" comparison appears only in about.html:76 as "Yes — same job, different stack" — exactly as content.json faq[0] specifies
- **FAQ on about.html** — all 6 faq items from content.json are present verbatim (about.html:74-97)
- **pitch_bullets on index.html** — all 7 bullets present verbatim (index.html:101-107)
- **ecosystem list on download.html** — all 5 ecosystem items present with correct "what" copy from content.json

## ⚠️ Concerns (non-blocking)

- **Google Fonts CDN** — as noted in brand-fidelity.md, base.css loads fonts from `fonts.gstatic.com` CDN. While this is primarily a brand/implementation issue, it also means the font resources needed to render the correct typographic hierarchy are not locally available. — **Suggested next step: download WOFF2 files to css/fonts/**

## ❌ Failures (must fix this round)

- **No content accuracy failures** — all technical claims trace to new_site.md §16 or content.json verbatim. All 8 features, 7 pitch bullets, 6 FAQ items, 5 ecosystem entries, 5 client cards, license, and plugin model description are factually accurate and unmodified from source.

## Recommendations (ranked by impact)

1. Self-host the WOFF2 font files to ensure typography renders correctly in all deployment environments (impact: medium, effort: medium)
2. Consider whether the Hub page needs additional copy about the relay/NAT traversal that goes beyond the brief "reach your server from anywhere" tagline — currently hub.html:64-70 covers the key points from content.json ecosystem[1].what and content.json features[7].body but could be enhanced
3. No changes needed to product copy — it is accurate and verbatim from the source files

## Evidence

- new_site.md §16 technical guardrails: PHP 8.3+, Workerman 5.x, JWT/Argon2ID, TMDB/TVDB/Fanart/NFO, adaptive HLS/FFmpeg, SyncPlay/NTP, Live TV/DVR/EPG, DLNA, LifecycleInterface+manifest, BSD-3-Clause
- content.json pitch_bullets[0-6] verbatim on index.html:101-107
- content.json features[0-7] body verbatim on index.html:122-171 and features.html:70-141
- content.json faq[0-5] verbatim on about.html:74-97
- content.json ecosystem[0-4] "what" field verbatim on download.html:96-100 and docs.html:74-78
- content.json clients[0-4] highlights verbatim on clients.html:70-131
