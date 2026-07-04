# Localization

**Score: 94/100**  
**Severity: ✅**

## Findings

### ⚠️ WARNING: "hub.phlix.io" domain not in content.json (hub.html:148)
As noted in Content Accuracy: the hub page references `hub.phlix.io` as the public Hub URL. This specific domain does not appear in `content.json`. The ecosystem section of content.json only lists the GitHub repository. This makes the string not strictly traceable to content.json.

**Fix:** Either confirm `hub.phlix.io` is an official Phlix domain and add to content.json, or remove the specific domain reference.

### ⚠️ WARNING: License URL uses phlix-website repo (footer, all pages)
All footers link to `github.com/phlix-website/blob/master/LICENSE` for the BSD-3 license. This URL references the website repo, not the server repo (`detain/phlix-server`). While the website repo may host a copy of the BSD-3 license, the server repo is the primary licensing entity.

**Fix:** Update to `https://github.com/detain/phlix-server/blob/main/LICENSE` (verify correct path first).

### ⚠️ WARNING: "Seven years" on features page not traceable to content.json (features.html:90)
"Seven years of building the media server we always wanted." — this is brand-generated copy not in content.json. It appears in a lead paragraph that is NOT the content.json hero content but brand microcopy. While it's not a factual error per se, it should be verifiable or removed.

## What Passed

- ✅ `<html lang="en">` on all 8 pages (index.html:2, features.html:2, clients.html:2, download.html:2, plugins.html:2, docs.html:2, hub.html:2, about.html:2)
- ✅ All 8 pages use `default_locale: "en"` from content.json.site
- ✅ Primary CTA labels: "Get Phlix" traceable to `content.json.hero.primary_cta.label`
- ✅ Secondary CTA labels: "Read the docs" traceable to `content.json.hero.secondary_cta.label`
- ✅ Footer tagline "Open-source media, on your terms." matches `content.json.footer.tagline` exactly
- ✅ Footer columns links match `content.json.footer.columns[]` exactly (3 columns, 4 links each)
- ✅ Footer copyright "© 2026 Phlix — BSD-3-Clause" matches expected format
- ✅ All external link targets match spec §5: docs (detain.github.io/phlix-docs), server source (github.com/detain/phlix-server), plugin example (github.com/detain/phlix-plugin-example), hub (github.com/detain/phlix-hub), GitHub org (github.com/detain)
- ✅ All page titles follow pattern from spec §10
- ✅ Site name "Phlix" from content.json.site.name used in OG site_name and footer
- ✅ Site URL `https://detain.github.io/phlix-website` from content.json.site.url used as base for canonical/OG URLs
- ✅ Pitch bullets, feature bodies, client data, ecosystem list, FAQ — all from content.json
- ✅ No locale-unsafe formatting (no `Intl.DateTimeFormat`, no locale-specific number formatting)
- ✅ CSS uses logical properties where possible (e.g., `padding-inline`, `margin-inline`, `inset`) for RTL readiness
- ✅ No inline styles that assume LTR-specific layout
