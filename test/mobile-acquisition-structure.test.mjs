// Guard: client-acquisition STRUCTURE on kit download pages — where a page links
// any client repo, mobile is never the one client silently left unlinked.
// (review riders R-WEBSITE-18, source fixlog/M-WEBSITE-08__r1.md review nit.)
//
// Run with `npm run test:unit` (`node --test "test/**/*.test.mjs"`).
//
// WHY THIS FILE EXISTS
// --------------------
// Review M-WEBSITE-08__r1 closed its ISSUE 1 (the per-platform coming-soon
// fictions for the shipped apps, swept and literal-banned by 1c43786a/15f8cf65)
// but logged this standing observation, verbatim:
//
//   "Laws guard copy but not structure: silently removing the nexus Download
//    button reopens the item's 'no mobile link' half without a red."
//
// It is right, and today it is still true of the copy laws alone: variant-copy-
// truth.test.mjs polices forbidden NARRATION and client-version-truth.test.mjs
// polices fabricated numerals — neither looks at whether the mobile acquisition
// link EXISTS. The M-WEBSITE-08 fix itself (1c43786a, widened by 15f8cf65) did
// more than re-word: it SHIPPED structure — the nexus-core download card gained
// a Download button to the mobile /releases (fixlog disposition 1, byte-
// mirroring the Windows card idiom), cyber-pursuit and demolition-crew gained
// whole mobile cards (2, 3), digital-combat-zone gained a MOBILE card-combat
// riding its button→clients.html idiom (6), and afrofuturism/retro-seventies/
// wilderness-trail mobile rows anchor clients.html#mobile (7, 8 — the chain
// completed by R-WEBSITE-16 at cee54c57). Delete any of that and every copy law
// stays green while the review's second clause — "the page offers no mobile
// link" — reopens. This file arms the structural half. Additive only: no copy
// law, gate or workflow was touched.
//
// THE LAWS:
//   1. the perimeter is real: the tracked sites/*/download.html set is
//      non-trivial (>= 130 files, measured 138) and its subject matter is
//      present (>= 100 pages link at least one client repo, measured 123;
//      >= 100 link mobile, measured 123; >= 4 carry the /releases mobile
//      form, measured 4; >= 3 carry terminal-anchor rosters, measured 3) —
//      a broken glob may never let the ban pass vacuously (the variant-copy-
//      truth denominator lesson, the W17 perimeter idiom);
//   2. class arm A: a download page that href-links ANY native client repo
//      on github.com/detain (windows/roku/tizen/console) must href-link
//      phlix-mobile-client too. Mobile singled out for amputation is exactly
//      the reviewed class; symmetric no-link pages are acquittal shapes by
//      construction, not exemptions (the trigger vocabulary itself follows
//      shared/content.json — five native clients, so a future console row
//      arms the law the day it lands);
//   3. class arm B: a download page carrying >= 2 distinct clients.html#
//      <terminal> anchor rows (the portal-mini roster idiom) must carry
//      #mobile — dropping the mobile row from a roster convicts;
//   4. named cure pins: the four M8 structural cures stay cured in the exact
//      shipped idiom. digital-combat-zone proves why named pins coexist with
//      class arms: its card rows carry NO external client href at all (page-
//      level symmetric per the fixlog KEEP-WITH-PROOF adjudication), so class
//      arms cannot see its mobile card — only a pin can;
//   5. teeth controls: planted single-client pages and a #mobile-less roster
//      convict; the honest cure shapes, server-only pages, fragmentless
//      client links and a foreign-domain decoy acquit — the matcher may
//      never go silently blind or silently hungry.
//
// STATED BOUNDARIES (disclosed, not hidden): the law scans the committed
// sites/ sources that tools/build.mjs copies verbatim into the gitignored
// dist/ — same source perimeter as client-version-truth.test.mjs law 2, and
// only the HREF shape: an amputation that keeps a client-repo href elsewhere
// on the same page while gutting the card around it is copy law territory
// (the M8 narration trio is already armed there), and whole-roster deletion
// (no client links at all left) is a symmetric content change outside the
// reviewed "singled-out" class. A non-github.com/detain URL is never a
// client-repo link (the decoy control below pins that).

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
const NOT_SHIPPED = new Set([
  'BUILD_LOG.md',
  'SITE.md',
  'PROMPTS.md',
  'REGEN_PLAN.md',
  'FINAL-REVIEW.md',
]);
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

// The client roster: shared/content.json clients[] models five native clients;
// mobile is the protected party, the others are TRIGGERS. github.com/detain is
// the only acquisition domain in the estate (a foreign-domain lookalike is not
// a client link — law 5 pins the decoy).
const CLIENT = 'https://github.com/detain/phlix-';
const OTHER_CLIENTS = ['windows', 'roku', 'tizen', 'console'];
const CLIENT_HREF = new RegExp(
  `href="${CLIENT}(?:${[...OTHER_CLIENTS, 'mobile'].join('|')}-client)[^"]*"`,
  'g',
);
const otherClientHref = (html) =>
  OTHER_CLIENTS.some((k) => html.includes(`href="${CLIENT}${k}-client`));
