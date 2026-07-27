# BUILD LOG — Art Nouveau Garden Brand Kit Site (Regenerated)

## What was built

**Site path:** `sites/art-nouveau-garden/`
**Brand kit:** `brand-kits/art-nouveau-garden.js` (base kit, v1.0)
**Layout archetype:** narrative-scroll (5-section home page)

## File inventory (this regeneration)

```
sites/art-nouveau-garden/
├── index.html                    Home (narrative-scroll with 5 sections)
├── features.html                 Features — all 8 features
├── clients.html                 Clients — all 5 clients
├── download.html                Download with install commands
├── plugins.html                 Plugin model documentation
├── docs.html                    Docs link-out + ecosystem list
├── hub.html                    Phlix Hub relay description
├── about.html                  Philosophy + License + FAQ
├── 404.html                    Error page with Lily illustration
├── curating-your-collection.html Extra page from site_architecture.extra_pages
├── css/
│   ├── base.css                 reset + tokens + font-faces + emphasis fix
│   ├── theme.css                typography + layout + new narrative sections
│   └── components.css           header/nav/footer/buttons/cards/mascot/intensity
├── js/
│   └── main.js                  nav toggle + motion listener + easter eggs + mascot + calm mode
├── img/                         (unchanged — logo.svg, favicon.svg, og.svg, og.png, icons)
├── robots.txt                   allow all + sitemap reference
├── sitemap.xml                  (generated)
├── SITE.md                      concept/vision/palette/type/motion
├── BUILD_LOG.md                 this file
└── REGEN_PLAN.md               experience field manifest
```

## Experience fields implemented (all 20 declared)

| Field | Status |
|-------|--------|
| site_architecture | ✅ 6 nav labels (The Salon/Gallery/Rooms/Step Inside/Relay/Story), demoted pages in footer, extra page |
| homepage_narrative | ✅ 5 sections: garden-opens, blooming-features, why-tend, who-trusts, enter-now |
| page_blueprints | ✅ features=illuminated-manuscript, clients=gallery-wall, download=salon-entrance, about=tea-room-chat |
| copy_overlay | ✅ hero (eyebrow/headline/subheadline/CTAs), section headings, footer tagline |
| feature_casting | ✅ library+syncplay as hero features, transcode/auth/dlna/hub as support, livetv/plugins on features page |
| copy_treatments | ✅ botanical-frame-list, salon-conversation, gallery-wall, library-shelf |
| faq_experience | ✅ salon-conversation with question_order + extra_questions |
| hero_experience | ✅ diorama-parallax (CSS-based) + static fallback |
| navigation_model | ✅ topbar with botanical flourish + accessible hamburger fallback |
| scroll_experience | ✅ chaptered with vellum-fade + vine unfurl, reduced-motion = plain scroll |
| easter_eggs | ✅ logo-clicks:3 (vine unfurl + reward toast), typed-word:garden (shimmer + reward) |
| conversion_funnel | ✅ 3-rung CTA ladder, download_opening framing |
| proof_strategy | ✅ spec-numbers + github link + verbatim docs quote |
| visitor_paths | ✅ 3-path fork in hero |
| experience_archetype | ✅ narrative-scroll |
| complexity_profile | ✅ minimal density, literary, translate jargon, 5 sections, 85 words/section |
| intensity_toggle | ✅ "Dim the lights (calm mode)" with localStorage persistence |
| seasonal_activation | ✅ live-js date-gate applying CSS overrides |
| error_page_experience | ✅ Lily in empty garden, recovery links, noindex |
| mascot.behavior | ✅ Lily fixed upper-right, idle animation, tips, easter interactions, dismiss |

## Key design decisions

1. **Narrative scroll archetype:** Home page is chaptered into 5 named sections, each visually distinct, literary voice throughout.
2. **Mascot Lily:** Implemented as fixed-position companion on desktop (hidden on mobile to avoid CTA overlap per §19.11). Idle drift animation on scroll. Dismiss persists via localStorage.
3. **Easter eggs:** Both implemented — logo-clicks:3 triggers vine unfurl + reward toast; typed-word:garden triggers background shimmer + reward toast. Both disabled in inputs, both exit on Esc, neither preventDefaults.
4. **Emphasis fix:** `strong { font-weight: 500; color: var(--color-text); }` — 500 is the heaviest declared weight for EB Garamond. A second visual channel is not available within the kit's declared tokens.
5. **Reduced motion:** `matchMedia` listener added (not read-once) — responds to visitor changing setting mid-session.
6. **Font weights:** All match declared weights exactly — no substitution needed (Cormorant Garamond 600/700, Playfair Display 700/900, EB Garamond 400/500, Josefin Sans 300/400/600, Courier Prime 400/700).

## Verification results

```
node tools/selfcheck.mjs --site art-nouveau-garden    # → 1/1 site(s) pass
node tools/render-check.mjs --site art-nouveau-garden # → PASS
```
