# Localization Review — Variant 05: Pixel-Tech

**Reviewer:** Dimension Reviewer
**Dimension:** Localization
**Variant:** 05-pixel-tech
**Date:** 2026-05-20

---

## Summary

The variant correctly sets `lang="en"` on all HTML documents and avoids locale-unsafe `toLocaleString()` calls in JavaScript. However, **strings are hardcoded directly in HTML** rather than loaded from `shared/content.json` (contradicting BUILD_LOG.md claims), **RTL layout is completely unsupported** with physical CSS properties throughout, and **self-hosted fonts are declared but not actually present** — the fonts directory is empty and the site relies entirely on system font fallbacks.

**Score: 35/100**

---

## Rubric Results

### ✅ Passed Items

| Check | Status | Evidence |
|-------|--------|----------|
| `<html lang>` present | ✅ PASS | All 8 HTML files have `<html lang="en">` at line 2 |
| No locale-unsafe `toLocaleString()` | ✅ PASS | `main.js` contains zero `toLocaleString()` calls |

### ❌ Failures (Must Fix)

| Check | Status | Evidence |
|-------|--------|----------|
| Strings from content.json | ❌ FAIL | BUILD_LOG.md:42 claims "Content from shared/content.json rendered verbatim" — **FALSE**. HTML files contain hardcoded strings. Footer columns, FAQ items, client cards, ecosystem lists are all duplicated verbatim in each HTML file rather than being dynamically loaded from `shared/content.json`. See evidence below. |
| RTL safety | ❌ FAIL | No `dir` attribute on any HTML element. CSS uses physical properties (`margin-left`, `padding-left`, `top`, `left`) throughout `base.css`, `theme.css`, `components.css` — no CSS logical properties (`margin-inline-start`, `padding-inline-start`). RTL languages would break layout entirely. |
| Fonts subset | ⚠️ CONCERN | `@font-face` declarations exist in `theme.css:13-43` pointing to `/variants/05-pixel-tech/fonts/*.woff2`, but `glob("variants/05-pixel-tech/fonts/**/*")` returns **no files found**. The site relies on system font fallbacks (Courier New, system-ui, etc.). This is documented in BUILD_LOG.md:48 as a known deviation. |

---

## Evidence

### 1. Strings NOT from content.json

**BUILD_LOG.md:42** falsely claims:
> Content from shared/content.json rendered verbatim

**Contradiction — hardcoded footer in index.html:188-219:**
```html
<footer class="site-footer" role="contentinfo">
  <div class="footer-inner">
    <p class="footer-tagline">Open-source media, on your terms.</p>
    <nav class="footer-nav" aria-label="Footer navigation">
      <div class="footer-col">
        <h3>Product</h3>
        <ul role="list">
          <li><a href="/variants/05-pixel-tech/features.html">Features</a></li>
          <li><a href="/variants/05-pixel-tech/clients.html">Clients</a></li>
          <li><a href="/variants/05-pixel-tech/download.html">Download</a></li>
          <li><a href="/variants/05-pixel-tech/plugins.html">Plugins</a></li>
        </ul>
      </div>
      <!-- ... two more footer-col divs ... -->
    </nav>
    <p class="footer-copy">© 2026 Phlix — BSD-3-Clause</p>
  </div>
</footer>
```

**content.json:159-189** defines footer structure, but it is NOT used:
```json
"footer": {
  "tagline": "Open-source media, on your terms.",
  "columns": [
    { "heading": "Product", "links": [ ... ] },
    { "heading": "Developers", "links": [ ... ] },
    { "heading": "Project", "links": [ ... ] }
  ]
}
```

**Same pattern for:**
- `about.html:82-107` — FAQ hardcoded (content.json:133-158 exists but unused)
- `clients.html:72-138` — Client cards hardcoded (content.json:79-125 exists but unused)
- `features.html:72-160` — Feature details hardcoded (content.json:29-77 exists but unused)
- `download.html:108-130` & `docs.html:81-103` — Ecosystem lists hardcoded (content.json:126-131 exists but unused)

Each of the 8 HTML files duplicates the exact same strings independently, violating the DRY principle and making i18n impossible without editing every file.

### 2. RTL Safety Failure

**No `dir` attribute anywhere:**
```bash
rg 'dir=' variants/05-pixel-tech/ --type html
# No matches
```

