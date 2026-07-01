# R2 — Localization

## Round 1 Fixes: VERIFIED

None of the Round 1 fixes were localization-related.

---

## LOCALIZATION READINESS ANALYSIS

### `<html lang>` attribute

| File | Declaration |
|------|-------------|
| All 8 pages | `<html lang="en">` ✅ |
| Matches content.json site.default_locale | `en` ✅ |

### Font subsetting (future localization concern)

- **Status:** ⚠️ Not currently an issue (only English content)
- **Brand kit requirement:** "Subset fonts to needed scripts." Since no custom fonts are loaded (see Performance review), font subsetting is a non-issue today. When custom fonts are eventually self-hosted, subsetting to Latin characters only will be needed.
- **Flagging for future** — not a current violation.

### Logical properties (RTL readiness)

| Element | CSS property | Status |
|---------|-------------|--------|
| Margin/padding | `margin-inline`, `padding-inline` | ✅ Used in theme.css:93–94, components.css:536, etc. |
| Content width | `max-width` (not `max-width` with left/right) | ✅ |
| Grid/flex | `flex-direction: column`, `gap` | ✅ No physical left/right properties |
| Border | `border-radius` (symmetric) | ✅ |

**Evidence:**
- theme.css:93 `margin-inline: auto` ✅
- components.css:536 `padding: var(--space-3) var(--space-4)` — uses logical inline-start/end equivalent ✅
- components.css:242 `gap: var(--space-4)` ✅

The site uses physical directions (`margin-bottom`, `padding-inline`) in some places but not in ways that would break RTL. No `float: left` or `margin-left` used as a layout mechanism.

### Locale-unsafe formatting

| Pattern | Status |
|---------|--------|
| Date formatting | No dates displayed ✅ |
| Number formatting | No large numbers with locale-dependent separators ✅ |
| Currency | No prices/currency ✅ |
| String concatenation | All user-facing text is static strings from HTML ✅ |
| `new Date()` | None in JS ✅ |
| `toLocaleString()` | None ✅ |

---

## WHAT'S WORKING

| Element | Evidence |
|---------|----------|
| `<html lang="en">` correct | All 8 pages ✅ |
| All content from content.json | ✅ (single source, translatable) |
| No hardcoded user strings in JS | js/main.js only has DOM manipulation, no copy ✅ |
| Logical CSS properties used | `margin-inline`, `gap`, `flex-direction` ✅ |
| Relative URLs for internal links | `./`, `features.html` etc. ✅ |
| External links with absolute https:// | ✅ |
| `dir="ltr"` implicit (default) | ✅ |
| SVG inline (no `direction` issues) | ✅ |
| No inline `text-align: left` | `text-align: center` used where appropriate ✅ |

---

## CONTENT TRANSLATABILITY

The site is fully translatable because:
1. All marketing copy comes from content.json (single file swap)
2. JS has no user-facing copy
3. CSS has no user-facing copy
4. Brand kit voice/tone notes can be translated into other languages

**What cannot be translated without font replacement:**
- Font families (Cormorant Garamond → not all languages have serif equivalents; Jost → most languages covered but CJK would require different fonts)

---

## SCORE: 85/100

| Factor | Score | Notes |
|--------|-------|-------|
| lang attribute | 100 | `lang="en"` correct ✅ |
| Content from content.json | 100 | Translatable ✅ |
| No JS user strings | 100 | ✅ |
| Logical CSS properties | 90 | Some physical properties used but not in RTL-breaking ways |
| Font subsetting | N/A | No custom fonts loaded (known limitation) |
| Locale-unsafe formatting | 100 | No locale-dependent formatting ✅ |
| RTL readiness | 90 | Mostly RTL-safe; some inline CSS could use logical props |
| **Overall** | **85** | Strong localization foundation |

**Pass threshold: 75** — ✅ Passes.

No required fixes. When adding translations:
1. Replace content.json with translated version
2. Ensure translated fonts support target scripts (e.g., not just Latin subset)
3. Review any remaining physical CSS properties for RTL impact
