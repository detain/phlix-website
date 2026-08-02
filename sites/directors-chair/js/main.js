/**
 * main.js — Directors Chair theme
 * Mobile navigation toggle, reduced motion, scroll reveals
 * @copyright Phlix Project
 */

(function () {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile navigation toggle
  function initMobileNav() {
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

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        !menu.contains(e.target) &&
        !toggle.contains(e.target) &&
        menu.classList.contains('is-open')
      ) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });

    // Close on link click (accessibility)
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (menu.classList.contains('is-open')) {
          closeMenu();
        }
      });
    });
  }

  // Scroll reveal animations
  function initScrollReveal() {
    if (prefersReducedMotion) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe feature cards, client cards, download cards
    document
      .querySelectorAll('.feature-card, .feature-detail, .client-card, .download-card')
      .forEach(function (el) {
        el.style.opacity = '0';
        observer.observe(el);
      });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initMobileNav();
      initScrollReveal();
    });
  } else {
    initMobileNav();
    initScrollReveal();
  }
})();
