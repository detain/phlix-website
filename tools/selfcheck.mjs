#!/usr/bin/env node
// selfcheck.mjs — per-kit mechanical gate for the site-regeneration program.
//
//   node tools/selfcheck.mjs --site <slug>
//   node tools/selfcheck.mjs --all
//
// Every check here corresponds to a defect that ACTUALLY SHIPPED on the
// 2026-07-04 authoring pass (see plan_site_regen.md §0 and new_site.md §19).
// The point is to stop 49 authoring agents and 49 reviewers from each
// hand-rolling the same greps — and getting them subtly wrong. The
// `abstract-canvas` pilot hand-rolled these and its link scan used
// `href="[^"#h][^"]*"`, whose `h` (meant to skip `http`) also skipped every
// internal page beginning with h — i.e. `hub.html` was never checked on any
// page.
//
// Exit 1 if any FAIL. WARNs never fail the run: they are judgement calls for a
// human reviewer, not defects.

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { globSync } from 'glob';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITES = join(ROOT, 'sites');
const SHARED = join(ROOT, 'shared');

const CANONICAL_PAGES = [
  'index.html',
  'features.html',
  'clients.html',
  'download.html',
  'plugins.html',
  'docs.html',
  'hub.html',
  'about.html',
];

/* ── WCAG contrast ─────────────────────────────────────────────────────── */

