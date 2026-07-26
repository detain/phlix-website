# ORCHESTRATOR PROMPT — regenerate the remaining 44 Phlix brand-kit sites

You are the **Orchestrator**. You do not write website code yourself. You spawn
worker agents, run the gates, verify their work, and land it in git.

Read this whole file before you run anything. Then follow it literally, in order.
Every command below is meant to be copy-pasted exactly as written.

> ## ⛔ READ THIS FIRST — HOW YOU SPAWN WORKERS
>
> **You are already running inside opencode.** You spawn workers with your
> built-in **`task` tool**, the same way you would call any other tool.
>
> **NEVER run the `opencode` binary from bash.** Not `opencode run`, not
> `opencode serve`, not `opencode --agent`, not with `&`, not in a subshell,
> not ever. Starting a second opencode process from inside opencode does not
> create a worker — it starts an unrelated server or session that does no work,
> and you will sit waiting for output that never comes.
>
> | ❌ NEVER DO THIS | ✅ DO THIS INSTEAD |
> | --- | --- |
> | `bash: opencode run -m ... "prompt" &` | call the **`task`** tool |
> | `bash: opencode serve` | call the **`task`** tool |
> | `bash: opencode --agent coder ...` | call the **`task`** tool |
>
> If you catch yourself typing the word `opencode` into a bash command, stop.
> That is always a mistake. The only programs you run in bash are `git`, `gh`,
> `node`, `npm`, `curl`, and ordinary shell utilities.

---

## 0. THE ONE-PARAGRAPH SUMMARY

There are 50 marketing sites in `/home/sites/phlix/phlix-website/sites/`. Each one
is supposed to implement its own brand kit's 21 "experience" fields. **6 are done.
44 are not** — they are palette-swapped copies of one generic template. Your job is
to regenerate those 44, ten at a time, and merge each wave to `master`. For every
kit you run three workers in sequence: an **Author** (builds it), a **Reviewer**
(finds what the Author missed), and a **Fixer** (fixes every finding). You run all
repo-wide checks yourself, because the workers share one git checkout and would
collide.

---

## 1. ENVIRONMENT — EXACT FACTS

| Thing | Value |
| --- | --- |
| Repo | `/home/sites/phlix/phlix-website` |
| Git remote | `git@github.com:detain/phlix-website.git` |
| Default branch | `master` (unprotected — red CI does **not** block a merge) |
| Live site | `https://detain.github.io/phlix-website/<slug>/` |
| Worker model | `SGLANG/MiniMax-M2.7` (already your model — workers inherit it) |
| How you spawn a worker | your built-in **`task`** tool — **never** the `opencode` CLI |
| Subagent for Authors and Fixers | `coder` |
| Subagent for Reviewers | `reviewer` |
| Node | already installed; `npm ci` already done |

**Always start from the repo root.** Every command in this file assumes:

```bash
cd /home/sites/phlix/phlix-website
```

### 1.1 Check your environment before you start

Run this once. All five lines must succeed.

```bash
cd /home/sites/phlix/phlix-website && \
git status --short && \
git branch --show-current && \
node tools/selfcheck.mjs --site swiss-modernist | tail -2 && \
echo "ENVIRONMENT OK"
```

If `git status --short` prints **anything at all**, stop. The tree must be clean
before you begin. Show the output to the human and wait.

---

## 2. THE 44 KITS, AND THE ORDER TO DO THEM IN

### 2.1 Already done — DO NOT TOUCH THESE

`abstract-canvas`, `cottagecore-bloom`, `neon-noir`, `pop-art-explosion`,
`stardust-observatory`, `swiss-modernist`

A kit is "done" if `sites/<slug>/REGEN_PLAN.md` exists. Verify with:

```bash
cd /home/sites/phlix/phlix-website && ls sites/*/REGEN_PLAN.md | wc -l
```

That must print `6` before you start. It goes up by 10 after each merged wave.

### 2.2 Why the order matters

Every kit declares an `experience_archetype`. Sites converge inside an archetype,
so the Reviewer compares each new site against an **already-finished sibling of
the same archetype**. That comparison is the main anti-convergence defence.
Comparing across archetypes proves nothing and passes trivially.

Three archetypes have **no finished example yet**. Those go first, so later kits
have something to be compared against.

### 2.3 The waves — do them in this exact order

**WAVE A — establishes the 4 missing archetypes, plus the biggest families**

```
copper-steampunk      interactive-demo   <-- FIRST EXAMPLE of this archetype
bamboo-sanctuary      minimal            <-- FIRST EXAMPLE
solarpunk-eden        exhibition         <-- FIRST EXAMPLE
chrome-velocity       showcase           <-- ONLY kit of this archetype
editorial-underground zine               <-- ONLY kit
street-mural          asymmetric         <-- ONLY kit
cyber-tokyo           immersive
cosmic-odyssey        immersive
ice-cathedral         editorial
afrofuturism          narrative-scroll
```

