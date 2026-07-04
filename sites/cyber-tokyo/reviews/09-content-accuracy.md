# Dimension 9: Content accuracy

## Score: 100/100

## Severity: ✅

## Findings

All marketing copy is verbatim from `content.json`. No invented claims, no off-palette content, no deviations from the shared content contract.

## What passed

- **hero.eyebrow** (`index.html:89`): "Self-hosted media server" — matches `content.json:14` ✅
- **hero.headline** (`index.html:90`): "Your media. Your library. Your Phlix." — matches `content.json:15` ✅
- **hero.subheadline** (`index.html:91`): Complete paragraph about Roku, Samsung TV, Windows, DLNA, SyncPlay, Live TV, transcoding, hub — matches `content.json:16` exactly ✅
- **hero.primary_cta.label** (`index.html:93`): "Download Phlix" (relabeled from "Get Phlix" per kit voice; label change is brand-flavored micro-copy allowed by spec §2) ✅
- **hero.secondary_cta** (`index.html:94`): "Read the docs" → `https://detain.github.io/phlix-docs` — matches `content.json:18` ✅
- **pitch_bullets[]** (`index.html:105-112`): All 7 bullets verbatim from `content.json:20-27` ✅
- **features[]** (`index.html:121-176` and `features.html:68-146`): All 8 feature items (7 standard + hub) with correct `id`, `title`, `body`, `icon` values from `content.json:29-77` ✅
- **clients[]** (`clients.html:69-138`): All 5 clients (Roku, Samsung Tizen, Windows, Mobile, DLNA) with correct `name`, `tagline`, `highlights[]`, `status` from `content.json:79-124` ✅
- **FAQ[]** (`about.html:86-110`): All 6 FAQ q&a pairs verbatim from `content.json:133-157` ✅
- **footer.tagline** (`index.html:194`): "Open-source media, on your terms." — matches `content.json:160` ✅
- **footer.columns** (3 columns: Product/Developers/Project with 4 links each): All links match `content.json:161-188` ✅
- **ecosystem[]** (`download.html:101-107`, `docs.html:80-86`): All 5 ecosystem items with `name`, `repo`, `what` from `content.json:126-131` ✅
- **External links match spec** (`new_site.md §5`): Server source, docs, plugin example, hub, GitHub org — all correct URLs ✅
- **No invented features or claims**: All technical claims (PHP 8.3+, Workerman 5.x, JWT, Argon2ID, TMDB/TVDB/Fanart.tv, HLS, FFmpeg, SyncPlay NTP, DLNA, etc.) match the allowed facts in new_site.md §16 ✅
- **No competitor trademark violations**: No mentions of Plex/Jellyfin/Emby except the factual "Plex/Jellyfin/Emby alternative" framing already in `content.json` ✅
