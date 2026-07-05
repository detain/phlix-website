# Dimension B: Readability — Round 3 Review

**Reviewer:** Senior Web Reviewer
**Date:** 2026-07-04
**Site:** Stardust Observatory (`/home/sites/phlix/phlix-website/sites/stardust-observatory/`)
**Brand Kit:** `/home/sites/phlix/phlix-website/brand-kits/stardust-observatory.js`
**Weight:** 1.0
**Prior Score:** 7 / 8

---

## Score: 7 / 8

### Criteria & Findings

#### 1. SENTENCE LENGTH: NOT MORE THAN 25 WORDS AVERAGE

Spot-checked representative sentences across all 8 pages:

| Page | Sample Text | Word Count | Pass? |
|------|-------------|------------|-------|
| `index.html` (hero) | "Stardust Observatory is the candlelit study of a Victorian astronomer who never stopped gazing upward — and Phlix is the dome that parts to reveal a sky full of stories." | 27 | Marginal (2 over) |
| `index.html` (feature card) | "Folder-watcher notes the sky's movements, the scanner reads S01E02 and (2020) titles, ItemRepository gathers the luminous data." | 16 | YES |
| `about.html` | "She wrote in her atlas that night: 'What we seek is always older and larger than we imagined.'" | 14 | YES |
| `clients.html` | "I have forty thousand images of deep-sky objects on my server." | 12 | YES |
| `docs.html` | "Getting Started — A beginner's atlas to the observatory. From installation to your first library scan — clear charts for every phase of the journey." | 18 | YES |
| `download.html` | "Your window to the cosmos. Stream your media across every screen in the observatory." | 14 | YES |
| `features.html` | "QualitySelector profiles for mobile-low, mobile-high, web, and tv-4k. CRF 23/28 libx264/libx265 with HLS master and variant playlists — each frame calibrated to your display's appetite." | 23 | YES |
| `hub.html` | "Sign in once. The Hub's reverse-tunnel relay handles NAT traversal so you can access your server from your phone, your Roku at a friend's house, or any device anywhere in the world." | 31 | NO (6 over) |
| `plugins.html` | "Transit Scheduler — Program your Live TV recordings with transit-time precision. The EPG guide becomes a map of the night sky — plan your evening's viewing the way a navigator plans a route." | 27 | Marginal (2 over) |
| `404.html` | "Light from this address reached us two million years ago — but the page itself has moved or never existed." | 20 | YES |

The overwhelming majority of sentences are well under 25 words. Occasional sentences at 27-31 words appear in longer explanatory passages (`hub.html` paragraph, `index.html` hero sub, `plugins.html` Transit Scheduler). These are not systematic failures; they represent editorial choices for longer-form content.

**Pass.** Average sentence length across all pages is comfortably under 25 words. Occasional individual sentences exceed the guideline by 2-6 words in substantive passages.

---

#### 2. PARAGRAPH LENGTH: MAX 3–4 SENTENCES PER PARAGRAPH

Reviewed all pages. Paragraphs are consistently 1-3 sentences. No paragraph exceeds 4 sentences. Longest observed: 4 sentences (within acceptable range).

**Pass.**

---

#### 3. NO LOREM IPSUM OR PLACEHOLDER TEXT

Searched all 8 pages + `404.html`. No placeholder text, Lorem ipsum, or "insert text here" language found. All content is production-quality.

**Pass.**

---

#### 4. BRAND VOICE COPY: SCHOLARLY, LYRICAL, QUIETLY THRILLED — NOT GENERIC CORPORATE

Assessed against brand kit voice definitions: `["Scholarly", "Lyrical", "Quietly thrilled", "Precise"]` and tone: `["Reverent", "Warm", "Contemplative", "Encouraging"]`.

| Page | Brand Voice Assessment |
|------|----------------------|
| `index.html` | Excellent. "The dome is open. What will you find?" / "Begin your watch" / "An atlas that charts itself" — all on-brand. |
| `about.html` | Excellent. "What we seek is always older and larger than we imagined." — scholarly, poetic, brand-authentic. |
| `clients.html` | Good. Testimonials are strong and naturalistic. "The dome is open every evening." is on-brand. |
| `docs.html` | Good. "A beginner's atlas to the observatory. From installation to your first library scan — clear charts for every phase of the journey." — strong brand voice. |
| `download.html` | Good. "Your window to the cosmos." / "Chart your course through the cosmos." — lyrical. |
| `features.html` | Good. "The luminous atlas" / "Meridian sync" / "Aperture-adaptive transcoding" — precise astronomical metaphors used well. |
| `hub.html` | Good. "Like pointing a telescope through a remote shutter." — excellent metaphor. |
| `plugins.html` | Good. "Built to last across decades of viewing." — brand-appropriate. |
| `404.html` | Excellent. "Light from this address reached us two million years ago — but the page itself has moved or never existed." — scholarly, lyrical, quietly thrilled. |

No corporate jargon detected (`synergy`, `leverage`, `disrupt`, `seamless`, `intuitive`, `game-changer` absent throughout).

**Pass.**

---

#### 5. JARGON: APPROPRIATE FOR PROFESSIONAL AUDIENCE

The audience per brand kit: "Cinephiles and thoughtful collectors / Science and nature documentary enthusiasts / Home theater owners who value atmosphere / Adults who romanticize discovery and exploration."

Technical terms used (e.g., "CRF 23/28 libx264/libx265 with HLS master and variant playlists", "ContentDirectory, AvTransport", "JWT auth with refresh tokens, Argon2ID") are appropriate for the stated audience and for a professional/self-hosted software audience. No unexplained beginner-blocking jargon.

**Pass.**

---

### Score Breakdown

| Criterion | Assessment |
|-----------|-----------|
| Sentence length ≤ 25 words avg | Pass (occasional sentences 27-31 words in substantive passages, not systematic) |
| Paragraph length max 3-4 sentences | Pass |
| No placeholder/Lorem ipsum | Pass |
| Brand voice | Pass — Scholarly, Lyrical, Quietly thrilled throughout |
| Jargon appropriate | Pass |
| **TOTAL** | **7 / 8** |

**Prior: 7 / 8 → Current: 7 / 8** (maintained)

---

### Findings Summary

**Strengths:**
- Brand voice is consistently Scholarly, Lyrical, and Quietly thrilled across all 8 pages and 404.html
- No placeholder text or Lorem ipsum
- Short paragraphs (1-3 sentences) throughout
- Astronomical metaphors used precisely and sparingly ("eyepiece", "meridian", "atlas", "aperture", "transit")
- No corporate jargon detected

**Minor Issue:**
- Occasional sentences in longer explanatory passages (e.g., `hub.html`, `index.html` hero sub) exceed 25 words by 2-6 words. These appear in substantive descriptive copy rather than UI labels or CTAs, and represent editorial richness rather than readability failure.

**Recommendations:**
- Consider breaking the 31-word sentence in `hub.html`: "Sign in once. The Hub's reverse-tunnel relay handles NAT traversal so you can access your server from your phone, your Roku at a friend's house, or any device anywhere in the world." into two sentences.
- The same applies to the `plugins.html` Transit Scheduler description which runs 27 words.
- Otherwise no changes needed. Readability is strong.
