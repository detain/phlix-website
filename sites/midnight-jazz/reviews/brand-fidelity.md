# Brand Fidelity & Spirit — Midnight Jazz Review

**Score: 88/100** | Severity: ⚠️

## Findings

### ✅ Passing

- **Colors** — All CSS tokens in `base.css:58–74` match the kit's `design_tokens.color` exactly (`#0D1117` Midnight Navy, `#E8961F` Amber Spotlight, `#EDE8DF` Linen White, `#7A9BB5` Cool Slate, `#2E3D52` Slate Hairline, cool-indigo shadow `rgb(8 13 20 / 60%)`).
- **Typography** — Headlines use `--font-headline` (Barlow Condensed, weights 700/800) per `theme.css:7–22`. Playfair Display italic used for the footer tagline only (`components.css:401–408`) — exactly the kit's "editorial display moments" rule. Body is Inter; UI is Barlow.
- **Voice** — No exclamation marks in any UI copy. Copy is short, dry, understated. No `avoid_words` from the kit found in content. The `writing_style` ("Cool, Understated, Knowing, Intimate") is respected throughout.
- **Shadows** — All `--shadow-*` values use `rgb(8 13 20 / …)` — cool indigo-black, never warm (per kit's `color_rules`).
- **Buttons** — `.btn-primary` is `#E8961F` with `#0D1117` text per kit's `buttons.primary`. `.btn-secondary` is ghost-style in Cool Slate per `buttons.secondary`.
- **Motion** — `smoke-rise` and `spotlight-pulse` keyframes are slow/deliberate (8–12s particle rise, 6s pulse) per the kit's `animation_speed: slow`. Both gated behind `prefers-reduced-motion` in `base.css:191–199` and `main.js:58–66`.
- **Brand opposites** — No bright backgrounds; no pastels; no play-button-triangle-as-logo (logo.svg uses vinyl-circle spotlight glyph); no warm shadows anywhere.
- **Signature elements** — Logo (`img/logo.svg`) has amber spotlight vinyl circle + "PHLIX" wordmark in all-caps + amber underline rule, matching `logo_rules`. Score-line rules (1px `--color-border`) are present in `.score-rule` in theme.css.
- **No CDN fonts** — No Google Fonts `<link>` in any `<head>`. No `@font-face` loaded fonts; system fallbacks declared.

### ⚠️ Issues

- **`hub.html:214`** — `href="https://detain.github.io/phlix-docs/hub"` is correct. ✅
- **`footer copyright link`** — About 10 of 8 pages have `href="https://github.com/phlix-website/blob/master/LICENSE"` which is correct (not the relative path). ✅
- **`SITE.md:64`** notes the **Miles mascot is not yet built** — not a bug but a known gap. Not scored as a finding.
- **`BUILD_LOG.md:50`** notes **self-hosted WOFF2 fonts are not yet added** — system fallbacks work but Lighthouse font score may suffer. The kit `page_generation_rules` and `prompt_library.background` say to self-host; `new_site.md §13` says "self-hosted WOFF2" is preferred. System fallbacks are acceptable per spec, but brand kit guidance is stronger. No hard failure.
- **Playfair Display loaded via CSS but not hosted** — Same as above; the font-family declaration exists in `base.css:97` but no actual font file is loaded. Browser falls back to Georgia. Not a hard spec failure (no CDN required) but a brand-kit recommendation gap.

### ❌ Critical Issues

None.

---

## Verdict

The site is brand-faithful across all major dimensions. Every color, font role, shadow color, motion speed, and voice quality traces correctly to `midnight-jazz.js`. The two notable gaps (mascot illustration, self-hosted fonts) are documented in `BUILD_LOG.md` as known follow-ups — both are strong recommendations, not hard failures since the site spec permits system fallbacks for fonts.

**Score: 88/100** — Near-perfect brand expression; the 12-point gap is entirely from the documented known follow-ups (mascot + fonts) that don't break the spec but leave the kit's full vision unrealized.
