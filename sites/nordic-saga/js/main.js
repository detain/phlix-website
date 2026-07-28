/**
 * ============================================================================
 * MAIN.JS — Nordic Saga
 * Nav toggle, scroll reveals, easter eggs, mascot behavior, reduced motion
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * ============================================================================
 */

(function () {
  'use strict';

  /* ── Reduced Motion ────────────────────────────────────────────────────── */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motionEnabled = !prefersReducedMotion.matches;

  prefersReducedMotion.addEventListener('change', (e) => {
    motionEnabled = !e.matches;
  });

  function quietly(fn) {
    return motionEnabled ? fn() : void 0;
  }

  /* ── Nav Toggle (mobile) ──────────────────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav   = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const isOpen = mainNav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.innerHTML = isOpen
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });

    // Close nav on outside click
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Scroll Reveal (rune-burn) ────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.rune-burn');

  if (revealEls.length > 0 && motionEnabled) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else if (revealEls.length > 0) {
    // Reduced motion: show all immediately
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ── FAQ Accordion ─────────────────────────────────────────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      faqItems.forEach((i) => i.classList.remove('open'));

      // Toggle this one
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      } else {
        question.setAttribute('aria-expanded', 'false');
      }
    });

    // Keyboard
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });

  /* ── Easter Eggs ──────────────────────────────────────────────────────── */
  let logoClickCount = 0;
  let lastLogoClick = 0;

  // Logo click:5 easter egg
  const logo = document.querySelector('.site-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      // Don't干预 normal link behavior, just count
      const now = Date.now();
      if (now - lastLogoClick < 400) {
        logoClickCount++;
      } else {
        logoClickCount = 1;
      }
      lastLogoClick = now;

      if (logoClickCount >= 5) {
        logoClickCount = 0;
        quietly(() => {
          const bird = document.querySelector('.mascot-bird');
          if (bird) {
            bird.style.animation = 'none';
            bird.offsetHeight; // reflow
            bird.style.animation = 'wing-spread 0.6s ease-out';
          }
        });
      }
    });
  }

  // typed-word: odin easter egg
  // typed-word: rune easter egg
  const typedBuffer = [];
  const secretWords  = ['odin', 'rune'];
  let typingTimeout  = null;

  function resetBuffer() {
    typedBuffer.length = 0;
  }

  function checkBuffer() {
    const typed = typedBuffer.join('').toLowerCase();
    if (secretWords.includes(typed)) {
      quietly(() => {
        const bird = document.querySelector('.mascot-bird');
        if (bird) {
          const original = bird.src;
          bird.style.animation = 'caw-flash 0.8s ease-out';
          setTimeout(() => {
            bird.style.animation = '';
          }, 800);
        }
        showMascotTip('Huginn whispers: The saga knows your name.');
      });
      resetBuffer();
    }
  }

  document.addEventListener('keydown', (e) => {
    // Disabled while in input/textarea
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

    // Esc clears
    if (e.key === 'Escape') {
      resetBuffer();
      return;
    }

    // Only letter keys
    if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
      typedBuffer.push(e.key);
      if (typedBuffer.length > 10) typedBuffer.shift();

      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(resetBuffer, 1500);

      checkBuffer();
    }
  });

  /* ── Mascot — Huginn ───────────────────────────────────────────────────── */
  const mascot     = document.querySelector('.mascot');
  const mascotTip  = document.querySelector('.mascot-tip');
  const dismissBtn  = document.querySelector('.mascot-dismiss');

  // Tips by section
  const tips = {
    'home':     'The saga begins. Listen well.',
    'features': 'Huginn and Muninn carry the same message — all must hear it at once.',
    'download': 'Forge your hall. Then we return to the feast.',
  };

  function showMascotTip(message) {
    if (!mascotTip) return;
    mascotTip.textContent = message;
    mascotTip.classList.add('visible');
  }

  function hideMascotTip() {
    if (mascotTip) mascotTip.classList.remove('visible');
  }

  // Determine which page we're on
  const path = window.location.pathname;
  const pageKey = Object.keys(tips).find((k) => path.includes(k)) || 'home';

  // Show tip after delay if not dismissed
  const dismissed = localStorage.getItem('huginn-dismissed');
  if (!dismissed) {
    setTimeout(() => {
      showMascotTip(tips[pageKey] || tips['home']);
    }, 3000);
  }

  // Dismiss persistent companion
  if (dismissBtn && mascot) {
    dismissBtn.addEventListener('click', () => {
      localStorage.setItem('huginn-dismissed', '1');
      mascot.style.display = 'none';
    });
  }

  // Mascot idle animation (disabled under reduced motion)
  if (mascot && motionEnabled) {
    const bird = mascot.querySelector('.mascot-bird');
    if (bird) {
      let idleTimer = null;

      function startIdle() {
        idleTimer = setInterval(() => {
          if (motionEnabled) {
            bird.style.transform = `rotate(${Math.sin(Date.now() / 2000) * 3}deg)`;
          }
        }, 100);
      }

      function stopIdle() {
        clearInterval(idleTimer);
        bird.style.transform = '';
      }

      // Start idle after 5s
      setTimeout(startIdle, 5000);

      // Stop on hover
      bird.addEventListener('mouseenter', stopIdle);
      bird.addEventListener('mouseleave', () => {
        if (!prefersReducedMotion.matches) startIdle();
      });
    }
  }

  /* ── Wing-spread animation for easter egg ─────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes wing-spread {
      0%   { transform: scale(1) rotate(0deg); }
      30%  { transform: scale(1.15) rotate(-5deg); }
      60%  { transform: scale(1.15) rotate(5deg); }
      100% { transform: scale(1) rotate(0deg); }
    }
    @keyframes caw-flash {
      0%   { filter: brightness(1); }
      25%  { filter: brightness(1.8) hue-rotate(-10deg); }
      50%  { filter: brightness(1); }
      75%  { filter: brightness(1.5); }
      100% { filter: brightness(1); }
    }
  `;
  document.head.appendChild(style);

  /* ── Seasonal Variant Detection ────────────────────────────────────────── */
  function getSeasonalVariant() {
    const now     = new Date();
    const month   = now.getMonth() + 1; // 1-12
    const day     = now.getDate();
    const isDark  = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Yule Night: Dec 21 – Jan 6
    if ((month === 12 && day >= 21) || (month === 1 && day <= 6)) {
      return 'yule';
    }

    // Midsummer: Jun 21 – Sep 21
    if ((month === 6 && day >= 21) || (month === 7) || (month === 8) || (month === 9 && day <= 21)) {
      return 'midsummer';
    }

    // Ragnarok Eve: Oct 28 – Nov 1
    if ((month === 10 && day >= 28) || (month === 11 && day <= 1)) {
      return 'ragnarok';
    }

    return isDark ? 'fjord' : 'default';
  }

  // Add seasonal class to body
  const variant = getSeasonalVariant();
  if (variant !== 'default' && variant !== 'fjord') {
    document.body.classList.add(`seasonal-${variant}`);
  }

})();
