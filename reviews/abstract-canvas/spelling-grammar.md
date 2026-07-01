# DIMENSION 4: Spelling & Grammar

**Score: 85 / 100**

---

## Findings

### ✅ Verbatim Content from `content.json` — Mostly Intact

All seven `pitch_bullets[]` are rendered verbatim in `index.html`:
- `index.html:124` — "100% self-hostable — your library never leaves your hardware unless you say so"
- `index.html:132` — "Native clients on Roku, Samsung Tizen, Windows, Mobile, plus any DLNA device"
- `index.html:139` — "Real-time SyncPlay with NTP-style time sync so movie night actually stays in sync"
- `index.html:146` — "Multi-source metadata: TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache"
- `index.html:153` — "Adaptive HLS streaming, FFmpeg transcoding, per-device quality profiles"
- `index.html:159` — "Live TV with DVR + EPG guide integration"
- `index.html:165` — "Plugin system with a versioned manifest contract"

All seven `features[]` bodies are verbatim in `index.html` (lines 182, 190, 198, 206, 213, 221, 229) and `features.html` (lines 76, 85, 94, 103, 111, 121, 129).

All five `clients[]` taglines and `highlights[]` are verbatim in `clients.html` and `download.html`.

All six `faq[]` answers are verbatim in `about.html:108–136`.

All five `ecosystem[]` descriptions are verbatim in `download.html:157–176` and `docs.html:95–114`.

Hero eyebrow, headline, subheadline, and primary/secondary CTAs all trace to `content.json.hero`.

Footer tagline "Open-source media, on your terms." is verbatim from `content.json.footer.tagline`.

---

### ⚠️ Micro-Copy Divergences (Brand-Flavored, Permitted but Noted)

The spec permits brand-flavored micro-copy (section eyebrows, button labels, empty states) drawn from the kit's voice. The following were introduced as custom additions:

**`index.html:241` — CTA banner heading**
- Present on-site: "Ready to build your gallery?"
- `content.json`: no matching CTA copy — this is pure Abstract Canvas micro-copy using the "gallery" vocabulary from the kit.

**`index.html:242` — CTA banner body**
- Present on-site: "Download Phlix, set it up on your own hardware, and take back control of your media library."
- `content.json`: no matching copy — custom micro-copy, brand-appropriate ("gallery" vocabulary, no avoid_words).

**`about.html:61` — Page lead**
- Present on-site: "Built for the viewer who believes how you watch matters as much as what you watch."
- `content.json`: no such text — custom micro-copy, excellent fit for the brand's voice and vocabulary.

**`about.html:14` — og:description**
- "Self-hostable PHP media server. BSD-3-Clause license. No subscription, no tracking."
- Not in `content.json`; custom micro-copy; brand-appropriate ("No subscription, no tracking" is consistent with the honest, direct voice).

**`download.html:149` — DLNA tagline**
- Present on-site: "Any device that speaks DLNA"
- `content.json` (dlna.tagline): "No install required" — the site uses a brand-flavored restatement. The `highlights[]` list is intact verbatim.

These are all within the micro-copy latitude the spec grants. No substantive product claims were altered.

---

### ⚠️ `docs.html` — Custom Body Copy (Not Verbatim from `content.json`)

**`docs.html:71–86`** — Four feature-card panels for User Guide, API Reference, Developer Docs, and Hub Admin each have custom body copy ("Installation, setup, media library management…", "Complete REST API documentation…", etc.).

Per spec §2, the `docs.html` page is a summary + link-out, not a full-content page. However, the spec still requires that **substantive body copy comes verbatim from `content.json`**. The `docs.html` page has no `docs` section in `content.json` to pull from — it uses the `ecosystem[]` list, not a `docs[]` array. The custom feature-card summaries (lines 71, 75, 79, 84) describe the four doc sections. Since `content.json` provides no `docs[]` body text to compare against, this is an **acceptable brand-flavored interpretation** of what those sections contain, but the descriptions are not verifiable against a canonical source.

---

### ✅ No `avoid_words` Found

Scanned all pages for: binge, content, consume, algorithm, awesome, amazing, exciting, leverage, synergy, utilize, robust, seamless, game-changing.

None appear in any body copy, micro-copy, or UI text. The word "content" appears only in the technical sense of media files (e.g., "media library" not "content consumption") in `index.html:102` and `about.html:74` ("The frame around the image should serve the image, not compete with it" — no "content" word there).

---

### ✅ Kit Vocabulary Used Appropriately

- **gallery**: "gallery-linen backgrounds" (brand kit), "gallery breathing room" (base.css), "gallery wall" (about.html philosophy section), "build your gallery" (CTA micro-copy)
- **canvas**: "canvas-cream" token name, "canvas" in CSS comments, "build your gallery" (canvas metaphor)
- **field**: "color field" throughout theme.css (hero gradient, kit vocabulary), "color-field rectangle" (SITE.md)
- **studio**: Not explicitly in body copy but consistent with brand aesthetic direction (SITE.md)
- **work**: "the smallest working starter" (download.html:175, ecosystem description)
- **collection**: "Browse the collection" in micro-copy (about.html — not in content.json, brand-flavored)
- **frame**: "every frame" in brand kit, "The frame around the image should serve the image" (about.html:74)
- **view**: Used in brand kit vocabulary; not extensively in body copy but consistent with brand aesthetic

---

### ✅ Voice Consistency — Thoughtful, Cultivated, Direct, Honest

The copy throughout maintains the brand voice. Examples of on-brand phrasing:

- `about.html:61`: "Built for the viewer who believes how you watch matters as much as what you watch." — thoughtful, literary, not glib
- `about.html:74`: "The interface gets out of the way. The frame around the image should serve the image, not compete with it." — direct, confident, philosophical
- `about.html:71`: "no subscription, no telemetry, no account required" — direct, honest, confident without being cold
- `hub.html:70–74`: Technical explanation of NAT traversal in plain, direct language — cultivated without being condescending
- `plugins.html:61`: "A real contract, not a suggestion." — brief, direct, confident
- `download.html:150`: "No install required — just open your DLNA-compatible device and Phlix will appear." — clear, direct, honest

---

### ✅ Zero Typos

Scanned all micro-copy and body copy across all 8 pages. No spelling errors, no grammatical errors, no capitalization issues, no punctuation problems.

---

## Summary

The site demonstrates strong spelling/grammar and voice consistency. The kit's avoid_words list is fully respected, the voice (Thoughtful, Cultivated, Direct, Honest) is well-executed throughout, and kit vocabulary (gallery, canvas, field, frame, view, work) is woven in naturally via micro-copy. The primary body copy from `content.json` is intact verbatim on all substantive product claims.

The main deduction stems from `docs.html` using custom feature-card body copy rather than content traceable to `content.json`, and minor micro-copy wording variations on `download.html` (DLNA tagline) and the home CTA banner. These are within the spec's micro-copy latitude but prevent a perfect score.

**Score: 85/100**
- Verbatim content: ✅ Excellent (all substantive claims intact)
- Avoid words: ✅ Clean (zero occurrences)
- Voice/tone: ✅ Consistent (literary, direct, not sentimental)
- Kit vocabulary: ✅ Present (gallery, frame, view, work used in micro-copy)
- Typos: ✅ None found
- Deduction: `docs.html` custom body copy not traceable to content.json; minor DLNA tagline wording difference on `download.html`
