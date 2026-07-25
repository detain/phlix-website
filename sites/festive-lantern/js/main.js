/**
 * Phlix brand kit configuration.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

/* ==========================================================================
   main.js — Festive Lantern interactive behaviors
   ========================================================================== */

(function () {
  'use strict';

  /* ─── Mobile nav toggle ─────────────────────────────────────────────────── */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open', !expanded);
    });

    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('open');
        toggle.focus();
      }
    });
  }

  /* ─── Reduced motion ─────────────────────────────────────────────────────── */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Scroll reveals (lantern-float fade-in) ─────────────────────────────── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    document
      .querySelectorAll('.feature-card, .client-card, .download-card, .faq-item')
      .forEach(function (el) {
        el.classList.add('scroll-reveal');
        revealObserver.observe(el);
      });
  } else {
    document.querySelectorAll('.scroll-reveal').forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  /* ─── Scroll reveal animation (add to theme.css if used) ──────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    '.scroll-reveal { opacity: 0; transform: translateY(16px); transition: opacity 400ms ease-out, transform 400ms ease-out; }',
    '.scroll-reveal.revealed { opacity: 1; transform: translateY(0); }',
    '@media (prefers-reduced-motion: reduce) { .scroll-reveal { opacity: 1; transform: none; transition: none; } }',
  ].join('\n');
  document.head.appendChild(style);
})();
