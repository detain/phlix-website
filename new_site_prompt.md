You are a senior front-end designer + build engineer for **Phlix**, a
self-hostable PHP media server. Your job: take **one brand kit** and generate a
complete, brand-faithful, production-quality **brand-kit site** — the flagship
Phlix marketing site rendered entirely in that kit's identity — then drive it
through an adversarial multi-perspective review loop until it has **zero
defects**.

The **name of the brand kit to build is on the last line of this message**,
after the trailing blank line (e.g. `neon-noir`, `dia-de-muertos`,
`color-brutalist`). Resolve it to `phlix-website/brand-kits/<name>.js`. If it
isn't found, list `brand-kits/*.js`, pick the closest slug match, and state which
you chose.

---

## STEP 0 — Read your inputs (do this first, do not skip)

1. `phlix-website/brand-kits/<name>.js` — the brand kit you are building from.
2. `brand_kit_schema.js` (repo root, one level above `phlix-website/`) — the full
   field-by-field schema reference (what every field means + its allowed values).
3. `phlix-website/new_site.md` — the **site scaffold rulebook**: file layout, the
   8 pages, the shared HTML shell, common nav/footer links, SEO/social/a11y/perf
   gates, and the Definition of Done. **The structure of the site is defined
   there; this prompt defines how the kit drives the look, feel, and copy.**
4. `phlix-website/shared/content.json` — the fixed marketing copy (do not invent
   product claims; pull feature/clients/faq/footer copy from here).
5. Skim `tools/render.mjs` for the canonical section/class names and the shared
   shell markup the CSS/reviews expect.

Then parse the kit object. The current kits are all `metadata.kit_type: "base"`
(complete, standalone identities). If you are ever handed a `"variation"` kit,
first load its `base_kit.slug`, then apply the variation's `overrides` and its
`sub_name`/`variation` fields on top of the base before building.

---

## STEP 1 — Map EVERY brand-kit field to a site decision

Walk the kit top to bottom. Every field below changes something concrete about
the site. Use them all; nothing in the kit is decorative.

### 1 · Identity
- **name** → the visual brand name shown in the logo lockup and the design theme
  of the whole site (the product is still "Phlix"; the kit name is the _identity_
  Phlix is dressed in). Put it in `<title>` flavor, `SITE.md`, and the logo.
- **slug** → the `sites/<slug>/` folder name and all canonical URL paths.
- **version**, **description** → `SITE.md` header + `BUILD_LOG.md`.
- **inspiration[]** → the moodboard you design toward; seed art/illustration
  prompts and the hero/background concept in `img/PROMPTS.md`.
- **keywords[]** → texture for `img/PROMPTS.md` prompts and CSS class-naming
  flavor (not the `<meta keywords>`, which stays from `content.json`).

### 2 · Personality
- **personality[]** + **emotional_goals[]** → set the overall _feel_: spacing
  generosity, contrast intensity, motion energy, copy warmth. (e.g. "Mysterious,
  Sophisticated" → restrained, high-contrast, slow reveals; "Playful, Warm" →
  rounded, bouncy, bright.)
- **archetype** → the editorial stance of micro-copy and hero framing (Outlaw →
  bold/defiant; Everyman → friendly/plain; Magician → wonder; Sage → authoritative).
- **audience[]** → reading level and density of the page; who the imagery casts.

### 3 · Brand story
- **story** → the narrative backdrop for `SITE.md` and the About-page tone;
  source of tasteful metaphor.
- **tagline_primary** → the hero **visual headline overlay** / `og` title flavor
  and the logo lockup tagline. (The factual `hero.headline` from `content.json`
  remains the semantic `<h1>`; the tagline is brand dressing around it.)
- **tagline_secondary[]** → rotating use in CTA banners, the footer tagline area,
  and section eyebrows.
- **mission**, **values[]** → About page "Philosophy" flavor; never overrides
  the BSD-3/self-host facts.

### 4 · Brand DNA & principles
- **brand_dna** → prepend mentally to every design decision; the 2–3 sentence
  identity primer. Put a condensed form atop `SITE.md`.
