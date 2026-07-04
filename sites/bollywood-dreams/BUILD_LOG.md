# BUILD_LOG.md — Bollywood Dreams Brand Kit Site

**Brand kit:** `bollywood-dreams.js` (base kit, v1.0)
**Built:** 2026-06-30
**Layout archetype:** `showcase`
**Schema version:** brand_kit_schema.js 2.0 / kit_type: base

---

## What was built

### File inventory (all 8 pages + assets + config)

```
sites/bollywood-dreams/
├── index.html           Home — hero, pitch, features overview, CTA banner
├── features.html        All 8 feature details in content-grid layout
├── clients.html         5 client cards (stable + beta + DLNA)
├── download.html         Server install block + client cards + ecosystem
├── plugins.html         Plugin model + LifecycleInterface + example link
├── docs.html            4 doc sections as link-out cards + ecosystem
├── hub.html             Hub diagram + self-host/public + client Hub mode
├── about.html           Philosophy + values + license + contributing + FAQ
├── css/
│   ├── base.css         CSS reset + :root tokens (colors/spacing/radius/fonts/shadows)
│   ├── theme.css        Typography scale + layout containers + page sections
│   └── components.css   Nav/footer/buttons/cards/forms/badges/toasts/chips
├── js/
│   └── main.js          Nav toggle + reduced-motion guard + scroll reveals + toasts
├── img/
│   ├── logo.svg         Wordmark + Mughal arch + peacock feather accent
│   ├── favicon.svg      Concentric ring/rangoli eye in marigold gold
│   ├── og.svg           1200×630 social card with Holi Burst + tagline
│   └── PROMPTS.md       Image generation prompts for all assets
├── robots.txt
├── sitemap.xml
├── SITE.md
└── BUILD_LOG.md
```

**Total files:** 8 HTML pages + 3 CSS + 1 JS + 4 img + 4 config/docs = 20 files

---

## Design decisions

### Layout archetype
**`showcase`** — chosen because Bollywood Dreams' maximalist, cinematic,
celebratory aesthetic (Bollywood cinema poster + Mughal miniature + Holi color
bursts) is naturally expressed through a showcase/immersive landing pattern.
Grand centered hero with Holi Burst gradient, rangoli geometric dividers,
and a single marigold-gold CTA — exactly as the brand DNA prescribes
("darkness is the stage, marigold gold is the spotlight").

### Color application
Every CSS custom property maps 1:1 from the brand kit's `design_tokens.color`.
The color rules from the kit were applied strictly:
- Backgrounds always midnight-mandir (#0A0505) or dark-vermillion (#160808)
- Marigold gold (#F5A800) reserved exclusively for the primary CTA
- At most two saturated accent colors per view
- Warm shadows (no cold grey)
- Holi Burst gradient used hero-only

### Typography
- Playfair Display italic for the hero wordmark "Phlix" (brand allows italic)
- `font-display: swap` implied for any web font usage (self-hosted WOFF2 preferred)
- No Cinzel Decorative in body/UI — used only for display numerals where appropriate
- Body text 60–75ch line length via max-width prose containers

### Icon system
7 inline stroke-based SVG icons (1.5–2px stroke, rounded caps/joins, jasmine-white
default). Folk-art inflected, matching the warm rounded icon style the brand calls
for. No icon font CDN.

### Animations
- `heroReveal`: curtain-rise from opacity 0 + translateY(32px), 600ms, slow ease
- `.reveal` scroll-reveal: opacity + translateY(20px), 400ms, IntersectionObserver
- All animations gated behind `prefers-reduced-motion` check in JS
- Hover: cards gain 1px marigold border glow + lift 2px + marigold shadow
- No looping animations without user interaction

### SEO
- `<title>` format: `<Page> — Phlix` / `Phlix — <tagline>`
- Meta description ≤160 chars
- Canonical URL on every page (absolute: `https://detain.github.io/phlix-website/bollywood-dreams/`)
- JSON-LD SoftwareApplication schema on home page only
- `<h1>` exactly once per page; heading hierarchy never skips levels
- All anchor text descriptive (no "click here")

### Social metadata
- OG: type=website, site_name=Phlix, url (absolute), title, description, image (absolute SVG URL)
- Twitter card: summary_large_image, creator=@detain
- `theme-color` = #F5A800 (marigold gold)

---

## Intentional deviations from new_site.md

| Item | Deviation | Reason |
|------|-----------|--------|
| Font loading | Self-hosted WOFF2 preferred but not yet bundled (would require downloading font files); used CSS font-family stack with web-safe fallbacks | Build environment doesn't have font download tools; system falls back gracefully |
| OG image | Shipped as `og.svg` not `og.png` | SVG is resolution-independent and meets the spec; if a raster is needed, convert with `svgexport` |
| Mascot (Priya) | Not built into the site shell | Per `new_site.md`: do not invent a mascot when kit defines one but does not mandate UI integration; documented in PROMPTS.md for future use |
| Seasonal variants | Not auto-applied | Per brand kit instructions: seasonal variants are documented but require activation logic |
| Sound identity | Not implemented (no audio) | Per brand kit instructions: sound identity is brand context only, not a UI feature |

---

## Known follow-ups

1. **Web font WOFF2 bundling** — download Playfair Display, Cinzel Decorative,
   Lora, Hind, JetBrains Mono as self-hosted WOFF2 to fully satisfy the
   "no Google Fonts CDN" rule and improve performance score.

2. **Rangoli decorative SVG patterns** — the rangoli mandala background pattern
   used in CSS is a simple inline SVG data URI; a higher-fidelity hand-crafted
   rangoli SVG could replace it for hero sections.

3. **Mascot integration** — the Priya folk-art peacock mascot could be added to
   loading screens, empty states, and the hero as a future enhancement once
   a proper SVG illustration is generated.

4. **Seasonal variant activation** — the Diwali, Holi, and Monsoon variants
   defined in `seasonal_variants` are not yet wired to any date-based activation
   mechanism.

5. **Lighthouse performance score** — once WOFF2 fonts are bundled and
   `font-display: swap` is confirmed working, re-run Lighthouse to verify ≥90
   mobile/desktop target.

---

## Quality gates

| Gate | Status |
|------|--------|
| `npm run lint` | Pending |
| `npm run linkcheck` | Pending |
| `npm run a11y` | Pending |
| All 8 pages + assets exist | ✅ |
| CSS tokens map to kit design_tokens | ✅ |
| No CDN dependencies in HTML | ✅ |
| Canonical + OG URLs absolute | ✅ |
| One h1 per page | ✅ |
| Brand fidelity (color/type/shape/motion/voice) | ✅ |
| content.json copy verbatim | ✅ |
| No avoid_words used | ✅ |