**WAVE B**

```
holographic-future  interactive-demo
obsidian-pulse      minimal
venetian-masquerade exhibition
volcanic-forge      immersive
psychedelic-groove  immersive
library-amber       editorial
manga-studio        editorial
art-nouveau-garden  narrative-scroll
autumn-harvest      narrative-scroll
bioluminescent-reef narrative-scroll
```

**WAVE C**

```
pixel-dungeon       interactive-demo
neon-blossom        immersive
pastel-dreamscape   immersive
soundwave-studio    immersive
marble-atrium       editorial
renaissance-atelier editorial
bollywood-dreams    narrative-scroll
celtic-twilight     narrative-scroll
desert-horizon      narrative-scroll
dia-de-muertos      narrative-scroll
```

**WAVE D**

```
cosmic-horror       immersive
moroccan-bazaar     immersive
tropical-lagoon     immersive
wabi-sabi           editorial
egyptian-dusk       narrative-scroll
festive-lantern     narrative-scroll
marina-breeze       narrative-scroll
mid-century-modern  narrative-scroll
midnight-jazz       narrative-scroll
nordic-saga         narrative-scroll
```

**WAVE E — 4 kits only**

```
prairie-bloom       narrative-scroll
retro-seventies     narrative-scroll
speakeasy-gold      narrative-scroll
wilderness-trail    narrative-scroll
```

---

## 3. ABSOLUTE RULES — BREAKING ANY OF THESE BREAKS THE REPO

1. **Only ONE agent may touch git. That agent is you.** Workers are forbidden to
   run `git` or `gh`. All ten workers share one checkout; if two run `git add`
   you will commit half-finished work from another kit.
2. **Only YOU run repo-wide npm commands** (`npm run lint`, `npm run format`,
   `npm run format:check`, `npm run build`). `npm run format` **rewrites files
   across the entire tree**. If you run it while ten authors are writing, you will
   corrupt their work. Run it only when no worker is running.
3. **Each Author writes ONLY inside `sites/<its-own-slug>/`.** Never
   `shared/**`, never `tools/**`, never `new_site.md`, never the root
   `index.html`, never `package.json`, never `reviews/**`, never another kit.
4. **NEVER run `stylelint --fix` in this repo.** It silently deletes
   `-webkit-` prefixed properties. Several kits depend on `-webkit-text-stroke`
   for their headline style. Fix CSS lint errors by hand.
5. **NEVER run any Caliber command** (`caliber refresh`, `caliber sync`, etc.).
   Tell your workers the same.
6. **`gh` needs both tokens unset in the same command**, or it will use the wrong
   credentials:
   `env -u GITHUB_TOKEN -u GH_TOKEN gh <subcommand>`
7. **Do not `pkill -f` on a broad pattern.** It will kill your own verification
   runs and other agents' browsers. If you must kill something, target the exact
   PID.
8. **Never run the `opencode` binary from bash.** See the box at the top of this
   file. Workers are spawned with the `task` tool and only with the `task` tool.
   `opencode serve` in particular does nothing useful here — it starts a server,
   not a worker, and you will wait forever for a result that is not coming.

---

## 4. WHAT TO SKIP — THINGS THE WORKERS CANNOT DO

The model cannot generate images. **Do not ask it to, and do not let it try.**

### 4.1 Image assets — REUSE, NEVER CREATE

Every one of the 50 sites **already has** all of these, and they are already
correct and on-brand:

```
sites/<slug>/img/logo.svg
sites/<slug>/img/favicon.svg
sites/<slug>/img/og.svg
sites/<slug>/img/og.png
sites/<slug>/img/favicon-16x16.png
sites/<slug>/img/favicon-32x32.png
sites/<slug>/img/apple-touch-icon.png
sites/<slug>/img/icon-192.png
sites/<slug>/img/icon-512.png
sites/<slug>/manifest.webmanifest
```

Verify for any kit before starting it:

```bash
cd /home/sites/phlix/phlix-website && ls sites/<slug>/img/
```

**Instruction to give every Author:** keep these files. Do not redraw them, do not
replace them, do not generate new artwork.

**The one thing an Author MAY change** is the *text inside* `og.svg` — the social
card wording — because that is text, not artwork. If it does, it must re-rasterise
with the command in §4.2. If a kit's own spec asks for artwork that does not
exist, the Author must **write one line in `BUILD_LOG.md` saying so and move on**.
It is not a defect and no Reviewer may file it as one.

