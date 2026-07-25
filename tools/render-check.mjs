#!/usr/bin/env node
// render-check.mjs — render one kit's pages in a real browser and report the
// defects that source inspection cannot see.
//
//   node tools/render-check.mjs --site <slug>
//   node tools/render-check.mjs --site <slug> --shots   # also write PNGs
//
// Why this exists: the `abstract-canvas` pilot found three defects that no
// linter, grep or code review caught, because they are layout facts, not source
// facts —
//   • the hero's whole composition rendered 0x0 (absolutely-positioned children
//     plus `margin-inline:auto` → shrink-to-fit, so `aspect-ratio` had nothing
//     to resolve against);
//   • the mascot's tip bubble covered the primary CTA at 320px;
//   • a fixed toggle sat underneath the mascot.
// It hand-rolled a puppeteer harness to find them. Shipping it as a tool means
// the remaining 49 authors run one command instead of writing that harness —
// which is both faster and more consistent.
//
// Exit 1 on any FAIL.

import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITES = join(ROOT, 'sites');
const SHARED = join(ROOT, 'shared');

const argv = process.argv.slice(2);
const siteFlag = argv.indexOf('--site');
const slug = siteFlag === -1 ? null : argv[siteFlag + 1];
const wantShots = argv.includes('--shots');

if (!slug) {
  console.error('usage: node tools/render-check.mjs --site <slug> [--shots]');
  process.exit(1);
}

const dir = join(SITES, slug);
if (!existsSync(dir)) {
  console.error(`[render-check] sites/${slug}/ does not exist`);
  process.exit(1);
}

// Stage a mirror of the BUILT layout. Site CSS references fonts as
// `../../assets/fonts/…`, which is correct for dist/<slug>/css/ (build.mjs
// copies shared/assets → dist/assets) but resolves to the non-existent
// sites/assets/ in the source tree. Rendering the source directly would report
// every font as a failed request, drowning the real defects — so copy the kit
// and the shared assets into a temp dir shaped like dist/ and render that.
const stage = mkdtempSync(join(tmpdir(), `phlix-render-${slug}-`));
cpSync(dir, join(stage, slug), { recursive: true });
if (existsSync(join(SHARED, 'assets'))) {
  cpSync(join(SHARED, 'assets'), join(stage, 'assets'), { recursive: true });
}
const renderDir = join(stage, slug);

// Every HTML page in the kit, canonical order first then anything else. A
// hardcoded list left `site_architecture.extra_pages` completely ungated — 16
// kits declare one, and `cottagecore-bloom`'s `seasons.html` had to be probed by
// hand because the tool skipped it.
const CANONICAL_ORDER = [
  'index.html',
  'features.html',
  'clients.html',
  'download.html',
  'plugins.html',
  'docs.html',
  'hub.html',
  'about.html',
  '404.html',
];
const PAGES = readdirSync(renderDir)
  .filter((f) => f.endsWith('.html'))
  .sort((a, b) => {
    const ia = CANONICAL_ORDER.indexOf(a);
    const ib = CANONICAL_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
  });

// 320x640 alone is not enough: the pilot's mascot/CTA overlap changed with
// viewport HEIGHT (a bottom-pinned floater moves, the hero CTA does not), so a
// defect present at 320x700 was absent at 320x640. These are the sizes the
// abstract-canvas review measured.
const VIEWPORTS = [
  { name: '320x640', width: 320, height: 640 },
  { name: '320x700', width: 320, height: 700 },
  { name: '375x667', width: 375, height: 667 },
  { name: 'desktop', width: 1280, height: 900 },
];

const shotDir = join(ROOT, 'reviews', slug, 'shots');
if (wantShots) mkdirSync(shotDir, { recursive: true });

const fails = [];
const warns = [];

/**
 * Which interactive controls are covered by something painted on top.
 * Extracted so it can be run twice: once at load, and again after a delay,
 * because a mascot's tip bubble / idle animation appears on a timer and is not
 * present at `networkidle0`. The pilot's mascot-over-the-CTA defect was
 * invisible to a load-time-only check for exactly this reason.
 */
