/**
 * main.js — Dyson Sphere Brand Kit
 * Mobile nav toggle, reduced motion, scroll reveals
 */

(function() {
  'use strict';

  // =====================================================================
  // REDUCED MOTION CHECK
  // =====================================================================

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =====================================================================
  // MOBILE NAV TOGGLE
  // =====================================================================

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen.toString());
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close on nav link click (accessibility)
    navMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // =====================================================================
  // SCROLL REVEALS
  // =====================================================================

  if (!prefersReducedMotion) {
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      revealElements.forEach(function(el) {
        revealObserver.observe(el);
      });
    }
  } else {
    // If reduced motion, show everything immediately
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function(el) {
      el.classList.add('visible');
    });
  }

  // =====================================================================
  // STELLAR BACKGROUND PARTICLES (Hero only)
  // =====================================================================

  function createStellarParticles() {
    const hero = document.querySelector('.hero');
    if (!hero || prefersReducedMotion) return;

    const particleCount = 30;
    const particleContainer = document.createElement('div');
    particleContainer.className = 'stellar-particles';
    particleContainer.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;';
    hero.insertBefore(particleContainer, hero.firstChild);

    const colors = ['#FFB800', '#FF6B00', '#FF4500', '#8B0000'];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.cssText = [
        'position: absolute',
        `width: ${size}px`,
        `height: ${size}px`,
        `background: ${color}`,
        `border-radius: 50%`,
        `left: ${Math.random() * 100}%`,
        `top: ${Math.random() * 100}%`,
        `opacity: ${Math.random() * 0.5 + 0.2}`,
        `animation: stellarDrift ${Math.random() * 10 + 10}s ease-in-out infinite`,
        `animation-delay: ${Math.random() * 5}s`
      ].join(';');

      particleContainer.appendChild(particle);
    }

    // Add keyframe dynamically if not present
    if (!document.querySelector('#stellar-drift-keyframes')) {
      const style = document.createElement('style');
      style.id = 'stellar-drift-keyframes';
      style.textContent = `
        @keyframes stellarDrift {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(${Math.random() * 10 - 5}px, ${Math.random() * -15 + 5}px); }
          50% { transform: translate(${Math.random() * 10 - 5}px, ${Math.random() * -10 + 3}px); }
          75% { transform: translate(${Math.random() * -10 + 5}px, ${Math.random() * -15 + 5}px); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  createStellarParticles();

  // =====================================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // =====================================================================

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    });
  });

  // =====================================================================
  // ACTIVE NAV LINK
  // =====================================================================

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html') || (currentPage === 'index.html' && href === './')) {
      link.setAttribute('aria-current', 'page');
    }
  });

})();
