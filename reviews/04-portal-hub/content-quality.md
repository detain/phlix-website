# Content Quality Review — Variant 04-portal-hub

**Review Date**: 2026-05-20
**Reviewer**: Dimension Reviewer — Content Quality
**Pages Reviewed**: index.html, features.html, download.html, clients.html, about.html, docs.html, plugins.html, hub.html

---

## Summary

All 8 pages maintain strong alignment with `shared/content.json`. Tone is consistently **Efficient, Modern, Crisp, and Minimal**. No invented features detected. One placeholder URL needs replacement before launch.

**Score: 92/100**

---

## ✅ Passed Items

### Index (index.html)
- [x] Hero eyebrow: "Self-hosted media server" — matches `content.json.hero.eyebrow`
- [x] Hero headline: "Your media. Your library. Your Phlix." — exact match
- [x] Hero subheadline — full content.json string, verbatim
- [x] Primary/Secondary CTA labels — "Get Phlix" / "Read the docs" — exact
- [x] All 7 pitch bullets — verbatim match to `content.json.pitch_bullets`
- [x] All 8 feature-card titles and body copy — exact match to `content.json.features`
- [x] Footer tagline: "Open-source media, on your terms." — exact match
- [x] Footer column headings and link labels — match `content.json.footer`

### Features (features.html)
- [x] All 8 feature-detail sections — titles and body copy verbatim from `content.json.features`
- [x] Feature IDs match feature `id` fields from content.json

### Download (download.html)
- [x] Server requirement: "Requires PHP 8.3+" — matches content.json ecosystem entry
- [x] All 5 client cards with names, taglines, repo links — match `content.json.clients`
- [x] Ecosystem list — exact match to `content.json.ecosystem`

### Clients (clients.html)
- [x] All 5 client cards present with correct status badges (stable/beta)
- [x] Client taglines — exact match
- [x] Client highlights — exact match to `content.json.clients[].highlights`
- [x] All repo links use correct detain GitHub org URLs

### About (about.html)
- [x] Philosophy paragraph — consistent with brand "self-hostable" positioning
- [x] BSD-3-Clause license stated correctly
- [x] FAQ section — all 6 Q&A pairs verbatim from `content.json.faq`

### Docs (docs.html)
- [x] Full documentation URL points to `detain.github.io/phlix-docs` — matches `content.json.social.docs`
- [x] Doc links (user guide, API reference, developer docs, hub admin guide) — all valid
- [x] Ecosystem list — exact match to `content.json.ecosystem`

### Plugins (plugins.html)
- [x] "Every plugin implements LifecycleInterface and ships a manifest" — consistent with content.json plugin feature body
- [x] Links to `phlix-plugin-example` repo — correct

### Hub (hub.html)
- [x] "Sign in once. The Hub's reverse-tunnel relay handles NAT traversal" — matches content.json hub feature body
- [x] "Self-hostable, or use the public one" — matches hub feature body
- [x] "Every official client supports Hub mode" — consistent with clients page Hub mode highlights

### Tone Compliance (Efficient, Modern, Crisp, Minimal)
- [x] No marketing superlatives or puffery ("revolutionary", "best-in-class")
- [x] Short, declarative sentences throughout
- [x] No filler phrases; direct to the point
- [x] Technical terms used precisely (NTP offset, CRF, Argon2ID, DLNA, HLS)
- [x] Consistent active voice

---

## ⚠️ Concerns (Non-blocking)

### hub.html: Placeholder domain in body text
**Location**: `hub.html` line 76

```html
<p>You can run your own <a href="https://github.com/detain/phlix-hub">phlix-hub</a> instance, or use the public one at phlix-hub.example.com — no configuration required.</p>
```

**Concern**: `phlix-hub.example.com` is a placeholder domain with no DNS resolution. The content.json does not specify a public hub URL, so this is a content gap — not a deviation from content.json (since no URL is specified there). However, deploying this page with a broken URL is a minor user-experience issue.

**Impact**: Low — users clicking the link will hit a browser error. No security or functionality implications.

