# BUILD_LOG.md — Renaissance Atelier

## What was built

Full static site for the `renaissance-atelier` brand kit — 9 pages, 3 CSS files, 1 JS file, supporting assets.

### Pages
| Page | Path | Notes |
|------|------|-------|
| Home | `index.html` | 5-section editorial narrative; visitor paths fork; proof band; Piero mascot |
| Features | `features.html` | Illuminated folio layout; all 8 features with headings one level below page h1 |
| Clients | `clients.html` | Portrait gallery treatment; 5 client cards with status badges |
| Download | `download.html` | 3-step guided funnel; install command verbatim from content.json |
| Plugins | `plugins.html` | LifecycleInterface + manifest contract explanation |
| Docs | `docs.html` | Summary + link-out to 4 external doc sections + ecosystem list |
| Hub | `hub.html` | NAT relay explanation; self-hosted vs public diagram; client compatibility |
| About | `about.html` | Philosophy + License (MPL-2.0 per content.json) + Contributing + FAQ |
| 404 | `404.html` | Piero with dimmed lamp; empty canvas; noindex; relative paths |
| Curation Guide | `curation-guide.html` | `extra_pages` — folio-style 4-chapter guide from pitch_bullets + features |

### CSS
| File | Purpose |
|------|---------|
| `css/base.css` | Reset, tokens (:root CSS variables), font-face declarations, base elements, skip link, focus, visually-hidden, reduced-motion |
| `css/theme.css` | Typography scale, editorial layout containers, page structure, hero, pitch/manifesto-cards, features-grid, proof-band, cta-banner, interior page structures |
| `css/components.css` | Header, nav (topbar + mobile drawer), footer, all button variants, badges, mascot companion, intensity toggle, easter eggs, seasonal variants, 404 page, form elements |

### JS
- `js/main.js` — Mobile nav toggle, scroll reveals (IntersectionObserver), reduced-motion listener, Studio Calm intensity toggle (localStorage), seasonal date-gate, FAQ accordion, Piero mascot tips/dismissal, logo-clicks:5 lantern flare, typed-word:pigment brush cursor, easter toast helper

### Assets
- `robots.txt` — references sitemap.xml
- `sitemap.xml` — 9 canonical pages (excludes 404.html), absolute URLs
- `SITE.md` — design rationale, color table with contrast ratios, typography roles, spatial system, motion, assets
- `BUILD_LOG.md` — this file

## Intentional deviations from spec

1. **`og:image`**: The kit does not provide a specific illustration prompt for `og.png`. The OG image uses a standard sfumato + headline composition matching the site's visual language, not a per-page differentiated image.

2. **Font `Cormorant SC` weight**: The pool has only weight 600 for Cormorant SC (per `font-sources.json`). The kit asks for `[600]` and the pool delivers it. No substitution needed.

3. **`<strong>` emphasis**: The kit's body face is EB Garamond at [400, 500]; weight 700 is undeclared. Per §19.17 fix: `font-weight: 700` + `color: var(--color-secondary)` (Burnt Sienna on vellum = 4.9:1). This is a deliberate departure from a single-channel 500-weight approach.

4. **Intensity toggle default**: `intensity_toggle.default = "full"` (not "calm"), so by default animations run. Calm mode is opt-in.

5. **Mascot desktop-only fixed**: Per §19.11 + §2A, Piero is `position: static` below 768px (in-flow above footer) and `position: fixed` only above 768px.

6. **`proof_strategy` signals**: Kit asks for real GitHub star/issue counts — these are links to the live pages, not printed numbers (fabrication rule §19.7).

7. **FAQ extra questions**: These map to canonical `content.json` answers verbatim, not new facts.

## Known follow-ups

1. **Seasonal motif SVGs** (`img/seasonal/advent-holly-border.svg`, etc.) — the date gate JS is shipped but the motif asset files are not yet generated. The seasonal variant token overrides and date-gate logic are fully functional.

2. **`tools/gen-og.mjs`** should be run to rasterise `img/og.svg` to `img/og.png` (required for `og:image` to be PNG format per selfcheck rule 5). The og.svg placeholder exists but `gen-og.mjs` must be run separately.

3. **`img/PROMPTS.md`** exists from the predecessor site — it should be reviewed against the kit's `image_prompt_prefix` + `image_prompt_suffix` + `prompt_library` and updated to reflect the Renaissance Atelier prompts.

4. **Prettier**: Run `npx prettier --write "sites/renaissance-atelier/**"` before commit to normalise formatting.
