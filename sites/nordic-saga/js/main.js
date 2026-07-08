/**
 * Phlix brand kit configuration.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

/* ==========================================================================
   main.js — nav toggle, reduced motion, scroll reveals
   Nordic Saga brand kit — phlix-website/sites/nordic-saga/
   ========================================================================== */

(function () {
  'use strict';

  /* ── Mobile Nav Toggle ─────────────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu   = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ── Reduced Motion ────────────────────────────────────────────────── */
  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ── Scroll Reveals (IntersectionObserver) ────────────────────────── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll(
      '.feature-card, .feature-detail, .client-card, .download-card, .ecosystem-item, .faq-item'
    ).forEach(function (el) {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  } else {
    /* Show everything immediately when reduced motion is preferred */
    document.querySelectorAll(
      '.feature-card, .feature-detail, .client-card, .download-card, .ecosystem-item, .faq-item'
    ).forEach(function (el) {
      el.classList.add('animate-fade-in-up');
    });
  }

  /* ── Scroll-reveal CSS (injected once) ─────────────────────────────── */
  if (!document.getElementById('scroll-reveal-styles')) {
    var style = document.createElement('style');
    style.id = 'scroll-reveal-styles';
    style.textContent = [
      '.reveal { opacity: 0; }',
      '.reveal.animate-fade-in-up {',
        'animation: fade-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) both;',
        'opacity: 1;',
      '}',
      '@keyframes fade-in-up {',
        'from { opacity: 0; transform: translateY(20px); }',
        'to   { opacity: 1; transform: translateY(0); }',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

})();
