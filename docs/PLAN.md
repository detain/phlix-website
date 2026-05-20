# Phlix Website — Build Plan

## 0. Goal

Ship a marketing/landing site at `detain/phlix-website` that gives Phlix the public face the rest of the ecosystem (server, hub, clients, docs, plugins) has been missing. Ship **five concurrent design variants**, one per brand-identity concept in `phlix-server/docs/brand/`. All variants share the same content and information architecture; only their visual language differs. Pick a winner later from real artifacts, not mockups.

## 0.1 The central rule: five directories, five concurrent pipelines

Every phase of this project — build, review, fix, dimension reviews, collation, improvement — runs as **five simultaneous workstreams**, one per variant directory, with **zero cross-talk** between them. The five working directories are:

```
variants/01-minimalist-cinema/    ←→  reviews/01-minimalist-cinema/
variants/02-spotlight-projector/  ←→  reviews/02-spotlight-projector/
variants/03-retro-film-reel/      ←→  reviews/03-retro-film-reel/
variants/04-portal-hub/           ←→  reviews/04-portal-hub/
variants/05-pixel-tech/           ←→  reviews/05-pixel-tech/
```

Hard rules an agent must respect:

- An agent assigned to variant `NN` MAY read and write inside `variants/NN-*/` and `reviews/NN-*/` only.
- It MAY read (never write) `shared/`, `docs/`, and `phlix-server/docs/brand/`.
- It MUST NOT read or write any sibling `variants/MM-*/` or `reviews/MM-*/`. No copy-pasting CSS/HTML from one variant to another — the visual independence is the whole point of producing five.
- Whenever the pipeline says "for each variant", that means **launch five Agent calls in a single message**. Sequential per-variant execution is a bug, not a fallback.

Cross-variant changes (a typo in `shared/content.json`, a new GH Actions step, a new tool) are driver-level — handled by the supervising session, never by a per-variant agent.

## 1. Scope of the site itself

Each variant must implement the same eight pages with identical content:

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Hero + pitch + top features + CTAs |
| Features | `/features.html` | Deep dive on library, SyncPlay, transcoding, auth, Live TV, DLNA, plugins, hub |
| Clients | `/clients.html` | Roku, Tizen, Windows, Mobile, DLNA — what each looks like, what's stable vs beta |
| Download | `/download.html` | Install paths (server, hub, each client), system reqs, quickstart commands |
| Plugins | `/plugins.html` | The plugin model + link to phlix-plugin-example |
| Docs | `/docs.html` | Summary + link-out to phlix-docs |
| Hub | `/hub.html` | What Phlix Hub does, self-host vs public hub |
| About | `/about.html` | Philosophy (self-hosted, BSD-3, open contribution), license, contact |

Content lives in `shared/content.json`. Variants render from that JSON at build time (no runtime fetch). Brand tokens (colors, fonts, voice) live in `shared/data/brand-kits.json` and feed each variant's CSS custom properties.

### Non-goals
- No backend. No PHP. No database. No login. The Phlix product itself has all of that — the site is a brochure.
- No AI image generation in this iteration. Each variant's `img/PROMPTS.md` records exactly what to feed an image model later. CSS/SVG-only artwork is preferred meanwhile.
- No CMS. Editing copy means editing `shared/content.json`.

## 2. Variant matrix

| # | Slug | Brand kit | Primary | Accent | Vibe | Fonts |
|---|------|-----------|---------|--------|------|-------|
| 01 | `minimalist-cinema` | Film-Strip X | `#2D9CFF` electric blue | `#00F0FF` neon aqua | Modern, tech-forward | Montserrat / Inter |
| 02 | `spotlight-projector` | Projector Beam | `#F5C542` gold | `#FFB84D` amber | Cinematic, premium | Cinzel / Lora |
| 03 | `retro-film-reel` | Film Reel Badge | `#C0392B` retro red | `#1ABC9C` teal | Nostalgic, friendly | Bebas Neue / Open Sans |
| 04 | `portal-hub` | Portal Ring | `#00E5FF` neon cyan | `#FF00C8` magenta | Futuristic, glassmorphic | Poppins / Inter |
| 05 | `pixel-tech` | Pixel→Smooth | `#39FF14` neon green | `#9B30FF` electric purple | Cyberpunk, dev-friendly | Orbitron / Inter |

Source of truth for each kit: `phlix-server/docs/brand/brand_identity.md` (do not paraphrase — quote it).

## 3. Repo layout

