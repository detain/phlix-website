# Pop Art Explosion — REGEN_PLAN

## §1 Experience fields

| Field                   | Old site             | This build                                                                                         |
| ----------------------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| `site_architecture`     | generic template nav | 6 items: KAPOW!, The Panel Grid, Every Screen, BAM! Install, The Scene, Dotty Digs In              |
| `homepage_narrative`    | missing proof-burst  | 5 sections in order: starburst-intro, dotty-scene, the-grid, proof-burst, cta-pop                  |
| `page_blueprints`       | absent               | features→comic-panels, clients→spec-sheet, download→spec-sheet                                     |
| `copy_overlay`          | absent               | hero uses pop-art onomatopoeia treatment, starburst layouts                                        |
| `feature_casting`       | generic              | 6 features as Warhol grid                                                                          |
| `copy_treatments`       | absent               | bold outlines, Ben-Day dot fields, speech bubbles, halftone                                        |
| `faq_experience`        | absent               | accordion with pop-art speech-bubble styling                                                       |
| `hero_experience`       | generic              | full-bleed starburst, Bangers white-on-red, thought-bubble sub                                     |
| `navigation_model`      | default              | topbar with 3 emphasis levels, footer mirror-nav                                                   |
| `scroll_experience`     | absent               | fast snap, panel-wipe transitions                                                                  |
| `easter_eggs`           | absent               | logo-clicks:5, typed-word:dots, typed-word:kapow                                                   |
| `conversion_funnel`     | generic              | 3-rung ladder: Get Phlix → See the Install → View Source                                           |
| `proof_strategy`        | generic              | links to live GitHub pages only (no fabricated numbers)                                            |
| `visitor_paths`         | absent               | hero → features → download path                                                                    |
| `experience_archetype`  | absent               | **immersive** — full-bleed pop art experience                                                      |
| `complexity_profile`    | absent               | density:standard, reading:general, jargon:translate                                                |
| `intensity_toggle`      | absent               | CSS-only calm mode via prefers-reduced-motion                                                      |
| `seasonal_activation`   | documented           | live-js date-gate; Summer (06-21..09-21) swaps yellow→orange; Winter (12-01..01-06) swaps red→blue |
| `error_page_experience` | absent               | 404.html: Dotty apologizes in speech bubble, all recovery links                                    |
| `persona_vignettes`     | absent               | Dotty introduces library + syncplay in 60-char comic panels                                        |
| `mascot.behavior`       | absent               | Dotty, bottom-right fixed on desktop, in-flow on mobile                                            |

**Absent → default:** none declared.

## §2 Nav diff

Old: _no nav labels found_ (❌ missing all 6)

New (per kit):

| id       | label          | emphasis |
| -------- | -------------- | -------- |
| home     | KAPOW!         | default  |
| features | The Panel Grid | primary  |
| clients  | Every Screen   | default  |
| download | BAM! Install   | primary  |
| hub      | The Scene      | default  |
| about    | Dotty Digs In  | muted    |

**Demoted to footer:** plugins, docs (still linked, not in primary nav)

## §3 Home section order

Old: starburst-intro, dotty-scene, the-grid, cta-pop (❌ missing proof-burst)

New (per `homepage_narrative.sections[]`):

1. `starburst-intro` (hero, weight:hero)
2. `dotty-scene` (persona_vignettes, weight:major)
3. `the-grid` (feature_casting, weight:major)
4. `proof-burst` (proof_strategy, weight:minor)
5. `cta-pop` (conversion_funnel, weight:major)

## §4 Carry-forward

- CSS custom properties from predecessor (already a well-structured palette)
- `--color-bg: #FFFFFF`, `--color-primary: #FF1A1A`, `--color-secondary: #FFE600`
- Logo rectangle with starburst treatment
- The Ben-Day dot SVG pattern already in CSS
- Hard-offset box-shadow system (4px/4px solid black)
- Footer three-column layout from `content.json`
- `@font-face` set using correct local filenames

## §5 Ambiguities resolved

