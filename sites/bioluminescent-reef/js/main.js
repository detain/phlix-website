/* ==========================================================================
   MAIN.JS — Bioluminescent Reef
   Nav toggle, reduced-motion, scroll reveals, mascot (Abyss), easter eggs,
   seasonal activation, intensity toggle
   Transcribes: brand-kits/bioluminescent-reef.js mascot.behavior, easter_eggs,
   seasonal_activation, scroll_experience, navigation_model
   @copyright 2026 Joe Huss <detain@interserver.net>
   ========================================================================== */

'use strict';

/* ─── Nav toggle ─────────────────────────────────────────────────────────── */
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ─── Scroll reveals ─────────────────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}

/* ─── Reduced motion listener ───────────────────────────────────────────── */
let reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const applyReducedMotion = (active) => {
  document.documentElement.style.setProperty('--motion-duration', active ? '0.01ms' : 'initial');
  // Disable all transition properties on body when reduced
  if (active) {
    document.body.style.transitionDuration = '0.01ms';
  } else {
    document.body.style.transitionDuration = '';
  }
};

reduceMotion.addEventListener('change', (e) => applyReducedMotion(e.matches));
applyReducedMotion(reduceMotion.matches);

/* ─── Intensity toggle (calm mode) ─────────────────────────────────────── */
const intensityToggle = document.querySelector('.intensity-toggle');

if (intensityToggle) {
  intensityToggle.addEventListener('click', () => {
    const isCalm = intensityToggle.getAttribute('aria-pressed') === 'true';
    const next = !isCalm;
    intensityToggle.setAttribute('aria-pressed', String(next));

    if (next) {
      document.documentElement.style.setProperty('--motion-duration', '0.01ms');
      document.querySelectorAll('*').forEach((el) => {
        el.style.animationDuration = '0.01ms';
        el.style.transitionDuration = '0.01ms';
      });
    } else {
      document.documentElement.style.setProperty('--motion-duration', '');
      document.querySelectorAll('*').forEach((el) => {
        el.style.animationDuration = '';
        el.style.transitionDuration = '';
      });
    }
  });
}

/* ─── Seasonal activation ────────────────────────────────────────────────── */
(function seasonalActivation() {
  const now = new Date();
  const mmdd = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const variants = [
    {
      name: "New Year's Midnight Bloom",
      active: mmdd >= '12-28' || mmdd <= '01-03',
      overrides: { primary: '#00E8C8', secondary: '#7700FF', tertiary: '#FF7B00' },
    },
    {
      name: 'All Hallows Abyss',
      active: mmdd >= '10-01' && mmdd <= '10-31',
      overrides: { primary: '#CC1A4A', secondary: '#7700FF', surface: '#050010' },
    },
    {
      name: "Valentine's Phosphor",
      active: mmdd >= '02-10' && mmdd <= '02-14',
      overrides: { primary: '#00E8C8', secondary: '#FF2D78' },
    },
  ];

  const active = variants.find((v) => v.active);
  if (!active) return;

  // Apply CSS custom property overrides
  const root = document.documentElement;
  Object.entries(active.overrides).forEach(([key, val]) => {
    const prop = `--color-${key}`;
    root.style.setProperty(prop, val);
  });

  // Inject banner
  const slot = document.querySelector('[data-season-slot]');
  if (slot) {
    const banner = document.createElement('div');
    banner.className = 'seasonal-banner';
    banner.textContent =
      'The deep shifts with the season. A rare bioluminescent event is occurring.';
    slot.appendChild(banner);
  }
})();

