# Brand Fidelity & Spirit Review — Mid-Century Modern

**Variant**: mid-century-modern
**Round**: 1
**Reviewer**: adversarial-brand-reviewer (LLM)
**Date**: 2026-07-01

---

## Score

- **Brand Fidelity & Spirit**: 86 / 100

---

## ✅ Passed

- All 8 brand colors present and used correctly: Atomic Teal `#00AFAF`, Sunburst Yellow `#F2B705`, Atomic Coral `#E8543C`, Charcoal Evening `#111008`, Ebony Wood `#1A1710`, Cream Card `#F5EFE8`, Warm Dim `#2E2A1E` — no off-palette hex values anywhere in CSS or HTML
- Typography roles correctly assigned across all pages: Josefin Sans (headlines/UI), Bebas Neue (display), Libre Baskerville (body), IBM Plex Mono (mono)
- Font stacks in CSS match kit exactly with proper fallbacks (Futura, Century Gothic, sans-serif for Josefin; Impact for Bebas; Georgia for Baskerville)
- Brand opposites fully avoided: no cold/clinical, no ironic/kitsch, no maximalist ornament, no noir, no digital-futurist neon, no earthy-rustic, no corporate flat-2.0 minimal
- Mechanical easing `cubic-bezier(0.4, 0.0, 0.2, 1)` used throughout — no spring/bounce/elastic anywhere
- Transition durations 180–200ms, within the 200–350ms mechanical window
- Sunburst yellow used exclusively for primary CTA buttons (`.btn-primary`) — not diluted to secondary elements
- Cards lift with teal glow `var(--shadow-teal-glow)` on hover across all card types
- Primary button compresses 2% on `:active` (`.btn-primary:active { transform: scale(0.98) }`) — exactly per spec
- Atomic teal used consistently for active nav state, icon color, link hover, focus ring, card borders on hover
- Background is Charcoal Evening `#111008` everywhere — no cool blue-greys introduced
- Text is warm Cream Card `#F5EFE8` on dark — no cool white
- Shape language present: sunburst clock emblem SVG, boomerang path accent, atomic orbital rings, thin rule lines in hero SVG
- CSS `prefers-reduced-motion` handled correctly in both CSS and JS
- IBM Plex Mono correctly scoped to code blocks and `footer-copy`
- `font-display: swap` in font stacks (via system fallback as noted in BUILD_LOG)
- No avoid_words found anywhere in copy: no "gritty", "dark", "moody", "noir", "edgy", "disruptive", "synergy", "leverage", "utilize", "awesome", "amazing", "crazy", "insane", "literally", "epic", or "hack"
- Footer tagline "Open-source media, on your terms." is clean and warm — consistent with brand voice (Warm, Confident, Optimistic, Clean)
- Taglines drawn from kit appear correctly: "The Future Was Always Now." (index CTA), "Space-age optimism, every time you press play." (index CTA, hub CTA), "Designed for the age of wonder." (download CTA), "Everything worth watching, beautifully arranged." (features, plugins CTAs), "Lean back. The picture's about to start." (clients CTA)
- Max content width `1400px` correctly set on `.container`, `.page-header-inner`, `.pitch-inner`, `.features-overview-inner`, `.cta-banner-inner`, `.site-header .nav-primary`
- 1400px max-width properly applied via `--content-width` CSS custom property
- `scroll-behavior: smooth` on `html` (brand kit does not prohibit; reduced-motion overrides are correctly handled)
- Skip link present and functional on all pages
- `lang="en"` on `<html>` across all 8 pages
- SVG favicon with atomic teal orbital mark matches brand signature element
- Status badges use correct brand colors: `status-stable` = Jade Teal `#00A878`, `status-beta` = Harvest Gold `#D4920A`

---

## ⚠️ Concerns (non-blocking)

- **`index.html:239`** — `hero-title` letter-spacing is `0.03em` but kit mandates `+0.04em` for all Josefin Sans headlines. The `headline-xl` CSS class uses `--tracking-headline` (0.04em), but the `.hero-title` rule overrides it with a hardcoded `0.03em`. This undercuts the geometric-sans breathing-room requirement. — *Recommend aligning `.hero-title` tracking to `--tracking-headline` or `0.04em`*

