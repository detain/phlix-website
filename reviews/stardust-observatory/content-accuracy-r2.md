# Content Accuracy Review — Stardust Observatory
**Reviewer:** Senior Web Reviewer
**Date:** 2026-07-04
**Dimension A: Content Accuracy (weight 1.0)
**Brand Kit:** `stardust-observatory.js` v1.0

---

## Score: 1.5 / 5 — Critical Failures

The site is a functional product-marketing site for Phlix but bears almost no resemblance to the Stardust Observatory brand kit it is supposed to implement. The brand kit defines a richly detailed Victorian-astronomy romantic identity — Elspeth Ward, 1889, brass refractors, ancient light, candlelit study — and the site's actual copy is generic SaaS tech marketing with phrases like "Your media. Your library. Your Phlix." and "Install the server, grab a client, start streaming." Four of eight required content blocks are structurally missing; the remaining four fail on voice, tone, and brand vocabulary.

---

## ✅ Passed

1. **CSS Design Tokens** — Colors, spacing, shadows, typography, and motion tokens in `base.css` and `theme.css` correctly match the brand kit's `design_tokens` block. Every hex value, font stack, and spacing scale step is accurate.
2. **Metadata and OG tags** — Title format "Stardust Observatory — Phlix" is consistent; theme-color matches `--color-primary` (#C9A84C).
3. **No forbidden brand vocabulary in visible page copy** — The avoid_words list (`synergy`, `leverage`, `disrupt`, `cutting-edge`, `robust`, `seamless`, `intuitive`, `game-changer`, `next-level`, `binge`) does not appear in the visible body copy. (Note: brand kit vocabulary `aperture`, `meridian`, `transit`, `magnitude`, etc. also does not appear — see Failures.)
4. **No broken internal links** — All 8 pages link to each other correctly and nav is consistent.
5. **Color rules** — Backgrounds are correctly midnight navy/observatory indigo; Constellation Gold used for primary CTAs; Nebula Violet glow used sparingly on hero section only.

---

## ⚠️ Concerns

1. **Hero copy lacks the brand's lyrical voice** — The homepage hero says "Your media. Your library. Your Phlix." The brand kit's `tagline_primary` is "Every story begins with ancient light." and its `tagline_secondary` includes "Look up. Then press play." and "The dome is open. The sky is waiting." The actual copy is flat product-statement prose, not the poetic, astronomical voice defined in the brand kit.
2. **Footer tagline** — "Open-source media, on your terms." is a factual statement, not the reverent, warm brand tone. The brand kit specifies greetings like "Welcome back to the observatory." and "The sky is clear tonight." which are entirely absent.
3. **Feature card descriptions are copy-pasted from the homepage pitch section** — The feature cards on `index.html` (lines 118–173) use identical copy to the feature-detail articles on `features.html` (lines 64–142). While factually accurate, these descriptions read as implementation documentation ("Folder-watcher hashes mtimes", "Weighted-mean NTP offset over 5 samples") rather than the measured, luminous brand voice ("Scholarly, Lyrical, Quietly thrilled, Precise").

---

## ❌ Failures

### 1. About Page — No Company Backstory (CRITICAL)
The brand kit's `story` block (lines 90–99) is explicit:
> "In 1889, high on a fog-free hillside, an amateur astronomer named Elspeth Ward raised a brass refractor toward Andromeda and understood... 'What we seek is always older and larger than we imagined.'"

The `about.html` page contains zero backstory. The "Philosophy" section says only: *"Phlix is built on a few principles: your library stays on your hardware, the software is BSD-3 licensed so you can fork it."* This is generic SaaS boilerplate, not a brand story. The brand kit's values ("Wonder, Depth, Elegance, Discovery, Craftsmanship") are not mentioned. No Elspeth Ward, no 1889, no island universe, no "ancient light" language.

**Requirement:** About page must include the company backstory and team description per the review criteria. The brand kit backstory is required canon; the site has no version of it.

### 2. Clients Page — No Testimonials (CRITICAL)
The review criteria require: *"4 client testimonials with name, title, company"*

The `clients.html` page has zero testimonials. It shows 5 client cards (Roku, Samsung Tizen, Windows, Mobile, DLNA) with technical feature lists. No named person has said anything about the product. The `clients.html` page is a **client-platform listing page**, not a testimonials page.

**Requirement:** 4 testimonials with name, title, company are entirely absent.

### 3. Download Page — No Pricing Tiers (CRITICAL)
The review criteria require: *"3 download tiers (Community, Professional, Enterprise) with features and pricing"*

The `download.html` page contains no pricing tiers whatsoever. It shows:
- A composer install command
- 4 client download cards (Roku, Tizen, Windows, Mobile) linking to GitHub
- An ecosystem list of GitHub repos

No tiers, no pricing, no feature comparison. The download page is a GitHub download listing, not a tiered pricing page.

**Requirement:** 3 download tiers with features and pricing are entirely absent.

### 4. Plugins Page — No 4 Plugin Names/Descriptions (CRITICAL)
The review criteria require: *"4 plugin names and descriptions"*

The `plugins.html` page has no plugins. It contains:
- A description of the plugin model ("Every plugin implements LifecycleInterface and ships a manifest")
- A link to `phlix-plugin-example`
- A CTA to "Build something great"

No named plugins, no descriptions. The page is a plugin developer overview, not a plugins showcase.

**Requirement:** 4 plugin names and descriptions are entirely absent.

### 5. Docs Page — No 4 Doc Section Headings with Summaries (CRITICAL)
The review criteria require: *"4 doc section headings with summaries"*

The `docs.html` page contains no doc sections. It shows:
- A single line pointing to external docs at `detain.github.io/phlix-docs`
- 4 outbound links (User guide, API reference, Developer docs, Hub admin guide)
- An ecosystem list

The page does not display any section headings or summaries. All content is external.

**Requirement:** 4 doc section headings with summaries are entirely absent.

### 6. Brand Voice and Tone — Systematic Violation
The brand kit specifies:
- **Voice:** `["Scholarly", "Lyrical", "Quietly thrilled", "Precise"]`
- **Tone:** `["Reverent", "Warm", "Contemplative", "Encouraging"]`
- **Writing style:** "Measured, luminous sentences — never breathless, never corporate. Occasional astronomical metaphors (light-year, aperture, meridian, transit, magnitude)..."
- **Vocabulary:** `aperture, meridian, transit, magnitude, parallax, zenith, nadir, celestial, atlas, observatory, eyepiece, refractor, stardust, luminous, vast`

The site copy throughout uses zero astronomical metaphors. Instead it reads as generic tech marketing:
- "Your media. Your library. Your Phlix." (homepage hero)
- "Everything you need to run a media library that actually works." (features page lead)
- "Install the server, grab a client, start streaming." (download page lead)
- "Native apps for every screen you own." (clients page lead)
- "Extend Phlix with a versioned plugin contract." (plugins page lead)

These are exactly the kinds of hollow, corporate phrases the brand kit explicitly instructs to avoid. The site's actual voice is "tech startup marketing," not "the patient, brilliant Victorian astronomer friend."

### 7. Hub Page — Thin Content Against Brand Promise
The hub page has 3 short paragraphs. The brand kit's `component_styles.media_player` (line 724) describes a rich "dark observatory-interior control bar" and `component_styles.search_bar` describes "Search the observatory…" placeholder text. The hub page copy says nothing astronomical or evocative — just functional product description: "Sign in once. The Hub's reverse-tunnel relay handles NAT traversal..."

### 8. About Page — No Team Description
The review criteria require "team description" in addition to backstory. `about.html` has no team section, no individual names, no descriptions of the people behind Phlix.

---

## Recommendations

1. **Rewrite all visible copy** to match the brand voice. Use the brand kit's `greetings`, `tagline_primary` ("Every story begins with ancient light."), and `tagline_secondary` options. Write feature descriptions as poetic, measured sentences with occasional astronomical metaphors — not technical implementation notes.
2. **Add the Elspeth Ward backstory** to the About page using the exact text from the brand kit's `story` block (lines 90–99). This is brand canon.
3. **Create a separate Testimonials page** (or section within Clients) with 4 named client testimonials: name, title, company.
4. **Redesign the Download page** with 3 pricing tiers (Community/Professional/Enterprise) with feature lists and pricing.
5. **Create a Plugins showcase page** listing 4 real or exemplary plugins with names and descriptions.
6. **Add 4 doc section headings with summaries** directly on `docs.html` — even if the full content lives externally, the page should display the outline with summaries per the review criteria.
7. **Add a Hub page section** with the brand's vocabulary: "meridian", "atlas", "observatory", etc.
8. **Add team description** to the About page.

---

## Evidence

| Page | Requirement | Status | Evidence |
|------|-------------|--------|----------|
| `about.html` | Company backstory | ❌ FAIL | Brand kit story (lines 90–99) not present; "Philosophy" section is generic SaaS text |
| `about.html` | Team description | ❌ FAIL | No team section exists |
| `clients.html` | 4 testimonials | ❌ FAIL | Zero testimonials; page is a client-platform listing |
| `download.html` | 3 pricing tiers | ❌ FAIL | No tiers, no pricing; only GitHub install links |
| `plugins.html` | 4 plugin names+descriptions | ❌ FAIL | No named plugins; only plugin model description |
| `docs.html` | 4 doc section headings+summaries | ❌ FAIL | No sections on-page; only external links |
| `hub.html` | Brand voice | ⚠️ CONCERN | Functional copy; zero astronomical metaphors |
| `features.html` | Headline + 2-3 sentence description per feature | ⚠️ CONCERN | 8 features present but descriptions are implementation documentation, not brand voice |
| All pages | Brand voice (Scholarly/Lyrical/Quietly thrilled/Precise) | ⚠️ CONCERN | Generic SaaS marketing language throughout |
| `index.html` | Primary tagline | ⚠️ CONCERN | "Your media. Your library. Your Phlix." vs brand's "Every story begins with ancient light." |