- **design_principles[]** → **hard constraints** on layout/composition. Obey each
  literally (e.g. "Darkness is canvas" → dark sections dominate; "Round every
  corner" → no sharp edges anywhere).
- **brand_opposites[]** → an **anti-checklist**. If any built screen drifts
  toward these, it's a defect. Feed into the review loop as "spirit" criteria.
- **signature_elements[]** → recurring motifs you must work into the artwork,
  dividers, backgrounds, or section accents so the site reads instantly as this
  brand.
- **header_motif** → the hero/header signature treatment (animated or static) —
  build it in CSS/SVG (respecting reduced-motion).

### 5 · Visual identity
- **visual_style[]** → the master art-direction tags; drive CSS texture, gradient
  use, and SVG style.
- **art_direction** (prose) → **the single most important field** for all imagery
  and the overall composition; follow it closely in `img/PROMPTS.md` and in
  background/hero CSS.
- **realism** → asset strategy: `illustrated`/`flat`/`vector` → SVG/CSS art;
  `photorealistic`/`semi_realistic` → photographic OG/hero (still self-hosted).
- **rendering_style[]**, **texture_level**, **depth** → CSS surface treatment:
  grain/halftone overlays, flat vs layered shadows, `none/subtle/medium/heavy`
  texture intensity, and `flat/slightly_layered/layered/3d` elevation.
- **lighting{temperature,quality,shadows,contrast,notes}** → gradient direction &
  warmth, glow/halation effects, and shadow softness/contrast in `box-shadow`.
- **composition[]** → hero/section framing (centered vs asymmetric, breathing
  room, single focal subject).

### 6 · Color system → **the CSS token foundation**
- **colors{}** semantic roles (`primary, secondary, tertiary, neutral,
  background, surface, surface_alt, text, success, warning, error, info, focus,
  border, shadow, overlay`) → map **directly** into `:root` CSS variables in
  `base.css`. Use the role for its semantic purpose (primary = main CTA, error =
  destructive, focus = focus ring, etc.). Honor each swatch's `usage` and
  `contrast_targets`.
- **colors.gradients[]** (`{name,type,angle,stops,usage}`) → ready-made CSS
  gradients for hero backdrops, banners, glows.
- **color_rules[]** → **hard rules** (e.g. "max 3 accent colors per view",
  "backgrounds always cream", "shadows warm-tinted"). Obey them; a violation is a
  review defect. **Re-verify contrast** for any swatch the kit notes as
  text-unsafe.

### 7 · Typography
- **fonts{headline,display,body,ui,mono,number}** each `{family,weight[],
  fallbacks[],usage,tracking,line_height}` → define `--font-*` tokens and
  `@font-face` (self-hosted WOFF2, `font-display: swap`). Apply each role to its
  `usage`. Use the kit's `fallbacks[]` as the CSS fallback stack and `tracking`/
  `line_height` exactly.
- **typography_rules[]** → enforce (e.g. "never italic headlines", "ALL CAPS only
  on buttons/labels", "body line-length 60–75ch").

### 8 · Shapes
- **shape_language[]** → the vocabulary for cards, buttons, dividers, clip-paths
  (e.g. ticket-stub notches, film-strip perforations, hard rectangles).
- **corner_radius{small,medium,large,xl,pill}** → `--radius-*` tokens; use
  consistently (0px brutalist vs pill-rounded cozy).
- **borders{thickness,style,rounded,hand_drawn,notes}** → default stroke width,
  style, and whether borders follow the radius / look hand-inked.

### 9 · Iconography
- **icon_style[]** + **icon_rules[]** → how the inline feature-icon SVGs look
  (stroke weight, caps/joins, outlined vs filled, sharp vs rounded). Render the 7
  feature icons + nav/utility icons to match. No icon-font CDNs.

### 10 · Illustration
- **illustration_style[]** → the look of hero/section artwork.
- **character_style{}** → if you draw figures, their proportions/eyes/expression/
  clothing/outlines.
- **mascot** (object **or `null`**) → if present, optionally feature it in the
  hero or empty/“about” spots and in `img/PROMPTS.md`; if `null`, **do not invent
  a mascot** (that itself is a brand statement — respect it).

### 11 · Photography
- **photography_style[]** + **photo_rules[]** → grade/treatment for any
  photographic assets (OG image, hero) — temperature, grain, do/don't (e.g.
  "never HDR", "never cool lighting").

### 12 · Motion
- **motion_style[]**, **transitions[]**, **animation_speed** (`slow|medium|fast`),
  **easing[]** → the CSS transition/animation system: durations, easing curves
  (`spring`/`elastic` → springy; `steps(1)` → instant/brutalist), and the
  transition vocabulary (fade, slide, scale, flicker, film-burn…).
- **microinteractions{hover,button_press,loading,drag,focus,success}** → build
  these exact behaviors for cards/buttons/forms (all gated by reduced-motion).

### 13 · UI system
- **ui_style[]** → overall component mood.
- **spacing_scale[]** → the **only** allowed spacing steps → `--space-*` tokens;
  use nothing off-scale.
- **shadows{sm,md,lg,notes}** → `--shadow-*` tokens (warm/cool/hard per notes).
- **cards{elevation,padding,border_radius,border,background,notes}** → the
  `.feature-card`/`.client-card`/`.download-card` base style.
- **buttons{primary,secondary,danger,ghost,link,icon,fab}** → `.btn` variants
  (bg/text/radius/notes). Primary CTA = the kit's primary button spec.
- **forms{}**, **tables{}**, **navigation{sidebar,topbar,tabs,breadcrumbs}** →
  style the (minimal) form bits, any tables, and the header nav / mobile menu to
  match. Use `navigation.topbar` for the site header treatment.
- **dashboard_style**, **component_styles{dialog,sidebar,carousel,search_bar,
  media_player,toast,chip}** → reuse the relevant ones (e.g. `carousel` →
  features rail; `chip` → client highlights/badges; `search_bar` style if you add
  a search affordance).
- **layout_patterns{landing,detail_view,media_library,dashboard,settings,
  authentication}** → **`layout_patterns.landing` directly informs the home-page
  composition**; the others inform sub-page rhythm.

### 14 · Media identity (Phlix is a media server — lean in)
- **poster_style**, **thumbnail_style**, **backdrop_style**, **media_cards**,
  **badges{labels,shape,colors,typography}** → style any media-mockup imagery,
  the feature-card art, and status badges (e.g. client `status` pills, "4K/HDR"
  style chips). Use `badges.labels` as the allowed badge vocabulary.

### 15 · Copywriting → **drives all micro-copy** (not the factual body copy)
- **voice[]** + **tone[]** + **writing_style** → rewrite **micro-copy** in the
  kit's voice: hero eyebrow, section eyebrows, button labels, CTA-banner
  headings, captions, alt text, the 404/empty asides. Keep `content.json`'s
  factual feature/FAQ bodies intact.
- **vocabulary[]** → preferred words to weave into micro-copy.
- **avoid_words[]** → **never** use these (corporate jargon etc.); flag in review.
- **greetings[]**, **empty_state_messages[]** → use for any greeting/empty/aside
  slots.
- **notification_style** → tone of any toast/inline-validation copy.

### 16 · AI generation guidance → fills `img/PROMPTS.md`
- **image_prompt_prefix** + **image_prompt_suffix** + **negative_prompt[]** →
  build every image prompt as `prefix + subject + suffix`, with `negative_prompt`
  as the avoid-list. Record each asset's prompt in `img/PROMPTS.md`.
- **ui_generation_rules[]** + **page_generation_rules[]** → **direct build
  rules** for the pages/components — obey literally (max widths, "CTA always X",
  corner minimums, accent caps).
- **logo_rules{shape,complexity,negative_space,colors,allowed_symbols,
  forbidden_symbols}** → design `img/logo.svg` within these (use only allowed
  symbols; never the forbidden ones).
- **illustration_prompt_template**, **prompt_library{logo,illustration,icon,
  background,landing_page,dashboard,marketing}** → reuse these templates verbatim
  (with substitutions) in `img/PROMPTS.md`.

### 17 · Design tokens
- **design_tokens{color,spacing,radius,typography,shadow}** → the **canonical
  flat token names** (`--color-primary`, `--space-4`, `--radius-lg`,
  `--font-headline`, `--shadow-md`, …). Emit these exact CSS custom properties in
  `base.css` so the site compiles straight from the kit. Where `design_tokens`
  and the richer blocks differ, `design_tokens` wins for the variable values.

### 18 · Responsive behavior
- **responsive_behavior{desktop,tablet,tv,mobile}** → the per-breakpoint layout
  rules. Phlix runs on TV too — if the kit gives `tv` guidance (big type,
  focus-driven, bold focus rings), reflect it at large breakpoints.

### 19 · Sound identity
- **sound_identity{}** → **do not** add audio to the static site. Record it in
  `SITE.md` as brand context only.

### 20 · Seasonal variants
- **seasonal_variants[]** (`{name,active_range,overrides,motif}`) → **do not**
  auto-apply. Document them in `SITE.md`; optionally emit commented-out
  override token blocks in `theme.css` for future use.

### 21 · Accessibility
- **accessibility{minimum_contrast,focus_style,touch_target,motion_reduction,
  font_scaling}** → **hard commitments** layered on top of `new_site.md` §12.
  Implement `focus_style` exactly, meet `touch_target`, honor `motion_reduction`,
  and survive the stated zoom. These are non-negotiable.

### 22 · Do / Don't
- **do_dont{colors,typography,layout,animation,imagery,branding,icons,
  copywriting,ux,performance}** → the per-category guardrails with reasons.
  Treat the **do** list as a checklist and the **don't** list as defects. This is
  a primary input to the review loop's "brand spirit" dimension.

### 23 · Metadata
- **metadata{}** → record `author/created/updated/license/schema_version` in
  `BUILD_LOG.md`. Respect `license` for any usage notes.

**Derive the layout archetype** from the kit (don't pick at random): read
`visual_style`, `layout_patterns.landing`, `composition`, `depth`, and
`ui_style` and choose one of: `immersive` (full-bleed/cinematic/glow),
`editorial` (asymmetric/magazine), `grid` (systematic/modular/brutalist),
`card` (friendly card-forward), `minimal` (ultra-spare), or `showcase`
(media-forward). State your choice and why in `BUILD_LOG.md`.

---

## STEP 2 — Build the site

Following `new_site.md` exactly:
1. Create `sites/<slug>/` with the full file inventory (§1 of new_site.md).
2. Author `base.css` (token `:root` from §6/§13/§17), `theme.css` (type + layout
   + archetype), `components.css` (shell/buttons/cards/badges/etc.).
3. Pre-render all **8 standalone HTML pages** (index, features, clients,
   download, plugins, docs, hub, about) with the shared shell, canonical section
   classes, complete `<head>` (SEO §10 + social §11), one `<h1>` each,
   `aria-current` nav, skip-link, landmarks.
4. Write `js/main.js` (nav toggle, reduced-motion, optional scroll reveals).
5. Produce `img/logo.svg`, `img/favicon.svg`, `img/og.(svg→)png`, the 7 inline
   feature-icon SVGs, and `img/PROMPTS.md`.
6. Emit `robots.txt`, `sitemap.xml` (absolute URLs), `SITE.md`, `BUILD_LOG.md`.
7. Sanity-check: `npm run lint`, `npm run linkcheck`, `npm run a11y`. Fix
   anything red before review. (If the build/dev scanners still point at the
   legacy `variants/` dir, note it in `BUILD_LOG.md` per new_site.md §17.)

---

## STEP 3 — Adversarial review loop (repeat until clean)

Spawn a **fresh reviewer agent** (use the Agent tool — `general-purpose` or
`code-reviewer`) that has **not** seen your build reasoning, and have it review
the built `sites/<slug>/` from **each** of these perspectives. Give it the brand
kit, `new_site.md`, and `content.json` as ground truth. Reviewers must cite
`file:line`, score each dimension **0–100**, and mark severity ✅ / ⚠️ / ❌
(per `docs/REVIEW_RUBRICS.md`). Write findings to `reviews/<slug>/<dimension>.md`.

Review dimensions (run all; you may batch related ones per agent):

1. **Brand fidelity & spirit** — does every color/font/shape/motion/icon/voice
   trace to the kit? Are `design_principles` honored and `brand_opposites` /
   `do_dont.dont` avoided? Does it _feel_ like the kit, or has it drifted toward
   a generic template? (Divergence from the kit's spirit = ❌.)
2. **SEO** — titles ≤60, descriptions ≤160, one H1, heading order, canonical,
   JSON-LD, sitemap/robots, descriptive anchors.
3. **Readability** — reading level fits `audience`; line length; scannability;
   contrast; no walls of text; clear hierarchy.
4. **Spelling & grammar** — zero typos; consistent tense/voice; no `avoid_words`.
5. **Usability** — Nielsen heuristics; download reachable in ≤2 clicks; mobile
   nav; no traps; obvious primary action.
6. **Accessibility** — WCAG 2.2 AA (contrast, keyboard, focus, alt, labels,
   landmarks, reduced-motion, 44px targets, 200% zoom).
7. **Responsive** — 320→1920, no horizontal scroll, readable on phones.
8. **Performance** — budgets (§13 new_site.md): self-hosted fonts, no CDNs,
   deferred JS, image weight, CLS.
9. **Content accuracy** — every claim matches the Phlix facts (§16 new_site.md);
   nothing invented; `content.json` copy intact.
10. **CTA / funnel** — primary CTA above the fold, ≥3:1, secondary de-emphasized.
11. **Social metadata** — OG + Twitter complete and **absolute** URLs.
12. **Localization** — `lang`, strings centralized, logical properties.

Then: **apply every ❌ and reasonable ⚠️**, and re-run the relevant reviewers.
**Loop** until a full round produces **no ❌, no spelling/grammar errors, and no
dimension below 90** (per the rubric exit bar). Summarize the final state and the
fixes applied in `BUILD_LOG.md` and a `reviews/<slug>/FINAL-REVIEW.md`.

## Done when

All Definition-of-Done gates in `new_site.md` §18 are green, the review loop is
clean, and `npm run lint && npm run linkcheck && npm run a11y` pass. Report: the
site path, the chosen layout archetype, the palette/type used, and a one-line
summary of each review dimension's final score.

The brand kit to build is named on the next line:
