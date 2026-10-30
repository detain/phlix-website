// Guard: the canonical root page sells Phlix, offers a working path to get
// it, and keeps the brand-kit gallery as what it is — themes below the fold.
// (Review website__newcomer M-WEBSITE-05: the published root was a skin
// gallery with zero value proposition and no install path; its content.json
// hero CTA pointed at a /download path that has never existed.)
//
// Run with `npm run test:unit` (`node --test "test/**/*.test.mjs"`).
//
// The laws, and which one catches what the others cannot:
//
//   1. the SOURCE template opens with the hero: exactly one <h1>, carrying
//      shared/content.json's headline verbatim (whitespace folded, because
//      prettier re-wraps prose), and a page <title> that sells the product;
//   2. the cost question is answerable on first paint: the word "free" and
//      both licenses appear (the review's 30-second test found neither);
//   3. every pitch/install sentence on the page is a VERBATIM member of the
//      content.json SSOT lists — marketing copy may be curated, not invented
//      (estate phantom-docs law: name nothing that the repos don't ship);
//   4. the primary CTA resolves: #install anchor + target section, and the
//      historic `/download` fiction is gone from the root document;
//   5. the gallery survives but is DEMOTED: variants-container still renders
//      (and still gets its manifest), strictly AFTER the install section;
//   6. measured on the BUILT ARTIFACT (a real tools/build.mjs of the real
//      inputs into an isolated root, per the public-hub-truth precedent):
//      every static href in dist/index.html resolves — fragments to ids in
//      the same document, site-relative paths to files in dist/, absolute
//      URLs only to the LIVE-VERIFIED allow-list (curl-checked 200 when this
//      file was written; exact set both directions, so a new external link
//      must be verified and listed here, never just added);
//      every built:true kit in the injected manifest has a real
//      dist/<slug>/index.html — the cards the gallery JS will build from that
//      same manifest cannot 404;
//   7. the build pin has teeth: stripping the headline, subheadline, install
//      command, or CTA target out of the template reddens the build BY NAME
//      (a pin nobody can violate is a pin nobody will keep).

import { after, test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdtempSync,
  readFileSync,
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
const content = JSON.parse(readFileSync(join(ROOT, 'shared', 'content.json'), 'utf8'));

/** Fold every run of whitespace (incl. newlines) to a single space. */
const fold = (s) => s.replace(/\s+/g, ' ').trim();
const template = () => readFileSync(join(ROOT, 'index.html'), 'utf8');

// Absolute hrefs shipped by the root page, exact. Every member was
// curl-verified (HTTP 200, redirects followed) on 2026-10-29 by the
// M-WEBSITE-05 lane; derivations from content.json keep them honest:
//   docs root, linux install guide, server repo, its releases, its LICENSE,
//   the hub repo. Font preconnect/stylesheet hosts are allowed by HOST
//   separately (the css2 URL carries a query string).
const ALLOWED_ABS = new Set([
  content.hero.secondary_cta.href,
  content.install.docs_url,
  content.site.social.github,
  `${content.site.social.github}/releases`,
  `${content.site.social.github}/blob/master/LICENSE`,
  content.ecosystem.find((e) => e.name === 'phlix-hub').repo,
]);
// R-WEBSITE-07 deleted the root gallery's Google Fonts <link>s (faces are
// self-hosted from the shared pool now), so this page has no external font
// refs — the old fonts.googleapis.com/fonts.gstatic.com host carve-out is
// gone: any future http(s) href must appear on the live-verified allow-list.

const tempRoots = [];
after(() => {
  for (const dir of tempRoots) rmSync(dir, { recursive: true, force: true });
});

/**
 * A temp project root whose inputs are symlinks to the real tree (the
 * public-hub-truth.test.mjs pattern): `tools/build.mjs` resolves from
 * process.cwd(), so this publishes the REAL current inputs into an isolated
 * dist/ without racing csp-gate law 5 over the repo's own dist/.
 */
function realInputsRoot(overrides = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'phlix-valueprop-'));
  tempRoots.push(dir);
  for (const name of ['brand-kits', 'sites', 'shared']) {
    symlinkSync(join(ROOT, name), join(dir, name), 'dir');
  }
  for (const name of ['404.html', '_headers']) {
    symlinkSync(join(ROOT, name), join(dir, name), 'file');
  }
  writeFileSync(join(dir, 'package.json'), JSON.stringify({ type: 'module' }), 'utf8');
  writeFileSync(
    join(dir, 'index.html'),
    overrides.indexHtml ?? readFileSync(join(ROOT, 'index.html'), 'utf8'),
    'utf8',
  );
  return dir;
}

