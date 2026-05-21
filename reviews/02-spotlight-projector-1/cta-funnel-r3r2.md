# CTA & Funnel Review — 02-spotlight-projector-1 (Round 2)

## CTA Placement & Clarity

### index.html
- **Primary CTA**: "Get Phlix" button prominently placed in hero section (above the fold)
- **Secondary CTA**: "Read the docs" adjacent to primary CTA
- **Additional CTAs**: "See all features" button mid-page; GitHub links for ecosystem components
- **Assessment**: Strong CTA placement on homepage with clear primary action

### about.html
- **Primary CTA**: None visible on this page
- **Secondary CTA**: Links to GitHub for license, issue tracker, GitHub org
- **Assessment**: No conversion-focused CTA. About page is informational but lacks any "Get Phlix" or "Download" button to continue the funnel

### contact.html
- **Status**: File does not exist in this variant
- **Assessment**: Missing contact page entirely

---

## Funnel Flow Assessment

### Navigation Structure
- Global nav present on all pages: Home | Features | Clients | Download | Plugins | Docs | Hub | About
- Funnel path appears to be: Home → Features → Download
- Missing page: Contact (could be Hub or About as proxy)

### Flow Issues
1. **About page has no CTA** — user reads philosophy, license, FAQ, but has no clear next step to convert
2. **No dedicated contact page** — trust-building through direct communication is absent
3. **Download page missing from review** (but exists per glob) — would need to verify it exists and has strong CTA

### Strengths
- Homepage CTA is clear and action-oriented
- Ecosystem links provide multiple entry points for different user intents (developers → GitHub, users → docs)
- Footer navigation mirrors main nav for consistency

---

## Trust Signals

### Present
- **Open-source credibility**: BSD-3 license prominently mentioned, GitHub organization linked
- **Privacy framing**: "100% self-hostable — your library never leaves your hardware"
- **Technical credibility**: Specific tech stack mentioned (PHP 8.3+, Workerman 5.x, FFmpeg, SyncPlay, NTP sync)
- **Security features**: JWT auth, Argon2ID password hashing, parental controls mentioned in feature card
- **JSON-LD structured data**: Schema.org SoftwareApplication markup for SEO credibility
- **Multi-user/enterprise ready**: Mentioned in feature grid

### Missing
- No customer testimonials or social proof
- No download/installation count or "X users" metric
- No media mentions or press coverage
- No clearly visible community size/activity indicators

---

## Score: 60/100

| Criterion | Score | Notes |
|-----------|-------|-------|
| Primary CTA per page | 15/25 | Homepage has clear CTA; About has none; Contact missing |
| Trust signals | 20/25 | Strong open-source credibility, privacy focus; lacks social proof |
| Funnel navigation | 15/25 | Good nav structure but About page dead-ends; missing contact |
| CTA clarity & placement | 10/25 | Homepage CTA excellent; About page CTA absent |

---

## Pass/Fail: FAIL

### Rationale
The variant fails because:
1. **About page has no conversion CTA** — users who reach this page via the nav have no clear next step to download or try Phlix
2. **Contact page does not exist** — a dedicated contact page is standard for trust and can resolve objections; its absence creates a funnel hole
3. **No social proof anywhere** — purely technical/feature claims without third-party validation reduces trust, especially for self-hosted software where users need confidence the project is alive and supported

### Recommendations
1. Add "Get Phlix" CTA button to About page (can be placed below philosophy section or above footer)
2. Either create contact.html or ensure Hub page serves as contact/proxy
3. Add one trust signal: GitHub stars, contributor count, or "Join X users" somewhere on homepage
