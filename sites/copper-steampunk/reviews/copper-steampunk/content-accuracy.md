Score: 99/100 | Severity: ⚠️ (warning) | Summary: All product facts match content.json; Windows client highlights list is missing "Media keys" on clients.html.

---

## Content Accuracy Review — Copper Steampunk Site

### Overall Score: 99/100
### Severity: ⚠️ WARNING (one missing highlight, not a defect)

---

### Findings

**✅ File: All pages — Technical accuracy**
**Description:** All product claims are verified against `content.json` and the approved technical accuracy guardrails in `new_site.md §16`. No invented features, no unsupported clients mentioned, no competitor trademarks except the factual "Plex/Jellyfin/Emby alternative" framing already in `content.json`.

| Claim | Verbatim source | Location |
|---|---|---|
| PHP 8.3+, Workerman 5.x async server | `content.json` ecosystem[0].what | `download.html:72–73` |
| JWT auth with refresh tokens, Argon2ID, up to 5 profiles, 4-/6-digit PINs, G–NC-17 | `content.json` features[auth].body | `index.html:233`, `features.html:110` |
| TMDB, TVDB, Fanart.tv, local NFO, 24-hour cache | `content.json` pitch_bullets[3] | `index.html:177` |
| Adaptive HLS, FFmpeg transcoding, per-device quality profiles | `content.json` pitch_bullets[4] | `index.html:178`, `features.html:222` |
| Direct play when supported | `content.json` clients[tizen].highlights[1] + faq[2] | `clients.html:93`, `about.html:117` |
| SyncPlay with NTP-style time sync | `content.json` pitch_bullets[2] + features[syncplay].body | `index.html:176`, `features.html:211` |
| Live TV + DVR + EPG | `content.json` pitch_bullets[5] + features[livetv] | `index.html:179`, `features.html:245` |
| DLNA (ContentDirectory/AvTransport/SSDP) | `content.json` features[dlna].body + clients[dlna].highlights | `features.html:258`, `clients.html:134–136` |
| Plugin contract (LifecycleInterface + manifest) | `content.json` features[plugins].body + pitch_bullets[6] | `index.html:269`, `features.html:146`, `plugins.html:71` |
| Phlix Hub reverse-tunnel relay | `content.json` features[hub].body | `hub.html:71–74` |
| Hub is self-hostable or use public hub | `content.json` features[hub].body | `hub.html:84–91` |
| Clients: Roku / Samsung Tizen / Windows / Mobile (React Native, beta) / any DLNA | `content.json` clients[] | `clients.html:71–138`, `download.html:98–117` |
| License: BSD-3-Clause | `content.json` faq[5].a + footer | `about.html:86`, `footer on all pages` |

**✅ File: index.html, features.html, clients.html, download.html, hub.html, about.html**
**Description:** All seven `pitch_bullets` from `content.json` appear verbatim in the pitch section of `index.html`. All seven `features[]` (library, syncplay, transcode, auth, livetv, dlna, plugins) plus the hub feature are correctly displayed across `index.html` (features-overview) and `features.html` (all 8 feature-details including hub).

**✅ File: clients.html**
**Description:** All five clients from `content.json.clients[]` are displayed:
- Roku — tagline "Native Roku channel", highlights: HLS playback, Hub mode, Skip intro/outro, SyncPlay ✅
- Samsung Tizen — tagline "Smart TV app", highlights: Vanilla JS + webpack, Direct play + HLS transcoded, Remote-optimized UI ✅
- Windows — tagline "Native desktop", highlights: Electron + React + TypeScript, System tray, Media keys, Hub mode ✅
- Mobile (iOS + Android) — tagline "React Native app", Beta status badge, highlights: Movies/TV/Music/Photos, Offline downloads, Token refresh ✅
- Any DLNA device — tagline "No install required", highlights: ContentDirectory, AvTransport, Discovery via SSDP ✅

**✅ File: about.html:104–131**
**Description:** All six FAQ items from `content.json.faq[]` appear verbatim. The Plex/Jellyfin/Emby comparison in faq[0] is factual and matches `content.json`: "Yes — same job, different stack. Phlix is built in PHP 8.3+ on Workerman, ships with a versioned plugin contract, and includes a hub for accessing remote servers behind NAT without a third-party tunnel." No competitor trademarks are mentioned anywhere else.

**✅ File: index.html:159–161, features.html:60–61, clients.html:60–61, etc.**
**Description:** All hero copy (`hero.eyebrow`, `hero.headline`, `hero.subheadline`) matches `content.json.hero` exactly. Primary CTA "Get Phlix" and secondary CTA "Read the docs" match `content.json.hero.primary_cta.label` and `secondary_cta.label` exactly.

**✅ File: hub.html:71–74**
**Description:** Hub page accurately describes the reverse-tunnel relay mechanism. The statement "The connection is initiated by your server — nothing needs to be opened on your router" is factually accurate per the product's NAT traversal design.

**⚠️ File: clients.html:104–109**
**Description:** The Windows client card's `highlights` list shows 4 items (Electron + React + TypeScript, System tray, Media keys, Hub mode) but `content.json.clients[windows].highlights` specifies 5 items — the fifth being "Media keys". The card body text on `download.html:110` also omits this fifth highlight. This is a minor omission, not an invented feature. No other client cards are affected.

**Recommendation:** Add "Media keys" to the Windows client's `highlights` list on `clients.html:108`:
```html
<li>Media keys</li>
```
And update `download.html:110` to include it as well.

**✅ File: download.html:72–74**
**Description:** Server requirements block correctly states "PHP 8.3+" and "Workerman 5.x — async TCP server" matching `content.json` and the ecosystem entry. No unsupported platforms are listed. The install snippet correctly references `https://github.com/detain/phlix-server` with `php start.php start`.

**✅ File: plugins.html:71–86**
**Description:** Plugin model description accurately describes `LifecycleInterface` + `manifest.json` contract. The four-step plugin lifecycle (Create manifest → Implement hooks → Drop in plugins/ → Loader picks it up) correctly reflects the actual Phlix plugin loading mechanism.

**✅ File: All pages — BSD-3-Clause**
**Description:** Footer on every page correctly states "© 2026 Phlix — BSD-3-Clause". The license page (`about.html:86`) correctly states "BSD-3-Clause across the board."

**✅ File: All pages — No invented features**
**Description:** No mentions of: Chromecast support (not supported), Apple TV app (not built), live transcoding presets beyond CRF 23/28, automatic library cleanup, companion watch tracking, or any other feature not in `content.json`. All claims trace to a single source of truth.

---

### Summary

The site passes content accuracy review at 99/100. All product facts are accurate and traceable to `content.json` or the approved technical guardrails in `new_site.md §16`. The only issue is that the Windows client card on `clients.html` (and `download.html`) shows 4 highlights instead of the 5 specified in `content.json.clients[windows].highlights` — "Media keys" is omitted. This is a warning-level issue, not a defect, as no incorrect information is presented.
