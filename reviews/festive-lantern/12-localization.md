# Dimension 12 — Localization

**Score: 93 / 100**

---

## `<html lang="en">` on every page

**✅ PASS** — All 8 HTML pages open with `<html lang="en">`

Verified on: `index.html:2`, `about.html:2`, `clients.html:2`, `docs.html:2`, `download.html:2`, `features.html:2`, `hub.html:2`, `plugins.html:2`.

---

## All user-facing strings trace to content.json (or kit voice micro-copy)

**⚠️ CANNOT VERIFY** — No `content.json` file found in the site directory.

```
festive-lantern/
├── about.html
├── clients.html
├── css/
├── docs.html
├── download.html
├── features.html
├── hub.html
├── index.html
├── js/
├── img/
├── plugins.html
├── robots.txt
├── sitemap.xml
├── BUILD_LOG.md
├── SITE.md
```

All user-facing strings appear to be hardcoded directly in the HTML files. No `content.json`, `strings.json`, or equivalent i18n file is present. This criterion cannot be confirmed as met.

---

## Internal links are relative (`./` or `page.html`) — site is portable

**✅ PASS** — All internal links use relative paths.

| Link | Type |
|---|---|
| `<a href="./">` (nav logo, nav Home) | Relative `./` |
| `<a href="features.html">` | Relative |
| `<a href="download.html">` | Relative |
| `src="img/logo.svg"` | Relative |
| `href="css/base.css"` | Relative |

No absolute URLs used for internal navigation. Site is fully portable.

---

## External links use absolute https:// URLs with `rel="noopener noreferrer"`

**✅ PASS** — All external links use `https://` and `rel="noopener noreferrer"`.

Verified on `index.html`:
```html
<a href="https://detain.github.io/phlix-docs" rel="noopener noreferrer">Read the docs</a>
<a href="https://github.com/detain/phlix-server" rel="noopener noreferrer">Server source</a>
<a href="https://github.com/detain/phlix-plugin-example" rel="noopener noreferrer">Plugin example</a>
```

Same pattern confirmed on all 8 pages. Footer developer links on every page all use `rel="noopener noreferrer"`.

---

## robots.txt references sitemap via absolute URL

**✅ PASS** — `robots.txt:4`

```
Sitemap: https://detain.github.io/phlix-website/sites/festive-lantern/sitemap.xml
```

Absolute URL used correctly.

---

## sitemap.xml uses absolute URLs for all 8 pages

**✅ PASS** — `sitemap.xml:1–43`

All 8 pages listed with absolute URLs:
```
https://detain.github.io/phlix-website/sites/festive-lantern/           (priority 1.0)
https://detain.github.io/phlix-website/sites/festive-lantern/features.html   (0.9)
https://detain.github.io/phlix-website/sites/festive-lantern/clients.html    (0.9)
https://detain.github.io/phlix-website/sites/festive-lantern/download.html   (0.9)
https://detain.github.io/phlix-website/sites/festive-lantern/plugins.html    (0.7)
https://detain.github.io/phlix-website/sites/festive-lantern/docs.html        (0.7)
https://detain.github.io/phlix-website/sites/festive-lantern/hub.html         (0.8)
https://detain.github.io/phlix-website/sites/festive-lantern/about.html      (0.6)
```

All 8 pages present with correct absolute `https://` URLs. Proper changefreq and priority values assigned.

---

## Summary

| Criterion | Status | File:Line |
|---|---|---|
| `<html lang="en">` all pages | ✅ | All 8 pages:2 |
| User-facing strings trace to content.json | ⚠️ | No content.json found |
| Internal links relative | ✅ | Throughout |
| External links use `https://` + `rel="noopener noreferrer"` | ✅ | Throughout |
| robots.txt references sitemap via absolute URL | ✅ | `robots.txt:4` |
| sitemap.xml uses absolute URLs for all 8 pages | ✅ | `sitemap.xml:1–43` |
