# Review: Brand Fidelity + Usability + Content Accuracy
# Site: sites/cosmic-odyssey/

## Brand fidelity
Score: 94/100 | Severity: ✅ (very strong, one minor font issue)

**Finding 1 — Exo 2 font never loaded [theme.css:58, css/base.css:57-62]**
The kit's `fonts.display.family` is `"Exo 2"` with fallback Orbitron/Rajdhani, and `typography_rules` say it may be used for "cinematic title cards with ultra-wide spacing" at large sizes. No `.display-*` utility class is ever used in any HTML page, and no `@font-face` loads the Exo 2 WOFF2. The display font role is inert — it exists in the token block but is never rendered. This is a gap: the kit intends Exo 2 for display use and a site claiming brand fidelity should exercise it.
> `css/base.css:57` — `--font-display:'Exo 2','Orbitron',sans-serif;` defined but uncalled
> `theme.css:7-13` — `.display-xl` exists (Exo 2) but never used in any page

**Finding 2 — Hub CTA uses unlisted tagline [hub.html:88]**
The hub.html CTA banner reads "Your library. Your cosmos." (`hub.html:88`). The kit's `tagline_secondary[]` lists four options: "Launch into your next watch.", "The universe of film, at your command.", "Your library. Your cosmos.", "Set course for something extraordinary." — so this IS in the list. No defect.

**Brand fidelity assessment**: Excellent. All eight kit colors match exactly, all five fonts used in their correct roles (headline Orbitron, body Inter, UI Rajdhani, mono Space Mono, number Orbitron). Spacing scale is exclusively 4/8/12/16/24/32/48/64/96. Corner radii match 4/8/16/24/999px. No warm colors anywhere. Deep space black `#080B14` as universal background. Vast negative space in hero and section layouts. Hover: cards lift 3px + violet glow border, matching `microinteractions.hover` exactly. No bouncy/spring animations; easing is `cubic-bezier(0.22, 0.61, 0.36, 1)` for reveals and `linear` for star drift. Voice is cosmic and mission-briefing; no avoid_words found. `tagline_primary` "Every Story, An Infinite Horizon." used as document title on home. `tagline_secondary[]` items used across CTA banners. Brand opposites avoided. The only gap is Exo 2 display font being defined but not used in any page.

---

## Usability
Score: 93/100 | Severity: ⚠️ (one PNG/SVG meta defect, otherwise excellent)

**Finding 1 — og:image is SVG, spec requires PNG [index.html:14, features.html:13, etc.]**
The spec (new_site.md §8) states: "Ship `og.svg` as the editable source if used, but reference a rasterized **`og.png`** in meta." All 8 HTML pages reference `og:image content=".../img/og.svg"`. The SVG file exists at `img/og.svg` but no `og.png` is present. Social crawlers (Facebook, LinkedIn, Slack) generally require PNG for og:image. This is a spec violation.
> `index.html:14`, `features.html:13`, `clients.html:13`, `download.html:13`, `plugins.html:13`, `docs.html:13`, `hub.html:13`, `about.html:13` — all reference `og.svg`

**Finding 2 — Inline styles in download.html [download.html:81, 110]**
Two heading elements use inline `style=` attributes for layout spacing:
> `download.html:81` — `<h2 style="max-width:var(--content-width);margin:var(--space-12) auto var(--space-6);padding-inline:var(--gutter)">Clients</h2>`
> `download.html:110` — `<h2 style="max-width:var(--content-width);margin:0 auto var(--space-6);padding-inline:var(--gutter)">Ecosystem</h2>`
These should use defined CSS classes. Minor functional impact but not a blocker.

