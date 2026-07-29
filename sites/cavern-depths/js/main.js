/**
 * ============================================================================
 * MAIN.JS — Cavern Depths
 * Navigation, scroll reveals, motion control for cave exploration theme.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Configuration
     -------------------------------------------------------------------------- */
  const CONFIG = {
    reducedMotionMedia: '(prefers-reduced-motion: reduce)',
  };

  /* --------------------------------------------------------------------------
     Mobile Navigation
     -------------------------------------------------------------------------- */
  function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    function openMenu() {
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation');
      trapFocus(menu);
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Toggle navigation');
    }

    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
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

  /* --------------------------------------------------------------------------
     Focus Trap
     -------------------------------------------------------------------------- */
  function trapFocus(element) {
    const focusable = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleTab(e) {
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
    element.addEventListener('keydown', handleTab);
    first?.focus();
  }

  /* --------------------------------------------------------------------------
     Reduced Motion
     -------------------------------------------------------------------------- */
  function initReducedMotion() {
    const handlers = [];

    function attachHandler(mq) {
      function handler(e) {
        document.body.classList.toggle('reduce-motion', e.matches);
      }
      mq.addEventListener('change', handler);
      handlers.push({ mq, handler });
    }

    const mq = window.matchMedia(CONFIG.reducedMotionMedia);
    attachHandler(mq);
    document.body.classList.toggle('reduce-motion', mq.matches);
  }

  /* --------------------------------------------------------------------------
     Scroll Reveal (IntersectionObserver)
     -------------------------------------------------------------------------- */
  function initScrollReveal() {
    const reduceMotion = window.matchMedia(CONFIG.reducedMotionMedia).matches;
    if (reduceMotion) return;

    const reveals = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .faq-item',
    );
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    reveals.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
      observer.observe(el);
    });
  }

  /* --------------------------------------------------------------------------
     Init All
     -------------------------------------------------------------------------- */
  function init() {
    initReducedMotion();
    initNav();
    initScrollReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