async function coveredControls(page) {
  return page.evaluate(() => {
    const describe = (el) =>
      el.tagName.toLowerCase() +
      (el.id ? `#${el.id}` : '') +
      (el.className && typeof el.className === 'string'
        ? `.${el.className.trim().split(/\s+/).slice(0, 2).join('.')}`
        : '');
    const found = [];
    const label = (el) =>
      (el.textContent || el.getAttribute('aria-label') || describe(el)).trim().slice(0, 40);
    const visible = (el) => {
      const s = getComputedStyle(el);
      return s.display !== 'none' && s.visibility !== 'hidden' && s.opacity !== '0';
    };
    const controls = [
      // `[tabindex]` deliberately EXCLUDES tabindex="-1": that marks an element
      // as programmatically focusable only, and the shared shell puts it on
      // <main id="main-content"> for the skip link. Treating it as a control
      // meant a fixed mascot overlapping the page body counted as "covering a
      // control" — a false positive that would have failed every kit with a
      // companion.
      ...document.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width >= 1 && r.height >= 1 && r.top <= window.innerHeight && r.bottom >= 0;
    });
    const floaters = [...document.querySelectorAll('body *')].filter((el) => {
      const p = getComputedStyle(el).position;
      return (p === 'fixed' || p === 'sticky') && visible(el);
    });

    // Partial overlap counts. The pilot's mascot covered only the CTA's
    // bottom-right corner — 41x12px at 320x640 — so sampling the control's
    // CENTRE reports the control itself and misses it entirely. Instead
    // intersect the rectangles, then sample the centre of the INTERSECTION to
    // confirm the floater is genuinely painted on top rather than behind.
    for (const el of controls) {
      const r = el.getBoundingClientRect();
      for (const fl of floaters) {
        if (fl.contains(el) || el.contains(fl)) continue;
        const fr = fl.getBoundingClientRect();
        const ix = Math.max(r.left, fr.left);
        const iy = Math.max(r.top, fr.top);
        const iw = Math.min(r.right, fr.right) - ix;
        const ih = Math.min(r.bottom, fr.bottom) - iy;
        if (iw <= 1 || ih <= 1) continue;
        const px = Math.min(Math.max(ix + iw / 2, 1), window.innerWidth - 1);
        const py = Math.min(Math.max(iy + ih / 2, 1), window.innerHeight - 1);
        const hit = document.elementFromPoint(px, py);
        if (!hit) continue;
        if (hit !== fl && !fl.contains(hit)) continue; // floater is behind
        found.push({
          cta: label(el),
          over: `${describe(fl)} (${getComputedStyle(fl).position}, ${Math.round(iw)}x${Math.round(ih)}px overlap)`,
        });
      }
    }

    // Also catch ordinary stacking bugs: something non-floating painted over a
    // control's centre.
    for (const el of controls) {
      const r = el.getBoundingClientRect();
      const cx = Math.min(Math.max(r.left + r.width / 2, 1), window.innerWidth - 1);
      const cy = Math.min(Math.max(r.top + r.height / 2, 1), window.innerHeight - 1);
      const hit = document.elementFromPoint(cx, cy);
      if (!hit || hit === el || el.contains(hit) || hit.contains(el)) continue;
      if (floaters.includes(hit)) continue; // already reported above
      found.push({ cta: label(el), over: describe(hit) });
    }
    return found;
  });
}

// Chrome needs --no-sandbox in this environment.
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

