/**
 * js/main.js — Portal Hub V2 (Glassmorphism Focus) interactions
 * Mobile nav toggle, portal grid animation, glassmorphism depth effects
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

  // ─── Portal grid parallax (hero) ──────────────────────────────────────────
  const portalGrid = document.querySelector('.portal-grid');
  if (portalGrid && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.addEventListener('mousemove', function (e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      portalGrid.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });

    document.addEventListener('mouseleave', function () {
      portalGrid.style.transform = 'perspective(600px) rotateX(0) rotateY(0)';
    });
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
    .querySelectorAll('.feature-card, .client-card, .feature-detail, .download-card')
    .forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition =
        'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      revealObserver.observe(el);
    });

  // Add revealed class styles
  var style = document.createElement('style');
  style.textContent = [
    '.revealed {',
    '  opacity: 1 !important;',
    '  transform: translateY(0) !important;',
    '}',
  ].join('\n');
  document.head.appendChild(style);

  // ─── Smooth scroll for anchor links ───────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Active nav highlighting on scroll ────────────────────────────────────
  var sections = document.querySelectorAll('section[id], article[id]');
  var navLinks = document.querySelectorAll('.nav-menu a');

  if (sections.length && navLinks.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
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

  // ─── Glassmorphism depth effect on mouse move ───────────────────────────────
  var depthElements = document.querySelectorAll('.glass-card, .feature-card, .client-card');
  if (depthElements.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.addEventListener('mousemove', function (e) {
      depthElements.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;

        var tiltX = y * 5;
        var tiltY = -x * 5;

        el.style.transform =
          'perspective(1000px) rotateX(' +
          tiltX +
          'deg) rotateY(' +
          tiltY +
          'deg) translateZ(10px)';
      });
    });

    document.addEventListener('mouseleave', function () {
      depthElements.forEach(function (el) {
        el.style.transform = '';
      });
    });
  }

  // ─── Reduce motion check ─────────────────────────────────────────────────
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Disable parallax and complex animations
    document.documentElement.style.setProperty('--transition-base', '0.01ms');
    document.documentElement.style.setProperty('--transition-glass', '0.01ms');
  }
})();