function parseHex(hex) {
  const h = hex.replace('#', '').trim();
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h;
  if (full.length !== 6 || /[^0-9a-fA-F]/.test(full)) return null;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

function relativeLuminance([r, g, b]) {
  const lin = [r, g, b]
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

/** WCAG 2.x contrast ratio between two hex colours, or null if unparseable. */
export function contrastRatio(hexA, hexB) {
  const a = parseHex(hexA);
  const b = parseHex(hexB);
  if (!a || !b) return null;
  const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/* ── checks ────────────────────────────────────────────────────────────── */

function checkSite(slug) {
  const dir = join(SITES, slug);
  const fails = [];
  const warns = [];
  const notes = [];
  const fail = (m) => fails.push(m);
  const warn = (m) => warns.push(m);

  if (!existsSync(dir)) return { slug, fails: [`sites/${slug}/ does not exist`], warns, notes };

  const htmlFiles = readdirSync(dir).filter((f) => f.endsWith('.html'));
  const cssFiles = existsSync(join(dir, 'css'))
    ? readdirSync(join(dir, 'css')).filter((f) => f.endsWith('.css'))
    : [];

  // 1. Page inventory — 8 canonical + 404 (new_site.md §1, §18.1).
  for (const p of CANONICAL_PAGES) {
    if (!htmlFiles.includes(p)) fail(`missing canonical page ${p}`);
  }
  if (!htmlFiles.includes('404.html')) fail('missing 404.html (new_site.md §2A / §18.1)');

  // 2. The bare ` * @copyright` outside a comment — broke 113 of 150 CSS files.
  for (const f of cssFiles) {
    const lines = readFileSync(join(dir, 'css', f), 'utf8').split('\n');
    lines.forEach((line, i) => {
      if (/^\s*\*\s*@/.test(line)) {
        // Only a defect if it is NOT inside a /* … */ block.
        const before = lines.slice(0, i).join('\n');
        const opens = (before.match(/\/\*/g) || []).length;
        const closes = (before.match(/\*\//g) || []).length;
        if (opens <= closes) fail(`css/${f}:${i + 1} bare "${line.trim()}" outside a comment`);
      }
    });
  }

  // 3. No external font/CDN requests anywhere (new_site.md §7 + CSP).
  for (const f of [...htmlFiles.map((h) => h), ...cssFiles.map((c) => join('css', c))]) {
    const txt = readFileSync(join(dir, f), 'utf8');
    for (const bad of ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr', 'unpkg.com']) {
      if (txt.includes(bad)) fail(`${f} references external host ${bad}`);
    }
  }

  // 4. Every @font-face src resolves to a real file in the repo.
  let faceCount = 0;
  for (const f of cssFiles) {
    const txt = readFileSync(join(dir, 'css', f), 'utf8');
    faceCount += (txt.match(/@font-face/g) || []).length;
    for (const m of txt.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
      const ref = m[1];
      if (/^(https?:)?\/\//.test(ref) || ref.startsWith('data:')) continue;
      // A same-document fragment reference — `url(#noise)`, or `url(%23noise)`
      // when it appears inside an encoded `data:image/svg+xml,…` payload — points
      // at an SVG <filter>/<gradient> id, not at a file. Trying to resolve it on
      // disk is a guaranteed false failure, and it fired on 11 sites' noise
      // textures. (These are matched because the scan walks every `url(...)` in
      // the file, including ones nested inside a data URI.)
      if (ref.startsWith('#') || /^%23/i.test(ref)) continue;
      const clean = ref.split(/[?#]/)[0];
      // Font URLs are written for the BUILT layout: build.mjs copies
      // shared/assets → dist/assets, so `../../assets/…` from
      // dist/<slug>/css/ lands in dist/assets/. In the source tree that same
      // path would be sites/assets/, which does not exist — so resolve the
      // shared-asset form against shared/ instead of failing it.
      const shared = clean.match(/(?:\.\.\/)+assets\/(.*)$/);
      const candidates = [
        resolve(dir, 'css', clean),
        ...(shared ? [join(SHARED, 'assets', shared[1])] : []),
      ];
      if (!candidates.some((p) => existsSync(p))) {
        fail(`css/${f} url(${ref}) does not resolve (tried ${candidates.join(', ')})`);
      }
    }
  }
  if (faceCount === 0) warn('no @font-face declared — is brand typography actually self-hosted?');
  notes.push(`${faceCount} @font-face rule(s)`);

  // 5. Internal links resolve. Deliberately NOT the pilot's broken regex: we
  //    parse every href, then filter by scheme, so `hub.html` is checked.
  for (const f of htmlFiles) {
    const txt = readFileSync(join(dir, f), 'utf8');
    for (const m of txt.matchAll(/href\s*=\s*"([^"]*)"/g)) {
      const raw = m[1].trim();
      if (
        raw === '' ||
        raw.startsWith('#') ||
        /^[a-z][a-z0-9+.-]*:/i.test(raw) || // http:, https:, mailto:, tel:
        raw.startsWith('//')
      ) {
        continue;
      }
      const target = raw.split(/[?#]/)[0];
      if (target === '' || target === './') continue;
      if (target.startsWith('/')) {
        fail(`${f} has absolute internal link "${raw}" — sites must be portable (§1)`);
        continue;
      }
      if (!existsSync(resolve(dir, target))) fail(`${f} links to missing "${raw}"`);
    }
  }

  // 6. 404 requirements (new_site.md §2A). Relative assets only: the root shim
  //    injects a <base>, and an absolute path defeats it.
  if (htmlFiles.includes('404.html')) {
    const txt = readFileSync(join(dir, '404.html'), 'utf8');
    if (!/name=["']robots["'][^>]*noindex/i.test(txt)) fail('404.html lacks robots noindex');
    for (const m of txt.matchAll(/(?:href|src)\s*=\s*"(\/[^"/][^"]*)"/g)) {
      fail(`404.html uses absolute asset path "${m[1]}" — must be relative`);
    }
  }

  // 7. One <h1> per page, and a skip link + main landmark (§12).
  for (const f of htmlFiles) {
    const txt = readFileSync(join(dir, f), 'utf8');
    const h1s = (txt.match(/<h1[\s>]/g) || []).length;
    if (h1s !== 1) fail(`${f} has ${h1s} <h1> elements (must be exactly 1)`);
    if (!/id=["']main-content["']/.test(txt)) warn(`${f} has no #main-content landmark`);
  }

  // 8. Nav labels match the kit's site_architecture.nav, when declared.
  const kitPath = join(ROOT, 'brand-kits', `${slug}.js`);
  if (existsSync(kitPath)) {
    const kit = readFileSync(kitPath, 'utf8');
    const navBlock = kit.match(/site_architecture:\s*\{[\s\S]*?\n {4}nav:\s*\[([\s\S]*?)\n {4}\]/);
    if (navBlock) {
      const labels = [...navBlock[1].matchAll(/label:\s*["']([^"']+)["']/g)].map((m) => m[1]);
      const home = readFileSync(join(dir, 'index.html'), 'utf8');
      const missing = labels.filter((l) => !home.includes(l));
      if (missing.length) {
        fail(`index.html is missing kit nav label(s): ${missing.join(', ')}`);
      }
      notes.push(`kit declares ${labels.length} nav label(s), all present`);
    }
  }

  // 9. Home-page section order matches homepage_narrative.sections[] ids.
  if (existsSync(kitPath)) {
    const kit = readFileSync(kitPath, 'utf8');
    const narr = kit.match(
      /homepage_narrative:\s*\{[\s\S]*?\n {4}sections:\s*\[([\s\S]*?)\n {4}\]/,
    );
    if (narr) {
      const ids = [...narr[1].matchAll(/\bid:\s*["']([^"']+)["']/g)].map((m) => m[1]);
      const home = readFileSync(join(dir, 'index.html'), 'utf8');
      const seen = ids.filter((id) => new RegExp(`id=["']${id}["']`).test(home));
      const absent = ids.filter((id) => !seen.includes(id));
      if (absent.length) fail(`index.html missing narrative section id(s): ${absent.join(', ')}`);
      const positions = seen.map((id) => home.indexOf(`id="${id}"`));
      const ordered = positions.every((p, i) => i === 0 || p > positions[i - 1]);
      if (!ordered) fail('index.html section order does not match homepage_narrative.sections[]');
      if (ids.length) notes.push(`${seen.length}/${ids.length} narrative sections in order`);
    }
  }

  // 10. Contrast matrix over the kit's declared hex palette. Reported as WARN,
  //     not FAIL: only a browser knows which pairs are actually composited.
  //     But a palette where NO pair clears 4.5:1 is a real problem.
  if (existsSync(kitPath)) {
    const kit = readFileSync(kitPath, 'utf8');
    const hexes = [...new Set((kit.match(/#[0-9a-fA-F]{6}\b/g) || []).map((h) => h.toLowerCase()))];
    let bestPairs = 0;
    for (let i = 0; i < hexes.length; i += 1) {
      for (let j = i + 1; j < hexes.length; j += 1) {
        const r = contrastRatio(hexes[i], hexes[j]);
        if (r && r >= 4.5) bestPairs += 1;
      }
    }
    notes.push(`palette: ${hexes.length} hex colours, ${bestPairs} pair(s) clear 4.5:1`);
    if (hexes.length > 1 && bestPairs === 0) {
      fail('no pair in the kit palette clears 4.5:1 — small text cannot pass AA');
    }
    // The kit's own claimed ratio is prose and is sometimes wrong (§19.1).
    const claim = kit.match(/minimum_contrast:\s*["']([^"']*?)(\d+\.?\d*):1/);
    if (claim) warn(`kit claims contrast ${claim[2]}:1 — verify by measurement, not trust (§19.1)`);
  }

  // 11. avoid_words from the kit's voice guidance.
  if (existsSync(kitPath)) {
    const kit = readFileSync(kitPath, 'utf8');
    const av = kit.match(/avoid_words:\s*\[([\s\S]*?)\]/);
    if (av) {
      const words = [...av[1].matchAll(/["']([^"']+)["']/g)].map((m) => m[1]);
      for (const f of htmlFiles) {
        const body = readFileSync(join(dir, f), 'utf8')
          .replace(/<[^>]+>/g, ' ')
          // "Skip to main content" is the WCAG-required skip link, not
          // marketing jargon. Kits that list "content" as an avoid_word mean
          // the streaming-industry sense; flagging the skip link on all 9
          // pages of all 50 sites is pure noise.
          .replace(/skip to (?:main )?content/gi, ' ');
        for (const w of words) {
          if (new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(body)) {
            warn(`${f} uses avoid_word "${w}"`);
          }
        }
      }
    }
  }

  // 12. og:image must be a committed PNG that exists (check-meta rule 5).
  const home = existsSync(join(dir, 'index.html'))
    ? readFileSync(join(dir, 'index.html'), 'utf8')
    : '';
  const og = home.match(/property=["']og:image["'][^>]*content=["']([^"']+)["']/);
  if (og && og[1].endsWith('.svg')) fail(`og:image is an SVG (${og[1]}) — platforms need a PNG`);
  if (!existsSync(join(dir, 'img', 'og.png'))) fail('img/og.png is missing');

  // 13. Required per-site docs (§9).
  for (const doc of ['SITE.md', 'BUILD_LOG.md', 'robots.txt', 'sitemap.xml']) {
    if (!existsSync(join(dir, doc))) fail(`missing ${doc}`);
  }
  // robots.txt must point at this kit's own sitemap, not the root one (§10).
  if (existsSync(join(dir, 'robots.txt'))) {
    const rt = readFileSync(join(dir, 'robots.txt'), 'utf8');
    if (!rt.includes(`/${slug}/sitemap.xml`)) {
      fail(`robots.txt does not reference /${slug}/sitemap.xml (§10)`);
    }
  }

  // 14. JS budget for opt-in experience code (§2A, ~15 KB).
  const jsDir = join(dir, 'js');
  if (existsSync(jsDir)) {
    const bytes = readdirSync(jsDir)
      .filter((f) => f.endsWith('.js'))
      .reduce((n, f) => n + statSync(join(jsDir, f)).size, 0);
    notes.push(`js ${(bytes / 1024).toFixed(1)} KB`);
    // Runaway signal only. Site richness outranks the byte count (§2A, owner
    // ruling 2026-07-25) — a more detailed, more distinctive layout is worth
    // more than sitting under an arbitrary target, and hand-written JS is not
    // where user-perceived performance actually goes.
    if (bytes > 40 * 1024) {
      warn(`js is ${(bytes / 1024).toFixed(1)} KB — unusually large, check for dead code`);
    }
  }

  // 15. No font weight the kit never declared (new_site.md §19.17).
  //
  // Two kits shipped @font-face rules for weights their kit does not declare,
  // and one also used `font-weight: 700` in two nav rules against a family whose
  // declared union is 400/500/600/800/900. A reviewer verified 700 *resolved* and
  // that nothing *assumed* 600 was bold — both true — and never checked 700
  // against `fonts{}`. The shared pool holds weights a given kit must not use, so
  // presence in the pool is not permission.
  const declaredByFamily = KIT_WEIGHTS.get(slug);
  if (declaredByFamily) {
    const anyWeight = new Set();
    for (const set of declaredByFamily.values()) for (const w of set) anyWeight.add(w);
    for (const f of cssFiles) {
      const css = readFileSync(join(dir, 'css', f), 'utf8');

      // (a) @font-face family/weight pairs — the family is named in the rule, so
      //     this is exact.
      for (const m of css.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
        const fam = m[1].match(/font-family:\s*([^;]+);/);
        const wt = m[1].match(/font-weight:\s*(\d{3})\s*;/);
        if (!fam || !wt) continue;
        const key = fam[1].replace(/['"]/g, '').trim().toLowerCase();
        const w = Number(wt[1]);
        const declared = declaredByFamily.get(key);
        if (!declared) continue; // family not in this kit — a different rule's business
        if (!declared.has(w)) {
          fail(
            `css/${f}: @font-face ${fam[1].trim()} weight ${w} — kit declares only ` +
              `${[...declared].sort((a, b) => a - b).join(', ')} for this family (§19.17)`,
          );
        }
      }

      // (b) any numeric font-weight declared for NO family in the kit. Resolving
      //     which family a rule inherits needs full cascade evaluation, but a
      //     weight the kit never names anywhere cannot be right regardless.
      const outsideFaces = css.replace(/@font-face\s*\{[^}]*\}/g, '');
      for (const m of outsideFaces.matchAll(/font-weight:\s*(\d{3})\b/g)) {
        const w = Number(m[1]);
        if (anyWeight.has(w)) continue;
        const line = outsideFaces.slice(0, m.index).split('\n').length;
        warn(
          `css/${f}:${line}: font-weight: ${w} — declared for no family in this kit ` +
            `(kit declares ${[...anyWeight].sort((a, b) => a - b).join(', ')}) (§19.17)`,
        );
      }
    }
  }

  // 16. Every SVG must be well-formed XML (new_site.md §1).
  //
  // autumn-harvest shipped a favicon whose banner was a CSS-style /* … */ block.
  // SVG is XML, so the file failed to parse and the site rendered NO favicon at
  // all — invisible in review because a missing favicon looks like a default one.
  // Same shape as the `@copyright`-outside-a-comment CSS bug in check 2: a
  // comment syntax borrowed from the wrong language.
  const svgFiles = existsSync(join(dir, 'img'))
    ? readdirSync(join(dir, 'img')).filter((f) => f.endsWith('.svg'))
    : [];
  for (const f of svgFiles) {
    const txt = readFileSync(join(dir, 'img', f), 'utf8');
    const head = txt.replace(/^\uFEFF/, '').trimStart();
    if (head.startsWith('/*')) {
      fail(
        `img/${f}: starts with a CSS-style /* … */ comment — SVG is XML and will not parse; use <!-- … -->`,
      );
    } else if (!head.startsWith('<')) {
      fail(`img/${f}: does not begin with '<' — not well-formed XML, so nothing will render it`);
    } else if (!/<svg[\s>]/.test(txt)) {
      fail(`img/${f}: no <svg> element`);
    }
  }

  // 17. Every site CSS/JS asset carries a `@copyright` header.
  //
  // The wave-1 regen dropped the header from `swiss-modernist/css/{base,theme,
  // components}.css` and `abstract-canvas/css/nojs.css` — 4 of 203 site assets.
  // Nothing caught it: check 2 only verifies that an `@copyright` which IS
  // present sits inside a comment, so deleting the banner outright passed
  // cleanly. Authors write these files from scratch per kit, so this recurs on
  // every wave unless it is gated.
  //
  // Deliberately a `fail`, not a warn: the repo's own licence terms are what
  // ask for the notice, so a missing one is a compliance defect rather than a
  // style preference. Only the header's presence is checked — the banner's
  // wording is the kit author's.
  const assetFiles = [
    ...cssFiles.map((f) => join('css', f)),
    ...(existsSync(join(dir, 'js'))
      ? readdirSync(join(dir, 'js'))
          .filter((f) => f.endsWith('.js'))
          .map((f) => join('js', f))
      : []),
  ];
  for (const rel of assetFiles) {
    if (!readFileSync(join(dir, rel), 'utf8').includes('@copyright')) {
      fail(`${rel}: no @copyright header (new_site.md §19.24)`);
    }
  }

  return { slug, fails, warns, notes };
}

/* ── cli ───────────────────────────────────────────────────────────────── */

const argv = process.argv.slice(2);
const siteFlag = argv.indexOf('--site');
const slugArg = siteFlag === -1 ? null : argv[siteFlag + 1];
const all = argv.includes('--all');

if (!all && !slugArg) {
  console.error('usage: node tools/selfcheck.mjs --site <slug> | --all');
  process.exit(1);
}

const slugs = all
  ? globSync('*/index.html', { cwd: SITES })
      .map((p) => p.split('/')[0])
      .sort()
  : [slugArg];

/* family (lower-case) -> Set(declared weights), per slug. Imported rather than
   regex-parsed: a family routinely serves several roles at different weights
   (swiss-modernist declares Inter at [400,500] body, [500,600] ui, [800,900]
   headline), so the permitted set is the UNION across roles and getting that
   wrong would fail a weight the kit openly declares. */
const KIT_WEIGHTS = new Map();
for (const slug of slugs) {
  const kitPath = join(ROOT, 'brand-kits', `${slug}.js`);
  if (!existsSync(kitPath)) continue;
  try {
    const kit = (await import(pathToFileURL(kitPath).href)).default;
    const byFamily = new Map();
    for (const spec of Object.values(kit.fonts ?? {})) {
      if (!spec || typeof spec !== 'object' || !spec.family) continue;
      const key = String(spec.family).trim().toLowerCase();
      if (!byFamily.has(key)) byFamily.set(key, new Set());
      const ws = (Array.isArray(spec.weight) ? spec.weight : [spec.weight])
        .map(Number)
        .filter(Number.isFinite);
      for (const w of ws) byFamily.get(key).add(w);
    }
    if (byFamily.size) KIT_WEIGHTS.set(slug, byFamily);
  } catch {
    // A kit that will not import is already reported by the other checks.
  }
}

let failed = 0;
for (const slug of slugs) {
  const r = checkSite(slug);
  const status = r.fails.length ? 'FAIL' : 'PASS';
  console.log(`\n[${status}] ${slug}${r.notes.length ? `  — ${r.notes.join('; ')}` : ''}`);
  for (const m of r.fails) console.log(`   ✗ ${m}`);
  for (const m of r.warns) console.log(`   ⚠ ${m}`);
  if (r.fails.length) failed += 1;
}

console.log(
  `\n[selfcheck] ${slugs.length - failed}/${slugs.length} site(s) pass` +
    (failed ? ` — ${failed} FAILED` : ''),
);
if (!existsSync(join(SHARED, 'content.json'))) {
  console.error('[selfcheck] shared/content.json missing — run from the repo root');
  process.exit(1);
}
process.exit(failed ? 1 : 0);
