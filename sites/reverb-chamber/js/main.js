/**
 * main.js — Reverb Chamber Theme
 * Sound wave sound wave sound wave sound wave
 * @copyright 2026 Joe Huss <detain@interserver.net>
 */

(function() {
  'use strict';

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('reduce-motion', prefersReducedMotion.matches);
  }

  prefersReducedMotion.addEventListener('change', handleReducedMotion);
  handleReducedMotion();

  // Scroll reveal with Intersection Observer
  if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.feature-card, .client-card, .download-card, .feature-detail');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el, index) => {
      el.style.transitionDelay = `${index * 50}ms`;
      revealObserver.observe(el);
    });
  } else {
    // Show all elements immediately if no animation
    document.querySelectorAll('.feature-card, .client-card, .download-card, .feature-detail').forEach(el => {
      el.classList.add('revealed');
    });
  }

  // Sound wave animation enhancement
  const soundWaves = document.querySelectorAll('.sound-wave');
  soundWaves.forEach(wave => {
    wave.setAttribute('aria-hidden', 'true');
  });

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html') || (currentPage === 'index.html' && href === './')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // Logo click easter egg - sound wave animation burst
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    let clickCount = 0;
    let clickTimer = null;

    logo.addEventListener('click', (e) => {
      // Only trigger if not navigating (middle/ctrl click)
      if (e.defaultPrevented) return;

      clickCount++;

      if (clickTimer) clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        if (clickCount >= 5) {
          triggerSoundWaveBurst();
        }
        clickCount = 0;
      }, 500);
    });
  }

  function triggerSoundWaveBurst() {
    // Create burst animation on page
    const burst = document.createElement('div');
    burst.className = 'sound-wave-burst';
    burst.innerHTML = `
      <div class="burst-ring"></div>
      <div class="burst-ring"></div>
      <div class="burst-ring"></div>
      <style>
        .sound-wave-burst {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9999;
        }
        .burst-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          border: 2px solid var(--color-cyan);
          border-radius: 50%;
          animation: burst-expand 1s ease-out forwards;
          opacity: 0;
        }
        .burst-ring:nth-child(2) { animation-delay: 0.15s; }
        .burst-ring:nth-child(3) { animation-delay: 0.3s; }
        @keyframes burst-expand {
          0% { width: 20px; height: 20px; opacity: 1; }
          100% { width: 400px; height: 400px; opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .burst-ring { animation: none; opacity: 0; }
        }
      </style>
    `;
    document.body.appendChild(burst);

    setTimeout(() => burst.remove(), 1500);
  }
})();
