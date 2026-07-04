# Readability Review — Día de Muertos

**Variant**: dia-de-muertos
**Round**: 1
**Reviewer**: adversarial-reviews-agent
**Date**: 2026-07-01

## Score

- **Readability**: 62 / 100

## ✅ Passed

- Body font is Lora (`--font-body: 'Lora', Palatino, Georgia, serif` at `base.css:109`) — warm, readable, matches brand kit's `body.family: "Lora"` and `body.usage: "warm, readable, slightly traditional"`
- Body `line-height: 1.7` at `base.css:27` — exactly matches brand kit `body.line_height: 1.7`
- Body `letter-spacing: 0.01em` at `base.css:28` — matches brand kit `body.tracking: "0.01em"`
- No all-caps body copy found anywhere in the site — brand kit rule "Body copy (Lora) must never be set in all-caps" is honored
- Line length is generally appropriate: hero sub at `index.html:117-121` is approximately 65-70 characters wide at standard desktop container width, within the 60-75ch target
- Feature card descriptions at `index.html:179-344` are short (under 80 chars per line) — no walls of text
- Clear visual hierarchy: h1 (4.5rem hero) → h2 (2.25rem section titles) → h3 (1.5rem card titles) → body (1rem) with consistent spacing via `--space-4` margins
- Content is broken into digestible units: pitch bullets, feature cards, client cards, FAQ items — scannable format
- Brand kit `avoid_words` (spooky, scary, horror, grim, gloomy, morbid, creepy, eerie, haunted, terrifying, synergy, leverage, utilize, robust, awesome) — none appear in any copy
- `features.html:97` page-lead is "Everything you need to run a media library that actually works." — direct, scannable, no jargon walls
- `clients.html:97` page-lead "Native apps for every screen you own." — 6 words, scannable

## ⚠️ Concerns (non-blocking)

- `about.html:91` page-lead "Self-hosted media. Open source. No lock-in." — reads as generic tech marketing tagline, not warm Día de Muertos voice. The brand kit specifies the voice should be "warm, generous sentences... tender... emotionally generous... like an invitation to an ofrenda". This reads as a startup slogan, not a cultural celebration. Non-blocking but tone-deaf to brand
- `download.html:94` page-lead "Install the server, grab a client, start streaming." — functional but cold. No warmth or brand identity
- `hub.html:91` page-lead "Reach your server from anywhere." — functional but not branded
- Feature card body text in `index.html:179-344` has technical terms like "ItemRepository", "metadata_json", "S01E02" without any explanation or Día de Muertos cultural framing. While accurate, this is dense technical content on what should be a culturally warm branded page
- Reading level of feature descriptions (e.g., "QualitySelector profiles for mobile-low, mobile-high, web, and tv-4k. CRF 23/28 libx264/libx265 with HLS master and variant playlists.") requires technical background. For "design-conscious adults and cultural enthusiasts" (brand kit audience), this may be accessible but the cultural/aesthetic framing is completely absent, making the page feel like a tech spec sheet rather than a brand-kit experience
- Pitch bullets at `index.html:145-153` average 15-20 words each — readable, but the brand kit copy tone is completely absent. Compare to brand kit's `greetings` and `empty_state_messages` which are poetic and warm — these pages read like a README
- Mobile menu at `components.css:128-132` uses `font-size: var(--text-base)` for nav links — at 900px breakpoint and below, this is acceptable but the expanded menu could benefit from more generous touch-target sizing

## ❌ Failures (must fix this round)

- **`index.html:116`** — H1 headline "Your media. Your library. Your Phlix." is a generic tech product tagline with zero Día de Muertos brand identity. Brand kit `tagline_primary` is "Remember. Celebrate. Live." and the `headline` from shared `content.json` is "Your media. Your library. Your Phlix." — this is the shared content, not brand-kit content. The brand kit's `tagline_primary` should appear in the hero as the primary headline, with supporting copy that sets the Día de Muertos tone. Instead, the hero is pure product marketing in a brand-kit wrapper. This is the most visible copy on the site and it completely ignores the brand identity. Required: rewrite hero headline and subheadline to use Día de Muertos brand voice and vocabulary
- **`index.html:117-121`** — Hero sub: "An open-source PHP media server that streams to your Roku, Samsung TV, Windows desktop, phone, and any DLNA device — with SyncPlay, Live TV, transcoding, and a hub that follows you anywhere." This is the shared content "hero.subheadline" from `shared/content.json` — technically correct as a product description but entirely generic tech copy with no brand identity. The brand kit's `story` and `writing_style` describe the voice as "warm, generous sentences. Declarative but tender. Active voice with emotional resonance... Copy should feel like an invitation to an ofrenda — rich, heartfelt, and alive with memory." This sub reads like a product datasheet. Required: write brand-kit-specific hero copy that matches the Día de Muertos voice
- **`components.css:451-458`** — Footer column headings are `text-transform: uppercase` via `letter-spacing: 0.08em` and `text-transform: uppercase` on h3. This violates the brand kit rule against all-caps body copy in principle (the footer headings are UI chrome, not body copy, but uppercase headings reduce warmth). The brand kit's `typography_rules` say "Body copy (Lora) must never be set in all-caps" — footer headings using uppercase IBM Plex Sans at small size is not technically a violation but is a tonal inconsistency. Consider using title-case or sentence-case for footer headings to maintain warmth
- **All pages** — The brand kit's warm, celebratory, culturally rich voice is entirely absent. Every page reads as generic tech product marketing with Día de Muertos colors. While the colors, fonts, and layout are brand-compliant, the copy is the most powerful brand expression on a marketing site and it completely ignores the Día de Muertos identity. This is not technically a "readability" failure in the WCAG sense, but it is a fundamental brand spirit failure that makes the site feel like a reskin rather than a genuine brand-kit implementation. This contributes to the low readability score because the content does not flow from the brand identity

## Recommendations (ranked by impact)

1. Rewrite hero section copy to use Día de Muertos brand voice (impact: high, effort: high)
2. Rewrite all page-lead/eyebrow/subheadline copy to use brand vocabulary (impact: high, effort: high)
3. Replace generic footer tagline "Open-source media, on your terms." with something brand-aligned (impact: medium, effort: low)
4. Use brand kit greetings on the hero or as a rotating banner (impact: medium, effort: medium)
5. Lower footer heading text to sentence-case or title-case from all-caps (impact: low, effort: low)
6. Add brand kit `empty_state_messages` to any placeholder/empty states (impact: low, effort: low)

## Evidence

- Brand kit body font spec: `brand-kits/dia-de-muertos.js:408-414`
- Brand kit typography rules: `brand-kits/dia-de-muertos.js:442-449`
- Brand kit voice/writing_style: `brand-kits/dia-de-muertos.js:804-808`
- Brand kit vocabulary: `brand-kits/dia-de-muertos.js:810`
- Brand kit greetings: `brand-kits/dia-de-muertos.js:818-822`
- Body text CSS: `sites/dia-de-muertos/css/base.css:25-29`, `sites/dia-de-muertos/css/theme.css:44-49`
- Hero copy: `sites/dia-de-muertos/index.html:115-130`
- Footer tagline: `sites/dia-de-muertos/css/components.css:432-440`
