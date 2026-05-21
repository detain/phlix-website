/* main.js — Terminal typing animation, cursor blink, mobile nav */
(function () {
  'use strict';

  /* ===== TERMINAL TYPING ANIMATION ===== */
  function initTerminalTyping() {
    const heroPrompt = document.querySelector('.hero-prompt');
    if (!heroPrompt) return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const text = heroPrompt.dataset.text || heroPrompt.textContent.replace(/\u00A0/g, ' ').trim();
    heroPrompt.innerHTML = '';
    heroPrompt.setAttribute('data-text', text);

    let charIndex = 0;
    const cursor = document.createElement('span');
    cursor.className = 'cursor';

    function typeChar() {
      if (charIndex < text.length) {
        heroPrompt.textContent = text.substring(0, charIndex + 1);
        heroPrompt.appendChild(cursor);
        charIndex++;
        setTimeout(typeChar, 50 + Math.random() * 50);
      } else {
        // Once typing is done, let cursor blink
        heroPrompt.appendChild(cursor);
      }
    }

    // Start after a short delay
    setTimeout(typeChar, 500);
  }

  /* ===== MOBILE NAV ===== */
  function initMobileNav() {
    const toggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.mobile-nav-close');

    if (!toggle || !nav) return;

    function openNav() {
      nav.classList.add('open');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function closeNav() {
      nav.classList.remove('open');
      document.body.style.overflow = '';
      toggle.focus();
    }

    toggle.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeNav();
      }
    });

    // Focus trap: keep Tab/Shift+Tab within the open nav
    nav.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      const focusable = nav.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

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

    // Close when clicking a link
    const mobileLinks = nav.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  /* ===== STAGGERED ENTRANCE ANIMATION ===== */
  function initStaggeredEntrance() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Just show everything immediately
      document.querySelectorAll('.feature-card, .client-card, .pitch-item').forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const cards = document.querySelectorAll('.feature-card, .client-card, .pitch-item');
    cards.forEach(function (card, index) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.transitionDelay = index * 0.08 + 's';
    });

    // Trigger animations on scroll
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    cards.forEach(function (card) {
      observer.observe(card);
    });
  }

  /* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
  function initSmoothScroll() {
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
  }

  /* ===== INIT ===== */
  document.addEventListener('DOMContentLoaded', function () {
    initTerminalTyping();
    initMobileNav();
    initStaggeredEntrance();
    initSmoothScroll();
  });
})();
