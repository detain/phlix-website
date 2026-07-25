#!/usr/bin/env node
// kit-brief.mjs — emit everything an authoring agent needs, in ONE call.
//
//   node tools/kit-brief.mjs --site <slug>
//   node tools/kit-brief.mjs --site <slug> --json
//
// Why this exists: the abstract-canvas pilot spent ~40% of ~410k tokens READING,
// and most of that reading was mechanical lookup that is identical in shape for
// all 50 kits — which experience fields are declared, which nav labels, which
// narrative section ids, which font files actually exist in the pool and under
// what filenames, and which colour pairs really clear WCAG. Each of the 49
// remaining authors would otherwise rediscover all of it with 15-25 tool calls,
// and would derive the contrast tokens slightly differently every time.
//
// This resolves all of it once, from the kit module itself (imported, not
// regex-parsed) plus the real font pool and the predecessor site on disk.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITES = join(ROOT, 'sites');
const FONT_POOL = join(ROOT, 'shared', 'assets', 'fonts');

const argv = process.argv.slice(2);
const siteFlag = argv.indexOf('--site');
const slug = siteFlag === -1 ? null : argv[siteFlag + 1];
const asJson = argv.includes('--json');

if (!slug) {
  console.error('usage: node tools/kit-brief.mjs --site <slug> [--json]');
  process.exit(1);
}

const kitPath = join(ROOT, 'brand-kits', `${slug}.js`);
if (!existsSync(kitPath)) {
  console.error(`[kit-brief] no brand-kits/${slug}.js`);
  process.exit(1);
}
const kit = (await import(pathToFileURL(kitPath).href)).default;

/* ── colour maths ──────────────────────────────────────────────────────── */

const hex2rgb = (hex) => {
  const h = String(hex).replace('#', '').trim();
  const f =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h;
  if (f.length !== 6 || /[^0-9a-fA-F]/.test(f)) return null;
  return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16));
};
const rgb2hex = (rgb) =>
  `#${rgb
    .map((v) =>
      Math.round(Math.min(255, Math.max(0, v)))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
const lum = (rgb) => {
  const l = rgb
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2];
};
const ratio = (a, b) => {
  const ra = hex2rgb(a);
  const rb = hex2rgb(b);
  if (!ra || !rb) return null;
  const [hi, lo] = [lum(ra), lum(rb)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

/**
 * Nudge `fg` toward black (or white, on a dark ground) until it clears `target`
 * against `bg`, preserving hue. This is exactly what the pilot did by hand to
 * rescue a failing accent; precomputing it means all 50 sites derive the same
 * token instead of 50 slightly different ones.
 */
function deriveAccessible(fg, bg, target = 4.5) {
  if ((ratio(fg, bg) ?? 0) >= target) return { hex: fg, changed: false };
  const rgbFg = hex2rgb(fg);
  const rgbBg = hex2rgb(bg);
  if (!rgbFg || !rgbBg) return null;
  const towardWhite = lum(rgbBg) < 0.35;
  for (let step = 1; step <= 100; step += 1) {
    const t = step / 100;
    const mixed = rgbFg.map((v) => (towardWhite ? v + (255 - v) * t : v * (1 - t)));
    const cand = rgb2hex(mixed);
    if ((ratio(cand, bg) ?? 0) >= target) return { hex: cand, changed: true };
  }
  return { hex: towardWhite ? '#ffffff' : '#000000', changed: true };
}

/* ── gather ────────────────────────────────────────────────────────────── */

// Every hex in the kit, with the dotted path that named it.
const named = [];
(function walk(node, path) {
  if (node == null) return;
  if (typeof node === 'string') {
    if (/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(node.trim()))
      named.push({ path, hex: node.trim().toLowerCase() });
    return;
  }
  if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${path}[${i}]`));
  if (typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k);
  }
})(kit, '');

