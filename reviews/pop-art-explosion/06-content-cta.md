# Review: Pop Art Explosion — Dimension 9 (Content Accuracy) & Dimension 10 (CTA/Funnel)

## Dimension 9: Content Accuracy — Score: 75 (FAIL)

### Summary
All 8 pages were checked against safe facts in `new_site.md` §16 and copy in `shared/content.json`. The only substantive content inaccuracy found is a single wrong license URL reused across all pages. All product feature claims are accurate and match content.json verbatim.

### ❌ Items

#### 1. License URL points to wrong repo (all 8 pages)
Every page's footer has a License (BSD-3) link pointing to `https://github.com/phlix-website/blob/master/LICENSE`. The correct target per `new_site.md` §5 is `https://github.com/detain/phlix-server/blob/master/LICENSE`.

- `index.html:224`
- `features.html:195`
- `clients.html:173`
- `download.html:149`
- `plugins.html:115`
- `docs.html:115`
- `hub.html:113`
- `about.html:134`

**Impact:** Minor. The phlix-website repo does not ship a BSD-3 license — phlix-server does. A user clicking this link would get a 404.

---

### Verification: Claims That Are Accurate

| Page | What was checked | Result |
|------|-----------------|--------|
| index.html:79 | Hero headline `Your media. Your library. Your Phlix.` | Matches `content.json` `hero.headline` |
| index.html:80 | Hero subheadline | Matches `content.json` `hero.subheadline` verbatim |
| index.html:82 | Primary CTA "Get Phlix" → `download.html` | Correct (content.json says `/download`) |
| index.html:83 | Secondary CTA "Read the docs" → `https://detain.github.io/phlix-docs` | Correct |
| index.html:93–99 | All 7 pitch bullets | Match `content.json` `pitch_bullets` verbatim |
| index.html:115–179 | All 8 feature card bodies | Match `content.json` `features` verbatim |
| features.html:74–152 | All 8 feature detail bodies | Match `content.json` `features` verbatim |
| clients.html:72–126 | All 5 client taglines and highlights | Match `content.json` `clients` verbatim |
| download.html:68 | "Requires PHP 8.3+" | Safe fact §16 ✓ |
| download.html:104 | "PHP 8.3+, Workerman 5.x" in ecosystem | Safe fact §16 ✓ |
| download.html:105 | "Cloud directory + reverse-tunnel relay" | Matches content.json ecosystem[1].what |
| plugins.html:67 | "LifecycleInterface + manifest" | Safe fact §16 ✓ |
| plugins.html:75 | Links to `phlix-plugin-example` | Correct external target per §5 |
| hub.html:67 | "reverse-tunnel relay handles NAT traversal" | Matches content.json hub.body |
| about.html:77–100 | All 6 FAQ items | Match `content.json` `faq` verbatim |
| about.html:70 | "BSD-3-Clause across all Phlix projects" | Safe fact §16 ✓ |

---

## Dimension 10: CTA / Funnel — Score: 80 (WARN)

### Summary
Primary CTA is above fold on home with correct href. All 8 pages have a closing `.cta-banner`. One page (download.html) has a CTA banner whose button is `btn-secondary` and drives toward docs instead of download — a funnel direction mismatch.

### ❌ Items

#### 1. download.html CTA banner drives toward docs, not download
`download.html:115` has:
```html
<a href="docs.html" class="btn btn-secondary btn-large">Read the docs</a>
```
- **Expected:** `btn btn-primary` pointing to `download.html` (or a download anchor)
- **Found:** `btn btn-secondary` pointing to `docs.html`
- **Problem:** Per new_site.md §3.4, the download page's closing `.cta-banner` should drive toward download. Instead it is the only page whose CTA sends users to docs.

**Citation:** `download.html:112–117`

#### 2. Missing .cta-banner on docs.html
`docs.html` ends at line 85 with the closing `</main>` tag immediately before the footer. There is no `.cta-banner` section.

Per new_site.md §3.6, docs.html should have a closing `.cta-banner`. Per §5, "every page ends in a `.cta-banner`."

**Citation:** `docs.html` — no `.cta-banner` element found

---

### ✅ Items

| Check | Location | Result |
|-------|----------|--------|
| Home hero primary CTA above fold | `index.html:82` — `<a href="download.html" class="btn btn-primary btn-large">Get Phlix</a>` | Pass |
| Primary CTA href correct | `index.html:82` — `href="download.html"` | Pass (content.json says `/download`, relative works) |
| All pages have `.cta-banner` | index, features, clients, download, plugins, hub | Pass |
| Primary button color = red (#FF1A1A) | `base.css:12` — `--color-primary: #FF1A1A` | Pass |
| Secondary button color = yellow (#FFE600) | `base.css:13` — `--color-secondary: #FFE600` | Pass |
| Download ≤2 clicks from home | Home → download.html (1 click) | Pass |
| docs.html missing .cta-banner | `docs.html` — no closing CTA | **FAIL** |
| download.html CTA wrong direction | `download.html:115` — secondary CTA to docs | **FAIL** |

---

## Severity Assessment

| Dimension | Score | Threshold | Result |
|-----------|-------|-----------|--------|
| Content Accuracy | 75 | <80 = ❌ | ❌ |
| CTA/Funnel | 80 | 80-89 = ⚠️ | ⚠️ |

**Overall Severity: ❌** — Content accuracy is below 80.

---

## Required Fixes

### Must fix (Content Accuracy — 0 tolerance):
1. **License URL** — Change `https://github.com/phlix-website/blob/master/LICENSE` → `https://github.com/detain/phlix-server/blob/master/LICENSE` in all 8 page footers.

### Must fix (CTA/Funnel — 0 tolerance):
2. **docs.html** — Add closing `.cta-banner` section before `</main>`.
3. **download.html:115** — Change `btn-secondary` + `href="docs.html"` to `btn-primary` driving toward download (either a download anchor or a self-link).

