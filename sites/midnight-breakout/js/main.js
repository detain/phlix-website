/**
 * ============================================================================
 *  Midnight Breakout — main.js
 *  Nav toggle, reduced-motion, scroll reveals, easter eggs
 * ============================================================================
 * @copyright 2026 Phlix Brand Studio <brand@phlix.io>
 */

(function () {
  'use strict';

  /* ── Utility ───────────────────────────────────────────────────────────── */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Mobile nav toggle ─────────────────────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('is-open', !isOpen);

      // Trap focus inside open menu
      if (!isOpen) {
        const firstLink = navMenu.querySelector('a');
        firstLink && firstLink.focus();
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (
        navMenu.classList.contains('is-open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        navToggle.focus();
      }
    });

    // Close on nav link click (mobile)
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navMenu.classList.contains('is-open')) {
          navToggle.setAttribute('aria-expanded', 'false');
          navMenu.classList.remove('is-open');
        }
      });
    });
  }

  /* ── Scroll reveals (IntersectionObserver) ──────────────────────────────── */
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.reveal, .spotlight-reveal');

    if (revealEls.length > 0) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      );

      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    }
  } else {
    // Show all immediately if reduced-motion or no observer
    document.querySelectorAll('.reveal, .spotlight-reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ── Easter egg: Konami code ───────────────────────────────────────────── */
  if (!reducedMotion) {
    const konami = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let konamiIdx = 0;

    function resetKonami() {
      konamiIdx = 0;
    }

    document.addEventListener('keydown', function (e) {
      // Don't fire when typing in inputs
      if (
        e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.isContentEditable
      ) {
        return;
      }

      if (e.key === konami[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === konami.length) {
          triggerBreakoutEasterEgg();
          resetKonami();
        }
      } else {
        resetKonami();
      }
    });

    function triggerBreakoutEasterEgg() {
      // Create overlay flash
      const flash = document.createElement('div');
      flash.setAttribute(
        'style',
        [
          'position:fixed',
          'inset:0',
          'z-index:9999',
          'pointer-events:none',
          'background:radial-gradient(ellipse at center, rgba(231,76,60,0.25) 0%, transparent 70%)',
          'animation:breakout-flash 600ms ease-out forwards',
        ].join(';'),
      );
      document.body.appendChild(flash);

      // Show message
      const msg = document.createElement('div');
      msg.setAttribute(
        'style',
        [
          'position:fixed',
          'top:50%',
          'left:50%',
          'transform:translate(-50%,-50%)',
          'z-index:10000',
          'pointer-events:none',
          'font-family:var(--font-headline, sans-serif)',
          'font-size:clamp(1.5rem,5vw,3rem)',
          'font-weight:700',
          'letter-spacing:0.1em',
          'text-transform:uppercase',
          'color:#F39C12',
          'text-shadow:0 0 30px rgba(243,156,18,0.8), 0 0 60px rgba(243,156,18,0.4)',
          'animation:breakout-msg 1.5s ease-out forwards',
        ].join(';'),
      );
      msg.textContent = 'YOU BROKE FREE!';
      document.body.appendChild(msg);

      setTimeout(function () {
        flash.remove();
        msg.remove();
      }, 2000);
    }

    // Inject keyframe animations once
    if (!document.getElementById('breakout-keyframes')) {
      const style = document.createElement('style');
      style.id = 'breakout-keyframes';
      style.textContent = [
        '@keyframes breakout-flash {',
        '  0%  { opacity: 0; }',
        '  20% { opacity: 1; }',
        '  100%{ opacity: 0; }',
        '}',
        '@keyframes breakout-msg {',
        '  0%  { opacity:0; transform:translate(-50%,-50%) scale(0.7); }',
        '  25% { opacity:1; transform:translate(-50%,-50%) scale(1.05); }',
        '  60% { opacity:1; transform:translate(-50%,-50%) scale(1.0); }',
        '  100%{ opacity:0; transform:translate(-50%,-50%) scale(1.0); }',
        '}',
      ].join('');
      document.head.appendChild(style);
    }
  }

  /* ── Logo click counter (easter egg) ───────────────────────────────────── */
  const logoLink = document.querySelector('.nav-logo');
  let logoClickCount = 0;

  if (logoLink && !reducedMotion) {
    logoLink.addEventListener('click', function (e) {
      // Only count plain clicks, not nav
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;

      logoClickCount++;
      if (logoClickCount >= 5) {
        logoClickCount = 0;
        triggerChainShatter();
        e.preventDefault();
      }
    });
  }

  function triggerChainShatter() {
    const shard = document.createElement('div');
    shard.setAttribute(
      'style',
      [
        'position:fixed',
        'top:0',
        'left:0',
        'right:0',
        'bottom:0',
        'z-index:9998',
        'pointer-events:none',
        'background:repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(74,74,74,0.05) 20px, rgba(74,74,74,0.05) 22px)',
        'animation:shatter-in 400ms ease-out forwards',
      ].join(';'),
    );
    document.body.appendChild(shard);
    setTimeout(function () {
      shard.remove();
    }, 1000);
  }

  if (!document.getElementById('shatter-keyframes')) {
    const s = document.createElement('style');
    s.id = 'shatter-keyframes';
    s.textContent = [
      '@keyframes shatter-in {',
      '  0%  { opacity:0; clip-path:polygon(50% 50%, 0 0, 100% 0); }',
      '  100%{ opacity:1; clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%); }',
      '}',
    ].join('');
    document.head.appendChild(s);
  }
})();
