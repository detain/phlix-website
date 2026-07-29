/**
 * power-up theme — main.js
 * Mobile nav toggle, reduced-motion, scroll reveals
 * @copyright 2026 Phlix
 */
(function () {
  'use strict';

  /* ─── Mobile nav toggle ─────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });

    // Trap focus in open menu
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

  /* ─── Reduced motion ────────────────────────────────────── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.style.setProperty(
      '--transition-fast', '0.01ms'
    );
    document.documentElement.style.setProperty(
      '--transition-base', '0.01ms'
    );
    document.documentElement.style.setProperty(
      '--transition-slow', '0.01ms'
    );
  }

  if (prefersReducedMotion.matches) {
    handleReducedMotion();
  }

  /* ─── Scroll reveals ─────────────────────────────────────── */
  if (!prefersReducedMotion.matches) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.feature-card, .client-card, .feature-detail, .download-card').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });

    // Add revealed class styles
    var style = document.createElement('style');
    style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
  }

  /* ─── FAQ details toggle ─────────────────────────────────── */
  document.querySelectorAll('.faq-list details').forEach(function (details) {
    details.addEventListener('toggle', function () {
      if (!prefersReducedMotion.matches) return;
      // Under reduced-motion, skip any animation
    });
  });
})();
