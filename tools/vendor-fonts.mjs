#!/usr/bin/env node
/**
 * tools/vendor-fonts.mjs
 *
 * Vendors every brand kit's real webfonts as self-hosted, latin-subset WOFF2 and
 * emits the matching `@font-face` CSS into each site.
 *
 * WHY: typography is a primary brand-kit dimension (`brand-kits/<slug>.js` →
 * `fonts{}`), and it was not rendering on 45 of 50 sites — broken `src` paths,
 * `src: local()`-only blocks, or an external `fonts.googleapis.com` <link> that
 * both violates new_site.md §7 ("self-host fonts, no CDNs") and the documented
 * CSP in `_headers` (`font-src 'self'`). See plan_site_regen.md §0.4.
 *
 * LAYOUT DECISION — one shared, deduplicated pool, not 50 per-site copies:
 *
 *   binaries   shared/assets/fonts/<family>-<weight>-latin.woff2
 *   published  tools/build.mjs copies shared/assets/ → dist/assets/, so the pool
 *              lands at /assets/fonts/<file>.woff2
 *   referenced from sites/<slug>/css/base.css as ../../assets/fonts/<file>.woff2
 *              → dist/<slug>/css/base.css + ../../ = dist/assets/fonts/  ✔
 *              → tools/dev-server.mjs serves /assets/* from shared/assets/  ✔
 *
 * The 70 families × 173 family/weight faces the kits name are shared heavily
 * across kits (Cormorant Garamond alone is used by 24 kit roles), so per-site
 * copies would multiply the same bytes many times over for no benefit.
 *
 * Sources & licences live in the committed `shared/data/font-sources.json`, which
 * records, per family: the resolved upstream family, the licence (SPDX id + name
 * + URL), whether it is a substitution and for what, and the per-weight files.
 *
 * USAGE
 *   node tools/vendor-fonts.mjs --sources                   # resolve families → shared/data/font-sources.json
 *   node tools/vendor-fonts.mjs --download                  # fetch missing WOFF2 into the pool (skips present files)
 *   node tools/vendor-fonts.mjs --emit --site <slug> [...]   # write CSS + de-CDN the HTML for those sites
 *   node tools/vendor-fonts.mjs --emit --all                 # ditto for every site under sites/
 *   node tools/vendor-fonts.mjs --check --all                # verify: 0 unresolved src, 0 external font refs
 *   node tools/vendor-fonts.mjs --report --all               # per-site font state, no writes
 *
 * `--sources`, `--download`, `--emit`, `--report` and `--check` are the verbs;
 * `--site`/`--all` select which sites the verb applies to. Flags may be combined
 * and run in the order above. Every stage is idempotent: `--download` skips files
 * already on disk, and `--emit` replaces its own sentinel-delimited block rather
 * than appending a second copy.
 *
 * Extra flags
 *   --strip-all   also remove `@font-face` blocks that DO resolve to a per-site
 *                 file (full migration onto the pool). Default only removes the
 *                 broken / external / local()-only ones.
 *   --dry-run     print what would change, write nothing.
 *
 * @copyright Copyright (c) 2026 Joe Huss <detain@interserver.net>
 * @license   BSD-3-Clause
 */

