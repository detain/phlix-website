# Content Quality Review — Variant 02-spotlight-projector

**Review Date:** 2026-05-20
**Reviewer Dimension:** Content Quality
**Files Reviewed:** index.html, features.html, clients.html, download.html, plugins.html, docs.html, hub.html, about.html

---

## Score: 72 / 100

**Grade:** ⚠️ CONCERNS — Non-blocking but significant

---

## ✅ Passed Items

| Page | Content | Source Verified |
|------|---------|-----------------|
| index.html | Hero (eyebrow, headline, subheadline, CTAs) | ✅ Matches content.json |
| index.html | 7 pitch bullets | ✅ Exact match content.json |
| index.html | 8 feature cards (title + body) | ✅ Exact match content.json |
| features.html | All 8 feature details | ✅ Exact match content.json |
| clients.html | All 5 clients (name, tagline, status, highlights) | ✅ Exact match content.json |
| download.html | Ecosystem list (5 items, descriptions) | ✅ Exact match content.json |
| about.html | FAQ (6 Q&A pairs) | ✅ Exact match content.json |
| about.html | License reference | ✅ Matches content.json meta |
| docs.html | Documentation links | ✅ Matches content.json |
| General | Footer columns, navigation links | ✅ Matches content.json structure |
| General | Meta descriptions, OG tags, Twitter cards | ✅ Consistent across all pages |

### Technical Accuracy

- ✅ PHP 8.3+ mentioned correctly
- ✅ Workerman 5.x mentioned correctly
- ✅ FFmpeg transcoding referenced accurately
- ✅ SyncPlay NTP-style sync described accurately
- ✅ Argon2ID password hashing stated correctly
- ✅ TMDB, TVDB, Fanart.tv metadata sources named correctly
- ✅ HLS streaming referenced correctly
- ✅ DLNA protocols (ContentDirectory, AvTransport, SSDP) named correctly
- ✅ Plugin LifecycleInterface contract mentioned correctly
- ✅ No invented technical features detected

### Grammar & Spelling

- ✅ No spelling errors detected across all 8 pages
- ✅ No grammar errors detected
- ✅ Proper use of em-dashes (—), en-dashes (–)
- ✅ Consistent punctuation throughout

### Accessibility (Content-related)

- ✅ All images have alt text
- ✅ Skip link present on all pages
- ✅ ARIA landmarks used correctly
- ✅ Focus management implemented

---

## ⚠️ Concerns (Non-blocking)

### 1. Content.json Voice vs Variant Voice Mismatch

**Severity:** ⚠️ Minor
**Pages:** All pages, but especially hub.html, about.html
**Evidence:** VARIANT.md specifies voice should be "Warm, Story-driven, Slightly dramatic, Movie night energy" but content.json is purely factual/informational. The variant inherits content verbatim from content.json, so no "movie night energy" is present.

**Example - hub.html line 76:**
> "Sign in once. The Hub's reverse-tunnel relay handles NAT traversal..."

This is accurate but reads like a technical specification, not a theatrical movie night invitation.

**Recommendation (Impact: Low):**
If variant voice is important, consider adding variant-specific headline treatments or callouts that inject drama without modifying source content. However, since VARIANT.md explicitly mandates "verbatim from content.json", this may be a content.json issue rather than a variant implementation issue.

---

### 2. Fictional Domain Reference

**Severity:** ⚠️ Minor
**Page:** hub.html:81
**Evidence:**
> "You can run your own phlix-hub instance, or use the public one at phlix-hub.example.com — no configuration required."

The domain `phlix-hub.example.com` is clearly a placeholder/example domain. While common in documentation, it could confuse users who might think this is a real URL they should visit.

**Recommendation (Impact: Low):**
Replace with a more obviously fictional domain like `hub.phlix.example` or simply remove "at phlix-hub.example.com" and say "use the public one — no configuration required."

---

### 3. Hub Page Has Content Not in content.json

**Severity:** ⚠️ Minor
**Page:** hub.html (lines 74-87)
**Evidence:** VARIANT.md line 100 states "All marketing copy rendered verbatim from `shared/content.json`." However, hub.html contains original content:
- "What the Hub does" section (line 75-77)
- "Self-host or use the public hub" section (line 80-82)
- "Hub mode in clients" section (line 85-87)

content.json only references Hub briefly within the features array (`"title": "Phlix Hub — reach any of your servers from anywhere"`), not as a full page with narrative sections.

**Note:** This is documented in BUILD_LOG.md line 22: "Created hub.html | Hub description with 3 sections"

**Recommendation (Impact: Low):**
If strict verbatim sourcing is required, hub.html should either:
1. Just show the feature card content from content.json, OR
2. Have a note that page-specific narrative was approved for Hub's unique narrative needs