```
phlix-website/
├── shared/
│   ├── content.json
│   ├── data/brand-kits.json
│   └── assets/                      brand-neutral SVGs (github mark, etc.)
├── variants/<NN>-<slug>/
│   ├── index.html                   (and 7 sibling .html pages)
│   ├── css/{base.css, theme.css, components.css}
│   ├── js/main.js
│   ├── img/{logo.svg, og.png, PROMPTS.md}
│   └── VARIANT.md                   what's distinctive, how to extend
├── reviews/<NN>-<slug>/
│   ├── accessibility.md
│   ├── usability.md
│   ├── responsive.md
│   ├── performance.md
│   ├── localization.md
│   ├── cta-funnel.md
│   ├── content-quality.md
│   ├── social-metadata.md
│   ├── seo.md
│   ├── branding-consistency.md
│   ├── tester.md                    functional/QA pass
│   ├── documenter.md                doc completeness pass
│   ├── code-review.md               implementation review
│   └── ROUND-<N>-SUMMARY.md         per-iteration collation
├── tools/
│   ├── build.mjs                    static build, fan-out by variant
│   ├── dev-server.mjs
│   ├── preview-all.mjs              serve all five side-by-side
│   └── render.mjs                   shared template renderer (content.json → html)
├── docs/{PLAN.md, HANDOFF_PROMPT.md, AGENT_CONTRACTS.md, REVIEW_RUBRICS.md}
└── .github/workflows/{pages.yml, lint.yml, linkcheck.yml, lighthouse.yml}
```

## 4. Tech stack

- **Static.** Plain HTML + CSS + vanilla JS. No framework. No bundler beyond a tiny Node build script that interpolates JSON into HTML templates.
- **Node 20** for tooling only (linting, build, link-check, Lighthouse, pa11y).
- **`package.json`**, no `composer.json` — the site is HTML/JS-only. PHP belongs in `phlix-server`.
- **GitHub Pages** for hosting (`gh-pages` deploy from `dist/`).
- **Fonts**: self-hosted WOFF2 from Google Fonts (no runtime CDN call — better privacy and Lighthouse).
- **Icons**: inline SVG sprite per variant.

## 5. Repo metadata (GitHub)

**Description** (≤350 chars):
> Marketing site for Phlix — a self-hostable PHP media server with Roku, Tizen, Windows, and Mobile clients. Ships five concurrent design variants from the Phlix brand kits (minimalist cinema, spotlight projector, retro film reel, portal hub, pixel-tech).

**19 topics** (GitHub allows 20; one slot left for future use):
```
phlix                      media-server               streaming
plex-alternative           jellyfin-alternative       emby-alternative
self-hosted                landing-page               marketing-site
static-site                html5                      css3
javascript                 responsive-design          accessibility
seo                        brand-design               multi-theme
open-source
```

## 6. The agent pipeline

This is the part that runs *after* the skeleton is committed. The pipeline is encoded in `docs/HANDOFF_PROMPT.md`; this section explains its shape.

### 6.1 Phase B — Build (5 parallel agents, one per variant directory)

**Parallel-by-directory is the central rule of this project.** Each variant lives in its own subtree; no agent ever crosses between them. The five builder agents launch from a single message and each operates exclusively inside its assigned directory:

| Agent slot | Working directory | Brand kit (read-only) |
|------------|-------------------|-----------------------|
| Builder #1 | `variants/01-minimalist-cinema/` | `phlix-server/docs/brand/brand_identity.md` § "Concept 1: Minimalist Cinema Icon" |
| Builder #2 | `variants/02-spotlight-projector/` | § "Concept 2: The Spotlight Projector" |
| Builder #3 | `variants/03-retro-film-reel/` | § "Concept 3: Retro Film Reel Badge" |
| Builder #4 | `variants/04-portal-hub/` | § "Concept 4: Portal / Hub Icon" |
| Builder #5 | `variants/05-pixel-tech/` | § "Concept 5: Pixel-Tech Hybrid" |

**Hard isolation rules:**
- A builder MAY read anything under `shared/`, `phlix-server/docs/brand/`, and its own `variants/<NN>-*/` directory.
- A builder MUST NOT read or write any other `variants/<MM>-*/` directory. No copy-pasting between variants — the visual independence of the five outputs is the whole point.
- A builder MUST NOT modify `shared/content.json`, `shared/data/brand-kits.json`, `tools/`, `docs/`, or `.github/`. Those are driver-level changes routed through the supervising session.
- All five builders run **simultaneously** from a single message containing five `Agent` tool calls — not sequentially.

Each builder:

1. Reads `phlix-server/docs/brand/brand_identity.md` (its own section), `shared/content.json`, `shared/data/brand-kits.json`, and the existing `variants/<NN>-*/VARIANT.md` brief.
2. Implements all 8 pages, the CSS theme, the JS, and `img/PROMPTS.md`.
3. Writes a brief `variants/<NN>-*/BUILD_LOG.md` describing what it did and any deviations.

