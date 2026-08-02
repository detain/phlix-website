/* ==========================================================================
   MAIN.JS — Vinyl Vault
   Vanilla JS: mobile nav, reduced motion, scroll reveals
   @copyright 2026 Joe Huss <detain@interserver.net>
   ========================================================================== */

(function () {
  'use strict';

  // ─── Mobile Navigation ────────────────────────────────────────────────────

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  // ─── Reduced Motion ──────────────────────────────────────────────────────

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reducedMotion = prefersReducedMotion.matches;

  prefersReducedMotion.addEventListener('change', (e) => {
    reducedMotion = e.matches;
  });

  // ─── Scroll Reveals ──────────────────────────────────────────────────────

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .feature-detail',
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    revealElements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      revealObserver.observe(el);
    });
  }

  // ─── Active Nav Link ────────────────────────────────────────────────────

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (
      href === currentPath ||
      (currentPath === 'index.html' && href === './') ||
      (currentPath === '' && href === './')
    ) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();
