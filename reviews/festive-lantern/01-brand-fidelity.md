# Brand Fidelity & Spirit Review — Festive Lantern

**Site:** `/home/sites/phlix/phlix-website/sites/festive-lantern/`
**Review date:** 2026-07-04
**Kit:** festive-lantern.js (v1.0)

---

## Dimension 1 — Brand Fidelity & Spirit: Score 62 / 100

---

### 1.1 Colors — CSS tokens ✅

| Check | Result | File |
|---|---|---|
| All CSS colors trace to kit `colors{}` roles | ✅ PASS | base.css:16–30 |
| No raw off-palette hex in component CSS | ⚠️ WARNING | components.css:237 (see below) |

**Notes:**
- `base.css` defines all color tokens correctly from the kit.
- `components.css:237` uses hardcoded `#c0392b` instead of `var(--color-error)` (`#A93226` — "Dragon Fire") for `.btn-danger:hover`. The kit says danger button bg is `#A93226`, but the CSS uses `#c0392b` (primary vermillion) in the hover state. This is a deviation.
- `components.css:201` uses hardcoded `#e6b41c` for `.btn-primary:hover` — not a named kit token. Minor.
- No other raw hex values found outside kit tokens in component CSS.

---

### 1.2 Colors — Primary CTA ✅

| Check | Result | File |
|---|---|---|
| Primary CTA = imperial gold `#D4A017` | ✅ PASS | components.css:195 (`--color-secondary`) |

The `.btn-primary` uses `var(--color-secondary)` (`#D4A017`). No plain red CTA found.

---

### 1.3 Fonts ✅

| Check | Result | File |
|---|---|---|
| headline = Noto Serif SC | ✅ PASS | base.css:57 |
| display = Cinzel Decorative | ✅ PASS | base.css:58 |
| body = Noto Serif | ✅ PASS | base.css:59 |
| ui = Inter | ✅ PASS | base.css:60 |
| mono = JetBrains Mono | ✅ PASS | base.css:61 |
| All weights from kit roles | ✅ PASS | base.css:57–61 |

---

### 1.4 Corner Radii ✅

| Check | Result | File |
|---|---|---|
| small: 4px | ✅ PASS | base.css:50 |
| medium: 10px | ✅ PASS | base.css:51 |
| large: 18px | ✅ PASS | base.css:52 |
| xl: 28px | ✅ PASS | base.css:53 |
| pill: 999px | ✅ PASS | base.css:54 |

---

### 1.5 brand_opposites ✅

| Avoided term | Found? |
|---|---|
| cold / sterile / clinical | ❌ NOT FOUND |
| minimalist-grey / desaturated | ❌ NOT FOUND |
| solitary / isolating | ❌ NOT FOUND |
| corporate / formal | ❌ NOT FOUND |
| dark-moody / oppressive | ❌ NOT FOUND |
| pastel / washed-out | ❌ NOT FOUND |

Background is lacquer black `#0F0A08` with warm vermillion/gold glows. The site is warm, not cold.

---

### 1.6 avoid_words ❌

| Word | Found? | Location |
|---|---|---|
| leverage | ❌ | — |
| synergy | ❌ | — |
| utilize | ❌ | — |
| robust | ❌ | — |
| cutting-edge | ❌ | — |
| disrupt | ❌ | — |
| **content** | ❌ | — |
| **consume** | ❌ | — |
| binge | ❌ | — |
| grind | ❌ | — |

The word "content" is not used. The phrase "your library" is used throughout instead of "your content library" — which is brand-appropriate.

---

### 1.7 design_principles ⚠️

| Principle | Status |
|---|---|
| Every screen feels like illuminated festival space | ⚠️ PARTIAL — lacquer black used; hero uses lanternRise dots, but no actual lantern/scroll/illustrated motifs visible on-page |
| Gold reserved for most precious moments (CTAs + hero) | ✅ PASS — hero uses gold; CTAs use gold |
| Lacquer black is a canvas for light | ✅ PASS |
| Paper-cut silhouettes and lantern motifs recur | ❌ FAIL — no paper-cut motifs, lantern illustrations, or festival decorations on any page |
| Warmth over formality — celebration, not ceremony | ✅ PASS |
| Communal feeling — design for shared screens | ⚠️ PARTIAL — tagline "Every Night, a Celebration" is communal, but no co-viewing imagery/motifs |
| Typography: confidence of calligraphy — bold, intentional | ✅ PASS |
| At most three accent colors per view | ✅ PASS |

---

### 1.8 brand_opposites / design_principles — Layout Feel ⚠️

| Check | Result |
|---|---|
| Feels like festival night — lacquer black, vermillion, imperial gold | ⚠️ PARTIAL |
| NOT a generic template | ✅ PASS — the color palette and warm glow shadows give it personality beyond generic dark-theme templates |

The lanternRise CSS animation (theme.css:108–113) creates floating dots. This is a gesture toward the brand's header motif, but the effect is very subtle and could be stronger with actual lantern shapes.

---

### 1.9 "content" / "consume" language ✅

| Word | Found? | Context |
|---|---|---|
| content | ❌ NOT FOUND — "library" used throughout | — |
| consume | ❌ NOT FOUND | — |

---

### Summary of Brand Defects

| Severity | Issue | File |
|---|---|---|
| ⚠️ Medium | `.btn-danger:hover` uses `#c0392b` instead of `var(--color-error)` (`#A93226`) | components.css:237 |
| ⚠️ Medium | `.btn-primary:hover` uses hardcoded `#e6b41c` | components.css:201 |
| 🔴 Low (spirit) | No paper-cut silhouette decorations, lantern motifs, or festival illustrations anywhere on pages | all HTML |
| 🔴 Low (spirit) | No page-level illustrated festival hero sections (kit requires "hero sections always carry a large lantern-festival illustration") | all HTML except index |
| ⚠️ Medium | features.html, clients.html share the same meta description as index.html — generic, not page-specific | features.html:7, clients.html:7 |
