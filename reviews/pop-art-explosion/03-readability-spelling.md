# Review: Pop Art Explosion — Dimensions 3 & 4
**Readability + Spelling & Grammar**

---

## Severity: ❌ FAIL (Both dimensions <80)

---

## DIMENSION 3: Readability — Score: ~55/100

### Issues

#### 1. ALL CAPS headlines — missing entirely

Brand kit requires: "ALL CAPS is encouraged for headlines and short labels" (`pop-art-explosion.js:423`) and "Use Bangers for all headlines, ALL CAPS" (`pop-art-explosion.js:1014`). Voice calls for exclamatory, punchy ALL CAPS treatment.

Every page heading is sentence-case or title-case, never ALL CAPS:

| File | Line | Text | Issue |
|------|------|------|-------|
| `index.html` | 79 | `Your media.<br>Your library.<br>Your Phlix.` | NOT ALL CAPS |
| `index.html` | 91 | `Why Phlix?` | NOT ALL CAPS |
| `index.html` | 107 | `Everything your library needs` | NOT ALL CAPS |
| `index.html` | 189 | `Ready to stream?` | NOT ALL CAPS |
| `about.html` | 60 | `About` | NOT ALL CAPS |
| `about.html` | 66 | `Philosophy` | NOT ALL CAPS |
| `about.html` | 69 | `License` | NOT ALL CAPS |
| `about.html` | 72 | `Contributing` | NOT ALL CAPS |
| `about.html` | 75 | `FAQ` | NOT ALL CAPS |
| `clients.html` | 60 | `Clients` | NOT ALL CAPS |
| `clients.html` | 69 | `Roku` | NOT ALL CAPS |
| `clients.html` | 83 | `Samsung Tizen` | NOT ALL CAPS |
| `clients.html` | 96 | `Windows` | NOT ALL CAPS |
| `clients.html` | 110 | `Mobile (iOS + Android)` | NOT ALL CAPS |
| `clients.html` | 123 | `Any DLNA device` | NOT ALL CAPS |
| `clients.html` | 138 | `All clients are open source` | NOT ALL CAPS |
| `docs.html` | 60 | `Docs` | NOT ALL CAPS |
| `docs.html` | 66 | `Documentation` | NOT ALL CAPS |
| `docs.html` | 75 | `Ecosystem` | NOT ALL CAPS (also: avoid_word — see §4) |
| `download.html` | 60 | `Download` | NOT ALL CAPS |
| `download.html` | 66 | `Server` | NOT ALL CAPS |
| `download.html` | 73 | `Clients` | NOT ALL CAPS |
| `download.html` | 102 | `Ecosystem` | NOT ALL CAPS (also: avoid_word — see §4) |
| `download.html` | 114 | `Need help getting started?` | NOT ALL CAPS |
| `features.html` | 60 | `Features` | NOT ALL CAPS |
| `hub.html` | 60 | `Phlix Hub` | NOT ALL CAPS |
| `hub.html` | 66 | `What the Hub does` | NOT ALL CAPS |
| `hub.html` | 69 | `Self-host or use the public hub` | NOT ALL CAPS |
| `hub.html` | 72 | `Hub mode in clients` | NOT ALL CAPS |
| `hub.html` | 78 | `Try the public Hub` | NOT ALL CAPS |
| `plugins.html` | 60 | `Plugins` | NOT ALL CAPS |
| `plugins.html` | 66 | `Plugin model` | NOT ALL CAPS |
| `plugins.html` | 71 | `Ecosystem plugins` | NOT ALL CAPS (also: avoid_word — see §4) |
| `plugins.html` | 74 | `Write your own` | NOT ALL CAPS |
| `plugins.html` | 80 | `Build something great` | NOT ALL CAPS |

#### 2. Line length — severely exceeds 55–70ch

Brand kit typography rule: "Body line-length: 55–70 characters; condensed type allows more per line." (`pop-art-explosion.js:426`)

Every single paragraph violates this. Examples:

| File | Line | Character count | Issue |
|------|------|----------------|-------|
| `index.html` | 80 | ~195 chars | far over 70ch |
| `index.html` | 116 | ~142 chars | far over 70ch |
| `index.html` | 125 | ~99 chars | over 70ch |
| `index.html` | 134 | ~98 chars | over 70ch |
| `index.html` | 143 | ~94 chars | over 70ch |
| `index.html` | 152 | ~98 chars | over 70ch |
| `index.html` | 161 | ~84 chars | over 70ch |
| `index.html` | 170 | ~84 chars | over 70ch |
| `index.html` | 179 | ~76 chars | over 70ch |
| `about.html` | 67 | ~103 chars | over 70ch |
| `about.html` | 70 | ~73 chars | over 70ch |
| `about.html` | 79 | ~147 chars | far over 70ch |
| `hub.html` | 67 | ~133 chars | far over 70ch |
| `hub.html` | 70 | ~113 chars | far over 70ch |

**Every paragraph** in all 8 pages exceeds 70 characters. This is not a marginal miss — it is a systemic failure of the condensed-type line-length contract.

#### 3. Voice — completely wrong

Brand kit voice: `["Loud", "Ironic", "Punchy", "Exclamatory", "Self-aware"]` (`pop-art-explosion.js:711`)
Brand kit writing style: "SHORT SENTENCES. Often incomplete. Sometimes just BOOM. Active voice always. Never corporate. Never passive." (`pop-art-explosion.js:716-720`)

The copy on every page reads like generic open-source software marketing — calm, measured, corporate, passive-adjacent. Example from `about.html:67`:

> "Phlix is built on a few principles: your library stays on your hardware, the software is BSD-3 licensed so you can fork it, and the community drives what gets built next."

