# Brand Fidelity & Spirit

**Score: 75/100**  
**Severity: ⚠️**

## Findings

### ❌ CRITICAL: Home H1 violates content contract (index.html:130)
The home page `<h1>` reads "Every Story Deserves a Grand Entrance" — this is `tagline_primary` from the brand kit (`bollywood-dreams.js:111`). The spec (§3.1) requires hero.headline from `content.json` ("Your media. Your library. Your Phlix.") as the H1. The brand tagline may appear visually but must not replace the factual product headline.

**Fix:** Set `<h1>` to `hero.headline` from content.json; use `tagline_primary` as a decorative overlay or in the CTA banner section only.

### ❌ CRITICAL: No self-hosted fonts (base.css:117–121)
`base.css` declares Google Fonts via `font-family` stack only — no `@font-face` declarations, no `css/fonts/` directory. The spec (§1) explicitly forbids Google Fonts CDN links: "No CDN dependencies in the deployed page (no Google Fonts `<link>` to `fonts.googleapis.com`). Self-host fonts as WOFF2 and declare with `@font-face` + `font-display: swap`."

**Fix:** Download WOFF2 files for Playfair Display, Cinzel Decorative, Lora, Hind, JetBrains Mono; place in `css/fonts/`; add `@font-face` blocks with `font-display: swap`.

### ❌ CRITICAL: hub feature missing from home feature-grid (index.html:374–574)
The feature-grid on index.html renders only 7 feature-card articles (library, syncplay, transcode, auth, livetv, dlna, plugins). `content.json` defines 8 features including `hub` (id: "hub", title: "Phlix Hub — reach any of your servers from anywhere"). The hub card is absent from the home overview.

**Fix:** Add the 8th article for hub with its icon, title, and body from content.json.features[7].

### ⚠️ WARNING: Hub page uses hub.phlix.io domain without content.json basis (hub.html:148–150)
"The public Phlix Hub at `hub.phlix.io` is free for anyone to use." This domain appears nowhere in `content.json` or `shared/content.json`. The ecosystem list in content.json only references `github.com/detain/phlix-hub`. This is a factual claim about a public service endpoint not anchored in the spec.

**Fix:** Either verify `hub.phlix.io` is an official Phlix property and add to content.json, or rephrase as "The public Phlix Hub is free for anyone to use" without citing the specific domain.

### ⚠️ WARNING: features.html H1 is brand kit copy, not content.json
`features.html:88` uses `<h1>Everything your library deserves</h1>`. This phrase does not appear in `content.json` — it is lifted from the brand kit. While it is not factually wrong, the spec requires substantive product claims (feature bodies, headlines) to come verbatim from `content.json`. Brand kit copy is appropriate only for micro-copy (eyebrows, CTAs, empty states).

**Fix:** Use content from content.json for the page H1, or confirm this text appears in content.json (it does not).

### ⚠️ WARNING: Marquee easing is `linear` instead of brand easing (components.css:749)
`.marquee-track { animation: marquee-scroll 30s linear infinite; }`. The brand kit (`bollywood-dreams.js:588`) specifies easing as `cubic-bezier(0.25, 0, 0.0, 1.0)`, `ease-in-out`, or `cubic-bezier(0.4, 0, 0.2, 1)`. `linear` is not in the approved list and is antithetical to the "slow, opulent" motion identity.

**Fix:** Change to `animation: marquee-scroll 30s cubic-bezier(0.25, 0, 0, 1) infinite`.

## What Passed

- ✅ Color system: all hex values trace exactly to brand kit design tokens (marigold gold #F5A800, fuchsia #CC0066, peacock teal #00A8CC, midnight mandir #0A0505, etc.)
- ✅ All 3 CSS gradient tokens match brand kit specifications (Holi Burst, Marigold Chandelier, Temple Depth, Fuchsia Veil)
- ✅ Typography families correct: Playfair Display for headlines, Cinzel Decorative for display, Lora for body, Hind for UI, JetBrains Mono for mono
- ✅ Typography rules followed: headline tracking -0.01em, display tracking 0.08em, Lora body line-height 1.70
- ✅ Brand opposites checklist: site is warm (not cold/clinical), festive (not minimal), human (not corporate), colorful (not muted), sincere (not ironic)
- ✅ No avoid_words from brand kit appear in any copy
- ✅ Brand vocabulary confirmed present: "grand", "story", "celebrate", "discover", "love", "journey", "majestic", "delight", "magic", "world" all appear
- ✅ Greetings/empty states follow brand voice
- ✅ Signature elements present: rangoli-divider SVG, Mughal arch logo, marigold-gold focus ring, Holi Burst hero gradient, jali/marquee patterns, burnished copper borders
- ✅ Button styles match brand: primary marigold gold on midnight, ghost burnished copper border, FAB pill with glow
- ✅ Max content width 1400px, dark backgrounds only (#0A0505, #160808)
