// Guard: every server-cap number the marketing pages quote is pinned to a
// VENDORED fixture of the server's actual constant — executable, not a comment.
//
// Run with `npm run test:unit` (`node --test "test/**/*.test.mjs"`).
//
// WHY THIS FILE EXISTS
// --------------------
// fixlog/M-WEBSITE-07__r1.md disclosure D1 named the gap the M-WEBSITE-07 cure
// left behind: the watch-party copy states the server's SyncPlay room cap
// ("up to 50 viewers") and the FORBIDDEN registry polices the fabricated
// shapes around it (the unlimited-claim original, invented benchmarks), but nothing
// policed the NUMBER itself. Four authored copies carried "50"; the only link
// to phlix-server's GroupState::MAX_MEMBERS was a prose coordinate in this
// repo's law header. A future server cap change would silently drift every
// copy to a stale-but-plausible number — a green net over the exact lie the
// class was cured to tell. D1's prescribed remedy, verbatim: "a content-cap
// law reading a vendored fixture or owner-waived staleness-by-design".
// This lane ships the law, not the waiver.
//
// The fixture is test/fixtures/server-caps.json: a vendored READ of the
// server constant with full provenance (file, line, constant, the server
// master sha the coord was read at). The estate precedent is the clients'
// contract pins (S181-era); the website had no server-pin convention — this
// file starts one. The number deliberately does NOT live in
// shared/content.json: that file is the marketing-FACT SSOT authored here,
// while this fixture records another repo's code as read on a dated sha —
// different provenance, different refresh discipline.
//
// The laws:
//   1. the fixture parses, is a positive integer, and carries full provenance
//      (shape enforced at the boundary; the law body below trusts it);
//   2. every cap-shaped number in a SHIPPED surface (build inputs the way
//      tools/build.mjs consumes them: sites/ minus review archives,
//      brand-kits/, shared/, root HTML) equals the fixture — scanned in BOTH
//      forms (as-written and markup-collapsed) on the two-forms discipline;
//   3. every "MAX_MEMBERS = <n>" comment cite in the sibling law file equals
//      the fixture too — D1's "coords are comment cites only" problem is
//      closed by making the comments themselves pinned content;
//   4. teeth controls: synthetic drifts (bare, qualifier, markup-split) all
//      convict and the honest shapes (no number, foreign noun, matching
//      number) all acquit — the matcher may never go silently blind.
//
// WHY test/ SITS OUTSIDE LAW 2's PERIMETER: law 1 of variant-copy-truth
// .test.mjs established that review archives and law files QUOTE retracted
// claims as evidence ("the quantum-stream '16 simultaneous observers'
// miscount" survives there on purpose). Those quotes carry stale numbers AS
// HISTORICAL RECORD; law 3 pins only the live-cap comment cites, which must
// track the fixture. A copy DELETE anywhere in the shipped perimeter reddens
// law 2's floor (measured 2026-10-30: thunder-strike/features.html x2,
// velocity-x/about.html x1, quantum-stream/features.html x1 = 4) — losing a
// carrier must be a deliberate re-bless, never silent unbinding (the exact
// posture R-WEBSITE-12's family floors took, and for the same reason: an
// unbound class re-opens in total silence).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FIXTURE_PATH = join(ROOT, 'test', 'fixtures', 'server-caps.json');
const SIBLING_LAW = 'test/variant-copy-truth.test.mjs';

// ── law 1: parse the fixture at the boundary, fail loud on any shape rot ────
const CAPS = JSON.parse(readFileSync(FIXTURE_PATH, 'utf8'));
const SRC = CAPS.syncplay_max_members_source;

