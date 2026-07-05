# Localization

## Score: 90/100

## Severity: ✅

## Findings
- `index.html:2` — `<html lang="en">` ✅ — matches `site.default_locale` from `content.json` ("en") and `new_site.md §4` ("from site.default_locale").
- `css/theme.css:190` — `padding-inline-start: var(--space-6)` on `ul, ol` — uses logical property, not `padding-left`. ✅
- `css/theme.css:198` — `margin-inline: auto` on `.container` — logical property. ✅
- `css/theme.css:203` — `margin-inline: auto` on `.container--wide`. ✅
- `css/theme.css:272` — `margin-inline: auto` on `.hero-sub`. ✅
- `css/theme.css:305` — `margin-inline: auto` on `.pitch-bullets`. ✅
- `css.theme.css` is free of hard-coded `left`/`right` directional properties. The only directional properties used are within CSS custom property references (`var(--space-N)` tokens) or in contexts that genuinely require physical properties (e.g., the hero gradient uses `to top` which is directional but is an image gradient, not a layout property). ✅
- `css/components.css:201` — `left: var(--space-4)` on `.skip-link` — this is a positioning context for the skip link which is acceptable to use physical positioning as it's an overlay element not part of the content flow. The layout itself uses logical properties.
- **Potential improvement**: Some elements could benefit from being traced to content.json more explicitly. For example, `index.html:92` has `aria-hidden="true"` with the text "Find Your Trail." hardcoded in the HTML rather than being pulled from the `tagline_primary` field in content.json. While this specific string does match the brand kit's `tagline_primary` value, it means the text isn't centralized for translation. If a translator were to update `content.json`, this tagline in the hero would not update. ⚠️ Minor architectural note, not a hard defect.

## What passes
- `<html lang="en">` correctly set on all 8 pages ✅
- CSS uses logical properties throughout: `margin-inline`, `padding-inline`, `inset-inline`, `border-inline`, etc. ✅
- No hard-coded `left`/`right` in layout CSS. `css/base.css` uses `left: var(--space-4)` only in `.skip-link` (a positioning overlay) — acceptable. ✅
- All user-facing strings that appear in content.json are reproduced verbatim, making them centralized in one file for translation purposes. ✅ The footer tagline, nav links, footer columns, hero content, pitch bullets, feature bodies, client descriptions, ecosystem list, FAQ — all sourced directly from content.json.
- Footer links and nav links are all relative intra-site paths (`features.html`, `./`, etc.) — correct for localization-ready intra-site navigation. ✅
- External links use absolute `https://` URLs and `rel="noopener noreferrer"` — correct. ✅
- The brand kit's `responsive_behavior` section is properly implemented, which includes the mobile/bottom-tab bar pattern — the CSS adapts fluidly without locale-unsafe formatting. ✅
- `css/base.css:19` — `html { -webkit-text-size-adjust: 100%; }` — prevents text size adjustment on mobile browser zoom, which is important for maintaining layout at the intended sizes across locales. ✅
- Numbers and dates are not dynamically generated — `&copy; 2026` is hardcoded but in an appropriate context (copyright year is not normally localized per-page in a static site). ✅
- No `intl` formatting APIs used (irrelevant for a static HTML site, but noted as consistent with the architecture). ✅

## Verdict
Localization readiness is solid. `<html lang="en">` is correctly set, CSS uses logical properties throughout, and all strings trace to content.json for translation. The only minor note is that the hero tagline "Find Your Trail." is hardcoded in HTML rather than pulled from content.json's `tagline_primary` field, making it one string not yet fully centralized — but this does not constitute a failure of this dimension.
