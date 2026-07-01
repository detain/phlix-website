/**
 * Egyptian Dusk — main.js
 * Vanilla JS, no dependencies, defer-loaded.
 * Handles: mobile nav toggle, reduced-motion, scroll reveals.
 */
(function () {
  'use strict';

  /* ─── Mobile nav toggle ──────────────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        // Focus first menu item for keyboard users
        var firstLink = navMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Trap focus within open menu
    navMenu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = Array.from(navMenu.querySelectorAll('a[href], button:not([disabled])'));
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

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
    });
  }

  /* ─── Reduced motion ─────────────────────────────────────────────────── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Scroll reveals (ceremonial fade-up) ────────────────────────────── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    );

    var revealTargets = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .faq-item',
    );
    revealTargets.forEach(function (el) {
      el.classList.add('reveal-pending');
      revealObserver.observe(el);
    });
  } else {
    // Immediate reveal when reduced motion is preferred
    var targets = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .faq-item',
    );
    targets.forEach(function (el) {
      el.classList.add('is-revealed');
    });
  }

  /* ─── Add reveal animation styles via JS (no stylesheet dependency) ───── */
  var style = document.createElement('style');
  style.textContent = [
    '.reveal-pending {',
    '  opacity: 0;',
    '  transform: translateY(24px);',
    '  transition: opacity 500ms cubic-bezier(0.3,0,0.15,1),',
    '              transform 500ms cubic-bezier(0.3,0,0.15,1);',
    '}',
    '.is-revealed {',
    '  opacity: 1 !important;',
    '  transform: translateY(0) !important;',
    '}',
  ].join('');
  document.head.appendChild(style);
})();
