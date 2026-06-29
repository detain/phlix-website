#!/usr/bin/env node
/**
 * tools/scaffold-new-variants.mjs
 *
 * Scaffolds variants/<slug>/ folders for brand kits 06–20 (the 75 kits added to
 * shared/data/brand-kits.json). Each folder is a self-contained, themed static
 * site whose CSS targets the FLAT class names render.mjs emits, so the variant
 * renders correctly under BOTH `npm run build` (static copy of pre-rendered HTML)
 * and dev-server / preview-all (live render via render.mjs).
 *
 * Per variant it writes: css/{base,theme,components}.css, js/main.js,
 * img/logo.svg, the 8 pre-rendered HTML pages, robots.txt, sitemap.xml.
 *
 * Theming is derived entirely from the kit's brand tokens:
 *   - colors  -> a light/dark palette (bg/text/accent + derived muted/border/surface/cta)
 *   - fonts   -> Google Fonts @import (validated weight sets) + font-family tokens
 *   - variant -> a layout "archetype" (grid / immersive / editorial / ...) inferred
 *                from the variant's treatment metadata, applied as CSS deltas.
 *
 * Usage:
 *   node tools/scaffold-new-variants.mjs            # all kits 06-20
 *   node tools/scaffold-new-variants.mjs --only 06  # just one kit number
 *   node tools/scaffold-new-variants.mjs --dry      # print plan, write nothing
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const VARIANTS_DIR = resolve(ROOT, 'variants');
const kits = JSON.parse(readFileSync(resolve(ROOT, 'shared/data/brand-kits.json'), 'utf8')).variants;
const CONTENT = JSON.parse(readFileSync(resolve(ROOT, 'shared/content.json'), 'utf8'));

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const onlyIdx = args.indexOf('--only');
const ONLY = onlyIdx >= 0 ? args[onlyIdx + 1] : null;
const PAGES = ['index', 'features', 'clients', 'download', 'plugins', 'docs', 'hub', 'about'];

/* ── color math ─────────────────────────────────────────────────────────── */
const hx = h => { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
const toHex = rgb => '#' + rgb.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
const mix = (a, b, t) => { const A = hx(a), B = hx(b); return toHex([0, 1, 2].map(i => A[i] * (1 - t) + B[i] * t)); };
const lum = h => { const [r, g, b] = hx(h).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const contrast = (a, b) => { const L1 = lum(a), L2 = lum(b); return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05); };
const chroma = h => { const [r, g, b] = hx(h); return Math.max(r, g, b) - Math.min(r, g, b); };

/* explicit theme polarity (intent-correct; overrides naive avg-luminance) */
const LIGHT = new Set(['06', '07', '08', '13', '15', '18', '19']);

function palette(num, kit) {
  const cols = [];
  for (const cat of Object.values(kit.colors)) for (const [name, hex] of Object.entries(cat)) cols.push({ name, hex, L: lum(hex), C: chroma(hex) });
  const sorted = [...cols].sort((a, b) => a.L - b.L);
  const light = LIGHT.has(num);
  const bg = (light ? sorted[sorted.length - 1] : sorted[0]).hex;
  const text = (light ? sorted[0] : sorted[sorted.length - 1]).hex;
  const accentPick = [...cols].filter(c => c.hex !== bg && c.hex !== text && contrast(c.hex, bg) >= 3).sort((a, b) => b.C - a.C)[0]
    || [...cols].filter(c => c.hex !== bg).sort((a, b) => b.C - a.C)[0];
  const accent = accentPick.hex;
  const ctaText = lum(accent) > 0.5 ? mix(text, bg, 0.05) : '#ffffff';
  const link = contrast(accent, bg) >= 4 ? accent : mix(accent, text, 0.45);
  return {
    light, bg, text, accent, ctaText, link,
    heading: text,
    muted: mix(text, bg, 0.42),
    border: mix(bg, text, 0.16),
    borderStrong: mix(bg, text, 0.3),
    surface: mix(bg, text, light ? 0.04 : 0.06),
    surface2: mix(bg, text, light ? 0.08 : 0.11),
    ctaHover: mix(accent, text, 0.2),
    codeBg: mix(bg, text, light ? 0.07 : 0.13),
  };
}

/* ── fonts ──────────────────────────────────────────────────────────────── */
const SAFE = {
  'Archivo': [400, 500, 700], 'Archivo Black': [400], 'Baloo 2': [400, 700, 800], 'Bitter': [400, 600, 700],
  'Comfortaa': [400, 500, 700], 'Cormorant Garamond': [400, 500, 600, 700], 'Crimson Pro': [400, 600, 700],
  'DM Mono': [400, 500], 'DM Sans': [400, 500, 700], 'EB Garamond': [400, 500, 600, 700], 'Epilogue': [400, 500, 700],
  'Fira Mono': [400, 700], 'Fraunces': [400, 600, 700], 'Hanken Grotesk': [400, 500, 700], 'IBM Plex Mono': [400, 500, 600],
  'Inter': [400, 500, 700], 'JetBrains Mono': [400, 700], 'Karla': [400, 500, 700], 'Libre Franklin': [400, 500, 700],
  'Marcellus': [400], 'Mulish': [400, 500, 700], 'Newsreader': [400, 600, 700], 'Nunito': [400, 600, 700],
  'Playfair Display': [400, 700, 900], 'Poppins': [400, 600, 700], 'Quicksand': [400, 500, 700], 'Shrikhand': [400],
  'Sora': [400, 500, 600, 700], 'Source Code Pro': [400, 600], 'Source Serif 4': [400, 600, 700], 'Space Mono': [400, 700],
  'Spectral': [400, 500, 700], 'Spline Sans Mono': [400, 500, 700], 'Syne Mono': [400], 'Work Sans': [400, 500, 700],
};
const SERIF = new Set(['Playfair Display', 'Cormorant Garamond', 'EB Garamond', 'Crimson Pro', 'Fraunces', 'Newsreader', 'Source Serif 4', 'Spectral', 'Bitter', 'Marcellus', 'Shrikhand']);
const MONO = new Set(['JetBrains Mono', 'IBM Plex Mono', 'Fira Mono', 'Space Mono', 'Spline Sans Mono', 'DM Mono', 'Source Code Pro', 'Syne Mono']);
const WNAME = { thin: 100, extralight: 200, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900, expandedbold: 700 };
const FAMS = Object.keys(SAFE).sort((a, b) => b.length - a.length); // longest-first for prefix match

function parseFont(str) {
  const fam = FAMS.find(f => str === f || str.startsWith(f + ' ')) || str;
  const rest = str.slice(fam.length).trim().toLowerCase();
  let w = 400;
  if (rest) w = WNAME[rest] ?? (/^\d{3}$/.test(rest) ? +rest : 400);
  const safe = SAFE[fam] || [400, 700];
  const cssW = safe.reduce((p, c) => Math.abs(c - w) < Math.abs(p - w) ? c : p, safe[0]);
  const cat = MONO.has(fam) ? 'mono' : SERIF.has(fam) ? 'serif' : 'sans';
  const fb = cat === 'serif' ? 'Georgia, "Times New Roman", serif' : cat === 'mono' ? '"SFMono-Regular", Consolas, monospace' : '"Helvetica Neue", Arial, sans-serif';
  return { fam, weight: cssW, stack: `'${fam}', ${fb}`, cat, safe };
}

function fontsFor(kit) {
  const roles = { headline: parseFont(kit.fonts.headline), body: parseFont(kit.fonts.body), ui: parseFont(kit.fonts.ui), code: parseFont(kit.fonts.code) };
  const need = new Map();
  for (const r of Object.values(roles)) { const s = need.get(r.fam) || new Set(); r.safe.forEach(w => s.add(w)); need.set(r.fam, s); }
  const url = 'https://fonts.googleapis.com/css2?' +
    [...need].map(([f, ws]) => `family=${f.replace(/ /g, '+')}:wght@${[...ws].sort((a, b) => a - b).join(';')}`).join('&') +
    '&display=swap';
  return { roles, url };
}

/* ── layout archetype (per-variation flavor on identical HTML) ───────────── */
function archetype(v) {
  const t = (v.variation + ' ' + (v.ui_style || []).join(' ') + ' ' + v.name).toLowerCase();
  const has = re => re.test(t);
  if (has(/grid|baseline|modular|column[- ]rule|tabular|systematic/)) return 'grid';
  if (has(/immersive|full[- ]bleed|cover|cinematic|spotlight|glow|dappled|lighting|backdrop/)) return 'immersive';
  if (has(/asymmetr|off[- ]center|diagonal|angled|stagger|kinetic/)) return 'asymmetric';
  if (has(/minimal|stripped|whitespace|bare|quiet/)) return 'minimal';
  if (has(/card|tile|catalog|depth|layer|parallax|shadow/)) return 'card';
  if (has(/showcase|poster|gallery|scroll|wall|lookbook|mosaic|spread/)) return 'showcase';
  return 'editorial';
}
const ARCH_CSS = {
  minimal: `main .hero-inner{text-align:left;max-width:46rem;margin-inline:0;padding-block:var(--space-8)}
.feature-cards{grid-template-columns:1fr;max-width:48rem}
.feature-card{border:0;border-top:2px solid var(--color-border);border-radius:0;background:transparent;padding-inline:0}
.feature-card:hover{box-shadow:none;border-top-color:var(--color-accent)}`,
  editorial: `.feature-cards{grid-template-columns:repeat(2,1fr)}
.feature-card{background:transparent;border:0;border-left:3px solid var(--color-border);border-radius:0;padding-left:var(--space-3)}
.feature-card:hover{border-left-color:var(--color-accent);box-shadow:none}
.hero-eyebrow{border-bottom:1px solid var(--color-border);padding-bottom:var(--space-1)}`,
  grid: `.feature-cards{grid-template-columns:repeat(3,1fr);gap:1px;background:var(--color-border);border:1px solid var(--color-border)}
.feature-card{border-radius:0;background:var(--color-bg);border:0}
.feature-card:hover{box-shadow:none;background:var(--color-surface)}
h1,h2,h3{letter-spacing:-0.01em}
.hero-eyebrow,.section-label{font-feature-settings:"tnum"}`,
  card: `.feature-cards{grid-template-columns:repeat(3,1fr)}
.feature-card{background:var(--color-surface);border:1px solid var(--color-border);box-shadow:var(--shadow-sm)}
.feature-card:hover{transform:translateY(-3px);box-shadow:var(--shadow-lg)}`,
  immersive: `.hero{background:linear-gradient(180deg,var(--color-surface2),var(--color-bg));text-align:center}
.hero-inner{text-align:center;margin-inline:auto;padding-block:var(--space-9)}
.hero h1{font-size:clamp(2.75rem,7vw,5rem)}
.hero-cta{justify-content:center}
.feature-cards{grid-template-columns:repeat(3,1fr)}`,
  asymmetric: `.hero-inner{margin-left:0;margin-right:auto;max-width:42rem;padding-left:var(--space-2);border-left:4px solid var(--color-accent)}
.feature-cards{grid-template-columns:repeat(2,1fr)}
.feature-card:nth-child(even){transform:translateY(var(--space-3))}
.feature-card{border:1px solid var(--color-border)}`,
  showcase: `.feature-cards{grid-template-columns:repeat(3,1fr)}
.feature-card{background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);overflow:hidden}
.feature-card:hover{box-shadow:var(--shadow-lg)}
.hero-inner{text-align:center;margin-inline:auto}`,
};
// scope every archetype rule under body.v-<arch> so it overrides (higher specificity)
// without duplicating base selectors in the same file
function prefixArch(arch, css) {
  const pre = `body.v-${arch}`;
  return css.replace(/([^{}]+)\{/g, (_, sel) => sel.split(',').map(s => `${pre} ${s.trim()}`).join(',\n') + ' {');
}

/* per-kit personality knobs */
function knobs(num, kit) {
  const round = /kids|cartoon|aqua|bloom|frutiger|soft|round|nunito|baloo|quicksand|comfortaa/.test((kit.name + JSON.stringify(kit.fonts)).toLowerCase());
  const sharp = /swiss|bauhaus|brutal|grid|blueprint|mono|deco/.test((num + kit.name).toLowerCase());
  const radius = round ? ['0.75rem', '1.25rem', '2rem'] : sharp ? ['0', '0', '0'] : ['0.375rem', '0.75rem', '1.25rem'];
  const upper = /swiss|bauhaus|blueprint|broadsheet|mono|deco|press/.test((num + kit.name).toLowerCase());
  return { radius, headingCase: upper ? 'uppercase' : 'none', headingTrack: upper ? '0.04em' : '-0.01em' };
}

/* ── CSS builders ───────────────────────────────────────────────────────── */
function baseCss(num, kit, pal, fonts, k) {
  const F = fonts.roles;
  return `@import url('${fonts.url}');
/* ============================================================
   BASE.CSS — ${kit.name.split(' — ')[0]} (kit ${num})
   Tokens (palette + fonts) + reset. Generated from brand-kits.json.
   ============================================================ */
:root {
  /* palette (derived from brand kit, ${pal.light ? 'light' : 'dark'} theme) */
  --color-bg: ${pal.bg};
  --color-surface: ${pal.surface};
  --color-surface2: ${pal.surface2};
  --color-text: ${pal.text};
  --color-heading: ${pal.heading};
  --color-text-muted: ${pal.muted};
  --color-border: ${pal.border};
  --color-border-strong: ${pal.borderStrong};
  --color-accent: ${pal.accent};
  --color-cta: ${pal.accent};
  --color-cta-hover: ${pal.ctaHover};
  --color-cta-text: ${pal.ctaText};
  --color-link: ${pal.link};
  --color-code-bg: ${pal.codeBg};

  /* fonts */
  --font-headline: ${F.headline.stack};
  --font-body: ${F.body.stack};
  --font-ui: ${F.ui.stack};
  --font-code: ${F.code.stack};
  --weight-headline: ${F.headline.weight};
  --weight-body: ${F.body.weight};
  --weight-ui: ${F.ui.weight};

  /* spacing scale */
  --space-1: 0.5rem; --space-2: 1rem; --space-3: 1.5rem; --space-4: 2rem;
  --space-5: 3rem; --space-6: 4rem; --space-7: 6rem; --space-8: 8rem; --space-9: 11rem;

  --max-width: 72rem; --content-width: 44rem; --gutter: var(--space-4);
  --radius-sm: ${k.radius[0]}; --radius-md: ${k.radius[1]}; --radius-lg: ${k.radius[2]};
  --shadow-sm: 0 1px 3px rgba(0,0,0,.10); --shadow-md: 0 6px 20px rgba(0,0,0,.14); --shadow-lg: 0 14px 40px rgba(0,0,0,.18);
  --transition-fast: 140ms ease; --transition-base: 240ms ease;
}

*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-weight: var(--weight-body);
  font-size: 1rem;
  line-height: 1.65;
  text-rendering: optimizeLegibility;
}
img, svg { display: block; max-width: 100%; }
a { color: var(--color-link); }
:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto; } }
`;
}

function themeCss(num, kit, pal, k, arch) {
  return `/* ============================================================
   THEME.CSS — typography, layout, page structure
   ${kit.name}
   archetype: ${arch}
   ============================================================ */
h1,h2,h3,h4,h5,h6 {
  font-family: var(--font-headline);
  font-weight: var(--weight-headline);
  color: var(--color-heading);
  line-height: 1.12;
  letter-spacing: ${k.headingTrack};
  text-wrap: balance;
}
h1 { font-size: clamp(2.25rem, 5.5vw, 4rem); }
h2 { font-size: clamp(1.65rem, 3.5vw, 2.6rem); }
h3 { font-size: clamp(1.15rem, 2vw, 1.5rem); }
p { max-width: 65ch; }
a { text-underline-offset: 0.18em; }

/* layout containers */
main { display: block; }
.hero-inner, .pitch-inner, .features-overview-inner, .cta-banner-inner,
.page-header-inner, .content-section { max-width: var(--max-width); margin-inline: auto; padding-inline: var(--gutter); }
.content-section { max-width: 60rem; padding-block: var(--space-6); display: flex; flex-direction: column; gap: var(--space-3); }
.content-section h2 { margin-top: var(--space-3); }
.content-section p, .content-section ul, .content-section dl { max-width: 65ch; }

/* hero */
.hero { padding-block: var(--space-7); border-bottom: 1px solid var(--color-border); }
.hero-eyebrow { font-family: var(--font-ui); text-transform: uppercase; letter-spacing: 0.16em; font-size: 0.75rem; font-weight: 600; color: var(--color-accent); margin-bottom: var(--space-2); }
.hero h1 { margin-bottom: var(--space-3); text-transform: ${k.headingCase}; }
.hero-sub { font-size: 1.2rem; color: var(--color-text-muted); max-width: 50ch; margin-bottom: var(--space-4); }
.hero-cta { display: flex; flex-wrap: wrap; gap: var(--space-2); }

/* pitch */
.pitch { padding-block: var(--space-6); background: var(--color-surface); }
.pitch-bullets { list-style: none; display: grid; gap: var(--space-2); margin-top: var(--space-3); }
.pitch-bullets li { position: relative; padding-left: 1.6rem; }
.pitch-bullets li::before { content: ''; position: absolute; left: 0; top: 0.55em; width: 0.6rem; height: 0.6rem; background: var(--color-accent); border-radius: 2px; }

/* features overview + detail */
.features-overview { padding-block: var(--space-7); }
.features-overview h2, .pitch h2 { margin-bottom: var(--space-4); }
.feature-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: var(--space-3); }
.features-more { margin-top: var(--space-4); font-family: var(--font-ui); font-weight: 600; }
.content-grid { display: grid; gap: var(--space-4); grid-template-columns: 1fr; }
.feature-detail { display: flex; gap: var(--space-3); align-items: flex-start; padding-block: var(--space-3); border-bottom: 1px solid var(--color-border); }
.feature-detail-icon { color: var(--color-accent); flex-shrink: 0; }
.feature-detail-text h2 { font-size: 1.3rem; margin-bottom: var(--space-1); }

/* page header */
.page-header { padding-block: var(--space-6) var(--space-4); border-bottom: 1px solid var(--color-border); background: var(--color-surface); }
.page-lead { font-size: 1.15rem; color: var(--color-text-muted); margin-top: var(--space-2); }

/* lists / faq / code */
.docs-links, .ecosystem-list { list-style: none; display: grid; gap: var(--space-2); }
.ecosystem-list li { padding: var(--space-2) var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-sm); }
.faq-list { display: grid; gap: var(--space-1); }
.faq-item { padding-block: var(--space-3); border-bottom: 1px solid var(--color-border); }
.faq-item dt { font-family: var(--font-headline); font-weight: var(--weight-headline); margin-bottom: var(--space-1); }
.faq-item dd { color: var(--color-text-muted); }
code { font-family: var(--font-code); font-size: 0.9em; background: var(--color-code-bg); padding: 0.1em 0.4em; border-radius: 4px; }
.code-block { font-family: var(--font-code); background: var(--color-code-bg); color: var(--color-text); padding: var(--space-3); border-radius: var(--radius-md); overflow-x: auto; border: 1px solid var(--color-border); }
.code-block code { background: none; padding: 0; }

/* cta banner */
.cta-banner { padding-block: var(--space-7); text-align: center; background: var(--color-surface2); border-block: 1px solid var(--color-border); margin-top: var(--space-6); }
.cta-banner h2 { margin-bottom: var(--space-4); }

@media (width <= 860px) { .feature-cards { grid-template-columns: repeat(2,1fr); } }
@media (width <= 600px) { .feature-cards { grid-template-columns: 1fr; } .hero { padding-block: var(--space-6); } }

/* ── archetype: ${arch} ── */
${prefixArch(arch, ARCH_CSS[arch])}
`;
}

function componentsCss(kit) {
  return `/* ============================================================
   COMPONENTS.CSS — nav, footer, buttons, cards
   ${kit.name}
   ============================================================ */
.skip-link { position: absolute; left: -9999px; top: 0; background: var(--color-accent); color: var(--color-cta-text); padding: var(--space-1) var(--space-2); z-index: 100; border-radius: 0 0 var(--radius-sm) 0; }
.skip-link:focus { left: 0; }

/* header / nav */
.site-header { position: sticky; top: 0; z-index: 50; background: var(--color-bg); background: color-mix(in srgb, var(--color-bg) 90%, transparent); backdrop-filter: saturate(140%) blur(8px); border-bottom: 1px solid var(--color-border); }
.nav-primary { display: flex; align-items: center; gap: var(--space-3); max-width: var(--max-width); margin-inline: auto; padding: 0.75rem var(--gutter); }
.nav-logo { display: inline-flex; margin-right: auto; }
.nav-logo img { height: 32px; width: auto; }
.nav-menu { list-style: none; display: flex; gap: var(--space-3); align-items: center; }
.nav-menu a { font-family: var(--font-ui); font-weight: var(--weight-ui); font-size: 0.95rem; color: var(--color-text); text-decoration: none; padding: 0.4rem 0; border-bottom: 2px solid transparent; transition: color var(--transition-fast), border-color var(--transition-fast); }
.nav-menu a:hover { color: var(--color-accent); }
.nav-menu a[aria-current='page'] { color: var(--color-accent); border-bottom-color: var(--color-accent); }
.nav-toggle { display: none; background: none; border: 0; color: var(--color-text); cursor: pointer; padding: 0.25rem; }

/* buttons */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-1); font-family: var(--font-ui); font-weight: 600; font-size: 0.95rem; line-height: 1; padding: 0.8rem 1.6rem; border-radius: var(--radius-md); text-decoration: none; cursor: pointer; border: 1.5px solid transparent; transition: transform var(--transition-fast), background-color var(--transition-fast), box-shadow var(--transition-fast); }
.btn-primary { background: var(--color-cta); color: var(--color-cta-text); box-shadow: var(--shadow-sm); }
.btn-primary:hover { background: var(--color-cta-hover); transform: translateY(-1px); box-shadow: var(--shadow-md); }
.btn-secondary { background: transparent; color: var(--color-text); border-color: var(--color-border-strong); }
.btn-secondary:hover { border-color: var(--color-accent); color: var(--color-accent); }
.btn-large { padding: 1rem 2.1rem; font-size: 1.05rem; }
.btn-small { padding: 0.5rem 1rem; font-size: 0.85rem; }

/* cards */
.feature-card { padding: var(--space-4); border-radius: var(--radius-lg); background: var(--color-surface); border: 1px solid var(--color-border); transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base); }
.feature-card:hover { box-shadow: var(--shadow-md); }
.feature-icon { width: 2.25rem; height: 2.25rem; color: var(--color-accent); margin-bottom: var(--space-2); }
.feature-icon svg { width: 100%; height: 100%; }
.feature-card h3 { margin-bottom: var(--space-1); }
.feature-card p { color: var(--color-text-muted); font-size: 0.95rem; max-width: 40ch; }

.client-cards, .download-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr)); gap: var(--space-3); }
.client-card, .download-card { padding: var(--space-4); border-radius: var(--radius-lg); background: var(--color-surface); border: 1px solid var(--color-border); transition: box-shadow var(--transition-base); }
.client-card:hover, .download-card:hover { box-shadow: var(--shadow-md); }
.client-card-header { display: flex; align-items: center; justify-content: space-between; gap: var(--space-1); flex-wrap: wrap; margin-bottom: var(--space-1); }
.client-tagline { color: var(--color-text-muted); margin-bottom: var(--space-2); }
.client-status { font-family: var(--font-ui); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; padding: 0.2rem 0.6rem; border-radius: 100px; border: 1px solid var(--color-border-strong); }
.status-stable { color: var(--color-accent); border-color: var(--color-accent); }
.client-highlights { list-style: none; display: flex; flex-wrap: wrap; gap: 0.4rem; margin-block: var(--space-2); }
.client-highlights li { font-family: var(--font-ui); font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 100px; background: var(--color-surface2); color: var(--color-text-muted); }
.download-block { margin-bottom: var(--space-4); }

/* footer */
.site-footer { background: var(--color-surface2); border-top: 1px solid var(--color-border); padding-block: var(--space-6) var(--space-4); margin-top: var(--space-6); }
.footer-inner { max-width: var(--max-width); margin-inline: auto; padding-inline: var(--gutter); }
.footer-tagline { font-family: var(--font-headline); font-weight: var(--weight-headline); font-size: 1.3rem; color: var(--color-heading); margin-bottom: var(--space-4); }
.footer-nav { display: grid; grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr)); gap: var(--space-4); }
.footer-col h3 { font-family: var(--font-ui); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-muted); margin-bottom: var(--space-2); }
.footer-col ul { list-style: none; display: grid; gap: 0.5rem; }
.footer-col a { font-size: 0.92rem; color: var(--color-text); text-decoration: none; }
.footer-col a:hover { color: var(--color-accent); }
.footer-copy { margin-top: var(--space-5); padding-top: var(--space-3); border-top: 1px solid var(--color-border); font-size: 0.85rem; color: var(--color-text-muted); }

a, button, [role='button'] { min-height: 44px; }
.nav-menu a, .footer-col a, .features-more a { min-height: 0; }

@media (width <= 760px) {
  .nav-toggle { display: inline-flex; }
  .nav-menu { display: none; position: absolute; left: 0; right: 0; top: 100%; flex-direction: column; align-items: flex-start; gap: 0; background: var(--color-bg); border-bottom: 1px solid var(--color-border); padding: var(--space-2) var(--gutter); }
  .nav-menu.is-open { display: flex; }
  .nav-menu a { width: 100%; padding: 0.6rem 0; }
}
`;
}

const mainJs = `// nav toggle
(function () {
  var btn = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function () {
    var open = menu.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') { menu.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); } });
})();
`;

function logoSvg(pal) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" role="img" aria-label="Phlix">
  <rect x="2" y="8" width="24" height="24" rx="5" fill="${pal.accent}"/>
  <path d="M11 15 L20 20 L11 25 Z" fill="${pal.ctaText}"/>
  <text x="32" y="27" font-family="${pal.light ? 'Georgia,serif' : 'Helvetica,Arial,sans-serif'}" font-size="19" font-weight="700" fill="${pal.text}">Phlix</text>
</svg>
`;
}

const sitemapXml = slug => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(p => `  <url><loc>/variants/${slug}/${p === 'index' ? '' : p + '.html'}</loc></url>`).join('\n')}
</urlset>
`;

/* ── HTML templating (self-contained; flat classes match the CSS above) ──── */
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ICONS = {
  library: '<path d="M4 6h16M4 12h16M4 18h12"/>',
  syncplay: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>',
  transcode: '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  antenna: '<circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 010 8.49M7.76 16.24a6 6 0 010-8.49M19.07 4.93a10 10 0 010 14.14M4.93 19.07a10 10 0 010-14.14"/>',
  broadcast: '<circle cx="12" cy="12" r="2"/><path d="M4.93 19.07a10 10 0 010-14.14M19.07 4.93a10 10 0 010 14.14M7.76 16.24a6 6 0 010-8.49M16.24 7.76a6 6 0 010 8.49"/>',
  puzzle: '<path d="M4 7h4a2 2 0 002-2 2 2 0 114 0 2 2 0 002 2h2v4a2 2 0 002 2 2 2 0 110 4 2 2 0 00-2 2v2h-4a2 2 0 01-2-2 2 2 0 10-4 0 2 2 0 01-2 2H4v-4a2 2 0 00-2-2 2 2 0 110-4 2 2 0 002-2z"/>',
  hub: '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>',
};
const icon = (name, size = 28) => `<svg class="feature-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.library}</svg>`;
const NAV = [['index', 'Home'], ['features', 'Features'], ['clients', 'Clients'], ['download', 'Download'], ['plugins', 'Plugins'], ['docs', 'Docs'], ['hub', 'Hub'], ['about', 'About']];
const href = p => (p === 'index' ? 'index.html' : `${p}.html`);
const link = h => (/^https?:/.test(h) ? h : (h.replace(/^\//, '') === '' ? 'index.html' : `${h.replace(/^\//, '')}.html`));
const ext = h => (/^https?:/.test(h) ? ' rel="noopener noreferrer"' : '');
const PTITLE = { index: 'Your media. Your way.', features: 'Features', clients: 'Clients', download: 'Download', plugins: 'Plugins', docs: 'Docs', hub: 'Hub', about: 'About' };

function bodyFor(page, c) {
  const S = c.site.name;
  const cta = (label, h, cls = 'btn-primary', lg = false) => `<a class="btn ${cls}${lg ? ' btn-large' : ''}" href="${esc(link(h))}"${ext(h)}>${esc(label)}</a>`;
  const banner = (h, label, hr) => `<section class="cta-banner"><div class="cta-banner-inner"><h2>${esc(h)}</h2>${cta(label, hr, 'btn-primary', true)}</div></section>`;
  const header = (t, lead) => `<div class="page-header"><div class="page-header-inner"><h1>${esc(t)}</h1><p class="page-lead">${esc(lead)}</p></div></div>`;
  switch (page) {
    case 'index': return `
    <section class="hero"><div class="hero-inner">
      <p class="hero-eyebrow">${esc(c.hero.eyebrow)}</p>
      <h1>${esc(c.hero.headline)}</h1>
      <p class="hero-sub">${esc(c.hero.subheadline)}</p>
      <div class="hero-cta">${cta(c.hero.primary_cta.label, c.hero.primary_cta.href)}${cta(c.hero.secondary_cta.label, c.hero.secondary_cta.href, 'btn-secondary')}</div>
    </div></section>
    <section class="pitch"><div class="pitch-inner">
      <h2>Why ${esc(S)}?</h2>
      <ul class="pitch-bullets">${c.pitch_bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
    </div></section>
    <section class="features-overview"><div class="features-overview-inner">
      <h2>Everything your library needs</h2>
      <div class="feature-cards">${c.features.slice(0, 6).map(f => `<article class="feature-card">${icon(f.icon)}<h3>${esc(f.title)}</h3><p>${esc(f.body)}</p></article>`).join('')}</div>
      <p class="features-more"><a href="features.html">See all features &rarr;</a></p>
    </div></section>
    ${banner('Ready to stream?', `Download ${S}`, '/download')}`;
    case 'features': return `${header('Features', 'Everything you need to run a media library that actually works.')}
    <div class="content-section"><div class="content-grid">${c.features.map(f => `<article class="feature-detail" id="${esc(f.id)}"><div class="feature-detail-icon">${icon(f.icon, 40)}</div><div class="feature-detail-text"><h2>${esc(f.title)}</h2><p>${esc(f.body)}</p></div></article>`).join('')}</div></div>
    ${banner('Get started in minutes', 'Download Now', '/download')}`;
    case 'clients': return `${header('Clients', 'Native apps for every screen you own.')}
    <div class="content-section"><div class="client-cards">${c.clients.map(cl => `<article class="client-card" id="${esc(cl.id)}"><div class="client-card-header"><h2>${esc(cl.name)}</h2><span class="client-status status-${esc(cl.status)}">${esc(cl.status)}</span></div><p class="client-tagline">${esc(cl.tagline)}</p><ul class="client-highlights">${cl.highlights.map(h => `<li>${esc(h)}</li>`).join('')}</ul>${cl.repo ? `<a class="btn btn-small" href="${esc(cl.repo)}" rel="noopener noreferrer">View source</a>` : ''}</article>`).join('')}</div></div>
    ${banner('All clients are open source', 'Download Now', '/download')}`;
    case 'download': return `${header('Download', 'Install the server, grab a client, start streaming.')}
    <div class="content-section">
      <h2>Server</h2>
      <div class="download-block"><p>Requires PHP 8.3+ and <a href="${esc(c.site.social.github)}" rel="noopener noreferrer">phlix-server</a>.</p><pre class="code-block"><code>composer create-project detain/phlix-server</code></pre></div>
      <h2>Clients</h2>
      <div class="download-cards">${c.clients.filter(cl => cl.repo).map(cl => `<div class="download-card"><h3>${esc(cl.name)}</h3><p>${esc(cl.tagline)}</p><a class="btn btn-primary" href="${esc(cl.repo)}" rel="noopener noreferrer">Get ${esc(cl.name)}</a></div>`).join('')}</div>
      <h2>Ecosystem</h2>
      <ul class="ecosystem-list">${c.ecosystem.map(e => `<li><strong><a href="${esc(e.repo)}" rel="noopener noreferrer">${esc(e.name)}</a></strong> — ${esc(e.what)}</li>`).join('')}</ul>
    </div>`;
    case 'plugins': return `${header('Plugins', `Extend ${S} with a versioned plugin contract.`)}
    <div class="content-section">
      <h2>Plugin model</h2><p>Every plugin implements <code>LifecycleInterface</code> and ships a manifest. Drop it in the <code>plugins/</code> directory and the loader picks it up automatically.</p>
      <pre class="code-block"><code>// Reference plugin\ngit clone ${esc(c.ecosystem.find(e => /example/.test(e.repo))?.repo || 'https://github.com/detain/phlix-plugin-example')}</code></pre>
      <h2>Write your own</h2><p>Start from <a href="https://github.com/detain/phlix-plugin-example" rel="noopener noreferrer">phlix-plugin-example</a> for the smallest working starter.</p>
    </div>
    ${banner('Build something great', 'Get the example plugin', 'https://github.com/detain/phlix-plugin-example')}`;
    case 'docs': return `${header('Docs', 'Everything you need to know.')}
    <div class="content-section">
      <h2>Documentation</h2><p>Full documentation lives at <a href="${esc(c.site.social.docs)}" rel="noopener noreferrer">${esc(c.site.social.docs)}</a>.</p>
      <ul class="docs-links"><li><a href="${esc(c.site.social.docs)}" rel="noopener noreferrer">User guide</a></li><li><a href="${esc(c.site.social.docs)}/reference" rel="noopener noreferrer">API reference</a></li><li><a href="${esc(c.site.social.docs)}/developers" rel="noopener noreferrer">Developer docs</a></li></ul>
      <h2>Ecosystem</h2><ul class="ecosystem-list">${c.ecosystem.map(e => `<li><strong><a href="${esc(e.repo)}" rel="noopener noreferrer">${esc(e.name)}</a></strong> — ${esc(e.what)}</li>`).join('')}</ul>
    </div>`;
    case 'hub': return `${header('Phlix Hub', 'Reach your server from anywhere.')}
    <div class="content-section">
      <h2>What the Hub does</h2><p>Sign in once. The Hub's reverse-tunnel relay handles NAT traversal so you can reach your server from your phone, your Roku at a friend's house, or any device anywhere.</p>
      <h2>Self-host or use the public hub</h2><p>Run your own <a href="https://github.com/detain/phlix-hub" rel="noopener noreferrer">phlix-hub</a>, or use the public one — no configuration required.</p>
    </div>
    ${banner('Try the public Hub', 'Get started', '/download')}`;
    case 'about': return `${header('About', 'Self-hosted media. Open source. No lock-in.')}
    <div class="content-section">
      <h2>Philosophy</h2><p>${esc(S)} keeps your library on your hardware, ships under a permissive license so you can fork it, and lets the community drive what gets built next.</p>
      <h2>FAQ</h2><dl class="faq-list">${c.faq.map(f => `<div class="faq-item"><dt>${esc(f.q)}</dt><dd>${esc(f.a)}</dd></div>`).join('')}</dl>
    </div>`;
    default: return '';
  }
}

function buildPage(slug, c, page, pal, kit, arch) {
  const S = c.site.name;
  const title = page === 'index' ? `${S} — ${PTITLE.index}` : `${PTITLE[page]} — ${S}`;
  const favicon = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='${pal.accent}'/><path d='M12 9 L23 16 L12 23 Z' fill='${pal.ctaText}'/></svg>`)}`;
  const nav = NAV.map(([p, label]) => `<li><a href="${href(p)}"${p === page ? ' aria-current="page"' : ''}>${label}</a></li>`).join('');
  const footer = `<footer class="site-footer"><div class="footer-inner">
    <p class="footer-tagline">${esc(c.footer.tagline)}</p>
    <nav class="footer-nav" aria-label="Footer">${c.footer.columns.map(col => `<div class="footer-col"><h3>${esc(col.heading)}</h3><ul>${col.links.map(l => `<li><a href="${esc(link(l.href))}"${ext(l.href)}>${esc(l.label)}</a></li>`).join('')}</ul></div>`).join('')}</nav>
    <p class="footer-copy">&copy; ${esc(kit.name.split(' — ')[0])} demo theme · ${esc(S)} — BSD-3-Clause</p>
  </div></footer>`;
  return `<!doctype html>
<html lang="${esc(c.site.default_locale || 'en')}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(c.meta.description)}">
<meta name="theme-color" content="${pal.accent}">
<link rel="icon" type="image/svg+xml" href="${favicon}">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/theme.css">
<link rel="stylesheet" href="css/components.css">
</head>
<body class="v-${arch}">
<a class="skip-link" href="#main-content">Skip to main content</a>
<header class="site-header"><nav class="nav-primary" aria-label="Primary">
  <a class="nav-logo" href="index.html" aria-label="${esc(S)} home"><img src="img/logo.svg" alt="${esc(S)}" width="120" height="40"></a>
  <button class="nav-toggle" aria-controls="nav-menu" aria-expanded="false" aria-label="Toggle navigation"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>
  <ul class="nav-menu" id="nav-menu">${nav}</ul>
</nav></header>
<main id="main-content">${bodyFor(page, c)}
</main>
${footer}
<script src="js/main.js" defer></script>
</body>
</html>
`;
}

/* ── emit ───────────────────────────────────────────────────────────────── */
const ALL_ARCH = ['immersive', 'editorial', 'grid', 'card', 'asymmetric', 'minimal', 'showcase'];
const allSlugs = Object.keys(kits).filter(s => { const n = s.slice(0, 2); return +n >= 6 && (!ONLY || n === ONLY); }).sort();
// group by kit number, assign distinct archetypes within each kit
const byKit = {};
for (const s of allSlugs) (byKit[s.slice(0, 2)] ||= []).push(s);
const archOf = {};
for (const [, group] of Object.entries(byKit)) {
  const used = new Set();
  for (const s of group) {
    let a = archetype(kits[s]);
    if (used.has(a)) a = ALL_ARCH.find(x => !used.has(x)) || a;
    used.add(a); archOf[s] = a;
  }
}
console.log(`scaffolding ${allSlugs.length} variants${ONLY ? ' (kit ' + ONLY + ')' : ''}${DRY ? ' [DRY]' : ''}`);

let count = 0;
for (const slug of allSlugs) {
  const num = slug.slice(0, 2);
  const kit = kits[slug];
  const pal = palette(num, kit);
  const fonts = fontsFor(kit);
  const k = knobs(num, kit);
  const arch = archOf[slug];
  const dir = resolve(VARIANTS_DIR, slug);

  if (DRY) { console.log(`  ${slug}  ${pal.light ? 'light' : 'dark '} bg=${pal.bg} acc=${pal.accent} arch=${arch} fonts=[${Object.values(fonts.roles).map(f => f.fam).join(', ')}]`); continue; }

  rmSync(dir, { recursive: true, force: true });
  for (const sub of ['css', 'js', 'img']) mkdirSync(resolve(dir, sub), { recursive: true });
  writeFileSync(resolve(dir, 'css/base.css'), baseCss(num, kit, pal, fonts, k));
  writeFileSync(resolve(dir, 'css/theme.css'), themeCss(num, kit, pal, k, arch));
  writeFileSync(resolve(dir, 'css/components.css'), componentsCss(kit));
  writeFileSync(resolve(dir, 'js/main.js'), mainJs);
  writeFileSync(resolve(dir, 'img/logo.svg'), logoSvg(pal));
  writeFileSync(resolve(dir, 'robots.txt'), 'User-agent: *\nAllow: /\n');
  writeFileSync(resolve(dir, 'sitemap.xml'), sitemapXml(slug));
  for (const page of PAGES) writeFileSync(resolve(dir, `${page}.html`), buildPage(slug, CONTENT, page, pal, kit, arch));
  count++;
  if (count % 15 === 0) console.log(`  ...${count} done`);
}
if (!DRY) console.log(`done: ${count} variant folders written`);
