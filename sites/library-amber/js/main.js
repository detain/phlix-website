/**
 * main.js — Library Amber / Phlix brand-kit site
 * Mobile nav toggle, reduced-motion, scroll reveals
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ========================================================================
   * MOBILE NAV TOGGLE
   * ======================================================================== */
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  /* ========================================================================
   * FAQ ACCORDION (about.html)
   * ======================================================================== */
  var faqItems = document.querySelectorAll('.faq-list button');

  faqItems.forEach(function (btn) {
    function toggleFaq() {
      var isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isExpanded));
      var panelId = btn.getAttribute('aria-controls');
      var panel = panelId ? document.getElementById(panelId) : null;
      if (panel) {
        panel.hidden = isExpanded;
      }
    }

    btn.addEventListener('click', toggleFaq);
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFaq();
      }
    });
  });

  /* ========================================================================
   * SCROLL REVEAL (IntersectionObserver)
   * ======================================================================== */
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reducedMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all reveals immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ========================================================================
   * COPY CODE BUTTONS
   * ======================================================================== */
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pre = btn.closest('.code-block') || btn.closest('pre');
      if (!pre) return;

      var code = pre.querySelector('code');
      if (!code) return;

      var text = code.textContent || '';
      navigator.clipboard
        .writeText(text)
        .then(function () {
          var original = btn.textContent;
          btn.textContent = 'Copied';
          btn.style.color = 'var(--color-success)';
          setTimeout(function () {
            btn.textContent = original;
            btn.style.color = '';
          }, 2000);
        })
        .catch(function () {
          // Clipboard API not available — silently ignore
        });
    });
  });
})();
