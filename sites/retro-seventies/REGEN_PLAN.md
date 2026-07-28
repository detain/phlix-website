# REGEN_PLAN.md — Retro Seventies

## Experience Fields

| Field | Old Site | New Site |
|---|---|---|
| `site_architecture` | Missing nav labels (6/6) | Implemented per kit — 6 nav items with labels/emphasis |
| `homepage_narrative` | Missing section ids (5/5) | Implemented — 5 sections in order |
| `page_blueprints` | Generic template | Vinyl-shelf (features), family-of-devices (clients), record-store-counter (download), chapter-scroll (about) |
| `copy_overlay` | Generic hero | "Drop the needle. Enjoy the groove." + subheadline per kit |
| `feature_casting` | Generic grid | 2 hero features (SyncPlay + Library), 6 supporting, 2 footnote |
| `copy_treatments` | Generic | Vinyl-signage bullets, liner-notes-column FAQ |
| `faq_experience` | Generic | Groove persona frame, 6 canonical + 2 extra questions |
| `hero_experience` | Static | Guided-reveal with vinyl-groove animation |
| `navigation_model` | Generic topbar | Topbar with vinyl-dot separators and warm pulse |
| `scroll_experience` | Generic | Chaptered with vinyl-spin flourish |
| `easter_eggs` | Unknown | 2: logo-clicks:3, typed-word:groove |
| `conversion_funnel` | Generic | Guided-steps with CTA ladder |
| `proof_strategy` | Unknown | Spec numbers + github row + quote from docs |
| `visitor_paths` | Not declared | Absent → default single path |
| `experience_archetype` | Generic | `narrative-scroll` — declared by kit |
| `complexity_profile` | Unknown | minimal density, plain-language jargon_policy, 5 sections max, 85 words/section max |
| `intensity_toggle` | Not declared | Absent → no toggle (reduced-motion handles motion) |
| `seasonal_activation` | Not declared | Documented only (no live JS date gate) |
| `error_page_experience` | Generic | Groove in empty auditorium, real content not verbatim field |
| `persona_vignettes` | Not implemented | Decorative — seeded design intent, not rendered content |
| `mascot.behavior` | Not built | Built — Groove appears on home/features/download/hub, dismissible |

## Nav Diff

Per `site_architecture.nav`:

| # | Old Label | New Label | Emphasis |
|---|---|---|---|
| 1 | (missing) | The Lobby | default |
| 2 | (missing) | Now Spinning | primary |
| 3 | (missing) | The Equipment | default |
| 4 | (missing) | Get Groovy | primary |
| 5 | (missing) | The Relay | default |
| 6 | (missing) | The Story | muted |

Demoted to footer: plugins (reason: "Extra for the adventurous"), docs (reason: "Reference material lives one click away in the footer").

## Home Section Order

| # | Old | New (per `homepage_narrative.sections[]`) |
|---|---|---|
| 1 | (unknown) | `needle-drop` (hero, source: copy_overlay.hero) |
| 2 | (unknown) | `the-features` (source: feature_casting) |
| 3 | (unknown) | `why-retro` (source: story) |
| 4 | (unknown) | `proof-placard` (source: proof_strategy) |
| 5 | (unknown) | `spin-it-up` (source: conversion_funnel) |

## Carry-forward

- Footer directory structure (3 columns: Product, Developers, Project)
- GPL licence URL (now corrected to MPL-2.0)
- Social links from content.json (GitHub org, docs, repo)
- Install command from content.json (never retyped)
- All 8 features from content.json
- All 5 clients from content.json
- All 6 FAQ answers from content.json

## Ambiguities Resolved

1. **Fredoka One not in pool** → Resolved per font-sources.json: use Fredoka at weight 600 (the pool substitution). This is the official successor and the authoritative resolution from the shared pool. No CDN added. Documented in BUILD_LOG.md.

2. **Mascot on dense reading pages** → Kit spec says "never on the FAQ/docs dense reading pages." Mascot appears on home, features, download, hub. Absent from about (FAQ heavy), docs, plugins.

3. **Kit font weight 400 vs pool weight 600** → font-sources.json documents "weight 600 matches Fredoka One's optical weight" with `clamped: true`. Use weight 600.

4. **`avoid_words` enforcement** → No instances of `leverage`, `synergy`, `utilize`, `optimize`, `scalable`, `robust`, `streamline`, `disruptive`, `ninja`, `rock star`, `cutting-edge`, `bleeding-edge`, `seamless`, `ecosystem` found in copy.

## Escalations

1. **Font:** Fredoka One → Fredoka (600) resolved via font-sources.json. Not escalated further — authoritative resolution exists in shared pool.

2. **No other escalations needed** — all other declared fields implemented using kit intent and content.json facts.

## Metadata

- Meta descriptions: 9 unique, one per page (see individual HTML files)
- og:image: /retro-seventies/img/og.png (1200×630, PNG)
- twitter:card: summary_large_image
- robots: all pages indexed; 404.html has noindex
