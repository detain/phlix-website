# REGEN_PLAN.md — Soundwave Studio (`soundwave-studio`)

## 1. Experience fields

| Field | Old site | New site |
|-------|----------|----------|
| `site_architecture` | Generic 8-link nav | Custom 6-link nav: Session, Signal Map, Monitors, Roll Tape, Relay, Credits; plugins/docs demoted to footer |
| `homepage_narrative` | Generic sections | 5 custom sections: console-rise, the-takes, craft, real-sessions, press-play |
| `page_blueprints` | Generic grid | channel-strip-grid (features), monitor-wall (clients), mixing-console (download), session-notes (about) |
| `copy_overlay` | Content.json verbatim | Kit overlay: "Every Session. Perfectly Captured.", "Roll Tape" CTA, "Signal Map" features |
| `feature_casting` | All 8 features | Hero: SyncPlay + Library; support: transcode/auth/hub; footnote: livetv/dlna/plugins |
| `copy_treatments` | Plain lists | spec-list (pitch), man-page (faq), monitor-gallery (clients), patch-bay (ecosystem) |
| `faq_experience` | Plain dl | man-page frame, Waveform persona, custom question order |
| `hero_experience` | Static | diorama-parallax with VU needle + Waveform mascot; fallback static |
| `navigation_model` | Generic topbar | Dark console topbar with activity pulse indicator; fallback hamburger |
| `scroll_experience` | None | Chaptered with waveform wipe, tape-transport flicker |
| `easter_eggs` | None | 3: logo-clicks:3, typed-word:tape, typed-word:signal |
| `conversion_funnel` | Generic | guided-steps: Roll Tape → Pick Your Monitor → Press Record |
| `proof_strategy` | None | spec-numbers console readout + github link + framed quote |
| `experience_archetype` | Not declared | `immersive` |
| `complexity_profile` | Not declared | dense, technical, 5 sections max, 110 words/section max |
| `intensity_toggle` | None | "Quiet Session" toggle in footer |
| `seasonal_activation` | None | live-js with 3 seasonal variants |
| `error_page_experience` | None | Flat-line waveform + "No signal on this channel (404)" |
| `persona_vignettes` | None | 3: Late-Night Session, Traveling Mix, Broadcast Shift |
| `mascot.behavior` | None | Waveform companion: bottom-right, idle oscilloscope, tips, easter eggs, dismiss |
| `visitor_paths` | Absent | Default: single curated path |

## 2. Nav diff

| Old label | New label | emphasis |
|-----------|-----------|----------|
| Home | Session | default |
| Features | Signal Map | primary |
| Clients | Monitors | default |
| Download | Roll Tape | primary |
| Hub | Relay | default |
| About | Credits | muted |
| Plugins | (footer only) | — |
| Docs | (footer only) | — |

## 3. Home section order

| Old | New |
|-----|-----|
| (generic) | console-rise (hero) |
| — | the-takes (feature_casting hero) |
| — | craft (story/spec-list) |
| — | real-sessions (proof_strategy) |
| — | press-play (conversion_funnel) |

## 4. Carry-forward

- All factual copy from `content.json` (features, clients, faq, install command, ecosystem)
- All external links (GitHub repos, docs URLs)
- MPL-2.0 license treatment for server/hub
- Install command from `content.json.install.primary`
- Footer 3-column structure from `content.json.footer`

## 5. Ambiguities resolved

- **Field precedence (§19.6):** `fonts.ui.usage` assigns nav to Rajdhani UI face, `navigation_model.topbar` also uses Rajdhani — both consistent, no conflict.
- **`visitor_paths: null`** → single curated path (no self-select fork), per §2A.
- **`intensity_toggle`** placed in footer utility row per spec; affects animation and hero_experience.
- **`mascot.behavior.placement`** restricted to Home, Features, Download pages only (not About reading pages).
- **Fonts:** All declared weights verified against pool. Using only: rajdhani-600, rajdhani-700, share-tech-mono-400, inter-400, inter-500.
- **`strong` weight:** Using Inter 500 + waveform green color for `<strong>` to achieve 4.5:1+ on all surfaces per §19.17.

## 6. Escalations

- None required for this kit.

## 7. Anti-convergence note

Same-archetype sibling used: `neon-blossom`. Structure differs: soundwave-studio has VU-meter/console visual language vs neon-blossom's neon grid aesthetic. Section count and layout rhythm are different.
