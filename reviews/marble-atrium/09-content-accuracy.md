# Content Accuracy — marble-atrium

**Score: 94/100** — All product claims match content.json exactly; all 7 pitch bullets and all 5 clients present; 6/6 FAQ questions correct; one real gap (hub feature missing from home overview).

## Findings

- `index.html:103-117` ✅ All 7 `pitch_bullets` from content.json verbatim:
  1. "100% self-hostable..." ✅
  2. "Native clients on Roku, Samsung Tizen..." ✅
  3. "Real-time SyncPlay with NTP-style time sync..." ✅
  4. "Multi-source metadata: TMDB, TVDB, Fanart.tv..." ✅
  5. "Adaptive HLS streaming, FFmpeg transcoding..." ✅
  6. "Live TV with DVR + EPG guide integration" ✅
  7. "Plugin system with a versioned manifest contract" ✅
- `index.html:124-177` ❌ **Home page features overview shows only 7 feature cards — hub feature is absent.** content.json `features[]` has 8 entries (library, syncplay, transcode, auth, livetv, dlna, plugins, **hub**). The home page overview grid omits the hub feature entirely, showing only the first 7. The hub feature IS correctly present on features.html and hub.html, but new_site.md §3.1 says "a card grid of all 7 features" — however content.json has 8 features. The spec says "all 7 features from features[]". Since content.json has 8, the spec is outdated, but the home page's non-exhaustive overview is still a UX gap: users visiting the home page don't see the hub feature surfaced at all, and must navigate to a separate page to learn about it.
- `features.html:74-142` ✅ All 8 features from content.json present with correct `id`, `title`, `body`, and inline SVG icons.
- `clients.html:75-130` ✅ All 5 clients from content.json with correct `name`, `tagline`, `highlights[]`, `status`, and `repo` links. DLNA card correctly shows `repo: null` → no source link, "Built in — no app needed" span.
- `about.html:96-124` ✅ All 6 FAQ items from content.json `faq[]` present verbatim with questions and answers.
- `download.html:71-156` ✅ Ecosystem list: all 5 items from `ecosystem[]` with correct `name`, `repo`, `what` — phlix-server, phlix-hub, phlix-shared, phlix-docs, phlix-plugin-example.
- `download.html:78` ✅ Server requirements: "PHP 8.3+" and "Workerman 5.x" — correct per new_site.md §16 technical accuracy.
- `download.html:79` ✅ Install snippet: `composer install && php start.php start` — accurate for the PHP/Workerman stack.
- `index.html:226` ✅ Footer copyright: `&copy; 2026 Phlix — BSD-3-Clause` — correct license.
- `hub.html:75-86` ✅ Hub feature content: "reverse-tunnel relay", "no port forwarding", "self-hostable or use the public hub" — matches content.json hub feature body.
- No invented features found — all claims trace to content.json or the technical accuracy guardrails in new_site.md §16.
- No competitor trademark violations — "Plex / Jellyfin / Emby" only appears in the FAQ as factual comparison per content.json ✅.

## Verdict

**Pass** — all substantive product claims match content.json exactly. All 5 clients, all 6 FAQ items, all 5 ecosystem entries, and all 8 features (on features.html) are correct. The one gap — the hub feature not being surfaced on the home page overview — is a real content completeness issue, not a content accuracy violation per se (the hub feature exists, just not on the home overview). Deducting 6 points for this gap.