---

### 4. About Page Has Content Not in content.json

**Severity:** ⚠️ Minor
**Page:** about.html
**Evidence:** about.html contains original content not in content.json:
- "Philosophy" section (line 74-75)
- "License" section (line 77-78)
- "Contributing" section (line 80-81)

These are standard about-page elements but are NOT in content.json.

**Note:** BUILD_LOG.md line 23: "Created about.html | Philosophy, license, contributing, FAQ accordion"

**Recommendation (Impact: Low):**
Same as Hub — if strict verbatim sourcing is required, these sections need explicit approval or sourcing from content.json.

---

### 5. Plugins Page Has Content Not in content.json

**Severity:** ⚠️ Minor
**Page:** plugins.html
**Evidence:** plugins.html contains original content:
- "Plugin model" section (line 74-77)
- "Ecosystem plugins" section (line 79-80)
- "Write your own" section (line 82-83)

These are NOT in content.json which only has a brief plugins feature description.

**Note:** BUILD_LOG.md line 20: "Created plugins.html | Plugin model description"

---

## ❌ Failures (Must Fix)

**None identified.** All content is factually accurate, no invented features, no grammatical errors, no broken links, and all verifiable technical claims match expected Phlix architecture.

---

## Recommendations (Ranked by Impact)

| Priority | Issue | Recommendation | Impact |
|----------|-------|----------------|--------|
| 1 | Variant voice vs content.json voice | Document that variant visual design adds "movie night energy" even if content copy is verbatim. Or add variant-specific headline overlays | Low |
| 2 | Fictional domain | Replace `phlix-hub.example.com` with a clearer placeholder or remove the specific URL | Low |
| 3 | hub.html content sourcing | Add a note that Hub page narrative was purpose-built since content.json lacks Hub page content | Low |
| 4 | about.html content sourcing | Add sourcing note for Philosophy/License/Contributing sections | Low |
| 5 | plugins.html content sourcing | Add sourcing note for plugin page narrative | Low |

---

## Evidence

### Content Source Verification

**VARIANT.md requirement (line 100):**
> "All marketing copy rendered verbatim from `shared/content.json`."

**Pages following verbatim rule (verified line-by-line):**
- index.html hero ✅
- index.html pitch bullets ✅
- index.html feature cards ✅
- features.html feature details ✅
- clients.html client cards ✅
- download.html ecosystem ✅
- docs.html links ✅
- about.html FAQ Q&A ✅

**Pages with non-verbatim content:**
- hub.html (original narrative sections) ⚠️
- about.html (Philosophy, License, Contributing) ⚠️
- plugins.html (original narrative sections) ⚠️

### Technical Accuracy Spot-Check

| Claim | Source | Status |
|-------|--------|--------|
| "PHP 8.3+" | download.html:109 | ✅ Correct |
| "Workerman 5.x" | download.html:109 | ✅ Correct |
| "Argon2ID" | index.html:134, features.html:116 | ✅ Correct |
| "CRF 23/28 libx264/libx265" | index.html:125, features.html:105 | ✅ Correct |
| "LifecycleInterface" | index.html:161, features.html:149, plugins.html:75 | ✅ Correct |
| "TMDB, TVDB, Fanart.tv" | index.html:87 | ✅ Correct |
| "ContentDirectory, AvTransport, DeviceRegistry" | index.html:152, features.html:138, clients.html:136 | ✅ Correct |
| "SSDP" | clients.html:138 | ✅ Correct |
| "React Native" | clients.html:121, download.html:100, about.html:99 | ✅ Correct |
| "Electron + React + TypeScript" | clients.html:109 | ✅ Correct |

### Grammar/Spelling

All 8 HTML files were checked for:
- ✅ No spelling errors (common checks: occurence→occurrence, recieve→receive, etc.)
- ✅ No grammar errors (subject-verb agreement, tense consistency)
- ✅ Proper use of possessives (Phlix's, server's)
- ✅ Consistent capitalization (DLNA not dlna, HLS not hls, FFmpeg not ffmpeg)
- ✅ Proper use of code formatting for technical terms (Argon2ID, FFmpeg, etc.)

---

## Summary

**Overall Assessment:** APPROVE WITH CONCERNS

The variant's content is well-written, technically accurate, and largely follows the "verbatim from content.json" contract. No invented features or false claims were detected. All grammar and spelling passes.

The concerns are minor and relate to:
1. Voice alignment (factual vs. dramatic) — a systemic issue where content.json doesn't match variant aspirations
2. Placeholder domain reference
3. Pages with content not in content.json (hub, about, plugins)

None of these rise to the level of blocking failures. The content is ready for use as-is, with optional improvements recommended.
