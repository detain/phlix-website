# Dimension 9 — Content Accuracy

## Score: 70/100

Reference: `/home/sites/phlix/phlix-website/shared/content.json`

---

### hero.headline is the semantic `<h1>` on index.html (NOT replaced by tagline)

**✅ index.html:74** — `<h1 id="hero-heading">Your media. Your library. Your Phlix.</h1>`  
**✅ Matches** content.json `hero.headline` = `"Your media. Your library. Your Phlix."`

**❌ index.html:73** — `<p class="hero-eyebrow">Festive Lantern</p>`  
**⚠️ Does NOT match** content.json `hero.eyebrow` = `"Self-hosted media server"`. The eyebrow text should be "Self-hosted media server", not "Festive Lantern" (which is the design-kit name).

### All 7 pitch_bullets verbatim

**✅ index.html:88–95** — All 7 pitch bullets match content.json `pitch_bullets[]` exactly:
1. "100% self-hostable — your library never leaves your hardware unless you say so" ✅
2. "Native clients on Roku, Samsung Tizen, Windows, Mobile, plus any DLNA device" ✅
3. "Real-time SyncPlay with NTP-style time sync so movie night actually stays in sync" ✅
4. "Multi-source metadata: TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache" ✅
5. "Adaptive HLS streaming, FFmpeg transcoding, per-device quality profiles" ✅
6. "Live TV with DVR + EPG guide integration" ✅
7. "Plugin system with a versioned manifest contract" ✅

### All 7+1 feature titles and bodies verbatim from features[]

**⚠️ index.html features-overview** (7 cards, hub missing) — index.html:103–182 shows 7 feature-card articles (library, syncplay, transcode, auth, livetv, dlna, plugins). The 8th feature `hub` is NOT present in the index.html overview section.

**✅ features.html** (8 features complete) — features.html:66–170 correctly renders all 8 features from `features[]`:
1. "Library that organizes itself" + body ✅
2. "SyncPlay across the room or across the country" + body ✅
3. "Transcoding that picks the right quality" + body ✅
4. "Multi-user, multi-profile, parental controls" + body ✅
5. "Live TV with DVR + EPG" + body ✅
6. "DLNA for the devices you already own" + body ✅
7. "Plugin system with a real contract" + body ✅
8. "Phlix Hub — reach any of your servers from anywhere" + body ✅

### All 5 client entries: name, tagline, highlights, repo, status correct

**✅ clients.html:61–133** — All 5 clients match content.json `clients[]`:

| Client | name | tagline | highlights | repo | status |
|--------|------|---------|------------|------|--------|
| roku | "Roku" ✅ | "Native Roku channel" ✅ | 4 items ✅ | `https://github.com/detain/phlix-roku-client` ✅ | stable ✅ |
| tizen | "Samsung Tizen" ✅ | "Smart TV app" ✅ | 3 items ✅ | `https://github.com/detain/phlix-tizen-client` ✅ | stable ✅ |
| windows | "Windows" ✅ | "Native desktop" ✅ | 4 items ✅ | `https://github.com/detain/phlix-windows-client` ✅ | stable ✅ |
| mobile | "Mobile" ✅ | "React Native app (iOS + Android)" ⚠️ | 3 items ✅ | `https://github.com/detain/phlix-mobile-client` ✅ | beta ✅ |
| dlna | "Any DLNA device" ✅ | "No install required" ✅ | 3 items ✅ | null ✅ | stable ✅ |

**⚠️ mobile name** — content.json:109 says `"Mobile (iOS + Android)"`, clients.html:109 says just `"Mobile"`. This is acceptable since the tagline "(iOS + Android)" appears right after in the tagline field.

### All 5 ecosystem entries correct

**✅ download.html:104–111 and docs.html:71–78** — All 5 ecosystem entries match content.json `ecosystem[]` exactly:
1. phlix-server — "The media server itself — PHP 8.3+, Workerman 5.x" ✅
2. phlix-hub — "Cloud directory + reverse-tunnel relay" ✅
3. phlix-shared — "Shared interfaces, DTOs, event types — Composer package" ✅
4. phlix-docs — "End-user, developer, and hub-admin docs (VitePress)" ✅
5. phlix-plugin-example — "Reference metadata-provider plugin" ✅

### All 6 FAQ items verbatim (q and a)

**✅ about.html:74–106** — All 6 FAQ items match content.json `faq[]`:
1. "Is Phlix like Plex / Jellyfin / Emby?" + answer ✅
2. "Do I need to expose my server to the internet?" + answer ✅
3. "What formats are supported?" + answer ✅
4. "Is there a mobile app?" + answer ✅
5. "Can I write plugins?" + answer ✅
6. "What's the license?" + answer ✅

### Footer columns match content.json.footer.columns exactly

**❌ Footer tagline mismatch** — All 8 pages display `footer-tagline` as "Every Night, a Celebration."  
**content.json footer.tagline** = `"Open-source media, on your terms."`  
The tagline is inconsistent with the canonical content source.

**✅ Footer columns structure** — All 8 pages: Product / Developers / Project — links and hrefs match content.json.footer.columns exactly:
- Product: Features, Clients, Download, Plugins ✅ (with .html extensions as appropriate for static site)
- Developers: Documentation, Server source, Plugin example, API reference ✅
- Project: GitHub org, Issues, Hub, License (BSD-3) ✅

### No invented product claims

**✅ No invented claims detected** — All product descriptions are supported by the Phlix project (real GitHub repos, documented features). No claims like "AI-powered", "machine learning", "blockchain", etc.

### No avoid_words from brand kit in any copy

**⚠️ Cannot verify** — `shared/data/brand-kits.json` was not provided/read. Unable to check against `avoid_words` list.