### 4.2 Rasterising is allowed (it is not image generation)

Turning an existing SVG into a PNG is a mechanical conversion and is fine:

```bash
cd /home/sites/phlix/phlix-website
node tools/gen-og.mjs --site <slug>       # og.svg  -> og.png
node tools/gen-icons.mjs --site <slug>    # favicon.svg -> the 5 PNGs + manifest
```

### 4.3 Also skip

- `sites/<slug>/img/PROMPTS.md` — these are AI-image prompts for a human. Leave
  the file exactly as it is. Do not act on it. Do not delete it.
- Any request to "design a new illustration", "generate a hero image", or
  "create a mascot graphic". The sites are built from CSS, SVG shapes already in
  the repo, and type. That is the intended look.

---

## 5. THE TWO PROMPT FILES YOUR WORKERS READ

You do not need to write worker instructions from scratch. They already exist:

| File | Used by |
| --- | --- |
| `regen_site_prompt.md` | the Author |
| `review_site_prompt.md` | the Reviewer |
| `fix_site_prompt.md` | the Fixer |
| `new_site.md` | the rulebook all three consult, especially **§19 "Known traps"** |

Your spawn commands below tell each worker which file to read. **Do not paste the
contents of those files into the prompt** — tell the worker to read them.

---

## 6. HOW TO RUN ONE WAVE — THE FULL PROCEDURE

Do these steps in order. Do not skip step 6.2 or 6.7.

### 6.1 Create the wave branch

Replace `A` with the wave letter.

```bash
cd /home/sites/phlix/phlix-website
git checkout master
env -u GITHUB_TOKEN -u GH_TOKEN git pull
git status --short          # must print NOTHING
git checkout -b regen/wave-A
```

### 6.2 Generate the kit brief for all 10 kits FIRST

This is a fast, cheap command that resolves everything a worker would otherwise
spend 20 tool calls rediscovering: real font filenames, nav labels, section ids,
a **measured** contrast table, and the same-archetype sibling to compare against.

```bash
cd /home/sites/phlix/phlix-website
mkdir -p /tmp/phlix-briefs
for slug in copper-steampunk bamboo-sanctuary solarpunk-eden chrome-velocity \
            editorial-underground street-mural cyber-tokyo cosmic-odyssey \
            ice-cathedral afrofuturism; do
  node tools/kit-brief.mjs --site "$slug" > "/tmp/phlix-briefs/$slug.md" 2>&1
  echo "brief: $slug -> $(wc -l < /tmp/phlix-briefs/$slug.md) lines"
done
```

Every file must be more than 100 lines. If one is short, open it — it contains an
error message instead of a brief.

### 6.3 Spawn 10 Authors, one per kit — with the `task` tool

**Do not run any bash command for this step.** You call the `task` tool ten
times. Put **all ten calls in a single message** so they run concurrently; if you
send them one message at a time they will run one after another and the wave will
take ten times as long.

Each call takes three things:

- **subagent type:** `coder`
- **description:** `author <slug>`
- **prompt:** the three lines below, with `<slug>` replaced by the real slug

The prompt for each Author is short on purpose — the worker reads its own long
instructions from disk, so you never paste a huge string:

```
You are the Author for the Phlix brand-kit site `<slug>`.

Read /home/sites/phlix/phlix-website/.worker-author.txt in full and follow every
instruction in it exactly. Wherever that file says __SLUG__, it means <slug>.

Your kit brief is at /tmp/phlix-briefs/<slug>.md — read it before you write code.
```

So for wave A you make ten `task` calls in one message, with `<slug>` set to each
of: `copper-steampunk`, `bamboo-sanctuary`, `solarpunk-eden`, `chrome-velocity`,
`editorial-underground`, `street-mural`, `cyber-tokyo`, `cosmic-odyssey`,
`ice-cathedral`, `afrofuturism`.

You will get each worker's report back as it finishes. **Handle each one the
moment it arrives** (§6.4 onward) rather than waiting for all ten.

**`.worker-author.txt` already exists** in the repo root, alongside
`.worker-review.txt` and `.worker-fix.txt`. Confirm before you start:

```bash
cd /home/sites/phlix/phlix-website && wc -l .worker-author.txt .worker-review.txt .worker-fix.txt
```

That must print three files with 79, 49 and 41 lines. If any is missing, its
contents are in §7 below — recreate it before spawning anything.

### 6.4 After EACH author finishes: check its scope IMMEDIATELY

**This is the step people skip and regret.** Workers have deleted committed files
without mentioning it. One previous author deleted 1,256 lines of committed review
history and its final report never said so.

For each slug:

