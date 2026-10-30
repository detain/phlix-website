// gallery.js — the root brand-kit gallery renderer.
//
// Extracted verbatim from the inline <script> island in root index.html
// (review website__writer R-WEBSITE-06): the shipped CSP now runs
// script-src 'self', so every executable in a page must be a FILE. The
// build rewrites the template's reference to assets/js/gallery.js and
// emits the kit manifest it reads as assets/js/kit-manifest.js; opening
// this file's page directly from the repo (no build) still works — the
// manifest is absent and the page shows its build hint.

const KITS =
  typeof window !== 'undefined' && Array.isArray(window.__PHLIX_KITS__)
    ? window.__PHLIX_KITS__
    : null;

// Relative luminance of a #rrggbb colour (0 = black, 1 = white).
function hexLum(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return 0.5;
  const n = parseInt(m[1], 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Palette for chip borders: drop near-black / near-white so every chip
// border stays visible on the dark panel. Falls back to the accent.
function chipPalette(colors, accent) {
  const cols = (colors || []).filter((c) => {
    const l = hexLum(c);
    return l > 0.22 && l < 0.9;
  });
  return cols.length ? cols : [accent];
}

function esc(s) {
  return String(s == null ? '' : s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
}

// Desktop width each site is rendered at inside its preview iframe. The
// frame is then CSS-scaled down to the card's width (see the iframe rule
// above) so the whole site width is visible. Must match the iframe
// `width` in CSS.
const PREVIEW_WIDTH = 1280;
// Must match --zoom-x in CSS; used only to keep the popout on-screen.
const HOVER_ZOOM_X = 3;

// Set --preview-scale on a card's preview container from its current
// width, so width:1280px * scale renders exactly the container width.
// Also anchor the hover-zoom origin to the left/right edge for the edge
// columns so the enlarged popout doesn't spill off-screen.
function applyPreviewScale(container) {
  const w = container.clientWidth;
  if (w <= 0) return;
  container.style.setProperty('--preview-scale', (w / PREVIEW_WIDTH).toFixed(4));
  const r = container.getBoundingClientRect();
  const spill = (w * (HOVER_ZOOM_X - 1)) / 2;
  const vw = document.documentElement.clientWidth;
  let ox = 'center';
  if (r.left < spill) ox = 'left';
  else if (vw - r.right < spill) ox = 'right';
  container.style.transformOrigin = `${ox} center`;
}

function applyAllPreviewScales() {
  document
    .querySelectorAll('.variant-card:not(.unbuilt) .preview-container')
    .forEach(applyPreviewScale);
}

// IntersectionObserver for lazy loading iframes
let iframeObserver;
const loadedIframes = new WeakSet();

function initIntersectionObserver() {
  iframeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const iframe = entry.target.querySelector('iframe');
        if (iframe && entry.isIntersecting) loadIframe(iframe);
      });
    },
    {
      rootMargin: '100px',
      threshold: 0.1,
    },
  );
}

function loadIframe(iframe) {
  if (loadedIframes.has(iframe)) return;
  const src = iframe.dataset.src;
  if (!src) return;
  iframe.src = src;
  iframe.onload = () => {
    iframe.classList.add('loaded');
  };
  loadedIframes.add(iframe);
}

// Render one brand-kit card. Built kits are clickable anchors with a
// live iframe preview; unbuilt kits are dimmed, non-interactive tiles.
function renderKitCard(kit, index) {
  const built = !!kit.built;
  const card = document.createElement(built ? 'a' : 'div');
  card.className = 'variant-card' + (built ? '' : ' unbuilt');
  if (built) {
    card.href = `./${kit.slug}/index.html`;
  }
  card.title = built ? kit.name : `${kit.name} (site not built yet)`;
  // Cap the entrance stagger so later cards don't stay hidden for long.
  card.style.animationDelay = `${Math.min(index, 24) * 0.03}s`;

  const accent = kit.accent || '#e8ff47';
  card.style.setProperty('--set-color', accent);

  const tagline = kit.tagline || kit.archetype || '';
  const personality = Array.isArray(kit.personality) ? kit.personality.slice(0, 3) : [];
  const colors = (kit.colors || []).slice(0, 6);
  const chipCols = chipPalette(kit.colors, accent);

  const taglineHtml = tagline ? `<div class="variant-variation">${esc(tagline)}</div>` : '';
  const personalityHtml = personality.length
    ? `<div class="variant-personality">${personality
        .map(
          (p, i) =>
            `<span class="chip" style="--chip-color:${esc(chipCols[i % chipCols.length])}">${esc(p)}</span>`,
        )
        .join('')}</div>`
    : '';
  const swatchHtml = colors
    .map((c) => `<span class="swatch" style="background:${esc(c)}"></span>`)
    .join('');

  const previewHtml = built
    ? `<div class="placeholder">Loading preview…</div>
             <iframe data-src="./${esc(kit.slug)}/index.html" loading="lazy" title="${esc(kit.name)} preview"></iframe>
             <div class="preview-overlay"></div>`
    : `<div class="pending">Site not built yet</div>`;

  const statusTag = built
    ? `<span class="set-tag">Live</span>`
    : `<span class="status-tag pending-tag">Pending</span>`;

  card.innerHTML = `
          <div class="preview-container">
              ${previewHtml}
          </div>
          <div class="variant-info">
              <div class="variant-name">${esc(kit.name)}</div>
              ${taglineHtml}
              ${personalityHtml}
              <div class="variant-swatches">
                  ${statusTag}
                  ${swatchHtml}
              </div>
          </div>
      `;

  if (built && iframeObserver) {
    iframeObserver.observe(card);
  }

  return card;
}

function init() {
  const container = document.getElementById('variants-container');

  if (!KITS) {
    container.innerHTML =
      '<p style="font-family:\'Space Mono\',monospace;color:var(--text-secondary);text-align:center;padding:3rem 1rem;">' +
      'Run <code>npm run build</code> to generate the brand-kit gallery, then open <code>dist/index.html</code>.</p>';
    return;
  }

  initIntersectionObserver();

  const grid = document.createElement('div');
  grid.className = 'variants-grid';

  KITS.forEach((kit, i) => grid.appendChild(renderKitCard(kit, i)));
  container.appendChild(grid);

  const builtCount = KITS.filter((k) => k.built).length;
  const subtitle = document.querySelector('.subtitle');
  if (subtitle) {
    subtitle.textContent = `${KITS.length} brand kits · ${builtCount} live`;
  }

  // Cards are laid out now — size every preview to its card width, and
  // keep them correct as the grid reflows on resize.
  applyAllPreviewScales();
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyAllPreviewScales, 150);
  });

  // The hover instruction belongs to the gallery, not to the page: only
  // show it while the gallery section is actually on screen.
  const hint = document.querySelector('.hover-hint');
  if (hint) {
    new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          hint.classList.toggle('shown', entry.isIntersecting);
        }
      },
      { rootMargin: '-20% 0px -20% 0px' },
    ).observe(container);
  }
}

init();
