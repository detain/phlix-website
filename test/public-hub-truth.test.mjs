// Guard: no fabricated public-hub claim ever reaches what GitHub Pages serves
// (review website__newcomer M-WEBSITE-04).
//
// Run with `npm run test:unit` (`node --test "test/**/*.test.mjs"`).
//
// WHY THIS FILE EXISTS
// --------------------
// Up to a8597e21, hand-authored kit pages shipped sentences like "No setup.
// Point your server at `hub.phlix.io`" and "The public Phlix Hub at
// `hub.phlix.org` is free to use". None of those domains was ever a running
// service: hub.phlix.io/.org/.dev/.app/.tv (and .media, named in be34d142's
// own message) are NXDOMAIN or placeholders, and the hub is self-host-only
// today. Every such sentence was a marketing promise a newcomer could act on
// — actionable as a lie on the deployed pages.
//
// The deployed surface is an ARTIFACT, not a committed tree: `.gitignore`
// excludes `dist/`, and `.github/workflows/pages.yml` runs `npm run build`
// and uploads the result via `actions/upload-pages-artifact`. What visitors
// see is therefore exactly "current source, through the current build" —
// law 4 pins that pipeline; if CI ever stops building, the guarantee every
// law here makes about source truth stops holding for the deployed site.
//
// The laws, and what each one can catch that the others cannot:
//
//   1. no forbidden claim in any BUILD INPUT (root templates, brand-kit data,
//      shared content, every sites/ file that `keepInSite` lets ship);
//   2. no forbidden claim in the ARTIFACT — a real `tools/build.mjs` run of
//      the real inputs into a throwaway root, measured file by file;
//   3. the artifact is non-vacuous AND carries the self-host truth where the
//      review named it (midnight-jazz, event-horizon) and at the canonical
//      FAQ floor across the whole published set;
//   4. pages.yml still builds before it uploads.
//
// WHY A THROWAWAY ROOT AND NOT THE LOCAL `dist/`: test/csp-gate.test.mjs law
// 5 rebuilds the repo's own `dist/` (`rmSync` + re-copy) inside the same
// concurrent `node --test` run. A test that read repo `dist/` would race that
// rebuild and flake. Building through symlinked inputs into an isolated root
// measures the identical bytes CI will publish, touches nothing shared, and
// behaves the same on a clean CI checkout as on a dev machine.

import { after, test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = join(ROOT, 'tools', 'build.mjs');

// [pattern, what it was] — every entry is a verbatim or near-verbatim member
// of the M-WEBSITE-04 evidence set (the five fabricated domains + the claim
// sentences that leaned on them). Case-insensitive: pages vary capitalisation
// per kit voice. `.media` is not one of the five the review counted, but
// be34d142 names it in the same breath ("NXDOMAIN or placeholders"); a sixth
// dead hub domain must die with the other five.
const FORBIDDEN = [
  [/hub\.phlix\.(?:io|org|dev|app|tv|media)/i, 'fabricated public-hub domain'],
  [/public Phlix Hub at/i, 'the "public Phlix Hub at <domain>" claim'],
  [/use the public one/i, 'the "…or use the public one" FAQ'],
  [/No setup\. Point your server/i, 'the "No setup. Point your server" claim'],
  [/public Hub is free/i, 'the "public Hub is free to use" claim'],
  // MWEB-ADJ (zombie-residue adjudication, 2026-10-29): the hub-subdomain net
  // was apex-blind. phlix.io and phlix.app are NXDOMAIN and phlix.tv resolves
  // only to a GoDaddy parking page (getent + r1 fb4aee20 findings, re-probed
  // this lane); Phlix has no service domain — the site itself is served from
  // detain.github.io/phlix-website. Survivors: a tunnel.phlix.io example, a
  // brand@phlix.io copyright banner, and two og-image wordmarks.
  [/\bphlix\.(?:io|tv|app)\b/i, 'fabricated Phlix-service apex domain (NXDOMAIN or parked)'],
  [
    /\bdocs\.phlix\b/i,
    'the invented docs-attribution handle "docs.phlix" (new_site.md conflict table: quotes attribute to the project)',
  ],
];

// The corrected sentence, as the truth sweep phrases it across kit voices.
// Measured 48 matching files in a fresh artifact at cure time; the floor is
// 15 so legitimate re-voicing of a few pages cannot erase the corpus.
const TRUTH = /no public (?:Hub|instance)|not offered as a hosted service|no hosted Hub/i;
const TRUTH_FLOOR = 15;

// build.mjs keepInSite() in miniature: these inputs never ship, so they are
// not this law's business (the review archives under sites/*/reviews/ quote
// the fabricated sentences AS EVIDENCE and must not redden the scan).
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

// Scan text inputs as utf8; binary artifacts (fonts, images) are scanned
// latin1 — byte-preserving, so an ASCII claim cannot hide in a mangled decode.
const TEXT_EXT = /\.(?:html|css|js|mjs|json|md|txt|xml|svg|yml|yaml)$/i;

function walk(dir, base = '') {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(join(dir, entry.name), rel));
    else if (entry.isFile()) out.push(rel);
  }
  return out;
}

function assertClean(text, label) {
  for (const [pattern, what] of FORBIDDEN) {
    assert.ok(!pattern.test(text), `${label}: ${what} is back — /${pattern.source}/ matched`);
  }
}

