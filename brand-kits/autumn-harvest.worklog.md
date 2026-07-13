# autumn-harvest.js Worklog

## experience-expansion — brand kit sections 22-26, mascot.behavior, seasonal_activation — 2026-07-12

### Summary

Expanded `/home/sites/phlix/phlix-website/brand-kits/autumn-harvest.js` with 21 new schema fields (sections 22-26 plus nested additions) designed to drive genuinely different user experience — not just visual reskinning. All new content grounded in the kit's own established identity, verified real feature ids from content.json, and woven through a consistent throughline of Mabel's warm, unhurried host personality.

### Changes Made

**1. Added mascot.behavior object (nested inside existing mascot object, line ~549)**

Mabel transforms from static art into an interactive on-page companion:
- **placement**: Bottom-right corner on Home, Features, Download, About (never docs/library)
- **idle**: Gentle rocking in chair, sipping cider; disabled under prefers-reduced-motion
- **tips**: 5 contextual messages keyed to specific page anchors (e.g., "Settle in. The season is perfect." at home hero; "Each one of these grows naturally from the soil" at features detail)
- **easter_interactions**: 2 discoverable interactions (5-click leaf-spiral dance, 2s hover-hold offers second mug)
- **dismiss**: localStorage-persisted dismissal button with warm copy "Mabel, enjoy your evening"

Throughline: Each tip reuses Mabel's core personality — she is a settled, generous host who knows what visitors need and already has it ready. No rushing, no sales pitch.

**2. Added seasonal_activation object (after seasonal_variants, line ~1004)**

Declares that seasonal_variants ship live via date-gated JS:
- **mode**: "live-js" (override tokens + motif flip during active_range, no rebuild)
- **motif_assets**: 4 SVG paths (deep-harvest-leaves, frost-eve-lanterns, harvest-feast-cornucopia, apple-blossom-branch)
- **banner**: "The season has arrived — settle in for what's perfect right now." (warm, grounded, not urgent)

Grounds in kit's own seasonal_variants (Deep Harvest Oct 1-31, First Frost Eve Nov 1-25, Harvest Feast Nov 24-30, Apple Blossom Welcome Apr 15–May 15).

**3. Added 19 top-level experience fields (sections 22-26, lines ~1014–1184)**

#### Section 22: site_architecture
- **nav**: Reordered 5 primary pages (home, features, clients, download, about); dropped plugins/docs/hub to footer with reasons
- **demoted_pages**: 3 pages moved to footer (plugins="tinker extension", docs="reference off main path", hub="advanced feature")
- **footer_arrangement**: "mirror-nav" (reflects primary nav structure below)