// Backgrounds/surfaces are what text sits on. Heuristic on the key name, then
// fall back to the darkest and lightest colours in the palette.
const bgLike = named.filter((n) =>
  /background|bg|surface|canvas|paper|base|ground|card|panel/i.test(n.path),
);
const uniq = (arr) => [...new Map(arr.map((x) => [x.hex, x])).values()];
const backgrounds = uniq(bgLike.length ? bgLike : named).slice(0, 6);
const textCandidates = uniq(
  named.filter((n) =>
    /text|ink|foreground|fg|accent|primary|secondary|link|heading|body/i.test(n.path),
  ),
).slice(0, 10);

// Fonts → real pool files.
const poolFiles = existsSync(FONT_POOL)
  ? readdirSync(FONT_POOL).filter((f) => f.endsWith('.woff2'))
  : [];
const familySlug = (f) =>
  String(f)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const fontRoles = Object.entries(kit.fonts ?? {})
  .filter(([, v]) => v && typeof v === 'object' && v.family)
  .map(([role, v]) => {
    const fs = familySlug(v.family);
    // Pool filenames are `<family-slug>-<weight>-latin.woff2`, so anchor on a
    // numeric weight after the slug. A bare `startsWith('nunito-')` also matches
    // `nunito-sans-*`, which is a DIFFERENT family — and quietly offering the
    // wrong face is worse than offering none.
    const files = poolFiles.filter((f) => new RegExp(`^${fs}-\\d`).test(f)).sort();
    const have = files
      .map((f) => Number(f.match(new RegExp(`^${fs}-(\\d+)`))?.[1]))
      .filter((n) => Number.isFinite(n));
    const want = (Array.isArray(v.weight) ? v.weight : v.weight != null ? [v.weight] : [])
      .map(Number)
      .filter((n) => Number.isFinite(n));
    return {
      role,
      family: v.family,
      weights: v.weight ?? null,
      files,
      have,
      // A weight the kit asks for with no file behind it: `font-weight: 700`
      // then silently renders a synthesised or nearest face. One kit shipped
      // `strong`/`b` resolving to a 600 face for exactly this reason.
      missingWeights: want.filter((w) => !have.includes(w)),
      missing: files.length === 0,
    };
  });

// Declared vs absent experience fields.
const EXPERIENCE_FIELDS = [
  'site_architecture',
  'homepage_narrative',
  'page_blueprints',
  'copy_overlay',
  'feature_casting',
  'copy_treatments',
  'faq_experience',
  'hero_experience',
  'navigation_model',
  'scroll_experience',
  'easter_eggs',
  'conversion_funnel',
  'proof_strategy',
  'visitor_paths',
  'experience_archetype',
  'complexity_profile',
  'intensity_toggle',
  'seasonal_activation',
  'error_page_experience',
  'persona_vignettes',
];
const declared = EXPERIENCE_FIELDS.filter((f) => kit[f] != null);
const absent = EXPERIENCE_FIELDS.filter((f) => kit[f] == null);
const mascotBehavior = kit.mascot?.behavior ?? null;

// Predecessor site on disk, so the author need not read the old HTML.
const siteDir = join(SITES, slug);
let predecessor = null;
if (existsSync(siteDir)) {
  const pages = readdirSync(siteDir)
    .filter((f) => f.endsWith('.html'))
    .sort();
  const home = existsSync(join(siteDir, 'index.html'))
    ? readFileSync(join(siteDir, 'index.html'), 'utf8')
    : '';
  const cssDir = join(siteDir, 'css');
  const css = existsSync(cssDir)
    ? readdirSync(cssDir)
        .filter((f) => f.endsWith('.css'))
        .map((f) => readFileSync(join(cssDir, f), 'utf8'))
        .join('\n')
    : '';
  predecessor = {
    pages,
    has404: pages.includes('404.html'),
    navLabels: [...home.matchAll(/class="nav-link"[^>]*>\s*([^<]+)</g)]
      .map((m) => m[1].trim())
      .slice(0, 12),
    sectionIds: [...home.matchAll(/<section[^>]*\sid="([^"]+)"/g)].map((m) => m[1]).slice(0, 15),
    fontFaces: (css.match(/@font-face/g) || []).length,
    externalFonts: /fonts\.googleapis|fonts\.gstatic/.test(css + home),
  };
}

