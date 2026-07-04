# Content Accuracy

**Score: 65/100**  
**Severity: ❌**

## Findings

### ❌ CRITICAL: Home H1 uses brand tagline instead of content.json hero.headline (index.html:130)
As noted in Brand Fidelity: `<h1>Every Story Deserves a Grand Entrance</h1>` is the brand kit's `tagline_primary`, not `content.json.hero.headline` ("Your media. Your library. Your Phlix."). The spec §3.1 is explicit: "hero.headline → `<h1>hero.headline</h1>`". The brand kit's tagline may appear alongside or nearby the H1, but the H1 itself must be the content.json headline.

**Fix:** Use `<h1>Your media. Your library. Your Phlix.</h1>` from content.json hero.headline. Display tagline_primary in the eyebrow or as a subtitle under the H1.

### ❌ CRITICAL: hub feature absent from home feature-grid (index.html:374–574)
content.json defines 8 features (§features); index.html only renders 7 feature-card articles in `.feature-grid`. The hub feature (index 7: "Phlix Hub — reach any of your servers from anywhere") is missing.

**Fix:** Add the 8th feature-card article for hub with its SVG icon (hub/sun icon), title "Phlix Hub — reach any of your servers from anywhere", and body from content.json.features[7].

### ❌ WARNING: "hub.phlix.io" domain cited as fact without content.json basis (hub.html:148)
"The public Phlix Hub at `hub.phlix.io` is free for anyone to use." This specific domain appears nowhere in content.json ecosystem section (which references `github.com/detain/phlix-hub` only). While the domain claim may be true, it is a product claim about a public URL endpoint that should be traceable to the spec's content source.

**Fix:** Rephrase to "The public Phlix Hub is free for anyone to use" without citing the specific domain, or confirm the domain is an official Phlix property.

### ⚠️ WARNING: features.html H1 from brand kit copy not in content.json
`<h1>Everything your library deserves</h1>` (features.html:88) is brand kit language. content.json does not define a page-specific headline for the features page. The home page hero.headline is the only headline in content.json. The build used a brand phrase for a page H1, which is defensible but slightly off-spec since the content contract says "substantive product claims and feature bodies come verbatim from content.json."

**Fix:** Confirm "Everything your library deserves" appears in content.json or content.json should be updated to include page-specific headlines.

### ⚠️ WARNING: "Seven years of building" on features page unverified (features.html:90)
"Seven years of building the media server we always wanted." No duration is specified in content.json. If development history differs, this claim becomes inaccurate.

**Fix:** Verify "seven years" against actual project timeline, or remove the specific duration.

## What Passed

- ✅ All 7 pitch_bullets from content.json appear verbatim on index.html
- ✅ All 7 feature-detail articles on features.html use feature titles and bodies verbatim from content.json.features[]
- ✅ All 7 feature-card articles on index.html (excluding hub) use feature titles and bodies verbatim
- ✅ All 5 client cards: names, taglines, highlights, status badges match content.json.clients[] exactly
- ✅ All 5 ecosystem items on download.html and docs.html match content.json.ecosystem[] exactly
- ✅ All 6 FAQ Q&A pairs on about.html match content.json.faq[] exactly
- ✅ Server requirement stated as "PHP 8.3+" on download.html:100 — matches new_site.md §16
- ✅ Workerman 5.x mentioned — matches §16
- ✅ TMDB, TVDB, Fanart.tv, NFO metadata claim — matches §16
- ✅ JWT, Argon2ID, up to 5 profiles, 4-/6-digit PINs, G–NC-17 rating — matches §16
- ✅ Adaptive HLS, FFmpeg transcoding, per-device quality profiles — matches §16
- ✅ SyncPlay with NTP-style time sync — matches §16
- ✅ Live TV + DVR + EPG — matches §16
- ✅ DLNA (ContentDirectory/AvTransport/SSDP) — matches §16
- ✅ Plugin LifecycleInterface + manifest contract — matches §16
- ✅ Phlix Hub reverse-tunnel relay — matches §16
- ✅ Clients: Roku, Samsung Tizen, Windows, Mobile (beta), DLNA — matches §16
- ✅ BSD-3-Clause license — matches §16
