/* ==========================================================================
   main.js — Pixel Dungeon brand kit site
   Nav toggle, reduced-motion, scroll reveals
   ========================================================================== */

(function () {
  'use strict';

  /* ── Mobile nav toggle ── */
  var toggle = document.querySelector('.nav-toggle');
  var menu   = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
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
      if (e.key === 'Escape') {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ── Reduced motion ── */
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── Scroll reveals (feature cards, etc.) ── */
  if (!prefersReduced.matches && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.feature-card, .client-card, .download-card');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 300ms steps(4), transform 300ms steps(4)';
      observer.observe(el);
    });
  }

  /* ── Blip hero animation — stop if reduced motion ── */
  if (prefersReduced.matches) {
    var blip = document.querySelector('.hero__blip');
    if (blip) {
      blip.style.animation = 'none';
    }
  }
})();
