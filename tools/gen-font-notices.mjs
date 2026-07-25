#!/usr/bin/env node
/**
 * tools/gen-font-notices.mjs
 *
 * Writes the attribution the vendored fonts legally require:
 *
 *   shared/assets/fonts/OFL.txt      the SIL Open Font License 1.1 text
 *   THIRD-PARTY-NOTICES.md           per-family copyright notices
 *
 * WHY: `shared/assets/fonts/` holds 185 WOFF2 files across 70 families, and
 * `shared/data/font-sources.json` records every one of them as **OFL-1.1**. The
 * OFL is not a no-op licence: its "Copies of this Font Software may be ...
 * redistributed" permission is conditional on the copyright notice and the
 * licence text travelling with the files, and `build.mjs` publishes the whole
 * pool to `/assets/fonts/`. Before this tool the repo shipped all 185 fonts with
 * neither, on a live site — a licence violation, and one no gate could see
 * because nothing was checking.
 *
 * Found while confirming there was no obstacle to relicensing the repo itself to
 * MIT. There isn't, for the repo's own code — but a blanket MIT LICENSE over a
 * tree containing OFL fonts is inaccurate unless the fonts' own terms are
 * carried alongside, which is what this produces.
 *
 *   node tools/gen-font-notices.mjs              # fetch notices and write both files
 *   node tools/gen-font-notices.mjs --offline    # rewrite from the cache only
 *
 * The per-family copyright line is the first `Copyright ...` block of each
 * family's upstream OFL.txt (the URL is already in font-sources.json). Responses
 * are cached under .cache/font-licences/ so a re-run is offline and free.
 *
 * @copyright Copyright (c) 2026 Joe Huss <detain@interserver.net>
 * @license   MIT
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const CACHE = join(ROOT, '.cache', 'font-licences');
const offline = process.argv.includes('--offline');

const sources = JSON.parse(readFileSync(join(ROOT, 'shared', 'data', 'font-sources.json'), 'utf8'));
const families = sources.families;

mkdirSync(CACHE, { recursive: true });

/** The canonical OFL 1.1 preamble/permission text is identical in every upstream
 *  copy; only the leading copyright block differs per family. Take it from the
 *  first family we successfully fetch, so the text is upstream's rather than
 *  transcribed here by hand. */
function splitOfl(txt) {
  const i = txt.indexOf('SIL OPEN FONT LICENSE');
  const body = i === -1 ? null : txt.slice(i).trim();
  // Upstream's head block is the copyright line(s) followed by the same
  // "This Font Software is licensed under ..." boilerplate every family repeats,
  // then a rule of dashes. Only the copyright itself is per-family, so cut at
  // whichever of those markers comes first — otherwise every row in the table
  // carries an identical paragraph of noise.
  let head = i === -1 ? txt : txt.slice(0, i);
  for (const marker of ['This Font Software is licensed', '-----']) {
    const j = head.indexOf(marker);
    if (j !== -1) head = head.slice(0, j);
  }
  return { copyright: head.trim().replace(/,\s*$/, ''), body };
}

async function fetchLicence(name, url) {
  const key = join(CACHE, `${name.replace(/[^\w-]+/g, '_')}.txt`);
  if (existsSync(key)) return readFileSync(key, 'utf8');
  if (offline || !url) return null;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) return null;
    const txt = await res.text();
    writeFileSync(key, txt);
    return txt;
  } catch {
    return null;
  }
}

const rows = [];
let oflBody = null;
const missing = [];

for (const [name, meta] of Object.entries(families)) {
  const lic = meta.licence ?? {};
  const txt = await fetchLicence(name, lic.url);
  const parsed = txt ? splitOfl(txt) : null;
  if (parsed?.body && !oflBody) oflBody = parsed.body;
  // Collapse the notice to one line; upstream wraps it and some add a blank line
  // before the Reserved Font Name clause.
  const notice = parsed?.copyright ? parsed.copyright.replace(/\s*\n\s*/g, ' ').trim() : null;
  if (!notice) missing.push(name);
  rows.push({
    name,
    spdx: lic.spdx ?? '(unrecorded)',
    url: lic.url ?? null,
    notice,
    files: Object.values(meta.faces ?? {}).map((f) => f.file),
  });
}

if (!oflBody) {
  console.error(
    '[gen-font-notices] could not obtain the OFL 1.1 body text (no cache, and no fetch succeeded).\n' +
      '  Re-run online, or place any upstream OFL.txt in .cache/font-licences/ first.',
  );
  process.exit(1);
}

/* ── shared/assets/fonts/OFL.txt ──────────────────────────────────────────── */
// Lives beside the .woff2 files, and build.mjs copies shared/assets → dist/assets
// wholesale, so this ships with the fonts it covers without any build change.
writeFileSync(
  join(ROOT, 'shared', 'assets', 'fonts', 'OFL.txt'),
  `${[
    'This directory contains fonts licensed under the SIL Open Font License 1.1.',
    'The per-family copyright notices are in THIRD-PARTY-NOTICES.md at the repository root.',
    'The licence text follows.',
    '',
    oflBody,
  ].join('\n')}\n`,
);

/* ── THIRD-PARTY-NOTICES.md ───────────────────────────────────────────────── */
// DISTINCT files, not face entries: a clamped or substituted weight points at
// another weight's file, so summing per-family face counts over-reports (190 vs
// the 185 files actually in the pool).
const totalFiles = new Set(rows.flatMap((r) => r.files)).size;
const md = [
  '# Third-party notices',
  '',
  'The repository itself is MIT licensed (see [LICENSE](LICENSE)). This file covers',
  'material in the tree that is **not** ours and is redistributed under its own terms.',
  '',
  '## Fonts',
  '',
  `${totalFiles} WOFF2 files across ${rows.length} families are vendored under`,
  '`shared/assets/fonts/` and published at `/assets/fonts/` by `tools/build.mjs`.',
  'All are under the **SIL Open Font License 1.1**, whose text is bundled beside them',
  'at [shared/assets/fonts/OFL.txt](shared/assets/fonts/OFL.txt).',
  '',
  'The OFL permits redistribution only with the copyright notice and licence',
  'included, so this list is a redistribution condition, not a courtesy.',
  '',
  'Regenerate with `node tools/gen-font-notices.mjs`.',
  '',
  '| Family | Licence | Copyright |',
  '| --- | --- | --- |',
  ...rows
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((r) => {
      const lic = r.url ? `[${r.spdx}](${r.url})` : r.spdx;
      const notice = (r.notice ?? '**notice not retrieved — see the licence URL**').replace(
        /\|/g,
        '\\|',
      );
      return `| ${r.name} | ${lic} | ${notice} |`;
    }),
  '',
].join('\n');
writeFileSync(join(ROOT, 'THIRD-PARTY-NOTICES.md'), md);

if (missing.length) {
  console.log(`  ⚠ no copyright notice retrieved for ${missing.length}: ${missing.join(', ')}`);
}
console.log(
  `[gen-font-notices] wrote THIRD-PARTY-NOTICES.md (${rows.length} families, ${totalFiles} files) ` +
    `and shared/assets/fonts/OFL.txt`,
);
