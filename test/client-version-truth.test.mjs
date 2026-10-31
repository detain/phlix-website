// Guard: no shipped download page badges a client card with a hand-authored
// version numeral — client availability truth lives in shared/content.json's
// status field and in the repos' actual release channels, never in a typed-in
// vX.Y.Z. (review riders R-WEBSITE-17, source fixlog/M-WEBSITE-08__fix.md
// open observation #2.)
//
// Run with `npm run test:unit` (`node --test "test/**/*.test.mjs"`).
//
// WHY THIS FILE EXISTS
// --------------------
// The M-WEBSITE-08 lane swept the shipped-mobile-as-coming-soon fictions but
// explicitly left its open observation #2 unadjudicated: "Un-adjudicated
// client version badges on download pages: cyber-pursuit v2.1.0/v1.8.0/
// v3.0.0, demolition-crew v2.4.1 … static hand-authored numerals and a
// 'version-currency' class of their own." This lane adjudicates the class
// against release truth (probed 2026-10-31):
//
//   * phlix-roku-client, phlix-tizen-client, phlix-windows-client and
//     phlix-mobile-client each carry exactly ONE git tag — `latest` — and
//     exactly one GitHub release, the non-draft `latest` PRERELEASE titled
//     "Latest (master)". No semver release tag has ever been published on
//     any of them, so v2.1.0 / v1.8.0 / v3.0.0 / v2.4.1 / v1.2.4 never
//     pointed at anything; they are not stale-but-once-true, they are
//     fabricated by construction (windows/mobile/tizen package.json self-
//     report 1.0.0).
//   * shared/content.json — the marketing-FACT SSOT — models clients with a
//     `status` field ("stable"/"beta") and NO version field. A download-page
//     numeral has no provenance to drift from and no law to catch its drift;
//     the storm-chaser review archive adjudicated the same numeral set there
//     as "fabricated" and its cure ("no version numbers on download cards")
//     is the estate precedent this law pins.
//
// The cures rode existing idioms, not invented ones: cyber-pursuit's own
// clients.html badges the same three terminal-title slots (roku.channel /
// samsung.tizen / windows.exe) "stable" (lowercase — the kit's terminal-
// status word form), demolition-crew's own clients.html badges its Windows
// card `badge--success` "Stable", and inferno's sibling cards on the very
// same grid are bare platform descriptors ("Samsung smart TVs (Tizen)"), so
// inferno's prose numeral became exactly that form ("Windows 10/11").
//
// WHY v-PREFIXED SEMVER ONLY: the class is Phlix-PRODUCT version claims. A
// bare x.y.z net would police legitimate OS versions (Tizen 6.0, "1.0 GB"
// shapes) — measured clean today but not law's job. The v-prefixed numeral
// in visible text of a download page means precisely "this client ships at
// this version" and can today never be true.
//
// THE LAWS:
//   1. the perimeter is real: the tracked sites/*/download.html set is
//      non-trivial (>= 130 files, measured 138) and client-acquisition copy
//      is present across it (>= 130 files, measured 138) — a broken glob may
//      never let the ban pass vacuously (the variant-copy-truth denominator
//      lesson);
//   2. the ban: no v-prefixed semver numeral appears in the visible text of
//      any shipped download page, scanned in BOTH forms (per-text-run and
//      markup-collapsed, the M8r2 two-forms discipline — a numeral split
//      across tags is still one badge to a reader);
//   3. teeth controls: the five historical fictions convict in four carrier
//      shapes each (bare text, terminal-status span, badge span, em-dash
//      prose), and the honest cure shapes plus URL/version-lookalike decoys
//      acquit — the matcher may never go silently blind or silently hungry.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const TRACKED = execFileSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

// Review archives quote cured claims as evidence and must not convict
// (variant-copy-truth ships()/NOT_SHIPPED, same list, same reasons) —
// measured today: no download.html sits under reviews/, the guard is law.
const NOT_SHIPPED = new Set(['BUILD_LOG.md', 'SITE.md', 'PROMPTS.md', 'REGEN_PLAN.md', 'FINAL-REVIEW.md']);
function ships(relPath) {
  const segments = relPath.split('/');
  const base = segments[segments.length - 1];
  return (
    !segments.includes('reviews') &&
    !/\.worklog\.md$/i.test(base) &&
    !/^ROUND-\d+\.md$/i.test(base) &&
    !NOT_SHIPPED.has(base)
  );
}

const DOWNLOAD_PAGES = TRACKED.filter(
  (p) => /^sites\/[^/]+\/download\.html$/.test(p) && ships(p),
);

// The fabrication shape: a v-prefixed semver numeral (major.minor.patch,
// optional -prerelease tail). Dots tolerate whitespace so the collapsed form
// still convicts a tag-split numeral (M8r2). Word-boundary on the left so
// markup tails and ids never feed it; the "v" is required by design (header:
// WHY v-PREFIXED).
const FABRICATED = /(?<![\w.-])v\d+\s*\.\s*\d+\s*\.\s*\d+(?:-[0-9A-Za-z.]+)?(?![\w-])/;

