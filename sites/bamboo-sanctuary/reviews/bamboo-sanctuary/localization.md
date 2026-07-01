# Localization

## Score: 88/100

## Findings
- ✅ `<html lang="en">` on all 8 pages — verified: index.html:2, features.html:2, clients.html:2, download.html:2, plugins.html:2, docs.html:2, hub.html:2, about.html:2
- ✅ All user-facing text traces to content.json (not hardcoded differently) — confirmed hero/pitch/features/clients/faq/footer all from content.json blocks; brand-flavored micro-copy on about.html philosophy and hub.html descriptions is consistent with brand voice (allowed per new_site.md §2)
- ⚠️ CSS uses a mix of physical and logical properties:
  - Physical used: `left: 0`, `top: 0`, `right: 0`, `width: 100%`, `height: 100%` — base.css:13-29 (modern CSS reset)
  - Logical used: `margin-inline`, `padding-inline`, `inset`, `block-end`, `inline-start` — theme.css:89-94 (container), theme.css:305, theme.css:125-131 (page-header)
  - new_site.md §15: "Prefer logical properties (`inline-start/end`) over `left/right` so RTL stays possible" — the mix means RTL layout is not guaranteed safe. However, this is a brand-kit site for an English-language product, and the mix is present primarily in the CSS reset (which uses standard modern patterns) rather than in component layout code.
- ⚠️ Footer copyright "© 2026 Phlix" is hardcoded — about.html:296, features.html:226, clients.html:203, download.html:220, plugins.html:163, hub.html:150, about.html:159 — Will break/mislead in 2027 or if viewed in a different year. Should use dynamic year or at minimum be updated before deployment.
- ✅ No `new Date().toLocaleString()` or other locale-unsafe formatting found in js/main.js
- ✅ `prefers-reduced-motion` media query handles motion locale — base.css:247-256
- ⚠️ The footer copyright year (`© 2026`) is hardcoded rather than dynamic — while year "2026" happens to be the current year, this is fragile and would become inaccurate next year. new_site.md §15 says "Avoid locale-unsafe formatting" — hardcoding a year number is not locale-unsafe per se but is not future-safe.
- ✅ Font subset: the site uses only Latin-script fonts (Cormorant Garamond, Lora, DM Sans) — no CJK or complex-script fonts that would require subsetting
- ✅ All URLs, social links, and navigation hrefs use absolute `https://` for external links, relative for internal — correct for i18n

## Summary
Language attribute is correct on all pages. All user-facing text comes from content.json or is brand-flavored micro-copy consistent with the kit. No locale-unsafe JS formatting found. CSS mix of physical/logical properties is noted — primarily in the reset rather than layout code, so RTL risk is low for this single-locale site. Footer copyright year is hardcoded as 2026, which is fragile for future deployment. Score 88/100 — needs the copyright year fixed to be dynamic.
