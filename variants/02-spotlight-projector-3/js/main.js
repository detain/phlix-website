/*!
 * main.js — Mobile nav toggle with focus trap, smooth scroll, accordion behavior
 * Variant: 02-spotlight-projector-3
 */

(function () {
  'use strict';

  // ─── Mobile nav toggle ────────────────────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));

      if (isOpen) {
        navMenu.querySelector('a')?.focus();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });

    // Focus trap within mobile nav
    navMenu.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      const focusableElements = navMenu.querySelectorAll('a, button');
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
  }

  // ─── Smooth scroll for anchor links ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });
      }
    });
  });

  // ─── FAQ accordion ─────────────────────────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const dt = item.querySelector('dt');
    const dd = item.querySelector('dd');

    if (dt && dd) {
      dt.setAttribute('role', 'button');
      dt.setAttribute('tabindex', '0');
      dt.setAttribute('aria-expanded', 'false');

      dt.addEventListener('click', function () {
        toggleFaq(item);
      });

      dt.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFaq(item);
        }
      });
    }
  });

  function toggleFaq(item) {
    const dt = item.querySelector('dt');
    const dd = item.querySelector('dd');
    const isExpanded = dt.getAttribute('aria-expanded') === 'true';

    // Close all other items
    faqItems.forEach(function (otherItem) {
      if (otherItem !== item) {
        otherItem.querySelector('dt')?.setAttribute('aria-expanded', 'false');
        otherItem.querySelector('dd')?.setAttribute('hidden', '');
      }
    });

    // Toggle current item
    dt.setAttribute('aria-expanded', String(!isExpanded));
    if (!isExpanded) {
      dd.removeAttribute('hidden');
    } else {
      dd.setAttribute('hidden', '');
    }
  }

  // ─── Initialize FAQ state ───────────────────────────────────────────────────
  faqItems.forEach(function (item) {
    const dd = item.querySelector('dd');
    if (dd) {
      dd.setAttribute('hidden', '');
    }
  });

})();
