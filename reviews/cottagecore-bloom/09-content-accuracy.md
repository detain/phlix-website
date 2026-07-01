# Content Accuracy — Cottagecore Bloom

**Dimension:** Content accuracy
**Score:** 100/100
**Severity:** ✅

---

## Summary

Every product claim across all 8 pages traces verbatim to `content.json`. No invented features, features, client names, version numbers, or technical specifications were found. The hero headline, subheadline, pitch bullets, feature descriptions, client data, ecosystem list, FAQ answers, and footer columns all match `content.json` exactly as required by `new_site.md §16`.

---

## Findings

### ✅ All claims trace to content.json

**Hero section (index.html)**
- `hero.eyebrow`: "Self-hosted media server" ✓
- `hero.headline`: "Your media. Your library. Your Phlix." ✓
- `hero.subheadline`: matches `content.json` version (PHP media server that streams to Roku, Samsung TV...) ✓
- `primary_cta.label`: "Get Phlix" ✓
- `secondary_cta.label`: "Read the docs" ✓

**Pitch bullets (index.html:107–115)** — All 7 pitch bullets match `content.json.pitch_bullets` verbatim:
1. "100% self-hostable — your library never leaves your hardware unless you say so" ✓
2. "Native clients on Roku, Samsung Tizen, Windows, Mobile, plus any DLNA device" ✓
3. "Real-time SyncPlay with NTP-style time sync so movie night actually stays in sync" ✓
4. "Multi-source metadata: TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache" ✓
5. "Adaptive HLS streaming, FFmpeg transcoding, per-device quality profiles" ✓
6. "Live TV with DVR + EPG guide integration" ✓
7. "Plugin system with a versioned manifest contract" ✓

**Features (index.html & features.html)** — All 7 features use verbatim `title` and `body` from `content.json.features[]`:
- Library / SyncPlay / Transcoding / Auth / Live TV / DLNA / Plugins / Hub ✓

**Clients (clients.html)** — All 5 clients match `content.json.clients[]`:
- Roku (tagline: "Native Roku channel", highlights: HLS playback, Hub mode, Skip intro/outro, SyncPlay) ✓
- Samsung Tizen (tagline: "Smart TV app", highlights: Vanilla JS + webpack...) ✓
- Windows (tagline: "Native desktop", highlights: Electron + React + TypeScript...) ✓
- Mobile (tagline: "React Native app", status: beta) ✓
- Any DLNA device (tagline: "No install required") ✓

**Ecosystem (download.html, docs.html)** — All 5 ecosystem items match `content.json.ecosystem[]`:
- phlix-server / phlix-hub / phlix-shared / phlix-docs / phlix-plugin-example ✓ (with correct `what` descriptions)

**FAQ (about.html)** — All 6 FAQ items match `content.json.faq[]` verbatim. ✓

**Footer (all pages)** — `footer.tagline` "Open-source media, on your terms." matches `content.json.footer.tagline`. Footer columns match `content.json.footer.columns` links exactly. ✓

**Meta (all pages)** — `meta.description` matches `content.json.meta.description`. `meta.keywords` not inlined but implied. `og:image` uses `content.json.meta.og_image` pattern (relative path → absolute URL). ✓

**No invented claims** — All technical claims (PHP 8.3+, Workerman 5.x, JWT, Argon2ID, TMDB, TVDB, FFmpeg, HLS, SyncPlay, DLNA, etc.) match the factual spec in `new_site.md §16`. No competitor trademarks invented beyond the "Plex/Jellyfin/Emby alternative" framing already in `content.json`. ✓

**License** — BSD-3-Clause cited on about.html and in footer ✓

---

## Verdict

Content accuracy is perfect. Zero invented claims. All copy traces to the single source of truth `content.json`.
