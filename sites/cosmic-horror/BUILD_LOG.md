# BUILD_LOG.md — Cosmic Horror Brand Kit Site (Regenerated)

**Site:** `sites/cosmic-horror/`
**Kit:** `phlix-website/brand-kits/cosmic-horror.js` (v1.0)
**Built:** 2026-07-27
**Layout archetype:** `immersive`
**Experience fields:** 20 declared, all implemented

---

## Summary

Full 9-page brand-kit site (8 canonical + 404) for the **Cosmic Horror** identity (Lovecraftian cosmic horror aesthetic). The site renders Phlix as an ancient, watching, patient archive of media — everything in the kit traces back to eldritch green phosphorescence on absolute void-black, Cinzel Roman authority, and the particular wrongness that exists between known colours.

---

## What Was Built

### Files
```
sites/cosmic-horror/
├── index.html          Home page — 5 narrative sections (threshold, the-catalog, why-descend, the-witnesses, the-summons)
├── features.html       Feature detail grid (all 8 features)
├── clients.html        Client cards with status badges
├── download.html       Server requirement, install command, client cards, ecosystem
├── plugins.html        Plugin model, lifecycle interface, example link
├── docs.html           Link-out to external docs + ecosystem list
├── hub.html            Hub description, relay modes, client support
├── about.html          Philosophy, license, contributing, FAQ
├── 404.html            Error page with kit voice, recovery links, noindex
├── css/
│   ├── base.css        CSS reset, :root tokens, @font-face (self-hosted), accessibility, reduced-motion
│   ├── theme.css       Typography, layout containers, page structure, animations
│   └── components.css  Header/nav (kit labels), footer (3 cols), buttons, cards, badges, FAQ, mascot, easter eggs
├── js/
│   └── main.js         Nav toggle, reduced-motion (with change listener), scroll reveals, easter eggs (typed-word + logo-clicks), mascot (Nyarla), seasonal awareness, code block copy
├── img/                 (pre-existing: logo.svg, favicon.svg, og.svg, og.png, icon PNGs, PROMPTS.md)
├── robots.txt          References sitemap
├── sitemap.xml         8 canonical URLs (404 excluded — noindex)
├── REGEN_PLAN.md       Experience field manifest
├── SITE.md             Design rationale
└── BUILD_LOG.md        This file
```

---

## Experience Fields Implemented

All 20 declared fields — all observably present on the site:

1. **site_architecture** — 6 nav items with kit labels + emphasis levels; plugins/docs demoted to footer
2. **homepage_narrative** — 5 sections in kit order: threshold, the-catalog, why-descend, the-witnesses, the-summons
3. **page_blueprints** — Composed per kit spec
4. **copy_overlay** — Kit tagline_primary as hero H1; kit voice throughout
5. **feature_casting** — 2 hero (library, syncplay) + 6 support features
6. **copy_treatments** — Pitch bullets, FAQ, clients in kit component style
7. **faq_experience** — Ordered by content.json, kit-voice framing
8. **hero_experience** — Phosphorescent pulse, cosmic-rift gradient, staggered fade-rise
9. **navigation_model** — Standard accessible topbar (fallback per spec)
10. **scroll_experience** — IntersectionObserver fade-ins, geological pace, reduced-motion
11. **easter_eggs** — typed-word:colour + logo-clicks:7 (both reachable)
12. **conversion_funnel** — 3-rung CTA ladder on home + download
13. **proof_strategy** — Live links (/stargazers, /contributors, /issues) — no fabricated numbers
14. **visitor_paths** — Null (single curated path)
15. **experience_archetype** — immersive
16. **complexity_profile** — density=standard, jargon=translate, 5 sections max, 120 words/section
17. **intensity_toggle** — Null
18. **seasonal_activation** — "documented" — date awareness JS, no live token flip
19. **error_page_experience** — 404.html with kit concept, recovery links, noindex, relative paths
20. **mascot.behavior** — Nyarla companion with hover tips, localStorage dismissal

---

## Nav Labels (per site_architecture.nav)

| id | Label | Emphasis |
|----|-------|----------|
| home | The Archive Opens | default |
| features | Catalog of Things | primary |
| clients | The Watchers | default |
| download | Descending Below | primary |
| hub | The Relay | default |
| about | What We Know | muted |

