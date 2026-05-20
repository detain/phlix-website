# Content Quality Review — 03-retro-film-reel

**Variant**: 03-retro-film-reel  
**Round**: 1  
**Reviewer**: Dimension Reviewer (Content Quality)  
**Date**: 2026-05-20

---

## Score

- **Content Quality**: 86 / 100

---

## ✅ Passed

- Hero eyebrow, headline, subheadline on index.html match `content.json` exactly
- Pitch bullets on index.html (lines 92–100) match `content.json` pitch_bullets verbatim
- All 8 feature cards on index.html and features.html match `content.json` features array
- Clients page client list, taglines, highlights, and stability statuses match `content.json` clients array
- Ecosystem section on download.html and docs.html matches `content.json` ecosystem array
- FAQ on about.html matches `content.json` faq array
- Footer tagline "Open-source media, on your terms." matches `content.json`
- Technical claim "Workerman 5.x" stated on download.html:117 and docs.html:90
- Technical claim "Argon2ID" stated on index.html:143, features.html:124
- Technical claim "JWT auth with refresh tokens" stated on index.html:143, features.html:124
- SyncPlay NTP description "weighted-mean NTP offset over 5 samples" stated on index.html:125, features.html:100
- Metadata sources "TMDB, TVDB, Fanart.tv, and local NFO" stated on index.html:96
- Live TV + DVR + EPG mentioned consistently across pages
- Plugin system "LifecycleInterface + manifest schema" stated on index.html:169, features.html:159, plugins.html:80, about.html:108
- No mention of any unsupported clients — only Roku, Samsung Tizen, Windows, Mobile (beta), and DLNA
- No invented features — all claims traceable to content.json
- Grammar and spelling clean across all 8 pages

---

## ⚠️ Concerns (non-blocking)

### Content-Voice Mismatch: Retro Theme Not Reflected in Copy

**Location**: All pages  
**Evidence**: VARIANT.md states the variant is "nostalgic, playful, vintage cinema-themed" with brand voice "Playful, Approachable, Warm, Slightly quirky." However, all marketing copy is rendered verbatim from `content.json` (per BUILD_LOG line 43), which uses a generic technical voice (e.g., "Add a file, see it appear." — direct and helpful but not warm/quirky).  

The visual identity (film reel logo, marquee lights, cream/teal/mustard palette, Bebas Neue headlines) establishes a charming vintage cinema atmosphere, but the copy doesn't complement it. Compare:

- **Visual tone**: Vintage cinema, warm, playful, memorable
- **Copy tone**: Technical documentation, direct, no-nonsense

This isn't a content error — it's a content strategy gap. The shared content.json was written for a neutral variant and wasn't adapted for this variant's personality. Given that the BUILD_LOG explicitly prohibits paraphrasing, this concern is logged but not actionable in this review cycle.

### hub.html:83 — Placeholder Domain

**Location**: hub.html line 83  
**Evidence**: "or use the public one at phlix-hub.example.com — no configuration required."  
**Issue**: "phlix-hub.example.com" is an IANA reserved example domain. It is not a real address. Users may attempt to use this URL literally and be confused when it doesn't work.

This same issue appears in variant 01 (documented in their content-quality.md). The problem exists in content.json at a shared level, not variant-specific code.

### Unable to Verify phlix-server Implementation

**Location**: All pages with technical claims  
**Evidence**: Hard isolation prevents reading `phlix-server/` source to confirm:
- Workerman version (content.json claims 5.x)
- Argon2ID parameters
- JWT expiry values
- NTP sync implementation ("weighted-mean NTP offset over 5 samples")
- QualitySelector profiles (CRF 23/28, mobile-low/mobile-high/web/tv-4k)

Technical claims on site match `content.json` which references phlix-server, but first-party verification is not possible from this reviewer's isolation boundary.

---

## ❌ Failures (must fix this round)

None. No blocking issues found.

---

## Recommendations (ranked by impact)

### 1. Resolve placeholder domain "phlix-hub.example.com" (impact: medium, effort: low)

**File**: hub.html:83  
**Current**: "or use the public one at phlix-hub.example.com — no configuration required."  
**Fix options**:
- If a real public relay URL exists, replace the placeholder
- If no public relay exists yet, rephrase to: "or use our public relay service — no configuration required." (remove the fake domain)

**Note**: This requires updating shared/content.json, not just the variant. The variant correctly renders content.json verbatim.

