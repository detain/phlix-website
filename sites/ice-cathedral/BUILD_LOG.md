# BUILD_LOG.md — Ice Cathedral Site Build

**Built:** 2026-07-01
**Brand kit:** `ice-cathedral.js` v1.0
**Kit type:** Base (metadata.kit_type: "base")
**Layout archetype:** **Immersive** — chosen because the kit's `layout_patterns.landing` directly describes "full-bleed polar gothic hero illustration with Cinzel headline over glacial-vault gradient." The gothic cathedral's vertical axis (eye drawn upward toward vaulted ice ceilings) maps naturally to an immersive full-viewport hero pattern. This also matches the brand's design principle: "One luminous element per composition; everything else recedes into polar night."

---

## What was built

- `sites/ice-cathedral/` — full static site, 8 pages + assets + docs
- `index.html`, `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html`
- `css/base.css` — reset, CSS custom properties (tokens from `design_tokens` + kit colors/spacing/radius/shadows)
- `css/theme.css` — typography scale, layout containers, hero/pitch/features-overview/page-header/content-section styles, CTA banners, animations
- `css/components.css` — nav (topbar + mobile toggle), footer, buttons (primary/secondary/ghost/danger/small/large), feature cards, client cards, badges, code blocks, FAQ, docs links, responsive breakpoints
- `js/main.js` — mobile nav toggle (aria-expanded, Esc key, outside click), reduced-motion gate, IntersectionObserver scroll reveals
- `img/logo.svg` — Cinzel wordmark "PHLIX" on polar-night with gothic pointed arch + rose-window lattice motif
- `img/favicon.svg` — Gothic pointed arch silhouette in Crystal Ice Blue on polar-night square
- `img/og.svg` — 1200×630 social card: polar night, crystal radiance glow, rose-window radial lattice, headline
- `img/PROMPTS.md` — prompt library for logo, hero illustration, feature icons, backgrounds, mascot, marketing
- `robots.txt` — references sitemap
- `sitemap.xml` — all 8 pages with absolute canonical URLs
- `SITE.md` — full design rationale
- `reviews/ice-cathedral/` — review outputs from adversarial loop

---

## Design Decisions

### Color mapping
All kit colors mapped directly to CSS custom properties in `base.css :root`. The `colors.gradients[]` array produces three named gradients used in hero and surface sections. No off-palette colors added.

### Typography mapping
- Cinzel (headline) — used for all H1–H3, `font-headline` CSS class
- Josefin Sans (display/UI) — display numerals, nav links, labels, buttons, `font-display` and `font-ui` classes
- Libre Baskerville (body) — all body copy, paragraphs, `font-body`
- JetBrains Mono — code blocks only, `font-mono`

### Shape treatment
Corner radius is 0px everywhere (sharp, architectural). Cards and buttons are sharp-cornered per kit's `corner_radius` spec. No rounded bubbly corners — this is a hard brand constraint.

### Shadow system
All shadows from `shadows{}` block mapped to CSS custom properties. `crystal_glow` and `aurora_glow` are used for featured-card hover and primary CTA respectively.

### Motion
Slow crystalline reveals on hero entrance (facet-by-facet, 800ms, staggered). CSS `cubic-bezier(0.3, 0, 0.1, 1)` easing throughout. `prefers-reduced-motion` fully honored — hero animations become static, scroll reveals disabled.

### Responsive behavior
Following kit's `responsive_behavior`: desktop multi-column → tablet 2–3 column with 48px touch targets → mobile single column with sticky bottom nav pattern. TV (10-foot) gets 2× focus rings and scaled numerals.

### Self-hosted fonts
Fonts declared via `@font-face` in `theme.css` but WOFF2 files are not bundled (not available in source). System serif fallback stacks maintain brand-appropriate appearance. Font-display: swap applied.

---

## Deviations from new_site.md

1. **Fonts**: WOFF2 files not bundled — declared via `@font-face` with system fallback stacks. This is a known limitation; in production these would be downloaded from Google Fonts as self-hosted WOFF2.
2. **No fonts/ directory** — `css/fonts/` not created (no WOFF2 files to place). The `@font-face` declarations are present as a production-ready pattern.
3. **Micro-copy**: All CTA banners and section eyebrows use Ice Cathedral voice (e.g., "Ready to enter the ice?" instead of generic copy), consistent with kit voice rules. Content body copy is verbatim from `content.json` per spec.

---

## Quality Gates

- `npm run lint` — [pending]
- `npm run linkcheck` — [pending]
- `npm run a11y` — [pending]
- Final review loop — [pending]

---

## Follow-ups

- Source actual WOFF2 font files (Cinzel, Josefin Sans, Libre Baskerville, JetBrains Mono) and place in `css/fonts/` before production deployment
- Review all contrast ratios against WCAG AA with live colorimeter measurement
- Verify JSON-LD schema on home page validates against schema.org
- Test at 320px, 375px, 414px, 768px, 1024px, 1280px, 1920px breakpoints
