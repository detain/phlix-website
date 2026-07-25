/**
 * js/main.js — Pop Art Explosion site
 * Vanilla JS: nav toggle, reduced-motion, scroll reveals
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  // ── Mobile nav toggle ────────────────────────────────────────────
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

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // ── Reduced motion check ──────────────────────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Scroll reveals (fade + slide-up) ──────────────────────────────
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    document.querySelectorAll('.feature-card, .client-card, .download-card').forEach((el) => {
      el.classList.add('reveal-target');
      revealObserver.observe(el);
    });
  } else {
    // No reveal needed — make everything visible immediately
    document.querySelectorAll('.reveal-target').forEach((el) => {
      el.classList.add('is-revealed');
    });
  }

  // ── Add reveal CSS ───────────────────────────────────────────────
  const revealStyle = document.createElement('style');
  revealStyle.textContent = `
    .reveal-target {
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.15s steps(4, end), transform 0.15s steps(4, end);
    }
    .reveal-target.is-revealed {
      opacity: 1;
      transform: translateY(0);
    }
    @media (prefers-reduced-motion: reduce) {
      .reveal-target {
        opacity: 1;
        transform: none;
        transition: none;
      }
    }
  `;
  document.head.appendChild(revealStyle);
})();
