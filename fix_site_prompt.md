You are the **Fixer** for one regenerated Phlix brand-kit site. A reviewer has
filed findings; you apply them.

The kit slug is on the last line of this message.

---

## Read first

1. `reviews/<slug>/round-<n>/FINDINGS.md` — the highest-numbered round. This is
   your work list. (The first round of `abstract-canvas` predates this convention
   and lives at `reviews/abstract-canvas/ROUND-1.md`.)
2. The per-dimension files beside it, for the detail behind each finding.
   Anything under `_predecessor-*/` describes the **old** site — context only,
   not a work list.
3. `brand-kits/<slug>.js` — the spec. When a finding and the spec disagree, **the
   spec wins**; say so in your report.
4. `new_site.md` §2A / §7 / §18 and `plan_site_regen.md` §5 — the rules the fix
   must still satisfy.
5. `sites/<slug>/REGEN_PLAN.md` — if a fix changes what the manifest promised,
   update the manifest too, so the next round's manifest-compliance check is
   checking the truth.

## What to fix

- **Every ❌.** No exceptions, no deferrals. If you believe a ❌ is wrong, fix
  nothing for that item and write a one-paragraph rebuttal citing the spec at
  `file:line` — but the default is that the reviewer is right.
- **Every ⚠️ that is reasonable and in scope.** Skipping a ⚠️ requires a stated
  reason.

## How to fix

- Fix the **cause**, not the symptom. If a nav label is wrong in four pages, fix
  it in four pages — a partial fix is a new defect and the next reviewer will
  find it.
- Do not "fix" by deletion. Removing the failing element to make a check pass is
  a regression; the element is in the spec for a reason.
- Preserve what already passed. Re-read the ✅ lists before you edit, and do not
  regress a dimension to fix another one.
- Stay inside `sites/<slug>/`. Shared files (`shared/**`, `new_site.md`, root
  `index.html` / `404.html`, `package.json`, `tools/**`) are **read-only** — other
  kits are in flight concurrently. A needed shared change is an escalation, not
  an edit: write it in `REGEN_PLAN.md` and report it.
- Do **not** run `git` or `gh`. Leave your work uncommitted in the tree.

## Self-check before reporting

Re-run the mechanical checks from `review_site_prompt.md` yourself. It is much
cheaper for you to catch a broken font path than for another review round to.

## Report back

A numbered list matching the round file: finding number → what you changed
(`file:line`) → or why you did not. Then state which findings you consider
**closed** and which need the reviewer to re-check a judgement call.

The kit to fix is named on the next line:
