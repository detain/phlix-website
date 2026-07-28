# REGEN_PLAN.md — speakeasy-gold

## 1. Experience Fields

| Field | Old Site | New Site |
|-------|---------|----------|
| site_architecture | generic nav | Themed nav: The Lobby, The Vault, Every Room, Get the Password, The Tunnel, Our Story; plugins/docs demoted to footer |
| homepage_narrative | absent | curtain-rise → the-vault → why-belong → good-seats → knock-on-door |
| page_blueprints | absent | vault-gallery (features), speakeasy-devices (clients), box-office-window (download), chapter-scroll (about) |
| copy_overlay | absent | hero copy: "Step inside. You have the password." / "Your Private Vault. Always Open." |
| feature_casting | absent | hero: syncplay + library; support: transcode, auth, hub, livetv |
| copy_treatments | absent | speakeasy-ledger (pitch), bartender-chat (faq), speakeasy-rooms (clients) |
| faq_experience | absent | Gilda the bartender answering questions |
| hero_experience | absent | guided-reveal with stepped-arch, sunburst, champagne bubbles |
| navigation_model | absent | topbar with Art Deco dot separators |
| scroll_experience | absent | chaptered with film-burn wipe |
| easter_eggs | absent | logo-clicks:7 + typed-word:speakeasy |
| conversion_funnel | absent | guided-steps: 3 rungs |
| proof_strategy | absent | spec-numbers, github, quote-from-docs |
| visitor_paths | absent | 3 paths: family-night, collection-lord, tinkerer |
| experience_archetype | absent | narrative-scroll |
| complexity_profile | absent | standard density, general reading, translate jargon |
| intensity_toggle | absent | Dim the House Lights toggle |
| seasonal_activation | absent | 4 seasonal variants with motif assets |
| error_page_experience | absent | "No Show" card with Gilda and torn ticket |
| persona_vignettes | absent | 3 personas: Speakeasy Regular, Collector, Distant Guest |
| mascot.behavior | absent | Gilda, bottom-right, with tips and easter interactions |

## 2. Nav Diff

| Old Label | New Label | Emphasis |
|-----------|-----------|----------|
| (none) | The Lobby | default |
| (none) | The Vault | primary |
| (none) | Every Room | default |
| (none) | Get the Password | primary |
| (none) | The Tunnel | default |
| (none) | Our Story | muted |
| plugins | plugins (demoted to footer) | — |
| docs | docs (demoted to footer) | — |

## 3. Home Section Order

| Old | New |
|-----|-----|
| (none) | curtain-rise |
| (none) | the-vault |
| (none) | why-belong |
| (none) | good-seats |
| (none) | knock-on-door |

## 4. Carry-Forward

- Palette tokens from existing site (if any valid)
- Install command from content.json (never invent)
- Licence from content.json (MPL-2.0 for server/hub, MIT for libs/plugins/clients)
- Footer columns verbatim from content.json

## 5. Ambiguities & Resolutions

| Ambiguity | Resolution |
|-----------|------------|
| Kit claims 5 native clients | content.json wins — 4 native clients (Roku, Tizen, Windows, Mobile-beta) + DLNA |
| Kit contrast claims | Measured values from kit-brief used; safe substitutes applied |
| Strong weight 500 for Cormorant Garamond | Use 600 (declared weight, available face) |
| Install command length | content.json install.primary.line_count = 1 |

## 6. Escalations

- None required — all fonts in pool, all facts from content.json

## 7. 404.html

Realises error_page_experience.concept as: Gilda under empty marquee, torn ticket stub, recovery links to home/features/download.
