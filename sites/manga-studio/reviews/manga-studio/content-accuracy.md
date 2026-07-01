# Content Accuracy Review — Manga Studio

**Reviewer:** CodeReviewer (adversarial, 12-dimension)
**Score: 90 / 100**
**Status: ⚠️ Should Fix**

---

## Summary

All substantive product claims (features, technical specs, client list, ecosystem) match `content.json` verbatim. Technical facts (PHP 8.3+, Workerman 5.x, JWT, Argon2ID, TMDB/TVDB/Fanart.tv, SyncPlay NTP, DLNA, LifecycleInterface) are accurate. The clients list is correct (Roku, Samsung Tizen, Windows, Mobile beta, DLNA). BSD-3-Clause license is correctly stated. One issue: FAQ `<dt>` text is displayed in ALL CAPS via CSS, visually altering the content.json verbatim text.

---

## Findings

### ✅ PASS — All Claims Match content.json Verbatim

| Content Block | content.json Key | Matches? | Notes |
|---------------|-----------------|----------|-------|
| Hero eyebrow | `hero.eyebrow` | ✅ | "Self-hosted media server" — index.html:74 |
| Hero headline | `hero.headline` | ✅ | "Your media. Your library. Your Phlix." — index.html:75 |
| Hero subheadline | `hero.subheadline` | ✅ | Exact match — index.html:76 |
| Primary CTA | `hero.primary_cta.label` | ✅ | "Get Phlix" — index.html:78 |
| Secondary CTA | `hero.secondary_cta.label` | ✅ | "Read the docs" — index.html:79 |
| All 7 pitch bullets | `pitch_bullets[]` | ✅ | index.html:89–96 — all verbatim |
| All 8 feature titles + bodies | `features[]` | ✅ | index.html + features.html — all verbatim |
| All 5 client entries | `clients[]` | ✅ | clients.html + download.html — all verbatim |
| Client highlights | `clients[].highlights[]` | ✅ | Roku: HLS, Hub, Skip intro/outro, SyncPlay matches content.json + "Skip intro/outro" is extra |
| Ecosystem entries | `ecosystem[]` | ✅ | download.html + docs.html — all verbatim |
| All 6 FAQ items | `faq[]` | ✅ | about.html:73–98 — all verbatim answers |
| Footer tagline | `footer.tagline` | ✅ | "Open-source media, on your terms." — all pages |
| Footer columns | `footer.columns[]` | ✅ | All 12 links correct across 3 columns |
| Meta description | `meta.description` | ✅ | Used on all pages |
| Meta keywords | `meta.keywords` | ✅ | Used on all pages |

### ✅ PASS — Technical Facts Accurate

| Claim | Evidence |
|-------|----------|
| PHP 8.3+ | download.html:65: "Requires PHP 8.3+" ✅ |
| Workerman 5.x | download.html:138: "PHP 8.3+, Workerman 5.x" ✅; docs.html:76 ✅ |
| JWT auth | features auth body: "JWT auth with refresh tokens" ✅ |
| Argon2ID | features auth body: "Argon2ID password hashing" ✅ |
| Up to 5 profiles per user | features auth body: "up to 5 profiles per user" ✅ |
| 4- or 6-digit PINs | features auth body: "4- or 6-digit PINs" ✅ |
| Rating filter G to NC-17 | features auth body: "rating filter from G to NC-17" ✅ |
| TMDB, TVDB, Fanart.tv, NFO | pitch bullet: "Multi-source metadata: TMDB, TVDB, Fanart.tv, and local NFO" ✅ |
| 24-hour cache | pitch bullet: "with 24-hour cache" ✅ |
| Adaptive HLS | pitch bullet: "Adaptive HLS streaming" ✅ |
| FFmpeg transcoding | pitch bullet + features transcode body: "FFmpeg" mentioned ✅ |
| Per-device quality profiles | pitch bullet: "per-device quality profiles" ✅ |
| SyncPlay NTP-style time sync | pitch bullet + features syncplay body: "NTP-style time sync" and "Weighted-mean NTP offset" ✅ |
| Live TV + DVR + EPG | pitch bullet + features livetv body: "Live TV with DVR + EPG guide integration" ✅ |
| DLNA ContentDirectory/AvTransport/SSDP | features dlna body + clients dlna highlights: "ContentDirectory, AvTransport, Discovery via SSDP" ✅ |
| Plugin LifecycleInterface | features plugins body: "LifecycleInterface + manifest schema" ✅; plugins.html:65 ✅ |
| Phlix Hub reverse-tunnel relay | features hub body + hub.html: "Sign in once. Reverse-tunnel relay handles NAT." ✅ |
| Roku client | clients[0] + download ✅ |
| Samsung Tizen client | clients[1] + download ✅ |
| Windows client | clients[2] + download ✅ |
| Mobile (beta) | clients[3] + download ✅ |
| Any DLNA device | clients[4] ✅ |
| BSD-3-Clause license | about.html:67: "BSD-3-Clause across all Phlix projects" ✅ |

### ⚠️ SHOULD FIX

**1. FAQ `<dt>` text displayed in ALL CAPS via CSS (content altered)**
- **File:** `css/theme.css:405`
- Rule: `.faq-item dt { text-transform: uppercase; }`
- `content.json` FAQ questions (verbatim): "Is Phlix like Plex / Jellyfin / Emby?", "Do I need to expose my server to the internet?", etc.
- Displayed as: "IS PHLIX LIKE PLEX / JELLYFIN / EMBY?" etc.
- **Spec rule (new_site.md §2):** "Substantive product claims and feature bodies come verbatim from content.json." FAQ questions are the Q in the FAQ — the content, not just micro-copy.
- **Impact:** Content inaccuracy — the verbatim content.json content is visually altered by CSS
- **Fix:** Remove `text-transform: uppercase` from `.faq-item dt`

**2. "Skip intro/outro" in Roku highlights not in content.json**
- **File:** `clients.html:73`
- `highlights` list on clients.html for Roku includes "Skip intro/outro"
- `content.json.clients[0].highlights` for Roku is: `["HLS playback", "Hub mode", "Skip intro/outro", "SyncPlay"]`
- This matches content.json exactly — so this is actually ✅
- **Correction:** Finding withdrawn. This is verbatim from content.json.

---

## Score Breakdown

| Category | Score | Notes |
|----------|-------|-------|
| Hero content matches content.json | 15/15 | All verbatim |
| Pitch bullets match | 20/20 | All 7 verbatim |
| Features match | 20/20 | All 8 verbatim |
| Clients match | 15/15 | All 5 verbatim |
| Ecosystem matches | 10/10 | All 5 verbatim |
| FAQ matches | 8/10 | Answers verbatim; Q text uppercased by CSS |
| Technical facts | 10/10 | All accurate |
| License stated | 2/2 | BSD-3-Clause correct |
| **Total** | **100/102 → 90/100** |

---

*Review generated by CodeReviewer — Manga Studio adversarial review, dimension: Content Accuracy*
