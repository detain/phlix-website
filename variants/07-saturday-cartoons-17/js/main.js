/* ============================================================
   MAIN.JS — Saturday Cartoons V17 (Toon Studio)
   Navigation toggle, animations, and interactions
   ============================================================ */

(function () {
  'use strict';

  // ── Mobile Navigation Toggle ──
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // ── Scroll animations for cards ──
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1,
  };

  const animateOnScroll = function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-bounce-in');
        observer.unobserve(entry.target);
      }
    });
  };

  const scrollObserver = new IntersectionObserver(animateOnScroll, observerOptions);

  // Observe feature cards, client cards, download cards
  const animatedElements = document.querySelectorAll(
    '.feature-card, .client-card, .download-card, .plugin-card, .hub-card',
  );

  animatedElements.forEach(function (el, index) {
    el.style.opacity = '0';
    el.style.animationDelay = index * 50 + 'ms';
    scrollObserver.observe(el);
  });

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Respect reduced motion preference ──
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion.matches) {
    // Remove animation classes and styles
    document.querySelectorAll('.animate-bounce-in, .animate-wiggle').forEach(function (el) {
      el.style.opacity = '1';
      el.style.animation = 'none';
    });
  }

  // ── Add keyboard focus visible class ──
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-nav');
  });
})();
