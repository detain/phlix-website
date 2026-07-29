/* ==========================================================================
   MAIN.JS — Atlantis
   Nav toggle, reduced-motion, scroll reveals
   Theme: Sunken underwater kingdom, bioluminescent depths
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

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
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
  if (active) {
    document.body.style.transitionDuration = '0.01ms';
  } else {
    document.body.style.transitionDuration = '';
  }
};

reduceMotion.addEventListener('change', (e) => applyReducedMotion(e.matches));
applyReducedMotion(reduceMotion.matches);

/* ─── Page init ────────────────────────────────────────────────────────────── */
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
  '/404.html': '404',
};
for (const [k, v] of Object.entries(pageMap)) {
  if (path.endsWith(k)) {
    document.body.dataset.page = v;
    break;
  }
}
