# Dimension 4: Spelling & Grammar
**Typos, tense/voice consistency, avoid_words, brand vocabulary**

---

## Score: 95 / 100

## Verdict: PASS (≥90, no ❌)

---

## Findings

### ✅ No avoid_words
Searched all 8 HTML pages for the complete avoid_words list from the brand kit:
- "cozy" — not found ✅
- "warm" — not found ✅
- "quiet" — not found ✅
- "restful" — not found ✅
- "mellow" — not found ✅
- "noir" — not found ✅
- "detective" — not found ✅
- "synergy" — not found ✅
- "leverage" — not found ✅
- "utilize" — not found ✅
- "robust" — not found ✅
- "awesome" — not found ✅
- "amazing" — not found ✅

### ✅ Brand Vocabulary — Used Appropriately
- "signal" — index.html:89 "Signal acquired. Good to have you back." (greeting context)
- "screen" — in content copy ✅
- "city" — in content copy ✅
- "data" — in content copy ✅
- "night" — in content copy ✅
- "neon" — in content copy ✅
- "circuit" — not directly in copy (but used in brand identity/CSS) ✅
- "stream" — content references streaming ✅

### ✅ Consistent Tense/Voice
- Most copy uses present tense: "streams", "works", "picks the right quality"
- Active voice throughout: "Add a file, see it appear" (features), "Drop a plugin in, the loader picks it up" (plugins)
- No mixed tense issues observed

### ✅ No Typos Detected
- All product feature names: SyncPlay, DLNA, HLS, FFmpeg, Argon2ID, TMDB, TVDB, EPG — correctly spelled
- Client names: Roku, Samsung Tizen, Windows, React Native — correctly spelled
- Technical terms: NAT, API, JSON-LD, BSD-3-Clause — correctly spelled
- Japanese text: 東京 (Tokyo) — correct kanji ✅

### ⚠️ Minor: "Self-hosted" vs "Self-hostable"
- **File:** `about.html:61` — page lead says "Self-hosted media. Open source. No lock-in."
- **File:** `content.json` uses "Self-hostable" (hero.subheadline: "An open-source PHP media server")
- This is a **micro-copy** change per new_site.md §2 "You may add brand-flavored micro-copy drawn from the kit's voice" — allowed
- However, the brand kit `vocabulary` does not include "hosted" and it's borderline inconsistent with content.json
- **Confidence:** 70% (not a clear violation — micro-copy latitude exists)

### ⚠️ Minor: "Samsung Tizen" vs "Samsung TV"
- **File:** `index.html:102` — "Native clients on Roku, Samsung Tizen, Windows, Mobile"
- **File:** `content.json:91-95` — client list uses "Samsung Tizen" which is correct (Tizen is the OS, not "Samsung TV")
- content.json is the source of truth here; this is correct ✅

---

## Summary

Spelling and grammar are excellent. No avoid_words appear anywhere. No typos. Consistent active voice and present tense. Brand vocabulary words are used. The one minor note about "Self-hosted" vs "Self-hostable" falls within the micro-copy latitude allowed by new_site.md. High confidence this dimension passes.
