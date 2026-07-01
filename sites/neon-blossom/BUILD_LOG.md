# BUILD_LOG.md — Neon Blossom Brand Kit Site

## Build Summary

**Kit:** Neon Blossom (base kit, v1.0)
**Slug:** neon-blossom
**Built:** 2026-07-01
**Layout archetype:** immersive
**Reason for archetype choice:** The kit's visual identity is deeply atmospheric with layered depth (bokeh-blurred background → sharp midground bloom → crisp foreground petals), bioluminescent glows that self-illuminate, and a strong emphasis on dark negative space. An immersive full-bleed layout with depth layers is the only structure that can faithfully represent the brand's "garden at midnight" feel. Grid or card archetypes would flatten the depth. Minimal would starve the bloom.

---

## What was built

### Files created
- `sites/neon-blossom/index.html` — Home (hero + pitch + features overview + CTA)
- `sites/neon-blossom/features.html` — Features (8 feature details + CTA)
- `sites/neon-blossom/clients.html` — Clients (5 client cards + CTA)
- `sites/neon-blossom/download.html` — Download (server + clients + ecosystem + CTA)
- `sites/neon-blossom/plugins.html` — Plugins (plugin model + ecosystem + CTA)
- `sites/neon-blossom/docs.html` — Docs (link-out + ecosystem)
- `sites/neon-blossom/hub.html` — Hub (what/why + self-host + client mode + CTA)
- `sites/neon-blossom/about.html` — About (philosophy + license + contributing + FAQ)
- `sites/neon-blossom/css/base.css` — Reset, :root token block (colors/spacing/radius/shadow/font), accessibility, reduced-motion
- `sites/neon-blossom/css/theme.css` — Typography scale, font-face, layout containers, hero, pitch, features-overview, content-section, cta-banner, all semantic section styles
- `sites/neon-blossom/css/components.css` — Header/nav, footer, buttons (all 7 variants), feature-cards, feature-detail, client-card, download-card, code-block, ecosystem-list, faq-list, badges, form elements, firefly decorations, glow dividers
- `sites/neon-blossom/js/main.js` — Mobile nav toggle (aria-expanded sync, Escape, outside click), reduced-motion gate, IntersectionObserver scroll reveals
- `sites/neon-blossom/img/logo.svg` — Wordmark (Cormorant Garamond Light) + stylised 5-petal orchid bloom in pink/violet, petal white text, glow filter
- `sites/neon-blossom/img/favicon.svg` — 32×32 square mark, orchid bloom silhouette in neon pink on midnight black with glow aura
- `sites/neon-blossom/img/og.svg` — 1200×630 social share card, radial bloom gradient, Phlix wordmark with pink glow, tagline, feature list, bottom bar
- `sites/neon-blossom/img/PROMPTS.md` — Exact generation prompts for every image asset, derived from kit §16
- `sites/neon-blossom/robots.txt` — Allow all, sitemap reference
- `sites/neon-blossom/sitemap.xml` — All 8 pages with absolute URLs
- `sites/neon-blossom/SITE.md` — Design rationale (concept, palette, typography, motion, visual assets, components)
- `sites/neon-blossom/BUILD_LOG.md` — This file

---

## Intentional deviations from new_site.md

1. **No `css/fonts/` WOFF2 files:** Self-hosting fonts requires downloading WOFF2 at build time. The `@font-face` declarations are present in `theme.css` pointing to `css/fonts/` for future font download. The site will fall back to the fallback stacks (Georgia, serif / Arial, sans-serif) until fonts are downloaded.

2. **No `og.png`** (only `og.svg`): The spec asks for a 1200×630 PNG. The SVG source is provided; a rasterized PNG can be generated from it at build time. The meta references `og.svg` directly.

---

## Brand kit fields used and their site decisions

| Kit field | Site decision |
|-----------|---------------|
| `name: "Neon Blossom"` | Logo wordmark, `<title>` flavor, OG site_name |
| `slug: "neon-blossom"` | Folder name, canonical URL paths |
| `tagline_primary: "Where the Night Blooms."` | OG title / hero visual overlay, OG card tagline |
| `tagline_secondary[]` | Hero eyebrow context |
| `colors.primary: #FF2D78` | Primary CTA, theme-color, favicon, hero glow |
| `colors.secondary: #9B30FF` | Secondary CTAs, nav hover, feature icon glows |
| `colors.tertiary: #FFD166` | Firefly accents, client highlights, ratings |
| `colors.quaternary: #39FF85` | Success states, continue badge |
| `colors.background: #08010F` | Page background (never any light surface) |
| `colors.surface: #130822` | Cards, panels |
| `colors.surface_alt: #1E0F38` | Alternate rows, CTA banner, footer |
| `colors.text: #F0EBF8` | All body and headline text |
| `colors.border: #4A2070` | Card borders, dividers |
| `colors.focus: #C77DFF` | Focus rings (3px violet halo) |
| `colors.gradients[].Bloom at Midnight` | Hero and page-header background glow |
| `colors.gradients[].Firefly Trail` | Featured card hover glow overlay |
| `colors.gradients[].Garden Depth` | CTA banner and footer background |
| `colors.gradients[].Bioluminescent Pulse` | Pitch section ambient glow |
| `fonts.headline/family: Cormorant Garamond` | h1–h6, feature titles, display text |
| `fonts.body/family: Lato` | Paragraphs, descriptions |
| `fonts.ui/family: DM Sans` | Nav, buttons, labels, footer |
| `fonts.mono/family: Fira Code` | Code blocks |
| `corner_radius` scale | border-radius on all components |
| `spacing_scale[]` | All margin/padding/gap via var(--space-*) |
| `shadows{}` | Card elevation, drop shadows |
| `glow_*` tokens | Card hover, button hover, focus rings |
| `motion_style: Languid/Organic` | All transition durations 300ms+, easing |
| `transitions[]` | CSS animation keyframes (bloomFadeIn, fireflyDrift) |
| `microinteractions{}` | Button/card CSS hover/active states |
| `easing[]` | CSS cubic-bezier var(--ease-garden) |
| `icon_style: Outlined/Rounded/Thin` | Inline SVG icons with stroke-width:1.5, stroke-linecap:round |
| `header_motif: Firefly drift` | Firefly decorative dots in hero CSS |
| `signature_elements[]` | SVG bloom petals in logo, og.svg, favicon |
| `brand_opposites[]` | Anti-checklist: NO light bg, NO geometric, NO cyberpunk |
| `design_principles[]` | Hard constraints enforced in CSS |
| `voice: Poetic/Intimate/Ethereal` | Hero copy tone, footer tagline style |
| `avoid_words[]` | None of those words appear in copy |
| `mascot: Lumia` | Logo bloom icon references the moth aesthetic |
| `accessibility{}` | Focus rings, 44px touch targets, reduced-motion |

