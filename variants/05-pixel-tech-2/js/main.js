/* ============================================================
   variants/05-pixel-tech-2/js/main.js
   Arcade Cabinet interactions: pixel transitions, screen effects,
   mobile nav, joystick-inspired animations
   No frameworks - vanilla JS only
   ============================================================ */

(function() {
  'use strict';

  // ─── Mobile Navigation ───
  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function() {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen.toString());

      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';

      // Add visual feedback
      if (isOpen) {
        menu.style.boxShadow = 'inset 0 0 100px rgba(0, 255, 65, 0.1)';
      } else {
        menu.style.boxShadow = 'none';
      }
    });

    // Close menu on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });

    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Arcade Display Animation ───
  function initArcadeDisplay() {
    const displays = document.querySelectorAll('.arcade-display');

    if (!displays.length) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    displays.forEach(function(display) {
      // Random flicker effect
      function flicker() {
        const randomDelay = 3000 + Math.random() * 10000;
        setTimeout(function() {
          display.style.opacity = '0.8';
          setTimeout(function() {
            display.style.opacity = '1';
            flicker();
          }, 50 + Math.random() * 100);
        }, randomDelay);
      }

      setTimeout(flicker, 2000);
    });
  }

  // ─── Score Counter Animation ───
  function initScoreCounters() {
    const counters = document.querySelectorAll('.score-counter');

    if (!counters.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    counters.forEach(function(counter) {
      const target = parseInt(counter.getAttribute('data-score') || '0', 10);
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for arcade feel
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * eased);

        counter.textContent = current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      // Start animation when element is in view
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            requestAnimationFrame(updateCounter);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(counter);
    });
  }

  // ─── Pixel Reveal on Scroll ───
  function initScrollAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const animatedElements = document.querySelectorAll(
      '.feature-card, .client-card, .download-card, .faq-item, .hub-section'
    );

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('pixel-reveal');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function(el, index) {
      el.style.animationDelay = (index * 0.08) + 's';
      observer.observe(el);
    });
  }

  // ─── Button Press Effect ───
  function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(function(btn) {
      btn.addEventListener('mousedown', function() {
        this.classList.add('is-pressed');
      });

      btn.addEventListener('mouseup', function() {
        this.classList.remove('is-pressed');
      });

      btn.addEventListener('mouseleave', function() {
        this.classList.remove('is-pressed');
      });
    });
  }

  // ─── Active Navigation State ───
  function initActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(function(link) {
      const href = link.getAttribute('href');

      // Check if current page matches
      if (currentPath === href ||
          currentPath.endsWith(href) ||
          (href === './' && (currentPath === '/' || currentPath === '')) ||
          (href === 'index.html' && (currentPath === '/' || currentPath === ''))) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // ─── Keyboard Navigation Enhancement ───
  function initKeyboardNav() {
    // Add focus-visible class management
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', function() {
      document.body.classList.remove('keyboard-nav');
    });
  }

  // ─── Smooth Scroll for Anchor Links ───
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      });
    });
  }

  // ─── CRT Screen Effect ───
  function initCRTEffect() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Subtle random screen flicker
    const body = document.body;
    let flickerTimeout;

    function scheduleFlicker() {
      const delay = 5000 + Math.random() * 15000;
      flickerTimeout = setTimeout(function() {
        body.style.opacity = '0.97';
        setTimeout(function() {
          body.style.opacity = '1';
          scheduleFlicker();
        }, 30 + Math.random() * 50);
      }, delay);
    }

    setTimeout(scheduleFlicker, 3000);
  }

  // ─── Initialize All ───
  function init() {
    initMobileNav();
    initArcadeDisplay();
    initScoreCounters();
    initScrollAnimations();
    initButtonEffects();
    initActiveNav();
    initKeyboardNav();
    initSmoothScroll();
    initCRTEffect();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