```bash
cd /home/sites/phlix/phlix-website
slug=copper-steampunk     # change per kit

echo "--- files this kit touched OUTSIDE its own directory (must be empty) ---"
git status --short | grep -v "sites/$slug/" || echo "  (clean)"

echo "--- deletions anywhere (must be empty) ---"
git status --short | grep '^ D\|^D ' || echo "  (none)"
```

If the second command prints anything, restore it immediately:

```bash
cd /home/sites/phlix/phlix-website
git checkout -- <the-path-it-deleted>
```

Because ten authors share the checkout, `git status` shows *everyone's* work.
That is why you filter by the slug. To see one kit alone:

```bash
git status --short -- "sites/$slug/"
```

### 6.5 After each author: run that kit's two verification tools

```bash
cd /home/sites/phlix/phlix-website
slug=copper-steampunk

node tools/selfcheck.mjs --site "$slug"
node tools/render-check.mjs --site "$slug"
```

- `selfcheck` takes a few seconds. It must end with `1/1 site(s) pass`.
- `render-check` takes **about 5 minutes per site** (measured: 289 s, ~205 MB
  RAM). It launches a real headless Chrome and tests 9 pages at 6 screen sizes.
  It must end with `PASS`.

These two are safe to run for several kits at the same time — each stages its own
temp directory with a random name, so they cannot collide.

A `⚠` warning line is not a failure. Only `✗` lines and a final `FAIL` are.

### 6.6 Then the Reviewer, then the Fixer — per kit, in that order

Spawn the Reviewer for a kit **as soon as that kit's author is done and its gates
are green** — do not wait for the other nine. This keeps all ten lanes busy. Again
this is the `task` tool, never bash.

**Reviewer** — subagent type `reviewer`, description `review <slug>`, prompt:

```
You are the Reviewer for the Phlix brand-kit site `<slug>`.

Read /home/sites/phlix/phlix-website/.worker-review.txt in full and follow every
instruction in it exactly. Wherever that file says __SLUG__, it means <slug>.

Return your findings as TEXT in your final message. Do not write any file.
```

The Reviewer's findings come back to you **in its final message**. You must now
pass that text to the Fixer. Save it first so it cannot be lost:

Write the reviewer's returned text verbatim to
`/tmp/phlix-findings/<slug>-round1.txt` using your file-write tool. Then:

**Fixer** — subagent type `coder`, description `fix <slug>`, prompt:

```
You are the Fixer for the Phlix brand-kit site `<slug>`.

Read /home/sites/phlix/phlix-website/.worker-fix.txt in full and follow every
instruction in it exactly. Wherever that file says __SLUG__, it means <slug>.

The findings you must fix are in /tmp/phlix-findings/<slug>-round1.txt — read
that file. Fix every finding in it.
```

For later rounds use `-round2.txt`, `-round3.txt` and point the Fixer at that file
instead.

After the Fixer finishes, **re-run §6.4 and §6.5 for that kit**. Then run one more
Reviewer round. Repeat review → fix until a Reviewer round returns **no ❌ blocker
findings**. Two rounds is normal. If you reach **round 4** and blockers are still
appearing, stop that kit and report it to the human — something structural is
wrong and more rounds will not converge.

### 6.7 When all 10 kits are green: run the repo-wide gates

**Only now**, with no workers running:

```bash
cd /home/sites/phlix/phlix-website
npm run format                      # rewrites files; safe now, not earlier
npm run format:check                # must say "All matched files use Prettier code style!"
npm run lint:html                   # must say "no errors found"
npm run lint:css                    # must print NOTHING after the two ">" lines
npm run lint:js                     # must print NOTHING after the two ">" lines
node tools/check-meta.mjs           # must say "OK — NNN html file(s) ..."
npm run build                       # must list ✓ for all 50 sites
```

Run `lint:html`, `lint:css`, `lint:js` **separately, never `npm run lint`**.
`npm run lint` runs them in parallel and interleaves the output, so a real error
scrolls past and you see only a summary. `npm run lint` also **exits 0 on an
eslint warning** — a warning is still worth fixing.

### 6.8 Commit, PR, merge

```bash
cd /home/sites/phlix/phlix-website
git add -A
git status --short | wc -l          # sanity: should be a few hundred files for 10 kits
git commit -F /tmp/wave-a-message.txt
env -u GITHUB_TOKEN -u GH_TOKEN git push -u origin regen/wave-A
env -u GITHUB_TOKEN -u GH_TOKEN gh pr create --base master --head regen/wave-A \
  --title "Regenerate wave A — 10 brand-kit sites" --body-file /tmp/wave-a-pr.md
```

Wait for CI, then check it:

```bash
cd /home/sites/phlix/phlix-website
env -u GITHUB_TOKEN -u GH_TOKEN gh pr checks <PR-NUMBER>
```

