/**
 * main.js — Ambient Pulse theme
 * @copyright 2026 Phlix
 */

(function () {
  'use strict';

  /* ─── Mobile Nav Toggle ──────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });

    // Trap focus within open menu
    navMenu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = navMenu.querySelectorAll('a, button');
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* ─── Reduced Motion ────────────────────────────────────── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('reduce-motion', prefersReducedMotion.matches);
  }

  handleReducedMotion();
  prefersReducedMotion.addEventListener('change', handleReducedMotion);

  /* ─── Scroll Reveal (IntersectionObserver) ───────────────── */
  if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
    var revealElements = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .ecosystem-item, .faq-item, .plugin-step',
    );

    if (revealElements.length > 0) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
      );

      revealElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(1.5rem)';
        el.style.transition =
          'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
      });

      // Add revealed state styles
      var style = document.createElement('style');
      style.textContent =
        '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
      document.head.appendChild(style);
    }
  }

  /* ─── Waveform animation (if present) ────────────────────── */
  var waveformBars = document.querySelectorAll('.waveform-bar');
  if (waveformBars.length > 0 && prefersReducedMotion.matches) {
    waveformBars.forEach(function (bar) {
      bar.style.animation = 'none';
      bar.style.height = '50%';
    });
  }
})();
