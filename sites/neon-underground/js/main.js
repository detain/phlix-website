/**
 * main.js — neon-underground
 * Vanilla JS, no dependencies, defer-loaded.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Mobile nav toggle
  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');

    if (!toggle || !menu) return;

    function openMenu() {
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Toggle navigation');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      if (menu.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // Scroll reveals
  function initScrollReveal() {
    if (prefersReducedMotion.matches) return;

    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Neon flicker effect for specific elements
  function initFlicker() {
    if (prefersReducedMotion.matches) return;

    const flickers = document.querySelectorAll('.flicker');
    flickers.forEach(function (el) {
      let timeout;
      function scheduleFlicker() {
        timeout = setTimeout(
          function () {
            el.style.opacity = Math.random() * 0.3 + 0.7;
            setTimeout(
              function () {
                el.style.opacity = 1;
                scheduleFlicker();
              },
              50 + Math.random() * 100,
            );
          },
          2000 + Math.random() * 4000,
        );
      }
      scheduleFlicker();
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initNav();
      initScrollReveal();
      initFlicker();
    });
  } else {
    initNav();
    initScrollReveal();
    initFlicker();
  }

  // Listen for reduced motion changes
  prefersReducedMotion.addEventListener('change', function () {
    if (prefersReducedMotion.matches) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
    } else {
      initScrollReveal();
    }
  });
})();
