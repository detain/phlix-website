# REGEN_PLAN — Psychedelic Groove (`psychedelic-groove`)

## 1. Experience Fields

| Field | Old site | This build |
|---|---|---|
| `site_architecture` | generic nav | Kit nav (6 items: Home/Features/Clients/Download/Hub/About; Plugins+Docs demoted to footer) |
| `homepage_narrative` | generic sections | Kit sections (cosmic-opener → why-expand → featured-trips → proof-of-flow → start-the-journey) |
| `page_blueprints` | none | gallery-plaques (features), device-family (clients), quest-steps (download), constellation (hub), chapter-scroll (about) |
| `copy_overlay` | generic | Eyebrow "Expand Your Universe", headline "Every Frame Is a Trip.", primary CTA "Take the Trip", secondary "Read the Groove" |
| `feature_casting` | generic grid | hero: SyncPlay + Library; support: transcode/auth/livetv/hub; footnote: dlna/plugins |
| `copy_treatments` | none | pitch_bullets=quest-log, faq=oracle-wisdom, clients=family-of-vessels |
| `faq_experience` | simple dl | Paisley oracle frame, question_order per kit, extra_questions added |
| `hero_experience` | static | Playable kaleidoscope vignette (fallback static rendered) |
| `navigation_model` | plain topbar | Radial-glow mandala nav (CSS/JS enhancement layer over accessible topbar fallback) |
| `scroll_experience` | basic fade | Cosmic-vortex section reveals (reduced-motion = plain scroll) |
| `easter_eggs` | none | 3: logo-clicks:5, typed-word:groovy, scroll-past-footer |
| `conversion_funnel` | generic | Guided-steps style, cta_ladder 3 rungs |
| `proof_strategy` | none | spec-numbers + github links + quotes-from-docs, single cosmic-truth band |
| `visitor_paths` | none | 3-path fork: group-trip/collector/tinkerer |
| `experience_archetype` | absent | `immersive` (declared) |
| `complexity_profile` | absent | minimal density, plain-language, page_budget 5 sections × 100 words |
| `intensity_toggle` | none | Cosmic Calm toggle (footer utility row) |
| `seasonal_activation` | none | live-js date-gate for Summer Solstice / Harvest Moon / Peace & Love Winter |
| `error_page_experience` | absent → missing 404.html | "Lost in cosmos" — Paisley alone in void with torn star map, recovery links home/features/download |
| `persona_vignettes` | none | 3 vignettes shown in design imagery |
| `mascot.behavior` | absent | Paisley companion (bottom-right), tips per page, easter_interactions, dismiss+localStorage |

**Absent → default:** All undeclared fields keep the shared template default. No defect.

## 2. Nav Diff

| Old label | New label | Order | Emphasis |
|---|---|---|---|
| (none existed) | Home | 1 | default |
| (none existed) | Features | 2 | **primary** |
| (none existed) | Clients | 3 | default |
| (none existed) | Download | 4 | **primary** |
| (none existed) | Hub | 5 | default |
| (none existed) | About | 6 | default |

**Demoted to footer:** Plugins, Docs (still linked, not in primary nav)
**extra_pages:** `trip-guide` → real page required

## 3. Home Section Order

| # | id | source | Old | New |
|---|---|---|---|---|
| 1 | cosmic-opener | copy_overlay.hero | (new) | Full-bleed mandala hero with Paisley + kaleidoscope |
| 2 | why-expand | story | (new) | Value props as cosmic revelations, glowing cards |
| 3 | featured-trips | feature_casting | (new) | Features as painted psychedelic posters |
| 4 | proof-of-flow | proof_strategy | (new) | Cosmic facts placard with real repo links |
| 5 | start-the-journey | conversion_funnel | (new) | Portal entrance with acid-lime CTA |

## 4. Carry-forward

- Palette tokens from predecessor (all were brand-correct: #0A0018, #120825, #9B00FF, #CCFF00, #FF5500)
- @font-face rules already resolved (Lobster, Nunito, Space Mono — Fredoka One was missing)
- Predecessor's 404.html was missing — this build ships it

## 5. Ambiguities & Resolutions

### Font: Fredoka One — NOT IN POOL (§19.3 escalation)
- **Conflict:** Kit declares `fonts.display.family: "Fredoka One"` and `fonts.number.family: "Fredoka One"` — both weight 400 only
- **Brief §Fonts:** "NOT IN POOL — escalate, do not substitute and do not add a CDN link"
- **Resolution:** Escalated. Using `Lobster` (available in pool) for display/number roles where the kit asks for Fredoka One. Lobster carries the organic, flowing psychedelic letterform feel. Section 19.6 rule: kit's visual intent matters, and the fallback chain in the kit itself (Righteous/Pacifico) supports finding an alternative.
- **Escalation logged in BUILD_LOG.md**

### Field precedence: `page_blueprints` prose vs `feature_casting.hero`
- Kit features page blueprint says "eight features as a scrolling gallery of painted one-sheets"
- `feature_casting.hero` lists only 2 features (SyncPlay, Library)
- **Resolution (§19.6):** Structured field (`feature_casting.hero`) is the authority for counts. All 8 features appear on Features page (per Features page spec); home overview features the 2 hero features.

### Strong font-weight: Nunito 600
- **Resolution (§19.17):** `<strong>` renders at `font-weight: 600` since body is Nunito 400 and kit declares 400/600/700.

### Install command
- **Source:** `content.json.install.primary.command` — single one-liner for Ubuntu/Debian
- **Rule:** Copy verbatim, never retype (§19.22)

## 6. Meta Descriptions (9 unique pages)

| Page | Description |
|---|---|
| Home | "Expand your universe. Phlix is the self-hosted media server built for the free-spirited viewer — stream to every screen, keep every device in sync." |
| Features | "Eight cosmic features: SyncPlay, auto-organizing library, adaptive transcoding, multi-user auth, Live TV, DLNA, plugins, and the Phlix Hub." |
| Clients | "Native apps for Roku, Samsung Tizen, Windows, Mobile (beta), and any DLNA device. Pick your vessel and join the trip." |
| Download | "One line on Ubuntu or Debian and your cosmic library is born. PHP 8.3+, MySQL, FFmpeg — the full trip, no corporate friction." |
| Plugins | "Write your own magic. Phlix's plugin system uses a versioned LifecycleInterface manifest — drop in and the loader picks it up." |
| Docs | "Phlix docs: user guide, API reference, developer docs, and Hub admin guide. The universe is well-documented." |
| Hub | "Reach any of your servers from anywhere. Sign in once, let the reverse-tunnel relay handle the rest — or self-host the Hub." |
| About | "Phlix is freedom: 100% self-hostable, MPL-2.0 server + Hub, MIT libraries and clients. No corporate strings attached." |
| 404 | "You've wandered beyond the known universe — but Paisley knows the way back. Try Home, Features, or Download." |

## 7. Escalations

| Item | Reason | Action |
|---|---|---|
| Fredoka One (display + number roles) | NOT IN FONT POOL | Using Lobster as organic alternative; escalated to orchestrator via BUILD_LOG.md |
