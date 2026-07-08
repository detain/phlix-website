/**
 * main.js — Desert Horizon
 * Mobile nav toggle, reduced-motion, scroll reveals
 * Vanilla, dependency-free, defer-loaded
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function () {
  'use strict';

  /* ── Mobile Nav Toggle ─────────────────────────────────────────────────── */

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navBackdrop = document.querySelector('.nav-backdrop');

  function openNav() {
    navMenu.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    if (navBackdrop) navBackdrop.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
    trapFocus(navMenu);
  }

  function closeNav() {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    if (navBackdrop) navBackdrop.classList.remove('is-visible');
    document.body.style.overflow = '';
    navToggle.focus();
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.contains('is-open');
      isOpen ? closeNav() : openNav();
    });

    // Close on backdrop click
    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeNav);
    }

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        closeNav();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        closeNav();
      }
    });
  }

  /* ── Focus Trap (mobile nav) ──────────────────────────────────────────── */

  function trapFocus(el) {
    const focusable = el.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleTab(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    el.addEventListener('keydown', handleTab);
    if (first) first.focus();
  }

  /* ── Scroll Reveals (IntersectionObserver) ────────────────────────────── */

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      );
      reveals.forEach(function (el) {
        observer.observe(el);
      });
    }
  } else {
    // Fallback: show all reveals immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
