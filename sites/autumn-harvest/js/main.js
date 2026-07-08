/**
 * Phlix brand kit configuration.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

/* ==========================================================================
   main.js — Autumn Harvest Site Interactions
   Kit: autumn-harvest v1.0
   ========================================================================== */

(function () {
  'use strict';

  /* ─── Reduced motion detection ────────────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ─── Mobile nav toggle ───────────────────────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.setAttribute('aria-expanded', 'false');

    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));

      /* Toggle icon */
      const icon = navToggle.querySelector('svg');
      if (icon) {
        if (isOpen) {
          icon.innerHTML = '<path d="M18 6L6 18M6 6l12 12"/>';
        } else {
          icon.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"/>';
        }
      }
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        const icon = navToggle.querySelector('svg');
        if (icon) {
          icon.innerHTML = '<path d="M3 12h18M3 6h18M3 18h18"/>';
        }
      }
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ─── Leaf drift animation (hero) ─────────────────────────────────────────── */
  function createLeaf() {
    if (prefersReducedMotion) return;

    const leaf = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    leaf.setAttribute('class', 'hero-leaf');
    leaf.setAttribute('viewBox', '0 0 24 24');
    leaf.setAttribute('fill', 'none');
    leaf.setAttribute('stroke', 'currentColor');
    leaf.setAttribute('stroke-width', '1.5');

    const colors = ['#C8901A', '#B5321A', '#D4601A'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    leaf.innerHTML = `<path d="M12 2C8 2 5 5 5 9c0 3 2 6 4.5 8 .5.5 1.5 1 2.5 1.5V22h3v-3.5c1-.5 2-1 2.5-1.5C17 15 19 12 19 9c0-4-3-7-7-7z" fill="${color}" stroke="${color}" opacity="0.8"/>`;
    leaf.style.left = Math.random() * 100 + '%';
    leaf.style.animationDuration = (8000 + Math.random() * 4000) + 'ms';
    leaf.style.animationDelay = Math.random() * 5000 + 'ms';
    leaf.style.color = color;

    return leaf;
  }

  const hero = document.querySelector('.hero');
  if (hero && !prefersReducedMotion) {
    for (let i = 0; i < 6; i++) {
      const leaf = createLeaf();
      if (leaf) hero.appendChild(leaf);
    }
  }

  /* ─── Scroll reveal (optional) ─────────────────────────────────────────────── */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .faq-item'
    );

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition =
        'opacity 500ms ease-out, transform 500ms ease-out';
      observer.observe(el);
    });
  }

  /* ─── Active nav link ─────────────────────────────────────────────────────── */
  const navLinks = document.querySelectorAll('.nav-menu a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();
