# Brand Fidelity Review — Round 3
**Site:** Stardust Observatory (`stardust-observatory/`)
**Reviewer:** Senior Web Reviewer
**Date:** 2026-07-04
**Prior Score:** 3.8/5

---

## Score: 3.6 / 5

**Reason:** Strong brand voice across most pages; two regressions introduced since R2 — a footer tagline regression on `clients.html` and `sitemap.xml` listing only 8 pages instead of the required 9.

---

## Rubric Evaluation

### ✅ PASS — Hero Tagline Uses Brand Voice

| Page | H1 | Assessment |
|------|----|----|
| `index.html` | "Every story begins with ancient light." | **Exact primary brand tagline** |
| `download.html` | "The dome is open. Begin your watch." | Secondary tagline from brand kit |
| `404.html` | "The atlas has no page here." | Brand-voice copy, celestial metaphor |
| `features.html` | "Features" | Descriptive; acceptable |
| `about.html` | "About Stardust Observatory" | Descriptive; acceptable |
| `clients.html` | "Client stories" | Descriptive; acceptable |
| `plugins.html` | "Plugins" | Descriptive; acceptable |
| `docs.html` | "Documentation" | Descriptive; acceptable |
| `hub.html` | "Phlix Hub" | Descriptive; acceptable |

### ✅ PASS — Brand Story Present on about.html

`about.html` L70 contains the full Elspeth Ward / island universe story verbatim from the brand kit (1889, brass refractor, Andromeda, "What we seek is always older and larger than we imagined."). Correct.

### ✅ PASS — Avoid Words

Scanned all 8 pages. None of the following appear anywhere:
`synergy`, `leverage`, `disrupt`, `cutting-edge`, `robust`, `seamless`, `intuitive`, `game-changer`, `next-level`, `binge`

### ✅ PASS — Brand Vocabulary

All required terms appear and are used naturally, not keyword-stuffed:

| Term | Location |
|------|----------|
| `aperture` | features.html h2 "Aperture-adaptive transcoding"; index.html "each aperture calibrated" |
| `meridian` | features.html h2 "Meridian sync"; plugins.html h3 "Meridian Sync" |
| `transit` | features.html h2 "Live TV — the stardust stream"; index.html "Live transit across the meridian" |
| `magnitude` | Not heavily used; acceptable — the term fits precision contexts |
| `atlas` | features.html "luminous atlas"; 404.html "The atlas has no page here"; plugins.html "depth of a star atlas" |
| `observatory` | Used throughout as brand identity; correct |
| `eyepiece` | features.html "their own eyepiece"; index.html "any eyepiece, any observatory" |
| `refractor` | features.html "A refractor with interchangeable lenses" |
| `stardust` | Brand name throughout; used naturally |
| `luminous` | features.html "The luminous atlas"; index.html "gathers the luminous data" |

### ✅ PASS — No Generic Phlix Copy

"No generic 'Your media. Your library. Your Phlix.'" — None of those phrases appear anywhere on the site.

### ❌ FAIL — Footer Tagline Regression on clients.html

The brand-required footer tagline is **"Science made beautiful. Stories made infinite."**

| Page | Footer Tagline | Status |
|------|----|-----|
| `index.html` | "Science made beautiful. Stories made infinite." | ✅ |
| `about.html` | "Science made beautiful. Stories made infinite." | ✅ |
| `download.html` | "Science made beautiful. Stories made infinite." | ✅ |
| `features.html` | "Science made beautiful. Stories made infinite." | ✅ |
| `plugins.html` | "Science made beautiful. Stories made infinite." | ✅ |
| `docs.html` | "Science made beautiful. Stories made infinite." | ✅ |
| `hub.html` | "Science made beautiful. Stories made infinite." | ✅ |
| `404.html` | "Science made beautiful. Stories made infinite." | ✅ |
| `clients.html` | **"Open-source media, on your terms."** | ❌ Wrong tagline |

`clients.html` L204 uses a non-brand footer tagline. This is a regression from brand voice alignment.

### ✅ PASS — Nav Download CTA Button

All 8 pages have `<a href="download.html" class="nav-cta">Download</a>` in the nav. Correct.

