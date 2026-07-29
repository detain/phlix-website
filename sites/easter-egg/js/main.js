/**
 * @copyright 2026 Phlix — The 5 Pillars of Intentional UI: Hidden Surprises Edition
 *
 * Vanilla JS: mobile nav, reduced-motion, scroll reveals, easter eggs.
 */

(function () {
  'use strict';

  // ─── Reduced Motion Detection ───────────────────────────────────────────
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  // ─── Mobile Navigation Toggle ─────────────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));

      // Trap focus within menu when open
      if (isOpen) {
        const firstLink = navMenu.querySelector('a');
        firstLink?.focus();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (
        !navToggle.contains(e.target) &&
        !navMenu.contains(e.target) &&
        navMenu.classList.contains('is-open')
      ) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ─── Scroll Reveal (IntersectionObserver) ───────────────────────────────
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.feature-card, .client-card, .download-card, .faq-item, .ecosystem-item').forEach((el) => {
      el.classList.add('reveal-on-scroll');
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all elements immediately
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      el.classList.add('is-revealed');
    });
  }

  // ─── Easter Egg: Konami Code Reveal ─────────────────────────────────────
  // Hidden surprise for keen observers
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  function handleKonamiKey(e) {
    // Don't trigger when typing in inputs
    if (e.target.matches('input, textarea, [contenteditable="true"]')) return;

    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        triggerKonamiEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  }

  function triggerKonamiEasterEgg() {
    spawnConfetti();
    const badge = document.querySelector('.footer-tagline');
    if (badge) {
      badge.style.transform = 'scale(1.1)';
      badge.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      setTimeout(() => {
        badge.style.transform = 'scale(1)';
      }, 600);
    }
  }

  // ─── Confetti Burst ───────────────────────────────────────────────────────
  function spawnConfetti() {
    if (prefersReducedMotion) return;

    const colors = ['#FF69B4', '#98FB98', '#87CEEB', '#DDA0DD', '#FFF8DC'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.width = (5 + Math.random() * 10) + 'px';
      confetti.style.height = confetti.style.width;
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 4000);
    }
  }

  document.addEventListener('keydown', handleKonamiKey);

  // ─── Logo Click Easter Egg (5 clicks) ───────────────────────────────────
  const logoLink = document.querySelector('.nav-logo');
  let logoClickCount = 0;
  let logoClickTimer = null;

  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      // Don't interfere with normal navigation on regular clicks
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      logoClickCount++;

      if (logoClickTimer) clearTimeout(logoClickTimer);
      logoClickTimer = setTimeout(() => { logoClickCount = 0; }, 1000);

      if (logoClickCount >= 5) {
        logoClickCount = 0;
        spawnConfetti();
        const easterMsg = document.createElement('div');
        easterMsg.innerHTML = '🎉 You found a secret! Phlix loves easter eggs.';
        easterMsg.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--color-primary);color:var(--color-cornsilk);padding:16px 24px;border-radius:12px;font-weight:600;z-index:9999;box-shadow:var(--shadow-lg);animation:fadeInUp 0.3s ease';
        document.body.appendChild(easterMsg);
        setTimeout(() => {
          easterMsg.style.animation = 'fadeOutDown 0.3s ease forwards';
          setTimeout(() => easterMsg.remove(), 300);
        }, 3000);
      }
    });
  }

  // ─── Add CSS animations for easter egg messages ───────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOutDown {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(20px); }
    }
    .reveal-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .reveal-on-scroll.is-revealed {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // ─── Hidden Navigation Trick (hover reveal on certain elements) ──────────
  const hiddenHints = document.querySelectorAll('[data-easter-hint]');
  hiddenHints.forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('mouseenter', () => {
      const hint = el.getAttribute('data-easter-hint');
      if (hint && !prefersReducedMotion) {
        spawnConfetti();
      }
    });
  });

})();
