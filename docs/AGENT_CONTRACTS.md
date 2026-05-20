# Agent Contracts

Every agent spawned by the pipeline in `HANDOFF_PROMPT.md` follows one of the contracts below. A contract is a hard interface — inputs, outputs, must-do, must-not-do, exit condition.

---

## Builder agent

**Goal**: Implement one website variant end-to-end.

**Inputs**:

- `phlix-server/docs/brand/brand_identity.md` (read only the assigned concept's section)
- `phlix-server/docs/brand/logo_concepts.md` (assigned concept)
- `phlix-server/docs/brand/dash_ui_prompts.md` (assigned concept)
- `phlix-server/docs/brand/svg_prompts.md` (assigned concept)
- `shared/content.json`
- `shared/data/brand-kits.json` (its variant entry)

**Outputs** under `variants/<NN>-<slug>/`:

- `index.html`, `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html`
- `css/{base.css, theme.css, components.css}`
- `js/main.js`
- `img/{logo.svg, og.svg or .png placeholder, favicon.svg, PROMPTS.md}`
- `VARIANT.md` (≤200 lines — what's distinctive, design decisions, gotchas)
- `BUILD_LOG.md` (chronological, ≤100 lines)

**MUST**:

- Render every page from `shared/content.json` — do not paraphrase marketing copy.
- Use brand tokens from `shared/data/brand-kits.json` exclusively for colors and fonts.
- Include `<html lang="en">`, a skip-link, visible focus styles, `prefers-reduced-motion` media query.
- Mark up navigation with `<nav>`, landmarks with `<main>`/`<header>`/`<footer>`, single `<h1>` per page.
- Include in every page's `<head>`: title (≤60 chars), meta description (≤160), Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`), Twitter card (`twitter:card=summary_large_image`), canonical link.
- Be responsive 320 → 1920 px without horizontal scroll. Touch targets ≥44 px.
- Pass `htmlhint`, `stylelint`, `eslint` with zero errors.
- Score Lighthouse Performance + Accessibility + Best Practices ≥90 each, locally, on `index.html`.

**MUST NOT**:

- Add a framework (React, Vue, Svelte, Alpine, jQuery, etc.).
- Add a bundler (Vite, Webpack, Parcel, esbuild config).
- Pull fonts or scripts from a third-party CDN at runtime. Self-host or inline.
- Introduce tracking / analytics / cookies.
- Invent colors, fonts, or copy not present in the source files above.

**Exit condition**: All 8 pages exist, all linters pass, `npm run build` succeeds for this variant.

---

## Reviewer agent (first pass — code review)

**Goal**: Audit one variant's implementation against the Builder contract.

**Inputs**: full source of `variants/<NN>-<slug>/`, plus the Builder contract above.

**Output**: `reviews/<NN>-<slug>/code-review.md` following the rubric template (`REVIEW_RUBRICS.md`).

**MUST flag** any of the following as ❌:

- Color or font outside the assigned brand kit
- Missing meta tag from the required head set
- HTML/CSS/JS lint error
- Missing alt text, label, or aria-\* on any interactive element
- Horizontal scroll at any tested viewport
- Hard-coded copy that doesn't exist in `content.json`
- Use of a banned dependency (frameworks, bundlers, runtime CDN)

**Exit**: writes the file. Does **not** apply fixes.

---

## Fixer agent

**Goal**: Resolve every ❌ in a review file.

**Inputs**: the variant's source + the most recent `<dimension>.md` review file.

**Outputs**:

- Edits to variant files
- Append a dated entry to `BUILD_LOG.md` listing each ❌ resolved and how

**MUST**:

- Address every ❌ before exiting.
- Re-run linters and confirm green.
- Not silently drop any ❌ — if one is infeasible, escalate via `BUILD_LOG.md` "BLOCKED" entry.

**MUST NOT**:

- Touch other variants.
- Rewrite `shared/content.json` (changes there must be coordinated separately).

**Exit**: linters green, all ❌ from input review either fixed or BLOCKED.

---

## Tester agent

**Goal**: Functional + UX QA pass on a variant.

**Checklist** (output as a table in `reviews/<NN>-<slug>/tester.md`, pass/fail per row):

- All 8 pages render
- Nav links go to the right page
- Footer links resolve (no 404, including external)
- Primary CTA above the fold on home
- Mobile menu opens and traps focus correctly
- Skip-link works (tab once, see it, hit enter)
- All images have alt text
- All forms (if any) have labels and validation messages
- Keyboard-only navigation reaches every interactive element in logical order
- `prefers-reduced-motion: reduce` disables animations
- Page weight per page ≤500 KB transferred

**Exit**: file written.

---

## Documenter agent

**Goal**: Confirm variant's local docs are accurate and useful.

**Inputs**: `VARIANT.md`, `BUILD_LOG.md`, `img/PROMPTS.md`, root `README.md`.

**Output**: `reviews/<NN>-<slug>/documenter.md` — pass/fail per:

- `VARIANT.md` describes what's distinctive in ≤200 lines, no dead links
- `BUILD_LOG.md` shows each implementation phase / fix round
- `img/PROMPTS.md` has one entry per image asset with resolution, aspect, full prompt
- Root `README.md` variant table row is accurate

**Exit**: file written; may edit `README.md` table row if wrong.

---

## Dimension-reviewer agents (Phase R3, ×10)

Each reviewer writes one file under `reviews/<NN>-<slug>/<dimension>.md`. They follow `REVIEW_RUBRICS.md` strictly — same headers, same scoring scale, same severity icons. Dimensions:

- accessibility
- usability
- responsive
- performance
- localization
- cta-funnel
- content-quality
- social-metadata
- seo
- branding-consistency

**Each MUST**: follow its rubric and emit ✅/⚠️/❌ findings + a 0–100 score + ranked recommendations.

**Each MUST NOT**: apply fixes, edit variant source, or rewrite another reviewer's file.

---

## Collator agent

**Goal**: Synthesize one round of reviews into an action plan.

**Inputs**: every file in `reviews/<NN>-<slug>/` for this round.

**Output**: `reviews/<NN>-<slug>/ROUND-<N>-SUMMARY.md` with:

- Aggregate weighted score (weights in `REVIEW_RUBRICS.md`)
- Top-10 ranked issues across all dimensions
- Improvement plan — numbered tasks, each with: file path, what to change, acceptance criterion, est. lines

**Exit**: file written.

---

## Improvement agent

Identical interface to **Fixer**, but reads the round summary's improvement plan instead of a single review file. Implements items 1..N from the plan, in order, until done or blocked.

---

## Comparator agent (one-shot, end of project)

**Goal**: Cross-variant analysis.

**Inputs**: all `ROUND-*-SUMMARY.md` files across all variants.

**Output**: `reviews/COMPARISON.md` containing:

- Strengths and weaknesses per variant
- Likely audience fit per variant
- Recommended primary variant (with reasoning)
- "Hypothetical v2": which ideas from each variant would compose into a single best site

**Exit**: file written.
