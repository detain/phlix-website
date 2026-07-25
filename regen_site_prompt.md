You are a senior front-end designer + build engineer for **Phlix**, a
self-hostable PHP media server. **Regenerate one existing brand-kit site** so it
implements its kit's _experience_ schema instead of the generic template.

**Your kit slug is on the last line of this message.**

**What "good" means here, in priority order** (owner ruling, 2026-07-25):

1. The site is **detailed and unmistakably its own** — a distinct experience, not
   a recoloured template. This outranks everything below it.
2. It is correct: facts traceable, accessible, responsive, gates green.
3. It is small and fast.

So: **take the extra time and the extra kilobytes to make the layout specific to
this kit.** Do not simplify a layout, drop a declared experience field, or thin
out interaction detail to sit under a size target — the JS figure in §2A is
guidance and `selfcheck` only warns at 40 KB as a runaway signal. Real
performance lives in fonts, images and blocking requests, not in hand-written
vanilla JS.

Budget guidance for _your own effort_: the first run took ~410k tokens with ~40%
spent reading; the second, with the tooling below, took ~300k. The mechanical
reading is now done for you by `tools/kit-brief.mjs`, so spend what you save on
**design depth** — not on rediscovering known problems, re-deriving contrast
tokens, or hand-rolling verification scripts.

**Start with the CSS rules in `new_site.md` §19.12 already applied**
(`minmax(0, 1fr)` on grid tracks, `overflow-wrap: anywhere` where long
identifiers appear, no `overflow: hidden` on containers whose text must reflow).
Two independent kits hit those same three defects, and between them they caused
almost every responsive and text-zoom finding so far. Building with them from the
start is far cheaper than a fix round.

---

## STEP 0 — One command first, then two documents

**Run this before anything else:**

```bash
node tools/kit-brief.mjs --site <slug>
```

It resolves, in one call, what previous runs each spent 15–25 tool calls
rediscovering: your declared vs absent experience fields, the exact nav labels
and order, the narrative section ids, **the real font filenames in the pool and
which requested weights have no file**, a **measured** contrast table with
accessible substitutes already derived, your budgets and `avoid_words`, the
`content.json` fact counts and the exact licence wording, and what the
predecessor site already has versus needs. Trust it for facts — it is generated
from the kit module, the real font pool and the site on disk.

Then read, in this order:

1. **`new_site.md` §19 "Known traps"** — 23 traps, each a defect that actually
   shipped, including the **field-precedence table (§19.6)** for when a kit
   contradicts itself and the **two CSS rules (§19.12)** that caused nearly every
   responsive failure so far. Highest-value page in the repo; skipping it costs a
   review round per item.

   **§19.16–§19.23 are new, and each was hit by two or three of the first five
   kits independently.** Read them as a pre-flight checklist, not as background:
   heading levels inside a titled section (§19.16 — 3 of 5 kits), the
   `strong { font-weight: 500 }` trap and its _kit-specific_ fix (§19.17 — 3 of
   5), a scaffold comment that silently swallows token declarations (§19.18 — 2
   of 5, same region of `base.css`), per-variant contrast for seasonal palettes
   (§19.19), reduced motion removing content (§19.20), an undismissable-forever
   companion (§19.21), the install command being wrong or inconsistent (§19.22),
   and verifying your own manifest last (§19.23). Between them these were ~40% of
   all wave-1 findings, and every one is cheaper to avoid than to fix.

2. **`brand-kits/<slug>.js`** — your design spec, ~1,500 lines. Read it fully for
   **design intent** — voice, motion, imagery, the feel of the thing. The brief
   above already gave you its facts, so you are reading for judgement, not
   extraction.

Then **skim only as needed**: `new_site.md` §2A (the override DO-table), §3
(per-page structure), §4 (shared shell), §12 (a11y), §16 (facts), §18 (DoD).
Read `shared/content.json` when you need exact copy.

**Do not read:** `plan_site_regen.md` (orchestrator doc), `docs/REVIEW_RUBRICS.md`
(the reviewer's), the predecessor's HTML (the brief summarises it), or the other
49 sites beyond **one** structural comparison (below). That is pure context cost
with no payoff.

**That one comparison must be a site with the same `experience_archetype`** —
`kit-brief` prints yours, and lists any already-regenerated sibling. Your
reviewer will diff you against such a sibling, because diffing across archetypes
passes trivially. This is the program's central risk: `narrative-scroll` covers
**21 of the 50 kits** and `immersive` another **11**. Sharing an archetype is not
licence to share structure — your `homepage_narrative.sections[]` ids are
specific to your kit and must produce a visibly different page shape (different
section count, order, and layout rhythm), not the sibling's shape recoloured.

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
contrast matrix, `avoid_words`, `og:image`, required docs, and a runaway JS size
signal (40 KB — not a target to sit under, see the priority order above).

`render-check` catches what source review cannot, across **every page in your kit**
(including `extra_pages`) at 320×640, 320×700, 375×667 and desktop, plus a
200%-text-zoom pass per page: elements that render 0×0, horizontal overflow,
content **clipped** by an `overflow:hidden` ancestor, anything painted over an
interactive control (re-checked after timers fire, so a mascot tip that appears
seconds later is caught), text invisible against its composited background,
console errors and failed asset requests. **Four defects so far were invisible in
source and only appeared here** — a hero rendering 0×0, a mascot bubble over the
CTA, a toggle underneath the mascot, and an `<h1>` clipped at 200% zoom while
`scrollWidth` reported fine. Add `--shots` for screenshots.

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
