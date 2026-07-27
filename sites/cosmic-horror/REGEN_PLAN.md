# REGEN_PLAN.md — Cosmic Horror (`cosmic-horror`)

## 1. Experience Fields

| Field | Old Site | New Site |
|-------|---------|----------|
| `site_architecture` | Generic nav (Home, Features…) | 6 nav items with kit labels + emphasis; plugins/docs demoted to footer |
| `homepage_narrative` | Generic sections (hero, pitch, features) | 5 ordered sections: threshold, the-catalog, why-descend, the-witnesses, the-summons |
| `page_blueprints` | Default templates | Compose per kit's spec (hero, catalog grid, proof blocks, funnel) |
| `copy_overlay` | content.json verbatim | Kit voice applied: tagline, hero copy, CTA labels |
| `feature_casting` | Generic feature grid | hero[] 2 features, support[] 6 features, omit_from_home[] none |
| `copy_treatments` | Default lists | Pitch bullets, FAQ, clients rendered in kit's component style |
| `faq_experience` | Plain `<dl>` | Ordered by content.json, extra_questions framing per kit persona |
| `hero_experience` | Static hero | Slow phosphorescent pulse, cosmic-rift radial gradient background |
| `navigation_model` | Standard topbar | Standard accessible topbar + exotic enhancement (none — keep accessible) |
| `scroll_experience` | Default scroll | IntersectionObserver fade-ins, geological pace, prefers-reduced-motion |
| `easter_eggs` | None | `typed-word:colour` + `logo-clicks:7` |
| `conversion_funnel` | Generic download CTA | 3-rung ladder: [object Object] → [object Object] → [object Object] |
| `proof_strategy` | None | Signals at placement using verifiable links |
| `visitor_paths` | None | Null — single curated path, no fork |
| `experience_archetype` | Not declared | `immersive` |
| `complexity_profile` | Default | density=standard, reading_level=general, jargon=translate, max 5 sections / 120 words |
| `intensity_toggle` | None | Null (nothing loud enough to tame) |
| `seasonal_activation` | Not declared | `"documented"` — date-gate JS for 3 seasonal variants |
| `error_page_experience` | No 404.html | Concept realized as page content, recovery links, noindex, relative paths |
| `persona_vignettes` | None | Used to seed img/PROMPTS.md |

**Absent → default behavior:** mascot.behavior declared — implemented per spec

---

## 2. Nav Diff

| Old Label | New Label | Emphasis | Notes |
|-----------|-----------|----------|-------|
| Home | The Archive Opens | default | id: home |
| Features | Catalog of Things | primary | id: features |
| Clients | The Watchers | default | id: clients |
| Download | Descend Below | primary | id: download |
| Plugins | — | — | demoted to footer |
| Docs | — | — | demoted to footer |
| Hub | The Relay | default | id: hub |
| About | What We Know | muted | id: about |

**Demoted to footer:** plugins, docs — pages still exist and are linked

---

## 3. Home Section Order

| # | id | source | weight | Old → New |
|---|-----|--------|--------|-----------|
| 1 | `threshold` | copy_overlay.hero | hero | Hero section → id="threshold" |
| 2 | `the-catalog` | feature_casting | major | Features overview → id="the-catalog" |
| 3 | `why-descend` | story | major | Added section (kit voice: "why descend") |
| 4 | `the-witnesses` | proof_strategy | minor | Added section (clients/testimonials) |
| 5 | `the-summons` | conversion_funnel | major | CTA banner → id="the-summons" |

---

## 4. Carry Forward

- CSS token variables (palette already correct)
- Self-hosted fonts from pool (cinzel, uncial-antiqua, crimson-text, eb-garamond, courier-prime)
- Logo.svg, favicon.svg, og.svg, og.png, icon PNGs
- img/PROMPTS.md
- Correct install command from content.json
- Correct licence facts (MPL-2.0 for server/hub, MIT for libraries/plugins/clients)
- Functional nav toggle JS
- Proper contrast ratios already measured

---

## 5. Ambiguities (resolved per §19.6)

| Conflict | Resolution | Rule |
|----------|-----------|------|
| Kit `fonts.ui.usage` vs `navigation_model` for nav face | UI face (EB Garamond) for nav links — more specific claim | §19.6 |
| `proof_strategy` signals ask for star/contributor count | Link to live page (/stargazers, /graphs/contributors) — never print figure | §19.7, §16 |
| `copy_overlay` CTA label renames but href points elsewhere | Make visible text honest: `Browse the Catalogue (the docs)` | §19.7, WCAG 2.5.3 |
| `seasonal_variants` override `--color-secondary` to failing contrast | Use pre-derived safe substitute `#8b66b3` for small text | §19.1 |

---

## 6. Fonts — Weight Discipline

| Role | Family | Weights Used | File Pool |
|------|--------|--------------|-----------|
| headline | Cinzel | 700, 900 | cinzel-700-latin.woff2 ✓, cinzel-900-latin.woff2 ✓ |
| display | Uncial Antiqua | 400 only | uncial-antiqua-400-latin.woff2 ✓ |
| body | Crimson Text | 400, 600 | crimson-text-400-latin.woff2 ✓, crimson-text-600-latin.woff2 ✓ |
| ui | EB Garamond | 400, 500, 600 | eb-garamond-400-latin.woff2 ✓, eb-garamond-500-latin.woff2 ✓, eb-garamond-600-latin.woff2 ✓ |
| mono | Courier Prime | 400, 700 | courier-prime-400-latin.woff2 ✓, courier-prime-700-latin.woff2 ✓ |
| number | Cinzel | 700 | cinzel-700-latin.woff2 ✓ |

⚠️ `crimson-text-700-latin.woff2` exists but 700 NOT declared for Crimson Text — do not use
⚠️ `cinzel-400-latin.woff2` exists but 400 NOT declared for headline — do not use
⚠️ `eb-garamond-700-latin.woff2` exists but 700 NOT declared for ui — do not use

---

## 7. Contrast Matrix (measured, not kit-claimed)

| Pair | Ratio | Pass? | Safe Substitute |
|------|-------|-------|-----------------|
| #00CC66 on #04000A | 9.74:1 | ✅ AA | — |
| #C8D8C0 on #04000A | 13.91:1 | ✅ AAA | — |
| #3D0080 on #04000A | 1.50:1 | ❌ | #8b66b3 |
| #8b66b3 on #04000A | ~6:1 | ✅ | — |
| #00CC66 on #080014 | 9.63:1 | ✅ AA | — |
| #C8D8C0 on #080014 | 13.76:1 | ✅ AAA | — |
| #8b66b3 on #080014 | ~5.5:1 | ✅ | — |
