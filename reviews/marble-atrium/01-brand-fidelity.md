# Brand Fidelity & Spirit — marble-atrium

**Score: 72/100** — Kit identity is well-expressed but two substantive regressions: missing hub feature on home overview, and fonts are not actually self-hosted despite comments claiming they are.

## Findings

- `css/base.css:10-76` ✅ All 13 color tokens from `design_tokens.color` mapped to CSS custom properties, correct hex values per kit §17.
- `css/base.css:51-57` ✅ Font family tokens mapped correctly to Cormorant Garamond, Jost, DM Mono per kit §7.
- `css/base.css:28-30` ✅ Shadow tokens use cool-neutral `rgb(140, 140, 132, N)` — correct stone-shadow tone per kit §13 shadows notes.
- `css/base.css:72-75` ✅ Gradient tokens defined from kit's gradient specs; stops use kit palette values.
- `css/theme.css:131-141` ✅ Glass-ceiling grid hero motif implemented via `hero::after` with 80px grid at 15% opacity — matches kit signature element.
- `css/theme.css:416-423` ✅ `marble-vein-reveal` keyframe animates `clip-path: circle()` from centre outward — matches kit `header_motif`.
- `css/theme.css:225-243` ✅ `features-overview` grid uses `repeat(auto-fill, minmax(280px, 1fr))` with 32px gap — matches kit `media_library` layout pattern.
- `css/components.css:292-306` ✅ `feature-card` hover: `translateY(-1px)`, `shadow-sm`, gold border fade-in over 200ms — matches kit microinteractions.hover.
- `css/components.css:178-195` ✅ `btn-primary`: gold fill `#B8960C`, rectilinear 2px radius — matches kit `buttons.primary`.
- `css/theme.css:186-224` ✅ Pitch section: 1px hairline gold `::before` rule as list marker — matches kit "gold as single point of warmth."
- `index.html:93` ⚠️ `hero-headline` uses "Your Library, Elevated." (kit `tagline_primary`) — appropriate visual headline overlay per new_site.md §2 note.
- `index.html:94` ✅ Hero subheadline matches `hero.subheadline` from content.json verbatim.
- `index.html:103-117` ✅ All 7 `pitch_bullets` from content.json present verbatim.
- `index.html:119-180` ❌ **Home page features overview shows only 7 `feature-card` elements (library, syncplay, transcode, auth, livetv, dlna, plugins) — the 8th feature "hub" is absent from the grid.** content.json defines 8 features; features.html correctly shows all 8. new_site.md §3.1 requires "a card grid of all 7 features" in the overview, but content.json has 8 features. The hub feature is buried only on features.html and hub.html, not surfaced on the home page overview where users first encounter the product. This is a real content-accuracy defect — the home overview is incomplete.
- `features.html:135-142` ✅ Hub feature detail present with correct content from content.json.
- `css/base.css:48-51` ❌ **Font comments claim "self-hosted WOFF2 subset" but no WOFF2 files exist anywhere in the site.** `img/` contains only logo.svg, favicon.svg, og.svg, PROMPTS.md. `css/fonts/` does not exist. The `@font-face` declarations are referenced in comments but no actual font files are present — the BUILD_LOG.md:89 itself acknowledges "Self-host WOFF2 fonts... (currently using system serif/sans-stack; web font integration pending)." This is a fundamental spec breach: new_site.md §8 explicitly forbids CDN font links and requires self-hosted WOFF2, yet the fonts are not present at all. The site falls back to Georgia/Times New Roman system fonts, which are not the kit's Cormorant Garamond/Jost typefaces.
- `img/logo.svg:7-12` ⚠️ Wordmark uses Georgia instead of Cormorant Garamond. Kit §7 `fonts.headline` specifies Cormorant Garamond with Georgia as a fallback — Georgia is an acceptable fallback per the kit, but the SVG wordmark is pure Georgia rather than the brand font. This undermines the "typography carries the luxury" principle. Not a crash but not the kit either.
- **avoid_words check** — scanned all 8 HTML pages for: awesome, amazing, supercharge, leverage, synergy, disruption, cutting-edge, seamless, robust, utilize, binge, obsessed. ✅ None present anywhere in content.

## Verdict

**Fail** — brand identity expression is strong in colors, spacing, motion, and micro-interactions, but the missing hub feature on the home overview is a real content gap, and the font situation is a confirmed spec breach (documented but unfixed). The site cannot claim full brand fidelity while these two issues remain.