/* ── emit ──────────────────────────────────────────────────────────────── */

const brief = { slug, name: kit.name, declared, absent, fontRoles, predecessor };

if (asJson) {
  console.log(JSON.stringify({ ...brief, backgrounds, textCandidates }, null, 2));
  process.exit(0);
}

const L = [];
const p = (s = '') => L.push(s);

p(`# Kit brief — ${kit.name ?? slug} (\`${slug}\`)`);
p();
p(`Generated by \`tools/kit-brief.mjs\`. Everything here is resolved from the kit`);
p(`module, the real font pool, and the site on disk — you do **not** need to`);
p(`re-derive any of it. Read the kit file for *design intent*; use this for facts.`);
p();
p(`If a human brief you were given disagrees with this file, **this file wins** —`);
p(`it is generated from \`brand-kits/${slug}.js\`, not transcribed. One agent was`);
p(`hand-briefed with another kit's narrative section ids; it was right to ignore`);
p(`them. Verify anything hand-written against this output.`);
p();
if (kit.tagline) p(`**Tagline:** ${kit.tagline}`);
if (kit.experience_archetype)
  p(`**Declared archetype:** \`${kit.experience_archetype}\` — adopt this; do not guess one.`);
p();

p(`## Fonts — exact pool filenames (reference as \`../../assets/fonts/<file>\`)`);
p();
if (!fontRoles.length) p(`_No \`fonts.*.family\` declared._`);
for (const f of fontRoles) {
  p(
    `- **${f.role}** — ${f.family}${f.weights ? ` (kit asks for weight ${JSON.stringify(f.weights)})` : ''}`,
  );
  if (f.missing) {
    p(`  - ⚠️ **NOT IN POOL — escalate, do not substitute and do not add a CDN link.**`);
  } else {
    for (const file of f.files) p(`  - \`${file}\``);
    if (f.missingWeights.length) {
      p(
        `  - ⚠️ **no file for weight ${f.missingWeights.join(', ')}** — do not write \`font-weight: ${f.missingWeights[0]}\` against this family; the browser will synthesise or snap to ${f.have.join('/')}. Use an available weight and note it in \`REGEN_PLAN.md\`.`,
      );
    }
  }
}
p();
p(`Only these weights exist. If the kit asks for a weight with no file, use the`);
p(`nearest available and say so in \`REGEN_PLAN.md\` — do **not** invent a filename,`);
p(`and do **not** let \`font-weight\` reference a face you have not declared.`);
p();

p(`## Contrast — measured, with accessible substitutes precomputed`);
p();
const claim = kit.accessibility?.minimum_contrast;
if (claim) {
  p(`> The kit claims: _"${String(claim).slice(0, 180)}"_`);
  p(`>`);
  p(`> **Treat that as unverified prose.** It was measurably wrong on the pilot kit`);
  p(`> (claimed 5.8:1 where the real value is 4.73:1). The table below is measured.`);
  p();
}
p(`AA needs **4.5:1** for normal text and **3:1** for large text (≥24px, or ≥19px`);
p(`bold), icons and borders. "Safe for small text" is the substitute derived by`);
p(`nudging the kit's own hue until it clears 4.5:1 — use it verbatim so all 50`);
p(`sites derive the same token.`);
p();
for (const bg of backgrounds) {
  p(`### On \`${bg.hex}\` (${bg.path})`);
  p();
  p(`| Colour | From | Ratio | Small text | Large/UI | Safe for small text |`);
  p(`| --- | --- | --- | --- | --- | --- |`);
  for (const fg of textCandidates) {
    if (fg.hex === bg.hex) continue;
    const r = ratio(fg.hex, bg.hex);
    if (r == null) continue;
    const d = deriveAccessible(fg.hex, bg.hex, 4.5);
    p(
      `| \`${fg.hex}\` | ${fg.path} | **${r.toFixed(2)}:1** | ${r >= 4.5 ? '✅' : '❌'} | ${r >= 3 ? '✅' : '❌'} | ${d && d.changed ? `\`${d.hex}\`` : '— (already passes)'} |`,
    );
  }
  p();
}

p(`## Experience fields`);
p();
p(
  `**Declared (${declared.length}) — each MUST be observably implemented:** ${declared.map((f) => `\`${f}\``).join(', ') || '_none_'}`,
);
p();
p(
  `**Absent (${absent.length}) — keep the default, absence is never a defect:** ${absent.map((f) => `\`${f}\``).join(', ') || '_none_'}`,
);
p();
p(
  `**\`mascot.behavior\`:** ${mascotBehavior ? '**declared** — build the companion; it must not overlap the primary CTA at 320px (§19.11)' : '`null` → imagery-only mascot, no companion'}`,
);
p();

