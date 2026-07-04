# Dimension 12: Localization

## Score: 100/100

## Severity: ✅

## Findings

The site is fully localization-ready. All user-facing strings trace back to `content.json`, `lang` is set correctly, and no locale-unsafe patterns are used.

## What passed

- **`<html lang="en">`** on all 8 pages — set from `content.json site.default_locale` ✅

- **All user-facing strings trace to `content.json`**: Hero copy, pitch bullets, feature titles/bodies, client details, FAQ, footer tagline, footer columns — all sourced from the shared content contract (verified by cross-checking all HTML pages against `content.json`) ✅

- **No hardcoded strings outside content.json**: The only content not from content.json is:
  - Page-specific section headings ("Why Phlix?", "Features overview") and brand micro-copy (e.g., "See all features →") — these are acceptable per spec §2 ("brand-flavored micro-copy drawn from the kit's voice") ✅
  - Japanese kanji decorative text — intentional brand element ✅

- **No locale-unsafe formatting**: No `Intl.DateTimeFormat`, `toLocaleDateString()`, `new Date()` in displayed content — all dates in footer are static `2026` ✅

- **Logical CSS properties used throughout**: `padding-inline`, `margin-inline`, `inset`, `inline-start`, `inline-end` — not `left`/`right`/`top`/`bottom` — so RTL translation would work correctly ✅

- **Fonts subset for CJK**: Noto Serif JP and Noto Sans JP are included in the font-family stack for kanji decorative text (`theme.css:254`: `font-family: 'Noto Serif JP', 'Noto Sans JP', sans-serif`) and headline fonts (`base.css:67`: `font-family: var(--font-headline)` which includes Noto Serif JP as fallback) ✅

- **`<meta charset="utf-8">`** on all pages — ensures CJK characters render correctly in kanji decorative text and future translations ✅

- **No `<meta http-equiv="content-language">`** (correctly omitted in favor of `<html lang>`) ✅

- **English-only locale array** in content.json (`"supported_locales": ["en"]`) — accurate since only English content is provided ✅

- **content.json `site.url`** matches the canonical URL structure used in meta tags ✅
