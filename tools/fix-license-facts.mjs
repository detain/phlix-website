#!/usr/bin/env node
/**
 * tools/fix-license-facts.mjs
 *
 * One-shot corrective sweep. PR #60 ("Correct the license facts the 50 sites
 * publish") fixed `shared/content.json` and a handful of sites, but 45 of the 50
 * still published **BSD-3-Clause** — 973 text occurrences and 336 wrong hrefs,
 * live on GitHub Pages. BSD-3-Clause is true of no Phlix repository.
 *
 * The authority is `shared/content.json`: Phlix Server and the Hub are MPL-2.0;
 * the shared libraries, plugins and clients are MIT. The five regenerated wave-1
 * kits already say exactly that, so this brings the other 45 in line with them
 * rather than inventing new wording.
 *
 * Replacements are ORDERED longest-first: several short patterns are substrings
 * of longer ones ("BSD-3-Clause across the board." is a prefix of a sentence that
 * continues), and applying the short form first would strand the remainder.
 *
 * Idempotent: every `from` disappears once applied, so re-running is a no-op.
 *
 *   node tools/fix-license-facts.mjs            # apply
 *   node tools/fix-license-facts.mjs --dry-run  # report only
 *
 * @copyright Copyright (c) 2026 Joe Huss <detain@interserver.net>
 * @license   BSD-3-Clause
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { globSync } from 'glob';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const dryRun = process.argv.includes('--dry-run');

const LICENSE_HREF = 'https://github.com/detain/phlix-server/blob/master/LICENSE';
const MPL_URL = 'https://www.mozilla.org/en-US/MPL/2.0/';

/* The split, in the wording the five correct kits already use. `em` picks the
   dash encoding of the surrounding document so we do not mix `—` and `&mdash;`
   inside one file. */
const split = (em) =>
  `Phlix Server and the Hub are MPL-2.0; the shared libraries, plugins and clients are MIT.`.replace(
    /—/g,
    em,
  );

/* content.json's FAQ answer, verbatim — FAQ answer *substance* must be traceable
   to it (new_site.md §16), and these sites shipped a truncated stand-in. */
const FAQ_ANSWER = (em) =>
  `Phlix Server and the Hub are MPL-2.0 ${em} open source, and you can build on them commercially. ` +
  `If you modify a Phlix file, that file stays open; anything you add alongside it is yours. ` +
  `The shared libraries, plugins, and clients are MIT so you can build on them freely.`;

/** Ordered [from, to] pairs. `to` may be a function of the file's dash encoding. */
const RULES = [
  // ── JSON-LD ────────────────────────────────────────────────────────────────
  [
    '"license": { "@type": "CreativeWork", "name": "BSD-3-Clause" }',
    () => `"license": "${MPL_URL}"`,
  ],
  ['"license": "https://opensource.org/licenses/BSD-3-Clause"', () => `"license": "${MPL_URL}"`],
  ['https://opensource.org/licenses/BSD-3-Clause', () => MPL_URL],

  // ── the long false claims (must precede their own prefixes) ───────────────
  [
    'BSD-3-Clause across the board. The server, all official clients, the Hub, and the\n              documentation are yours to use, modify, and redistribute.',
    (em) =>
      `${split(em)} The server, all official clients, the Hub, and the\n              documentation are yours to use, modify, and redistribute.`,
  ],
  [
    'BSD-3-Clause across all Phlix projects. Use it, modify it, sell products based on it &mdash; no strings attached.',
    () => `${split('&mdash;')} Use them, modify them, sell products based on them.`,
  ],
  [
    'BSD-3-Clause across all Phlix projects. Use it, modify it, sell products based on it — no strings attached.',
    () => `${split('—')} Use them, modify them, sell products based on them.`,
  ],
  // The FAQ answer, shipped truncated. Standalone form only — the sentence-start
  // form above has already been consumed.
  ['<dd>BSD-3-Clause across the board.</dd>', (em) => `<dd>${FAQ_ANSWER(em)}</dd>`],
  ['BSD-3-Clause across the board.', (em) => split(em)],

  // ── prose ─────────────────────────────────────────────────────────────────
  ['the software is BSD-3 licensed so you can fork it', () => 'the software is MPL-2.0 licensed so you can fork it'],
  ['BSD-3 licensed so you can fork it', () => 'MPL-2.0 licensed so you can fork it'],
  ['BSD-3-Clause licensed', () => 'MPL-2.0 licensed'],
  ['BSD-3 licensed', () => 'MPL-2.0 licensed'],

  // ── footer link label + hrefs ─────────────────────────────────────────────
  ['License (BSD-3)', () => 'License (MPL-2.0)'],
  ['View BSD-3-Clause', () => 'View the licence'],
  ['View the BSD-3-Clause license', () => 'View the licence'],
  ['Read BSD-3-Clause', () => 'Read the licence'],
  ['https://github.com/phlix-website/blob/master/LICENSE', () => LICENSE_HREF],
  ['https://github.com/detain/phlix-website/blob/master/LICENSE', () => LICENSE_HREF],
  ['https://github.com/detain/phlix-website/blob/main/LICENSE', () => LICENSE_HREF],

  // ── footer legal line, every dash encoding in use ─────────────────────────
  ['Phlix &mdash; BSD-3-Clause', () => `Phlix &mdash; ${split('&mdash;')}`],
  ['Phlix &#8212; BSD-3-Clause', () => `Phlix &#8212; ${split('&#8212;')}`],
  ['Phlix — BSD-3-Clause', () => `Phlix — ${split('—')}`],

  // ── whatever short claims remain in meta/attrs ────────────────────────────
  ['BSD-3-Clause', () => 'MPL-2.0 and MIT'],
  ['BSD-3', () => 'MPL-2.0'],
];

const files = globSync('sites/*/*.html', { cwd: ROOT }).sort();
let changedFiles = 0;
const applied = new Map();

for (const rel of files) {
  const path = resolve(ROOT, rel);
  const before = readFileSync(path, 'utf8');
  // Match the document's own dash encoding so we never mix the two.
  const em = before.includes('&mdash;') ? '&mdash;' : '—';
  let after = before;
  for (const [from, to] of RULES) {
    if (!after.includes(from)) continue;
    const n = after.split(from).length - 1;
    after = after.split(from).join(typeof to === 'function' ? to(em) : to);
    applied.set(from, (applied.get(from) ?? 0) + n);
  }
  if (after !== before) {
    changedFiles += 1;
    if (!dryRun) writeFileSync(path, after);
  }
}

for (const [from, n] of [...applied.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${from.slice(0, 96).replace(/\n\s+/g, ' ⏎ ')}`);
}
console.log(
  `\n[fix-license-facts] ${dryRun ? 'would change' : 'changed'} ${changedFiles} file(s) of ${files.length}`,
);
