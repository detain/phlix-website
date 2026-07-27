# REGEN_PLAN — Festive Lantern (`festive-lantern`)

## Site overview

**Archetype:** `narrative-scroll`
**Brief:** East Asian lantern festival — vermillion silk lanterns rising into a lacquer-black sky, imperial gold calligraphy, paper-cut warmth.

---

## Experience field → rendered output

| Field | What it becomes |
|---|---|
| `site_architecture.nav` | Primary nav: "Gathering Square" (home), "Festival Attractions" (features, primary), "Viewing Pavilions" (clients), "Light a Lantern" (download, primary), "Distant Glow" (hub), "Festival Story" (about, muted) — demoted plugins/docs to footer |
| `homepage_narrative.sections` | 5 sections in order: `#lantern-sky` → `#attraction-stage` → `#gathering-warmth` → `#trust-lanterns` → `#light-your-lantern` |
| `copy_overlay.hero` | Eyebrow "A thousand lanterns rise", headline "Every Night, a Celebration.", CTAs "Light a Lantern" / "Distant Glow (the docs)" |
| `feature_casting.hero` | library + syncplay as the two principal lanterns |
| `feature_casting.support` | transcode, auth, livetv as mid-ground lanterns |
| `feature_casting.footnote` | dlna, plugins, hub as distant lanterns |
| `faq_experience` | 6 FAQ items with warm festival voice; question_order applied |
| `hero_experience` | "lantern-rise" — static fallback always shipped; JS enhances with rising lantern animation |
| `navigation_model` | "topbar" — lacquer-black topbar, Noto Serif SC wordmark, ember-gold active dot, ghost hamburger on mobile |
| `scroll_experience` | "chaptered" — each section blooms like a lantern lighting; reduced to opacity fade under prefers-reduced-motion |
| `easter_eggs` | logo-clicks:5 → Lumen flares with golden fireworks; typed-word:lantern → floating lantern particles |
| `conversion_funnel` | 3-rung ladder: "Light the Lantern" → "Choose Your Pavilion" → "Glow with SyncPlay" |
| `proof_strategy` | spec-numbers as festival lanterns, github link, verbatim pitch_bullets[0] as framed card |
| `intensity_toggle` | "Soften the Glow" toggle in footer; affects animation + glow intensity |
| `mascot.behavior` | Lumen (anthropomorphic silk lantern) in bottom-right; tips at specific anchors; easter on click:5 and hover-hold:2s; dismiss via localStorage |
| `error_page_experience` | Lumen in a quiet night sky with a single dim lantern; "This path has faded — the lanterns are waiting." |
| `seasonal_activation` | live-js date gate; Lunar New Year (01-20–02-10) = maximum lantern density + vermillion/gold |

---

## Typography decisions

| Role | Face | Weight | Notes |
|---|---|---|---|
| Headline | Noto Serif SC | 700, 900 | Dramatic serif for h1, section titles |
| Display | Cinzel Decorative | 700, 900 | Monumental ceremonial type; stats, wordmark |
| Body | Noto Serif | 400, 500 | Warm editorial serif; body text, feature bodies |
| UI | Inter | 400, 500, 600 | Buttons, labels, nav, chips |
| Mono | JetBrains Mono | 400, 600 | Code blocks, install command |
| Number | Cinzel Decorative | 700 | Stats, episode counts |

**`<strong>` emphasis:** Noto Serif 500 + color `#d4a017` (imperial gold). Only 400/500 declared for Noto Serif body family. 500 + gold color = second channel per §19.17.

---

## Color decisions (measured, from brief)

| Token | Hex | Ratio on bg | Ratio on surface | Use |
|---|---|---|---|---|
| `--color-primary` | #c0392b | 3.62:1 ❌surface | 3.33:1 ❌surface | CTAs, active nav, lantern glow — AA-fail on dark surfaces → use `#cc5f53` on surface, `#c95549` on surface-alt |
| `--color-secondary` | #d4a017 | 8.28:1 ✅ | 7.61:1 ✅ | Primary CTA, gold accents |
| `--color-tertiary` | #2e8b57 | 5.93:1 ✅ | — | Badges, nature accents |
| `--color-bg` | #0f0a08 | — | — | Page background (lacquer black) |
| `--color-surface` | #1a1228 | — | — | Cards, panels (midnight indigo) |
| `--color-surface-alt` | #261631 | — | — | Alternate rows (deep plum) |
| `--color-text` | #f5efe0 | 17.15:1 ✅ | 15.77:1 ✅ | Body, headlines (pearl white) |
| `--color-border` | #8b6914 | — | — | Card borders (ember gold) |
| `--color-focus` | #d4a017 | 8.28:1 ✅ | — | Focus ring |

---

## Font file declarations (from brief)

Only vendored what the kit declares + what exists in pool:

- `noto-serif-sc-700-latin.woff2`, `noto-serif-sc-900-latin.woff2`
- `cinzel-decorative-700-latin.woff2`, `cinzel-decorative-900-latin.woff2` (400 NOT declared for display; 400 only used for number role where 700 is declared)
- `noto-serif-400-latin.woff2`, `noto-serif-500-latin.woff2` (700 NOT declared for body)
- `inter-400-latin.woff2`, `inter-500-latin.woff2`, `inter-600-latin.woff2` (300/700/800/900 NOT declared)
- `jetbrains-mono-400-latin.woff2`, `jetbrains-mono-600-latin.woff2` (300/500/700 NOT declared)
- `cinzel-decorative-700-latin.woff2` for number role (400 NOT declared)

---

## Complexity budget

- density: `minimal`
- reading_level: `plain-language`
- jargon_policy: `translate` — precise terms in `<details>` blocks
- home_sections_max: 5 ✓
- words_per_section_max: 100 (authored prose only; facts exempt)

---

## Known ambiguities resolved

| Conflict | Resolution |
|---|---|
| Kit body face caps at [400,500]; strong needs heavier weight | 500 (declared) + imperial gold color as second channel |
| Kit contrast prose vs measured table | Measured table wins per §19.14 — use `#cc5f53` for primary on surface |
| `copy_overlay.secondary_cta` label "Distant Glow" with docs href | Keep label, make honest: "Distant Glow (the docs)" — WCAG 2.5.3 |
| `complexity_profile.page_budget` vs facts | Facts (install command, pitch bullets, FAQ) exempt from word cap |
| Kit says 400 is NOT declared for display; font pool has it | Trust brief — do not vendor `cinzel-decorative-400-latin.woff2` for display role |
| Kit says 300 NOT declared for ui; font pool has it | Trust brief — do not vendor `inter-300-latin.woff2` |

---

## Install command source

**Copy verbatim from `shared/content.json → install.primary`:**

```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

`install.from_source` is labelled "not an install" per brief.

---

## Verification

- `selfcheck.mjs` — 17 static checks
- `render-check.mjs` — browser at 320px + 1280px + 200% zoom

Both must PASS before reporting.
