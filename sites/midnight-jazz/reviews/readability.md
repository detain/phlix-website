# Readability Review — Midnight Jazz

**Score: 85/100** | Severity: ⚠️

## Findings

### ✅ Passing

| Check | Details |
|-------|---------|
| Reading level | All copy is plain English. No jargon except technical feature body copy (which is intentional — the audience is design-conscious streamers and audiophiles who can handle "ItemRepository", "NTP offset", "CRF 23/28"). |
| Heading hierarchy | Single H1 per page; logical h2/h3 descent throughout. No skipped levels. |
| Body line-height | `base.css:21` sets `line-height: 1.65` on `body`; `theme.css:39–41` sets `p { line-height: 1.65 }`. Both ≥ 1.6 as required by kit's `typography_rules`. |
| Feature card text | Feature card body is `var(--text-sm)` (13px) with `line-height: 1.65`. `theme.css:345–349` |
| Pitch bullets | `theme.css:275–289` sets `line-height: 1.6` and max-width 680px. Longest bullet: ~80ch. Most are 55–70ch. |
| Page width | `container` uses `max-width: var(--max-w)` (= 1400px) with `padding-inline: var(--space-6)` (24px). `theme.css:53–57` |
| `.page-header .lead` | Set to `max-width: 60ch` at `theme.css:93`. |

### ⚠️ Issues

- **Hero subheadline line length** — `index.html:113–116` has ~155-character line: "An open-source PHP media server that streams to your Roku, Samsung TV, Windows desktop, phone, and any DLNA device — with SyncPlay, Live TV, transcoding, and a hub that follows you anywhere." At 155ch on an 800px hero-inner max-width, this exceeds the 75ch target. Not a hard failure (hero text is inherently long), but a readability concern for a brand that values "short, unhurried sentences."
- **No `max-width` on hero-inner paragraphs** — Hero inner (`theme.css:134–140`) has `max-width: 800px` but the subheadline uses its own `max-width: 55ch`. The 55ch cap actually makes it shorter than the 75ch target — but on wide viewports the subheadline could render wide because the `.hero-inner` itself is only centered with `text-align: center`. No hard overflow.
- **Feature detail page body** — `features.html` feature detail bodies use the verbatim `content.json` copy which is technical. This is intentional per the content contract. The reading level is appropriate for the target audience.
- **FAQ answers** (`about.html:144–181`) — `dd` elements use `line-height: 1.7` which is good, but text is `rgba(237,232,223,0.75)` on `#0D1117` — see Accessibility review for contrast implications.

### ❌ Issues

None.

---

## Verdict

Reading level is appropriate for the target audience. Typography choices (1.65 line-height, max-width constraints on leads) are all within spec. The hero subheadline's character count is the only readability concern.

**Score: 85/100** — Hero subheadline at ~155ch is the only ⚠️; everything else passes.