#### Section 23: homepage_narrative
- **arc**: "story-first" (matches kit's founding narrative)
- **logline**: "Settle in. The season is perfect — your media, your library, your whole autumn evening waits."
- **sections**: 5-section home structure (welcome hero, why-phlix story, features grid, proof signals, closing CTA)

#### Section 24: page_blueprints
- **features**: "harvest-display" — features as harvested bounty cards on a warm shelf
- **clients**: "family-of-screens" — devices as household members around one hearth
- **download**: "settle-in-steps" — 3-step journey (gather ingredients, pick seat, you're ready)
- **about**: "fireside-chapters" — scrolling hearth-side story chapters ending in FAQ

#### Section 25: feature_casting
- **hero**: 2 features (syncplay="table in sync", library="add to orchard, watch it ripen")
- **support**: 3 mid-tier (transcode, auth, livetv)
- **footnote**: 3 advanced (dlna, plugins, hub)
- Real feature ids verified against content.json: library, syncplay, transcode, auth, livetv, dlna, plugins, hub

#### Section 25: copy_overlay
- **hero**: Kit-voiced overrides for eyebrow, headline, subheadline, CTAs (brand voice intact, facts unchanged)
- **section_headings**: 3 warm re-phrasings (pitch="Why gather here?", features="What grows", cta_banner="Fire's lit")
- No facts changed; only presentation re-voiced through orchard/harvest metaphors

#### Section 25: copy_treatments
- **pitch_bullets**: "abundance-list" (each value prop as a harvest claim)
- **faq**: "fireside-q&a" (Mabel answering)
- **clients**: "family-of-screens"
- **ecosystem**: "orchard-shelf"

#### Section 26: faq_experience
- **frame**: "fireside-q&a"
- **persona**: "Mabel, answering questions by the fire as if you've pulled up a chair."
- **question_order**: 6 questions in kit-chosen order (like-plex, expose-internet, formats, mobile-app, plugins, license)
- **extra_questions**: 3 kit-voiced rephrasings that map to existing canonical answers (e.g., "Will this work with the old TV?" maps to "formats"; "Can I grow my own extensions?" maps to "plugins")

All questions verified against content.json FAQ entries; no new facts invented, only re-phrasing to fit Mabel's voice.

#### Section 26: persona_vignettes
- 3 concrete usage vignettes, each surfacing different UI surfaces and feature emphasis:
  1. "Autumn Movie Night" (family cozy gathering, surfaces: hero/library/player, features: library/transcode/auth)
  2. "The Harvest Spread" (multi-household sync, surfaces: syncplay/player/hub, features: syncplay/hub/auth)
  3. "The Collector's Shelf" (massive archive management, surfaces: library/quality/detail, features: library/transcode/auth)

Throughline: All vignettes emphasize Mabel's core value — creating cozy, unhurried moments together. No high-stress scenarios.

#### Section 26: hero_experience
- **mode**: "diorama-parallax"
- **spec**: Layered orchard diorama (moon, branches, Mabel in chair) parallaxes on scroll/pointer; Mabel's mug steams as warmth invitation
- **fallback**: Single flat autumn-orchard painting with Mabel + identical copy + both CTAs (required static/no-JS equivalent)
- **js_budget_kb**: 5 (tight perf budget)
- **suggested_inputs**: pointer position, scroll offset

Fallback is technically precise: it carries the exact same copy, headlines, and CTAs, just without parallax motion.

#### Section 26: navigation_model
- **mode**: "topbar"
- **spec**: Warm parchment topbar with Lora links, subtle plaid rule, active link in maple red
- **fallback**: Standard accessible `<nav role="navigation">` with Tab/Enter keyboard navigation, hamburger menu on mobile with `aria-label` and `aria-expanded` attributes (required, always renders)

Fallback specifies actual ARIA attributes and keybindings, not generic "accessible."

#### Section 26: scroll_experience
- **mode**: "continuous"
- **spec**: Unhurried scroll with leaf-shadow dividers and warm color shifts between sections
- **reduced_motion**: Dividers + color shifts remain but animation-free; plain continuous scroll with instant boundaries

Honors prefers-reduced-motion properly.

#### Section 26: easter_eggs
- 3 discoverable interactions, all inert for non-discoverers, keyboard shortcuts do NOT shadow browser/AT shortcuts:
  1. Logo clicks (5x) → leaf shower + Mabel's toast gesture, Esc clears
  2. Type "cider" → cursor becomes mug, page warms with amber glow, Esc clears
  3. Time-of-day 18:00–22:00 → page shifts to golden-hour filter (persistent until nav away)

#### Section 26: conversion_funnel
- **style**: "guided-steps"
- **primary_goal**: Get first-time host to run server and open first library
- **cta_ladder**: 3 steps (Settle In→download, Pick Your Room→clients, Light the Fire→download#server)
- **download_opening**: "Three steps to your autumn evening" frame with install as "the easy part"
- **friction_notes**: Warm, nostalgic audience; few steps, no jargon; install positioned as "already simmering, just waiting for you"

Throughline: Every step uses warmth, not urgency. Mabel's style: patient, inviting, never pushy.

#### Section 26: proof_strategy
- **signals**: 3 verifiable trust signals:
  1. "spec-numbers" — real capabilities from content.json (5 client families, SyncPlay, transcoding, hardware-only)
  2. "github" — live phlix-server repo star/issue count (honest house counts, never invented)
  3. "quotes-from-docs" — verbatim line from docs: "Your library never leaves your hardware unless you say so."
- **placement**: "honest orchard band" between features and closing CTA

Every signal is verifiable; no fabricated testimonials.

#### Section 26: visitor_paths
- **prompt**: "What kind of autumn evening are you here for?"
- **paths**: 3 self-select forks:
  1. "Cozy family gathering" → syncplay feature, emphasize syncplay/auth/library
  2. "I've got a big collection" → library feature, emphasize library/transcode/auth
  3. "I want to reach beyond home" → hub feature, emphasize hub/auth/transcode

Each path leads to a different feature hero, re-weighting emphasis per audience intent.

#### Section 26: experience_archetype
- Value: "narrative-scroll" (matches kit's story-first, settlement-focused narrative)

Consistent with homepage_narrative.arc = "story-first" — the whole site unfolds as a story, not a list.

#### Section 26: complexity_profile
- **density**: "minimal" (cozy kit never cramped)
- **reading_level**: "plain-language" (warm, conversational, no jargon-heavy text)
- **jargon_policy**: "translate" (surface plain terms; preserve precise terms in `<details>` expanders)
- **page_budget**: max 5 home sections, max 100 words/section (generous spacing, short breaths)

#### Section 26: intensity_toggle
- **value**: null (kit is already calm; nothing loud enough to need taming)

Valid choice per schema.

#### Section 26: error_page_experience
- **concept**: Mabel under rainy autumn sky holding empty basket; gentle recovery note; recovery links (home, features, download)

Concept documented per schema; actual per-kit 404.html not shipped (out of scope per new_site.md).

### Quality Gate Checks

✓ **Throughline woven consistently**: Mabel's warm, unhurried host personality surfaces in:
  - mascot.behavior.tips (welcoming, generous, ready)
  - faq_experience.persona (sitting by fire, having time, offering answers)
  - persona_vignettes (all scenes emphasize cozy togetherness, never rushed)
  - conversion_funnel.friction_notes (patient, inviting, never pushy)
  - copy_overlay.hero (sedate language: "settle in," "your evening waits," "fire's already lit")

✓ **All values verifiable**: Feature ids from content.json (library, syncplay, transcode, auth, livetv, dlna, plugins, hub); FAQ reorderings map to canonical questions; proof signals reference real repos and verbatim docs quotes.

✓ **Grounded in kit's own data**: seasonal_activation names the kit's actual 4 seasonal_variants by active_range; feature_casting.hero picks 2 of the kit's real 8 features; every re-voice stays faithful to autumn-harvest tone/voice/metaphors.

✓ **Existing keys preserved**: mascot object gained behavior key alongside existing name/species/personality/description/poses/expressions (unchanged); seasonal_variants array remains intact with new sibling seasonal_activation field.

✓ **Named entities get bespoke treatment**: 3 visitor_paths are distinct personas (family, collector, tinkerer, each emphasizing different features); 3 persona_vignettes depict different scenarios (movie night, multi-household, massive archive); 3 easter_eggs are unique triggers (logo, word, time-of-day).

✓ **Fallbacks technically precise**:
  - hero_experience.fallback: "single flat painted illustration with identical headline, subheadline, CTAs" (concrete, testable)
  - navigation_model.fallback: "plain `<nav role='navigation'>` list, Tab/Enter navigation, hamburger with aria-label/aria-expanded on mobile" (names actual ARIA attributes and keybindings)

✓ **ES module validation**: File imports successfully as JavaScript.

### Files Modified

- `/home/sites/phlix/phlix-website/brand-kits/autumn-harvest.js` — 19 new top-level fields + mascot.behavior nested object + seasonal_activation object

### No Breaking Changes

All edits are additive:
- mascot.behavior added to existing mascot object
- seasonal_activation added as sibling to seasonal_variants
- 19 new top-level fields added before metadata section
- All existing keys in the file remain verbatim and unchanged
- File remains valid ES6 module export

### Kit Validation

✓ Autumn-harvest.js still loads as valid JavaScript (node import test passes)
✓ All new fields follow brand_kit_schema.js structure and types
✓ Throughline weaves Mabel's voice through 5+ different contexts
✓ Every proof signal is verifiable against real sources (content.json, repos)
✓ All required fallbacks are present and technically precise
