# Content Quality Review — Abstract Canvas

**Variant**: abstract-canvas
**Round**: 1 (regen pass, `regen/wave-1`)
**Reviewer**: adversarial reviewer (independent)
**Date**: 2026-07-24

## Score

- **Content Quality**: 82 / 100

## ✅ Passed

- **Voice holds across nine pages.** `voice: ["Thoughtful","Cultivated","Direct","Honest"]` and
  "catalogue wall text" is a real, sustained register — the manifesto (`index.html:423-427`), the five
  station talks, the About chapters and the 404 all sound like the same curator. It never drifts into
  generic marketing.
- **Zero `avoid_words` in visible prose.** I stripped `<head>`/`<script>`/comments and scanned the
  rendered text of all 9 pages for the 13 banned terms: the only hit is the mandated
  "Skip to main **content**" skip-link. Zero exclamation marks across the site
  (`do_dont.copywriting` forbids them).
- **Facts are verbatim and complete.** All 7 pitch bullets, all 8 feature titles and bodies, all 5
  clients with their **full** highlight lists (`clients.html`), all 5 ecosystem rows and all 6 FAQ
  answers match `shared/content.json` word for word. The `<details>` disclosure preserves every
  engineering sentence rather than paraphrasing it away.
- **Licence handled correctly** — MPL-2.0 (server + hub) + MIT (libraries, plugins, clients) in the
  footer of all 9 pages, About chapter II, the FAQ answer and the JSON-LD `license` URL. Never stated
  "across the board"; the footer label is the `content.json` label.
- **No fabrications.** `proof_strategy` prints no star count, contributor count, download total or
  user number; it links `/graphs/contributors` and `/pulse` instead (§19.7). No testimonials, no
  invented clients, no unsupported client mentioned, no competitor framing beyond the
  `content.json` "Plex / Jellyfin / Emby" FAQ line. The docs quote at `index.html:507` is a verbatim
  substring of the FAQ answer and is attributed to the FAQ.
- **The secondary CTA is honest**: "Browse the Gallery **(the docs)**" — the kit's label kept, the
  destination disclosed, accessible name matching the visible text (WCAG 2.5.3, §19.7).
- Technical claims match §16 throughout: PHP 8.3+, Workerman 5.x, JWT + Argon2ID, 5 profiles,
  4/6-digit PINs, G–NC-17, TMDB/TVDB/Fanart.tv/NFO with 24-hour cache, adaptive HLS + FFmpeg,
  direct play, SyncPlay NTP-style sync, Live TV + DVR + EPG, DLNA ContentDirectory/AvTransport/SSDP,
  `LifecycleInterface` + manifest, hub reverse-tunnel relay, 5 clients with correct statuses
  (mobile = beta).
- `complexity_profile` reading level is genuinely plain in the first read; grammar and spelling are
  clean (British/US mix is consistent enough: "organisation" appears once at `about.html:197`
  alongside US spellings elsewhere — noted, not scored).

## ⚠️ Concerns (non-blocking)

- **`plugins.html:294-297`** — "a provider you write sits beside the built-in TMDB, TVDB, Fanart.tv
  and local-NFO sources **rather than underneath them**" is an architectural claim with no basis in
  `content.json` (which says only "Reference metadata-provider plugin"). Soften to what is traceable.
  — ROUND-1 #21.
- The install snippet itself (`download.html:163-168`) is the only on-screen shell command not sourced
  from `content.json`. That is **acceptable**: `new_site.md` §3.4 mandates an install snippet and
  `content.json` supplies none, and `git clone` + `composer install` is the correct pattern for a
  PHP server application (more accurate, in fact, than the `composer require detain/phlix-server`
  several sibling sites use). The *claim about it* is the problem — see the ❌.
- Every page ships the identical meta/OG description. — ROUND-1 #18.
- **On the five clients' "artist talk" paragraphs** (the author's own open question): they are the
  longest authored prose on the site at 30–33 words each (`clients.html:158-161, 189-193, 220-223,
  251-254, 281-284`), which is comfortably inside `page_budget.words_per_section_max: 100` even
  before the §19.6 exemption for verbatim fact strings, contain **no** `avoid_words`, and stay in
  voice. They pass. The only wobble is that each one restates its own chip list in prose ("Electron
  with React and TypeScript, living in the system tray, answering the media keys") — mild redundancy,
  not a defect.

## ❌ Failures (must fix this round)

- **`download.html:141` and `:156`, `clients.html:303-304`, `features.html:537`, `plugins.html:270`,
  `docs.html:273`, `about.html:310`** — seven separate assertions that the install is "one line",
  against a three-command snippet at `download.html:163-168`. `conversion_funnel.download_opening`
  asks for a "one-liner", but `content.json` supplies no command, so the framing cannot be honoured
  by assertion. Required: make it literally one line
  (`git clone … && cd phlix-server && composer install`) **or** re-voice all seven claims.
  → ROUND-1 #8.

## Recommendations (ranked by impact)

1. Resolve "one line" once, in the snippet, and the other six lines become true for free
   (impact: high, effort: trivial).
2. Trim the untraceable plugin-architecture clause (impact: low, effort: trivial).
3. Give at least the top three pages their own meta description (impact: low, effort: low).

## Evidence

- Scripted diff of all rendered prose against `shared/content.json` (bullets, feature titles/bodies,
  client names/taglines/highlights/statuses, ecosystem rows, FAQ Q&A, footer labels).
- Scripted `avoid_words` and exclamation-mark sweep over visible text only, all 9 pages.
- Word counts per `<main>`: 404 = 43, docs = 182, plugins = 217, hub = 222, download = 289,
  clients = 321, about = 505, features = 555, index = 644.
