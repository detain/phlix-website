# Review: Localization — abstract-canvas

## Score: 82 / 100

---

## Findings

### ✅ `<html lang="en">` set on all 8 pages
- index.html:2 ✅, features.html:2 ✅, clients.html:2 ✅, download.html:2 ✅
- plugins.html:2 ✅, docs.html:2 ✅, hub.html:2 ✅, about.html:2 ✅
- Matches `site.default_locale: "en"` from content.json ✅

### ✅ All user-facing strings appear to trace back to content.json (with caveat)
- Hero content: eyebrow/headline/subheadline/primary_cta/secondary_cta all match content.json hero block
- Pitch bullets: all 7 items match content.json pitch_bullets exactly
- Feature titles and bodies: all 8 match content.json features[] exactly
- Clients: all 5 match content.json clients[] exactly (Roku, Samsung Tizen, Windows, Mobile, DLNA)
- Ecosystem items: all 5 match content.json ecosystem[] exactly
- FAQ items: all 6 match content.json faq[] exactly
- Footer tagline and columns: match content.json footer block exactly

### ⚠️ CTA button labels are hardcoded inline, not dynamically loaded from content.json
- The values happen to match content.json (e.g. "Get Phlix" = hero.primary_cta.label), but the HTML has no variable substitution
- If a translator needed to change "Get Phlix" to "Descargar Phlix", they would need to edit every HTML file
- Per new_site.md §15: "All user-facing strings trace back to content.json (so a translator swaps one file)"
- This is a structural rather than content issue — copy is correct, but not i18n-ready
- **Severity: ⚠️** — not blocked for en-only build, but violates the localization architecture intent

### ✅ No locale-unsafe formatting detected
- No `new Date()` in user-facing copy
- No `Intl.NumberFormat` or locale-dependent number formatting in visible text
- Copyright year is hardcoded `© 2026` — acceptable for static site; would need server-side injection for true i18n
- **No hard-coded dates/numbers in user-facing copy** ✅

### ✅ Logical properties not used — but no left/right physical properties found either
- Reviewed all 8 pages for `left`/`right` in CSS — no physical left/right found in components.css or base.css
- CSS uses flexbox/grid with `gap` rather than directional margins
- Some inline `style="margin-left: var(--space-2);"` at download.html:88 — physical property, single instance
- **Severity: ⚠️** — a few inline physical directional properties exist (download.html:88), but overall no systematic use of left/right that would break RTL

### ⚠️ Font subset: no subsetting declared
- Google Fonts not used (self-hosted approach — correct per new_site.md §1)
- Fonts declared via `@font-face` in base.css:75-79 with system font fallbacks
- No `unicode-range` subsetting declared on @font-face rules
- Brand kit fonts (Cormorant Garamond, Lora, Inter, Bebas Neue, JetBrains Mono) are all Latin-script only
- For en-only build, no subsetting needed — but technically no explicit `unicode-range` is set
- **Severity: ⚠️** — acceptable for en-only build, though explicit subsetting would be more precise

### ⚠️ Some micro-copy is brand-generated, not from content.json
- download.html: "The server runs on your own hardware. The clients stream to your devices." — brand-flavored, not in content.json
- about.html: "Built for the viewer who believes how you watch matters as much as what you watch." — brand voice, not in content.json
- hub.html lines 68-97: descriptive paragraphs are brand-authored, not from content.json
- docs.html: "Everything you need to install, configure, and extend Phlix — written for humans." — brand micro-copy
- new_site.md §2 permits brand-flavored micro-copy, so these are acceptable ✅
- Only substantive product claims (features, clients, ecosystem, FAQ) must match content.json ✅

### ❌ `meta.keywords` tag missing from 6 of 8 pages
- Present: index.html:8
- Absent: features.html, clients.html, plugins.html, docs.html, hub.html, about.html
- Per new_site.md §10, `<meta name="keywords">` required on every page
- **Severity: ⚠️** (not strictly localization, but relates to per-page meta completeness)

---

## Summary

`<html lang="en">` is correctly set on all pages. All substantive product content traces back to content.json. Copy is locale-safe with no hard-coded dates or numbers. Inline micro-copy is brand-authored but within spec permitted scope. The structural gap is that CTA labels are hardcoded inline rather than injected from content.json — correct for en-only but not i18n-ready if translations were needed. Font subsetting is not explicitly declared but all fonts are Latin-script only so no harm done for this build. The `meta.keywords` omission on 6 pages is a minor spec gap.
