/**
 * js/main.js — Retro Seventies Brand Kit
 * Mobile nav toggle, reduced-motion gate, scroll reveals.
 */
(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Mobile nav toggle ──────────────────────────────────────
  const toggle  = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // ── Scroll reveals (progressive enhancement) ───────────────
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const reveals = document.querySelectorAll('.feature-card, .client-card, .feature-detail, .faq-item, .download-card');
    if (reveals.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      reveals.forEach((el) => {
        el.classList.add('reveal');
        observer.observe(el);
      });
    }
  } else {
    // Motion disabled or no IO: show everything immediately
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
  }

})();
