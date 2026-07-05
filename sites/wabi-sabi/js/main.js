/**
 * main.js — Wabi-Sabi Brand Kit
 * Vanilla JS, no dependencies, deferred loading
 */

(function () {
  'use strict';

  // ─── Mobile Navigation Toggle ────────────────────────────────────────────────

  var navToggle = document.querySelector('.nav-toggle');
  var navMenu   = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
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
  }

  // ─── Reduced Motion ────────────────────────────────────────────────────────────

  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // ─── Scroll Reveal (ink-dissolve fade-in) ─────────────────────────────────────

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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    var revealTargets = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .feature-detail, .faq-item'
    );

    revealTargets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      el.style.transition = 'opacity 500ms ease-in-out, transform 500ms ease-in-out';
      revealObserver.observe(el);
    });

    // Add revealed class styles
    var style = document.createElement('style');
    style.textContent =
      '.is-revealed { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
  }

  // ─── Nav Logo Brush-Reveal Animation ──────────────────────────────────────────

  // Applied once the page has loaded (unhurried — respects reduced motion)
  var navLogo = document.querySelector('.nav-logo');
  if (navLogo && !prefersReducedMotion) {
    navLogo.style.opacity = '0';
    navLogo.style.transform = 'translateX(-8px)';
    navLogo.style.transition = 'opacity 600ms ease-in-out, transform 600ms ease-in-out';
    window.addEventListener('load', function () {
      navLogo.style.opacity = '1';
      navLogo.style.transform = 'translateX(0)';
    });
  } else if (navLogo) {
    navLogo.style.opacity = '1';
  }

})();
