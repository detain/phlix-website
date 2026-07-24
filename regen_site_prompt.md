You are a senior front-end designer + build engineer for **Phlix**, a
self-hostable PHP media server. Your job: **regenerate one existing brand-kit
site** so that it actually implements its kit's *experience* schema, then drive it
through the adversarial review loop until it has zero defects.

The **kit slug is on the last line of this message**. Resolve it to
`phlix-website/brand-kits/<slug>.js`.

This prompt is the **regeneration** variant of `new_site_prompt.md`. Everything in
that prompt — the full field-by-field mapping in its STEP 1, the build order in its
STEP 2, and the 13 review dimensions in its STEP 3 — **still applies verbatim**.
Read it. This file only states what is *different* when a site already exists.

---

## The situation

`sites/<slug>/` already exists and was authored on 2026-07-04. Its kit gained 21
**experience** fields on 2026-07-13 that the existing site knows nothing about. The
existing site is therefore a **generic-template rendering** of the kit: correct
colours and fonts, but the same nav, same section order, and same copy skeleton as
the other 49 sites.

**You are replacing it, not editing it.** Read `plan_site_regen.md` §1 for the full
drift measurement.

---

## STEP 0 — Read your inputs

Everything in `new_site_prompt.md` STEP 0, plus:

6. **`new_site.md` §2A** — the experience-override DO-table. This is the heart of
   this pass. For each field the kit declares, §2A states exactly what to change.
7. **The existing `sites/<slug>/`** — read `index.html`, `SITE.md`, and
   `BUILD_LOG.md`. Treat this as **prior art to beat**: inventory what it already
   gets right (palette, tokens, icon set, logo, imagery, working `@font-face`) so
   you carry that forward rather than regressing it, and note where it defaulted to
   the shared template so you know what must change.
8. **`reviews/<slug>/FINAL-REVIEW.md`** if present — the defects a previous
   reviewer already caught. Do not reintroduce them.

---

## STEP 1 — Build the change manifest FIRST (do this before writing any code)

Before touching a file, write `sites/<slug>/REGEN_PLAN.md` containing:

1. **Every experience field the kit declares**, and for each: what the current site
   does, what the field requires, and the concrete change. Fields the kit does
   **not** declare: state "absent → keep default" (absence is never a defect).
2. **The nav diff** — current labels/order versus `site_architecture.nav`, plus any
   pages demoted to the footer and every `extra_pages` entry to create.
3. **The home-page section order diff** — current versus `homepage_narrative.sections[]`.
4. **The carry-forward list** — what you are deliberately keeping from the existing
   site, and why.

This manifest is the thing a reviewer checks your output against, so make it
specific and honest. If a field is ambiguous, say so here rather than guessing
silently.

---

## STEP 2 — Rebuild

Follow `new_site_prompt.md` STEP 2 and the `new_site.md` rulebook, with these
regeneration-specific rules:

- **Nine pages now**, not eight: the 8 canonical pages + **`404.html`** (new_site.md
  §2A). Plus every `site_architecture.extra_pages` entry the kit declares.
- **`404.html`** realises `error_page_experience.concept` as real content — the
  field is a design brief, do not print it verbatim. Same shared shell, **relative**
  asset paths, `<meta name="robots" content="noindex">`, and every
  `error_page_experience.recovery_links` entry offered. The root `404.html` shim
  injects a `<base>`, so relative paths resolve from any depth — no `../` walking,
  no absolute asset paths.
- **Fonts must resolve.** Every `@font-face` `src` must point at a WOFF2 that
  exists in the repo, and there must be **zero external font requests** (no
  `fonts.googleapis.com`, no CDN — new_site.md §7 and the CSP both forbid it).
  Follow the font policy in `new_site.md` §7. If the kit's named families are not
  available as local files, **stop and escalate to the orchestrator** — do not
  silently fall back to system fonts and do not add a CDN link. 45 of 50 sites got
  this wrong on the first pass; see `plan_site_regen.md` §0.4.
- **Do not edit shared files.** `shared/content.json`, `new_site.md`, the root
  `index.html` / `404.html`, `package.json`, and `tools/**` are **read-only** to
  you. Other agents are regenerating other kits concurrently. If your kit needs a
  shared change, write it in `REGEN_PLAN.md` and escalate.
- **Stay in your directory.** Write only inside `sites/<slug>/` and
  `reviews/<slug>/`.
- **Do not run `git` or `gh`.** The orchestrator handles branches, commits, and
  pushes. Do not commit; leave your work in the tree.

---

## STEP 3 — Adversarial review loop

Exactly as `new_site_prompt.md` STEP 3 (all 13 dimensions, fresh reviewer that has
not seen your build reasoning, cite `file:line`, score 0–100, ✅/⚠️/❌, loop until
no ❌ and nothing below 90).

Add two regeneration-specific checks the reviewer must run:

14. **Manifest compliance** — does the built site do what `REGEN_PLAN.md` said it
    would? Every row of the change manifest verified against the output. A row
    claimed-but-not-done is a ❌.
15. **Anti-convergence** — put the regenerated site next to *any other* kit's site.
    Is the difference structural (nav, section order, page inventory, funnel), or
    only cosmetic (colours and fonts)? **Cosmetic-only is a ❌** — that is the exact
    failure this whole program exists to fix.

---

## Done when

`new_site.md` §18 is green, `plan_site_regen.md` §5 is satisfied, the review loop is
clean, and `npm run lint && npm run linkcheck && npm run a11y` pass for your site.

Report back: the site path, the layout archetype used, which experience fields were
declared versus implemented, what you carried forward from the old site, anything
you escalated, and each review dimension's final score.

The kit to regenerate is named on the next line:
