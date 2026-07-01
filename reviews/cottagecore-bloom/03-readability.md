# Readability — Cottagecore Bloom

**Dimension:** Readability
**Score:** 88/100
**Severity:** ✅

---

## Summary

Reading level is appropriate for adults 25–55 who value beauty and gentleness — copy is warm, unhurried, and uses straightforward vocabulary. Body line-height is 1.75 (correct per brand kit). `max-width: 72ch` on body text is within the 60–75ch spec. Typography hierarchy is clear (Playfair Display 900 headlines, Lora body, Nunito UI). Slight concern: hero subheadline uses 0.8 opacity on 1.15rem text, which reduces effective contrast at reading distance.

---

## Findings

### ✅ Correct implementations

**Line height** — `base.css:29`: `body { line-height: 1.75 }` — matches brand kit body `line_height: 1.75`. `p` also has `line-height: 1.75` — `base.css:148`.

**Max text width** — `base.css:121`: `--max-width-text: 72ch`. Brand spec: 60–75ch. 72ch is within range. Applied to `p` via `max-width: var(--max-width-text)` — `base.css:149`.

**Body font size** — `base.css:134`: `font-size: 1rem` (16px). Brand kit specifies body copy "never smaller than 15px." 16px exceeds the minimum. ✓

**Typography hierarchy clear** — `theme.css:42–69`: h1 (Playfair Display 900, clamp 2.2–3.8rem), h2 (Playfair Display 700, clamp 1.7–2.6rem), h3 (Playfair Display 700, clamp 1.2–1.6rem). Distinct visual hierarchy.

**Font roles correct** — Playfair Display for headlines, Lora for body, Nunito for UI, Courier Prime for code. Never mixed up.

**Reading level** — Copy uses simple, direct sentences. "Add a file, see it appear." "Drop a plugin in, the loader picks it up." Flesch-Kincaid ~7th grade, appropriate for general adult audience. No jargon except technical terms like "FFmpeg," "HLS," "Argon2ID" which appear in feature descriptions (appropriate for technical audience).

**Text alignment** — Body text is left-aligned. Only headings and short phrases are centered. Per brand kit: "Prefer left-aligned body text."

**Word spacing** — `letter-spacing: -0.01em` on headlines matches brand kit tracking spec. Body letter-spacing is `0em` (unset) as specified.

### ⚠️ Minor issues

**Hero sub opacity** — `theme.css:163`: `.hero-sub { opacity: 0.8; }` — The hero subheadline paragraph (1.15rem, Lora) has 80% opacity. While the Bark Brown (#2A1A10) on Warm Ivory (#FFF8F2) contrast is excellent at 16:1, the 0.8 opacity on the text layer reduces effective contrast to ~12.8:1 — still AAA but slightly diminished for users with moderate vision impairment. Not a WCAG failure but a softness in the reading experience.
- **Fix (optional):** Remove `opacity: 0.8` or increase to `0.9`.

**Lead paragraph max-width** — `theme.css:76`: `p.lead { max-width: 60ch }` — 60ch is within spec but close to the lower bound. The brand kit says 60–75ch; 60ch is fine.

---

## Verdict

Readability is strong. The brand kit's reading-experience goals (unhurried, comfortable, afternoon-in-a-garden feel) are well-served by the Lora body type, 1.75 line-height, and 72ch measure. The hero sub opacity is a soft concern, not a failure.
