/**
 * ============================================================================
 * MAIN.JS — Speakeasy Gold
 * Mobile nav, reduced motion, scroll reveals, easter eggs, mascot companion.
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Mobile Navigation Toggle
     -------------------------------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.setAttribute('aria-expanded', 'false');

    navToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     Reduced Motion
     -------------------------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function handleReducedMotion() {
    document.documentElement.classList.toggle('reduce-motion', prefersReducedMotion.matches);
  }

  handleReducedMotion();
  prefersReducedMotion.addEventListener('change', handleReducedMotion);

  /* --------------------------------------------------------------------------
     Scroll Reveals (IntersectionObserver)
     -------------------------------------------------------------------------- */
  if (!prefersReducedMotion.matches) {
    const revealElements = document.querySelectorAll(
      '.feature-card, .client-card, .feature-detail, .ecosystem-item',
    );

    if ('IntersectionObserver' in window && revealElements.length > 0) {
      const revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
      );

      revealElements.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        revealObserver.observe(el);
      });

      // Add revealed state styles
      const style = document.createElement('style');
      style.textContent = `
        .revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .revealed {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  /* --------------------------------------------------------------------------
     Easter Eggs
     -------------------------------------------------------------------------- */

  // Logo clicks: 7 clicks → Gilda appears with champagne burst
  const logo = document.querySelector('.nav-logo, .hero-logo');
  let logoClickCount = 0;
  let logoClickTimer = null;

  if (logo) {
    logo.addEventListener('click', function (e) {
      // Don't count if focus is in an input
      if (
        document.activeElement &&
        (document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA' ||
          document.activeElement.contentEditable === 'true')
      ) {
        return;
      }

      // If Ctrl/Cmd held, allow normal behavior (open link)
      if (e.ctrlKey || e.metaKey) return;

      e.preventDefault();

      logoClickCount++;

      if (logoClickTimer) clearTimeout(logoClickTimer);
      logoClickTimer = setTimeout(function () {
        logoClickCount = 0;
      }, 1000);

      if (logoClickCount >= 7) {
        logoClickCount = 0;
        triggerLogoEasterEgg();
      }
    });
  }

  function triggerLogoEasterEgg() {
    // Show Gilda with champagne burst effect
    let mascot = document.querySelector('.mascot-container');
    if (!mascot) {
      mascot = createMascotElement();
      document.body.appendChild(mascot);
    }

    const speech = mascot.querySelector('.mascot-speech');
    if (speech) {
      speech.textContent = 'Well, well. You know how to knock.';
    }

    mascot.classList.add('visible', 'easter-active');

    // Champagne bubble burst
    createChampagneBurst(mascot);

    // Auto-hide after 4 seconds
    setTimeout(function () {
      mascot.classList.remove('easter-active');
    }, 4000);
  }

  function createChampagneBurst(container) {
    const burst = document.createElement('div');
    burst.style.cssText = `
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      pointer-events: none;
    `;

    for (let i = 0; i < 5; i++) {
      const bubble = document.createElement('div');
      const size = 6 + Math.random() * 8;
      const angle = (Math.random() - 0.5) * 60;
      const duration = 1500 + Math.random() * 1000;

      bubble.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: var(--color-primary);
        border-radius: 50%;
        opacity: 0.8;
        animation: champagne-rise ${duration}ms ease-out forwards;
        animation-delay: ${i * 100}ms;
        --angle: ${angle}deg;
      `;
      burst.appendChild(bubble);
    }

    const style = document.createElement('style');
    style.id = 'champagne-burst-style';
    if (!document.getElementById('champagne-burst-style')) {
      style.textContent = `
        @keyframes champagne-rise {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-80px) translateX(var(--angle)) scale(0.3);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    container.appendChild(burst);
    setTimeout(function () {
      burst.remove();
    }, 2500);
  }

  // Typed word: "speakeasy" → amber glow pulse
  let typedBuffer = '';
  const typedTarget = 'speakeasy';
  let typedTimer = null;

  document.addEventListener('keydown', function (e) {
    // Disabled in inputs
    if (
      document.activeElement &&
      (document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA' ||
        document.activeElement.contentEditable === 'true')
    ) {
      return;
    }

    // Don't intercept if modifier keys held
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    // Exit on Escape
    if (e.key === 'Escape') {
      typedBuffer = '';
      clearTimeout(typedTimer);
      document.body.style.transition = '';
      return;
    }

    // Only track printable characters
    if (e.key.length === 1) {
      typedBuffer += e.key.toLowerCase();

      // Keep buffer bounded
      if (typedBuffer.length > typedTarget.length) {
        typedBuffer = typedBuffer.slice(-typedTarget.length);
      }

      clearTimeout(typedTimer);
      typedTimer = setTimeout(function () {
        typedBuffer = '';
      }, 500);

      if (typedBuffer === typedTarget) {
        triggerTypedEasterEgg();
        typedBuffer = '';
      }
    }
  });

  function triggerTypedEasterEgg() {
    document.body.style.transition = 'background-color 0.3s ease';
    document.body.style.backgroundColor = 'rgba(184, 108, 44, 0.15)';

    setTimeout(function () {
      document.body.style.backgroundColor = '';
    }, 1000);
  }

  /* --------------------------------------------------------------------------
     Mascot Companion — Gilda
     -------------------------------------------------------------------------- */
  function createMascotElement() {
    const container = document.createElement('div');
    container.className = 'mascot-container';
    container.setAttribute('role', 'complementary');
    container.setAttribute('aria-label', 'Gilda, your speakeasy host');

    container.innerHTML = `
      <div class="mascot-speech">Welcome back. The password still opens every door.</div>
      <button class="mascot-dismiss" aria-label="Dismiss Gilda">×</button>
      <svg class="mascot-figure" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Art Deco stylized woman silhouette -->
        <ellipse cx="40" cy="20" rx="12" ry="14" fill="currentColor"/>
        <!-- Body/torso in geometric Art Deco style -->
        <path d="M40 34 L52 60 L48 60 L48 95 L32 95 L32 60 L28 60 Z" fill="currentColor"/>
        <!-- Flute -->
        <path d="M55 45 L65 25" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="66" cy="23" rx="4" ry="6" fill="currentColor"/>
        <!-- Dress embellishment -->
        <path d="M32 65 L48 65 L46 75 L34 75 Z" fill="var(--color-surface-alt)"/>
      </svg>
    `;

    const dismissBtn = container.querySelector('.mascot-dismiss');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', function () {
        container.classList.remove('visible', 'easter-active');
        // Remember dismissal in sessionStorage
        sessionStorage.setItem('gilda-dismissed', 'true');
      });
    }

    // Check if previously dismissed
    if (sessionStorage.getItem('gilda-dismissed')) {
      container.classList.add('dismissed');
    }

    return container;
  }

  // Show mascot on pages where she belongs (Home, Download, About)
  function initMascot() {
    const mascotPages = ['index', 'download', 'about'];
    const currentPage = document.body.dataset.page;

    if (mascotPages.includes(currentPage) && !sessionStorage.getItem('gilda-dismissed')) {
      let mascot = document.querySelector('.mascot-container');
      if (!mascot) {
        mascot = createMascotElement();
        document.body.appendChild(mascot);
      }
      // Show after delay
      setTimeout(function () {
        mascot.classList.add('visible');
      }, 2000);
    }
  }

  // Update mascot speech based on current section
  function updateMascotSpeech() {
    const mascot = document.querySelector('.mascot-container');
    if (!mascot || !mascot.classList.contains('visible')) return;

    const speech = mascot.querySelector('.mascot-speech');
    if (!speech) return;

    const sectionId = window.location.hash || '';
    const tips = {
      'curtain-rise': 'Welcome back. The password still opens every door.',
      'the-vault': 'That library organizes itself. Drop a file, watch it settle on the marquee.',
      download: "One line and you're the new projectionist. I'll hold the flute.",
      about: "Questions from the lobby? I've got the answers, dear.",
    };

    if (sectionId && tips[sectionId.slice(1)]) {
      speech.textContent = tips[sectionId.slice(1)];
    }
  }

  window.addEventListener('hashchange', updateMascotSpeech);
  initMascot();

  /* --------------------------------------------------------------------------
     Intensity Toggle (Dim the House Lights)
     -------------------------------------------------------------------------- */
  const intensityToggle = document.querySelector(".intensity-toggle input[type='checkbox']");

  if (intensityToggle) {
    // Read initial state
    if (sessionStorage.getItem('dimmed-lights') === 'true') {
      intensityToggle.checked = true;
      document.documentElement.classList.add('dimmed');
    }

    intensityToggle.addEventListener('change', function () {
      const dimmed = intensityToggle.checked;
      document.documentElement.classList.toggle('dimmed', dimmed);
      sessionStorage.setItem('dimmed-lights', String(dimmed));
    });
  }

  // Dimmed state CSS
  const dimmedStyle = document.createElement('style');
  dimmedStyle.textContent = `
    .dimmed {
      --color-primary: #8a6e2e !important;
      --color-bg: #050403 !important;
      --color-surface: #0d0a08 !important;
      --color-surface-alt: #12100d !important;
    }
    .dimmed .mascot-container {
      opacity: 0.7;
    }
  `;
  document.head.appendChild(dimmedStyle);

  /* --------------------------------------------------------------------------
     Reduced motion: disable all animations when preference is set
     -------------------------------------------------------------------------- */
  if (prefersReducedMotion.matches) {
    const allAnimated = document.querySelectorAll('*');
    allAnimated.forEach(function (el) {
      el.style.transition = 'none';
      el.style.animation = 'none';
    });
  }
})();
