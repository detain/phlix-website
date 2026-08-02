/**
 * Havoc Brand Kit — Main JavaScript
 * Vanilla, dependency-free
 */

(function () {
  'use strict';

  /* ============================================================
   * MOBILE NAV TOGGLE
   * ============================================================ */

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
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
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

  /* ============================================================
   * REDUCED MOTION
   * ============================================================ */

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
   * SCROLL REVEAL (Intersection Observer)
   * ============================================================ */

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll(
      '.feature-card, .client-card, .feature-detail, .ecosystem-card',
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    );

    revealElements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      revealObserver.observe(el);
    });
  }

  /* ============================================================
   * GLITCH TEXT EFFECT (decorative)
   * ============================================================ */

  const glitchElements = document.querySelectorAll('.glitch-text');

  if (!prefersReducedMotion && glitchElements.length > 0) {
    glitchElements.forEach((el) => {
      el.setAttribute('data-text', el.textContent);
    });
  }

  /* ============================================================
   * BUTTON IMPACT EFFECT
   * ============================================================ */

  const buttons = document.querySelectorAll('.btn');

  buttons.forEach((btn) => {
    if (prefersReducedMotion) return;

    btn.addEventListener('mousedown', () => {
      btn.style.transform = 'scale(0.95) translateY(0)';
    });

    btn.addEventListener('mouseup', () => {
      btn.style.transform = '';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ============================================================
   * EARTHQUAKE WOBBLE ON IMPACT
   * ============================================================ */

  const wobbleTargets = document.querySelectorAll('.cta-banner .btn-primary');

  if (!prefersReducedMotion && wobbleTargets.length > 0) {
    wobbleTargets.forEach((btn) => {
      btn.addEventListener('click', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
          hero.style.animation = 'none';
          hero.offsetHeight; // trigger reflow
          hero.style.animation = 'earthquake-wobble 0.3s ease-in-out';
        }
      });
    });
  }

  /* ============================================================
   * CARD HOVER PARTICLE BURST (CSS-driven via data attribute)
   * ============================================================ */

  const cards = document.querySelectorAll('.feature-card, .client-card');

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      if (!prefersReducedMotion) {
        card.setAttribute('data-hovered', 'true');
        setTimeout(() => {
          card.removeAttribute('data-hovered');
        }, 600);
      }
    });
  });

  /* ============================================================
   * KEYBOARD NAV ENHANCEMENT
   * ============================================================ */

  // Trap focus in mobile nav when open
  const navFocusableSelector =
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex="0"]';

  if (navMenu && navToggle) {
    navMenu.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      const focusableElements = navMenu.querySelectorAll(navFocusableSelector);
      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        navToggle.focus();
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
