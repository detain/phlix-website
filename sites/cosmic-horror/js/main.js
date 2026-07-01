/**
 * js/main.js — Cosmic Horror Brand Kit
 * Mobile nav toggle, reduced-motion guard, scroll reveal animations.
 */

(function () {
  'use strict';

  /* ─── Reduced motion preference ──────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ─── Mobile nav toggle ───────────────────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    let focusGuard = null;
    let previouslyFocused = null;

    function openMenu() {
      navMenu.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      previouslyFocused = document.activeElement;
      focusGuard = document.createElement('span');
      focusGuard.setAttribute('tabindex', '0');
      focusGuard.setAttribute('aria-hidden', 'true');
      focusGuard.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
      document.body.appendChild(focusGuard);
      focusGuard.focus();
      document.addEventListener('keydown', handleMenuKeydown);
      document.addEventListener('click', handleOutsideClick);
    }

    function closeMenu() {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', handleMenuKeydown);
      document.removeEventListener('click', handleOutsideClick);
      if (focusGuard) {
        focusGuard.remove();
        focusGuard = null;
      }
      if (previouslyFocused) {
        previouslyFocused.focus();
        previouslyFocused = null;
      }
    }

    function toggleMenu() {
      const isOpen = navMenu.classList.contains('is-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    function handleMenuKeydown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        navToggle.focus();
      }
      if (e.key === 'Tab' && focusGuard) {
        const menuLinks = navMenu.querySelectorAll('a, button');
        const first = menuLinks[0];
        const last = menuLinks[menuLinks.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          focusGuard.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          focusGuard.focus();
        }
      }
    }

    function handleOutsideClick(e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeMenu();
      }
    }

    navToggle.addEventListener('click', toggleMenu);

    navToggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  /* ─── Scroll reveal (IntersectionObserver) ──────────────────────────── */
  if (!prefersReducedMotion.matches) {
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && revealEls.length > 0) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -40px 0px',
          threshold: 0.1,
        },
      );

      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      /* Feature-detect failed or observer unavailable — make all visible */
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  }

  /* ─── Header scroll behaviour (sticky shadow) ────────────────────────── */
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    let ticking = false;
    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            if (window.scrollY > 10) {
              siteHeader.style.boxShadow = '0 4px 20px rgba(0,0,0,0.9)';
            } else {
              siteHeader.style.boxShadow = 'none';
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true },
    );
  }
})();