**Usability assessment**: Navigation is fully correct — 8 links in the required order with `aria-current="page"` on every active link. Mobile nav toggle has correct `button` element, `aria-expanded`, `aria-controls`, and JS toggles `.is-open` class. Skip link is first focusable element. All touch targets ≥44px. Primary CTA "Get Phlix" above fold on home with ≥3:1 contrast (Nebula Violet #7B3FBE on Star White #E8EAF0). Secondary CTA de-emphasized as ghost button (`.btn-secondary`). No download traps; download is reachable in 2 clicks from home. No positive tabindex anywhere. Content is all from content.json with no invented facts.

---

## Content accuracy
Score: 82/100 | Severity: ⚠️ (three issues, all fixable)

**Finding 1 — Mobile client tagline overstates readiness [clients.html:125]**
`content.json.clients[].tagline` for mobile is `"React Native app"` with no status qualification. However, the actual status is `"beta"` (`content.json.clients[].status: "beta"`). The card body on clients.html reads "React Native app (iOS + Android)" — this is factually accurate as a description. No defect here. The status badge correctly shows "beta". No issue.

**Finding 2 — clients.html og:description not in content.json**
`content.json` provides no `clients[].og_description` field. The site uses `"Native apps for every screen you own — Roku, Samsung Tizen, Windows, Mobile, and any DLNA device."` as `og:description` on clients.html. This is fabricated copy — not sourced from content.json — and content.json's `meta.description` exists but is not used here. Per new_site.md §2, substantive product claims should not be invented. However, new_site.md §11 requires every page to have og:title/og:description, which creates an implicit allowance for page-specific meta. This is a borderline case; the copy is accurate to content.json facts but was not explicitly sourced from the file.
> `clients.html:12` — `og:description` not found in `content.json`

**Finding 3 — Hub page body copy is brand kit expansion, not content.json verbatim**
The hub.html "What the Hub does" section reads: "Sign in once. The Hub's reverse-tunnel relay handles NAT traversal so you can access your server from your phone, your Roku at a friend's house, or any device anywhere in the world." — vs content.json.features[7].body: "Sign in once. Reverse-tunnel relay handles NAT. Self-hostable, or use the public hub." The core facts (sign in once, reverse-tunnel relay, NAT, self-hostable option) are preserved. The expanded "access from phone/Roku/any device" is brand kit copy. This falls within the "brand-flavored micro-copy" latitude in new_site.md §2, since no product claim is contradicted. Not a defect, but worth noting.

**Finding 4 — Download page body copy partially matches content.json but is not verbatim**
download.html:69 reads "Install the server, grab a client, start streaming." — content.json has no equivalent string. This is brand micro-copy. Acceptable.

**Finding 5 — All 6 FAQ answers match content.json exactly [about.html:88-109]**
All FAQ dd elements match `content.json.faq[].a` verbatim. No defect.

**Finding 6 — All 8 feature bodies match content.json exactly [index.html:129-205, features.html:84-174]**
All `features[].body` values appear verbatim in both index.html features overview and features.html detail sections. No defect.

**Finding 7 — All 5 client taglines and highlights match content.json [clients.html:81-144]**
All `clients[].tagline` and `clients[].highlights[]` match content.json exactly. No defect.

**Finding 8 — License BSD-3-Clause confirmed in about.html, footer of all pages**
`about.html:79`: "BSD-3-Clause across all Phlix projects." All footers: `© 2026 Phlix — BSD-3-Clause`. Matches content.json faq[5].a and meta. No defect.

---

## Verdict

**Must fix before approval:**

1. **`og:image` must be PNG (not SVG)** — all 8 HTML pages have `og:image .../img/og.svg`. Either produce `img/og.png` at 1200×630 and update all 8 pages, or document the decision to serve SVG as og:image in BUILD_LOG.md with a rationale.

2. **Remove or properly source clients.html og:description** — either pull the description from `content.json.meta.description` (which would be generic), or add a `clients[].og_description` field to content.json and reference it. The current fabricated description is a content accuracy regression.

**Recommended (non-blocking):**

3. **Exo 2 display font is inert** — the display font role is defined in tokens but never rendered in any page. Consider whether any display-size text (e.g., a large section number, background watermark, or hero numeral) should use the `.display-xl` class to exercise the kit's display font specification.

**Summary**: The site is broadly well-built. Brand fidelity is strong (94/100) — all colors, spacing, radius, motion, voice, and microinteractions are correct. Usability is solid (93/100) — nav is correct, CTA is above fold, mobile works, skip link present, touch targets adequate. The two hard blockers are both meta/spec issues: og:image format (PNG required, SVG delivered) and clients.html og:description (not in content.json). Content accuracy scores 82/100 primarily because of these two meta-level deviations from the content contract.