This is **textbook corporate**. No exclamation marks. No short punchy sentences. No onomatopoeia. No ironic self-awareness. The complete absence of the brand vocabulary (KAPOW, ZAP, BAM, POW, WHAM, BOOM, BANG, explode, blast, scream, splash, stamp, print, bold, panel, dot, primary, amplified, loud).

The tagline in the brand kit is **"WHAM! Your media, amplified."** but the actual site title is `"Phlix — WHAM! Your media, amplified."` which partially uses the brand voice — but nowhere else on the site does this energy appear.

#### 4. Writing style — too long, too soft, not exclamatory

The brand kit is explicit: "Occasional ironic understatement after a dramatic opener works brilliantly." But there are no dramatic openers, no ironic understatements, no BOOM moments. The site reads as if it was written by a technical writer who has never seen the brand kit.

---

## DIMENSION 4: Spelling & Grammar — Score: ~45/100

### Issues

#### 1. AVOID_WORDS — "Ecosystem" used as visible section heading (AUTOMATIC ❌)

Brand kit `avoid_words`: `["synergy", "leverage", "robust", "ecosystem", "seamless", "innovative", "cutting-edge", "game-changer", "holistic", "empower", "utilize"]` (`pop-art-explosion.js:728-731`)

The word **"ecosystem"** appears as a visible section heading on two pages:

| File | Line | Text | Issue |
|------|------|------|-------|
| `docs.html` | 75 | `<h2>Ecosystem</h2>` | avoid_word as heading |
| `download.html` | 102 | `<h2>Ecosystem</h2>` | avoid_word as heading |

Additionally, the subsection heading on `plugins.html:71`:
| `plugins.html` | 71 | `<h2>Ecosystem plugins</h2>` | avoid_word compound |

This triggers an **automatic ❌** regardless of any other score, per review instructions.

#### 2. No other avoid_words detected

No instances of: synergy, leverage, robust, seamless, innovative, cutting-edge, game-changer, holistic, empower, utilize

#### 3. Brand vocabulary — almost entirely absent

Brand kit vocabulary list: `["KAPOW", "ZAP", "BAM", "POW", "WHAM", "BOOM", "BANG", "explode", "blast", "scream", "splash", "stamp", "print", "bold", "panel", "frame", "dot", "primary", "amplified", "loud"]` (`pop-art-explosion.js:722-726`)

Count of vocabulary words used on all 8 pages combined:
- **WHAM**: 1 instance (in page title `<title>` and meta)
- **bold**: 0 instances
- **primary**: 0 instances
- **amplified**: 0 instances
- **loud**: 0 instances
- **KAPOW, ZAP, BAM, POW, BOOM, BANG, explode, blast, scream, splash, stamp, print, panel, frame, dot**: 0 instances

The word "loud" appears nowhere in the actual page copy (only in brand kit source files). "Primary" appears only in CSS class names and hex values. Zero onomatopoeia. Zero explosive vocabulary.

#### 4. Content vs content.json — PASS

Checked factual claims against `/home/sites/phlix/phlix-website/shared/content.json`:

- `index.html:79` headline matches `content.json:15` ✓
- `index.html:80` subheadline matches `content.json:16` ✓
- `index.html:93-99` pitch bullets match `content.json:21-28` ✓
- `index.html:116` library feature body matches `content.json:33` ✓
- `index.html:125` syncplay feature body matches `content.json:39` ✓
- `index.html:134` transcode feature body matches `content.json:45` ✓
- `index.html:143` auth feature body matches `content.json:51` ✓
- `about.html:79-99` FAQ answers match `content.json:134-157` ✓
- Footer tagline matches `content.json:160` ✓

Content accuracy: **PASS**

#### 5. Heading hierarchy — structurally correct

All pages use proper h1 → h2 → h3 hierarchy. No skipped levels. No improper nesting. **PASS**

---

## Summary Table

| Check | Result |
|-------|--------|
| No avoid_words | ❌ FAIL — "ecosystem" as section heading (docs.html:75, download.html:102, plugins.html:71) |
| ALL CAPS headlines | ❌ FAIL — zero headlines in ALL CAPS |
| Line length 55–70ch | ❌ FAIL — every paragraph exceeds 70ch |
| Brand vocabulary used | ❌ FAIL — 1/20 vocabulary words (WHAM in title only) |
| Voice (Loud, Ironic, Punchy, Exclamatory) | ❌ FAIL — reads as generic corporate |
| Writing style (short sentences, BOOM, active) | ❌ FAIL — long paragraphs, no exclamation, no onomatopoeia |
| Content matches content.json | ✅ PASS |
| Heading hierarchy | ✅ PASS |
| No corporate jargon (passive voice, hedge phrases) | ⚠️ BORDERLINE — not egregious but very safe/corporate |
| Spelling | ✅ PASS (no typos found) |

---

## Scores

| Dimension | Score | Severity |
|-----------|-------|----------|
| **Readability** | ~55/100 | ❌ |
| **Spelling & Grammar** | ~45/100 | ❌ |

**Overall: ❌ FAIL — automatic ❌ due to avoid_words violation**

---

## Required Fixes (Priority Order)

1. **Remove "Ecosystem" section headings** — rename to "Related Projects" or "The Projects" (docs.html:75, download.html:102, plugins.html:71)
2. **Convert all page headlines to ALL CAPS** using Bangers font
3. **Restructure all body copy to 55–70ch line length** — this is a core typography rule of the brand kit
4. **Inject brand vocabulary** — add KAPOW/ZAP/BAM/POW/WHAM/BOOM into section headings and callouts; use words from the approved vocabulary list
5. **Rewrite copy for voice** — short punchy sentences, exclamatory where appropriate, ironic understatements after dramatic openers, active voice throughout