**Physical CSS properties in base.css:118-141:**
```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;           /* physical — breaks RTL */
  transform: translateX(-50%);
}
```

**Physical CSS properties in theme.css — mobile nav:**
```css
@media (width <= 768px) {
  .nav-menu {
    transform: translateX(100%);  /* physical — should be translateX(100%) for LTR only */
  }
  .nav-menu.is-open {
    transform: translateX(0);
  }
}
```

**Expected:** CSS logical properties (`margin-inline-start`, `inset-inline-start`, `transform: translateX(100%)` would break on RTL). No RTL media query or logical property usage found.

### 3. Fonts Not Present

**theme.css:13-43 declares:**
```css
@font-face {
  font-family: 'Orbitron Bold';
  src: url('/variants/05-pixel-tech/fonts/Orbitron-Bold.woff2') format('woff2');
  ...
}
```

**glob("variants/05-pixel-tech/fonts/**/*")** returns **no files found**.

**base.css:94-98 falls back to system fonts:**
```css
--font-headline: 'Orbitron Bold', 'Courier New', courier, monospace;
--font-body: 'Inter Medium', system-ui, -apple-system, blinkmacsystemfont, 'Segoe UI', sans-serif;
```

This works but defeats the "self-hosted WOFF2" claim in VARIANT.md:43-46.

---

## Recommendations (Ranked by Impact)

| # | Priority | Issue | Fix | Impact |
|---|----------|-------|-----|--------|
| 1 | **CRITICAL** | Strings hardcoded, not from content.json | Replace all hardcoded content sections with JavaScript that fetches and renders `shared/content.json` at build or runtime | Enables i18n; eliminates duplication |
| 2 | **HIGH** | No RTL support | Add `dir` attribute support and replace physical CSS properties with logical equivalents (`margin-inline-start` etc.) | Enables Arabic, Hebrew, Farsi layouts |
| 3 | **MEDIUM** | Fonts directory empty | Download WOFF2 files for Orbitron Bold, Inter Medium, Roboto Mono, JetBrains Mono into `variants/05-pixel-tech/fonts/` | Restores intended brand typography |
| 4 | **LOW** | System font fallback uses incorrect fallback stack | Inter Medium should fall back to system-ui sans-serif, not Courier New | Improves body text readability on fallback |

---

## Per-File Breakdown

| File | lang= | toLocaleString | content.json | RTL | Fonts |
|------|-------|----------------|-------------|-----|-------|
| index.html | ✅ en | ✅ None | ❌ Hardcoded | ❌ FAIL | ⚠️ Missing |
| features.html | ✅ en | ✅ None | ❌ Hardcoded | ❌ FAIL | ⚠️ Missing |
| clients.html | ✅ en | ✅ None | ❌ Hardcoded | ❌ FAIL | ⚠️ Missing |
| download.html | ✅ en | ✅ None | ❌ Hardcoded | ❌ FAIL | ⚠️ Missing |
| plugins.html | ✅ en | ✅ None | ❌ Hardcoded | ❌ FAIL | ⚠️ Missing |
| docs.html | ✅ en | ✅ None | ❌ Hardcoded | ❌ FAIL | ⚠️ Missing |
| hub.html | ✅ en | ✅ None | ❌ Hardcoded | ❌ FAIL | ⚠️ Missing |
| about.html | ✅ en | ✅ None | ❌ Hardcoded | ❌ FAIL | ⚠️ Missing |
| js/main.js | N/A | ✅ None | N/A | N/A | N/A |
| css/base.css | N/A | N/A | N/A | ❌ Physical props | N/A |
| css/theme.css | N/A | N/A | N/A | ❌ Physical props | ⚠️ Missing files |
| css/components.css | N/A | N/A | N/A | ❌ Physical props | N/A |

---

## Conclusion

**Overall Assessment:** REQUEST_CHANGES

The variant fails the localization dimension primarily because content is hardcoded in HTML rather than loaded from `shared/content.json`, making internationalization impossible without duplicating every HTML file. RTL support is entirely absent, which would break the site for right-to-left languages. Font files are declared but not present, relying on system fallbacks.

**Must fix before merge:** Items #1 and #2 (strings from content.json, RTL safety) are blocking issues that prevent the site from supporting multiple locales.