Demoted to footer: plugins, docs (pages still exist and linked)

---

## Key Fixes from Predecessor

1. **404.html added** — predecessor had no 404 page; now exists per §2A
2. **Nav labels corrected** — predecessor had no kit labels; now all 6 primary nav items use kit labels
3. **Home sections corrected** — predecessor had generic sections; now 5 named sections per homepage_narrative
4. **Fonts self-hosted** — @font-face pointing to `../../assets/fonts/` pool; all declared weights exist
5. **Secondary color fixed** — `#3D0080` replaced with `#8b66b3` where used as text color (original fails AA at 1.50:1)
6. **Unique meta descriptions** — each page has distinct description (Trap 4)
7. **Easter eggs implemented** — typed-word and logo-clicks both reachable
8. **Mascot implemented** — Nyarla with hover tips, dismiss to localStorage
9. **Reduced motion change listener** — attaches to change event, not just initial read (Trap 20)
10. **CSS grid tracks use `minmax(0, 1fr)`** — prevents overflow at 320px / 200% zoom (Trap 12)
11. **Body text has `overflow-wrap: anywhere`** — long words wrap in narrow tracks (Trap 12)
12. **No `overflow: hidden` on text containers** — prevents clipping at 200% zoom (Trap 13)

---

## Intentional Deviations from Kit

1. **seasonal_activation = "documented"** — date-gate JS only logs variant, does not flip tokens. Kit field present as awareness mechanism; live behavior deferred per kit's own documentation note.

2. **mascot placement** — kit specifies "bottom-right corner on desktop, top-right on mobile." Mobile placement is in-flow above footer, not fixed top-right. Fixed top-right would cover content/CTA on 320px per Trap 11.

3. **navigation_model** — standard accessible topbar rendered as fallback. Enhancement layer (exotic mode) not built per accessibility constraint; spec requires fallback to always be present.

---

## Install Command

Copied verbatim from `content.json.install.primary` — never retyped:
```
curl -fsSL https://raw.githubusercontent.com/detain/phlix-server/master/scripts/install.sh | sudo bash
```

`content.json.install.from_source` used on download page, explicitly labelled "not an install."

---

## Quality Gates

- [x] All 9 pages (8 canonical + 404) + css + js + img + robots.txt + sitemap.xml + SITE.md + BUILD_LOG.md + REGEN_PLAN.md exist
- [x] `@copyright 2026 Joe Huss <detain@interserver.net>` in every css/js file
- [x] Self-hosted fonts from pool (no CDN)
- [x] All nav labels match site_architecture.nav
- [x] Home sections in homepage_narrative.sections[] order
- [x] og:image absolute URL pointing to PNG
- [x] 404.html: noindex, relative paths, recovery links
- [x] Two easter eggs reachable
- [x] mascot dismiss persists via localStorage
- [x] prefers-reduced-motion with change listener
- [x] Grid tracks `minmax(0, 1fr)` + overflow-wrap:anywhere on body
- [x] No fabricated proof numbers — live links only
- [ ] `selfcheck.mjs` — pending
- [ ] `render-check.mjs` — pending

---

## Brand Fidelity Notes

- Every CSS color variable maps to kit design_tokens
- Cinzel headlines: tracking 0.05em, weight 700+
- All corner radii ≤ 4px (sharp)
- No bounce/spring easing
- No warm colors
- Voice: terse, formal, no exclamation marks, no warmth
- `<strong>` = font-weight: 600 (Crimson Text 600 face)
- No `avoid_words` (fun, awesome, amazing, exciting, cozy, warm, friendly, etc.) in visible copy

---

## Escalations / Notes for Orchestrator

- Kit's `#3D0080` Void Purple fails AA on Cosmic Void (1.50:1). Used `#8b66b3` as safe substitute wherever secondary appears as text. Verified in contrast table.
- `crimson-text-700-latin.woff2` and `eb-garamond-700-latin.woff2` exist in pool but are NOT declared for those roles — not used.
- `cinzel-400-latin.woff2` and `cinzel-600-latin.woff2` exist but NOT declared for headline role — not used.
