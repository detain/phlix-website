# REGEN_PLAN.md — Mid-Century Modern

## Section mapping: `homepage_narrative.sections[]`

| # | Section ID | Source field | Treatment | Weight |
|---|------------|--------------|-----------|--------|
| 1 | `sunburst-rise` | copy_overlay.hero | Hero with sunburst clock emblem backdrop | hero |
| 2 | `what-flies` | feature_casting | "Features overview" with 8 feature cards | major |
| 3 | `why-launch` | story | Narrative "Why Phlix?" pitch bullets | major |
| 4 | `compass-true` | proof_strategy | Social proof / stats / signals | minor |
| 5 | `ignition` | conversion_funnel | CTA banner with download CTA | major |

## Experience fields implemented

| Field | Implementation |
|-------|---------------|
| `site_architecture` | 8 nav links (Home, Features, Clients, Download, Hub, Plugins, Docs, About); 3 emphasis levels (primary=Home/Features/Download, default=Clients/Hub/Plugins/About, muted=Docs) |
| `homepage_narrative` | 5 sections in order above |
| `page_blueprints` | Standard 8-page structure per §3 |
| `copy_overlay` | tagline_primary: "The Future Was Always Now." applied to CTA banner |
| `feature_casting` | All 8 features shown; hero features per casting angles |
| `copy_treatments` | Pitch bullets, features, clients, ecosystem, FAQ all use brand card styling |
| `faq_experience` | `<dl class="faq-list">` on about.html with all 6 canonical FAQ items |
| `hero_experience` | Static hero with CSS sunburst clock rotation; JS reduced-motion fallback |
| `navigation_model` | Standard accessible topbar nav with hamburger on mobile |
| `scroll_experience` | IntersectionObserver fade-ins; prefers-reduced-motion disables |
| `easter_eggs` | logo-clicks:5 (sunburst burst), typed-word:orbit (message), scroll-past-footer (starfield) |
| `conversion_funnel` | 3-rung ladder: Get Phlix → Download Phlix → Read the docs |
| `proof_strategy` | Repo links and verifiable signals only |
| `experience_archetype` | narrative-scroll |
| `complexity_profile` | density=standard, reading_level=general, jargon=translate; home_sections_max=5, words_per_section_max=110 |
| `mascot.behavior` | Orbit (rocket) in bottom-right, idle bobbing, tips on hover, click-launch easter egg |
| `seasonal_activation` | CSS-only variant tokens; JS date-gate to apply |
| `error_page_experience` | 404.html with themed content, recovery links, noindex |
| `persona_vignettes` | Applied to hero backdrop SVG motifs |

## Ambiguity resolutions (per §19.14/19.6)

| Conflict | Resolution |
|----------|------------|
| Kit says 5 native clients | `content.json` wins: 4 native clients + DLNA = 5 total clients |
| Fonts.ui vs navigation_model | Nav links use UI face (Josefin Sans 600) per more specific `navigation.topbar` |
| `proof_strategy` asks for star count | Link to /stargazers instead of printing a number |

## Word-count budget

- `words_per_section_max: 110` — measured against authored framing copy
- content.json facts exempt from cap

## Font weights declared (from brief)

| Face | Weight | File |
|------|--------|------|
| Josefin Sans (headline) | 600, 700 | josefin-sans-{600,700}-latin.woff2 |
| Josefin Sans (ui) | 400, 500, 600 | josefin-sans-{400,500,600}-latin.woff2 |
| Bebas Neue (display/number) | 400 | bebas-neue-400-latin.woff2 |
| Libre Baskerville (body) | 400, 700 | libre-baskerville-{400,700}-latin.woff2 |
| IBM Plex Mono (mono) | 400, 600 | ibm-plex-mono-{400,600}-latin.woff2 |

Note: IBM Plex Mono weight 700 declared but brief says weight 700 NOT declared — using 600 as nearest available.