/** Run tools/build.mjs in `cwd`; never throws, always reports what happened. */
function runBuild(cwd) {
  try {
    return {
      code: 0,
      out: execFileSync(process.execPath, [BUILD], { cwd, encoding: 'utf8', stdio: 'pipe' }),
    };
  } catch (err) {
    return { code: err.status ?? 1, out: `${err.stdout ?? ''}${err.stderr ?? ''}` };
  }
}

// ── Laws 1-5: the source template ──────────────────────────────────────────

test('law 1: the root template opens with the content.json hero, one <h1>', () => {
  const html = template();
  const h1s = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/g) ?? [];
  assert.equal(h1s.length, 1, `root index.html has ${h1s.length} <h1> elements, expected exactly 1`);
  assert.equal(
    fold(h1s[0].replace(/<[^>]*>/g, '')),
    fold(content.hero.headline),
    'the <h1> is not the content.json hero headline — the value prop and its SSOT drifted',
  );
  assert.ok(
    fold(html).includes(fold(content.hero.subheadline)),
    'the hero subheadline is not on the root page verbatim from content.json',
  );
  assert.ok(
    html.includes('<title>Phlix — ') && html.includes(content.hero.headline),
    'the page <title> does not sell the product with the hero headline',
  );
});

test('law 2: the cost question is answerable on the root page (newcomer 30s test)', () => {
  const html = fold(template());
  // The review found the word "free" nowhere on the site. The cure must say
  // it AND back it with the real licenses (content.json FAQ: server & hub
  // MPL-2.0, libraries/plugins/clients MIT — both named or the claim is bare).
  assert.match(html, /free and open source/i, 'the root page does not answer the cost question');
  assert.ok(html.includes('MPL-2.0'), 'the root page drops the server/hub license name');
  assert.ok(/MIT/.test(html), 'the root page drops the clients/libraries license name');
});

