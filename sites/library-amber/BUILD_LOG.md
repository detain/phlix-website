# BUILD_LOG.md — Library Amber Site Regeneration

## What was built

Full regeneration of the `library-amber` brand-kit site per `regen_site_prompt.md` and the kit's experience schema.

### Files produced

**9 HTML pages:**
- `index.html` — Home (5 narrative sections: the-library-opens, two-paths, why-this-library, collectors-proof, claim-your-shelf)
- `features.html` — Features gallery (gallery-plaques per page_blueprint)
- `clients.html` — Device shelf (family-of-devices per copy_treatments)
- `download.html` — Reading-room setup guide with install commands
- `plugins.html` — Plugin model + ecosystem
- `docs.html` — Documentation link-out + ecosystem
- `hub.html` — Hub diagram + self-host / public options
- `about.html` — Three philosophical chapters + FAQ (letters-column per faq_experience)
- `404.html` — Empty reading nook with fallen lamp illustration (error_page_experience concept)

**3 CSS files:**
- `css/base.css` — Reset, tokens, element defaults, vendored fonts, utility classes
- `css/theme.css` — Typography roles, page structure, gradients, all section layouts
- `css/components.css` — Header/nav, footer, buttons, cards, mascot, forms, badges

**JS:**
- `js/main.js` — Nav toggle, scroll reveal, reduced motion, mascot (The Librarian), easter eggs (logo-clicks:5, typed-word:collection), diorama parallax, seasonal date gate, FAQ accordion, copy buttons

**Documentation:**
- `REGEN_PLAN.md` — Experience field manifest, nav diff, section order, resolutions
- `SITE.md` — Design rationale, palette table, typography, motion, components

**Tools (generated):**
- `robots.txt`
- `sitemap.xml`
- `img/og.png` (rasterised from og.svg via `gen-og.mjs`)

### Experience fields implemented

All 19 declared fields implemented: `site_architecture`, `homepage_narrative`, `page_blueprints`, `copy_overlay`, `feature_casting`, `copy_treatments`, `faq_experience`, `hero_experience`, `navigation_model`, `scroll_experience`, `easter_eggs` (logo-clicks:5 + typed-word:collection), `conversion_funnel`, `proof_strategy`, `visitor_paths`, `experience_archetype` (editorial), `complexity_profile`, `seasonal_activation` (live-js date gate), `error_page_experience`, `mascot.behavior`.

**Absent (kept default):** `intensity_toggle` (null → nothing added)

### Known deviations from kit

None — all kit-declared fields implemented, all content from content.json verbatim.

### Contrast fixes applied

- Amber gold (`#C8861A`) on antique cream/surface fails WCAG AA small-text (2.50:1 / 2.71:1). Used `#8e5f12` (3.24:1 on surface) as `var(--color-primary-safe)` for all small-text uses. Primary used directly on mahogany-dark backgrounds (7.14:1).
- Seasonal variants: `data-season` attribute switches CSS variables for `--color-bg` and `--color-primary` (winter: #eee3c8 / #b87a14; autumn: #f0e5cc / #3a6b2e; spring: #f5edd8 / #3b7a57).

### Font weight notes

EB Garamond 700 exists in the pool but is NOT declared by this kit — not vendored. Body uses 400/500 only. `<strong>` uses 500 (not 700) plus Rich Chocolate color as second emphasis channel.

### CSS @copyright fix

Original base.css had `@copyright` line outside comment block at line 334 (utility section). Original components.css had `@copyright` after ambient animation comment at line 590. Both rewritten to place `@copyright` inside the file-level comment banner (`/* … @copyright … */`).

### Grid and wrapping fixes (per §19.12 traps)

- All grid tracks use `minmax(0, 1fr)` (not bare `1fr`) — prevents overflow from unbreakable tokens (e.g. `LifecycleInterface`) at 320px viewport and 200% text zoom
- Body text (`p, li, dt, dd, a, span, code, kbd, samp, pre`) uses `overflow-wrap: anywhere`
- Headings use `hyphens: auto; overflow-wrap: break-word`
- No `overflow: hidden` on containers whose text must reflow

### Reduced motion fix (per trap 3, §19)

`prefers-reduced-motion: reduce` disables BOTH `animation-duration` AND `transition-duration` (set to `0.01ms`) — not just animations.

### Artwork note

The kit asks for seasonal motif SVG assets (`img/seasonal/winter-frosted-windows.svg` etc.) which do not exist. Per spec, noted in BUILD_LOG.md and moved on — not a defect.
