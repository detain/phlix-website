# REGEN_PLAN.md — library-amber

## 1. Experience Fields

| Field | Old site | New site |
|---|---|---|
| `site_architecture` | 8-link nav, no emphasis levels | 6-link nav + demoted plugins/docs to footer; emphasis: default/primary/muted |
| `homepage_narrative` | Generic hero → pitch → features → CTA | 5-section editorial narrative: the-library-opens → two-paths → why-this-library → collectors-proof → claim-your-shelf |
| `page_blueprints` | Generic | gallery-plaques (features), device-shelf (clients), reading-room-setup (download), chapter-scroll (about) |
| `copy_overlay` | content.json defaults | Custom hero, section headings, footer tagline from kit |
| `feature_casting` | All 8 on home | Hero: library + syncplay; support: transcode/auth/hub/livetv; footnote: dlna/plugins |
| `copy_treatments` | Generic lists | spec-rows (pitch), letters-column (faq), family-of-devices (clients), bookshelf (ecosystem) |
| `faq_experience` | Generic dt/dd | letters-column with The Librarian persona voice, 6 canonical + 3 extra questions |
| `hero_experience` | Static | diorama-parallax on scroll/pointer (5KB budget), with static fallback |
| `navigation_model` | Generic topbar | Cream topbar + Playfair wordmark + small-caps links + brass rule; mobile: full-screen mahogany panel |
| `scroll_experience` | Generic | chaptered: vignette fades + brass-rule separators between sections |
| `easter_eggs` | None | logo-clicks:5 (The Librarian appears) + typed-word:collection (highlight + chime) |
| `conversion_funnel` | Generic CTA | 3-rung ladder: Explore the Collection → Choose Your Devices → Install the Library |
| `proof_strategy` | None | Provenance & Trust band: capability placard + GitHub repo + kit mission quote |
| `visitor_paths` | None | Self-select fork: Casual Reader / Grand Collection / Tinkerer |
| `experience_archetype` | — | editorial |
| `complexity_profile` | — | minimal density, general reading, jargon:translate, 5 home sections max, 120 words/section max |
| `seasonal_activation` | None | live-js date gate: winter 11-15..01-15, autumn 09-22..11-14, spring 03-20..05-31 |
| `error_page_experience` | No 404.html | Empty reading nook + fallen lamp + The Librarian bookmark + recovery links |
| `mascot.behavior` | None | The Librarian: fixed bottom-right, idle animations, 4 tips, easter click/hover-hold, dismiss→localStorage |
| `persona_vignettes` | — | 3 scenes: Evening Reader, Distributed Collectors, Curator on Every Screen |

**Absent (keep default):** `intensity_toggle: null`

---

## 2. Nav Diff

| Old | New | Change |
|---|---|---|
| Features | **The Collection** | Label + emphasis: primary |
| Clients | **Devices** | Label |
| Download | **Install** | Label + emphasis: primary |
| About | **About** | emphasis: muted |
| Plugins | → demoted to footer | Moved |
| Docs | → demoted to footer | Moved |
| — | Hub | New position |

**Footer:** mirror-nav row (Home · The Collection · Devices · Install · Hub · About) then 3 content.json columns.

---

## 3. Home Section Order

| # | Old id | New id | source | weight |
|---|---|---|---|---|
| 1 | hero | **the-library-opens** | copy_overlay.hero | hero |
| 2 | — | **two-paths** | feature_casting (2 hero features) | major |
| 3 | pitch | **why-this-library** | story | major |
| 4 | — | **collectors-proof** | proof_strategy | minor |
| 5 | cta-banner | **claim-your-shelf** | conversion_funnel | major |

---

## 4. Carry Forward

- Palette tokens in base.css :root (colors, spacing, radius, shadow, typography)
- Self-hosted @font-face rules from shared/font pool (all declared weights only)
- Existing img/ assets (logo.svg, favicon.svg, og.svg, og.png, icon PNGs)
- Brand-accurate component styles (cards, buttons, code blocks)
- Scroll reveal and lamp-glow ambient animation
- Skip-link, focus-visible, ::selection styling
- Custom scrollbar in mahogany-warm tones
- Brass shimmer gradient
- Mahogany dark / antique cream surface system

---

## 5. Ambiguities Resolved (per §19.6)

| Issue | Resolution |
|---|---|
| `primary` on cream fails 4.5:1 (2.50:1) | Use safe substitute `#8e5f12` for all small-text uses of primary on cream/surface |
| Seasonal `--color-primary: #b87a14` on cream = 2.95:1 | Use `#8e5e0f` (safe variant) for seasonal primary small text |
| `strong { font-weight: 500 }` alone: 100-unit step not perceptible | Use BOTH `font-weight: 500` AND `color: var(--color-neutral)` (#5C3317, 4.53:1 on cream) for strong emphasis |
| Kit 700 weight for EB Garamond exists in pool but not declared | Do NOT vendor it; use declared weights 400/500 only |
| `page_blueprints` says "gallery plaques" but kit provides structured data | Structured `feature_casting` is authority; honor shape (two-column gallery layout) |
| `hero_experience` JS budget 5KB | Hard budget, not a target — implement parallax with vanilla JS within budget |
| `footer_arrangement: mirror-nav` vs 3 columns | Both: mirror-nav index row first, then 3 content.json columns |

---

## 6. Escalations

None — all needed data is in content.json or the kit file.

---

## 7. @copyright status

CSS files: banner comments present but ONE has `@copyright` OUTSIDE the closing `*/` on its utility section — base.css line 334. Fixed by restructuring the utility comment block. components.css line 590 same issue — fixed.