test('law 3: every pitch bullet is a verbatim content.json bullet (no invented features)', () => {
  const html = template();
  const pitchBlock = html.match(/<ul class="pitch">([\s\S]*?)<\/ul>/);
  assert.ok(pitchBlock, 'the hero pitch list vanished from the root template');
  const bullets = [...pitchBlock[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => fold(m[1]));
  assert.ok(bullets.length >= 3, `only ${bullets.length} pitch bullets — the hero is empty again`);
  const ssot = new Set(content.pitch_bullets.map(fold));
  for (const b of bullets) {
    assert.ok(ssot.has(b), `pitch bullet is NOT from shared/content.json (invented?): "${b}"`);
  }
});

test('law 4: the primary CTA resolves — #install anchor to a real section, no /download fiction', () => {
  const html = template();
  const cta = content.hero.primary_cta;
  assert.match(cta.href, /^#[A-Za-z]/, `content.json hero.primary_cta.href must be a #fragment`);
  const anchor = html.match(new RegExp(`<a[^>]*href="${cta.href}"[^>]*>([\\s\\S]*?)</a>`));
  assert.ok(anchor, `no <a href="${cta.href}"> on the root page`);
  assert.ok(
    fold(anchor[1]).includes(cta.label),
    `the primary CTA does not carry its content.json label (${JSON.stringify(cta.label)})`,
  );
  assert.ok(
    html.includes(`id="${cta.href.slice(1)}"`),
    `the primary CTA target section id="${cta.href.slice(1)}" does not exist on the page`,
  );
  assert.doesNotMatch(
    html,
    /href="\/download"/,
    'the /download fiction (a path no published root page provides) is back',
  );
});

test('law 5: the gallery survives, contextualised, and BELOW the install section', () => {
  const html = template();
  assert.ok(html.includes('id="variants-container"'), 'the brand-kit gallery container vanished');
  // R-WEBSITE-06 moved the renderer out of the inline island into a file
  // (script-src ships without 'unsafe-inline'); the contract string now lives
  // in that file, and the template's job is to load it.
  assert.ok(
    html.includes('src="shared/assets/js/gallery.js"'),
    'the root template no longer loads the gallery renderer file',
  );
  const gallerySrc = readFileSync(join(ROOT, 'shared', 'assets', 'js', 'gallery.js'), 'utf8');
  assert.ok(gallerySrc.includes('__PHLIX_KITS__'), 'the gallery manifest contract vanished');
  assert.ok(html.includes('variants-grid'), 'the gallery card grid vanished');
  const installAt = html.indexOf('id="install"');
  const galleryAt = html.indexOf('id="variants-container"');
  assert.ok(installAt !== -1 && galleryAt > installAt, 'the gallery is not demoted below install');
  assert.match(
    fold(html),
    /<h2>Your server, your look: official brand-kit themes<\/h2>/,
    'the gallery lost its "official themes" framing — it is a showcase, not the product',
  );
  // The install copy itself: SSOT strings verbatim, nothing retyped.
  for (const [what, needle] of [
    ['install label', content.install.primary.label],
    ['install command', content.install.primary.command],
    ['requirements', content.install.requirements],
    ['installer notes', content.install.primary.notes],
    ['install docs link', content.install.docs_url],
  ]) {
    assert.ok(fold(html).includes(fold(needle)), `install section is missing the SSOT ${what}`);
  }
  assert.ok(
    fold(html).includes(fold(content.footer.tagline)),
    'the footer lost the content.json tagline',
  );
});

// ── Law 6: the built artifact ───────────────────────────────────────────────

test('law 6: in the built artifact every link resolves and no card points at a 404', () => {
  const dir = realInputsRoot();
  const built = runBuild(dir);
  assert.equal(built.code, 0, `real inputs must build:\n${built.out}`);
  const dist = join(dir, 'dist');
  const html = readFileSync(join(dist, 'index.html'), 'utf8');

  // (a) static hrefs: fragments → ids; absolute → allow-list; other → dist files.
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  const absolutes = new Set();
  for (const raw of html.match(/href="([^"]*)"/g).map((m) => m.slice(6, -1))) {
    if (raw.startsWith('#')) {
      assert.ok(ids.has(raw.slice(1)), `root page links ${raw} but no element carries that id`);
    } else if (/^https?:/.test(raw)) {
      absolutes.add(raw);
    } else {
      const target = join(dist, raw === './' ? 'index.html' : raw.replace(/^\.?\//, ''));
      assert.ok(existsSync(target), `root page links "${raw}" — not in dist/ (404 CTA)`);
    }
  }
  for (const url of absolutes) {
    assert.ok(ALLOWED_ABS.has(url), `absolute href not on the live-verified allow-list: ${url}`);
  }
  for (const url of ALLOWED_ABS) {
    assert.ok(absolutes.has(url), `allow-list entry ${url} is no longer linked — prune it here`);
  }

  // (b) the gallery cards the page JS will build are cards on THIS manifest:
  // every built:true kit must exist in dist/ or its ./<slug>/index.html 404s.
  // Since R-WEBSITE-06 the manifest is a FILE (script-src 'self' refuses the
  // old inline injection), so the contract is measured where it now lives.
  assert.match(
    html,
    /<script src="assets\/js\/kit-manifest\.js"><\/script>/,
    'dist/index.html lost its kit-manifest.js script reference',
  );
  const manifestJs = readFileSync(join(dist, 'assets', 'js', 'kit-manifest.js'), 'utf8');
  assert.ok(
    manifestJs.startsWith('window.__PHLIX_KITS__=[') && manifestJs.endsWith('];'),
    'kit-manifest.js is not the window.__PHLIX_KITS__=[...]; contract',
  );
  const kits = JSON.parse(manifestJs.slice('window.__PHLIX_KITS__='.length, -1));
  assert.ok(kits.length >= 3, `manifest has only ${kits.length} kits — non-vacuity`);
  const builtKits = kits.filter((k) => k.built);
  assert.ok(builtKits.length >= 3, 'no built sites in the manifest — non-vacuity');
  for (const kit of builtKits) {
    assert.ok(
      statSync(join(dist, kit.slug, 'index.html')).isFile(),
      `gallery card ./ ${kit.slug}/index.html would 404`,
    );
  }

  // (c) the structure the browser will show: one h1 = the hero; install
  // section above the gallery container.
  assert.equal((html.match(/<h1/g) ?? []).length, 1, 'the built root page has multiple <h1>');
  assert.ok(html.indexOf('id="install"') < html.indexOf('id="variants-container"'));
});

// ── Law 7: the build pin cannot be silently bypassed ────────────────────────

test('law 7: the landing pin reddens the build by name for each stripped SSOT string', () => {
  const html = template();
  const strip = (needle) => {
    // Long prose is prettier-wrapped in the template: match it whitespace-
    // flexibly so the surgery removes the real bytes, not an idealised copy.
    const rx = new RegExp(fold(needle).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s+'));
    assert.ok(rx.test(html), `pin fixture premise: "${needle.slice(0, 40)}…" is in the template`);
    return html.replace(rx, 'X');
  };
  const cases = [
    [() => html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, '<h1>Some gallery</h1>'), /hero headline/],
    [() => strip(content.hero.subheadline), /subheadline/],
    [() => strip(content.install.primary.command), /install command/],
    [() => html.replace(`href="${content.hero.primary_cta.href}"`, 'href="#"'), /primary CTA/],
    [() => html.replace('id="install"', 'id="nope"'), /primary CTA/],
  ];
  for (const [mutate, expected] of cases) {
    const dir = realInputsRoot({ indexHtml: mutate() });
    const built = runBuild(dir);
    assert.notEqual(built.code, 0, `build accepted a mutated root template (${expected})`);
    assert.match(built.out, expected, `pin fired but not BY NAME:\n${built.out}`);
  }
});
