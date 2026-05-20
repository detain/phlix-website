# HANDOFF PROMPT — Phlix Website Build

> Paste everything below the `--- BEGIN ---` line into a **fresh** Claude Code session opened at `/home/sites/phlix/phlix-website`. The prompt is self-contained.

---

--- BEGIN ---

You are taking over an in-progress project. The repo skeleton is committed; your job is to drive the multi-agent build → review → fix → iterate pipeline described in `docs/PLAN.md`.

## 1. Orient yourself (first 5 minutes)

Read these four files in order. Do not skip. Do not skim past the agent contracts:

1. `docs/PLAN.md` — overall plan and pipeline shape
2. `docs/AGENT_CONTRACTS.md` — exact interface for every agent role
3. `docs/REVIEW_RUBRICS.md` — review file template, severity icons, scoring, weights
4. `shared/content.json` and `shared/data/brand-kits.json` — the data every variant must consume

Also skim these from the sibling Phlix repos (read-only):
- `/home/sites/phlix/phlix-server/docs/brand/brand_identity.md`
- `/home/sites/phlix/phlix-server/docs/brand/logo_concepts.md`
- `/home/sites/phlix/phlix-server/docs/brand/dash_ui_prompts.md`
- `/home/sites/phlix/phlix-server/docs/brand/svg_prompts.md`

## 2. Build the tooling (you, directly — not delegated)

The agents need a working build before they can lint or preview. Write these three files yourself:

- `tools/render.mjs` — given a variant slug, a content.json object, and a page key, returns rendered HTML. Use simple `${...}` interpolation; no template engine.
- `tools/build.mjs` — for each `variants/<NN>-*/`, copies HTML/CSS/JS into `dist/<NN>-*/`, runs `render.mjs` to inline content, copies `shared/assets/`. Produces a top-level `dist/index.html` that links to all five.
- `tools/dev-server.mjs` — Node http server that serves `variants/<slug>/` with content interpolation on the fly. Listens on `--port` (default 5173). Accepts `--variant`.
- `tools/preview-all.mjs` — serves every variant under `/<slug>/` on port 5174.