import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { basename, dirname, join, posix, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const KITS_DIR = join(ROOT, 'brand-kits');
const SITES_DIR = join(ROOT, 'sites');
const POOL_DIR = join(ROOT, 'shared', 'assets', 'fonts');
const SOURCES_FILE = join(ROOT, 'shared', 'data', 'font-sources.json');

/** Relative href from sites/<slug>/css/*.css to the published pool at /assets/fonts/. */
const WEB_PREFIX = '../../assets/fonts';

/**
 * A modern browser UA is required: fonts.googleapis.com content-negotiates and
 * only hands back WOFF2 `src:` URLs to UAs it believes support them. With node's
 * default UA it returns TrueType, which would need a local ttf→woff2 conversion.
 */
const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const GF_METADATA_URL = 'https://fonts.google.com/metadata/fonts';
const GF_REPO_RAW = 'https://raw.githubusercontent.com/google/fonts/main';

/**
 * google/fonts stores each family under a licence-named directory; that directory
 * IS the licence statement, so probing it is an authoritative check rather than a
 * guess. Anything that resolves to none of these is not redistributable from here
 * and must be substituted.
 */
const LICENCE_DIRS = {
  ofl: { spdx: 'OFL-1.1', name: 'SIL Open Font License 1.1', file: 'OFL.txt' },
  apache: { spdx: 'Apache-2.0', name: 'Apache License 2.0', file: 'LICENSE.txt' },
  ufl: { spdx: 'Ubuntu-font-1.0', name: 'Ubuntu Font Licence 1.0', file: 'UFL.txt' },
};

/**
 * Families a kit names that cannot be sourced licence-cleanly under their own
 * name, mapped to an openly-licensed stand-in. Keep this list SHORT and loud —
 * every entry is a deliberate, reviewable design compromise, and it is copied
 * verbatim into shared/data/font-sources.json so the substitution is never
 * silent. `weightMap` maps the kit's requested weight onto the substitute's.
 */
const SUBSTITUTIONS = {
  'Fredoka One': {
    family: 'Fredoka',
    weightMap: { 400: 600 },
    reason:
      'Fredoka One was retired from the Google Fonts catalogue: it is absent from ' +
      'the family metadata and its google/fonts directory (ofl/fredokaone) 404s, so ' +
      'there is no licence file to redistribute under. Fredoka is its official ' +
      'successor by the same designer (Milena Brandao / Hafontia), OFL-1.1, same ' +
      'rounded geometric single-storey design; weight 600 matches Fredoka One’s ' +
      'optical weight.',
  },
};

/** CSS generic font keywords — these must stay unquoted or they stop being generics. */
const GENERIC_FAMILIES = new Set([
  'serif',
  'sans-serif',
  'monospace',
  'cursive',
  'fantasy',
  'system-ui',
  'ui-serif',
  'ui-sans-serif',
  'ui-monospace',
  'ui-rounded',
  'math',
  'emoji',
  'fangsong',
]);

/** Fallback generic per Google Fonts category, used only if a stack lacks one. */
const CATEGORY_GENERIC = {
  Serif: 'serif',
  'Sans Serif': 'sans-serif',
  Monospace: 'monospace',
  Display: 'sans-serif',
  Handwriting: 'cursive',
};

const BEGIN = '/* vendor-fonts:begin — generated by tools/vendor-fonts.mjs; do not edit by hand */';
const END = '/* vendor-fonts:end */';

// ---------------------------------------------------------------------------
// small helpers
// ---------------------------------------------------------------------------

/**
 * `Barlow Semi Condensed` → `barlow-semi-condensed` (pool filename stem).
 * Word boundaries only — `JetBrains Mono` stays `jetbrains-mono`, matching the
 * filenames the already-working sites (chrome-velocity, street-mural) use.
 */
function familySlug(family) {
  return family
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** `Playfair Display` → `playfairdisplay` (google/fonts repo directory name). */
function repoSlug(family) {
  return family.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** Quote a family name unless it is a CSS generic keyword. */
function cssFamily(name) {
  const n = String(name).trim();
  return GENERIC_FAMILIES.has(n.toLowerCase()) ? n.toLowerCase() : `'${n.replace(/'/g, "\\'")}'`;
}

async function getText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function headOk(url) {
  const res = await fetch(url, { method: 'GET', headers: { 'User-Agent': UA } });
  return res.ok;
}

/**
 * Write JSON exactly as prettier would print it — `shared/ ** /*.json` is in the
 * `npm run format:check` gate, and prettier collapses short arrays onto one line,
 * which `JSON.stringify(_, null, 2)` never does. Use the repo's own prettier (and
 * therefore the repo's .prettierrc) so the gate stays green; fall back to plain
 * stringify with a warning if it is not installed.
 */
async function writeJson(file, value) {
  mkdirSync(dirname(file), { recursive: true });
  const raw = `${JSON.stringify(value, null, 2)}\n`;
  try {
    const prettier = await import('prettier');
    const opts = (await prettier.resolveConfig(file)) ?? {};
    writeFileSync(file, await prettier.format(raw, { ...opts, filepath: file }), 'utf8');
  } catch (err) {
    console.warn(
      `[fonts] prettier unavailable (${err.message}); ${relative(ROOT, file)} may fail format:check`,
    );
    writeFileSync(file, raw, 'utf8');
  }
}

/**
 * Normalise a numeric CSS value the way prettier does, so the generated block
 * survives `format:check` untouched: `0.0em` → `0em`, `1.50` → `1.5`. Kits carry
 * both forms in `tracking` / `line_height`.
 */
function cssNum(value) {
  const m = String(value).trim().match(/^(-?(?:\d+\.?\d*|\.\d+))([a-z%]*)$/i);
  if (!m) return String(value).trim();
  return `${Number(m[1])}${m[2]}`;
}

// ---------------------------------------------------------------------------
// kit inventory
// ---------------------------------------------------------------------------

/** Every brand kit as `{ slug, fonts }`, sorted by slug. */
async function loadKits() {
  const out = [];
  for (const file of readdirSync(KITS_DIR).filter((f) => f.endsWith('.js')).sort()) {
    let kit;
    try {
      const mod = await import(pathToFileURL(join(KITS_DIR, file)).href);
      kit = mod.default ?? mod.brandKit;
    } catch (err) {
      console.warn(`[fonts] skipping ${file}: ${err.message}`);
      continue;
    }
    if (!kit || typeof kit !== 'object') continue;
    out.push({ slug: kit.slug || basename(file, '.js'), fonts: kit.fonts || {} });
  }
  return out;
}

/**
 * Normalise one kit's `fonts{}` into roles: `{ role, family, weights, stack,
 * tracking, lineHeight }`. Roles may be absent, and several roles routinely share
 * one family (e.g. `headline` and `number`).
 */
// HISTORY — read before force-injecting a weight for "prose roles" (body/ui/mono).
// A previous version of this file did exactly that, injecting
// weight 700 into every prose role, on the theory that no kit ever *declares*
// 700 because `bolder` on 400 computes to it. That theory was wrong twice over:
//
//   1. Several kits DO declare 700 (pixel-dungeon body/ui [400,700], several
//      mono roles [400,700]), and several deliberately CAP at [400,500]
//      (cottagecore-bloom Lora, neon-noir IBM Plex Serif, swiss-modernist Inter
//      body). Injecting 700 silently overrode the kit's own design decision.
//   2. The injection reached the per-site EMIT path, not just pool acquisition,
//      so 50 sites got `@font-face` rules for a weight their kit never asked
//      for. Two audited kits had shipped exactly that, and one shipped a
//      `font-weight: 700` face whose `src` was the 500 file (see the clamp guard
//      in emitCss) — a lie to the font matcher, so `font-weight: 700` rendered
//      the 500 face.
//
// Per-site CSS must contain ONLY the weights the kit declares. A kit that caps
// its body face and still wants emphasis uses a declared weight or a second
// channel — see new_site.md §19.17, and the "### Emphasis" block that
// tools/kit-brief.mjs computes per kit. The shared pool may legitimately hold
// extra weights; presence in the pool is not permission to reference one.

function kitRoles(kit) {
  const roles = [];
  for (const [role, spec] of Object.entries(kit.fonts)) {
    if (!spec || typeof spec !== 'object' || !spec.family) continue;
    const weights = (Array.isArray(spec.weight) ? spec.weight : [spec.weight])
      .filter((w) => w != null)
      .map((w) => String(w));
    roles.push({
      role,
      family: spec.family,
      weights: weights.length ? [...new Set(weights)].sort((a, b) => +a - +b) : ['400'],
      fallbacks: Array.isArray(spec.fallbacks) ? spec.fallbacks : [],
      tracking: spec.tracking ?? null,
      lineHeight: spec.line_height ?? null,
    });
  }
  return roles;
}

/** family → { weights:Set<string>, uses:string[] } across every kit. */
function inventory(kits) {
  const fams = new Map();
  for (const kit of kits) {
    for (const r of kitRoles(kit)) {
      if (!fams.has(r.family)) fams.set(r.family, { weights: new Set(), uses: [] });
      const e = fams.get(r.family);
      for (const w of r.weights) e.weights.add(w);
      e.uses.push(`${kit.slug}:${r.role}`);
    }
  }
  return fams;
}

// ---------------------------------------------------------------------------
// --sources : resolve every family to a real, licence-checked upstream
// ---------------------------------------------------------------------------

async function buildSources(kits) {
  const fams = inventory(kits);
  console.log(
    `[fonts] ${fams.size} distinct families, ` +
      `${[...fams.values()].reduce((n, f) => n + f.weights.size, 0)} family/weight faces`,
  );

  console.log('[fonts] fetching Google Fonts family metadata…');
  const meta = JSON.parse(await getText(GF_METADATA_URL)).familyMetadataList;
  const byFamily = new Map(meta.map((f) => [f.family, f]));

  const licenceCache = new Map();
  /** Probe google/fonts for `family` and return its licence, or null. */
  async function licenceFor(family) {
    if (licenceCache.has(family)) return licenceCache.get(family);
    const slug = repoSlug(family);
    let found = null;
    for (const [dir, lic] of Object.entries(LICENCE_DIRS)) {
      if (await headOk(`${GF_REPO_RAW}/${dir}/${slug}/METADATA.pb`)) {
        found = { ...lic, url: `${GF_REPO_RAW}/${dir}/${slug}/${lic.file}` };
        break;
      }
    }
    licenceCache.set(family, found);
    return found;
  }

  const families = {};
  const problems = [];

  for (const family of [...fams.keys()].sort()) {
    const { weights, uses } = fams.get(family);
    const sub = SUBSTITUTIONS[family] || null;
    const upstream = sub ? sub.family : family;
    const m = byFamily.get(upstream);

    if (!m) {
      problems.push(`${family}: not in the Google Fonts catalogue and no substitution configured`);
      continue;
    }
    const licence = await licenceFor(upstream);
    if (!licence) {
      problems.push(`${family}: no licence directory in google/fonts for "${upstream}"`);
      continue;
    }
    if (!(m.subsets || []).includes('latin')) {
      problems.push(`${family}: upstream "${upstream}" has no latin subset`);
      continue;
    }

    // Instance weights the css2 API will actually serve (roman only).
    const available = Object.keys(m.fonts || {})
      .filter((k) => !k.endsWith('i'))
      .map(Number)
      .sort((a, b) => a - b);

    /** Nearest served weight to `want`, with the substitution's own map applied first. */
    const resolveWeight = (want) => {
      const mapped = sub && sub.weightMap && sub.weightMap[want] != null ? +sub.weightMap[want] : +want;
      if (available.includes(mapped)) return mapped;
      return available.reduce((best, w) =>
        Math.abs(w - mapped) < Math.abs(best - mapped) ? w : best,
      );
    };

    const wanted = [...weights].sort((a, b) => +a - +b);
    const sourceWeights = [...new Set(wanted.map(resolveWeight))].sort((a, b) => a - b);

    // One css2 request per family gets every needed weight in one response.
    const spec = `${upstream.replace(/\s+/g, '+')}:wght@${sourceWeights.join(';')}`;
    const css = await getText(
      `https://fonts.googleapis.com/css2?family=${spec}&display=swap`,
    );
    const latin = latinFaces(css);

    const faces = {};
    for (const want of wanted) {
      const sw = resolveWeight(want);
      const url = latin.get(String(sw));
      if (!url) {
        problems.push(`${family}: css2 returned no basic-latin face for weight ${sw}`);
        continue;
      }
      faces[want] = {
        file: `${familySlug(upstream)}-${sw}-latin.woff2`,
        url,
        sourceWeight: sw,
        clamped: sw !== +want,
      };
    }

    families[family] = {
      source: 'google-fonts',
      sourceFamily: upstream,
      category: m.category || null,
      licence: { spdx: licence.spdx, name: licence.name, url: licence.url },
      substitution: sub
        ? { requested: family, resolved: upstream, reason: sub.reason }
        : null,
      weights: wanted,
      faces,
      usedBy: uses,
    };
    const flag = sub ? ' [SUBSTITUTED]' : '';
    const clamps = Object.entries(faces)
      .filter(([, f]) => f.clamped)
      .map(([w, f]) => `${w}→${f.sourceWeight}`);
    console.log(
      `[fonts] ${family} → ${upstream} (${licence.spdx}) ` +
        `${wanted.join('/')}${clamps.length ? ` clamped ${clamps.join(',')}` : ''}${flag}`,
    );
  }

  const payload = {
    $schema: 'https://phlix.dev/schema/font-sources-1.json',
    description:
      'Resolved, licence-checked upstream source for every font family named by a ' +
      'brand kit (brand-kits/*.js → fonts{}.family). Generated by ' +
      'tools/vendor-fonts.mjs --sources. Binaries are vendored latin-subset WOFF2 ' +
      'under shared/assets/fonts/ and published at /assets/fonts/ by tools/build.mjs.',
    generatedBy: 'tools/vendor-fonts.mjs --sources',
    pool: relative(ROOT, POOL_DIR),
    webPrefix: WEB_PREFIX,
    families,
  };
  await writeJson(SOURCES_FILE, payload);
  console.log(
    `[fonts] wrote ${relative(ROOT, SOURCES_FILE)} — ${Object.keys(families).length} families, ` +
      `${new Set(Object.values(families).flatMap((f) => Object.values(f.faces).map((x) => x.file))).size} pool files`,
  );
  if (problems.length) {
    console.error(`[fonts] ${problems.length} UNRESOLVED:`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exitCode = 1;
  }
  return payload;
}

/**
 * Pick the basic-latin `@font-face` out of a css2 response, per weight.
 *
 * Latin-only families label their blocks `/* latin *\/`, but CJK families (Noto
 * Sans JP, M PLUS 1p, Black Han Sans, …) are split into 100+ numbered slices with
 * no subset comments at all. The one reliable signal in both shapes is the
 * unicode-range: exactly one block per weight starts at `U+0000-00FF`, which is
 * the basic-latin slice.
 */
function latinFaces(css) {
  const out = new Map();
  for (const m of css.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
    const body = m[1];
    if (!/unicode-range:\s*U\+0000-00FF\b/i.test(body)) continue;
    const weight = (body.match(/font-weight:\s*([^;]+);/) || [])[1]?.trim();
    const url = (body.match(/url\(\s*([^)\s]+?)\s*\)/) || [])[1]?.replace(/^['"]|['"]$/g, '');
    if (weight && url) out.set(weight, url);
  }
  return out;
}

// ---------------------------------------------------------------------------
// --download : populate the shared pool, skipping what is already there
// ---------------------------------------------------------------------------

async function download(sources, { dryRun }) {
  mkdirSync(POOL_DIR, { recursive: true });
  const want = new Map(); // file → url
  for (const fam of Object.values(sources.families)) {
    for (const face of Object.values(fam.faces)) want.set(face.file, face.url);
  }

  let fetched = 0;
  let skipped = 0;
  let bytes = 0;
  for (const [file, url] of [...want].sort()) {
    const dest = join(POOL_DIR, file);
    if (existsSync(dest) && statSync(dest).size > 0) {
      skipped++;
      bytes += statSync(dest).size;
      continue;
    }
    if (dryRun) {
      console.log(`[fonts] would download ${file}`);
      fetched++;
      continue;
    }
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status} downloading ${url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    // WOFF2 files start with the `wOF2` signature — refuse to write anything else
    // (a proxy error page would otherwise land on disk as a "font").
    if (buf.subarray(0, 4).toString('latin1') !== 'wOF2') {
      throw new Error(`${url} is not a WOFF2 file (bad signature)`);
    }
    writeFileSync(dest, buf);
    bytes += buf.length;
    fetched++;
    console.log(`[fonts] + ${file} (${(buf.length / 1024).toFixed(1)} KB)`);
  }
  console.log(
    `[fonts] pool: ${want.size} files (${fetched} fetched, ${skipped} already present), ` +
      `${(bytes / 1024 / 1024).toFixed(2)} MB total`,
  );

  // Files no family maps to any more (a renamed slug, a dropped weight). Report
  // them rather than deleting behind the operator's back; `--prune` removes them.
  const orphans = readdirSync(POOL_DIR)
    .filter((f) => f.endsWith('.woff2') && !want.has(f))
    .sort();
  for (const o of orphans) {
    if (has('--prune') && !dryRun) {
      rmSync(join(POOL_DIR, o));
      console.log(`[fonts] - ${o} (orphan, pruned)`);
    } else {
      console.warn(`[fonts] orphan in pool (no family maps to it): ${o} — remove with --prune`);
    }
  }
}

// ---------------------------------------------------------------------------
// per-site emission
// ---------------------------------------------------------------------------

/** All `*.css` under a site, recursively. */
function siteCss(dir) {
  const out = [];
  (function walk(d) {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.css')) out.push(p);
    }
  })(dir);
  return out.sort();
}

/**
 * Resolve a `url()` from a site stylesheet to the file it will actually be served
 * from, in the layout `tools/build.mjs` publishes.
 *
 * build.mjs copies `sites/<slug>/` → `dist/<slug>/` and `shared/assets/` →
 * `dist/assets/`, so a `../../assets/...` href from `dist/<slug>/css/*.css`
 * resolves to `dist/assets/...` — which lives at `shared/assets/...` in the
 * source tree, NOT at `sites/assets/...`. Resolving naively against the source
 * tree would report every pool reference as broken.
 */
function resolveRef(cssFile, raw) {
  const rel = relative(SITES_DIR, cssFile);
  if (!rel.startsWith('..')) {
    const virt = posix.normalize(posix.join(posix.dirname(rel.split('\\').join('/')), raw));
    if (virt.startsWith('assets/')) return join(ROOT, 'shared', virt);
  }
  return resolve(dirname(cssFile), raw);
}

/**
 * Classify one `@font-face` body.
 * - `external` — pulls from a CDN (breaks CSP `font-src 'self'` + new_site.md §7)
 * - `missing`  — a relative url() that resolves to no file on disk
 * - `localonly`— `src: local(...)` with no url() at all, i.e. no webfont ships
 * - `resolved` — a relative url() that really exists
 */
function classifyFace(body, cssFile) {
  let sawUrl = false;
  let external = false;
  let missing = false;
  for (const u of body.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
    const raw = u[1].trim();
    if (raw.startsWith('data:')) continue;
    sawUrl = true;
    if (/^(https?:)?\/\//.test(raw)) external = true;
    else if (!existsSync(resolveRef(cssFile, raw.split(/[?#]/)[0]))) missing = true;
  }
  if (external) return 'external';
  if (missing) return 'missing';
  if (!sawUrl) return /local\(/.test(body) ? 'localonly' : 'empty';
  return 'resolved';
}

/**
 * Placeholder left where a rule/element was removed, so that the banner comment
 * above it can be recognised as labelling nothing and dropped with it. Stripped
 * again before the file is written; the token never occurs in CSS or HTML.
 */
const MARK = '@@VF_REMOVED@@';
const MARK_RE = new RegExp(`(?:${MARK})+`, 'g');

/** CSS `/* … *\/` comment source pattern. */
const CSS_COMMENT = '\\/\\*[^*]*(?:\\*(?!\\/)[^*]*)*\\*\\/';
/** HTML `<!-- … -->` comment source pattern. */
const HTML_COMMENT = '<!--(?:(?!-->)[\\s\\S])*?-->';

/**
 * Matcher for a banner comment sitting directly above one or more removed items
 * (only whitespace and other markers in between) — a heading over nothing.
 */
function orphanBannerRe(commentPattern) {
  return new RegExp(
    `[ \\t]*${commentPattern}[ \\t]*\\r?\\n?(?=(?:${MARK}|[ \\t\\r\\n])*${MARK})`,
    'g',
  );
}

/**
 * Strip the stale `@font-face` blocks (and any `@import` that only pulled stale
 * ones) out of a site's CSS. Returns `{ text, removed, kept }`.
 *
 * `@font-face` bodies never nest braces, so `\{[^}]*\}` is an exact match here.
 * A banner comment that mentioned fonts and now labels only removed rules is
 * dropped with them, so we do not leave a heading over nothing.
 */
function stripStaleFaces(text, cssFile, { stripAll }) {
  const removed = [];
  const kept = [];
  let out = text.replace(/@font-face\s*\{[^}]*\}[ \t]*\r?\n?/g, (block) => {
    const body = block.slice(block.indexOf('{') + 1, block.lastIndexOf('}'));
    const kind = classifyFace(body, cssFile);
    const family = (body.match(/font-family:\s*([^;]+);/) || [])[1]?.trim() ?? '?';
    if (kind === 'resolved' && !stripAll) {
      kept.push(family);
      return block;
    }
    removed.push({ family, kind });
    return MARK;
  });
  out = out.replace(orphanBannerRe(CSS_COMMENT), (c) =>
    /font/i.test(c) && !c.includes(BEGIN) ? '' : c,
  );
  return { text: out.replace(MARK_RE, ''), removed, kept };
}

/** Remove `@import` of a font stylesheet whose faces we just superseded. */
function stripFontImports(text, cssFile) {
  const removed = [];
  const out = text.replace(/@import\s+(?:url\()?\s*['"]?([^'")\s;]+)['"]?\s*\)?\s*;?[^\n]*\n?/g, (whole, href) => {
    if (!/fonts?/i.test(href)) return whole;
    const target = resolveRef(cssFile, href.split(/[?#]/)[0]);
    // Only drop it when the imported sheet is a font sheet we are replacing.
    if (/^(https?:)?\/\//.test(href) && /fonts\.googleapis\.com/.test(href)) {
      removed.push(href);
      return '';
    }
    if (!existsSync(target)) {
      removed.push(href);
      return '';
    }
    const imported = readFileSync(target, 'utf8');
    if (!/@font-face/.test(imported)) return whole;
    const stale = [...imported.matchAll(/@font-face\s*\{[^}]*\}/g)].every(
      (m) => classifyFace(m[0], target) !== 'resolved',
    );
    if (stale) {
      removed.push(href);
      return '';
    }
    return whole;
  });
  return { text: out, removed };
}

/** Collapse the blank-line runs a removal leaves behind, so prettier stays happy. */
function tidy(text) {
  return text.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n');
}

/**
 * The generated block: `@font-face` per family/weight, then a `:root` that
 * restates each role's stack from the kit (family + its own `fallbacks[]`) plus
 * the kit's `tracking` / `line_height` under the repo's existing
 * `--tracking-<role>` / `--lh-<role>` names.
 *
 * It goes at the END of base.css on purpose: the site's own `:root` is earlier in
 * the file, so these declarations win and the kit stays the source of truth.
 */
function managedBlock(kit, sources) {
  const roles = kitRoles(kit);
  const faces = new Map(); // `family|weight` → line data, deduped across roles
  const unresolved = [];
  const clamped = []; // requested weights with no upstream face, declared at their real weight

  for (const r of roles) {
    const src = sources.families[r.family];
    if (!src) {
      unresolved.push(`${r.role}: ${r.family}`);
      continue;
    }
    for (const w of r.weights) {
      const face = src.faces[w];
      if (!face) {
        unresolved.push(`${r.role}: ${r.family} ${w}`);
        continue;
      }
      // `src.faces` is keyed by the REQUESTED weight, but `file` is the weight the
      // upstream actually serves — `resolveWeight` clamps to the nearest instance
      // and records `clamped`. Emitting the requested weight with a clamped file
      // declares a face that does not exist: one kit shipped
      // `font-weight: 700; src: dm-mono-500-latin.woff2`, so every
      // `font-weight: 700` against DM Mono silently rendered the 500 face.
      //
      // Declare the face at the weight the FILE really is. The family then
      // genuinely has no 700, the browser synthesises or picks the nearest per the
      // CSS font-matching algorithm, and nothing lies about what it is.
      // Two different things arrive here as `clamped`, and only one is a defect:
      //
      //   a) a documented SUBSTITUTION with an explicit weightMap (Fredoka One 400
      //      → Fredoka 600). Deliberate, recorded in font-sources.json, reviewed,
      //      and already shipped on 5 sites. The stand-in face genuinely represents
      //      the requested weight, so keep the requested weight and leave it alone.
      //   b) no upstream instance for the requested weight (DM Mono 700). Nobody
      //      decided this; it silently produced `font-weight: 700` backed by the
      //      500 file. Declare it at the weight the file really is.
      const substituted = Boolean(src.substitution);
      const realWeight = face.clamped && !substituted ? String(face.sourceWeight) : w;
      if (face.clamped && !substituted) {
        clamped.push(
          `${r.role}: ${r.family} ${w} → declared as ${realWeight} (no ${w} face upstream)`,
        );
      }
      faces.set(`${r.family}|${realWeight}`, {
        family: r.family,
        weight: realWeight,
        file: face.file,
      });
    }
  }

  const lines = [BEGIN];
  lines.push('');
  lines.push('/* Brand typography for this kit — families, weights and fallback stacks come');
  lines.push(' * from brand-kits/<slug>.js `fonts{}`; the WOFF2 files are the shared,');
  lines.push(' * latin-subset pool in shared/assets/fonts/, published at /assets/fonts/ by');
  lines.push(' * tools/build.mjs. Regenerate with `node tools/vendor-fonts.mjs --site <slug>`. */');
  for (const f of [...faces.values()].sort(
    (a, b) => a.family.localeCompare(b.family) || +a.weight - +b.weight,
  )) {
    lines.push('@font-face {');
    lines.push(`  font-family: ${cssFamily(f.family)};`);
    lines.push('  font-style: normal;');
    lines.push(`  font-weight: ${f.weight};`);
    lines.push('  font-display: swap;');
    lines.push(`  src: url('${WEB_PREFIX}/${f.file}') format('woff2');`);
    lines.push('}');
  }

  // Role variables are NOT emitted here: a second `:root` in the same stylesheet
  // trips stylelint's `no-duplicate-selectors`, which the repo enforces. They are
  // merged into the site's existing `:root` by applyRootVars() instead.
  const vars = [];
  for (const r of roles) {
    const src = sources.families[r.family];
    const stack = [r.family, ...r.fallbacks];
    const generic = CATEGORY_GENERIC[src?.category] || 'sans-serif';
    if (!GENERIC_FAMILIES.has(String(stack[stack.length - 1]).toLowerCase())) stack.push(generic);
    vars.push([`--font-${r.role}`, stack.map(cssFamily).join(', ')]);
    if (r.tracking != null && r.tracking !== '') {
      vars.push([`--tracking-${r.role}`, cssNum(r.tracking)]);
    }
    if (r.lineHeight != null) vars.push([`--lh-${r.role}`, cssNum(r.lineHeight)]);
  }
  lines.push(END);

  // prettier owns formatting of sites/**/*.css at printWidth 100 and would rewrap
  // anything longer, which would then fail `npm run format:check`. No kit produces
  // such a line today; warn loudly rather than silently emitting one.
  for (const l of lines) {
    if (l.length > 100) console.warn(`[fonts] ${kit.slug}: generated line exceeds 100 cols: ${l}`);
  }
  return { css: `${lines.join('\n')}\n`, faces, unresolved, clamped, vars };
}

/**
 * Merge the kit's role variables into the stylesheet's existing `:root` block —
 * replacing a declaration in place when it is already there, appending it at the
 * end of the block when it is not.
 *
 * Emitting our own `:root` would be simpler but stylelint's
 * `no-duplicate-selectors` (on, and the repo treats a red lint:css as a real
 * defect) rejects a second `:root` in the same file. Rewriting in place is also
 * the smaller diff and is idempotent, since each declaration is keyed by name.
 */
function applyRootVars(text, vars) {
  const blocks = [...text.matchAll(/(:root\s*\{)([^}]*)(\})/g)];
  if (!blocks.length) return { text, applied: 0, warning: 'no :root block — role variables not applied' };
  // Prefer the block that already carries the font variables; else the first one.
  const target = blocks.find((m) => /--font-[a-z0-9-]+\s*:/.test(m[2])) ?? blocks[0];

  let body = target[2];
  let applied = 0;
  for (const [name, value] of vars) {
    const decl = new RegExp(`(^[ \\t]*)${name}\\s*:[^;]*;`, 'm');
    if (decl.test(body)) {
      body = body.replace(decl, (_m, indent) => `${indent}${name}: ${value};`);
    } else {
      const trimmed = body.replace(/\s*$/, '');
      // stylelint's `custom-property-empty-line-before` wants a blank line when a
      // custom property follows a regular declaration, which is what happens when
      // the target :root ends in ordinary properties (e.g. an element-defaults
      // block). Only the first appended var needs it; the rest follow a custom
      // property and must stay tight.
      const lastLine = trimmed.slice(trimmed.lastIndexOf('\n') + 1);
      const needsGap = lastLine.trim() !== '' && !/^\s*--/.test(lastLine);
      body = `${trimmed}${needsGap ? '\n' : ''}\n  ${name}: ${value};\n`;
    }
    applied++;
  }
  if (body === target[2]) return { text, applied: 0 };
  return {
    text: text.slice(0, target.index) + target[1] + body + target[3] + text.slice(target.index + target[0].length),
    applied,
  };
}

/** Insert or replace the sentinel-delimited block at the end of base.css. */
function spliceBlock(text, block) {
  const b = text.indexOf(BEGIN);
  if (b !== -1) {
    const e = text.indexOf(END, b);
    if (e === -1) throw new Error('vendor-fonts: found a begin sentinel with no matching end');
    return `${text.slice(0, b)}${block.trimEnd()}\n${text.slice(e + END.length).replace(/^\n+/, '')}`;
  }
  return `${text.replace(/\s*$/, '')}\n\n${block}`;
}

/**
 * Drop every `<link>` that reaches fonts.googleapis.com / fonts.gstatic.com,
 * including their `preconnect` hints. `<link>` elements are prettier-wrapped
 * across several lines here, so match the whole element rather than a line.
 * Preconnects to other hosts are left alone.
 */
function stripFontLinks(html) {
  const removed = [];
  // Take the element plus its own line terminator only, so the NEXT line keeps
  // its indentation. Each removal leaves a marker, so the `<!-- Fonts -->` banner
  // above it can be recognised as labelling nothing and dropped too.
  let out = html.replace(/[ \t]*<link\b[^>]*?>[ \t]*\r?\n?/g, (el) => {
    if (!/fonts\.(?:googleapis|gstatic)\.com/.test(el)) return el;
    removed.push(el.trim().replace(/\s+/g, ' ').slice(0, 120));
    return MARK;
  });
  out = out.replace(orphanBannerRe(HTML_COMMENT), (c) => (/fonts?/i.test(c) ? '' : c));
  // Drop the markers, then collapse the blank-line run they leave behind
  // (prettier keeps at most one blank line in HTML).
  out = out.replace(MARK_RE, '').replace(/\n{3,}/g, '\n\n');
  return { html: out, removed };
}

function emitSite(slug, sources, kit, { dryRun, stripAll }) {
  const dir = join(SITES_DIR, slug);
  if (!existsSync(join(dir, 'index.html'))) {
    console.warn(`[fonts] ${slug}: no sites/${slug}/index.html — skipping`);
    return null;
  }
  const base = join(dir, 'css', 'base.css');
  if (!existsSync(base)) {
    console.warn(`[fonts] ${slug}: no css/base.css — skipping`);
    return null;
  }

  const summary = { slug, removedFaces: [], keptFaces: [], removedImports: [], removedLinks: 0, faces: 0, unresolved: [], clamped: [] };

  // 1. clear out the stale @font-face declarations across every stylesheet
  for (const file of siteCss(dir)) {
    const before = readFileSync(file, 'utf8');
    const a = stripStaleFaces(before, file, { stripAll });
    const b = stripFontImports(a.text, file);
    const after = tidy(b.text);
    summary.removedFaces.push(...a.removed.map((r) => `${relative(ROOT, file)} ${r.family} (${r.kind})`));
    summary.keptFaces.push(...a.kept.map((f) => `${relative(ROOT, file)} ${f}`));
    summary.removedImports.push(...b.removed.map((h) => `${relative(ROOT, file)} → ${h}`));
    if (after !== before && !dryRun) writeFileSync(file, after, 'utf8');
  }

  // 2. write the managed @font-face block into base.css and merge the kit's role
  //    variables into that stylesheet's existing :root
  const block = managedBlock(kit, sources);
  summary.faces = block.faces.size;
  summary.unresolved = block.unresolved;
  summary.clamped = block.clamped ?? [];
  const baseText = readFileSync(base, 'utf8');
  const rooted = applyRootVars(baseText, block.vars);
  summary.vars = rooted.applied;
  if (rooted.warning) console.warn(`[fonts] ${slug}: ${rooted.warning}`);
  const next = spliceBlock(rooted.text, block.css);
  if (next !== baseText && !dryRun) writeFileSync(base, next, 'utf8');

  // 3. de-CDN the HTML
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.html'))) {
    const p = join(dir, f);
    const before = readFileSync(p, 'utf8');
    const { html, removed } = stripFontLinks(before);
    summary.removedLinks += removed.length;
    if (html !== before && !dryRun) writeFileSync(p, html, 'utf8');
  }

  console.log(
    `[fonts] ${slug}: ${summary.faces} face(s), ${summary.vars} role var(s), ` +
      `removed ${summary.removedFaces.length} stale ` +
      `@font-face / ${summary.removedImports.length} @import / ${summary.removedLinks} CDN <link>` +
      (summary.keptFaces.length ? `, kept ${summary.keptFaces.length} resolving` : '') +
      (summary.unresolved.length ? `  UNRESOLVED: ${summary.unresolved.join(', ')}` : '') +
      (summary.clamped.length ? `  CLAMPED: ${summary.clamped.join('; ')}` : ''),
  );
  return summary;
}

// ---------------------------------------------------------------------------
// --check / --report
// ---------------------------------------------------------------------------

/** Per-site font state: unresolved src, external refs, CDN links, face count. */
function auditSite(slug) {
  const dir = join(SITES_DIR, slug);
  const row = { slug, faces: 0, resolved: 0, missing: 0, external: 0, localonly: 0, cdnLinks: 0, missingRefs: [] };
  for (const file of siteCss(dir)) {
    const css = readFileSync(file, 'utf8');
    for (const m of css.matchAll(/@font-face\s*\{[^}]*\}/g)) {
      row.faces++;
      const kind = classifyFace(m[0], file);
      if (kind === 'resolved') row.resolved++;
      else if (kind === 'missing') {
        row.missing++;
        for (const u of m[0].matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
          const raw = u[1].trim();
          if (raw.startsWith('data:') || /^(https?:)?\/\//.test(raw)) continue;
          if (!existsSync(resolveRef(file, raw.split(/[?#]/)[0]))) {
            row.missingRefs.push(`${relative(ROOT, file)} → ${raw}`);
          }
        }
      } else if (kind === 'external') row.external++;
      else if (kind === 'localonly') row.localonly++;
    }
  }
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.html'))) {
    row.cdnLinks += (readFileSync(join(dir, f), 'utf8').match(/fonts\.(?:googleapis|gstatic)\.com/g) || [])
      .length;
  }
  row.state =
    row.cdnLinks > 0
      ? 'HTML-CDN'
      : row.external > 0
        ? 'CSS-CDN'
        : row.missing > 0
          ? 'BROKEN'
          : row.resolved > 0
            ? 'SELF-HOSTED'
            : row.localonly > 0
              ? 'LOCAL-ONLY'
              : 'NO-WEBFONTS';
  return row;
}

function allSlugs() {
  return readdirSync(SITES_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(join(SITES_DIR, e.name, 'index.html')))
    .map((e) => e.name)
    .sort();
}

function report(slugs) {
  const rows = slugs.map(auditSite);
  for (const r of rows) {
    console.log(
      `${r.state.padEnd(12)} ${r.slug.padEnd(23)} faces=${String(r.faces).padStart(3)} ` +
        `resolved=${String(r.resolved).padStart(3)} missing=${String(r.missing).padStart(2)} ` +
        `external=${String(r.external).padStart(2)} localOnly=${String(r.localonly).padStart(2)} ` +
        `cdnLinks=${r.cdnLinks}`,
    );
  }
  const tally = {};
  for (const r of rows) tally[r.state] = (tally[r.state] || 0) + 1;
  console.log(`\n[fonts] ${rows.length} site(s): ${JSON.stringify(tally)}`);
  return rows;
}

function check(slugs) {
  const rows = slugs.map(auditSite);
  const bad = rows.filter((r) => r.missing || r.external || r.cdnLinks);
  for (const r of bad) {
    console.error(
      `[fonts] FAIL ${r.slug}: missing=${r.missing} external=${r.external} cdnLinks=${r.cdnLinks}`,
    );
    for (const ref of r.missingRefs) console.error(`         ${ref}`);
  }
  if (bad.length) {
    console.error(`[fonts] check FAILED for ${bad.length}/${rows.length} site(s)`);
    process.exitCode = 1;
  } else {
    const faces = rows.reduce((n, r) => n + r.faces, 0);
    console.log(
      `[fonts] check OK — ${rows.length} site(s), ${faces} @font-face, ` +
        'every src resolves on disk, zero external font references',
    );
  }
  return rows;
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const dryRun = has('--dry-run');
const stripAll = has('--strip-all');
const siteArgs = argv.reduce((acc, a, i) => {
  if (a === '--site') {
    for (let j = i + 1; j < argv.length && !argv[j].startsWith('--'); j++) acc.push(argv[j]);
  }
  return acc;
}, []);

const VERBS = ['--sources', '--download', '--emit', '--report', '--check'];
if (!argv.length || has('--help') || has('-h') || !VERBS.some(has)) {
  console.log(readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(1, 50).join('\n'));
  process.exit(argv.length && VERBS.some(has) ? 0 : 64);
}

/** Sites the selected verb applies to. `--all` beats an explicit `--site` list. */
const selection = has('--all') ? allSlugs() : siteArgs;

const kits = await loadKits();
let sources = existsSync(SOURCES_FILE) ? JSON.parse(readFileSync(SOURCES_FILE, 'utf8')) : null;

if (has('--sources')) sources = await buildSources(kits);
if (has('--download')) {
  if (!sources) throw new Error('vendor-fonts: run --sources first (no shared/data/font-sources.json)');
  await download(sources, { dryRun });
}

if (has('--emit')) {
  if (!sources) throw new Error('vendor-fonts: run --sources first (no shared/data/font-sources.json)');
  if (!selection.length) throw new Error('vendor-fonts: --emit needs --all or --site <slug> [...]');
  const byslug = new Map(kits.map((k) => [k.slug, k]));
  for (const slug of selection) {
    const kit = byslug.get(slug);
    if (!kit) {
      console.warn(`[fonts] no brand kit for site "${slug}" — skipping`);
      continue;
    }
    emitSite(slug, sources, kit, { dryRun, stripAll });
  }
}

if (has('--report')) report(selection.length ? selection : allSlugs());
if (has('--check')) check(selection.length ? selection : allSlugs());