const nav = kit.site_architecture?.nav;
if (nav?.length) {
  p(`### \`site_architecture.nav\` — use these labels, in this order`);
  p();
  p(`| # | id | label | emphasis |`);
  p(`| --- | --- | --- | --- |`);
  nav.forEach((n, i) => p(`| ${i + 1} | \`${n.id}\` | **${n.label}** | ${n.emphasis ?? '—'} |`));
  p();
  const emph = [...new Set(nav.map((n) => n.emphasis).filter(Boolean))];
  if (emph.length > 1) {
    p(`${emph.length} distinct \`emphasis\` levels (${emph.join(', ')}) — all of them must be`);
    p(`visually distinguishable, or the field is only partly implemented.`);
    p();
  }
}
const demoted = kit.site_architecture?.demoted_pages;
if (demoted?.length) {
  p(
    `**Demoted to the footer:** ${demoted.map((d) => `\`${d.id}\``).join(', ')} — the page still exists and is still linked, just not in the primary nav.`,
  );
  p();
}
const extra = kit.site_architecture?.extra_pages;
p(
  `**\`extra_pages\`:** ${extra?.length ? extra.map((e) => `\`${e.id ?? e}\``).join(', ') + ' — each must exist as a real page' : 'none — do not invent extra pages'}`,
);
p();

const sections = kit.homepage_narrative?.sections;
if (sections?.length) {
  p(`### \`homepage_narrative.sections[]\` — home page order`);
  p();
  p(`Use these strings as the actual \`<section id="…">\`; \`selfcheck\` verifies they`);
  p(`exist **in this order**.`);
  p();
  p(`| # | id | source | weight |`);
  p(`| --- | --- | --- | --- |`);
  sections.forEach((s, i) =>
    p(`| ${i + 1} | \`${s.id}\` | ${s.source ?? '—'} | ${s.weight ?? '—'} |`),
  );
  p();
}

const cp = kit.complexity_profile;
if (cp) {
  p(`### Budgets (\`complexity_profile\`)`);
  p();
  p(
    `- density \`${cp.density ?? '—'}\`, reading level \`${cp.reading_level ?? '—'}\`, jargon \`${cp.jargon_policy ?? '—'}\``,
  );
  if (cp.page_budget) {
    p(
      `- \`page_budget\`: ${Object.entries(cp.page_budget)
        .map(([k, v]) => `${k}=${v}`)
        .join(', ')}`,
    );
    p(`- The word cap governs **authored prose** (headings, framing, captions). Verbatim`);
    p(`  \`content.json\` fact strings are exempt — §16 forbids dropping facts to hit a count.`);
  }
  p();
}

const avoid = kit.voice?.avoid_words ?? kit.avoid_words;
if (avoid?.length) {
  p(
    `**\`avoid_words\`** (\`selfcheck\` warns on these): ${avoid.map((w) => `\`${w}\``).join(', ')}`,
  );
  p();
}

const funnel = kit.conversion_funnel?.cta_ladder;
if (funnel?.length) {
  p(
    `**\`conversion_funnel.cta_ladder\`** — ${funnel.length} rungs, all must be present: ${funnel.map((c) => `"${c.label ?? c}"`).join(' → ')}`,
  );
  p();
  p(`Note: a renamed CTA label must still honestly describe where it goes (WCAG 2.5.3).`);
  p();
}

