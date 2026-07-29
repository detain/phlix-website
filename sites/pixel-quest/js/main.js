/* main.js — Pixel Quest Brand Kit
 * @copyright 2026 Phlix
 * Mobile nav toggle, reduced motion, scroll reveals
 */

(function () {
  'use strict';

  /* ============================================================
     1. REDUCED MOTION CHECK
     ============================================================ */
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* ============================================================
     2. MOBILE NAV TOGGLE
     ============================================================ */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu   = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    // Open/close on toggle button click
    navToggle.addEventListener('click', function () {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open', !isOpen);

      // Lock body scroll when menu is open
      document.body.style.overflow = isOpen ? '' : 'hidden';

      // Focus first menu item when opening
      if (!isOpen) {
        const firstLink = navMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        navToggle.getAttribute('aria-expanded') === 'true' &&
        !navToggle.contains(e.target) &&
        !navMenu.contains(e.target)
      ) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    // Trap focus inside open menu
    navMenu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      const focusable = Array.from(navMenu.querySelectorAll('a'));
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

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
    });
  }

  /* ============================================================
     3. SCROLL REVEAL ANIMATIONS
     ============================================================ */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const animateOnScroll = function () {
      const targets = document.querySelectorAll(
        '.animate-on-scroll, .stagger-children'
      );
      if (!targets.length) return;

      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      targets.forEach(function (el) {
        observer.observe(el);
      });
    };

    // Run after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', animateOnScroll);
    } else {
      animateOnScroll();
    }
  } else {
    // Fallback: show everything immediately if no IntersectionObserver
    document.querySelectorAll('.animate-on-scroll, .stagger-children').forEach(
      function (el) {
        el.classList.add('is-visible');
      }
    );
  }

  /* ============================================================
     4. CODE BLOCK COPY BUTTON
     ============================================================ */
  document.querySelectorAll('.code-block__copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const codeBody = btn.closest('.code-block').querySelector('code, pre');
      if (!codeBody) return;

      const text = codeBody.textContent || '';
      navigator.clipboard.writeText(text).then(
        function () {
          const original = btn.textContent;
          btn.textContent = 'COPIED!';
          btn.style.background = 'var(--color-green)';
          btn.style.color = 'var(--color-black)';
          setTimeout(function () {
            btn.textContent = original;
            btn.style.background = '';
            btn.style.color = '';
          }, 2000);
        },
        function () {
          btn.textContent = 'ERROR';
          setTimeout(function () {
            btn.textContent = 'COPY';
          }, 2000);
        }
      );
    });
  });

  /* ============================================================
     5. SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

  /* ============================================================
     6. NAV: CLOSE ON RESIZE TO DESKTOP
     ============================================================ */
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    }, 200);
  });

})();
