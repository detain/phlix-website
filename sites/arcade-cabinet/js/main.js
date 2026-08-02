/* @copyright 2026 Joe Huss <detain@interserver.net> */
/* ===========================================================================
   MAIN.JS — Mobile nav, reduced motion, scroll reveals
   =========================================================================== */

(function () {
  'use strict';

  /* ── Mobile nav toggle ──────────────────────────────────────────────────── */

  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

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

  /* ── Scroll reveals ────────────────────────────────────────────────────── */

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealElements = document.querySelectorAll('.reveal');

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      },
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all reveals immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ── Code block copy button ────────────────────────────────────────────── */

  var copyButtons = document.querySelectorAll('.code-block-copy');

  copyButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var codeBlock = btn.closest('.code-block');
      var code = codeBlock.querySelector('code');
      if (code) {
        navigator.clipboard.writeText(code.textContent).then(
          function () {
            btn.textContent = 'Copied!';
            setTimeout(function () {
              btn.textContent = 'Copy';
            }, 2000);
          },
          function () {
            btn.textContent = 'Failed';
            setTimeout(function () {
              btn.textContent = 'Copy';
            }, 2000);
          },
        );
      }
    });
  });

  /* ── FAQ accordion ─────────────────────────────────────────────────────── */

  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
})();
