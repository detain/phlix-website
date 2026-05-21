# Rebrand Fix: 01-minimalist-cinema-2

## Date
2026-05-21

## Issue
The CSS for variant `01-minimalist-cinema-2` was using incorrect color variables that are NOT part of the brand kit for "Minimalist Cinema V2 — Bold Typography".

### Wrong Colors Used
- `--color-cinema-red` — NOT in brand kit
- `--color-deep-navy` — NOT in brand kit
- `--color-off-white` — NOT in brand kit
- `--color-muted` — NOT in brand kit

### Brand Kit Colors (from `shared/data/brand-kits.json`)
```
Primary:   electric_blue (#2D9CFF), charcoal (#1A1A1A), white (#FFFFFF)
Secondary: slate_gray (#2E2E2E), soft_blue (#A7D8FF)
Accent:    neon_aqua (#00F0FF)
```

## Files Modified
- `variants/01-minimalist-cinema-2/css/theme.css`
- `variants/01-minimalist-cinema-2/css/components.css`

## Replacements Made

### theme.css
| Wrong Variable | Correct Variable | Occurrences |
|----------------|-------------------|-------------|
| `--color-cinema-red` | `--color-electric-blue` | 4 |
| `--color-deep-navy` | `--color-charcoal` | 4 |
| `--color-off-white` | `--color-white` | 6 |
| `--color-muted` | `--color-slate-gray` | 3 |

Also updated comment: "cinema red accents" → "blue accents"

### components.css
| Wrong Variable | Correct Variable | Occurrences |
|----------------|-------------------|-------------|
| `--color-cinema-red` | `--color-electric-blue` | 18 |
| `--color-deep-navy` | `--color-charcoal` | 13 |
| `--color-off-white` | `--color-white` | 13 |
| `--color-muted` | `--color-slate-gray` | 12 |

Also fixed:
- Comment: "cinema red accents" → "blue accents"
- Hardcoded gradient color: `rgb(230, 57, 70, 0.1)` → `#2d9cff1a` (electric blue with 10% opacity)

## Verification
- `npm run build` — PASSED (30 variants built successfully)
- `npm run lint` — PASSED (no new errors introduced in edited files)

Note: Pre-existing lint errors in `base.css` (lines 93-95, rgba shadows) were NOT modified.

## Lock Files
- `variants/01-minimalist-cinema-2/css/base.css.lock` — existed
- `variants/01-minimalist-cinema-2/css/theme.css.lock` — created
- `variants/01-minimalist-cinema-2/css/components.css.lock` — created