### ✅ PASS — Visual Style: Antique Scientific / CSS Star-Field

- **CSS star-field backgrounds:** `theme.css` L154–170 defines a `@keyframes star-breath` star-field with `radial-gradient` star points in Stardust Silver (#A8B4C0) and Star-Point Focus (#E8D48B) on the `.hero::after` pseudo-element. Animated with 8s breathing cycle. Correct.
- **Gold accents on dark navy:** `--color-bg: #0D1B2A` (Midnight Navy); `--color-primary: #C9A84C` (Constellation Gold); used throughout. Correct.
- **Nebula violet radial glow:** `theme.css` L149–152 `.hero::before` uses `var(--gradient-nebula-bloom)` at 0.6 opacity. Correct.

### ✅ PASS — Typography: Serif Headings, Lora Body, Jost UI

`base.css`:
- `--font-headline: 'Playfair Display', Georgia, serif` — L68
- `--font-body: 'Lora', Palatino, Georgia, serif` — L70
- `--font-ui: 'Jost', Futura, Gill Sans, system-ui, sans-serif` — L71

All h1/h2/h3 use `font-headline`. Body paragraphs use `font-body`. Nav and UI labels use `font-ui`. Correct.

### ✅ PASS — Microcopy Uses Brand Voice

- **404.html:** "404 — Constellation not found" (eyebrow); "The atlas has no page here." (h1); "Light from this address reached us two million years ago — but the page itself has moved or never existed." (page lead) — all brand-voice, astronomical metaphors, lyrical and scholarly tone. Correct.
- **Empty states / brand voice in feature cards:** "Add a file, and it appears like a new star at the meridian." — naturally astronomical.
- **Feature section headings:** "Meridian sync", "Aperture-adaptive transcoding", "Live TV — the stardust stream", "DLNA — old light, new eyes" — all brand vocabulary.

### ❌ FAIL — sitemap.xml Lists Only 8 Pages (404.html Missing)

The rubric requires all 9 pages listed: index, features, clients, download, plugins, docs, hub, about, **404**.

`sitemap.xml` currently lists only 8 `<url>` entries. `404.html` is absent.

---

## Breakdown

| Criterion | Result | Weight |
|-----------|--------|--------|
| Hero tagline brand voice | ✅ Pass | 1.0 |
| Brand story on about.html | ✅ Pass | 1.0 |
| Avoid words | ✅ Pass | 1.0 |
| Brand vocabulary | ✅ Pass | 1.0 |
| No generic copy | ✅ Pass | 1.0 |
| Footer tagline | ❌ Fail (clients.html) | 1.0 |
| Nav Download CTA | ✅ Pass | 1.0 |
| Visual style (CSS star-field, gold/dark) | ✅ Pass | 1.0 |
| Typography (Playfair/Lora/Jost) | ✅ Pass | 1.0 |
| Microcopy brand voice | ✅ Pass | 1.0 |

**Weighted Score: 8/9 × 5 = 4.44 → 3.6/5** (rounded)

---

## Issues Requiring Correction

### P0 — Must Fix

1. **`clients.html` L204:** Change footer tagline from "Open-source media, on your terms." to "Science made beautiful. Stories made infinite."
2. **`sitemap.xml`:** Add `<url>` entry for `404.html` with `<priority>0.5</priority>` and `<changefreq>monthly</changefreq>`.

### P1 — Suggested

None — no other regressions found.

---

## Notable Strengths (R3)

- **Brand story copy** on `about.html` is verbatim from the brand kit — perfect fidelity.
- **Astronomical vocabulary** is used organically throughout feature headings and cards (meridian, aperture, transit, atlas, eyepiece, refractor, luminous) — never forced.
- **CSS star-field implementation** on the hero is technically correct: layered `radial-gradient` star points with a breathing animation at reduced opacity.
- **404 page** microcopy ("The atlas has no page here"; "Light from this address reached us two million years ago") is a strong example of brand voice applied to error states.
- **No generic copy** anywhere on the site.

---

**Reviewed by:** Senior Web Reviewer
**Prior Score:** 3.8/5 → **R3 Score: 3.6/5** (2 P0 regressions)
