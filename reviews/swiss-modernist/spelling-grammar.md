# DIMENSION 4: Spelling & Grammar — Swiss Modernist Site Review

## Score: 92 / 100

---

## Severity Scale
- ✅ Pass
- ⚠️ Minor (stylistic, not an error)
- ❌ Fail (typo or grammar error)

---

## 1. Avoid Words Check

The kit forbids: `amazing`, `awesome`, `exciting`, `fun`, `enjoy`, `cozy`, `delightful`, `robust`, `synergy`, `leverage`, `empower`, `seamless`, `intuitive`, `curated`, `bespoke`, `stunning`, `beautiful`, `love`, `passion`.

**None of these words appear anywhere in the site copy.** ✅

---

## 2. Contractions

The site uses contractions in several places:
- `index.html:230`: "does not make you click through menus" (features/livetv card)
- `index.html:237`: "does not need a new app" (DLNA card)
- `features.html:105`: "does not make you click through menus"
- `features.html:113`: "does not need a new app"
- `hub.html:93`: "which Hub it registers with"

Contractions are not forbidden by the kit. The kit's voice is "Direct, Precise, Declarative, Unsentmental" — contractions are neutral in this voice. Acceptable. ✅

---

## 3. Exclamation Marks ✅

No exclamation marks found anywhere on the site. The kit's writing_style explicitly forbids "No exclamation marks." ✅

---

## 4. Periods vs. Em-dashes in Copy

The kit says: "No ellipsis for drama." No ellipses found. ✅

---

## 5. Informal Language ⚠️

**`clients.html:59`**:
> "No browser plugins. No casting faff. Just your media, playing where you want it."

"Faff" is British slang meaning "unnecessary fuss or bother." It is:
- Not in the `avoid_words` list
- Not a typo — it is a real word
- Stylistically inappropriate for the Swiss Modernist voice (which is "Direct, Precise, Declarative, Unsentmental" and "dry but not cold")

The sentence structure is also slightly contradictory: "No browser plugins. No casting faff." — if there are no browser plugins, the "faff" of casting may be what the user still has to deal with (casting to a TV is not the same as a native channel). The phrasing is mildly confusing.

**Severity: Minor** (⚠️) — Not a spelling error, but a stylistic misfit.

---

## 6. Full Content Accuracy Check

All product claims verified against `shared/content.json` and the technical accuracy guardrails in `new_site.md §16`:

### Home page ✅
- All 7 pitch bullets match `content.json` verbatim ✅
- All 8 feature cards match `content.json` features[].body verbatim ✅
- Hero copy matches `content.json.hero` verbatim ✅
- CTA banner copy: "Start streaming on your terms / BSD-3-Clause. No subscription. No data collection. Your server, your rules." — consistent with content.json tone ✅

### Features page ✅
- Page header lead text: "Phlix runs on your hardware. Your media stays on your network. Every feature is built for people who want control over their data and their media experience." — not from content.json but factually accurate and brand-flavored ✅
- All 8 feature detail bodies match `content.json.features[].body` verbatim ✅
- CTA text: "PHP 8.3+. Workerman 5.x. Async/coroutine. Get started in minutes." — consistent with new_site.md §16 ✅

### Clients page ✅
- All 5 clients from `content.json.clients[]` present ✅
- Status badges match `status` field: stable → green badge, beta → amber badge ✅
- All highlights match `content.json.clients[].highlights[]` verbatim ✅
- "No app for your device? / DLNA covers most smart TVs..." — content from content.json FAQs about DLNA; accurate ✅

### Download page ✅
- Ecosystem list has all 5 items from `content.json.ecosystem[]` ✅
- Ecosystem descriptions match `content.json.ecosystem[].what` verbatim ✅
- CTA text: "The documentation covers installation, configuration, and client setup." — consistent with content.json ✅

### Plugins page ✅
- "LifecycleInterface + manifest schema. Drop a plugin in, the loader picks it up." — matches content.json.features[plugins].body ✅
- "phlix-plugin-example" repository referenced correctly ✅

### Docs page ✅
- All 4 doc card links go to the correct external URLs (`site.social.docs` variants) ✅
- Ecosystem list matches content.json.ecosystem[] ✅
- CTA: "Open an issue on GitHub" — uses correct GitHub org (`detain`) ✅

### Hub page ✅
- Copy about Hub relay is factually accurate ✅
- All statements about NAT, reverse-tunnel, encryption are consistent with content.json.hub description ✅
- "hub.phlix.dev" mentioned as public Hub — factual, not a spec violation ✅

### About page ✅
- Philosophy section: factually accurate product rationale ✅
- License: BSD-3-Clause stated correctly ✅
- Contributing: `@detain` GitHub org referenced correctly ✅
- FAQ items match `content.json.faqs[]` verbatim ✅
- "License (BSD-3)" in footer ✅

---

## 7. Technical Terminology

All technical terms are spelled correctly:
- `Argon2ID` — correct
- `HLS` — correct
- `FFmpeg` — correct
- `DLNA` — correct
- `SyncPlay` — correct (proper product name, capitalized)
- `NAT` — correct
- `VitePress` — correct (docs framework)
- `Workerman` — correct
- `Electron + React + TypeScript` — correct

No spelling errors in technical content. ✅

---

## 8. Grammar & Syntax

- Subject-verb agreement: correct throughout ✅
- Parallel structure in lists: correct throughout ✅
- No dangling modifiers ✅
- Consistent past/present tense — present tense used throughout (correct for a product marketing site describing a thing that exists) ✅
- "No browser plugins. No casting faff. Just your media, playing where you want it." — The third fragment "Just your media, playing where you want it" has a participle phrase with no main clause. Grammatically, this is a sentence fragment used for rhetorical effect (acceptable in marketing copy, borderline in formal technical writing). **Severity: Very minor** — Stylistic choice rather than error.

---

## Summary

| Check | Result | File:Line |
|-------|--------|-----------|
| No avoid_words | ✅ | All pages |
| No exclamation marks | ✅ | All pages |
| No ellipses for drama | ✅ | All pages |
| Spelling (general) | ✅ | All pages |
| Spelling (technical terms) | ✅ | All pages |
| Contractions | ✅ | Appropriate usage |
| Content matches content.json | ✅ | All pages |
| Technical accuracy (§16) | ✅ | All pages |
| Informal language ("faff") | ⚠️ | `clients.html:59` |
| Grammar (fragment) | ⚠️ | `clients.html:59` |

---

## Recommendation

The site is clean. The only actionable finding is the word **"faff"** in `clients.html:59`. Replace with something in the Swiss Modernist voice — e.g., "No browser plugins. No casting overhead. Just your media, playing where you want it." — or simply "No browser plugins. No casting. Just your media, playing where you want it."