**Expected result: `lint` and `lhci` PASS. `links` and `Codacy` FAIL.** Those two
failures are normal and pre-existing — see §9.6. Do not try to fix them.

Merge:

```bash
cd /home/sites/phlix/phlix-website
env -u GITHUB_TOKEN -u GH_TOKEN gh pr merge <PR-NUMBER> --squash --delete-branch
git checkout master
env -u GITHUB_TOKEN -u GH_TOKEN git pull
env -u GITHUB_TOKEN -u GH_TOKEN git fetch --prune
```

### 6.9 Verify the wave is actually live

GitHub Pages takes a few minutes after the merge. Wait for it:

```bash
cd /home/sites/phlix/phlix-website
until curl -s -o /dev/null -w '%{http_code}' -m 20 \
  https://detain.github.io/phlix-website/copper-steampunk/404.html | grep -q 200; do
  sleep 25
done
echo "DEPLOYED"
```

Then check all ten:

```bash
for slug in copper-steampunk bamboo-sanctuary solarpunk-eden chrome-velocity \
            editorial-underground street-mural cyber-tokyo cosmic-odyssey \
            ice-cathedral afrofuturism; do
  for page in "" about.html features.html clients.html download.html \
              plugins.html docs.html hub.html 404.html; do
    code=$(curl -s -o /dev/null -w '%{http_code}' -m 20 \
      "https://detain.github.io/phlix-website/$slug/$page")
    [ "$code" = "200" ] || echo "BAD $slug/$page -> $code"
  done
done
echo "LIVE CHECK DONE (no BAD lines above = all good)"
```

---

## 7. THE THREE WORKER PROMPT FILES

**These three files already exist in the repo root.** You do not need to create
them. They are reproduced here only so you can restore one if it goes missing.

The worker reads its own file and substitutes `__SLUG__` itself — that is why the
prompt you pass through the `task` tool is only three lines long. Do not paste
these contents into a `task` call.

### 7.1 `.worker-author.txt`

```
You are regenerating ONE brand-kit marketing site.

REPO: /home/sites/phlix/phlix-website
YOUR KIT SLUG: __SLUG__
YOUR DIRECTORY: sites/__SLUG__/

STEP 1 — read these, in this order, before writing anything:
  1. /home/sites/phlix/phlix-website/regen_site_prompt.md   (your instructions)
  2. /tmp/phlix-briefs/__SLUG__.md                          (resolved facts: fonts,
     nav labels, section ids, measured contrast, sibling to compare against)
  3. /home/sites/phlix/phlix-website/new_site.md section 19 "Known traps" — 24
     entries, each one a real defect that shipped. Read it as a checklist.
  4. /home/sites/phlix/phlix-website/brand-kits/__SLUG__.js  (your design spec)

STEP 2 — write sites/__SLUG__/REGEN_PLAN.md first: a short table of what each
declared experience field will become. Keep it under 400 lines.

STEP 3 — build the site. You must produce exactly these files in
sites/__SLUG__/ :
  index.html features.html clients.html download.html plugins.html
  docs.html hub.html about.html 404.html
  css/base.css css/theme.css css/components.css
  js/main.js  (plus any other js you need)
  robots.txt sitemap.xml
  SITE.md BUILD_LOG.md REGEN_PLAN.md

DO NOT CREATE OR REDRAW ANY IMAGE. sites/__SLUG__/img/ already contains
logo.svg, favicon.svg, og.svg, og.png and 5 icon PNGs. They are correct. Keep
them. You may edit the TEXT inside og.svg; if you do, run:
    node tools/gen-og.mjs --site __SLUG__
Leave sites/__SLUG__/img/PROMPTS.md exactly as it is.
If the kit asks for artwork that does not exist, write one line in BUILD_LOG.md
saying so and move on. That is not a defect.

FACTS YOU MUST NOT RESEARCH OR INVENT — use these exactly:
  * LICENCE: Phlix Server and the Hub are MPL-2.0. The shared libraries,
    plugins and clients are MIT. MPL-2.0 is weak copyleft. NEVER write
    "no strings attached", "attribution is required", "the only obligation is
    to preserve copyright", or anything about endorsement — those are all
    BSD-3 terms and all were live defects on 45 sites. The one condition is
    per-file: modify a Phlix file and that file stays open; anything you add
    beside it stays yours. Footer licence links point to
    https://github.com/detain/phlix-server/blob/master/LICENSE
  * INSTALL COMMAND: copy it verbatim from shared/content.json -> "install".
    Never retype it. install.from_source is a DEVELOPER CHECKOUT and must be
    labelled "not an install" — never presented as the way to install Phlix.
  * Every other product fact comes from shared/content.json. Do not invent
    features, client names, or numbers.

RULES YOU MUST NOT BREAK:
  * Write ONLY inside sites/__SLUG__/. Never touch shared/, tools/,
    new_site.md, the root index.html, package.json, reviews/, or any other
    site's folder. Do not delete any file outside your own folder.
  * Run NO git commands. Run NO gh commands.
  * Run NO repo-wide npm commands (no npm run lint, format, build).
  * NEVER run stylelint --fix — it deletes -webkit- properties.
  * In CSS, always QUOTE font family names: 'Impact', not Impact.
  * Every css/*.css and js/*.js file must contain a line
    "@copyright 2026 Joe Huss <detain@interserver.net>" inside its top comment
    block. This is checked automatically (new_site.md section 19.24).

VERIFY YOUR OWN WORK — run these until both pass:
    node tools/selfcheck.mjs --site __SLUG__      (must end "1/1 site(s) pass")
    node tools/render-check.mjs --site __SLUG__   (must end "PASS"; takes ~5 min)

FOUR TRAPS THAT CAUGHT PREVIOUS AUTHORS — check these before you finish:
  1. If a control has its own box-shadow AND you style :focus-visible with a
     box-shadow, the control's own rule wins and the focus ring disappears.
     Give focused controls BOTH shadows in one list.
  2. A "reduce motion" toggle must switch off `transition`, not only
     `animation`. Turning off only `animation` leaves things still moving.
  3. Rotating a square grows its box by ~1.37x. If a rotating element is
     inset:0 it will push the page sideways. Inset it ~14% instead.
  4. Do not give all 9 pages the same <meta name="description">. Write 9
     different ones.

WHEN DONE: reply with a short text report — what you built, which kit fields
drove the structure, anything you had to skip, and the final output of both
verification commands. Do not write a review file.
```

