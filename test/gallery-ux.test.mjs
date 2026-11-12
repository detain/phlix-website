// Guard: the root brand-kit gallery's UX contract (WEB-S8 — review findings
// WEB-16, WEB-22).
//
// Run with `npm run test:unit` (`node --test "test/**/*.test.mjs"`).
//
// The laws:
//
//   1. ONE instruction verb: the static .subtitle line and the floating
//      .hover-hint chip both say "hover to enlarge" / "click to open" — the
//      chip's old "Hover to preview" contradicted the line above the grid;
//   2. the instruction is PERSISTENT: it lives in the static .subtitle node
//      and gallery.js never addresses that node (the renderer used to
//      overwrite it with the kit count, deleting the instruction on load);
//      the count gets its own .gallery-count node;
//   3. FEATURED DEFAULT, measured by RUNNING the real renderer against a
//      minimal fake DOM: the grid is actually attached to #variants-container
//      (R-WEBSITE-07 ff4 had dropped the append — the cards were built into a
//      detached node and the gallery shipped empty), the default view is the
//      featured set in FEATURED_SLUGS order, the instruction text survives,
//      and "Show all" appends the rest below through the same per-frame
//      chunker (CARDS_PER_FRAME — the R-WEBSITE-07 frame budget) and moves
//      focus to the first revealed card;
//   4. no featured match (a fixture build) degrades to the full grid with no
//      "Show all" button;
//   5. every FEATURED_SLUGS entry is a real, pinned, BUILT kit — a typo or a
//      deleted kit reddens here instead of silently shrinking the showcase.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import vm from 'node:vm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const GALLERY_SRC = readFileSync(join(ROOT, 'shared', 'assets', 'js', 'gallery.js'), 'utf8');
const TEMPLATE = readFileSync(join(ROOT, 'index.html'), 'utf8');
const fold = (s) => s.replace(/\s+/g, ' ').trim();

const featuredMatch = /const FEATURED_SLUGS = \[([\s\S]*?)\];/.exec(GALLERY_SRC);
const FEATURED = featuredMatch
  ? [...featuredMatch[1].matchAll(/'([a-z0-9-]+)'/g)].map((m) => m[1])
  : [];

function textOf(cls) {
  const m = new RegExp(`<(\\w+) class="${cls}"[^>]*>([\\s\\S]*?)</\\1>`).exec(TEMPLATE);
  return m ? fold(m[2]) : null;
}

/** A DOM just deep enough for gallery.js — every node it touches is recorded. */
function fakeDom({ subtitleText, withMore = true }) {
  const frames = [];
  const listeners = {};
  function el(tag, cls = '') {
    return {
      tagName: tag.toUpperCase(),
      className: cls,
      children: [],
      textContent: '',
      innerHTML: '',
      hidden: false,
      style: { setProperty() {}, animationDelay: '' },
      focused: false,
      appendChild(child) {
        this.children.push(child);
        child.parentNode = this;
        return child;
      },
      addEventListener(type, fn) {
        (this.handlers ||= {})[type] = fn;
      },
      focus() {
        this.focused = true;
      },
    };
  }
  const container = el('div');
  container.id = 'variants-container';
  const subtitle = el('p', 'subtitle');
  subtitle.textContent = subtitleText;
  const count = el('p', 'gallery-count');
  const more = withMore ? el('button', 'gallery-more') : null;
  if (more) more.hidden = true;
  const hint = el('div', 'hover-hint');
  hint.classList = { toggle() {} };
  const bySelector = {
    '.subtitle': subtitle,
    '.gallery-count': count,
    '.gallery-more': more,
    '.hover-hint': hint,
  };
  const document = {
    documentElement: { clientWidth: 1280 },
    getElementById: (id) => (id === 'variants-container' ? container : null),
    querySelector: (sel) => bySelector[sel] ?? null,
    querySelectorAll: () => [],
    createElement: (tag) => el(tag),
  };
  class IntersectionObserver {
    observe() {}
  }
  const window = {
    addEventListener: (type, fn) => (listeners[type] = fn),
  };
  const ctx = {
    document,
    window,
    IntersectionObserver,
    requestAnimationFrame: (fn) => frames.push(fn),
    setTimeout,
    clearTimeout,
  };
  return { ctx, window, frames, container, subtitle, count, more };
}

function drain(frames) {
  let n = 0;
  while (frames.length) {
    frames.shift()();
    n++;
    assert.ok(n < 1000, 'renderer never stopped scheduling frames');
  }
  return n;
}

function run(kits, opts = {}) {
  const dom = fakeDom({ subtitleText: 'INSTRUCTION', ...opts });
  dom.window.__PHLIX_KITS__ = kits;
  vm.runInNewContext(GALLERY_SRC, dom.ctx, { filename: 'gallery.js' });
  return dom;
}

const kit = (slug) => ({ slug, built: true, name: slug, colors: ['#336699'], accent: '#e8ff47' });

test('law 1: one instruction verb across the static line and the hover chip', () => {
  const subtitle = textOf('subtitle');
  const chip = textOf('hover-hint');
  assert.ok(subtitle, 'the gallery instruction line (.subtitle) vanished from index.html');
  assert.ok(chip, 'the hover chip (.hover-hint) vanished from index.html');
  assert.match(subtitle, /hover to enlarge/i, 'the instruction line lost "hover to enlarge"');
  assert.match(subtitle, /click to open/i, 'the instruction line lost "click to open"');
  assert.match(chip, /hover to enlarge/i, 'the chip no longer uses the instruction line verb');
  assert.match(chip, /click to open/i, 'the chip lost "click to open"');
  assert.doesNotMatch(
    TEMPLATE,
    /hover to preview/i,
    'the contradicting "Hover to preview" verb is back',
  );
});

