# Dimension 9: Content Accuracy — Review

**Score: 94/100**

---

## Findings

### ✅ PASS — PHP 8.3+, Workerman 5.x, async/coroutine server
- `download.html:72` — "PHP 8.3+ with the mbstring, xml, gd, and zip extensions. Workerman 5.x."
- `download.html:159` — "The media server itself — PHP 8.3+, Workerman 5.x, async/coroutine server."
- `docs.html:97` — "The media server itself — PHP 8.3+, Workerman 5.x, async/coroutine server."
- `about.html:71` — "Phlix is a self-hostable media server built in PHP on Workerman"
- Content matches ground truth accurately.

### ✅ PASS — JWT auth + Argon2ID, up to 5 profiles/user, 4-/6-digit PINs, G–NC-17 rating filter
- `index.html:206` — "JWT auth with refresh tokens, Argon2ID password hashing, up to 5 profiles per user, 4- or 6-digit PINs, rating filter from G to NC-17."
- `features.html:103` — Same text, verbatim from content.json
- Accurate match to content.json feature body and ground truth.

### ✅ PASS — TMDB, TVDB, Fanart.tv, local NFO with 24-hour cache
- `index.html:146` — "Multi-source metadata: TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache"
- `content.json:25` — "Multi-source metadata: TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache" — verbatim
- Accurate match.

### ✅ PASS — Adaptive HLS, FFmpeg transcoding, per-device quality profiles; direct play when supported
- `index.html:153` — "Adaptive HLS streaming, FFmpeg transcoding, per-device quality profiles"
- `features.html:94` — "QualitySelector profiles for mobile-low, mobile-high, web, and tv-4k. CRF 23/28 libx264/libx265 with HLS master and variant playlists."
- `download.html:115` — "Direct play + HLS"
- Accurate match to content.json + ground truth.

### ✅ PASS — SyncPlay with NTP-style time sync
- `index.html:139` — "Real-time SyncPlay with NTP-style time sync so movie night actually stays in sync"
- `features.html:85` — "Weighted-mean NTP offset over 5 samples keeps every device locked to the same frame."
- `clients.html:79` — "SyncPlay" listed in Roku highlights
- `content.json:23` — "Real-time SyncPlay with NTP-style time sync..." — verbatim

### ✅ PASS — Live TV + DVR + EPG
- `index.html:159` — "Live TV with DVR + EPG guide integration"
- `features.html:111` — "ChannelManager, GuideManager, and Recorder give you scheduled recordings and a guide that doesn't make you click through menus."
- Accurate match to content.json.

### ✅ PASS — DLNA (ContentDirectory/AvTransport/SSDP)
- `index.html:222` — "ContentDirectory, AvTransport, and a DeviceRegistry mean your old smart TV doesn't need a new app."
- `clients.html:134-136` — "ContentDirectory, AvTransport, Discovery via SSDP" in DLNA device highlights
- `content.json:63` — "ContentDirectory, AvTransport, and a DeviceRegistry" — verbatim

### ✅ PASS — Plugin contract (LifecycleInterface + manifest)
- `index.html:229` — "LifecycleInterface + manifest schema. Drop a plugin in, the loader picks it up."
- `features.html:129` — Same text verbatim
- `plugins.html:71` — "LifecycleInterface" and "manifest.json" both mentioned explicitly
- `about.html:130` — "Implement LifecycleInterface, ship a manifest, drop it in the plugins directory."
- Accurate match to content.json.

### ✅ PASS — Phlix Hub reverse-tunnel relay
- `hub.html:71` — "Phlix Hub is a cloud directory and reverse-tunnel relay..."
- `hub.html:74` — "...the Hub brokers the connection to your server — no port forwarding..."
- `features.html:138` — "Sign in once. Reverse-tunnel relay handles NAT. Self-hostable, or use the public hub."
- Accurate match to content.json.

### ✅ PASS — Clients: Roku, Samsung Tizen, Windows, Mobile (React Native, beta), any DLNA device
- `clients.html:72` — Roku, status-stable
- `clients.html:88` — Samsung Tizen, status-stable
- `clients.html:101` — Windows, status-stable
- `clients.html:116` — "Mobile (iOS + Android)" / "React Native app" / status-beta
- `clients.html:130` — "Any DLNA device" / status-stable
- Accurate match to content.json clients array.

### ✅ PASS — License: BSD-3-Clause
- `about.html:83` — "BSD-3-Clause across the board..."
- `about.html:135` — "BSD-3-Clause across the board."
- `index.html:281` — footer "© 2026 Phlix — BSD-3-Clause"
- Accurate match.

### ✅ PASS — NO competitor trademarks except "Plex/Jellyfin/Emby alternative"
- `about.html:109-110` — FAQ: "Is Phlix like Plex / Jellyfin / Emby?" / "Yes — same job, different stack. Phlix is built in PHP 8.3+ on Workerman..." — this is the explicit framing already in content.json
- No unauthorized competitor trademarks elsewhere
- Accurate.

### ⚠️ WARN — content.json copy not intact on docs page (all links point to same URL)
- `docs.html:69-87` — All four doc links (User Guide, API Reference, Developer Docs, Hub Admin) point to the same URL: `https://detain.github.io/phlix-docs`
- new_site.md §3.6 says docs page should link to specific doc sections: "User guide / API reference / Developer docs / Hub admin links"
- The content.json ecosystem items and individual feature descriptions are correctly verbatim, but the four doc section links in the grid all use the same href — not a content.json issue, a spec deviation
- Content itself (ecosystem list) is intact verbatim from content.json

### ✅ PASS — content.json copy intact on home page (key sections verified verbatim)
- `index.html:102` — hero.headline matches content.json verbatim
- `index.html:103` — hero.subheadline matches content.json verbatim (within line length)
- `index.html:124,132,139,146,153,159,165` — All 7 pitch_bullets match content.json verbatim
- `index.html:182,189,198,206,213,222,229` — All 7 feature descriptions match content.json verbatim
- `index.html:251` — footer tagline matches content.json
- `index.html:265-277` — All 12 footer links match content.json columns structure

### ✅ PASS — All external link targets are correct
- Server source: `https://github.com/detain/phlix-server` ✅
- Docs: `https://detain.github.io/phlix-docs` ✅
- Plugin example: `https://github.com/detain/phlix-plugin-example` ✅
- Hub: `https://github.com/detain/phlix-hub` ✅
- GitHub org: `https://github.com/detain` ✅
- API reference: `https://detain.github.io/phlix-docs/reference` ✅

### ⚠️ WARN — download.html Twitter description uses different (shorter) copy than content.json
- `download.html:18` — `twitter:description` = "Self-hostable PHP media server. PHP 8.3+, Workerman 5.x, async/coroutine server." (24 words)
- `index.html:8` — `meta description` = content.json meta description (full)
- This is a per-page Twitter card description, which is fine as long as claims are accurate (they are)
- Not a content accuracy issue, just inconsistency in description length

---

## Summary

The site is highly content-accurate — every substantive product claim (PHP 8.3+, Workerman 5.x, JWT, Argon2ID, SyncPlay NTP, DLNA, plugin LifecycleInterface, Hub relay, client roster, BSD-3-Clause license) matches the ground truth exactly and appears verbatim from content.json where required. The only deduction is for the docs page linking all four sections to the same generic docs URL rather than distinct section anchors, which is a spec deviation rather than a content error. No competitor trademarks appear outside the approved framing. All external links are correct.