**Builder agent contract** (full version in `docs/AGENT_CONTRACTS.md`):
- MUST consume content from `shared/content.json` verbatim — no rewriting marketing copy.
- MUST use brand tokens from `shared/data/brand-kits.json` — no off-palette colors.
- MUST include `<meta>` tags from the `meta` block in `content.json` + variant-specific `og:image`.
- MUST be keyboard navigable. Skip-link, visible focus, no positive `tabindex`.
- MUST be responsive 320 → 1920 px.
- MUST NOT introduce frameworks, bundlers, or build steps beyond the existing `tools/build.mjs`.

### 6.2 Phase R1 — First-pass review + fix loop (parallel across the five directories)

The five variant subtrees are independent throughout the entire review/fix pipeline. R1 runs as **five concurrent reviewer/fixer pairs**, each scoped to one directory:

| R1 pair | Source dir (read+write) | Review output dir (write-only) |
|---------|-------------------------|--------------------------------|
| Pair #1 | `variants/01-minimalist-cinema/` | `reviews/01-minimalist-cinema/` |
| Pair #2 | `variants/02-spotlight-projector/` | `reviews/02-spotlight-projector/` |
| Pair #3 | `variants/03-retro-film-reel/` | `reviews/03-retro-film-reel/` |
| Pair #4 | `variants/04-portal-hub/` | `reviews/04-portal-hub/` |
| Pair #5 | `variants/05-pixel-tech/` | `reviews/05-pixel-tech/` |

Within a pair the work is sequential (reviewer, then fixer, then reviewer again — they share state through the review file). Across pairs everything is parallel — five independent loops, five independent directory pairs, zero cross-talk.

```
Reviewer → writes reviews/<NN>-*/code-review.md
    │
    ├─ if no problems → continue to Phase R2
    └─ if problems   → Fixer reads code-review.md, applies fixes,
                       Reviewer re-runs → loop until code-review.md has zero ❌ items.
```

Cap the loop at **5 rounds**. If still not green, fixer writes `code-review-STUCK.md` documenting what's blocking and the human resolves.

### 6.3 Phase R2 — Tester + Documenter (per variant, parallel within variant)

- **Tester**: clicks through all 8 pages, verifies nav, footer links, CTAs, mobile menu, focus order, `<form>` validation if any, copies into `reviews/<NN>-*/tester.md` with a pass/fail line per checked item.
- **Documenter**: confirms `VARIANT.md`, `BUILD_LOG.md`, and `img/PROMPTS.md` are accurate and complete. Updates the root `README.md`'s variant table if needed. Writes `reviews/<NN>-*/documenter.md`.

Both run in parallel. Their findings feed Phase R3.

### 6.4 Phase R3 — Comprehensive review battery (per variant directory, all ten parallel)

R3 is the maximum-parallelism phase: each of the five variant directories gets its own batch of **ten** reviewers, all launched simultaneously from a single message. Every reviewer agent is **directory-scoped** — it reads only its assigned `variants/<NN>-*/` and writes only to its assigned `reviews/<NN>-*/<dimension>.md`. No reviewer ever opens another variant's directory.

Total parallel agents in this phase: 5 directories × 10 dimensions = up to 50 simultaneous reviewers. If the harness cannot run 50 in parallel, batch by variant directory (10 at a time) and rotate through the five directories — each batch is still ten parallel reviewers locked to one directory pair.

Reviewer batch per variant directory:

| Reviewer | Output file | Rubric (full in `docs/REVIEW_RUBRICS.md`) |
|----------|-------------|--------------------------------------------|
| Accessibility | `accessibility.md` | WCAG 2.2 AA: contrast, focus, alt text, ARIA, keyboard, motion, form labels |
| Usability | `usability.md` | Nielsen heuristics, IA clarity, error prevention, recognition over recall |
| Responsive | `responsive.md` | 320/375/414/768/1024/1280/1920 viewport probes, touch targets ≥44 px |
| Performance | `performance.md` | Lighthouse perf ≥90, LCP <2.5s, CLS <0.1, INP <200ms, asset budgets |
| Localization | `localization.md` | i18n readiness: hard-coded strings, lang attr, date/number formats, RTL, font subsetting |
| CTA / Funnel | `cta-funnel.md` | Visibility of primary CTA, secondary path, friction count, conversion logic |
| Content Quality | `content-quality.md` | Tone match to brand voice, clarity, jargon audit, claims accuracy vs phlix-server reality |
| Social Metadata | `social-metadata.md` | OG, Twitter card, JSON-LD, favicon set, og:image render-test, share previews |
| SEO | `seo.md` | Title/meta lengths, headings, semantic HTML, schema.org, sitemap.xml, robots.txt, canonical |
| Branding Consistency | `branding-consistency.md` | Adherence to brand_identity.md kit: colors, fonts, voice, do/don't list |

