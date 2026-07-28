# REGEN_PLAN — Neon Noir (`neon-noir`)

## 1. Experience Fields

| Field                   | Old site    | New site                                                                                        |
| ----------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| `site_architecture`     | generic nav | 6-label kit nav + footer mirror + demoted plugins/docs                                          |
| `homepage_narrative`    | 5 sections  | exact kit sections: opener, case-brief, lead-cases, trust-play, closing-act                     |
| `page_blueprints`       | absent      | evidence-board (features), network-map (clients), interrogation (download), case-closed (about) |
| `copy_overlay`          | absent      | hero/headings/CTA from kit                                                                      |
| `feature_casting`       | absent      | hero: syncplay + library; support: transcode/auth/hub/livetv; footnote: dlna/plugins            |
| `copy_treatments`       | absent      | noir-scrolls, interrogation-transcript, network-nodes, toolkit-dossier                          |
| `faq_experience`        | absent      | interrogation-transcript frame, Lux persona, question_order from kit                            |
| `hero_experience`       | absent      | playable-vignette with fallback static hero                                                     |
| `navigation_model`      | absent      | topbar with neon-cyan links, active glow, hover flicker                                         |
| `scroll_experience`     | absent      | cinematic venetian-blind wipe between sections                                                  |
| `easter_eggs`           | absent      | logo-clicks:5 + typed-word:shadow                                                               |
| `conversion_funnel`     | absent      | 3-rung ladder, instant-command style                                                            |
| `proof_strategy`        | absent      | spec-numbers + github + docs-quote, trust band layout                                           |
| `experience_archetype`  | absent      | narrative-scroll                                                                                |
| `complexity_profile`    | absent      | standard density, general reading, translate jargon                                             |
| `intensity_toggle`      | absent      | "Case closed" toggle in footer utility row                                                      |
| `seasonal_activation`   | absent      | live-js date-gate with banner                                                                   |
| `error_page_experience` | absent      | burnt-out alley, Lux, dead neon sign, FILE NOT FOUND                                            |
| `persona_vignettes`     | absent      | 3 vignettes on home/feature/player surfaces                                                     |
| `mascot.behavior`       | absent      | Lux bottom-right, idle animation, tips, easter interactions, dismissible                        |
| `visitor_paths`         | null        | absent → default (no-op)                                                                        |

**Absence → default:** `visitor_paths` only.

## 2. Nav Diff

| #   | Old | New            | Change |
| --- | --- | -------------- | ------ |
| 1   | —   | The Case       | NEW    |
| 2   | —   | Evidence Files | NEW    |
| 3   | —   | The Network    | NEW    |
| 4   | —   | Get Access     | NEW    |
| 5   | —   | Reach Anywhere | NEW    |
| 6   | —   | Closed Cases   | NEW    |

All 6 labels were absent — new kit labels replace entirely.

Demotions: `plugins`, `docs` → footer only.

## 3. Home Section Order

| #   | Old         | New         |
| --- | ----------- | ----------- |
| 1   | opener      | opener      |
| 2   | case-brief  | case-brief  |
| 3   | lead-cases  | lead-cases  |
| 4   | trust-play  | trust-play  |
| 5   | closing-act | closing-act |

✅ Already matched.

## 4. Carry-forward

- CSS variable palette tokens already in theme.css
- Existing logo SVG (will regenerate proper neon-noir version)
- Footer structure (columns from content.json)
- CSS `@font-face` declarations for the 6 font families

## 5. Ambiguities

| #   | Conflict                                                                                                                                                                                                                                                                              | Resolution                                                                          |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1   | `fonts.ui.usage` assigns nav to UI face; `navigation_model.spec` says "Playfair Display wordmark". Kit's own nav spec says "Playfair Display in ghost-white" wordmark at left. More specific `navigation_model.spec` wins → wordmark in Playfair Display; nav links in IBM Plex Sans. | navigation_model spec wins for nav face                                             |
| 2   | `page_blueprints.evidence-board` says 8 features on wall; `feature_casting.hero` only lists 2.                                                                                                                                                                                        | Structured field is authority — 8 features total, 2 hero-pinned, 6 support/footnote |
| 3   | `complexity_profile.page_budget.words_per_section_max=120` vs. 7 pitch bullets verbatim from content.json (each ~15 words).                                                                                                                                                           | Cap governs authored prose; content.json facts exempt per §16                       |
| 4   | `mascot.placement` says "never on Clients or Hub". Kit's `homepage_narrative.sections[2].treatment` says lead-cases is "evidence cards pinned to a noir case board". Mascot sits outside this.                                                                                        | Mascot excluded from Clients and Hub pages only; all other pages get Lux            |
| 5   | `easter_eggs[0]` `logo-clicks:5` and `mascot.behavior.easter_interactions[0]` `click:3` share trigger type but different counts.                                                                                                                                                      | Independent systems with independent counters — both must work                      |

## 6. Escalations

None — all fonts in pool, all facts from content.json.

## 7. Implementation Notes

- `<strong>` emphasis: IBM Plex Serif 500 weight + ink color `#00E5FF` (12.72:1 on bg, clears 4.5:1 everywhere)
- Fonts self-hosted: `../../assets/fonts/playfair-display-700-latin.woff2` etc.
- Contrast safe substitutions precomputed in brief: used throughout
- `minmax(0, 1fr)` on grid tracks; `overflow-wrap: anywhere`; no `overflow: hidden` on reflowing containers
- `@font-face` must reference pool files only — no CDN links
- All CSS/JS must carry `/* @copyright 2026 Joe Huss <detain@interserver.net> */` top comment
- og:image: absolute URL `https://detain.github.io/phlix-website/neon-noir/img/og.png`
