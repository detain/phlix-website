# REGEN_PLAN — Día de Muertos (`dia-de-muertos`)

## Site overview

**Archetype:** `narrative-scroll`
**Brief:** An ofrenda (altar) for your stories — deep dark cemetery background with blazing marigold gold and papel picado purple, folk-art warmth.

---

## Experience field → rendered output

| Field | What it became |
|---|---|
| `site_architecture.nav` | Primary nav with 6 links: "The Altar" (home), "The Offerings" (features), "The Paths" (clients), "Light the Candle" (download), "The Distance" (hub), "Our Story" (about) — demoted plugins/docs to footer shelf |
| `homepage_narrative.sections` | 5 sections in order: `#hero` → `#why-watch` → `#the-offerings` → `#gather-together` → `#light-it` |
| `copy_overlay.hero` | Eyebrow "An ofrenda for your stories", headline "Remember. Celebrate. Live.", subheadline from content.json (voiced), CTAs "Light the First Candle" / "Walk the Marigold Path" |
| `copy_overlay.section_headings` | pitch → "Why gather here?", features → "The Offerings", cta_banner → "Your altar awaits — press play." |
| `feature_casting.hero` | syncplay + library as the two principal candles |
| `feature_casting.support` | transcode, auth, livetv as middle-shelf petals |
| `feature_casting.footnote` | dlna, plugins, hub as bottom-shelf footnotes |
| `faq_experience` | 6 FAQ items with Catrina warmth voice; question_order applied |
| `hero_experience` | "diorama-parallax" — static fallback with full copy always shipped; JS parallax layer as enhancement |
| `navigation_model` | "topbar" — dark topbar, Cinzel wordmark, marigold-dot separators, active gold underline |
| `scroll_experience` | "chaptered" — candle-bloom reveal per section, reduced to opacity fade under `prefers-reduced-motion` |
| `easter_eggs` | click:7 → Catrina dances; typed-word:marigold → petal shower; time-of-day:20-23 → "ofrenda glows brighter" note |
| `conversion_funnel` | 3-rung ladder: "Light the First Candle" → "Choose Your Screen" → "Walk the Marigold Path" |
| `proof_strategy` | spec-numbers as altar placard, github link (live stargazers), verbatim pitch_bullets[0] as framed card |
| `visitor_paths` | "What brings you to the ofrenda tonight?" fork with 3 paths |
| `intensity_toggle` | "Soften the Flame" toggle in footer, affects animation + glows |
| `mascot.behavior` | Catrina in bottom-right, tips at specific section anchors, easter interactions on click:5 and hover-hold:3s, dismiss persists via localStorage |
| `error_page_experience` | Catrina in empty cemetery with torn papel picado, "This path has faded — the altar is waiting." |
| `seasonal_activation` | live-js date gate; Oct 31–Nov 2 = Día de Muertos Peak (secondary → FF3355, tertiary → CC00BB) |

---

## Typography decisions

| Role | Face | Weight | Notes |
|---|---|---|---|
| Headline | Playfair Display | 700, 900 | Dramatic serif; used for h1, section titles |
| Display | Cinzel Decorative | 400, 700 | Monumental ceremonial type; wordmark, stats |
| Body | Lora | 400, 500 | Warm readable serif; body text, feature bodies |
| UI | IBM Plex Sans | 400, 500, 600 | Buttons, labels, nav, chips |
| Mono | IBM Plex Mono | 400, 600 | Code blocks, install command |

**Emphasis (`<strong>`):** Lora 500 + color `#FFB800` (primary gold) — cleared 11.57:1 on bg. No 700 (undeclared by kit for Lora family).

---

## Color decisions (measured, not assumed)

Per §19.1: every value below is from the measured table in the brief.

| Token | Hex | Ratio on bg | Use |
|---|---|---|---|
| `--color-primary` | #FFB800 | 11.57:1 | CTAs, active nav, gold glow |
| `--color-secondary` | #CC00BB | 4.10:1 → **#D21FC3** | Links, purple accents (AA-safe) |
| `--color-tertiary` | #FF3355 | 5.60:1 | Badges, pink accents |
| `--color-bg` | #0C0512 | — | Page background |
| `--color-surface` | #130820 | — | Cards, panels |
| `--color-surface-alt` | #1A1030 | — | Alternate rows |
| `--color-text` | #FFF0E8 | 18.05:1 | Body, headlines |
| `--color-neutral` | #5A4070 | — | Muted UI, dividers |
| `--color-border` | #2D1845 | — | Card borders |
| `--color-focus` | #FFB800 | 11.57:1 | Focus ring |

Contrast-safe overrides: secondary on surface → #D21FC3; secondary on surface-alt → #D736C9; secondary on primary-bg (buttons) → #97008A.

---

## Font file declarations (from brief)

Only vendored what the kit declares + what exists:

- `playfair-display-700-latin.woff2`, `playfair-display-900-latin.woff2`
- `cinzel-decorative-400-latin.woff2`, `cinzel-decorative-700-latin.woff2` (900 NOT declared)
- `lora-400-latin.woff2`, `lora-500-latin.woff2` (600/700 NOT declared)
- `ibm-plex-sans-400-latin.woff2`, `ibm-plex-sans-500-latin.woff2`, `ibm-plex-sans-600-latin.woff2` (700 NOT declared)
- `ibm-plex-mono-400-latin.woff2`, `ibm-plex-mono-600-latin.woff2` (700 NOT declared)
- `cinzel-decorative-700-latin.woff2` for number role (400 NOT declared)

---

## Complexity budget

- density: `minimal`
- reading_level: `plain-language`
- jargon_policy: `translate` — precise terms surfaced in `<details>` blocks
- home_sections_max: 5 ✓
- words_per_section_max: 100 (authored prose only; facts exempt)

---

## Known ambiguities resolved

| Conflict | Resolution |
|---|---|
| `fonts.ui.usage` vs `navigation_model.spec` (wordmark in display vs UI face) | More specific field wins: wordmark in Cinzel Decorative (display), nav links in IBM Plex Sans (ui) |
| `copy_overlay.secondary_cta` label "Walk the Marigold Path" → docs href | Keep label, make honest: "Walk the Marigold Path (the docs)" — WCAG 2.5.3 |
| `complexity_profile.page_budget` vs facts | Facts (install command, pitch bullets, FAQ) exempt from word cap |
| `intensity_toggle` placement | Footer utility row, beside the a11y note, per kit spec |

---

## Install command source

**Copy verbatim from `shared/content.json → install.primary`:**

```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

`install.from_source` is labelled "not an install" per brief.

---

## Verification

- `selfcheck.mjs` — 14 static checks
- `render-check.mjs` — browser at 320px + 1280px + 200% zoom

Both must PASS before reporting.
