# D12 — Localization: lang Attribute, Internal/External Links

**Score: 80/100** — ⚠️ ISSUE FOUND

## lang="en"

All 8 pages declare `<html lang="en">`. ✅

## Internal Links (Relative)

All internal navigation links are relative:
- Nav menu links: `href="./"`, `href="features.html"`, etc. ✅
- Footer nav links: all relative. ✅
- Body content links to internal pages (e.g., `download.html#download-roku` on download page) are relative. ✅

## External Links — rel="noopener noreferrer"

Audit of all external links across 8 pages:

| Page | External Links | Missing rel? |
|------|---------------|-------------|
| `index.html` | All GitHub/docs external links have `rel="noopener noreferrer"`. ✅ |
| `features.html` | All have rel. ✅ |
| `clients.html` | All have rel. ✅ |
| `download.html` | All have rel. ✅ |
| `about.html` | All have rel. ✅ |
| `hub.html` | All have rel. ✅ |
| `plugins.html` | All have rel. ✅ |
| `docs.html` | ⚠️ Partial — see below |

### docs.html Issue (4 links missing rel="noopener noreferrer")

In the `docs-links` section (lines 65–68), the four documentation section links lack `rel="noopener noreferrer"`:

```html
<ul class="docs-links">
  <li><a href="https://detain.github.io/phlix-docs">User guide</a></li>         <!-- MISSING rel -->
  <li><a href="https://detain.github.io/phlix-docs/reference">API reference</a></li> <!-- MISSING rel -->
  <li><a href="https://detain.github.io/phlix-docs/developers">Developer docs</a></li> <!-- MISSING rel -->
  <li><a href="https://detain.github.io/phlix-docs/hub-admin">Hub admin guide</a></li> <!-- MISSING rel -->
</ul>
```

The link on line 63 (the "Full documentation is maintained at…" link) correctly has `rel="noopener noreferrer"`, but the four doc section links immediately below it do not.

All other external links on docs.html (ecosystem list, footer) correctly have the attribute.

## Verdict

All pages have `lang="en"` and internal links are relative. External links are missing `rel="noopener noreferrer"` on 4 links in the `docs-links` section of `docs.html` only. Score: 80.
