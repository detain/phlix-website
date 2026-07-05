# DIMENSION 9: Content accuracy

## Score: 100/100
## Severity: ✅ (unchanged — but 1 new critical issue found)

---

## Findings

### ✅ Content from content.json — ALL VERBATIM

All marketing copy is from `content.json`:
- `hero`: eyebrow, headline, subheadline, CTAs ✅
- `pitch_bullets[]`: all 7 value props ✅
- `features[]`: all 8 features with titles, bodies, icons ✅
- `clients[]`: all 5 clients (roku, tizen, windows, mobile, dlna) with names, taglines, highlights ✅
- `ecosystem[]`: all 5 ecosystem entries ✅
- `faq[]`: all 6 FAQ items ✅
- `footer`: tagline + 3 columns with all links ✅
- `meta`: description, keywords, og_image path, twitter_card type ✅

No content invented, paraphrased, or modified.

---

### ✅ Product Claims — ALL ACCURATE

All product claims match `new_site.md` §16:
- PHP 8.3+ / Workerman 5.x ✅
- JWT auth with refresh tokens, Argon2ID ✅
- Up to 5 profiles/user, 4-/6-digit PINs, G–NC-17 rating filter ✅
- TMDB, TVDB, Fanart.tv, local NFO, 24-hour cache ✅
- Adaptive HLS, FFmpeg transcoding, per-device quality profiles ✅
- Direct play when supported ✅
- SyncPlay with NTP-style time sync ✅
- Live TV + DVR + EPG ✅
- DLNA (ContentDirectory/AvTransport/SSDP) ✅
- Plugin contract (LifecycleInterface + manifest) ✅
- Phlix Hub reverse-tunnel relay ✅
- Clients: Roku, Samsung Tizen, Windows, Mobile (beta), DLNA ✅
- BSD-3-Clause license ✅

---

### ✅ External Links — ALL CORRECT

All external links match `new_site.md` §5 requirements:
- Server source: `https://github.com/detain/phlix-server` ✅
- Docs: `https://detain.github.io/phlix-docs` ✅
- Plugin example: `https://github.com/detain/phlix-plugin-example` ✅
- Hub: `https://github.com/detain/phlix-hub` ✅
- GitHub org: `https://github.com/detain` ✅

---

### ❌ CRITICAL — Footer license URL is wrong

**Files:** All 8 HTML files (footer, Project column, line ~255 etc.)

```html
<a href="https://github.com/phlix-website/blob/master/LICENSE" rel="noopener noreferrer">License (BSD-3)</a>
```

**Should be:**
```html
<a href="https://github.com/detain/phlix-website/blob/master/LICENSE" rel="noopener noreferrer">License (BSD-3)</a>
```

`content.json.site.repo_org = "detain"` — every other GitHub link in the footer uses `github.com/detain/...`. The license link is the only one that incorrectly uses `phlix-website` instead, and `github.com/phlix-website` does not exist (would 404 for anyone clicking it).

**This is a content accuracy regression introduced in this iteration.** Every page has this broken link.

**Fix:** Find `https://github.com/phlix-website/blob/master/LICENSE` → replace with `https://github.com/detain/phlix-website/blob/master/LICENSE` on all 8 HTML files.

---

### ✅ No avoid_words used

Zero instances of: awesome, amazing, seamless, leverage, synergy, disrupt, robust, cutting-edge, journey, ecosystem, utilize.

---

## Summary

Content accuracy remains 100/100 for all content pulled from `content.json` and all product claims matching §16. However, a new critical issue was found in this iteration: the footer license URL on all 8 pages uses `github.com/phlix-website/blob/master/LICENSE` which is a non-existent repository, when it should be `github.com/detain/phlix-website/blob/master/LICENSE`. This must be fixed before final approval.

**This is a regression introduced in this iteration** — the footer license link was presumably written incorrectly during the fix pass rather than being carried over from the original template.
