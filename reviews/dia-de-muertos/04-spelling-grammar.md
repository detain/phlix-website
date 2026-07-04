# Spelling & Grammar Review — Día de Muertos

**Variant**: dia-de-muertos
**Round**: 1
**Reviewer**: adversarial-reviews-agent
**Date**: 2026-07-01

## Score

- **Spelling & Grammar**: 55 / 100

## ✅ Passed

- Zero typos found across all 9 HTML pages (index, features, clients, download, about, docs, hub, plugins, sitemap)
- Consistent American English spelling throughout (no British/American inconsistencies)
- Consistent active voice — "Stream to your Roku", "Sign in once. Reverse-tunnel relay handles NAT"
- Consistent sentence structure — no sentence fragments except intentional copy styles (e.g., "Self-hosted media. Open source. No lock-in." in about.html is purposeful short-form)
- No contractions that would reduce formality inappropriately
- `index.html:419` footer copy "© 2026 Phlix — BSD-3-Clause" — correct copyright format
- No grammar errors in technical descriptions (features, download, clients pages)
- Consistent tense: present tense throughout ("streams", "signs in", "handles NAT", "picks the right quality") — correct for marketing content
- All product names capitalized correctly: Phlix, Roku, Samsung Tizen, DLNA, SyncPlay, FFmpeg, Electron, React, TypeScript, VitePress, Workerman
- Proper use of em-dashes in compound sentences
- Consistent Oxford comma usage in lists
- No double negatives
- FAQ answers at `about.html:115-154` are grammatically correct and well-structured

## ⚠️ Concerns (non-blocking)

- `index.html:115` eyebrow "Self-hosted media server" is not in the brand kit's `vocabulary` or `greetings` list. While not a grammar error, it sets a cold technical tone inconsistent with the brand voice which should feel "like an invitation to an ofrenda" per the brand kit
- `download.html:148` button label "Get Mobile (Beta)" — the parentheses around "Beta" are appropriate for indicating beta status, but the capitalization is inconsistent with other buttons which use title case without parentheticals ("Get Roku", "Get Tizen", "Get Windows"). This is minor inconsistency but not an error
- `about.html:91` page-lead "Self-hosted media. Open source. No lock-in." uses sentence fragments as a stylistic choice — this is acceptable for marketing copy but creates a terse, punchy tone that is inconsistent with the brand kit's "warm, generous sentences. Declarative but tender." guidance
- `clients.html:183` h2 "Any DLNA device" — using "Any" with uppercase "DLNA" is fine but the phrasing "Any DLNA device" is less elegant than "Any DLNA Device" or "Any DLNA-Compatible Device" would be. Not an error, just slightly flat marketing copy

## ❌ Failures (must fix this round)

- **All 9 HTML pages** — Zero instances of brand kit `vocabulary` words in visible copy. Brand kit `vocabulary` at `brand-kits/dia-de-muertos.js:810` lists: "marigold", "altar", "remember", "celebrate", "honor", "return", "glow", "petals", "beloved", "story". None of these words appear in any page's visible copy (eyebrows, headlines, subheadlines, body text, CTAs, badges, micro-copy). The brand kit explicitly states "Every extra cold word weakens the celebratory register" and copy should use "Day of the Dead and folk-art vocabulary sparingly and precisely." The complete absence of brand vocabulary means the copy reads as generic Phlix marketing content rather than a Día de Muertos branded experience. Required: rewrite all visible copy to incorporate at least some brand vocabulary appropriate to each page's function
- **`index.html:116`** — H1 "Your media. Your library. Your Phlix." uses the generic shared content headline from `shared/content.json`. The brand kit's `tagline_primary` "Remember. Celebrate. Live." should be the primary hero headline to carry the brand identity. Instead it only appears in the `<title>`. The brand kit's `writing_style` says copy should feel like "an invitation to an ofrenda" — this headline is a tech product tagline, not a brand invitation. Required: use brand kit tagline or write a new headline that incorporates brand vocabulary
- **`index.html:361`** — Footer tagline "Open-source media, on your terms." uses the shared content "footer.tagline". This is generic tech marketing copy with zero brand identity. Compare to brand kit's `greetings` and `empty_state_messages` which are warm and culturally specific. This tagline could be an opportunity to reinforce the Día de Muertos brand spirit. Required: write a brand-kit-specific footer tagline using vocabulary from the brand kit's voice guidelines
- **`index.html:419`, `features.html:379`, `clients.html:264`, `download.html:270`, `about.html:218`, `docs.html:214`, `hub.html:184`, `plugins.html:191`** — All footers use copyright line "© 2026 Phlix — BSD-3-Clause". While technically correct, the brand kit's `notification_style` says notifications should be "Warm and direct — like a message passed at an ofrenda." A simple copyright line without any brand warmth is cold. Not a blocking failure but a missed opportunity for brand expression
- **All pages** — No use of brand kit `greetings` anywhere: "Welcome back. Your stories are waiting.", "The altar is lit. Time to remember and celebrate.", "Every film is a marigold path. Choose yours." None of these appear on the site. The brand kit expects at least one of these greetings to appear in the experience. Required: incorporate at least one brand greeting

## Recommendations (ranked by impact)

1. Rewrite all visible copy to use brand kit vocabulary (impact: high, effort: high)
2. Use brand kit tagline_primary "Remember. Celebrate. Live." as the hero headline or prominent on-page element (impact: high, effort: low)
3. Use at least one brand kit greeting in the hero or as a welcome message (impact: high, effort: low)
4. Replace footer tagline with brand-kit-aligned copy (impact: medium, effort: low)
5. Replace page-lead text on all inner pages with brand-aligned copy (impact: medium, effort: medium)
6. Use brand kit empty_state_messages for any placeholder content areas (impact: low, effort: low)

## Evidence

- Brand kit vocabulary list: `brand-kits/dia-de-muertos.js:810`
- Brand kit greetings: `brand-kits/dia-de-muertos.js:818-822`
- Brand kit empty_state_messages: `brand-kits/dia-de-muertos.js:824-829`
- Brand kit writing_style: `brand-kits/dia-de-muertos.js:804-808`
- Brand kit tagline_primary: `brand-kits/dia-de-muertos.js:106`
- Search for brand vocabulary across all HTML pages: grep for "marigold|altar|remember|celebrate|honor|return|glow|petals|beloved" — zero matches
