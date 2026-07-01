# Localization — marble-atrium

**Score: 90/100** — lang="en" on all pages; all substantive product copy from content.json; kit voice micro-copy is outside content.json but brand-appropriate.

## Findings

- All 8 HTML pages: `<html lang="en">` ✅ — matches `site.default_locale: "en"` from content.json.
- All user-facing product claims trace to content.json:
  - `hero.subheadline` → `index.html:94` ✅
  - All 7 `pitch_bullets[]` → `index.html:108-115` ✅
  - All 8 `features[].title/body` → `features.html:74-142` + `index.html:124-177` ✅
  - All 5 `clients[]` data → `clients.html:75-130` + `download.html:88-112` ✅
  - All 5 `ecosystem[]` data → `download.html:120-154` ✅
  - All 6 `faq[]` Q&A → `about.html:96-124` ✅
  - `site.name` → all page titles and footer ✅
  - `footer.columns[]` → all footers ✅
- `index.html:93` ❌ **"Your Library, Elevated." in hero** — this is `tagline_primary` from the kit brand kit, NOT from content.json. content.json has `hero.headline: "Your media. Your library. Your Phlix."` — the actual headline shown is the kit's tagline. Per new_site.md §2: "you may treat it as a visual headline overlay, not a replacement of the factual copy" — the factual copy (subheadline) is present verbatim, the H1 is the kit's visual overlay. This is a borderline localization issue: if a translator only translates content.json, the H1 would not change. However, the kit's tagline is brand identity (not product fact), so this is acceptable per the spec's allowance for "visual headline overlay."
- `index.html:187` — "Curated. Considered. Yours." and brand voice embellishments in CTA banners — these are kit `tagline_secondary` values used as micro-copy, not product claims. They are NOT from content.json but are also not factual assertions requiring translation. Acceptable per new_site.md §2's micro-copy carve-out.
- `about.html:76-78` — Philosophy section text: "Phlix is built on the belief that a media server should feel like a grand hotel concierge..." — this is not from content.json; it's brand-kit brand story text used on the About page. Per new_site.md §2, brand-flavored micro-copy is permitted. Not a defect.
- No hard-coded locale-unsafe formatting (e.g., no `Date.toLocaleString()` or similar) ✅ — pure static HTML.
- Logical CSS properties used: `padding-inline`, `margin-inline`, `inset` — supports RTL ✅.
- Footer copyright uses `&copy;` entity and `2026` — year is hardcoded but trivially locale-unsafe; acceptable for a static site.

## Verdict

**Pass** — `<html lang="en">` is set correctly on all pages. All substantive product claims come verbatim from content.json. Kit brand voice copy used as micro-copy (eyebrow text, CTA banner copy, philosophy text) is outside content.json but permitted by the spec's micro-copy carve-out. No locale-unsafe formatting. The kit tagline used as the visual H1 overlay is a borderline case but explicitly permitted by new_site.md §2.
