# REGEN_PLAN.md — Art Nouveau Garden (`art-nouveau-garden`)

## What this file is

This documents every declared experience field and what it becomes in the built site.
Kept ≤400 lines as required. Refer to this when reviewing, not the kit file.

---

## Filed: `site_architecture`

| Field | Value | Implementation |
|-------|-------|----------------|
| `nav[].label` | The Salon / The Gallery / The Rooms / Step Inside / The Relay / The Story | `<a>` labels in `<nav class="nav-primary">` — 6 links in order |
| `nav[].emphasis` | default / primary / muted | `.nav-menu a` (default, no extra class), `.nav-menu a[aria-current=page]` (primary = aged gold), `.nav-menu a.muted` (muted = warm umber) — three visually distinct levels |
| `demoted_pages` | plugins, docs | Still exist and linked; moved from primary nav to footer columns only |
| `extra_pages` | curating-your-collection | New page `curating-your-collection.html` — content drawn from `pitch_bullets`, `features`, `ecosystem` |

**Escalation:** None — nav labels and order match the kit exactly.

---

## Filed: `homepage_narrative`

| Section id | source | weight | Implementation |
|------------|--------|--------|----------------|
| `garden-opens` | copy_overlay.hero | hero | `<section id="garden-opens" class="hero">` — kit's voiced eyebrow/headline/subheadline/CTAs |
| `blooming-features` | feature_casting | major | `<section id="blooming-features" class="features-overview">` — hero features (library, syncplay) as botanical panels + support grid |
| `why-tend` | story | major | `<section id="why-tend" class="story-section">` — brand story in sepia-toned ornate frame |
| `who-trusts` | proof_strategy | minor | `<section id="who-trusts" class="proof-section">` — salon placard with capabilities + github link + docs quote |
| `enter-now` | conversion_funnel | major | `<section id="enter-now" class="cta-banner">` — closing CTA with install snippet |

**Escalation:** None — sections match declared ids and order exactly.

---

## Filed: `feature_casting`

| Role | Feature ids | Implementation |
|------|-------------|----------------|
| `hero[]` | library, syncplay | Two botanical-panelled feature cards in `#blooming-features`, with `angle` text from kit |
| `support[]` | transcode, auth, dlna, hub | Four cards in the same grid |
| `footnote[]` | livetv, plugins | Moved to Features page only |
| `omit_from_home[]` | [] (none) | All 8 features appear somewhere |

---

## Filed: `copy_overlay`

| Slot | Kit value | Implementation |
|------|-----------|----------------|
| hero.eyebrow | "Your living room as a belle époque salon" | `.hero-eyebrow` text |
| hero.headline | "Where the Garden Blooms, the Story Begins." | `<h1>` text |
| hero.subheadline | "Curate your film collection..." | `.hero-sub` text |
| hero.primary_cta.label | "Step Through the Garden Gate" | Link to download, text matches |
| hero.secondary_cta.label | "Wander the Gallery" | Link to features, text matches |
| section_headings.pitch | "Why tend a garden at home?" | `#pitch h2` text |
| section_headings.features | "The Gallery Unfolds" | `#features-overview h2` text |
| section_headings.cta_banner | "Your salon awaits. The lantern is lit." | `.cta-banner h2` text |
| footer_tagline | "Cultivate beauty, frame by frame." | `.footer-tagline` text |

**Escalation:** Secondary CTA "Wander the Gallery" links to `features.html` — honest destination per WCAG 2.5.3.

---

## Filed: `copy_treatments`

| Block | Treatment | Implementation |
|-------|-----------|----------------|
| pitch_bullets | botanical-frame-list | `.pitch-bullets li` with leaf-dot pseudo-element |
| faq | salon-conversation | `.faq-list` with Lily persona framing (via `faq_experience`) |
| clients | gallery-wall | `.client-card` with painted-frame aesthetic |
| ecosystem | library-shelf | `.ecosystem-list` with book-shelf styling |

---

## Filed: `faq_experience`

