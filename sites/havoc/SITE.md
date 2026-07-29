# HAVOC Brand Kit Site — Design Rationale

## Concept & Vision

Havoc is controlled chaos given form. The site embodies the aesthetic of a breaker who knows exactly where to strike — explosion clouds rending the air, jagged edges tearing through clean surfaces, and graffiti splatter that marks territory. Every animation is a controlled detonation: earthquake wobble precedes impact, chaos particles scatter on interaction, and glitch bursts keep users on edge. The outlaw archetype — chaotic, rebellious, energetic — drives every design decision.

## Aesthetic Direction

**Style:** Explosive, aggressive, fractured, glitch-laden. Heavy texture with layered depth. High contrast with harsh shadows. Full-bleed sections with diagonal flow and asymmetric balance.

**Mood:** Loud, aggressive, dangerous, alive. The interface should feel like it's about to explode or shatter at any moment.

## Color Palette (Role → Name → Hex)

| Role | Name | Hex |
|------|------|-----|
| Primary | Explosion Pink | `#F72585` |
| Secondary | Deep Purple | `#7209B7` |
| Tertiary | Midnight Blue | `#3A0CA3` |
| Accent | Electric Blue | `#4361EE` |
| Chaos | Chaos Cyan | `#4CC9F0` |
| Background | Void Black | `#0D0D0D` |
| Surface | Char Surface | `#1A1A1A` |
| Surface Alt | Ash Surface | `#2D2D2D` |
| Text | Pure White | `#FFFFFF` |
| Text Muted | Smoke Grey | `#9E9E9E` |
| Success | Toxic Green | `#39FF14` |
| Warning | Hazard Orange | `#FF6B00` |
| Error | Blood Red | `#DC2626` |

## Gradients

- **Explosion Core:** `radial-gradient(#F72585, #7209B7, #3A0CA3)` — hero backdrops
- **Chaos Lightning:** `linear-gradient(45deg, #4361EE, #4CC9F0, #7209B7)` — energy trails
- **Void Depths:** `linear-gradient(180deg, #1A1A1A, #0D0D0D)` — backgrounds
- **Glitch Burst:** `conic-gradient(#F72585, #4361EE, #4CC9F0, #7209B7, #F72585)` — transition bursts

## Typography

- **Headlines:** Anton (Impact fallback) — ALL CAPS, tracking 0.02em, line-height 0.9
- **Body:** Exo 2 (Rajdhani fallback) — 400/600 weight, line-height 1.6
- **UI:** Exo 2 — 500/700 weight, tracking 0.04em, ALL CAPS for labels
- **Code:** Share Tech Mono — technical readouts

## Spatial System

- **Container max:** 1400px
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px
- **Grid gutter:** 24px
- **Section padding:** 80px vertical

## Motion Philosophy

- **Speed:** Fast — 200-400ms transitions
- **Easing:** ease-out, elastic, spring (cubic-bezier(0.68, -0.55, 0.265, 1.55))
- **Hero animations:** Earthquake wobble, glitch text, pulse glow
- **Hover:** Jagged shake + particle burst + color glitch
- **Button press:** Deep impact squash (0.95 scale) with screen shake
- **Reduced motion:** All animations disabled, instant transitions

## Visual Assets

- **logo.svg:** Explosion burst polygon with PHLIX wordmark and gradient accent line
- **favicon.svg:** Explosion burst with P letter, pink-to-purple gradient
- **og.png:** 1200×630 social share — generated from og.svg source
- **Inline SVGs:** All feature/client icons — single-color, stroke-based, sharp corners

## Signature Elements

- Explosion cloud radial gradients
- Jagged white borders (2px solid #FFFFFF)
- Sharp 0px corner radius throughout
- Glitch text animation (clip-path + translate)
- Earthquake wobble keyframes
- Gradient accent lines with color stops