### 7.2 `.worker-review.txt`

```
You are an independent reviewer. You did NOT build this site. Find what its
author missed.

REPO: /home/sites/phlix/phlix-website
SITE UNDER REVIEW: sites/__SLUG__/

READ FIRST:
  1. /home/sites/phlix/phlix-website/review_site_prompt.md  (your instructions)
  2. /tmp/phlix-briefs/__SLUG__.md                          (the authoritative facts)
  3. /home/sites/phlix/phlix-website/brand-kits/__SLUG__.js (the design spec)
  4. sites/__SLUG__/REGEN_PLAN.md — the author's own manifest. CHECK THE SITE
     AGAINST IT. Authors routinely claim things the site does not do.

CRITICAL — HOW TO JUDGE:
  * Both automated gates ALREADY PASS. A passing gate proves only "nothing
    broke". It is NOT evidence of quality. Never report "gates pass" as a
    finding and never use it as proof that something is correct.
  * VERIFY EVERY FINDING against the actual file or a real browser. Quote the
    file and line number, or give exact steps to reproduce. Previous reviewers
    filed findings that were simply wrong because they guessed.
  * The kit's own accessibility text can be WRONG about its contrast ratios.
    Measure. Do not trust it.

DO NOT REPORT THESE — they are settled and correct:
  * Missing or "generic" artwork. Images are reused on purpose; nobody can
    generate new ones. img/PROMPTS.md is a human's file. Not a defect.
  * og.png letterforms rendering in a fallback font. Repo-wide limitation.
  * The licence wording or the install command, if they match
    shared/content.json.
  * File size or page weight. Richness beats byte count here — that is an
    explicit owner ruling.

RULES:
  * READ-ONLY. Change NOTHING. Create no files. Delete no files.
  * Run NO git and NO gh commands.
  * You MAY run: node tools/selfcheck.mjs --site __SLUG__,
    node tools/render-check.mjs --site __SLUG__, and a headless browser for
    your own measurements.
  * DO NOT write a FINDINGS.md or any other file. Return your findings as
    TEXT in your final message.

OUTPUT — a numbered list. For each finding give:
  severity: BLOCKER / SHOULD-FIX / NICE-TO-HAVE
  file:line or exact reproduction steps
  what is wrong
  why it is wrong (name the kit field, the new_site.md section, or the WCAG rule)
  the smallest fix that resolves it
If a whole area is genuinely clean, say so in one line. Do not invent findings
to look thorough.
```

### 7.3 `.worker-fix.txt`

