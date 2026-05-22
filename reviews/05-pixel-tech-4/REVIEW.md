# Review: 05-pixel-tech-4 (Wave 4 Variant)

**Reviewer:** Automated brand review
**Date:** 2026-05-21
**Variant:** 05-pixel-tech-4
**Brand:** Pixel Tech
**Phase:** REVIEW

---

## Summary

| Check | Status |
|-------|--------|
| Brand Colors | :warning: 1 ISSUE |
| Brand Fonts | :white_check_mark: PASS |
| Layout Integrity | :white_check_mark: PASS |
| Mobile Responsiveness | :white_check_mark: PASS |

---

## 1. Brand Colors Verification

### Expected Colors (from `shared/data/brand-kits.json`)
| Role | Color Name | Hex Value |
|------|------------|-----------|
| Primary | neon_green | #39FF14 |
| Primary | black | #000000 |
| Primary | silver | #C0C0C0 |
| Secondary | dark_gray | #1A1A1A |
| Secondary | matrix_green | #00FF66 |
| Accent | electric_purple | #9B30FF |

### CSS Implementation (`css/base.css` lines 79-91)
| Variable | CSS Value | Expected | Match |
|----------|-----------|----------|-------|
| `--color-neon-green` | #39ff14 | #39FF14 | :white_check_mark: |
| `--color-black` | #000 | #000000 | :white_check_mark: |
| `--color-silver` | #c0c0c0 | #C0C0C0 | :white_check_mark: |
| `--color-dark-gray` | #1a1a1a | #1A1A1A | :white_check_mark: |
| `--color-matrix-green` | **#0f6** | **#00FF66** | :warning: **MISMATCH** |
| `--color-electric-purple` | #9b30ff | #9B30FF | :white_check_mark: |

### Issue Found
**`--color-matrix-green` is incorrectly set to `#0f6` instead of `#00FF66`**

The brand kit specifies `matrix_green: #00FF66` but CSS uses `#0f6`. This is a subtle but incorrect color value. The `matrix-green` is used in:
- Scrollbar thumb (line 189)
- Highlight color (line 99)
- Various glow effects

**Fix required in `css/base.css` line 87:**
```css
/* Current (incorrect) */
--color-matrix-green: #0f6;

/* Should be */
--color-matrix-green: #00FF66;
```

---

## 2. Brand Fonts Verification

### Expected Fonts (from `shared/data/brand-kits.json`)
| Role | Font Family |
|------|-------------|
| Headline | Orbitron Bold |
| Body | Inter Medium |
| UI | Roboto Mono |
| Code | JetBrains Mono |

### CSS Implementation (`css/base.css` lines 107-111)
| Variable | CSS Value | Expected | Match |
|----------|-----------|----------|-------|
| `--font-headline` | 'Orbitron', monospace | Orbitron Bold | :white_check_mark: |
| `--font-body` | 'Inter', sans-serif | Inter Medium | :white_check_mark: |
| `--font-ui` | 'Roboto Mono', monospace | Roboto Mono | :white_check_mark: |
| `--font-code` | 'JetBrains Mono', monospace | JetBrains Mono | :white_check_mark: |

Font files are self-hosted via `@font-face` in `css/theme.css` lines 9-39.

**:white_check_mark: All fonts match brand specification.**

---

## 3. Layout Integrity Check

All sections present in `index.html`:

| Section | Lines | Status |
|---------|-------|--------|
| Header (site-header + nav) | 74-109 | :white_check_mark: |
| Hero (hero) | 114-130 | :white_check_mark: |
| Pitch (pitch) | 133-148 | :white_check_mark: |
| Features Overview (features-overview) | 151-323 | :white_check_mark: |
| CTA Banner (cta-banner) | 327-332 | :white_check_mark: |
| Footer (site-footer) | 336-374 | :white_check_mark: |

### Feature Cards (8 total)
1. Library that organizes itself (line 155)
2. SyncPlay across the room or across the country (line 174)
3. Transcoding that picks the right quality (line 194)
4. Multi-user, multi-profile, parental controls (line 217)
5. Live TV with DVR + EPG (line 236)
6. DLNA for the devices you already own (line 257)
7. Plugin system with a real contract (line 278)
8. Phlix Hub — reach any of your servers from anywhere (line 299)

**:white_check_mark: All 8 feature cards present.**

**:white_check_mark: No broken sections detected.**

---

## 4. Mobile Responsiveness Check

### Media Queries Found
| Breakpoint | Lines | Status |
|------------|-------|--------|
| `width <= 768px` | 790-849 | :white_check_mark: |
| `width <= 480px` | 851-860 | :white_check_mark: |

### Responsive Features
- Mobile nav toggle (`.nav-toggle`) shows at 768px
- Mobile menu becomes fixed full-screen overlay
- Hero heading scales with `clamp(2rem, 5vw, 3rem)` / `clamp(2.5rem, 7vw, 4rem)`
- Footer nav stacks vertically on mobile
- Feature/detail cards stack to single column
- CTA buttons stack vertically on small screens

**:white_check_mark: Responsive design properly implemented.**

---

## Recommendations

1. **Critical Fix:** Update `--color-matrix-green` from `#0f6` to `#00FF66` in `css/base.css` line 87 to match brand specification.

2. **Optional Enhancement:** Consider adding the Matrix digital rain animation as mentioned in the brand UI style ("Matrix digital rain", "Falling code animation"). Currently the theme has matrix-inspired styling (green glow effects, terminal cursor) but no actual falling code/digital rain animation.

---

## Conclusion

The variant is mostly compliant with the brand specification. The only color discrepancy is `--color-matrix-green` using `#0f6` instead of the specified `#00FF66`. Fonts, layout, and responsiveness all pass brand requirements.
