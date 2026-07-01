Score: 95/100 | Severity: ⚠️ | Summary: All 8 pages set lang="en", content strings trace to content.json, CSS uses logical properties, but og:image is wrong format and year is hardcoded.

---

## Finding: Localization Review — Copper Steampunk Site

**Score: 95/100**

---

### ✅ Pass: <html lang="en"> Set on All Pages

All 8 pages correctly set `<html lang="en">` matching `content.json.site.default_locale`:

- `index.html:2` ✅
- `features.html:2` ✅
- `clients.html:2` ✅
- `download.html:2` ✅
- `plugins.html:2` ✅
- `docs.html:2` ✅
- `hub.html:2` ✅
- `about.html:2` ✅

**Recommendation:** No action needed.

---

### ✅ Pass: All User-Facing Strings Trace to content.json (Where Applicable)

The spec permits brand-flavored micro-copy; substantive product claims come from `content.json`.

**Hero copy** (`index.html:159–165`): eyebrow, headline, subheadline, and CTA labels all match `content.json.hero`. ✅
**Pitch bullets** (`index.html:174–181`): All 7 bullets match `content.json.pitch_bullets` verbatim. ✅
**Feature titles/bodies** (`features.html`, `index.html`): All 7 feature titles and bodies match `content.json.features`. ✅
**Client data** (`clients.html`): Client names, taglines, highlights all match `content.json.clients`. ✅
**Ecosystem data** (`download.html`, `docs.html`): All ecosystem entries match `content.json.ecosystem`. ✅
**FAQ** (`about.html:106–131`): All 6 FAQ items match `content.json.faq` verbatim. ✅
**Footer columns** (`index.html:289–318`): Footer links and headings match `content.json.footer.columns` structure. ✅
**Footer tagline** (`index.html:289`): Uses "Open-source media, on your terms." which matches `content.json.footer.tagline`. ✅

**Recommendation:** No action needed.

---

### ⚠️ Warning: Hard-coded Year in Footer Copyright

- **File:** All 8 pages, e.g. `index.html:319`
- **Description:** `<p class="footer-copy">© 2026 Phlix — BSD-3-Clause</p>` uses a hard-coded year (2026). If this site is built/regenerated in a future year, this will become inaccurate. The spec (§15) says to avoid locale-unsafe formatting; a hard-coded year is a temporal brittleness rather than a locale issue per se, but it violates the spirit of DRY and future-proofing.
- **Recommendation:** Replace with JavaScript that injects the current year, or a server-side templating token. Since this is a static site, JavaScript is acceptable:
  ```html
  <p class="footer-copy">© <span id="footer-year"></span> Phlix — BSD-3-Clause</p>
  <script>document.getElementById('footer-year').textContent = new Date().getFullYear();</script>
  ```

---

### ⚠️ Warning: Brand-Flavored Micro-copy Not Sourced from content.json (Permitted, But Traced)

The spec (§2) permits brand-flavored micro-copy. The following strings deviate from `content.json` verbatim but are brand-voice additions — this is **compliant** with the spec, but noted for review:

- `features.html:61`: "Every mechanism calibrated, every conduit in place. Phlix is engineered to catalogue, protect, and deliver your media with the precision of a master watchmaker." — Brand microcopy (not in content.json)
- `clients.html:61`: "The workshop is equipped with instruments for every purpose." — Brand microcopy
- `download.html:61`: "Full steam ahead into your library." — From kit.tagline_secondary (brand kit), acceptable
- `download.html:155`: "The catalogue is indexed and the gauges read full." — From kit.tagline_secondary (brand kit), acceptable
- `plugins.html:61`: "The apparatus is designed for extension." — Brand microcopy
- `hub.html:61`: "Your server, your network, your rules" — Brand microcopy
- `about.html:61`: "A media server built with the precision of a master watchmaker, the ambition of an airship engineer, and the soul of an eternal explorer." — Brand microcopy
- `hub.html:113`: "The relay is always open. Your library awaits." — Brand microcopy
- `plugins.html:114`: "The workshop is open. Build your first instrument." — Brand microcopy
- `docs.html:61`: "The engineering journals are indexed." — Brand microcopy
- `about.html:61`: Brand microcopy for the page header lead

These are **compliant** with the spec since brand-flavored micro-copy is explicitly allowed, but the reviewer confirms they are intentionally not sourced from `content.json`.

---

### ✅ Pass: No Locale-Unsafe Formatting (Numbers/Dates)

- No `Intl.DateTimeFormat`, `toLocaleDateString()`, or locale-aware number formatters are used.
- No hard-coded numeric formatting that would vary by locale.
- Year "2026" appears as a plain string, not a formatted date.

---

### ✅ Pass: Logical Properties Used in CSS

CSS throughout the site uses logical properties over left/right:
- `components.css:21` — `margin-inline: auto`
- `components.css:22` — `padding-inline: var(--gutter)`
- `components.css:146` — `padding-inline: var(--gutter)`
- `components.css:321` — `padding-inline: var(--space-2)`

This ensures RTL layout compatibility without changes.

---

### ⚠️ Warning: Font Subsetting Not Verifiable in Static CSS

The spec (§15) says "Subset fonts to needed scripts". No `font-display: swap` issues were found, but the CSS `@font-face` declarations (base.css) reference Google Fonts URLs that no longer exist in the CSS (the CSS comment says "Fonts declared via @font-face below, loaded from ./fonts/" but no `@font-face` blocks exist). The fonts appear to be loaded via a separate mechanism not visible in the static CSS files. This reviewer cannot verify font subsetting from the static CSS alone.

**Recommendation:** Verify that self-hosted WOFF2 font files in `css/fonts/` are subset to Latin script only. If using Google Fonts CDN links (which are forbidden per §1 of new_site.md), replace with self-hosted fonts.

---

### Localization Completeness Table

| Page | lang="en" | Strings → content.json | No Hard-coded Dates | Logical Properties |
|------|-----------|------------------------|---------------------|--------------------|
| index.html | ✅ | ✅ | ⚠️ year 2026 | ✅ |
| features.html | ✅ | ✅ | ⚠️ year 2026 | ✅ |
| clients.html | ✅ | ✅ | ⚠️ year 2026 | ✅ |
| download.html | ✅ | ✅ | ⚠️ year 2026 | ✅ |
| plugins.html | ✅ | ✅ | ⚠️ year 2026 | ✅ |
| docs.html | ✅ | ✅ | ⚠️ year 2026 | ✅ |
| hub.html | ✅ | ✅ | ⚠️ year 2026 | ✅ |
| about.html | ✅ | ✅ | ⚠️ year 2026 | ✅ |