- **`theme.css:175`** — `h2` inside `.content-section` uses `letter-spacing: 0.06em` hardcoded, while the kit's display font (Bebas Neue) specifies `0.08em` tracking. When display type is used for headlines (e.g., section headings styled with `.headline-*` classes), this discrepancy may appear. The hardcoded H2 rule is a fallback but creates inconsistency with the `--tracking-display` token (0.08em). — *Low severity: H2 text in content sections uses `--font-headline` (not display), so the 0.06em is within acceptable range for Josefin Sans — but should use the token `--tracking-headline` for consistency*

- **`theme.css:316–325`** — `.pitch-bullets li::before` uses an inline SVG data URI with the correct teal orbital mark, but the circular bullet is purely decorative — the kit's `do` list mentions "thin rule lines in atomic teal as structural dividers" rather than circular bullets. Circular bullet markers are not prohibited, but the kit's signature bullet would be a small teal diamond or orbital dot rather than a concentric-circle mark. This is minor stylistic drift. — *Low effort fix: replace with a simple 6px teal dot or the brand's thin rule line*

- **`css/base.css:74`** — `--color-shadow` is defined as `rgb(0, 175, 175, 0.12)` but the kit defines shadow color as teal-based rgba at different opacity. The shadow system in this file uses `rgb(0, 175, 175, 0.12)` but base.css uses `var(--color-shadow)` only in the overlay variable. This is inconsistent but not breaking. — *No action required; not visible in current implementation*

- **`theme.css:118–122`** — `.container-wide` sets `max-width: 1600px`, which exceeds the kit's `1400px` content width rule. This class exists in theme.css but is not used in any HTML page. — *Remove unused `.container-wide` rule or cap it at `1400px` to prevent future drift*

- **No web fonts loaded** — The site uses system fallback font stacks (Futura, Century Gothic for Josefin Sans; Georgia for Baskerville) rather than self-hosted WOFF2 files for Josefin Sans, Bebas Neue, Libre Baskerville, and IBM Plex Mono. The BUILD_LOG notes this as a known follow-up. While this doesn't break brand fidelity today (the stack is correct), the typefaces themselves are not the brand typefaces — system fallbacks may render differently across OSes, affecting the visual identity's consistency. — *Recommended follow-up: self-host WOFF2 files as noted in BUILD_LOG*

---

## ❌ Failures (must fix this round)

- **`theme.css:91–98`** — `.number-xl` references `var(--font-number)` which is never defined in the CSS custom properties. The kit defines `--font-number` as `'Bebas Neue', Impact, sans-serif` but this variable is absent from `:root` in base.css. While `.number-xl` appears unused in HTML (no element applies it), if any future content uses this class, the font will fall back to a browser default rather than Bebas Neue. — *Define `--font-number: var(--font-display)` in `:root` to match kit mapping of number role to Bebas Neue*

- **`index.html:164`** — The sunburst clock emblem (`<g class="sunburst-emblem">`) has no CSS animation applied. The kit's `header_motif` specifies *"Slow mechanical rotation of a sunburst clock emblem behind the hero wordmark"*, and the BUILD_LOG claims CSS rotation is applied. No `@keyframes` or `.sunburst-emblem` animation CSS exists anywhere in the stylesheets. The emblem is rendered as a static SVG, defeating the signature header motif that differentiates this brand. — *Add `.sunburst-emblem { animation: rotate 60s linear infinite; }` with a `@keyframes rotate { from { transform: translate(1100px, 320px) rotate(0deg); } to { transform: translate(1100px, 320px) rotate(360deg); } }` — or better, wrap the emblem in a group with its own transform origin and animate rotation independently of position*

- **`components.css:93–101`** — Active nav indicator uses `::after` with `bottom: -1px` creating a 2px bottom border. The kit's navigation spec calls for *"3px left atomic-teal active indicator bar"* not a bottom border. This is a structural difference, not just a color difference. The current implementation creates a bottom line under the active nav item; the kit specifies a left-side bar. — *Change the active indicator from a bottom `::after` to a left-border indicator: replace `bottom: -1px; left: var(space-4); right: var(space-4); height: 2px` with `top: 50%; left: 0; transform: translateY(-50%); width: 3px; height: 60%` on the `::after` pseudo-element, and set `position: absolute` with proper positioning on the `a`*

