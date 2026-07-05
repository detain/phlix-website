# Dimension 3 — Readability Review: Street Mural

## Score: 95 / 100 ✅

### Severity Legend
- ✅ Pass (minor or no issue)
- ⚠️ Warning (observable deficiency, not blocking)
- ❌ Fail (significant violation)

---

## 3.1 Reading Level & Audience Fit

**Target audience:** Urban youth, street culture enthusiasts, self-hosters.

**Finding:** The copy is appropriately pitched — direct, punchy, no academic jargon. Short sentences throughout. The street vernacular is present but not forced.

| Location | Observation | Severity |
|----------|-------------|----------|
| `index.html:210` CTA | "Ready to paint your wall?" — fits audience | ✅ |
| `download.html:138` CTA | "Hit the library. Paint your wall." — direct, punchy | ✅ |
| `plugins.html:106` CTA | "Tag your own piece on the wall." — apt metaphor | ✅ |
| `clients.html:146` CTA | "Your crew, your devices, your wall." — community voice | ✅ |
| `hub.html:123` CTA | "One login. Every wall. Anywhere." — strong | ✅ |
| Body copy generally | All content from `content.json` is verbatim; no added corporate complexity | ✅ |

**Sub-score: 96** ✅

---

## 3.2 Body Line-Length (55–70 characters)

**Rule:** Body line-length should target 55–70 characters.

| Selector | font-size | line-height | max-width | Estimated chars/line | Status |
|----------|-----------|-------------|-----------|----------------------|--------|
| `p` (base) | 1rem | 1.55 | 65ch | ~65 at 1rem/Barlow Condensed | ✅ 65ch |
| `.pitch-list li` | 1.0625rem | 1.45 | 65ch | ✅ ~65 | ✅ **Fixed** |
| `.hero-subheadline` | 1.25rem | 1.5 | 600px | ~75 at large size | ⚠️ hardcoded px |
| `.feature-card p` | 0.9375rem | 1.55 | 65ch | ✅ ~65 | ✅ **Fixed** |
| `.feature-detail p` | 1.0625rem | 1.55 | 65ch | ✅ ~65 | ✅ |
| `.faq-item dd` | 1rem | 1.6 | 65ch | ✅ ~65 | ✅ **Fixed** |

**Round 1 issue resolved:** `.pitch-list li` (theme.css:187), `.feature-card p` (components.css:339), and `.faq-item dd` (theme.css:457) all now have `max-width: 65ch`, constraining line length to ~65 characters on widescreen viewports.

**Note:** `.hero-subheadline` still uses a hardcoded `600px` max-width. At large viewport sizes this yields ~75 characters at 1.25rem. Non-blocking since it's a headline element, not body copy.

**Sub-score: 95** ✅

---

## 3.3 No Walls of Text / Clear Hierarchy

**Rule:** Sections should be visually separated; no dense unbroken paragraphs.

| Page / Section | Observation | Severity |
|----------------|-------------|----------|
| `index.html` hero | Short eyebrow + `<br>` broken headline + 2-sentence subheadline + 2 CTAs. Clean. | ✅ |
| `index.html` pitch | Bulleted list, not paragraphs. Good. | ✅ |
| `index.html` features overview | Card grid — 7 cards with icon + title + body. Excellent scannability. | ✅ |
| `download.html` server | 3-line install snippet + single CTA. | ✅ |
| `about.html` philosophy | 6-item philosophy grid, each ~1 sentence. Good chunking. | ✅ |
| `about.html` FAQ | 6 Q&A pairs in separate cards. No wall of text. | ✅ |
| All pages | Consistent section separation with `border-top: 3px solid var(--color-border)` | ✅ |

**Sub-score: 100** ✅

---

## 3.4 Scannability (Eyebrows, Bullets, Cards)

| Element | Present | Locations |
|---------|---------|-----------|
| Section eyebrows | ✅ | `.hero-eyebrow`, `.section-eyebrow` on all interior pages |
| Bulleted pitch list | ✅ | `index.html:112–120` |
| Feature cards | ✅ | `index.html:130–199`, `features.html` |
| Client cards | ✅ | `clients.html:64–138` |
| Download cards | ✅ | `download.html:79–103` |
| FAQ items | ✅ | `about.html:113–138` |
| Philosophy grid | ✅ | `about.html:64–88` |
| Hub flow diagram | ✅ | `hub.html:65–102` |
| Plugin flow steps | ✅ | `plugins.html:65–78` |

**Sub-score: 100** ✅

---

## 3.5 Typography Hierarchy

| Level | Font | Usage | Status |
|-------|------|-------|--------|
| `h1` (hero / page header) | Anton, uppercase, clamp(3rem,8vw,6.5rem) | Large, commanding | ✅ |
| `h2` (section headings) | Anton, uppercase, clamp(1.5rem,4vw,3rem) | Clear step-down | ✅ |
| `h3` (card titles) | Anton, uppercase, ~1.25rem | Consistent | ✅ |
| Body | Barlow Condensed, 1rem, line-height 1.55 | Tight, readable | ✅ |
| UI / nav / labels | Barlow, 0.8–0.9rem, uppercase | Functional distinction | ✅ |
| Code | Share Tech Mono | Appropriate | ✅ |

**Note:** `index.html:107` hero headline uses a CSS gradient fill (`background-clip: text`). The gradient (`linear-gradient(135deg, #E81F1F 0%, #FFD600 50%, #F0F0F0 100%)`) is not the brand's specified chrome or spray-blast gradient — it's a custom warm-red-to-white fill. Minor brand deviation, non-blocking.

**Sub-score: 90** ✅ — Type hierarchy is well-executed.

---

## Summary

| Criterion | Sub-score | Severity |
|-----------|-----------|----------|
| Reading level / audience fit | 96 | ✅ |
| Body line-length 55–70ch | 95 | ✅ |
| No walls of text | 100 | ✅ |
| Scannability (eyebrows/bullets/cards) | 100 | ✅ |
| Typography hierarchy | 90 | ✅ |

**Dimension 3 Total: 95 / 100** ✅

---

## Issues for Fix

### ❌ Blocking (sub-score <80)
None.

### ⚠️ Non-blocking
1. **`css/theme.css:107`** — Hero headline gradient fill should use `--grad-chrome-shine` or `--grad-spray-blast` per kit spec, not a custom warm-red-to-white gradient.

---

## Round 2 Changes

| Fix | File | Verification |
|-----|------|---------------|
| `.pitch-list li` → `max-width: 65ch` | `css/theme.css:187` | ✅ Confirmed |
| `.feature-card p` → `max-width: 65ch` | `css/components.css:339` | ✅ Confirmed |
| `.faq-item dd` → `max-width: 65ch` | `css/theme.css:457` | ✅ Confirmed |

(End of file)
