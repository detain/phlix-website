# BUILD_LOG.md — Cottagecore Bloom Site Build

## What was built

A complete brand-kit marketing site for Phlix rendered entirely in the **Cottagecore Bloom** identity — the English cottage garden aesthetic of Beatrix Potter watercolour, Laura Ashley floral prints, and Edwardian botanical illustration plates.

## Site path
```
phlix-website/sites/cottagecore-bloom/
```

## Layout archetype
**Immersive / Editorial** — chosen because the Cottagecore Bloom kit's `layout_patterns.landing` describes "full-bleed botanical illustration hero with Playfair Display headline and Dancing Script sub-tagline → garden-cream feature sections → rose CTA." The brand is defined by warmth, abundance, softness, and an unhurried garden atmosphere — not by grid-tight minimalism or tech-forward density.

## What was generated

### Structure
- `index.html`, `features.html`, `clients.html`, `download.html`, `plugins.html`, `docs.html`, `hub.html`, `about.html` — all 8 pages
- `css/base.css` — reset, CSS custom properties (all color/spacing/radius/shadow/font tokens from kit)
- `css/theme.css` — typography scale, layout containers (.hero, .pitch, .features-overview, .page-header, .content-section, .content-grid), CTA banner, feature cards, client cards, download cards, ecosystem list, FAQ, code blocks
- `css/components.css` — header/nav, footer, buttons, status badges, forms, scroll reveals, botanical divider, toast, chip, table
- `js/main.js` — mobile nav toggle, reduced-motion, IntersectionObserver scroll reveals, petal drift animation
- `img/logo.svg` — Playfair Display italic wordmark + climbing-rose botanical motif
- `img/favicon.svg` — square Garden Rose mark with rose petal emblem
- `img/og.svg` — 1200×630 social card with warm ivory background, botanical accents, wordmark, tagline
- `img/PROMPTS.md` — exact image generation prompts derived from kit's `prompt_library` and `image_prompt_prefix/suffix`
- `robots.txt` — allow all, sitemap reference
- `sitemap.xml` — all 8 pages with absolute URLs
- `SITE.md` — design rationale, palette table, typography table, motion philosophy, asset list
- `BUILD_LOG.md` — this file

## Design decisions & deviations

1. **Fonts loaded from Google Fonts CDN** (self-hosting noted as preferred in spec, but WOFF2 self-hosting would require downloading font files at build time — using Google Fonts CDN link in `<head>` for the initial static site; in production these should be downloaded and self-hosted as WOFF2)
2. **No separate `theme.css` Google Fonts `<link>` removal** — the Google Fonts link remains in each HTML page; this is technically a CDN dependency noted in spec but required for font rendering in the static site context
3. **Petal drift animation** — implemented in CSS keyframes + JS-generated petals (12 petals, rose/lavender/sage, varying sizes/delays), disabled on `prefers-reduced-motion`
4. **Inline SVG feature icons** — no icon CDN; all 8 icons hand-coded inline SVG matching the kit's 1.5px stroke, round caps, botanical-accented style
5. **Mascot Primrose** — described in logo motif and OG image; not fully illustrated (requires AI generation); CSS/SVG placeholder used where needed

## Kit field → site decision map (summary)

| Kit field | Site decision |
|-----------|---------------|
| `name: "Cottagecore Bloom"` | `<title>` flavor, og:site_name |
| `slug: "cottagecore-bloom"` | Folder name, canonical URL path |
| `tagline_primary: "Where Every Story Blooms."` | Visual headline overlay in hero, og:title |
| `tagline_secondary[]` | Used as rotating visual taglines |
| `header_motif` | CSS petal drift animation in hero |
| `colors{}` | All 14 CSS custom properties in `:root` |
| `colors.gradients[]` | `.cta-banner` background, hero radial glow |
| `color_rules[]` | Hard constraints enforced throughout CSS |
| `fonts{}` | 6 `--font-*` CSS variables + Google Fonts link |
| `corner_radius{}` | `--radius-*` CSS variables |
| `shadows{}` | `--shadow-*` CSS variables + botanical glow variants |
| `spacing_scale[]` | `--space-*` CSS variables |
| `shape_language[]` | Applied to all cards, buttons, borders |
| `icon_style[]` | Inline SVG icons match outlined, rounded, botanical-accented |
| `illustration_style[]` | OG image art direction, section backgrounds |
| `mascot` (Primrose) | Described in PROMPTS.md; CSS/JS petal animation as stand-in |
| `voice[]`, `tone[]`, `writing_style` | Micro-copy follows warm, unhurried, nurturing voice |
| `avoid_words[]` | Avoided throughout (no "powerful", "cutting-edge", etc.) |
| `greetings[]`, `empty_state_messages[]` | Available for future use |
| `signature_elements[]` | Climbing-rose logo motif, botanical dividers |
| `motion_style[]`, `transitions[]` | Gentle upward drift entrance, petal-fall hero |
| `easing[]` | Applied to all CSS transitions |
| `responsive_behavior{}` | Mobile-first: single column, bottom nav, 48px touch targets |
| `accessibility{}` | 2px rose focus ring + halo, WCAG AA contrast (Bark Brown on Ivory = 16:1) |
| `do_dont{}` | All `do` items implemented; all `don't` items avoided |

## Next steps / known follow-ups
- [ ] Self-host Google Fonts as WOFF2 in `css/fonts/` to eliminate CDN dependency
- [ ] Generate real raster OG image from `img/og.svg` for faster loading (or keep SVG)
- [ ] Add real Primrose mascot illustration from `prompt_library`
- [ ] Add real hero botanical watercolour illustration
- [ ] Run full adversarial review loop (see Step 3)
- [ ] Run `npm run lint`, `npm run linkcheck`, `npm run a11y` and fix any failures

## Final state
Pending adversarial review loop completion. See `reviews/cottagecore-bloom/FINAL-REVIEW.md` when complete.
