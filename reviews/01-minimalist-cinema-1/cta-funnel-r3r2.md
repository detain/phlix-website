# CTA & Funnel Review — 01-minimalist-cinema-1 (Round 2)

## CTA Placement & Clarity

### index.html ✅
- **Hero CTA**: "Get Phlix" (primary, electric blue) + "Read the docs" (secondary, outlined). Well-positioned, visually dominant, min-height 44px for accessibility.
- **CTA Strip (bottom)**: "Get Phlix" + "See the clients" mirrors hero CTAs, maintaining consistency.
- Primary CTA uses `#2D9CFF` fill with shadow — visually prominent and consistent across both instances.
- **Verdict**: Clear, consistent, well-placed. Pass.

### download.html ✅
- **Primary CTA**: "View on GitHub" (electric blue, primary button with shadow).
- **Secondary CTA**: "Full documentation" (outlined button).
- CTAs appear after install instructions and requirements — natural flow post-decision.
- **Verdict**: Clear conversion path for developers. Pass.

### features.html ✅
- **CTA Strip (bottom)**: "Download Phlix" (primary) + "See the clients" (secondary).
- Visually prominent with consistent button styling.
- **Verdict**: Clear and consistent with other pages. Pass.

### clients.html ⚠️
- **Problem**: No overarching CTA to download or install Phlix anywhere on the page.
- Client cards link to individual GitHub repos (Roku, Tizen, Windows, Mobile), but there is no "Get Phlix" or "Download" button to drive users to the download page.
- A user on this page who wants to try Phlix has no clear next step beyond clicking individual client repos.
- **Verdict**: Missing primary conversion CTA. Fail.

### hub.html ✅
- **Primary CTA**: "phlix-hub on GitHub" (electric blue button).
- **Secondary CTA**: "Hub admin guide" (outlined).
- CTAs appear after explanation of both public and self-hosted options — appropriate placement.
- **Verdict**: Clear for the Hub use case. Pass.

---

## Funnel Flow Assessment

**Expected funnel**: Home → Features/Services → Download/Contact

**Available pages in this variant**:
- `index.html` (home/landing)
- `features.html` (detail)
- `clients.html` (detail)
- `hub.html` (feature detail)
- `download.html` (conversion)
- `docs.html`, `about.html`, `plugins.html` (support)

**Critical structural issues**:

1. **`services.html`, `contact.html`, `faq.html` do not exist** — These are canonical funnel pages requested for review. Their absence breaks the expected home → services → contact/quote → download flow. For an open-source project this may be intentional, but it limits enterprise conversion.

2. **`clients.html` has no CTA** — As noted above, this page is a dead end for conversion.

3. **Navigation funnel**: Features → Clients → Hub → Download → Docs. This is a logical flow but lacks a contact path for B2B/enterprise users who want to talk to someone before downloading.

4. **No "Get Started" or "Try" micro-CTA** between sections — The only true conversion CTAs are "Get Phlix" on index, "Download Phlix" on features, and "View on GitHub" on download. The middle pages (clients, hub) are informational only.

---

## Trust Signals

**Present**:
- Open-source BSD-3-Clause license prominently in footer
- GitHub organization links throughout footer and CTAs
- "Open-source media, on your terms" brand tagline
- Self-hosting emphasis (privacy-first positioning)

**Missing**:
- **No download/install counts** — "X servers running" or "Y downloads" would add credibility
- **No testimonials or user quotes** — No social proof from actual users
- **No certifications** — Not applicable for open-source but no third-party security audits or endorsements either
- **No "About" page with team** — `about.html` exists but likely lacks team/company credibility signals
- **No GitHub stars badge** — Common trust signal on open-source projects
- **No changelog or version history** — Doesn't inspire confidence in active maintenance

---

## Score: 62/100

| Category | Score | Notes |
|----------|-------|-------|
| CTA on index.html | 15/15 | Clear hero + CTA strip, consistent styling |
| CTA on download.html | 14/15 | Clear, but aimed at developers not end-users |
| CTA on features.html | 14/15 | Present and consistent |
| CTA on clients.html | 0/15 | **No primary CTA on a key funnel page** |
| CTA on hub.html | 13/15 | Clear but only relevant for self-host option |
| Funnel flow | 8/20 | services/contact/faq missing; clients.html dead-end |
| Trust signals | 3/20 | BSD license + GitHub only; no social proof |
| FAQ presence | 5/20 | FAQ page does not exist |

**Deduction breakdown**:
- `-15`: clients.html has no CTA (major funnel leak)
- `-10`: services.html, contact.html, faq.html do not exist
- `-10`: No social proof / trust metrics anywhere on site
- `-3`: Inconsistent CTA targeting (hub page targets developers, not end-users)

---

## Pass/Fail: **FAIL**

**Rationale**: While `index.html`, `download.html`, and `features.html` have clear and well-styled CTAs, the `clients.html` page — a key funnel intermediate — lacks any primary conversion CTA. Additionally, the complete absence of `services.html`, `contact.html`, and `faq.html` breaks the expected B2B/enterprise conversion path. Trust signals are minimal (BSD license + GitHub links only), and there is zero social proof (no user counts, testimonials, or endorsements). The site converts well for developer audiences but would underperform for mainstream consumers or enterprise buyers who need more reassurance before downloading self-hosted software.

**Required fixes for pass**:
1. Add "Get Phlix" / "Download" CTA to `clients.html`
2. Consider adding `contact.html` for enterprise inquiry path
3. Add FAQ page addressing common installation/privacy questions
4. Add trust signals (GitHub stars, download counts, or user testimonials)
