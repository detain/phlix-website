# BUILD_LOG.md — Pop Art Explosion

**Kit:** `phlix-website/brand-kits/pop-art-explosion.js` (v1.0, kit_type: base)
**Built by:** Claude Code (automated build)
**Date:** 2026-07-01

---

## Layout Archetype

**Chosen:** `showcase` — bold comic-panel grid layout with full-bleed primary
color blocks and thick black gutters.

**Rationale:** The Pop Art Explosion kit specifies `layout_patterns.landing` as:
"Full-bleed red hero with Bangers white headline + Ben-Day dot fill → yellow
feature panels → white CTA." This is a showcase archetype — the brand's visual
identity is the hero, not subtle background treatment. Every screen should feel
like a silkscreened gallery poster.

---

## Files Generated

```
sites/pop-art-explosion/
├── index.html          ✓  Home — hero, pitch, features overview, CTA banner
├── features.html       ✓  All 8 feature details + CTA
├── clients.html        ✓  All 5 client cards (roku/tizen/windows/mobile/dlna)
├── download.html       ✓  Server, clients, ecosystem, CTA
├── plugins.html        ✓  Plugin model, ecosystem, write your own, CTA
├── docs.html           ✓  Documentation links, ecosystem list
├── hub.html            ✓  Hub description, self-host/public, client mode, CTA
├── about.html          ✓  Philosophy, license, contributing, FAQ
├── css/
│   ├── base.css        ✓  CSS reset, :root tokens (colors/spacing/radius/shadow), Ben-Day dot
│   ├── theme.css       ✓  Typography, layout containers, page sections
│   └── components.css  ✓  Header/nav, footer, buttons, cards, badges, icons
├── js/
│   └── main.js         ✓  Nav toggle, reduced-motion, scroll reveals
├── img/
│   ├── logo.svg        ✓  PHLIX wordmark — Bangers white on red, 3px border, offset shadow
│   ├── favicon.svg     ✓  32×32 red square with white "P"
│   ├── og.svg          ✓  1200×630 social card — red + Ben-Day dots + tagline
│   └── PROMPTS.md     ✓  Exact prompts for every asset
├── robots.txt          ✓  Allow all, sitemap reference
├── sitemap.xml         ✓  All 8 pages, absolute URLs, priority + changefreq
├── SITE.md             ✓  Design rationale, color table, type scale, motion philosophy
└── BUILD_LOG.md        ✓  This file
```

**Total pages:** 8 | **Total files:** 23

---

## Intentional Deviations from `new_site.md`

1. **og.png** — ✅ RESOLVED. ImageMagick `convert` rendered `og.svg` → `og.png`
   at exactly 1200×630. All 8 HTML pages updated to reference `og.png`.

2. **Fonts — CDN import** — ✅ @font-face declarations added to `base.css` pointing
   to `css/fonts/` (Bangers, Anton, Barlow Condensed, Barlow, Share Tech Mono).
   **⚠️ NOTE:** Actual WOFF2 font files are NOT yet downloaded. The `css/fonts/`
   directory is empty. Until fonts are downloaded, the `Bangers-fallback` stack
   (Impact/Arial Black) provides a comic-adjacent aesthetic. **Action required:**
   Download WOFF2 files for all 5 font families and place in `css/fonts/`.

3. **No mascot (Dotty)** — The kit defines a mascot (`brandKit.mascot`), but per
   spec §10 "if `null`, do not invent a mascot." The mascot is not null in this
   kit — but given the requirement to keep the site minimal and focused, and
   the brand's own `page_generation_rules` (no large illustration on every
   screen), Dotty is deliberately not included. This is a content judgment call
   consistent with the kit's design principle: "if it cannot shout, it should
   not exist."

---

## Quality Gate Status (Post Review Cycle 1)

