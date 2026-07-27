# REGEN_PLAN.md — Marina Breeze

## Site Architecture

| Field | Value |
|-------|-------|
| nav (primary) | Home (default), Features (primary), Clients (default), Download (primary), Hub (default), About (default) |
| demoted_pages | plugins, docs — linked in footer only |
| footer_arrangement | mirror-nav (mirror index row first, then 3 columns) |

## Homepage Narrative Sections

| # | Section ID | Source | Treatment |
|---|-----------|--------|-----------|
| 1 | `hero-beacon` | copy_overlay.hero | Full-bleed hero, lighthouse beam sweep animation |
| 2 | `why-sail` | story/pitch_bullets | "Why Anchor Here?" — 7 pitch bullets as dock-signs |
| 3 | `the-fleet` | feature_casting | Hero: library + syncplay; support grid for rest |
| 4 | `trust-the-harbor` | proof_strategy | Harbor logbook: spec numbers + github stars + quote |
| 5 | `set-sail` | conversion_funnel | CTA with cta_ladder: Cast Off → Choose Your Vessel → Unfurl the Sails |

## Copy Overlay Transforms

| Location | Kit Value | Default (content.json) |
|----------|-----------|----------------------|
| hero eyebrow | "Set Sail for Tonight" | "Self-hosted media server" |
| hero headline | "Your Harbor. Your Library. Your Rules." | "Your media. Your library. Your Phlix." |
| hero subheadline | Kit version | content.json version |
| primary_cta | "Cast Off" | "Get Phlix" |
| secondary_cta | "Chart the Course" | "Read the docs" |
| pitch heading | "Why Anchor Here?" | "Why Phlix?" |
| features heading | "Navigate the Waters" | "Everything your library needs" |
| cta_banner heading | "Ready to set sail? Begin here." | "Ready to set sail?" |
| footer tagline | "Open waters. No clouds in sight." | "Open-source media, on your terms." |
| download opening | "All hands on deck!" | — |

## Feature Casting

| Role | Features |
|------|----------|
| hero[] | library, syncplay |
| support[] | transcode, auth, hub |
| footnote[] | livetv, dlna, plugins |

## Easter Eggs

| Trigger | Effect |
|---------|--------|
| logo-clicks:3 | Binnacle beacon flashes + beam sweep, "Welcome home, sailor!" |
| typed-word:anchor | Anchor cursor + teal accent pulse, "You've dropped anchor!" |

## Mascot (Binnacle)

- placement: bottom-right, appears on home/features/download
- idle: gentle rock side-to-side + beacon pulse (disabled under reduced-motion)
- tips: home:hero, home:features-overview, features:library, download:#server
- easter_interactions: click:3 → celebration; hover-hold:2s → helping hand
- dismiss: localStorage persistence, "Binnacle, rest now" close button

## Conversion Funnel CTA Ladder

1. "Cast Off" → download.html
2. "Choose Your Vessel" → clients.html
3. "Unfurl the Sails" → download.html#server

## Visitor Paths (homepage fork)

- prompt: "What brings you to the harbor today?"
- paths: family-nights (→ syncplay), collectors (→ library), tinkerers (→ plugins)

## Page Meta Descriptions (all different)

- index: "Set sail for tonight — self-hostable PHP media server with SyncPlay, Live TV, DVR, DLNA, and native apps for Roku, Samsung TV, Windows & mobile."
- features: "Navigate every feature of Phlix — library organization, SyncPlay, transcoding, multi-user auth, Live TV, DLNA, plugin system, and Phlix Hub."
- clients: "Phlix runs natively on Roku, Samsung Tizen, Windows, and mobile (beta) — plus any DLNA device you already own."
- download: "Get Phlix running in one line on Ubuntu or Debian. Plus native clients for every screen you own."
- plugins: "Extend Phlix with the versioned LifecycleInterface plugin contract. Drop in a manifest, and the loader picks it up."
- docs: "Phlix documentation — user guide, API reference, developer docs, and Hub admin guide."
- hub: "Phlix Hub — reach your server from anywhere via reverse-tunnel relay. Self-host it or use the public hub."
- about: "Open-source PHP media server licensed under MPL-2.0 (server/hub) and MIT (libs/plugins/clients). FAQ inside."

## Font Weights (declared only)

| Font | Declared Weights | Files |
|------|-----------------|-------|
| Playfair Display | 700, 900 | playfair-display-700-latin.woff2, playfair-display-900-latin.woff2 |
| Lato | 400, 700 | lato-400-latin.woff2, lato-700-latin.woff2 |
| Inter | 400, 500, 600 | inter-400-latin.woff2, inter-500-latin.woff2, inter-600-latin.woff2 |
| JetBrains Mono | 400, 500 | jetbrains-mono-400-latin.woff2, jetbrains-mono-500-latin.woff2 |

## Known Issues Fixed

- base.css had `@copyright` line outside comment block at line 240 — moved inside proper comment
- Each page now has unique meta description
- Nav demoted pages (plugins, docs) now in footer only
- 404.html created with recovery links + noindex
- All 5 narrative sections present with correct IDs in order