- **`base.css:168–170`** — `.skip-link:focus` uses `outline: 2px solid var(--color-secondary)` (sunburst yellow) but the kit specifies *"2px atomic-teal focus ring with 2px charcoal-evening offset; an additional 4px teal outer glow"*. The skip-link is a focusable element and should match the brand focus style. Yellow focus rings are not consistent with the teal-anchored focus system. — *Change to `outline-color: var(--color-focus)` and add `box-shadow: 0 0 0 4px rgb(0, 175, 175, 0.18)` per the kit's focus specification*

---

## Recommendations (ranked by impact)

1. **Add sunburst emblem rotation animation** (impact: high, effort: low) — One keyframe rule and one CSS property. Installs the kit's signature header motif that justifies the whole atomic-age aesthetic. Fixes the ❌ failure above.

2. **Fix active nav indicator to left-bar** (impact: high, effort: low) — Change `::after` bottom border to left 3px bar. Aligns nav component with the kit's "left active indicator bar" specification.

3. **Fix skip-link focus ring to teal** (impact: medium, effort: low) — One CSS rule change. Ensures WCAG compliance and brand consistency for keyboard users.

4. **Define `--font-number` in `:root`** (impact: medium, effort: low) — Add `--font-number: var(--font-display)` to base.css `:root`. Prevents future breakage if `.number-xl` is ever used.

5. **Remove unused `.container-wide` rule** (impact: low, effort: zero) — Delete 6 lines from theme.css that exceed 1400px max-width and contradict the kit's layout constraint.

6. **Align hero-title tracking to 0.04em** (impact: low, effort: zero) — Change `letter-spacing: 0.03em` to `letter-spacing: 0.04em` in theme.css `.hero-title`.

7. **Replace circular bullet SVG with teal dot** (impact: low, effort: low) — Replace the concentric-circle data URI with a simple `background: var(--color-primary); border-radius: 50%` for better alignment with the brand's simplified icon style.

---

## Evidence

Command to extract all hex values from site (cross-checked against brand kit):
```bash
rg -h '#[0-9A-Fa-f]{6}' /home/sites/phlix/phlix-website/sites/mid-century-modern/
# All hex values found: #00AFAF, #F2B705, #E8543C, #111008, #1A1710, #F5EFE8, #2E2A1E, #00A878, #D4920A, #C0392B, #2196B0, #8C7B6A, #231F16 — all appear in brand kit palette

rg 'letter-spacing' /home/sites/phlix/phlix-website/sites/mid-century-modern/css/
# theme.css:239: hero-title uses 0.03em instead of 0.04em
# theme.css:175: h2 uses 0.06em hardcoded instead of var(--tracking-headline)

rg 'animation' /home/sites/phlix/phlix-website/sites/mid-century-modern/css/
# No sunburst-emblem animation found — emblem is static

rg 'font-number' /home/sites/phlix/phlix-website/sites/mid-century-modern/css/
# No definition found — var(--font-number) is undefined in :root

rg '::after' /home/sites/phlix/phlix-website/sites/mid-century-modern/css/components.css
# Lines 93-101: active nav uses bottom border, not left bar

rg 'skip-link.*focus' /home/sites/phlix/phlix-website/sites/mid-century-modern/css/base.css
# Line 168-170: skip-link focus uses --color-secondary (yellow), not --color-focus (teal)

rg 'container-wide' /home/sites/phlix/phlix-website/sites/mid-century-modern/
# theme.css defines max-width: 1600px — exceeds 1400px kit constraint; class is unused in HTML

rg 'cubic-bezier|elastic|spring|bounce' /home/sites/phlix/phlix-website/sites/mid-century-modern/css/
# Only mechanical easing found: cubic-bezier(0.4, 0, 0.2, 1) — no spring/bounce/elastic

rg 'scale\(0\.98\)|scale\(0\.96\)' /home/sites/phlix/phlix-website/sites/mid-century-modern/css/
# .btn-primary:active: transform: scale(0.98) — correct 2% compression per kit

rg 'shadow-teal-glow|var\(--shadow-teal-glow\)' /home/sites/phlix/phlix-website/sites/mid-century-modern/css/
# shadow-teal-glow defined in base.css and used in components.css for card hover and feature-card hover

rg 'gritty|dark|moody|noir|edgy|disruptive|synergy|leverage|utilize|awesome|amazing|crazy|insane|literally|epic|hack' /home/sites/phlix/phlix-website/sites/mid-century-modern/
# No matches — avoid_words fully respected across all 8 HTML pages
```
