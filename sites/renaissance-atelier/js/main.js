/**
 * ============================================================================
 * MAIN.JS — Renaissance Atelier
 * Vanilla JS, dependency-free, defer-loaded.
 *
 * Handles:
 *   - Mobile nav toggle (accessible hamburger)
 *   - Scroll reveals (IntersectionObserver, sfumato fade)
 *   - Reduced motion respect
 *   - Intensity toggle (Studio Calm Mode)
 *   - Seasonal variant activation (date-gate)
 *   - Mascot companion Piero (placement, tips, dismissal)
 *   - Easter eggs: logo-clicks:5 (lantern flare) +
 *                  typed-word:pigment (brush cursor)
 * ============================================================================
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

'use strict';

/* --------------------------------------------------------------------------
   1. Reduced motion preference (re-read on change)
   -------------------------------------------------------------------------- */
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)');

function getReducedMotion() {
  return prefersReducedMotion().matches;
}

function onReduceMotionChange(e) {
  document.documentElement.classList.toggle('reduced-motion', e.matches);
  if (e.matches) {
    // Cancel any ongoing animations, restore state
    document
      .querySelectorAll('.animate-sfumato, .animate-fade-in, .animate-bloom')
      .forEach((el) => {
        el.style.animationPlayState = 'paused';
        el.style.opacity = '';
        el.style.transform = '';
      });
  } else {
    document
      .querySelectorAll('.animate-sfumato, .animate-fade-in, .animate-bloom')
      .forEach((el) => {
        el.style.animationPlayState = '';
      });
  }
}

prefersReducedMotion().addEventListener('change', onReduceMotionChange);
if (getReducedMotion()) {
  document.documentElement.classList.add('reduced-motion');
}

/* --------------------------------------------------------------------------
   2. Mobile nav toggle
   -------------------------------------------------------------------------- */
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.querySelector('.nav-overlay');
const navClose = document.querySelector('.nav-menu__close');

function openNav() {
  if (!navMenu) return;
  navMenu.classList.add('is-open');
  navOverlay?.classList.add('is-visible');
  navToggle?.setAttribute('aria-expanded', 'true');
  navToggle?.setAttribute('aria-label', 'Close navigation');
  document.body.style.overflow = 'hidden';
  // Focus first link
  navMenu.querySelector('a')?.focus();
}

function closeNav() {
  if (!navMenu) return;
  navMenu.classList.remove('is-open');
  navOverlay?.classList.remove('is-visible');
  navToggle?.setAttribute('aria-expanded', 'false');
  navToggle?.setAttribute('aria-label', 'Toggle navigation');
  document.body.style.overflow = '';
  navToggle?.focus();
}

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu?.classList.contains('is-open');
  if (isOpen) closeNav();
  else openNav();
});

navOverlay?.addEventListener('click', closeNav);
navClose?.addEventListener('click', closeNav);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu?.classList.contains('is-open')) {
    closeNav();
  }
});

/* --------------------------------------------------------------------------
   3. Scroll reveals (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  if (getReducedMotion()) return;

  const targets = document.querySelectorAll('.animate-fade-in');
  if (!targets.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  );

  targets.forEach((el) => io.observe(el));
}

/* --------------------------------------------------------------------------
   4. Intensity toggle — Studio Calm Mode
   -------------------------------------------------------------------------- */
const calmToggle = document.querySelector('.calm-toggle');

function applyCalmMode(calm) {
  document.documentElement.dataset.calm = String(calm);
  try {
    localStorage.setItem('phlix-calm', calm ? '1' : '0');
  } catch (_) {}
  calmToggle?.setAttribute('aria-checked', String(calm));
}

function loadCalmMode() {
  try {
    const saved = localStorage.getItem('phlix-calm');
    if (saved !== null) {
      applyCalmMode(saved === '1');
      return;
    }
  } catch (_) {}
  // Default: full intensity (no calm)
  applyCalmMode(false);
}

calmToggle?.addEventListener('click', () => {
  const current = document.documentElement.dataset.calm === 'true';
  applyCalmMode(!current);
});

loadCalmMode();

/* --------------------------------------------------------------------------
   5. Seasonal variant activation (live-js date gate)
   -------------------------------------------------------------------------- */
const SEASONAL_RANGES = [
  { id: 'advent', start: [12, 1], end: [12, 31] },
  { id: 'carnivale', start: [2, 1], end: [2, 28] },
  { id: 'estate', start: [6, 21], end: [9, 22] },
  { id: 'autunno', start: [9, 23], end: [11, 30] },
];

function getSeasonId() {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-indexed
  const day = now.getDate();

  for (const s of SEASONAL_RANGES) {
    const [sm, sd] = s.start;
    const [em, ed] = s.end;
    // Simple comparison: if month is between start and end
    if (month === sm && day >= sd) return s.id;
    if (month === em && day <= ed) return s.id;
    if (month > sm && month < em) return s.id;
  }
  return null;
}

function applySeasonalVariant() {
  const id = getSeasonId();
  if (id) {
    document.documentElement.dataset.season = id;
  }
}

applySeasonalVariant();

/* --------------------------------------------------------------------------
   6. FAQ accordion (native disclosure widget)
   -------------------------------------------------------------------------- */