// Markup-collapse pass (the M8r2 lesson: a claim split across tags is one
// claim to a reader; tags and nbsp entities fold to spaces).
function stripMarkup(text) {
  return text
    .replace(/&nbsp;|&#0*160;/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ');
}

// Visible-text runs as written: the content between a closing '>' and the
// next opening '<'. Attribute values (URLs, classes, path data) are outside
// the runs by construction.
function textRuns(html) {
  return [...html.matchAll(/>([^<>]*)</g)].map((m) => m[1]);
}

// The two-forms scan both real files and synthetic controls use.
function fabricatedIn(html) {
  const hits = [];
  for (const run of textRuns(html)) {
    const m = run.match(FABRICATED);
    if (m) hits.push({ form: 'as-written', match: m[0], context: run.trim().slice(0, 80) });
  }
  const collapsed = stripMarkup(html);
  const m2 = collapsed.match(FABRICATED);
  if (m2) hits.push({ form: 'collapsed', match: m2[0], context: collapsed.slice(0, 80) });
  return hits;
}

test('version law 1: the download-page perimeter is real (a broken glob cannot pass the ban vacuously)', () => {
  assert.ok(
    DOWNLOAD_PAGES.length >= 130,
    `expected >= 130 tracked download pages, found ${DOWNLOAD_PAGES.length} — the perimeter moved; re-measure and re-bless deliberately`,
  );
  let withAcquisitionCopy = 0;
  for (const rel of DOWNLOAD_PAGES) {
    const html = readFileSync(join(ROOT, rel), 'utf8');
    if (/GitHub Releases|\/releases|Get the build|Download \.exe/i.test(html)) withAcquisitionCopy += 1;
  }
  assert.ok(
    withAcquisitionCopy >= 130,
    `expected >= 130 download pages carrying client-acquisition copy, found ${withAcquisitionCopy} — the law's subject matter left the perimeter`,
  );
});

test('version law 2: no shipped download page badges a client with a hand-authored version numeral', () => {
  for (const rel of DOWNLOAD_PAGES) {
    const html = readFileSync(join(ROOT, rel), 'utf8');
    const hits = fabricatedIn(html);
    assert.equal(
      hits.length,
      0,
      `${rel}: ${hits
        .map((h) => `[${h.form}] "${h.match}" in "${h.context}"`)
        .join(' ; ')} — client version claims have no SSOT and no release behind them; badge status words (Stable/Beta) or drop the numeral`,
    );
  }
});

test('version law 3 (teeth): the five historical fictions convict in every carrier shape', () => {
  const fictions = ['v2.1.0', 'v1.8.0', 'v3.0.0', 'v2.4.1', 'v1.2.4'];
  const shapes = [
    (v) => `<span>${v}</span>`,
    (v) => `<span class="terminal-title">windows.exe</span>\n<span class="terminal-status">${v}</span>`,
    (v) => `<span class="badge badge--success" style="margin-top: 12px">${v}</span>`,
    (v) => `<p class="text-muted mb-4">${v} — Windows 10/11</p>`,
  ];
  for (const v of fictions) {
    for (const [i, shape] of shapes.entries()) {
      const hits = fabricatedIn(shape(v));
      assert.ok(hits.length >= 1, `teeth: fabricated numeral ${v} escaped carrier shape ${i}`);
      assert.equal(hits[0].match, v);
    }
  }
  // A numeral split across tags still convicts in the collapsed form (the
  // M8r2 label/value hop, versioned).
  const split = fabricatedIn('phlix for windows <b>version</b> v3<span>.</span>0.0');
  assert.ok(
    split.some((h) => h.form === 'collapsed' && /^v3\s*\.\s*0\s*\.\s*0$/.test(h.match)),
    'teeth: markup-split fabrication escaped the collapse pass',
  );
});

test('version law 3 (teeth): the honest cure shapes and lookalike decoys acquit', () => {
  const honest = [
    '<span class="terminal-status">stable</span>',
    '<span class="badge badge--success" style="margin-top: 12px">Stable</span>',
    '<span class="terminal-status">Beta</span>',
    '<p class="text-muted mb-4">Windows 10/11</p>',
    '<p class="text-muted mb-4">iOS 14+ &amp; Android 8+</p>',
    '<a href="https://github.com/detain/phlix-windows-client/releases">GitHub Releases</a>',
    // decoys: versions that are NOT shipped-product claims land only in
    // attributes, or are OS nouns without the v prefix.
    '<p>Samsung smart TVs (Tizen 6.0)</p>',
    '<span>phlix-server:latest</span>',
    '<svg viewBox="0 0 24 24"><path d="M15 9H9v6h6V9zm-2 4h-2v-2h2v2z"/></svg>',
  ];
  for (const html of honest) {
    const hits = fabricatedIn(html);
    assert.equal(hits.length, 0, `teeth: honest/decoy shape convicted — ${html} matched ${JSON.stringify(hits)}`);
  }
});
