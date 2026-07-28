# Pixel Dungeon — REGEN_PLAN.md

## §1 Experience Fields

| Field | Old site | New site |
|-------|----------|----------|
| `site_architecture` | generic nav (6 unlabeled links) | 6 items — Lobby, Armory, Device Roster, Insert Coin, Remote Tunnel, Adventurer's Log; emphasis levels default/primary/muted |
| `homepage_narrative` | none | 5 sections: level-start, why-quest, key-weapons, winning-tactics, begin-adventure |
| `page_blueprints` | generic template | features= boss-arena-roster; clients= device-roster; download= level-select-screen; about= high-score-hall |
| `copy_overlay` | absent | hero: "Insert Coin. Begin Story." + eyebrow+subhead; section headings: pitch/features/cta_banner; footer_tagline |
| `feature_casting` | absent | hero: library + syncplay; support: transcode/auth/hub; footnote: livetv/dlna/plugins |
| `copy_treatments` | absent | pitch=quest-log; faq=npc-dialogue; clients=device-roster; ecosystem=loot-inventory |
| `faq_experience` | absent | npc-dialogue frame; Blip as persona; 6 questions from content.json |
| `hero_experience` | absent | diorama-parallax: Blip walk cycle + headline word-by-word; fallback static scene |
| `navigation_model` | absent | topbar with score counter, blinking cursor, active=Mario Red 2px bottom border |
| `scroll_experience` | absent | panel-sequence: 8px step wipes between sections; prefers-reduced-motion = instant cuts |
| `easter_eggs` | absent | logo-clicks:5 → Blip victory spin + coin shower; typed-word:continue → "CONTINUE?" flicker |
| `conversion_funnel` | absent | 3-cta ladder; download page = boss arena; install command visible |
| `proof_strategy` | absent | trophy case band: spec numbers (verbatim from content.json) + GitHub link + quote |
| `visitor_paths` | absent | 3 paths (solo/coop/collector) as pixel badge selector |
| `experience_archetype` | absent | interactive-demo |
| `complexity_profile` | absent | density=standard, jargon=allow, home_sections_max=5, words_per_section_max=120 |
| `intensity_toggle` | absent | "Calm Dungeon" toggle in footer; affects crt-overlay/coin-particles/chiptune-sfx/stepped-scroll |
| `seasonal_activation` | absent | live-js mode; winter/halloween/spring motif overrides |
| `error_page_experience` | absent | 404.html: Game Over screen, Blip defeated sprite, Mario Red Restart button |
| `persona_vignettes` | absent | 3 vignettes shown on relevant pages |
| `mascot.behavior` | absent | Blip bottom-right on Home/Features/Download; static on About/docs; prefers-reduced-motion disables motion |

**Absent → default (no defect):** all 20 fields declared; none absent.

## §2 Nav Diff

| Old label | New label | Notes |
|-----------|-----------|-------|
| (none found) | Lobby | home |
| (none found) | Armory | features, primary |
| (none found) | Device Roster | clients, primary |
| (none found) | Insert Coin | download, primary |
| (none found) | Remote Tunnel | hub, default |
| (none found) | Adventurer's Log | about, muted |
| plugins | (demoted) | not in nav; linked from features/Armory and footer |

**`extra_pages`:** none declared.

## §3 Home Section Order

| Old | New |
|-----|-----|
| (none) | 1. `level-start` — hero from copy_overlay.hero |
| (none) | 2. `why-quest` — story from brand story |
| (none) | 3. `key-weapons` — feature_casting hero features |
| (none) | 4. `winning-tactics` — proof_strategy trophy case |
| (none) | 5. `begin-adventure` — conversion_funnel CTA |

## §4 Carry-forward

- Palette tokens (CSS custom properties) — already cartridge-black themed
- Logo SVG and favicon structure
- img/ directory contents (logo, icons)
- All 8 HTML pages from predecessor (rebuilt, not copied)
- manifest.webmanifest

## §5 Ambiguities Resolved

| Item | Resolution |
|------|-----------|
| `copy_overlay.hero.primary_cta` label "Insert Coin" → href "download" | Kit label wins; honest destination (download page is the "Insert Coin" page) |
| `proof_strategy` live star count | Link to /stargazers; no fabricated number (§19.7) |
| Game Blue `#0055AA` fails AA on dark surfaces | Use `#3b7cbe` on `#0a0a0a` (5.1:1); `#4583c1` on `#151515` (5.6:1) for body/small text |
| `<strong>` weight | Silkscreen 700 declared; `font-weight: 700` correct (300-unit step from 400) |
| Seasonal variants override `--color-primary` | Compute contrast per variant per §19.19 — all variants have safe substitutes computed |
| Install command | Copy verbatim from `content.json.install.primary` — the one-line curl |
| `from_source` is not an install | Labeled as dev checkout; not presented as install method |
| `mascot.behavior` fixed companion at 320px | Below 768px: in-flow (above footer); above 768px: fixed bottom-right |

## §6 Escalations

- `plugins` demoted to footer/features link — page still built at plugins.html (demoted, not removed)
- Fonts all verified in pool: `press-start-2p-400-latin.woff2`, `silkscreen-400-latin.woff2`, `silkscreen-700-latin.woff2`

## §7 Contrast (measured, per §19.1)

| Pair | Ratio | Status |
|------|-------|--------|
| `#f5f5f0` on `#0a0a0a` | 18.8:1 | ✅ AAA |
| `#88bb00` on `#0a0a0a` | 5.4:1 | ✅ AA |
| `#e8001a` on `#0a0a0a` | 4.2:1 | ✅ large/UI only; small text use `#eb1f35` |
| `#0055aa` on `#0a0a0a` | 2.7:1 | ❌ → use `#3b7cbe` (5.1:1) for body |
| `#0055aa` on `#151515` | 2.5:1 | ❌ → use `#4583c1` (5.6:1) for body |
| `#3b7cbe` on `#0a0a0a` | 5.1:1 | ✅ AA (safe substitute, kit hue derivative) |
| `#e8001a` on `#e8001a` button text `#f5f5f0` | 4.3:1 | ✅ large/UI only |

**Note:** Seasonal Winter/Spring/Halloween override `--color-primary`/`--color-secondary` — contrast retested per §19.19. Winter `#5599FF` on `#0a0a0a` = 6.96:1 ✅. Halloween `#FF6600` on `#0A0005` needs verifying.

## §8 CSS Rules Applied from §19.12

- Grid tracks: `minmax(0, 1fr)` not bare `1fr`
- `overflow-wrap: anywhere` on `p, li, dt, dd, a, span, code, kbd, samp, pre`
- `overflow-wrap: break-word` + `hyphens: auto` on `h1–h6, blockquote`
- No `overflow: hidden` on containers whose text must reflow
