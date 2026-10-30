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
//   4. pages.yml still builds before it uploads;
//   5. the M13r1 hosted-offer arms have teeth: the six shipped survivor
//      bodies (parent commit, verbatim) and the review-named fresh plants
//      each convict an M13r1 arm, while the honest anchor-then-verb idiom,
//      its acquitted neighbours, and the variant-copy law 6 client
//      sign-in/hub-mode family are netted by NOTHING in this registry.
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
  // M-WEBSITE-13 r1 ask 2 (review website__writer M3 family): the hosted-OFFER
  // forms. The domain arms above killed the fake addresses, but heading-flip
  // cures left hosted-service BODIES standing under honest "No hosted Hub"
  // headings — six shipped pages promised a sign-up, a team-maintained hosted
  // service, zero infrastructure, or a "sign in" behind a repository URL.
  // Each arm binds the OFFER CONTEXT (a hosted service you join), never a bare
  // verb: the honest anchor-then-verb idiom (afrofuturism/power-up/
  // desert-mirage/arctic-passage — "run your own… sign in there…") and the
  // variant-copy law 6 client sign-in/hub-mode family stay GREEN, pinned
  // per-arm in law 5. "Free to use" alone would net honest free-software
  // prose; "maintained by the Phlix team" alone would net the truthful
  // plugins sentence in neural-link — the compound is the lie.
  [
    /free to use\s*[,.]?\s*maintained by the phlix team/i,
    'M13r1 hosted-offer form: "free to use, maintained by the Phlix team" hosted-service bait',
  ],
  [
    /\bsign[\s-]+up\b[\s\S]{0,40}?\b(?:add your servers?|your own server|access anywhere)\b/i,
    'M13r1 hosted-offer form: a "sign up" flow into a hosted Hub (signup next to add-your-server/access-anywhere)',
  ],
  [
    /\bsign\s+(?:in|up)\s+at\s+(?:<strong>\s*)?github\.com/i,
    'M13r1 hosted-offer form: a service sign-in behind a repository URL ("sign in at github.com/…")',
  ],
  [/\bno infrastructure to manage\b/i, 'M13r1 hosted-offer form: "no infrastructure to manage"'],
  [
    /\bno configuration needed\.?\s+enable hub\b/i,
    'M13r1 hosted-offer form: "no configuration needed — enable Hub" zero-setup hosted promise',
  ],
  [
    /without hosting (?:your|their|its|our) own\b/i,
    'M13r1 hosted-offer form: remote access "without hosting their own" infrastructure',
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

// ── law 5 (M-WEBSITE-13 r1 ask 2): the hosted-offer arms, per-form ─────────
// The domain family above killed the fake addresses; r1's mutation battery
// then PROVED by plant that the hosted-OFFER sentences — "Sign up, add your
// server", "no infrastructure to manage", a "sign in" behind a repo URL —
// sailed through every arm green while shipping under honest "No hosted Hub"
// headings. This law is the executed overlap check the review demanded: each
// form is armed, each survivor convicts verbatim, and nothing honest — the
// self-host idiom or variant-copy law 6's client family — is netted.
const M13R1_ARMS = FORBIDDEN.filter(([, what]) => what.startsWith('M13r1 hosted-offer form'));

test('law 5: the hosted-offer arms convict every survivor and acquit the self-host idiom', () => {
  // Identity anchor (law 11/12 doctrine): exactly six M13r1 arms — if the
  // family leaves the registry, or a foreign arm joins the marker, this law
  // stops guarding and must fail loud HERE.
  assert.equal(
    M13R1_ARMS.length,
    6,
    'the hosted-offer family no longer anchors to exactly 6 registry arms ' +
      '(marker: "M13r1 hosted-offer form") — law 5 anchors moved',
  );

  // The six shipped bodies, verbatim from parent commit 0e450d38 (sites/
  // {tetris-grid,game-cartridge,celtic-twilight,film-noir,easter-egg,
  // library-amber}/hub.html), cured in this same commit — every one must
  // still convict, or the net has a hole exactly where r1 measured one.
  // Quoted here as REGEX-ARM INPUT, and the arms below name no client/
  // domain/platform token, so these lines sit outside every convicted
  // family's shape (variant law 1 scans this file whole-tree: it passed at
  // landing — if a future arm grows a shape that nets them, law 1 reddens,
  // never silence).
  // LIT-FIXTURE-BEGIN m13r1-survivor-pins (r1-convicted parents, quoted to ban)
  const SURVIVORS = [
    'Free to use, maintained by the Phlix team. Sign up, add your server, connect.',
    'Sign up once, add your servers, access anywhere. Zero configuration.',
    "The fastest path: sign in at github.com/detain/phlix-hub, point your server at the relay, and you're connected in minutes.",
    "The project does not run a hosted Hub today. Sign in, register your server, and you're done — no infrastructure to manage.",
    'No configuration needed. Enable Hub mode in your client and go.',
    'Best for: most users who want remote access without hosting their own infrastructure.',
  ];
  // The fresh-plant forms r1 named (shape probes, not files):
  const PLANTS = [
    'Sign up to the Hub, add your server, and stream from anywhere.',
    'The hosted Hub is free to use, maintained by the Phlix team.',
    'Sign in at <strong>github.com/detain/phlix-hub</strong> and you are connected.',
    'One account for every device — no infrastructure to manage.',
    'No configuration needed. Enable Hub and go.',
    'Watch from anywhere without hosting your own anything.',
  ];
  // LIT-FIXTURE-END m13r1-survivor-pins
  for (const claim of [...SURVIVORS, ...PLANTS]) {
    const hits = M13R1_ARMS.filter(([re]) => re.test(claim));
    assert.ok(
      hits.length >= 1,
      `the hosted-offer claim "${claim}" now slips the net again — every M13r1 arm missed it`,
    );
  }

  // GREEN battery, asserted against the WHOLE registry (all 13 arms): no new
  // arm may overreach into the honest copy that ships beside it.
  // LIT-FIXTURE-BEGIN m13r1-green-acquittals (verbatim tree sentences)
  const LEGAL = [
    // the anchor-then-verb models r1 named (afrofuturism / power-up /
    // desert-mirage / arctic-passage):
    'The project operates no public instance. Run phlix-hub on your own box, create your account there, and add your servers.',
    "There is no public Hub today — the Hub is open-source software you run yourself on a VPS or any always-on box. Sign in, register your server, and you're connected.",
    "There is no public Hub today — the Hub is open-source software you run yourself on a VPS or any always-on box. Register your server once, sign in on any client, and you're connected everywhere.",
    'No hosted Hub to register with today — run your own, register your server, and start accessing it immediately. It costs nothing because it is yours.',
    // the six cures, verbatim:
    'The Hub is free, open-source software you run yourself. Deploy it, create your account, connect.',
    'No hosted Hub exists to join. Run your own instance once, add your servers, and access them from anywhere.',
    "The fastest path: run the Hub on your own box from github.com/detain/phlix-hub, point your server at your relay, and you're connected in minutes.",
    "The project does not run a hosted Hub today. Stand up your own, sign in there, register your server, and you're done.",
    'No hosted Hub to flip a switch for. Run your own, then enable Hub mode in your client.',
    'Best for: most users who want remote access and are glad to run a small always-on box themselves.',
    // neighbours the review acquitted — bare verbs and other contexts:
    'There is no registry to sign up to and no build step.',
    'Holding a tiny peace sign up toward the viewer with a knowing grin',
    'No configuration needed. No manual port forwarding. The Hub handles it.',
    'Access your library from anywhere. TLS encrypted. Zero configuration.',
    'Hub mode is built in. One setting, zero configuration.',
    'Bridge your storm across networks. Access anywhere, own everything.',
    "These plugins are maintained by the Phlix team and demonstrate the range of what's possible.",
  ];
  // LIT-FIXTURE-END m13r1-green-acquittals
  for (const legal of LEGAL) {
    for (const [re, what] of FORBIDDEN) {
      assert.ok(
        !re.test(legal),
        `honest copy "${legal}" is netted by the arm for ${what} — overreach`,
      );
    }
  }

  // Cross-family discipline (r1 ask 2): the variant-copy law 6 client
  // sign-in/hub-mode family — its convicted fictions AND its adjudicated-
  // legal models — must stay GREEN through every M13r1 arm. Different lie
  // (client capability, not a hosted service), different net. The 28 strings
  // are READ AT RUNTIME from that law's own named LIT-FIXTURE regions rather
  // than duplicated here — this file sits inside variant-copy law 1's
  // whole-tree scan perimeter, and that scan masks ONLY its own file, so
  // claim-shaped literals may live in no other tracked file (measured the
  // hard way: a duplicated survivor reddened law 1 at first landing). Read-
  // don't-copy also kills drift: if law 6's family rotates, this check moves
  // with it, and a missing/thinned region fails loud instead of going quiet.
  const variantSrc = readFileSync(join(ROOT, 'test', 'variant-copy-truth.test.mjs'), 'utf8');
  const law6Family = [];
  for (const begin of [
    'LIT-FIXTURE-BEGIN law6-survivor-pins',
    'LIT-FIXTURE-BEGIN law6-legal-model-quotes',
  ]) {
    const a = variantSrc.indexOf(begin);
    const b = variantSrc.indexOf(begin.replace('BEGIN', 'END'), a);
    assert.ok(
      a !== -1 && b !== -1 && a < b,
      `the ${begin} region vanished from variant-copy-truth.test.mjs — law 6 moved its fixtures; re-anchor this read, do not delete it`,
    );
    for (const line of variantSrc.slice(a, b).split('\n')) {
      const m = line.match(/^\s*(["'])(.*)\1,?\s*$/);
      if (!m) continue;
      assert.ok(
        !m[2].includes('\\'),
        `law 6 fixture line carries an escape (backslash) — this extractor is exact only for the backslash-free regions it measured: ${line.trim().slice(0, 60)}`,
      );
      law6Family.push(m[2]);
    }
  }
  assert.ok(
    law6Family.length >= 28,
    `only ${law6Family.length} law 6 family strings extracted (floor 28 = 18 survivors + 10 legal models) — the regions went thin or the quote shape changed`,
  );
  for (const claim of law6Family) {
    for (const [re, what] of M13R1_ARMS) {
      assert.ok(
        !re.test(claim),
        `law 6 family sentence "${claim}" is netted by hosted-offer arm ${what} — family collision`,
      );
    }
  }
});