const tempRoots = [];
after(() => {
  for (const dir of tempRoots) rmSync(dir, { recursive: true, force: true });
});

/**
 * A temp project root whose inputs are symlinks to the real tree. build.mjs
 * resolves every path from process.cwd(), so running it here publishes the
 * REAL current inputs into an isolated dist/ — the same bytes the CI build
 * job will hand to upload-pages-artifact, without touching repo dist/.
 */
function realInputsRoot() {
  const dir = mkdtempSync(join(tmpdir(), 'phlix-public-hub-truth-'));
  tempRoots.push(dir);
  for (const name of ['brand-kits', 'sites', 'shared']) {
    symlinkSync(join(ROOT, name), join(dir, name), 'dir');
  }
  for (const name of ['index.html', '404.html', '_headers']) {
    symlinkSync(join(ROOT, name), join(dir, name), 'file');
  }
  // Module-format marker for the symlinked kit imports, same as the real root.
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ type: 'module' }), 'utf8');
  return dir;
}

test('law 1: no fabricated public-hub claim in any build input', () => {
  for (const rel of ['index.html', '404.html', '_headers']) {
    assertClean(readFileSync(join(ROOT, rel), 'utf8'), rel);
  }
  for (const file of walk(join(ROOT, 'shared'))) {
    if (!TEXT_EXT.test(file)) continue;
    assertClean(readFileSync(join(ROOT, 'shared', file), 'utf8'), `shared/${file}`);
  }
  for (const file of walk(join(ROOT, 'brand-kits'))) {
    if (!/\.(?:js|json)$/i.test(file)) continue;
    assertClean(readFileSync(join(ROOT, 'brand-kits', file), 'utf8'), `brand-kits/${file}`);
  }
  for (const file of walk(join(ROOT, 'sites'))) {
    if (!ships(file) || !TEXT_EXT.test(file)) continue;
    assertClean(readFileSync(join(ROOT, 'sites', file), 'utf8'), `sites/${file}`);
  }
  // Positive anchor at the SSOT: the canonical FAQ must keep saying the hub
  // is self-hosted with no public instance — so a "cure" that quietly
  // deletes the truth (instead of planting a lie) cannot go unnoticed here.
  const content = readFileSync(join(ROOT, 'shared', 'content.json'), 'utf8');
  assert.match(content, /there is no public instance today/i, 'content.json FAQ lost its truth');
});

test('law 2+3: the Pages artifact of a real build carries zero forbidden claims and the truth', () => {
  const dir = realInputsRoot();
  execFileSync(process.execPath, [BUILD], { cwd: dir, encoding: 'utf8', stdio: 'pipe' });
  const dist = join(dir, 'dist');

  const files = walk(dist);
  // Non-vacuity floor for the artifact scan: the published tree is ~2.2k
  // files / 723 HTML pages at cure time. If the build ever collapses to an
  // empty-ish tree, a green claim-scan would be vacuous — so scale is pinned.
  assert.ok(files.length >= 2000, `artifact has ${files.length} files; the scan is vacuous`);
  assert.ok(
    files.filter((f) => f.endsWith('.html')).length >= 700,
    'artifact HTML count collapsed below the published set',
  );

  let truthFiles = 0;
  for (const rel of files) {
    const text = readFileSync(join(dist, rel), {
      encoding: TEXT_EXT.test(rel) ? 'utf8' : 'latin1',
    });
    assertClean(text, `dist/${rel}`);
    if (TRUTH.test(text)) truthFiles += 1;
  }
  assert.ok(
    truthFiles >= TRUTH_FLOOR,
    `only ${truthFiles} artifact files carry the self-host truth (floor ${TRUTH_FLOOR}) — ` +
      'the M-WEBSITE-04 cure corpus is eroding',
  );

  // Evidence anchors: the exact pages the review cited by file:line. The
  // claim is gone AND the corrected sentence stands in its place.
  for (const [slug, sentence] of [
    ['midnight-jazz', /no hosted hub|not offered as a hosted service/i],
    ['event-horizon', /there is no public hub today/i],
  ]) {
    const path = join(dist, slug, 'hub.html');
    assert.ok(statSync(path).isFile(), `dist/${slug}/hub.html vanished from the artifact`);
    assert.match(readFileSync(path, 'utf8'), sentence, `${slug}: evidence anchor lost`);
  }
});

test('law 4: pages.yml still rebuilds from source before uploading (dist/ is never committed)', () => {
  // Everything above protects SOURCE. That is the deployed reality only
  // while CI builds at deploy time: the Pages artifact comes from `npm run
  // build`, not from a committed tree (`dist/` is in .gitignore). If either
  // half changes, the deployed-site guarantee changes with it — re-anchor
  // this file then, do not delete it.
  const yml = readFileSync(join(ROOT, '.github', 'workflows', 'pages.yml'), 'utf8');
  assert.match(yml, /npm run build/, 'pages.yml no longer builds before deploy');
  assert.match(yml, /upload-pages-artifact/, 'pages.yml no longer uploads a built artifact');
  assert.match(yml, /path:\s*dist/, 'pages.yml uploads something other than dist/');
  const ignored = readFileSync(join(ROOT, '.gitignore'), 'utf8');
  assert.match(
    ignored,
    /^\/?dist\/?$/m,
    'dist/ left .gitignore — the stale-committed-dist era ' +
      'this review flagged is returning; law 2 must then measure the COMMITTED tree, not a rebuild',
  );
});
