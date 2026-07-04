# Spelling & Grammar Review — Cosmic Horror

**Variant**: cosmic-horror
**Round**: 1 (adversarial)
**Reviewer**: adversarial-code-reviewer
**Date**: 2026-07-04

## Score

- **Spelling & grammar**: 95 / 100

## ✅ Passed

- Zero typos detected in any visible copy across all 8 pages — all technical terms (PHP, FFmpeg, DLNA, SyncPlay, Argon2ID, TMDB, etc.) spelled correctly
- Consistent tense throughout — present tense, academic voice, no shifting between past/present
- Consistent voice — formal, third-person, no informal address
- No `avoid_words` from kit's list (fun, awesome, amazing, exciting, cozy, warm, friendly, wow, incredible, love, enjoy, great, fantastic, pop, synergy, leverage, utilize, robust, seamless) found in any visible copy — verified via grep across all HTML files
- Punctuation consistent — no exclamation marks (kit `notification_style` prohibits them), no periods where they shouldn't be
- Grammar clean: articles used correctly, subject-verb agreement consistent, no sentence fragments
- Kit voice phrases used appropriately: "That Which Has Always Been Watching" (tagline_primary), "The stars are correct. Press play." (cta-banner on about.html), "Begin the descent" (features.html cta), "Something this ancient doesn't need your attention. It has it already." (hub.html cta)
- content.json copy appears verbatim: hero subheadline, pitch bullets, feature bodies, FAQ answers — all match source exactly

## ⚠️ Concerns (non-blocking)

- **about.html:104 — "The archive is open. What you do with it is your concern."** — The kit greeting says "The archive is open." (singular statement). The page-lead adds a second sentence. This is acceptable brand-flavored micro-copy per new_site.md §2 but slightly extends the kit's source. Not a violation. — *impact: negligible*
- **hub.html:98 — "That which observes your servers, now observes you."** — This is a brand-crafted tagline for the page, not content.json copy. It grammatically works ("that which... now observes you" is correct). No issue. — *impact: negligible*

## ❌ Failures (must fix this round)

None — no blocking issues in this dimension.

## Recommendations (ranked by impact)

No changes recommended — spelling and grammar are clean.

## Evidence

- Grep across all 8 HTML files for avoid_words list — zero matches
- Manual review of all visible text strings in all HTML files confirms consistent formal/academic voice
- content.json copy verification: hero subheadline matches index.html:116-119 verbatim; pitch_bullets match index.html:138-146 verbatim; all feature bodies match features.html; all FAQ items match about.html
- Zero exclamation marks in any visible copy on any page
