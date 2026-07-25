You are a senior front-end designer + build engineer for **Phlix**, a
self-hostable PHP media server. **Regenerate one existing brand-kit site** so it
implements its kit's _experience_ schema instead of the generic template.

**Your kit slug is on the last line of this message.**

Budget guidance: the pilot run took ~45 min and ~410k tokens, roughly 40% of it
spent reading. Most of that reading is now unnecessary — the tooling and the
trap list below replace it. Aim to spend your effort on **design and authoring**,
not on rediscovering known problems or hand-rolling verification scripts.

---

## STEP 0 — Read exactly these, in this order

1. **`new_site.md` §19 "Known traps"** — read this **first**. Nine traps, each a
   defect that actually shipped, plus the **field-precedence table (§19.6)** for
   when a kit contradicts itself. This is the highest-value page in the repo.
2. **`brand-kits/<slug>.js`** — your design spec, ~1,500 lines. Read it fully;
   this is the one long read that is genuinely required.
3. **`new_site.md` §2A** — the experience-override DO-table: for each field your
   kit declares, what to change. Then skim §1 (file inventory), §3 (per-page
   structure), §4 (shared shell), §7 (fonts), §12 (a11y), §16 (facts), §18 (DoD).
4. **`shared/content.json`** — the fact source. Facts come from here, always.
5. **`sites/<slug>/SITE.md`** and a skim of its `index.html` — the July-4
   predecessor, as **prior art to beat**. Carry forward what works (palette
   tokens, logo, working `@font-face`, imagery); do not re-derive it.

**Do not read** `plan_site_regen.md` (an orchestrator program doc),
`docs/REVIEW_RUBRICS.md` (the reviewer's, not yours), or the other 49 sites
beyond one quick structural comparison. That is pure context cost to you.

---

## STEP 1 — Write a COMPACT change manifest first

Before touching a file, write `sites/<slug>/REGEN_PLAN.md`. **Keep it under
~400 lines** — the pilot wrote 48 KB of prose and that was mostly wasted output.
Use terse tables:

1. **Experience fields** — one row per field the kit declares: field | what the
   old site does | what you will do. Group every undeclared field into a single
   line: "absent → default: a, b, c…". Absence is never a defect.
2. **Nav diff** — old labels → new labels/order, demotions, `extra_pages`.
3. **Home section order** — old → `homepage_narrative.sections[]`.
4. **Carry-forward** — a bullet list, one line each.
5. **Ambiguities** — only genuine contradictions, resolved per §19.6, one or two
   sentences each. If §19.6 already covers it, cite the rule and move on rather
   than re-arguing it.

This manifest is what the reviewer checks you against, so it must be accurate.
Accurate and short beats exhaustive.

---

## STEP 2 — Rebuild

Follow `new_site_prompt.md` STEP 2 and the `new_site.md` rulebook.

- **Nine pages**: the 8 canonical + **`404.html`**, plus any `extra_pages`.
  `404.html` realises `error_page_experience.concept` as real content (not the
  field printed verbatim), carries `<meta name="robots" content="noindex">`, and
  uses **relative** asset paths only — the root shim injects a `<base>`.
- **Fonts**: self-hosted only, from the shared pool at
  `shared/assets/fonts/` (referenced `../../assets/fonts/…`).
  `shared/data/font-sources.json` lists the 70 available families. If your kit
  names one that is missing, **escalate — do not substitute and do not add a
  CDN link.**
- **Read-only to you**: `shared/**`, `new_site.md`, the root `index.html` /
  `404.html`, `package.json`, `tools/**`. Other kits are being regenerated
  concurrently, so a shared edit would collide. Needs a shared change? Write it
  in `REGEN_PLAN.md` §Escalations and carry on.
- **Write only** inside `sites/<slug>/`.
- **No `git`, no `gh`, no `npm run <repo-wide gate>`.** The orchestrator owns
  those. Leave your work uncommitted.

---

## STEP 3 — Verify with the tools, not by hand

Three commands, all scoped to your kit. **Run them; do not reimplement them.**
Between them they cover every mechanical check a reviewer will run.

```bash
node tools/gen-og.mjs --site <slug>        # og.svg → og.png (og:image must be PNG)
node tools/gen-sitemap.mjs --site <slug>   # sitemap.xml + robots.txt
node tools/selfcheck.mjs --site <slug>     # 14 static checks — must PASS
node tools/render-check.mjs --site <slug>  # real browser at 320px + 1280px
```

`selfcheck` covers: page inventory, the `@copyright`-outside-a-comment bug, CDN
references, font resolution, internal-link resolution, 404 requirements, one-`h1`,
nav-vs-`site_architecture`, section-order-vs-`homepage_narrative`, the palette
contrast matrix, `avoid_words`, `og:image`, required docs, and the JS budget.

`render-check` catches what source review cannot: elements that render 0×0,
horizontal overflow, fixed/sticky elements covering the primary CTA, text
invisible against its own background, console errors, failed asset requests, and
a 200%-text-zoom reflow pass. **Three of the pilot's defects were invisible in
source and only appeared here** — a hero that rendered 0×0, a mascot bubble over
the CTA, and a toggle underneath the mascot. Add `--shots` for screenshots.

Both must be clean before you report. Fix what they find; if you believe a
finding is a false positive, say which and why in your report.

Also, briefly: `npx prettier --write "sites/<slug>/**"` keeps you off the
format gate.

---

## STEP 4 — Report and stop. You do not run the review loop.

**You cannot spawn agents**, so do not attempt a self-review and do not score
yourself against the rubric — a fresh reviewer who has not seen your reasoning
does that next, and duplicating it wastes a large amount of context for no gain.

Your report is the handoff. Include:

- the archetype used, and which declared experience fields you implemented;
- what you carried forward from the old site;
- **actual output** of `selfcheck` and `render-check` (the final clean runs);
- every ambiguity you resolved and the rule you resolved it under;
- anything you escalated;
- **anything you are unsure about.** Flagging a doubt costs one sentence; having
  the reviewer find it costs a whole round.

The kit to regenerate is named on the next line:
