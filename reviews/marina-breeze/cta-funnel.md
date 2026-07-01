# CTA / Funnel Review — Marina Breeze

**Dimension:** CTA / funnel
**Score:** 70/100
**Severity:** ⚠️ WARNING

---

## Findings

### ✅ PASS — Primary CTA Above Fold on Home
`index.html:80-89` — The hero section is `min-height: 90vh` with CTA group visible without scrolling ✅
Primary CTA "Get Phlix" is visible above fold ✅
Secondary CTA "Read the docs" is also visible ✅

### ✅ PASS — Primary CTA Button Color is Deep Navy
`components.css:204-209`:
```css
.btn-primary {
  background: var(--color-primary); /* #1B3A5C */
  color: var(--color-bg);          /* #F5F1E8 */
}
```
Primary CTA uses Deep Water Navy (#1B3A5C) ✅ Matches kit button spec ✅

### ✅ PASS — Primary CTA Contrast ≥3:1
`#1B3A5C` background with `#F5F1E8` text = **10.2:1** contrast ratio ✅
(Required ≥3:1 for UI components per WCAG AA)

### ✅ PASS — Secondary CTA De-emphasized
`components.css:218-223` — Secondary "Read the docs" uses teal (`--color-secondary` = `#5BA3A0`) which is a softer, less commanding color than the navy primary ✅
Ghost button (outline style) on "See all features →" (`index.html:205`) further de-emphasizes the secondary path ✅

### ❌ FAIL — Download Goal Not Reachable in ≤2 Clicks
**Analysis:**

1. **Home → Download:** `index.html:86` — Click "Get Phlix" → `download.html` ✅ (1 click)
2. **On download.html:** The page shows install instructions (`git clone`, `composer install`, `php server.php start`). There is **no download link** for a pre-built server release. Users who want to "download Phlix" must:
   - Either clone from GitHub (requires git + composer + PHP CLI knowledge)
   - Or manually navigate to GitHub to find releases
   - There is no "Download for [OS]" button or "Latest Release" link

**Path for non-technical user:**
1. Home → "Get Phlix" → download.html (1 click) — then they see code snippets, NOT a download button
2. To actually download, they must scroll past install instructions and... there is no download link. They must manually go to github.com/detain/phlix-server and find the releases page.

The primary CTA "Get Phlix" implies a direct download, but download.html has no release artifacts or direct download links — only development setup instructions.

**Verdict: ❌ FAIL — download.html is the conversion page but provides no downloadable artifact link.**

### ✅ PASS — Every Page Has a CTA Banner Driving to Download
- `index.html:209-216` — CTA: "Ready to set sail?" → "Get Phlix" → download.html ✅
- `features.html:167-172` — CTA: "Ready to set sail?" → download.html ✅
- `clients.html:141-147` — CTA: "Your device is already supported." → "Get Phlix" → download.html ✅
- `download.html:185-190` — CTA: "Need help getting started?" → "Read the docs" (secondary path) ✅
- `plugins.html:99-104` — CTA: "Ready to build?" → "Read the docs" ✅
- `docs.html:130-135` — CTA: "Need a hand?" → "Open all docs" ✅
- `hub.html:95-100` — CTA: "Access your library from anywhere." → "Learn more about Hub" (→ GitHub hub repo) ✅
- `about.html:124-129` — CTA: "Ready to set sail?" → "Get Phlix" → download.html ✅

### ✅ PASS — Download CTA Present on Home Page
`index.html:214` — "Get Phlix" CTA in home page CTA banner ✅

### ⚠️ WARNING — Hub Page CTA Points to GitHub, Not Download
`hub.html:99` — CTA "Learn more about Hub" links to `https://github.com/detain/phlix-hub`, not to download.html. This is a secondary funnel path (learn more vs. download now). This may be intentional for the Hub page's positioning, but it means the Hub page doesn't push toward download.

---

## Summary

**Score: 70/100 — ⚠️ WARNING**

Primary CTA above fold on home is navy, large, and visible. Secondary CTAs are properly de-emphasized. Every page ends with a CTA banner. The critical failure is that **download.html has no direct download link** — only install instructions for developers. The "Get Phlix" CTA on home implies you can download something, but the download page is actually a developer setup page.

For a marketing site whose primary conversion goal is "download," the lack of a download/release link on the download page is a significant funnel defect. Non-technical users will be confused by git clone instructions where they expected a "Download for Windows/Mac/Linux" button.

Fix: Add a "Download Phlix" section with links to github.com/detain/phlix-server/releases or similar, OR clarify the CTA to manage expectations (e.g., "Get started with Phlix" instead of "Get Phlix").
