/**
 * main.js — Mobile nav toggle with focus trap, smooth scroll, FAQ accordion
 * Variant: 01-minimalist-cinema-3 — Dark Mode
 * No frameworks - vanilla JS only
 */

(function () {
  'use strict';

  // ─── Mobile Navigation Toggle ────────────────────────────────────────────────────

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    let isOpen = false;
    const focusableSelectors =
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function openNav() {
      isOpen = true;
      navToggle.setAttribute('aria-expanded', 'true');
      navMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      // Focus first menu item
      const firstFocusable = navMenu.querySelector(focusableSelectors);
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }

    function closeNav() {
      isOpen = false;
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
      document.body.style.overflow = '';

      // Return focus to toggle
      navToggle.focus();
    }

    function toggleNav() {
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    }

    navToggle.addEventListener('click', toggleNav);

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeNav();
      }
    });

    // Focus trap within open menu
    navMenu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab' || !isOpen) return;

      const focusableElements = Array.from(navMenu.querySelectorAll(focusableSelectors));
      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    });

    // Close when clicking nav links on mobile
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (isOpen && window.innerWidth <= 768) {
          closeNav();
        }
      });
    });

    // Close on resize to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768 && isOpen) {
        closeNav();
      }
    });
  }

  // ─── Smooth Scroll for Anchor Links ─────────────────────────────────────────

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // Update focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  // ─── FAQ Accordion ──────────────────────────────────────────────────────────

  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length > 0) {
    faqItems.forEach(function (item) {
      const dt = item.querySelector('dt');
      const button = dt ? dt.querySelector('button') : null;
      const dd = item.querySelector('dd');

      if (button && dd) {
        // Set initial state
        dd.setAttribute('hidden', '');
        button.setAttribute('aria-expanded', 'false');

        button.addEventListener('click', function () {
          const isExpanded = button.getAttribute('aria-expanded') === 'true';

          // Close all other items
          faqItems.forEach(function (otherItem) {
            const otherDt = otherItem.querySelector('dt');
            const otherButton = otherDt ? otherDt.querySelector('button') : null;
            const otherDd = otherItem.querySelector('dd');
            if (otherButton && otherDd && otherItem !== item) {
              otherButton.setAttribute('aria-expanded', 'false');
              otherDd.setAttribute('hidden', '');
            }
          });

          // Toggle current
          if (isExpanded) {
            button.setAttribute('aria-expanded', 'false');
            dd.setAttribute('hidden', '');
          } else {
            button.setAttribute('aria-expanded', 'true');
            dd.removeAttribute('hidden');
          }
        });
      }
    });
  }

  // ─── Keyboard Navigation Enhancement ─────────────────────────────────────────

  // Ensure all interactive elements are properly focusable
  document
    .querySelectorAll('a, button, input, select, textarea, [tabindex]')
    .forEach(function (el) {
      if (!el.hasAttribute('tabindex') || el.getAttribute('tabindex') === '0') {
        // Already focusable
      }
    });
})();
