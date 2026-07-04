# Content Accuracy Review — Cosmic Horror

**Variant**: cosmic-horror
**Round**: 1 (adversarial)
**Reviewer**: adversarial-code-reviewer
**Date**: 2026-07-04

## Score

- **Content accuracy**: 94 / 100

## ✅ Passed

- **All product claims match Phlix reality (new_site.md §16)**:
  - PHP 8.3+ mentioned: download.html:113 ("Requires PHP 8.3+"), confirmed in kit spec and content.json
  - Workerman 5.x: download.html:192 ("PHP 8.3+, Workerman 5.x"), ecosystem list
  - JWT auth + Argon2ID: features.html:206 ("JWT auth with refresh tokens, Argon2ID password hashing") — matches §16
  - Up to 5 profiles/user, 4-/6-digit PINs, G–NC-17 rating: features.html:207 matches §16
  - TMDB, TVDB, Fanart.tv, NFO metadata: index.html:143 / features.html:136 ("Multi-source metadata: TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache") — verbatim from content.json
  - Adaptive HLS streaming, FFmpeg transcoding: index.html:144 / features.html:184-185 — verbatim
  - SyncPlay with NTP time sync: index.html:141 / features.html:157-158 — verbatim
  - DLNA (ContentDirectory/AvTransport/SSDP): features.html:254-255 matches content.json
  - Plugin contract (LifecycleInterface + manifest): features.html:276-279 matches content.json
  - Phlix Hub reverse-tunnel relay: hub.html:104-108 matches content.json hub description
  - BSD-3-Clause license: about.html:118-121 matches §16 and content.json
  - Clients (Roku, Samsung Tizen, Windows, Mobile, DLNA): clients.html and download.html match content.json exactly
- **content.json copy verbatim**: Hero subheadline (index.html:116-119), all 7 pitch bullets (index.html:138-146), all 8 feature bodies (features.html:134-306), all 5 client descriptions (clients.html), all 5 ecosystem items (download.html:185-225), all 6 FAQ items (about.html:133-176) — all match content.json exactly
- **No invented features**: No claims about features not in the product. No mention of unsupported clients.
- **No competitor trademarks** except factual "Plex/Jellyfin/Emby alternative" framing in FAQ (about.html:137) as permitted by new_site.md §16
- **All external links point to correct repositories**:
  - Server source: https://github.com/detain/phlix-server ✓
  - Docs: https://detain.github.io/phlix-docs ✓
  - Plugin example: https://github.com/detain/phlix-plugin-example ✓
  - Hub: https://github.com/detain/phlix-hub ✓
  - GitHub org: https://github.com/detain ✓

## ⚠️ Concerns (non-blocking)

- **Home H1 uses kit tagline instead of product name** — The home h1 is "That Which Has Always Been Watching." (kit tagline_primary) rather than the product name "Your media. Your library. Your Phlix." (content.json hero.headline). This is documented in BUILD_LOG.md:66 as intentional brand-faithful deviation. The og:title uses the tagline too. This is acceptable per kit archetype (Shadow: "visual headline overlay") but means the primary H1 doesn't immediately identify the product. However the nav logo and page title prefix "Phlix —" provide the product name. — *impact: low*

## ❌ Failures (must fix this round)

None — no blocking issues in this dimension.

## Recommendations (ranked by impact)

No changes recommended — content accuracy is solid.

## Evidence

- content.json verified against all 8 HTML pages for verbatim copy match
- new_site.md §16 verified against feature descriptions on index.html, features.html, clients.html, download.html
- Grep for competitor trademarks: only "Plex / Jellyfin / Emby" in FAQ (permitted) — no unauthorized usage
- External links verified against new_site.md §5 mandates
