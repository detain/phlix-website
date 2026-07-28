# REGEN_PLAN — Pastel Dreamscape (`pastel-dreamscape`)

## 1. Experience fields

| Field | Old site | This build |
|---|---|---|
| `site_architecture` | Missing nav labels | Implemented — exact labels: Dreamscape, Wonders, Floating On, Float In, Cloud Connect, Our Dream |
| `homepage_narrative` | Missing section ids | Implemented — sky-opens, the-wonders, why-drift, trust-glow, float-in (5 sections) |
| `page_blueprints` | Generic template | Gallery-plaques (features), family-of-devices (clients), bubble-unfold (download), dream-scroll (about) |
| `copy_overlay` | Generic | Kit's hero copy, section headings, footer tagline |
| `feature_casting` | Generic | 2 hero features (library, syncplay), 4 support, 2 footnote |
| `hero_experience` | Flat hero | Diorama-parallax with fallback; Dreamy floating; cotton-candy sky gradient |
| `navigation_model` | Generic topbar | Dreamy topbar: Phlix logo + iridescent sparkle nav links; hamburger on mobile |
| `scroll_experience` | Basic | Chaptered petal-fall + shimmer; reduced-motion = continuous scroll |
| `mascot.behavior` | Not built | Dreamy cloud fairy, bottom-right (in flow at <768px), tips per section, easter eggs (logo-clicks:5, typed-word:sparkle) |
| `easter_eggs` | Not built | logo-clicks:5 → Dreamy spins + bubbles; typed-word:sparkle → sparkle bloom |
| `intensity_toggle` | Not built | Sparkle mode toggle in footer utility row |
| `seasonal_activation` | Not built | Live-JS seasonal motif; 4 variants (Winter/Spring/Summer/Autumn) |
| `error_page_experience` | Not built | Dreamy on cloud with torn scroll; gentle message |
| `faq_experience` | Generic | Docent-tour: Dreamy as gentle guide |
| `conversion_funnel` | Generic | Showcase-first; cta ladder: Peek Into Dream → Floating Friends → Float In |
| `proof_strategy` | Generic | Cloud collection: spec signals + GitHub link + doc quote (no fabricated numbers) |
| `visitor_paths` | Not built | "What kind of dreamer are you?" — family/collector/tinkerer |
| `persona_vignettes` | Not built | 3 vignettes on about page |
| `experience_archetype` | Generic | immersive — full-bleed dreamy sections, floaty cards, kawaii mascot |
| `complexity_profile` | Generic | minimal density, plain-language, words_per_section_max=80 |
| `copy_treatments` | Generic | banner-pennants (pitch), docent-tour (faq), family-of-devices (clients), constellation (ecosystem) |

**Absent → default:** None (all 20 fields declared).

---

## 2. Nav diff

| Old label | New label | Emphasis | Action |
|---|---|---|---|
| Home | Dreamscape | default | Rename |
| Features | Wonders | primary | Rename |
| Clients | Floating On | default | Rename |
| Download | Float In | primary | Rename |
| Hub | Cloud Connect | default | Rename |
| About | Our Dream | muted | Rename |
| Plugins | — | demoted | Footer only |
| Docs | — | demoted | Footer only |

---

## 3. Home section order

| # | Old | New (homepage_narrative) |
|---|---|---|
| 1 | hero | sky-opens (hero, copy_overlay.hero) |
| 2 | features | the-wonders (feature_casting, major) |
| 3 | story | why-drift (story, major) |
| 4 | trust | trust-glow (proof_strategy, minor) |
| 5 | cta | float-in (conversion_funnel, major) |

---

## 4. Carry-forward (existing assets to keep)

- `img/favicon.svg`, `img/logo.svg` — existing SVG assets (not regenerated)
- `img/og.svg` → `og.png` via `gen-og.mjs`
- `img/icon-*.png` — existing PNG icons

---

## 5. Ambiguities resolved (§19.6)

| Conflict | Resolution | Rule |
|---|---|---|
| Kit contrast prose claims 6.2:1 | Use measured values; primary/secondary FAIL small text | §19.1 — measure wins |
| `strong { font-weight: 500 }` trap | Use `font-weight: 600` (Nunito has 400/500/600; 600 is the correct step) | §19.17 |
| `copy_overlay` CTA renames vs href | Keep kit label; make href honest (no docs href on "Float In") | §19.7 |
| `proof_strategy` asks for live star count | Link to `/stargazers` — do not print a fabricated number | §19.7 |
| Mascot at 320px | Below 768px: in-flow above footer; never auto-push tip on phone | §19.11 |

---

## 6. Escalations

- None — all kit fields resolved within scope.

---

## 7. CSS rules applied from new_site.md §19.12

- Grid tracks: `minmax(0, 1fr)` not bare `1fr`
- Text wrapping: `overflow-wrap: anywhere` on `p, li, dt, dd, a, span, code, kbd, samp, pre`
- Headings: `hyphens: auto; overflow-wrap: break-word`
- No `overflow: hidden` on containers whose text must reflow
- `@copyright` inside `/* … */` on every css/js file (§19.24)

---

## 8. Font weights used

| Role | Family | Weights used |
|---|---|---|
| headline | Baloo 2 | 700, 800 |
| display | Comfortaa | 700 |
| body | Nunito | 400, 500, 600 |
| ui | Quicksand | 500, 600, 700 |
| mono | Fira Code | 400, 500 |
| number | Baloo 2 | 700 |

Note: `nunito-700-latin.woff2` NOT used (700 not declared for Nunito body role).

---

## 9. Contrast-safe substitutes (used verbatim from kit-brief)

Small text on `--color-bg` (#FEF9F5) using primary (#F9A8D4): `#95657f`  
Small text on `--color-bg` using secondary (#C4B5FD): `#766d98`  
Small text on `--color-bg` using link (#A78BFA): `#7a65b7`  
(Soft ink #4B3F6B passes at 9.04:1 — no substitution needed)

---

## 10. Install command (from content.json)

```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```