| Conflict                                                                                | Resolution                                                                                                                                                                           | Rule   |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| Kit accessibility prose claims WCAG AA for yellow on white                              | **Measured #FFE600 on #FFFFFF = 1.27:1 — fail.** Use safe substitute #807300 for any yellow small-text usage; pure #FFE600 only on dark backgrounds or large/UI text.                | §19.1  |
| Kit says "4 native clients"                                                             | `content.json` has 4 native + DLNA. Print "Four native clients, plus any DLNA device."                                                                                               | §19.6  |
| `proof_strategy` asks for star count                                                    | Static page cannot verify. Link to `/stargazers` with label "Watch the stars grow".                                                                                                  | §19.7  |
| `seasonal_variants[0].overrides.--color-secondary: #FF6B00` overwrites yellow in summer | Orange on white = 2.86:1 (fail small). Kit's own `color_rules` already restrict orange to warnings/accent bands — acceptable. For UI text on orange surfaces, use #0A0A0A (15.62:1). | §19.19 |
| `fonts.ui` declares Barlow 600,700; `navigation_model` topbar also uses UI face         | More specific field (navigation_model spec) wins for nav labels: wordmark in display (Bangers), nav items in UI (Barlow 700).                                                        | §19.6  |
| `conversion_funnel.cta_ladder` shows `[object Object]`                                  | Three real CTAs: "Get Phlix →" (download), "BAM! Install →" (download#server), "See the Source →" (GitHub).                                                                          | §19.6  |
| `proof_strategy` asks for "a quote from the docs"                                       | No verifiable quote exists. Use `pitch_bullets[0]` verbatim, attributed to the project.                                                                                              | §19.14 |
| `mascot.behavior.placement` says "never on docs or about"                               | Dotty omitted from docs.html and about.html.                                                                                                                                         | §19.9  |

## §6 Accessibility summary

| Combination             | Ratio            | Small text | Large/UI |
| ----------------------- | ---------------- | ---------- | -------- |
| #FF1A1A on #FFFFFF      | 3.88:1           | ❌         | ✅       |
| #FF1A1A safe on #FFFFFF | #E81818 (4.55:1) | ✅         | ✅       |
| #FFE600 on #FFFFFF      | 1.27:1           | ❌         | ❌       |
| #FFE600 on #FFFBE0      | 18.98:1          | ✅         | ✅       |
| #FFE600 on #FF1A1A      | 3.06:1           | ❌         | ✅       |
| #FF6B00 on #FFFFFF      | 2.86:1           | ❌         | ❌       |
| #FF6B00 safe on #FFFFFF | #C75300 (4.53:1) | ✅         | ✅       |
| #0028DC on #FFFFFF      | 8.99:1           | ✅         | ✅       |
| #0A0A0A on #FFFFFF      | 19.80:1          | ✅         | ✅       |

**Strong emphasis:** `font-weight: 600` on Barlow Condensed — kit declares 400,600; 600 is a +200 step and available in pool.

## §7 Fonts (from pool)

| Role     | Family           | File                               | Weight |
| -------- | ---------------- | ---------------------------------- | ------ |
| headline | Bangers          | `bangers-400-latin.woff2`          | 400    |
| display  | Anton            | `anton-400-latin.woff2`            | 400    |
| body     | Barlow Condensed | `barlow-condensed-400-latin.woff2` | 400    |
| body     | Barlow Condensed | `barlow-condensed-600-latin.woff2` | 600    |
| ui       | Barlow           | `barlow-600-latin.woff2`           | 600    |
| ui       | Barlow           | `barlow-700-latin.woff2`           | 700    |
| mono     | Share Tech Mono  | `share-tech-mono-400-latin.woff2`  | 400    |
| number   | Anton            | `anton-400-latin.woff2`            | 400    |

Note: barlow-condensed-700, barlow-condensed-800, barlow-condensed-900, barlow-400, barlow-500 all exist in pool but **not declared** by this kit — not used.

## §8 Install command (from `content.json.install.primary`)

```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

`line_count: 1`, `what_it_does`: full server install with DB, systemd service, HAProxy, Let's Encrypt.

## §9 Escalations

None. All conflicts resolved via §19.6 table citations above.

## §10 Avoid words

`synergy`, `leverage`, `robust`, `ecosystem`, `seamless`, `innovative`, `cutting-edge`, `game-changer`, `holistic`, `empower`, `utilize`
