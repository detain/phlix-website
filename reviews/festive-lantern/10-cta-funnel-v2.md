# D10 — CTA / Funnel (v2)

## Score: 100/100

---

## Fix Verification Summary

| Fix | Status | Evidence |
|-----|--------|----------|
| Hero CTA primary larger than secondary | ✅ | components.css:253-265; index.html:77-78 |
| CTA banner on about.html | ✅ | about.html:111-116 |
| CTA banner on docs.html | ✅ | docs.html:83-88 |
| Download in persistent nav on all pages | ✅ | All 8 HTML files |

---

## Criteria

### ✅ Hero CTA primary button is noticeably larger than secondary
**File:** `css/components.css:252-265`
```css
.btn-hero-primary {
  padding: var(--space-4) var(--space-10) !important;  /* 16px 40px */
  font-size: 1.0625rem !important;                       /* 17px   */
  font-weight: 700 !important;
}
.btn-hero-secondary {
  padding: var(--space-3) var(--space-6) !important;    /* 12px 24px */
  font-size: 0.875rem !important;                        /* 14px   */
  font-weight: 500 !important;
  opacity: 0.85;
}
```
**File:** `index.html:77-78`
```html
<a href="download.html" class="btn btn-primary btn-large btn-hero-primary">Get Phlix</a>
<a href="https://detain.github.io/phlix-docs" class="btn btn-secondary btn-hero-secondary" rel="noopener noreferrer">Read the docs</a>
```
Size hierarchy: primary font 17px vs secondary 14px (~1.2x). Primary padding 16×40px vs secondary 12×24px. Primary also uses `!important` to prevent any cascade override. Size ratio makes the primary action clearly dominant.

### ✅ CTA banner on about.html before footer
**File:** `about.html:111-116`
```html
<section class="cta-banner" aria-labelledby="about-cta-heading">
  <div class="cta-banner-inner container">
    <h2 id="about-cta-heading">Ready to start your festival?</h2>
    <a href="download.html" class="btn btn-primary btn-large">Download Phlix</a>
  </div>
</section>
```
Funnel: About page → CTA → Download. Present and correctly linked.

### ✅ CTA banner on docs.html before footer
**File:** `docs.html:83-88`
```html
<section class="cta-banner" aria-labelledby="docs-cta-heading">
  <div class="cta-banner-inner container">
    <h2 id="docs-cta-heading">Ready to get started?</h2>
    <a href="download.html" class="btn btn-primary btn-large">Download Phlix</a>
  </div>
</section>
```
Funnel: Docs page → CTA → Download. Present and correctly linked.

### ✅ Download accessible from all pages
- **Persistent nav:** `download.html` is in the nav menu on every one of the 8 HTML pages (always 1 click away)
- **index.html:** Hero CTA (btn-hero-primary) + cta-banner both link to download.html
- **features.html:** cta-banner links to download.html
- **clients.html:** cta-banner links to download.html
- **about.html:** cta-banner links to download.html
- **docs.html:** cta-banner links to download.html
- **download.html:** is the destination page itself
- **hub.html, plugins.html:** nav link to download.html (1 click)

No page requires more than 1 click from a CTA to reach download.

---

## Score: 100/100

All 4 verified fixes are correctly applied. Hero CTA hierarchy is clear (primary ~1.2x larger font, ~1.3x larger padding). Every page either has a direct CTA to download or a persistent nav link. No dead ends in the funnel.
