# Readability Review — Desert Horizon

**Variant**: desert-horizon
**Round**: 1
**Reviewer**: adversarial-readability
**Date**: 2026-07-01

## Score

- **Readability**: 62 / 100

## ✅ Passed

- Body text uses Lora as specified by the kit — `base.css:111` sets `font-family: var(--font-body)` on `body`, and all `p` rules reference Lora family fallbacks.
- Heading hierarchy is unbroken across all 8 pages: each page has exactly one `<h1>` (hero on index.html; `.page-header h1` on interior pages), followed by `<h2>` section headings. No level-skipping observed.
- Typography scale is well-constructed: `clamp()` sizing gives fluid responsive type (h1 up to 4.5rem, h2 up to 2.75rem, h3 up to 1.6rem) — `base.css:171–178`.
- Line-height on body text is `1.65` (`base.css:113`) — within the kit's `1.65` specification for Lora body (`desert-horizon.js:406`).
- `.content-section p` correctly sets `max-width: 70ch` with `line-height: 1.65` (`theme.css:544–547`).
- `.body-text` utility class enforces `max-width: 70ch` (`theme.css:37–41`).
- Whitespace is generous: sections use `padding-block: var(--space-16)` (`theme.css:82–84`), giving substantial breathing room between content blocks.
- Hero subheadline (`.hero-sub`) uses `.hero-sub` class with `max-width: 60ch` (`theme.css:170`) and sufficient contrast on its background.
- Page-lead text on interior pages also has `max-width: 60ch` (`theme.css:368`).
- Visual hierarchy is clear: Navajo geometric strip dividers delineate sections; cards use distinct surface/border treatment; the pitch section uses a terracotta left-border + turquoise dot marker for scannable bullet items.
- No dense walls of text anywhere on the site — content is appropriately chunked into list items, cards, and short paragraphs.
- Reading level is appropriate for the target audience (home media collectors, design-conscious streamers, tech-savvy enthusiasts). Technical terms (HLS, FFmpeg, Argon2ID, NAT) are contextually appropriate for the audience and appear without excessive jargon density.

## ⚠️ Concerns (non-blocking)

