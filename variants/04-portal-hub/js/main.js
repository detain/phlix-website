/**
 * js/main.js — Portal Hub interactions
 * Mobile nav toggle, portal ring animation, glassmorphism effects
 */

(function() {
  'use strict';

  // ─── Mobile nav toggle ────────────────────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  // ─── Portal ring animation (hero) ─────────────────────────────────────────
  const portalRing = document.querySelector('.portal-ring');
  if (portalRing && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Add subtle parallax on mouse move
    document.addEventListener('mousemove', function(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      portalRing.style.transform = `perspective(500px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', function() {
      portalRing.style.transform = 'perspective(500px) rotateX(0) rotateY(0)';
    });
  }

  // ─── Scroll reveal animations ─────────────────────────────────────────────
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .client-card, .feature-detail, .download-card').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
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
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Active nav highlighting on scroll ────────────────────────────────────
  const sections = document.querySelectorAll('section[id], article[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(function(link) {
            link.removeAttribute('aria-current');
            if (link.getAttribute('href') === '#' + id) {
              link.setAttribute('aria-current', 'page');
            }
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(function(section) {
      sectionObserver.observe(section);
    });
  }

  // ─── Focus trap for modal-like elements (if any) ──────────────────────────
  // Placeholder for future modal implementation

  // ─── Reduce motion check ─────────────────────────────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Disable parallax and complex animations
    document.documentElement.style.setProperty('--transition-base', '0.01ms');
  }

})();
