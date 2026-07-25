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
 * ---------------------------------------------------------------------------
 * PASS 2 (2026-07-25). Pass 1 shipped and its own report looked clean — it drove
 * the literal string `BSD-3-Clause` to zero. It was still WRONG in three ways,
 * and each is a lesson worth keeping:
 *
 *  1. **Matching was single-line.** Prettier owns formatting here, so it had
 *     wrapped these paragraphs mid-sentence:
 *         sell products based on it
 *         &mdash; no strings attached.
 *     Pass 1's literals had the dash inline, so the long semantic rules never
 *     matched. The short catch-all `BSD-3-Clause` → `MPL-2.0 and MIT` fired
 *     instead, and the counter reported *its* hits — which read as success while
 *     the false clause survived on ~31 sites. Matching is now whitespace- and
 *     dash-encoding-tolerant (`ws()` / `{DASH}`), so a rule cannot silently miss
 *     because of a line break.
 *  2. **Matching was case-sensitive.** Three `<meta name="keywords">` carried
 *     lowercase `bsd-3` / `bsd-3-clause` and were never touched.
 *  3. **The glob was `sites/*&#47;*.html` only.** It missed five `img/og.svg`
 *     files whose social-card text says BSD-3-Clause (and which are rasterised
 *     into the live `og.png`), plus `chrome-velocity/content.json`, which the
 *     build publishes verbatim.
 *
 * The deeper defect pass 1 did not even look for: ~40 sites stated **BSD-3
 * semantics under an MPL-2.0 label** — "no strings attached", "attribution is
 * required", "the only obligation is to preserve copyright", and in two cases
 * BSD-3's no-endorsement clause verbatim. MPL-2.0 is weak copyleft: modify a
 * Phlix file and that file stays open. "No strings attached" is materially
 * false for it, so swapping the label alone left every one of those pages
 * wrong. Nine bespoke paragraphs were rewritten by hand (they each had their own
 * voice and their own wrong claim); the one dominant shared sentence is rule (A)
 * below.
 *
 * Lesson for the next sweep: a string count going to zero proves the string is
 * gone, not that the *claim* is right. Grep for the semantics, not the label.
 * ---------------------------------------------------------------------------
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

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/* Every dash encoding in use across the 50 sites. A rule must not miss because
   one kit writes `—` and another `&mdash;`. */
const DASH_CLASS = '(?:\\u2014|&mdash;|&#8212;)';

/**
 * Compile a literal into a matcher that tolerates the two things that defeated
 * pass 1: arbitrary whitespace where the literal has a space (prettier wraps
 * mid-sentence) and any dash encoding at a `{DASH}` token. Case-insensitive so
 * the lowercase `bsd-3` in `<meta name="keywords">` is caught too.
 */
const ws = (literal) =>
  new RegExp(
    literal
      .trim()
      .split(/\s+/)
      .map((t) => (t === '{DASH}' ? DASH_CLASS : escapeRe(t)))
      .join('\\s+'),
    'gi',
  );

/** Ordered [from, to] pairs. `to` may be a function of the file's dash encoding. */
const RULES = [
  // ── PASS 2 (A): the dominant false-semantics sentence, on ~31 sites ────────
  // "no strings attached" is true of BSD-3 and false of MPL-2.0. Distinctive
  // per-kit tails ("The garden is yours to tend as you see fit.") follow this
  // sentence and are deliberately left alone.
  {
    from:
      'MPL-2.0 and MIT across all Phlix projects. Use it, modify it, ' +
      'sell products based on it {DASH} no strings attached.',
    to: (em) =>
      `Phlix Server and the Hub are MPL-2.0; the shared libraries, plugins and clients are MIT. ` +
      `Use them, modify them, and sell products built on them ${em} commercial use is fine. ` +
      `The one condition: if you modify a Phlix file, that file stays open.`,
  },

  // ── PASS 2 (B): meta description / keyword fragments ──────────────────────
  {
    from: 'MPL-2.0 and MIT across all Phlix projects.',
    to: () => 'MPL-2.0 server and Hub; MIT libraries, plugins and clients.',
  },
  {
    from: 'MPL-2.0 licensed across all Phlix projects.',
    to: () => 'MPL-2.0 server and Hub; MIT libraries, plugins and clients.',
  },

  // ── PASS 2 (C): nordic-saga's visible link TEXT. Pass 2 of my own review
  // caught two mangled JSON-LD hrefs but missed this third one, which is anchor
  // text rather than an attribute. The href beside it is already correct.
  {
    from: 'opensource.org/licenses/MPL-2.0 and MIT',
    to: () => 'mozilla.org/en-US/MPL/2.0',
  },

  // ── PASS 2 (D): a BSD claim with no "-3" in it, so pass 1 could not see it ─
  {
    from: 'The entire Phlix ecosystem is open source, peer-reviewed, and MIT/BSD-licensed.',
    to: () =>
      'The entire Phlix ecosystem is open source and peer-reviewed ' +
      '&mdash; MPL-2.0 for the server and Hub, MIT for the libraries, plugins and clients.',
  },

  // ── PASS 2 (E): social-card text. Scoped to SVG and kept SHORT: these sit in
  // fixed-width centred <text> runs, so the longer "MPL-2.0 and MIT" risks
  // overflowing the card. Rasterised into the live og.png, so this is
  // user-visible in every social embed.
  { from: 'BSD-3-Clause', to: () => 'MPL-2.0 + MIT', path: /\.svg$/ },

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

/* Pass 1 globbed only `sites/*&#47;*.html` and therefore never saw the social-card
   SVGs or the one per-site content.json the build publishes verbatim. */
const files = [
  ...globSync('sites/*/*.html', { cwd: ROOT }),
  ...globSync('sites/*/img/og.svg', { cwd: ROOT }),
  ...globSync('sites/*/content.json', { cwd: ROOT }),
].sort();

/* Rules are written either as `[from, to]` (pass 1) or `{ from, to, path }`
   (pass 2, where some rules are scoped to one file type). Normalise here so the
   loop below has a single shape to deal with. */
const rules = RULES.map((r) => (Array.isArray(r) ? { from: r[0], to: r[1] } : r)).map((r) => ({
  ...r,
  re: ws(r.from),
}));

let changedFiles = 0;
const applied = new Map();

for (const rel of files) {
  const path = resolve(ROOT, rel);
  const before = readFileSync(path, 'utf8');
  // Match the document's own dash encoding so we never mix the two.
  const em = before.includes('&mdash;') ? '&mdash;' : '—';
  let after = before;
  for (const { from, to, path: scope, re } of rules) {
    if (scope && !scope.test(rel)) continue;
    re.lastIndex = 0;
    const n = (after.match(re) ?? []).length;
    if (!n) continue;
    const replacement = (typeof to === 'function' ? to(em) : to).replaceAll('{DASH}', em);
    // `$` is literal in these replacements, not a capture reference.
    after = after.replace(re, () => replacement);
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
