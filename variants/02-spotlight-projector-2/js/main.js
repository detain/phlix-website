/*!
 * main.js — Mobile nav toggle with focus trap, smooth scroll, accordion behavior
 * Variant: 02-spotlight-projector-2
 * Art Deco Elegance theme
 */

(function () {
  'use strict';

  // ─── Mobile nav toggle ────────────────────────────────────────────────────
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');

      if (isOpen) {
        mainNav.querySelector('a')?.focus();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation');
        menuToggle.focus();
      }
    });

    // Focus trap within mobile nav
    mainNav.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      const focusableElements = mainNav.querySelectorAll('a, button');
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
    const question = item.querySelector('.faq-question');

    if (question) {
      question.setAttribute('aria-expanded', 'false');
      question.setAttribute('aria-controls', 'faq-answer-' + Array.from(faqItems).indexOf(item));

      question.addEventListener('click', function () {
        toggleFaq(item);
      });

      question.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFaq(item);
        }
      });
    }
  });

  function toggleFaq(item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('is-open');

    // Toggle current item
    item.classList.toggle('is-open', !isOpen);
    question.setAttribute('aria-expanded', String(!isOpen));

    if (!isOpen) {
      answer.style.display = 'block';
    } else {
      answer.style.display = 'none';
    }
  }

  // ─── Initialize FAQ closed state ───────────────────────────────────────────
  faqItems.forEach(function (item) {
    const answer = item.querySelector('.faq-answer');
    if (answer) {
      answer.style.display = 'none';
    }
  });

  // ─── Intersection Observer for fade-in animations ─────────────────────────
  if ('IntersectionObserver' in window) {
    const fadeInElements = document.querySelectorAll('.feature-card, .client-card, .hub-feature, .plugin-step');

    const fadeInObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          fadeInObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeInElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      fadeInObserver.observe(el);
    });
  }

})();
