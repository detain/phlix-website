# Round 2 Content Accuracy Review — Pixel Dungeon (pixel-dungeon)

## Dimension 7 — Content Accuracy

**Score: 100/100** ✅

---

## All product claims match `content.json` verbatim

Every substantive product feature, client, ecosystem entry, and FAQ answer was checked against `shared/content.json`. All match exactly.

### Hero / pitch (index.html)

| Claim (index.html) | content.json source | Match |
|---|---|---|
| "100% self-hostable — your library never leaves your hardware unless you say so" | `pitch_bullets[0]` | ✅ |
| "Native clients on Roku, Samsung Tizen, Windows, Mobile, plus any DLNA device" | `pitch_bullets[1]` | ✅ |
| "Real-time SyncPlay with NTP-style time sync so movie night actually stays in sync" | `pitch_bullets[2]` | ✅ |
| "Multi-source metadata: TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache" | `pitch_bullets[3]` | ✅ |
| "Adaptive HLS streaming, FFmpeg transcoding, per-device quality profiles" | `pitch_bullets[4]` | ✅ |
| "Live TV with DVR + EPG guide integration" | `pitch_bullets[5]` | ✅ |
| "Plugin system with a versioned manifest contract" | `pitch_bullets[6]` | ✅ |

### Feature bodies (index.html + features.html)

All 8 feature card bodies match `features[].body` verbatim:
- `index.html:123`, `features.html:70` — Library body ✅
- `index.html:132`, `features.html:80` — SyncPlay body ✅
- `index.html:140`, `features.html:89` — Transcoding body ✅
- `index.html:148`, `features.html:98` — Auth body ✅
- `index.html:157`, `features.html:108` — Live TV body ✅
- `index.html:167`, `features.html:119` — DLNA body ✅
- `index.html:177`, `features.html:130` — Plugins body ✅
- `index.html:186`, `features.html:140` — Hub body ✅

### Clients (clients.html + download.html)

All 5 clients from `clients[]` verified for: name, tagline, highlights[], repo, status.

- `clients.html:60-72` — Roku ✅
- `clients.html:75-87` — Samsung Tizen ✅
- `clients.html:89-101` — Windows ✅
- `clients.html:104-116` — Mobile (iOS + Android) ✅
- `clients.html:118-129` — Any DLNA device ✅

`download.html:73-130` repeats the same 5 clients — all match ✅

### Ecosystem (download.html + docs.html)

All 5 ecosystem entries match `ecosystem[]`:

| Repo | download.html | docs.html | content.json |
|---|---|---|---|
| phlix-server | ✅ | ✅ | ✅ |
| phlix-hub | ✅ | ✅ | ✅ |
| phlix-shared | ✅ | ✅ | ✅ |
| phlix-docs | ✅ | ✅ | ✅ |
| phlix-plugin-example | ✅ | ✅ | ✅ |

### FAQ (about.html)

All 6 FAQ entries from `faq[]` present verbatim in `<dl class="faq-list">` at `about.html:100-118` ✅

### Server requirements (download.html)

`download.html:61` — "PHP 8.3+", "Workerman 5.x", "No Composer installation needed for the bundled release" — this is accurate per `new_site.md §16` safe facts ✅

---

## No invented features

No feature claims outside `new_site.md §16` safe facts found. Brand kit micro-copy (e.g., "Quest Complete — All Features Unlocked", "Press Start to Watch", "Your quest awaits, adventurer") is brand-voice framing, not product claims, and is permitted per `new_site.md §2`.

---

## No competitor trademark violations

`about.html:61` — "the Plex/Jellyfin/Emby migrator" — this is an audience descriptor, not a comparative advertising claim. The factual competitor framing ("Phlix is built in PHP 8.3+ on Workerman, ships with a versioned plugin contract, and includes a hub for accessing remote servers behind NAT without a third-party tunnel") comes verbatim from `content.json:136` and is permitted by `new_site.md §16`.

---

## All external links to correct GitHub org (detain)

| Link | Expected | Found | File:Line |
|---|---|---|---|
| Server source | `https://github.com/detain/phlix-server` | ✅ | All 8 footers |
| Docs | `https://detain.github.io/phlix-docs` | ✅ | All 8 pages |
| Plugin example | `https://github.com/detain/phlix-plugin-example` | ✅ | plugins.html:95, all 8 footers |
| Hub | `https://github.com/detain/phlix-hub` | ✅ | hub.html:159, all 8 footers |
| GitHub org | `https://github.com/detain` | ✅ | All 8 footers |
| phlix-shared | `https://github.com/detain/phlix-shared` | ✅ | download.html:158 |

All footer columns match `content.json.footer.columns` exactly. No broken or misdirected external links detected.
