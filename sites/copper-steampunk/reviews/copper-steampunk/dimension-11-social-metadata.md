Score: 95/100 | Severity: ⚠️ | Summary: Complete social metadata across all 8 pages, og:image is SVG not PNG (spec violation), all URLs are absolute.

---

## Finding: Social Metadata Review — Copper Steampunk Site

**Score: 95/100**

---

### ✅ Pass: og:title Present and ≤95 Chars

All 8 pages have `og:title` within the 95-character limit:
- `index.html:12` — "Phlix — Your media. Your library. Your Phlix." (45 chars)
- `features.html:10` — "Features — Phlix" (16 chars)
- `clients.html:10` — "Clients — Phlix" (15 chars)
- `download.html:10` — "Download — Phlix" (17 chars)
- `plugins.html:10` — "Plugins — Phlix" (15 chars)
- `docs.html:10` — "Docs — Phlix" (12 chars)
- `hub.html:10` — "Hub — Phlix" (11 chars)
- `about.html:10` — "About — Phlix" (13 chars)

**Recommendation:** No action needed.

---

### ✅ Pass: og:description Present and ≤200 Chars

All 8 pages have `og:description` within the 200-character limit. Descriptions accurately reflect page content.

**Recommendation:** No action needed.

---

### ⚠️ Warning: og:image Points to SVG, Not PNG

- **File:** All 8 pages, e.g. `index.html:14`
- **Description:** `og:image` is set to `img/og.svg` (an SVG file at ~9KB). The spec (§8, §11) explicitly requires a **1200×630 PNG** (`og.png`). While SVG is technically valid, social platforms (Facebook, LinkedIn, X/Twitter) have inconsistent or limited SVG support. The spec's requirement for `og.png` exists precisely because platforms require raster images for reliable rendering.
- **Reference:** `new_site.md` §8: "`og.png` (1200×630) — social share card…Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** in meta."
- **Recommendation:** Keep `img/og.svg` as the editable source, but ensure a rendered 1200×630 `og.png` raster exists and update all 8 pages to reference it:
  ```html
  <meta property="og:image" content="https://detain.github.io/phlix-website/sites/copper-steampunk/img/og.png">
  ```

---

### ✅ Pass: og:url is Absolute

All 8 pages use absolute URLs for `og:url`:
- `index.html:15` — `https://detain.github.io/phlix-website/sites/copper-steampunk/`
- `features.html:13` — `https://detain.github.io/phlix-website/sites/copper-steampunk/features.html`
- etc.

**Recommendation:** No action needed.

---

### ✅ Pass: og:type = "website"

All 8 pages correctly set `<meta property="og:type" content="website">`.

**Recommendation:** No action needed.

---

### ✅ Pass: og:site_name = "Phlix"

All 8 pages correctly set `<meta property="og:site_name" content="Phlix">`.

**Recommendation:** No action needed.

---

### ✅ Pass: twitter:card = "summary_large_image"

All 8 pages correctly set `<meta name="twitter:card" content="summary_large_image">`.

**Recommendation:** No action needed.

---

### ✅ Pass: twitter:title, twitter:description, twitter:image All Present

All 8 pages have all three Twitter card meta tags populated with matching content to their og: equivalents.

**Recommendation:** No action needed.

---

### ✅ Pass: twitter:creator = "@detain"

All 8 pages correctly set `<meta name="twitter:creator" content="@detain">`.

**Recommendation:** No action needed.

---

### ✅ Pass: theme-color = Kit Primary Color (#B5651D)

All 8 pages correctly set `<meta name="theme-color" content="#B5651D">` using the kit's primary copper color.

**Recommendation:** No action needed.

---

### ✅ Pass: Canonical URLs are Absolute

All 8 pages use absolute canonical URLs (e.g., `index.html:9` — `https://detain.github.io/phlix-website/sites/copper-steampunk/`).

**Recommendation:** No action needed.

---

### ⚠️ Warning: og:image is SVG (Social Platform Compatibility Risk)

See dedicated finding above. This is the primary reason the score is 95/100 rather than 100/100.

---

### Social Metadata Completeness Table

| Page | og:title | og:desc | og:image | og:url | og:type | og:site | twitter:card | twitter:creator | theme-color | canonical |
|------|----------|---------|----------|--------|---------|---------|--------------|----------------|-------------|-----------|
| index.html | ✅ 45ch | ✅ | ⚠️ SVG | ✅ abs | ✅ | ✅ | ✅ | ✅ @detain | ✅ #B5651D | ✅ abs |
| features.html | ✅ 16ch | ✅ | ⚠️ SVG | ✅ abs | ✅ | ✅ | ✅ | ✅ @detain | ✅ #B5651D | ✅ abs |
| clients.html | ✅ 15ch | ✅ | ⚠️ SVG | ✅ abs | ✅ | ✅ | ✅ | ✅ @detain | ✅ #B5651D | ✅ abs |
| download.html | ✅ 17ch | ✅ | ⚠️ SVG | ✅ abs | ✅ | ✅ | ✅ | ✅ @detain | ✅ #B5651D | ✅ abs |
| plugins.html | ✅ 15ch | ✅ | ⚠️ SVG | ✅ abs | ✅ | ✅ | ✅ | ✅ @detain | ✅ #B5651D | ✅ abs |
| docs.html | ✅ 12ch | ✅ | ⚠️ SVG | ✅ abs | ✅ | ✅ | ✅ | ✅ @detain | ✅ #B5651D | ✅ abs |
| hub.html | ✅ 11ch | ✅ | ⚠️ SVG | ✅ abs | ✅ | ✅ | ✅ | ✅ @detain | ✅ #B5651D | ✅ abs |
| about.html | ✅ 13ch | ✅ | ⚠️ SVG | ✅ abs | ✅ | ✅ | ✅ | ✅ @detain | ✅ #B5651D | ✅ abs |