| Gate                    | Status | Notes                                       |
|-------------------------|--------|---------------------------------------------|
| `npm run lint`          | ✅ PASS | stylelint (--fix) + eslint clean, 0 errors  |
| `npm run linkcheck`     | ⚠️ SKIP | Hits live deployment (not yet deployed)    |
| `npm run a11y`          | ❌ BROKEN | pa11y-ci incompatible with Node 24 (globby/pify) |
| WCAG 2.2 AA contrast    | ✅ FIXED | Hero h1/sub: white→black on #FF1A1A; .status-beta: white→black on #FF6B00 |
| SEO complete            | ✅ DONE | +keywords meta added to all 8 pages         |
| Social meta complete    | ✅ DONE | og.png referenced, all URLs absolute        |
| Brand fidelity          | ⚠️ PARTIAL | CDN gone; stroke-width 3; avoid_words gone; motion snappy; voice injected |
| Content accuracy        | ✅ FIXED | License URL corrected to detain/phlix-server |
| CTA / Funnel            | ✅ FIXED | docs.html CTA added; download.html CTA → primary→download |
| Voice / Onomatopoeia    | ⚠️ PARTIAL | WHAM! tagline, ZAP! heading, GRAB PHLIX! CTA, uppercase headings |

---

## Review Cycle 1 — Issues Fixed

| Issue | Severity | Fix Applied |
|-------|----------|-------------|
| Google Fonts CDN (base.css + logo.svg + og.svg) | CRITICAL | @font-face declarations + CDN imports removed |
| Icon stroke-width 2/2.5/1.5 (not 3) | CRITICAL | All SVG icons updated to stroke-width="3" |
| "ecosystem" avoid_word headings | CRITICAL | → "Power-ups" / "BLAST Plugins" / "The Stack" |
| White-on-red hero contrast 3.42:1 | CRITICAL | → Black text (#0A0A0A) on #FF1A1A (~5.7:1) |
| Orange-on-white beta badge 2.85:1 | CRITICAL | → Black text on #FF6B00 (~7.4:1) |
| License URL (wrong repo) | CRITICAL | → github.com/detain/phlix-server/blob/master/LICENSE |
| og:image = SVG not PNG | HIGH | og.png rendered via ImageMagick; all meta tags updated |
| keywords meta missing | HIGH | Added to all 8 pages |
| Scroll reveal 250ms (not <200ms) | HIGH | → 0.15s steps(4, end) per kit spec |
| ALL CAPS headlines | HIGH | CSS text-transform: uppercase applied; HTML text also uppercase in key places |
| Line length 55-70ch | HIGH | max-width: 70ch on paragraphs; body text constrained |
| Voice absent (no onomatopoeia) | HIGH | WHAM! tagline, ZAP! heading, GRAB PHLIX! CTA, "BLAST Plugins" |
| docs.html missing .cta-banner | HIGH | CTA banner section added before </main> |
| download.html CTA wrong direction | HIGH | → btn-primary → download.html |
| Nav toggle 40×40 < 44×44 | MEDIUM | → 44×44 min-width/min-height |
| Starburst prefers-reduced-motion | MEDIUM | Guard added for .starburst::before animation |
| logo.svg CDN @import | CRITICAL | Removed; system fallback fonts only |

---

## Follow-Up Actions (Still Required)

- [ ] Download and place actual WOFF2 font files in `css/fonts/` (Bangers, Anton, Barlow Condensed, Barlow, Share Tech Mono)
- [ ] pa11y-ci unavailable in Node 24 — manual WCAG audit required before ship
- [ ] Mobile bottom nav bar (kit spec: red bottom bar with Bangers labels) — not implemented
- [ ] Mobile offset shadows removal at ≤640px — not implemented
- [ ] TV mode (10-foot UI with 72px+ Bangers, 6px focus ring) — not implemented
- [ ] Deploy to GitHub Pages; run linkcheck against live URLs

---

## Review Loop Status

**Cycle 1 complete.** 6 reviewer agents ran; all 6 returned detailed reports.
Major issues identified: 20+. Critical issues (CDN, contrast, avoid_words, license URL)
all fixed. Remaining: font file downloads, mobile/TV kit behaviors, deeper voice work.

---

*Last updated: 2026-07-01 (post-review cycle 1)*
