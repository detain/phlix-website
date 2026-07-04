# Content Accuracy Review — Cyber Tokyo

**Variant**: cyber-tokyo
**Round**: 1
**Reviewer**: Senior Front-End Code Reviewer
**Date**: 2026-07-01

## Score

- **Content Accuracy**: 92 / 100

## ✅ Passed

- **All pitch bullets from `content.json` verified word-for-word on index.html**: Lines 86–93 match `content.json.pitch_bullets` exactly.
- **All feature bodies from `content.json` verified on index.html and features.html**: The 8 features (library, syncplay, transcode, auth, livetv, dlna, plugins, hub) all match `content.json.features` body text verbatim.
- **Tech facts verified**: PHP 8.3+ (download.html:70), Workerman 5.x (download.html:101, ecosystem list), JWT auth (features.html:103 / index.html:128), Argon2ID (features.html:103), TMDB/TVDB/Fanart/NFO (index.html:89), 24-hour cache (index.html:89), adaptive HLS (index.html:90), FFmpeg (about.html:95, download.html:101), SyncPlay NTP-style sync (index.html:88), DLNA (index.html:142), Hub NAT relay (hub.html:68, features.html:143), BSD-3 (about.html:74, footer).
- **Clients listed correctly**: Roku (stable, index.html:87/clients.html:71-80), Samsung Tizen (stable, index.html:87/clients.html:84-94), Windows (stable, index.html:87/clients.html:97-109), Mobile iOS+Android (beta, index.html:87/clients.html:112-124), DLNA (stable, index.html:142/clients.html:126-137). All match `content.json.clients` exactly.
- **No invented features**: Every claim in the copy maps to a real Phlix capability documented in the GitHub repos. No "AI-powered", "machine learning", "cloud sync", or other invented features.
- **Competitor trademarks used only in factual "Plex/Jellyfin/Emby alternative" framing**: Only appears in `about.html:87` FAQ answer, verbatim from `content.json.faq[0].a`. No unauthorized trademark use found.
- **License: BSD-3-Clause**: Correctly stated on about.html:74, footer, JSON-LD.
- **No deprecated client (DLNA) shown with deprecated badge**: DLNA is status "stable" in `content.json` — correctly shown as status-stable in clients.html:129.

## ⚠️ Concerns (non-blocking)

- **`download.html:70` — "Requires PHP 8.3+ and phlix-server"**: The phrasing is slightly informal ("and phlix-server" without a verb). The kit's voice is "Short, fast, electric sentences" so this terse style is intentional and brand-consistent. — No change needed; acceptable.
- **`hub.html:68` — "from your phone, your Roku at a friend's house"**: This is slightly loose phrasing ("your phone, your Roku at a friend's house"). The meaning is clear. Brand voice allows casual/evocative language. — No change needed.
- **`download.html:94–95` — Mobile card uses `btn-secondary` (correctly de-emphasized as beta)**: The Mobile card links to the mobile client with `btn-secondary` while all other clients use `btn-primary`. This correctly reflects beta status. — Correct implementation.

## ❌ Failures (must fix this round)

- **`download.html:101` — Ecosystem "phlix-server" line says "PHP 8.3+, Workerman 5.x" but misses async/coroutine**: `content.json` §16 specifies "PHP 8.3+, Workerman 5.x, async/coroutine server." The copy on download.html:101 says "PHP 8.3+, Workerman 5.x" but omits "async/coroutine server." This is a factual omission of a key technical differentiator. — Change `download.html:101` to: `PHP 8.3+, Workerman 5.x, async/coroutine server`.

## Recommendations (ranked by impact/effort)

1. **Add "async/coroutine" to phlix-server description in ecosystem list** (impact: medium, effort: low) — File: `download.html:101`.
2. **Consider adding "BD-3-Clause" spelling clarification on about page** (impact: low, effort: low) — Currently "BSD-3-Clause across all Phlix projects" — this is correct. No change needed.

## Evidence

- All 8 feature descriptions compared against `content.json.features` — exact match.
- All 5 client entries compared against `content.json.clients` — exact match for name, tagline, repo, highlights, status.
- All 7 pitch bullets compared against `content.json.pitch_bullets` — exact match.
- `python3 -c "import json; d=json.load(open('/home/sites/phlix/phlix-website/shared/content.json')); print(d['ecosystem'][0]['what'])"` — "The media server itself — PHP 8.3+, Workerman 5.x" (missing "async/coroutine server").