const mobileHref = (html) => html.includes(`href="${CLIENT}mobile-client`);

// The terminal-anchor roster idiom (portal-mini chains; W-16 completed the
// fragment targets on the clients pages — linkcheck guards dead fragments, this
// law guards a dropped mobile ROW).
const TERMINAL_ANCHOR = /href="clients\.html#(roku|tizen|windows|mobile|dlna)"/g;

// Both class arms run over one file's text; the real walk and the synthetic
// controls share this single engine (no parallel matcher to drift).
function structureFindings(html) {
  const findings = [];
  if (otherClientHref(html) && !mobileHref(html)) {
    const linked = OTHER_CLIENTS.filter((k) =>
      html.includes(`href="${CLIENT}${k}-client`),
    );
    findings.push(
      `arm A: page href-links ${linked.join('+')}-client but leaves phlix-mobile-client unlinked ` +
        `(the M-WEBSITE-08 "no mobile link" class — restore the mobile card/button riding the sibling idiom)`,
    );
  }
  const anchors = new Set([...html.matchAll(TERMINAL_ANCHOR)].map((m) => m[1]));
  if (anchors.size >= 2 && !anchors.has('mobile')) {
    findings.push(
      `arm B: page carries a ${[...anchors].sort().join('/')} terminal roster without #mobile ` +
        `(dropping the mobile row from a roster is the same amputation by another idiom)`,
    );
  }
  return findings;
}

test('structure law 1: the download-page perimeter is real (a broken glob cannot pass the ban vacuously)', () => {
  assert.ok(
    DOWNLOAD_PAGES.length >= 130,
    `expected >= 130 tracked download pages, found ${DOWNLOAD_PAGES.length} — the perimeter moved; re-measure and re-bless deliberately`,
  );
  let withClientLink = 0;
  let withMobileLink = 0;
  let withReleasesMobile = 0;
  let withRoster = 0;
  for (const rel of DOWNLOAD_PAGES) {
    const html = readFileSync(join(ROOT, rel), 'utf8');
    if (CLIENT_HREF.test(html)) {
      withClientLink += 1;
      CLIENT_HREF.lastIndex = 0;
    }
    if (mobileHref(html)) withMobileLink += 1;
    if (html.includes(`href="${CLIENT}mobile-client/releases"`)) withReleasesMobile += 1;
    if (TERMINAL_ANCHOR.test(html)) {
      withRoster += 1;
      TERMINAL_ANCHOR.lastIndex = 0;
    }
  }
  assert.ok(
    withClientLink >= 100,
    `expected >= 100 download pages linking at least one client repo, found ${withClientLink} — the law's subject matter left the perimeter`,
  );
  assert.ok(
    withMobileLink >= 100,
    `expected >= 100 download pages linking phlix-mobile-client, found ${withMobileLink} — mass amputation already happened and this law found it too late`,
  );
  assert.ok(
    withReleasesMobile >= 4,
    `expected >= 4 pages carrying the /releases mobile form (bamboo-sanctuary, cyber-pursuit, inferno, nexus-core), found ${withReleasesMobile}`,
  );
  assert.ok(
    withRoster >= 3,
    `expected >= 3 pages carrying clients.html#terminal rosters, found ${withRoster}`,
  );
});

test('structure law 2: no download page links any client repo and leaves mobile unlinked', () => {
  for (const rel of DOWNLOAD_PAGES) {
    const findings = structureFindings(readFileSync(join(ROOT, rel), 'utf8'));
    assert.equal(findings.length, 0, `${rel}: ${findings.join(' ; ')}`);
  }
});

