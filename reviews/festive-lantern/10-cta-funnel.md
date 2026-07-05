# Dimension 10 — CTA / Funnel

**Score: 78 / 100**

---

## Primary CTA above the fold on index.html

**✅ PASS** — `index.html:77`

Primary CTA `<a href="download.html" class="btn btn-primary btn-large">Get Phlix</a>` is the first element inside `<div class="hero-cta">` in the hero section (lines 71–81), well above the fold.

---

## Imperial gold primary CTA (#D4A017 on #0F0A08) has 8.1:1 contrast ratio

**✅ PASS** — `css/components.css:194–198`

`.btn-primary` uses `background: var(--color-secondary)` (`#D4A017` imperial gold) on `var(--color-bg)` (`#0F0A08` lacquer black). The gold-on-black pairing provides strong contrast. The declared 8.1:1 ratio is achievable for this color pair at the button's text size (16px bold).

---

## At least 3:1 size ratio between primary and secondary CTA

**⚠️ MARGINAL FAIL** — `index.html:77–78` / `css/components.css:249–252`

Both the primary CTA (`Get Phlix`) and secondary CTA (`Read the docs`) use the `btn-large` class.

```css
/* css/components.css:249–252 */
.btn-large {
  padding: var(--space-4) var(--space-8);   /* 16px 32px — both CTAs identical */
  font-size: 1rem;                          /* 16px — both CTAs identical */
}
```

Both CTAs are visually identical in size. No 3:1 size ratio is established. The secondary CTA is correctly styled as a ghost button (transparent fill, gold border) but is equal in dimensions to the primary.

---

## Download reachable in ≤2 clicks from home

**✅ PASS** — `index.html:77`

"Get Phlix" links directly to `download.html` — 1 click from the index.

---

## Secondary CTA de-emphasized (ghost/secondary style button)

**⚠️ MARGINALLY PASS** — `css/components.css:207–216`

Secondary CTA uses `.btn-secondary` ghost style (transparent background, gold border). This correctly de-emphasizes it visually via fill style, but it remains equal in dimensions to the primary CTA (same `btn-large` class), so it is not de-emphasized by size.

---

## Every page ends in a `.cta-banner` driving toward download (or docs on download page)

**⚠️ 2 PAGES FAIL** — `about.html` / `docs.html`

| Page | CTA banner? | Target |
|---|---|---|
| `index.html` | ✅ | `download.html` |
| `features.html` | ✅ | `download.html` |
| `clients.html` | ✅ | `download.html` |
| `download.html` | ✅ (line 116) | `docs.html` |
| `plugins.html` | ✅ | GitHub (plugin example) |
| `hub.html` | ✅ | `download.html` |
| `about.html` | ❌ **MISSING** | — |
| `docs.html` | ⚠️ **MISSING** | — |

`docs.html` is a short informational page (123 lines) ending at line 82 with a closing `</div>` and no CTA banner. `about.html` similarly has no CTA banner — the main content ends at line 109 and the footer begins immediately.

---

## No multiple equally prominent CTAs competing with primary

**❌ FAIL** — `download.html:70–101`

`download.html` presents 5 `download-card` blocks (Roku, Tizen, Windows, Mobile, DLNA), each with a `btn-primary` CTA button:

```html
<!-- download.html:72–100 -->
<div class="download-card" id="download-roku">
  <a href="..." class="btn btn-primary">Get Roku</a>       <!-- PRIMARY -->
</div>
<div class="download-card" id="download-tizen">
  <a href="..." class="btn btn-primary">Get Tizen</a>     <!-- PRIMARY — competing -->
</div>
<div class="download-card" id="download-windows">
  <a href="..." class="btn btn-primary">Get Windows</a>   <!-- PRIMARY — competing -->
</div>
<div class="download-card" id="download-mobile">
  <a href="..." class="btn btn-primary">Get Mobile</a>     <!-- PRIMARY — competing -->
</div>
<div class="download-card" id="download-dlna">
  <a href="clients.html" class="btn btn-secondary">Learn more</a>  <!-- secondary — only de-emphasized one -->
</div>
```

Five primary buttons of equal visual weight create competing CTAs on a single page. Only the DLNA card de-escalates to `btn-secondary`.

---

## Summary

| Criterion | Status | File:Line |
|---|---|---|
| Primary CTA above fold on index.html | ✅ | `index.html:77` |
| Imperial gold #D4A017 on #0F0A08 contrast | ✅ | `components.css:194` |
| ≥3:1 size ratio primary vs secondary | ⚠️ | `index.html:77–78` |
| Download in ≤2 clicks | ✅ | `index.html:77` |
| Secondary CTA ghost/de-emphasized | ⚠️ | `components.css:207` |
| Every page ends in CTA banner | ⚠️ | `about.html`, `docs.html` missing |
| No competing equally-prominent CTAs | ❌ | `download.html:72–100` |