test('law 2: the instruction node is never script-written; the count has its own node', () => {
  assert.ok(
    !/['"`]\.subtitle['"`]/.test(GALLERY_SRC),
    'gallery.js addresses .subtitle again — the render would overwrite the instruction',
  );
  assert.ok(GALLERY_SRC.includes("'.gallery-count'"), 'gallery.js no longer writes .gallery-count');
  assert.match(
    TEMPLATE,
    /<p class="gallery-count"[^>]*><\/p>/,
    'the empty .gallery-count node vanished',
  );
  const subAt = TEMPLATE.indexOf('class="subtitle"');
  const countAt = TEMPLATE.indexOf('class="gallery-count"');
  const gridAt = TEMPLATE.indexOf('id="variants-container"');
  const moreAt = TEMPLATE.indexOf('class="btn btn-secondary gallery-more"');
  assert.ok(
    subAt !== -1 && subAt < countAt && countAt < gridAt,
    'instruction → count → grid order broke',
  );
  assert.ok(moreAt > gridAt, 'the "Show all" button must follow the grid');
  assert.match(
    TEMPLATE,
    /<button type="button" class="btn btn-secondary gallery-more" hidden>/,
    'the "Show all" button must ship hidden (no-JS visitors get no dead control)',
  );
});

test('law 3: featured default renders attached, keeps the instruction, and "Show all" chunks the rest', () => {
  assert.equal(FEATURED.length, 12, 'FEATURED_SLUGS no longer parses as a 12-slug literal');
  const others = Array.from({ length: 60 }, (_, i) => kit(`zz-kit-${String(i).padStart(2, '0')}`));
  // Manifest order is alphabetical (build.mjs); featured slugs are interleaved
  // so the renderer has to RE-ORDER, not just slice.
  const kits = [...others.slice(0, 30), ...FEATURED.map(kit).reverse(), ...others.slice(30)];
  const dom = run(kits);
  drain(dom.frames);

  assert.equal(dom.container.children.length, 1, 'the grid is not attached to #variants-container');
  const grid = dom.container.children[0];
  assert.equal(grid.className, 'variants-grid');
  assert.deepEqual(
    grid.children.map((c) => c.title),
    FEATURED,
    'the default view is not the featured set in FEATURED_SLUGS order',
  );
  assert.equal(
    dom.subtitle.textContent,
    'INSTRUCTION',
    'the render overwrote the instruction line',
  );
  assert.equal(
    dom.count.textContent,
    `12 featured of ${kits.length} brand kits · ${kits.length} live`,
  );
  assert.equal(dom.more.hidden, false, '"Show all" stayed hidden although kits are held back');
  assert.equal(dom.more.textContent, `Show all ${kits.length} brand kits`);

  dom.more.handlers.click();
  const frames = drain(dom.frames);
  assert.ok(
    frames >= Math.ceil(60 / 24),
    `"Show all" built 60 cards in ${frames} frame(s) — frame budget broken`,
  );
  assert.equal(grid.children.length, kits.length, '"Show all" did not reveal every kit');
  assert.deepEqual(
    grid.children.slice(0, 12).map((c) => c.title),
    FEATURED,
    'featured cards moved',
  );
  assert.equal(
    new Set(grid.children.map((c) => c.title)).size,
    kits.length,
    'a kit was rendered twice',
  );
  assert.equal(grid.children[12].focused, true, 'focus did not move to the first revealed card');
  assert.equal(dom.more.hidden, true, '"Show all" is still offered after showing all');
  assert.equal(dom.count.textContent, `${kits.length} brand kits · ${kits.length} live`);
  assert.equal(dom.subtitle.textContent, 'INSTRUCTION');
});

test('law 4: no featured match degrades to the full grid with no "Show all"', () => {
  const kits = Array.from({ length: 30 }, (_, i) => kit(`fixture-${i}`));
  const dom = run(kits);
  const frames = drain(dom.frames);
  assert.ok(frames >= 2, 'a 30-card grid was built in one frame — frame budget broken');
  assert.equal(dom.container.children[0].children.length, 30);
  assert.equal(dom.more.hidden, true, '"Show all" offered with nothing held back');
  assert.equal(dom.count.textContent, '30 brand kits · 30 live');
});

test('law 5: every featured slug is a pinned, built kit', () => {
  const pinned = new Set(
    JSON.parse(readFileSync(join(ROOT, 'brand-kits', 'expected-kits.json'), 'utf8')).kits,
  );
  assert.equal(new Set(FEATURED).size, FEATURED.length, 'FEATURED_SLUGS lists a kit twice');
  for (const slug of FEATURED) {
    assert.ok(
      pinned.has(`${slug}.js`),
      `featured "${slug}" is not in brand-kits/expected-kits.json`,
    );
    assert.ok(
      existsSync(join(ROOT, 'sites', slug, 'index.html')),
      `featured "${slug}" has no built site (sites/${slug}/index.html)`,
    );
  }
});