function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const btn = item.querySelector('.faq-item__question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.hasAttribute('open');
      // Close all others (optional single-open)
      items.forEach((i) => {
        if (i !== item) i.removeAttribute('open');
      });
      if (!isOpen) item.setAttribute('open', '');
    });
  });
}

/* --------------------------------------------------------------------------
   7. Mascot companion — Piero
   -------------------------------------------------------------------------- */
const mascotEl = document.querySelector('.mascot');
let mascotDismissed = false;

function loadMascotDismissal() {
  try {
    mascotDismissed = localStorage.getItem('phlix-piero-dismissed') === '1';
  } catch (_) {}
  if (mascotEl && mascotDismissed) {
    mascotEl.style.display = 'none';
    return;
  }
  initMascotTips();
}

function dismissMascot() {
  if (!mascotEl) return;
  mascotDismissed = true;
  try {
    localStorage.setItem('phlix-piero-dismissed', '1');
  } catch (_) {}
  mascotEl.style.display = 'none';
}

function initMascotTips() {
  if (!mascotEl) return;
  if (getReducedMotion()) return;

  const tip = mascotEl.querySelector('.mascot__tip');
  const dismissBtn = mascotEl.querySelector('.mascot__dismiss');

  dismissBtn?.addEventListener('click', dismissMascot);

  // Contextual tip based on current page section
  const section = detectCurrentSection();
  if (tip && section) {
    const tipTexts = {
      hero: 'Welcome to the atelier. Every work here is a masterpiece.',
      'features-grid': 'Each tool is a pigment on the palette — used with care and intention.',
      server: "One command, and you are the master of your own studio. I'll hold the light.",
      'faq-section': 'Questions, like paintings, deserve patient, measured answers.',
    };
    const text = Object.entries(tipTexts).find(([k]) => section.includes(k))?.[1];
    if (text) {
      tip.textContent = text;
      tip.classList.add('is-visible');
      // Hide after 6s
      setTimeout(() => tip.classList.remove('is-visible'), 6000);
    }
  }
}

function detectCurrentSection() {
  // Heuristic: check URL path and visible section
  const path = window.location.pathname;
  if (path.includes('features')) return 'features-grid';
  if (path.includes('download') || path.includes('server')) return 'server';
  if (path.includes('about') || path.includes('faq')) return 'faq-section';
  return 'hero';
}

/* --------------------------------------------------------------------------
   8. Easter eggs
   -------------------------------------------------------------------------- */

// 8a. logo-clicks:5 — Piero's lantern flares
let logoClickCount = 0;
let lanternFlareTimer = null;

document.querySelectorAll('.nav-logo, .site-header__inner > a, .hero__content a').forEach((el) => {
  el.addEventListener('click', () => {
    logoClickCount++;
    if (logoClickCount >= 5) {
      logoClickCount = 0;
      triggerLanternFlare();
    }
  });
});

function triggerLanternFlare() {
  // Flash Piero's lantern or the logo area
  const target =
    mascotEl?.querySelector('.mascot__figure') || document.querySelector('.site-header');
  if (!target) return;

  target.classList.add('easter-lantern-flare');
  showEasterToast('Every masterwork begins with a single mark.');

  clearTimeout(lanternFlareTimer);
  lanternFlareTimer = setTimeout(() => {
    target.classList.remove('easter-lantern-flare');
  }, 5000);

  // Allow Esc to dismiss
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      target.classList.remove('easter-lantern-flare');
      clearTimeout(lanternFlareTimer);
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

// 8b. typed-word:pigment — brush cursor
let typedBuffer = '';
const TARGET_WORD = 'pigment';
let brushCursorActive = false;
let brushTimer = null;

document.addEventListener('keydown', (e) => {
  // Skip if focus is in an input/textarea
  const tag = document.activeElement?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return;
  if (e.key === 'Escape') {
    if (brushCursorActive) exitBrushCursor();
    return;
  }
  // Only printable characters
  if (e.key.length !== 1) return;

  typedBuffer += e.key;
  if (typedBuffer.length > TARGET_WORD.length) {
    typedBuffer = typedBuffer.slice(-TARGET_WORD.length);
  }

  if (typedBuffer === TARGET_WORD) {
    typedBuffer = '';
    enterBrushCursor();
  }

  clearTimeout(brushTimer);
  brushTimer = setTimeout(() => {
    typedBuffer = '';
  }, 1000);
});

function enterBrushCursor() {
  if (brushCursorActive) return;
  brushCursorActive = true;
  document.body.classList.add('cursor-brush');
  showEasterToast('You have discovered the palette.');

  brushTimer = setTimeout(exitBrushCursor, 8000);
}

function exitBrushCursor() {
  brushCursorActive = false;
  document.body.classList.remove('cursor-brush');
  clearTimeout(brushTimer);
}

/* --------------------------------------------------------------------------
   9. Easter toast helper
   -------------------------------------------------------------------------- */
let toastEl = null;

function showEasterToast(message) {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'easter-toast';
    toastEl.setAttribute('role', 'status');
    toastEl.setAttribute('aria-live', 'polite');
    document.body.appendChild(toastEl);
  }

  toastEl.textContent = message;
  toastEl.classList.add('is-visible');

  clearTimeout(showEasterToast._timer);
  showEasterToast._timer = setTimeout(() => {
    toastEl.classList.remove('is-visible');
  }, 5000);
}

/* --------------------------------------------------------------------------
   10. Init all
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
  initFaq();
  loadMascotDismissal();
});
