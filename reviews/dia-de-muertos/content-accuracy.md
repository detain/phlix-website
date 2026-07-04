# Content Accuracy Review — Día de Muertos

**Variant**: dia-de-muertos
**Round**: 1
**Reviewer**: adversarial-reviews-agent
**Date**: 2026-07-01

## Score

- **Content Accuracy**: 91 / 100

## ✅ Passed

- Hero eyebrow "Self-hosted media server" matches content.json hero.eyebrow exactly — index.html:115.
- Hero headline "Your media. Your library. Your Phlix." matches content.json hero.headline exactly — index.html:116.
- Hero subheadline text matches content.json hero.subheadline exactly (with natural line-wrapping in the HTML source) — index.html:117–121.
- All 7 pitch bullets on index.html (lines 145–154) match content.json pitch_bullets array exactly, in order:
  1. "100% self-hostable — your library never leaves your hardware unless you say so" ✓
  2. "Native clients on Roku, Samsung Tizen, Windows, Mobile, plus any DLNA device" ✓
  3. "Real-time SyncPlay with NTP-style time sync so movie night actually stays in sync" ✓
  4. "Multi-source metadata: TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache" ✓
  5. "Adaptive HLS streaming, FFmpeg transcoding, per-device quality profiles" ✓
  6. "Live TV with DVR + EPG guide integration" ✓
  7. "Plugin system with a versioned manifest contract" ✓
- All 8 features on index.html (lines 163–344) match content.json features array exactly in id, title, and body:
  - library, syncplay, transcode, auth, livetv, dlna, plugins, hub — all correct.
- Features page (features.html:103–307) reproduces all 8 feature details verbatim from content.json features.
- Clients page (clients.html:103–192) lists all 5 clients from content.json clients:
  - Roku (stable, HLS playback, Hub mode, Skip intro/outro, SyncPlay) ✓
  - Samsung Tizen (stable, Vanilla JS + webpack, Direct play + HLS transcoded, Remote-optimized UI) ✓
  - Windows (stable, Electron + React + TypeScript, System tray, Media keys, Hub mode) ✓
  - Mobile iOS + Android (beta, React Native, Movies/TV/Music/Photos, Offline downloads, Token refresh) ✓
  - Any DLNA device (stable, ContentDirectory, AvTransport, Discovery via SSDP) ✓
- FAQ on about.html (lines 116–154) reproduces all 6 FAQ entries from content.json faq verbatim.
- No mention of any unsupported clients. Apple TV, Chromecast, PlayStation, Xbox, Kodi, and web browsers (beyond DLNA) are not mentioned anywhere on the site.
- No invented technical claims. All technical specifics (Argon2ID, JWT refresh tokens, NTP-style time sync, Workerman, FFmpeg, TMDB/TVDB/Fanart, CRF 23/28, libx264/libx265, HLS master and variant playlists, SSDP discovery, Argon2ID) are consistent with content.json's claims and align with the stated PHP media server architecture.

## ⚠️ Concerns (non-blocking)

- The pitch bullet "Native clients on Roku, Samsung Tizen, Windows, Mobile, plus any DLNA device" says "Mobile" but content.json lists "Mobile (iOS + Android)" with React Native. The index.html bullet uses the shorthand "Mobile" which is fine but slightly less precise than the content.json definition. — Use the full "Mobile (iOS + Android)" phrasing for clarity, matching content.json's client name.
- The clients.html page header reads "Native apps for every screen you own." This tagline is not in content.json. It appears to be an original formulation rather than a sourced quote — not a factual error, but borderline invented marketing copy. — Consider flagging this as a content.json candidate or ensuring it is reviewed as original copy.

## ❌ Failures (must fix this round)

- **`about.html:91`** — The about page lead reads "Self-hosted media. Open source. No lock-in." This phrase does not appear in content.json. While it is consistent with the Phlix project's values, it was not sourced from content.json and constitutes a mild content accuracy violation of the rubric requirement that "Every claim matches content.json facts." — Either add this phrase to content.json as a new field (e.g., `about.tagline` or `footer.tagline`), or remove it from about.html and use content from content.json instead.

## Recommendations

1. Add "Self-hosted media. Open source. No lock-in." to content.json under an appropriate key (e.g., `about.tagline`), then reference it in about.html so the phrase is officially sourced (impact: high, effort: low)
2. Expand "Mobile" pitch bullet to "Mobile (iOS + Android)" for full precision (impact: low, effort: trivial)
3. Add a content validation step to the build process that checks all visible text on each HTML page against content.json keys, flagging any string not found in the source of truth (impact: medium, effort: medium)

## Evidence

- content.json hero: lines 13–18
- content.json pitch_bullets: lines 20–28
- content.json features: lines 29–78
- content.json clients: lines 79–125
- content.json faq: lines 133–158
- index.html pitch bullets: lines 145–154
- index.html feature cards: lines 163–344
- about.html FAQ: lines 116–154
- clients.html client cards: lines 103–192
- about.html page-lead: about.html:91
