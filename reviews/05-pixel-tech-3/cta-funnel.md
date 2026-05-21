# CTA & Funnel Review: 05-pixel-tech-3

## Summary

**Variant:** 05-pixel-tech-3 (Wave 3)  
**Type:** Landing Page / Marketing Site  
**Product:** Phlix — Self-hosted PHP media server

---

## CTA Inventory

| Location | CTA Text | Type | Target | Status |
|----------|----------|------|--------|--------|
| Hero (L91) | "Get Phlix" | Primary Button | /download.html | ✅ Present |
| Hero (L92) | "Read the docs" | Secondary Button | External docs | ✅ Present |
| CTA Banner (L199) | "Download Phlix" | Large Primary | /download.html | ✅ Present |
| Features More (L191) | "See all features →" | Text Link | /features.html | ✅ Present |

---

## Funnel Analysis

### Current Flow
```
Hero CTA → Download Page
           ↓
Pitch Section (builds desire)
           ↓
Feature Cards (detail)
           ↓
CTA Banner (reinforces conversion)
           ↓
Footer (secondary navigation)
```

### Strengths

1. **Clear primary action** — "Get Phlix" and "Download Phlix" are consistent, direct, and action-oriented
2. **Secondary CTA for documentation** — Caters to technical users who want to research before downloading
3. **Multiple conversion points** — Hero + CTA banner capture users at different stages of readiness
4. **Feature cards provide value proof** — Concrete technical details (NTP sync, CRF values, Argon2ID) build credibility

### Weaknesses

1. **No urgency elements** — No scarcity, version number, "new", or time-sensitive messaging
2. **No social proof** — Missing: user count, GitHub stars, community size, or testimonials
3. **No risk reversal** — No mention of privacy, security audits, or backing by BSD-3 license
4. **Single CTA variant** — No A/B testing different messages ("Start Streaming", "Self-Host Today", "Get Started Free")
5. **Download destination unclear** — `/download.html` may not clarify OS options (Roku, Tizen, Windows, Mobile)

---

## Button Design Review

| Element | Assessment |
|---------|------------|
| Label | "Get Phlix" — Action verb + brand name. Clear but generic. |
| Hierarchy | Primary/secondary distinction exists via `.btn-primary` / `.btn-secondary` |
| Size (L199) | `.btn-large` used in banner — appropriate emphasis |
| Placement | Hero top, banner bottom — good vertical spread |

---

## Copy Effectiveness

### Hero Headline (L88)
> "Your media. Your library. Your Phlix."

**Pros:** Possessive, brand reinforcement, concise  
**Cons:** No transformation/desire hook ("stream anywhere", "never pay for Netflix again")

### Hero Sub (L89)
> "An open-source PHP media server that streams to your Roku, Samsung TV, Windows desktop, phone, and any DLNA device — with SyncPlay, Live TV, transcoding, and a hub that follows you anywhere."

**Pros:** Specific device coverage, key features listed  
**Cons:** Reads as feature dump, not benefit-focused. "Your" at start of headline but sub doesn't maintain 2nd-person focus.

### CTA Banner (L198-199)
> "Ready to stream?" / "Download Phlix"

**Pros:** Question creates engagement, simple directive  
**Cons:** "Ready to stream?" is passive; could be more compelling ("Start streaming free", "Self-host in minutes")

---

## Recommendations

### High Priority
1. **Add social proof** — GitHub stars, user count, or "X servers running Phlix"
2. **Expand download CTA** — The download page should clearly show all client options (Roku, Tizen, Windows, Mobile)
3. **Add urgency/scarcity** — "v2.4 released", "Join X users", or "Free forever"

### Medium Priority
4. **Test different hero CTA copy** — "Get Phlix" → "Start Free", "Download Now", "Self-Host Today"
5. **Add trust signals** — BSD-3 license emphasis, "No account required", "Your data stays on your server"
6. **More prominent feature differentiation** — Why Phlix over Plex/Jellyfin? (Already self-hostable, but this needs to be a headline, not buried)

### Low Priority
7. **Consider inline CTAs within feature cards** — "Learn more about SyncPlay →" links
8. **Add newsletter/Waitlist capture** — Capture emails before download commitment

---

## Verdict

| Category | Score (1-5) | Notes |
|----------|-------------|-------|
| CTA Clarity | 4/5 | Clear primary action, but copy could be more compelling |
| CTA Visibility | 4/5 | Multiple CTAs, good placement, but size contrast could be stronger |
| Funnel Progression | 3/5 | Hero → Pitch → Features → CTA is logical, but lacks social proof bridge |
| Copy Effectiveness | 3/5 | Functional but not inspiring; feature-forward instead of benefit-forward |
| Conversion Confidence | 3/5 | No risk reversal or trust signals to overcome self-hosting friction |

**Overall: 3.4/5** — Solid fundamentals with clear CTAs, but missing social proof and urgency that would accelerate conversion for a technical product requiring setup effort.

---

## Action Items

- [ ] Add GitHub star count or user statistic to hero or below fold
- [ ] Revise hero CTA to: "Start Streaming Free" or "Self-Host Today"
- [ ] Add trust badge line: "Open source • No account required • Your data stays on your server"
- [ ] Audit /download.html to ensure it shows all client platforms prominently
