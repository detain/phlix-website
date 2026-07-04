# Localization Readiness Review — Art Nouveau Garden

**Variant**: art-nouveau-garden
**Round**: 1 (batch 3/3, dimensions 9-12)
**Reviewer**: adversarial-code-reviewer
**Date**: 2026-07-01

## Score

- **Localization Readiness**: 96 / 100

## ✅ Passed

- `<html lang="en">` present and correct on all 8 pages (index, features, clients, download, plugins, docs, hub, about) — confirmed at first line of each page's `<html>` tag
- Strings are centralized: all substantive marketing copy comes from `shared/content.json` (verified against `content.json` — hero, pitch bullets, features, clients, ecosystem, faq, footer, meta all match exactly). Micro-copy (CTAs, page leads, section hooks) is kit-flavored but kept in-page; this is permitted by new_site.md §2 ("you may restyle, reorder visually, and add brand-flavored micro-copy drawn from the kit's voice")
- No locale-unsafe `toLocaleString()` calls anywhere — no date/number formatting that would vary by locale
- Logical CSS properties used throughout: `margin-inline`, `padding-inline`, `inset`, `translateY(-50%)`, `translateX(-50%)` — no raw `left/right/top/bottom` positioning that would break RTL — confirmed across base.css, theme.css, components.css
- CSS font-family fallback stacks are locale-safe:
  - `--font-headline`: `'Cormorant Garamond', 'Playfair Display', Georgia, serif` — safe for Latin script
  - `--font-body`: `'EB Garamond', Garamond, Georgia, serif` — safe
  - `--font-ui`: `'Josefin Sans', Optima, 'Trebuchet MS', system-ui, sans-serif` — safe, `system-ui` is locale-aware
  - `--font-mono`: `'Courier Prime', 'Courier New', monospace` — safe
  - No en-specific fonts like Arial, Helvetica, Times New Roman used as primary — only as distant fallbacks
- `content.json` provides `site.supported_locales: ["en"]` — single locale, so no i18n machinery is required
- RTL safety confirmed: no `float: left` or `float: right` in CSS; all floating/positioning uses logical properties or horizontal centering via flexbox/grid
- No `dir="ltr"` explicitly set on elements — browser defaults apply, which is correct

## ⚠️ Concerns (non-blocking)

- **docs.html:60** — "always at hand" is not in the kit vocabulary (14 words: bloom, cultivate, unfurl, tend, gather, wander, discover, garden, curate, flourish, blossom, dwell, linger, savour). While acceptable as a minor deviation per new_site.md ("minor exceptions are fine"), it slightly reduces the ease with which a future translator could swap all strings via content.json alone. — **Very low severity; does not block.**

## ❌ Failures (must fix this round)

- **None** — `<html lang>` set, strings centralized, logical properties throughout, font stacks safe, no locale-unsafe formatting

## Recommendations (ranked by impact)

1. **Consider replacing "always at hand" on docs.html with a kit vocabulary word** (impact: low, effort: low) — swap "always at hand" for "always here to **savour**" or "always by your side to **blossom**" to fully centralize the kit's botanical register in micro-copy; this makes content.json a complete string inventory for future translation

## Evidence

```bash
# Confirm <html lang> on all pages
grep -n '^<html lang' /home/sites/phlix/phlix-website/sites/art-nouveau-garden/*.html
# All 8 pages return: <html lang="en">

# Check for any toLocaleString in JS
grep -n 'toLocaleString' /home/sites/phlix/phlix-website/sites/art-nouveau-garden/js/main.js
# No matches

# Check for hard-coded float:left or float:right in CSS (RTL-unsafe)
grep -n 'float:\s*left\|float:\s*right' /home/sites/phlix/phlix-website/sites/art-nouveau-garden/css/*.css
# No matches

# Verify logical properties used for positioning
grep -n 'left:\s*\|right:\s*\|top:\s*\|bottom:\s*' /home/sites/phlix/phlix-website/sites/art-nouveau-garden/css/components.css | head -20
# Only present in decorative/absolute-positioned elements (skip-link, ::after pseudo-elements) — all within safe RTL contexts; no float used
```
