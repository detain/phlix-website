#!/usr/bin/env node
/**
 * tools/render.mjs
 *
 * Renders one HTML page for one variant using simple ${...} interpolation.
 * No template engine — pure string substitution.
 *
 * Usage:
 *   import { renderPage } from './render.mjs';
 *   const html = renderPage('01-minimalist-cinema', contentJson, 'index');
 *   const html = renderPage('02-spotlight-projector', contentJson, 'features');
 *   // etc.
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ─── Brand-kit helpers ─────────────────────────────────────────────────────────

function getBrandKit(slug) {
  const kits = JSON.parse(readFileSync(resolve(ROOT, 'shared/data/brand-kits.json'), 'utf8'));
  return kits.variants?.[slug] ?? {};
}

function brandVar(slug, path) {
  const kit = getBrandKit(slug);
  const parts = path.split('.');
  let val = kit;
  for (const p of parts) val = val?.[p];
  return val ?? '';
}

function brandColor(slug, category, name) {
  return brandVar(slug, `colors.${category}.${name}`) || '#000000';
}

// ─── HTML shell ────────────────────────────────────────────────────────────────

/**
 * Returns the full HTML shell for a page, with all <head> content filled in.
 */
function htmlShell(slug, page, content) {
  const site = content.site;
  const meta = content.meta;

  const title = meta[`${page}_title`] || pageTitle(page, content);
  const description = meta.description || '';
  const ogImage = `/variants/${slug}${meta.og_image || '/img/og.png'}`;
  const canonical = `${site.url}/${page === 'index' ? '' : page + '.html'}`;

  const primaryColor = brandColor(slug, 'primary', Object.keys(getBrandKit(slug).colors?.primary || {})[0] || 'electric_blue');

  return `<!doctype html>
<html lang="${site.default_locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escHtml(title)}</title>
  <meta name="description" content="${escHtml(description)}">
  <link rel="canonical" href="${escHtml(canonical)}">

  <!-- Open Graph -->
  <meta property="og:title" content="${escHtml(title)}">
  <meta property="og:description" content="${escHtml(description)}">
  <meta property="og:image" content="${escHtml(ogImage)}">
  <meta property="og:url" content="${escHtml(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${escHtml(site.name)}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="${escHtml(meta.twitter_card || 'summary_large_image')}">
  <meta name="twitter:title" content="${escHtml(title)}">
  <meta name="twitter:description" content="${escHtml(description)}">
  <meta name="twitter:image" content="${escHtml(ogImage)}">

  <!-- Theme color -->
  <meta name="theme-color" content="${escHtml(primaryColor)}">

  <!-- Favicon (inline SVG as data URI) -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='4' fill='${encodeURIComponent(primaryColor)}'/%3E%3Ctext x='16' y='22' text-anchor='middle' font-size='18' font-family='sans-serif' font-weight='bold' fill='white'%3EX%3C/text%3E%3C/svg%3E">

  <!-- Fonts (self-hosted WOFF2 via Google Fonts CDN, downloaded at build time) -->
  <style>
    /* Font-face declarations are injected per-variant in theme.css */
  </style>

  <!-- Variant styles -->
  <link rel="stylesheet" href="/variants/${slug}/css/base.css">
  <link rel="stylesheet" href="/variants/${slug}/css/theme.css">
  <link rel="stylesheet" href="/variants/${slug}/css/components.css">
</head>
<body>
  <!-- Skip link -->
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <!-- Header -->
  <header class="site-header" role="banner">
    <nav class="nav-primary" role="navigation" aria-label="Primary navigation">
      <a href="/variants/${slug}/" class="nav-logo" aria-label="${escHtml(site.name)} home">
        <img src="/variants/${slug}/img/logo.svg" alt="${escHtml(site.name)} logo" width="120" height="40">
      </a>
      <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M3 12h18M3 6h18M3 18h18"/>
        </svg>
      </button>
      <ul class="nav-menu" id="nav-menu" role="list">
        <li><a href="/variants/${slug}/"${page === 'index' ? ' aria-current="page"' : ''}>Home</a></li>
        <li><a href="/variants/${slug}/features.html"${page === 'features' ? ' aria-current="page"' : ''}>Features</a></li>
        <li><a href="/variants/${slug}/clients.html"${page === 'clients' ? ' aria-current="page"' : ''}>Clients</a></li>
        <li><a href="/variants/${slug}/download.html"${page === 'download' ? ' aria-current="page"' : ''}>Download</a></li>
        <li><a href="/variants/${slug}/plugins.html"${page === 'plugins' ? ' aria-current="page"' : ''}>Plugins</a></li>
        <li><a href="/variants/${slug}/docs.html"${page === 'docs' ? ' aria-current="page"' : ''}>Docs</a></li>
        <li><a href="/variants/${slug}/hub.html"${page === 'hub' ? ' aria-current="page"' : ''}>Hub</a></li>
        <li><a href="/variants/${slug}/about.html"${page === 'about' ? ' aria-current="page"' : ''}>About</a></li>
      </ul>
    </nav>
  </header>

  <!-- Main content -->
  <main id="main-content" tabindex="-1">
${content}
  </main>

  <!-- Footer -->
  <footer class="site-footer" role="contentinfo">
    <div class="footer-inner">
      <p class="footer-tagline">${escHtml(content.footer?.tagline || site.name)}</p>
      <nav class="footer-nav" aria-label="Footer navigation">
        ${(content.footer?.columns || []).map(col => `
        <div class="footer-col">
          <h3>${escHtml(col.heading)}</h3>
          <ul role="list">
            ${col.links.map(link => `
              <li><a href="${escHtml(link.href.startsWith('http') ? link.href : `/variants/${slug}/${link.href.replace(/^\//, '')}`)}">${escHtml(link.label)}</a></li>
            `).join('\n            ')}
          </ul>
        </div>`).join('')}
      </nav>
      <p class="footer-copy">&copy; ${new Date().getFullYear()} ${escHtml(site.name)} &mdash; BSD-3-Clause</p>
    </div>
  </footer>

  <!-- Variant JS -->
  <script src="/variants/${slug}/js/main.js" defer></script>
</body>
</html>`;
}

// ─── Page content builders ─────────────────────────────────────────────────────

function pageTitle(page, content) {
  const titles = {
    index: `${content.site.name} — Your media. Your way.`,
    features: `Features — ${content.site.name}`,
    clients: `Clients — ${content.site.name}`,
    download: `Download — ${content.site.name}`,
    plugins: `Plugins — ${content.site.name}`,
    docs: `Docs — ${content.site.name}`,
    hub: `Hub — ${content.site.name}`,
    about: `About — ${content.site.name}`,
  };
  return titles[page] || `${content.site.name}`;
}

function buildIndex(slug, content) {
  return `
    <!-- Hero -->
    <section class="hero" aria-labelledby="hero-heading">
      <div class="hero-inner">
        <p class="hero-eyebrow">${escHtml(content.hero.eyebrow)}</p>
        <h1 id="hero-heading">${escHtml(content.hero.headline)}</h1>
        <p class="hero-sub">${escHtml(content.hero.subheadline)}</p>
        <div class="hero-cta">
          <a href="${content.hero.primary_cta.href}" class="btn btn-primary">${escHtml(content.hero.primary_cta.label)}</a>
          <a href="${content.hero.secondary_cta.href}" class="btn btn-secondary">${escHtml(content.hero.secondary_cta.label)}</a>
        </div>
      </div>
    </section>

    <!-- Pitch -->
    <section class="pitch" aria-labelledby="pitch-heading">
      <div class="pitch-inner">
        <h2 id="pitch-heading">Why ${escHtml(content.site.name)}?</h2>
        <ul class="pitch-bullets" role="list">
          ${content.pitch_bullets.map(b => `<li>${escHtml(b)}</li>`).join('\n          ')}
        </ul>
      </div>
    </section>

    <!-- Features overview -->
    <section class="features-overview" aria-labelledby="features-overview-heading">
      <div class="features-overview-inner">
        <h2 id="features-overview-heading">Everything your library needs</h2>
        <div class="feature-cards">
          ${content.features.map(f => `
          <article class="feature-card">
            <div class="feature-icon" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                ${iconPath(f.icon)}
              </svg>
            </div>
            <h3>${escHtml(f.title)}</h3>
            <p>${escHtml(f.body)}</p>
          </article>`).join('\n          ')}
        </div>
        <p class="features-more"><a href="/variants/${slug}/features.html">See all features &rarr;</a></p>
      </div>
    </section>

    <!-- CTA banner -->
    <section class="cta-banner" aria-labelledby="cta-banner-heading">
      <div class="cta-banner-inner">
        <h2 id="cta-banner-heading">Ready to stream?</h2>
        <a href="/variants/${slug}/download.html" class="btn btn-primary btn-large">Download ${escHtml(content.site.name)}</a>
      </div>
    </section>`;
}

function buildFeatures(slug, content) {
  return `
    <div class="page-header">
      <div class="page-header-inner">
        <h1>Features</h1>
        <p class="page-lead">Everything you need to run a media library that actually works.</p>
      </div>
    </div>
    <div class="content-section">
      <div class="content-grid">
        ${content.features.map(f => `
        <article class="feature-detail" id="${escHtml(f.id)}">
          <div class="feature-detail-icon" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              ${iconPath(f.icon)}
            </svg>
          </div>
          <div class="feature-detail-text">
            <h2>${escHtml(f.title)}</h2>
            <p>${escHtml(f.body)}</p>
          </div>
        </article>`).join('\n        ')}
      </div>
    </div>
    <section class="cta-banner">
      <div class="cta-banner-inner">
        <h2>Get started in minutes</h2>
        <a href="/variants/${slug}/download.html" class="btn btn-primary btn-large">Download Now</a>
      </div>
    </section>`;
}

function buildClients(slug, content) {
  return `
    <div class="page-header">
      <div class="page-header-inner">
        <h1>Clients</h1>
        <p class="page-lead">Native apps for every screen you own.</p>
      </div>
    </div>
    <div class="content-section">
      <div class="client-cards">
        ${content.clients.map(c => `
        <article class="client-card" id="${escHtml(c.id)}">
          <div class="client-card-header">
            <h2>${escHtml(c.name)}</h2>
            <span class="client-status status-${escHtml(c.status)}">${escHtml(c.status)}</span>
          </div>
          <p class="client-tagline">${escHtml(c.tagline)}</p>
          <ul class="client-highlights" role="list">
            ${c.highlights.map(h => `<li>${escHtml(h)}</li>`).join('\n            ')}
          </ul>
          ${c.repo ? `<a href="${escHtml(c.repo)}" class="btn btn-small" rel="noopener noreferrer">View source</a>` : ''}
        </article>`).join('\n        ')}
      </div>
    </div>
    <section class="cta-banner">
      <div class="cta-banner-inner">
        <h2>All clients are open source</h2>
        <a href="/variants/${slug}/download.html" class="btn btn-primary btn-large">Download Now</a>
      </div>
    </section>`;
}

function buildDownload(slug, content) {
  return `
    <div class="page-header">
      <div class="page-header-inner">
        <h1>Download</h1>
        <p class="page-lead">Install the server, grab a client, start streaming.</p>
      </div>
    </div>
    <div class="content-section">
      <h2>Server</h2>
      <div class="download-block">
        <p>Requires PHP 8.3+ and <a href="https://github.com/detain/phlix-server">phlix-server</a>.</p>
        <pre class="code-block"><code>composer require detain/phlix-server
# or clone from https://github.com/detain/phlix-server</code></pre>
      </div>

      <h2>Clients</h2>
      <div class="download-cards">
        ${content.clients.filter(c => c.status !== 'deprecated').map(c => `
        <div class="download-card" id="download-${escHtml(c.id)}">
          <h3>${escHtml(c.name)}</h3>
          <p>${escHtml(c.tagline)}</p>
          <a href="${escHtml(c.repo || '#')}" class="btn btn-primary" rel="noopener noreferrer">Get ${escHtml(c.name)}</a>
        </div>`).join('\n        ')}
      </div>

      <h2>Ecosystem</h2>
      <ul class="ecosystem-list">
        ${content.ecosystem.map(e => `
        <li>
          <strong><a href="${escHtml(e.repo)}" rel="noopener noreferrer">${escHtml(e.name)}</a></strong>
          &mdash; ${escHtml(e.what)}
        </li>`).join('\n        ')}
      </ul>
    </div>
    <section class="cta-banner">
      <div class="cta-banner-inner">
        <h2>Need help getting started?</h2>
        <a href="/variants/${slug}/docs.html" class="btn btn-secondary">Read the docs</a>
      </div>
    </section>`;
}

function buildPlugins(slug, content) {
  return `
    <div class="page-header">
      <div class="page-header-inner">
        <h1>Plugins</h1>
        <p class="page-lead">Extend ${content.site.name} with a versioned plugin contract.</p>
      </div>
    </div>
    <div class="content-section">
      <h2>Plugin model</h2>
      <p>Every plugin implements <code>LifecycleInterface</code> and ships a manifest. Drop it in the <code>plugins/</code> directory and the loader picks it up automatically.</p>
      <pre class="code-block"><code>// See the reference plugin:
<a href="https://github.com/detain/phlix-plugin-example">github.com/detain/phlix-plugin-example</a></code></pre>

      <h2>Ecosystem plugins</h2>
      <p>The plugin contract makes it easy to add metadata providers, transcode pipelines, or anything else you can imagine.</p>

      <h2>Write your own</h2>
      <p>Start from <a href="https://github.com/detain/phlix-plugin-example">phlix-plugin-example</a> for the smallest working starter.</p>
    </div>
    <section class="cta-banner">
      <div class="cta-banner-inner">
        <h2>Build something great</h2>
        <a href="https://github.com/detain/phlix-plugin-example" class="btn btn-primary" rel="noopener noreferrer">Get the example plugin</a>
      </div>
    </section>`;
}

function buildDocs(slug, content) {
  return `
    <div class="page-header">
      <div class="page-header-inner">
        <h1>Docs</h1>
        <p class="page-lead">Everything you need to know.</p>
      </div>
    </div>
    <div class="content-section">
      <h2>Documentation</h2>
      <p>Full documentation is maintained at <a href="${escHtml(content.site.social.docs)}">${escHtml(content.site.social.docs)}</a>.</p>
      <ul class="docs-links">
        <li><a href="${escHtml(content.site.social.docs)}">User guide</a></li>
        <li><a href="${escHtml(content.site.social.docs)}/reference">API reference</a></li>
        <li><a href="${escHtml(content.site.social.docs)}/developers">Developer docs</a></li>
        <li><a href="${escHtml(content.site.social.docs)}/hub-admin">Hub admin guide</a></li>
      </ul>

      <h2>Ecosystem</h2>
      <ul>
        ${content.ecosystem.map(e => `<li><a href="${escHtml(e.repo)}" rel="noopener noreferrer">${escHtml(e.name)}</a> &mdash; ${escHtml(e.what)}</li>`).join('\n        ')}
      </ul>
    </div>`;
}

function buildHub(slug, _content) {
  return `
    <div class="page-header">
      <div class="page-header-inner">
        <h1>Phlix Hub</h1>
        <p class="page-lead">Reach your server from anywhere.</p>
      </div>
    </div>
    <div class="content-section">
      <h2>What the Hub does</h2>
      <p>Sign in once. The Hub's reverse-tunnel relay handles NAT traversal so you can access your server from your phone, your Roku at a friend's house, or any device anywhere in the world.</p>

      <h2>Self-host or use the public hub</h2>
      <p>You can run your own <a href="https://github.com/detain/phlix-hub">phlix-hub</a> instance, or use the public one at phlix-hub.example.com &mdash; no configuration required.</p>

      <h2>Hub mode in clients</h2>
      <p>Every official client supports Hub mode. When enabled, the client connects through the Hub relay instead of directly to your LAN server.</p>
    </div>
    <section class="cta-banner">
      <div class="cta-banner-inner">
        <h2>Try the public Hub</h2>
        <a href="/variants/${slug}/download.html" class="btn btn-primary btn-large">Get started</a>
      </div>
    </section>`;
}

function buildAbout(slug, content) {
  const faq = content.faq || [];
  return `
    <div class="page-header">
      <div class="page-header-inner">
        <h1>About</h1>
        <p class="page-lead">Self-hosted media. Open source. No lock-in.</p>
      </div>
    </div>
    <div class="content-section">
      <h2>Philosophy</h2>
      <p>${content.site.name} is built on a few principles: your library stays on your hardware, the software is BSD-3 licensed so you can fork it, and the community drives what gets built next.</p>

      <h2>License</h2>
      <p>BSD-3-Clause across all ${content.site.name} projects. Use it, modify it, sell products based on it &mdash; no strings attached.</p>

      <h2>Contributing</h2>
      <p>All projects live under <a href="https://github.com/detain">detain</a> on GitHub. Issues, PRs, and plugins are welcome.</p>

      <h2>FAQ</h2>
      <dl class="faq-list">
        ${faq.map(item => `
        <div class="faq-item">
          <dt>${escHtml(item.q)}</dt>
          <dd>${escHtml(item.a)}</dd>
        </div>`).join('\n        ')}
      </dl>
    </div>`;
}

// ─── Icon library (inline SVG paths) ──────────────────────────────────────────

const ICONS = {
  library: '<path d="M4 6h16M4 12h16M4 18h12"/>',
  syncplay: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>',
  transcode: '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  antenna: '<path d="M4.93 4.93l14.14 14.14M6.34 17.66l11.31 11.31M2 12l4-4 4 4M12 2l4 4-4 4M22 12l-4 4-4-4M12 22v-4"/>',
  broadcast: '<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9M7 16.5c3-3 7.5-3.5 10.5-1.5M9 9.5c3.5-3.5 9-3.5 12.5 0M12 5c3 0 5.5 2.5 5.5 5.5S15 16 12 16 6.5 13.5 6.5 10.5 9 5 12 5z"/>',
  puzzle: '<path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 01-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 10-3.214 3.214c.446.166.855.497.925.968a.979.979 0 01-.276.837l-1.61 1.61a2.404 2.404 0 01-1.705.707 2.402 2.402 0 01-1.704-.706l-1.568-1.568a1.026 1.026 0 00-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 11-3.214-3.214c.464-.18.894-.527.967-1.02a1.026 1.026 0 00-.289-.877l-1.568-1.568A2.402 2.402 0 013.455 10.5c0-.617.236-1.234.706-1.704L5.773 7.185a.98.98 0 01.837-.276c.47.07.802.48.968.925a2.501 2.501 0 113.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 01.276-.837l1.61-1.61a2.404 2.404 0 011.705-.707c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 013.214 3.214c-.464.18-.894.527-.967 1.02z"/>',
  hub: '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>',
};

function iconPath(icon) {
  return ICONS[icon] || ICONS.library;
}

// ─── Public API ──────────────────────────────────────────────────────────────

const PAGE_BUILDERS = {
  index: buildIndex,
  features: buildFeatures,
  clients: buildClients,
  download: buildDownload,
  plugins: buildPlugins,
  docs: buildDocs,
  hub: buildHub,
  about: buildAbout,
};

/**
 * Render a page for a variant.
 * @param {string} slug - Variant slug e.g. '01-minimalist-cinema'
 * @param {object} content - Parsed content.json
 * @param {string} page - Page key e.g. 'index', 'features', 'clients', etc.
 * @returns {string} Full HTML document
 */
export function renderPage(slug, content, page) {
  const builder = PAGE_BUILDERS[page];
  if (!builder) throw new Error(`Unknown page: ${page}`);
  const pageContent = builder(slug, content);
  return htmlShell(slug, page, pageContent);
}

/**
 * Escape HTML special characters.
 */
export function escHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default { renderPage, escHtml };