try {
  for (const vp of VIEWPORTS) {
    for (const pageFile of PAGES) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height });

      const consoleErrors = [];
      page.on('console', (m) => {
        if (m.type() === 'error') consoleErrors.push(m.text());
      });
      page.on('pageerror', (e) => consoleErrors.push(String(e.message)));

      const failedReqs = [];
      page.on('requestfailed', (r) => failedReqs.push(r.url()));

      await page.goto(pathToFileURL(join(renderDir, pageFile)).href, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      const report = await page.evaluate(() => {
        const out = { collapsed: [], overflow: null, invisibleText: [], clipped: [] };

        // 1. Elements that occupy zero area but contain content or children.
        //    This is the hero-collapse class of bug.
        // Deliberately collapsed UI is not a defect: a closed <details>, an
        // aria-hidden panel, a `[hidden]` node, or anything inside a
        // zero-height overflow:hidden clipper (collapsed mobile nav, accordion)
        // is *supposed* to render 0x0. Only unintentional collapse counts.
        const deliberatelyHidden = (el) => {
          for (let n = el; n && n !== document.body; n = n.parentElement) {
            if (n.hasAttribute('hidden') || n.getAttribute('aria-hidden') === 'true') return true;
            if (n.tagName === 'DETAILS' && !n.open) return true;
            if (n.tagName === 'DIALOG' && !n.open) return true;
            const ns = getComputedStyle(n);
            if (ns.overflow !== 'visible' && n.getBoundingClientRect().height < 1) return true;
            if (ns.opacity === '0') return true;
          }
          return false;
        };
        for (const el of document.querySelectorAll('body *')) {
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') continue;
          // getComputedStyle on a descendant of a display:none ancestor still
          // reports that descendant's own display, so the check above does not
          // catch them. An element that is not rendered at all has no client
          // rects — that is the reliable test, and it correctly keeps the
          // genuinely-collapsed case (display:block at 0x0 still has one rect).
          if (el.getClientRects().length === 0) continue;
          // A wrapper whose every child is unrendered and which has no text of
          // its own is legitimately empty at this breakpoint (e.g. the <nav>
          // holding a display:none mobile menu), not a collapse bug.
          const ownText = [...el.childNodes]
            .filter((n) => n.nodeType === 3)
            .map((n) => n.textContent.trim())
            .join('');
          const allChildrenUnrendered =
            el.children.length > 0 &&
            [...el.children].every((c) => c.getClientRects().length === 0);
          if (!ownText && allChildrenUnrendered) continue;
          const r = el.getBoundingClientRect();
          const hasSubstance = el.children.length > 0 || (el.textContent || '').trim().length > 0;
          if (hasSubstance && (r.width < 1 || r.height < 1) && !deliberatelyHidden(el)) {
            out.collapsed.push({
              sel:
                el.tagName.toLowerCase() +
                (el.id ? `#${el.id}` : '') +
                (el.className && typeof el.className === 'string'
                  ? `.${el.className.trim().split(/\s+/).slice(0, 2).join('.')}`
                  : ''),
              w: Math.round(r.width),
              h: Math.round(r.height),
            });
          }
        }

        // 2. Horizontal overflow — the page must never scroll sideways.
        if (document.documentElement.scrollWidth > window.innerWidth + 1) {
          out.overflow = {
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth,
          };
        }

        const describe = (el) =>
          el.tagName.toLowerCase() +
          (el.id ? `#${el.id}` : '') +
          (el.className && typeof el.className === 'string'
            ? `.${el.className.trim().split(/\s+/).slice(0, 2).join('.')}`
            : '');

        // 3b. Content CLIPPED by an overflow:hidden ancestor.
        //
        // This is the check the scrollWidth test cannot make: a container with
        // `overflow:hidden` absorbs the overflow, so document.scrollWidth stays
        // equal to the viewport and the page "passes" while the <h1> and the
        // primary CTA are visibly cut off. Found on 5 of 9 pilot pages at 200%
        // text zoom. Only headings and controls are checked — decorative
        // clipping (marquees, bleed images) is intentional and not a defect.
        for (const el of document.querySelectorAll(
          'h1, h2, h3, a[href], button, input, select, textarea',
        )) {
          const r = el.getBoundingClientRect();
          if (r.width < 1 || r.height < 1) continue;
          for (let n = el.parentElement; n && n !== document.documentElement; n = n.parentElement) {
            const ns = getComputedStyle(n);
            const clipsX = ns.overflowX === 'hidden' || ns.overflowX === 'clip';
            const clipsY = ns.overflowY === 'hidden' || ns.overflowY === 'clip';
            if (!clipsX && !clipsY) continue;
            const nr = n.getBoundingClientRect();
            if (nr.width < 1 || nr.height < 1) continue;
            const overRight = clipsX && r.right - nr.right > 2;
            const overLeft = clipsX && nr.left - r.left > 2;
            const overBottom = clipsY && r.bottom - nr.bottom > 2;
            if (overRight || overLeft || overBottom) {
              out.clipped.push({
                el: describe(el),
                text: (el.textContent || '').trim().slice(0, 32),
                by: describe(n),
                edge: overRight ? 'right' : overLeft ? 'left' : 'bottom',
              });
              break;
            }
          }
        }

        // 4. Text the same colour as what is directly behind it.
        //
        // Alpha must be composited, not discarded. Reading only the first three
        // numbers treats `rgba(255,255,255,0.06)` as opaque white, which both
        // invents failures on legitimately translucent surfaces and hides real
        // ones where a faint overlay is doing the work.
        const parseRgba = (s) => {
          const n = (s.match(/[\d.]+/g) || []).map(Number);
          if (n.length < 3) return null;
          return { rgb: n.slice(0, 3), a: n.length > 3 ? n[3] : 1 };
        };
        const over = (fg, bg) => fg.rgb.map((c, i) => c * fg.a + bg.rgb[i] * (1 - fg.a));
        const lum = ([r, g, b]) => {
          const f = [r, g, b]
            .map((v) => v / 255)
            .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
          return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
        };
        for (const el of document.querySelectorAll('p, h1, h2, h3, h4, li, a, span, button')) {
          const txt = (el.textContent || '').trim();
          if (!txt || el.children.length) continue;
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden') continue;
          // -webkit-background-clip:text intentionally makes the fill
          // transparent; that is a technique, not a defect.
          if (cs.webkitTextFillColor === 'rgba(0, 0, 0, 0)') continue;
          // Composite the whole ancestor stack onto white, so a translucent
          // overlay contributes its real share instead of being read as opaque
          // or skipped entirely.
          const layers = [];
          for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
            const c = parseRgba(getComputedStyle(n).backgroundColor);
            if (c && c.a > 0) layers.push(c);
          }
          const rootBg = parseRgba(getComputedStyle(document.documentElement).backgroundColor);
          let bgRgb = rootBg && rootBg.a > 0 ? rootBg.rgb : [255, 255, 255];
          for (const layer of layers.reverse()) bgRgb = over(layer, { rgb: bgRgb, a: 1 });

          const fg = parseRgba(cs.color);
          if (fg) {
            // Text alpha composites against the background it sits on.
            const fgRgb = over(fg, { rgb: bgRgb, a: 1 });
            const [hi, lo] = [lum(fgRgb), lum(bgRgb)].sort((a, b) => b - a);
            const ratio = (hi + 0.05) / (lo + 0.05);
            if (ratio < 1.6) {
              out.invisibleText.push({ text: txt.slice(0, 40), ratio: ratio.toFixed(2) });
            }
          }
        }
        return out;
      });

      const where = `${pageFile} @${vp.name}`;

      if (report.overflow) {
        fails.push(
          `${where}: horizontal overflow — scrollWidth ${report.overflow.scrollWidth} > viewport ${report.overflow.innerWidth}`,
        );
      }
      for (const c of report.collapsed.slice(0, 6)) {
        fails.push(`${where}: ${c.sel} renders ${c.w}x${c.h} but has content`);
      }
      // Covered controls, checked twice: at load, then again after the timers
      // fire, so a mascot tip bubble / idle pose that appears seconds after load
      // is tested too. Union of both, de-duplicated.
      const atLoad = await coveredControls(page).catch(() => []);
      const delayed = await new Promise((r) => setTimeout(r, 4000)).then(() =>
        coveredControls(page).catch(() => []),
      );
      const seenOverlap = new Set();
      for (const o of [...atLoad, ...delayed]) {
        const key = `${o.over}|${o.cta}`;
        if (seenOverlap.has(key)) continue;
        seenOverlap.add(key);
        if (seenOverlap.size > 6) break;
        fails.push(`${where}: ${o.over} is painted over control "${o.cta}"`);
      }
      for (const c of report.clipped.slice(0, 6)) {
        fails.push(
          `${where}: ${c.el} "${c.text}" is clipped at the ${c.edge} by ${c.by} (overflow:hidden)`,
        );
      }
      for (const t of report.invisibleText.slice(0, 6)) {
        fails.push(`${where}: text "${t.text}" is ${t.ratio}:1 against its background`);
      }
      for (const e of consoleErrors.slice(0, 4)) warns.push(`${where}: console error — ${e}`);
      for (const u of failedReqs.slice(0, 6)) {
        // file:// favicon probes are noise; a real missing asset is not.
        if (!/favicon/.test(u)) fails.push(`${where}: failed request ${u}`);
      }

      if (wantShots) {
        await page.screenshot({
          path: join(shotDir, `${pageFile.replace('.html', '')}-${vp.name}.png`),
          fullPage: vp.name === 'desktop',
        });
      }
      await page.close();
    }
  }

  // A 200% text-zoom pass on EVERY page, per §12/§14. Originally home-only,
  // which missed that the pilot broke on 5 of 9 pages at this zoom level.
  // Reports clipping as well as scroll overflow: an overflow:hidden container
  // absorbs the overflow, so the scrollWidth test alone reports a false PASS
  // while the <h1> and the primary CTA are cut off.
  for (const pageFile of PAGES) {
    const zoomPage = await browser.newPage();
    await zoomPage.setViewport({ width: 320, height: 640 });
    await zoomPage.goto(pathToFileURL(join(renderDir, pageFile)).href, {
      waitUntil: 'networkidle0',
    });
    const z = await zoomPage.evaluate(() => {
      document.documentElement.style.fontSize = '32px';
      const describe = (el) =>
        el.tagName.toLowerCase() +
        (el.id ? `#${el.id}` : '') +
        (el.className && typeof el.className === 'string'
          ? `.${el.className.trim().split(/\s+/).slice(0, 2).join('.')}`
          : '');
      const clipped = [];
      for (const el of document.querySelectorAll('h1, h2, h3, a[href], button')) {
        const r = el.getBoundingClientRect();
        if (r.width < 1 || r.height < 1) continue;
        for (let n = el.parentElement; n && n !== document.documentElement; n = n.parentElement) {
          const ns = getComputedStyle(n);
          const clipsX = ns.overflowX === 'hidden' || ns.overflowX === 'clip';
          const clipsY = ns.overflowY === 'hidden' || ns.overflowY === 'clip';
          if (!clipsX && !clipsY) continue;
          const nr = n.getBoundingClientRect();
          if (nr.width < 1 || nr.height < 1) continue;
          if (
            (clipsX && (r.right - nr.right > 2 || nr.left - r.left > 2)) ||
            (clipsY && r.bottom - nr.bottom > 2)
          ) {
            clipped.push({
              el: describe(el),
              text: (el.textContent || '').trim().slice(0, 32),
              by: describe(n),
            });
            break;
          }
        }
      }
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        clipped,
      };
    });
    if (z.scrollWidth > z.innerWidth + 1) {
      fails.push(
        `${pageFile} @320px, 200% text zoom: horizontal overflow — ${z.scrollWidth} > ${z.innerWidth}`,
      );
    }
    for (const c of z.clipped.slice(0, 4)) {
      fails.push(
        `${pageFile} @320px, 200% text zoom: ${c.el} "${c.text}" is clipped by ${c.by} (overflow:hidden hides this from the scrollWidth test)`,
      );
    }
    await zoomPage.close();
  }
} finally {
  await browser.close();
  rmSync(stage, { recursive: true, force: true });
}

console.log(`\n[render-check] ${slug} — ${PAGES.length} page(s) x ${VIEWPORTS.length} viewport(s)`);
for (const m of fails) console.log(`   ✗ ${m}`);
for (const m of warns) console.log(`   ⚠ ${m}`);
if (wantShots) console.log(`   screenshots → reviews/${slug}/shots/`);
console.log(
  fails.length ? `[render-check] FAIL — ${fails.length} defect(s)` : '[render-check] PASS',
);
process.exit(fails.length ? 1 : 0);
