/* ==========================================================================
   MAIN.JS — Loot Crate Theme
   Mobile nav toggle, reduced motion, scroll reveals
   @copyright 2026 Joe Huss <detain@interserver.net>
   ========================================================================== */

(function () {
  'use strict';

  /* ── Mobile nav toggle ─────────────────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.main-nav ul');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
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

  /* ── Reduced motion ────────────────────────────────────────────────────── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('reduce-motion', prefersReducedMotion.matches);
  }

  prefersReducedMotion.addEventListener('change', handleReducedMotion);
  handleReducedMotion();

  /* ── Scroll reveals ─────────────────────────────────────────────────────── */
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
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
      el.classList.add('reveal-pending');
      revealObserver.observe(el);
    });
  }

  /* ── Code block copy buttons ───────────────────────────────────────────── */
  var codeBlocks = document.querySelectorAll('.code-block');

  codeBlocks.forEach(function (block) {
    var pre = block.querySelector('pre');
    if (!pre) return;

    var copyBtn = block.querySelector('.copy-btn');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', function () {
      var text = pre.textContent || '';
      navigator.clipboard.writeText(text).then(
        function () {
          copyBtn.textContent = 'Copied!';
          setTimeout(function () {
            copyBtn.textContent = 'Copy';
          }, 2000);
        },
        function () {
          copyBtn.textContent = 'Failed';
          setTimeout(function () {
            copyBtn.textContent = 'Copy';
          }, 2000);
        },
      );
    });
  });

  /* ── FAQ details animation ─────────────────────────────────────────────── */
  var faqDetails = document.querySelectorAll('.faq-list details');

  faqDetails.forEach(function (details) {
    details.addEventListener('toggle', function () {
      if (details.open) {
        // Close others
        faqDetails.forEach(function (other) {
          if (other !== details && other.open) {
            other.open = false;
          }
        });
      }
    });
  });

  /* ── Active nav link ───────────────────────────────────────────────────── */
  var currentPath = window.location.pathname;
  var navLinks = document.querySelectorAll('.main-nav a');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && currentPath.endsWith(href)) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();

/* ==========================================================================
   @copyright 2026 Joe Huss <detain@interserver.net>
   ========================================================================== */
