/* ==========================================================================
   main.js — Psychedelic Groove
   Nav toggle, reduced-motion, scroll reveals
   ========================================================================== */

(function () {
  'use strict';

  /* ── Mobile nav toggle ─────────────────────────────────────────────────────── */
  var toggle = document.querySelector('.nav-toggle');
  var menu   = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.setAttribute('aria-controls', 'nav-menu');

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      menu.setAttribute('aria-hidden', String(!isOpen));
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        toggle.focus();
      }
    });
  }

  /* ── Reduced motion ─────────────────────────────────────────────────────────── */
  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    document.documentElement.classList.add('reduced-motion');
  }

  /* ── Scroll reveal (IntersectionObserver) ──────────────────────────────────── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealSelector = '.feature-card, .feature-detail, .client-card, .download-card, .faq-item';
    var revealEls = document.querySelectorAll(revealSelector);

    if (revealEls.length > 0) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
      );

      revealEls.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
      });

      // Add revealed state style
      var style = document.createElement('style');
      style.textContent = [
        '.is-revealed { opacity: 1 !important; transform: translateY(0) !important; }',
        '@media (prefers-reduced-motion: reduce) { .is-revealed { opacity: 1 !important; transform: none !important; transition: none !important; } }'
      ].join('\n');
      document.head.appendChild(style);
    }
  }

})();
