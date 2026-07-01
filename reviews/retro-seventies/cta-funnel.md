# CTA / Funnel Review — Retro Seventies

## Score: 59/100 — ❌ Fail

### ❌ Hard Failures

**1. docs.html — no CTA banner**

`docs.html:84-86` — page ends immediately after ecosystem list. No `.cta-banner` section.

Per `new_site.md §3.6`: "Docs ... → closing `.cta-banner`."
Per `new_site.md §5`: "Every page ends in a `.cta-banner` that drives toward download (or docs on the download page)."

**Fix:** Add a `.cta-banner` before the closing `</main>`:
```html
<section class="cta-banner" aria-labelledby="cta-banner-heading">
  <div class="cta-banner-inner">
    <h2 id="cta-banner-heading">Ready to start?</h2>
    <a href="download.html" class="btn btn-fab">Get Phlix</a>
  </div>
</section>
```

**2. about.html — no CTA banner**

`about.html:102-103` — page ends after the FAQ `<dl>`. No `.cta-banner`.

Per `new_site.md §3.8`: "about: `.page-header` → ... → closing `.cta-banner`."

**Fix:** Add a `.cta-banner` before the closing `</main>`.

**3. features.html — primary CTA not above fold**

`features.html:56-63` — The `.page-header` has `h1` + `page-lead` only. No CTA button visible in the initial viewport. A user landing directly on features.html must scroll to find the download action.

This violates the "primary CTA visible above the fold" requirement for the funnel. The `.page-header` should include a CTA button, or an introductory CTA should be placed before the feature grid.

**4. features.html — features page has 8 feature cards instead of 7**

`features.html:67-161` — All 8 features shown. Spec §3.2 says "one per `features[]`" which is technically 8 in content.json. However, the index.html features-overview (which the spec says should be "7 feature cards") also shows 8 (it includes hub).

This creates a UX issue: the "See all features →" link on index.html doesn't make sense when all features are already visible.

---

### ⚠️ Warnings

**5. features.html — CTA at bottom says "Download Phlix" but spec gives exact heading**

`features.html:167`:
```html
<h2 id="cta-banner-heading">Drop the needle — start streaming.</h2>
<a href="download.html" class="btn btn-fab">Download Phlix</a>
```

The heading uses brand voice micro-copy ("Drop the needle — start streaming." from kit). The button label "Download Phlix" is the canonical label. This is acceptable — the button label is correct ✅. The heading is brand micro-copy which is allowed.

**6. clients.html — CTA button says "Download Now" not "Download Phlix"**

`clients.html:143`:
```html
<a href="download.html" class="btn btn-fab">Download Now</a>
```

The spec §5 says CTA labels should be "Get Phlix" or "Download Phlix" — not "Download Now". "Download Now" is not in the canonical list. Minor deviation.

**7. hub.html — CTA heading "Try the public Hub" not matching spec patterns**

`hub.html:78` — Heading and button text deviate from the canonical CTA patterns in the spec. The button label "Get started" is non-standard. The funnel still works (it links to download.html) but the label doesn't match the spec vocabulary.

**8. download.html — CTA banner drives to docs, not download**

`download.html:112-117`:
```html
<h2 id="cta-banner-heading">Need help getting started?</h2>
<a href="docs.html" class="btn btn-secondary btn-large">Read the docs</a>
```

Per `new_site.md §5`: "Every page ends in a `.cta-banner` that drives toward download (or docs on the download page)." This correctly drives to docs on the download page. ✅

---

### ✅ PASS

**Home page — CTA above fold**
`index.html:79-100` — Hero section: h1, subheadline, two CTA buttons visible above fold:
- Primary: "Get Phlix" → `download.html` — burnt orange ✅
- Secondary: "Read the docs" → external docs — harvest gold ghost ✅

Primary CTA contrast: `#D4570D` on `#0F0900` = 4.7:1 — passes ≥3:1 ✅

**Pitch section — secondary CTA path**
`index.html:103-116` — 7 pitch bullets as secondary funnel path ✅

**Features overview — "See all features →" link**
`index.html:196` — guides users toward features.html ✅

**Home page CTA banner**
`index.html:200-206` — "Ready to spin something great?" + "Get Phlix" pill CTA ✅

**Download reachable in ≤2 clicks from home**
Home → Download (1 click) ✅
Home → Features → Download (2 clicks) ✅
Home → Clients → Download (2 clicks) ✅

**Every page ends in a CTA banner (6 of 8 pages)**
- index.html: ✅ (CTA banner)
- features.html: ✅ (CTA banner at bottom, but not above fold — ⚠️)
- clients.html: ✅ (CTA banner)
- download.html: ✅ (CTA banner → docs)
- plugins.html: ✅ (CTA banner → plugin example)
- docs.html: ❌ (no CTA banner — hard failure)
- hub.html: ✅ (CTA banner)
- about.html: ❌ (no CTA banner — hard failure)

---

### ❌ Summary

| Page | Issue | Fix |
|------|-------|-----|
| docs.html | No CTA banner | Add `.cta-banner` before `</main>` |
| about.html | No CTA banner | Add `.cta-banner` before `</main>` |
| features.html | CTA not above fold | Add CTA in `.page-header` or top of content |
| clients.html | "Download Now" wrong label | Change to "Download Phlix" |