const eggs = kit.easter_eggs;
if (eggs?.length) {
  p(
    `**\`easter_eggs\`** — ${eggs.length}, all must be reachable: ${eggs.map((e) => `\`${e.trigger ?? e.id ?? '?'}\``).join(', ')}`,
  );
  p(
    `A key-sequence egg must be disabled while focus is in an input/textarea/contenteditable, must never \`preventDefault\`, and must exit on Esc (§19.8).`,
  );
  p();
}

const err = kit.error_page_experience;
if (err) {
  p(
    `**\`error_page_experience\`** — ship \`404.html\`: realise \`concept\` as real content (never print the field verbatim), \`<meta name="robots" content="noindex">\`, **relative** asset paths only, and offer every \`recovery_links\` entry${err.recovery_links ? ` (${(Array.isArray(err.recovery_links) ? err.recovery_links : Object.keys(err.recovery_links)).map((r) => `\`${r.id ?? r}\``).join(', ')})` : ''}.`,
  );
  p();
}

p(`## Facts live in \`shared/content.json\` — never invent or restate from memory`);
p();
try {
  const c = JSON.parse(readFileSync(join(ROOT, 'shared', 'content.json'), 'utf8'));
  p(
    `- ${c.pitch_bullets?.length ?? 0} pitch bullets, ${c.features?.length ?? 0} features, ${c.clients?.length ?? 0} clients, ${c.ecosystem?.length ?? 0} ecosystem repos, ${c.faq?.length ?? 0} FAQ items`,
  );
  p(`- Footer: ${c.footer?.columns?.length ?? 0} columns — use the labels and hrefs verbatim`);
  const lic = c.faq?.find((f) => /licen/i.test(f.q));
  if (lic) p(`- **Licence (the exact fact):** ${lic.a}`);
} catch {
  p(`- _could not read shared/content.json_`);
}
p();

if (predecessor) {
  p(`## Predecessor site on disk — drift to fix (you need not read its HTML)`);
  p();
  p(`- Pages: ${predecessor.pages.length} (${predecessor.pages.join(', ')})`);
  p(`- \`404.html\`: ${predecessor.has404 ? 'present' : '**missing — you must add it**'}`);
  p(
    `- Current nav labels: ${predecessor.navLabels.length ? predecessor.navLabels.map((l) => `"${l}"`).join(', ') : '_none found_'}`,
  );
  if (nav?.length) {
    const want = nav.map((n) => n.label);
    const missing = want.filter((l) => !predecessor.navLabels.includes(l));
    p(
      `  - ${missing.length === 0 ? '✅ already matches the kit' : `❌ missing ${missing.length}/${want.length} kit labels: ${missing.map((l) => `"${l}"`).join(', ')}`}`,
    );
  }
  p(
    `- Current home section ids: ${predecessor.sectionIds.length ? predecessor.sectionIds.map((s) => `\`${s}\``).join(', ') : '_none_'}`,
  );
  if (sections?.length) {
    const missing = sections.map((s) => s.id).filter((id) => !predecessor.sectionIds.includes(id));
    p(
      `  - ${missing.length === 0 ? '✅ already matches the narrative' : `❌ missing ${missing.length}/${sections.length}: ${missing.map((s) => `\`${s}\``).join(', ')}`}`,
    );
  }
  p(
    `- \`@font-face\` rules: ${predecessor.fontFaces}${predecessor.externalFonts ? ' — ⚠️ **references an external font host; that must not survive**' : ''}`,
  );
  p(
    `- Carry forward what already works (palette tokens, logo, imagery, working \`@font-face\`); rebuild what defaulted to the shared template.`,
  );
  p();
}

p(`## Before you report`);
p();
p('```bash');
p(`node tools/gen-og.mjs --site ${slug}`);
p(`node tools/gen-sitemap.mjs --site ${slug}`);
p(`node tools/selfcheck.mjs --site ${slug}      # must PASS`);
p(`node tools/render-check.mjs --site ${slug}   # must PASS (takes a few minutes)`);
p('```');

console.log(L.join('\n'));