```
You are fixing review findings on ONE site.

REPO: /home/sites/phlix/phlix-website
SITE: sites/__SLUG__/

READ FIRST: /home/sites/phlix/phlix-website/fix_site_prompt.md

FIX EVERY FINDING listed at the end of this message. All of them.
Before changing anything for a finding, confirm the problem is real by looking
at the file. If after checking you believe a finding is wrong, say so clearly in
your report with your evidence — do not silently skip it.

HOW TO KNOW A FIX WORKED:
  Both gates were ALREADY GREEN before this review. A green gate does NOT mean
  your fix worked. For each fix, confirm the actual behaviour changed — measure
  the computed style, the rendered pixels, the element's position, or the
  accessible name. A previous fixer reported findings closed on the strength of
  a passing gate and several were still broken.

  Careful when measuring box-shadow on a control that transitions it: while the
  transition is running, the browser pads the shorter shadow list with invisible
  shadows, so an immediate reading looks wrong. Wait ~400ms before reading.

RULES:
  * Write ONLY inside sites/__SLUG__/. Never touch shared/, tools/,
    new_site.md, the root index.html, package.json, reviews/, or another site.
    Do not delete files outside your own folder.
  * Run NO git and NO gh commands.
  * Run NO repo-wide npm commands.
  * NEVER run stylelint --fix.
  * Keep font family names QUOTED in CSS.
  * DO NOT create or redraw images.
  * Keep REGEN_PLAN.md and SITE.md truthful — if a finding proves a claim in
    them is false, correct that claim too.

WHEN DONE, both of these must pass:
    node tools/selfcheck.mjs --site __SLUG__
    node tools/render-check.mjs --site __SLUG__

REPORT as TEXT: one line per finding saying what you changed and how you
verified the behaviour actually changed. Flag anything you think was wrong.
```

---

## 8. CONCURRENCY — WHAT CAN AND CANNOT RUN AT THE SAME TIME

| Action | Parallel? |
| --- | --- |
| 10 Authors, each in its own kit folder | **YES** |
| `selfcheck --site` for several kits | **YES** |
| `render-check --site` for several kits | **YES** (own temp dir each) |
| Reviewer for kit X while Author for kit Y still runs | **YES** |
| `npm run format` / `format:check` | **NO — you only, with nothing else running** |
| `npm run lint:*` | **NO — you only** |
| `npm run build` | **NO — you only** |
| any `git` or `gh` command | **NO — you only** |

### 8.1 Resource cost, measured

One `render-check` run = **289 seconds, ~205 MB RAM**, one headless Chrome. Ten in
parallel is roughly 2 GB and ten Chromes. Check you have room:

```bash
nproc && free -g | head -2
```

### 8.2 Ten parallel `task` workers — prove it on two first

Previous experience with opencode + MiniMax on this repo was **strictly serial**,
because workers were being launched as separate `opencode` CLI processes that
fought over shared state. Spawning through the `task` tool does not have that
problem: each subagent gets its own context from the runtime.

**Still, prove it before you trust it.** On your very first wave, send **two**
`task` calls in one message. When both come back, check that each actually built
its own site and did not touch the other's:

```bash
cd /home/sites/phlix/phlix-website
git status --short -- sites/copper-steampunk/ | wc -l    # expect ~20+
git status --short -- sites/bamboo-sanctuary/ | wc -l    # expect ~20+
```

Both numbers must be non-trivial and the §6.4 scope check must be clean for each.
Only then send the remaining eight in one message.

If the two interfere — one kit empty, or files from one kit appearing under the
other — drop to 3–4 concurrent and tell the human before continuing.

### 8.3 Do not poll for workers with bash

You do not need `wait`, `sleep`, `jobs`, log files, or `ps` to know when a worker
has finished. The `task` tool returns the worker's report to you directly. Sitting
in a bash loop waiting for a process is a symptom that you launched a worker the
wrong way — go back and re-read the box at the top of this file.

---

## 9. FAILURE PLAYBOOK — EXACT SYMPTOM, EXACT FIX

### 9.1 `lint:css` says `Expected "#ffffff" to be "#fff"`

Shorten the hex by hand. Safe because data-URI colours are percent-encoded
(`%23FFFFFF`) and will not match:

```bash
cd /home/sites/phlix/phlix-website
sed -i 's/#ffffff/#fff/g; s/#cc0000/#c00/g' sites/<slug>/css/*.css
```

### 9.2 `lint:css` says `Expected "Impact" to be "impact"` (value-keyword-case)

**Do not lowercase it.** Quote it — the repo convention is quoted family names,
which makes them strings instead of keywords:

```
BEFORE:  --font-display: 'Anton', Impact, 'Arial Black', sans-serif;
AFTER:   --font-display: 'Anton', 'Impact', 'Arial Black', sans-serif;
```

### 9.3 `lint:css` says `Duplicate selector ".foo"`

Merge the two blocks into one. **Check for a property declared in both** — if so,
keep the value from the *later* block, because that is what the browser was using.

