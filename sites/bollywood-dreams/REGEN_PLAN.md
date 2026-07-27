# REGEN_PLAN.md — Bollywood Dreams

## 1. Overview
**Archetype:** `narrative-scroll`
**Kit:** bollywood-dreams.js
**Plan date:** 2026-07-27

## 2. What each declared experience field becomes

### site_architecture
- `nav[]` → 6 primary nav links: The Lobby (home, default), Now Showing (features, primary), Box Seats (clients, default), Buy Your Ticket (download, primary), The Marquee (hub, default), The Story (about, muted)
- `demoted_pages` → plugins.html and docs.html remain as real pages but moved to footer-only links
- `extra_pages` → movie-night-guide.html (linked from about or footer)
- `footer_arrangement` → "full-directory": mirror nav row in footer, then 3-column footer from content.json

### homepage_narrative
| # | id | source → treatment |
|---|----|--------------------|
| 1 | `curtain-rise` | `copy_overlay.hero` → Full-bleed marquee hero with copy_overlay text |
| 2 | `now-showing` | `feature_casting` → Two hero features (SyncPlay, Library) as "now showing" posters |
| 3 | `why-cinema` | `story/pitch_bullets` → 7 pitch bullets as "marquee lines" |
| 4 | `house-proof` | `proof_strategy` → GitHub link + one project quote |
| 5 | `get-tickets` | `conversion_funnel` → cta_ladder + install command |

### feature_casting
- `hero[]` (syncplay, library) → two hero feature cards on home
- `support[]` (transcode, auth, livetv, hub) → 4-card grid on home
- `footnote[]` (dlna, plugins) → mentioned in section footnote
- `omit_from_home[]` → none (all 8 appear somewhere)

### copy_overlay
- `hero.eyebrow` → "Now showing at your place"
- `hero.headline` → "Home Theater, Elevated."
- `hero.subheadline` → custom Bollywood copy
- `primary_cta.label` → "Buy Your Ticket"
- `secondary_cta.label` → "See the House Guide"
- `section_headings.pitch` → "Why the cinema always wins"
- `section_headings.features` → "Now Showing"
- `section_headings.cta_banner` → "The curtain's rising. Grab the marigolds."
- `footer_tagline` → "Every night is opening night."

### copy_treatments
- `pitch_bullets` → "marquee-lines" (lit marquee board style)
- `faq` → "letters-column" (Priya answering suggestion box notes)
- `clients` → "family-of-devices"
- `ecosystem` → "shelf-of-reels"

### faq_experience
- `frame` = "letters-column" — Priya the peacock usher reads suggestion box notes
- `question_order` = ["like-plex", "expose-internet", "formats", "mobile-app", "plugins", "license"]
- `extra_questions` mapped to canonical answers

### navigation_model
- `mode: "topbar"` with marquee-styled topbar
- Bulb-dot separators between nav links
- Fallback: standard accessible nav with marigold focus ring

### scroll_experience
- `mode: "chaptered"` — soft film-burn wipe between sections
- `reduced_motion` → continuous scroll with marigold-gold rule dividers

### easter_eggs
1. `logo-clicks:5` → Priya fans tail, releases jasmine petals
2. `typed-word:namaste` → cursor becomes marigold blossom, marquee bulbs chase

### conversion_funnel
- `cta_ladder`: "Buy Your Ticket" → "Pick Your Screen" → "Dim the Lights (Install)"
- `download_opening`: "Three steps to showtime" box-office framing

### proof_strategy
- Spec numbers → capability placard
- GitHub link → "from the projection booth"
- Quote from content.json FAQ → "Built in PHP 8.3+ on Workerman"

### visitor_paths
- Self-select fork after hero: "What kind of showing are you here for?"
- 3 paths: Family movie night, Grand collection, Tinkerer

### mascot.behavior
- Priya the peacock in bottom-right, seated pose
- Idle: gentle sway + tail fan + blink (disabled under reduced-motion)
- Tips on home#hero, features, download#server, about#faq
- Easter: click:5 fans tail + bow; hover-hold:2s gestures
- Dismiss: "Priya, enjoy the show" button + localStorage persistence

### intensity_toggle
- Label: "Dim the house lights"
- Affects: animation, parallax, particle-effects
- Placement: footer utility row

### seasonal_activation
- `mode: "live-js"` — date-gate in main.js flips seasonal tokens
- Active range gates from seasonal_variants array

### error_page_experience
- "Wrong theater, wrong showing" gag
- Priya under empty marquee with torn ticket stub
- Recovery links: home, features, download

## 3. Contrast fixes (measured)
- `--color-secondary` (#CC0066) on `--color-bg` (#0a0505) = 10.11:1 ✅
- `--color-secondary` on `--color-surface` (#160808) = 3.63:1 ❌ → use `#d63385`
- `--color-secondary` on `--color-surface-alt` (#1e0c0c) = 3.38:1 ❌ → use `#d9408c`
- `buttons.fab.text` #0a0505 on `#f5a800` = 1.03:1 ❌ → use `#4a4741`
- `buttons.danger.text` #fff5e0 on #c8001a = 5.59:1 ✅

## 4. Font weights — approved subset
| Face | Weights used |
|------|-------------|
| Playfair Display | 700, 900 (declared) |
| Cinzel Decorative | 400, 700 (declared; 900 not declared) |
| Lora | 400, 500 (declared; 600/700 exist but NOT declared) |
| Hind | 400, 500, 600 (declared; 700 exists but NOT declared) |
| JetBrains Mono | 400, 600 (declared) |

## 5. Field conflicts resolved
| Conflict | Resolution |
|----------|-----------|
| `fonts.ui.usage` nav vs `navigation_model` display face | More specific field (`navigation_model`) wins for wordmark: Playfair Display; nav links stay in UI face (Hind) |
| `page_budget.words_per_section_max=100` vs facts that must appear | Cap governs authored prose; verbatim content.json strings are exempt |
| `proof_strategy` asks for live star/issue count | Link to live `/stargazers` and `/issues` pages — no hard-coded numbers |

## 6. Notes
- Seasonal activation: `seasonal_variants` loaded into js/main.js date-gate. Active range checked on load + change event.
- Intensity toggle: writes `data-intensity="dim"` on `<html>`, CSS gates animations.
- `@copyright 2026 Joe Huss <detain@interserver.net>` must appear inside `/* … */` comment blocks in all css/*.css and js/*.js files.
- `selfcheck` rule 17 fails on missing @copyright header in css/*.css or js/*.js.
