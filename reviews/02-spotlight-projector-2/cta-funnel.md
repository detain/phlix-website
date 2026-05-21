# CTA & Funnel Review: 02-spotlight-projector-2

**Variant:** 02-spotlight-projector-2
**Reviewer:** CTA & Funnel Reviewer (Wave 2)
**Date:** 2026-05-20

---

## Executive Summary

The variant has solid CTA placement and a clear funnel structure, but suffers from weak trust signals that undermine conversion confidence. The self-hostable angle is strong but underexploited as a trust mechanism.

**Overall Funnel Health:** Moderate
**Primary Concern:** Trust signals are present but not prominent enough to overcome "why not just use Plex/Jellyfin?"

---

## 1. CTA Placement Analysis

### Hero Section CTAs (Line 105-108)
```html
<div class="cta-group">
  <a href="download.html" class="btn btn--primary">Get Phlix</a>
  <a href="https://detain.github.io/phlix-docs" class="btn btn--secondary">Read the docs</a>
</div>
```

**Assessment:** ✅ Good placement
- Primary CTA ("Get Phlix") appears above the fold with clear action
- Secondary CTA ("Read the docs") provides an escape hatch for research-mode visitors
- Button hierarchy is correct: primary = conversion, secondary = education

**Position Score: 8/10** — First CTA appears immediately, but the hero tagline is lengthy (may push CTA below fold on smaller viewports).

### Mid-Page CTA Banner (Line 185-190)
```html
<section class="cta-banner">
  <div class="container cta-banner-inner">
    <h2>Ready to stream?</h2>
    <a href="download.html" class="btn btn--primary">Download Phlix</a>
  </div>
</section>
```

**Assessment:** ✅ Strong retargeting
- Appears after feature education section, capturing users who've absorbed value propositions
- "Ready to stream?" headline creates urgency without pressure
- Single focused CTA increases likelihood of conversion for interested visitors

**Position Score: 9/10** — Well-timed after feature discovery.

### Overall CTA Placement: 8.5/10

---

## 2. Trust Signals Analysis

### Present Trust Signals

| Signal | Location | Strength |
|--------|----------|----------|
| Open-source | Hero tagline, feature cards | Strong |
| Self-hostable | Hero tagline, "100% self-hostable" feature | Strong |
| No subscriptions | Feature card ("No subscriptions") | Strong |
| Native clients (multiple platforms) | Feature card, metadata | Medium |
| GitHub links | Footer, docs | Strong |
| BSD-3 License | Footer | Medium |

### Missing/Cweak Trust Signals

| Signal | Issue |
|--------|-------|
| **Download/installation count** | No "X downloads" or "used by Y users" — can't establish social proof |
| **Version/release date** | No indication the software is actively maintained |
| **Testimonials** | Zero user quotes or community endorsements |
| **Media coverage** | No "as seen in" or press mentions |
| **Security practices** | No mention of security audits, HTTPS, etc. |
| **Live demo** | No "try before you install" option |
| **Update frequency** | No "released yesterday" or changelog callout |

**Trust Signal Score: 5/10** — Relies too heavily on "open-source" alone. Missing social proof hooks that would help a first-time visitor commit to self-hosting.

---

## 3. Funnel Support Analysis

### User Journey Flow

```
[Hero] → [Feature Grid] → [CTA Banner] → [Footer Navigation]
  ↓            ↓                ↓              ↓
 Primary    Education      Retarget       Deep links
 CTA (Get)   (6 features)  CTA (stream?)   (GitHub, docs)
```

### Strengths

1. **Clear two-step conversion path:** Get Phlix (install) → Read the docs (learn)
2. **Feature grid educates before asking for conversion** — proper "show value first" pattern
3. **Footer provides developer-focused escape hatches** (GitHub, API reference)
4. **Navigation includes Hub link** — suggests ecosystem beyond the server

### Weaknesses

1. **No secondary conversion path** for visitors not ready to download (e.g., newsletter, GitHub star)
2. **Missing " Compare" or "Why Phlix vs X"** — no competitive differentiation visible
3. **No exit capture** — no newsletter or changelog signup for users who leave
4. **Download page not reviewed here** — but if it requires login/registration, drop-off likely
5. **No community signal** — Discord, forum, or Reddit link would help keep visitors engaged

**Funnel Completeness Score: 6/10** — Basic linear funnel works but lacks re-engagement loops.

---

## 4. Recommendations (Priority Order)

### P0 — Trust Signal Gaps (High Impact)

1. **Add download count or "active installations"** badge near hero CTA
   - Even a rough estimate ("Thousands of users") creates momentum
2. **Add "Last updated: [date]"** to hero or CTA section
   - Shows active maintenance without needing a full changelog

### P1 — Funnel Optimization (Medium Impact)

3. **Add GitHub star button** alongside "Get Phlix" CTA
   - Low-commitment engagement for visitors not ready to install
4. **Add "Subscribe to updates"** email capture in footer or as slide-in
   - Captures leads who want to monitor the project
5. **Link feature cards to deeper feature pages** in `features.html`
   - Current cards are static — adding `href` to articles would aid research

### P2 — Competitive Differentiation (Lower Impact)

6. **Add comparison table** or "Why Phlix vs Plex/Jellyfin" section
   - Addresses the unspoken question every visitor has
7. **Add testimonial section** (even 1-2 community quotes)
   - Human endorsement dramatically increases conversion for self-hosted software

---

## 5. Frontend Philosophy Adherence (Bonus)

| Pillar | Assessment |
|--------|-------------|
| Typography | ⚠️ Uses Georgia for logo only; body font inheritance needs checking |
| Color | ✅ Gold (#F5C542) on black is distinctive and committed |
| Motion | ⚠️ `hero-spotlight` class suggests animation potential; needs verification |
| Space | ✅ Generous padding in container/hero-content |
| Depth | ⚠️ `hero-spotlight` provides atmospheric element; needs visual verification |

---

## Summary Scores

| Category | Score | Notes |
|----------|-------|-------|
| CTA Placement | 8.5/10 | Hero + retarget banner both effective |
| Trust Signals | 5/10 | Open-source strong; social proof weak |
| Funnel Support | 6/10 | Linear flow works; missing re-engagement |
| **Overall** | **6.5/10** | **Decent baseline; significant trust gaps** |

---

## Verdict

This variant is a functional landing page but not a conversion-optimized one. The "self-hostable media server" positioning is strong and underutilized. The single biggest opportunity: **add social proof** (downloads, users, testimonials) to back up the "why trust this project?" question that every self-hosted software visitor has.
