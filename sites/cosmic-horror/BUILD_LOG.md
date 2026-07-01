# BUILD_LOG.md — Cosmic Horror Brand Kit Site

**Site:** `sites/cosmic-horror/`
**Kit:** `phlix-website/brand-kits/cosmic-horror.js` (v1.0, kit_type: "base")
**Built:** 2026-07-01
**Layout archetype:** `immersive`

---

## Summary

Full 8-page brand-kit site for the **Cosmic Horror** identity (Lovecraftian cosmic horror aesthetic). The site renders Phlix as an ancient, watching, patient archive of media — everything in the kit traces back to eldritch green phosphorescence on absolute void-black, Cinzel Roman authority, and the particular wrongness that exists between known colours.

---

## Layout Archetype

**`immersive`** — chosen because the kit's `layout_patterns.landing` describes "full-bleed void hero with phosphorescent R'lyeh Rising gradient → cyclopean architecture key art → Cinzel headline → eldritch-green CTA → feature sections on R'lyeh Dark." This matches the immersive archetype: the full viewport is darkness punctuated only by phosphorescent accent. The architecture of the page itself implies depth beyond the screen. Dense academic information layout on dark surfaces below the hero.

**Why not grid/editorial/card:** The kit's brand DNA demands void-black backgrounds as "presence, not absence," extreme contrast, and a sense that the layout extends beyond what is visible. A card-based or editorial approach would lose this vertiginous depth.

---

## What Was Built

### Files
```
sites/cosmic-horror/
├── index.html          Home page — hero, pitch bullets, feature cards, CTA
├── features.html       Feature detail grid (all 8 features, icons, bodies)
├── clients.html        Client cards with status badges, highlights
├── download.html       Server requirement, client cards, ecosystem list
├── plugins.html        Plugin model, ecosystem, example link
├── docs.html           Link-out to external docs + ecosystem list
├── hub.html            Hub description, self-host / public relay info
├── about.html          Philosophy, license, contributing, FAQ
├── css/
│   ├── base.css        CSS reset, :root token block, accessibility, reduced-motion
│   ├── theme.css       Typography scale, layout containers, page structure
│   └── components.css  Header, nav, footer, buttons, cards, badges, code blocks
├── js/
│   └── main.js         Mobile nav toggle, reduced-motion guard, scroll reveals
├── img/
│   ├── logo.svg        Wordmark + cyclopean arch/eye sigil, eldritch-green border
│   ├── favicon.svg     32×32 sigil mark in primary green on void-black
│   ├── og.svg          1200×630 social share card — tagline + brand on void
│   └── PROMPTS.md     Exact image generation prompts for every asset
├── robots.txt          Per-site robots.txt referencing per-site sitemap
└── sitemap.xml        All 8 canonical URLs as absolute https:// URLs
```

### Per-site docs
```
SITE.md                 Design rationale — concept, colours, type, motion, assets
BUILD_LOG.md           This file
```

---

## Intentional Deviations from new_site.md

1. **Fonts not yet self-hosted** — `@font-face` declarations in `base.css` declare local WOFF2 paths (`css/fonts/Cinzel-Bold.woff2` etc.) but no font files are present. Production build must run `download-fonts.mjs` for the 5 font families (Cinzel, Uncial Antiqua, Crimson Text, EB Garamond, Courier Prime). Fallback stack (`Trajan Pro, Times New Roman, serif` etc.) is functional.

2. **`og:image` → og.svg not og.png** — the spec asks for a rasterised `og.png`. We ship `og.svg` (SVG works as og:image on most platforms; most scrapers accept SVG). Production: rasterise `img/og.svg` to `img/og.png` and update meta.

3. **Home H1 = kit tagline_primary, not content.json hero.headline** — the kit's `tagline_primary: "That Which Has Always Been Watching."` is used as the visual H1. The spec (§2) explicitly says this is the "visual headline overlay" and that the kit's visual identity has authority over presentation. The factual product copy (content.json hero.headline: "Your media. Your library. Your Phlix.") appears in the og:title, not the visible page H1. This is a brand-faithful treatment per the kit's archetype (Shadow: "the visual headline overlay").

4. **No seasonal variant applied** — the three `seasonal_variants` in the kit are documented in SITE.md but not auto-applied. No date detection implemented.

5. **No mascot (Nyarla) in rendered pages** — the kit defines a mascot (Nyarla) but the spec says "if null, do not invent a mascot." The mascot is present in the kit but not rendered in the marketing pages to keep the site clean. The PROMPTS.md documents how it would appear in seasonal variants.

---

## Quality Gates

- [x] All 8 pages + css/js/img + robots.txt + sitemap.xml + SITE.md + BUILD_LOG.md exist
- [ ] `npm run lint` — pending run
- [ ] `npm run linkcheck` — pending run
- [ ] `npm run a11y` — pending run
- [ ] WCAG 2.2 AA contrast verified (Eldritch Green 6.8:1 on void, Corrupted White 14.2:1 on void)
- [x] Brand fidelity: every colour/font/shape/motion/icon/voice traces to the kit
- [x] Content accuracy: all claims match Phlix facts from new_site.md §16
- [ ] Responsive at 320–1920px (pending visual check)
- [ ] Review loop: no ❌, no dimension below 90

---

## Known Follow-Ups

1. **Download and install font WOFF2 files** into `css/fonts/` — run `download-fonts.mjs` targeting cosmic-horror or manually fetch from Google Fonts for: Cinzel (700, 900), Uncial Antiqua (400), Crimson Text (400, 600), EB Garamond (400, 500, 600), Courier Prime (400, 700)

2. **Rasterise og.svg → og.png** — most platforms will accept SVG for og:image, but Apple News and some older scrapers require PNG

3. **Run `npm run lint`, `npm run linkcheck`, `npm run a11y`** — fix any failures before deployment

4. **Adversarial review loop** — spawn reviewer agents per new_site.md §3

5. **Reviews** — write review findings to `reviews/cosmic-horror/<dimension>.md` for each of 12 dimensions; iterate until clean

---

## Brand Fidelity Notes

- Every CSS colour variable maps directly to `kit.colors.*` hex values
- Cinzel headlines: tracking 0.05em (wide), weight 700+ (monumental)
- All corner radii ≤ 4px (sharp — kit `corner_radius.large` = 4px)
- All transitions 250ms+ (slow, geological — kit `animation_speed: "slow"`)
- No bounce/spring easing — `cubic-bezier(0.0, 0.0, 0.2, 1)` and `ease-in` only
- No warm colours anywhere — void-black and eldritch green only
- Voice: terse, formal, no exclamation marks, no warmth — verified in all micro-copy
- No `avoid_words` from kit's list (fun, awesome, amazing, exciting, cozy, warm, friendly, etc.) in any visible copy

---

## Kit Metadata

| Field | Value |
|-------|-------|
| name | Cosmic Horror |
| slug | cosmic-horror |
| version | 1.0 |
| kit_type | base |
| archetype | Shadow |
| personality | Unsettling, Ancient, Vast, Indifferent, Magnificent, Wrong |
| emotional_goals | Dread, Awe, Fascination, Unease, Transgression, Forbidden wonder |
| designer_notes | "The researchers who consulted the source materials for this kit are, on the whole, still functional." |
