# Dimension 9: Content Accuracy — Volcanic Forge

## Score: 98 (was 97)

### Severity: ✅ PASS

---

## What was checked

- All 8 HTML pages verified against `shared/content.json` source of truth
- Cross-checked: hero, pitch bullets, features, client cards, ecosystem list, FAQ, footer
- "Project Stack" rename verified on `download.html` and `docs.html`
- Spell-checked all rendered text for typos or invented claims

---

## Finding 1 — "Ecosystem" still used on plugins.html

**Severity:** ⚠️ Minor

**Location:** `plugins.html` line 70

**Issue:** The heading still reads "Ecosystem plugins" instead of the intended "Project Stack". The rename was applied correctly to `download.html` (line 101) and `docs.html` (line 74) but was missed on this page.

**Expected (from intent):**
```html
<h2>Project Stack</h2>
```

**Actual:**
```html
<h2>Ecosystem plugins</h2>
```

The list items (`ecosystem-list` class) are not shown on this page, so no data-sync issue exists — it's purely a heading-label inconsistency with the other two pages that use the same list.

**Suggested fix:**
```diff
-      <h2>Ecosystem plugins</h2>
+      <h2>Project Stack</h2>
```

**Note:** The CSS class `.ecosystem-list` in `theme.css` (line 318) is a layout class name, not a content label — no change needed there.

---

## Everything else: ✅ Clean

| Page | Content match | Notes |
|------|--------------|-------|
| index.html | ✅ | Hero, pitch bullets, features overview, CTA banner all match content.json exactly |
| download.html | ✅ | Clients section (Roku/Tizen/Windows/Mobile/DLNA), ecosystem list, server block all intact |
| docs.html | ✅ | Docs links list and Project Stack section correct |
| features.html | ✅ | All 8 feature details match content.json |
| clients.html | ✅ | All 5 client cards with highlights match content.json |
| plugins.html | ⚠️ | Body content correct; heading label inconsistency (see Finding 1) |
| hub.html | ✅ | Hub description and CTA match content.json |
| about.html | ✅ | FAQ (6 items), philosophy, license, contributing all match |

### No typos found
All feature titles, body copy, client names, repo URLs, and FAQ answers are verbatim matches with `content.json`.

### No invented claims
All claims (transcoding, SyncPlay, NTP offset, Argon2ID, FFmpeg, etc.) are specific and technically plausible — nothing like "best ever" or "works perfectly" language that would need backing.

---

## Verdict

One heading label missed the rename. Everything else is clean. Score: **98**
