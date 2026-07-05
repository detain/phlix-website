/* ============================================================
   main.js — Nav toggle, reduced-motion, scroll reveals
   Brand kit: Tropical Lagoon (tropical-lagoon)
   ============================================================ */

(function () {
  'use strict';

  /* ── Mobile nav toggle ───────────────────────────────────── */
  var toggle = document.querySelector('.nav-toggle');
  var menu   = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ── Reduced motion ──────────────────────────────────────── */
  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ── Scroll reveals (IntersectionObserver) ───────────────── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealSelectors = [
      '.feature-card',
      '.client-card',
      '.download-card',
      '.feature-detail',
      '.faq-item',
      '.ecosystem-list li',
      '.docs-links li',
    ];

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    });

    revealSelectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition =
          'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), ' +
          'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        revealObserver.observe(el);
      });
    });

    /* Apply revealed state */
    document.head.insertAdjacentHTML('beforeend', `
      <style>
        .is-revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      </style>
    `);
  }

  /* ── External link opener ────────────────────────────────── */
  document.querySelectorAll('a[href^="http"]').forEach(function (link) {
    if (!link.closest('.nav-menu') && !link.hasAttribute('target')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

})();
