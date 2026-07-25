# Content Quality Review — Neon Noir

**Variant**: neon-noir
**Round**: 1
**Reviewer**: adversarial reviewer (claude-opus-5)
**Date**: 2026-07-25

## Score

- **Content Quality**: 80 / 100

## ✅ Passed

- **Voice holds across all nine pages.** Short, declarative, active, wry, no exclamation marks anywhere, no corporate filler. "Your server never leaves the building. You do." (`hub.html`), "Already installed. It came with the television." (`download.html:243`), "Files walk in. The board sorts itself. Nobody has to lift a pen." (`features.html:149`), "The relay is waiting on a server." — this is genuinely the register `voice`/`tone`/`writing_style` describe, sustained, not a first-paragraph veneer.
- Zero `avoid_words` (`cozy`, `warm`, `fun`, `friendly`, `robust`, `synergy`, `leverage`, `utilize`, `exciting`, `awesome`, `amazing`, `pop`) in any page.
- **Every technical claim traces to `shared/content.json` and matches phlix-server reality**: "PHP 8.3+ on Workerman", "Workerman 5.x", "Argon2ID", "JWT auth with refresh tokens", "up to 5 profiles per user", "4- or 6-digit PINs", "rating filter from G to NC-17", "TMDB, TVDB, Fanart.tv, and local NFO with 24-hour cache", "weighted-mean NTP offset over 5 samples", "CRF 23/28 libx264/libx265", "ChannelManager, GuideManager, Recorder", "ContentDirectory / AvTransport / SSDP", "LifecycleInterface". All eight feature bodies and all six FAQ answers are `content.json` verbatim.
- **No fabricated counts.** `proof_strategy` asks for a "live star count" and the kit says "never hard-coded"; the site correctly ships labelled links to `/stargazers` and `/issues` and prints no number (`index.html:508-526`). No testimonials invented. No unsupported clients mentioned.
- **Licence is correct and consistent everywhere**: footer copy, footer link label `License (MPL-2.0)`, the About chapter, the FAQ answer and the JSON-LD `"license": "https://www.mozilla.org/en-US/MPL/2.0/"` all state MPL-2.0 for server + hub and MIT for shared libs/plugins/clients — matching `content.json` exactly. The predecessor site's `BSD-3-Clause` error is genuinely fixed.
- **The "5 native clients" ambiguity was resolved honestly.** `proof_strategy.signals[0]` says "5 native clients"; `content.json` has five `clients[]` but one is "Any DLNA device — no install required". The placard reads "Four native clients — Roku, Samsung Tizen, Windows, Mobile (beta) — plus any DLNA device" (`index.html:479-482`). `content.json` correctly wins over the field prose. Mobile is labelled beta wherever it appears.
- **CTA labels honestly describe their destinations (WCAG 2.5.3).** "Read the Case File" goes to external docs and is glossed "(the docs)" (`index.html:135`); every noir nav label carries the canonical page name as a visible gloss ("The Case / Home", "Get Access / Download"); "Run the Server" targets `download.html#server`.
- Footer column labels and hrefs are `content.json` verbatim, including the corrected `API reference` href.
- Grammar and spelling clean across all nine pages. Typographic apostrophes used consistently.

## ⚠️ Concerns (non-blocking)

- **`sites/neon-noir/REGEN_PLAN.md:163-165`** — the escalation note tells the orchestrator that `shared/content.json meta.og_image` is `/img/og.svg`, "an SVG and an absolute path, both of which `check-meta` rule 5 / §11 forbid". The actual value is `img/og.png` — relative, PNG — accompanied by an `og_image_note` spelling out the exact contract the site already follows. The escalation is false and would send the orchestrator to fix a non-problem. Correct or delete it.
- `features.html:118-119` "Eight tools, pinned to the wall with the serial still on them. **Each one does a job the one before it could not.**" — the second sentence is a rhetorical flourish that is not true of the set (DLNA and the plugin system are not successors to Live TV). Minor, but it is an unsupported claim about the product.

## ❌ Failures (must fix this round)

- **`index.html:502-507`** — the `#trust-play` case-file quote is attributed to `<cite>The Phlix project brief</cite>`. **No source by that name exists**: the line is `pitch_bullets[0]` from `shared/content.json`, and the citation carries no link, so a reader cannot trace it. Meanwhile `proof_strategy.signals[2]` asks for "One **true short line pulled directly from the docs** about self-hosting", and `REGEN_PLAN.md` §5.3 claims the substitute ships "with a link out to the real docs" — but `#trust-play`'s `.record-links` are three GitHub links (source, stargazers, issues) and there is **no docs link in the band at all**. So the quote text is honest while its attribution is invented, and a `REGEN_PLAN.md` row is claimed-but-not-done. **Required**: attribute the line to what it actually is (e.g. `<cite>` naming the Phlix project pitch, with an `href` to `https://detain.github.io/phlix-docs`), **or** quote a real line from the docs — and add the docs link the plan promises to `.record-links`.

## Recommendations (ranked by impact)

1. Fix the `<cite>` attribution and add the promised docs link to `#trust-play` (impact: high, effort: trivial).
2. Correct or delete the false `og_image` escalation in `REGEN_PLAN.md` §7 (impact: medium, effort: trivial).
3. Soften the "each one does a job the one before it could not" line on Features (impact: low, effort: trivial).

## Evidence

- `shared/content.json` — `pitch_bullets[0..6]`, `features[8]`, `clients[5]`, `faq[6]`, `footer.columns[3]`, `meta.og_image` = `img/og.png`, `meta.og_image_note`.
- `node tools/selfcheck.mjs --site neon-noir` — no `avoid_words` warning.
- Cross-read of all nine pages for voice consistency and fact traceability.
