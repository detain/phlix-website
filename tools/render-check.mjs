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

import { cpSync, existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
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

const PAGES = [
  'index.html',
  'features.html',
  'clients.html',
  'download.html',
  'plugins.html',
  'docs.html',
  'hub.html',
  'about.html',
  '404.html',
].filter((p) => existsSync(join(renderDir, p)));

const VIEWPORTS = [
  { name: 'mobile', width: 320, height: 640 },
  { name: 'desktop', width: 1280, height: 900 },
];

const shotDir = join(ROOT, 'reviews', slug, 'shots');
if (wantShots) mkdirSync(shotDir, { recursive: true });

const fails = [];
const warns = [];

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
        const out = { collapsed: [], overflow: null, overlaps: [], invisibleText: [] };

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

        // 3. Does anything fixed/sticky cover the primary CTA? This is the
        //    mascot-over-the-button bug.
        const ctas = [...document.querySelectorAll('a, button')].filter((el) => {
          const t = (el.textContent || '').toLowerCase();
          return /get |download|start|install/.test(t);
        });
        const floaters = [...document.querySelectorAll('body *')].filter((el) => {
          const p = getComputedStyle(el).position;
          return p === 'fixed' || p === 'sticky';
        });
        const overlap = (a, b) =>
          !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
        for (const cta of ctas) {
          const cr = cta.getBoundingClientRect();
          if (cr.width < 1 || cr.height < 1) continue;
          for (const fl of floaters) {
            if (fl.contains(cta) || cta.contains(fl)) continue;
            const cs = getComputedStyle(fl);
            if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') continue;
            const fr = fl.getBoundingClientRect();
            if (fr.width < 1 || fr.height < 1) continue;
            if (overlap(cr, fr)) {
              out.overlaps.push({
                cta: (cta.textContent || '').trim().slice(0, 40),
                over:
                  fl.tagName.toLowerCase() +
                  (fl.id ? `#${fl.id}` : '') +
                  (fl.className && typeof fl.className === 'string'
                    ? `.${fl.className.trim().split(/\s+/).slice(0, 2).join('.')}`
                    : ''),
              });
            }
          }
        }

        // 4. Text the same colour as what is directly behind it.
        const parseRgb = (s) => (s.match(/\d+(\.\d+)?/g) || []).slice(0, 3).map(Number);
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
          let bg = 'rgba(0, 0, 0, 0)';
          for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
            const c = getComputedStyle(n).backgroundColor;
            if (c && !c.includes('rgba(0, 0, 0, 0)')) {
              bg = c;
              break;
            }
          }
          const fc = parseRgb(cs.color);
          const bc = parseRgb(bg);
          if (fc.length === 3 && bc.length === 3) {
            const [hi, lo] = [lum(fc), lum(bc)].sort((a, b) => b - a);
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
      for (const o of report.overlaps.slice(0, 6)) {
        fails.push(`${where}: fixed/sticky ${o.over} covers CTA "${o.cta}"`);
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

  // A 200% text-zoom pass: reflow must survive, per §12/§14.
  const zoomPage = await browser.newPage();
  await zoomPage.setViewport({ width: 320, height: 640 });
  await zoomPage.goto(pathToFileURL(join(renderDir, 'index.html')).href, {
    waitUntil: 'networkidle0',
  });
  const zoomOverflow = await zoomPage.evaluate(() => {
    document.documentElement.style.fontSize = '32px';
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    };
  });
  if (zoomOverflow.scrollWidth > zoomOverflow.innerWidth + 1) {
    fails.push(
      `index.html @320px, 200% text zoom: horizontal overflow — ${zoomOverflow.scrollWidth} > ${zoomOverflow.innerWidth}`,
    );
  }
  await zoomPage.close();
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