Every output uses the rubric template in `docs/REVIEW_RUBRICS.md`:
- ✅ Passed items
- ⚠️ Concerns (non-blocking)
- ❌ Failures (must fix)
- 📊 Score (0–100) per dimension
- Recommendations (ordered by impact)

### 6.5 Phase C — Collate + plan improvements

After all R3 outputs land, one **collator agent** per variant reads every `reviews/<NN>-*/<dimension>.md` and emits `reviews/<NN>-*/ROUND-<N>-SUMMARY.md` containing:
- Aggregate score (weighted average across dimensions; weights in `docs/REVIEW_RUBRICS.md`)
- Top-10 ranked issues across all dimensions
- A **concrete improvement plan**: numbered, with file paths, acceptance criteria, estimated lines-of-change

### 6.6 Phase I — Improve (iteration, parallel across the five directories)

One improvement agent per variant directory, all five launched simultaneously. Each consumes its own `reviews/<NN>-*/ROUND-<N>-SUMMARY.md`, applies fixes only within its `variants/<NN>-*/` subtree, and appends to its `BUILD_LOG.md`. Cross-variant fixes (a shared bug surfacing identically in all five) route through the driver, not through an improvement agent.

Then **return to Phase R3** for the next round. Loop until either:
- Aggregate score ≥ 90 across all 10 dimensions AND zero ❌ items, **or**
- Round number ≥ 5 (cap — escalate to human review)

### 6.7 Cross-variant final phase

Once all five variants pass: one **comparator agent** reads every `ROUND-*-SUMMARY.md` and writes `reviews/COMPARISON.md` — strengths, audiences, recommended primary, suggested merge of best ideas from each into a hypothetical "v2".

## 7. Reviewer disciplines (what each does, in two sentences)

- **Accessibility**: WCAG 2.2 AA. Audits keyboard nav, color contrast, focus order, alt text, ARIA, prefers-reduced-motion, form labels, semantic landmarks.
- **Usability**: Applies Nielsen heuristics. Verifies IA clarity, error prevention, recognition over recall, and that the primary user goal (download Phlix) is reachable in ≤2 clicks from the home page.
- **Responsive**: Probes at 320/375/414/768/1024/1280/1920 widths plus orientation changes. Confirms touch targets ≥44 px and that no horizontal scroll appears anywhere.
- **Performance**: Lighthouse performance ≥90, Core Web Vitals (LCP/CLS/INP) within thresholds, asset-size budgets per page, font-display strategy, lazy loading.
- **Localization**: Hunts hard-coded strings, missing `lang` / `dir` attrs, locale-unsafe date/number formatting, RTL safety, and font subset coverage for non-Latin scripts.
- **CTA / Funnel**: Counts steps to conversion, visibility/contrast of primary CTA above the fold, presence of a secondary path, and friction (unnecessary fields, surprise modals).
- **Content Quality**: Cross-checks every claim against `phlix-server` reality (commands, version numbers, feature list). Audits tone against the variant's voice in `brand-kits.json`.
- **Social Metadata**: Open Graph, Twitter card, JSON-LD, favicon set (16/32/180/192/512 + manifest), og:image render-tested at 1200×630.
- **SEO**: Title/meta lengths, single H1, heading hierarchy, semantic HTML, schema.org SoftwareApplication, sitemap.xml, robots.txt, canonical URLs.
- **Branding Consistency**: Diffs the rendered variant against `brand_identity.md` for its concept — colors, fonts, voice, do/don't compliance.

## 8. Image generation

No image model is wired in. Two-phase strategy:

1. **Now**: CSS/SVG-only artwork. Each variant's `img/` folder gets handcrafted SVGs (logo, hero illustration, feature icons) following its brand kit. Placeholder photography uses tasteful gradient blocks with overlaid icons, not Lorem Picsum stock.
2. **Later**: Each `variants/<NN>-*/img/PROMPTS.md` contains the exact Midjourney / DALL·E / Stable Diffusion prompts (copied verbatim from `phlix-server/docs/brand/svg_prompts.md`) for: logo, app-icon, hero scene, screenshot mocks, social `og:image`. When an image model becomes available, replace the SVG placeholders with model output. PROMPTS.md must include the resolution and aspect ratio per asset.

## 9. Acceptance criteria for the project

- All five variants build with `npm run build` and deploy to GH Pages via the `pages.yml` workflow.
- Every page in every variant passes the Phase R3 battery with **aggregate ≥90 and zero ❌**.
- `reviews/COMPARISON.md` exists and recommends a primary variant.
- The repo has the description set and 19 topics attached.
- A live preview URL appears in the README.

## 10. Out of scope

- Analytics, A/B testing, marketing pixels.
- Cookie banner (none needed — no tracking).
- Pricing pages (project is BSD-3 free).
- Blog. Press kit. (Both deferred to a later milestone.)
