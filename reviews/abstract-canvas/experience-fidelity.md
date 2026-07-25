# Experience Fidelity Review — Abstract Canvas

**Variant**: abstract-canvas
**Round**: 1 (regen pass, `regen/wave-1`)
**Reviewer**: adversarial reviewer (independent)
**Date**: 2026-07-24

## Score

- **Experience Fidelity**: 80 / 100

The kit opts into **all 21** §2A fields, so nothing here is excused by absence. I verified each one
against the built output rather than against `REGEN_PLAN.md`. **19 of 21 are observably implemented;
2 are not** (`site_architecture.nav[].emphasis`, `seasonal_activation.motif_assets`).

## Field-by-field verification

| Field | Verdict | Evidence |
| --- | --- | --- |
| `site_architecture.nav` | ⚠️ partial | 6 items, kit labels, kit order, on all 9 pages ✓ — but `emphasis` renders as 2 levels, not 3 (❌ below) |
| `site_architecture.demoted_pages` | ✅ | `plugins`/`docs` absent from the bar; both pages exist, both reachable from the footer directory, both carry breadcrumbs; the Features page carries the `fold_into` panel (`features.html:372-382`) |
| `site_architecture.extra_pages` | ✅ (empty) | none authored — correct |
| `footer_arrangement: full-directory` | ✅ | 4th "The studio directory" column lists all 8 real pages alongside the 3 canonical `content.json` columns |
| `homepage_narrative` | ✅ | exactly 5 sections, ids `#canvas-primed` → `#the-brushstrokes` → `#why-this-studio` → `#who-has-painted-here` → `#hang-your-work`, in the declared order, with the logline in the hero (`index.html:155-158`); canonical classes retained as secondary |
| `page_blueprints.features` | ✅ | 4-tier gallery wall: 2 focal + 4 studies + 2 marginalia + 3 vignette studies |
| `page_blueprints.clients` | ✅ | 5 stacked `.client-station` rooms with alternating grounds, Bebas station numerals, "Material —" lines, highlight walls, artist-talk line, repo button |
| `page_blueprints.download` | ✅ | 3 named steps (ground / stations / shelf) opening on `download_opening` |
| `page_blueprints.about` | ✅ | chapters I–III as wall texts + "Artist Talks" |
| `feature_casting` | ✅ | home = 2 focal (`angle` as the headline, verbatim) + 4 studies; Features = all 8 tiered; every feature appears somewhere; `omit_from_home` empty and honoured |
| `copy_overlay` | ✅ | eyebrow/headline/subheadline/both CTA labels, all 3 section headings and the footer tagline applied verbatim |
| `copy_treatments` | ✅ | pitch → `gallery-labels` with catalogue numerals; faq → artist talks; clients → stations; ecosystem → a spine-style reference shelf |
| `faq_experience` | ✅ | declared order matched; all 3 `extra_questions` render as a second `<dt>` sharing the canonical `<dd>` (`about.html:259-288`) — no invented answers; Palette persona framed at `about.html:225-248` |
| `persona_vignettes` | ✅ | 3 CSS/SVG surface studies on `features.html:399-526`, captioned, **not** presented as testimonials; 3 matching entries in `img/PROMPTS.md:118-155` |
| `hero_experience` (static, 0 KB JS) | ✅ | hero markup carries all copy and both CTAs; no `reveal` class on hero content; verified with JS disabled |
| `navigation_model` (topbar) | ⚠️ | Cormorant labels, cadmium active underline, `aria-current`, labelled hamburger ✓ — but the declared fallback does not work with JS off at phone widths (ROUND-1 #9) |
| `scroll_experience` (continuous) | ✅ | no snap, no jacking; a single opacity-only settle, gated by reduced motion **and** the toggle |
| `easter_eggs` | ⚠️ | both wired, inert for non-discoverers, no `preventDefault` on the key egg, `Esc` exits — but the logo egg breaks its host link (ROUND-1 #4) |
| `conversion_funnel` (guided-steps) | ✅ | 3-rung ladder in order with the declared targets; download opens on the declared framing; 1 click from home |
| `proof_strategy` | ✅ | placard of real spec numbers, a credits row linking repo/contributors/pulse, one verbatim docs line; **no** star or contributor counts printed (§19.7) |
| `visitor_paths` | ✅ | prompt + 3 paths under the hero CTAs, each naming its emphasis features, each targeting a live anchor |
| `experience_archetype: editorial` | ✅ | asymmetric wall grid, margin numerals I–IV, left-aligned wall text at ≤68ch, colour-field band breaks, no centred section titles, no inline `style=` |
| `complexity_profile` | ✅ | 5 home sections exactly; plain line first + `<details>` holding the verbatim body for all 8 features; authored prose per section is genuinely terse |
| `intensity_toggle` | ✅ | real `aria-pressed` button in the footer utility row beside the motion note, persisted, and it does drop animations/transitions/reveals/idle |
| `mascot.behavior` | ⚠️ | companion, 4 anchored tips, click-5 and hover-hold-2s reactions, persisted dismissal, suppressed on the FAQ page via `data-palette="off"` ✓ — but it sits on the primary CTA at phone sizes (ROUND-1 #3) |
| `seasonal_activation` (live-js) | ⚠️ | date gate covers all 3 ranges incl. the year wrap, applies the exact declared tokens, injects the exact declared banner, `?season=` preview works — but the 3 declared `motif_assets` are never rendered (❌ below) |
| `error_page_experience` | ✅ | real 9th page realising the concept without printing it, all 3 recovery links, `noindex`, relative assets only, stands up with JS off |

## ⚠️ Concerns (non-blocking)

- `REGEN_PLAN.md` §5 A8 / §6.1 / §6.5 argue against instructions that `new_site.md` no longer
  contains. — ROUND-1 #23.
- The mascot is also suppressed on `404.html` (not just the FAQ page). Sensible — Palette *is* the
  404's illustration — and documented in row 26.

## ❌ Failures (must fix this round)

- **`css/components.css:89-100` + `REGEN_PLAN.md:19`** — `emphasis` has three declared levels and two
  rendered ones: there is no `[data-emphasis='default']` rule, so `default` (#141210/600) is
  indistinguishable from `primary` (#1A1A1A/600). The plan claims a 600/500/400 ladder that does not
  exist. → ROUND-1 #6.
- **`js/main.js:331-396` + `img/seasonal/*.svg`** — the three declared `motif_assets` are shipped as
  files and referenced by nothing (`grep -rn "seasonal/" css/ js/ *.html` → empty), so the declared
  seasonal *motif* is unobservable in every state. → ROUND-1 #7.

## Anti-convergence

Strong — this is the best part of the build. Against the default skeleton (`new_site.md` §3/§5) the
**structure** differs, not just the paint: 6 renamed nav items instead of 8 canonical ones, two pages
demoted to the footer with breadcrumbs, a 5-part narrative home in a kit-declared order (pitch folded
into the manifesto section), a 4-tier features wall instead of a flat card grid, 5 stacked client
rooms instead of one card grid, a 3-step studio-setup download, an artist-monograph About, a proof
placard and a 3-rung CTA ladder that the default has no equivalent of, plus a 9th page. Nav labels,
home section order, page inventory and CTA ladder all diverge. Nothing here reads as a recoloured
template.

## Recommendations (ranked by impact)

1. Implement a visible 3-step nav emphasis ladder and correct plan row 1 (impact: medium, effort: low).
2. Wire the three seasonal motif SVGs into the `html[data-season=…]` rules, or delete them and record
   the deviation (impact: medium, effort: low).
3. Refresh `REGEN_PLAN.md` §5/§6 so the resolved contradictions are not re-litigated by the next
   reader (impact: low, effort: low).

## Evidence

- Field-by-field read of `brand-kits/abstract-canvas.js:1289-1519` against all 9 built pages,
  `css/*.css` and `js/main.js`; `grep` sweeps for `data-emphasis`, `seasonal/`, `data-palette`,
  anchor targets and canonical class names; browser checks of the toggle, the eggs, `?season=`, the
  mobile menu and the JS-disabled hero.