**Recommendation**: Either remove the phrase "at phlix-hub.example.com" or replace it with the actual public hub URL once determined. The surrounding GitHub repo link is valid.

---

## ❌ Failures (Must Fix)

None.

---

## Recommendations (Ranked by Impact)

| Priority | Issue | Location | Recommendation |
|----------|-------|----------|----------------|
| **1 (Low)** | Placeholder domain `phlix-hub.example.com` in Hub page body | `hub.html:76` | Remove or replace with real URL. No other pages have broken links or placeholder content. |

---

## Evidence

### Content Alignment Matrix

| Page | content.json section | Match type | Notes |
|------|---------------------|------------|-------|
| index.html | hero, pitch_bullets, features, footer | Verbatim | All hero/pitch/feature text exact |
| features.html | features | Verbatim | All 8 feature titles+body exact |
| download.html | clients, ecosystem | Verbatim | Client names/taglines/highlights exact |
| clients.html | clients | Verbatim | Status badges match status field |
| about.html | faq | Verbatim | All 6 FAQ Q&A pairs exact |
| docs.html | ecosystem, social.docs | Verbatim | Docs URL matches, ecosystem exact |
| plugins.html | features[plugins] | Consistent | Plugin description consistent |
| hub.html | features[hub] | Consistent | Hub feature description consistent |

### Link Validation

| Link | URL | Status |
|------|-----|--------|
| Docs URL | https://detain.github.io/phlix-docs | ✅ Valid |
| GitHub org | https://github.com/detain | ✅ Valid |
| phlix-server | https://github.com/detain/phlix-server | ✅ Valid |
| phlix-hub | https://github.com/detain/phlix-hub | ✅ Valid |
| phlix-plugin-example | https://github.com/detain/phlix-plugin-example | ✅ Valid |
| phlix-roku-client | https://github.com/detain/phlix-roku-client | ✅ Valid |
| phlix-tizen-client | https://github.com/detain/phlix-tizen-client | ✅ Valid |
| phlix-windows-client | https://github.com/detain/phlix-windows-client | ✅ Valid |
| phlix-mobile-client | https://github.com/detain/phlix-mobile-client | ✅ Valid |
| phlix-hub.example.com | — | ⚠️ Placeholder (non-resolving) |

### Technical Claims Verification

| Claim | Appears on | Content JSON Basis | Verdict |
|-------|-----------|-------------------|---------|
| "PHP 8.3+" | download.html | ecosystem[0].what | ✅ Correct |
| "Workerman 5.x" | download.html | ecosystem[0].what | ✅ Correct |
| "Argon2ID" | features.html, index.html | features[auth].body | ✅ Correct |
| "JWT auth with refresh tokens" | features.html | features[auth].body | ✅ Correct |
| "CRF 23/28 libx264/libx265" | features.html, index.html | features[transcode].body | ✅ Correct |
| "NTP-style time sync" | features.html, index.html | features[syncplay].body | ✅ Correct |
| "ContentDirectory, AvTransport" | features.html, index.html | features[dlna].body | ✅ Correct |
| "LifecycleInterface + manifest schema" | features.html, plugins.html | features[plugins].body | ✅ Correct |
| "Reverse-tunnel relay" | hub.html, features.html, index.html | features[hub].body | ✅ Correct |
| "FFmpeg can read" | about.html | faq[2].a | ✅ Correct |
| "React Native" | clients.html | clients[mobile].tagline | ✅ Correct |
| "Electron + React + TypeScript" | clients.html | clients[windows].highlights | ✅ Correct |

---

## Conclusion

Content quality for variant 04-portal-hub is **high trust**. All pages are derived faithfully from `shared/content.json`. Tone aligns with brand voice. No invented features detected. The only actionable item is the placeholder domain in hub.html, which should be resolved before deployment.

**Final Score: 92/100**

---

*Review methodology: Each page's body copy, headlines, CTAs, and footer content cross-referenced against shared/content.json. Link targets validated. Technical claims spot-checked against content.json source fields.*