- **`a { color: var(--color-secondary) }` applies Turquoise (#2A8C82) to all default links** — `base.css:128–136`. Turquoise on Sandstone measures **3.23:1**, below WCAG AA's 4.5:1 body-text requirement. This affects nav links, ecosystem list links, docs page links, and the "See all features →" link on index.html. The kit marks Turquoise as contrast-targeting Sandstone ("contrast_targets: ['sandstone', 'bone_white']"), but the math does not support Sandstone — Turquoise on Adobe Dust (#FAF0DC) is the pairing that clears 4.5:1. Using Turquoise for body/small-link text on Sandstone throughout is a brand-level spec error. — Replace Turquoise links with either Burnt Umber (passes 13:1 on Sandstone) or Dark Turquoise (darker shade of the same hue) on Sandstone, reserving Turquoise for hover/active states and decorative accents.
- **Card/panel body text lacks `max-width` constraint** — `.feature-card p`, `.feature-detail-text p`, `.client-tagline`, `.download-card p`, `.faq-item dd`, and `.ecosystem-list li` have no `max-width: 70ch`. At 3-column auto-fill grid with `minmax(280px, 1fr)` (`theme.css:254`), a 280px card at 0.925rem body font could exceed 80ch line length. — Apply `max-width: 70ch` (or `max-width: 100%` + the body-text class) to all card `p` elements, or introduce a shared `.card-body`/`p` rule scoped under `.content-section` that enforces the constraint.
- **Heading font is not tiered by level** — `base.css:157–168` sets ALL h1–h6 to `font-family: var(--font-headline)` (Playfair Display). The kit calls for Playfair Display at display/hero scale and Source Sans 3 for UI chrome; h4–h6 (1.2rem) read as large UI labels and could use the UI font instead of the display serif. This is a common pattern but not what the kit prescribes. — Consider using Source Sans 3 for h4–h6 or at minimum verifying the visual weight at small scales does not appear too heavy compared to the Lora body text.
- **Footer links use Sage (#7A8C68) on Sandstone — 2.89:1**, well below WCAG AA. While the footer is tertiary navigation, `components.css:721` sets `color: var(--color-neutral)` (Sage) on footer links, which is a significant contrast failure. — Use Burnt Umber for footer nav links (matches the umber border aesthetic) or a darker Sage shade.

## ❌ Failures (must fix this round)

- **`components.css:128–136`** — `a { color: var(--color-secondary); }` applies Turquoise (#2A8C82) as the default link color on Sandstone (#F2E4C8) background throughout the site. Turquoise/Sandstone = **3.23:1**, below the 4.5:1 WCAG AA threshold for body/large text. Nav links, ecosystem links, and inline content links all fail. The brand kit incorrectly lists Sandstone as a Turquoise contrast target; actual measurement shows Sandstone does not provide sufficient contrast. — **Required outcome**: Either (a) change all body/small-link text from Turquoise to Burnt Umber (#2E1A0E, 13:1 on Sandstone) and reserve Turquoise for hover states, focus rings, and UI accents; or (b) use Adobe Dust (#FAF0DC) as the background for any Turquoise text/link treatment; or (c) define a darker Turquoise variant (e.g., #1F7369) for text use on Sandstone.

- **`components.css:717–728`** — Footer nav links use `color: var(--color-neutral)` = Sage (#7A8C68) on Sandstone. Contrast = **2.89:1**, failing WCAG AA 4.5:1 by a wide margin. Footer links are functional UI and must be readable. — **Required outcome**: Change footer nav link color to Burnt Umber (#2E1A0E) which passes 13:1 on Sandstone and matches the warm umber aesthetic.

- **`theme.css:544–547` and `components.css:361–368`, `418–424`** — Only `.content-section p` has an explicit `max-width: 70ch` constraint. The kit explicitly states "Keep body line-length to 60–72 characters" as a typography rule (`desert-horizon.js:437`). Card body text in `.feature-card p` (0.925rem, no max-width), `.download-card p`, and `.faq-item dd` can expand to full card width (280px+), potentially exceeding 72ch. — **Required outcome**: Apply `max-width: 70ch` to all body text paragraphs site-wide. The simplest fix is to change `theme.css:544` from `.content-section p` to `main p` so it propagates to all in-content paragraphs, then override in card components that need to fill their card.

## Recommendations

1. **Override default link color from Turquoise to Burnt Umber** (impact: high, effort: low) — `base.css:128`: change `a { color: var(--color-secondary); }` to `a { color: var(--color-text); }`. Turquoise is preserved for hover states, active nav, focus rings, and accent borders. Affects every page simultaneously.
2. **Fix footer link color** (impact: high, effort: low) — `components.css:721`: change `color: var(--color-neutral)` to `color: var(--color-text)` (Burnt Umber) on `.footer-col a`. Footer link contrast goes from 2.89:1 to 13:1.
3. **Apply `max-width: 70ch` to all body paragraphs** (impact: medium, effort: low) — Change `theme.css:544` from `.content-section p` to `main p` (so it covers card bodies, FAQ answers, etc.), then restore `max-width: 100%` on `.feature-card p` if cards need full-width behavior. Alternatively, add `max-width: 70ch` to each card-body selector.
4. **Add h4–h6 font differentiation** (impact: low, effort: low) — `base.css:180–182`: h4 already has a distinct font-size (1.2rem) but shares the Playfair Display headline font. Consider explicitly setting `font-family: var(--font-ui)` for h4, h5, h6 to match the kit's "slab-serif for display; warm humanist for reading" principle at the sub-section level.

## Evidence

- **Contrast calculations** (Python sRGB→linear luminance, WCAG contrast formula):
  - Turquoise #2A8C82 on Sandstone #F2E4C8: **3.23:1** (FAILS 4.5:1 body)
  - Sage #7A8C68 on Sandstone #F2E4C8 (footer links): **2.89:1** (FAILS 4.5:1)
  - Burnt Umber #2E1A0E on Sandstone #F2E4C8: **13.15:1** (PASS)
  - Burnt Umber #2E1A0E on Adobe Dust #FAF0DC: **14.61:1** (PASS)
- **Line length**: `theme.css:37–41` (`.body-text`), `theme.css:544–547` (`.content-section p`) both correctly set `max-width: 70ch`; `theme.css:170` (`max-width: 60ch` on `.hero-sub`); `theme.css:368` (`max-width: 60ch` on `.page-lead`). No other `p` selectors enforce this.
- **Typography roles**: `base.css:82–87` maps `--font-headline` → Playfair Display, `--font-body` → Lora, `--font-ui` → Source Sans 3, `--font-mono` → IBM Plex Mono. `base.css:111` sets body to Lora. All 5 heading levels share `--font-headline` (`base.css:157–168`).
- **Heading structure**: Verified h1→h2→h3 nesting on all 8 pages (index.html:124/h1→145/h2→180/h3; features.html:107/h1→131/h2; clients.html:106/h1→115/h2; download.html:106/h1→112/h2→127/h3; plugins.html:106/h1→112/h2; docs.html:106/h1→112/h2; hub.html:106/h1→112/h2; about.html:106/h1→112/h2→131/h2→faq-dl).
- **Brand kit ref**: `desert-horizon.js:437` ("Keep body line-length to 60–72 characters"), `desert-horizon.js:950` (WCAG AA — 4.5:1 body text, 3:1 large text/UI), `desert-horizon.js:400–407` (Lora body with `line-height: 1.65`), `desert-horizon.js:383–432` (typography roles and `typography_rules`).
- **Google Fonts CDN link**: No `<link rel="stylesheet" href="fonts.googleapis.com">` found in any HTML `<head>`. Fonts are referenced by name only in CSS custom properties. Self-hosted WOFF2 not confirmed (no `fonts/` directory found in `css/`); this is a known spec requirement per `new_site.md:86–87` but is a performance/brand-consistency issue, not a readability dimension issue per se.
