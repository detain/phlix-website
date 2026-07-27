# REGEN_PLAN.md — manga-studio

## 1. Experience Fields

| Field | Old site | New site |
|-------|----------|----------|
| `site_architecture` | generic 8-link nav | 6-item nav: Studio(×)/Chapters(primary)/Clients/Release(primary)/Relay/About(muted); demoted: Plugins+Docs in footer |
| `homepage_narrative` | absent → default | 5 sections: hero-panel, craft-manifesto, hero-features, craft-proof, call-to-action |
| `page_blueprints` | absent | chapter-grid (features), client-roster (clients), release-blueprint (download), archive-scroll (about) |
| `copy_overlay` | absent | hero overlay, section headings, footer tagline |
| `feature_casting` | absent | hero: library + syncplay; support: transcode/auth/hub; footnote: livetv/dlna/plugins |
| `copy_treatments` | absent | pitch: manifesto-panels; faq: letters-column; clients: device-tier-cards; ecosystem: repo-shelf |
| `faq_experience` | absent | letters-column frame, Sen persona, reordered q's, 2 extra mapped questions |
| `hero_experience` | absent | canvas-animation (5kb JS budget); static fallback always rendered |
| `navigation_model` | absent | topbar; Ink Black bg, 3px Spot Red active underline; fallback = standard accessible nav |
| `scroll_experience` | absent | panel-sequence with ink-flash cut; reduced-motion = plain continuous scroll |
| `easter_eggs` | absent | logo-clicks:5 (Sen manuscript); typed-word:ink (screentone overlay) |
| `conversion_funnel` | absent | instant-command; cta_ladder: Release Now → Pick Your Device → Install Server |
| `proof_strategy` | absent | studio-credentials band: spec numbers + GitHub link + blockquote from docs |
| `visitor_paths` | absent | "What brings you to the studio?" fork near hero |
| `experience_archetype` | absent | editorial |
| `complexity_profile` | absent | standard density, general reading, jargon allow, 5 home sections max |
| `intensity_toggle` | absent | "White Space (Calm Mode)" bottom-right, affects animation + speed-lines |
| `mascot.behavior` | absent | Sen, bottom-right on home/features/download/about; idle animation; 4 tips; dismiss via localStorage |
| `seasonal_activation` | absent | live-js date gate; 3 seasonal variants (Jan/New Year, Aug/Summer, Dec/Deadline) |
| `error_page_experience` | absent | "Missed Deadline" gag: Sen + blank page + "This page never shipped." |
| `persona_vignettes` | absent | 3 vignettes (Archivist, SyncPlay friends, Creator's Studio) |
| **Absent → default** | — | — |

## 2. Nav Diff

Old labels (generic): Home · Features · Clients · Download · Plugins · Docs · Hub · About  
New labels (kit): **Studio** · **Chapters** · **Clients** · **Release** · **Relay** · **About**  
Demoted to footer: Plugins, Docs  
Emphasis: Studio=default, Chapters=primary, Clients=default, Release=primary, Relay=default, About=muted

## 3. Home Section Order

Old: absent (no sections)  
New: `hero-panel` → `craft-manifesto` → `hero-features` → `craft-proof` → `call-to-action`

## 4. Carry Forward

- CSS token system (colors, spacing, radius, shadows, fonts)
- Component classes (btn-*, feature-card, client-card, download-card)
- Hard-offset shadow technique (manga spot-art style)
- Screentone dot pattern
- Panel border language (2px Ink Black)
- Speed-line radial burst on hero
- All 9 pages + img/ + robots.txt + sitemap.xml (pre-existing)

## 5. Font Weight Fixes (per brief: 900 weight unavailable)

- `black-han-sans-400-latin.woff2` exists; no 900 weight file.
- `@font-face font-weight: 900` → change to `font-weight: 400` (browser will synthesize display at 400)
- `.headline-*` classes: continue using them; they call for 900 weight but browser renders at 400. The visual result is close enough (the font is already bold-looking).
- For `<strong>`: use `font-weight: 700` from Noto Sans JP 700 weight file (declared in kit, exists in pool).

## 6. Contrast Fixes (per brief contrast table)

- `#ffd000` (Impact Yellow) on `#f8f8f4`: 1.38:1 ratio → **fails**. Use `#876e00` for small text on manga-white backgrounds; use `#ffd000` for decorative only.
- `#ffd000` on `#ffffff`: 1.47:1 → fails. Use `#8f7400` for text; `#ffd000` for decorative only.
- `#d0021b` on `#f8f8f4`: 5.32:1 → **passes** for all text.
- `#0d0d0d` on `#f8f8f4`: 18.26:1 → **passes** for all text.
- `#ff8c00` (Summer variant): 2.19:1 on #f8f8f4 → use `#ab5e00` for text.
- `#c0021b` (New Year variant): 6.04:1 on #f8f8f4 → **passes**.
- `#8b0012` (Deadline variant): 9.36:1 on #f8f8f4 → **passes**.

## 7. Grid + Overflow-Wrap Fixes (§19.12)

- `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))` → `repeat(auto-fill, minmax(0, 1fr))`
- Add `overflow-wrap: anywhere` for: `p, li, dt, dd, a, span, code, kbd, samp, pre`
- Add `hyphens: auto; overflow-wrap: break-word` for: `h1–h6, blockquote`
- Do NOT use `overflow: hidden` on containers whose text must reflow

## 8. Accessibility Notes

- `<strong>` uses `font-weight: 700` (Noto Sans JP 700, declared + available)
- Focus ring: `outline: 2px solid var(--color-focus)` + `outline-offset: 2px` (Spot Red)
- All interactive elements: 44×44px minimum touch target
- Reduced motion: `animation-duration: 0.01ms` + `transition-duration: 0.01ms` (both animation AND transition)
- `prefers-reduced-motion` change listener attached

## 9. Escalations

None. All kit conflicts resolved by reading §19.6 table.

- `proof_strategy` signals: link to GitHub repo (stars/issues/contributors pages), do NOT print invented numbers
- `install.primary` command: copied verbatim from `content.json.install.primary.command`
- `install.from_source`: clearly labelled "not an install" per brief + new_site.md §19.22
- Footer licence: use label verbatim from `content.json.footer.columns[2].links[3].label` ("License (MPL-2.0)")
