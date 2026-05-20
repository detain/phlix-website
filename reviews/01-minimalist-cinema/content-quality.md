# Content Quality Review — 01-minimalist-cinema

**Variant**: 01-minimalist-cinema
**Round**: 1
**Reviewer**: Dimension Reviewer (Content Quality)
**Date**: 2026-05-20

## Score

- **Content Quality**: 88 / 100

## ✅ Passed

- Hero eyebrow, headline, subheadline on index.html match `content.json` exactly
- Pitch bullets on index.html (lines 88–94) match `content.json` pitch_bullets verbatim
- All 8 feature cards on index.html and features.html match `content.json` features array
- Clients page client list, taglines, highlights, and stability statuses match `content.json` clients array
- Ecosystem section on download.html and docs.html matches `content.json` ecosystem array
- FAQ on about.html matches `content.json` faq array
- Footer tagline "Open-source media, on your terms." matches `content.json`
- Technical claim "Workerman 5.x" stated on download.html:111 and docs.html:87
- Technical claim "Argon2ID" stated on index.html:138, features.html:121
- Technical claim "JWT auth with refresh tokens" stated on index.html:138, features.html:121
- SyncPlay NTP description "weighted-mean NTP offset over 5 samples" stated on index.html:120, features.html:97
- Metadata sources "TMDB, TVDB, Fanart.tv, and local NFO" stated on index.html:91
- Live TV + DVR + EPG mentioned consistently across pages
- Plugin system "LifecycleInterface + manifest schema" stated on index.html:165, features.html:157, plugins.html:77, about.html:105
- No mention of any unsupported clients — only Roku, Samsung Tizen, Windows, Mobile (beta), and DLNA
- No invented features — all claims traceable to content.json
- Grammar and spelling clean across all 8 pages
- Tone aligns with brand-kit voice: "Direct, Clear, Helpful, Slightly playful but professional" and personality "Modern, Clean, Confident, Tech-forward"

## ⚠️ Concerns (non-blocking)

- **hub.html:80** — "phlix-hub.example.com" is a placeholder domain (IANA reserved example domain). Not a real address. Content.json does not confirm this URL exists. Risk: users may try to use this URL literally. Suggestion: either replace with a real public URL if one exists, or rephrase to "our public relay service" without citing a fake domain.
- **Unable to verify phlix-server implementation** — Hard isolation prevents reading `phlix-server/` source to confirm Workerman version, Argon2ID parameters, JWT expiry values (1h access / 7d refresh), and NTP sync implementation details. Technical claims on site match `content.json` which references phlix-server, but cannot do first-party verification.

## ❌ Failures (must fix this round)

- None. No blocking issues found.

## Recommendations (ranked by impact)

1. **Replace "phlix-hub.example.com" with a real relay URL or remove the domain** (impact: medium, effort: low) — hub.html line 80 cites a placeholder domain. If a real public relay exists, use that URL. If not, rephrase to avoid misleading users.

2. **Consider adding a direct reference to JWT expiry timings** (impact: low, effort: low) — Content.json and the site mention "JWT auth with refresh tokens" but do not specify "1h access / 7d refresh". If this is accurate per phlix-server, adding it would make the auth feature claim more credible and concrete.

## Evidence

### Tone Check
Brand-kit voice: "Direct, Clear, Helpful, Slightly playful but professional"
Sample from index.html: "Add a file, see it appear." — concise, helpful, confident. No fluff.
Sample from clients.html: "Native apps for every screen you own." — direct, clear value prop.
No overly casual language ("awesome!", "we're the best!"), no stiff corporate phrasing.

### Copy Alignment Check (vs content.json)

| Page | Element | Status |
|------|---------|--------|
| index.html:72 | hero eyebrow "Self-hosted media server" | ✅ matches content.json hero.eyebrow |
| index.html:73 | hero headline "Your media. Your library. Your Phlix." | ✅ matches content.json hero.headline |
| index.html:74 | hero subheadline | ✅ matches content.json hero.subheadline |
| index.html:88–94 | pitch bullets | ✅ verbatim match to content.json pitch_bullets |
| index.html:111 | feature card "ItemRepository hydrates metadata_json" | ✅ matches content.json features[0].body |
| clients.html:80 | Roku status "stable" | ✅ matches content.json clients[0].status |
| clients.html:124 | Mobile status "beta" | ✅ matches content.json clients[3].status |
| download.html:111 | "Workerman 5.x" | ✅ matches content.json ecosystem[0].what |
| about.html:89 | FAQ "Workerman" mention | ✅ matches content.json faq[0].a |

### Grammar/Spelling
Reviewed all 8 HTML files (index, features, clients, download, plugins, docs, hub, about). No spelling errors detected. No grammar issues. Sentence structure is clear throughout.

### Technical Claims Traceability
All technical feature claims on the site can be traced to the `content.json` shared content source. The content.json in turn references `phlix-server` as the authoritative source for these features. No claims appear to be invented or exaggerated.