| Sub-field | Value | Implementation |
|-----------|-------|----------------|
| frame | salon-conversation | FAQ as `<dl class="faq-list">` in Lily's voice |
| question_order | like-plex, expose-internet, formats, mobile-app, plugins, license | Questions ordered per this array |
| extra_questions | "Will this garden bloom on my old television?" / "Do I have to open my walls...?" | Maps to existing canonical answers (formats / expose-internet) — no new facts |

---

## Filed: `hero_experience`

| Sub-field | Value | Implementation |
|-----------|-------|----------------|
| mode | diorama-parallax | Layered SVG parallax on pointer/scroll — LILY IS THE SUBJECT |
| fallback | static ornate frame | Static illustrated hero with Lily gesturing into garden — no JS dependency |
| js_budget_kb | 5 | Inline parallax in main.js — well under budget |

---

## Filed: `navigation_model`

| Sub-field | Value | Implementation |
|-----------|-------|----------------|
| mode | topbar | Sticky header with botanical vine flourish |
| fallback | standard accessible nav | Plain semantic `<nav>` list, hamburger on mobile, aria-expanded managed |

---

## Filed: `scroll_experience`

| Sub-field | Value | Implementation |
|-----------|-------|----------------|
| mode | chaptered | Each section arrives with vellum-fade + vine unfurl border |
| reduced_motion | plain instant scroll | `@media (prefers-reduced-motion: reduce)` — vellum fades and vine unfurls dropped entirely |

---

## Filed: `easter_eggs`

| Trigger | Effect | Reward copy | Exit | Implementation |
|---------|--------|-------------|------|----------------|
| logo-clicks:3 | Vine unfurls around logo, petals scatter, Lily appears | "The garden remembers the curious visitor." | ~3s auto or Esc | JS in main.js — disabled when focus in input/textarea/contenteditable |
| typed-word:garden | Peacock-feather shimmer across background, harp glissando | "You speak the garden's language." | Any key or Esc | JS in main.js — document keydown, disabled in inputs |

**Escalation:** Neither `preventDefault`s. Both exit on Esc. Both disabled in inputs. Compiles with §19.8.

---

## Filed: `conversion_funnel`

| Sub-field | Value | Implementation |
|-----------|-------|----------------|
| cta_ladder[0] | "Step Through the Garden Gate" → download | Primary CTA in hero |
| cta_ladder[1] | "Choose Your Room" → clients | Second CTA on Features page |
| cta_ladder[2] | "Light the Lantern (install server)" → download#server | Third CTA in download page server block |
| download_opening | "Three small steps to your opening night" | Framing copy on download page |

---

## Filed: `proof_strategy`

| Signal | Format | Placement |
|--------|--------|-----------|
| spec-numbers | Framed salon placard listing 5 clients, SyncPlay, HLS+FFmpeg | `#who-trusts` section |
| github | "from the workshop" line with live star link | Same section |
| quotes-from-docs | Verbatim line from content.json set in ornate frame | Same section |

**Escalation:** No fabricated numbers — links to live GitHub pages only.

---

## Filed: `visitor_paths`

| Sub-field | Value | Implementation |
|-----------|-------|----------------|
| prompt | "What kind of evening are you here for?" | Shown in hero area |
| paths[0] | "I love curating films" → features#library | Path card |
| paths[1] | "I want to sync with others" → features#syncplay | Path card |
| paths[2] | "I like to tinker" → plugins | Path card |

---

## Filed: `experience_archetype`

**Value:** `narrative-scroll`

Implementation: Home page is a chaptered scroll through garden-opens → blooming-features → why-tend → who-trusts → enter-now. Each section visually distinct, literary voice throughout.

---

## Filed: `complexity_profile`

| Sub-field | Value | Implementation |
|-----------|-------|----------------|
| density | minimal | Generous whitespace; restrained card count |
| reading_level | literary | Prose uses kit vocabulary (bloom, tend, cultivate, wander) |
| jargon_policy | translate | Technical terms surface with plain-term label; precise term in `<details>` |
| home_sections_max | 5 | Exactly 5 sections on home page |
| words_per_section_max | 85 | Headings/framing/captions measured against cap; verbatim content.json facts exempt |