### 9.4 `lint:css` says `Expected empty line before declaration`

Insert a blank line between the custom-property group (`--x: ...`) and the normal
declaration that follows it (`color: ...`).

### 9.5 `lint:js` reports `'_e' is defined but never used`

Use an optional catch binding:

```bash
cd /home/sites/phlix/phlix-website
sed -i 's/} catch (_e) {/} catch {/' sites/<slug>/js/*.js
```

### 9.6 CI: `links` and `Codacy` fail on the PR

**This is expected. Do not chase it.**
- Codacy fails on every PR in this repo.
- `links` validates URLs against the **live** site, so every brand-new page
  (`404.html`) 404s until after the merge deploys. It also always reports
  `phlix-server/stargazers` (blocked to crawlers) and five `phlix-docs/*`
  subpaths that genuinely do not exist and are linked from all 50 sites.

Confirm the failures are only that class before merging:

```bash
cd /home/sites/phlix/phlix-website
env -u GITHUB_TOKEN -u GH_TOKEN gh run view <RUN-ID> --log-failed \
  | grep -oE 'https?://[^ )]+' | sort | uniq -c | sort -rn | head -15
```

If a URL appears that is **not** in that known set, it is a real broken link — fix
it before merging.

### 9.7 `render-check` reports `failed request .../manifest.webmanifest`

Should not happen — already fixed in the harness. If it reappears, someone reverted
`tools/render-check.mjs`. Chrome fetches a manifest as a CORS request and a
`file://` page has no origin, so it always fails under this harness and is
meaningless. Do not "fix" it by deleting the manifest link from the pages.

### 9.8 `render-check` reports horizontal overflow

Real defect, always. Find the culprit — remember it may be a **pseudo-element**
(`::before` / `::after`), which does not show up when you loop over elements. The
usual cause is a rotated or translated element with `inset: 0`.

### 9.9 A worker says it cannot do something

If it is image generation → correct, that is §4, tell it to skip and continue.
Anything else → read its log, and if it is genuinely blocked, report to the human
rather than letting the kit ship half-built.

### 9.10 A kit fails the same finding after 3 fix rounds

Stop that kit. Leave it out of the wave (`git checkout -- sites/<slug>/` to discard
it, or keep the branch and exclude it from the commit) and tell the human. Do not
burn rounds 5, 6, 7 — past experience is that this never converges.

---

## 10. DEFINITION OF DONE — CHECK EVERY BOX BEFORE YOU MERGE A WAVE

For **each** of the 10 kits:

- [ ] `sites/<slug>/` has all 9 HTML pages including `404.html`
- [ ] `SITE.md`, `BUILD_LOG.md`, `REGEN_PLAN.md`, `robots.txt`, `sitemap.xml` exist
- [ ] every `css/*.css` and `js/*.js` contains an `@copyright` line
- [ ] `img/` still has its original `logo.svg`, `favicon.svg`, `og.svg`, `og.png`,
      the 5 icon PNGs, and `PROMPTS.md`
- [ ] `node tools/selfcheck.mjs --site <slug>` → `1/1 site(s) pass`
- [ ] `node tools/render-check.mjs --site <slug>` → `PASS`
- [ ] a Reviewer round returned **no BLOCKER findings**
- [ ] `git status --short | grep -v "sites/<slug>/"` shows nothing from this kit
- [ ] no deletions outside the kit's own folder
- [ ] 9 different `<meta name="description">` values
- [ ] zero occurrences of `BSD`, `no strings attached`, `attribution is required`:
      ```bash
      grep -ric 'bsd\|no strings attached\|attribution is required' sites/<slug>/*.html
      ```
      (every line must end in `:0`)

For the **wave**:

- [ ] `npm run format:check` clean
- [ ] `lint:html`, `lint:css`, `lint:js` all clean
- [ ] `node tools/check-meta.mjs` OK
- [ ] `npm run build` lists ✓ for all 50 sites
- [ ] PR opened, `lint` + `lhci` pass, `links`/Codacy failures verified as the
      known set only
- [ ] squash-merged, branch deleted
- [ ] all 90 live URLs return 200 (§6.9)
- [ ] `ls sites/*/REGEN_PLAN.md | wc -l` went up by exactly 10

---

## 11. REPORT BACK TO THE HUMAN AFTER EVERY WAVE

Keep it short and factual:

1. Which 10 kits landed, and the merge commit SHA.
2. How many review rounds each kit needed.
3. Any kit you had to abandon, and why.
4. Anything a worker skipped (especially artwork it wanted but could not make).
5. Any finding you judged wrong, and your evidence.
6. Confirmation that all 90 live URLs return 200.

Do not start the next wave until the human tells you to.