test('cap law 1: the vendored fixture is a positive integer with full provenance', () => {
  assert.ok(
    Number.isInteger(CAPS.syncplay_max_members) && CAPS.syncplay_max_members >= 1,
    `syncplay_max_members must be a positive integer, got ${JSON.stringify(CAPS.syncplay_max_members)}`,
  );
  assert.ok(SRC, 'syncplay_max_members_source missing — the number needs provenance');
  for (const key of ['repo', 'file', 'constant', 'server_master_sha', 'vendored_on']) {
    assert.equal(typeof SRC[key], 'string', `provenance ${key} must be a string`);
    assert.ok(SRC[key].length > 0, `provenance ${key} must not be empty`);
  }
  assert.match(SRC.server_master_sha, /^[0-9a-f]{40}$/, 'server_master_sha must be a full sha');
  assert.match(SRC.vendored_on, /^\d{4}-\d{2}-\d{2}$/, 'vendored_on must be an ISO date');
  assert.match(SRC.file, /^src\//, 'provenance file must be a server src/ path');
  assert.match(SRC.constant, /MAX_MEMBERS$/, 'provenance constant must name MAX_MEMBERS');
  for (const key of ['line', 'rejection_arm']) {
    assert.ok(key in SRC, `provenance ${key} missing — coords are the whole point`);
  }
  assert.ok(
    Number.isInteger(SRC.line) && SRC.line >= 1,
    'provenance line must be a positive integer',
  );
});

// ── shared machinery (house idioms, mirrored from the sibling laws) ─────────
// build.mjs keepInSite() in miniature — review archives and authoring records
// quote cured claims as evidence and must not convict (variant-copy-truth
// ships()/NOT_SHIPPED, same list, same reasons).
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

const TEXT_EXT = /\.(?:html|css|cjs|js|mjs|json|md|txt|xml|svg|yml|yaml)$/i;

// Same decode discipline as test/public-hub-truth.test.mjs.
const TRACKED = execFileSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

// Markup-collapse pass (the M8r2 lesson: a claim split across tags is one
// claim to a reader; tags and nbsp entities fold to spaces).
function stripMarkup(text) {
  return text
    .replace(/&nbsp;|&#0*160;/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ');
}

// The cap-shaped copy family: a stated maximum bound to the room-membership
// nouns, across the qualifier words the corpus uses. Noun set mirrors the
// sibling FORBIDDEN "unlimited (viewers|members|participants|observers|
// guests)" arm plus the "observers" carrier that copy form uses; "devices"
// and the placard nouns are R-WEBSITE-12's pairing territory, NOT this law's
// — a number bound to a DIFFERENT server cap must never be policed by this
// fixture. Separators allow hyphens ("50-member rooms"); the gap after the
// number admits the qualifier family once.
const CAP_RE =
  /\b(?:up to|at most|as many as|maximum of|max of|capped at|limited to|no more than)\s+(\d{1,4})\b(?:\s+(?:simultaneous|concurrent|active|total|registered|verified|online))?[\s-]+(?:viewers?|members?|observers?|participants?|guests?)\b/gi;

/** Every cap-number claim in `text`, with its number and a snippet. */
function capHits(text) {
  const out = [];
  for (const m of text.matchAll(CAP_RE)) {
    out.push({ n: Number(m[1]), snippet: m[0], index: m.index });
  }
  return out;
}

// ── law 2: shipped copy obeys the fixture ───────────────────────────────────
test('cap law 2: every server-cap number in a shipped surface equals the vendored fixture', () => {
  const perimeter = /^(?:sites\/|brand-kits\/|shared\/|[^/]+\.html$)/;
  let scanned = 0;
  let rawHits = 0;
  const offenders = [];
  for (const rel of TRACKED) {
    if (!perimeter.test(rel) || !TEXT_EXT.test(rel) || !ships(rel)) continue;
    scanned++;
    const text = readFileSync(join(ROOT, rel), 'utf8');
    for (const hit of capHits(text)) {
      rawHits++;
      if (hit.n !== CAPS.syncplay_max_members) {
        const line = text.slice(0, hit.index).split('\n').length;
        offenders.push(`${rel}:${line}: "${hit.snippet}" says ${hit.n}`);
      }
    }
    const collapsed = stripMarkup(text);
    for (const hit of capHits(collapsed)) {
      // Raw form already saw unsplit copy; only the SPLIT shape is collapse-
      // specific, and any drift — split or not — must name the file.
      if (hit.n !== CAPS.syncplay_max_members) {
        offenders.push(`${rel}: markup-collapsed "${hit.snippet}" says ${hit.n}`);
      }
    }
  }
  assert.deepEqual(offenders, [], `stale server-cap copy (fixture says ${CAPS.syncplay_max_members}):\n  ${offenders.join('\n  ')}`);
  // Non-vacuity floors (measured at landing, 2026-10-30): perimeter 2720,
  // raw cap hits exactly 4 — thunder-strike/features.html x2,
  // velocity-x/about.html, quantum-stream/features.html. The hit floor means
  // a matcher, noun list, or perimeter that silently stops binding reddens
  // here instead of shipping green over an unbound class.
  assert.ok(scanned >= 2000, `cap law scanned only ${scanned} files; the perimeter collapsed`);
  assert.ok(
    rawHits >= 4,
    `cap law bound only ${rawHits} cap copies; the family unbound (measured 4 at landing)`,
  );
});

// ── law 3: the sibling law's comment cites are pinned content too ──────────
test('cap law 3: every MAX_MEMBERS comment cite in the sibling law tracks the fixture', () => {
  const src = readFileSync(join(ROOT, SIBLING_LAW), 'utf8');
  const cites = [...src.matchAll(/MAX_MEMBERS\s*=\s*(\d+)/g)];
  assert.ok(
    cites.length >= 1,
    'no MAX_MEMBERS = <n> cite left in the sibling law — the provenance pointer died',
  );
  for (const c of cites) {
    assert.equal(
      Number(c[1]),
      CAPS.syncplay_max_members,
      `a "${SIBLING_LAW}" comment cites MAX_MEMBERS = ${c[1]} while the fixture says ${CAPS.syncplay_max_members}`,
    );
  }
  assert.ok(
    /GroupState\.php/.test(src),
    `the sibling law lost its GroupState.php provenance cite entirely`,
  );
});

// ── law 4: teeth — the matcher may never go shape-blind ─────────────────────
test('cap law 4: drifts convict and honest shapes acquit (both forms)', () => {
  const drift = [
    ['Host watch parties for up to 61 viewers.', 61],
    ['The room is capped at 51 participants.', 51],
    ['Invite as many as 52 guests.', 52],
    ['At most 53 observers per couch.', 53],
    ['A room holds up to 61 members.', 61],
  ];
  for (const [text, n] of drift) {
    const hits = capHits(text);
    assert.equal(hits.length, 1, `expected exactly one cap hit in: ${text}`);
    assert.equal(hits[0].n, n, `drifted number not captured in: ${text}`);
    assert.notEqual(hits[0].n, CAPS.syncplay_max_members, `plant accidentally honest: ${text}`);
  }
  // The markup-split shape (M8r2's lesson): raw misses, collapse convicts.
  const split = '<p>Watch with up to <strong>49</strong> members.</p>';
  assert.equal(capHits(split).length, 0, 'raw form should miss the split shape');
  assert.equal(capHits(stripMarkup(split))[0].n, 49, 'collapse must convict the split shape');
  const acquit = [
    'Watch together, perfectly in step — everyone on the same frame.',
    'Five native clients, the web portal, and any DLNA device.',
    'Pair up to 12 devices from one library.',
    'Groups hold up to 50 members and stay in step.',
  ];
  for (const text of acquit) {
    for (const hit of capHits(text)) {
      assert.equal(
        hit.n,
        CAPS.syncplay_max_members,
        `honest shape convicted: "${hit.snippet}" in: ${text}`,
      );
    }
  }
  assert.equal(capHits(acquit[3]).length, 1, 'the matching-number control must still bind');
});