### 2. Adapt Copy to Variant Voice (impact: medium, effort: high)

**File**: shared/content.json (upstream change required)  
**Issue**: VARIANT.md specifies "Playful, Approachable, Warm, Slightly quirky" but the shared content uses generic technical voice. Example missed opportunities:

- "Add a file, see it appear." → could be "Drop a file in, and like magic, it's in your library."
- "Plug and play, old-school style." → could reference the vintage theme

**Note**: The BUILD_LOG says no paraphrasing was done — this review recognizes the constraint but flags that the variant's distinctive visual identity is not reinforced by the copy.

### 3. Add Technical Specifics to Auth Claims (impact: low, effort: low)

**Files**: index.html:143, features.html:124  
**Current**: "JWT auth with refresh tokens, Argon2ID password hashing, up to 5 profiles per user, 4- or 6-digit PINs, rating filter from G to NC-17."  
**Gap**: Does not specify JWT access/refresh token expiry timings. If phlix-server implements "1h access / 7d refresh" (as one would expect), stating this explicitly would make the auth feature claim more concrete and credible.

---

## Evidence

### Tone Check

**Rubric target**: Playful, Approachable, Warm, Slightly quirky

**Sample content analysis**:
- index.html:116 — "Add a file, see it appear." — concise, confident, but not warm or quirky
- index.html:125 — "Play, pause, seek — everyone moves together." — friendly, clear, but still technical
- about.html:92 — "Yes — same job, different stack." — helpful comparison, approachable tone

**Assessment**: Copy is consistently helpful and clear. It is NOT stiff or corporate. However, it also does NOT lean into the "vintage cinema" charm promised by the variant's visual design. The copy and visuals are working at cross-purposes — the visuals say "charming retro cinema" but the words say "technical product documentation."

This is not a failure because the BUILD_LOG prohibits deviation from content.json. It is logged as a concern about the upstream content strategy.

### Copy Alignment Check (vs content.json)

| Page | Element | Status |
|------|---------|--------|
| index.html:78 | hero eyebrow "Self-hosted media server" | ✅ matches content.json hero.eyebrow |
| index.html:79 | hero headline "Your media. Your library. Your Phlix." | ✅ matches content.json hero.headline |
| index.html:80 | hero subheadline | ✅ matches content.json hero.subheadline |
| index.html:92–100 | pitch bullets | ✅ verbatim match to content.json pitch_bullets |
| index.html:116 | feature card body "ItemRepository hydrates metadata_json" | ✅ matches content.json features[0].body |
| index.html:125 | SyncPlay NTP description | ✅ matches content.json features[1].body |
| clients.html:83 | Roku status "stable" | ✅ matches content.json clients[0].status |
| clients.html:127 | Mobile status "beta" | ✅ matches content.json clients[3].status |
| download.html:117 | "Workerman 5.x" | ✅ matches content.json ecosystem[0].what |
| about.html:89 | FAQ "Workerman" mention | ✅ matches content.json faq[0].a |

### Grammar/Spelling

Reviewed all 8 HTML files (index.html, features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html). No spelling errors detected. No grammar issues. Sentence structure is clear throughout.

### Technical Claims Traceability

All technical feature claims on the site can be traced to the `content.json` shared content source. The content.json in turn references `phlix-server` as the authoritative source for these features. No claims appear to be invented or exaggerated relative to content.json.

Specific technical claims verified:
- **Argon2ID** — index.html:143, features.html:124 (matches content.json features[3].body)
- **JWT with refresh tokens** — same locations (matches content.json)
- **QualitySelector profiles** — index.html:134, features.html:112 (matches content.json features[2].body)
- **NTP sync "5 samples"** — index.html:125, features.html:100 (matches content.json features[1].body)
- **CRF 23/28 libx264/libx265** — stated in content.json features[2].body, rendered in variant

---

## Summary

The variant's content is accurate, grammatically clean, and faithfully rendered from the shared content.json source. No invented features or broken claims exist. The primary concern is that the variant's distinctive visual identity (retro film reel aesthetic) is not complemented by copy that reflects the "Playful, Approachable, Warm, Slightly quirky" voice specified in VARIANT.md — but this is a shared-content strategy gap, not a variant defect. The placeholder domain "phlix-hub.example.com" is a carryover from shared content that should be addressed upstream.

**Score: 86/100** — Strong content faithful to source, flagged concerns are at the shared-content level.
