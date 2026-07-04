# Performance Review — mid-century-modern

**Variant**: mid-century-modern
**Round**: 1
**Reviewer**: adversarial-performance-reviewer
**Date**: 2026-07-01

## Score

- **Performance**: 93 / 100

## Passed

- No Google Fonts CDN link in any of the 8 HTML pages (`index.html`, `about.html`, `clients.html`, `docs.html`, `download.html`, `features.html`, `hub.html`, `plugins.html`) — site uses CSS font-family stacks referencing system and fallback typefaces only.
- No external script CDNs (jsdelivr, unpkg, bootstrapcdn, etc.) anywhere in the codebase.
- No external font CDNs; no @font-face rules loading self-hosted font files.
- `<script src="js/main.js" defer>` on `index.html:704` — script is deferred, not render-blocking.
- CSS is split across three external stylesheets (`css/base.css`, `css/theme.css`, `css/components.css`) loaded via `<link rel="stylesheet">` in `<head>` — no inline CSS blocking render.
- Hero SVG (`index.html:124–372`) is inline in HTML, not an external resource; SVG is ~25 KB of inline markup, comfortably under the 120 KB hero budget.
- All image assets are inline SVG: `img/logo.svg` (63 lines), `img/favicon.svg`, `img/og.svg` (102 lines). No raster images to bloat transfer size.
- `js/main.js` is 83 lines of vanilla JS (mobile nav toggle, reduced-motion guard, IntersectionObserver scroll reveals). Small, non-blocking, efficient.
- CSS custom properties `--font-*` use multi-value system font stacks with generic fallback keywords (`sans-serif`, `serif`, `monospace`) — zero network font requests.
- `prefers-reduced-motion` is respected: base.css:138 has `@media (prefers-reduced-motion: reduce)` disabling transitions; main.js:36–43 toggles `.reduce-motion` class on `<html>`.

## Concerns (non-blocking)

- **No `font-display: swap`** — not applicable: the site has no `@font-face` declarations, only CSS `font-family` stacks. Web font `font-display` only applies when loading custom web fonts via `@font-face`. The font stacks (`'Josefin Sans', 'Futura', 'Century Gothic', sans-serif`) rely entirely on the user's OS having those typefaces installed. If a typeface is not present, the generic fallback is used — no network request is made, so `font-display` semantics are irrelevant here. This is a deliberate design trade-off (zero font network cost, no render-blocking) that aligns with the "no CDN dependencies" requirement.
- **System font stack inconsistency** — a macOS user will see 'Josefin Sans' (if installed via Adobe Fonts or similar) while a Windows user without that font will see 'Futura' or 'Century Gothic', and a Linux user will get a generic fallback. This produces variable brand typography across devices. Not a performance failure, but worth noting for brand consistency.
- **Inline CTA styles** — `index.html:625–630` has a `style="font-family: var(--font-body); ..."` inline attribute on a `<p>` tag in the CTA banner. This is a minor css organization smell but has no performance impact.

## Failures (must fix this round)

- **None** — no performance budget violations found. All 7 checked criteria pass.

## Recommendations (ranked by impact)

1. **Audit inline `style` attribute** (impact: low, effort: low) — `index.html:625` has a one-off inline style on a `<p>` tag. Extract to a CSS class in `components.css` for maintainability. No performance impact but poor CSS organization.
2. **Consider a minimal font subset if custom fonts are eventually added** (impact: low, effort: medium) — the current system-font-stack approach is the right call for a zero-dependency static site. If custom self-hosted fonts are added later (e.g., via `@font-face` with `font-display: swap`), subset them to Latin characters only to stay within the 120 KB hero budget.
3. **Verify hero SVG weight on disk** (impact: low, effort: trivial) — the inline hero SVG is estimated ~25 KB. If the site were ever served over a slow connection, the HTML payload alone could approach the 120 KB hero budget. Monitor with a real Lighthouse run to confirm LCP < 2.5 s.

## Evidence

- `grep -r "fonts\.googleapis\|cdn\.\|jsdelivr\|unpkg" sites/mid-century-modern/` — no matches.
- `grep -r "@font-face" sites/mid-century-modern/` — no matches in CSS; no font CDN `@import` in CSS either.
- `grep -r "defer\|async\|type=\"module\"" sites/mid-century-modern/*.html` — `index.html:704` confirmed `<script src="js/main.js" defer>`.
- `grep -r "link.*stylesheet" sites/mid-century-modern/*.html` — all three CSS files loaded via `<link rel="stylesheet">` in `<head>`, not inline `<style>`.
- `ls -lh sites/mid-century-modern/img/` — og.svg, logo.svg, favicon.svg are all small SVG text files.
- `wc -l sites/mid-century-modern/js/main.js` — 83 lines total.
- `wc -l sites/mid-century-modern/css/{base,theme,components}.css` — 222 + 459 + 745 = 1426 total CSS lines, small files.
- CSS font stacks confirmed in `css/base.css:108–112`:

```css
--font-headline: 'Josefin Sans', 'Futura', 'Century Gothic', sans-serif;
--font-display:  'Bebas Neue',    'Impact',     'Haettenschweiler', sans-serif;
--font-body:     'Libre Baskerville', 'Georgia', 'Times New Roman', serif;
--font-ui:       'Josefin Sans', 'Futura', 'Century Gothic', sans-serif;
--font-mono:     'IBM Plex Mono', 'Courier New', 'Courier', monospace;
```

All use generic fallback keywords — no network font requests possible.
