# Branding Consistency Review — Abstract Canvas

**Variant**: abstract-canvas
**Round**: 1 (regen pass, `regen/wave-1`)
**Reviewer**: adversarial reviewer (independent)
**Date**: 2026-07-24

## Score

- **Branding Consistency**: 88 / 100

## ✅ Passed

- **Tokens are transcribed exactly** from `design_tokens` (`css/base.css:29-131`) — 14 colours, 9
  spacing steps, 5 radii, 5 type roles, 6 shadows, plus the kit's tracking/leading values as
  variables. Every shadow is the warm umber recipe from `shadows{}`; none are cold or blue.
- **Palette discipline**: backgrounds are only linen / cream / aged ground — no `#FFFFFF`, nothing
  cold, nothing dark (`do_dont.colors.dont` respected). Primary CTA is carbon black with
  gallery-linen text per `buttons.primary`; the secondary is the cadmium *outline*, not a fill.
- **Signature elements are actually present, not just described**: the linen canvas grain
  (`css/base.css:151-161`), the colour-field band divider (`css/theme.css:147-156`), the palette-knife
  scrape rule (`:159-172`), Rothko floating blocks + a gestural stroke in the hero (`:274-306`),
  gestural marks in the logo, and Palette as a real on-page companion.
- **Type roles match the kit**: Cormorant Garamond 600/700 for headings and nav (the
  `navigation_model` override over `fonts.ui`, resolved and recorded in `REGEN_PLAN` A7), Lora for
  reading, Inter for buttons/labels/chips/eyebrows, JetBrains Mono for code and the technical marks,
  Bebas **uppercase only** for numerals (`css/theme.css:16-28`). No geometric sans headline anywhere;
  no all-caps body copy; headline tracking is the declared −0.01em.
- **Editorial archetype is visible, not asserted**: margin numerals I–IV, left-aligned wall text at a
  ≤68ch measure, alternating linen/cream rooms, band breaks, no centred section titles, no inline
  `style=` (the predecessor's `text-align:center` hack is gone — `text-align:center` now survives only
  inside `.btn`).
- **Motion is on-brand**: 250–420ms, the kit's own cubic-béziers, no spring/bounce/elastic anywhere,
  card hover = 2px cadmium top border + 2px lift + umber shadow exactly as `microinteractions.hover`
  specifies, button press yields 1px, focus ring is the declared ultramarine + halo.
- **Logo obeys `logo_rules`**: stretcher frame + colour-field rectangles + gestural marks; the
  forbidden play-triangle, gears, glows and photorealism are all absent; carbon wordmark on linen with
  a single cadmium accent; the Georgia substitution inside `<img>` is documented in `PROMPTS.md`.
- Icons are outlined 1.75px with rounded caps in carbon black (not cadmium) — `icon_rules` respected,
  and the predecessor's cadmium-icon overuse was not reintroduced.

## ⚠️ Concerns (non-blocking)

- **No italic face exists in the shared pool**, so all 11 `font-style: italic` rules render as
  synthetic oblique — including the manifesto, the footer tagline, the five station talks, the proof
  quote and every caption. `typography_rules` explicitly asks for "Cormorant Garamond italic", and a
  faux-slanted high-contrast serif is visibly not that. Orchestrator-owned (§19.3) —
  `REGEN_PLAN.md:206` wrongly concluded no font work was needed. — ROUND-1 #16.
- **Two off-token hex values**: `#2a2a2a` (`css/components.css:245-246`, `.btn-primary:hover`) and
  `#3A3128` (`img/logo.svg` umber mark). Plausible mixes, but `SITE.md`'s derived-pigment table lists
  four tokens, not six — document or replace. — ROUND-1 #17.
- **Cadmium frequency** is at the edge of `do_dont.colors.dont` ("scatter cadmium red across multiple
  elements"): ~12 red marks on the home page, of which **seven** are identical `.wall-label-no`
  catalogue numerals and three are consecutive `.proof-links` anchors. Defensible —
  `colors.secondary.usage` licenses links and emphasis, and the primary CTA is correctly carbon — but
  the repetition reads decorative. Suggest demoting `.wall-label-no` to `--color-neutral-ink`.
  — ROUND-1 #25.
- The kit's own contrast arithmetic is wrong in four places; the site's derived mixes are the right
  answer and are documented as mixes in `SITE.md:51-64`. Escalation to the kit file stays open.
  — ROUND-1 #15.

## ❌ Failures (must fix this round)

- None in this dimension. (The nav-`emphasis` defect is graded under Experience Fidelity, and the
  clipped hero headline under Accessibility/Responsive.)

## Recommendations (ranked by impact)

1. Escalate a Cormorant Garamond italic (and ideally Lora italic) into `shared/assets/fonts/` — this
   is the largest remaining gap between the kit's stated typography and what renders (impact: medium,
   effort: orchestrator-side).
2. Demote the seven wall-label numerals out of cadmium so red carries emphasis again (impact: medium,
   effort: trivial).
3. Add `#2a2a2a` / `#3A3128` to the `SITE.md` mix table or replace them with tokens (impact: low,
   effort: trivial).

## Evidence

- Line-by-line diff of `css/base.css` `:root` against `brand-kits/abstract-canvas.js` §17
  `design_tokens`; audit of every `font-family`, `font-style`, `font-weight`, easing, duration,
  shadow and radius against §7/§8/§12/§13 of the kit.
- `ls shared/assets/fonts | grep -i italic` → empty (whole pool is roman-only).
- Full-page desktop and 320px renders of all 9 pages (`reviews/abstract-canvas/shots/`).
