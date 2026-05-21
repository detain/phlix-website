/**
 * js/main.js — CRT Terminal interactions
 * Mobile nav toggle, terminal effects, scan animations
 */

(function () {
  'use strict';

  // ─── Mobile nav toggle ────────────────────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });

    // Focus trap for mobile nav
    const navLinks = navMenu.querySelectorAll('a');
    if (navLinks.length > 0) {
      navMenu.addEventListener('keydown', function (e) {
        if (e.key !== 'Tab') return;
        if (!navMenu.classList.contains('is-open')) return;

        const firstLink = navLinks[0];
        const lastLink = navLinks[navLinks.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstLink) {
            e.preventDefault();
            lastLink.focus();
          }
        } else {
          if (document.activeElement === lastLink) {
            e.preventDefault();
            firstLink.focus();
          }
        }
      });
    }
  }

  // ─── Scroll reveal animations ─────────────────────────────────────────────
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll('.feature-card, .client-card, .feature-detail, .download-card, .faq-item')
    .forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      el.style.transition =
        'opacity 0.4s ease, transform 0.4s ease, border-color 0.2s ease, box-shadow 0.2s ease';
      revealObserver.observe(el);
    });

  // Add revealed class styles
  const style = document.createElement('style');
  style.textContent = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // ─── Smooth scroll for anchor links ───────────────────────────────────────
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

  // ─── Active nav highlighting on scroll ───────────────────────────────────
  const sections = document.querySelectorAll('section[id], article[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(function (link) {
              link.removeAttribute('aria-current');
              if (link.getAttribute('href') === '#' + id) {
                link.setAttribute('aria-current', 'page');
              }
            });
          }
        });
      },
      { threshold: 0.3 },
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  // ─── Terminal typing effect ──────────────────────────────────────────────
  const typingElements = document.querySelectorAll('.terminal-type');
  typingElements.forEach(function (el) {
    const text = el.textContent;
    el.textContent = '';
    el.style.visibility = 'visible';

    let i = 0;
    const typeInterval = setInterval(function () {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 30);
  });

  // ─── Reduce motion check ─────────────────────────────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Disable complex animations
    document.documentElement.style.setProperty('--transition-base', '0.01ms');
  }
})();
