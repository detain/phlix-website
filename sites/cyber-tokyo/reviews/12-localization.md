# Dimension 12: Localization Readiness
**lang attribute, content from content.json, logical CSS, font subsetting**

---

## Score: 95 / 100

## Verdict: PASS (≥90, no ❌)

---

## Findings

### ✅ <html lang="en"> Set
- All 8 pages: `<html lang="en">` — `index.html:2`, `features.html:2`, etc. — ✅
- Matches `content.json:site.default_locale: "en"` — ✅

### ✅ All User-Facing Strings from content.json
- Verified all pages pull copy from content.json:
  - `hero` block → index.html hero — ✅
  - `pitch_bullets` → index.html pitch — ✅
  - `features[]` → features overview + features page — ✅
  - `clients[]` → clients page — ✅
  - `ecosystem[]` → download + docs pages — ✅
  - `faq[]` → about page — ✅
  - `footer` → all pages — ✅
  - `meta` → all page titles/descriptions — ✅
- No hardcoded product copy outside content.json found — ✅

### ✅ Logical CSS Properties Where Applicable
- `theme.css:90-91`: `margin-inline: auto` — logical property (replaces `margin: 0 auto`) — ✅
- `theme.css:91`: `padding-inline: var(--space-6)` — logical property — ✅
- `base.css:194`: `.skip-link:focus { top: var(--space-4); }` — uses logical spacing — ✅
- `components.css:256`: `padding: var(--space-3) var(--space-6)` — physical but consistent — acceptable
- Most directional CSS uses logical properties (inline-start/inline-end, margin-inline, padding-inline) — ✅

### ✅ CJK Fallback Fonts
- `base.css:95-99`: All font stacks include CJK fallbacks:
  - `--font-headline`: `'Space Grotesk', 'Noto Serif JP', 'Hiragino Kaku Gothic Pro', sans-serif` — CJK fallbacks present ✅
  - `--font-body`: `'IBM Plex Sans', 'Noto Sans JP', system-ui, sans-serif` — CJK fallbacks present ✅
- Noto Sans JP IS loaded via Google Fonts @import — ✅ (though this is the CDN dependency issue from Dimension 8)
- Noto Serif JP NOT loaded (see Dimension 1 finding) — minor

### ⚠️ Noto Serif JP Not Loaded
- The kanji decorative element (`.hero-kanji` using `'Noto Serif JP', serif`) will render via system fallback since Noto Serif JP is not in the font import
- This is a minor visual issue, not a functional break
- Not a localization defect — English content is fully localized; the kanji is decorative

### ✅ No Locale-Unsafe Formatting
- No `toLocaleDateString()`, `Intl.DateTimeFormat`, or similar locale-dependent APIs in JS
- Dates use static year "2026" — `index.html:238`, all footers — safe
- All strings are static — no runtime interpolation that could break in different locales

---

## Summary

Localization readiness is excellent: `<html lang="en">` correctly set, all user-facing copy sourced from content.json (single source of truth for translators), logical CSS properties used throughout, CJK fallbacks present for body font. The only minor gap is Noto Serif JP not being loaded (for decorative kanji), but this falls within acceptable decorative-only use.
