# Usability Review — Retro Seventies

## Score: 67/100 — ❌ Fail

### Hard Failures (❌)

**1. Download CTA reachable in more than 2 clicks from Features page**

`features.html:168` — The CTA banner at the bottom links to `download.html`, but the button label is "Download Phlix" linking to `download.html` directly. However, on `features.html` the `.page-header` section immediately precedes the content grid with no CTA banner at the top. A user scrolling past the features without clicking anything has one entry point to download — the bottom CTA.

Worse: `features.html` has **no CTA above the fold**. The page header shows only `h1` + lead text, then jumps straight into feature cards. A user who lands on features.html directly and doesn't scroll sees no call to action.

From home: Home → features.html → (scroll to bottom) → download.html = 2 clicks. Passable, but non-ideal.

**`features.html:58-63` — page-header has no CTA**

`features.html:165-170` — CTA banner is at the very bottom (line 165+), requiring full scroll.

**Severity:** This is a funnel issue per dimension 10, but also a Nielsen heuristic violation (visibility of system status — the user has no indication of the primary goal of this page until they scroll to the bottom).

**2. docs.html — no CTA banner at bottom**

`docs.html:85-86` — The page ends immediately after the ecosystem list. There is no `.cta-banner` section. Per `new_site.md §3.6`, this page should have a closing CTA banner.

Per `new_site.md §5`: "Every page ends in a `.cta-banner` that drives toward download (or docs on the download page)."

**`docs.html` ends without a CTA banner — ❌ hard failure**

**3. about.html — no CTA banner at bottom**

`about.html:102-103` — The page ends immediately after the FAQ list. There is no `.cta-banner` section.

Per `new_site.md §3.8`: "about: `.page-header` → ... → closing `.cta-banner`."

**`about.html` ends without a CTA banner — ❌ hard failure**

---

### ⚠️ Warnings

**4. Hub page CTA text / destination inconsistency**

`hub.html:76-81`:
```html
<h2 id="cta-banner-heading">Try the public Hub</h2>
<a href="download.html" class="btn btn-fab">Get started</a>
```

Per `new_site.md §3.7`: "Hub: ... → closing `.cta-banner`." And §5: CTAs should be "Get Phlix / Download Phlix (primary, → download)" or "Read the docs (secondary, → external docs)".

The heading "Try the public Hub" and button "Get started" are not the canonical CTA labels from the spec. The button should probably be "Download Phlix" or at minimum a more action-specific label.

**5. download.html — CTA on download page should drive to docs**

`download.html:112-117` — CTA: "Need help getting started?" with "Read the docs" button. This is correct per `new_site.md §5` ("Every page ends in a `.cta-banner` that drives toward download (or docs on the download page)").

This is actually correct for the download page ✅

**6. No visible primary action above fold on features.html**

`features.html:56-63` — The `.page-header` section at the top has `h1` + `page-lead` but no CTA button visible above the fold. This is below the sticky header. A user arriving directly on this page has no immediate path to download without scrolling.

**Severity:** Warning — usability concern, not a hard failure.

---

### ✅ PASS

- Download reachable in ≤2 clicks from home: Home → Download (1 click) ✅
- Mobile nav: `main.js:14-36` — proper `aria-expanded` toggle, Escape key closes, outside click closes ✅
- Nielsen 1 (visibility of system status): nav active state clearly indicated with `aria-current="page"` ✅
- Nielsen 2 (match between system and real world): feature titles use plain language ✅
- Nielsen 3 (user control): mobile nav has close affordances (Escape, outside click) ✅
- Nielsen 4 (consistency): same CTA patterns used site-wide ✅
- Nielsen 5 (error prevention): no forms on marketing site — N/A ✅
- Nielsen 6 (recognition): clear icon+text button labels ("Get Phlix", "Read the docs") ✅
- Nielsen 7 (flexibility): keyboard accessible, multiple navigation paths ✅
- Nielsen 8 (design aesthetics): warm, polished retro aesthetic ✅
- Nielsen 9 (help): docs.html links to full documentation ✅
- Touch targets: `.btn` has `min-height: 44px` (components.css:154) ✅
- No interaction traps identified ✅

---

### ❌ Summary of Hard Failures

| Issue | Location | Fix |
|-------|----------|-----|
| docs.html has no CTA banner | `docs.html:85-86` | Add closing `.cta-banner` section |
| about.html has no CTA banner | `about.html:102-103` | Add closing `.cta-banner` section |
| features.html has no CTA above fold | `features.html:58-63` | Add CTA button in page-header or top of content |
