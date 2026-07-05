# D8 — Performance: Render-Blocking JS & Hardcoded Color Literals

**Score: 90/100** — ⚠️ MINOR ISSUE

## Render-Blocking JS

All 8 pages load exactly one script:

```html
<script src="js/main.js" defer></script>
```

`defer` is correctly used, meaning the parser is not blocked. `main.js` is small (68 lines) and only handles the mobile nav toggle. No synchronous scripts, no inline `<script>` in `<head>`. ✅

Font loading via `@import url('https://fonts.googleapis.com/css2?family=...')` in `theme.css` is a render-layer import (font files, not scripts) and does not block HTML parsing. ✅

## Hardcoded Color Literals in Component CSS

**base.css**: All colors are defined as CSS custom properties (design tokens) under `:root`. No raw hex literals outside tokens. ✅

**components.css**: Hardcoded rgba() values found in drop-shadow/filter contexts:
- `filter: drop-shadow(0 0 8px rgba(212,160,23,0.3));` — uses `#D4A017` equivalent (line 36)
- `box-shadow: 0 0 6px rgba(192,57,43,0.6);` — uses `#C0392B` equivalent (line 79)
- `box-shadow: 0 0 20px rgba(212,160,23,0.7), 0 0 48px rgba(212,160,23,0.3);` — uses `#D4A017` equivalent (line 201)
- `rgba(192,57,43,0.20)` / `rgba(212,160,23,0.25)` etc. in focus ring overrides (lines 432-436 TV override)

These are all in `components.css` and are not referencing tokens from `base.css`. While the impact is minimal (drop-shadow is a visual flourish, not a layout property), they deviate from the token-first rule.

**theme.css**: `rgba()` hardcoded values in the `.hero::before` lantern-radiance background-image gradients:
- `rgba(212,160,23,0.4)`, `rgba(212,160,23,0.3)`, `rgba(212,160,23,0.35)`, `rgba(212,160,23,0.25)` (gold tones)
- `rgba(192,57,43,0.35)`, `rgba(192,57,43,0.20)`, `rgba(192,57,43,0.3)` (red tones)

These are hardcoded in the CSS rather than referencing `--color-primary` / `--color-secondary` or defined gradient tokens. They should ideally use token references for consistency and maintenance.

## Verdict

No render-blocking JS — all scripts use `defer`. ⚠️ Hardcoded `rgba()` color literals exist in `theme.css` (hero lantern gradients) and `components.css` (drop-shadows, focus rings). Not critical, but inconsistent with the token system in `base.css`. Score: 90.
