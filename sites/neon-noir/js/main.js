/**
 * main.js — Neon Noir shell behaviour.
 *
 * Mobile nav toggle, the cinematic section "cut" (scroll_experience), and the
 * reduced-motion gate. Vanilla, dependency-free, defer-loaded.
 *
 * The nav works with this file absent: the <nav> is a plain list and every
 * link is a real href, so JS only adds the small-screen disclosure.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  root.setAttribute('data-js', 'on');

  /* ── Mobile nav disclosure ─────────────────────────────────────────────── */

  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');

  if (toggle && menu) {
    var setOpen = function (open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    toggle.addEventListener('click', function () {
      setOpen(!menu.classList.contains('is-open'));
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!menu.classList.contains('is-open')) return;
      if (menu.contains(e.target) || toggle.contains(e.target)) return;
      setOpen(false);
    });
  }

  /* ── scroll_experience: cinematic cut ──────────────────────────────────── */

  function armCuts() {
    var groups = document.querySelectorAll('.cut, [data-wipe]');
    if (!groups.length) return;

    var quiet = reduce.matches || root.getAttribute('data-intensity') === 'calm';
    if (quiet || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var wipe = entry.target.hasAttribute('data-wipe');
          entry.target.classList.remove(wipe ? 'will-wipe' : 'will-cut');
          entry.target.classList.add(wipe ? 'is-wiped' : 'is-cut');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    );

    var fold = window.innerHeight * 0.92;
    groups.forEach(function (el) {
      // Anything already on screen stays exactly as the browser painted it.
      if (el.getBoundingClientRect().top < fold) return;
      el.classList.add(el.hasAttribute('data-wipe') ? 'will-wipe' : 'will-cut');
      observer.observe(el);
    });
  }

  // Calm mode can be switched on later; release anything still armed.
  window.addEventListener('phlix:calm', function () {
    document.querySelectorAll('.will-cut, .will-wipe').forEach(function (el) {
      el.classList.remove('will-cut');
      el.classList.remove('will-wipe');
    });
  });

  armCuts();
})();
