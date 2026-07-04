/**
 * Editorial Underground — main.js
 * Mobile nav toggle, reduced-motion, focus management.
 * Hard cuts only. No easing. No exceptions.
 */
(function () {
  'use strict';

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!navToggle || !navMenu) return;

  // Mobile nav toggle
  navToggle.addEventListener('click', function () {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navMenu.classList.toggle('is-open', !isOpen);

    if (!isOpen) {
      const firstLink = navMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
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

  // Focus trap in open menu
  navMenu.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    const links = Array.from(navMenu.querySelectorAll('a'));
    const first = links[0];
    const last = links[links.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Reduced motion
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    document.documentElement.classList.add('reduced-motion');
  }
})();