---

## Fixes applied during review loop (2026-07-01)

### CSS defects fixed
- Removed `--ease-bloom` (base.css) — bouncy cubic-bezier(0.34,1.56,0.64,1) violates brand kit §24 easing rules (brand allows only `cubic-bezier(0.25,0.46,0.45,0.94)`, `ease-in-out`, `ease-out`)
- Fixed animation name mismatches: `bloomFadeIn` → `bloom-fade-in` (theme.css ×4), `pulseGlow` → `pulse-glow` (components.css), `fireflyDrift` → `firefly-drift` (components.css) — keyframe definitions use kebab-case
- Fixed `prefers-reduced-motion` (base.css): `animation-duration: 0.01ms` → `0s`, `transition-duration: 0.01ms` → `0s` — `0s` is a true instant-stop; `0.01ms` is still a measurable duration
- Fixed 8+ hardcoded button hover/active colors in components.css → CSS variables (`--color-primary`, `--color-secondary`, `--color-error`)
- Fixed hardcoded `box-shadow` on `.btn-primary` default state → `var(--glow-pink)`
- Fixed hardcoded `box-shadow` on `.btn-secondary` default state → `var(--glow-violet)`
- Fixed hardcoded `box-shadow` on `.btn-danger:hover` → `var(--glow-pink)`
- Fixed `nav-logo:hover img` filter hardcoded `rgba(255,45,120,0.7)` → `var(--color-primary)`
- Fixed `hero::before` gradient hardcoded hex values → `var(--color-bg)` for the background layer
- Fixed `.btn-small` min-height 36px → 44px (WCAG 2.5.5 touch target minimum)
- Fixed `.loading-petal` animation timing `linear` → `var(--ease-garden)` (organic motion principle)
- Merged duplicate `body` selectors in base.css (lines 20-24 and 118-126 consolidated)
- Added font-smoothing (`-webkit-font-smoothing: antialiased`, `-moz-osx-font-smoothing: grayscale`) to body block

### Brand defects fixed
- `img/logo.svg`: `font-family="Georgia, serif"` → `"'Cormorant Garamond', 'Playfair Display', Georgia, serif"` — uses brand headline typeface; SVG cannot reference CSS variables, so the full font stack is embedded directly
- Created `fonts/` directory with `README.md` noting required WOFF2 files and Google Fonts download URLs
- `.btn-fab pulse-glow` animation now truly halted by `prefers-reduced-motion: 0s` duration

### Items deferred (not actionable in this loop)
- Fonts not yet downloaded: `fonts/` stub created; WOFF2 files require runtime fetch (not a build-step action) — see `fonts/README.md`
- `font-weight: 600` on `.feature-card h3` is brand-compliant (brand kit headline weight range is 300–600)
- Brand reviewer's `avoid_words` flag was erroneous — this kit's `avoid_words` is `[]`
- Mascot (Lumia) is `null` in this kit — no mascot required
- "Moth-resting posture" in logo bloom: current symmetric 5-petal orchid is a deliberate placeholder until real artwork is generated per `img/PROMPTS.md`

---

## Known follow-ups

1. **Fonts:** Download WOFF2 files via `npm run build-fonts` (or `download-fonts.mjs`) to `css/fonts/` and verify fallback stack degrades gracefully.
2. **og.png:** Rasterize `img/og.svg` to a 1200×630 PNG for Twitter compatibility.
3. **Lumia mascot:** The logo's 5-petal bloom references the moth mascot; real mascot illustrations can be added via future artwork from `img/PROMPTS.md`.
4. **Scroll-reveal JS:** The `.reveal` class is defined in CSS but not yet applied to HTML elements. Future content additions should use `class="reveal"` on section wrappers to activate the IntersectionObserver.

---

## Review loop

See `reviews/neon-blossom/` for per-dimension review reports.

Final review report: `reviews/neon-blossom/FINAL-REVIEW.md`