Then `npm install` and verify `npm run build`, `npm run dev:01`, and `npm run lint` all execute (even if there's nothing yet to lint).

## 3. Phase B — Build (5 parallel agents, one per directory)

The central rule of this project is **five concurrent workstreams, one per variant directory, zero cross-talk**. Launch all five builders in a **single message** containing five parallel `Agent` calls, each scoped to one directory:

| Builder | Working dir (read+write) | Brand kit § |
|---------|--------------------------|-------------|
| #1 | `variants/01-minimalist-cinema/` | Concept 1 — Minimalist Cinema Icon |
| #2 | `variants/02-spotlight-projector/` | Concept 2 — The Spotlight Projector |
| #3 | `variants/03-retro-film-reel/` | Concept 3 — Retro Film Reel Badge |
| #4 | `variants/04-portal-hub/` | Concept 4 — Portal / Hub Icon |
| #5 | `variants/05-pixel-tech/` | Concept 5 — Pixel-Tech Hybrid |

Each builder MUST be told (and the prompt MUST enforce): "You may only touch your assigned `variants/NN-*/` directory. You may not read any sibling `variants/MM-*/`. No copy-pasting CSS or HTML from another variant — visual independence between the five is the whole point."

Each gets a self-contained prompt that includes:

- Its variant number, slug, brand kit (paste the kit's full block from `brand-kits.json`)
- The Builder agent contract from `docs/AGENT_CONTRACTS.md` (paste verbatim — the agent has no memory of this conversation)
- Pointers to `shared/content.json` and the relevant brand markdown file path
- The exact 8-page list and the directory it must produce them under

Sample prompt skeleton (fill in N and details):

> You are the Builder agent for variant `<NN>-<slug>` of `phlix-website`. Build all 8 pages under `variants/<NN>-<slug>/` per the contract below. (...paste contract...). Brand kit (paste full JSON block). Content lives in `shared/content.json` — render every page from it without rewriting marketing copy. Brand source-of-truth lives at `/home/sites/phlix/phlix-server/docs/brand/brand_identity.md` (your concept's section only). Do not consult other variants. Write `VARIANT.md` and `BUILD_LOG.md`. Exit when `npm run lint` and `npm run build` both pass for your variant.

Wait for all five to complete. Inspect their `BUILD_LOG.md` deltas. Run `npm run lint` and `npm run build` yourself to verify.

## 4. Phase R1 — Code review + fix loop (5 parallel directory pipelines)

Run **five independent reviewer/fixer pipelines in parallel**, one per `variants/NN-*/` directory paired with its `reviews/NN-*/` outputs. Each pipeline's agents are directory-scoped per the rule above: they read and write only their own pair, never their siblings.

```
round = 1
while round ≤ 5:
    spawn Reviewer for variant → writes reviews/<NN>-*/code-review.md (round suffixed if needed)
    if review has zero ❌ items: break
    spawn Fixer for variant → reads review, applies fixes, appends to BUILD_LOG.md
    round += 1
if still has ❌ after 5 rounds:
    write code-review-STUCK.md, surface to user
```

Reviewer and Fixer prompts: paste contracts from `AGENT_CONTRACTS.md`.

## 5. Phase R2 — Tester + Documenter (per variant, parallel within)

For each variant, spawn **Tester** and **Documenter** in parallel. Both write into `reviews/<NN>-*/`. Fail-fast on ❌ — if either produces a ❌, route it back through Phase R1 once before continuing.

## 6. Phase R3 — Comprehensive review battery (10 parallel per directory × 5 directories)

For each variant directory, spawn all ten dimension reviewers in a **single parallel batch**. Across the five directories, run those batches in parallel too if the harness allows it — that's up to 50 simultaneous reviewers, every one of them locked to a single `variants/NN-*/` ↔ `reviews/NN-*/` directory pair.

Dimensions to spawn per directory:

- accessibility, usability, responsive, performance, localization, cta-funnel, content-quality, social-metadata, seo, branding-consistency

Each gets the rubric template from `REVIEW_RUBRICS.md` plus its dimension's specific criteria.

Cap parallelism per phase: 10 agents × 5 variants = 50 agents max. If your harness can't run 50 in parallel, batch by variant (10 per batch) and run variants sequentially through R3.

## 7. Phase C — Collate

For each variant, spawn **Collator**. It reads all twelve review files (10 dimensions + tester + documenter) and emits `reviews/<NN>-*/ROUND-<N>-SUMMARY.md`.

Read every summary yourself. Confirm the aggregate scores and the improvement plans look sane.

## 8. Phase I — Improve (5 parallel improvement agents)

Spawn five improvement agents in a single message, each scoped to one `variants/NN-*/` directory and reading only its own `reviews/NN-*/ROUND-<N>-SUMMARY.md`. Each applies fixes per its improvement plan inside its directory and nowhere else.

Then **go back to Phase R3** for round N+1.

**Loop exit condition** (per variant):
- Aggregate score ≥90 AND zero ❌ across all 10 dimensions, OR
- Round ≥5 — write `reviews/<NN>-*/STUCK.md` and continue with the next variant. Surface the STUCK file to the user at the end.

## 9. Final phase — Comparator

Once all five variants exit their R3 loops, spawn one **Comparator agent**. It reads every variant's last `ROUND-*-SUMMARY.md` and writes `reviews/COMPARISON.md`.

## 10. Wrap-up

When the comparator is done:

1. `git add -A && git commit -m "..."` with a concise summary of what landed.
2. Push to origin.
3. Verify the GH Pages deploy ran green.
4. Update root `README.md` to link the live URL.
5. Write a final report to the user with: which variants passed, which (if any) hit STUCK, the comparator's primary recommendation, and the deployed preview URLs.

## Operating rules for you

- **Parallelize aggressively.** Independent variants and independent reviewers should run in parallel batches, not sequentially.
- **Track state in TodoWrite/TaskCreate.** One task per variant per phase. Update statuses as you go.
- **Never edit `shared/content.json` from an agent.** If a reviewer says a claim is inaccurate, you (the driver) edit content.json — once, with all corrections at the top of the iteration.
- **Never edit other variants from one variant's fixer.** Cross-variant edits route through you.
- **Keep `BUILD_LOG.md` files appendable and dated.** They are the trail.
- **Image placeholders are fine.** Each variant's `img/PROMPTS.md` documents what real renders would replace them. Do not attempt to call an image model; none is available.
- **Stop and ask the user** if: a contract conflict between two sibling docs is ambiguous; a variant's STUCK file accumulates twice in a row; the budget for parallel agents is exhausted.

Begin with step 1.

--- END ---

## Why this prompt is shaped this way

- Each phase is gated by an artifact (file in `reviews/`) so the pipeline is resumable across sessions.
- Contracts live in their own files so they can be pasted verbatim into agent prompts — agents have no memory of the parent session.
- Aggregate scores + ❌ counts give a deterministic exit condition; no vibes-based "I think it's done".
- The 5-round cap prevents infinite loops on unfixable issues; STUCK files escalate to a human cleanly.
- Variants share content + brand-kit tokens but never each other's CSS/HTML — the visual independence is the whole point of producing five.