test('structure law 3: the M-WEBSITE-08 structural cures stay cured (named pins)', () => {
  const read = (rel) => readFileSync(join(ROOT, 'sites', rel), 'utf8');

  // Disposition 1 — THE review-named case: the nexus Download button. Pinned at
  // the full anchor shape: a phlix-mobile-client/releases href whose visible
  // link text is "Download" (amputating the label or the target both convict).
  const nexus = read('nexus-core/download.html');
  assert.match(
    nexus,
    /<a[^>]*href="https:\/\/github\.com\/detain\/phlix-mobile-client\/releases"[^>]*>[^<]*Download[^<]*<\/a/,
    'sites/nexus-core/download.html lost its Download button to the mobile releases — the exact amputation review M-WEBSITE-08__r1 predicted',
  );

  // Disposition 2 — cyber-pursuit's added mobile card keeps its /releases link.
  assert.ok(
    read('cyber-pursuit/download.html').includes(
      `href="${CLIENT}mobile-client/releases"`,
    ),
    'sites/cyber-pursuit/download.html lost the mobile card link added by M-WEBSITE-08',
  );

  // Disposition 3 — demolition-crew's mobile card rides repo-root links (its
  // Windows sibling on the same page links repo-root too — idiom pinned).
  assert.ok(
    read('demolition-crew/download.html').includes(`href="${CLIENT}mobile-client"`),
    'sites/demolition-crew/download.html lost the mobile card link added by M-WEBSITE-08',
  );

  // Disposition 6 — digital-combat-zone's MOBILE card-combat: no external
  // client href anywhere on the page by design, so the class arms are blind
  // here BY CONSTRUCTION and this pin is the only teeth. Pin the card-number
  // marker, its heading, and its button→clients.html acquisition in one block.
  const dcz = read('digital-combat-zone/download.html');
  const mobileArticle = dcz
    .split(/<article\b/)
    .find((block) => /class="card-number"[^>]*>\s*MOBILE\s*</.test(block));
  assert.ok(
    mobileArticle !== undefined,
    'sites/digital-combat-zone/download.html lost its MOBILE card-combat row added by M-WEBSITE-08',
  );
  assert.match(
    mobileArticle,
    /Mobile \(iOS \+ Android\)/,
    'the digital-combat-zone MOBILE row lost its heading — card shell kept, acquisition gutted',
  );
  assert.match(
    mobileArticle,
    /href="clients\.html"/,
    'the digital-combat-zone MOBILE row lost its clients.html acquisition button (the page idiom)',
  );
});

test('structure law 4 (teeth): planted amputations convict in every trigger idiom', () => {
  const SINGLE_CLIENT = (k) =>
    `<article><h3>${k.toUpperCase()}</h3><a href="${CLIENT}${k}-client/releases">Download</a></article>`;
  for (const k of [...OTHER_CLIENTS]) {
    const findings = structureFindings(SINGLE_CLIENT(k));
    assert.equal(
      findings.length,
      1,
      `teeth: a ${k}-only download page escaped arm A — the single-client amputation must convict`,
    );
    assert.match(findings[0], /^arm A:/);
  }
  // Two clients linked, mobile dropped from an otherwise-full page: still one
  // clean conviction, and the message names the survivors.
  const survivors = structureFindings(
    SINGLE_CLIENT('windows') + SINGLE_CLIENT('roku'),
  );
  assert.equal(survivors.length, 1);
  assert.match(survivors[0], /windows\+roku-client/);

  // The roster idiom: the #mobile row dropped from a full portal-mini chain.
  const roster = (terms) =>
    terms.map((t) => `<a href="clients.html#${t}" class="portal-mini" role="listitem">x</a>`).join('\n');
  const gutted = structureFindings(roster(['roku', 'tizen', 'windows', 'dlna']));
  assert.equal(gutted.length, 1, 'teeth: a #mobile-less terminal roster escaped arm B');
  assert.match(gutted[0], /^arm B:/);

  // Roster with mobile kept is the shipped truth shape — one conviction only
  // from arm B, none from arm A (no external hrefs at all): the arms bind
  // independently, not accidentally in lockstep.
  const kept = structureFindings(roster(['roku', 'tizen', 'windows', 'mobile', 'dlna']));
  assert.equal(kept.length, 0);
});

test('structure law 4 (teeth): the honest shapes acquit — the matcher is not hungry', () => {
  const honest = [
    // the cured page shape: any client linked, mobile linked too
    `<a href="${CLIENT}windows-client/releases">Download</a>
     <a href="${CLIENT}mobile-client/releases">Download</a>`,
    // the repo-root card idiom (demolition-crew)
    `<a href="${CLIENT}mobile-client" class="card">Mobile</a>`,
    // a mobile-only page: the law polices mobile ABSENCE, never mobile count parity
    `<a href="${CLIENT}mobile-client">Mobile</a>`,
    // a server-only acquisition page — the server is not a client (fixlog
    // disposition 10: client-headings 0, KEEP-WITH-PROOF)
    `<a href="${CLIENT}server/releases">Download the server</a>
     <a href="${CLIENT}hub/releases">Download the hub</a>`,
    // the fragmentless clients.html button idiom (digital-combat-zone shape)
    `<a href="clients.html" class="btn btn-primary">Get App</a>`,
    // prose that merely SAYS the repo name — only the href shape binds
    `<p>Install from the phlix-mobile-client repository on GitHub.</p>`,
    // foreign-domain lookalike: not an estate acquisition link, never a trigger
    `<a href="https://example.com/detain/phlix-windows-client/releases">x</a>`,
  ];
  for (const html of honest) {
    const findings = structureFindings(html);
    assert.equal(
      findings.length,
      0,
      `teeth: honest/decoy shape convicted — ${html.slice(0, 70)} matched ${JSON.stringify(findings)}`,
    );
  }
});
