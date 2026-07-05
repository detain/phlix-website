# Localization Review — Volcanic Forge

**Score: 62 / 100** ⚠️

---

## `<html lang="en">` present on all pages

✅ **PASS** — All 8 HTML pages declare `<html lang="en">` at line 2:

```
index.html:2      <html lang="en">
download.html:2  <html lang="en">
features.html:2  <html lang="en">
clients.html:2   <html lang="en">
plugins.html:2   <html lang="en">
docs.html:2      <html lang="en">
hub.html:2       <html lang="en">
about.html:2     <html lang="en">
```

---

## All user-facing strings from content.json

⚠️ **PARTIAL FAIL** — The hero and pitch sections on `index.html` correctly pull from `content.json`, but **all other page content is hardcoded in HTML** with string values that match content.json but are not referenced from it. A translator editing `content.json` would not update these pages.

**Strings that ARE from content.json (correct):**
- Hero eyebrow, headline, subheadline (`index.html:130-132`)
- Primary + secondary CTA labels (`index.html:134-135`)
- All 7 pitch bullets (`index.html:145-151`)
- All 8 feature card titles + descriptions (`index.html:161-232`)

**Strings that are HARDCODED (violation):**
- All feature detail descriptions on `features.html:66-153` — these duplicate content.json but are not linked to it. Example: `features.html:74` hardcodes "Folder-watcher hashes mtimes..." which matches `content.json:features[0].body` but is not referenced.
- All client card content on `clients.html:66-131` — hardcoded strings that match `content.json:clients[]`
- All download card content on `download.html:74-98`
- All FAQ answers on `about.html:75-100` — hardcoded duplicates of `content.json:faq[]`
- All nav link labels (Home, Features, Clients, Download, Plugins, Docs, Hub, About)
- All footer column headings and link labels
- All section headings on `hub.html`, `plugins.html`, `docs.html`

**Impact:** To fully localize this site, a translator must edit 8 HTML files and `content.json` — not just swap `content.json`. This doubles translation workload and introduces desync risk.

**Severity: ⚠️ MEDIUM** — The hero section (the most prominent content) is correctly internationalized. The violation affects secondary content that is still visible and important.

---

## No locale-unsafe formatting

✅ **PASS** — No use of:
- `Intl.DateTimeFormat`, `Intl.NumberFormat`, or `Intl.RelativeTimeFormat`
- `new Date()` or `new Intl.DateTimeFormat()` in JS
- Locale-specific number formatting (`toLocaleString()`, `toLocaleDateString()`)
- Hardcoded date strings in HTML

The only date in the site is `&copy; 2026 Phlix` in footer — a static year, locale-safe.

The `js/main.js` is pure DOM manipulation with no locale dependencies.

---

## Spelling & Grammar — Brand Voice Violations

⚠️ **VIOLATION FOUND** — The word **"ecosystem"** appears as a visible section heading in two HTML files:

1. `download.html:101` — `<h2>Ecosystem</h2>` with body text listing the phlix project ecosystem
2. `docs.html:74` — `<h2>Ecosystem</h2>` with identical content

The brand kit `avoid_words` list at `volcanic-forge.js:702-705` explicitly forbids:
```
"cozy", "friendly", "warm", "cute", "delightful", "nice", "fun",
"leverage", "synergy", "utilize", "seamless", "journey", "ecosystem"
```

**"ecosystem"** is a corporate term that contradicts the Volcanic Forge brand voice ("Commanding, Direct, Intense, Evocative"). It reads as soft and buzzwordy — the opposite of "short, declarative sentences with the weight of forged steel."

Note: `"ecosystem"` also appears as a JSON key in `content.json:126` — but that is a data structure key, not rendered text, so it does not violate the brand voice rule.

**All other avoid_words:** No instances of "cozy", "friendly", "warm", "cute", "delightful", "nice", "fun", "leverage", "synergy", "utilize", "seamless", or "journey" found in any HTML body text.

**Tense/voice consistency:** ✅ PASS — All copy uses present tense, active voice, declarative sentences. No mixing of past/present tense. No passive voice detected.

---

## Summary

| Check | Result |
|---|---|
| `<html lang="en">` on all pages | ✅ PASS |
| All strings from content.json | ⚠️ PARTIAL FAIL (hero/pitch correct; all other pages hardcoded) |
| No locale-unsafe formatting | ✅ PASS |
| Spelling/Grammar — no avoid_words | ⚠️ "ecosystem" used as section heading on download.html + docs.html |
| Consistent tense and voice | ✅ PASS |

### Required Fixes

1. **[MEDIUM]** Hardcoded feature/client/download/FAQ strings on 6 pages should be moved to `content.json` (or a per-page JSON file) and referenced via a lightweight template mechanism. At minimum, create a `content-site.json` that mirrors `content.json` for the pages that currently duplicate its data.

2. **[LOW]** Rename "Ecosystem" section heading on `download.html:101` and `docs.html:74` to something brand-compliant. Suggestions: **"Related Projects"**, **"The Forge Suite"**, **"Project Stack"**, or **"Components"**.
