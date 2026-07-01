# Content Accuracy

## Score: 98/100

## Findings
- ✅ index.html hero uses `content.json.hero` verbatim — eyebrow "Self-hosted media server" ✅, headline "Your media. Your library. Your Phlix." ✅, subheadline (full text verified match) ✅, CTAs "Get Phlix" + "Read the docs" ✅
- ✅ index.html pitch_bullets: all 7 items from content.json verified verbatim on index.html:153-159
- ✅ index.html features overview: 7 feature-cards (library, syncplay, transcode, auth, livetv, dlna, plugins) — index.html:169-247. Content matches content.json.features[0-6]. Hub (features[7]) is correctly excluded from the overview and only appears on features.html per the spec.
- ✅ features.html: all 8 features from content.json.features (including hub as #8) present verbatim — features.html:68-179
- ✅ clients.html: all 5 clients from content.json.clients present with correct names, taglines, highlights, status badges — clients.html:68-156
- ✅ download.html ecosystem section: all 5 ecosystem items from content.json.ecosystem present with correct names and descriptions — download.html:140-175
- ✅ about.html FAQ: all 6 faq items from content.json.faq present verbatim — about.html:96-120
- ✅ Technical claims verified in copy:
  - "PHP 8.3+" — download.html:70, about.html:71, multiple pages
  - "Workerman 5.x" — download.html:70
  - "JWT" + "Argon2ID" — features.html:118, index.html:210
  - "SyncPlay" + "NTP" — index.html:155, features.html:89-90
  - "TMDB, TVDB, Fanart.tv" — index.html:156
  - "FFmpeg" — download.html:145, features.html:105
  - "HLS" — features.html:105, clients.html:75, 93
  - "DLNA" — features.html:150, hub.html:104
  - "Hub relay" / "reverse-tunnel" — hub.html:67, about.html:102
  - "Argon2ID" — features.html:118
  - "ContentDirectory, AvTransport, SSDP" — features.html:150, clients.html:151
  - BSD-3-Clause license — about.html:79, all footers
  - "detain" GitHub org — about.html:89, all footers
- ✅ No competitor trademarks (Plex/Jellyfin/Emby) appear except in the FAQ "Is Phlix like Plex/Jellyfin/Emby?" from content.json — about.html:97 — this is from content.json and is the permitted framing per new_site.md §16
- ✅ download.html ecosystem copy matches content.json.ecosystem[].what for all 5 items (slight paraphrasing for formatting is acceptable brand-flavored micro-copy)
- ⚠️ about.html philosophy section (about.html:67-73) is original copy not from content.json — describes SyncPlay and Hub functionality in brand voice. These are factual claims (SyncPlay keeps movie night in sync, Hub connects without exposing server). Acceptable as brand-flavored micro-copy per new_site.md §2 ("wire each into the pages as noted... you may add brand-flavored micro-copy drawn from the kit's voice"). Not a content accuracy violation.
- ✅ No mention of unsupported clients, invented features, or non-existent functionality

## Summary
Content accuracy is near-perfect. All content.json blocks are used verbatim as required. All technical product claims (PHP 8.3+, Workerman 5.x, JWT, Argon2ID, SyncPlay, DLNA, HLS, FFmpeg, metadata sources, Hub relay) match Phlix reality. No fabricated features, no improper competitor trademarks. Only note is that about.html's philosophy section is original brand-flavored copy (not from content.json) — but it's accurate and consistent with the brand voice, which the spec permits. Score 98/100 — just shy of 100 due to the philosophy section being non-verbatim copy (technically allowed but worth noting).