/* ─── Abyss mascot ───────────────────────────────────────────────────────── */
(function mascotAbyss() {
  // Placement: home, features, download only
  const page = document.body.dataset.page;
  if (!['home', 'features', 'download'].includes(page)) return;

  // Check if dismissed
  if (localStorage.getItem('abyss-dismissed') === 'true') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const container = document.createElement('aside');
  container.className = 'abyss';
  container.setAttribute('aria-label', 'Abyss, deep-sea companion');
  container.dataset.tipFor = '';

  container.innerHTML = `
    <button class="abyss__figure" type="button" aria-label="Nudge Abyss">
      <svg viewBox="0 0 64 80" aria-hidden="true" focusable="false">
        <circle class="abyss__ring" cx="32" cy="22" r="18" />
        <ellipse class="abyss__bell" cx="32" cy="22" rx="18" ry="14" />
        <path class="abyss__tendril" d="M24 34 Q20 48 26 62" />
        <path class="abyss__tendril" d="M28 36 Q24 52 30 68" />
        <path class="abyss__tendril" d="M32 37 Q32 54 32 70" />
        <path class="abyss__tendril" d="M36 36 Q40 52 34 68" />
        <path class="abyss__tendril" d="M40 34 Q44 48 38 62" />
        <circle class="abyss__tip" cx="26" cy="62" r="2" />
        <circle class="abyss__tip" cx="30" cy="68" r="2" />
        <circle class="abyss__tip" cx="32" cy="70" r="2" />
        <circle class="abyss__tip" cx="34" cy="68" r="2" />
        <circle class="abyss__tip" cx="38" cy="62" r="2" />
      </svg>
    </button>
    <div class="abyss__col">
      <span class="abyss__name">Abyss · midnight guide</span>
      <div class="abyss__tip-panel" role="region" aria-label="Companion tip">
        <p class="abyss__tip-text"></p>
        <button class="abyss__dismiss" type="button">Abyss, return to the deep</button>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  const figure = container.querySelector('.abyss__figure');
  const tipPanel = container.querySelector('.abyss__tip-panel');
  const tipText = container.querySelector('.abyss__tip-text');
  const dismissBtn = container.querySelector('.abyss__dismiss');
  const sectionId = document.querySelector('main > section[id]')?.id || '';

  // Tips keyed to sections
  const tips = {
    'the-descent': 'You have entered the midnight zone. The deep awaits.',
    'the-creatures': 'Each creature here glows with its own purpose — watch them pulse.',
    'why-phlix': 'Something lives in every layer of this stack. Look closer.',
    'good-seats': 'The record is deep. Scroll and see what has been logged.',
    'dive-deeper': 'The ladder extends down. Each rung glows with a way forward.',
    syncplay:
      'SyncPlay is an organism tuned to pressure and time — it keeps every screen in the same current.',
    'download-server':
      'The hull is your gateway. Install it, and the abyss opens to every screen in your home.',
    features: 'Eight creatures inhabit this depth. Each one evolved for a purpose.',
    download: 'The relay awaits. Choose your entry point.',
  };

  // Show tip after 2s on page
  const tipTimer = setTimeout(() => {
    const tip = tips[sectionId] || tips[page] || 'Something glows in the dark.';
    tipText.textContent = tip;
    tipPanel.classList.add('is-open');
  }, 2000);

  // Dismiss
  dismissBtn.addEventListener('click', () => {
    clearTimeout(tipTimer);
    container.classList.add('is-hidden');
    localStorage.setItem('abyss-dismissed', 'true');
  });

  // Logo clicks counter for easter egg
  let logoClicks = 0;
  const logoEl = document.querySelector('.nav-logo');
  if (logoEl) {
    logoEl.addEventListener('click', (e) => {
      // Don't interfere with nav
      e.preventDefault();
      logoClicks++;
      if (logoClicks === 5) {
        showEggNote('Something stirs in the hadal darkness…');
        // Spiral reaction (mascot easter_interactions[0])
        container.querySelector('.abyss__figure').style.animation = 'none';
        container
          .querySelector('.abyss__figure')
          .animate(
            [
              { transform: 'rotate(0deg) scale(1)' },
              { transform: 'rotate(360deg) scale(1.1)' },
              { transform: 'rotate(720deg) scale(1)' },
            ],
            { duration: 1200, easing: 'ease-in-out' },
          );
        logoClicks = 0;
      }
    });
  }

  // Hover-hold interaction (3s)
  let hoverTimer;
  figure.addEventListener('mouseenter', () => {
    hoverTimer = setTimeout(() => {
      tipText.textContent = 'Abyss reaches toward you from the deep.';
      tipPanel.classList.add('is-open');
    }, 3000);
  });
  figure.addEventListener('mouseleave', () => clearTimeout(hoverTimer));
})();

/* ─── Easter eggs ─────────────────────────────────────────────────────────── */
// 1. logo-clicks:5 — handled in mascotAbyss()

// 2. typed-word:abyss — key listener disabled in inputs
(function easterTypedWord() {
  const egg = { typed: '', timer: null };
  const target = 'abyss';
  const note = document.querySelector('.egg-note') || createEggNote();

  function createEggNote() {
    const el = document.createElement('div');
    el.className = 'egg-note is-hidden';
    el.setAttribute('role', 'status');
    el.innerHTML = '<span class="egg-note__body"></span><span class="egg-note__exit">Esc</span>';
    document.body.appendChild(el);
    return el;
  }

  function showEggNote(text) {
    const body = note.querySelector('.egg-note__body');
    if (body) body.textContent = text;
    note.classList.remove('is-hidden');
  }

  function hideEggNote() {
    note.classList.add('is-hidden');
  }

  document.addEventListener('keydown', (e) => {
    // Never preventDefault — accessibility rule §19.8
    if (e.key === 'Escape') {
      hideEggNote();
      egg.typed = '';
      return;
    }

    // Disabled in inputs
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

    if (e.key.length === 1) {
      egg.typed += e.key.toLowerCase();

      // Keep only last N chars
      if (egg.typed.length > target.length * 2) {
        egg.typed = egg.typed.slice(-target.length);
      }

      if (egg.typed.includes(target)) {
        showEggNote('You found the abyss. Something ancient stares back.');
        egg.typed = '';
      }
    }
  });

  // Esc clears egg note
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') hideEggNote();
  });
})();

/* ─── Focus trap helper for accessibility ─────────────────────────────────── */
function trapFocus(node) {
  const focusable = node.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  function handler(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  node.addEventListener('keydown', handler);
  return () => node.removeEventListener('keydown', handler);
}

/* ─── Utility: quiet() — only removes animation, keeps content ────────────── */
function quiet() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Caller-controlled: we don't conflate calm mode with reduced motion
}

/* ─── Page init ────────────────────────────────────────────────────────────── */
// Mark current page on body for CSS/JS targeting
const path = window.location.pathname;
const pageMap = {
  '/': 'home',
  '/index.html': 'home',
  '/features.html': 'features',
  '/clients.html': 'clients',
  '/download.html': 'download',
  '/plugins.html': 'plugins',
  '/docs.html': 'docs',
  '/hub.html': 'hub',
  '/about.html': 'about',
};
for (const [k, v] of Object.entries(pageMap)) {
  if (path.endsWith(k)) {
    document.body.dataset.page = v;
    break;
  }
}
