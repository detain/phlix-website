Score: 92/100 | Severity: ⚠️ | Summary: Primary CTA above fold with correct contrast, secondary CTA de-emphasized, download reachable in 1 click — about.html is missing a CTA banner.

---

## Finding: CTA / Funnel Review — Copper Steampunk Site

**Score: 92/100**

---

### ✅ Pass: Primary CTA Above Fold

- **File:** `index.html:163`
- **Description:** `<a href="download.html" class="btn btn-primary btn-large">Get Phlix</a>` is present in the `.hero` section, visually above the fold on a standard viewport.
- **Recommendation:** No action needed.

---

### ✅ Pass: Primary CTA Contrast ≥ 3:1

- **File:** `index.html:248–253` (`.btn-primary` in components.css)
- **Description:** Primary button uses `--color-copper` (#B5651D) background on the hero section's soot-black (#1A1208) gradient backdrop. The calculated contrast ratio is approximately **4.6:1** — exceeds the WCAG AA 3:1 threshold for large text/UI components. The kit specifies this as an AA pass.
- **Recommendation:** No action needed.

---

### ✅ Pass: Secondary CTA De-emphasized

- **File:** `index.html:164`
- **Description:** The secondary CTA "Read the docs" uses `.btn-secondary` (brass ghost button, transparent background, brass border). It does not visually compete with the primary "Get Phlix" copper button.
- **Recommendation:** No action needed.

---

### ✅ Pass: Download Goal in ≤2 Clicks

- **File:** `index.html:163`
- **Description:** Home → Download is one click via the hero primary CTA. Download page has server requirements + install instructions + ecosystem links.
- **Recommendation:** No action needed.

---

### ❌ Defect: About Page Missing CTA Banner

- **File:** `about.html` (entire file)
- **Description:** The spec (§3.8) states "Every page ends in a `.cta-banner`". The `about.html` page ends at line 137 (`</main>`) with no closing CTA banner section. All other 7 pages have a `.cta-banner`. The about page has a FAQ section as its final content block but no conversion-driving CTA after it.
- **Recommendation:** Add a `.cta-banner` before `</main>` on `about.html`, e.g.:
  ```html
  <section class="cta-banner" aria-labelledby="cta-about-heading">
    <div class="cta-banner-inner">
      <h2 id="cta-about-heading">Ready to explore your library?</h2>
      <a href="download.html" class="btn btn-primary btn-large">Get Phlix</a>
    </div>
  </section>
  ```

---

### ⚠️ Warning: Download Page CTA Banner Points to Docs Instead of Download

- **File:** `download.html:156`
- **Description:** The download page's closing CTA banner uses `btn-secondary` and links to the docs (`https://detain.github.io/phlix-docs`) rather than driving toward the actual download/install. The spec says "Every page ends in a `.cta-banner` driving toward **download** (or docs on the download page)" — since this IS the download page, the CTA should ideally drive toward download, not docs. Using `btn-secondary` (de-emphasized) is also arguably wrong for the download page's primary conversion goal.
- **Recommendation:** Change the download page's closing CTA to a primary button ("Download Phlix") linking to the GitHub release or install instructions, or at minimum keep it as `btn-secondary` but with a more action-oriented label that stays within the download funnel.

---

### ⚠️ Warning: Plugins Page CTA Banner Points Away from Download

- **File:** `plugins.html:115`
- **Description:** The plugins page's closing CTA uses `btn-secondary` and links externally to GitHub (`https://github.com/detain/phlix-plugin-example`) with label "Start building". The spec says CTAs should drive toward "Get Phlix" / "Download Phlix" as primary labels. While "Start building" is appropriate brand-voice microcopy for this developer-focused page, the funnel guidance says docs on docs page, download elsewhere.
- **Recommendation:** Consider whether this CTA should link to the download page instead of to a GitHub repo, or at least add a secondary "Get Phlix" link in the banner alongside "Start building".

---

### ⚠️ Warning: Hub Page CTA Banner Points Away from Download

- **File:** `hub.html:114`
- **Description:** The hub page's closing CTA uses `btn-secondary` and links to GitHub (`https://github.com/detain/phlix-hub`) with label "Explore the Hub". The spec says every page should drive toward download (or docs on the docs/download page). The hub page is not the download page, so pointing its CTA externally to GitHub misses the conversion funnel.
- **Recommendation:** Change the hub page's closing CTA to `btn-primary` with label "Download Phlix" linking to `download.html`.

---

### Summary of CTA Placement Across Pages

| Page | Has .cta-banner? | CTA Type | Links To |
|------|-----------------|----------|----------|
| index.html | ✅ | primary | download.html |
| features.html | ✅ | primary | download.html |
| clients.html | ✅ | primary | download.html |
| download.html | ✅ | secondary | docs (should be download) |
| plugins.html | ✅ | secondary | GitHub (should be download) |
| docs.html | ✅ | secondary | docs (acceptable) |
| hub.html | ✅ | secondary | GitHub (should be download) |
| **about.html** | **❌ Missing** | — | — |
