/**
 * main.js — Día de Muertos brand kit
 * Mobile nav toggle, reduced-motion, scroll reveals
 */

(function () {
  'use strict';

  /* ─── Mobile nav toggle ─────────────────────────────────────────────── */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open', !expanded);
      if (!expanded) {
        // Focus first menu item when opening
        var firstLink = menu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        toggle.focus();
      }
    });
  }

  /* ─── Scroll reveals ────────────────────────────────────────────────── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -60px 0px', threshold: 0.08 },
      );
      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    }
  } else if (!prefersReducedMotion) {
    // Fallback: just show everything
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }
})();