---

## Filed: `intensity_toggle`

| Sub-field | Value | Implementation |
|-----------|-------|----------------|
| label | "Dim the lights (calm mode)" | Toggle in footer |
| affects | animation, parallax_depth, scroll_transitions, ornamental_detail | `.calm-mode` class on `<body>` — disables parallax, simplifies transitions |
| placement | Footer, beside reduced-motion note | Implemented |

---

## Filed: `mascot.behavior`

| Sub-field | Value | Implementation |
|-----------|-------|----------------|
| name | Lily | On-page companion figure |
| placement | Upper-right corner, Home + Features, gently drifting | `.mascot-lily` fixed position, drift animation on scroll |
| idle | Vine tendrils unfurl, lantern flickers softly | CSS animation, disabled under reduced-motion |
| tips | home:#hero / home:.pitch / features:. | Tip bubble on hover/tip |
| easter_interactions | click:3 (lantern brightens) / hover-hold:2s (gestures toward CTA) | In main.js |
| dismiss | Ornate X → thin vine bookmark at edge, localStorage persists | `.mascot-lily.dismissed` class + localStorage |

**Escalation:** Below 768px — in-flow (above footer), not fixed, to avoid CTA overlap per §19.11.

---

## Filed: `seasonal_activation`

| Sub-field | Value | Implementation |
|-----------|-------|----------------|
| mode | live-js | Date-gate JS in main.js applies seasonal CSS overrides |
| motify_assets | 4 seasonal SVG motif assets | Linked in HTML when active |

---

## Filed: `error_page_experience`

| Sub-field | Value | Implementation |
|-----------|-------|----------------|
| concept | Lily in empty garden, wilted petal, "Shall we return to the gallery?" | Real content in `404.html` — not the field verbatim |
| recovery_links | home, features, download | Three links in 404.html: `./`, `features.html`, `download.html` |
| noindex | yes | `<meta name="robots" content="noindex">` |
| asset paths | relative | All paths like `css/base.css` — no `../` |

---

## Filed: `persona_vignettes`

Implemented via the overall visual direction: scenes guide what the UI surfaces show.
Not a separate UI element — informs design choices (media library grid, SyncPlay interface, profile picker, etc.).

---

## Font weights — declared vs. available

| Role | Declared | Available in pool | Notes |
|------|----------|-------------------|-------|
| Headline (Cormorant Garamond) | 600, 700 | 600, 700 | ✅ Exact match |
| Display (Playfair Display) | 700, 900 | 700, 900 | ✅ Exact match |
| Body (EB Garamond) | 400, 500 | 400, 500 | ✅ Exact match |
| UI (Josefin Sans) | 300, 400, 600 | 300, 400, 600 | ✅ Exact match |
| Mono (Courier Prime) | 400, 700 | 400, 700 | ✅ Exact match |
| Number (Cormorant Garamond) | 600 | 600 | ✅ Exact match |

**Escalation:** None — all declared weights have matching WOFF2 files. No weight substitution needed.

---

## Emphasis — `<strong>` two-channel fix applied (ROUND 3)

Body face EB Garamond caps at [400, 500]. Per §19.17, using 500 alone is sub-perceptual as the sole channel.
**Fix applied:**
- `strong { font-weight: 500; color: var(--color-emphasis); }` — 500 weight + darker ink `#0f1a0d`
- `--color-emphasis: #0f1a0d` added to base.css — passes 4.5:1 on all surfaces:
  - On `--color-bg` (#f5efe0): ~14.5:1
  - On `--color-surface` (#faf5ea): ~15.3:1
  - On `--color-surface-alt` (#eaf0e6): ~13.8:1

---

## Installed command — verbatim from content.json

`install.primary`: `curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash`
`install.from_source` (labelled "not an install"): `git clone https://github.com/detain/phlix-server.git` / `cd phlix-server` / `composer install`

Never retyped. Always copied from content.json.
