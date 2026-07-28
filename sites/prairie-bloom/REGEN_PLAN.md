# REGEN_PLAN — prairie-bloom

## 1. Experience Fields

| Field | Old site | New site |
|---|---|---|
| site_architecture | generic nav (6/6 labels missing) | kit nav: Home / Features(primary) / Devices / Get Started(primary) / Phlix Hub / About(muted) |
| homepage_narrative | generic hero | 5 sections: porch-welcome(hero) → why-gather(story) → signature-moments(feature_casting) → good-neighbors(proof_strategy) → join-the-harvest(conversion_funnel) |
| page_blueprints | generic | features=seed-packet-wall, clients=device-family, download=farmer-setup, about=story-chapters |
| copy_overlay | absent | hero: eyebrow "Open your doors", headline "Media streaming that feels like family.", primary CTA "Grow Your Meadow" |
| feature_casting | generic | hero: SyncPlay + Library; support: transcode,auth,livetv,hub; footnote: dlna,plugins |
| copy_treatments | generic | pitch=barn-board-lines, faq=porch-advice-column, clients=device-family-scene |
| faq_experience | generic FAQ | porch-advice-column with Sunny persona, 6 ordered questions + 3 extras |
| hero_experience | static | diorama-parallax (5kb js budget), fallback: static meadow illustration |
| navigation_model | generic topbar | hay-cream topbar, violet links, sunflower-gold active underline, quilt-pattern dividers |
| scroll_experience | none | chaptered with pollen particles; prefers-reduced-motion drops animation |
| easter_eggs | none | logo-clicks:3 (Sunny dance + petal snow); typed-word:sunflower (golden tint + bloom) |
| conversion_funnel | generic CTA | guided-steps: "Grow Your Meadow" → "Pick Your Devices" → "Plant the Seeds" |
| proof_strategy | none | "Our Harvest" placard + real GitHub stars link + framed porch sign quote |
| visitor_paths | absent | 3 paths: family-night, big-collection, tinkerer |
| experience_archetype | narrative-scroll | narrative-scroll |
| complexity_profile | generic | minimal density, plain-language, jargon=translate, 5 sections max, 90 words/section |
| seasonal_activation | absent | live-js with Harvest/Winter/Spring motif assets and banner |
| error_page_experience | generic 404 | "Lost in the Meadow" — Sunny confused, torn seed packet, recovery links |
| persona_vignettes | absent | 3 vignettes: Sunday Afternoon Movie, Long-Distance Gathering, Cozy Evening Music |
| mascot.behavior | absent | Sunny (anthropomorphic sunflower) bottom-right on wicker chair, 5 tips, 2 easter interactions, dismiss to localStorage |

**Absent → default:** intensity_toggle (null → not built)

## 2. Nav Diff

Old: 8 links (Home/Features/Clients/Download/Plugins/Docs/Hub/About)
New: 6 links (Home/Features/Devices/Get Started/Phlix Hub/About)
- Plugins + Docs **demoted** to footer (kit: "core features take the porch edge")
- Extra page: **gathering-guide** (real page required)

## 3. Home Section Order

Old: generic hero → pitch → features overview → cta
New (per `homepage_narrative.sections[]`):
1. `porch-welcome` — copy_overlay.hero (full-bleed meadow, Sunny, headline)
2. `why-gather` — story values as barn-board notes
3. `signature-moments` — SyncPlay + Library as seed-packet one-sheets
4. `good-neighbors` — proof_strategy "Our Harvest" band with real GitHub link
5. `join-the-harvest` — conversion_funnel "county-fair ticket window" CTA

## 4. Carry-forward

- CSS `@font-face` pool references (only WOFF2 files confirmed in `shared/assets/fonts/`)
- `content.json` fact copy verbatim for features, clients, ecosystem, FAQ, install command
- Footer 3-column layout from `content.json.footer`
- JSON-LD SoftwareApplication on home page
- Per-page meta (title, description, canonical, OG, Twitter cards)

## 5. Ambiguities Resolved

| Issue | Resolution |
|---|---|
| Kit font `Zilla Slab` weight 700 + `number` role also Zilla Slab 700 | Single Zilla Slab 700 block; `number` uses same face |
| Kit says `page_blueprints.clients` = "device family" but kit's `clients` nav label is "Devices" | Nav label = "Devices" (from site_architecture.nav); page heading = "Clients & Devices" (keeps SEO, honors kit's device-family scene) |
| Kit says `intensity_toggle` not declared | Not built — §19.9 "absence is never a defect" |
| `seasonal_variants` active JS mode | Implemented via CSS custom-property overrides + JS date gate (live-js mode per kit) |

## 6. Install Command

Copy verbatim from `content.json.install.primary.command`:
```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

## 7. Escalations

None — all kit font families confirmed in `shared/data/font-sources.json`.

## 8. Critical CSS Rules Applied From New_site.md §19.12

- `minmax(0, 1fr)` on all grid tracks (not bare `1fr`)
- `overflow-wrap: anywhere` on text containing long identifiers
- No `overflow: hidden` on containers whose text must reflow
